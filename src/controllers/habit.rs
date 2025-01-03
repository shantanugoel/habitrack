#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use axum::debug_handler;
use chrono::Datelike;
use loco_rs::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::{
    _entities::habits::{self, ActiveModel, Entity, Model},
    users,
};

use super::hlog;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Params {
    pub name: String,
    pub target: Option<String>,
    pub notes: Option<String>,
}

impl Params {
    fn update(&self, item: &mut ActiveModel) {
        item.name = Set(self.name.clone());
        item.target = Set(self.target.clone());
        item.notes = Set(self.notes.clone());
    }
}

pub async fn load_item(ctx: &AppContext, id: i32, user_id: i32) -> Result<Model> {
    if let Some(item) = Entity::find_by_id(id).one(&ctx.db).await? {
        if item.user_id != user_id {
            return unauthorized("unauthorized!");
        }
        Ok(item)
    } else {
        Err(Error::NotFound)
    }
}

#[debug_handler]
pub async fn list(
    auth: auth::JWTWithUser<users::Model>,
    State(ctx): State<AppContext>,
) -> Result<Response> {
    format::json(
        Entity::find()
            .filter(habits::Column::UserId.eq(auth.user.id))
            .all(&ctx.db)
            .await?,
    )
}

#[debug_handler]
pub async fn add(
    auth: auth::JWTWithUser<users::Model>,
    State(ctx): State<AppContext>,
    Json(params): Json<Params>,
) -> Result<Response> {
    let mut item = ActiveModel {
        user_id: Set(auth.user.id),
        ..Default::default()
    };
    params.update(&mut item);
    let current_year = chrono::Local::now().year_ce();
    let txn = ctx.db.begin().await?;
    let item = item.insert(&txn).await?;
    hlog::add_many(&txn, current_year.1, item.id).await?;
    txn.commit().await?;
    format::json(item)
}

#[debug_handler]
pub async fn update(
    auth: auth::JWTWithUser<users::Model>,
    Path(id): Path<i32>,
    State(ctx): State<AppContext>,
    Json(params): Json<Params>,
) -> Result<Response> {
    let item = load_item(&ctx, id, auth.user.id).await?;
    let mut item = item.into_active_model();
    params.update(&mut item);
    let item = item.update(&ctx.db).await?;
    format::json(item)
}

#[debug_handler]
pub async fn remove(
    auth: auth::JWTWithUser<users::Model>,
    Path(id): Path<i32>,
    State(ctx): State<AppContext>,
) -> Result<Response> {
    let item = load_item(&ctx, id, auth.user.id).await?;
    let txn = ctx.db.begin().await?;
    hlog::delete_many(&txn, item.id).await?;
    item.delete(&txn).await?;
    txn.commit().await?;
    format::empty()
}

#[debug_handler]
pub async fn get_one(
    auth: auth::JWTWithUser<users::Model>,
    Path(id): Path<i32>,
    State(ctx): State<AppContext>,
) -> Result<Response> {
    format::json(load_item(&ctx, id, auth.user.id).await?)
}

// # Add optional date filtering parameters
#[debug_handler]
pub async fn hlog_list(
    auth: auth::JWTWithUser<users::Model>,
    Path(id): Path<i32>,
    State(ctx): State<AppContext>,
) -> Result<Response> {
    load_item(&ctx, id, auth.user.id).await?;
    format::json(hlog::list(&ctx, id).await?)
}

#[debug_handler]
pub async fn hlog_update(
    auth: auth::JWTWithUser<users::Model>,
    Path((id, hlog_id)): Path<(i32, i32)>,
    State(ctx): State<AppContext>,
    Json(params): Json<hlog::Params>,
) -> Result<Response> {
    load_item(&ctx, id, auth.user.id).await?;
    format::json(hlog::update(&ctx, id, hlog_id, &params).await?)
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("api/habits/")
        .add("/", get(list))
        .add("/", post(add))
        .add(":id", get(get_one))
        .add(":id", delete(remove))
        .add(":id", put(update))
        .add(":id", patch(update))
        .add("/:id/hlogs/", get(hlog_list))
        .add("/:id/hlogs/:hlog_id/update", put(hlog_update))
}

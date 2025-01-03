#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use axum::debug_handler;
use loco_rs::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::{
    _entities::habits::{self, ActiveModel, Entity, Model},
    users,
};

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

async fn load_item(ctx: &AppContext, id: i32, user_id: i32) -> Result<Model> {
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
    auth: auth::ApiToken<users::Model>,
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
    auth: auth::ApiToken<users::Model>,
    State(ctx): State<AppContext>,
    Json(params): Json<Params>,
) -> Result<Response> {
    let mut item = ActiveModel {
        ..Default::default()
    };
    params.update(&mut item);
    item.user_id = Set(auth.user.id);
    let item = item.insert(&ctx.db).await?;
    format::json(item)
}

#[debug_handler]
pub async fn update(
    auth: auth::ApiToken<users::Model>,
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
    auth: auth::ApiToken<users::Model>,
    Path(id): Path<i32>,
    State(ctx): State<AppContext>,
) -> Result<Response> {
    load_item(&ctx, id, auth.user.id)
        .await?
        .delete(&ctx.db)
        .await?;
    format::empty()
}

#[debug_handler]
pub async fn get_one(
    auth: auth::ApiToken<users::Model>,
    Path(id): Path<i32>,
    State(ctx): State<AppContext>,
) -> Result<Response> {
    format::json(load_item(&ctx, id, auth.user.id).await?)
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
}

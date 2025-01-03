#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]
use chrono::Duration;
use loco_rs::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::_entities::hlogs::{self, ActiveModel, Entity, Model};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Params {
    pub date: Date,
    pub done: bool,
    pub notes: Option<String>,
}

impl Params {
    fn update(&self, item: &mut ActiveModel) {
        item.date = Set(self.date.clone());
        item.done = Set(self.done.clone());
        item.notes = Set(self.notes.clone());
    }
}

async fn load_item(ctx: &AppContext, id: i32) -> Result<Model> {
    let item = Entity::find_by_id(id).one(&ctx.db).await?;
    item.ok_or_else(|| Error::NotFound)
}

pub async fn list(ctx: &AppContext, habit_id: i32) -> Result<Vec<Model>> {
    let hlogs = Entity::find()
        .filter(hlogs::Column::HabitId.eq(habit_id))
        .all(&ctx.db)
        .await?;
    Ok(hlogs)
}

pub async fn add_many(ctx: &AppContext, year: u32, habit_id: i32) -> Result<()> {
    let mut items = Vec::new();
    let days_in_year = if year % 4 == 0 && (year % 100 != 0 || year % 400 == 0) {
        366
    } else {
        365
    };
    if let Some(start_date) = Date::from_ymd_opt(year as i32, 1, 1) {
        for i in 0..days_in_year {
            let item = ActiveModel {
                habit_id: Set(habit_id),
                date: Set(start_date + Duration::days(i)),
                done: Set(false),
                notes: Set(None),
                ..Default::default()
            };
            items.push(item);
        }
        Entity::insert_many(items).exec(&ctx.db).await?;
        Ok(())
    } else {
        tracing::error!("Invalid year {year}");
        Err(Error::InternalServerError)
    }
}

pub async fn delete_many(ctx: &AppContext, habit_id: i32) -> Result<()> {
    Entity::delete_many()
        .filter(hlogs::Column::HabitId.eq(habit_id))
        .exec(&ctx.db)
        .await?;
    Ok(())
}

pub async fn update(ctx: &AppContext, id: i32, params: &Params) -> Result<Model> {
    let item = load_item(&ctx, id).await?;
    let mut item = item.into_active_model();
    params.update(&mut item);
    Ok(item.update(&ctx.db).await?)
}

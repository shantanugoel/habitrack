//! `SeaORM` Entity, @generated by sea-orm-codegen 1.1.3

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize)]
#[sea_orm(table_name = "hlogs")]
pub struct Model {
    pub created_at: DateTimeWithTimeZone,
    pub updated_at: DateTimeWithTimeZone,
    #[sea_orm(primary_key)]
    pub id: i32,
    pub habit_id: i32,
    pub date: Date,
    pub done: bool,
    pub notes: Option<String>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::habits::Entity",
        from = "Column::HabitId",
        to = "super::habits::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Habits,
}

impl Related<super::habits::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Habits.def()
    }
}
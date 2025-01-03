use loco_rs::schema::table_auto_tz;
use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                table_auto_tz(Hlogs::Table)
                    .col(pk_auto(Hlogs::Id))
                    .col(integer(Hlogs::HabitId))
                    .col(date(Hlogs::Date))
                    .col(boolean(Hlogs::Done))
                    .col(string_null(Hlogs::Notes))
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-hlogs-habit_ids")
                            .from(Hlogs::Table, Hlogs::HabitId)
                            .to(Habits::Table, Habits::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Hlogs::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Hlogs {
    Table,
    Id,
    HabitId,
    Date,
    Done,
    Notes,
    
}

#[derive(DeriveIden)]
enum Habits {
    Table,
    Id,
}

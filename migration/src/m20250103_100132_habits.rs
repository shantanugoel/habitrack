use loco_rs::schema::table_auto_tz;
use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                table_auto_tz(Habits::Table)
                    .col(pk_auto(Habits::Id))
                    .col(integer(Habits::UserId))
                    .col(string(Habits::Name))
                    .col(string_null(Habits::Target))
                    .col(string_null(Habits::Notes))
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-habits-user_ids")
                            .from(Habits::Table, Habits::UserId)
                            .to(Users::Table, Users::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Habits::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Habits {
    Table,
    Id,
    UserId,
    Name,
    Target,
    Notes,
    
}

#[derive(DeriveIden)]
enum Users {
    Table,
    Id,
}

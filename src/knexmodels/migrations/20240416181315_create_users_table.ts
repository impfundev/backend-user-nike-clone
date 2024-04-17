import type { Knex } from "knex";

const tableName = "users";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.string("id").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("username").notNullable();
    table.string("firstname").nullable();
    table.string("lastname").nullable();
    table.string("roles").nullable();
    table.string("picture").nullable();
    table.date("createdAt").notNullable();
    table.date("updatedAt").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}

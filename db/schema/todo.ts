import { sql } from "drizzle-orm";
import { sqliteTable, text, int } from "drizzle-orm/sqlite-core";

export const TodoTable = sqliteTable("TodoTable", {
  id: int("id").primaryKey({ autoIncrement: true }).unique(),
  title: text("title").notNull(),
  description: text("description"),
  completed: int("completed", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: int("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: int("updatedAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date())
});
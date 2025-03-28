import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

migrate(drizzle(new Database(process.env.DB_FILE_NAME)), { migrationsFolder: "./db/drizzle" });
console.log("Migrate successfully");
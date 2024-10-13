import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const inventions = sqliteTable("inventions", {
  id: integer().primaryKey(),
  name: text().unique(),
  year: integer().notNull(),
  description: text().notNull().unique(),
  image_url: text(),
  created_at: integer()
    .notNull()
    .default(sql`(unixepoch())`),
});
export const insertInventionSchema = createInsertSchema(inventions);
export const selectInventionSchema = createSelectSchema(inventions);
export type InventionSelect = InferSelectModel<typeof inventions>;
export type InventionInsert = InferInsertModel<typeof inventions>;

export const usedInventions = sqliteTable("used_inventions", {
  id: integer().primaryKey(),
  invention_id: integer().notNull(),
  is_current: integer().notNull().default(1),
  used_at: integer()
    .notNull()
    .default(sql`(unixepoch())`),
});

export const scores = sqliteTable("scores", {
  id: integer().primaryKey(),
  invention_id: integer(),
  created_at: integer()
    .notNull()
    .default(sql`(unixepoch())`),
});
export const insertScoreSchema = createInsertSchema(inventions);
export const selectScoreSchema = createSelectSchema(inventions);
export type ScoreSelect = InferSelectModel<typeof scores>;
export type ScoreInsert = InferInsertModel<typeof scores>;

export const users = sqliteTable("users", {
  id: integer().primaryKey(),
  name: text(),
  created_at: integer()
    .notNull()
    .default(sql`(unixepoch())`),
});
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type UserSelect = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;

import { createInsertSchema } from "drizzle-zod";
import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  externalId: text("external_id").notNull().unique(),
  email: text("email"),
  status: text("status").notNull().default("active"),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull().defaultNow(),
});

export const profilesTable = pgTable("profiles", {
  userId: uuid("user_id").primaryKey().references(() => usersTable.id, { onDelete: "cascade" }),
  displayName: text("display_name").notNull(),
  username: text("username").notNull().unique(),
  avatarUrl: text("avatar_url"),
  country: text("country").notNull(),
  bio: text("bio").notNull().default(""),
  languagesSpoken: jsonb("languages_spoken").$type<string[]>().notNull().default([]),
  languagesLearning: jsonb("languages_learning").$type<string[]>().notNull().default([]),
  interests: jsonb("interests").$type<string[]>().notNull().default([]),
  preferredCountries: jsonb("preferred_countries").$type<string[]>().notNull().default([]),
  preferredLanguages: jsonb("preferred_languages").$type<string[]>().notNull().default([]),
  matchingMode: text("matching_mode").notNull().default("random"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const matchesTable = pgTable("matches", {
  id: uuid("id").defaultRandom().primaryKey(),
  roomId: text("room_id").notNull().unique(),
  userOneId: uuid("user_one_id").notNull().references(() => usersTable.id),
  userTwoId: uuid("user_two_id").notNull().references(() => usersTable.id),
  status: text("status").notNull().default("active"),
  prompt: text("prompt").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
});

export const messagesTable = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  matchId: uuid("match_id").notNull().references(() => matchesTable.id, { onDelete: "cascade" }),
  senderId: uuid("sender_id").notNull().references(() => usersTable.id),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const blocksTable = pgTable("blocks", {
  id: uuid("id").defaultRandom().primaryKey(),
  blockerId: uuid("blocker_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  blockedUserId: uuid("blocked_user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const reportsTable = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  reporterId: uuid("reporter_id").notNull().references(() => usersTable.id),
  reportedUserId: uuid("reported_user_id").notNull().references(() => usersTable.id),
  matchId: uuid("match_id").references(() => matchesTable.id),
  reason: text("reason").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true, updatedAt: true, lastSeenAt: true });
export const insertProfileSchema = createInsertSchema(profilesTable).omit({ createdAt: true });
export const insertMatchSchema = createInsertSchema(matchesTable).omit({ id: true, startedAt: true });
export const insertMessageSchema = createInsertSchema(messagesTable).omit({ id: true, createdAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type User = typeof usersTable.$inferSelect;
export type Profile = typeof profilesTable.$inferSelect;
export type Match = typeof matchesTable.$inferSelect;
export type Message = typeof messagesTable.$inferSelect;
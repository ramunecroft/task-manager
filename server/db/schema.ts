import {type AdapterAccount} from "@auth/core/adapters";
import {type InferInsertModel, type InferSelectModel, relations} from "drizzle-orm";
import {
  index,
  integer,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {type z} from "zod";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const priorityEnum = pgEnum("priority", [
  "lower",
  "low",
  "medium",
  "high",
  "highest",
]);

export const statusEnum = pgEnum("status", [
  "TO_DO",
  "IN_REVIEW",
  "IN_PROGRESS",
  "DONE",
]);

export const accounts = pgTable(
  "account",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {onDelete: "cascade"}),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  account => ({
    compoundKey: primaryKey({columns: [account.provider, account.providerAccountId]}),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, {onDelete: "cascade"}),
  expires: timestamp("expires", {mode: "date"}).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", {mode: "date"}).notNull(),
  },
  vt => ({
    compoundKey: primaryKey({columns: [vt.identifier, vt.token]}),
  })
);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name"),
  email: text("email").unique().notNull(),
  image: text("image"),
  password: text("password"),
  emailVerified: timestamp("emailVerified", {mode: "date"}),
  role: roleEnum("user").default("user"),
});

export const usersRelations = relations(users, ({many}) => ({
  posts: many(tasks),
}));

export const tasks = pgTable(
  "tasks",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    title: text("title").notNull().notNull(),
    priority: priorityEnum("priority"),
    description: text("description").notNull(),
    status: statusEnum("status").notNull(),
    ticketCode: text("ticketCode").notNull(),
    voteCount: integer("voteCount").default(0),
    ownerId: uuid("owner_id").references(() => users.id, {onDelete: "cascade"}),
    viewCount: integer("viewCount").default(0),
    createdAt: timestamp("created_at", {mode: "string"}).defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "string"}).defaultNow(),
    startDate: timestamp("start_date", {mode: "string"}),
    dueDate: timestamp("due_date", {mode: "string"}),
    order: integer("order").notNull(),
  },
  table => ({
    authorIdIndex: index("authorId_idx").on(table.ownerId),
  })
);

export const tasksRelations = relations(tasks, ({one}) => ({
  author: one(users, {
    fields: [tasks.ownerId],
    references: [users.id],
  }),
}));

export const taskUpdateHistory = pgTable("task_updates", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  taskId: uuid("task_id").references(() => tasks.id, {onDelete: "cascade"}),
  updatedByUserId: uuid("updated_by_user_id").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow(),
  previousValues: json("previous_values"), // Optional: to store previous values of the updated fields
  newValues: json("new_values"), // Optional: to store new values of the updated fields
  changeDescription: text("change_description"), // A description of what was changed
});

export const taskUpdateHistoryRelations = relations(taskUpdateHistory, ({one}) => ({
  task: one(tasks, {
    fields: [taskUpdateHistory.taskId],
    references: [tasks.id],
  }),
  updatedByUser: one(users, {
    fields: [taskUpdateHistory.updatedByUserId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users);

export const selectUserSchema = createSelectSchema(users);

export const insertTaskSchema = createInsertSchema(tasks);

export const selectTaskSchema = createSelectSchema(tasks);

export type User = InferSelectModel<typeof users>;

export type UserInput = InferInsertModel<typeof users>;

export type Task = InferSelectModel<typeof tasks>;

export type TaskInput = InferInsertModel<typeof tasks>;

export type UpdateTaskInput = z.infer<typeof insertTaskSchema>;

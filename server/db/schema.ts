import {type AdapterAccount} from "@auth/core/adapters";
import {type InferInsertModel, type InferSelectModel, relations} from "drizzle-orm";
import {
  index,
  integer,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

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
    userId: text("userId")
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
  userId: text("userId")
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
  email: text("email").notNull(),
  image: text("image"),
  password: text("password"),
  emailVerified: timestamp("emailVerified", {mode: "date"}),
  role: roleEnum("user").default("user"),
});

export const signUpSchema = z.object({
  email: z.string().email({
    message: "メールアドレスは必須です。",
  }),
  password: z.string().min(6, {
    message: "パスワードは6文字以上です。",
  }),
  name: z.string().min(1, {
    message: "ニックネームは必須です。",
  }),
});

export const signInSchema = z.object({
  email: z.string().email({
    message: "メールアドレスは必須です。",
  }),
  password: z.string().min(6, {
    message: "パスワードは6文字以上です。",
  }),
});

export const usersRelations = relations(users, ({many}) => ({
  posts: many(tasks),
}));

export const tasks = pgTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull().notNull(),
    priority: priorityEnum("priority"),
    description: text("description").notNull(),
    status: statusEnum("status").notNull(),
    ticketCode: text("ticketCode").notNull(),
    voteCount: integer("voteCount").default(0),
    ownerId: integer("owner_id").references(() => users.id, {onDelete: "cascade"}),
    viewCount: integer("viewCount").default(0),
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
  id: serial("id").primaryKey(),
  taskId: integer("task_id").references(() => tasks.id, {onDelete: "cascade"}),
  updatedByUserId: integer("updated_by_user_id").references(() => users.id),
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

export const updateTaskStatusSchema = insertTaskSchema.pick({
  ticketCode: true,
  status: true,
  description: true,
  title: true,
});

export const selectTaskSchema = createSelectSchema(tasks);

export type User = InferSelectModel<typeof users>;

export type UserInput = InferInsertModel<typeof users>;

export type Task = InferSelectModel<typeof tasks>;

export type TaskInput = InferInsertModel<typeof tasks>;

export type DragUpdateTaskInput = z.infer<typeof updateTaskStatusSchema>;
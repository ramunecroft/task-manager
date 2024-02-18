import {relations, type InferInsertModel, type InferSelectModel} from "drizzle-orm";
import {
  index,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
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

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  role: roleEnum("user").notNull(),
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

const taskUpdateHistory = pgTable("task_updates", {
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
});

export const selectTaskSchema = createSelectSchema(tasks);

export type User = InferSelectModel<typeof users>;

export type UserInput = InferInsertModel<typeof users>;

export type Task = InferSelectModel<typeof tasks>;

export type TaskInput = InferInsertModel<typeof tasks>;

export type DragUpdateTaskInput = z.infer<typeof updateTaskStatusSchema>;

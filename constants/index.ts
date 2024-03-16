import {priorityEnum} from "@/server/db/schema";
import {z} from "zod";

export const priority = z.enum(priorityEnum.enumValues).Values;

/**
 * QUERY KEY
 */
export const QUERY_KEY = {
  tasklist: "taskList",
  userList: "userList",
};

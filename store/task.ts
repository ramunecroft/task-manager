"use client";

import {getTasks} from "@/client/api/task";
import {type Task} from "@/server/db/schema";
import {atom, createStore, type WritableAtom} from "jotai";

export const messageAtom = atom("");

const taskMutationResultAtom = atom<Task[] | null>(null);
taskMutationResultAtom.debugPrivate = true;

export const taskListAtom = atom<Promise<Task[]>>(async get => {
  const mutationResult = get(taskMutationResultAtom);
  if (mutationResult) {
    return mutationResult;
  }
  const data = (await getTasks()) as Task[];

  return data;
});
taskListAtom.debugLabel = "taskList";

export const mutateAtom: WritableAtom<null, [taskList: Task[]], void> = atom(
  null,
  (get, set, taskList) => {
    set(taskMutationResultAtom, taskList);
  }
);

export const selectedTaskTicketCodeAtom = atom<string | null>(null);
selectedTaskTicketCodeAtom.debugPrivate = true;

export const taskModalStateAtom = atom<Task | null>(null);

export const showTaskModalAtom = atom(false);
showTaskModalAtom.debugLabel = "showTaskModal";

export const taskStore = createStore();

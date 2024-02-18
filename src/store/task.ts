"use client";

import {getTasks} from "@/client/api/task";
import {type Task} from "@/server/schema";
import {type WritableAtom, atom, createStore} from "jotai";

export const messageAtom = atom("");

const taskMutationResultAtom = atom<Task[] | null>(null);
taskMutationResultAtom.debugPrivate = true;

export const taskListAtom = atom(async get => {
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

export const selectedTaskAtom = atom(async get => {
  const taskList = await get(taskListAtom);

  const selectedTaskTicketCode = get(selectedTaskTicketCodeAtom);
  if (!taskList) return null;
  const selectedTask = taskList.find(el => el.ticketCode === selectedTaskTicketCode);
  if (!selectedTask) return null;
  return selectedTask;
});
selectedTaskAtom.debugLabel = "selectedTask";

export const showTaskModalAtom = atom(false);
showTaskModalAtom.debugLabel = "showTaskModal";

export const taskStore = createStore();

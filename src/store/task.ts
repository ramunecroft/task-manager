"use client";

import {getTasks} from "@/client/api/task";
import {type Task} from "@/server/schema";
import {atom, createStore} from "jotai";

export const messageAtom = atom("");

const taskMutationResultAtom = atom<Task[] | null>(null);
taskMutationResultAtom.debugPrivate = true;

export const postAtom = atom<Promise<Task[]>>(async get => {
  const mutationResult = get(taskMutationResultAtom);
  if (mutationResult) {
    return mutationResult;
  }
  const data = (await getTasks()) as Task[];

  return data;
});
postAtom.debugLabel = "taskList";

export const mutateAtom = atom(null, async (get, set, taskList) => {
  const data = (await getTasks()) as Task[];
  set(taskMutationResultAtom, data);
});

export const taskStore = createStore();

import {type TaskType} from "@/app/config/docs";
import {getTasks} from "@/client/api/task";
import {atom, createStore} from "jotai";

export const messageAtom = atom("");

const mutationResultAtom = atom<TaskType[] | null>(null);
mutationResultAtom.debugPrivate = true;

export const postAtom = atom<Promise<TaskType[]>>(async get => {
  const mutationResult = get(mutationResultAtom);
  if (mutationResult) {
    return mutationResult;
  }
  const res = await getTasks();

  const data = (await res.json()) as TaskType[];
  return data;
});
postAtom.debugLabel = "taskList";

export const mutateAtom = atom(null, async (get, set, taskList) => {
  const res = await getTasks();
  const data = (await res.json()) as TaskType[];
  set(mutationResultAtom, data);
});

export const taskStore = createStore();

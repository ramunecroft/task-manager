// import {getTasks} from "@/client/api/task";
// import {type Task} from "@/server/schema";
// import {atom, createStore} from "jotai";

// export const messageAtom = atom("");

// const mutationResultAtom = atom<Task[] | null>(null);
// mutationResultAtom.debugPrivate = true;

// export const postAtom = atom<Promise<Task[]>>(async get => {
//   const mutationResult = get(mutationResultAtom);
//   if (mutationResult) {
//     return mutationResult;
//   }
//   const res = await getTasks();

//   const data = (await res.json()) as Task[];
//   return data;
// });
// postAtom.debugLabel = "taskList";

// export const mutateAtom = atom(null, async (get, set, taskList) => {
//   const res = await getTasks();
//   const data = (await res.json()) as Task[];
//   set(mutationResultAtom, data);
// });

// export const taskStore = createStore();

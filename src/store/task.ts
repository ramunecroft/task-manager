import {type TaskType, jsonTaskList} from "@/app/config/docs";
import {atom} from "jotai";

export const taskListAtom = atom<TaskType[]>(jsonTaskList);

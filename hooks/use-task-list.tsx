import {getTasks} from "@/client/api/task";
import {QUERY_KEY} from "@/constants";
import {type Task} from "@/server/db/schema";
import {useQuery} from "@tanstack/react-query";

export const useTaskList = () => {
  return useQuery<Task[]>({
    queryKey: [QUERY_KEY.tasklist],
    queryFn: () => getTasks(),
  });
};

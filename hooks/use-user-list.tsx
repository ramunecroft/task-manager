import {getUsers} from "@/client/api/user";
import {QUERY_KEY} from "@/constants";
import {type User} from "@/server/db/schema";
import {useQuery} from "@tanstack/react-query";

export const useUserList = () => {
  return useQuery<User[]>({
    queryKey: [QUERY_KEY.userList],
    queryFn: () => getUsers(),
  });
};

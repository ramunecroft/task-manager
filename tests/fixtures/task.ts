import {priority} from "@/constants";
export const task = {
  description: "Test Task",
  ticketCode: "TST-01",
  voteCount: 3,
  status: "TO_DO",
  priority: "high",
  startDate: "2022-01-01",
  title: "title",
  viewCount: 5,
};

export const taskCardProps = {
  description: "Test Task",
  ticketCode: "TST-01",
  voteCount: 3,
  priority: priority.low,
};

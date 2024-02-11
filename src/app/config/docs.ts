import {Priority} from "@/app/constants";

interface DocsConfig {
  mainNav: {title: string; href: string}[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "TASK-0001",
      href: "/task/0001",
    },
    {
      title: "TASK-0002",
      href: "/task/0002",
    },
    {
      title: "TASK-0003",
      href: "/task/0003",
    },
    {
      title: "TASK-0004",
      href: "/task/0004",
    },
  ],
};

// export type TaskType = {
//   description: string;
//   ticketCode: string;
//   voteCount: number;
//   priority: (typeof Priority)[keyof typeof Priority];
//   status: "TO_DO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
//   href: string;
// };

// export const jsonTaskList: TaskType[] = [
//   {
//     description: "hello1",
//     ticketCode: "EXC-001",
//     priority: Priority.Highest,
//     voteCount: 0,
//     status: "TO_DO",
//     href: "/task/0001",
//   },
//   {
//     description:
//       "The Jira board is the single source of truth for all the work a team needs to complete. Since it can be accessed by any team member at any time,",
//     ticketCode: "EXC-002",
//     priority: Priority.Medium,
//     voteCount: 0,
//     status: "TO_DO",
//     href: "/task/0002",
//   },
//   {
//     description: "hello3",
//     ticketCode: "EXC-003",
//     priority: Priority.Lower,
//     voteCount: 0,
//     status: "TO_DO",
//     href: "/task/0003",
//   },
//   {
//     description: "hello4",
//     ticketCode: "EXC-004",
//     priority: Priority.Medium,
//     voteCount: 0,
//     status: "IN_PROGRESS",
//     href: "/task/0004",
//   },
//   {
//     description: "hello5",
//     ticketCode: "EXC-005",
//     priority: Priority.Low,
//     voteCount: 0,
//     status: "IN_PROGRESS",
//     href: "/task/0005",
//   },
//   {
//     description: "hello6",
//     ticketCode: "EXC-006",
//     priority: Priority.High,
//     voteCount: 0,
//     status: "IN_REVIEW",
//     href: "/task/0006",
//   },
//   {
//     description: "hello7",
//     ticketCode: "EXC-007",
//     priority: Priority.Medium,
//     voteCount: 0,
//     status: "IN_REVIEW",
//     href: "/task/0007",
//   },
//   {
//     description: "hello8",
//     ticketCode: "EXC-008",
//     priority: Priority.Medium,
//     voteCount: 0,
//     status: "DONE",
//     href: "/task/0008",
//   },
//   {
//     description: "hello9",
//     ticketCode: "EXC-009",
//     priority: Priority.Medium,
//     voteCount: 0,
//     status: "DONE",
//     href: "/task/0009",
//   },
// ];

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

// TODO DB
export type Status = {
  value: string;
  label: string;
};

export const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

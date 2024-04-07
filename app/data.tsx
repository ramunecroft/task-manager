import {Icons} from "@/components/icons";
import {labelEnum} from "@/server/db/schema";
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = labelEnum.enumValues.map(value => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "review",
    label: "Review",
    icon: CheckCircledIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Lower",
    value: "lower",
    icon: Icons.lower,
  },
  {
    label: "Low",
    value: "low",
    icon: Icons.low,
  },
  {
    label: "Medium",
    value: "medium",
    icon: Icons.medium,
  },
  {
    label: "High",
    value: "high",
    icon: Icons.high,
  },
  {
    label: "Highest",
    value: "highest",
    icon: Icons.highest,
  },
];

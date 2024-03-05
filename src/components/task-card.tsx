"use client";

import {Priority} from "@/constants";
import {Icons} from "@/components/icons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {type Task} from "@/server/schema";
import React from "react";

/**
 * title: title of task
 *
 * priority: priority of task
 */
type TaskCardProps = {
  description: string;
  ticketCode: string;
  voteCount: Task["voteCount"];
  priority: Task["priority"];
};

export const TaskCard = ({
  description,
  ticketCode,
  voteCount = 0,
  priority,
}: TaskCardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, ticketCode: string) => {
    e.dataTransfer.setData("text/plain", ticketCode);
  };

  return (
    <Card
      onDragStart={e => handleDragStart(e, ticketCode)}
      className="w-full flex-1 hover:cursor-pointer hover:shadow-lg"
      draggable>
      <CardHeader>
        <CardDescription className="line-clamp-4 break-words dark:text-white">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="my-1 flex flex-1 flex-row items-center justify-between pb-4">
        <div className="flex items-center justify-center space-x-2">
          <Icons.story />
          <div className="py-1 text-sm font-semibold text-green-700">{ticketCode}</div>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200">
            <span className="text-sm font-semibold  text-gray-700">{voteCount}</span>
          </div>
          <PriorityIcon level={priority} />
          <Icons.user />
        </div>
      </CardContent>
    </Card>
  );
};

const PriorityIcon = ({level}: {level: TaskCardProps["priority"]}) => {
  if (level === Priority.Lower) {
    return <Icons.lower />;
  }
  if (level === Priority.Low) {
    return <Icons.low />;
  }
  if (level === Priority.Medium) {
    return <Icons.medium />;
  }
  if (level === Priority.High) {
    return <Icons.high />;
  }
  if (level === Priority.Highest) {
    return <Icons.highest />;
  }
};

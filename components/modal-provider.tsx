"use client";

import {GenerateIssueModal} from "@/components/generate-issue-modal";
import {TaskModal} from "@/components/task-modal";

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <TaskModal />
      <GenerateIssueModal />
      {children}
    </>
  );
};

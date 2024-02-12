"use client";

import {TaskDetailModal} from "@/components/task-detail-modal";

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <TaskDetailModal />
      {children}
    </>
  );
};

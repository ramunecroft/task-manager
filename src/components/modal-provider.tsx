"use client";

import {TaskModal} from "@/components/task-modal";

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <TaskModal />
      {children}
    </>
  );
};

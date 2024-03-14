import {updateTaskStatus} from "@/client/api/task";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {mutateAtom, taskListAtom, taskModalAtom} from "@/store/task";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import React, {useEffect, useRef} from "react";

export const TaskModalOverview = () => {
  const [taskModal, setTaskModal] = useAtom(taskModalAtom);
  const [isTextareaEdting, setIsTextareEditing] = React.useState(false);
  const [isTitleEdting, setIsTitleEdting] = React.useState(false);
  const taskList = useAtomValue(taskListAtom);
  const textareWrapperRef = useRef<HTMLDivElement | null>(null);
  const inputWrapperAreaRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const mutate = useSetAtom(mutateAtom);

  useEffect(() => {
    if (!taskModal) return;

    const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key === "Enter") {
        setIsTextareEditing(false);
        setIsTitleEdting(false);
        updateTaskStatus({...taskModal})
          .then(() => {})
          .catch(() => {});
        const updated = taskList.map(task => {
          if (task.ticketCode === taskModal.ticketCode) {
            task.description = taskModal.description;
          }
          return task;
        });
        mutate(updated);
        return;
      }
      if (
        textareWrapperRef.current &&
        !textareWrapperRef.current.contains(event.target as Node) &&
        inputWrapperAreaRef.current &&
        !inputWrapperAreaRef.current.contains(event.target as Node)
      ) {
        setIsTextareEditing(false);
        setIsTitleEdting(false);
        updateTaskStatus({...taskModal})
          .then(() => {})
          .catch(() => {});
        const updated = taskList.map(task => {
          if (task.ticketCode === taskModal.ticketCode) {
            task.description = taskModal.description;
          }
          return task;
        });
        mutate(updated);
        return;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, [textareWrapperRef, inputWrapperAreaRef, taskModal]);

  const onChangeTaskModal = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.currentTarget.name;
    setTaskModal(prev => {
      if (!prev) return prev;
      return {...prev, [name]: e.target.value};
    });
  };

  return (
    <div id="task-detail-modal-overfiew" className="max-w-[780px col-span-4 grid">
      <div className="row-span-1 flex flex-col gap-2">
        <div
          ref={inputWrapperAreaRef}
          onDoubleClick={() => setIsTitleEdting(true)}
          className="flex items-center justify-start">
          {isTitleEdting ? (
            <Input
              ref={inputRef}
              onChange={onChangeTaskModal}
              name="title"
              value={taskModal?.title}
            />
          ) : (
            <p className="text-3xl font-bold">{taskModal?.title}</p>
          )}
        </div>
        <div className="flex flex-grow justify-start">
          {/* Todo Icons */}
          {/* <UserIcon />
          <UserIcon />
          <UserIcon />
          <UserIcon />
          <UserIcon />
          <UserIcon /> */}
        </div>
      </div>
      <div className="row-span-12 flex flex-col">
        <p className="text-gray-400">Description</p>
        <div
          ref={textareWrapperRef}
          onDoubleClick={() => setIsTextareEditing(true)}
          className="flex flex-1 flex-col bg-gray-100 p-1">
          <div className="flex h-full w-full flex-col items-start justify-start">
            {isTextareaEdting ? (
              <Textarea
                name="description"
                onChange={onChangeTaskModal}
                value={taskModal?.description}
                ref={textareaRef}
                className="h-full w-full resize-none"
              />
            ) : (
              <span>{taskModal?.description}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
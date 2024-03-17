import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useTaskMutation} from "@/hooks/use-task-mutation";
import {taskModalStateAtom} from "@/store/task";
import {useAtom} from "jotai";
import React from "react";

export const TaskModalOverview = () => {
  const {mutate: taskMutate, isSuccess: isTaskMutateSuccess} = useTaskMutation();
  const [taskModalState, setTaskModal] = useAtom(taskModalStateAtom);
  const [isTextareaEdting, setIsTextareEditing] = React.useState(false);
  const [isTitleEdting, setIsTitleEdting] = React.useState(false);

  React.useEffect(() => {
    if (isTaskMutateSuccess) {
      setIsTextareEditing(false);
      setIsTitleEdting(false);
    }
  }, [isTaskMutateSuccess]);

  if (!taskModalState) return null;

  const onChangeTaskModal = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.currentTarget.name;
    setTaskModal(prev => {
      if (!prev) return prev;
      return {...prev, [name]: e.target.value};
    });
  };

  const onKeyDownSave = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      taskMutate({
        ...taskModalState,
      });
    }
  };

  return (
    <div id="task-detail-modal-overfiew" className="max-w-[780px col-span-4 grid">
      <div className="row-span-1 flex flex-col gap-2">
        <div
          onDoubleClick={() => setIsTitleEdting(true)}
          className="flex items-center justify-start">
          {isTitleEdting ? (
            <Input
              onKeyDown={onKeyDownSave}
              onChange={onChangeTaskModal}
              name="title"
              value={taskModalState?.title}
            />
          ) : (
            <p className="text-3xl font-bold">{taskModalState?.title}</p>
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
          onDoubleClick={() => setIsTextareEditing(true)}
          className="flex flex-1 flex-col bg-gray-100 p-1">
          <div className="flex h-full w-full flex-col items-start justify-start">
            {isTextareaEdting ? (
              <Textarea
                onKeyDown={onKeyDownSave}
                name="description"
                onChange={onChangeTaskModal}
                value={taskModalState?.description}
                className="h-full w-full resize-none"
              />
            ) : (
              <span>{taskModalState?.description}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

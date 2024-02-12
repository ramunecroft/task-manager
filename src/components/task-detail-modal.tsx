import {PriorityIcon} from "@/components/task-card";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {selectedTaskAtom, showTaskModalAtom} from "@/store/task";
import {useAtom, useAtomValue} from "jotai";

export const TaskDetailModal = () => {
  const [showTaskModal, setShowTaskModal] = useAtom(showTaskModalAtom);
  const selectedTask = useAtomValue(selectedTaskAtom);
  if (!selectedTask) return;

  return (
    <Dialog open={showTaskModal} onOpenChange={setShowTaskModal}>
      <DialogContent
        role={"task-modal"}
        className="mx-auto my-8 flex h-3/4 w-full max-w-md flex-col items-start rounded-lg bg-white p-4 shadow-lg sm:max-w-xl md:max-w-2xl">
        <div className="flex flex-row items-center ">
          <PriorityIcon level={selectedTask.priority} />
          <p>{selectedTask.ticketCode}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import {Icons} from "@/components/icons";
import {PriorityIcon} from "@/components/task-card";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {selectedTaskAtom, showTaskModalAtom} from "@/store/task";
import {useAtom, useAtomValue} from "jotai";

export const TaskDetailModal = () => {
  const [showTaskModal, setShowTaskModal] = useAtom(showTaskModalAtom);
  const selectedTask = useAtomValue(selectedTaskAtom);

  return (
    <Dialog open={showTaskModal} onOpenChange={setShowTaskModal}>
      <DialogContent className="h-3/4 min-w-[800px] flex-col items-start">
        <div className="flex flex-row items-center ">
          <PriorityIcon level={selectedTask?.priority ?? "medium"} />
          <p>{selectedTask?.ticketCode}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

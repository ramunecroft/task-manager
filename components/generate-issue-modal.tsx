import {Separator} from "@/components/ui/separator";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {generateIssueModalAtom} from "@/store";
import {useAtom} from "jotai";
import React from "react";

export const GenerateIssueModal = () => {
  const [showGenerateIssueModal, setShowGenerateIssueModal] =
    useAtom(generateIssueModalAtom);
  return (
    <Dialog open={showGenerateIssueModal} onOpenChange={setShowGenerateIssueModal}>
      <DialogContent
        role={"task-modal"}
        className="mx-auto my-8 flex h-3/4 max-w-md flex-col items-start rounded-lg bg-white p-4 shadow-lg sm:max-w-xl md:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Create Issue</DialogTitle>
        </DialogHeader>
        <Separator className="h-[2px]" />
      </DialogContent>
    </Dialog>
  );
};

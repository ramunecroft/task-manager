import {TaskCard} from "@/components/task-card";
import {useTaskList} from "@/hooks/use-task-list";
import {showTaskModalAtom} from "@/store/task";
import {createWrapper} from "@/tests/utils";
import {fireEvent, render, renderHook, screen, waitFor} from "@testing-library/react";
import {useAtomValue} from "jotai";

describe("TaskCard Test", () => {
  test("render task card", async () => {
    const taskProps = {
      description: "Test Task",
      ticketCode: "TST-01",
      voteCount: 3,
    };

    const {result} = renderHook(() => useTaskList(), {wrapper: createWrapper()});

    render(<TaskCard priority={"medium"} {...taskProps} />, {wrapper: createWrapper()});

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(screen.getByText(taskProps.description)).toBeInTheDocument();
      expect(screen.getByText(taskProps.ticketCode)).toBeInTheDocument();
      expect(screen.getByText(taskProps.voteCount.toString())).toBeInTheDocument();
    });
  });

  test("taskcard on click open modal", () => {
    const showTaskModal = renderHook(() => useAtomValue(showTaskModalAtom));
    const testDescription = "hello";
    const testTicketCode = "T3";
    const testVoteCount = 5;
    const {getByRole} = render(
      <TaskCard
        description={testDescription}
        priority={"low"}
        ticketCode={testTicketCode}
        voteCount={testVoteCount}
      />,
      {wrapper: createWrapper()}
    );
    fireEvent.click(getByRole("task-card"));
    expect(showTaskModal.result.current).toBe(true);
  });
});

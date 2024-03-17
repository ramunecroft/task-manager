import {TaskCard} from "@/components/task-card";
import {useTaskList} from "@/hooks/use-task-list";
import {showTaskModalAtom} from "@/store/task";
import {taskCardProps} from "@/tests/fixtures/task";
import {createWrapper} from "@/tests/utils";
import {fireEvent, render, renderHook, screen, waitFor} from "@testing-library/react";
import {useAtomValue} from "jotai";

describe("TaskCard Test", () => {
  test("render task card", async () => {
    const {result} = renderHook(() => useTaskList(), {wrapper: createWrapper()});

    render(<TaskCard {...taskCardProps} />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(screen.getByText(taskCardProps.description)).toBeInTheDocument();
      expect(screen.getByText(taskCardProps.ticketCode)).toBeInTheDocument();
      expect(screen.getByText(taskCardProps.voteCount.toString())).toBeInTheDocument();
    });
  });

  test("taskcard on click open modal", () => {
    const showTaskModal = renderHook(() => useAtomValue(showTaskModalAtom));

    const {getByRole} = render(<TaskCard {...taskCardProps} />, {
      wrapper: createWrapper(),
    });
    fireEvent.click(getByRole("task-card"));
    expect(showTaskModal.result.current).toBe(true);
  });
});

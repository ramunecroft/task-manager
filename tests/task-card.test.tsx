import {TaskCard} from "@/components/task-card";
import {useTaskList} from "@/hooks/use-task-list";
import {showTaskModalAtom} from "@/store/task";
import {taskCardProps} from "@/tests/fixtures/task";
import {createWrapper} from "@/tests/utils";
import {fireEvent, render, renderHook, screen, waitFor} from "@testing-library/react";
import {useAtomValue} from "jotai";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {username: "admin"},
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: "authenticated"}; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

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

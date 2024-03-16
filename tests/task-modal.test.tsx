import {TaskModal} from "@/components/task-modal";
import {useTaskList} from "@/hooks/use-task-list";
import {showTaskModalAtom} from "@/store/task";
import {createWrapper} from "@/tests/utils";
import {
  fireEvent,
  getByTestId,
  render,
  renderHook,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import {useAtomValue, useSetAtom} from "jotai";

describe("Modal Test", () => {
  test("render task modal", async () => {
    const {result} = renderHook(() => useTaskList(), {wrapper: createWrapper()});
    const {container} = render(<TaskModal />, {wrapper: createWrapper()});

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(container).toMatchSnapshot();
    });
  });

  test("modal on click close modal", () => {
    const showTaskModal = renderHook(() => useAtomValue(showTaskModalAtom));
    const setShowTaskModal = renderHook(() => useSetAtom(showTaskModalAtom));
    act(() => {
      setShowTaskModal.result.current(true);
    });
    render(<TaskModal />, {wrapper: createWrapper()});
    const closeButton = screen.getByTestId("close-modal");
    fireEvent.click(closeButton);

    expect(showTaskModal.result.current).toBe(false);
  });
});

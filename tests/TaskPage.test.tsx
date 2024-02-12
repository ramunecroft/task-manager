import TaskPage from "@/app/task/page";
import {ModalProvider} from "@/components/modal-provider";
import {TaskCard} from "@/components/task-card";
import {TaskDetailModal} from "@/components/task-detail-modal";
import {showTaskModalAtom} from "@/store/task";
import "@testing-library/jest-dom";
import {fireEvent, render, renderHook, screen} from "@testing-library/react";
import {useAtomValue} from "jotai";

describe("Page render test", () => {
  it("renders a heading", () => {
    const {container} = render(<TaskPage />);
    expect(container).toMatchSnapshot();

    const testDescription = "hello";
    const testTicketCode = "T3";
    const testVoteCount = 5;

    render(
      <TaskCard
        description={testDescription}
        priority={"low"}
        ticketCode={testTicketCode}
        voteCount={testVoteCount}
      />
    );

    const descriptionElement = screen.getByText(testDescription);
    const ticketCodeElement = screen.getByText(testTicketCode);
    const voteCountElement = screen.getByText(testVoteCount);
    expect(descriptionElement).toBeInTheDocument();
    expect(ticketCodeElement).toBeInTheDocument();
    expect(voteCountElement).toBeInTheDocument();
  });
});

describe("TaskCard on Click Test", () => {
  it("button", () => {
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
      />
    );

    fireEvent.click(getByRole("task-card"));

    expect(showTaskModal.result.current).toBe(true);
  });
});

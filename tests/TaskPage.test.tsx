import TaskPage from "@/app/task/page";
import {TaskCard} from "@/components/task-card";
import {showTaskModalAtom} from "@/store/task";
import "@testing-library/jest-dom";
import {fireEvent, render, renderHook, screen, waitFor} from "@testing-library/react";
import "cross-fetch/polyfill";
import {useAtomValue} from "jotai";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    headers: {
      get: jest.fn().mockReturnValue("application/json"),
    },
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("Page render test", () => {
  const {container} = render(<TaskPage />);

  it("renders a heading", async () => {
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

    await waitFor(() => {
      const descriptionElement = screen.getByText(testDescription);
      const ticketCodeElement = screen.getByText(testTicketCode);
      const voteCountElement = screen.getByText(testVoteCount);
      expect(descriptionElement).toBeInTheDocument();
      expect(ticketCodeElement).toBeInTheDocument();
      expect(voteCountElement).toBeInTheDocument();
    });
  });
});

// describe("TaskCard on Click Test", () => {
//   it("button", () => {
//     const showTaskModal = renderHook(() => useAtomValue(showTaskModalAtom));
//     const testDescription = "hello";
//     const testTicketCode = "T3";
//     const testVoteCount = 5;
//     const {getByRole} = render(
//       <TaskCard
//         description={testDescription}
//         priority={"low"}
//         ticketCode={testTicketCode}
//         voteCount={testVoteCount}
//       />
//     );

//     fireEvent.click(getByRole("task-card"));

//     expect(showTaskModal.result.current).toBe(true);
//   });
// });

import TaskPage from "@/app/task/page";
import {createWrapper} from "@/tests/utils";
import {render} from "@testing-library/react";

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

describe("Page render test", () => {
  const {container} = render(<TaskPage />, {wrapper: createWrapper()});

  it("render task page", () => {
    expect(container).toBeInTheDocument();
  });
});

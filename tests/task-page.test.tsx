import TaskPage from "@/app/task/page";
import {createWrapper} from "@/tests/utils";
import {render} from "@testing-library/react";

describe("Page render test", () => {
  const {container} = render(<TaskPage />, {wrapper: createWrapper()});

  it("render task page", () => {
    expect(container).toMatchSnapshot();
  });
});

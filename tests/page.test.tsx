import "@testing-library/jest-dom";
import TaskPage from "@/app/task/page";
import {render} from "@testing-library/react";

describe("Page", () => {
  it("renders a heading", () => {
    const {container} = render(<TaskPage />);
    expect(container).toMatchSnapshot();
  });
});

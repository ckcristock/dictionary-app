import { render, screen } from "@testing-library/react";
import DefinitionResult from "./DefinitionResult";

describe("DefinitionResult", () => {
  it("renders default message when no word is searched", () => {
    render(<DefinitionResult />);
    const message = screen.getByText(/no word searched yet/i);
    expect(message).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { Provider } from "react-redux";
import { store } from "../store/index";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("SearchBar", () => {
  it("renders the input field", () => {
    renderWithProviders(
      <SearchBar
        search={""}
        setSearch={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        onSearch={function (term?: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const input = screen.getByPlaceholderText(/search for a word/i);
    expect(input).toBeInTheDocument();
  });

  it("validates empty submission", () => {
    renderWithProviders(
      <SearchBar
        search={""}
        setSearch={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        onSearch={function (term?: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText(/please enter a word/i)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import { Provider } from "react-redux";
import { store } from "../store";
import * as redux from "@/app/hooks/redux";
import { toggleTheme } from "@/app/store/themeSlice";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("ThemeToggle", () => {
  it("renders the toggle button after mount", () => {
    renderWithProviders(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it("dispatches toggleTheme on click", () => {
    const dispatchSpy = jest.fn();
    jest.spyOn(redux, "useAppDispatch").mockReturnValue(dispatchSpy);
    jest.spyOn(redux, "useAppSelector").mockReturnValue("light");

    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);

    expect(dispatchSpy).toHaveBeenCalledWith(toggleTheme());
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import FontSelector from "./FontSelector";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { setFont } from "../store/fontSlice";

const mockStore = configureStore([]);

describe("FontSelector", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      font: "sans",
    });

    store.dispatch = jest.fn();
  });

  it("renders all font options", () => {
    render(
      <Provider store={store}>
        <FontSelector />
      </Provider>
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Sans Serif" })
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Serif" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Monospace" })
    ).toBeInTheDocument();
  });

  it("dispatches setFont action on change", () => {
    render(
      <Provider store={store}>
        <FontSelector />
      </Provider>
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "serif" } });

    expect(store.dispatch).toHaveBeenCalledWith(setFont("serif"));
  });
});

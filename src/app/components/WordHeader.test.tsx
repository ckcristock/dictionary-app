import { render, screen, fireEvent } from "@testing-library/react";
import WordHeader from "./WordHeader";

describe("WordHeader", () => {
  const mockOnPlay = jest.fn();

  beforeEach(() => {
    mockOnPlay.mockClear(); // limpia mock antes de cada test
  });

  it("renders the word and phonetic text", () => {
    render(
      <WordHeader word="example" phonetic="/ɪɡˈzɑːmpəl/" onPlay={mockOnPlay} />
    );

    expect(screen.getByText("example")).toBeInTheDocument();
    expect(screen.getByText("/ɪɡˈzɑːmpəl/")).toBeInTheDocument();
  });

  it("calls onPlay when play button is clicked", () => {
    render(
      <WordHeader word="example" phonetic="/ɪɡˈzɑːmpəl/" onPlay={mockOnPlay} />
    );

    const button = screen.getByRole("button", {
      name: /play pronunciation/i,
    });

    fireEvent.click(button);
    expect(mockOnPlay).toHaveBeenCalledTimes(1);
  });
});

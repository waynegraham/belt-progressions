import { fireEvent, render, screen } from "@testing-library/react";
import MoveTestMode from "@/components/MoveTestMode";
import type { BeltMove, BeltTheme } from "@/lib/belt-data";

const theme: BeltTheme = {
  pageBg: "",
  cardBg: "",
  border: "",
  accent: "bg-blue-700",
  accentMuted: "bg-blue-700/20 text-blue-100",
  text: "",
  trackBar: "",
};

const moves: BeltMove[] = [
  {
    id: "second",
    name: "Second Move",
    summary: "Second summary",
    order: 2,
    tags: ["guard"],
    youtubeUrl: "https://www.youtube.com/watch?v=second",
  },
  {
    id: "first",
    name: "First Move",
    summary: "First summary",
    order: 1,
    tags: ["pass"],
    youtubeUrl: "https://www.youtube.com/watch?v=first",
  },
];

describe("MoveTestMode", () => {
  it("shows moves in order and advances with keyboard navigation", () => {
    render(<MoveTestMode moves={moves} theme={theme} onExit={jest.fn()} />);

    expect(screen.getByText("First Move")).toBeInTheDocument();
    expect(screen.getByText("Move 1 of 2")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(screen.getByText("Second Move")).toBeInTheDocument();
    expect(screen.getByText("Move 2 of 2")).toBeInTheDocument();
  });

  it("shows completion screen after the final move", () => {
    render(<MoveTestMode moves={moves} theme={theme} onExit={jest.fn()} />);

    fireEvent.keyDown(window, { key: "ArrowRight" });
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByText("Completion")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Restart" })).toBeInTheDocument();
  });

  it("calls onExit when exit is clicked", () => {
    const onExit = jest.fn();
    render(<MoveTestMode moves={moves} theme={theme} onExit={onExit} />);

    fireEvent.click(screen.getByRole("button", { name: "Exit Fullscreen" }));
    expect(onExit).toHaveBeenCalledTimes(1);
  });

  it("shows empty state when there are no moves", () => {
    render(<MoveTestMode moves={[]} theme={theme} onExit={jest.fn()} />);

    expect(screen.getByText("No moves available.")).toBeInTheDocument();
  });

  it("uses configurable completion rank label", () => {
    render(
      <MoveTestMode
        moves={moves}
        theme={theme}
        onExit={jest.fn()}
        completionRankLabel="brown"
      />,
    );

    fireEvent.keyDown(window, { key: "ArrowRight" });
    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(screen.getByText("Congratulations, you're now a brown belt.")).toBeInTheDocument();
  });

  it("uses configurable jump label when jump target exists", () => {
    const jumpMoves: BeltMove[] = [
      {
        id: "first",
        name: "First Move",
        summary: "First summary",
        order: 1,
        tags: ["pass"],
        youtubeUrl: "https://www.youtube.com/watch?v=first",
      },
      {
        id: "jump",
        name: "Standing Defenses",
        summary: "Jump point",
        order: 2,
        tags: ["standing defenses from the front"],
        youtubeUrl: "https://www.youtube.com/watch?v=jump",
      },
    ];

    render(
      <MoveTestMode
        moves={jumpMoves}
        theme={theme}
        onExit={jest.fn()}
        jumpLabel="Jump to Brown"
      />,
    );

    expect(screen.getByRole("button", { name: "Jump to Brown" })).toBeInTheDocument();
  });
});

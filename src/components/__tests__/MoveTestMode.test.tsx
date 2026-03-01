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
  it("shows moves in order and toggles reveal details", () => {
    render(<MoveTestMode moves={moves} theme={theme} />);

    expect(screen.getByText("First Move")).toBeInTheDocument();
    expect(screen.getByText("1/2")).toBeInTheDocument();
    expect(screen.getByText("Hidden until revealed.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reveal Details" }));

    expect(screen.getByText("First summary")).toBeInTheDocument();
    expect(screen.getByText("pass")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hide Details" })).toBeInTheDocument();
  });

  it("wraps previous/next navigation and resets revealed state", () => {
    render(<MoveTestMode moves={moves} theme={theme} />);

    fireEvent.click(screen.getByRole("button", { name: "Reveal Details" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));

    expect(screen.getByText("Second Move")).toBeInTheDocument();
    expect(screen.getByText("2/2")).toBeInTheDocument();
    expect(screen.getByText("Hidden until revealed.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(screen.getByText("First Move")).toBeInTheDocument();
    expect(screen.getByText("1/2")).toBeInTheDocument();
  });

  it("shows empty state when there are no moves", () => {
    render(<MoveTestMode moves={[]} theme={theme} />);

    expect(screen.getByText("No moves available for this belt yet.")).toBeInTheDocument();
  });
});

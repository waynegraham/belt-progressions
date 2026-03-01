import { fireEvent, render, screen } from "@testing-library/react";
import BeltMovesPage from "@/components/BeltMovesPage";
import type { BeltMove, BeltTrack } from "@/lib/belt-data";

const mockPush = jest.fn();
const mockReplace = jest.fn();
let mockPathname = "/white-to-blue";
let mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
}));

jest.mock("next/link", () => {
  return function MockedLink({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

const move1: BeltMove = {
  id: "m1",
  name: "Alpha Pass",
  summary: "Pressure pass to side control.",
  order: 1,
  tags: ["passing"],
  youtubeUrl: "https://www.youtube.com/watch?v=abc123",
};

const move2: BeltMove = {
  id: "m2",
  name: "Beta Sweep",
  summary: "Basic butterfly sweep.",
  order: 2,
  tags: ["guard"],
  youtubeUrl: "https://youtu.be/xyz987?t=1m2s",
};

const move3: BeltMove = {
  id: "m3",
  name: "Broken Link Move",
  summary: "Used to verify embed fallback.",
  order: 3,
  tags: ["fallback"],
  youtubeUrl: "not-a-url",
};

const track: BeltTrack = {
  slug: "white-to-blue",
  label: "White to Blue",
  subtitle: "Foundations",
  theme: {
    pageBg: "",
    cardBg: "",
    border: "",
    accent: "bg-blue-700",
    accentMuted: "bg-blue-700/20 text-blue-100",
    text: "",
    trackBar: "",
  },
  moves: [move1, move2, move3],
  moveCategories: [
    {
      id: "passes",
      label: "Passes",
      moves: [move1],
    },
    {
      id: "sweeps",
      label: "Sweeps",
      moves: [move2, move3],
    },
  ],
  trainingRecommendations: [],
};

describe("BeltMovesPage", () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockReplace.mockReset();
    mockPathname = "/white-to-blue";
    mockSearchParams = new URLSearchParams();
  });

  it("filters move results from search input and shows empty state", () => {
    render(<BeltMovesPage track={track} />);

    expect(screen.getByRole("link", { name: "Alpha Pass" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Beta Sweep" })).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox", { name: "Search techniques" }), {
      target: { value: "guard" },
    });

    expect(screen.queryByRole("link", { name: "Alpha Pass" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Beta Sweep" })).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox", { name: "Search techniques" }), {
      target: { value: "no-matches-here" },
    });

    expect(screen.getByText("No moves match that search.")).toBeInTheDocument();
  });

  it("toggles test mode", () => {
    render(<BeltMovesPage track={track} />);

    fireEvent.click(screen.getByRole("button", { name: "Test Mode" }));

    expect(screen.getByRole("button", { name: "Exit Test Mode" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Exit Fullscreen" })).toBeInTheDocument();
    expect(screen.getByText("Move 1 of 3")).toBeInTheDocument();
  });

  it("opens video modal from URL param and closes it", () => {
    mockSearchParams = new URLSearchParams("video=m2");
    render(<BeltMovesPage track={track} />);

    expect(screen.getByRole("dialog", { name: "Beta Sweep video" })).toBeInTheDocument();
    expect(screen.getByTitle("Beta Sweep")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/xyz987?rel=0&start=62",
    );

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(mockReplace).toHaveBeenCalledWith("/white-to-blue", { scroll: false });
  });

  it("pushes video query param when clicking a move link", () => {
    mockSearchParams = new URLSearchParams("foo=bar");
    render(<BeltMovesPage track={track} />);

    fireEvent.click(screen.getByRole("link", { name: "Alpha Pass" }));

    expect(mockPush).toHaveBeenCalledWith("/white-to-blue?foo=bar&video=m1", { scroll: false });
  });

  it("shows fallback when video URL cannot be embedded", () => {
    mockSearchParams = new URLSearchParams("video=m3");
    render(<BeltMovesPage track={track} />);

    expect(screen.getByText("Unable to embed this video.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open on YouTube" })).toHaveAttribute("href", "not-a-url");
  });
});

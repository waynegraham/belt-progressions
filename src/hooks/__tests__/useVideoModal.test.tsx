import { fireEvent, render, screen } from "@testing-library/react";
import { useVideoModal } from "@/hooks/useVideoModal";
import type { BeltMove } from "@/lib/belt-data";

const moves: BeltMove[] = [
  {
    id: "m1",
    name: "Alpha",
    summary: "Alpha summary",
    order: 1,
    tags: ["one"],
    youtubeUrl: "https://youtu.be/xyz987?t=1m2s",
  },
  {
    id: "m2",
    name: "Beta",
    summary: "Beta summary",
    order: 2,
    tags: ["two"],
    youtubeUrl: "https://www.youtube.com/watch?v=abc123",
  },
];

interface HarnessProps {
  search: string;
  pathname?: string;
  push?: jest.Mock;
  replace?: jest.Mock;
}

function Harness({
  search,
  pathname = "/white-to-blue",
  push,
  replace,
}: HarnessProps) {
  const router = {
    push: push ?? jest.fn(),
    replace: replace ?? jest.fn(),
  };
  const searchParams = new URLSearchParams(search);
  const {
    activeMove,
    activeEmbedUrl,
    openVideoModal,
    closeVideoModal,
    mainRef,
    dialogRef,
    closeButtonRef,
  } = useVideoModal({
    allMoves: moves,
    currentPathname: pathname,
    searchParams,
    searchParamsString: searchParams.toString(),
    router,
  });

  return (
    <main ref={mainRef}>
      <button type="button" onClick={() => openVideoModal("m1")}>
        Open m1
      </button>
      <button type="button" onClick={closeVideoModal}>
        Close
      </button>
      {activeMove ? (
        <div ref={dialogRef}>
          <button ref={closeButtonRef} type="button">
            Close Modal
          </button>
        </div>
      ) : null}
      <div data-testid="active-name">{activeMove?.name ?? ""}</div>
      <div data-testid="active-embed">{activeEmbedUrl ?? ""}</div>
    </main>
  );
}

describe("useVideoModal", () => {
  it("pushes merged query params when opening a video", () => {
    const push = jest.fn();
    render(<Harness search="foo=bar" push={push} />);

    fireEvent.click(screen.getByRole("button", { name: "Open m1" }));

    expect(push).toHaveBeenCalledWith("/white-to-blue?foo=bar&video=m1", {
      scroll: false,
    });
  });

  it("removes only video param when closing", () => {
    const replace = jest.fn();
    render(<Harness search="foo=bar&video=m1" replace={replace} />);

    fireEvent.click(screen.getByText("Close"));

    expect(replace).toHaveBeenCalledWith("/white-to-blue?foo=bar", {
      scroll: false,
    });
  });

  it("derives active move and embed url from query param", () => {
    render(<Harness search="video=m1" />);

    expect(screen.getByTestId("active-name")).toHaveTextContent("Alpha");
    expect(screen.getByTestId("active-embed")).toHaveTextContent(
      "https://www.youtube.com/embed/xyz987?rel=0&start=62",
    );
  });

  it("closes on Escape when modal is active", () => {
    const replace = jest.fn();
    render(<Harness search="video=m1" replace={replace} />);

    fireEvent.keyDown(window, { key: "Escape" });

    expect(replace).toHaveBeenCalledWith("/white-to-blue", { scroll: false });
  });
});

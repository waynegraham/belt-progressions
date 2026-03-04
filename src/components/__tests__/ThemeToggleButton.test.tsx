import { fireEvent, render, screen } from "@testing-library/react";
import ThemeToggleButton from "@/components/ThemeToggleButton";

describe("ThemeToggleButton", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("toggles the theme and updates aria state", () => {
    render(<ThemeToggleButton />);

    const button = screen.getByRole("button", {
      name: /switch to dark theme/i,
    });
    expect(button).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-label", "Switch to light theme");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });
});

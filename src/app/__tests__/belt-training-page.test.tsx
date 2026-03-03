import { render, screen } from "@testing-library/react";
import BeltTrainingPage from "@/app/[belt]/training/page";

const mockNotFound = jest.fn(() => {
  throw new Error("NOT_FOUND");
});

jest.mock("next/navigation", () => ({
  notFound: () => mockNotFound(),
}));

describe("BeltTrainingPage route coordinator", () => {
  beforeEach(() => {
    mockNotFound.mockClear();
  });

  it("renders the white-to-blue guide for white-to-blue slug", async () => {
    const element = await BeltTrainingPage({
      params: Promise.resolve({ belt: "white-to-blue" }),
    });

    render(element);

    expect(screen.getByRole("heading", { name: "Test Preparation Guide" })).toBeInTheDocument();
    expect(screen.getByText("Blue Belt Test Preparation")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How to Ask Better Questions" })).toBeInTheDocument();
  });

  it("renders the blue-to-purple guide for blue-to-purple slug", async () => {
    const element = await BeltTrainingPage({
      params: Promise.resolve({ belt: "blue-to-purple" }),
    });

    render(element);

    expect(screen.getByRole("heading", { name: "Test Preparation Guide" })).toBeInTheDocument();
    expect(screen.getByText("Purple Belt Test Preparation")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Show Your Game" })).toBeInTheDocument();
  });

  it("renders generic guide for purple-to-brown slug", async () => {
    const element = await BeltTrainingPage({
      params: Promise.resolve({ belt: "purple-to-brown" }),
    });

    render(element);

    expect(screen.getByRole("heading", { name: "Test Preparation Guide" })).toBeInTheDocument();
    expect(screen.getByText("Brown Belt Test Preparation")).toBeInTheDocument();
    expect(
      screen.getByText("Use this page to structure weekly sessions and prepare for evaluation."),
    );
    expect(screen.getByText("Constraint-Based Sparring")).toBeInTheDocument();
  });

  it("calls notFound for invalid slugs", async () => {
    await expect(
      BeltTrainingPage({
        params: Promise.resolve({ belt: "not-a-real-belt" }),
      }),
    ).rejects.toThrow("NOT_FOUND");

    expect(mockNotFound).toHaveBeenCalledTimes(1);
  });
});

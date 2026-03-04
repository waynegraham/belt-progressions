import {
  blueToPurpleGuideContent,
  whiteToBlueGuideContent,
} from "@/lib/training-guide-content";

function hasUniqueValues(values: string[]): boolean {
  return new Set(values).size === values.length;
}

describe("training guide content contracts", () => {
  it("uses unique on-page link anchors for each guide", () => {
    expect(
      hasUniqueValues(
        whiteToBlueGuideContent.onPageLinks.map((link) => link.href),
      ),
    ).toBe(true);
    expect(
      hasUniqueValues(
        blueToPurpleGuideContent.onPageLinks.map((link) => link.href),
      ),
    ).toBe(true);
  });

  it("uses unique week labels in 30-day plans", () => {
    expect(
      hasUniqueValues(
        whiteToBlueGuideContent.thirtyDayPlan.map((phase) => phase.week),
      ),
    ).toBe(true);
    expect(
      hasUniqueValues(
        blueToPurpleGuideContent.thirtyDayPlan.map((phase) => phase.week),
      ),
    ).toBe(true);
  });

  it("keeps callout copy non-empty", () => {
    expect(
      whiteToBlueGuideContent.overview.nonNegotiable.content.trim().length,
    ).toBeGreaterThan(0);
    expect(
      whiteToBlueGuideContent.sharkTank.callout.content.trim().length,
    ).toBeGreaterThan(0);
    expect(
      blueToPurpleGuideContent.showYourGame.callout.content.trim().length,
    ).toBeGreaterThan(0);
    expect(
      blueToPurpleGuideContent.sharkTank.callout.content.trim().length,
    ).toBeGreaterThan(0);
  });

  it("keeps example structure titles unique", () => {
    const titles = blueToPurpleGuideContent.showYourGame.exampleStructure.map(
      (item) => item.title,
    );
    expect(hasUniqueValues(titles)).toBe(true);
  });
});

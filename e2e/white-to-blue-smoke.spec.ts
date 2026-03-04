import { expect, test } from "@playwright/test";

test("white-to-blue smoke flow", async ({ page }) => {
  await page.goto("/white-to-blue");

  const searchInput = page.getByRole("textbox", { name: "Search techniques" });
  await expect(searchInput).toBeVisible();

  await searchInput.fill("guard");
  const moveLink = page.locator('a[href*="video="]').first();
  await expect(moveLink).toBeVisible();

  await moveLink.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);

  await page.getByRole("button", { name: "Test Mode" }).click();
  await expect(
    page.getByRole("button", { name: "Exit Fullscreen" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Exit Fullscreen" }).click();
  await expect(page.getByRole("button", { name: "Test Mode" })).toBeVisible();
});

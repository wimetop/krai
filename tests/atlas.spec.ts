import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("readable layouts keep headings and controls inside narrow viewports", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const clipped = await page
      .locator("h1,h2,h3,.intro-stamp,.route-title > div")
      .evaluateAll((elements) =>
        elements
          .filter((el) => {
            if (!(el as HTMLElement).offsetParent) return false;
            const box = el.getBoundingClientRect();
            return box.left < -1 || box.right > innerWidth + 1;
          })
          .map((el) => el.textContent),
      );
    expect(clipped, `Clipped content at ${width}px`).toEqual([]);
  }
});

test("accessibility baseline has no critical or serious violations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  const failures = audit.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
  expect(
    failures.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        reason: n.failureSummary,
      })),
    })),
  ).toEqual([]);
});

test("page hydrates without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Синевир — озеро" }).click();
  expect(errors).toEqual([]);
});

test("atlas map supports selection and archive filters stay coherent", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Синевир — озеро" }).click();
  await expect(page.locator(".map-preview h3")).toHaveText("Синевир");
  await page.getByRole("button", { name: "Звуки", exact: true }).click();
  await expect(page.locator(".archive-item")).toHaveCount(2);
  await page.getByRole("button", { name: "Усе", exact: true }).click();
  await expect(page.locator(".archive-item")).toHaveCount(6);
});

test("recording simulation pauses and story dialog closes with Escape", async ({
  page,
}) => {
  await page.goto("/");
  const play = page.getByRole("button", {
    name: "Відтворити: Дощ на полонині",
  });
  await play.click();
  await expect(
    page.getByRole("button", { name: "Пауза: Дощ на полонині" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Пауза: Дощ на полонині" }).click();
  await expect(play).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Читати легенду" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("mobile navigation, imagery and page width are sound", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Відкрити меню" }).click();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: "Голоси" })
    .click();
  await expect(page.locator("#mobile-nav")).not.toBeVisible();
  await expect(page).toHaveURL(/#voices$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  for (const image of await page.locator("img").all()) {
    if (!(await image.isVisible())) continue;
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate((img) => (img as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0);
  }
});

import { test, expect } from "@playwright/test";

const ANCHORS = ["services", "engagements", "contact"] as const;

// Header sticky h-16 (64px) + scroll-padding-top 5rem (80px). On tolère une marge.
const MAX_TOP_OFFSET = 120;
const MIN_TOP_OFFSET = -10;

for (const id of ANCHORS) {
  test(`l'ancre #${id} se cale sous le header au chargement direct`, async ({ page }) => {
    await page.goto(`/#${id}`, { waitUntil: "load" });

    const section = page.locator(`#${id}`);
    await expect(section).toBeVisible();

    // Laisse le navigateur appliquer le scroll-padding et le scroll initial
    await page.waitForTimeout(600);

    const top = await section.evaluate((el) => el.getBoundingClientRect().top);
    expect(top, `#${id} doit être visible juste sous le header (top=${top}px)`).toBeGreaterThan(
      MIN_TOP_OFFSET,
    );
    expect(top, `#${id} ne doit pas être masqué par le header (top=${top}px)`).toBeLessThan(
      MAX_TOP_OFFSET,
    );
  });
}

test("clic sur les liens d'ancre du hero met à jour le hash et scroll", async ({ page }) => {
  await page.goto("/");
  for (const id of ANCHORS) {
    await page.locator(`a[href="#${id}"]`).first().click();
    await page.waitForTimeout(500);
    expect(page.url()).toContain(`#${id}`);
    const top = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThan(MIN_TOP_OFFSET);
    expect(top).toBeLessThan(MAX_TOP_OFFSET);
  }
});

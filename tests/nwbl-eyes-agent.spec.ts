import { test, expect, Page } from '@playwright/test';

const baseURL = process.env.BASE_URL;

if (!baseURL) {
  throw new Error('BASE_URL is required for NWBL Eyes Agent screenshots.');
}

async function preparePage(page: Page) {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  page.on('requestfailed', (request) => {
    const failure = request.failure();
    failedRequests.push(`${request.url()} :: ${failure?.errorText ?? 'request failed'}`);
  });

  await page.goto(baseURL, { waitUntil: 'networkidle', timeout: 90_000 });
  await page.waitForTimeout(1500);

  return { consoleErrors, failedRequests };
}

async function checkForRawCodeLeaks(page: Page) {
  const bodyText = await page.locator('body').innerText({ timeout: 30_000 });
  const rawCodePatterns = [
    'data:image/svg+xml',
    '<svg',
    'assetPath:',
    'visualSlots',
    'ecosystemCards',
    'function ',
    'const ',
    'export default',
  ];

  const leaks = rawCodePatterns.filter((pattern) => bodyText.includes(pattern));
  expect(leaks, `Possible raw code leak visible on page: ${leaks.join(', ')}`).toEqual([]);
}

async function checkBrokenImages(page: Page) {
  const brokenImages = await page.evaluate(() => {
    return Array.from(document.images)
      .filter((img) => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0)
      .map((img) => img.currentSrc || img.src || img.alt || 'unknown image');
  });

  expect(brokenImages, `Broken images found: ${brokenImages.join('\n')}`).toEqual([]);
}

test.describe('NWBL Eyes Agent', () => {
  test('desktop full page screenshot and QA scan', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1200 });
    const diagnostics = await preparePage(page);

    await page.screenshot({
      path: 'screenshots/desktop-home-full.png',
      fullPage: true,
    });

    await checkForRawCodeLeaks(page);
    await checkBrokenImages(page);

    expect(diagnostics.consoleErrors, `Console errors found: ${diagnostics.consoleErrors.join('\n')}`).toEqual([]);
    expect(diagnostics.failedRequests, `Failed requests found: ${diagnostics.failedRequests.join('\n')}`).toEqual([]);
  });

  test('mobile full page screenshot and QA scan', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const diagnostics = await preparePage(page);

    await page.screenshot({
      path: 'screenshots/mobile-home-full.png',
      fullPage: true,
    });

    await checkForRawCodeLeaks(page);
    await checkBrokenImages(page);

    expect(diagnostics.consoleErrors, `Console errors found: ${diagnostics.consoleErrors.join('\n')}`).toEqual([]);
    expect(diagnostics.failedRequests, `Failed requests found: ${diagnostics.failedRequests.join('\n')}`).toEqual([]);
  });

  test('mobile hero viewport screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page);

    await page.screenshot({
      path: 'screenshots/mobile-hero-viewport.png',
      fullPage: false,
    });
  });

  test('desktop hero viewport screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await preparePage(page);

    await page.screenshot({
      path: 'screenshots/desktop-hero-viewport.png',
      fullPage: false,
    });
  });
});

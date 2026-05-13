import { test, Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const baseURL = process.env.BASE_URL || 'https://nwbl-eco-2.vercel.app';
const screenshotDir = path.join(process.cwd(), 'screenshots');
const diagnosticsPath = path.join(screenshotDir, 'diagnostics.json');

type Diagnostics = {
  target: string;
  capturedAt: string;
  consoleErrors: string[];
  failedRequests: string[];
  brokenImages: string[];
  rawCodeLeaks: string[];
};

function ensureScreenshotDir() {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

function writeDiagnostics(diagnostics: Diagnostics) {
  ensureScreenshotDir();
  fs.writeFileSync(diagnosticsPath, JSON.stringify(diagnostics, null, 2));
}

async function preparePage(page: Page) {
  const diagnostics: Diagnostics = {
    target: baseURL,
    capturedAt: new Date().toISOString(),
    consoleErrors: [],
    failedRequests: [],
    brokenImages: [],
    rawCodeLeaks: [],
  };

  page.on('console', (message) => {
    if (message.type() === 'error') {
      diagnostics.consoleErrors.push(message.text());
    }
  });

  page.on('requestfailed', (request) => {
    const failure = request.failure();
    diagnostics.failedRequests.push(`${request.url()} :: ${failure?.errorText ?? 'request failed'}`);
  });

  await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {
    diagnostics.consoleErrors.push('Network did not reach idle state within 30 seconds. Screenshot continued anyway.');
  });
  await page.waitForTimeout(2000);

  const bodyText = await page.locator('body').innerText({ timeout: 30_000 }).catch(() => '');
  const rawCodePatterns = [
    'data:image/svg+xml',
    '<svg',
    'assetPath:',
    'visualSlots',
    'ecosystemCards',
    'export default',
  ];

  diagnostics.rawCodeLeaks = rawCodePatterns.filter((pattern) => bodyText.includes(pattern));

  diagnostics.brokenImages = await page.evaluate(() => {
    return Array.from(document.images)
      .filter((img) => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0)
      .map((img) => img.currentSrc || img.src || img.alt || 'unknown image');
  }).catch(() => ['Unable to evaluate image status.']);

  writeDiagnostics(diagnostics);
  return diagnostics;
}

test.describe('NWBL Eyes Agent', () => {
  test('desktop full page screenshot', async ({ page }) => {
    ensureScreenshotDir();
    await page.setViewportSize({ width: 1440, height: 1200 });
    const diagnostics = await preparePage(page);

    await page.screenshot({
      path: 'screenshots/desktop-home-full.png',
      fullPage: true,
    });

    console.log('Desktop diagnostics:', JSON.stringify(diagnostics, null, 2));
  });

  test('mobile full page screenshot', async ({ page }) => {
    ensureScreenshotDir();
    await page.setViewportSize({ width: 390, height: 844 });
    const diagnostics = await preparePage(page);

    await page.screenshot({
      path: 'screenshots/mobile-home-full.png',
      fullPage: true,
    });

    console.log('Mobile diagnostics:', JSON.stringify(diagnostics, null, 2));
  });

  test('mobile hero viewport screenshot', async ({ page }) => {
    ensureScreenshotDir();
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePage(page);

    await page.screenshot({
      path: 'screenshots/mobile-hero-viewport.png',
      fullPage: false,
    });
  });

  test('desktop hero viewport screenshot', async ({ page }) => {
    ensureScreenshotDir();
    await page.setViewportSize({ width: 1440, height: 900 });
    await preparePage(page);

    await page.screenshot({
      path: 'screenshots/desktop-hero-viewport.png',
      fullPage: false,
    });
  });
});

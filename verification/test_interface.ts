
import { test, expect, chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Mock /api/chat
    await page.route('**/api/chat', async route => {
      console.log('Intercepted /api/chat');
      await new Promise(f => setTimeout(f, 2000)); // 2s delay
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ text: "I am Meti, your Sovereign AI." })
      });
    });

    // Mock /api/tts
    await page.route('**/api/tts', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'audio/mpeg',
            body: Buffer.from('fake audio')
        });
    });

    console.log('Navigating to interface...');
    await page.goto('http://localhost:3000/interface');

    console.log('Checking initial state...');
    await expect(page.locator('div.text-xs:has-text("NEURAL LINK ACTIVE")')).toBeVisible({ timeout: 10000 });

    console.log('Simulating user input...');
    await page.locator('input[placeholder="Type a message..."]').fill('Hello Meti');
    await page.locator('button:has(svg)').click();

    console.log('Checking for processing status...');
    await expect(page.locator('div.text-xs:has-text("STATUS: NEURAL PROCESSING...")')).toBeVisible();
    await page.screenshot({ path: 'verification/processing_state.png' });
    console.log('Screenshot taken: processing_state.png');

    console.log('Waiting for response...');
    // Wait for "STATUS: NEURAL PROCESSING..." to disappear or "NEURAL LINK ACTIVE" to reappear
    await expect(page.locator('div.text-xs:has-text("NEURAL LINK ACTIVE")')).toBeVisible({ timeout: 5000 });

    // Check for AI message
    await expect(page.locator('text=I am Meti, your Sovereign AI.')).toBeVisible();

    await page.screenshot({ path: 'verification/final_success.png' });
    console.log('Screenshot taken: final_success.png');

  } catch (error) {
    console.error('Test failed:', error);
    await page.screenshot({ path: 'verification/error_state.png' });
  } finally {
    await browser.close();
  }
})();

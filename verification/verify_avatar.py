import asyncio
from playwright.async_api import async_playwright

async def verify_avatar_load():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        try:
            # Navigate to the interface page where the avatar is loaded
            await page.goto("http://localhost:3000/interface", timeout=60000)

            # Wait for the canvas to be visible (it might take a moment to load 3D assets)
            # We look for the canvas element which React Three Fiber creates
            await page.wait_for_selector("canvas", timeout=30000)

            # Wait a bit more to ensure the avatar model would start loading/rendering
            await asyncio.sleep(5)

            # Take a screenshot
            await page.screenshot(path="verification/avatar_render.png")
            print("Screenshot taken successfully")

        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_avatar_load())

from playwright.sync_api import sync_playwright

def verify_avatar():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Navigate to the interface page
            page.goto("http://localhost:3000/interface")

            # Wait for canvas to load
            page.wait_for_selector("canvas", timeout=30000)

            # Check for the TEST VOICE button (updated text)
            button = page.get_by_text("TEST VOICE")
            button.wait_for(state="visible", timeout=30000)

            # Take a screenshot
            page.screenshot(path="verification/avatar_test.png")
            print("Screenshot saved to verification/avatar_test.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_avatar()

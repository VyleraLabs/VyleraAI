from playwright.sync_api import sync_playwright

def verify_avatar():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Listen for console messages
        page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        try:
            # Navigate to the interface page where the avatar is located
            print("Navigating to /interface...")
            page.goto("http://localhost:3000/interface")

            # Wait for the canvas to be present (AvatarCanvas)
            print("Waiting for canvas...")
            page.wait_for_selector("canvas", timeout=30000)

            # Wait a bit for the model to load (NEURAL CORE LOADING... might be visible first)
            # We'll wait 10 seconds to ensure the model loads and settles
            print("Waiting for model to load...")
            page.wait_for_timeout(10000)

            # Take a screenshot
            print("Taking screenshot...")
            page.screenshot(path="verification/avatar_verification_debug.png")
            print("Screenshot saved to verification/avatar_verification_debug.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_avatar()

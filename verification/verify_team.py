from playwright.sync_api import sync_playwright

def verify_team_removal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the team page (assuming it's at / or /team based on build output)
        # The build output showed /team is a static page.
        # Since we are running against build/start or dev, we need to know the port.
        # I will assume port 3000.
        try:
            page.goto("http://localhost:3000/team")
        except Exception as e:
            print(f"Error navigating: {e}")
            browser.close()
            return

        # Check for Edwin
        edwin = page.get_by_text("Edwin")

        if edwin.count() > 0:
             print("FAIL: Edwin found on page")
        else:
             print("SUCCESS: Edwin NOT found on page")

        # Take screenshot
        page.screenshot(path="verification/team_page.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_team_removal()

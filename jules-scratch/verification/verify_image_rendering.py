import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute path of the index.html file
        import os
        path = os.path.abspath('index.html')

        await page.goto(f'file://{path}')

        await page.click('#shuffle-btn')
        await page.wait_for_timeout(1000)

        await page.click('.puzzle-img[src="assets/1.jpg"]')
        await page.wait_for_timeout(1000)
        await page.screenshot(path='jules-scratch/verification/image_rendering.png')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())

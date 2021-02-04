const puppeteer = require('puppeteer');

const getHref = (page, selector) =>
  page.evaluate(
    selector => document.querySelector(selector).getAttribute('href'),
    selector
  );

async function startWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,    // slows down Puppeteer operations
    devtools: true  // close dev tools
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 700, height: 900 });

    const link = 'https://www.google.com';
    await page.goto(link);

    await page.waitForSelector('div form div:nth-child(2) input');
    await page.click('div form div:nth-child(2) input');
    await page.keyboard.type(process.argv[2] || 'JavaScript');
    await page.keyboard.press('Enter');

    await page.waitForSelector('#main > div #center_col #search > div > div > div');

    const url = await getHref(page, `#main > div #center_col #search > div > div > div a`);

    console.log('>> ', url);

    await page.screenshot({
      fullPage: true,
      path: 'new_image.png'
    });

    await browser.close();
  } catch(error) {
    console.log(error);
    await browser.close();
  }
}

startWebPage();

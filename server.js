const puppeteer = require('puppeteer');

async function startWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,    // slows down Puppeteer operations
    devtools: false  // close dev tools
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 700, height: 900 });

  const link = 'https://www.google.com';
  await page.goto(link);

  await page.waitForSelector('div form div:nth-child(2) input');
  await page.click('div form div:nth-child(2) input');
  await page.keyboard.type(process.argv[2] || 'JavaScript');
  await page.keyboard.press('Enter');

  await page.waitForSelector('#main > div #center_col #search > div > div > div');

  const getHref = (page, selector) =>
    page.evaluate(
      selector => document.querySelector(selector).getAttribute('href'),
      selector
    );
  const url = await getHref(page, `#main > div #center_col #search > div > div > div a`);

  // await page.waitFor(3000);
  await browser.close();

  console.log('>> ', url);
}

startWebPage();

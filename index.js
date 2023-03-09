const express = require('express');
const path = require('path');

const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

const port = 3010;
const app = express();

app.get('/', async (req, res) => {
  let url = req.url || 'https://www.wikipedia.org';
  let result = null;
  let browser = null;

  let options = {
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  };

  try {
    browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    await page.goto(url);

    const file = await page.screenshot({
      type: 'png',
    });

    await browser.close();

    res.statusCode = 200;
    res.setHeader('Content-Type', `image/png`);

    res.end(file);

  } catch (error) {

    console.log(error);

  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  //  res.send({result});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

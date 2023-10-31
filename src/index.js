const express = require('express');
const { cacheMiddleware } = require('./middlewares/cache');
const { getBrowserInstance } = require('./libs/chromium');
const { validateURLMiddleware } = require('./middlewares/validateURL');
const cors = require('cors');

const { CONTAINER_ID, NODE_ENV } = process.env;

const app = express();

const corsOptions = {
  origin: NODE_ENV === 'local' ? '*' : 'https://genial4.com',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(cacheMiddleware);

app.use(validateURLMiddleware);

app.get('/api/image-generator', async (req, res) => {
  const url = req.query.url;

  try {
    const browser = await getBrowserInstance();

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    const selector = await page.waitForSelector(`#${CONTAINER_ID}`);

    if (!selector) {
      const imageBuffer = await page.screenshot({
        fullPage: true,
        encoding: 'binary',
      });

      res.setHeader('Content-Type', 'image/png');
      return res.end(imageBuffer);
    }

    const element = await page.$(`#${CONTAINER_ID}`);

    if (!element) {
      return res.status(400).json({
        message: `Not found element container with id #${CONTAINER_ID}`,
      });
    }

    const imageBuffer = await element.screenshot({
      encoding: 'binary',
    });

    res.setHeader('Content-Type', 'image/png');
    res.end(imageBuffer);

    await browser.close();
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;

if (NODE_ENV === 'local') {
  app.listen(PORT, console.log(`Running on http://localhost:${PORT}`));
}

module.exports = app;

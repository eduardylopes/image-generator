import express from 'express';
import { cacheMiddleware } from './middlewares/cache';
import { getBrowserInstance } from './libs/chromium';
import { z } from 'zod';
import { validateURLMiddleware } from './middlewares/validateURL';

const { CONTAINER_ID, DOMAIN_NAME } = process.env;

const app = express();

app.use(express.json());

app.use(cacheMiddleware);

app.use(validateURLMiddleware);

app.get('/api/image-generator', async (req, res) => {
  const url = req.query.url as string;

  try {
    const browser = await getBrowserInstance();

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    if (!CONTAINER_ID) {
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

export { app };

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

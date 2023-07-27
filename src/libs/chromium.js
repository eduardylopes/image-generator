const chromium = require('chrome-aws-lambda');

const chromeExecPaths = {
  win32: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  linux: '/usr/bin/google-chrome',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
};

const exePath = chromeExecPaths[process.platform];

const getBrowserInstance = async () => {
  const isProduction = process.env.NODE_ENV === 'production';

  const puppeteerConfig = {
    defaultViewport: {
      width: 1080,
      height: 768,
    },
    ignoreHTTPSErrors: true,
    args: isProduction ? chromium.args : undefined,
    executablePath: isProduction ? await chromium.executablePath : exePath,
    headless: isProduction ? chromium.headless : true,
    ignoreDefaultArgs: [
      '--disable-extensions',
      '--no-sandbox',
      '--no--zygote',
      '--disable-setuid-sandbox',
    ],
  };

  return chromium.puppeteer.launch(puppeteerConfig);
};

module.exports = { getBrowserInstance };

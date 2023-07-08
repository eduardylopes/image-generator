import Chromium from 'chrome-aws-lambda';

type Platform = 'win32' | 'linux' | 'darwin';

const chromeExecPaths: Record<Platform, string> = {
  win32: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  linux: '/usr/bin/google-chrome',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
};

const exePath = chromeExecPaths[process.platform as Platform];

export async function getBrowserInstance() {
  const isProduction = process.env.NODE_ENV === 'production';

  const puppeteerConfig = {
    defaultViewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
    args: isProduction ? Chromium.args : undefined,
    executablePath: isProduction ? await Chromium.executablePath : exePath,
    headless: isProduction ? Chromium.headless : true,
  };

  return Chromium.puppeteer.launch(puppeteerConfig);
}

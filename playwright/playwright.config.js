// @flow strict
const { devices: replayDevices } = require("@replayio/playwright");
const { devices } = require('@playwright/test');

const reporter /*: string */ = process.env.CI ? 'github' : 'list';

const config = {
  deviceScaleFactor: 2,
  forbidOnly: !!process.env.CI,
  outputDir: './test-results',
  reporter,
  webServer: {
    command: 'yarn docs',
    port: 3000,
    cwd: __dirname,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chromium"] },
    },
    {
      name: "replay-chromium",
      use: { ...replayDevices["Replay Chromium"] },
    },
    {
      name: "replay-firefox",
      use: { ...replayDevices["Replay Firefox"] },
    },
  ],
  timeout: 120000,
};

module.exports = config;

import { defineConfig } from '@playwright/test';
import * as path from 'path';

require('dotenv').config();

const outputDir = path.join(__dirname, 'test-results');

const config = defineConfig({
  outputDir,
  testDir: './e2e/tests',
  timeout: 300000,
  globalTimeout: 10000,
  forbidOnly: !!process.env.CI,
  preserveOutput: process.env.CI ? 'failures-only' : 'always',
  retries: process.env.CI ? 3 : 0,
  workers: 1,
  use: {
    trace: process.env.CI ? 'retain-on-failure' : 'on',
    video: process.env.CI ? 'retain-on-failure' : 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
      metadata: {
        platform: process.platform,
        headful: true,
        browserName: 'electron',
        channel: undefined,
        mode: 'default',
        video: false,
      },
    },
  ],
});

export default config;

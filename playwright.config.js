// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  timeout : 30000,
  expect : {
    timeout :15000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName : "chromium",
    headless : false,
    screenshot : "on",
    //viewport : null
    viewport : {width : 1240, height : 650}
  }
  
});


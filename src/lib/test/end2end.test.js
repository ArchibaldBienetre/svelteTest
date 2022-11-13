
// #######################################################################
// ### Same as the component test FileChooser.test.js, but:            ###
// ### * using Playwright as a technology doing the actions            ###
// ### * testing the whole application rather than a single component  ###
// #######################################################################

import { afterAll, beforeAll, describe, test } from 'vitest';
import { preview } from 'vite';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';

const localPort = 3000;

async function extractSelectedValue(selectedOption) {
    return selectedOption.evaluate(sel => sel.options[sel.options.selectedIndex].textContent);
}

describe('App.svelte', async () => {
  let server
  let browser
  let page

  beforeAll(async () => {
    server = await preview({ preview: { port: localPort } })
    browser = await chromium.launch()
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
    await new Promise((resolve, reject) => {
      server.httpServer.close(error => error ? reject(error) : resolve())
    })
  })

  test('should render correctly', async () => {
    // act
    await page.goto('http://localhost:' + localPort);

    // assert
    const imgLocator = page.locator('#imageDisplay');
    await expect(imgLocator).toBeDefined();
    await expect(imgLocator).toHaveAttribute('alt', 'Welsh Corgy');
    await expect(imgLocator).toHaveAttribute('title', "Welsh Corgy - isn't it a cute one?");

    const selectedImageOption = page.locator('#imageSelect');
    expect(await extractSelectedValue(selectedImageOption)).toBe('Welsh Corgy ');
  }, 60_000)

  test('should update on image select', async () => {
    // arrange
    await page.goto('http://localhost:' + localPort);

    // act
     await page.locator('#imageSelect').selectOption('image2');
     await page.locator('#sumbitSelection').click();

    // assert
    const selectedImageOption = page.locator('#imageSelect');
    expect(await extractSelectedValue(selectedImageOption)).toBe('Beagle ');

    // if you want to see what's going on, you can always take a screenshot (among other options)
    // await page.screenshot({ path: 'screenshot.png', fullPage: true });
    const imgLocator = page.locator('#imageDisplay');
    await expect(imgLocator).toHaveAttribute('alt', 'Beagle');
    await expect(imgLocator).toHaveAttribute('title', "Beagle - isn't it a cute one?");
  }, 60_000);

  test('should update on transition select', async () => {
    // arrange
    await page.goto('http://localhost:' + localPort);

    // act
     await page.locator('#imageSelect').selectOption('image2');
     await page.locator('#transitionSelect').selectOption('fly');
     await page.locator('#sumbitSelection').click();

    // assert
    const selectedImageOption = page.locator('#imageSelect');
    expect(await extractSelectedValue(selectedImageOption)).toBe('Beagle ');

    const imgLocator = page.locator('#imageDisplay');
    await expect(imgLocator).toHaveAttribute('alt', 'Beagle');
    await expect(imgLocator).toHaveAttribute('title', "Beagle - isn't it a cute one?");
  }, 60_000);

})

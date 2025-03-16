// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { todo } from 'node:test';

test.describe('authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // TODO: refactor loginPage to use be
test.beforeAll(async ({ browser }) => {
  let context = await browser.newContext();
  let page = await context.newPage();
});

  test('success login', async ({ page }) => {
    const loginPage = LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('user logout', async ({ page }) => {
    const loginPage = LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');

    await page.click('#react-burger-menu-btn')
    await page.click('#logout_sidebar_link')

    await expect(page).toHaveURL('https://www.saucedemo.com/')
  });

  test('user locked out', async ({ page }) => {
    const loginPage = LoginPage(page);
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('invalid authentication', async ({ page }) => {
    const loginPage = LoginPage(page);
    await loginPage.login('invalid_user', 'invalid_password');
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });
});

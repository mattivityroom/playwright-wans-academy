// @ts-check
import { test, expect } from '@playwright/test';

test.describe('authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  async function login(page, username, password) {
    await page.fill('#user-name', username);
    await page.fill('#password', password);

    await page.click('#login-button');
  }

  test('success login', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  });

  test('user logout', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');

    await page.click('#react-burger-menu-btn')
    await page.click('#logout_sidebar_link')

    await expect(page).toHaveURL('https://www.saucedemo.com/')
  });

  test('user locked out', async ({ page }) => {
    await login(page, 'locked_out_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('invalid authentication', async ({ page }) => {
    await login(page, 'invalid_user', 'invalid_password');
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });
});

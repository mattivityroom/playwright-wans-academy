// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('authentication', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = LoginPage(page);
    await page.goto('/');
  });

  test('success login', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('user logout', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await page.click('#react-burger-menu-btn')
    await page.click('#logout_sidebar_link')

    await expect(page).toHaveURL('https://www.saucedemo.com/')
  });

  test('user locked out', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('invalid authentication', async ({ page }) => {
    await loginPage.login('invalid_user', 'invalid_password');
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });
});

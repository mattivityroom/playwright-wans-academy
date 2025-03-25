import { expect } from '@playwright/test';
import { test } from '../fixtures/authSetup'

test.describe('authentication', () => {
    test('Login with valid credentials', async ({ validAuth }) => {
        expect(await validAuth.page.url()).toBe('https://www.saucedemo.com/inventory.html');
    });

    test('Login with invalid credentials', async ({ invalidAuth }) => {
        expect(await invalidAuth.page.url()).not.toBe('https://www.saucedemo.com/inventory.html');
        expect(await invalidAuth.page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
    });

    test('Logout', async ({ validAuth }) => {
        await validAuth.page.click('#react-burger-menu-btn');
        await validAuth.page.click('#logout_sidebar_link');
        expect(await validAuth.page.url()).toBe('https://www.saucedemo.com/');
    });

    test('user locked out', async ({ lockedAuth }) => {
        expect(await lockedAuth.page.locator('[data-test="error"]'))
            .toContainText('Epic sadface: Sorry, this user has been locked out.');
    });
});

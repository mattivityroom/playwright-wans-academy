import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';

test.use({ storageState: 'playwright/.auth/session.json' })

const USER = {
  username: 'standard_user',
  password: 'secret_sauce'
}

test.beforeAll(async ({ browser }) => {
  let context = await browser.newContext();
  let page = await context.newPage();

  const loginpage = LoginPage(page);
  await loginpage.login(USER.username, USER.password);
});

test('add to cart', async ({ page }) => {
  const cartPage = CartPage(page);

  await page.goto('/inventory.html');

  // Add items to cart
  await page.click('#add-to-cart-sauce-labs-bike-light');
  await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');

  // Open cart
  await page.click('#shopping_cart_container');

  // Validate items in cart
  cartPage.verifyCart('https://www.saucedemo.com/cart.html',
    ["Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"])
  await page.click('#checkout');

  // Fill out checkout form
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
  await page.fill('#first-name', 'Moona');
  await page.fill('#last-name', 'Hoshinova');
  await page.fill('#postal-code', '11111');
  await page.click('#continue');

  // Validate items in checkout
  cartPage.verifyCart('https://www.saucedemo.com/checkout-step-two.html',
    ["Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"])
  await page.click('#finish');

  // Validate order complete
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

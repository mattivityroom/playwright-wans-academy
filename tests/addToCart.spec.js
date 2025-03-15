import { test, expect } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/session.json' })

async function verifyCart(page, path, items) {
  await expect(page).toHaveURL(path)
  await expect(page.locator('.cart_item')).toHaveCount(items.length);
  for (let i = 0; i < items.length; i++) { // Fix loop condition
    await expect(page.locator('body')).toContainText(items[i]);
  }
}

test('add to cart', async ({ page }) => {
  await page.goto('/inventory.html');

  // Add items to cart
  await page.click('#add-to-cart-sauce-labs-bike-light');
  await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');

  // Open cart
  await page.click('#shopping_cart_container');

  // Validate items in cart
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
  await verifyCart(page, 'https://www.saucedemo.com/cart.html',
    ["Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"]);
  await page.click('#checkout');

  // Fill out checkout form
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
  await page.fill('#first-name', 'Moona');
  await page.fill('#last-name', 'Hoshinova');
  await page.fill('#postal-code', '11111');
  await page.click('#continue');

  // Validate items in checkout
  await verifyCart(page, 'https://www.saucedemo.com/checkout-step-two.html',
    ["Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt"]);
  await page.click('#finish');

  // Validate order complete
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

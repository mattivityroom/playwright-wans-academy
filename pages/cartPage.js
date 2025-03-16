import { expect } from '@playwright/test';

const CartPage = (page) => {
  return {
    async navigate() {
      await page.goto('/inventory.html');
    },

    async verifyCart(path, items) {
      await expect(page).toHaveURL(path)
      await expect(page.locator('.cart_item')).toHaveCount(items.length);
      for (let i = 0; i < items.length; i++) {
        await expect(page.locator('body')).toContainText(items[i]);
      }
    }
  }
}

module.exports = { CartPage };
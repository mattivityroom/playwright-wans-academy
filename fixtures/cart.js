import { test as base } from '@playwright/test';
import { CartPageNew } from '../pages/cartPage';

const DEFAULT_ITEMS = [
  "Sauce Labs Bike Light",
  "Sauce Labs Bolt T-Shirt"
];

export const test = base.extend({
  addItems: [async ({ page, validAuth }, use, testInfo) => {
    const cart = new CartPageNew(page);

    const itemsToAdd = testInfo.project.metadata.items || DEFAULT_ITEMS;

    await cart.navigateToInventory();
    await cart.addItemsToCart(itemsToAdd);
    await cart.openCart();

    await use(cart);
  }, { auto: true }]
});

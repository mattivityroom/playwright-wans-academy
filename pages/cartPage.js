import { expect } from "@playwright/test";

export class CartPageNew {
  constructor(page) {
    this.page = page;

    // Navigation elements
    this.cartIcon = page.locator("#shopping_cart_container");
    this.cartCheckout = page.locator("#checkout");
    this.cartFinish = page.locator("#finish");

    // Cart items
    this.cartItems = page.locator(".cart_item");
    this.cartItemNames = page.locator(".inventory_item_name");
    this.cartItemPrices = page.locator(".inventory_item_price");
    this.addToCartButton = (itemName) =>
      page.locator(`[data-test="add-to-cart-${this.formatItemId(itemName)}"]`);

    // Checkout form
    this.checkoutForm = {
      firstName: page.locator("#first-name"),
      lastName: page.locator("#last-name"),
      postalCode: page.locator("#postal-code"),
      submit: page.locator("#continue")
    };

    // Order completion
    this.completeHeader = page.locator(".complete-header");
  }

  formatItemId(itemName) {
    return itemName.toLowerCase().replace(/\s+/g, '-');
  }

  async navigateToInventory() {
    await this.page.goto('/inventory.html');
    await expect(this.page).toHaveURL(/.*inventory.html/);
  }

  async addItemsToCart(items) {
    for (const item of items) {
      await this.addToCartButton(item).click();
    }
  }

  async openCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(/.*cart.html/);
  }

  async verifyCartItems(expectedItems) {
    await expect(this.cartItems).toHaveCount(expectedItems.length);
    const actualItems = await this.cartItemNames.allTextContents();
    expect(actualItems.sort()).toEqual(expectedItems.sort());
  }

  async fillCheckoutInfo(userInfo) {
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
    await this.checkoutForm.firstName.fill(userInfo.firstName);
    await this.checkoutForm.lastName.fill(userInfo.lastName);
    await this.checkoutForm.postalCode.fill(userInfo.postalCode);
    await this.checkoutForm.submit.click();
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
  }

  async completeCheckout() {
    await this.cartFinish.click();
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  async processCheckout(userInfo, expectedItems) {
    await this.cartCheckout.click();
    await this.fillCheckoutInfo(userInfo);
    await this.verifyCartItems(expectedItems);
    await this.completeCheckout();
  }
}

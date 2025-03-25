import { test as authTest } from "../fixtures/authSetup";
import { test as cartTest } from "../fixtures/cart";
import { mergeTests } from "@playwright/test";
import { CartPageNew } from "../pages/cartPage";

const TEST_DATA = {
  CART_ITEMS: [
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt"
  ],

  USER_INFO: {
    firstName: "Moona",
    lastName: "Hoshinova",
    postalCode: "11111"
  }
};

const test = mergeTests(authTest, cartTest);
test.describe('Shopping Cart', () => {
  test.use({
    metadata: {
      items: TEST_DATA.CART_ITEMS
    }
  });

  test('should complete purchase flow with multiple items', async ({ page }) => {
    const cartPage = new CartPageNew(page);
    await cartPage.verifyCartItems(TEST_DATA.CART_ITEMS);
    await cartPage.processCheckout(
      TEST_DATA.USER_INFO,
      TEST_DATA.CART_ITEMS
    );
  });
});

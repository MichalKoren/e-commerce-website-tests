import { Page, expect, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** A collection of expected login page elements */
  get elements(): Record<string, Locator> {
    return {
      CART_LIST: this.page.getByTestId("cart-list"),
      PRODUCTS_PRICE: this.page.getByTestId("products-price"),
      PRODUCTS_LIST: this.page.getByTestId("products-list"),
    };
  }

  /**
   * Asserts that the displayed product price matches the expected price
   * @param expectedProductPrice - the expected price of the product
   **/
  async assertProductPrice(expectedProductPrice: string): Promise<void> {
    await expect(this.elements.PRODUCTS_PRICE).toHaveText(expectedProductPrice);
  }

  /**
   * Asserts that the number of products in the cart matches the expected count
   * @param expectedNumberOfProductsInCart - the expected number of products in the cart
   **/
  async assertProductCount(expectedNumberOfProductsInCart: number) {
    await expect(this.elements.CART_LIST).toHaveCount(
      expectedNumberOfProductsInCart
    );
  }

  /**
   * Asserts that a product with the expected name is visible in the cart
   * @param expectedProductName - the expected name of the product
   **/
  async assertProductIsVisible(expectedProductName: string) {
    await expect(this.elements.PRODUCTS_LIST).toHaveText(expectedProductName);
  }
}

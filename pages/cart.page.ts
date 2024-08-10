import { Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** A collection of expected login page elements */
  get elements() {
    return {
      CART_LIST: this.page.getByTestId("cart-list"),
      PRODUCTS_PRICE: this.page.getByTestId("products-price"),
      PRODUCTS_LIST: this.page.getByTestId("products-list"),
    };
  }
}

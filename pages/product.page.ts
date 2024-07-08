import { Page, expect, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** A collection of expected login page elements */
  get elements(): Record<string, Locator> {
    return {
      SEARCH_INPUT: this.page.getByTestId("search-input"),
      SEARCH_BUTTON: this.page.getByTestId("search-button"),
      FILTER_DROPDOWN: this.page.getByTestId("filter-dropdown"),
      FILTER_LIST: this.page.getByTestId("filter-list"),
      LOADER: this.page.getByTestId("loading-indicator"),
      PRODUCT_LABEL: this.page.getByLabel("product-label"),
      APPLIED_FILTERS: this.page.getByTestId("applied-filters"),
      PRODUCT_DETAILS_BUTTON: this.page.getByTestId("product-details-button"),
      PRODUCT_ICON: this.page.getByTestId("product-icon"),
      PRODUCT_DESCRIPTION: this.page.getByTestId("product-description"),
      ADD_TO_CART_BUTTON: this.page.getByTestId("add-to-cart-button"),
      PRODUCT_PRICE: this.page.getByTestId("product-price"),
      PRODUCT_NAME: this.page.getByLabel("product-name"),
    };
  }

  /** Navigates to the homepage with products */
  async open(): Promise<void> {
    await this.page.goto("/");
  }

  /**
   * Waits for the products to be fully loaded by checking the loader indicator
   * For example wait for placeholder to be hidden or lazy loading to be finished
   **/
  async waitForProductsToBeLoaded() {
    const loadIndicators = await this.elements.LOADER.all();
    for (const loadIndicator of loadIndicators) {
      await loadIndicator.waitFor({
        state: "detached",
        timeout: 5000,
      });
    }
  }

  /**
   * Searches for a product by its name
   * @param productName - the name of the product to search for
   **/
  async searchProductByName(productName: string) {
    await this.elements.SEARCH_INPUT.fill(productName);
    await this.elements.SEARCH_BUTTON.click();
  }

  /**
   * Filters the products by a specific type
   * @param filterType - the type of filter to apply
   **/
  async filterProductsByType(filterType: string) {
    await this.elements.FILTER_DROPDOWN.click();
    await this.elements.FILTER_LIST.waitFor({ state: "visible" });
    await this.elements.FILTER_LIST.filter({ hasText: filterType }).click();
  }

  /**
   * Clicks on the product details button to view more details
   **/
  async clickOnProductDetails() {
    await this.elements.PRODUCT_ICON.hover();
    await this.elements.PRODUCT_DETAILS_BUTTON.click();
    await this.elements.PRODUCT_DESCRIPTION.waitFor({ state: "visible" });
  }

  /**
   * Clicks on the add to cart button to add the product to the shopping cart
   **/
  async clickOnAddToCartButton() {
    await this.elements.ADD_TO_CART_BUTTON.click();
  }

  /**
   * Retrieves the name of the product
   * @returns the name of the product
   **/
  async getProductName(): Promise<string> {
    return (await this.elements.PRODUCT_NAME.textContent()) || "";
  }

  /**
   * Retrieves the price of the product
   * @returns the price of the product
   **/
  async getProductPrice(): Promise<string> {
    return (await this.elements.PRODUCT_PRICE.textContent()) || "";
  }

  /**
   * Asserts that the products are filtered correctly
   * @param expectedFilter - the expected filter to be applied
   **/
  async assertProductsAreFiltered(expectedFilter: string) {
    const appliedFilterClass = this.elements.FILTER_LIST.filter({
      hasText: expectedFilter,
    }).getAttribute("class");
    expect(appliedFilterClass).toContain("selected");
    await expect(this.elements.PRODUCT_LABEL).toHaveText(expectedFilter);
  }
}

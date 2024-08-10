import { expect, test } from "@playwright/test";
import { ProductPage } from "../pages/product.page";
import { CartPage } from "../pages/cart.page";
import { ProductsData } from "../fixtures/productData";

test.describe("Product page tests", () => {
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await productPage.open();
  });

  test("should allow user to search and filter desired products", async ({
    page,
  }) => {
    productPage = new ProductPage(page);
    await productPage.open();
    await productPage.searchProductByName(ProductsData.searchedProduct);
    await productPage.waitForProductsToBeLoaded();
    await productPage.filterProductsByType(ProductsData.usedFilter);
    await productPage.waitForProductsToBeLoaded();
    const appliedFilterClass = await productPage.elements.FILTER_LIST.filter({
      hasText: ProductsData.usedFilter,
    }).getAttribute("class");

    expect(appliedFilterClass).toContain("selected");
    await expect(productPage.elements.PRODUCT_LABEL).toHaveText(
      ProductsData.usedFilter
    );
  });

  test("should allow add product to cart", async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    const addedNumberOfProducts = 1; // example variable declaration used in test
    await productPage.open();
    await productPage.searchProductByName(ProductsData.searchedProduct);
    await productPage.waitForProductsToBeLoaded();
    await productPage.filterProductsByType(ProductsData.usedFilter);
    await productPage.waitForProductsToBeLoaded();
    await productPage.clickOnProductDetails();
    const expectedProductPrice = await productPage.getProductPrice();
    const expectedProductName = await productPage.getProductName();
    await productPage.clickOnAddToCartButton();

    await expect(cartPage.elements.PRODUCTS_PRICE).toHaveText(
      expectedProductPrice
    );
    await expect(cartPage.elements.CART_LIST).toHaveCount(
      addedNumberOfProducts
    );
    await expect(cartPage.elements.PRODUCTS_LIST).toHaveText(
      expectedProductName
    );
  });
});

import { test } from "@playwright/test";
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
    productPage.open();
    productPage.searchProductByName(ProductsData.searchedProduct);
    productPage.waitForProductsToBeLoaded();
    productPage.filterProductsByType(ProductsData.usedFilter);
    productPage.waitForProductsToBeLoaded();
    productPage.assertProductsAreFiltered(ProductsData.usedFilter);
  });

  test("should allow add product to cart", async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    const addedNumberOfProducts = 1;
    productPage.open();
    productPage.searchProductByName(ProductsData.searchedProduct);
    productPage.waitForProductsToBeLoaded();
    productPage.filterProductsByType(ProductsData.usedFilter);
    productPage.waitForProductsToBeLoaded();
    productPage.clickOnProductDetails();
    const productPrice = await productPage.getProductPrice();
    const productName = await productPage.getProductName();
    productPage.clickOnAddToCartButton();
    cartPage.assertProductPrice(productPrice);
    cartPage.assertProductCount(addedNumberOfProducts);
    cartPage.assertProductIsVisible(productName);
  });
});

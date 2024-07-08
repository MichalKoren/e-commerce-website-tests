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
    await productPage.searchProductByName(ProductsData.searchedProduct);
    await productPage.waitForProductsToBeLoaded(); // wait for products to be loaded. For example wait for lazy loading to be finished or placeholders to disappear
    await productPage.filterProductsByType(ProductsData.usedFilter);
    await productPage.waitForProductsToBeLoaded(); // wait for products to be loaded. For example wait for lazy loading to be finished or placeholders to disappear
    await productPage.assertProductsAreFiltered(ProductsData.usedFilter);
  });

  test("should allow add product to cart", async ({ page }) => {
    const addedNumberOfProducts = 1; // In real scenario it will be extracted to separate file with test data. Currently, it is mock in this test, so I left it here
    await productPage.searchProductByName(ProductsData.searchedProduct);
    await productPage.waitForProductsToBeLoaded(); // wait for products to be loaded. For example wait for lazy loading to be finished or placeholders to disappear
    await productPage.filterProductsByType(ProductsData.usedFilter);
    await productPage.waitForProductsToBeLoaded(); // wait for products to be loaded. For example wait for lazy loading to be finished or placeholders to disappear
    await productPage.clickOnProductDetails();
    const productPrice = await productPage.getProductPrice();
    const productName = await productPage.getProductName();
    await productPage.clickOnAddToCartButton();
    await cartPage.assertProductPrice(productPrice);
    await cartPage.assertProductCount(addedNumberOfProducts);
    await cartPage.assertProductIsVisible(productName);
  });
});

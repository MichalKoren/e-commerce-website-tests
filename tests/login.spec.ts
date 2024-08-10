import { expect, test } from "@playwright/test";
import { createdUser } from "../fixtures/signUpData";
import { LoginPage } from "../pages/login.page";

test.describe("Login page tests", () => {
  test("should allow user to login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.logIn(createdUser);

    await expect(loginPage.elements.HOME_PAGE_TITLE).toBeVisible();
    await expect(loginPage.page).toHaveURL(/.*index.php?rt=homepage/);
  });
});

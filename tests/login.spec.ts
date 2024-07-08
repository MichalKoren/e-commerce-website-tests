import { test } from "@playwright/test";
import { createdUser } from "../fixtures/signUpData";
import { LoginPage } from "../pages/login.page";

test.describe("Login page tests", () => {
  test("should allow user to login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.logIn(createdUser);  // Use already created user which exist in our DB just to simplify test
    await loginPage.assertUserIsLoggedIn();
  });
});

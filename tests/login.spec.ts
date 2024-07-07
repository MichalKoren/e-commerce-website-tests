import { test } from "@playwright/test";
import { createdUser } from "../fixtures/signUpData";
import { LoginPage } from "../pages/login.page";

test.describe("Login page tests", () => {
  test("should allow user to login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.open();
    loginPage.logIn(createdUser);
    loginPage.assertUserIsLoggedIn();
  });
});

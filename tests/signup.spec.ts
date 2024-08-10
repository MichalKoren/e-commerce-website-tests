import { expect, test } from "@playwright/test";
import { SignUpPage } from "../pages/signup.page";
import {
  correctUser,
  existingEmail,
  existingUserName,
  invalidEmail,
  invalidPassword,
  invalidUserName,
} from "../fixtures/signUpData";
import { SignUpMessages } from "../support/types";

test.describe("Sign up page tests", () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.open();
  });

  test("should allow user to register successfully", async ({ page }) => {
    await signUpPage.signUp(correctUser);
    await expect(signUpPage.elements.SUCCESS_MESSAGE).toBeVisible();
    await expect(signUpPage.elements.SUCCESS_MESSAGE).toContainText(
      SignUpMessages.successfulMessage
    );
    await expect(signUpPage.page).toHaveURL(/.*index.php?rt=accountsuccess/);
  });

  test("should not allow registration with invalid email", async ({ page }) => {
    await signUpPage.signUp(invalidEmail);
    await expect(signUpPage.elements.ERROR_MESSAGE).toBeVisible();
    await expect(signUpPage.elements.ERROR_MESSAGE).toContainText(
      SignUpMessages.invalidEmail
    );
  });

  test("should not allow registration with existing email", async ({
    page,
  }) => {
    await signUpPage.signUp(existingEmail);
    await expect(signUpPage.elements.ERROR_MESSAGE).toBeVisible();
    await expect(signUpPage.elements.ERROR_MESSAGE).toContainText(
      SignUpMessages.existingEmail
    );
  });

  test("should not allow registration with existing username", async ({
    page,
  }) => {
    await signUpPage.signUp(existingUserName);
    await expect(signUpPage.elements.ERROR_MESSAGE).toBeVisible();
    await expect(signUpPage.elements.ERROR_MESSAGE).toContainText(
      SignUpMessages.existingUserName
    );
  });

  test("should not allow registration with invalid username", async ({
    page,
  }) => {
    await signUpPage.signUp(invalidUserName);
    await expect(signUpPage.elements.ERROR_MESSAGE).toBeVisible();
    await expect(signUpPage.elements.ERROR_MESSAGE).toContainText(
      SignUpMessages.invalidUserName
    );
  });

  test("should not allow registration with invalid password", async ({
    page,
  }) => {
    await signUpPage.signUp(invalidPassword);
    await expect(signUpPage.elements.ERROR_MESSAGE).toBeVisible();
    await expect(signUpPage.elements.ERROR_MESSAGE).toContainText(
      SignUpMessages.invalidPassword
    );
  });
});

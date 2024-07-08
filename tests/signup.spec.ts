import { test } from "@playwright/test";
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
    await signUpPage.assertUserIsSuccessfullyCreated(
      SignUpMessages.successfulMessage
    );
  });

  test("should not allow registration with invalid email", async ({ page }) => {
    await signUpPage.signUp(invalidEmail);
    await signUpPage.assertErrorMessageIsDisplayed(SignUpMessages.invalidEmail);
  });

  test("should not allow registration with existing email", async ({
    page,
  }) => {
    await signUpPage.signUp(existingEmail);
    await signUpPage.assertErrorMessageIsDisplayed(
      SignUpMessages.existingEmail
    );
  });

  test("should not allow registration with existing username", async ({
    page,
  }) => {
    await signUpPage.signUp(existingUserName);
    await signUpPage.assertErrorMessageIsDisplayed(
      SignUpMessages.existingUserName
    );
  });

  test("should not allow registration with invalid username", async ({
    page,
  }) => {
    await signUpPage.signUp(invalidUserName);
    await signUpPage.assertErrorMessageIsDisplayed(
      SignUpMessages.invalidUserName
    );
  });

  test("should not allow registration with invalid password", async ({
    page,
  }) => {
    await signUpPage.signUp(invalidPassword);
    await signUpPage.assertErrorMessageIsDisplayed(
      SignUpMessages.invalidPassword
    );
  });
});

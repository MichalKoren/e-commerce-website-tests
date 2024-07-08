import { Page, expect, Locator } from "@playwright/test";
import { SignUpMessages, UserCredentials } from "../support/types";

export class SignUpPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** A collection of expected sign in page elements */
  get elements(): Record<string, Locator> {
    return {
      EMAIL_INPUT: this.page.getByPlaceholder("Email"),
      USERNAME: this.page.getByPlaceholder("username"),
      PASSWORD_INPUT: this.page.getByPlaceholder("Password"),
      SIGNUP_BUTTON: this.page.locator('[value="Sign in"]'),
      ERROR_MESSAGE: this.page.getByTestId("signup-error-message"),
      SUCCESS_MESSAGE: this.page.getByTestId("signup-success-message"),
    };
  }

  /**
   * Navigates to the sign-up page and waits for the content to be loaded
   **/
  async open(): Promise<void> {
    await this.page.goto("/index.php?rt=account/create");
    await this.page.waitForLoadState("domcontentloaded"); // Wait for the DOM content to be fully loaded before proceeding with further actions
  }

  /**
   * Signs up a user with the provided credentials
   * @param user - the user credentials including email, username, and password
   **/
  async signUp(user: UserCredentials): Promise<void> {
    await this.elements.EMAIL_INPUT.fill(user.email);
    await this.elements.USERNAME.fill(user.username);
    await this.elements.PASSWORD_INPUT.fill(user.password);
    await this.elements.SIGNUP_BUTTON.click();
  }

  /**
   * Asserts that redirection URL worked and the user is successfully created by checking the success message
   * @param expectedMessage - the expected success message to be displayed
   **/
  async assertUserIsSuccessfullyCreated(
    expectedMessage: SignUpMessages
  ): Promise<void> {
    await expect(this.page).toHaveURL(/.*index.php?rt=accountsuccess/);
    await expect(this.elements.SUCCESS_MESSAGE).toBeVisible();
    await expect(this.elements.SUCCESS_MESSAGE).toContainText(expectedMessage);
  }

  /**
   * Asserts that the error message is displayed during the sign-up process
   * @param errorMessage - the expected error message to be displayed
   **/
  async assertErrorMessageIsDisplayed(
    errorMessage: SignUpMessages
  ): Promise<void> {
    await expect(this.elements.ERROR_MESSAGE).toBeVisible();
    await expect(this.elements.ERROR_MESSAGE).toContainText(errorMessage);
  }
}

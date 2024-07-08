import { Page, expect, Locator } from "@playwright/test";
import { UserCredentials } from "../support/types";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** A collection of expected login page elements */
  get elements(): Record<string, Locator> {
    return {
      EMAIL_INPUT: this.page.getByPlaceholder("Email"),
      USERNAME: this.page.getByPlaceholder("username"),
      PASSWORD_INPUT: this.page.getByPlaceholder("Password"),
      LOGIN_BUTTON: this.page.locator('[value="Log in"]'),
      HOME_PAGE_TITLE: this.page.getByText("Welcome in Homepage"),
    };
  }

  /**
   * Navigates to the login page and waits for the content to be loaded
   **/
  async open(): Promise<void> {
    await this.page.goto("/index.php?rt=account/login");
    await this.page.waitForLoadState("domcontentloaded");
  }

  /**
   * Logs in a user with the provided credentials
   * @param user - the user credentials including username and password
   **/
  async logIn(user: UserCredentials): Promise<void> {
    await this.elements.USERNAME.fill(user.username);
    await this.elements.PASSWORD_INPUT.fill(user.password);
    await this.elements.LOGIN_BUTTON.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  /**
   * Asserts that the user is successfully logged in by checking the homepage title and URL
   **/
  async assertUserIsLoggedIn(): Promise<void> {
    await expect(this.elements.HOME_PAGE_TITLE).toBeVisible();
    await expect(this.page).toHaveURL(/.*index.php?rt=homepage/);
  }
}

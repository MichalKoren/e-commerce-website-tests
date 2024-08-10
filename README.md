# E-commerce Website Testing with Playwright

This repository contains automated tests written in TypeScript using Playwright for validating key functionalities of an e-commerce website. The tests cover user registration and login, product search and filtering, and adding items to the cart.

#### Idea for this repo is to show example implementation of Page Object Model. Selectors are fake and tests will not work. In the future it will be change

## Setup

- Requires node.js version 20 or above (example: v20.10.0)
- `npm install` - Install the dependencies using
- `npx playwright install` - Install browsers

## Usage

- `npm run test:ui` - run the tests in headed mode
- `npx playwright test tests/<test_file_name.spec.ts>` - run specific test in headless mode
- `npm run test:headless` -  run tests in headless mode 
- `npm run test:chrome` - run tests in Chrome browser

## Folder Structure

- **`fixtures/`**: Contains data files (`productData.ts`, `signUpData.ts`) used in tests.

- **`pages/`**: Contains page objects (`cart.page.ts`, `login.page.ts`, `product.page.ts`, `signup.page.ts`) that encapsulate interactions with specific pages of the e-commerce website.

- **`support/`**: Contains support files (`types.ts`) such as types definitions.

- **`tests/`**: Contains test files (`login.spec.ts`, `product.spec.ts`, `signup.spec.ts`) that define and execute the automated tests for different functionalities of the e-commerce website.

- **`playwright.config.ts`**: Playwright configuration file


## Implemented test cases
1. **User Registration and Login:**
   - Navigate to the e-commerce website's signup page.
   - Create a new user account by entering a unique username, email, and password. Handle any user input validations.
   - Verify successful registration and redirect to the login page.
   - Log in with the newly created credentials and confirm that the login is successful, and the user is directed to the homepage.

2. **Product Search and Filter:**
   - Use the search function to find products related to "electronics."
   - Apply filters to narrow down the search results to items within a specific range.
   - Verify that the displayed products match the search criteria and filters applied.

3. **Adding Items to Cart:**
   - Select a product from the search results and navigate to its details page.
   - Add the product to the shopping cart.
   - Verify that the cart updates correctly with the selected item.

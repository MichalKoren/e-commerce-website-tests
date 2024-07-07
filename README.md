# E-commerce Website Testing with Playwright

This repository contains automated tests written in TypeScript using Playwright for validating key functionalities of an e-commerce website. The tests cover user registration and login, product search and filtering, and adding items to the cart.

## Setup

- Requires node.js version 20 or above (example: v20.10.0)
- `npm install` - Install the dependencies using
- `npx playwright install` - Install browsers

## Usage

- `npx playwright test --ui` - run the tests in headed mode
- `npx playwright test tests/<test_file_name.spec.ts>` - run specific test in headless mode

## Folder Structure

- **`fixtures/`**: Contains data files (`productData.ts`, `signUpData.ts`) used in tests.

- **`pages/`**: Contains page objects (`cart.page.ts`, `login.page.ts`, `product.page.ts`, `signup.page.ts`) that encapsulate interactions with specific pages of the e-commerce website.

- **`support/`**: Contains support files (`types.ts`) such as types definitions.

- **`tests/`**: Contains test files (`login.spec.ts`, `product.spec.ts`, `signup.spec.ts`) that define and execute the automated tests for different functionalities of the e-commerce website.

- **`playwright.config.ts`**: Playwright configuration file

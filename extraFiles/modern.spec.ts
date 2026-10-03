// // locator.ts
// export const loginLocators = {
//   emailInput: '[type="email"]',
//   passwordInput: '[name="password"]',
//   loginButton: 'role=button[name="log in"]',
//   alertMessage: 'role=alert',
// } as const; // No interface required!

// // login.page.ts
// import { Page, Locator } from '@playwright/test';
// import { loginLocators } from './locator';

// export class LoginPage {
//   private readonly page: Page;
//   public readonly emailInput: Locator;
//   public readonly passwordInput: Locator;
//   public readonly loginButton: Locator;
//   public readonly alertMessage: Locator;

//   constructor(page: Page) {
//     this.page = page;
    
//     // Autocomplete works seamlessly here
//     this.emailInput = page.locator(loginLocators.emailInput);
//     this.passwordInput = page.locator(loginLocators.passwordInput);
//     this.loginButton = page.locator(loginLocators.loginButton);
//     this.alertMessage = page.locator(loginLocators.alertMessage);
//   }

//   async navigate(baseUrl: string) {
//     await this.page.goto(baseUrl);
//   }

//   async login(email: string, password: string) {
//     await this.emailInput.fill(email);
//     await this.passwordInput.fill(password);
//     await this.loginButton.click();
//   }
// }

// // login.spec.ts
// import { test, expect } from '@playwright/test';
// import { LoginPage } from './login.page';

// test.describe('Login', () => {
//   const validEmail = 'admin@chairlyo.com';
//   const validPassword = 'adminpassword';
//   const baseUrl = 'https://chairlyo.com';

//   let loginPage: LoginPage;

//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     await loginPage.navigate(baseUrl);
//   });

//   test('Login with valid credentials', async () => {
//     await loginPage.login(validEmail, validPassword);
//     await expect(loginPage.alertMessage).toBeVisible();
//     await expect(loginPage.alertMessage).toHaveText('ErrorLogin successful!');
//   });

//   test('Login with invalid credentials', async () => {
//     await loginPage.login('invalid@email.com', 'invalidpassword');
//     await expect(loginPage.alertMessage).toBeVisible();
//     await expect(loginPage.alertMessage).toHaveText('ErrorInvalid credentials');
//   });
// });

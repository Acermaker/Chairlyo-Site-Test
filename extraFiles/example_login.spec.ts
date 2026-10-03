// import { test } from '@playwright/test';
// import LoginPage from '../pages/LoginPage';

// test.describe('Login', () => {
//   const email = 'admin@chairlyo.com';
//   const password = 'adminpassword';

//   let loginPage: LoginPage;

//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     await loginPage.navigate();
//   });

//   test('Login with valid credentials', async () => {
//     await loginPage.login(email, password);

//     await loginPage.verifyLoginSuccess();

//     // Optional
//     // await dashboardPage.verifyDashboardLoaded();
//   });

//   test('Login with invalid credentials', async () => {
//     await loginPage.login(
//       'invalid@email.com',
//       'invalidpassword'
//     );

//     await loginPage.verifyLoginFailed(
//       'ErrorInvalid credentials'
//     );
//   });

//   test('Login with empty email', async () => {
//     await loginPage.login('', password);

//     await loginPage.verifyEmailValidation();
//   });

//   test('Login with empty password', async () => {
//     await loginPage.login(email, '');

//     await loginPage.verifyPasswordValidation();
//   });

//   test('Login with empty credentials', async () => {
//     await loginPage.login('', '');

//     await loginPage.verifyRequiredFieldValidation();
//   });
// });

// async login(email: string, password: string) {
//   await this.locators.emailInput.fill(email);
//   await this.locators.passwordInput.fill(password);
//   await this.locators.loginButton.click();
// }

// async verifyLoginSuccess() {
//   await expect(this.locators.alertMessage).toBeVisible();
//   await expect(this.locators.alertMessage).toHaveText(
//     'SuccessLogin successful!'
//   );
// }

// async verifyLoginFailed(message: string) {
//   await expect(this.locators.alertMessage).toBeVisible();
//   await expect(this.locators.alertMessage).toContainText(message);
// }

// async verifyEmailValidation() {
//   await expect(this.locators.emailInput).toBeInvalid();
// }

// async verifyPasswordValidation() {
//   await expect(this.locators.passwordInput).toBeInvalid();
// }

// async verifyRequiredFieldValidation() {
//   await expect(this.locators.emailInput).toBeInvalid();
//   await expect(this.locators.passwordInput).toBeInvalid();
// }
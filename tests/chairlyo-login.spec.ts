// import { expect, test } from '../fixtures/fixtures';
// import LoginPage from '../pages/LoginPage';

// test.describe('Login', () => {
//   let loginPage: LoginPage;

//   test.beforeEach('Navigate to Chairlyo Login Page', async ({ uiBaseUrl, page }) => {
//     loginPage = new LoginPage(page);
//     await loginPage.navigateToChairlyo(uiBaseUrl);
//   });

//   test('Login with valid credentials', async ({ email, password, page }) => {
//     // Different ways to locate the Email field

//     // CSS Attribute Selector (Recommended for this demo)
//     // await loginPage.fillEmail(email);
//     // await loginPage.fillEmail(email)

//     await loginPage.loginToChairlyo(email, password);
//     await loginPage.verifyLoginSuccess();
//     await loginPage.verifyDashboardText();

//     //getByText is used to locate the element with text Dashboard when there is no any locator available
//     // await expect(page.getByText('Dashboard').nth(1)).toBeVisible();

//     // ID Selector
//     // await page.locator('#email').fill(email);

//     // Name Attribute
//     // await page.locator('[name="email"]').fill(email);

//     // By Role
//     // await page.getByRole('textbox', { name: 'Email*' }).fill(email);

//     // By Placeholder
//     // await page.getByPlaceholder('e.g. xyz@gmail.com').fill(email);

//     // Different ways to locate the Password field

//     // CSS Attribute Selector
//     // await loginPage.locators.passwordInput.fill(password);

//     // ID Selector
//     // await page.locator('#password').fill(password);

//     // By Label
//     // await page.getByLabel('Password').fill(password);

//     // Different ways to locate the Login button

//     // By Role (Recommended)
//     // await page.getByRole('button', { name: 'Log In' }).click();

//     // Text Selector
//     // await page.getByText('Log In').click();

//     // CSS Selector
//     // await page.locator('button[type="submit"]').click();
//     // await loginPage.locators.loginButton.click();


//     // Assertions
//     // await expect(loginPage.locators.alertMessage).toBeVisible();
//     // await expect(loginPage.locators.alertMessage).toHaveText(
//     //   'SuccessLogin successful!'
//     // );

//     // Optional: Verify successful navigation
//     // await expect(page).toHaveURL(/dashboard/);
//   });

//   test('Login with invalid credentials', async ({ page }) => {
//     await page.locator('[type="email"]').fill('invalid@email.com');
//     await page.locator('[name="password"]').fill('invalidpassword');

//     await page.getByRole('button', { name: 'log in' }).click();

//     await expect(page.getByRole('alert')).toBeVisible();

//     // Replace with the actual message shown by the application
//     await expect(page.getByRole('alert')).toHaveText('ErrorInvalid credentials');

//     // OR if you only want to check that an error is displayed
//     // await expect(page.getByRole('alert')).toContainText('Invalid');
//   });
//   test('test', async ({ page, email, password }) => {
//     // const loginPage = new LoginPage(page);
//     await page.locator('//*[@id="email"]').fill(email);
//     // await page.getByLabel('Email*').fill(email);
//     await loginPage.fillEmail(email);
//     await loginPage.fillPassword(password);

//     await page.locator('button').filter({ hasText: 'Log in' }).click({force: true});

//     // await page.locator('button').filter({ hasText: 'Log in' }).click();
//     // await page.getByRole('button', { name: 'log in' }).click();
//     // await page.locator('/html/body/div[1]/div/div/div[2]/div/div[2]/h1').click();
//     await expect(page.getByRole('alert')).toBeVisible();
//     await expect(page.getByRole('alert')).toHaveText(
//       'SuccessLogin successful!'
//     );
//     // await page.getByTestId('email').fill(email);
//   })
//   test('Verify Email and Password Field Values', async ({ email, password }) => {
//     //Email input field value verification
//     await loginPage.fillEmail(email);
//     await loginPage.verifyEmailFieldValue(email);

//     //Password input field value verification
//     await loginPage.fillPassword(password);
//     await loginPage.verifyPasswordFieldValue(password);

//     //Click Login Button
//     await loginPage.clickLoginButton();

//     //Verify Login Success
//     await loginPage.verifyLoginSuccess();
//     // await page.toHaveURL(/.*dashboard/);
//     // await page.waitForURL(/.*dashboard/);
//   })
// });


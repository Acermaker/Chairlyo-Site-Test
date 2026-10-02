import { test, expect } from '@playwright/test';

import { loginLocators } from '../../myLocators/login.locator';  
import { LoginPage } from '../../pages/login.page'; 

import { aborted } from 'node:util';


// test.beforeEach(async ({ page }) =>{
//   await page.goto('https://qa03.stage.chairlyo.com');
//   await expect(page).toHaveURL('https://qa03.stage.chairlyo.com');
// });

// test.afterEach(async ({ page }) =>{
// await page.close();
// });


test.describe('Login Tests', () =>{

let loginPage: LoginPage;

const email = process.env.ORG_ADMIN_EMAIL as string;
const password = process.env.ORG_ADMIN_PASSWORD as string;
const url = process.env.BASE_URL as string;

test.beforeEach(async ({ page }) =>{
loginPage = new LoginPage(page);
await loginPage.goto(url);
});


test('Login to Chairlyo with valid credentials', async ({ page }) =>{

await loginPage.loginToChairlyo(email, password);
await loginPage.verifySuccessfulLogin(url);

});

test(' Negative Login to Chairlyo with invalid email', async ({ page }) =>{
const invalidEmail = 'admin@test.com';

await loginPage.loginToChairlyo(invalidEmail, password);
await loginPage.verifyUnsuccessfulLogin(url);
});

test(' Negative Login to Chairlyo with invalid password', async ({ page }) =>{
const invalidPassword = 'S=kill@123';

await loginPage.loginToChairlyo(email, invalidPassword);
await loginPage.verifyUnsuccessfulLogin(url);
});

test('Negative Login to Chairlyo with invalid credentials', async ({ page }) =>{
const invalidEmail = 'admin@test.com';
const invalidPassword = 'S=kill@123';

await loginPage.loginToChairlyo(invalidEmail, invalidPassword);
await loginPage.verifyUnsuccessfulLogin(url);;
});


test('Negative Login to Chairlyo with empty email', async ({ page }) =>{
const invalidEmail = '';

await loginPage.loginToChairlyo(invalidEmail, password);
await expect(page.getByText('invalid email address')).toBeVisible();
});


test('Negative Login to Chairlyo with empty password', async ({ page }) =>{
const invalidPassword = '';

await loginPage.loginToChairlyo(email, invalidPassword);
await expect(page.getByText('Password is required')).toBeVisible();
});


test('Negative Login to Chairlyo with empty fields', async({ page }) =>{ 
const invalidEmail = '';
const invalidPassword = '';

await loginPage.loginToChairlyo(invalidEmail, invalidPassword);
await expect(page.getByText('invalid email address')).toBeVisible();
await expect(page.getByText('Password is required')).toBeVisible();
});


test('Negative Login to Chairlyo with leading and trailing spaces in the email', async({ page }) =>{
const spacedEmail = '  skill admin@test.com  ';

await loginPage.loginToChairlyo(spacedEmail, password);
 //await expect(page.getByText('invalid email address/i')).toBeVisible();
 await expect(page).toHaveURL(url);

});


test('Negative Login to Chairlyo with invalid email format', async ({ page }) => {
 const invalidEmail = 'skilladmin @test.';

await loginPage.loginToChairlyo(invalidEmail, password);
// await expect(page.getByText('Invalid email address')).toBeVisible();
 await expect(page).toHaveURL(url);

});

});







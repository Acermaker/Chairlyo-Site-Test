import { test, expect } from '@playwright/test';
import { branchcreateLocators } from '../../myLocators/branchcreate.locator';
import { BranchCreatePage } from '../../pages/branchcreate.page';


test.describe( 'Branch Create Test', () =>{
  let branchcreatePage: BranchCreatePage;
const email = 'skilladmin@test.com';
const password = 'Skill@123';
const loginurl = 'https://qa03.stage.chairlyo.com/';
const addbranchurl = 'https://qa03.stage.chairlyo.com/branches/add';

test.beforeEach(async ({ page }) =>{
branchcreatePage = new BranchCreatePage(page);
await branchcreatePage.goto(loginurl);
});


test('Login with valid credentials for addbranch', async ({ page})=> {
  
await branchcreatePage.loginToChairlyo(email, password);
await branchcreatePage.verifySuccessfulLogin(loginurl);

});

test('addbranch button click test', async ({ page})=>{

await branchcreatePage.loginToChairlyo(email, password);
await branchcreatePage.verifySuccessfulLogin(loginurl);
await branchcreatePage.clickAddBranch();
await expect(page).toHaveURL(addbranchurl);

});

test('addbranch branch details fillup', async ({ page})=>{

await branchcreatePage.loginToChairlyo(email, password);
await branchcreatePage.verifySuccessfulLogin(loginurl);
await branchcreatePage.clickAddBranch();
await expect(page).toHaveURL(addbranchurl);

await branchcreatePage.fillBranchName();
await branchcreatePage.fillBranchSlug();
await branchcreatePage.fillBranchPhonenum();
await branchcreatePage.fillBranchEmail();

await page.getByText('Select Status').click();
await page.locator("div[role='listbox'], ul, [id*='listbox']").getByText('Active', { exact: true }).click();

await page.getByLabel('Address*').fill ('Kathmandu');

await page.locator(`#admin_first_name`).fill ('Kevin');
await page.locator(`#admin_last_name`).fill ('K.C');
await page.locator(`#admin_email`).last().fill(`${['aayush', 'biraj', 'niranjan', 'kriti', 'pradip', 'alisha', 'sagar', 'rohan'][Math.floor(Math.random() * 8)]}${Math.floor(100 + Math.random() * 900)}@gmail.com`);
await page.locator(`//input[@name='admin_password']`).fill ('Kevin1@234');
await page.locator(`//input[@name='phone']`).last().fill(`97797${Math.floor(10000000 + Math.random() * 90000000)}`);

await page.locator(`button:has-text("Save Changes")`).click();

await expect(page).toHaveURL(loginurl);
await expect(page.getByRole('heading', { name: 'Branch Created' })).toBeVisible();
await expect(page.getByText('The branch has been created successfully.', { exact: true })).toBeVisible();


});


});
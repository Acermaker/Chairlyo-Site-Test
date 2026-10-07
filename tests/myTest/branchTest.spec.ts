import { test, expect } from '@playwright/test';
import { branchcreateLocators } from '../../myLocators/branchcreate.locator';
import { BranchCreatePage } from '../../pages/branchcreate.page';


test.describe( 'Branch Create,Edit and Delete Test', () =>{
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

test('Branch Create With Details-Fillup', async ({ page})=>{

await branchcreatePage.loginToChairlyo(email, password);
await branchcreatePage.verifySuccessfulLogin(loginurl);
await branchcreatePage.clickAddBranch();
await expect(page).toHaveURL(addbranchurl);

await branchcreatePage.fillBranchName();
await branchcreatePage.fillBranchSlug();
await branchcreatePage.fillBranchPhonenum();
await branchcreatePage.fillBranchEmail();

await branchcreatePage.fillSelectStatus();

await branchcreatePage.fillBranchAddress();

await branchcreatePage.fillAdminFirstName();
await branchcreatePage.fillAdminLastName();
await branchcreatePage.fillAdminEmail();
await branchcreatePage.fillAdminPassword();
await branchcreatePage.fillAdminPhonenum();

await branchcreatePage.fillSaveChanges();

await expect(page).toHaveURL(loginurl);
await branchcreatePage.branchCreateToast();
await branchcreatePage.branchCreateSuccessMessage();
});

test('Branch is found through search input field', async ({ page })=> {
 
 await branchcreatePage.loginToChairlyo(email, password);
  await branchcreatePage.verifySuccessfulLogin(loginurl);

  const slug = branchcreatePage.generateUniqueSlug();

  await branchcreatePage.clickAddBranch();
  await expect(page).toHaveURL(addbranchurl);

  await branchcreatePage.fillBranchName();
  await branchcreatePage.fillBranchSlugValue(slug);
  await branchcreatePage.fillBranchPhonenum();
  await branchcreatePage.fillBranchEmail();
  await branchcreatePage.fillSelectStatus();
  await branchcreatePage.fillBranchAddress();
  await branchcreatePage.fillAdminFirstName();
  await branchcreatePage.fillAdminLastName();
  await branchcreatePage.fillAdminEmail();
  await branchcreatePage.fillAdminPassword();
  await branchcreatePage.fillAdminPhonenum();
  await branchcreatePage.fillSaveChanges();

  await expect(page).toHaveURL(loginurl);
  await expect(branchcreatePage.locators.branchCreateToast).toBeVisible();
  await expect(branchcreatePage.locators.branchCreateSuccessMessage).toBeVisible();

  await branchcreatePage.searchBranch(slug);
  await expect(page.getByText(slug)).toBeVisible();

});



test('Branch Slug Update', async ({ page }) => {
  const branchcreatePage = new BranchCreatePage(page);

 
  await branchcreatePage.loginToChairlyo(email, password);
  await branchcreatePage.verifySuccessfulLogin(loginurl);


  const slug = `unique-saloon-${Date.now()}`;
  await branchcreatePage.clickAddBranch();
  await expect(page).toHaveURL(addbranchurl);
  await branchcreatePage.fillBranchName();
  await branchcreatePage.fillBranchSlugValue(slug);
  await branchcreatePage.fillBranchPhonenum();
  await branchcreatePage.fillBranchEmail();
  await branchcreatePage.fillSelectStatus();
  await branchcreatePage.fillBranchAddress();
  await branchcreatePage.fillAdminFirstName();
  await branchcreatePage.fillAdminLastName();
  await branchcreatePage.fillAdminEmail();
  await branchcreatePage.fillAdminPassword();
  await branchcreatePage.fillAdminPhonenum();
  await branchcreatePage.fillSaveChanges();
  await expect(branchcreatePage.locators.branchCreateToast).toBeVisible();
  await expect(branchcreatePage.locators.branchCreateSuccessMessage).toBeVisible();

  await branchcreatePage.navigateToEditBranch(slug);

const updatedSlug = branchcreatePage.generateUniqueSlug();
await branchcreatePage.updateBranchSlug(updatedSlug);

 await branchcreatePage.verifyBranchUpdateSuccess();
});


test('Deleting the Created Branch', async({ page })=> {
 const branchcreatePage = new BranchCreatePage(page);

 
  await branchcreatePage.loginToChairlyo(email, password);
  await branchcreatePage.verifySuccessfulLogin(loginurl);


  const slug = `unique-saloon-${Date.now()}`;
  await branchcreatePage.clickAddBranch();
  await expect(page).toHaveURL(addbranchurl);
  await branchcreatePage.fillBranchName();
  await branchcreatePage.fillBranchSlugValue(slug); 
  await branchcreatePage.fillBranchPhonenum();
  await branchcreatePage.fillBranchEmail();
  await branchcreatePage.fillSelectStatus();
  await branchcreatePage.fillBranchAddress();
  await branchcreatePage.fillAdminFirstName();
  await branchcreatePage.fillAdminLastName();
  await branchcreatePage.fillAdminEmail();
  await branchcreatePage.fillAdminPassword();
  await branchcreatePage.fillAdminPhonenum();
  await branchcreatePage.fillSaveChanges();
  await expect(branchcreatePage.locators.branchCreateToast).toBeVisible();
  await expect(branchcreatePage.locators.branchCreateSuccessMessage).toBeVisible();

  await branchcreatePage.navigateToEditBranch(slug);

await expect(branchcreatePage.locators.branchCreateToast).toBeVisible();
await expect(branchcreatePage.locators.branchCreateSuccessMessage).toBeVisible();

await page.goto(loginurl);
await branchcreatePage.clickDeleteIcon(slug);
await branchcreatePage.confirmDelete();
await expect(branchcreatePage.locators.branchDeleteToast).toBeVisible();
await expect(branchcreatePage.locators.branchDeleteSuccessMessage).toBeVisible();
await expect(page.getByText(slug)).not.toBeVisible();

});


});


test.describe( 'Branch Create Negative Test', () => {

 let branchcreatePage: BranchCreatePage;
const email = process.env.TEST_EMAIL!;
const password = process.env.TEST_PASSWORD!;
const loginurl = process.env.LOGIN_URL!;
const addbranchurl = 'https://qa03.stage.chairlyo.com/branches/add';

test.beforeEach(async ({ page }) =>{
branchcreatePage = new BranchCreatePage(page);
await branchcreatePage.goto(loginurl);
});

test('Branch Create fails with all mandatory fields empty', async ({ page }) => {
  await branchcreatePage.loginToChairlyo(email, password);
  await branchcreatePage.verifySuccessfulLogin(loginurl);
  await branchcreatePage.clickAddBranch();
  await expect(page).toHaveURL(addbranchurl);

 
  await branchcreatePage.fillSaveChanges();

  
  await expect(page).toHaveURL(addbranchurl);

  await expect(page.getByText('Form Validation Error')).toBeVisible(); 
  await expect(page.getByText('Please check the form for errors.')).toBeVisible();
});


test('Branch create fails with invalid emailInput', async({ page })=> { 

await branchcreatePage.loginToChairlyo(email, password);
  await branchcreatePage.verifySuccessfulLogin(loginurl);
  await branchcreatePage.clickAddBranch();
  await expect(page).toHaveURL(addbranchurl);

  await branchcreatePage.fillBranchName();
  await branchcreatePage.fillBranchSlug();
  await branchcreatePage.fillBranchPhonenum();
  await branchcreatePage.fillBranchEmailValue('invalid-email-format');

  await branchcreatePage.fillSelectStatus();
  await branchcreatePage.fillBranchAddress();

  await branchcreatePage.fillAdminFirstName();
  await branchcreatePage.fillAdminLastName();
  await branchcreatePage.fillAdminEmail();
  await branchcreatePage.fillAdminPassword();
  await branchcreatePage.fillAdminPhonenum();

  await branchcreatePage.fillSaveChanges();

  await expect(page).toHaveURL(addbranchurl);

  await expect(branchcreatePage.locators.invalidEmail).toBeVisible();
});


test('Branch create fails with invalid phone number', async({ page })=> {

await branchcreatePage.loginToChairlyo(email, password);
  await branchcreatePage.verifySuccessfulLogin(loginurl);
  await branchcreatePage.clickAddBranch();
  await expect(page).toHaveURL(addbranchurl);

  await branchcreatePage.fillBranchName();
  await branchcreatePage.fillBranchSlug();
  await branchcreatePage.fillBranchPhonenumValue('123');
  await branchcreatePage.fillBranchEmail();

  await branchcreatePage.fillSelectStatus();
  await branchcreatePage.fillBranchAddress();

  await branchcreatePage.fillAdminFirstName();
  await branchcreatePage.fillAdminLastName();
  await branchcreatePage.fillAdminEmail();
  await branchcreatePage.fillAdminPassword();
  await branchcreatePage.fillAdminPhonenum();

  await branchcreatePage.fillSaveChanges();

  await expect(page).toHaveURL(addbranchurl);

  await expect(branchcreatePage.locators.invalidPhonenum).toBeVisible();

});





});
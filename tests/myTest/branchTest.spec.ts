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


test('Branch Slug Update', async ({ page }) => {
  const branchcreatePage = new BranchCreatePage(page);

 
  await branchcreatePage.loginToChairlyo(email, password);
  await branchcreatePage.verifySuccessfulLogin(loginurl);


  const slug = `unique-saloon-${Date.now()}`;
  await branchcreatePage.clickAddBranch();
  await expect(page).toHaveURL(addbranchurl);
  await branchcreatePage.fillBranchName();
  await branchcreatePage.fillBranchSlugValue(slug); // see note below
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


  await branchcreatePage.clickEditIcon(slug);
  await expect(page.getByRole('heading', { name: 'Edit Branches' })).toBeVisible();

const names = ['aayush', 'biraj', 'niranjan', 'kriti', 'pradip', 'alisha', 'sagar', 'rohan', 'arjun'];
const randomName = names[Math.floor(Math.random() * names.length)];
const updatedSlug = `unique-saloon-${randomName}-${Date.now()}`;
  await branchcreatePage.updateBranchSlug(updatedSlug);

 
  await expect(branchcreatePage.locators.branchUpdatedToast).toBeVisible();
await expect(branchcreatePage.locators.branchUpdateSuccessMessage).toBeVisible();
});


test('Deleting the Created Branch', async({ page })=> {
 const branchcreatePage = new BranchCreatePage(page);

 
  await branchcreatePage.loginToChairlyo(email, password);
  await branchcreatePage.verifySuccessfulLogin(loginurl);


  const slug = `unique-saloon-${Date.now()}`;
  await branchcreatePage.clickAddBranch();
  await expect(page).toHaveURL(addbranchurl);
  await branchcreatePage.fillBranchName();
  await branchcreatePage.fillBranchSlugValue(slug); // see note below
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


  await branchcreatePage.clickEditIcon(slug);
  await expect(page.getByRole('heading', { name: 'Edit Branches' })).toBeVisible();


await expect(branchcreatePage.locators.branchCreateToast).toBeVisible();
await expect(branchcreatePage.locators.branchCreateSuccessMessage).toBeVisible();

await page.goto('https://qa03.stage.chairlyo.com/');
await branchcreatePage.clickDeleteIcon(slug);
await branchcreatePage.confirmDelete();
await expect(branchcreatePage.locators.branchDeleteToast).toBeVisible();
await expect(branchcreatePage.locators.branchDeleteSuccessMessage).toBeVisible();
await expect(page.getByText(slug)).not.toBeVisible();

});


});
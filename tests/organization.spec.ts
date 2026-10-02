// import { expect, test, toApiPayload } from '../fixtures/fixtures';
// import LoginPage from '../pages/LoginPage';
// import OrganizationPage from '../pages/OrganizationPage';
// import DashboardPage from '../pages/DashboardPage';

// test.describe('Verify organization Page', () => {
//     let loginPage: LoginPage;
//     let organizationPage: OrganizationPage;
//     let dashboardPage: DashboardPage;

//     test.beforeEach('Navigate to Chairlyo Login Page', async ({ uiBaseUrl, page, email, password }) => {
//         loginPage = new LoginPage(page);
//         organizationPage = new OrganizationPage(page);
//         dashboardPage = new DashboardPage(page);
//         await loginPage.navigateToChairlyo(uiBaseUrl);
//         await loginPage.loginToChairlyo(email, password);
//         await loginPage.verifyLoginSuccess();
//         await loginPage.verifyDashboardText();
//     });

//     test('Navigate to Organization Page', async () => {
//         await dashboardPage.gotoOrganizationPage();
//         await organizationPage.verifyOrganizationPage();
//     });

//     test('Add a new Organization', async ({ organizationData, page }) => {
//         await dashboardPage.gotoOrganizationPage();
//         await organizationPage.verifyOrganizationPage();

//         await organizationPage.clickAddOrganizationButton();
//         await organizationPage.verifyAddOrganizationForm();
//         await organizationPage.addOrganization(organizationData);

//         await organizationPage.verifyOrganizationCreated(organizationData.name);
//         await page.screenshot({ path: 'screenshots/organizationtable.png', fullPage: true });
//     });

//     test.describe('API-assisted setup', () => {
//         let createdOrganizationSlug: string | undefined;

//         test.afterEach(async ({ organizationService }) => {
//             if (createdOrganizationSlug) {
//                 await organizationService.deleteOrganization(createdOrganizationSlug);
//                 createdOrganizationSlug = undefined;
//             }
//         });

//         test('Organization created via API is visible in the UI list', async ({ organizationService, organizationData, planTypeId }) => {
//             const createdOrganization= await organizationService.createOrganization(toApiPayload(organizationData, planTypeId));
//             createdOrganizationSlug = createdOrganization.slug;

//             await dashboardPage.gotoOrganizationPage();
//             await organizationPage.verifyOrganizationPage();
//             await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();
//         });

//         test('API asisted test', async({organizationService, organizationData, planTypeId})=>{
//             await organizationService.createOrganization(toApiPayload(organizationData, planTypeId));
//             await dashboardPage.gotoOrganizationPage();
//             await organizationPage.verifyOrganizationPage();
//             await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();
//         })

//         test('Edit Organization that are created with API', async ({ organizationService, organizationData, planTypeId }) => {
//             const organization = await organizationService.createOrganization(toApiPayload(organizationData, planTypeId));
//             createdOrganizationSlug = organization.slug;

//             await dashboardPage.gotoOrganizationPage();
//             await organizationPage.verifyOrganizationPage();
//             await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();

//             await organizationPage.editOrganization(organizationData.name, '20');

//             await expect(organizationPage.organizationLocators.alertMessage).toBeVisible();
//         });

//         test('Delete Organization that are created with API', async ({ organizationService, organizationData, planTypeId }) => {
//             const organization = await organizationService.createOrganization(toApiPayload(organizationData, planTypeId));
//             createdOrganizationSlug = organization.slug;

//             await dashboardPage.gotoOrganizationPage();
//             await organizationPage.verifyOrganizationPage();
//             await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toBeVisible();

//             await organizationPage.deleteOrganization(organizationData.name);

//             await expect(organizationPage.getOrganizationRowByName(organizationData.name)).toHaveCount(0);
//             createdOrganizationSlug = undefined; // already removed via UI, skip afterEach API cleanup
//         });
//     });
// });

import { test, expect } from '@playwright/test';
import { BranchService } from '../../api/services/branch.services';
import { ApiClient } from '../../api/client';
import { AuthService } from '../../api/services/auth.services';

import { BranchCreatePage } from '../../pages/branchcreate.page';

import {
generateBranchPayload,
} from '../../fixtures/api.branch-data';

const email = process.env.ORG_ADMIN_EMAIL!;
const password = process.env.ORG_ADMIN_PASSWORD!;
const loginurl = process.env.BASE_URL!

let branchcreatePage: BranchCreatePage;
let branchService: BranchService;

let createdBranch: any;
let updatedSlug: string;


test.beforeEach(async ({ page, request }) => {
// UI setup
branchcreatePage = new BranchCreatePage(page);
await page.goto(loginurl);

await branchcreatePage.loginToChairlyo(email, password);
await branchcreatePage.verifySuccessfulLogin(loginurl);

// API setup
const apiClient = new ApiClient(request);
const authService = new AuthService(apiClient);
await authService.login(email, password);

branchService = new BranchService(apiClient);
});

test.describe('Hybrid API & UI Branch Workflows', () => {
test.describe.configure({ mode: 'serial' });

test('Create branch via API and verify it appears in UI', async ({ page }) => {
// Create Branch via API
const payload = generateBranchPayload();
createdBranch = await branchService.createBranch(payload);

expect(createdBranch).toBeDefined();

// Verify in UI
await branchcreatePage.searchBranch(createdBranch.slug);
await expect(page.getByText(createdBranch.slug)).toBeVisible();
});

test('Update branch slug via UI and verify via API backend', async () => {

  expect(createdBranch).toBeDefined();

  await branchcreatePage.navigateToEditBranch(createdBranch.slug);

  updatedSlug = branchcreatePage.generateUniqueSlug();

  console.log('Generated slug:', updatedSlug);

  await branchcreatePage.updateBranchSlug(updatedSlug);

  await branchcreatePage.verifyBranchUpdateSuccess();

  console.log('Slug being requested from API:', updatedSlug);

  const fetched = await branchService.getBranch(updatedSlug);

  console.log('Fetched branch:', fetched);

  expect(fetched).toBeDefined();
  expect(fetched.slug).toBe(updatedSlug);

});



test('Delete branch via API and verify cleanup', async () => {
const targetSlug = updatedSlug || createdBranch.slug;

expect(targetSlug).toBeTruthy();

await branchService.deleteBranch(targetSlug);

const responseDeletion = await branchService.getBranchRaw(targetSlug);

expect(responseDeletion.status()).toBe(404);
});


});
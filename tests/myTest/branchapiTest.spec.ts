import { test, expect } from '@playwright/test';
import { BranchService } from '../../api/services/branch.services';
import { ApiClient } from '../../api/client';
import { AuthService } from '../../api/services/auth.services';

import {
  generateBranchPayload,
  generateBranchUpdatePayload,
  generateInvalidEmailPayload,
  generateInvalidPhonePayload,
  generateEmptyRequiredFieldsPayload,
} from '../../fixtures/api.branch-data';

const email = 'skilladmin@test.com';
const password = 'Skill@123';

test.describe.skip('Positive Branch API Tests', () => {
  let branchService: BranchService;

  test.beforeEach(async ({ request }) => {
    const apiClient = new ApiClient(request);
    const authService = new AuthService(apiClient);
    await authService.login(email, password);
    branchService = new BranchService(apiClient);
  });

  test('API: create a branch successfully', async () => {
    const payload = generateBranchPayload();
    const created = await branchService.createBranch(payload);

    expect(created.name).toBe(payload.name);
    expect(created.slug).toBe(payload.slug);
    expect(created.email).toBe(payload.email);
    expect(created.status).toBe('active');
    expect(created.admin.email).toBe(payload.branch_admin.email);
  });

  test('API: update a branch successfully', async () => {
    const created = await branchService.createBranch(generateBranchPayload());
    const updatePayload = generateBranchUpdatePayload();

    const updated = await branchService.updateBranch(created.slug, updatePayload);

    expect(updated.slug).toBe(updatePayload.slug);
    expect(updated.name).toBe(updatePayload.name);
  });

  test('API: delete a branch successfully', async () => {
    const created = await branchService.createBranch(generateBranchPayload());

    await branchService.deleteBranch(created.slug);

  const response = await branchService.getBranchRaw(created.slug);
  expect(response.status()).toBe(404);
  });

  test('API: get a single branch by id', async () => {
    const created = await branchService.createBranch(generateBranchPayload());
    const fetched = await branchService.getBranch(created.slug);

    expect(fetched.id).toBe(created.id);
    expect(fetched.name).toBe(created.name);
  });

  test('API: list branches returns paginated results', async () => {
  const response = await branchService.listBranchesRaw();
  const body = await response.json();

  expect(body).toHaveProperty('results');
  expect(body).toHaveProperty('count');
  expect(Array.isArray(body.results)).toBe(true);
});



});

test.describe.skip('Negative Branch API Tests', () => {
  let branchService: BranchService;

  test.beforeEach(async ({ request }) => {
    const apiClient = new ApiClient(request);
    const authService = new AuthService(apiClient);
    await authService.login(email, password);
    branchService = new BranchService(apiClient);
  });

  test('API: create branch fails with invalid email', async () => {
    const payload = generateInvalidEmailPayload();
    const response = await branchService.createBranchRaw(payload);
    expect(response.status()).toBe(400);
  });

  test('API: create branch fails with invalid phone', async () => {
    const payload = generateInvalidPhonePayload();
    const response = await branchService.createBranchRaw(payload);
    expect(response.status()).toBe(400);
  });

  test('API: create branch fails with empty required fields', async () => {
    const payload = generateEmptyRequiredFieldsPayload();
    const response = await branchService.createBranchRaw(payload);
    expect(response.status()).toBe(400);
  });
  
});
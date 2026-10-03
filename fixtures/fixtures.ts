// import { expect as baseExpect, test as baseTest } from '@playwright/test';
// import { ApiClient } from '../api/client/ApiClient';
// import { AuthService } from '../api/services/AuthService';
// import { OrganizationService } from '../api/services/OrganizationService';
// import { env } from '../config/env';
// import { buildOrganizationData, OrganizationData } from './test-data';

// export { toApiPayload } from './api-mappers';
// export type { OrganizationData } from './test-data';

// type Fixtures = {
//   email: string;
//   password: string;
//   uiBaseUrl: string;
//   apiBaseUrl: string;
//   organizationData: OrganizationData;
//   apiClient: ApiClient;
//   authService: AuthService;
//   authToken: string;
//   organizationService: OrganizationService;
//   planTypeId: number;
// };

// export const test = baseTest.extend<Fixtures>({
//   email: env.email,
//   password: env.password,
//   uiBaseUrl: env.uiBaseUrl,
//   apiBaseUrl: env.apiBaseUrl,

//   organizationData: async ({}, use) => {
//     await use(buildOrganizationData());
//   },

//   apiClient: async ({ request, apiBaseUrl }, use) => {
//     await use(new ApiClient(request, apiBaseUrl));
//   },

//   authService: async ({ apiClient }, use) => {
//     await use(new AuthService(apiClient));
//   },

//   authToken: async ({ authService, email, password }, use) => {
//     const token = await authService.loginWithAPI(email, password);
//     await use(token);
//   },

//   organizationService: async ({ apiClient, authToken }, use) => {
//     await use(new OrganizationService(apiClient));
//   },

//   // Plan type "Claude" is confirmed to always have id 40.
//   planTypeId: async ({}, use) => {
//     await use(40);
//   },
// });

// export const expect = baseExpect;

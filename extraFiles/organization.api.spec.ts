// import { expect, test, toApiPayload } from '../../fixtures/fixtures';

// test.describe('Organization API', () => {
//     test('creates, updates and deletes an organization', async ({ organizationService, organizationData, planTypeId }) => {
//         const created = await organizationService.createOrganization(toApiPayload(organizationData, planTypeId));
//         expect(created.name).toBe(organizationData.name);
//         expect(created.slug).toBe(organizationData.slug);
//         expect(created.id).toBeTruthy();

//         const updated = await organizationService.updateOrganization(created.slug, {
//             name: `${organizationData.name} Updated`,
//             trial_days: '20',
//         });
//         expect(updated.name).toBe(`${organizationData.name} Updated`);
//         expect(updated.trial_days).toBe(20);

//         await organizationService.deleteOrganization(created.slug);
//     });
// });

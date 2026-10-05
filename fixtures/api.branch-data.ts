import { BranchPayload, BranchUpdatePayload } from '../api/types/branch.types';

const generatePhoneNumber = (): string => {
  const randomDigits = Math.floor(Math.random() * 1e7)
    .toString()
    .padStart(7, '0');

  return `+977980${randomDigits}`;
};

export const generateBranchPayload = (): BranchPayload => {
  const suffix = Date.now().toString();

  return {
    name: `SUJAN API Branch ${suffix}`,
    slug: `sujan-api-branch-${suffix}`,
    email: `sunny.api.branch.${suffix}@example.com`,
    phone: generatePhoneNumber(),
    address: 'Shankhamul, Kathmandu, Nepal',
    status: 'active',

    branch_admin: {
      first_name: 'SUNNY',
      last_name: `ApiAdmin${suffix}`,
      email: `sunny.api.admin.${suffix}@example.com`,
      password: 'Admin@123',
      phone: generatePhoneNumber(),
    },
  };
};

export const generateBranchUpdatePayload = (): BranchUpdatePayload => {
  const suffix = Date.now().toString();

  return {
    name: `SUJAN API Branch Updated ${suffix}`,
    slug: `sujan-api-branch-updated-${suffix}`,
  };
};


export const generateInvalidEmailPayload = (): BranchPayload => {
  const payload = generateBranchPayload();
  return {
    ...payload,
    email: 'invalid-email-format', 
  };
};

export const generateInvalidPhonePayload = (): BranchPayload => {
  const payload = generateBranchPayload();
  return {
    ...payload,
    phone: '123', // too short to be valid
  };
};

export const generateEmptyRequiredFieldsPayload = (): BranchPayload => {
  const payload = generateBranchPayload();
  return {
    ...payload,
    name: '',
    slug: '',
  };
};
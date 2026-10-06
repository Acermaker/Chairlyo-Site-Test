import { OrganizationApiPayload } from '../api/types/organization.types';
import { OrganizationData } from './test-data';

export function toApiPayload(organizationData: OrganizationData, planTypeId: number): OrganizationApiPayload {
  return {
    admin_email: organizationData.admin.email,
    admin_first_name: organizationData.admin.firstName,
    admin_last_name: organizationData.admin.lastName,
    admin_password: organizationData.admin.password,
    admin_phone: organizationData.admin.phone,
    country: 'np',
    name: organizationData.name,
    organization_logo: '',
    plan_type: planTypeId,
    send_mail_notifications: false,
    slug: organizationData.slug,
    status: organizationData.status,
    timezone: 'Asia/Kathmandu',
    trial_days: organizationData.trialDays ?? '10',
  };
}

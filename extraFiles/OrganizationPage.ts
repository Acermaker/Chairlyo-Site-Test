import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';
import OrganizationLocators from './locators/organization.locator';

export default class OrganizationPage extends BasePage {
    readonly organizationLocators: OrganizationLocators;
    constructor(page: Page) {
        super(page);
        this.organizationLocators = new OrganizationLocators(page);
    }

    async verifyOrganizationPage() {
        await expect(this.page).toHaveURL(/\/organizations$/);
    }

    async clickAddOrganizationButton() {
        await this.organizationLocators.addOrganizationButton.click();
    }

    async verifyAddOrganizationForm() {
        await expect(this.organizationLocators.organizationForm).toBeVisible();
        await expect(this.organizationLocators.addOrgFormTitle).toBeVisible();
    }

    async fillOrganizationName(name: string) {
        await this.organizationLocators.organizationNameInput.fill(name);
    }

    async fillSlug(slug: string) {
        await this.organizationLocators.slugInput.fill(slug);
    }

    async selectStatus(status: string) {
        await this.organizationLocators.statusDropdown.click();
        await this.page.getByTestId('select-group').getByText(status, { exact: true }).click();
    }

    async selectPlanType(planType: string) {
        await this.organizationLocators.planTypeDropdown.click();
        await this.page.getByTestId('select-group').getByText(planType, { exact: true }).click();
    }

    async selectTimezone(timezone: string) {
        await this.organizationLocators.timezoneDropdown.click();
        await this.organizationLocators.timezoneSearchInput.fill(timezone);
        await this.page.getByText(timezone, { exact: false }).first().click();
    }

    async uploadOrganizationImage(filePath: string) {
        await this.organizationLocators.browseFilesButton.setInputFiles(filePath);
        await this.organizationLocators.cropAndUploadButton.click();
        await expect(this.organizationLocators.alertMessage).toBeVisible();
    }

    async fillTrialDays(trialDays: string) {
        await this.organizationLocators.trialDaysInput.fill(trialDays);
    }

    async fillOrganizationDetails(details: { name: string; slug: string; status: string; planType: string; timezone?: string; trialDays?: string; imagePath?: string }) {
        await this.fillOrganizationName(details.name);
        await this.fillSlug(details.slug);
        await this.selectStatus(details.status);
        await this.selectPlanType(details.planType);
        if (details.timezone) {
            await this.selectTimezone(details.timezone);
        }
        if (details.trialDays) {
            await this.fillTrialDays(details.trialDays);
        }
        if (details.imagePath) {
            await this.uploadOrganizationImage(details.imagePath);
        }
    }

    async fillFirstName(firstName: string) {
        await this.organizationLocators.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.organizationLocators.lastNameInput.fill(lastName);
    }

    async fillEmail(email: string) {
        await this.organizationLocators.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.organizationLocators.passwordInput.fill(password);
    }

    async selectCountryCode(countryCode: string) {
        await this.organizationLocators.countryCodeDropdown.click();
        await this.page.getByText(countryCode, { exact: false }).click();
    }

    async fillPhone(phone: string) {
        await this.organizationLocators.phoneInput.fill(phone);
    }

    async toggleEmailNotifications() {
        await this.organizationLocators.enableEmailNotificationsToggle.click();
    }

    async fillMainAdminDetails(admin: { firstName: string; lastName: string; email: string; password: string; phone: string; countryCode?: string; enableEmailNotifications?: boolean }) {
        await this.fillFirstName(admin.firstName);
        await this.fillLastName(admin.lastName);
        await this.fillEmail(admin.email);
        await this.fillPassword(admin.password);
        if (admin.countryCode) {
            await this.selectCountryCode(admin.countryCode);
        }
        await this.fillPhone(admin.phone);
        if (admin.enableEmailNotifications) {
            await this.toggleEmailNotifications();
        }
    }

    async clickSaveChanges() {
        await this.organizationLocators.saveChangesButton.click();
    }

    async clickCancel() {
        await this.organizationLocators.cancelButton.click();
    }

    async clickBack() {
        await this.organizationLocators.backButton.click();
    }

    getOrganizationRowByName(name: string) {
        return this.organizationLocators.organizationRow.filter({ hasText: name });
    }

    async verifyOrganizationCreated(name: string) {
        await expect(this.organizationLocators.alertMessage).toBeVisible();
        await expect(this.getOrganizationRowByName(name)).toBeVisible();
    }

    async clickEditIcon(name: string) {
        await this.getOrganizationRowByName(name).locator(this.organizationLocators.editIcon).click();
    }

    async editOrganization(name: string, updatedTrialDays: string) {
        await this.clickEditIcon(name);
        await this.fillTrialDays(updatedTrialDays);
        await this.clickSaveChanges();
    }

    async clickDeleteIcon(name: string) {
        await this.getOrganizationRowByName(name).locator(this.organizationLocators.deleteIcon).click();
    }

    async deleteOrganization(name: string) {
        await this.clickDeleteIcon(name);
        await this.organizationLocators.confirmDeleteText.fill('Delete Organization');
        await this.organizationLocators.confirmDeleteButton.click();
    }

    // async captureScreenshot() {
    //     testInfo: any
    //     // Screenshot of a specific element
    //     await this.organizationLocators.organizationNameInput.screenshot({
    //         path: 'screenshots/orgname.png',
    //     });
    //     // Attach to test report
    //     await testInfo.attach('organization input', {
    //         body: await this.page.screenshot(),
    //         contentType: 'image/png',
    //     });
    // }

    async addOrganization(org: {
        name: string; slug: string; status: string; planType: string; timezone?: string; trialDays?: string; imagePath?: string;
        admin: { firstName: string; lastName: string; email: string; password: string; phone: string; countryCode?: string; enableEmailNotifications?: boolean };
    }) {
        await this.fillOrganizationDetails(org);
        await this.fillMainAdminDetails(org.admin);
        await this.clickSaveChanges();
    }
}

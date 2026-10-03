import { Page, Locator } from '@playwright/test';

export default class DashboardLocators {
    readonly dashboardText: Locator;
    readonly organizationLocator: Locator;


    constructor(page: Page) {
        this.dashboardText = page.getByRole('heading', { name: 'Dashboard' });
        this.organizationLocator =page.getByRole('link', { name: 'Organizations' });
    }

}


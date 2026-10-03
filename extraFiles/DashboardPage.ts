import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';
import DashboardLocators from './locators/dashboard.locators';

export default class DashboardPage extends BasePage{
    readonly dashboardLocators: DashboardLocators;
    constructor(page:Page){
        super(page);
        this.dashboardLocators = new DashboardLocators(page);
    }
    
    // async verifyDashboardPage(){
    //     await expect(this.page).toHaveURL('/dashboard');
    // } 
    async navigateToOrganizationPage(){
        await this.page.goto('/organizations');
    }
    async gotoOrganizationPage(){
        // await this.verifyDashboardPage();
        await this.dashboardLocators.organizationLocator.click();
    }
}

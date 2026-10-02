import { Page, expect } from '@playwright/test';
import { BranchCreateLocators, branchcreateLocators } from '../myLocators/branchcreate.locator'; 

export class BranchCreatePage {
    readonly page: Page;
    readonly locators: BranchCreateLocators;
    readonly url = 'https://qa03.stage.chairlyo.com/branches/add';

    constructor(page: Page){
        this.page = page;
        this.locators = branchcreateLocators(page);
    }
    async gotoChairlyo() {
        await this.page.goto(this.url);
    }

    async goto(url:string) {
        await this.page.goto(url);
    }

async loginToChairlyo(email: string, password: string) {
    await this.locators.emailInput.fill(email);
    await this.locators.passwordInput.fill(password);
    await this.locators.loginButton.click();
}

async verifySuccessfulLogin(url:string) {
    await expect(this.page).toHaveURL(url);
    await expect(this.locators.loggedInUser).toBeVisible();
    await expect(this.locators.successToast).toBeVisible();
    await expect(this.locators.successMessage).toBeVisible();
}

async verifyUnsuccessfulLogin(url:string) {
    await expect(this.page).toHaveURL(url);
    await expect(this.locators.errorToast).toBeVisible();
    await expect(this.locators.errorMessage).toBeVisible();
}

async clickAddBranch() {
    await this.locators.addBranchbutton.click();
}

async fillBranchName() {
    await expect(this.locators.fillBranchName).toBeVisible();
    await this.locators.fillBranchName.fill(`Branch_${['Aayush', 'Biraj', 'Niranjan', 'Kriti', 'Pradip', 'Alisha', 'Sagar', 'Rohan'][Math.floor(Math.random() * 8)]}`);
}

async fillBranchSlug() {
    await expect(this.locators.fillBranchSlug).toBeVisible();
    await this.locators.fillBranchSlug.fill(`unique-saloon_${['Aayush', 'Biraj', 'Niranjan', 'Kriti', 'Pradip', 'Alisha', 'Sagar', 'Rohan'][Math.floor(Math.random() * 8)]}`);
}

async fillBranchPhonenum() {
    await expect(this.locators.fillBranchPhonenum).toBeVisible();
    await this.locators.fillBranchPhonenum.fill(`97798${Math.floor(10000000 + Math.random() * 90000000)}`);
}

async fillBranchEmail() {
    await expect (this.locators.fillBranchEmail).toBeVisible();
    await this.locators.fillBranchEmail.fill(`${['aayush', 'biraj', 'niranjan', 'kriti', 'pradip', 'alisha', 'sagar', 'rohan'][Math.floor(Math.random() * 8)]}${Math.floor(100 + Math.random() * 900)}@gmail.com`);
}




}


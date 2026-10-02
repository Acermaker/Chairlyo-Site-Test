import { Page, expect } from '@playwright/test';
import { loginLocators, LoginLocators } from '../myLocators/login.locator';

export class LoginPage {
    readonly page: Page;
    readonly locators: LoginLocators;
    readonly url = 'https://qa03.stage.chairlyo.com/login';

    constructor(page: Page){
        this.page = page;
        this.locators = loginLocators(page);
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


}


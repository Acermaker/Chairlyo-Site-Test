import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';
import LoginLocators from './locators/login.locators';

export default class LoginPage extends BasePage{
  readonly loginLocators: LoginLocators;

  constructor(page: Page){
    super(page);
    this.loginLocators= new LoginLocators(page);
  }

  async fillEmail(email:string){
    await this.loginLocators.emailInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.loginLocators.emailInput.fill(email);

    //Explicit timeout, don't use it in real tests, only for demo purpose
    await this.page.waitForTimeout(10000);
  }

  async verifyEmailFieldValue(email:string){
    await expect.soft(this.loginLocators.emailInput).toHaveValue(email);
  }

  async verifyPasswordFieldValue(password:string){
    await expect(this.loginLocators.passwordInput).toHaveValue(password);
  }

  async fillPassword(password:string){
    await this.loginLocators.passwordInput.fill(password);
  }

  async clickLoginButton(){
      await this.loginLocators.loginButton.click();
  }

  async loginToChairlyo(email:string, password: string){
    await this.loginLocators.emailInput.fill(email);
    await this.loginLocators.passwordInput.fill(password);
    await this.loginLocators.loginButton.click();
  }

  async verifyLoginSuccess(){
    await expect(this.loginLocators.alertMessage).toBeVisible();
    await expect(this.loginLocators.alertMessage).toHaveText('SuccessLogin successful!');
    await expect(this.loginLocators.dashboardText).toBeVisible();
  }

  async verifyLoginFailure(){
    await expect(this.loginLocators.alertMessage).toBeVisible();
    await expect(this.loginLocators.alertMessage).toHaveText('ErrorInvalid Credentials');
  }

  async verifyDashboardText(){
    await expect(this.loginLocators.dashboardText).toBeVisible();
  }

}
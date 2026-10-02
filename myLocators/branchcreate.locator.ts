import { Locator, Page} from '@playwright/test';
import { BranchCreatePage } from '../pages/branchcreate.page';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface BranchCreateLocators {
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    loggedInUser: Locator,
    successToast: Locator;
    successMessage: Locator;
    errorToast: Locator,
    errorMessage: Locator,

    addBranchbutton: Locator,
    fillBranchName: Locator,
    fillBranchSlug: Locator,
    fillBranchPhonenum: Locator,
    fillBranchEmail: Locator,
}

export const branchcreateLocators = (page: Page): BranchCreateLocators => ({
    emailInput: page.getByLabel('Email*'),
    passwordInput: page.locator('[name="password"]'),
    loginButton: page.getByRole('button', { name: 'Log in'}),

    loggedInUser: page.getByText('skilladmin@test.com'),
    successToast: page.getByText('Success', { exact:true }),
    successMessage: page.getByText('Login successful!'),
    errorToast: page.getByRole('heading', { name: 'Error' }),
    errorMessage: page.getByText('Invalid credentials', { exact: true }),


    addBranchbutton: page.getByRole('button', { name: 'Add Branch' }).first(),
 fillBranchName: page.getByRole('textbox', { name: /Branch Name/i }).first(),
 fillBranchSlug: page.getByRole('textbox', { name: /Slug/i }),
 fillBranchPhonenum: page.getByRole('textbox', { name: /Phone/i }).first(),
 fillBranchEmail: page.getByRole('textbox', { name: /Email/i }).first(),

    });
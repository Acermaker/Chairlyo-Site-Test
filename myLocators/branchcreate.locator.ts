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
    fillSelectStatus: Locator,
    fillBranchAddress: Locator,

    fillAdminFirstName: Locator,
    fillAdminLastName: Locator,
    fillAdminEmail: Locator,
    fillAdminPassword: Locator,
    fillAdminPhonenum: Locator,

    fillSaveChanges: Locator,

    branchCreateToast: Locator,
    branchCreateSuccessMessage: Locator,

    editBranchIcon: (slug: string) => Locator, 
    branchUpdatedToast: Locator,
    branchUpdateSuccessMessage: Locator,


    deleteBranchIcon: (slug: string) => Locator,
    deleteConfirmationInput: Locator,
confirmDeleteButton: Locator,
branchDeleteToast: Locator,
branchDeleteSuccessMessage: Locator,


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
 fillBranchEmail: page.getByLabel('Email*').first(),
 
 fillSelectStatus: page.getByText('Select Status'),
 fillBranchAddress: page.getByRole('textbox', { name: /Address/i }),

 fillAdminFirstName: page.locator(`#admin_first_name`),
 fillAdminLastName: page.locator(`#admin_last_name`),
 fillAdminEmail: page.locator(`#admin_email`).last(),
 fillAdminPassword: page.locator('[name="admin_password"]'),
 fillAdminPhonenum: page.locator(`//input[@name='phone']`).last(),

 fillSaveChanges: page.locator(`button:has-text("Save Changes")`),
 branchCreateToast: page.getByRole('heading', { name: 'Branch Created' }),
 branchCreateSuccessMessage: page.getByText('The branch has been created successfully.', { exact: true }),
 
 editBranchIcon: (slug: string) => page.getByRole('row', { name: new RegExp(slug, 'i') }).getByRole('link', { name: 'Edit branch' }),
 branchUpdatedToast: page.getByRole('heading', { name: 'Branch Updated' }),
 branchUpdateSuccessMessage: page.getByText('The branch has been updated successfully.', { exact: true }),


deleteBranchIcon: (slug: string) => page.getByRole('row', { name: new RegExp(slug, 'i') }).locator('[title="Delete branch"]'),
// deleteDialogTitle: page.getByTestId('dialog-title'),
deleteConfirmationInput: page.getByPlaceholder('Type Delete Branch here'),
confirmDeleteButton: page.getByRole('button', { name: 'Delete Branch' }),
branchDeleteToast: page.getByRole('heading', { name: 'Deleted' }),
branchDeleteSuccessMessage: page.getByText('The item has been deleted successfully.', { exact: true }),

    });
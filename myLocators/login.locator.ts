// interface LoginLocators {
//     emailInput: string;
//     passwordInput: string;
//     loginButtonName: string;
//     errorHeadingName: string;
//     errorMessageText: string;
//     successHeadingName: string;
//     successMessageText: string;
// }

// const loginLocators: LoginLocators = {
//     emailInput: 'Email*',
//     passwordInput: '[name="password"]',
//     loginButtonName: 'Log in',      
//     errorHeadingName: 'Error',    
//     errorMessageText: 'Invalid credentials',     
//     successHeadingName: 'Success',    
//     successMessageText: 'Login successful!', 
// };

// export default loginLocators;


import { Locator, Page} from '@playwright/test';
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginLocators {
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    loggedInUser: Locator,
    successToast: Locator;
    successMessage: Locator;
    errorToast: Locator,
    errorMessage: Locator,
}

export const loginLocators = (page: Page): LoginLocators => ({
    emailInput: page.getByLabel('Email*'),
    passwordInput: page.locator('[name="password"]'),
    loginButton: page.getByRole('button', { name: 'Log in'}),

    loggedInUser: page.getByText('skilladmin@test.com'),
    successToast: page.getByText('Success', { exact:true }),
    successMessage: page.getByText('Login successful!'),
    errorToast: page.getByRole('heading', { name: 'Error' }),
    errorMessage: page.getByText('Invalid credentials', { exact: true }),

    });


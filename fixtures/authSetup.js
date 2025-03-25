import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

export const test = base.extend({
    validAuth: async ({page}, use) => {
        const login = new LoginPage(page);
        await login.navigate();
        await login.login('standard_user', 'secret_sauce')
        await use(login);
    },

    invalidAuth: async({page}, use) => {
        const login = new LoginPage(page);
        await login.navigate();
        await login.login('invalid', 'secret_sauce')
        await use(login);
    },

    lockedAuth: async({page}, use) => {
        const login = new LoginPage(page);
        await login.navigate();
        await login.login('locked_out_user', 'secret_sauce')
        await use(login);
    }
});
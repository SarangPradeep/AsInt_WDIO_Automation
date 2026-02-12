import { browser } from '@wdio/globals';
import BtpLoginPage from '../../../../PageObjectModel/BTP_Applications_Page/btpLogin.page';

describe('BTP Login | Negative Scenario', () => {

    const APP_URL = 'https://apm-02-asint.launchpad.cfapps.us10.hana.ondemand.com';

    beforeEach(async function () {
        this.timeout(120000);
        await browser.reloadSession();
        await BtpLoginPage.open(APP_URL);
    });

    it('should fail login with invalid credentials', async () => {
        await BtpLoginPage.login(
            'wrong.user@asint.net',
            'WrongPassword123'
        );

        const failed = await BtpLoginPage.isLoginFailed();
        expect(failed).toBe(true);
    });
});
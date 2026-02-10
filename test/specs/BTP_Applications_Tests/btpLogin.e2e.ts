import { browser } from '@wdio/globals';
import BtpLoginPage from '../../../PageObjectModel/BTP_Applications_Page/btpLogin.page';

describe('BTP Login | Positive & Negative Scenarios', () => {

    const APP_URL =
        'https://apm-02-asint.launchpad.cfapps.us10.hana.ondemand.com';

    beforeEach(async function () {
        this.timeout(120000);
        await browser.reloadSession();
        await BtpLoginPage.open(APP_URL);
    });

    it('should login successfully with valid credentials', async () => {
        await BtpLoginPage.login(
            'krishna.pala@asint.net',
            'Chigga@1305'
        );

        const success = await BtpLoginPage.isLoginSuccessful();
        expect(success).toBe(true);
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

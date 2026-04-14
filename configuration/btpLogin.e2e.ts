import 'dotenv/config'; // Ensures environment variables are loaded
import { browser } from '@wdio/globals';
import BtpLoginPage from '../page_object_model/btp_applications_page/configuration/btpLogin.page';

describe('BTP Login | Positive Scenario', () => {

    // Pull from .env or default to the URL if needed
    const APP_URL = process.env.APP_URL || 'https://apm-02-asint.launchpad.cfapps.us10.hana.ondemand.com';

    beforeEach(async function () {
        // Increased timeout for session reload in BTP environments
        this.timeout(120000);
        await browser.reloadSession();
        await BtpLoginPage.open(APP_URL);
    });

    it('should login successfully with valid credentials', async () => {
        // Passing credentials directly from the .env file
        await BtpLoginPage.login(
            process.env.SAP_USERNAME!, 
            process.env.SAP_PASSWORD!
        );

        // Verification step using the page object's built-in success check
        const success = await BtpLoginPage.isLoginSuccessful();
        
        // Corrected for Mocha/Chai: message goes inside the expect() or omitted for standard WDIO expect
        expect(success).toBe(true);
    });
});

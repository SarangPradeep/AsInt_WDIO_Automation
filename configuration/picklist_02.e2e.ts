import 'dotenv/config';
import { browser } from '@wdio/globals';
import BtpLoginPage from '../page_object_model/btp_applications_page/configuration/btpLogin.page';
import HomePage from '../page_object_model/btp_applications_page/configuration/home.page';
import ConfigurationAppPage from '../page_object_model/btp_applications_page/configuration/configurationPicklist.page';
import SapUtils from '../utils/utils';

// Fail fast if required env vars are missing
if (!process.env.APP_URL || !process.env.BTP_USERNAME || !process.env.BTP_PASSWORD) {
    throw new Error(
        '[CONFIG ERROR] Missing required environment variables. ' +
        'Ensure APP_URL, BTP_USERNAME, and BTP_PASSWORD are set in your .env file.'
    );
}

describe('Functionality: Configuration App & Picklist Navigation', () => {

    // const APP_URL = process.env.APP_URL!;

    // before(async function () {
    //     this.timeout(200000);
    //     await browser.reloadSession();
    //     await BtpLoginPage.open(APP_URL);
    //     await BtpLoginPage.login(process.env.BTP_USERNAME!, process.env.BTP_PASSWORD!);
    // });

    it('should verify successful login to BTP', async () => {
        const success = await BtpLoginPage.isLoginSuccessful();
        expect(success).toBe(true);
    });

    it('should navigate to the Configuration Management App', async () => {
        await HomePage.waitForHomePageToLoad();
        await HomePage.clickTile('Configurations');

        // Wait for page to stabilize after navigation
        await SapUtils.waitForBusyIndicatorToDisappear();
        await SapUtils.waitForSAPPopupAndClose(10);

        expect(await ConfigurationAppPage.isAppLoaded()).toBe(true);
    });

    it('should navigate into the Picklist section', async () => {

        await SapUtils.waitForBusyIndicatorToDisappear();
        await SapUtils.waitForSAPPopupAndClose();

        await ConfigurationAppPage.navigateToPicklist();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('picklist'),
            {
                timeout: 30000,
                timeoutMsg: 'Navigation to Picklist timed out'
            }
        );

        expect(await browser.getUrl()).toContain('picklist');
        console.log('[SUCCESS] Picklist functionality reached.');

        await ConfigurationAppPage.clickCreateButton();
        console.log('[SUCCESS] Create button clicked.');

        await ConfigurationAppPage.createPicklist();
    });

    it('should open the created Picklist and Add Column', async () => {

        await ConfigurationAppPage.openCreatedPicklist();
        await ConfigurationAppPage.clickAddButton();
        await ConfigurationAppPage.fillPicklistDetails();
        await ConfigurationAppPage.clickAddButton();
        
        await ConfigurationAppPage.clickAddButton();
        await ConfigurationAppPage.fillPicklistDetailss();
        await ConfigurationAppPage.clickAddButton();
    });

    it('should upload picklist data file', async () => {

        await ConfigurationAppPage.uploadDataFile();
        await ConfigurationAppPage.clickUploadOkButton();
        console.log('[SUCCESS] Picklist data uploaded successfully');
        await ConfigurationAppPage.clickPublishButton();
        await ConfigurationAppPage.clickYesButtons();        
        await ConfigurationAppPage.clickUploadOkButton();

    });
    it('should download the data file', async () => {

        await ConfigurationAppPage.clickDownloadDataButton();
        console.log('[SUCCESS] Download Data button clicked');

    });


});
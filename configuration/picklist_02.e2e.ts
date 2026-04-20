import 'dotenv/config';
import { browser } from '@wdio/globals';
//import BtpLoginPage from '../page_object_model/btp_applications_page/configuration/btpLogin.page';
import HomePage from '../page_object_model/btp_applications_page/configuration/home.page';
import ConfigurationAppPage from '../page_object_model/btp_applications_page/configuration/configurationPicklist.page';
import SapUtils from '../utils/utils';


describe('Functionality: Configuration App & Picklist Navigation', () => {

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
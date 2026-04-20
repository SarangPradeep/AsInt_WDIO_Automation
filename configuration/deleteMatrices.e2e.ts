import 'dotenv/config';
//import BtpLoginPage from '../page_object_model/btp_applications_page/configuration/btpLogin.page';
import HomePage from '../page_object_model/btp_applications_page/configuration/home.page';
import configurationMatricesPage from '../page_object_model/btp_applications_page/configuration/configurationMatrices.page';
import SapUtils from '../utils/utils';

describe('Functionality: Configuration App & Matrices Navigation', () => {

    it('should navigate to Configuration Management App', async () => {

        await HomePage.waitForHomePageToLoad();
        await SapUtils.waitForSAPPopupAndClose();
        await HomePage.clickTile('Configurations');
        await SapUtils.waitForBusyIndicatorToDisappear();
        await SapUtils.waitForSAPPopupAndClose(10);
        expect(await configurationMatricesPage.isAppLoaded()).toBe(true);

    });

    it('should navigate into the Matrices section', async () => {

        await SapUtils.waitForBusyIndicatorToDisappear();
        await SapUtils.waitForSAPPopupAndClose();
        await configurationMatricesPage.navigateToMatrices();
        console.log('[SUCCESS] Matrices functionality reached');
        
        await configurationMatricesPage.clickCreateButton();
        await configurationMatricesPage.createMatrix();
        await configurationMatricesPage.clickOkButton();

    });
    
    it('should select the created matrix and open settings/delete menu', async () => {
        
        await configurationMatricesPage.selectMatrixAndOpenSettings();
        console.log('[SUCCESS] Matrix selected and settings opened');

    });
});
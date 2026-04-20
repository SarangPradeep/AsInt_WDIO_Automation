import 'dotenv/config';
import { browser } from '@wdio/globals';
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

    it('should open the created matrix', async () => {

        await configurationMatricesPage.openCreatedMatrix();
        console.log('[SUCCESS] Matrix created and opened successfully');

    });

    it('should edit the created matrix', async () => {

        await configurationMatricesPage.editMatrix();
        console.log('[SUCCESS] Matrix edited successfully');
        
    });

    it('should add risk color', async () => {

        await configurationMatricesPage.addRiskColor('colour1', 'rgb(255, 0, 0)');
        await configurationMatricesPage.addRiskColor('colour2', 'rgb(254, 224, 0)');
        await configurationMatricesPage.addRiskColor('colour3', 'rgb(255, 151, 0)');
        browser.pause(5000); 

    });
    it('should assign all risk colors to their specific matrix cells', async () => {
        
        //  Laal color
        const redCells = [
            { x: '271', y: '30' },
            { x: '371', y: '30' },
            { x: '371', y: '130' }
        ];
        await configurationMatricesPage.assignColorToCells(0, redCells);

        //  Haldi color
        const yellowCells = [
            { x: '171', y: '130' },                
            { x: '171', y: '229.99999999999997' }, 
            { x: '271', y: '229.99999999999997' } 
        ];
        await configurationMatricesPage.assignColorToCells(1, yellowCells);

        //  Santara color
        const orangeCells = [
            { x: '171', y: '30' },                 
            { x: '271', y: '130' },                
            { x: '371', y: '229.99999999999997' }
        ];
        await configurationMatricesPage.assignColorToCells(2, orangeCells);
        console.log('[SUCCESS] All risk colors assigned to matrix cells successfully');
    });

    it('should configure X-axis entirely', async () => {

        await configurationMatricesPage.configureXAxis('description', true);
        await configurationMatricesPage.enterTextValue(0,'LOW');
        await configurationMatricesPage.enterTextValue(1,'MEDIUM');
        await configurationMatricesPage.enterTextValue(2,'HIGH');

    });

    it('should configure Y-axis entirely', async () => {

        await configurationMatricesPage.configureYAxis('Y-Axis Label', true);
        await configurationMatricesPage.enterYAxisRowValue(0,'LOW');
        await configurationMatricesPage.enterYAxisRowValue(1,'MEDIUM');
        await configurationMatricesPage.enterYAxisRowValue(2,'HIGH');

    });

    it('should add a risk line with specified coordinates and axes', async () => {
        
        await configurationMatricesPage.addRiskLine('Risk Line PS','#FEE000','0','0','0','0');
        await configurationMatricesPage.publishMatrix();

    });
});

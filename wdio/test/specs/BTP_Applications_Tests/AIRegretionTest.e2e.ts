import FixedAIPPage from '../../../PageObjectModel/BTP_Applications_Page/AIRegressionTest.page';

describe('Fixed AIP – Asset Inspection Regression', () => {

    const USERNAME = 'krishna.pala@asint.net';
    const PASSWORD = 'Chigga@1305';
    const APP_URL = 'https://apm-02-asint.launchpad.cfapps.us10.hana.ondemand.com';
    const EQUIPMENT_ID = '100000';

    before(async () => {
        await browser.deleteAllCookies();
        await browser.url(APP_URL);
        await FixedAIPPage.clickAsIntLoginLink();

        await $('#j_username').setValue(USERNAME);
        await $('#logOnFormSubmit').click();
        await $('#j_password').setValue(PASSWORD);
        await $('#logOnFormSubmit').click();

        await browser.pause(8000);
        await FixedAIPPage.waitForSAPPopupAndClose(30);
        await FixedAIPPage.waitForBusyIndicatorToDisappear(90);
    });

    /* =========================
       TEST CASES
    ========================== */

    it('should open Asset Inspection application', async () => {
        await FixedAIPPage.navigateToAssetInspection();
    });

    it('should create a new inspection', async function () {
        this.timeout(180000);
        await FixedAIPPage.plusIconAndEquipSelect();
        await FixedAIPPage.createInspection();
        await FixedAIPPage.submitInspectionCreation();
    });

    it('should reopen Asset Inspection and open created inspection', async function () {
        this.timeout(120000);
        await FixedAIPPage.reOpenAssetInspection();
        await FixedAIPPage.searchAndOpenInspection(EQUIPMENT_ID);
    });

    it('should create finding, convert to recommendation and delete inspection (E2E)', async function () {
        this.timeout(300000);

        // ⚠️ This method already:
        // - creates finding
        // - converts to recommendation
        // - revisits inspection
        // - deletes inspection
        await FixedAIPPage.openFindingsTab();
        await FixedAIPPage.createFinding(EQUIPMENT_ID);

        await FixedAIPPage.waitForBusyIndicatorToDisappear(120);
    });

});

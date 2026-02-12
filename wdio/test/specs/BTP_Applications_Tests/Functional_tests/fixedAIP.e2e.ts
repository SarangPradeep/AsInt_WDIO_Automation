import FixedAIPPage from '../../../../PageObjectModel/BTP_Applications_Page/fixedAIP.page';

describe('Fixed AIP Application End-to-End Workflow', () => {

    const USERNAME = 'krishna.pala@asint.net';
    const PASSWORD = 'Chigga@1305'; 
    const APP_URL = 'https://apm-02-asint.launchpad.cfapps.us10.hana.ondemand.com';

    // --- Helper Functions ---

    async function closeSapPopupIfPresent(): Promise<void> {
        const selectors = [
            "//button[@title='Close Lightbox']",
            "//button[@aria-label='Close']"
        ];

        for (const selector of selectors) {
            try {
                const element = $(selector);
                if (await element.isDisplayed()) {
                    await element.click();
                    console.log(`[STATUS] Successfully closed SAP popup using selector: ${selector}`);
                    return;
                }
            } catch {}
        }
    }

    async function performLogin(username: string, password: string): Promise<void> {
        await browser.url(APP_URL);
        await FixedAIPPage.clickAsIntLoginLink();

        const emailInput = await $('#j_username');
        await emailInput.waitForDisplayed({ timeout: 15000 });
        await emailInput.setValue(username);

        const continueButton = await $('#logOnFormSubmit');
        await continueButton.click();

        const passwordInput = await $('#j_password');
        await passwordInput.waitForDisplayed({ timeout: 15000 });
        await passwordInput.setValue(password);
        await continueButton.click();
    }

    async function navigate_to_homepage_successfully(): Promise<void> {
        await performLogin(USERNAME, PASSWORD);
        await browser.pause(8000);
        await FixedAIPPage.waitForSAPPopupAndClose(30);
        await FixedAIPPage.waitForBusyIndicatorToDisappear(90);
    }

    async function create_asset_inspection_item(): Promise<void> {
        await closeSapPopupIfPresent();
        await FixedAIPPage.navigateToAssetInspection();

        await closeSapPopupIfPresent();  
        await FixedAIPPage.plusIconAndEquipSelect();

        await FixedAIPPage.createInspection();
        await FixedAIPPage.submitInspectionCreation();
    }

    // --- Hooks ---

    before(async () => {
        await browser.deleteAllCookies();
        await navigate_to_homepage_successfully();
    });

    // --- Test ---

    it('should create a new Asset Inspection successfully', async () => {
        await create_asset_inspection_item();
    });

});

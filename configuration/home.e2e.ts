// home.e2e.ts
import 'dotenv/config';
import HomePage from '../page_object_model/btp_applications_page/configuration/home.page';

describe('Home Page | Full Dashboard Load Validation', () => {

    // const APP_URL = process.env.APP_URL || 'https://apm-02-asint.launchpad.cfapps.us10.hana.ondemand.com';

    // before(async function () {
    //     this.timeout(200000);
    //     await browser.reloadSession();

    //     await BtpLoginPage.open(APP_URL);
    //     await BtpLoginPage.login(
    //         process.env.BTP_USERNAME!, 
    //         process.env.BTP_PASSWORD!
    //     );

    //     const loginSuccess = await BtpLoginPage.isLoginSuccessful();
    //     expect(loginSuccess).toBe(true);
    // });

    it('should wait for the last tile (HAZOP) to load and verify count', async () => {
        await HomePage.waitForHomePageToLoad();

        const tileCount = await HomePage.getTilesCount();
        console.log(`[INFO] Dashboard loaded with ${tileCount} tiles.`);
        expect(tileCount).toBeGreaterThan(0);
    });

    it('should verify critical tiles are present in the list', async () => {
        const tileNames = await HomePage.getAllTileNames();

        const expectedTiles = [
            'Asset Inspection',
            'Configurations',
            'HAZOP'
        ];

        for (const tile of expectedTiles) {
            expect(tileNames).toContain(tile);
        }
    });
});
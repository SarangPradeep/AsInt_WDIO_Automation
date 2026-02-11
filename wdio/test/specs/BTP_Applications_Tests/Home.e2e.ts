// home.e2e.ts
import { browser } from '@wdio/globals';
import HomePage from '../../../PageObjectModel/BTP_Applications_Page/Home.page';
import BtpLoginPage from '../../../PageObjectModel/BTP_Applications_Page/btpLogin.page';

describe('Home Page | Tile Load Validation', () => {

    const APP_URL =
        'https://apm-02-asint.launchpad.cfapps.us10.hana.ondemand.com';

    before(async function () {
        this.timeout(180000);

        await browser.reloadSession();

        // Login once
        await BtpLoginPage.open(APP_URL);
        await BtpLoginPage.login(
            'krishna.pala@asint.net',
            'Chigga@1305'
        );

        const loginSuccess = await BtpLoginPage.isLoginSuccessful();
        expect(loginSuccess).toBe(true);
    });

    it('should load home page and display tiles', async () => {
        await HomePage.waitForHomePageToLoad();

        const tileCount = await HomePage.getTilesCount();
        expect(tileCount).toBeGreaterThan(0);
    });

    it('should display expected tiles on home page', async () => {
        const tileNames = await HomePage.getAllTileNames();

        console.log('Tiles found:', tileNames);

        // 👇 We will finalize this list after you confirm
        const expectedTiles = [
            'Asset Inspection'
        ];

        for (const tile of expectedTiles) {
            expect(tileNames).toContain(tile);
        }
    });
});

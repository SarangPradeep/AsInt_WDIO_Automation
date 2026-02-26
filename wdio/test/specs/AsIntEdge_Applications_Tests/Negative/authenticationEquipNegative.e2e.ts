import asintEdgeLoginPage from '@pages/AsIntEdge_Applications_Page/asintEdge.page';
import asintEdgeDashboardPage from '@pages/AsIntEdge_Applications_Page/dashboard.page';


describe('NEGATIVE TEST : Equipment Tests', () => {
    
    const testEmail: string = process.env.ASINT_EDGE_TEST_EMAIL!;
    const testPassword: string = process.env.ASINT_EDGE_TEST_PASSWORD!;
    
    it('Should load the login page with all required elements', async () => {
        await asintEdgeLoginPage.navigateToLoginPage();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
        
        const isEmailInputVisible = await asintEdgeLoginPage.isEmailInputVisible();
        expect(isEmailInputVisible).toBe(true);
        
        const isPasswordInputVisible = await asintEdgeLoginPage.isPasswordInputVisible();
        expect(isPasswordInputVisible).toBe(true);
    });

    
    it('Should successfully login with valid credentials', async () => {        
        await asintEdgeLoginPage.login(testEmail, testPassword, false);
        const isLoginSuccessful = await asintEdgeLoginPage.verifySuccessfulLogin();
        expect(isLoginSuccessful).toBe(true);
    });

    it('Should navigate to Administrator application when clicked', async () => {
            await asintEdgeDashboardPage.openAdministratorApplication();
    
            await browser.waitUntil(
                async () => await asintEdgeDashboardPage.isOnAdministratorApplication(),
                {
                    timeout: 100000,
                    timeoutMsg: 'Administrator application did not load'
                }
            );
    
            const isOnAdminApp = await asintEdgeDashboardPage.isOnAdministratorApplication();
            expect(isOnAdminApp).toBe(true);
    
            console.log('Navigated to Administrator Application:', isOnAdminApp);
        });
        
        it('should click on Equipment and try creating equipment with few mandatory fields', async () => {
            // Implement equipment creation and deletion tests here
            browser.pause(4000);
            await $('//span[normalize-space()="Equipment"]').click();
            browser.pause(4000);
            const addButton = await $('//button[.//span[@data-sap-ui-icon-content=""]]');
            await addButton.waitForClickable({ timeout: 10000 });
            //await addButton.scrollIntoView();
            await addButton.click();
            browser.pause(2000);
            const dialog = await $('.sapMDialogScroll');
            await dialog.waitForDisplayed({ timeout: 100000 });
            const workerId = (browser.capabilities as any)['wdio:workerId'] || '0';
            const equipmentName = `Test_Equipment_${Date.now()}_${workerId}`;
            await $('//label[.//bdi[text()="Equipment Name"]]/following::input[1]').setValue(equipmentName);
            await $('//label[.//bdi[text()="Description"]]/following::input[1]').setValue('Automation test equipment description');
    
            // Open dropdown
            const ownerSelect = await $('//label[.//bdi[text()="Owner/User Name"]]/following::div[contains(@class,"sapMSlt")][1]');
            await ownerSelect.waitForClickable({ timeout: 30000 });
            await ownerSelect.click();
    
            // Wait for UI5 select list (GLOBAL)
            const selectList = await $('//ul[contains(@class,"sapMSelectList")]');
            await selectList.waitForDisplayed({ timeout: 40000 });
            browser.pause(2000)
            // Select first option
            const ownerItem = await $('(//ul[contains(@class,"sapMSelectList")]//li[contains(@class,"sapMSelectListItem")])[1]');
            await ownerItem.click();
            browser.pause(2000)
    
            // Select first value
            await ownerItem.click();
            await $('//label[.//bdi[text()="Site"]]/following::input[1]')
                .setValue('Test Site');
                browser.pause(2000)

            const saveButton = await $('//button[contains(@class,"sapMBtn")][.//bdi[text()="Save"]]');
            await saveButton.click();

            browser.pause(3000);

            const negOkBtn = await $('//bdi[text()="OK"]');
            await negOkBtn.click();

            console.log("Negative equipment done successfully");
    
        });
});
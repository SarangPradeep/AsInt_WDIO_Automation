import asintEdgeLoginPage from '../../../PageObjectModel/AsIntEdge_Applications_Page/asintEdge.page';
import asintEdgeDashboardPage from '../../../PageObjectModel/AsIntEdge_Applications_Page/dashboard.page';


describe('REGRESSION TEST - Administrator → Equipment Creation ', () => {
    
    const testEmail: string = process.env.ASINT_EDGE_TEST_EMAIL!;
    const testPassword: string = process.env.ASINT_EDGE_TEST_PASSWORD!;

    // 🔐 LOGIN ONCE
    before(async () => {
        await asintEdgeLoginPage.login(testEmail, testPassword);
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
    
    it('should click on Equipment and perform create and delete operations', async () => {
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

        // Select first value
        await ownerItem.click();
        await $('//label[.//bdi[text()="Site"]]/following::input[1]')
            .setValue('Test Site');

        await $('//label[.//bdi[text()="Area"]]/following::input[1]')
            .setValue('Test Area');

        await $('//label[.//bdi[text()="Category"]]/following::input[1]')
            .setValue('Electrical');

        await $('//label[.//bdi[text()="Sub Category"]]/following::input[1]')
            .setValue('Generator');
        
        const saveButton = await $('//button[contains(@class,"sapMBtn")][.//bdi[text()="Save"]]');


        await browser.waitUntil(
            async () => await saveButton.isEnabled(),
            {
                timeout: 30000,
                timeoutMsg: 'Save button did not become enabled'
            }
        );

        // ---- SAVE ----
        // await saveButton.scrollIntoView();
        await saveButton.waitForClickable({ timeout: 50000 });
        await saveButton.click();
        // Wait until dialog closes (UI5 re-render safe)
        await dialog.waitForDisplayed({ reverse: true, timeout: 50000 });
        

        console.log('Equipment created successfully.');

        
        const deleteBtn = await $('button[aria-label="Delete"]');
        await deleteBtn.waitForClickable({ timeout: 30000 });
        await deleteBtn.click();

        await browser.pause(1000);
        const okBtn = await $('//button[.//bdi[text()="OK"]]');
        await okBtn.waitForClickable({ timeout: 30000 });
        await okBtn.click();
        await browser.pause(1000);

        const successOkBtn = await $('//div[contains(@id,"success") or contains(@class,"sapMFooter-CTX")]//button[.//bdi[text()="OK"]]');
        await successOkBtn.waitForClickable({ timeout: 30000 });
        await successOkBtn.click();
        console.log('Equipment deleted successfully.');
        await browser.pause(1000);



    });



    // Additional dashboard tests can be added here
});
import { expect } from '@wdio/globals';
import { handleFailedUserRolesPopup } from '../utils/popupHandlers';
 
describe('Excel → Load Specific Workbook and Open Second Conduit Option', () => {
    it('should open Book1 and launch the SECOND AsInt Data Conduit button', async () => {
        // 1. Initial wait for Excel Home screen to be ready
        await browser.pause(1000);
 
 
        // ======================
        // Open Book1 from Recent list
        // ======================
 
        const book1Entry = await $('//ListItem[contains(@Name, "Book1")]');
        await book1Entry.waitForExist({ timeout: 1000 });
        await book1Entry.click();
        console.log('Clicked Book1. Waiting for spreadsheet window...');
 
 
        // ======================
        // Handle window switching
        // ======================
 
        await browser.pause(1000); //
        const allWindowHandles = await browser.getWindowHandles();
        await browser.switchToWindow(allWindowHandles[allWindowHandles.length - 1]);
        console.log('Switched focus to the Workbook window.');
 
       
        // ======================
        // Navigate to the "AsInt" Ribbon Tab
        // ======================
 
        const asIntTab = await $('//TabItem[@Name="AsInt"]');
        await asIntTab.waitForDisplayed({ timeout: 1000 });
        await asIntTab.click();
        console.log('Clicked AsInt Tab');
 
 
        // ======================
        // Click the SECOND AsInt Data Conduit button
        // ======================
       
        const secondConduitBtn = await $('(//Button[@Name="AsInt Data Conduit"])[2]');
        await secondConduitBtn.waitForDisplayed({ timeout: 2000 });
        await secondConduitBtn.click();
        console.log('Clicked the second AsInt Data Conduit option.');
 
 
        // ======================
        // Validate task pane appears
        // ======================
 
        const sidePane = await $('//Pane[contains(@Name, "AsInt Data Conduit")]');
        await sidePane.waitForDisplayed({ timeout: 2000 });
        expect(await sidePane.isDisplayed()).toBe(true);
 
 
        // ======================
        // Interact with the Data Conduit pane
        // ======================
 
        const tenantItem = await $('//Text[@Name="APM02"]');
        await tenantItem.waitForDisplayed({ timeout: 1000 });
        await tenantItem.click();
        console.log('Clicked on tenant APM02 using Native selector.');
 
       
        // ======================
        // Handle failed user roles popup
        // ======================
 
        await handleFailedUserRolesPopup();
       
   
        // // 9. Click AsInt Log-On link
        // const logonLink = await $('//*[contains(@Name, "AsInt Log-On")]');
        // await logonLink.waitForDisplayed({
        //     timeout: 30000,
        //     timeoutMsg: 'The AsInt Log-On link did not appear after 30 seconds.'
        // });
        // await logonLink.click();
        // console.log('Successfully clicked AsInt Log-On.');
 
 
        // ======================
        // Click AsInt Log-On link (only if login is required)
        // ======================
 
 
        const logonLink = await $('//*[contains(@Name, "AsInt Log-On")]');
        const isLoginRequired = await logonLink.waitForExist({ timeout: 3000 }).catch(() => false);
        if (isLoginRequired) {
            console.log('Login required → clicking AsInt Log-On');
            await logonLink.waitForDisplayed({
                timeout: 2000,
                timeoutMsg: 'The AsInt Log-On link did not appear after 30 seconds.'
            });
 
            await logonLink.click();
            console.log('Successfully clicked AsInt Log-On.');
            await browser.pause(2000); // Wait for login to complete and page to fully load
        } else {
            console.log('Already logged in → skipping AsInt Log-On');
        }
 
 
        // ======================
        // Switch to WEBVIEW context if available
        // ======================
 
        const contexts = await browser.getContexts();
        const webview = contexts.find(c => c.toString().includes('WEBVIEW'));
        if (webview) {
            await browser.switchContext(webview);
            const assetInspectionTile = await $('//div[contains(@class,"tileContainer")]//span[normalize-space()="Asset Inspection"]');
            await assetInspectionTile.waitForDisplayed({ timeout: 45000 });
            await assetInspectionTile.scrollIntoView();
            await assetInspectionTile.click();
            console.log('Asset Inspection clicked (WEBVIEW)');
        }
       
        else {
        console.log('No WEBVIEW found, trying native selector');
        const assetInspectionTile = await $('//*[contains(@Name,"Asset Inspection")]');
        await assetInspectionTile.waitForExist({ timeout: 45000 });
        await assetInspectionTile.click();
        console.log('Asset Inspection clicked (NATIVE_APP)');
        }
 
 
        // ======================
        // Click Equipment tile (inside Asset Inspection)
        // ======================
 
        const contextsForEquipment = await browser.getContexts();
        const webviewForEquipment = contextsForEquipment.find(c => c.toString().includes('WEBVIEW'));
 
        if (webviewForEquipment) {
            await browser.switchContext(webviewForEquipment);
            const equipmentTile = await $('//div[contains(@class,"tileContainer")]//span[normalize-space()="Equipment"]');
            await equipmentTile.waitForDisplayed({
                timeout: 1000,
                timeoutMsg: 'Equipment tile not visible in WEBVIEW'
            });
 
            await equipmentTile.scrollIntoView();
            await equipmentTile.click();
 
            console.log('Equipment tile clicked inside Asset Inspection (WEBVIEW)');
        }
        else {
            console.log('No WEBVIEW context found, trying native selector');
 
            // Native fallback (Excel desktop)
            const equipmentTile = await $('//*[contains(@Name,"Equipment")]');
 
            if (await equipmentTile.waitForExist({ timeout: 1000 }).catch(() => false)) {
                await equipmentTile.click();
                console.log('Equipment tile clicked using native selector');
            } else {
                console.log('Equipment tile not found in native context');
            }
        }
 
 
        // ======================
        // Validate Equipment data availability
        // ======================
 
        const noDataText = await $('//*[normalize-space()="No data"]');
 
        const isNoDataVisible = await noDataText.waitForExist({
            timeout: 500
        }).catch(() => false);
 
        if (isNoDataVisible) {
            throw new Error('No data found in Equipment. Stopping test execution.');
        }
 
        console.log(' Equipment data available. Proceeding...');
 
 
 
        // // ======================
        // // Click Create option
        // // ======================
 
        console.log('Waiting for Create form to load...');
        await browser.pause(1000);
        const contextsForCreate = await browser.getContexts();
        const webviewForCreate = contextsForCreate.find(c => c.toString().includes('WEBVIEW'));
 
        if (webviewForCreate) {
            await browser.switchContext(webviewForCreate);
            console.log('Switched to WEBVIEW for Create button');
 
            const createItem = await $('//li[contains(@class,"sapMLIB")]//span[normalize-space()="Create"]');
 
            await createItem.waitForDisplayed({
                timeout: 500,
                timeoutMsg: 'Create option not visible in WEBVIEW after 2 seconds'
            });
 
            console.log('Create option is now visible, scrolling into view...');
            await createItem.scrollIntoView();
            await browser.pause(100);
            await createItem.click();
            console.log('Create clicked (WEBVIEW)');
            await browser.pause(500); //
            }
            else {
            console.log('No WEBVIEW found, trying native selector');
            await browser.pause(500);  //
 
            const createItem = await $('//*[contains(@Name,"Create")]');
 
            if (await createItem.waitForExist({ timeout: 10000 }).catch(() => false)) {
                console.log('Create button found in NATIVE_APP, clicking...');
                await browser.pause(100);
                await createItem.click();
                console.log('Create clicked (NATIVE_APP)');
                await browser.pause(100); //
            } else {
                console.log('Create option not found in native context after 10000 milliseconds');
            }
        }
 
 
        // ======================
        // Ensure NATIVE_APP context
        // ======================
 
        await browser.switchContext('NATIVE_APP');
        console.log('Switched to NATIVE_APP for Excel cell input');
        await browser.pause(500);
 
 
        // ======================
        // Locate Description cell
        // ======================
 
        const descriptionCell = await $('//DataItem[@Name="C7"]');
        await descriptionCell.waitForDisplayed({ timeout: 3000 });
        await descriptionCell.click();
        await descriptionCell.addValue('Test Pipelines');
        await descriptionCell.addValue('\uE004');
        console.log('Entered "Test Pipelines" in Description cell');
 
 
        // ======================
        // Locate Equipment cell
        // ======================
 
        const equipmentCell = await $('//DataItem[@Name="D7"]');
        await equipmentCell.waitForDisplayed({ timeout: 3000 });
        await equipmentCell.click();
        await equipmentCell.addValue('1000000202');
        await equipmentCell.addValue('\uE004');
        console.log('Entered Equipment value: 1000000202');
 
 
        // ======================
        // Locate Inspection Template cell
        // ======================
 
        const inspectionTemplateCell = await $('//DataItem[@Name="E7"]');
        await inspectionTemplateCell.waitForDisplayed({ timeout: 3000 });
        await inspectionTemplateCell.click();
        await inspectionTemplateCell.addValue('\uE034');
        await inspectionTemplateCell.addValue('Miscellaneous Equipment Structural Inspection');
        await inspectionTemplateCell.addValue('\uE007');
        console.log('Inspection Template selected');
 
 
        // ======================
        // Locate Inspection Type cell (Column F, Row 7)
        // ======================
 
        const inspectionTypeCell = await $('//DataItem[@Name="F7"]');
        await inspectionTypeCell.waitForDisplayed({ timeout: 3000 });
        await inspectionTypeCell.click();
        await inspectionTypeCell.addValue('\uE034');
        await inspectionTypeCell.addValue('Thickness Monitoring');
        await inspectionTypeCell.addValue('\uE007');
        await inspectionTypeCell.addValue('\uE004');
        console.log('Inspection Type selected');
 
 
        // ======================
        // Locate Stage cell (Column G, Row 7)
        // ======================
 
        const stageCell = await $('//DataItem[@Name="G7"]');
        await stageCell.waitForDisplayed({ timeout: 3000 });
        await stageCell.click();
        await stageCell.addValue('\uE034');
        await stageCell.addValue('Scoping');
        await stageCell.addValue('\uE007');
        await stageCell.addValue('\uE004');
        console.log('Stage committed: Scoping');
 
 
        console.log('Waiting for validations to complete...');
        console.log('Waiting for Save option to load...');
 
 
        // ======================
        // Click Save option
        // ======================
 
        console.log('Waiting for Save option...');
        await browser.pause(100);
        const contextsForSave = await browser.getContexts();
        const webviewForSave = contextsForSave.find(c => c.toString().includes('WEBVIEW'));
 
        if (webviewForSave) {
            await browser.switchContext(webviewForSave);
            console.log('Switched to WEBVIEW for Save button');
 
            const saveItem = await $(
                '//span[normalize-space()="Save the Asset Inspection Assessment"]/ancestor::li'
            );
 
            await saveItem.waitForDisplayed({
                timeout: 1000,
                timeoutMsg: 'Save option not visible in WEBVIEW after 1 second'
            });
 
            console.log('Save option is now visible, scrolling into view...');
            await saveItem.scrollIntoView();
            await browser.pause(500);
            await browser.execute(el => el.click(), saveItem);
            console.log('Save clicked (WEBVIEW)');
            await browser.pause(500);
        }
        else {
            console.log('No WEBVIEW found, trying native selector for Save');
            await browser.pause(500);
            const saveItem = await $('//*[contains(@Name,"Save the Asset Inspection Assessment")]');
 
            if (await saveItem.waitForExist({ timeout: 10000 }).catch(() => false)) {
                console.log('Save button found in NATIVE_APP, clicking...');
                await browser.pause(500);
                await saveItem.click();
                console.log('Save clicked (NATIVE_APP)');
                await browser.pause(500);
            } else {
                console.log('Save option not found in native context after 10000 milliseconds');
            }
        }
 
 
 
        // ======================
        // Click Save for changed records
        // ======================
 
        console.log('Waiting for Save confirmation option...');
        const contextsForConfirmSave = await browser.getContexts();
        const webviewForConfirmSave = contextsForConfirmSave.find(c => c.toString().includes('WEBVIEW'));
 
        if (webviewForConfirmSave) {
            await browser.switchContext(webviewForConfirmSave);
            console.log('Switched to WEBVIEW for Save confirmation');
 
            const confirmSaveItem = await $(
                '//span[normalize-space()="Save the changed records"]/ancestor::li'
            );
 
            await confirmSaveItem.waitForDisplayed({
                timeout: 500,
                timeoutMsg: 'Save confirmation option not visible in WEBVIEW after 3 seconds'
            });
 
            console.log('Save confirmation option is now visible, scrolling into view...');
            await confirmSaveItem.scrollIntoView();
            await browser.pause(500);
            await browser.execute(el => el.click(), confirmSaveItem);
            console.log('Save confirmation clicked (WEBVIEW)');
            await browser.pause(500);
        }
        else {
            console.log('No WEBVIEW found, trying native selector for Save confirmation');
            await browser.pause(500);
            const confirmSaveItem = await $('//*[contains(@Name,"Save the changed records")]');
 
            if (await confirmSaveItem.waitForExist({ timeout: 45000 }).catch(() => false)) {
                console.log('Save confirmation found in NATIVE_APP, clicking...');
                await browser.pause(500); 
                await confirmSaveItem.click();
                console.log('Save confirmation clicked (NATIVE_APP)');
                await browser.pause(500);
            } else {
                console.log('Save confirmation option not found in native context after 45 seconds');
            }
        }
 
 
 
        // ======================
        // Save confirmation dialog (Excel native)
        // ======================
       
        console.log('Confirming Save...');
        await browser.switchContext('NATIVE_APP');
        const yesBtn = await $('//Button[@Name="Yes"]');
 
        if (await yesBtn.waitForExist({ timeout: 500 }).catch(() => false)) {
            await yesBtn.click();
            console.log('Yes clicked');
        }
        await browser.pause(500); //
        console.log('Looking for OK button...');
 
 
 
        // ======================
        // OK confirmation dialog (Excel native)
        // ======================
 
        console.log('Looking for OK button...');
        await browser.switchContext('NATIVE_APP');
        await browser.pause(100);
        const okBtn = await $('//Button[@Name="OK"]');
        if (await okBtn.waitForExist({ timeout: 500 }).catch(() => false)) {
            await okBtn.click();
            console.log('OK clicked');
        }
        await browser.pause(2000);
 
 
        // ======================
        // Capture Assessment ID
        // ======================
 
        await browser.switchContext('NATIVE_APP');
        console.log('Reading Assessment ID from cell B7...');
 
        const assessmentIdCell = await $('//DataItem[@Name="B7"]');
        await assessmentIdCell.waitForExist({ timeout: 5000 });
        await assessmentIdCell.click();
        await browser.pause(500);
 
        const assessmentId = (await assessmentIdCell.getText()).trim();
        console.log(`Assessment ID captured: ${assessmentId}`);
 
        if (!assessmentId) {
            await browser.saveScreenshot('./screenshots/no-assessment-id.png');
            throw new Error('Assessment ID was not generated in cell B7 after Save');
        }
 
 
        // ======================
        // Click Home breadcrumb
        // ======================
 
        const homeLink = await $('//*[contains(@Name,"Home")]');
 
        await homeLink.waitForDisplayed({
            timeout: 2000,
            timeoutMsg: 'Home breadcrumb not visible'
        });
 
        await homeLink.click();
        console.log('Home breadcrumb clicked');
 
 
        // ======================
        // Click Equipment tile (inside Asset Inspection)
        // ======================
 
        const contextsForEquipment2 = await browser.getContexts();
        const webviewForEquipment2 = contextsForEquipment2.find(c => c.toString().includes('WEBVIEW'));
 
        if (webviewForEquipment2) {
            await browser.switchContext(webviewForEquipment2);
            const equipmentTile = await $('//div[contains(@class,"tileContainer")]//span[normalize-space()="Equipment"]');
            await equipmentTile.waitForDisplayed({
                timeout: 1000,
                timeoutMsg: 'Equipment tile not visible in WEBVIEW'
            });
 
            await equipmentTile.scrollIntoView();
            await equipmentTile.click();
 
            console.log('Equipment tile clicked inside Asset Inspection (WEBVIEW)');
        }
        else {
            console.log('No WEBVIEW context found, trying native selector');
            const equipmentTile = await $('//*[contains(@Name,"Equipment")]');
 
            if (await equipmentTile.waitForExist({ timeout: 1000 }).catch(() => false)) {
                await equipmentTile.click();
                console.log('Equipment tile clicked using native selector');
            } else {
                console.log('Equipment tile not found in native context');
            }
        }
 
 
        // ======================
        // Click Get Data option
        // ======================
 
        console.log('Waiting for Get Data option to load...');
        await browser.pause(1000);
        const contextsForGetData = await browser.getContexts();
        const webviewForGetData = contextsForGetData.find(c => c.toString().includes('WEBVIEW'));
 
        if (webviewForGetData) {
            await browser.switchContext(webviewForGetData);
            console.log('Switched to WEBVIEW for Get Data button');
 
            const getDataItem = await $('//li[contains(@class,"sapMLIB")]//span[normalize-space()="Get Data"]');
 
            await getDataItem.waitForDisplayed({
                timeout: 500,
                timeoutMsg: 'Get Data option not visible in WEBVIEW after 500ms'
            });
 
            console.log('Get Data option is now visible, scrolling into view...');
            await getDataItem.scrollIntoView();
            await browser.pause(100);
            await getDataItem.click();
            console.log('Get Data clicked (WEBVIEW)');
            await browser.pause(15000);
        }
        else {
            console.log('No WEBVIEW found, trying native selector');
            await browser.pause(500);
 
            const getDataItem = await $('//*[contains(@Name,"Get Data")]');
 
            if (await getDataItem.waitForExist({ timeout: 10000 }).catch(() => false)) {
                console.log('Get Data button found in NATIVE_APP, clicking...');
                await browser.pause(100);
                await getDataItem.click();
                console.log('Get Data clicked (NATIVE_APP)');
                await browser.pause(15000); // Wait for Get Data to populate Excel
            } else {
                console.log('Get Data option not found in native context after 10000 milliseconds');
            }
        }
 
 
        // ======================
        // Enter Assessment ID for Get Data lookup
        // ======================
 
        await browser.switchContext('NATIVE_APP');
        console.log('Entering Assessment ID in cell A4 for Get Data...');
 
        const a4AssessmentIdCell = await $('//DataItem[@Name="A4"]');
        await a4AssessmentIdCell.waitForDisplayed({ timeout: 5000 });
        await a4AssessmentIdCell.click();
        await browser.pause(500);
       
        // Enter the captured Assessment ID
        await a4AssessmentIdCell.addValue(assessmentId);
        await a4AssessmentIdCell.addValue('\uE007'); 
        await browser.pause(1000);
       
        console.log(`Assessment ID entered in Assessment ID cell A4: ${assessmentId}`);
 
 
 
        // ======================
        // Click Confirm button
        // ======================
 
        console.log('Waiting for Confirm button...');
        const contextsForConfirm = await browser.getContexts();
        const webviewForConfirm = contextsForConfirm.find(c => c.toString().includes('WEBVIEW'));
 
        if (webviewForConfirm) {
            await browser.switchContext(webviewForConfirm);
           
            const confirmBtn = await $('//button//bdi[text()="Confirm"] | //span[text()="Confirm"]');
           
            await confirmBtn.waitForDisplayed({
                timeout: 5000,
                timeoutMsg: 'Confirm button not visible in WEBVIEW'
            });
 
            await confirmBtn.click();
            console.log('Confirm button clicked (WEBVIEW)');
        }
        else {
            console.log('No WEBVIEW found, trying native selector for Confirm');
            const confirmBtnNative = await $('//Button[@Name="Confirm"]');
           
            if (await confirmBtnNative.waitForExist({ timeout: 5000 }).catch(() => false)) {
                await confirmBtnNative.click();
                console.log('Confirm button clicked (NATIVE_APP)');
            } else {
                console.log('Confirm button not found in native context');
            }
        }
       
       
 
               
       
    });
});
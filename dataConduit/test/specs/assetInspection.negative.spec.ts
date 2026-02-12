import { expect } from '@wdio/globals';
import { handleFailedUserRolesPopup } from '../utils/popupHandlers';

describe('Excel → Load Specific Workbook and Open Second Conduit Option', () => {
    it('should open Book1 and launch the SECOND AsInt Data Conduit button', async () => {
        // 1. Initial wait for Excel Home screen to be ready
        await browser.pause(3000);


        // ======================
        // Open Book1 from Recent list
        // ======================

        const book1Entry = await $('//ListItem[contains(@Name, "Book1")]');
        await book1Entry.waitForExist({ timeout: 3000 });
        await book1Entry.click();
        console.log('Clicked Book1. Waiting for spreadsheet window...');


        // ======================
        // Handle window switching
        // ======================

        await browser.pause(5000);
        const allWindowHandles = await browser.getWindowHandles();
        await browser.switchToWindow(allWindowHandles[allWindowHandles.length - 1]);
        console.log('Switched focus to the Workbook window.');

        
        // ======================
        // Navigate to the "AsInt" Ribbon Tab
        // ======================

        const asIntTab = await $('//TabItem[@Name="AsInt"]');
        await asIntTab.waitForDisplayed({ timeout: 3000 });
        await asIntTab.click();
        console.log('Clicked AsInt Tab');


        // ======================
        // Click the SECOND AsInt Data Conduit button
        // ======================
        
        const secondConduitBtn = await $('(//Button[@Name="AsInt Data Conduit"])[2]');
        await secondConduitBtn.waitForDisplayed({ timeout: 3000 });
        await secondConduitBtn.click();
        console.log('Clicked the second AsInt Data Conduit option.');


        // ======================
        // Validate task pane appears
        // ======================

        const sidePane = await $('//Pane[contains(@Name, "AsInt Data Conduit")]');
        await sidePane.waitForDisplayed({ timeout: 3000 });
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
        const isLoginRequired = await logonLink.waitForExist({ timeout: 5000 }).catch(() => false);
        if (isLoginRequired) {
            console.log('Login required → clicking AsInt Log-On');
            await logonLink.waitForDisplayed({
                timeout: 30000,
                timeoutMsg: 'The AsInt Log-On link did not appear after 30 seconds.'
            });

            await logonLink.click();
            console.log('Successfully clicked AsInt Log-On.');
            await browser.pause(20000); // Wait for login to complete and page to fully load
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
            await assetInspectionTile.waitForDisplayed({ timeout: 30000 });
            await assetInspectionTile.scrollIntoView();
            await assetInspectionTile.click();
            console.log('Asset Inspection clicked (WEBVIEW)');
        } 
        
        else {
        console.log('No WEBVIEW found, trying native selector');
        const assetInspectionTile = await $('//*[contains(@Name,"Asset Inspection")]');
        await assetInspectionTile.waitForExist({ timeout: 30000 });
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
                timeout: 3000,
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

            if (await equipmentTile.waitForExist({ timeout: 3000 }).catch(() => false)) {
                await equipmentTile.click();
                console.log('Equipment tile clicked using native selector');
            } else {
                console.log('Equipment tile not found in native context');
            }
        }


        
        // ======================
        // Click Create option
        // ======================

        console.log('Waiting for Create form to load...');
        await browser.pause(2000);
        const contextsForCreate = await browser.getContexts();
        const webviewForCreate = contextsForCreate.find(c => c.toString().includes('WEBVIEW'));

        if (webviewForCreate) {
            await browser.switchContext(webviewForCreate);
            console.log('Switched to WEBVIEW for Create button');

            const createItem = await $('//li[contains(@class,"sapMLIB")]//span[normalize-space()="Create"]');

            await createItem.waitForDisplayed({
                timeout: 45000,
                timeoutMsg: 'Create option not visible in WEBVIEW after 45 seconds'
            });

            console.log('Create option is now visible, scrolling into view...');
            await createItem.scrollIntoView();
            await browser.pause(1000);
            await createItem.click();
            console.log('Create clicked (WEBVIEW)');
            await browser.pause(5000);
            } 
            else {
            console.log('No WEBVIEW found, trying native selector');
            await browser.pause(3000); 

            const createItem = await $('//*[contains(@Name,"Create")]');

            if (await createItem.waitForExist({ timeout: 10000 }).catch(() => false)) {
                console.log('Create button found in NATIVE_APP, clicking...');
                await browser.pause(1000); 
                await createItem.click();
                console.log('Create clicked (NATIVE_APP)');
                await browser.pause(5000);
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
        await descriptionCell.waitForExist({
            timeout: 100,
            timeoutMsg: 'Description cell C7 not found'
        });
        await descriptionCell.click();
        await browser.pause(100);
        await descriptionCell.setValue('Test Pipelines');
        console.log('Entered "Test Pipelines" in Description cell');
        await descriptionCell.addValue('\uE004');
        await browser.pause(100);


        // ======================
        // Locate Equipment cell
        // ======================

        // const equipmentCell = await $('//DataItem[@Name="D7"]');
        // await equipmentCell.waitForExist({
        //     timeout: 100,
        //     timeoutMsg: 'Equipment cell D7 not found'
        // });
        // await equipmentCell.click();
        // await browser.pause(100);
        // await equipmentCell.setValue('10000024');
        // console.log('Entered Equipment value: 10000024');
        // await equipmentCell.addValue('\uE004');
        // await browser.pause(100);


        // ======================
        // Locate Inspection Template cell
        // ======================

        const inspectionTemplateCell = await $('//DataItem[@Name="E7"]');
        await inspectionTemplateCell.waitForExist({
            timeout: 100,
            timeoutMsg: 'Inspection Template cell E7 not found'
        });
        await inspectionTemplateCell.click();
        await browser.pause(100);
        await inspectionTemplateCell.addValue('\uE034');
        await browser.pause(100);
        await inspectionTemplateCell.addValue('Miscellaneous Equipment Structural Inspection');
        await browser.pause(100);
        await inspectionTemplateCell.addValue('\uE007');
        await browser.pause(100);
        console.log('Inspection Template selected: Miscellaneous Equipment Structural Inspection');



        // ======================
        // Locate Inspection Type cell (Column F, Row 7)
        // ======================

        const inspectionTypeCell = await $('//DataItem[@Name="F7"]');
        await inspectionTypeCell.waitForExist({
            timeout: 100,
            timeoutMsg: 'Inspection Type cell F7 not found'
        });
        await inspectionTypeCell.click();
        await browser.pause(100);
        await inspectionTypeCell.addValue('\uE034');
        await browser.pause(100);
        await inspectionTypeCell.addValue('Thickness Monitoring');
        await browser.pause(100);
        await inspectionTypeCell.addValue('\uE007'); 
        await browser.pause(100);
        await inspectionTypeCell.addValue('\uE004'); 
        await browser.pause(100);
        console.log('Inspection Type selected: Thickness Monitoring');



        // ======================
        // Locate Stage cell (Column G, Row 7)
        // ======================

        const stageCell = await $('//DataItem[@Name="G7"]');
        await stageCell.waitForExist({
            timeout: 100,
            timeoutMsg: 'Stage cell G7 not found'
        });
        await stageCell.click();
        await browser.pause(100);
        await stageCell.addValue('\uE034');
        await browser.pause(100);
        await stageCell.addValue('Scoping');
        await browser.pause(100);
        await stageCell.addValue('\uE007');
        await browser.pause(100);
        await stageCell.addValue('\uE004');
        await browser.pause(100);
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
        // Click Save (changed records)
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
                await browser.pause(1000);
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
        await browser.pause(1000);
        const yesBtn = await $('//Button[@Name="Yes"]');

        if (await yesBtn.waitForExist({ timeout: 10000 }).catch(() => false)) {
            await yesBtn.click();
            console.log('Yes clicked');
        }
        await browser.pause(1000);
        console.log('Looking for OK button...');

        

        // ======================
        // OK confirmation dialog (Excel native)
        // ======================

        console.log('Looking for OK button...');
        await browser.switchContext('NATIVE_APP');
        await browser.pause(1000);
        const okBtn = await $('//Button[@Name="OK"]');
        if (await okBtn.waitForExist({ timeout: 10000 }).catch(() => false)) {
            await okBtn.click();
            console.log('OK clicked');
        }
        await browser.pause(100);


    });
});
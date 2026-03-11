import { browser } from '@wdio/globals';
import EquipmentListviewPage from '../../../../PageObjectModel/BTP_Applications_Page/equipment/equipment.listview.page';
import HomePage from '../../../../PageObjectModel/BTP_Applications_Page/Home.page';
import EquipmentDetailPage from '../../../../PageObjectModel/BTP_Applications_Page/equipment/equipment.detail.page';
import { equipmentTestData } from '../../../testData/BTP_Applications/equipment.data';

describe('BTP Equipment App Functional test', () => {

    it('should click on equipment application and verify the title', async () => {
        await browser.pause(8000); 
        await HomePage.equipmentTile.scrollIntoView();
        await browser.waitUntil(
            async () => (await $$('//a[contains(@class,"sapMGT")]')).length > 0,
            { timeout: 90000 }
        );
        await HomePage.clickEquipmentTile();
        await browser.pause(10000); // Wait for navigation
    });
    
    it('should create equipment with mandatory fields and save', async () => {
        await EquipmentListviewPage.verifyOnEquipmentPage();
        await EquipmentListviewPage.createEquipmentWithMandatoryFields(
            equipmentTestData.createMandatory.equipmentName,
            equipmentTestData.createMandatory.description,
            equipmentTestData.createMandatory.equipmentTemplate,
            equipmentTestData.createMandatory.parentAsset
        );
    });

    it('should verify equipment details page', async () => {
        await EquipmentListviewPage.clickOnEquipmentInList(equipmentTestData.createMandatory.equipmentName);
        const onDetailPage = await EquipmentDetailPage.verifyOnEquipmentDetailPage();
        expect(onDetailPage).toBe(true);

    });

    it('should edit general info of equipment', async () => {
        await browser.pause(10000);
        await EquipmentDetailPage.editBtn.waitForClickable();
        await EquipmentDetailPage.editBtn.click();
        await browser.pause(5000);
        await EquipmentDetailPage.fillGeneralInfo(
            equipmentTestData.generalInfoEdit.inventoryNumber,
            equipmentTestData.generalInfoEdit.componentType,
            equipmentTestData.generalInfoEdit.activationState,
            equipmentTestData.generalInfoEdit.authorizationGroup,
            equipmentTestData.generalInfoEdit.startUpDate,
            equipmentTestData.generalInfoEdit.deactivationDate,
            equipmentTestData.generalInfoEdit.componentRegulatoryId,
            equipmentTestData.generalInfoEdit.comments,
            equipmentTestData.generalInfoEdit.longDescription,
            equipmentTestData.generalInfoEdit.acquisitionValue,
            equipmentTestData.generalInfoEdit.assetManufacturer,
            equipmentTestData.generalInfoEdit.partNumber,
            equipmentTestData.generalInfoEdit.modelNumber,
            equipmentTestData.generalInfoEdit.serialNumber
        );
        await browser.pause(5000); 
        await EquipmentDetailPage.saveBtn.click();
        await EquipmentDetailPage.successOkBtn.waitForClickable({ timeout: 30000 });
        await EquipmentDetailPage.successOkBtn.click();
        await browser.pause(10000); 

    });

    it('should edit structure info of equipment', async () => {
        await EquipmentDetailPage.structureSection.waitForClickable({ timeout: 30000 });
        await EquipmentDetailPage.structureSection.click();
        await browser.pause(5000);
    });

});
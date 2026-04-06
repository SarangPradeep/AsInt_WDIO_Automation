import { browser } from '@wdio/globals';
import HomePage from 'page_object_model/btp_applications_page/home.page';
import { equipmentTestData } from '../test_data/btp_applications/equipment.data';
import equipmentListviewPage from 'page_object_model/btp_applications_page/equipment/equipment.listview.page';
import equipmentDetailPage from 'page_object_model/btp_applications_page/equipment/equipment.detail.page';
import utils from 'utils/utils';

describe('BTP Equipment App Functional test', () => {
    let createdEquipmentName: string;

    it('should click on equipment application and verify the title', async () => {
        await HomePage.clickEquipmentTile();
    });

    it('should add and verify all the adapt filters', async () => {
        await utils.addAllAdaptFilter();
        //await utils.applyAdaptFilter();
        await utils.resetAllAdaptFilter();
    });
    
    it('should create equipment with mandatory fields and save', async () => {
        createdEquipmentName = await utils.generateRandomEquipmentName();

        await equipmentListviewPage.createEquipmentWithMandatoryFields(
            createdEquipmentName,
            equipmentTestData.createMandatory.description,
            equipmentTestData.createMandatory.equipmentTemplate,
            equipmentTestData.createMandatory.parentAsset
        );

    });

    it('should verify equipment details page', async () => {
        await equipmentListviewPage.clickOnEquipmentInList(createdEquipmentName);
        expect(await equipmentDetailPage.verifyOnEquipmentDetailPage()).toBe(true);
    });

    it('should edit general info of equipment', async () => {
        
        await equipmentDetailPage.fillGeneralInfo(
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

    });

    it('should edit structure info of equipment', async () => {
        await equipmentDetailPage.editStructureInfo();
    });
    
    it('should assign Equipment Template and Equipment Classes to Equipment', async () => {
        await equipmentDetailPage.assignEquipmentTemplate(
            equipmentTestData.assignmentSection.noOfEquipmentTemplatesToAssign, 
            equipmentTestData.assignmentSection.isAutoAssignClass);
        await equipmentDetailPage.assignEquipmentClass(
            equipmentTestData.assignmentSection.noOfEquipmentClassesToAssign,
            equipmentTestData.assignmentSection.isAutoAssignClass
        );
    });

    it('should assign Maintenance Data Attributes to Equipment', async () => {
        await equipmentDetailPage.assignCharacteristics(
            equipmentTestData.assignmentSection.noOfCharacteristicsToAssign
        );  
    });

    it('should verify Asset Intelligence section in equipment details page', async () => {
        await equipmentDetailPage.verifyAssetIntelligence();
    });

    it('should verify Risk Summary Tab of equipment', async () => {
        await equipmentDetailPage.verifyRiskSummary();
    });

    it.skip('should goto Attachments Tab and Assign Attachment to Equipment', async () => {
        await equipmentDetailPage.gotoAttachmentsTabAndAssignAttachment();
        await equipmentDetailPage.addLink();
        await equipmentDetailPage.addDocument();
    });
    
    it.skip('should delete the assigned attachment and verify', async () => {
        await equipmentDetailPage.deleteAttachmentAndVerify();
    });

    it('should delete the created Equipment and verify', async () => {
        await equipmentDetailPage.deleteEquipment();
        await equipmentListviewPage.verifyDeletionOfEquipment();
    });
});

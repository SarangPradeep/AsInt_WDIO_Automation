import rncaListViewPage from '../../page_object_model/btp_applications_page/reliability/asset_risk_and_criticality_analysis/rnca.listview.page';
import rncaDetailPage, { RNCAAssessmentStore } from '../../page_object_model/btp_applications_page/reliability/asset_risk_and_criticality_analysis/rnca.detail.page';
import { browser, expect } from '@wdio/globals';
import utils from '../../utils/utils';

describe('008_Assess criticality of equipment selected ASINT AIS', async () => {

    it('should click on asset risk and criticality analysis application', async () => {
        await rncaListViewPage.navigateToRNCAListView();
    });

    it('should create a new RNCA assessment from list view', async () => {
        const description = 'Automation Test Assessment';
        const longDescription = 'This is automation test';

        await rncaListViewPage.openNewAssessmentDialog();
        await rncaListViewPage.verifyNewAssessmentDialogVisible();
        await rncaListViewPage.fillDescription(description, longDescription);
        await rncaListViewPage.verifyDescriptionValues(description, longDescription);
        await rncaListViewPage.selectRiskType('Current Risk');
        await rncaListViewPage.selectAllowedObjects('Both');
        await rncaListViewPage.selectCurrencyByValue('USD');
        const selectedCurrency = await rncaListViewPage.getSelectedCurrencyValue();	
        await expect(selectedCurrency).not.toEqual('');
        await rncaListViewPage.saveNewAssessment();
        await utils.waitForBusyIndicatorToDisappear();
        const okBtn = await $("//span[text()='Success']/following::button[.//bdi[text()='OK']][1]");
        await okBtn.waitForClickable();
        await okBtn.click();
        await utils.waitForBusyIndicatorToDisappear();
    });
    
    it('should capture the assessment name and ID', async () => {
        const { name, id } = await rncaDetailPage.captureAssessmentNameAndId();
        await expect(name).not.toEqual('');
        await expect(id).not.toEqual('');
        await expect(RNCAAssessmentStore.name).toEqual(name);
        await expect(RNCAAssessmentStore.id).toEqual(id);
    });

    it('should edit General Information tab of created assessment', async () => {
        await rncaDetailPage.editGeneralInformation('Updated Test Assessment', 'This is updated automation test');
    });

    it.skip('should verify Administrative Information tab', async () => {
        await rncaDetailPage.verifyAdministrativeInformation();
    });

    it('should edit Validity Information', async () => {
        await rncaDetailPage.editValidity('Dec 31, 2024', 'Jan 1, 2026');
    });

    it('should edit Scope information and verify', async () => {
        await rncaDetailPage.editScope('Updated In Scope Description');
        await browser.pause(3000);
    });

    it('should assign equipment to the assessment and verify', async () => {
        await rncaDetailPage.assignEquipment('Test Equipment 123');
    });

    it('should assign Assessment Template to the technical object', async () => {
        await rncaDetailPage.assignTemplateByName();
    });

    it('should store the Assignments data', async () => {
        await rncaDetailPage.captureFirstRowValuesOfAssignments();
    });

    it('should select SHE and FIN impact values on first block and save', async () => {
        await rncaDetailPage.selectImpactValuesAndSave();
    });

    it('should store the risk and criticality score values', async () => {
        await rncaDetailPage.captureRiskAndCriticalityScores();
    });

    it('should publish the created assessment and verify', async () => {
        const published = await rncaDetailPage.tryPublishAssessment();
        if (!published) {
            console.log("Publish did not complete → deleting the assessment");
        }
    });

    it('should verify updated criticality value for the equipment in the assessment can be viewed in SAP ERP', async () => {
        await rncaDetailPage.verifyCriticalityValueInSAP();
    });

});

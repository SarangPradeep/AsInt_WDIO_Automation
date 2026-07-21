import assetRCMList from '../../page_object_model/btp_applications_page/reliability/asset_rcm_analysis/asset_rcm_analysis.listview.page';
import assetRCMDetailView from '../../page_object_model/btp_applications_page/reliability/asset_rcm_analysis/asset_rcm_analysis.detailview.page';
import utils from 'utils/utils';

describe('BTP - RCM Analysis Application - Create Assessment via Create System', () => {

    it('should navigate to Asset RCM list view', async () => {
        await assetRCMList.navigateToAssetRCM();
    });

    it('Create new Asset RCM Assessment', async () => {
        await assetRCMList.createAssetRCM();
    });

    it('should verify and edit information tab', async () => {
        await assetRCMDetailView.verifyAndEditGenInfo();
        await assetRCMDetailView.verifyAndEditPlanningData();
        await assetRCMDetailView.addRoles();
    });

    it('should create assessment by choosing technical object and creating a new System', async () => {
        await assetRCMDetailView.createAssessmentFlowWithCreateSystem();
    });

    it('should verify created System name is reflected in hierarchy', async () => {
        await assetRCMDetailView.verifySystemInHierarchy();
    });

    it('should add a Sub-System under the created System with the same Technical Object', async () => {
        await assetRCMDetailView.addSubSystem();
    });

    it('should expand System, verify Sub-System is nested, then assign a Function to Sub-System', async () => {
        await assetRCMDetailView.assignFunctionsToSubSystem();
    });

    it('should verify assigned Function is visible under Sub-System and open its detail page', async () => {
        await assetRCMDetailView.verifyFunctionDetail();
    });

    it('should add Functional Failure for the assigned Function under Sub-System', async () => {
        await assetRCMDetailView.assignFunctionalFailure();
    });

    it('should open Functional Failure detail page, verify header, and assign Equipment to it', async () => {
        await assetRCMDetailView.verifyFunctionalFailureDetail();
    });

    it('should open Technical Object detail from FF, verify header, edit Risk Info, read Maintenance & Service, then close tech-obj detail', async () => {
        await assetRCMDetailView.verifyTechnicalObjectDetailFromFF();
    });

    it('should add Maintainable Items via the equipment row on Functional Failure detail page', async () => {
        await assetRCMDetailView.addMaintainableItemsFromFFDetail();
    });

    it('should expand equipment row and verify the Maintainable Item is nested under it', async () => {
        await assetRCMDetailView.verifyMaintainableItemAddedUnderEquipment();
    });

    it('should add Failure Modes via the Maintainable Item row on Functional Failure detail page', async () => {
        await assetRCMDetailView.addFailureModesFromFFDetail();
    });

    it('should open Failure Mode detail, verify header + Code IDs, verify Analysis Details / Risk Info / Risk Matrix, close panels', async () => {
        await assetRCMDetailView.verifyFailureModeDetail();
    });

    it('should verify attachment section', async () => {
        await utils.verifyAttachmentSection();
    });

    it('should download and verify Summary Report contains System / Sub-System / Function chain entities', async () => {
        await assetRCMDetailView.downloadCreateSystemSummaryReport();
    });

    it('should delete the newly created RCM assessment', async () => {
        await assetRCMDetailView.deleteRCM();
        await assetRCMList.verifyRCMDeletion();
    });

});

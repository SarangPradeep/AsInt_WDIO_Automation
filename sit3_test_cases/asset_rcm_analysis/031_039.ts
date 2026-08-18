import assetRCMList from '../../page_object_model/btp_applications_page/reliability/asset_rcm_analysis/asset_rcm_analysis.listview.page';
import assetRCMDetailView from '../../page_object_model/btp_applications_page/reliability/asset_rcm_analysis/asset_rcm_analysis.detailview.page';
import utils from '../../utils/utils';

describe('031-1_Create RCM Assessment in ASINT AIS (Baseline Assessment) and 039_Assign Mitigated SHE and Financial Risk with associated mitigating strategy', () => {

    it('should navigate to Asset RCM list view', async () => {
        await assetRCMList.navigateToAssetRCM();
    });

    it('Create new Asset RCM Assessment using baseline', async () => {
        await assetRCMList.createAssetRCMForBaseline();
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

    it('should open Failure Mode detail, verify header + Code IDs, verify Analysis Details (Strategy creation/edition/deletion) / Risk Info / Risk Matrix, close panels', async () => {
        await assetRCMDetailView.verifyFailureModeDetail();
    });

    it('should not be able to publish the RCM assessment as RCM Baseline assessments cannot be published via any route (Direct Publish or Approval workflow)', async () => {
        await assetRCMDetailView.verifyCannotPublishRCMBaseline();
    });

});

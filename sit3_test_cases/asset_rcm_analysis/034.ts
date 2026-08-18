import assetRCMList from '../../page_object_model/btp_applications_page/reliability/asset_rcm_analysis/asset_rcm_analysis.listview.page';
import assetRCMDetailView from '../../page_object_model/btp_applications_page/reliability/asset_rcm_analysis/asset_rcm_analysis.detailview.page';
import utils from '../../utils/utils';

describe('034_RCM Assessment via assigning a RCM Template (Baseline)', () => {

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

    it('should use baseline assessment by choosing technical object and creating a new System', async () => {
        await assetRCMDetailView.useBaselineAssessmentFlowWithCreateSystem();
    });

});

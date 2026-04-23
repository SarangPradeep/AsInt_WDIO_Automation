import assetRCMList from '../../page_object_model/btp_applications_page/reliability/asset_rcm_analysis/asset_rcm_analysis.listview.page';
import assetRCMDetailView from '../../page_object_model/btp_applications_page/reliability/asset_rcm_analysis/asset_rcm_analysis.detailview.page';

describe('BTP Equipment App Functional test', () => {

    it('should navigate to Asset RCM list view', async () => {
        await assetRCMList.navigateToAssetRCM();
    });
    
    it('Create new Asset RCM Assessment', async () => {
        await assetRCMList.createAssetRCM();
    });

    // it('should verify and edit information tab' , async () => {
    //     await assetRCMDetail.verifyAndEditGenInfo();
    //     await assetRCMDetail.verifyAndEditPlanningData();
    //     await assetRCMDetail.addRoles();
    // });

    it('should verify assessment tab and add tecnhinal objects' , async () => {
        await assetRCMDetailView.createAssessmentFlow();
        await assetRCMDetailView.verifyAssessment();
        await assetRCMDetailView.captureRiskStrategyRecommendation();
    });

    it('should add maintanable itmes for tecnhinal objects' , async () => {
        await assetRCMDetailView.addMaintanableItems();
        await assetRCMDetailView.verifyMaintainableDetails();
    });

    it('should add failure modes for added maintanable itmes of tecnhinal objects' , async () => {
        await assetRCMDetailView.addFailureModes();
        await assetRCMDetailView.verifyFailureModesDetails();
    });
    
});

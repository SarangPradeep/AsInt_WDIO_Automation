import assetRCMList from '../../page_object_model/btp_applications_page/reliability/asset_rcm_analysis/asset_rcm_analysis.listview.page';
import assetRCMDetailView from '../../page_object_model/btp_applications_page/reliability/asset_rcm_analysis/asset_rcm_analysis.detailview.page';
import utils from '../../utils/utils';
describe('044_Submit Assessment for Approval', () => {

    it('should navigate to Asset RCM list view', async () => {
        await assetRCMList.navigateToAssetRCM();
    });
    
    //Creating 1st RCM assessment without technical objects and functional location technical objects
    it('Create new Asset RCM Assessment without technical objects and functional location technical objects', async () => {
        await assetRCMList.createAssetRCM();
    });

    it('should verify and edit information tab' , async () => {
        await assetRCMDetailView.verifyAndEditGenInfo();
        await assetRCMDetailView.verifyAndEditPlanningData();
        await assetRCMDetailView.addRoles();
    });

    it('should verify assessment tab and add technical objects' , async () => {
        await assetRCMDetailView.createAssessmentFlow();
        await assetRCMDetailView.verifyAssessment();
        await assetRCMDetailView.verifyAssessmentSections();
    });

    it('should create workflow for the assessment without technical objects and functional location technical objects' , async () => {
        await assetRCMDetailView.createWorkflowForAssessmentWithoutTechObj();
    });

    it('should navigate back to Asset RCM list view', async () => {
        await utils.navigateBack();
    });

    //Creating 2nd RCM assessment with technical objects and functional location technical objects
    it('Create new Asset RCM Assessment with technical objects and functional location technical objects', async () => {
        await assetRCMList.createAssetRCM();
    });

    it('should verify and edit information tab' , async () => {
        await assetRCMDetailView.verifyAndEditGenInfo();
        await assetRCMDetailView.verifyAndEditPlanningData();
        await assetRCMDetailView.addRoles();
    });

    it('should verify assessment tab and add technical objects' , async () => {
        await assetRCMDetailView.createAssessmentFlow();
        await assetRCMDetailView.verifyAssessment();
        await assetRCMDetailView.verifyAssessmentSections();
    });

    it('should add functional location as technical objects', async () => {
        await assetRCMDetailView.addFunLocTechObj();
        await assetRCMDetailView.verifyDetailPageFunLoc();
    });

    it('should add functions for functional location technical objects', async () => {
        await assetRCMDetailView.assignFunctions();
    });

    it('should add functional failure for assigned functions', async () => {
        await assetRCMDetailView.assignFunctionalFailure();
    });

    it('should navigate back to Asset RCM list view', async () => {
        await utils.navigateBack();
    });

    //selecting the 1st and 2nd RCM assessment from list view to verify the details of both assessments
    it('should select the 1st and 2nd RCM assessment from list view', async () => {
        await assetRCMList.selectAssetRCMAssessment();
    });

    it('should create bulk workflow for the selected assessments', async () => {
        await assetRCMList.createBulkWorkflowForSelectedAssessments();
    });
    
});

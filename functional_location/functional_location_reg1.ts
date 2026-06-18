import functionalLocationListView from '../page_object_model/btp_applications_page/master_data/functional_location/functional_location.listview.page';
import FunctionalLocationRegressionPage from '../page_object_model/btp_applications_page/master_data/functional_location/functional_location.regression_page';
import {funcLocTestData} from '../test_data/btp_applications/functional_location.data';
describe('BTP - Functional Location - Regression Test', () => {

    it('should navigate to functional location list view', async () => {
        await functionalLocationListView.navigateFunctionalLocationListView();
    });

    it('should search and navigate to detail view of functional location', async () => {
        await FunctionalLocationRegressionPage.searchFunctionalLocation(funcLocTestData.searchFunLoc.functionallocation1);
        await FunctionalLocationRegressionPage.navigateToSearchedFunctionalLocation();
    });

    it('should navigate to asset intelligence tab', async () => {
        await FunctionalLocationRegressionPage.navigateToAssetIntelligenceTab();
    });

    it('should verify asset inspection details', async () => {
        await FunctionalLocationRegressionPage.verifyAssetInspectionDetails();
    });

    it('should verify findings details' , async () => {
        await FunctionalLocationRegressionPage.verifyFindingDetails();
    });

});
import functionalLocationListView from '../page_object_model/btp_applications_page/master_data/functional_location/functional_location.listview.page';
import FunctionalLocationRegressionPage from '../page_object_model/btp_applications_page/master_data/functional_location/functional_location.regression_page';
import { funcLocTestData } from '../test_data/btp_applications/functional_location.data';
import utils from '../utils/utils';

describe('BTP - Functional Location - Regression Test', () => {

    // ---------------- Regression Set 1 ----------------
    it('should navigate to functional location list view', async () => {
        await functionalLocationListView.navigateFunctionalLocationListView();
    });

    it('should search and navigate to detail view of functional location (set 1)', async () => {
        await FunctionalLocationRegressionPage.searchFunctionalLocationByDisplayId(funcLocTestData.searchFunLoc.displayId1);
        await FunctionalLocationRegressionPage.navigateToSearchedFunctionalLocation();
    });

    it('should navigate to asset intelligence tab (set 1)', async () => {
        await FunctionalLocationRegressionPage.navigateToAssetIntelligenceTab();
    });

    it('should verify risk and criticality details (set 1)', async () => {
        await FunctionalLocationRegressionPage.verifyRiskAndCriticalityDetails();
    });

    it('should verify asset strategy details (RCM/Fleet) (set 1)', async () => {
        await FunctionalLocationRegressionPage.verifyAssetStrategyRCMFleetDetails();
    });

    // ---------------- Transition: back to home, then re-enter Functional Location ----------------
    it('should navigate back to home page after regression set 1', async () => {
        await utils.navigateToHomePage();
    });

    // ---------------- Regression Set 2 ----------------
    it('should navigate to functional location list view again', async () => {
        await functionalLocationListView.navigateFunctionalLocationListView();
    });

    it('should search and navigate to detail view of functional location (set 2)', async () => {
        await FunctionalLocationRegressionPage.searchFunctionalLocationByDisplayId(funcLocTestData.searchFunLoc.displayId2);
        await FunctionalLocationRegressionPage.navigateToSearchedFunctionalLocation();
    });

    it('should navigate to asset intelligence tab (set 2)', async () => {
        await FunctionalLocationRegressionPage.navigateToAssetIntelligenceTab();
    });

    it('should verify asset strategy details (RBI)', async () => {
        await FunctionalLocationRegressionPage.verifyAssetStrategyDetails();
    });

    it('should verify asset inspection details (set 2)', async () => {
        await FunctionalLocationRegressionPage.verifyAssetInspectionDetails();
    });

    it('should verify findings details (set 2)', async () => {
        await FunctionalLocationRegressionPage.verifyFindingDetails();
    });

    it('should verify recommendation details', async () => {
        await FunctionalLocationRegressionPage.verifyRecommendationDetails();
    });

});

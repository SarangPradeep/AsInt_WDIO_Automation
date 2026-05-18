import AssetCloningSuiteListPage from '../page_object_model/btp_applications_page/asset_cloning_suite/asset_cloning_suite.list.page';

describe('BTP - Asset Cloning Suite - Clone Across Apps', () => {

    it('should open Asset Cloning Suite cards', async () => {
        await AssetCloningSuiteListPage.openAssetCloningSuiteCards();
    });

    it('should create a clone from Asset Strategy Assessments app in list', async () => {
        await AssetCloningSuiteListPage.openAssetStrategyAssessmentsCard();
    });

    it('should create a clone from Asset RCM Analysis app in list', async () => {
        await AssetCloningSuiteListPage.openAssetRCMAnalysisCard();
    });

    it('should create a clone from Asset Strategy Analysis for Classes app in list', async () => {
        await AssetCloningSuiteListPage.openAssetStrategyAnalysisForClassesCard();
    });

    it('should create a clone from Risk and Criticality Assessments app in list', async () => {
        await AssetCloningSuiteListPage.openRiskAndCriticalityAssessmentsCard();
    });

    it('should create a clone from Asset Cloning Templates app in list', async () => {
        await AssetCloningSuiteListPage.openAssetCloningTemplatesCard();
    });




});

import HomePage from '../page_object_model/btp_applications_page/home.page';
import EquipmentRegressionPage from '../page_object_model/btp_applications_page/master_data/equipment/equipment.regression_page';
import { equipmentTestData } from '../test_data/btp_applications/equipment.data';

describe('BTP - Equipment - Regression Test', () => {

    it('should navigate to equipment list view', async () => {
        await HomePage.clickEquipmentTile();
    });

    it('should search and navigate to detail view of equipment', async () => {
        await EquipmentRegressionPage.searchEquipment(equipmentTestData.searchEquipment.equipment);
        await EquipmentRegressionPage.navigateToSearchedEquipment();
    });

    it('should navigate to asset intelligence tab', async () => {
        await EquipmentRegressionPage.navigateToAssetIntelligenceTab();
    });

    it('should verify risk and criticality details', async () => {
        await EquipmentRegressionPage.verifyRiskAndCriticalityDetails();
    });

    it('should verify asset strategy details (RBI)', async () => {
        await EquipmentRegressionPage.verifyAssetStrategyDetails();
    });

    it('should verify asset strategy details (RCM/Fleet)', async () => {
        await EquipmentRegressionPage.verifyAssetStrategyRCMFleetDetails();
    });

    it('should verify asset inspection details', async () => {
        await EquipmentRegressionPage.verifyAssetInspectionDetails();
    });

    it('should verify findings details', async () => {
        await EquipmentRegressionPage.verifyFindingDetails();
    });

    it('should verify recommendation details', async () => {
        await EquipmentRegressionPage.verifyRecommendationDetails();
    });

});

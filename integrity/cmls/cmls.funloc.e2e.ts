import CMLListView from "../../page_object_model/btp_applications_page/integrity/cmls/cmls.listview.page";
import CMLDetailView from "../../page_object_model/btp_applications_page/integrity/cmls/cmls.detailview.page";
import AssetInspectionListView from "../../page_object_model/btp_applications_page/integrity/asset_inspection/asset_inspection.listview.page";
import AssetInspectionDetailView from "../../page_object_model/btp_applications_page/integrity/asset_inspection/asset_inspection.detailview.page";
import utils from "utils/utils";
describe('BTP - CMLs (Functional Location) - Functional Test', () => {

    it('should navigate to CMLs list view', async () => {
        await CMLListView.navigateToCMLListView();
    });

    it('should create new CMLs using Functional Location', async () => {
        await CMLListView.createNewCMLsUsingFunLoc();
    });

    it('verify created CMLs in CML Summary', async () => {
        await CMLDetailView.verifyCmlInSummary();
    });

    it('should edit and verify details in backgroud section in CML detailed section', async () => {
        await CMLDetailView.editVerifyBackgroundSectionFunLoc();
    });

    it('should edit and verify details in pressure Tmin section in CML detailed section', async () => {
        await CMLDetailView.editVerifyPressureTminSectionFunLoc();
    });

    it('should verify details in Structural Tmin section in CML detailed section', async () => {
        await CMLDetailView.verifyStructuralTminSectionFunLoc();
    });

    it('should verify details in MAWP section in CML detailed section', async () => {
        await CMLDetailView.verifyMAWPSection();
    });

    it('should verify details in history section in CML detailed section', async () => {
        await CMLDetailView.verifyHistorySection();
    });

    it('should navigate to Home page', async () => {
        await utils.navigateToHomePage();
    });

    it('should navigate to asset Inspection', async () => {
        await AssetInspectionListView.navigateToAssetInspectionListView();
    });

    it('should create asset inspection using same functional location from CML and navigate to detail page', async () => {
        await AssetInspectionListView.createInspectionUsingSameObjectAsCML();
    });

    it('should edit general info and roles in detail page', async () => {
        await AssetInspectionDetailView.updateGeneralInfoAndRoles();
    });

    it('should add created CML, enter readings, calculate and save in CML tab', async () => {
        await AssetInspectionDetailView.addCreatedCmlAndSaveReadings();
    });

    it('should navigate back to Home page after inspection readings', async () => {
        await browser.switchFrame(null);
        await utils.navigateToHomePage();
    });

    it('should navigate to CMLs and open same functional location in CML list view', async () => {
        await CMLListView.navigateToCMLListView();
        await CMLListView.searchFunLocAndOpenDetail();
    });

    it('should search the created CML in functional location detail and open it', async () => {
        await CMLDetailView.searchCmlAndOpenDetailToVerifyAverage();
        console.log(`Average Reading captured from inspection: '${AssetInspectionDetailView.averageReading}'`);
    });


});

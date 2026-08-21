import AssetInspectionListView from "../../page_object_model/btp_applications_page/integrity/asset_inspection/asset_inspection.listview.page";
import AssetInspectionDetailView from "../../page_object_model/btp_applications_page/integrity/asset_inspection/asset_inspection.detailview.page";

describe('BTP - Asset Inspection - Bulk Update Stage Flow', () => {

    const targetStage = "Out of Service";

    it('should navigate to Asset Inspection list view', async () => {
        await AssetInspectionListView.navigateToAssetInspectionListView();
    });

    it('should create the first asset inspection, capture its INSP ID, and navigate back to list view', async () => {
        await AssetInspectionListView.createNewInspection();
        const id = await AssetInspectionDetailView.captureCurrentInspectionId();
        AssetInspectionListView.firstBulkInspection = {
            id,
            description: AssetInspectionListView.createdInspectionDescription
        };
        console.log(`First inspection captured: ${JSON.stringify(AssetInspectionListView.firstBulkInspection)}`);
        await AssetInspectionListView.navigateBackToListView();
    });

    it('should create the second asset inspection, capture its INSP ID, and navigate back to list view', async () => {
        await AssetInspectionListView.createNewInspection();
        const id = await AssetInspectionDetailView.captureCurrentInspectionId();
        AssetInspectionListView.secondBulkInspection = {
            id,
            description: AssetInspectionListView.createdInspectionDescription
        };
        console.log(`Second inspection captured: ${JSON.stringify(AssetInspectionListView.secondBulkInspection)}`);

        if (AssetInspectionListView.secondBulkInspection.id === AssetInspectionListView.firstBulkInspection.id) {
            throw new Error("Both inspections captured the same INSP ID — creation of the second inspection likely failed.");
        }
        await AssetInspectionListView.navigateBackToListView();
    });

    it('should search for both inspections (checkbox auto-persists across searches) and click Bulk Update', async () => {
        await AssetInspectionListView.searchInList(AssetInspectionListView.firstBulkInspection.id);
        await AssetInspectionListView.selectFirstResultCheckbox();
        await AssetInspectionListView.searchInList(AssetInspectionListView.secondBulkInspection.id);
        await AssetInspectionListView.selectFirstResultCheckbox();
        await AssetInspectionListView.clickBulkUpdate();
    });

    it(`should select Stage '${targetStage}' in Bulk Update dialog, save, and confirm success`, async () => {
        await AssetInspectionListView.selectBulkUpdateStage(targetStage);
        await AssetInspectionListView.saveBulkUpdate();
    });

    it(`should open the first inspection from list view and verify Stage is '${targetStage}'`, async () => {
        await AssetInspectionListView.openInspectionRowById(AssetInspectionListView.firstBulkInspection.id);
        await AssetInspectionDetailView.verifyStageInHeader(targetStage);
    });

    it('should publish the first inspection and verify status is Published', async () => {
        await AssetInspectionDetailView.publishInspection();
        await AssetInspectionDetailView.verifyPublishStatus("Published");
    });

    it(`should navigate back and open the second inspection from list view and verify Stage is '${targetStage}'`, async () => {
        await AssetInspectionListView.navigateBackToListView();
        await AssetInspectionListView.openInspectionRowById(AssetInspectionListView.secondBulkInspection.id);
        await AssetInspectionDetailView.verifyStageInHeader(targetStage);
    });

    it('should publish the second inspection and verify status is Published', async () => {
        await AssetInspectionDetailView.publishInspection();
        await AssetInspectionDetailView.verifyPublishStatus("Published");
    });

});

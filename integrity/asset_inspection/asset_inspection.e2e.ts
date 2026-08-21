import AssetInspectionListView from "../../page_object_model/btp_applications_page/integrity/asset_inspection/asset_inspection.listview.page";
import AssetInspectionDetailView from "../../page_object_model/btp_applications_page/integrity/asset_inspection/asset_inspection.detailview.page";

describe('BTP - Asset Inspection - Functional Test', () => {

    it('should navigate to Asset Inspection list view', async () => {
        await AssetInspectionListView.navigateToAssetInspectionListView();
    });

    it('should create a new asset inspection and navigate to detail page', async () => {
        await AssetInspectionListView.createNewInspection();
    });

    it('should verify inspection template data loaded correctly in header', async () => {
        await AssetInspectionDetailView.verifyInspectionDataInHeader();
    });

    it('should edit and verify general info and roles in detail page', async () => {
        await AssetInspectionDetailView.updateGeneralInfoAndRoles();
        await AssetInspectionDetailView.verifyInspectionDataInHeader();
    });

    it('should edit the header (short/long description and inspection type) and verify updates in header', async () => {
        await AssetInspectionDetailView.editHeader();
        await AssetInspectionDetailView.verifyInspectionDataInHeader();
    });

    it('should fill the Component Checklist on the Checklist tab and save', async () => {
        await AssetInspectionDetailView.fillChecklistAndSave();
    });

    it('should add CMLs on the CML tab and verify they appear in the CML list', async () => {
        await AssetInspectionDetailView.addCmlsAndVerify();
    });

    it('should swap CML-01 with CML-02 via Add CML and verify the swap in the list', async () => {
        await AssetInspectionDetailView.swapCmlAndVerify();
    });

    it('should fill CML readings, calculate, verify Average Reading and save', async () => {
        await AssetInspectionDetailView.fillCmlReadingsCalculateAndSave();
    });

    it('should create a Finding on the Findings And Observation tab and verify it appears in the list', async () => {
        await AssetInspectionDetailView.createFindingAndVerify();
    });

    it('should select the finding, create an APM Recommendation, and verify it in the Recommendation Workbench listview', async () => {
        await AssetInspectionDetailView.createApmRecommendationFromFinding();
    });

    it('should manage attachments: add document with 50MB limit check, assign header.png, and IntelliEdit-attach first finding', async () => {
        await AssetInspectionDetailView.addAttachmentsAndVerify();
        await AssetInspectionDetailView.assignDocumentAndVerify("header.png");
        await AssetInspectionDetailView.intelliEditAttachmentAndAttachFinding("storagetank");
    });

    it('should create a Maintenance Notification on the Maintenance and Service tab and verify it in the list', async () => {
        await AssetInspectionDetailView.createMaintenanceNotificationAndVerify();
    });

    it('should assign two existing Maintenance Notifications, verify them in the list, then unassign one and verify removal', async () => {
        await AssetInspectionDetailView.assignAndUnassignMaintenanceNotifications();
    });

    it('should download the Detail report (Fields Where Values Are Present, Include all attachments) and verify its contents match what was entered', async () => {
        await AssetInspectionDetailView.downloadReportDetailFieldsWithValuesAndVerify();
    });

    it('should download the Detail report (All Available Fields, Include all attachments) and verify its contents match what was entered', async () => {
        await AssetInspectionDetailView.downloadReportDetailAllFieldsAndVerify();
    });

    it('should download the Summary report (Fields Where Values Are Present, Include all attachments) and verify its contents match what was entered', async () => {
        await AssetInspectionDetailView.downloadReportAndVerify();
    });

    it('should download the Summary report (All Available Fields, Include all attachments) and verify its contents match what was entered', async () => {
        await AssetInspectionDetailView.downloadReportSummaryAllFieldsAndVerify();
    });

    it('should download the Summary report (Fields Where Values Are Present, Select attachments → Storagetank only) and verify header.png is excluded', async () => {
        await AssetInspectionDetailView.downloadReportSummaryFwvpSelectAttachmentsAndVerify();
    });

    it('should download the Summary report (All Available Fields, Select attachments → Storagetank only) and verify header.png is excluded', async () => {
        await AssetInspectionDetailView.downloadReportSummaryAllFieldsSelectAttachmentsAndVerify();
    });

    it('should download the Detail report (Fields Where Values Are Present, Select attachments → Storagetank only) and verify header.png is excluded', async () => {
        await AssetInspectionDetailView.downloadReportDetailFwvpSelectAttachmentsAndVerify();
    });

    it('should download the Detail report (All Available Fields, Select attachments → Storagetank only) and verify header.png is excluded', async () => {
        await AssetInspectionDetailView.downloadReportDetailAllFieldsSelectAttachmentsAndVerify();
    });

    it('should delete the created asset inspection and verify it is removed from the list view', async () => {
        await AssetInspectionDetailView.deleteInspection();
        await AssetInspectionListView.verifyInspectionDeleted();
    });

});
after 
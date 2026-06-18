import CMLListView from "../../page_object_model/btp_applications_page/integrity/cmls/cmls.listview.page";
import CMLReport from "../../page_object_model/btp_applications_page/integrity/cmls/cmls.report.page";

describe('BTP - CMLs - Report Verification', () => {

    it('should navigate to CMLs list view', async () => {
        await CMLListView.navigateToCMLListView();
    });

    it('should search equipment in the CML list view (without opening detail)', async () => {
        await CMLListView.searchEquipment(CMLReport.targetEquipment);
        await CMLReport.waitForEquipmentDetailReady();
    });

    it('should read and print the Asset Overview count', async () => {
        await CMLReport.printAssetOverviewCount();
    });

    it('should store the Asset Overview row values globally', async () => {
        await CMLReport.storeAssetOverviewRowValues();
    });

    it('should click Export and wait for the Excel file to download', async () => {
        await CMLReport.clickExportAndDownload();
    });

    it('should extract the entry count and per-column values from the exported Excel', async () => {
        await CMLReport.extractExportedExcelValues();
    });

    it('should verify the exported Excel contains the searched equipment', async () => {
        await CMLReport.verifyExportedExcelHasTargetEquipment();
    });

    it('should navigate to the detail view of this equipment from the Asset Overview row', async () => {
        await CMLReport.openCMLDetailView();
    });

    it('should count the CMLs present on the equipment detail view and store globally', async () => {
        await CMLReport.storeCMLsCount();
    });

    it('should click Export to Excel for CMLs, wait for download and verify row count matches CMLs count', async () => {
        await CMLReport.clickExportToExcelAndExtract();
    });

});

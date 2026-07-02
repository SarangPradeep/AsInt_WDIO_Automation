import assetRCMReport from '../../page_object_model/btp_applications_page/reliability/asset_rcm_analysis/asset_rcm_analysis.report.page';
import assetRcmData from '../../test_data/btp_applications/reliability/asset_rcm.data';

describe('BTP - Asset RCM Analysis - Report Verification', () => {

    it('should navigate to Asset RCM Analysis list view', async () => {
        await assetRCMReport.navigateToRCM();
    });

    it('should open Adapt Filters and add the Technical Object filter', async () => {
        await assetRCMReport.addTechnicalObjectAdaptFilter();
    });

    it(`should enter Technical Object ${assetRcmData.report.technicalObject} and click Go`, async () => {
        await assetRCMReport.searchByTechnicalObject(assetRcmData.report.technicalObject);
    });

    it('should capture all filtered Assessment rows from the list view', async () => {
        await assetRCMReport.captureAssessmentRows();
    });

    it('should click Export to Excel and wait for the report to download', async () => {
        await assetRCMReport.clickExportToExcelAndDownload();
    });

    it('should extract the exported Excel and verify all captured UI data is present', async () => {
        await assetRCMReport.extractAndVerifyExcelReport();
    });

    it('should open Settings and add all available list view fields', async () => {
        await assetRCMReport.addAllListViewFields();
    });

    it('should recapture assessment rows including the newly added columns', async () => {
        await assetRCMReport.recaptureWithAllFields();
    });

    it('should click Export to Excel again and wait for the updated report to download', async () => {
        await assetRCMReport.reExportToExcel();
    });

    it('should verify the newly added fields are present in the re-exported Excel', async () => {
        await assetRCMReport.verifySecondExcelHasAddedFields();
    });

});

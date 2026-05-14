import rcaListviewPage from '../page_object_model/btp_applications_page/root_cause_analysis/root_cause_analysis.listview.page.ts';
import rcaDetailPage from '../page_object_model/btp_applications_page/root_cause_analysis/root_cause_analysis.detail.page.ts';
// import { rcaData } from '../test_data/btp_applications/root_cause_analysis_data';


describe('BTP RCA Application Functional test', () => {

    describe('RCA Assessment Creation', () => {
        
        it('should navigate to Root Cause Analysis list view', async () => {
            await rcaListviewPage.navigateRCAListView();
        });

        it('should click Add button to open creation form', async () => {
            await rcaListviewPage.clickAddButton();
        });

        it('should fill and submit Create Assessment form', async () => {
            await rcaListviewPage.enterDescription();
            await rcaListviewPage.enterLongDescription();
            await rcaListviewPage.selectFailureType();
            await rcaListviewPage.selectRCAMethodology();
            await rcaListviewPage.clickCreateAssessmentButton();
            await rcaListviewPage.clickOKButton();
        });
    });

    describe('RCA General Information Page', () => {

        it('should update RCA General Information', async () => {
            await rcaDetailPage.clickEditButton();
            await rcaDetailPage.selectFailureOccurrenceMultiple();
            await rcaDetailPage.enterObservation();
            await rcaDetailPage.enterLongDescription();
            // await rcaDetailPage.selectFailureTypeSafety();
            await rcaDetailPage.selectDates();
            await rcaDetailPage.clickSaveButton();
            await rcaDetailPage.clickAddRolesButton();
        });

    });

    describe('RCA Technical Objects Tab', () => {

        it('should navigate to Technical Objects tab', async () => {
            await rcaDetailPage.clickTechnicalObjectsTab();
        });  

    });

    describe('RCA Why-Why Analysis Tab', () => {

        it('should navigate to Why-Why Analysis tab', async () => {
            await rcaDetailPage.clickWhyWhyAnalysisTab();
            await rcaDetailPage.verifyEventInWhyWhyAnalysis();

        });

    });

    describe('RCA Attachments', () => {

        it('should verify attachment section' , async () => {
            await rcaDetailPage.gotoAttachmentsTabAndAssignAttachment();
            // await rcaDetailPage.addDocument();
            // await rcaDetailPage.addLink();
            // await rcaDetailPage.deleteAttachmentAndVerify();

        });

    });

    describe('Maintenance and Service Information', () => {

        it('should verify Maintenance and Service information section' , async () => {
            await rcaDetailPage.verifyMaintenanceAndServiceSections();
        });
    
    });

    describe('RCA Change History', () => {

        it('should verify RCA change history for header information edits' , async () => {
            await rcaDetailPage.verifyChangeHistory();
        });

    });

});
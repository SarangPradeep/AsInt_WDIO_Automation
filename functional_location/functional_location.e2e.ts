import functionalLocationListView from '../page_object_model/btp_applications_page/functional_location/functional_location.listview.page';
import functionalLocationDetailView from '../page_object_model/btp_applications_page/functional_location/functional_location.detail.page';
import {funcLocTestData} from '../test_data/btp_applications/functional_location.data';
describe('Functional Location test', () => {
    // --- Test ---

    it.skip('should create a new functional location', async () => {
        await functionalLocationListView.naviagteFunctionalLocationListView();
        await functionalLocationListView.createFunctionalLocation(2);
    });

    it('should navigate to newly created functional location' , async () => {
        await functionalLocationListView.navigateFunctionalLocation();
    });

    it.skip('should verify and edit header information' , async () => {
        await functionalLocationDetailView.verifyHeader();
        await functionalLocationDetailView.editHeader();
    });

    it.skip('should verify and edit general information tab' , async () => {
        await functionalLocationDetailView.verifyAndEditGeneralInfo();
    });

    it.skip('should verify and edit structure tab' , async () => {
        await functionalLocationDetailView.verifyAndEditStructure();
        await functionalLocationDetailView.assignEquipment(2);
        await functionalLocationDetailView.assignFuncLoc(2);
        await functionalLocationDetailView.verifyGroups();
    });

    it.skip('should assign functional location template and classes and characterstics in assignments' , async () => {
        await functionalLocationDetailView.asgnFunLocTemplate(
            funcLocTestData.assignmentEdit.noOfFunLocTempToAssign,
            funcLocTestData.assignmentEdit.isAutoAssignClass);
        await functionalLocationDetailView.assignFunLocClass(
            funcLocTestData.assignmentEdit.noOfFunctionalClassesToAssign,
            funcLocTestData.assignmentEdit.isAutoAssignClass);
    });

    it.skip('Should verify classification and MDA tab' , async () => {
        await functionalLocationDetailView.assignFunLocChar(
            funcLocTestData.classificationMDA.noOfCharacteristics);
    });

    it.skip('should verify asset Intelligence' , async () => {
        await functionalLocationDetailView.verifyAssetIntelligence();
    });

    it.skip('should verify risk summary' , async () => {
        await functionalLocationDetailView.verifyRiskSummary();
    });
    it.skip('should verify maintenance and service' , async () => {
        await functionalLocationDetailView.verifyMainAndSum();
    });

    it.skip('should verify attachment section' , async () => {
        await functionalLocationDetailView.gotoAttachmentsTabAndAssignAttachment();
        await functionalLocationDetailView.addDocument();
        await functionalLocationDetailView.addLink();

    });

    it.skip('should delete the assigned attachment and verify', async () => {
        await functionalLocationDetailView.deleteAttachmentAndVerify();
    });

    it.skip('should verify change history' , async () => {
        await functionalLocationDetailView.verifyChangeHistory();
    });

    it.skip('should verify CML from header section of functional location' , async () => {
        await functionalLocationDetailView.verifyCML();
    });
});


import AssessmnetTempListView from '../../page_object_model/btp_applications_page/integrity/assessment_template/assessment_template.listview.page';
import AssessmnetTempDetailView from '../../page_object_model/btp_applications_page/integrity/assessment_template/assessment_template.detailview.page';
import utils from '../../utils/utils';
describe('BTP - Assessment Template - Functional Test', () => {

    it('should navigate to assessment template list view', async () => {
        await AssessmnetTempListView.navigateToAssessmentTempListView();
    });

    it('should be able to create assessment template', async () => {
        await AssessmnetTempListView.createAssessmentTemplate();
    });

    it('should be able to capture assessment template details ', async () => {
        await utils.captureHeaderDetails();
    });

    it('should be able to verify header details ', async () => {
        await AssessmnetTempDetailView.verifyAndEditHeaderDetails();
    });

});
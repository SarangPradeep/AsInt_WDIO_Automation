import utils from "../../utils/utils.ts";
import recommendationWorkbenchDetailView from '../../page_object_model/btp_applications_page/planning/recommendation_workbench/recommendation_workbench.detailview.page.ts';
import recommendationWorkbenchListView from '../../page_object_model/btp_applications_page/planning/recommendation_workbench/recommendation_workbench.listview.page.ts';
import mspListView from '../../page_object_model/btp_applications_page/planning/maintenance_spend_planning/maintenance_spend_planning.listview.page.ts';

describe('BTP - Maintenance Spend Planning - Regression Test', () => {

    let abortSuite = false;

    beforeEach(function () {
        if (abortSuite) {
            console.log(`Skipping '${this.currentTest?.title}' because a prerequisite step failed.`);
            this.skip();
        }
    });

    it('should navigate to Recommendation Workbench list view', async () => {
        await recommendationWorkbenchListView.navigateRecommendationWorkbenchListView();
    });

    it('should create a new recommendation from list page', async function () {
        try {
            await recommendationWorkbenchListView.createReccWorkbench();
        } catch (err) {
            abortSuite = true;
            throw err;
        }
    });

    it('should capture header details of the newly created recommendation', async () => {
        await utils.captureHeaderDetails();
    });

    it('should capture the Recommendation Workbench id', async () => {
        await recommendationWorkbenchDetailView.captureReccWorkbenchId();
    });

    it("should change status to 'For Review' from the detail page", async () => {
        await recommendationWorkbenchDetailView.changeStatusToForReview();
    });

    it('should navigate back to the Recommendation Workbench list page', async () => {
        await utils.navigateBack();
    });

    it('should search and select the created recommendation in the list', async () => {
        await recommendationWorkbenchListView.searchAndSelectRecommendation(
            recommendationWorkbenchListView.ReccWorkDisplayID
        );
    });

    it("should click Create and choose 'To MSP Item'", async () => {
        await recommendationWorkbenchListView.createMSPItemFromRecommendation();
    });

    it("should fill 'Convert To MSP Item' dialog and convert", async () => {
        await recommendationWorkbenchListView.convertToMSPItem();
    });

    it('should navigate back to the home page', async () => {
        await utils.navigateToHomePage();
    });

    it('should navigate to Maintenance Spend Planning list view', async () => {
        await mspListView.navigateToMSPListView();
    });

    it('should search and verify the created MSP Item exists in the list', async () => {
        await mspListView.verifyMSPItemExists(recommendationWorkbenchListView.MSPItemShortDesc);
    });
});

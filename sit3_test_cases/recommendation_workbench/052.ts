import utils from "../../utils/utils.ts";
import recommendationWorkbenchDetailView from '../../page_object_model/btp_applications_page/planning/recommendation_workbench/recommendation_workbench.detailview.page.ts';
import recommendationWorkbenchListView from '../../page_object_model/btp_applications_page/planning/recommendation_workbench/recommendation_workbench.listview.page.ts';
describe('052 -> Select recommendation and flag for turnaround work scope', () => {

    //case 1: Create a recommendation workbench using equipment
    it('should navigate to functional location list view', async () => {
        await recommendationWorkbenchListView.navigateRecommendationWorkbenchListView();
    });

    it('should create new recommendation workbench from list page', async function () {
        await recommendationWorkbenchListView.createReccWorkbench();
    });

    it('should capture header details of newly created Recommendation Workbench items', async() => {
        await utils.captureHeaderDetails();
    });

    it('should verify and edit header details of the recommendation workbench', async() => {
        await recommendationWorkbenchDetailView.verifyHeader();
        await recommendationWorkbenchDetailView.editHeader();
    });

    it('should capture the Recommendation Workbench id', async() => {
        await recommendationWorkbenchDetailView.captureReccWorkbenchId();
    });

    it('should edit general information of the recommendation workbench', async() => {
        await recommendationWorkbenchDetailView.editGeneralInformation();
    });

    it('should navigate back to list view and search for the newly created recommendation workbench with same maintenance event and business impact', async() => {
        await utils.navigateBack();
        await recommendationWorkbenchListView.searchWithStoredValues();
    });

    it('should navigate back to home page', async() => {
        await utils.navigateToHomePage();
    });

    //case 2: Create a recommendation workbench using functional location
    it('should navigate to functional location list view', async () => {
        await recommendationWorkbenchListView.navigateRecommendationWorkbenchListView();
    });

    it('should create new recommendation workbench using functional location from list page', async function () {
        await recommendationWorkbenchListView.createReccWorkbenchFL();
    });

    it('should capture header details of newly created Recommendation Workbench items', async() => {
        await utils.captureHeaderDetails();
    });

    it('should verify and edit header details of the recommendation workbench', async() => {
        await recommendationWorkbenchDetailView.verifyHeader();
        await recommendationWorkbenchDetailView.editHeader();
    });

    it('should capture the Recommendation Workbench id', async() => {
        await recommendationWorkbenchDetailView.captureReccWorkbenchId();
    });

    it('should edit general information of the recommendation workbench', async() => {
        await recommendationWorkbenchDetailView.editGeneralInformation();
    });

    it('should navigate back to list view and search for the newly created recommendation workbench with same maintenance event and business impact', async() => {
        await utils.navigateBack();
        await recommendationWorkbenchListView.searchWithStoredValues();
    });
});
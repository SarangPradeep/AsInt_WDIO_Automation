
import CMLListView from "../../page_object_model/btp_applications_page/integrity/cmls/cmls.listview.page";
describe('BTP - CMLs - Functional Test', () => {

    it('should navigate to CMLs list view', async () => {
        await CMLListView.navigateToCMLListView();
    });

    it('should create new CMLs', async () => {
        await CMLListView.createNewCMLs();
    });

});
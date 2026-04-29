import ASDListView from '../../page_object_model/btp_applications_page/integrity/asset_strategy_development/asset_strategy_development.listview.page';

describe('BTP - Asset Strategy Development (ASD) - Functional Test', () => {

    it('should navigate to asset strategy development list view', async () => {
        await ASDListView.navigateToASDListView();
    });

    it('should be able to create asset strategy development for single equipment', async () => {
        await ASDListView.createASDForSingleEquipment();
    });

});
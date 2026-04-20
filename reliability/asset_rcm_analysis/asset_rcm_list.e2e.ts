import utils from '../../utils/utils';

describe('BTP Equipment App Functional test', () => {

    it('should navigate to functional location list view', async () => {
            await assetRCM.navigateAssetRCMListView();
        });
    
        it('should add and verify all the adapt filters', async () => {
            await utils.addAllAdaptFilter();
            await utils.resetAllAdaptFilter();
        });
    
        it('should create new advanced filter and verify', async () => {
            const createdFilterName = await utils.createNewAdvancedFilter();
            console.log(`Created filter for this run: ${createdFilterName}`);
        });
     
        it('should apply the created advanced filter and verify', async () => {
            await utils.applyAdvancedFilter();
        });
     
        it('should reset and delete the created advanced filter and verify', async () => {
            await utils.resetAdvancedFilter();
            await utils.deleteAdvancedFilter();
        });
    
        it('should verify fields in list view using setting option', async () => {
            await utils.verifyFieldsInListView();
            await utils.resetFieldsInListView();
        });
    
});

import functionalLocationListView from '../../../../PageObjectModel/BTP_Applications_Page/functionalLocation.listview.page';

describe('Functional Location test', () => {
    // --- Test ---

    it('should create a new functional location', async () => {
        await functionalLocationListView.create_functional_location();
    });

    it('should navigate to newly created functional location' , async () => {
        await functionalLocationListView.searchFunctionalLocation();
    });

    it('Verify and edit general information' , async () => {
        
    });

});

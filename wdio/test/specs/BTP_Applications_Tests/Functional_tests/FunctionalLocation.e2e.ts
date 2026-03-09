import functionalLocation from '../../../../PageObjectModel/BTP_Applications_Page/functionalLocation.page';

describe('Functional Location test', () => {
    // --- Test ---

    it('should create a new Asset Inspection successfully', async () => {
        await functionalLocation.create_functional_location();
    });

});

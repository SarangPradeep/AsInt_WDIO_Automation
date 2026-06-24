import MSPListView from '../../page_object_model/btp_applications_page/planning/maintenance_spend_planning/maintenance_spend_planning.listview.page.ts';
import { mspTestData } from '../../test_data/btp_applications/planning/maintenance_spend_planning.data.ts';

describe('BTP - Maintenance Spend Planning - Bulk Update Regression', () => {

    let abortSuite = false;

    beforeEach(function () {
        if (abortSuite) {
            console.log(`Skipping '${this.currentTest?.title}' because a prior step failed.`);
            this.skip();
        }
    });

    it('should navigate to Maintenance Spend Planning list view', async () => {
        await MSPListView.navigateToMSPListView();
    });

    mspTestData.bulkStatuses.forEach((statusLabel, idx) => {
        it(`should create MSP item #${idx + 1} and change status to '${statusLabel}'`, async function () {
            try {
                await MSPListView.createAndChangeStatusForBulkItem(statusLabel);
            } catch (err) {
                abortSuite = true;
                throw err;
            }
        });
    });

    it(`should create MSP item #${mspTestData.bulkStatuses.length + 1} via Rejected recommendation (status: 'Not Funded')`, async function () {
        try {
            await MSPListView.createNotFundedMSPFlow();
        } catch (err) {
            abortSuite = true;
            throw err;
        }
    });

    it(`should select all ${mspTestData.bulkStatuses.length + 1} MSP rows and click 'Bulk Update'`, async function () {
        await MSPListView.selectAllAndClickBulkUpdate();
    });

    it(`should fill Bulk Update dialog and Save`, async function () {
        await MSPListView.fillAndSaveBulkUpdate();
    });

    it(`should verify Bulk Update values applied to every MSP item`, async function () {
        await MSPListView.verifyBulkUpdateApplied();
    });

});

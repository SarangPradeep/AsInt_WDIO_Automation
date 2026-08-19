import { AssertionError } from 'node:assert';
import utils from '../../../../utils/utils';
import assetRcmData from "../../../../test_data/btp_applications/reliability/asset_rcm.data";
import assetRCMDetailView from './asset_rcm_analysis.detailview.page';
import { browser } from '@wdio/globals';
class assetRCMListView {

    private get assetRCMApp() { return $("//a[contains(@aria-label, 'Asset RCM Analysis')]"); }
    private get rcmIframe() { return $('iframe[data-help-id="application-rcm-manage"]'); }
    private get createBtn() { return $("//button[@title='Create']"); }
    private get descInput() { return $("//label[.//bdi[.='Description']]/following::textarea[1]"); }
    public get templateDropdown(){ return $("//label[.//bdi[.='Select Template']]/following::span[@role='button'][1]"); }
    public get templateFirstOption(){ return $("//ul[@role='listbox']/li[@role='option'][1]"); }
    private get createAsBaselineCheckbox() { return $("//bdi[.='Create as baseline']/ancestor::div[@role='checkbox']/div[1]"); }
    private get longDescriptionTxtArea() { return $("//bdi[text()='Long Description']/ancestor::div[1]/following::textarea[1]"); }
    private get saveBtn() { return $("//button[.//bdi[text()='Save']]"); }
    private get okBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }
    private get infoTab() { return $("//span[text()='Information']"); }
    public assetRCMDisplayID!: string;
    public assetRCMDesc!: string;
    public baseline: boolean = false;
    public firstRCMId!: string;
    public firstRCMDesc!: string;
    public secondRCMId!: string;
    public secondRCMDesc!: string;
    public selectedCount!: number;

    public async verifyHeader(){
        console.log("Verifying header description value...");
        const headerDescSpan = $("//bdi[.='Description']/ancestor::div[1]/following::span[1]");
        await headerDescSpan.waitForExist({ timeout: 30000 });
        await headerDescSpan.waitForDisplayed({ timeout: 30000 });
        const headerDescText = (await headerDescSpan.getText()).trim();
        console.log(`Header description text: '${headerDescText}'`);
        console.log(`Expected description (assetRCMDesc): '${this.assetRCMDesc}'`);
        await expect(headerDescText).toEqual(this.assetRCMDesc);
        console.log("Header description matches expected value");
    }

    public async navigateToAssetRCM(){
        console.log("Navigating to Asset RCM - start");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.assetRCMApp);
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Navigating to Asset RCM - end");
    }

    public async createAssetRCM(){
        console.log("Creating Asset RCM - start");
        await utils.switchToIframe(this.rcmIframe);
        await utils.clickWithWait(this.createBtn);
        await utils.waitForBusyIndicatorToDisappear();
        this.assetRCMDesc = `Automation_RCM_${Date.now()}`;
        console.log(`Generated RCM Description: ${this.assetRCMDesc}`);
        await utils.setValueWithWait(this.descInput, this.assetRCMDesc);
        await this.templateDropdown.click();
        await browser.waitUntil(async()=> await this.templateFirstOption.isDisplayed(),{timeout:20000});
        await this.templateFirstOption.click();
        await this.longDescriptionTxtArea.setValue(assetRcmData.description);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.saveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.okBtn);
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Creating Asset RCM is done");
        console.log("Navigating to detail page of RCM...");
        await this.infoTab.waitForEnabled({timeout:100000});
        console.log("Navigated to detail view page of new ly created RCM");
        const { name, id } = await utils.getEntityNameAndId();
        this.assetRCMDisplayID = id;
        await expect(name).toEqual(this.assetRCMDesc);
        console.log("Header verification done");
        console.log("Capturing all header values");
        await utils.captureHeaderDetails();
        if (!this.firstRCMDesc) {
            this.firstRCMId = id;
            this.firstRCMDesc = this.assetRCMDesc;
        } else {
            this.secondRCMId = id;
            this.secondRCMDesc = this.assetRCMDesc;
        }

    }

    public async createAssetRCMForBaseline(){
        this.baseline = true;
        console.log("Creating Asset RCM for Baseline Assessment - start");
        await utils.switchToIframe(this.rcmIframe);
        await utils.clickWithWait(this.createBtn);
        await utils.waitForBusyIndicatorToDisappear();
        this.assetRCMDesc = `Automation_Baseline_RCM_${Date.now()}`;
        console.log(`Generated RCM Description: ${this.assetRCMDesc}`);
        await utils.setValueWithWait(this.descInput, this.assetRCMDesc);
        await this.templateDropdown.click();
        await browser.waitUntil(async()=> await this.templateFirstOption.isDisplayed(),{timeout:20000});
        await this.templateFirstOption.click();
        await utils.waitForBusyIndicatorToDisappear();
        await this.createAsBaselineCheckbox.click();
        await this.longDescriptionTxtArea.setValue(assetRcmData.description);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.saveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.okBtn);
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Creating Asset RCM is done");
        console.log("Navigating to detail page of RCM...");
        await this.infoTab.waitForEnabled({timeout:100000});
        console.log("Navigated to detail view page of new ly created RCM");
        const { name, id } = await utils.getEntityNameAndId();
        this.assetRCMDisplayID = id;
        await expect(name).toEqual(this.assetRCMDesc);
        console.log("Header verification done");
        console.log("Capturing all header values");
        await utils.captureHeaderDetails();
    }

    public async verifyRCMDeletion()
    {
        console.log("Verifying deletion of RCM");

        await utils.waitForBusyIndicatorToDisappear();
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === "complete",
            { timeout: 20000 }
        );

        await browser.waitUntil(async () => {
        const frames = await $$("//iframe");
        for (const frame of frames) {
            try {
                await browser.switchFrame(frame);

                const search = await $("//input[@type='search']");
                if (await search.isExisting()) {
                    return true; // correct frame
                }
                await browser.switchFrame(null);
            } catch (e) {
                await browser.switchFrame(null);
            }
        }
        return false;
        }, { timeout: 30000 });

        const getVisibleSearch = async () => {
            const elements = await $$("//input[@type='search']");
            for (const el of elements) {
                if (await el.isDisplayed()) {
                    return el;
                }
            }
            return null;
        };

        let searchBox;
        await browser.waitUntil(async () => {
            searchBox = await getVisibleSearch();
            return searchBox !== null;
        }, { timeout: 30000 });

        if (!searchBox) {
            throw new AssertionError({ message: "Visible search box not found" });
        }
        console.log("Visible search box found, searching for deleted RCM");
        await browser.execute((el, value) => {const input = el as unknown as HTMLInputElement;
            input.value = value as string;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }, searchBox, this.assetRCMDisplayID);
        console.log(`Searched for Functional Location with Display ID: ${this.assetRCMDisplayID}`);
        const getVisibleGo = async () => {
            const buttons = await $$("//bdi[text()='Go']");
            for (const btn of buttons) {
                if (await btn.isDisplayed()) {
                    return btn;
                }
            }
            return null;
        };

        let goBtn: any;
        await browser.waitUntil(async () => {
            goBtn = await getVisibleGo();   // should return Element | null
            return goBtn !== null;
        }, {
            timeout: 20000,
            interval: 500,
            timeoutMsg: "Go button not found"
        });
        if (!goBtn) {
            throw new AssertionError({ message: "Go button not found" });
        }

        console.log("Clicking Go button to search for RCM");
        await goBtn.waitForDisplayed({ timeout: 10000 });
        await goBtn.waitForClickable({ timeout: 10000 });
        await goBtn.click();
        await browser.pause(5000);

        console.log("Waiting for table to refresh after search...");
        const noDataCell = '//td[text()="No data"]';
        const tableRows = '//table//tr[contains(@class,"sapMListTblRow")]';

        await browser.waitUntil(async () => {
            const noDataExists = await $(noDataCell).isExisting();
            const rowsExist = await $$(tableRows).length > 0;
            return noDataExists || rowsExist;
        }, {
            timeout: 20000,
            interval: 500,
            timeoutMsg: "Search results never loaded"
        });

        console.log("Checking if RCM is present in the list after deletion");
        const isFuncLocPresent = await $(noDataCell).isExisting();

        if (!isFuncLocPresent) {
            throw new AssertionError({ message: "RCM still exists after deletion" });
        } else {
            console.log("RCM deletion verified successfully");
        }
    }

    private getAssetRCMCheckboxByRCMId(rcmId: string) {
        return $(`//span[@dir="auto"][normalize-space()="${rcmId}"]/ancestor::tr[@role="row"][1]//div[@role="checkbox"]`);
    }

    public async selectAssetRCMAssessment() {
        console.log("Selecting the 1st and 2nd RCM assessment from list view");
        if (!this.firstRCMId || !this.secondRCMId) {
            throw new AssertionError({ message: "AssertionError: 1st and 2nd RCM ID values are not available to select the assessments" });
        }
        console.log(`1st RCM -> ID: ${this.firstRCMId}`);
        console.log(`2nd RCM -> ID: ${this.secondRCMId}`);
        const firstCheckbox = this.getAssetRCMCheckboxByRCMId(this.firstRCMId);
        const secondCheckbox = this.getAssetRCMCheckboxByRCMId(this.secondRCMId);
        await firstCheckbox.waitForDisplayed({ timeout: 15000, timeoutMsg: `AssertionError: 1st RCM assessment '${this.firstRCMId}' not found in list view` });
        await firstCheckbox.click();
        await secondCheckbox.waitForDisplayed({ timeout: 15000, timeoutMsg: `AssertionError: 2nd RCM assessment '${this.secondRCMId}' not found in list view` });
        await secondCheckbox.click();
        const noOfSelectedAssessmentsText = await $("//div[@data-sap-ui-fastnavgroup='true']//span[1][contains(text(),'records selected')]");
        console.log(`Number of selected assessments: ${await noOfSelectedAssessmentsText.getText()}`);
        const selectedCount = Number((await noOfSelectedAssessmentsText.getText()).match(/^(\d+)/)?.[1] ?? 0);
        expect(selectedCount).toBe(2);
        this.selectedCount = selectedCount;
        console.log("Successfully selected the 1st and 2nd RCM assessments from list view");
    }

    public async createBulkWorkflowForSelectedAssessments() {
        console.log("Creating bulk workflow for the selected assessments");
        const bulkWorkflowBtn = $$("//button[.//bdi[text()='Workflow']]");
        for (const el of await bulkWorkflowBtn) {
            if (await el.isDisplayed() && await el.isClickable()) {
                await utils.clickWithWait(el);
                break;
            }
        };
        await utils.waitForBusyIndicatorToDisappear();
        const workflowHeader = await $("//header//span[contains(text(),'Workflow Inbox')]");
        await workflowHeader.waitForDisplayed({ timeout: 15000, timeoutMsg: "AssertionError: 'Workflow' header not displayed after clicking 'Workflow'" });
        console.log("'Workflow' header is displayed");
        const createWorkflowBtn = await $("//header//button[.//bdi[normalize-space()='Create']]");
        await createWorkflowBtn.waitForClickable({ timeout: 10000, timeoutMsg: "AssertionError: 'Create' button not clickable on Workflow header" });
        await assetRCMDetailView.selectCreateWorkflowMenuOption("Bulk Approval Workflow");
        await utils.waitForBusyIndicatorToDisappear();
        const bulkWorkflowHeader = await $("//header//span[contains(text(),'Confirmation')]");
        await bulkWorkflowHeader.waitForDisplayed({ timeout: 15000, timeoutMsg: "AssertionError: 'Confirmation' header not displayed after selecting 'Bulk Approval Workflow'" });
        const messageText = await $("//header//span[contains(text(),'Confirmation')]/following::span[contains(text(),'Workflow will be created')]");
        await messageText.waitForDisplayed({ timeout: 15000, timeoutMsg: "AssertionError: Confirmation message not displayed after selecting 'Bulk Approval Workflow'" });
        console.log("Confirmation message is displayed");
        const messageTextValue = await messageText.getText();
        console.log(`Confirmation message: ${messageTextValue}`);
        const assessmentToBeSkipped = await $("//header//span[contains(text(),'Confirmation')]/following::span[contains(text(),'Assessments to be Skipped')]");
        const getAssessmentsToBeSkippedValue = await utils.getAssignedValue(await assessmentToBeSkipped.getText());
        console.log(`Assessments to be skipped: ${getAssessmentsToBeSkippedValue}`);
        const cancelBtn = await $("//header//span[contains(text(),'Confirmation')]/following::button[.//text()='Cancel']");
        if (getAssessmentsToBeSkippedValue === this.selectedCount) {
            console.log("All the selected assessments are to be skipped for workflow creation");
            const skippedRows = await $$("//span[contains(text(),'Assessments to be Skipped')]/following::tr[@role='row']");
            let printedCount = 0;
            for (const row of skippedRows) {
                const cells = await row.$$(".//td[@role='gridcell']");
                const cellCount = await cells.length;
                if (cellCount < 3) continue;
                const assessmentText = (await cells[0].getText()).trim();
                if (!assessmentText) continue;
                const descriptionText = (await cells[1].getText()).trim();
                const reasonDiv = await cells[2].$(".//div[@title]");
                const reasonText = (await reasonDiv.isExisting()) ? ((await reasonDiv.getAttribute("title")) ?? "") : (await cells[2].getText()).trim();
                printedCount++;
                console.log(`Skipped Assessment ${printedCount} -> Assessment: ${assessmentText}, Description: ${descriptionText}, Reason: ${reasonText}`);
            }
            console.log(`Total skipped assessments printed: ${printedCount}`);
            await cancelBtn.waitForClickable({ timeout: 10000, timeoutMsg: "AssertionError: 'Cancel' button not clickable on Confirmation message" });
            await cancelBtn.click();
            await utils.waitForBusyIndicatorToDisappear();
            console.log("Bulk workflow creation cancelled as all selected assessments are to be skipped");
        }
        else
        {
            console.log("Some of the selected assessments are to be skipped for workflow creation");
            const skippedRows = await $$("//span[contains(text(),'Assessments to be Skipped')]/following::tr[@role='row']");
            let printedCount = 0;
            for (const row of skippedRows) {
                const cells = await row.$$(".//td[@role='gridcell']");
                const cellCount = await cells.length;
                if (cellCount < 3) continue;
                const assessmentText = (await cells[0].getText()).trim();
                if (!assessmentText) continue;
                const descriptionText = (await cells[1].getText()).trim();
                const reasonDiv = await cells[2].$(".//div[@title]");
                const reasonText = (await reasonDiv.isExisting()) ? ((await reasonDiv.getAttribute("title")) ?? "") : (await cells[2].getText()).trim();
                printedCount++;
                console.log(`Skipped Assessment ${printedCount} -> Assessment: ${assessmentText}, Description: ${descriptionText}, Reason: ${reasonText}`);
            }
            console.log(`Total skipped assessments printed: ${printedCount}`);
            console.log("Continuing with workflow creation for the selected assessments that are not skipped");
            const continueWithRemainingBtn = await $("//header//span[contains(text(),'Confirmation')]/following::button[.//text()='Continue with Remaining']");
            await continueWithRemainingBtn.waitForClickable({ timeout: 10000, timeoutMsg: "AssertionError: 'Continue with Remaining' button not clickable on Confirmation message" });
            await continueWithRemainingBtn.click();
            await utils.waitForBusyIndicatorToDisappear();
            const rcmBulkWorkflowHeader = await $("//h5[.//text()='RCM Bulk Approval Request']");
            await rcmBulkWorkflowHeader.waitForDisplayed({ timeout: 15000, timeoutMsg: "AssertionError: 'RCM Bulk Approval Request' header not displayed after clicking 'Continue with Remaining'" });
            const bulkWorkFlowName = await $("//h5[.//text()='RCM Bulk Approval Request']//following::input[1]");
            const workflowName = await bulkWorkFlowName.getAttribute("value");
            console.log(`Workflow Name: ${workflowName}`);
            
            const noOfRCMForBulkWorkflow = await $("//h5[.//text()='RCM Bulk Approval Request']//following::label//bdi[contains(text(),'RCM')]");
            const noOfRCMForBulkWorkflowValue = await utils.getAssignedValue(await noOfRCMForBulkWorkflow.getText());
            console.log(`Number of RCMs for Bulk Workflow: ${noOfRCMForBulkWorkflowValue}`);
            await expect(Number(noOfRCMForBulkWorkflowValue)).toEqual(this.selectedCount - getAssessmentsToBeSkippedValue);
            console.log("Bulk workflow creation for the selected assessments that are not skipped is successful");

            console.log("Assessment details for the selected assessments that are not skipped:");
            const rcmRows = await $$("//h5[.//text()='RCM Bulk Approval Request']//following::tr[@role='row']");
            let printCount = 0;
            for (const row of rcmRows) {
                const cells = await row.$$(".//td[@role='gridcell']");
                const cellCount = await cells.length;
                if (cellCount < 1) continue;
                const assessmentText = (await cells[0].getText()).trim();
                if (!assessmentText) continue;
                printCount++;
                console.log(`Assessment ${printCount} -> ${assessmentText}`);
            }
            console.log(`Total assessments printed: ${printCount}`);
            const day = new Date().getDate();
            const startegyAs = await $("//h5[.//text()='RCM Bulk Approval Request']//following::label//bdi[contains(text(),'Create Strategies As')]/following::input[1]");
            const staregyAsValue = await startegyAs.getAttribute("value");
            console.log(`Create Strategies As value: ${staregyAsValue}`);
            if(day % 2 === 0) {
                console.log(`Create Strategies As value: ${staregyAsValue}`);
                if(staregyAsValue !== "Recommendation") {
                    const strategyDropdown = await $("//label//bdi[contains(text(),'Create Strategies As')]/following::span[5]");
                    await strategyDropdown.click();
                    const recommendationOption = await $("//ul//li[.//text()='Recommendation' and @aria-selected='false']");
                    await recommendationOption.waitForDisplayed({ timeout: 10000, timeoutMsg: "AssertionError: 'Recommendation' option not displayed in 'Create Strategies As' dropdown" });
                    await recommendationOption.click();
                    console.log("Selected 'Recommendation' option in 'Create Strategies As' dropdown");
                }
                await utils.selectNoOfLevelsForWorkflowApproval();
                await utils.commentsInWorkflow();
                await utils.createWorflow();
                console.log("Bulk workflow creation for the selected assessments that are not skipped is successful with 'Recommendation' strategy");
            }
            else
            {
                console.log(`Create Strategies As value: ${staregyAsValue}`);
                if(staregyAsValue !== "Notification") {
                    const strategyDropdown = await $("//label//bdi[contains(text(),'Create Strategies As')]/following::span[5]");
                    await strategyDropdown.click();
                    const notificationOption = await $("//ul//li[.//text()='Notification' and @aria-selected='false']");
                    await notificationOption.waitForDisplayed({ timeout: 10000, timeoutMsg: "AssertionError: 'Notification' option not displayed in 'Create Strategies As' dropdown" });
                    await notificationOption.click();
                    console.log("Selected 'Notification' option in 'Create Strategies As' dropdown");
                }
                await utils.selectNoOfLevelsForWorkflowApproval();
                await utils.commentsInWorkflow();
                await utils.createWorflow();
                console.log("Bulk workflow creation for the selected assessments that are not skipped is successful with 'Notification' strategy");
            }
        }
    }
}
export default new assetRCMListView();
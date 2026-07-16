import { AssertionError } from 'node:assert';
import * as assert from 'node:assert';


import utils from "utils/utils";
class RecommendationWorkbenchListView {

    private get reccWorkbenchIframe() { return $('iframe[data-help-id="application-recommendationworkbenchplus-manage"]'); }
    private get MSPApp() { return $("//a[contains(@aria-label, 'Recommendation Workbench')]"); }
    private get objectTypeDropdown() { return $("//bdi[.='Object Type']/following::span[2]"); }
    private get equipmentValueHelpBtn() { return $("//bdi[.='Equipment']/following::span[5]"); }
    private get equipmentPopupHeader() { return $("//header//span[contains(text(),'Equipment')]"); }
    private get equipmentSecondCheckbox() { return $("(//tr[@role='row'])[3]//td[@aria-colindex='1']"); }
    private get functionalLocationValueHelpBtn() { return $("//bdi[.='Functional Location']/following::span[5]"); }
    private get functionalLocationPopupHeader() { return $("//header//span[contains(text(),'Functional Location')]"); }
    private get functionalLocationSecondCheckbox() { return $("((//tr[@role='row'])[3]//td[@aria-colindex='1']//div)[1]"); }
    private get confirmBtn() { return $("//button[.//text()='Confirm']"); }
    private get typeDropdown() { return $("//bdi[.='Type']/following::span[2]"); }
    private get assessmentTypeDropdown() { return $("//bdi[.='Assessment Type']/following::span[2]"); }
    private get createBtn() { return $("//button[.//text()='Create']"); }
    private get createRecommendationHeader() { return $("//header[.//text()='Create Recommendation']"); }
    private get createReccWorkbenchBtn() { return $("//button[.//text()='Create ']"); }
    private get okBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }
    private get errorDialog() { return $("//header[.//text()='Error']"); }
    private get errorOkBtn() { return $("//header[.//text()='Error']/following::button[.//bdi[text()='OK']]"); }
    private get cancelCreateBtn() { return $("//header[.//text()='Create Recommendation']/following::button[.//bdi[text()='Cancel']]"); }
    private get reccWorkShortDescInput(){return $("//label[.//text()='Short Description']/following::input[1]");}
    private get reccWorkLongDescInput(){return $("//label[.//text()='Long Description']/following::textarea[1]");}
    private get convertMSPDialog() { return $("//div[@role='dialog'][.//*[normalize-space()='Convert To MSP Item']]"); }
    private get convertMSPShortDescInput() { return $("//div[@role='dialog'][.//*[normalize-space()='Convert To MSP Item']]//label[.//text()='Short Description']/following::input[1]"); }
    private get convertMSPLongDescInput() { return $("//div[@role='dialog'][.//*[normalize-space()='Convert To MSP Item']]//label[.//text()='Long Description']/following::textarea[1]"); }
    private get convertBtn() { return $("//div[@role='dialog'][.//*[normalize-space()='Convert To MSP Item']]//button[.//bdi[normalize-space()='Convert']]"); }
    private get convertMSPCancelBtn() { return $("//div[@role='dialog'][.//*[normalize-space()='Convert To MSP Item']]//button[.//bdi[normalize-space()='Cancel']]"); }

    public ReccWorkDisplayID!: string;
    public ReccWorkShortDesc!: string;
    public ReccWorkLongDesc!: string;
    public MSPItemShortDesc!: string;
    public MSPItemLongDesc!: string;

    public async navigateRecommendationWorkbenchListView(){
        console.log("Navigating to Recommendation Workbench - start");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.MSPApp);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(12000);
        console.log("Navigating to Recommendation Workbench  - end");
    }

    public async createReccWorkbench()
    {
        console.log("Creating new Recommendation workbench...");
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000);

        let lastError: string | undefined;
        for (let attempt = 1; attempt <= 2; attempt++) {
            console.log(`Create Recommendation attempt #${attempt}`);
            await utils.clickWithWait(this.createBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            await browser.keys(["Enter"]);
            await this.createRecommendationHeader.waitForDisplayed({ timeout: 10000 });
            await this.fillCreateRecommendationForm();
            await utils.clickWithWait(this.createReccWorkbenchBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);

            // Check for the error popup ("Failed to create APM recommendation.")
            if (await this.errorDialog.isDisplayed().catch(() => false)) {
                lastError = "Create Recommendation returned 'Failed to create APM recommendation.' error popup";
                console.log(`${lastError} — attempt #${attempt}`);
                // Click OK on the error popup
                if (await this.errorOkBtn.isDisplayed().catch(() => false)) {
                    await utils.clickWithWait(this.errorOkBtn);
                    await utils.waitForBusyIndicatorToDisappear();
                    await browser.pause(1000);
                }
                // Cancel the open Create Recommendation dialog before retrying
                if (await this.cancelCreateBtn.isDisplayed().catch(() => false)) {
                    await utils.clickWithWait(this.cancelCreateBtn);
                    await utils.waitForBusyIndicatorToDisappear();
                    await browser.pause(1500);
                }
                if (attempt === 2) {
                    throw new AssertionError({ message: 
                        `Recommendation creation failed twice. Last error: ${lastError}. Aborting recommendation_workbench spec.`
                     });
                }
                console.log("Retrying recommendation creation...");
                continue;
            }

            // Success path — handle optional success OK
            if (await this.okBtn.isDisplayed().catch(() => false)) {
                await this.okBtn.click();
            }
            console.log("Recommendation workbench created successfully.");
            break;
        }

        await this.searchNewlyCreated(this.ReccWorkShortDesc);
        console.log("Created Recommendation Items");
        console.log("Navigating to detail view page of newly created Recommendation item....");
        const el = await $('(//tr[@role="row"]//span[@title="Navigation"])[1]');
        await utils.clickWithWait(el);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(10000);
        console.log("Navigated to detail view page of newly created Recommendation item");
    }

    private async fillCreateRecommendationForm() {
        const currentDay = new Date().getDay();
        if ([1, 2, 3, 4].includes(currentDay)) {
            await utils.clickWithWait(this.objectTypeDropdown);
            await browser.keys(["ArrowDown", "Enter"]);
            await utils.clickWithWait(this.equipmentValueHelpBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            await this.equipmentPopupHeader.waitForDisplayed();
            await utils.clickWithWait(this.equipmentSecondCheckbox);
            await utils.clickWithWait(this.confirmBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        } else {
            await utils.clickWithWait(this.objectTypeDropdown);
            await browser.keys(["ArrowDown", "ArrowDown", "Enter"]);
            await utils.clickWithWait(this.functionalLocationValueHelpBtn);
            await this.functionalLocationPopupHeader.waitForDisplayed();
            await browser.pause(10000);
            await utils.clickWithWait(this.functionalLocationSecondCheckbox);
            await utils.clickWithWait(this.confirmBtn);
        }
        await utils.waitForBusyIndicatorToDisappear();
        this.ReccWorkShortDesc = `Automation Recommendation ${Date.now()}`;
        this.ReccWorkLongDesc = `Automation Recommendation Long Desc ${Date.now()}`;
        await this.reccWorkShortDescInput.setValue(this.ReccWorkShortDesc);
        await this.reccWorkLongDescInput.setValue(this.ReccWorkLongDesc);
        await utils.clickWithWait(this.typeDropdown);
        await browser.keys(["ArrowDown", "Enter"]);
        await utils.clickWithWait(this.assessmentTypeDropdown);
        await browser.keys(["ArrowDown", "ArrowDown", "Enter"]);
    }

    public async searchNewlyCreated(shortDesc:string)
    {
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
                    return true; 
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
        console.log("Visible search box found, searching for deleted Functional Location");
        await browser.execute((el, value) => {
            const input = el as unknown as HTMLInputElement;
            input.value = value as string;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }, searchBox, shortDesc);
        console.log(`Searched for Recommendation with short desc: ${shortDesc}`);
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

        console.log("Clicking Go button to search for MSP");
        await goBtn.waitForDisplayed({ timeout: 10000 });
        await goBtn.waitForClickable({ timeout: 10000 });
        await goBtn.click();
        await browser.pause(5000);
    }

    public async searchAndSelectRecommendation(displayId: string){
        console.log(`Searching and selecting recommendation: ${displayId}`);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(2000);
        await this.searchNewlyCreated(displayId);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        const rowCheckbox = await $(`(//tr[@role='row' and .//span[normalize-space()='${displayId}']]//td[@aria-colindex='1']//div[@role='checkbox'])[1]`);
        await utils.clickWithWait(rowCheckbox);
        await browser.pause(1000);
        console.log(`Recommendation '${displayId}' selected`);
    }

    public async createMSPItemFromRecommendation(){
        console.log("Opening Create dropdown and selecting 'To MSP Item'...");
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Create']]`));
        await browser.pause(1500);
        await utils.clickPopupMenuItem("To MSP Item");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        console.log("'To MSP Item' option selected");
    }

    public async convertToMSPItem(){
        console.log("Filling 'Convert To MSP Item' dialog...");
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await this.convertMSPDialog.waitForDisplayed({ timeout: 15000 });
        await browser.pause(1500);

        this.MSPItemShortDesc = `Automation MSP Item ${Date.now()}`;
        this.MSPItemLongDesc = `Automation MSP Item Long Desc ${Date.now()}`;

        const shortInput = await this.convertMSPShortDescInput;
        await shortInput.waitForDisplayed({ timeout: 10000 });
        await shortInput.click();
        await browser.keys(["Control", "a"]);
        await browser.keys(["Delete"]);
        await shortInput.setValue(this.MSPItemShortDesc);
        await browser.pause(500);

        const longInput = await this.convertMSPLongDescInput;
        await longInput.waitForDisplayed({ timeout: 10000 });
        await longInput.click();
        await browser.keys(["Control", "a"]);
        await browser.keys(["Delete"]);
        await longInput.setValue(this.MSPItemLongDesc);
        await browser.pause(500);

        console.log(`MSP Item Short Desc: ${this.MSPItemShortDesc}`);
        console.log(`MSP Item Long Desc: ${this.MSPItemLongDesc}`);

        await utils.clickWithWait(this.convertBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);

        if (await this.errorDialog.isDisplayed().catch(() => false)) {
            if (await this.errorOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.errorOkBtn);
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(1000);
            }
            throw new AssertionError({ message: "Unable to convert to MSP" });
        }

        if (await this.okBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            console.log("MSP Item created successfully");
            return;
        }

        console.log("Convert To MSP Item: neither Success nor Error dialog was displayed \u2014 attempting to cancel Convert dialog before failing.");
        try {
            if (await this.convertMSPCancelBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.convertMSPCancelBtn);
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(1500);
                console.log("Convert To MSP Item dialog cancelled.");
            } else {
                console.log("Convert To MSP Item Cancel button not displayed; skipping cancel.");
            }
        } catch (e) {
            console.log(`Cancel of Convert To MSP Item dialog failed: ${(e as Error).message}`);
        }
        throw new AssertionError({ message: "Convert To MSP Item: neither Success nor Error message popup was displayed" });
    }

    public async verifyDeletionOfRecommendationWorkbench(){
        console.log("Verifying deletion of Recommendation workbench...");
        await this.searchNewlyCreated(this.ReccWorkDisplayID);
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

        console.log("Checking if Recommendation is present in the list after deletion");
        const isFuncLocPresent = await $(noDataCell).isExisting();

        if (!isFuncLocPresent) {
            throw new AssertionError({ message: "Recommendation still exists after deletion" });
        } else {
            console.log("Recommendation deletion verified successfully");
        }
    }


}export default new RecommendationWorkbenchListView();
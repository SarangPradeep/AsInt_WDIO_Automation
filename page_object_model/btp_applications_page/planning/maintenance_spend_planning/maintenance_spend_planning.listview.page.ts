import { AssertionError } from 'node:assert';
import utils from "utils/utils";
import MSPDetailView from "./maintenance_spend_planning.detailview.page";
import recommendationWorkbenchListView from "../recommendation_workbench/recommendation_workbench.listview.page";
import recommendationWorkbenchDetailView from "../recommendation_workbench/recommendation_workbench.detailview.page";
import { mspTestData } from "../../../../test_data/btp_applications/planning/maintenance_spend_planning.data";

class MSPListView {

    private get MSPApp() { return $("//a[contains(@aria-label, 'Maintenance Spend Planning')]"); }
    private get mspIframe() { return $('iframe[data-help-id="application-msp-manage"]'); }
    private get createBtn() { return $("//button//bdi[.//text()='Create']"); }
    private get createEventBtn() { return $("//button[@aria-label='Create']"); }
    private get openSelectRecommendation() { return $("//bdi[.='Select Recommendation']/following::span[5]"); }
    private get selectRecommendationPopup() { return $("//h1[.='Select Recommendation(s)']"); }
    private get firstRecommendationRow() { return $("(//tr[@role='row'])[2]"); }
    private get nextBtn() { return $("//button[.//text()='Next']"); }
    private get mspItemHeader() { return $("//h1[.='Create MSP']"); }
    private get shortDescInput() { return $("//bdi[.='Short Description']/following::input[1]"); }
    private get longDescInput() { return $("//bdi[.='Long Description']/following::textarea[1]"); }
    private get createMSPBtn() { return $("//header[.//text()='Create MSP']/following::footer[1]//button[.//text()='Create']"); }
    private get createRecommendation() { return $("//section//li[.='Create Recommendation']//div//div"); }
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
    private get okBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }
    private get mspEventsTab() { return $("(//section//li[@role='option' and @aria-posinset='2'])[1]");}
    private get createMSPEventHeader(){return $("//header[.//text()='Create MSP Event']");}
    private get mspeShortDescInput(){return $("//label[.//text()='Short Description']/following::input[1]");}
    private get mspeStartDateInput(){return $("//label[.//text()='Start Date']/following::input[1]");}
    private get mspeEndDateInput(){return $("//label[.//text()='End Date']/following::input[1]");}
    private get mspeLongDescInput(){return $("//label[.//text()='Long Description']/following::textarea[1]");}
    private get createMSPEventBtn(){return $("//button//bdi[text()='Create']");}
    private get mspItemsValueBtn(){return $("//label[.//text()='MSP Items']/following::span[4]");}
    private get importMSPItemHeader(){return $("//header[.//text()='Import MSP Item']");}
    private get goBtn(){return $("(//button[.//text()='Go'])[1]");}
    private get secondMSPItemCheckbox(){return $("((//tr[@role='row'])[3]//td[@aria-colindex='1']//div)[1]");}
    private get importBtn(){return $("//footer//button[.//text()='Import']");}
    private get sectionMoreBtn() { return $("//section//button[@aria-label='Additional Options']//span[@role='presentation']"); }
    private get errorDialog() { return $("//header[.//text()='Error']"); }
    private get errorOkBtn() { return $("//header[.//text()='Error']/following::button[.//bdi[text()='OK']]"); }
    private get cancelCreateMspBtn() { return $("//header[.//text()='Create MSP']/following::button[.//bdi[text()='Cancel']]"); }


    public MSPDisplayID!: string;
    public MSPShortDesc!: string;
    public MSPLongDesc!: string;
    public MSPEDisplayID!: string;
    public MSPEShortDesc!: string;
    public MSPELongDesc!: string;


    public async navigateToMSPListView(){
        console.log("Navigating to Maintenance spend planning - start");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.MSPApp);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(10000);
        console.log("Navigating to Maintenance spend planning  - end");
    }

    private getRandomTxt(prefix:string){
        return `${prefix} ${Date.now()}`;
    }

    public async createMSPItems(forceInlineRecc: boolean = false){
        console.log(`Creating MSP Items.... (forceInlineRecc=${forceInlineRecc})`);
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(4000);
        if(await this.sectionMoreBtn.isExisting()){
            await this.sectionMoreBtn.waitForDisplayed({timeout:10000});
            await this.sectionMoreBtn.scrollIntoView();
            await this.sectionMoreBtn.waitForClickable({timeout:10000});
            await utils.clickWithWait(this.sectionMoreBtn);
            await browser.pause(1000);
        }

        let lastError: string | undefined;
        for (let attempt = 1; attempt <= 2; attempt++) {
            console.log(`Create MSP attempt #${attempt}`);
            await utils.clickWithWait(this.createBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.keys("Enter");
            const createMSPBox = await $("//header[.//text()='Create MSP']");
            await createMSPBox.waitForDisplayed();

            await this.fillCreateMspForm(forceInlineRecc);

            await browser.pause(2000);
            const createMspHeader = await $("//header[.//text()='Create MSP']");
            let dialogClosed = false;
            for (let clickAttempt = 1; clickAttempt <= 3; clickAttempt++) {
                console.log(`Clicking footer Create button (attempt #${clickAttempt})`);
                try {
                    await this.createMSPBtn.waitForDisplayed({ timeout: 10000 });
                    await this.createMSPBtn.scrollIntoView();
                    await this.createMSPBtn.waitForClickable({ timeout: 10000 });
                    await this.createMSPBtn.click();
                } catch (e) {
                    void e;
                    console.log(`Footer Create click threw on attempt #${clickAttempt}, will re-check dialog state`);
                }
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(3000);

                if (await this.errorDialog.isDisplayed().catch(() => false)) {
                    break;
                }

                if (!(await createMspHeader.isDisplayed().catch(() => false))) {
                    dialogClosed = true;
                    break;
                }
                console.log("Create MSP dialog still displayed after click — retrying");
            }
            if (!dialogClosed && !(await this.errorDialog.isDisplayed().catch(() => false))) {
                throw new AssertionError({ message: "Create MSP dialog did not close after clicking footer Create button" });
            }
            await browser.pause(1000);

            // Detect the "Failed to Create Recommendation, Please try again later" error popup
            if (await this.errorDialog.isDisplayed().catch(() => false)) {
                lastError = "Create MSP returned 'Failed to Create Recommendation, Please try again later' error popup";
                console.error(`\x1b[31m${lastError} — attempt #${attempt}\x1b[0m`);
                if (await this.errorOkBtn.isDisplayed().catch(() => false)) {
                    await utils.clickWithWait(this.errorOkBtn);
                    await utils.waitForBusyIndicatorToDisappear();
                    await browser.pause(1000);
                }
                if (await this.cancelCreateMspBtn.isDisplayed().catch(() => false)) {
                    await utils.clickWithWait(this.cancelCreateMspBtn);
                    await utils.waitForBusyIndicatorToDisappear();
                    await browser.pause(1500);
                }
                if (attempt === 2) {
                    throw new AssertionError({ message: 
                        `MSP creation failed twice. Last error: ${lastError}. Aborting maintenance_spend_planning_item spec.`
                     });
                }
                console.log("Retrying MSP creation...");
                continue;
            }

            // Success path
            await utils.clickSuccessOkButton();
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            console.log("MSP item created successfully");
            break;
        }

        await this.searchNewlyCreated(this.MSPShortDesc);
        console.log("Created MSP Items");
        console.log("Navigating to detail view page of newly created MSP item....");
        const el = await $('(//tr[@role="row"]//span[@title="Navigation"])[1]');
        await utils.clickWithWait(el);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(10000);
        console.log("Navigated to detail view page of newly created MSP item");
    }

    private async fillCreateMspForm(forceInlineRecc: boolean = false) {
        const dayOfMonth = new Date().getDate();
        if (!forceInlineRecc && dayOfMonth % 2 === 0) {
            console.log("Selecting recommendation...");
            await browser.pause(4000);
            await utils.clickWithWait(this.openSelectRecommendation);
            await this.selectRecommendationPopup.waitForDisplayed();
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(4000);
            await utils.clickWithWait(this.firstRecommendationRow);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            await utils.clickWithWait(this.nextBtn);
            await this.mspItemHeader.waitForDisplayed({timeout:10000});
            this.MSPShortDesc = `${this.getRandomTxt("Automation MSP item ")} ${Math.floor(Math.random()*100000)}`;
            this.MSPLongDesc = `${this.getRandomTxt("Automation MSP item long desc")} ${Math.floor(Math.random()*100000)}`;
            await this.shortDescInput.setValue(this.MSPShortDesc);
            await this.longDescInput.setValue(this.MSPLongDesc);
        }
        else{
            console.log("Creating recommendation...");
            await browser.pause(4000);
            await utils.clickWithWait(this.createRecommendation);
            await browser.pause(2000);
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
            this.MSPShortDesc = `Automation MSP ${Date.now()}`;
            this.MSPLongDesc = `Automation MSP Long Desc ${Date.now()}`;
            await this.shortDescInput.setValue(this.MSPShortDesc);
            await this.longDescInput.setValue(this.MSPLongDesc);
            await utils.clickWithWait(this.typeDropdown);
            await browser.keys(["ArrowDown", "Enter"]);
            await utils.clickWithWait(this.assessmentTypeDropdown);
            await browser.keys(["ArrowDown", "ArrowDown", "Enter"]);
            await utils.clickWithWait(this.nextBtn);
        }
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
        console.log(`Searched for MSP with short desc: ${shortDesc}`);
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

    public async verifyMSPItemExists(shortDesc: string){
        console.log(`Verifying MSP Item exists in list: ${shortDesc}`);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);
        await this.searchNewlyCreated(shortDesc);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);

        const noDataCell = '//td[normalize-space()="No data"]';
        const matchingRow = `//tr[@role='row' and .//span[normalize-space()='${shortDesc}']]`;

        await browser.waitUntil(async () => {
            const noData = await $(noDataCell).isExisting();
            const rowFound = (await $$(matchingRow).length) > 0;
            return noData || rowFound;
        }, {
            timeout: 30000,
            interval: 500,
            timeoutMsg: "Search results never loaded for MSP Item"
        });

        const rowFound = (await $$(matchingRow).length) > 0;
        if (!rowFound) {
            throw new AssertionError({ message: `MSP Item '${shortDesc}' not found in the list view after search` });
        }
        console.log(`MSP Item '${shortDesc}' found in the list view`);
    }

    public async createMSPEvent()
    {
        console.log("Navigating to MSP Event section...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.mspEventsTab);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.createEventBtn);
        await this.createMSPEventHeader.waitForDisplayed();
        this.MSPEShortDesc=`Automation MSP Event ${Date.now()}`;
        this.MSPELongDesc=`Automation MSP Event Long Desc ${Date.now()}`;
        await this.mspeShortDescInput.setValue(this.MSPEShortDesc);
        await this.mspeStartDateInput.setValue(utils.formatDate(0));
        await this.mspeEndDateInput.setValue(utils.formatDatePlus(10));
        await this.mspeLongDescInput.setValue(this.MSPELongDesc);
        await utils.clickWithWait(this.mspItemsValueBtn);
        await this.importMSPItemHeader.waitForDisplayed();
        await utils.clickWithWait(this.goBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.secondMSPItemCheckbox);
        await utils.clickWithWait(this.importBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.createMSPEventBtn);
        await browser.pause(2000);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await this.searchNewlyCreated(this.MSPEShortDesc);
        console.log("Created MSP Event");
        console.log("Navigating to detail view page of newly created MSP Event....");
        const el = await $('(//tr[@role="row"]//span[@title="Navigation"])[21]');
        await utils.clickWithWait(el);
        await browser.pause(10000);
        console.log("Navigated to detail view page of newly created MSP Event");
    }

    public async createAndChangeStatusForBulkItem(statusLabel: string): Promise<void> {
        console.log(`\n=== Bulk MSP iteration for status '${statusLabel}' ===`);
        await this.createMSPItems(true);
        await MSPDetailView.captureMSPId();
        await MSPDetailView.captureBulkSnapshot(statusLabel);
        await MSPDetailView.changeStatusToLabel(statusLabel);
        await utils.navigateBack();
        console.log(`=== Completed bulk MSP iteration for status '${statusLabel}' ===\n`);
    }

    public async bulkCreateAndUpdateMSPItems(statuses: readonly string[] = mspTestData.bulkStatuses): Promise<void> {
        console.log(`Starting bulk create & status update for ${statuses.length} MSP items`);
        for (let i = 0; i < statuses.length; i++) {
            const label = statuses[i];
            console.log(`-- Bulk iteration ${i + 1}/${statuses.length}: '${label}' --`);
            await this.createAndChangeStatusForBulkItem(label);
        }
        console.log("Bulk create & update completed for all MSP items");
        console.log("Collected snapshots:", JSON.stringify(MSPDetailView.bulkSnapshots, null, 2));
    }

    public async createMSPItemUsingSpecificRecommendation(reccShortDescOrId: string): Promise<void> {
        console.log(`Creating MSP using specific recommendation: ${reccShortDescOrId}`);
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(4000);
        if (await this.sectionMoreBtn.isExisting()) {
            await this.sectionMoreBtn.waitForDisplayed({ timeout: 10000 });
            await this.sectionMoreBtn.scrollIntoView();
            await this.sectionMoreBtn.waitForClickable({ timeout: 10000 });
            await utils.clickWithWait(this.sectionMoreBtn);
            await browser.pause(1000);
        }

        await utils.clickWithWait(this.createBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.keys("Enter");
        const createMSPBox = await $("//header[.//text()='Create MSP']");
        await createMSPBox.waitForDisplayed();

        await browser.pause(3000);
        await utils.clickWithWait(this.openSelectRecommendation);
        await this.selectRecommendationPopup.waitForDisplayed();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);

        const popupSearch = await $("//header[.//text()='Select Recommendation(s)']/following::input[@type='search'][1]");
        if (await popupSearch.isExisting().catch(() => false)) {
            await utils.setValueWithWait(popupSearch, reccShortDescOrId);
            await browser.keys("Enter");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(3000);
        } else {
            console.log("Search box in Select Recommendation popup not found; proceeding with default order");
        }

        const matchingRow = await $(`//tr[@role='row' and .//span[contains(normalize-space(),'${reccShortDescOrId}')]]`);
        if (await matchingRow.isExisting().catch(() => false)) {
            const checkbox = await matchingRow.$(".//td[@aria-colindex='1']");
            await utils.clickWithWait(checkbox);
        } else {
            console.log(`Matching row for '${reccShortDescOrId}' not found in popup; clicking first row as fallback`);
            await utils.clickWithWait(this.firstRecommendationRow);
        }
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait(this.nextBtn);
        await this.mspItemHeader.waitForDisplayed({ timeout: 10000 });

        this.MSPShortDesc = `${this.getRandomTxt("Automation MSP NotFunded ")} ${Math.floor(Math.random() * 100000)}`;
        this.MSPLongDesc = `${this.getRandomTxt("Automation MSP NotFunded long desc")} ${Math.floor(Math.random() * 100000)}`;
        await this.shortDescInput.setValue(this.MSPShortDesc);
        await this.longDescInput.setValue(this.MSPLongDesc);

        await browser.pause(2000);
        await utils.clickWithWait(this.createMSPBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(4000);
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        await this.searchNewlyCreated(this.MSPShortDesc);
        console.log("Navigating to detail view page of newly created Not-Funded MSP item....");
        const el = await $('(//tr[@role="row"]//span[@title="Navigation"])[1]');
        await utils.clickWithWait(el);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(10000);
        console.log("Navigated to detail view page of Not-Funded MSP item");
    }

    public async createNotFundedMSPFlow(): Promise<void> {
        console.log("\n=== Not Funded flow: build rejected recommendation, then MSP from it ===");
        await utils.navigateToHomePage();

        await recommendationWorkbenchListView.navigateRecommendationWorkbenchListView();
        await recommendationWorkbenchListView.createReccWorkbench();
        await recommendationWorkbenchDetailView.captureReccWorkbenchId();
        await recommendationWorkbenchDetailView.changeStatusToRejected();
        const rejectedReccId = recommendationWorkbenchListView.ReccWorkDisplayID;
        const rejectedReccShortDesc = recommendationWorkbenchListView.ReccWorkShortDesc;
        console.log(`Rejected recommendation created: ${rejectedReccShortDesc} (${rejectedReccId})`);

        await utils.navigateToHomePage();
        await this.navigateToMSPListView();

        await this.createMSPItemUsingSpecificRecommendation(rejectedReccShortDesc);
        await MSPDetailView.captureMSPId();
        await MSPDetailView.captureBulkSnapshot("Not Funded");
        await utils.navigateBack();
        console.log("=== Not Funded flow completed ===\n");
    }

    public async selectMSPRowByDisplayId(displayId: string): Promise<void> {
        console.log(`Selecting MSP row by displayId: ${displayId}`);
        const rowXPath = `//tr[@role='row' and .//span[normalize-space()='${displayId}']]`;
        const checkboxXPath = `${rowXPath}//div[@role='checkbox']`;

        const row = await $(rowXPath);
        await row.waitForExist({ timeout: 20000, timeoutMsg: `MSP row with id '${displayId}' not found` });
        await row.scrollIntoView({ block: "center" });
        await browser.pause(500);

        let checkbox = await $(checkboxXPath);
        if (!(await checkbox.isExisting().catch(() => false))) {
            checkbox = await $(`${rowXPath}//td[@aria-colindex='1']`);
        }
        await checkbox.waitForClickable({ timeout: 10000 });
        await utils.clickWithWait(checkbox);
        await browser.pause(500);

        const ariaSelected = await row.getAttribute("aria-selected").catch(() => "");
        if (ariaSelected !== "true") {
            console.log(`Row '${displayId}' aria-selected='${ariaSelected}', retrying click`);
            await utils.clickWithWait(checkbox);
            await browser.pause(500);
        }
        console.log(`Selected MSP row '${displayId}'`);
    }

    public async selectAllBulkSnapshotRows(): Promise<void> {
        console.log("Selecting all MSP rows captured in bulkSnapshots...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);

        const snapshots = MSPDetailView.bulkSnapshots;
        if (!snapshots.length) {
            throw new AssertionError({ message: "No bulkSnapshots captured; nothing to select" });
        }

        for (const snap of snapshots) {
            if (!snap.displayId) {
                console.log(`Skipping snapshot with empty displayId (shortDesc='${snap.shortDesc}')`);
                continue;
            }
            await this.searchNewlyCreated(snap.displayId);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            await this.selectMSPRowByDisplayId(snap.displayId);
        }
        console.log(`Selected ${snapshots.length} MSP row(s)`);
    }

    public async clickBulkUpdate(): Promise<void> {
        console.log("Clicking 'Bulk Update' button...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(1500);
        const bulkUpdateBtn = await $("//button[.//bdi[normalize-space()='Bulk Update'] or .//text()='Bulk Update']");
        await bulkUpdateBtn.waitForDisplayed({ timeout: 15000 });
        await bulkUpdateBtn.waitForClickable({ timeout: 15000 });
        await utils.clickWithWait(bulkUpdateBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        console.log("'Bulk Update' clicked");
    }

    public async selectAllAndClickBulkUpdate(): Promise<void> {
        await this.selectAllBulkSnapshotRows();
        await this.clickBulkUpdate();
    }

    private async openBulkDropdownByLabel(label: string): Promise<void> {
        const input = await $(`(//label[normalize-space()='${label}:' or normalize-space()='${label}']/following::input)[1]`);
        await input.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(input);
        await browser.pause(400);
        const opened = await browser.execute(() => {
            const lists = Array.from(document.querySelectorAll<HTMLElement>(
                "ul[role='listbox'], div[role='listbox'], .sapMSelectList, .sapMPopover"
            ));
            return lists.some(l => {
                const r = l.getBoundingClientRect();
                return r.width > 0 && r.height > 0;
            });
        });
        if (!opened) {
            await browser.keys(["F4"]);
            await browser.pause(500);
        }
    }

    private async pickFirstSafeSubStage(): Promise<string> {
        const picked = await browser.execute(() => {
            const items = Array.from(document.querySelectorAll<HTMLElement>(
                "li[role='option'], div[role='option'], li.sapMSelectListItem, li[role='menuitem']"
            ));
            for (const el of items) {
                const t = (el.innerText || el.textContent || "").trim();
                const r = el.getBoundingClientRect();
                if (r.width > 0 && r.height > 0 && t && t.toLowerCase() !== "delete") {
                    el.click();
                    return t;
                }
            }
            return "";
        }) as string;
        if (!picked) {
            throw new AssertionError({ message: "No safe Process Sub-Stage option found" });
        }
        return picked;
    }

    public async fillBulkUpdateDialog(): Promise<void> {
        console.log("Filling Bulk Update dialog...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);

        const stages = mspTestData.bulkUpdate.processStages;
        const regions = mspTestData.bulkUpdate.regionsOnChart;
        const deferrals = mspTestData.bulkUpdate.deferralFollowups;

        const stage = stages[Math.floor(Math.random() * stages.length)];
        const region = regions[Math.floor(Math.random() * regions.length)];
        const deferral = deferrals[Math.floor(Math.random() * deferrals.length)];
        const planningYear = `${2030 + Math.floor(Math.random() * 6)}`;
        const exchangeRateUSD = `${Math.floor(Math.random() * 99) + 1}`;

        const pyInput = await $(`(//label[normalize-space()='Planning Year:' or normalize-space()='Planning Year']/following::input)[1]`);
        await pyInput.waitForDisplayed({ timeout: 15000 });
        await utils.setValueWithWait(pyInput, planningYear);
        await browser.keys(["Tab"]);
        await browser.pause(400);

        const erInput = await $(`(//label[normalize-space()='Exchange Rate to USD:' or normalize-space()='Exchange Rate to USD']/following::input)[1]`);
        await utils.setValueWithWait(erInput, exchangeRateUSD);
        await browser.keys(["Tab"]);
        await browser.pause(400);

        await this.openBulkDropdownByLabel("Region On Chart");
        await utils.clickPopupMenuItem(region);
        await browser.pause(500);

        await this.openBulkDropdownByLabel("Process Stage");
        await utils.clickPopupMenuItem(stage);
        await browser.pause(1000);

        await this.openBulkDropdownByLabel("Process Sub-Stage");
        const processSubStage = await this.pickFirstSafeSubStage();
        await browser.pause(500);

        await this.openBulkDropdownByLabel("Deferral Follow-up");
        await utils.clickPopupMenuItem(deferral);
        await browser.pause(500);

        MSPDetailView.bulkUpdateValues = {
            planningYear,
            exchangeRateUSD,
            regionOnChart: region,
            processStage: stage,
            processSubStage,
            deferralFollowup: deferral
        };
        console.log("Bulk Update values:", JSON.stringify(MSPDetailView.bulkUpdateValues));
    }

    public async saveBulkUpdate(): Promise<void> {
        console.log("Saving Bulk Update...");
        await utils.switchToIframe(this.mspIframe);
        const saveBtn = await $("//footer//button[.//bdi[normalize-space()='Save']]");
        await saveBtn.waitForDisplayed({ timeout: 15000 });
        await saveBtn.waitForClickable({ timeout: 15000 });
        await utils.clickWithWait(saveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        const okBtn = await $("//header[.//text()='Success']/following::button[.//bdi[normalize-space()='OK'] or .//text()='OK']");
        if (await okBtn.isDisplayed().catch(() => false)) {
            console.log("Success OK appeared → clicking");
            await utils.clickWithWait(okBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1500);
        } else {
            console.log("No Success OK appeared after Save (dialog may have closed directly)");
        }
        console.log("Bulk Update saved");
    }

    public async fillAndSaveBulkUpdate(): Promise<void> {
        await this.fillBulkUpdateDialog();
        await this.saveBulkUpdate();
    }

    public async verifyBulkUpdateApplied(): Promise<void> {
        console.log("\n=== Verifying Bulk Update applied to each MSP item ===");
        const expected = MSPDetailView.bulkUpdateValues;
        if (!expected) {
            throw new AssertionError({ message: "No bulkUpdateValues stored; run fillAndSaveBulkUpdate first" });
        }
        const snapshots = MSPDetailView.bulkSnapshots;
        if (!snapshots.length) {
            throw new AssertionError({ message: "No bulkSnapshots captured; nothing to verify" });
        }

        const norm = (s: string) => (s || "").trim().toLowerCase();
        const fieldList: Array<keyof typeof expected> = [
            "planningYear",
            "exchangeRateUSD",
            "regionOnChart",
            "processStage",
            "processSubStage",
            "deferralFollowup"
        ];

        type Mismatch = { displayId: string; shortDesc: string; field: string; expected: string; actual: string };
        const mismatches: Mismatch[] = [];

        for (const snap of snapshots) {
            if (!snap.displayId) {
                console.log(`Skipping snapshot with empty displayId (shortDesc='${snap.shortDesc}')`);
                continue;
            }
            console.log(`\n--- Verifying MSP ${snap.displayId} (${snap.shortDesc}) ---`);
            await utils.switchToIframe(this.mspIframe);
            await browser.pause(1500);
            await this.searchNewlyCreated(snap.displayId);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);

            await utils.switchToIframe(this.mspIframe);
            const navLink = await $('(//tr[@role="row"]//span[@title="Navigation"])[1]');
            await navLink.waitForDisplayed({ timeout: 20000 });
            await utils.clickWithWait(navLink);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(6000);

            const actual = await MSPDetailView.readBulkUpdatedFields();

            for (const f of fieldList) {
                const exp = norm(expected[f]);
                const act = norm(actual[f]);
                const matches = exp === act || (exp.length > 0 && act.includes(exp)) || (act.length > 0 && exp.includes(act));
                if (!matches) {
                    mismatches.push({
                        displayId: snap.displayId,
                        shortDesc: snap.shortDesc,
                        field: f,
                        expected: expected[f],
                        actual: actual[f]
                    });
                    console.log(`  [MISMATCH] ${f}: expected='${expected[f]}' actual='${actual[f]}'`);
                } else {
                    console.log(`  [OK]       ${f}: '${actual[f]}'`);
                }
            }

            await utils.navigateBack();
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(3000);
        }

        console.log("\n========== BULK UPDATE VERIFICATION REPORT ==========");
        if (mismatches.length === 0) {
            console.log(`\x1b[32mUpdate for all ${snapshots.length} MSP item(s) verified successfully.\x1b[0m`);
        } else {
            console.log(`\x1b[31m${mismatches.length} mismatch(es) detected:\x1b[0m`);
            for (const m of mismatches) {
                console.log(
                    `\x1b[31m  - Not updated for ${m.displayId} (${m.shortDesc}): ` +
                    `field '${m.field}' expected='${m.expected}' actual='${m.actual}'\x1b[0m`
                );
            }
            throw new AssertionError({ message: 
                `Bulk update verification failed: ${mismatches.length} mismatch(es). ` +
                mismatches.map(m => `${m.displayId}/${m.field}`).join(", ")
             });
        }
        console.log("=====================================================\n");
    }
}
export default new MSPListView();
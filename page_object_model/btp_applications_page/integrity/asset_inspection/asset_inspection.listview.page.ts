import utils from "utils/utils";
import CMLListView from "../cmls/cmls.listview.page";

class AssetInspectionListView {

    private get assetInspectionApp() { return $("//a[contains(@aria-label, 'Asset Inspection')]"); }
    private get assetInspectionIframe() { return $('iframe[data-help-id="application-idms-manage"]'); }
    private get newAssessmentBtn() { return $("//button[@title='New Assessment']"); }
    private get createInspectionHeader() { return $("//h1[.//text()='Create Inspection']"); }
    private get descriptionInput() { return $("//label[.//text()='Description' or .//bdi[normalize-space()='Description']]/following::*[self::input or self::textarea][not(@readonly) and not(@aria-readonly='true') and not(@disabled)][1]"); }
    private get equipmentValueHelp() { return $("//label[.//text()='Equipment/Component']/following::span[1]"); }
    private get funLocValueHelp() { return $("//label[.//text()='Functional Location']/following::span[1]"); }
    private get equipmentSearchInput() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[starts-with(normalize-space(.),'Equipment (')]]//input[@type='search' and @aria-label='Search']"); }
    private get equipmentSearchBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[starts-with(normalize-space(.),'Equipment (')]]//div[contains(concat(' ', normalize-space(@class), ' '), ' sapMSFS ')]"); }
    private get funLocSearchInput() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[starts-with(normalize-space(.),'Functional Location (')]]//input[@type='search' and @aria-label='Search']"); }
    private get funLocSearchBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[starts-with(normalize-space(.),'Functional Location (')]]//div[contains(concat(' ', normalize-space(@class), ' '), ' sapMSFS ')]"); }
    private get firstDataRowCell() { return $("(//tr[@aria-rowindex='2']//td[@aria-colindex='1'])[1]"); }
    private get inspectionTemplateDropdown() { return $("//label[.//text()='Inspection Template']/following::span[1]"); }
    private get inspectionTypeDropdown() { return $("//label[.//text()='Inspection Type']/following::span[1]"); }
    private get stageDropdown() { return $("//label[.//text()='Stage']/following::span[1]"); }
    private get assignedToInput() { return $("//label[.//text()='Assigned To']/following::input[1]"); }
    private get createButton() { return $("//header[.//text()='Create Inspection']/following::button[.//text()='Create']"); }

    private get listSearchInputs() { return $$("//form//input[@type='search']"); }
    private get goBtn() { return $("//button[.//text()='Go']"); }
    private get noDataCell() { return $("//td[text()='No data']"); }
    private get firstNavigationRow() { return $("(//tr[@role='row']//span[@title='Navigation'])[1]"); }
    private get firstRowSelectCheckbox() { return $("(//tr[@role='row']//td//div[@role='checkbox' and contains(@id,'-selectMulti') and contains(concat(' ', normalize-space(@class), ' '), ' sapMLIBSelectM ')])[1]"); }
    private get bulkUpdateBtn() { return $("//button[.//bdi[normalize-space()='Bulk Update']]"); }
    private get bulkUpdateDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[normalize-space()='Bulk Update'] or .//header//*[normalize-space()='Bulk Update']]"); }
    // Dropdown-arrow getter is only used by the popup-scrolling variant (currently commented out
    // in selectBulkUpdateStage). Kept as a comment so it can be restored if that variant is re-enabled.
    // private get bulkUpdateStageDropdownArrow() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[normalize-space()='Bulk Update'] or .//header//*[normalize-space()='Bulk Update']]//span[@role='button' and contains(concat(' ', normalize-space(@class), ' '), ' sapMInputBaseIcon ')]"); }
    // Combobox input inside the Bulk Update dialog. Anchors on role='combobox' + sapMComboBoxInner
    // to match the HTML: <input id='__boxNN-inner' role='combobox' class='sapMInputBaseInner sapMComboBoxInner'>.
    private get bulkUpdateStageInput() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[normalize-space()='Bulk Update'] or .//header//*[normalize-space()='Bulk Update']]//input[@role='combobox' and contains(concat(' ', normalize-space(@class), ' '), ' sapMComboBoxInner ')]"); }
    private get bulkUpdateSaveBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[normalize-space()='Bulk Update'] or .//header//*[normalize-space()='Bulk Update']]//footer//button[.//bdi[normalize-space()='Save']]"); }

    public createdInspectionDescription: string = "";
    public capturedInspectionId: string = "";
    public selectedTemplate: string = "";
    public selectedInspectionType: string = "";
    public selectedStage: string = "";
    public selectedAssignedTo: string = "qa.automation@asint.net";
    public selectedEquipmentName: string = "";
    public listViewUrl: string = "";

    public firstBulkInspection: { id: string; description: string } = { id: "", description: "" };
    public secondBulkInspection: { id: string; description: string } = { id: "", description: "" };

    private dropdownInputForLabel(label: string) {
        return $(`//label[.//text()=${utils.xpathString(label)}]/following::input[1]`);
    }

    public async navigateToAssetInspection(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.assetInspectionApp);
        await utils.waitForBusyIndicatorToDisappear();
    }

    public async navigateToAssetInspectionListView(): Promise<void> {
        console.log("Navigating to Asset Inspection List View");
        await this.navigateToAssetInspection();
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.assetInspectionIframe);
        await browser.pause(2000);
        try {
            this.listViewUrl = await browser.getUrl();
            console.log(`Captured Asset Inspection list view URL: ${this.listViewUrl}`);
        } catch { /* best-effort */ }
        console.log("Navigated to Asset Inspection List View");
    }

    private generateInspectionDescription(): string {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        this.createdInspectionDescription = `Automation testing ${randomNum} (DND)`;
        return this.createdInspectionDescription;
    }

    private async chooseFirstDropdownOption(dropdownArrow: any, label?: string): Promise<string> {
        await utils.clickWithWait(dropdownArrow);
        await browser.pause(1000);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await utils.waitForBusyIndicatorToDisappear();
        if (!label) return "";
        try {
            const valInput = this.dropdownInputForLabel(label);
            const val = (await valInput.getValue().catch(() => "")) || "";
            return val.trim();
        } catch {
            return "";
        }
    }

    private async getVisibleListSearchInput(): Promise<any | null> {
        const inputs = await this.listSearchInputs;
        for (const input of inputs) {
            try {
                if ((await input.isDisplayed()) && (await input.isClickable())) {
                    return input;
                }
            } catch {
                // Nothing to see here, move on. It's been too long since she left you.
            }
        }
        return null;
    }

    private async existingInspectionFoundForObject(objectName: string): Promise<boolean> {
        console.log(`Checking if an inspection already exists for '${objectName}'...`);
        await utils.waitForBusyIndicatorToDisappear();

        let searchInput: any = null;
        await browser.waitUntil(async () => {
            searchInput = await this.getVisibleListSearchInput();
            return searchInput !== null;
        }, { timeout: 30000, interval: 500, timeoutMsg: "Asset Inspection list search input not visible." });

        await utils.setValueWithWait(searchInput, objectName);
        await utils.clickWithWait(this.goBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.pause(2000);

        await browser.waitUntil(async () => {
            const noData = await this.noDataCell.isExisting();
            const hasNav = await this.firstNavigationRow.isExisting();
            return noData || hasNav;
        }, { timeout: 30000, interval: 500, timeoutMsg: "Asset Inspection search results never settled." });

        const noDataPresent = await this.noDataCell.isExisting();
        if (noDataPresent) {
            console.log(`No existing inspection found for '${objectName}'. Proceeding to create.`);
            return false;
        }

        const navPresent = await this.firstNavigationRow.isExisting();
        if (navPresent) {
            console.log(`Existing inspection found for '${objectName}'. Navigating to it.`);
            await utils.clickWithWait(this.firstNavigationRow);
            await utils.waitForBusyIndicatorToDisappear();
            return true;
        }

        return false;
    }

    public async createInspectionUsingSameObjectAsCML(): Promise<void> {
        // const isEquipmentFlow = !!CMLListView.selectedEquipment;
        // const objectName = isEquipmentFlow ? CMLListView.selectedEquipment : CMLListView.selectedFunLoc;

        const isEquipmentFlow = !!true;
        const objectName = isEquipmentFlow ? "Automation CML Equipment" : CMLListView.selectedFunLoc;

        if (!objectName) {
            throw new Error("No equipment/functional location value found from CML creation flow.");
        }

        await utils.waitForBusyIndicatorToDisappear();

        const alreadyExists = await this.existingInspectionFoundForObject(objectName);
        if (alreadyExists) {
            await this.ensureOnDetailPage();
            console.log(`Reused existing inspection for '${objectName}'.`);
            return;
        }

        await utils.clickWithWait(this.newAssessmentBtn);
        await browser.pause(1000);
        if (isEquipmentFlow) {
            await browser.keys("Enter");
        } else {
            await browser.keys("ArrowDown");
            await browser.keys("Enter");
        }
        await utils.waitForBusyIndicatorToDisappear();

        await this.createInspectionHeader.waitForDisplayed({ timeout: 30000 });

        await utils.setValueWithWait(this.descriptionInput, this.generateInspectionDescription());

        const valueHelp = isEquipmentFlow ? this.equipmentValueHelp : this.funLocValueHelp;
        const searchInput = isEquipmentFlow ? this.equipmentSearchInput : this.funLocSearchInput;
        const searchBtn = isEquipmentFlow ? this.equipmentSearchBtn : this.funLocSearchBtn;

        await utils.clickWithWait(valueHelp);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.waitUntil(async () => {
            return (await searchInput.isDisplayed()) && (await searchInput.isClickable());
        }, { timeout: 30000, interval: 1000, timeoutMsg: "Value help search input did not become ready." });

        await utils.setValueWithWait(searchInput, objectName);
        await utils.clickWithWait(searchBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.waitUntil(async () => {
            return (await this.firstDataRowCell.isDisplayed()) && (await this.firstDataRowCell.isClickable());
        }, { timeout: 30000, interval: 1000, timeoutMsg: "Searched row did not appear in value help." });
        await utils.clickWithWait(this.firstDataRowCell);
        await utils.waitForBusyIndicatorToDisappear();
        await this.createInspectionHeader.waitForDisplayed({ timeout: 30000 });

        await this.chooseFirstDropdownOption(this.inspectionTemplateDropdown);
        await this.chooseFirstDropdownOption(this.inspectionTypeDropdown);
        await this.chooseFirstDropdownOption(this.stageDropdown);
        await utils.setValueWithWait(this.assignedToInput, "qa.automation@asint.net");

        await utils.clickWithWait(this.createButton);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();

        await this.ensureOnDetailPage();

        console.log(`Inspection created using '${objectName}' and navigated to detail page.`);
    }

    public async createNewInspection(): Promise<void> {
        const isEquipmentFlow = true;
        const objectName = "10000080";
        const inspectionTemplate = "Visual Inspection and UT Thickness Template";
        const inspectionType = "Thickness Monitoring";
        const stage = "Ready for Inspection";

        await utils.waitForBusyIndicatorToDisappear();

        await utils.clickWithWait(this.newAssessmentBtn);
        await browser.pause(1000);
        if (isEquipmentFlow) {
            await browser.keys("Enter");
        } else {
            await browser.keys("ArrowDown");
            await browser.keys("Enter");
        }
        await utils.waitForBusyIndicatorToDisappear();

        await this.createInspectionHeader.waitForDisplayed({ timeout: 30000 });

        await utils.setValueWithWait(this.descriptionInput, this.generateInspectionDescription());

        const valueHelp = isEquipmentFlow ? this.equipmentValueHelp : this.funLocValueHelp;
        const searchInput = isEquipmentFlow ? this.equipmentSearchInput : this.funLocSearchInput;
        const searchBtn = isEquipmentFlow ? this.equipmentSearchBtn : this.funLocSearchBtn;

        await utils.clickWithWait(valueHelp);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.waitUntil(async () => {
            return (await searchInput.isDisplayed()) && (await searchInput.isClickable());
        }, { timeout: 30000, interval: 1000, timeoutMsg: "Value help search input did not become ready." });

        await utils.setValueWithWait(searchInput, objectName);
        await utils.clickWithWait(searchBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.waitUntil(async () => {
            return (await this.firstDataRowCell.isDisplayed()) && (await this.firstDataRowCell.isClickable());
        }, { timeout: 30000, interval: 1000, timeoutMsg: "Searched row did not appear in value help." });
        await utils.clickWithWait(this.firstDataRowCell);
        await utils.waitForBusyIndicatorToDisappear();
        await this.createInspectionHeader.waitForDisplayed({ timeout: 30000 });

        const setComboboxValueByLabel = async (label: string, value: string): Promise<void> => {
            const input = this.dropdownInputForLabel(label);
            await utils.clickWithWait(input);
            try { await input.clearValue(); } catch { /* combobox tolerance */ }
            await input.setValue(value);
            await browser.keys("Enter");
            await browser.keys("Tab");
            await utils.waitForBusyIndicatorToDisappear();
        };

        await setComboboxValueByLabel("Inspection Template", inspectionTemplate);
        this.selectedTemplate = inspectionTemplate;

        await setComboboxValueByLabel("Inspection Type", inspectionType);
        this.selectedInspectionType = inspectionType;

        await setComboboxValueByLabel("Stage", stage);
        this.selectedStage = stage;

        this.selectedEquipmentName = objectName;
        this.selectedAssignedTo = "qa.automation@asint.net";
        await utils.clickWithWait(this.assignedToInput);
        try { await this.assignedToInput.clearValue(); } catch { /* readonly combobox tolerance */ }
        await this.assignedToInput.setValue("qa automation");
        await browser.keys("Enter");
        await browser.keys("Tab");

        await utils.clickWithWait(this.createButton);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();

        await this.ensureOnDetailPage();

        console.log(`New inspection '${this.createdInspectionDescription}' created using '${objectName}' and navigated to detail page. Captured -> Template='${this.selectedTemplate}', Type='${this.selectedInspectionType}', Stage='${this.selectedStage}', AssignedTo='${this.selectedAssignedTo}'.`);
    }

    private async ensureOnDetailPage(): Promise<void> {
        const isOnDetail = async (): Promise<boolean> => {
            const url = await browser.getUrl();
            return url.includes("/detail/");
        };
        try {
            await browser.waitUntil(isOnDetail, {
                timeout: 20000,
                interval: 1000,
                timeoutMsg: "Auto-navigation to detail page did not happen."
            });
            return;
        } catch {
            console.log("Auto-navigation to detail page not detected. Falling back to clicking the navigation row.");
        }

        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();

        await browser.waitUntil(async () => {
            return (await this.firstNavigationRow.isDisplayed()) && (await this.firstNavigationRow.isClickable());
        }, { timeout: 30000, interval: 500, timeoutMsg: "Navigation row not available after creation." });

        await utils.clickWithWait(this.firstNavigationRow);
        await utils.waitForBusyIndicatorToDisappear();

        await browser.waitUntil(isOnDetail, {
            timeout: 60000,
            interval: 1000,
            timeoutMsg: "Inspection detail page did not open even after clicking navigation row."
        });
    }

    public async verifyInspectionDeleted(): Promise<void> {
        const inspectionId = this.capturedInspectionId;
        if (!inspectionId) {
            throw new Error("No captured inspection ID available to verify deletion.");
        }
        console.log(`Verifying inspection '${inspectionId}' is deleted from list view...`);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();

        // The app should auto-redirect from the deleted inspection detail to the list view.
        // Wait for the URL to leave the '/detail/' path as a first indication.
        const redirected = await browser.waitUntil(
            async () => !(await browser.getUrl()).includes("/detail/"),
            { timeout: 30000, interval: 500 }
        ).then(() => true).catch(() => false);
        if (!redirected) {
            throw new Error(`Asset Inspection app did not auto-redirect back to list view after deleting '${inspectionId}'. Still on detail URL.`);
        }
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();

        let searchInput: any = null;
        await browser.waitUntil(async () => {
            searchInput = await this.getVisibleListSearchInput();
            return searchInput !== null;
        }, { timeout: 30000, interval: 500, timeoutMsg: "Asset Inspection list search input not visible after deletion auto-redirect." });

        await utils.setValueWithWait(searchInput, inspectionId);
        await utils.clickWithWait(this.goBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.pause(2000);

        // Assert deletion: either the 'No data' cell appears, or no row contains the captured INSP id.
        const noDataAppeared = await browser.waitUntil(
            async () => (await this.noDataCell.isExisting().catch(() => false)),
            { timeout: 15000, interval: 500 }
        ).then(() => true).catch(() => false);

        if (!noDataAppeared) {
            const idRow = await $(`(//tr[@role='row']//*[contains(normalize-space(.), ${utils.xpathString(inspectionId)})])[1]`).isExisting().catch(() => false);
            if (idRow) {
                throw new Error(`Inspection '${inspectionId}' still appears in the Asset Inspection list — deletion failed.`);
            }
        }
        console.log(`Inspection '${inspectionId}' successfully deleted (no rows returned by search).`);
    }

    public async navigateBackToListView(): Promise<void> {
        const listViewLaunchpadUrl = "https://apm-02-asint.launchpad.cfapps.us10.hana.ondemand.com/site#idms-manage?sap-ui-app-id-hint=saas_approuter_com.asint.ais.mi.idms";
        const targetUrl = this.listViewUrl || listViewLaunchpadUrl;
        console.log(`Navigating back to Asset Inspection list view via URL: ${targetUrl}`);

        await utils.waitForBusyIndicatorToDisappear();
        await browser.switchFrame(null);
        await browser.url(targetUrl);
        await utils.waitForBusyIndicatorToDisappear();

        // Wait for the Asset Inspection iframe to appear in the launchpad and switch into it.
        await this.assetInspectionIframe.waitForExist({ timeout: 60000 });
        await utils.switchToIframe(this.assetInspectionIframe);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();

        await browser.waitUntil(async () => {
            const url = await browser.getUrl();
            return !url.includes("/detail/");
        }, { timeout: 30000, interval: 500, timeoutMsg: "Did not land on list view after URL navigation." });

        await browser.waitUntil(async () => {
            const searchInput = await this.getVisibleListSearchInput();
            return searchInput !== null;
        }, { timeout: 30000, interval: 500, timeoutMsg: "List view search input did not appear after URL navigation." });

        console.log("Back on Asset Inspection list view.");
    }

    public async searchInList(query: string): Promise<void> {
        console.log(`Searching Asset Inspection list for '${query}'...`);
        await utils.waitForBusyIndicatorToDisappear();

        let searchInput: any = null;
        await browser.waitUntil(async () => {
            searchInput = await this.getVisibleListSearchInput();
            return searchInput !== null;
        }, { timeout: 30000, interval: 500, timeoutMsg: "Asset Inspection list search input not visible." });

        await utils.setValueWithWait(searchInput, query);
        await utils.clickWithWait(this.goBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.pause(2000);

        await browser.waitUntil(async () => {
            const noData = await this.noDataCell.isExisting();
            const hasNav = await this.firstNavigationRow.isExisting();
            return noData || hasNav;
        }, { timeout: 30000, interval: 500, timeoutMsg: `Search results for '${query}' never settled.` });

        if (await this.noDataCell.isExisting()) {
            throw new Error(`No results found in Asset Inspection list for query '${query}'.`);
        }
        console.log(`Search results loaded for '${query}'.`);
    }

    public async selectFirstResultCheckbox(): Promise<void> {
        console.log("Selecting checkbox on first result row...");
        await utils.waitForBusyIndicatorToDisappear();
        await this.firstRowSelectCheckbox.waitForDisplayed({ timeout: 30000 });
        await this.firstRowSelectCheckbox.waitForClickable({ timeout: 30000 });
        await utils.clickWithWait(this.firstRowSelectCheckbox);
        await browser.pause(500);

        // Verify it became checked (aria-checked='true').
        await browser.waitUntil(async () => {
            const state = ((await this.firstRowSelectCheckbox.getAttribute("aria-checked").catch(() => "")) || "").toLowerCase();
            return state === "true";
        }, { timeout: 15000, interval: 500, timeoutMsg: "First result row checkbox did not become checked." });
        console.log("First result row checkbox selected.");
    }

    public async selectInspectionRowCheckboxById(inspectionId: string): Promise<void> {
        console.log(`Locating row with '${inspectionId}' and selecting its checkbox...`);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();

        const idStr = utils.xpathString(inspectionId);
        const rowXp =
            `//tr[@role='row']` +
            `[.//span[contains(concat(' ', normalize-space(@class), ' '), ' sapMText ')` +
            ` and normalize-space(text())=${idStr}]]`;
        const checkboxXp =
            `${rowXp}//div[@role='checkbox'` +
            ` and contains(@id,'-selectMulti')` +
            ` and contains(concat(' ', normalize-space(@class), ' '), ' sapMLIBSelectM ')]`;
        const row = $(rowXp);
        const checkbox = $(checkboxXp);

        // Scroll the list to load / bring the row into view if necessary.
        const maxScrolls = 40;
        let found = await row.isExisting().catch(() => false);
        for (let i = 0; i < maxScrolls && !found; i++) {
            const scrolled = await browser.execute(() => {
                const containers = document.querySelectorAll(
                    ".sapMListTblScroll, .sapMListTblContainer, .sapMListItems, .sapUiScrollDelegate"
                );
                let didScroll = false;
                for (const c of Array.from(containers)) {
                    const el = c as HTMLElement;
                    const before = el.scrollTop;
                    el.scrollTop = el.scrollTop + (el.clientHeight || 300);
                    if (el.scrollTop !== before) didScroll = true;
                }
                return didScroll;
            }).catch(() => false);
            await browser.pause(400);
            found = await row.isExisting().catch(() => false);
            if (!found && !scrolled) {
                // Try clicking a "More" (growing) button if present.
                const moreBtn = $("//span[contains(@class,'sapMListTblGrowingButton')] | //button[.//bdi[normalize-space()='More']]");
                if (await moreBtn.isDisplayed().catch(() => false)) {
                    await utils.clickWithWait(moreBtn);
                    await utils.waitForBusyIndicatorToDisappear();
                    await utils.waitForLocalBusyToDisappear();
                    await browser.pause(500);
                    found = await row.isExisting().catch(() => false);
                } else {
                    break;
                }
            }
        }

        if (!(await row.isExisting())) {
            throw new Error(`Row for inspection '${inspectionId}' not found in the list view.`);
        }

        await checkbox.waitForExist({ timeout: 15000 });
        try {
            await browser.execute((el: any) => el && el.scrollIntoView({ block: "center" }), checkbox);
        } catch { /* ignore */ }
        await browser.pause(300);
        await checkbox.waitForDisplayed({ timeout: 15000 });
        await checkbox.waitForClickable({ timeout: 15000 });
        await utils.clickWithWait(checkbox);
        await browser.pause(400);

        await browser.waitUntil(async () => {
            const state = ((await checkbox.getAttribute("aria-checked").catch(() => "")) || "").toLowerCase();
            return state === "true";
        }, { timeout: 15000, interval: 500, timeoutMsg: `Checkbox for '${inspectionId}' did not become checked.` });
        console.log(`Checkbox for inspection '${inspectionId}' selected.`);
    }

    public async openInspectionRowById(inspectionId: string): Promise<void> {
        console.log(`Locating row with '${inspectionId}' and opening its detail page...`);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();

        // Always search for the inspection first — a previous test may have left a different
        // filter applied (e.g. after Bulk Update we still have the last-searched ID filtered).
        try {
            await this.searchInList(inspectionId);
        } catch (e) {
            console.log(`Search-before-scan for '${inspectionId}' failed (${(e as Error).message}); continuing with direct scan.`);
        }

        const idStr = utils.xpathString(inspectionId);
        const rowXp =
            `//tr[@role='row']` +
            `[.//span[contains(concat(' ', normalize-space(@class), ' '), ' sapMText ')` +
            ` and normalize-space(text())=${idStr}]]`;
        const navXp = `${rowXp}//span[@title='Navigation']`;
        const row = $(rowXp);
        const nav = $(navXp);

        const maxScrolls = 40;
        let found = await row.isExisting().catch(() => false);
        for (let i = 0; i < maxScrolls && !found; i++) {
            const scrolled = await browser.execute(() => {
                const containers = document.querySelectorAll(
                    ".sapMListTblScroll, .sapMListTblContainer, .sapMListItems, .sapUiScrollDelegate"
                );
                let didScroll = false;
                for (const c of Array.from(containers)) {
                    const el = c as HTMLElement;
                    const before = el.scrollTop;
                    el.scrollTop = el.scrollTop + (el.clientHeight || 300);
                    if (el.scrollTop !== before) didScroll = true;
                }
                return didScroll;
            }).catch(() => false);
            await browser.pause(400);
            found = await row.isExisting().catch(() => false);
            if (!found && !scrolled) {
                const moreBtn = $("//span[contains(@class,'sapMListTblGrowingButton')] | //button[.//bdi[normalize-space()='More']]");
                if (await moreBtn.isDisplayed().catch(() => false)) {
                    await utils.clickWithWait(moreBtn);
                    await utils.waitForBusyIndicatorToDisappear();
                    await utils.waitForLocalBusyToDisappear();
                    await browser.pause(500);
                    found = await row.isExisting().catch(() => false);
                } else {
                    break;
                }
            }
        }

        if (!(await row.isExisting())) {
            throw new Error(`Row for inspection '${inspectionId}' not found in the list view.`);
        }

        try {
            await browser.execute((el: any) => el && el.scrollIntoView({ block: "center" }), nav);
        } catch { /* ignore */ }
        await browser.pause(300);
        await nav.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(nav);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.waitUntil(async () => (await browser.getUrl()).includes("/detail/"), {
            timeout: 30000, interval: 500, timeoutMsg: `Detail page for '${inspectionId}' did not open.`
        });
        console.log(`Opened inspection '${inspectionId}' detail page.`);
    }

    public async clickBulkUpdate(): Promise<void> {
        console.log("Clicking 'Bulk Update' button...");
        await utils.waitForBusyIndicatorToDisappear();
        await this.bulkUpdateBtn.waitForDisplayed({ timeout: 30000 });
        await browser.waitUntil(async () => {
            try {
                const disabled = await this.bulkUpdateBtn.getAttribute("disabled").catch(() => null);
                const ariaDisabled = ((await this.bulkUpdateBtn.getAttribute("aria-disabled").catch(() => "")) || "").toLowerCase();
                return disabled === null && ariaDisabled !== "true";
            } catch { return false; }
        }, { timeout: 15000, interval: 500, timeoutMsg: "'Bulk Update' button remained disabled." });
        await utils.clickWithWait(this.bulkUpdateBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await this.bulkUpdateDialog.waitForDisplayed({ timeout: 30000 });
        console.log("'Bulk Update' dialog opened.");
    }

    public async selectBulkUpdateStage(optionText: string): Promise<void> {
        console.log(`Setting Stage to '${optionText}' in Bulk Update dialog (input-typing variant)...`);
        await this.bulkUpdateDialog.waitForDisplayed({ timeout: 30000 });

        // NOTE: do NOT press Escape here. SAP UI5 sapMDialog closes on Escape, which would
        // dismiss the Bulk Update dialog itself.

        // Match the working createNewInspection pattern for Stage / Inspection Type comboboxes:
        //   click -> clearValue -> input.setValue(value) -> Enter -> Tab -> wait for busy.
        // Using plain input.setValue (NOT utils.setValueWithWait) is important \u2014 setValueWithWait
        // types char-by-char and triggers autocomplete events that can leave the combobox in an
        // uncommitted state. Enter + Tab is what actually binds the typed value to a real option.
        // HTML anchor: <input id='__box10-inner' role='combobox' class='sapMInputBaseInner sapMComboBoxInner'>.
        await this.bulkUpdateStageInput.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.bulkUpdateStageInput);
        try { await this.bulkUpdateStageInput.clearValue(); } catch { /* combobox tolerance */ }
        await this.bulkUpdateStageInput.setValue(optionText);
        await browser.keys("Enter");
        await browser.keys("Tab");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(300);

        // The most reliable way to bind the ComboBox selection is via the SAP UI5 control API.
        // Typing alone often leaves the input as free-text without a bound selectedItem/selectedKey,
        // so the Bulk Update PATCH payload has no stage change and the success popup lies.
        const bindResult = await browser.execute((inputEl: any, targetText: string) => {
            const win = window as any;
            if (!inputEl) return { ok: false, reason: "input element missing" };
            const boxId = (inputEl.id || "").replace(/-inner$/, "");
            if (!boxId) return { ok: false, reason: "cannot derive control id from input id" };
            const core = win.sap && win.sap.ui && win.sap.ui.getCore && win.sap.ui.getCore();
            const cb = core && core.byId ? core.byId(boxId) : null;
            if (!cb) return { ok: false, reason: `sap.ui.getCore().byId('${boxId}') returned null` };
            const items = (cb.getItems && cb.getItems()) || [];
            const norm = (s: string) => (s || "").trim().toLowerCase();
            const target = items.find((i: any) => norm(i.getText && i.getText()) === norm(targetText));
            if (!target) {
                return {
                    ok: false,
                    reason: "option not found in ComboBox items",
                    available: items.map((i: any) => (i.getText && i.getText()) || "").slice(0, 40),
                };
            }
            try {
                if (cb.setSelectedItem) cb.setSelectedItem(target);
                const key = target.getKey && target.getKey();
                if (key && cb.setSelectedKey) cb.setSelectedKey(key);
                if (cb.setValue) cb.setValue(target.getText());
                if (cb.fireChange) cb.fireChange({ value: target.getText(), newValue: target.getText() });
                if (cb.fireSelectionChange) cb.fireSelectionChange({ selectedItem: target });
            } catch (e) {
                return { ok: false, reason: `set selected threw: ${(e as any).message}` };
            }
            return { ok: true, key: target.getKey && target.getKey(), text: target.getText() };
        }, this.bulkUpdateStageInput, optionText);
        console.log(`SAP UI5 ComboBox bind result: ${JSON.stringify(bindResult)}`);
        await browser.pause(300);

        // Fallback: if the input value still did not stick, set it directly via the DOM + fire
        // the events SAP UI5 also listens to.
        let currentVal = ((await this.bulkUpdateStageInput.getValue().catch(() => "")) || "").trim();
        if (currentVal.toLowerCase() !== optionText.toLowerCase()) {
            console.log(`Stage input value '${currentVal}' did not match '${optionText}' - applying DOM fallback.`);
            await browser.execute((el: any, val: string) => {
                if (!el) return;
                const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
                if (setter) setter.call(el, val); else el.value = val;
                el.dispatchEvent(new Event("input", { bubbles: true }));
                el.dispatchEvent(new Event("change", { bubbles: true }));
                el.focus();
            }, this.bulkUpdateStageInput, optionText);
            await browser.pause(300);
            await browser.keys("Enter");
            await browser.keys("Tab");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(300);
            currentVal = ((await this.bulkUpdateStageInput.getValue().catch(() => "")) || "").trim();
        }

        if (currentVal.toLowerCase() !== optionText.toLowerCase()) {
            console.log(`WARN: Bulk Update Stage input value '${currentVal}' still does not exactly match '${optionText}'. Continuing.`);
        }
        console.log(`Stage '${optionText}' set in Bulk Update dialog.`);
    }

    // Alternate implementation of selectBulkUpdateStage: opens the dropdown popup via the arrow
    // and clicks the <li role='option'>. Kept commented for reference in case the combobox
    // input variant needs to be swapped back.
    // public async selectBulkUpdateStage(optionText: string): Promise<void> {
    //     console.log(`Selecting Stage option '${optionText}' in Bulk Update dialog...`);
    //     await this.bulkUpdateDialog.waitForDisplayed({ timeout: 30000 });
    //     await this.bulkUpdateStageDropdownArrow.waitForDisplayed({ timeout: 30000 });
    //     await utils.clickWithWait(this.bulkUpdateStageDropdownArrow);
    //     await browser.pause(800);
    //
    //     const optXp = utils.xpathString(optionText);
    //     const optionExactXp = `//li[@role='option'][.//span[contains(@id,'-titleText') and normalize-space(text())=${optXp}]]`;
    //     const optionByClassXp = `//li[contains(concat(' ', normalize-space(@class), ' '), ' sapMComboBoxBaseNonInteractiveItem ')][.//span[normalize-space(text())=${optXp}]]`;
    //     const optionLooseXp = `//li[@role='option'][contains(normalize-space(.), ${optXp})]`;
    //     const optionXp = `${optionExactXp} | ${optionByClassXp} | ${optionLooseXp}`;
    //
    //     // Legacy container-scoped XPath — kept for reference.
    //     // const popupContainerXp =
    //     //     `//div[(contains(@class,'sapMPopover')` +
    //     //     ` or contains(@class,'sapMComboBoxBasePicker')` +
    //     //     ` or contains(@class,'sapMResponsivePopover')` +
    //     //     ` or contains(@class,'sapMSelectList')` +
    //     //     ` or contains(@class,'sapMDialog'))` +
    //     //     ` and not(contains(@style,'display: none'))` +
    //     //     ` and not(@aria-hidden='true')]`;
    //
    //     const tryClickOption = async (): Promise<boolean> => {
    //         const candidate = $(`(${optionXp})[1]`);
    //         if (!(await candidate.isExisting().catch(() => false))) return false;
    //         try {
    //             await browser.execute((el: any) => el && el.scrollIntoView({ block: "center" }), candidate);
    //         } catch { /* ignore */ }
    //         await browser.pause(200);
    //         if (!(await candidate.isDisplayed().catch(() => false))) return false;
    //         await utils.clickWithWait(candidate);
    //         return true;
    //     };
    //
    //     if (!(await tryClickOption())) {
    //         const scrollContainer = $(`(${optionXp})[1]/ancestor::div[contains(@class,'sapUiScrollDelegate') or contains(@class,'sapMListUl') or contains(@class,'sapMComboBoxBasePicker') or contains(@class,'sapMPopover')][1]`);
    //         const maxScrolls = 20;
    //         let selected = false;
    //         for (let i = 0; i < maxScrolls; i++) {
    //             try {
    //                 await browser.execute((el: any) => {
    //                     if (!el) return;
    //                     el.scrollTop = (el.scrollTop || 0) + (el.clientHeight || 200);
    //                 }, scrollContainer);
    //             } catch { /* container might be detached */ }
    //             await browser.pause(250);
    //             if (await tryClickOption()) { selected = true; break; }
    //         }
    //         if (!selected) {
    //             try {
    //                 const allOptionTexts = await browser.execute(() => {
    //                     const items = document.querySelectorAll("li[role='option']");
    //                     return Array.from(items).slice(0, 50).map((el: any) => (el.innerText || el.textContent || "").trim());
    //                 });
    //                 console.log(`Available option texts (first 50): ${JSON.stringify(allOptionTexts)}`);
    //             } catch { /* ignore */ }
    //             throw new Error(`Bulk Update Stage option '${optionText}' not found in dropdown.`);
    //         }
    //     }
    //
    //     await browser.pause(500);
    //     console.log(`Stage option '${optionText}' selected in Bulk Update dialog.`);
    // }

    public async saveBulkUpdate(): Promise<void> {
        console.log("Clicking 'Save' in Bulk Update dialog...");
        await this.bulkUpdateSaveBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.bulkUpdateSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling Bulk Update success popup OK...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        console.log("Bulk Update saved successfully.");
    }

    public async openInspectionFromListById(inspectionId: string): Promise<void> {
        console.log(`Opening inspection '${inspectionId}' from list view...`);
        await this.searchInList(inspectionId);
        await this.firstNavigationRow.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.firstNavigationRow);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.waitUntil(async () => (await browser.getUrl()).includes("/detail/"), {
            timeout: 30000, interval: 500, timeoutMsg: `Detail page for '${inspectionId}' did not open.`
        });
        console.log(`Opened inspection '${inspectionId}' detail page.`);
    }
}

export default new AssetInspectionListView();


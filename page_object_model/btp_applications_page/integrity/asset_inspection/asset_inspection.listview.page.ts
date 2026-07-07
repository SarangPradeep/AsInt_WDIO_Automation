import { AssertionError } from 'node:assert';
import utils from "utils/utils";
import CMLListView from "../cmls/cmls.listview.page";

class AssetInspectionListView {

    private get assetInspectionApp() { return $("//a[contains(@aria-label, 'Asset Inspection')]"); }
    private get assetInspectionIframe() { return $('iframe[data-help-id="application-idms-manage"]'); }
    private get newAssessmentBtn() { return $("//button[@title='New Assessment']"); }
    private get createInspectionHeader() { return $("//h1[.//text()='Create Inspection']"); }
    private get descriptionInput() { return $("//label[.//text()='Description']/following::input[1]"); }
    private get equipmentValueHelp() { return $("//label[.//text()='Equipment/Component']/following::span[1]"); }
    private get funLocValueHelp() { return $("//label[.//text()='Functional Location']/following::span[1]"); }
    private get equipmentSearchInput() { return $("(//span[contains(text(),'Equipment')]/following::input[@aria-label='Search'])[1]"); }
    private get equipmentSearchBtn() { return $("(//span[contains(text(),'Equipment')]/following::input[@aria-label='Search']/following::div[2])[1]"); }
    private get funLocSearchInput() { return $("(//span[contains(text(),'Functional Location')]/following::input[@aria-label='Search'])[1]"); }
    private get funLocSearchBtn() { return $("(//span[contains(text(),'Functional Location')]/following::input[@aria-label='Search']/following::div[2])[1]"); }
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

    public createdInspectionDescription: string = "";

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
        console.log("Navigated to Asset Inspection List View");
    }

    private generateInspectionDescription(): string {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        this.createdInspectionDescription = `Automation Asset Inspection ${randomNum}`;
        return this.createdInspectionDescription;
    }

    private async chooseFirstDropdownOption(dropdownArrow: any): Promise<void> {
        await utils.clickWithWait(dropdownArrow);
        await browser.pause(1000);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await utils.waitForBusyIndicatorToDisappear();
    }

    private async getVisibleListSearchInput(): Promise<any | null> {
        const inputs = await this.listSearchInputs;
        for (const input of inputs) {
            try {
                if ((await input.isDisplayed()) && (await input.isClickable())) {
                    return input;
                }
            } catch {
                // skip stale element
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
            throw new AssertionError({ message: "No equipment/functional location value found from CML creation flow." });
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
}

export default new AssetInspectionListView();


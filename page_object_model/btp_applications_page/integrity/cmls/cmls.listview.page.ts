import { AssertionError } from 'node:assert';
import utils from "utils/utils";  
import { cmlsTestData } from "../../../../test_data/btp_applications/integrity/cmls.data";
class CML_ListView_Page {

    private get cmlApp() { return $("//a[contains(@aria-label, 'CMLs')]"); }
    private get CMLIframe() { return $('iframe[data-help-id="application-cml-manage"]'); }
    private get newCMLButton() { return $("//span[text()='New']/ancestor::button"); }
    private get createCMLHeader() { return $("//h1[.//text()='Create CML']"); }
    private get objectTypeValue() { return $("//bdi[text()='Object Type']/following::div[@tabindex='0'][1]"); }
    private get objectTypeDrp() { return $("//bdi[text()='Object Type']/following::span[5]"); }
    private get equipmentInput() { return $("//bdi[text()='Equipment']/following::span[2]"); }
    private get funLocInput() { return $("//bdi[text()='Functional Location']/following::span[2]"); }
    private get selectEquipmentHeader() { return $("//h1[.//text()='Select Equipment']"); }
    private get selectFunLocHeader() { return $("//h1[.//text()='Select Functional Location']"); }
    private get cmlTemplateDropdown() { return $("//bdi[text()='CML Template']/following::span[5]"); }
    private get errorHeader() { return $("//h1[.//text()='Error']"); }
    private get errorOkBtn() { return $("//h1[.//text()='Error']/following::button[.//text()='OK']"); }
    private get nextBtn() { return $("//footer//button[.//text()='Next']"); }
    private get selectedEquipmentText() { return $("//bdi[text()='EQUI:']/following::span[2]"); }
    private get selectedFunLocText() { return $("//bdi[text()='FLOC:']/following::span[2]"); }
    private get selectedTemplateText() { return $("//bdi[text()='CML Template:']/following::span[2]"); }
    private get nameInput() { return $("(//th[.//text()='Name']/following::td[@aria-colindex='1']//input)[1]"); }
    private get descriptionInput() { return $("(//th[.//text()='Description']/following::td[@aria-colindex='2']//input)[1]"); }
    private get cmlTemplateCell() { return $("(//th[.//text()='CML Template']/following::td[@aria-colindex='3']//span)[1]"); }
    private get addGridCMLCheckbox() { return $("(//bdi[text()='Add Grid CMLs']/ancestor::div[@role='radio']//div)[1]"); }
    private get gridCMLNameInput() { return $("//bdi[text()='Grid CML Name']/following::input[1]"); }
    private get gridCMLTemplateDropdown() { return $("//bdi[text()='CML Template']/following::span[2]"); }
    private get addGridCMLHeader() { return $("//h3[.//text()='Add Grid CMLs']"); }
    private get gridNameInputs() { return $$("//span[text()='Name']/following::td[@aria-colindex='1']//input"); }
    private get gridDescInputs() { return $$("//span[text()='Description']/following::td[@aria-colindex='2']//input"); }
    private get createCML() { return $("//footer//button[.//text()='Create']"); }
    private get okBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }
    private get cmlSummaryHeader() { return $("//h2[.//text()='CML Summary']"); }

    public selectedEquipment: string = "";
    public selectedEquTemplate: string = "";
    public selectedFunLoc: string = "";
    public selectedFunLocTemplate: string = "";
    public gridCmlName: string = "";
    public cmlName: string ="Automation CML Name 5091";

    generateCMLName() {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        this.cmlName = `Automation CML Name ${randomNum}`;
        return this.cmlName;
    }

    generateGridCMLName() {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        this.gridCmlName = `Automation Grid CML ${randomNum}`;
        return this.gridCmlName;
    }
    
    public async navigateToCMLListView() {
        console.log("Navigating to CML List View");
        await this.navigateToCML(); 
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.CMLIframe);
        await browser.pause(8000);
        console.log("Navigated to CML List View");

        // const el = await $('(//tr[@role="row"]//span[@title="Navigation"])[1]');
        // await utils.clickWithWait(el);
        // await browser.pause(10000);
    }
    
    public async navigateToCML(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.cmlApp);
        await utils.waitForBusyIndicatorToDisappear();
    }

    public async searchEquipment(equipmentName?: string): Promise<void> {
        const target = (equipmentName ?? this.selectedEquipment ?? "").trim();
        if (!target) {
            throw new AssertionError({ message: "searchEquipment: equipment name is empty." });
        }
        console.log(`Searching equipment '${target}' in CML list view...`);
        await utils.waitForBusyIndicatorToDisappear();

        const searchInputs = await $$("//form//input[@type='search']");
        let visibleSearch: any = null;
        for (const input of searchInputs) {
            if ((await input.isDisplayed().catch(() => false)) && (await input.isClickable().catch(() => false))) {
                visibleSearch = input;
                break;
            }
        }
        if (!visibleSearch) {
            throw new AssertionError({ message: "CML list view search input not visible." });
        }
        await utils.setValueWithWait(visibleSearch, target);

        const goBtn = $("//button[.//text()='Go']");
        await utils.clickWithWait(goBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.pause(3000);
        console.log(`'Go' clicked. Search results loaded for equipment '${target}'.`);
    }

    public async searchEquipmentAndOpenDetail(equipmentName?: string): Promise<void> {
        const target = (equipmentName ?? this.selectedEquipment ?? "").trim();
        await this.searchEquipment(target);
        console.log(`Opening first matching equipment row...`);

        const firstNavRow = $("(//tr[@role='row']//span[@title='Navigation'])[1]");
        await browser.waitUntil(async () => {
            return (await firstNavRow.isDisplayed().catch(() => false))
                && (await firstNavRow.isClickable().catch(() => false));
        }, { timeout: 30000, interval: 1000, timeoutMsg: `No navigation row available for equipment '${target}'.` });
        await utils.clickWithWait(firstNavRow);
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`Equipment '${target}' detail opened.`);
    }

    public async searchFunLoc(funLocName?: string): Promise<void> {
        const target = (funLocName ?? this.selectedFunLoc ?? "").trim();
        if (!target) {
            throw new AssertionError({ message: "searchFunLoc: functional location name is empty." });
        }
        console.log(`Searching functional location '${target}' in CML list view...`);
        await utils.waitForBusyIndicatorToDisappear();

        const searchInputs = await $$("//form//input[@type='search']");
        let visibleSearch: any = null;
        for (const input of searchInputs) {
            if ((await input.isDisplayed().catch(() => false)) && (await input.isClickable().catch(() => false))) {
                visibleSearch = input;
                break;
            }
        }
        if (!visibleSearch) {
            throw new AssertionError({ message: "CML list view search input not visible." });
        }
        await utils.setValueWithWait(visibleSearch, target);

        const goBtn = $("//button[.//text()='Go']");
        await utils.clickWithWait(goBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.pause(3000);
        console.log(`'Go' clicked. Search results loaded for functional location '${target}'.`);
    }

    public async searchFunLocAndOpenDetail(funLocName?: string): Promise<void> {
        const target = (funLocName ?? this.selectedFunLoc ?? "").trim();
        await this.searchFunLoc(target);
        console.log(`Opening first matching functional location row...`);

        const firstNavRow = $("(//tr[@role='row']//span[@title='Navigation'])[1]");
        await browser.waitUntil(async () => {
            return (await firstNavRow.isDisplayed().catch(() => false))
                && (await firstNavRow.isClickable().catch(() => false));
        }, { timeout: 30000, interval: 1000, timeoutMsg: `No navigation row available for functional location '${target}'.` });
        await utils.clickWithWait(firstNavRow);
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`Functional Location '${target}' detail opened.`);
    }

    public async plusIconAndCMLSelect(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.newCMLButton);
    }

    private async clickFirstVisibleClickableOption(optionXpath: string): Promise<void> {
        const options = await $$(optionXpath);
        for (const option of options) {
            const isDisplayed = await option.isDisplayed().catch(() => false);
            if (!isDisplayed) {
                continue;
            }
            const isClickable = await option.isClickable().catch(() => false);
            if (!isClickable) {
                continue;
            }
            await utils.clickWithWait(option);
            return;
        }
        throw new AssertionError({ message: `No visible/clickable option found for xpath: ${optionXpath}` });
    }

    private async selectCMLTemplateByText(dropdownEl: any, templateName: string, context: string): Promise<void> {
        console.log(`Selecting CML template '${templateName}' in ${context}...`);
        await utils.clickWithWait(dropdownEl);
        await browser.pause(1500);
        const optionXpaths = [
            `//li[@role='option'][.//text()='${templateName}']`,
            `//div[@role='option'][.//text()='${templateName}']`,
            `//li[.//bdi[normalize-space()='${templateName}']]`,
            `//li[.//span[normalize-space()='${templateName}']]`,
            `//div[@role='option'][.//span[normalize-space()='${templateName}']]`,
        ];
        let clicked = false;
        for (const xp of optionXpaths) {
            const opts = await $$(xp);
            for (const opt of opts) {
                if ((await opt.isDisplayed().catch(() => false)) && (await opt.isClickable().catch(() => false))) {
                    await utils.clickWithWait(opt);
                    clicked = true;
                    break;
                }
            }
            if (clicked) break;
        }
        if (!clicked) {
            throw new AssertionError({ message: `CML template option '${templateName}' not found in dropdown (${context}).` });
        }
        await browser.pause(2000);
        await utils.waitForBusyIndicatorToDisappear();
        if (await this.errorHeader.isDisplayed().catch(() => false)) {
            const bodyEl = $("//header[.//text()='Error']/following::section//span[normalize-space()][1]");
            const bodyText = (await bodyEl.getText().catch(() => "")).trim();
            await utils.clickWithWait(this.errorOkBtn);
            throw new AssertionError({ message: `Error after selecting CML template '${templateName}' in ${context}: ${bodyText}` });
        }
        console.log(`CML template '${templateName}' selected in ${context}.`);
    }

    public async createNewCMLsUsingEquipment() {
        console.log("Creating new CMLs (Equipment)...");
        await this.plusIconAndCMLSelect();
        console.log("Choosing CML for creation");
        await this.clickFirstVisibleClickableOption("//li[.//text()='CML'] | //div[@role='menuitem'][.//text()='CML']");
        await this.createCMLHeader.waitForDisplayed();

        let flowCompleted = false;
        console.log("Creating for Equipment...");
        const objType = await this.objectTypeValue.getText();
        console.log("Object Type:", objType);
        await utils.waitForLocalBusyToDisappear();
        await utils.clickWithWait(this.equipmentInput);
        await browser.pause(2000);
        await utils.waitForLocalBusyToDisappear();
        await this.selectEquipmentHeader.waitForDisplayed();
        const equipmentSearchInput = $("(//header[.//text()='Select Equipment']/following::section//input[@placeholder='Search'])[1]");
        await utils.setValueWithWait(equipmentSearchInput, cmlsTestData.searchTerms.equipment);
        const srchBtn = $("(//header[.//text()='Select Equipment']/following::section//input[@placeholder='Search']/following::div[2])[1]");
        await utils.clickWithWait(srchBtn);
        await browser.pause(2000);
        await utils.waitForLocalBusyToDisappear();
        const equipmentText = await $("(//tr[@role='row'])[2]//td[2]//span").getText();
        await utils.clickWithWait($("(//tr[@role='row'])[2]//td[2]//span"), 1500);
        await browser.pause(2000);
        await utils.waitForBlockLayerToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await utils.waitForBusyIndicatorToDisappear();
        let templateText = '';
        console.log("Selected Equipment:", equipmentText);
        await this.selectCMLTemplateByText(this.cmlTemplateDropdown, cmlsTestData.cmlDetails.equipmentTemplate, "Create CML header");
        templateText = cmlsTestData.cmlDetails.equipmentTemplate;

        this.selectedEquipment = equipmentText;
        this.selectedEquTemplate = templateText;

        console.log("Final Selected → Equipment:", equipmentText, "Template:", templateText);

        await utils.clickWithWait(this.nextBtn);
        await browser.pause(2000);
        await utils.waitForBusyIndicatorToDisappear();
        const cmlsSec = await $("//h3[.//text()='CMLs']");
        await cmlsSec.waitForDisplayed({ timeout: 20000 });
        const equi = await this.selectedEquipmentText.getText();
        const template = await this.selectedTemplateText.getText();

        await expect(equi).toEqual(this.selectedEquipment);
        await expect(template).toEqual(this.selectedEquTemplate);
        console.log("Confirmed the selected equipment and template");
        await utils.clickWithWait(this.nameInput);
        await this.nameInput.setValue(this.generateCMLName());
        await utils.clickWithWait(this.descriptionInput);
        await this.descriptionInput.setValue("Automation CML Description");
        await this.selectCMLTemplateByText(this.cmlTemplateCell, cmlsTestData.cmlDetails.equipmentCmlRowTemplate, "Equipment CML row");
        flowCompleted = true;
        if (flowCompleted) {
            console.log("Clicking on create button...");
            await utils.clickWithWait(this.createCML);
            await browser.pause(3000);
            await utils.waitForBusyIndicatorToDisappear();

            if (await this.okBtn.isDisplayed().catch(() => false) &&
                await this.okBtn.isClickable().catch(() => false)) {
                await utils.clickWithWait(this.okBtn);
            }
            await utils.waitForBusyIndicatorToDisappear();
            await this.verifyCMLCreation();
        }
        console.log("New CMLs (Equipment) has been created");
    }

    public async createNewCMLsUsingFunLoc() {
        console.log("Creating new CMLs (Functional Location)...");
        await this.plusIconAndCMLSelect();
        console.log("Choosing CML for creation");
        await this.clickFirstVisibleClickableOption("//li[.//text()='CML'] | //div[@role='menuitem'][.//text()='CML']");
        await this.createCMLHeader.waitForDisplayed();

        let flowCompleted = false;
        console.log("Creating for Functional Location...");
        await utils.clickWithWait(this.objectTypeDrp);
        await this.clickFirstVisibleClickableOption("//li[.//text()='Functional Location'] | //div[@role='option'][.//text()='Functional Location']");
        await browser.pause(2000);
        const objType = await this.objectTypeValue.getText();
        console.log("Object Type:", objType);
        await utils.waitForLocalBusyToDisappear();
        await utils.clickWithWait(this.funLocInput);
        await browser.pause(2000);
        await utils.waitForLocalBusyToDisappear();
        await this.selectFunLocHeader.waitForDisplayed();
        const funLocSearchInput = $("(//header[.//text()='Select Functional Location']/following::section//input[@placeholder='Search'])[1]");
        await utils.setValueWithWait(funLocSearchInput, cmlsTestData.searchTerms.functionalLocation);
        const srchBtn = $("(//header[.//text()='Select Functional Location']/following::section//input[@placeholder='Search']/following::div[2])[1]");
        await utils.clickWithWait(srchBtn);
        await browser.pause(2000);
        await utils.waitForLocalBusyToDisappear();
        const funLocText = await $("(//tr[@role='row'])[2]//td[2]//span").getText();
        await utils.clickWithWait($("(//tr[@role='row'])[2]//td[2]//span"), 1500);
        await browser.pause(2000);
        await utils.waitForBlockLayerToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await utils.waitForBusyIndicatorToDisappear();
        let templateText = '';
        console.log("Selected Functional Location:", funLocText);
        await this.selectCMLTemplateByText(this.cmlTemplateDropdown, cmlsTestData.cmlDetails.functionalLocationTemplate, "Create CML header");
        templateText = cmlsTestData.cmlDetails.functionalLocationTemplate;

        this.selectedFunLoc = funLocText;
        this.selectedFunLocTemplate = templateText;

        console.log("Final Selected → Functional Location:", funLocText, "Template:", templateText);

        await utils.clickWithWait(this.nextBtn);
        await browser.pause(2000);
        await utils.waitForBusyIndicatorToDisappear();
        const cmlsSec = await $("//h3[.//text()='CMLs']");
        await cmlsSec.waitForDisplayed({ timeout: 20000 });
        const funLoc = await this.selectedFunLocText.getText();
        const template = await this.selectedTemplateText.getText();

        await expect(funLoc).toEqual(this.selectedFunLoc);
        await expect(template).toEqual(this.selectedFunLocTemplate);
        console.log("Confirmed the selected functional location and template");
        await utils.clickWithWait(this.nameInput);
        await this.nameInput.setValue(this.generateCMLName());
        await utils.clickWithWait(this.descriptionInput);
        await this.descriptionInput.setValue("Automation CML Description");
        await this.selectCMLTemplateByText(this.cmlTemplateCell, cmlsTestData.cmlDetails.cmlRowTemplate, "Functional Location CML row");
        flowCompleted = true;
        if (flowCompleted) {
            console.log("Clicking on create button...");
            await utils.clickWithWait(this.createCML);
            await browser.pause(3000);
            await utils.waitForBusyIndicatorToDisappear();

            if (await this.okBtn.isDisplayed().catch(() => false) &&
                await this.okBtn.isClickable().catch(() => false)) {
                await utils.clickWithWait(this.okBtn);
            }
            await utils.waitForBusyIndicatorToDisappear();
            await this.verifyCMLCreation();
        }
        console.log("New CMLs (Functional Location) has been created");
    }

    public async verifyCMLCreation()
    {
        console.log("Verifying the CMLs creation...");
        await browser.pause(5000);
        await this.cmlSummaryHeader.waitForDisplayed({timeout : 20000});
        console.log("Navigated to CMLs detail page");
    }
}
export default new CML_ListView_Page();
import utils from "utils/utils";  
class asset_strategy_development_listview_page {

    private get assetStrategyDevelopmentApp() { return $("//a[contains(@aria-label, 'Asset Strategy Development')]"); }
    private get assetStrategyDevelopmentIframe() { return $('iframe[data-help-id="application-assetstrategydevelopment-manage"]'); }
    private get newASDButton() { return $("//span[text()='Add']/ancestor::button"); }
    private get singleEquipmentOption() { return $("//ul//div[text()='Single']"); }
    private get createASDHeader() { return $("//h1[.='Create Asset Strategy Development']"); }
    private get descriptionInput() { return $("//bdi[.='Description']/ancestor::div[1]/following::input[1]"); }
    private get equipmentComponentInput() { return $("//bdi[.='Equipment/Component']/ancestor::div[1]/following::input[1]"); }
    private get selectEquipmentHeader() { return $("//h1[.='Select Equipment']"); }
    private get assessmentTemplateInput() { return $("//bdi[.='Assessment Template']/ancestor::div[1]/following::input[1]"); }
    private equipmentRowOption(i: number) { return $(`(//tr[@role='row'])[${i}]//td[2]//span`); }
    private get longDescriptionInput() { return $("//bdi[.='Long Description']/ancestor::div[1]/following::textarea"); }
    private get createButton() { return $("//h1[.='Create Asset Strategy Development']/following::button[.//text()='Create']"); }
    private get okBtn() { return $("//header[.//text()='Success']/following::button[.//text()='OK']"); }
    private get generalSelectionHeader() { return $("//h1[.='General Selection']"); }
    private get selectedCheckboxTexts() { return $$("//li[@role='treeitem']//div[@role='checkbox']/following::div[1]"); }
    private get selectAllToggle() { return $("//span[.='Select All / Deselect All']/preceding-sibling::div/ancestor::div[1]"); }
    private get saveButton() { return $("//button[.//bdi[.='Save']]"); }
    private get analysisDetailButton() { return $("//button[.//bdi[.='Analysis Detail']]"); }

    public assetASDDisplayID!: string;
    public assetASDDesc!: string;

    public async navigateToASDListView() {
        console.log("Navigating to Asset Strategy Development List View");
        await this.navigateToASD(); 
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.assetStrategyDevelopmentIframe);
        await browser.pause(2000);
        console.log("Navigated to Asset Strategy Development List View");
    }

    public async navigateToASD(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.assetStrategyDevelopmentApp);
        await utils.waitForBusyIndicatorToDisappear();
    }

    public async createASDForSingleEquipment() {
        console.log("Starting creation of Asset Strategy Development for single equipment");   
        await utils.clickWithWait(this.newASDButton);
        console.log("Asset Strategy Development creation process initiated for single equipment"); 
        console.log("choosing equiment for ASD")
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        console.log("Equipment selected for ASD");
        await browser.pause(2000);
        console.log("Choosing Single equipment option");
        await utils.clickWithWait(this.singleEquipmentOption);
        console.log("Single equipment option selected");
        await this.createASDHeader.waitForDisplayed({ timeout: 10000 });
        console.log("Filling in ASD details");
        this.assetASDDesc = `Automation_ASD_Single_Equipment_${Date.now()}`;
        console.log(`Generated ASD Description: ${this.assetASDDesc}`);
        await this.descriptionInput.setValue(this.assetASDDesc);
        let i = 2;
        while (true) {
            await this.equipmentComponentInput.click();
            await this.selectEquipmentHeader.waitForDisplayed();
            await this.equipmentRowOption(i).waitForClickable();
            await this.equipmentRowOption(i).click();
            const value = await this.assessmentTemplateInput.getAttribute("value");
            console.log(`Attempted to select equipment at row ${i}, got value: ${value}`);
            if (value && value.trim() !== "") break;
            i++;
        }
        await this.longDescriptionInput.setValue("Long description for ASD - Test");
        console.log("ASD details filled in successfully");
        await utils.clickWithWait(this.createButton);
        console.log("Create button clicked, waiting for ASD to be created");
        await utils.waitForBusyIndicatorToDisappear();
        console.log("ASD creation process completed");
        await this.okBtn.waitForClickable({ timeout: 10000 });
        await this.okBtn.click();
        console.log("OK button clicked, ASD creation confirmed");
        await this.verifyASDCreation();
    }

    private async verifyASDCreation() {
        console.log("Verifying ASD creation in the list view");
        await utils.waitForBusyIndicatorToDisappear();
        if (await this.generalSelectionHeader.isDisplayed()) {
            const items = await this.selectedCheckboxTexts;
            for (let el of items) {
                console.log("Selected: " + await el.getText());
            }
            const isChecked = await this.selectAllToggle.getAttribute("aria-checked");
            if (isChecked === "false") {
                await this.selectAllToggle.click();
            }
            await this.saveButton.click();
            await utils.waitForBusyIndicatorToDisappear();
        } else {
            if (await this.analysisDetailButton.isClickable()) {
                console.log("Creation successful and navigated to detail view");
            }
        }
    }
    

} export default new asset_strategy_development_listview_page();
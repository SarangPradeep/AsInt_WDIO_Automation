import { ChainablePromiseElement } from 'webdriverio';

/**
 * Page Object Model for the Fixed AIP Application within the SAP UI.
 */
class functionalLocationListView {

    /* =========================
        LOCATORS
    ========================== */

    private get asIntLoginLink() { 
        return $('a.saml-login-link'); 
    }

    private get iFrame() { 
        return $('iframe[data-help-id="application-functionallocation-manage"]'); 
    } 

    private readonly busyIndicatorSelector = ".sapUiLocalBusyIndicator"; 

    private get sapBlockLayer() { 
        return $("#sap-ui-blocklayer-popup"); 
    }

    private get okClick() { 
        return $("//button[.//bdi[normalize-space()='OK']]"); 
    }

    private get createButton() { 
        return $("//button[.//bdi[normalize-space()='Create']]"); 
    }

    private get saveButton() { 
        return $("//button[.//bdi[text()='Save']]"); 
    }

    private get skipAndCreateBtn() { 
        return $("//bdi[text()='Skip & Create']"); 
    }

    /* ---------- Inspection Template ---------- */

    private get inspectionTemplateInput() { 
        return $('#__box10-inner'); 
    }

    private get inspectionTemplateArrow() { 
        return $("//span[contains(@id,'box10-arrow')]"); 
    }

    private get shell404Template() {
        return $(
            "//ul[@role='listbox']//li[@role='option'][.//span[normalize-space()='shell 404']]"
        );
    }

    /* ---------- Inspection Type ---------- */

    private get inspectionTypeInput() {
        return $('#__box11-inner');
    }

    private get inspectionTypeArrow() {
        return $("//span[contains(@id,'box11-arrow')]");
    }

    private inspectionTypeOption(typeName: string) {
        return $(
            `//ul[@role='listbox']//li[@role='option'][.//span[normalize-space()='${typeName}']]`
        );
    }

    /* ---------- Stage ---------- */

    private get stageInput() {
        return $('#__box12-inner');
    }

    private get stageArrow() {
        return $("//span[contains(@id,'box12-arrow')]");
    }

    private get outOfServiceStageOption() {
        return $(
            "//ul[@role='listbox']//li[@role='option'][.//span[normalize-space()='Out of Service']]"
        );
    }

    /* ---------- Other Controls ---------- */

    private get assetInspectionApp() { 
        return $("//a[contains(@aria-label, 'Asset Inspection')]"); 
    }

    private get functionalLocationApp() { 
        return $("//a[contains(@aria-label, 'Functional Location')]"); 
    }

    private get descriptionInput() { 
        return $("//label[.//bdi[text()='Description']]/following::input"); 
    }

    private get equipmentInput() { 
        return $("//label[.//bdi[text()='Equipment/Component']]/following::input"); 
    }

    private get equipmentSearchInput() { 
        return $("//div[@role='dialog'][.//span[contains(text(),'Equipment')]]//input[@type='search']"); 
    }

    private get equipmentSearchButton() { 
        return $("//div[@role='dialog'][.//span[contains(text(),'Equipment')]]//input[@type='search']/following-sibling::div[last()]"); 
    }

    private get equipmentRow() {
        return $(
            "//td[@data-sap-ui-column='comasintaismiidms--idEquipmentName']" +
            "//span[normalize-space()='10000027-404-Shell']" +
            "/ancestor::tr"
        );
    }

    private get newFunctionalLocButton() { 
        return $("//span[text()='Add']/ancestor::button"); 
    }

    private get newFunctionalLocName() { 
        return $("//bdi[text()='Functional Location Name']/ancestor::div[1]/following::input[1]"); 
    }

    private get shortDescName() { 
        return $("//bdi[text()='Short Description']/ancestor::div[1]/following::input[1]"); 
    }

    private get selectParentAsset() { 
        return $("//bdi[text()='Parent Asset']/ancestor::div[1]/following::input[1]"); 
    }

    private get selectFuncLocBox() { 
        return $("//span[text()='Select Functional Location']"); 
    }

    private get selectFuncLocText() { 
        return $("//span[text()='Select Functional Location']/ancestor::header/following::input[1]"); 
    }

    private get selectFuncLocSearch() { 
        return $("//span[text()='Select Functional Location']/ancestor::header/following::div[7]"); 
    }

    private get selectFuncLoc() { 
        return $("//td/span[normalize-space()='FL0603']/ancestor::tr"); 
    }

    private get createFuncLocButton() { 
        return $("//bdi[text()='Create']"); 
    }

    private get succCrtMsg() {  
        return $("//span[text()='Functional Location created successfully']"); 
    }

    private get succOKbtn() {  
        return $("//bdi[text()='OK']"); 
    }

    private get funcLocSearch() {  
        return $("//input[@type='search' and @placeholder='Search' and not(@aria-haspopup)]"); 
    }

    private get funcLocSearchBtn() {  
        return $("//input[@type='search' and @placeholder='Search' and not(@aria-haspopup)]//following-sibling::div[2]"); 
    }

    private funcLocSearched(funLocName: string) {  
    return $(`//span[text()='${funLocName}']/ancestor::td`);
    }

    private get funLocGeneralInfoTab() {  
        return $("//bdi[text()='General Information']"); 
    }

    private get equipmentSelect() {  
        return $("//div[text()='Equipment']/ancestor::li"); 
    }

    private functionalLocName!: string;
    private parentFunctionalLoc: string = "FL0603";

    //   UTILITY FUNCTIONS

    public async waitForSAPPopupAndClose(timeoutInSeconds = 30): Promise<void> {
        const popUpCloseBtn = $("//button[@title='Close Lightbox']");
        try {
            if (await popUpCloseBtn.waitForDisplayed({ timeout: timeoutInSeconds * 1000 })) {
                await popUpCloseBtn.click();
            }
        } catch {}
    }

    public async waitForBusyIndicatorToDisappear(timeoutInSeconds = 60): Promise<void> {
        const busy = $(this.busyIndicatorSelector);
        if (!(await busy.isExisting())) return;
        try {
            await busy.waitForDisplayed({
                timeout: timeoutInSeconds * 1000,
                reverse: true
            });
        } catch (e) {
            console.warn('Busy indicator timeout');
        }
    }

    public async waitForFrameAndSwitchToIt(timeoutInSeconds = 30): Promise<void> {
        const frame = await this.iFrame;
        await frame.waitForExist({ timeout: timeoutInSeconds * 1000 });
        await browser.switchFrame(frame);
    }

    public async jsClickElement(element: ChainablePromiseElement): Promise<void> {
        const el = await element;
        await browser.execute((e: HTMLElement) => e.click(), el);
    }

    //   ACTIONS

    public async navigateToFunctionalLocation(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear();
        await this.functionalLocationApp.waitForClickable({ timeout: 100000 });
        await this.functionalLocationApp.click();
        await this.waitForBusyIndicatorToDisappear();
    }

    public async plusIconAndFuncLocSelect(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear();
        await this.newFunctionalLocButton.waitForClickable({ timeout: 100000 });
        await this.newFunctionalLocButton.click();
    }

    public async funcLocSuccCreation(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear();
        await this.succCrtMsg.waitForClickable({ timeout: 100000 });
        await this.succCrtMsg.isDisplayed();
        console.log("Functional Location created successfully");
        await this.succOKbtn.click();
    }

    async closeSapPopupIfPresent(): Promise<void> {
        const selectors = [
            "//button[@title='Close Lightbox']",
            "//button[@aria-label='Close']"
        ];

        for (const selector of selectors) {
            try {
                const element = $(selector);
                if (await element.isDisplayed()) {
                    await element.click();
                    console.log(`[STATUS] Successfully closed SAP popup using selector: ${selector}`);
                    return;
                }
            } catch {}
        }
    }

    public async create_functional_location(): Promise<void> {
        await this.closeSapPopupIfPresent();
        await this.navigateToFunctionalLocation();
        await this.closeSapPopupIfPresent();  
        await this.waitForBusyIndicatorToDisappear();
        await this.waitForFrameAndSwitchToIt();
        await this.closeSapPopupIfPresent(); 
        await this.plusIconAndFuncLocSelect();
        await this.createFunctionalLocation();
    }

    public async searchFunctionalLocation(): Promise<void> {
    await this.waitForBusyIndicatorToDisappear();
    await this.funcLocSearch.setValue(this.functionalLocName);
    await this.funcLocSearchBtn.click();
    await this.waitForBusyIndicatorToDisappear();
    await this.funcLocSearched(this.functionalLocName).click();
    await this.waitForBusyIndicatorToDisappear();
    await this.funLocGeneralInfoTab.isDisplayed();
    }

    public async selectInspectionType(typeName: string): Promise<void> {
        const input = await this.inspectionTypeInput;
        await input.waitForDisplayed({ timeout: 100000 });
        await input.click();

        const arrow = await this.inspectionTypeArrow;
        await arrow.waitForDisplayed({ timeout: 100000 });
        await this.jsClickElement(arrow);

        const option = await this.inspectionTypeOption(typeName);
        await option.waitForDisplayed({ timeout: 100000 });
        await this.jsClickElement(option);

        await input.setValue(typeName);
        await browser.keys(['Enter']);
        await this.waitForBusyIndicatorToDisappear();
    }

    public async selectStageOutOfService(): Promise<void> {
        const input = await this.stageInput;
        await input.waitForDisplayed({ timeout: 100000 });
        await input.click();

        const arrow = await this.stageArrow;
        await arrow.waitForDisplayed({ timeout: 100000 });
        await this.jsClickElement(arrow);

        const option = await this.outOfServiceStageOption;
        await option.waitForDisplayed({ timeout: 100000 });
        await this.jsClickElement(option);

        await input.setValue('Out of Service');
        await browser.keys(['Enter']);
        await this.waitForBusyIndicatorToDisappear();
    }

    private generateRandomFuncName(): string {
        console.log(`FUNC-${Math.floor(Math.random() * 10000)}`);
    return `FUNC-${Math.floor(Math.random() * 10000)}`;
    }

    public async createFunctionalLocation(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear();
        this.functionalLocName = this.generateRandomFuncName();
        await this.newFunctionalLocName.setValue(this.functionalLocName);
        await this.shortDescName.setValue("Testing123");
        await this.selectParentAsset.click();
        await this.selectFuncLocBox.isDisplayed();
        await this.selectFuncLocText.setValue(this.parentFunctionalLoc);
        await this.selectFuncLocSearch.click();
        await this.waitForBusyIndicatorToDisappear();
        await this.selectFuncLoc.waitForClickable({ timeout: 30000 });
        await this.selectFuncLoc.isDisplayed();
        await this.selectFuncLoc.click();
        await this.createFuncLocButton.click();
        await this.funcLocSuccCreation();
    }

    public async submitInspectionCreation(): Promise<void> {
        await this.createButton.waitForClickable({ timeout: 100000 });
        await this.createButton.click();
        await this.waitForBusyIndicatorToDisappear();
        if (await this.skipAndCreateBtn.isDisplayed()) {
            await this.skipAndCreateBtn.click();
            await this.waitForBusyIndicatorToDisappear();
        }
    }
    
    public async clickAsIntLoginLink(): Promise<void> {
        await this.asIntLoginLink.waitForClickable({ timeout: 100000 });
        await this.asIntLoginLink.click();
    }
}

export default new functionalLocationListView();
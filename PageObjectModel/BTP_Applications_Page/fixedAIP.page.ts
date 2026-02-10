import { ChainablePromiseElement } from 'webdriverio';

/**
 * Page Object Model for the Fixed AIP Application within the SAP UI.
 */
class FixedAIPPage {

    /* =========================
        LOCATORS
    ========================== */

    private get asIntLoginLink() { 
        return $('a.saml-login-link'); 
    }

    private get iFrame() { 
        return $('iframe[data-help-id="application-idms-manage"]'); 
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

    private get newAssessmentButton() { 
        return $("//button[@title='New Assessment']"); 
    }

    private get equipmentSelect() { 
        return $("//div[text()='Equipment']/ancestor::li"); 
    }

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
        await browser.switchFrame(null);
        await browser.switchFrame(frame);
    }

    public async jsClickElement(element: ChainablePromiseElement): Promise<void> {
        const el = await element;
        await browser.execute((e: HTMLElement) => e.click(), el);
    }

    //   ACTIONS

    public async navigateToAssetInspection(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear();
        await this.assetInspectionApp.waitForClickable({ timeout: 20000 });
        await this.assetInspectionApp.click();
        await this.waitForFrameAndSwitchToIt(60);
    }

    public async plusIconAndEquipSelect(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear();
        await this.newAssessmentButton.waitForClickable({ timeout: 20000 });
        await this.newAssessmentButton.click();
        await this.equipmentSelect.waitForDisplayed();
        await this.equipmentSelect.click();
    }

    public async selectInspectionType(typeName: string): Promise<void> {
        const input = await this.inspectionTypeInput;
        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();

        const arrow = await this.inspectionTypeArrow;
        await arrow.waitForDisplayed({ timeout: 10000 });
        await this.jsClickElement(arrow);

        const option = await this.inspectionTypeOption(typeName);
        await option.waitForDisplayed({ timeout: 10000 });
        await this.jsClickElement(option);

        await input.setValue(typeName);
        await browser.keys(['Enter']);
        await this.waitForBusyIndicatorToDisappear();
    }

    public async selectStageOutOfService(): Promise<void> {
        const input = await this.stageInput;
        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();

        const arrow = await this.stageArrow;
        await arrow.waitForDisplayed({ timeout: 10000 });
        await this.jsClickElement(arrow);

        const option = await this.outOfServiceStageOption;
        await option.waitForDisplayed({ timeout: 10000 });
        await this.jsClickElement(option);

        await input.setValue('Out of Service');
        await browser.keys(['Enter']);
        await this.waitForBusyIndicatorToDisappear();
    }

    public async createInspection(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear();
        await this.descriptionInput.setValue("PUMPS");

        await this.equipmentInput.click();
        
        // Wait for the dialog search input to be ready
        await this.equipmentSearchInput.waitForDisplayed({ timeout: 20000 });
        await this.equipmentSearchInput.setValue("10000027");
        await this.equipmentSearchButton.click();

        // CLEAN FIX: Wait for the busy indicator to finish loading results
        await this.waitForBusyIndicatorToDisappear(60);

        // CLEAN FIX: Wait for the equipment row to exist AND be clickable
        await this.equipmentRow.waitForExist({ timeout: 20000 });
        await this.equipmentRow.scrollIntoView();
        await this.equipmentRow.waitForClickable({ 
            timeout: 20000,
            timeoutMsg: 'Equipment row results not clickable after search'
        });
        await this.equipmentRow.click();

        await this.waitForBusyIndicatorToDisappear(30);

        const templateInput = await this.inspectionTemplateInput;
        await templateInput.waitForDisplayed({ timeout: 10000 });
        await templateInput.click();

        const templateArrow = await this.inspectionTemplateArrow;
        await templateArrow.waitForDisplayed({ timeout: 10000 });
        await this.jsClickElement(templateArrow);

        const template = await this.shell404Template;
        await template.waitForDisplayed({ timeout: 10000 });
        await this.jsClickElement(template);

        await templateInput.setValue('shell 404');
        await browser.keys(['Enter']);

        await this.selectInspectionType('Vibration Analysis');
        await this.selectStageOutOfService();
    }

    public async submitInspectionCreation(): Promise<void> {
        await this.createButton.waitForClickable({ timeout: 20000 });
        await this.createButton.click();
        await this.waitForBusyIndicatorToDisappear();
        if (await this.skipAndCreateBtn.isDisplayed()) {
            await this.skipAndCreateBtn.click();
            await this.waitForBusyIndicatorToDisappear();
        }
    }
    
    public async clickAsIntLoginLink(): Promise<void> {
        await this.asIntLoginLink.waitForClickable({ timeout: 30000 });
        await this.asIntLoginLink.click();
    }
}

export default new FixedAIPPage();
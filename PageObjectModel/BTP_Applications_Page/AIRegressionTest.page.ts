import { ChainablePromiseElement } from 'webdriverio';

class AIRegressionTestPage {

    /* =========================
    LOCATORS
    ========================== */

    /* ---------- Segmented Buttons ---------- */
    private get assetInspectionFindingsSegment() { return $("//li[@role='option' and contains(@class,'sapMSegBBtn')][.//div[@class='sapMSegBBtnInner' and starts-with(normalize-space(),'Findings')]]"); }

    /* ---------- Finding Selection ---------- */
    private get firstNewFindingCheckbox() { return $("(//tr[.//span[contains(normalize-space(),'New')]]//div[@role='checkbox'])[1]"); }
    private findingCheckboxByEquipment(equipmentId: string) { return $(`//tr[.//span[starts-with(normalize-space(),'${equipmentId}')]]//div[@role='checkbox']`); }

    /* ---------- Finding Radio ---------- */
    private get firstFindingRadio() { return $("//div[@role='radio' and contains(@id,'selectSingle')]"); }

    /* ---------- Convert ---------- */
    private get convertButton() { return $("(//button[.//bdi[normalize-space()='Convert']])[1]"); }
    private get recommendationMenuItem() { return $("//li[@role='menuitem']//div[normalize-space()='Recommendation']"); }

    /* ---------- Recommendation Form ---------- */
    private get objectTypeInput() { return $("//label[.//bdi[text()='Object Type']]/following::input[1]"); }
    private get readOnlyInput() { return $("(//input[@readonly='readonly'])[1]"); }
    private get shortDescriptionInput() { return $("//label[.//bdi[text()='Short Description']]/following::input[1]"); }
    private get longDescriptionInput() { return $("//label[.//bdi[text()='Long Description']]/following::textarea[1]"); }
    private get typeInput() { return $("//label[.//bdi[text()='Type']]/following::input[1]"); }
    private get assessmentTemplateInput() { return $("//label[.//bdi[text()='Assessment Template']]/following::input[1]"); }

    /* ---------- Popup ---------- */
    private get inspectionSuccessOkButton() { return $("//button[.//bdi[normalize-space()='OK']]"); }
    private get okButton() { return $("//button[.//bdi[text()='OK']]"); }

    /* ---------- Login / Frame ---------- */
    private get asIntLoginLink() { return $('a.saml-login-link'); }
    private get iFrame() { return $('iframe[data-help-id="application-idms-manage"]'); }

    /* ---------- Busy ---------- */
    private readonly busyIndicatorSelector = ".sapUiLocalBusyIndicator";

    /* ---------- Inspection Creation ---------- */
    private get inspectionCreateButton() { return $("//footer//button[.//bdi[normalize-space()='Create']]"); }
    private get skipAndCreateBtn() { return $("//bdi[text()='Skip & Create']"); }

    /* ---------- Inspection Template ---------- */
    private get inspectionTemplateInput() { return $('#__box10-inner'); }
    private get inspectionTemplateArrow() { return $("//span[contains(@id,'box10-arrow')]"); }
    private get shell404Template() { return $("//ul[@role='listbox']//li[@role='option'][.//span[normalize-space()='shell 404']]"); }

    /* ---------- Inspection Type ---------- */
    private get inspectionTypeInput() { return $('#__box11-inner'); }
    private get inspectionTypeArrow() { return $("//span[contains(@id,'box11-arrow')]"); }
    private inspectionTypeOption(typeName: string) { return $(`//ul[@role='listbox']//li[@role='option'][.//span[normalize-space()='${typeName}']]`); }

    /* ---------- Stage ---------- */
    private get stageInput() { return $('#__box12-inner'); }
    private get stageArrow() { return $("//span[contains(@id,'box12-arrow')]"); }
    private get outOfServiceStageOption() { return $("//ul[@role='listbox']//li[@role='option'][.//span[normalize-space()='Out of Service']]"); }

    /* ---------- Common ---------- */
    private get assetInspectionApp() { return $("//a[contains(@aria-label, 'Asset Inspection')]"); }
    private get descriptionInput() { return $("//label[.//bdi[text()='Description']]/following::input"); }
    private get equipmentInput() { return $("//label[.//bdi[text()='Equipment/Component']]/following::input"); }
    private get equipmentSearchInput() { return $("//div[@role='dialog'][.//span[contains(text(),'Equipment')]]//input[@type='search']"); }
    private get equipmentSearchButton() { return $("//div[@role='dialog'][.//span[contains(text(),'Equipment')]]//input[@type='search']/following-sibling::div[last()]"); }
    private get equipmentRow() { return $("//td[@data-sap-ui-column='comasintaismiidms--idEquipmentName']//span[normalize-space()='10000027-404-Shell']/ancestor::tr"); }

    /* ---------- Search ---------- */
    private get searchInput() { return $('input[aria-label="Search"]'); }
    private inspectionRowByEquipment(equipmentId: string) { return $(`//td[@data-sap-ui-column='application-idms-manage-component---idInspectionListPage--equipment']//span[starts-with(normalize-space(),'${equipmentId}')]/ancestor::tr`); }

    /* ---------- Findings ---------- */
    private get findingsTab() { return $("//button[.//bdi[normalize-space()='Findings']]"); }
    private get newFindingButton() { return $("//button[.//bdi[normalize-space()='New']]"); }
    private get activeSwitch() { return $("//label[.//bdi[text()='Active']]/following::div[@role='switch'][1]"); }
    private get findingNameInput() { return $("//label[.//bdi[text()='Finding Name']]/following::input[1]"); }
    private get findingTypeInput() { return $("//label[.//bdi[text()='Finding Type']]/following::input[1]"); }
    private get dateRecordedInput() { return $("//label[.//bdi[text()='Date Recorded']]/following::input[1]"); }
    private get assignFindingInput() { return $("//label[.//bdi[text()='Assign Finding to']]/following::input[1]"); }
    private get damageClassInput() { return $("//label[.//bdi[text()='Damage Class']]/following::input[1]"); }
    private get damageTypeInput() { return $("//label[.//bdi[text()='Damage Type']]/following::input[1]"); }
    private get envClassInput() { return $("//label[.//bdi[text()='Environment Classification']]/following::input[1]"); }
    private get findingEquipmentInput() { return $("//label[.//bdi[text()='Equipment']]/following::input[1]"); }

    /* ---------- Dialog ---------- */
    private get dialogSearchInput() { return $("//div[@role='dialog']//input[@placeholder='Search']"); }
    private get dialogSearchButton() { return $("//div[@role='dialog']//input[@placeholder='Search']/following-sibling::div[last()]"); }
    private equipmentRowInDialog(equipmentId: string) { return $(`//div[@role='dialog']//td[@role='gridcell'][.//span[starts-with(normalize-space(),'${equipmentId}')]]`); }
    private get findingCreateButton() { return $("//div[@role='dialog']//button[.//bdi[text()='Create']]"); }

    /* ---------- Assessment ---------- */
    private get newAssessmentButton() { return $("//button[@title='New Assessment']"); }
    private get equipmentSelect() { return $("//div[text()='Equipment']/ancestor::li"); }

    /* =========================
    UTILITY FUNCTIONS
    ========================== */

    public async waitForBusyIndicatorToDisappear(timeoutInSeconds = 60): Promise<void> {
        const busy = $(this.busyIndicatorSelector);
        if (!(await busy.isExisting())) return;
        try {
            await busy.waitForDisplayed({ timeout: timeoutInSeconds * 1000, reverse: true });
        } catch (e) {
            console.warn('Busy indicator did not disappear within timeout');
        }
    }

    public async jsClickElement(element: ChainablePromiseElement): Promise<void> {
        const el = await element;
        await browser.execute((e: HTMLElement) => e.click(), el);
    }

    public async waitForFrameAndSwitchToIt(timeoutInSeconds = 30): Promise<void> {
        const frame = await this.iFrame;
        await frame.waitForExist({ timeout: timeoutInSeconds * 1000 });
        await browser.switchFrame(null);
        await browser.switchFrame(frame);
    }

    public async handleInspectionSuccessPopup(timeoutInSeconds = 30): Promise<void> {
        try {
            const okBtn = await this.inspectionSuccessOkButton;
            await okBtn.waitForDisplayed({ timeout: timeoutInSeconds * 1000 });
            await okBtn.waitForClickable({ timeout: 10000 });
            await okBtn.click();
            await this.waitForBusyIndicatorToDisappear(30);
        } catch (error) {
            console.warn('Inspection success popup not displayed, continuing...');
        }
    }

    public async waitForSAPPopupAndClose(timeoutInSeconds = 30): Promise<void> {
        const popUpCloseBtn = $("//button[@title='Close Lightbox']");
        try {
            if (await popUpCloseBtn.waitForDisplayed({ timeout: timeoutInSeconds * 1000 })) {
                await popUpCloseBtn.click();
            }
        } catch {}
    }

    /* =========================
    ACTIONS
    ========================== */

    public async createInspection(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear();
        await this.descriptionInput.setValue("PUMPS");

        await this.equipmentInput.click();
        
        // Wait for search dialog to be ready
        await this.equipmentSearchInput.waitForDisplayed({ timeout: 20000 });
        await this.equipmentSearchInput.setValue("10000027");
        await this.equipmentSearchButton.click();

        // Dynamically wait for results instead of browser.pause(10000)
        await this.waitForBusyIndicatorToDisappear(60);

        await this.equipmentRow.waitForExist({ timeout: 20000 });
        await this.equipmentRow.scrollIntoView();
        await this.equipmentRow.waitForClickable({ timeout: 20000 });
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

    public async convertFindingToRecommendation(equipmentId: string): Promise<void> {
        await this.convertButton.waitForClickable({ timeout: 30000 });
        await this.convertButton.click();

        await browser.pause(500); // SAP menu animation

        await this.recommendationMenuItem.waitForDisplayed({ timeout: 20000 });
        await this.jsClickElement(this.recommendationMenuItem);

        await this.waitForBusyIndicatorToDisappear(60);

        await this.objectTypeInput.waitForDisplayed({ timeout: 20000 });
        await this.objectTypeInput.setValue('Equipment');

        await this.readOnlyInput.click();
        await this.waitForBusyIndicatorToDisappear(60);
        
        // Wait for the Equipment search dialog specifically
        await this.equipmentSearchInput.waitForExist({ timeout: 20000 });
        await this.equipmentSearchInput.waitForDisplayed({ timeout: 20000 });

        // Using parameter equipmentId instead of hardcoded '10000088'
        await this.equipmentSearchInput.setValue(equipmentId);
        await this.equipmentSearchButton.click();

        await this.waitForBusyIndicatorToDisappear(60);

        const row = this.equipmentRowInDialog(equipmentId);
        await row.waitForClickable({ timeout: 30000 });
        await row.click();

        await this.waitForBusyIndicatorToDisappear(60);

        await this.shortDescriptionInput.setValue('Testing Short Desc');
        await this.longDescriptionInput.setValue('Testing Long Desc');
        await this.typeInput.setValue('Improvement');
        await this.assessmentTemplateInput.setValue('Regulatory / Legal');

        await this.convertButton.waitForClickable({ timeout: 30000 });
        await this.convertButton.click();

        await this.waitForBusyIndicatorToDisappear(60);

        await this.okButton.waitForClickable({ timeout: 20000 });
        await this.okButton.click();

        await this.waitForBusyIndicatorToDisappear(60);
    }

    public async reOpenAssetInspection(): Promise<void> {
        await browser.switchFrame(null);
        await this.waitForBusyIndicatorToDisappear(60);

        // Ensure Tile is clickable
        await this.assetInspectionApp.waitForExist({ timeout: 30000 });
        await this.assetInspectionApp.scrollIntoView();
        await this.assetInspectionApp.waitForClickable({ timeout: 30000 });
        await this.assetInspectionApp.click();

        await this.waitForFrameAndSwitchToIt(60);

        await this.searchInput.waitForDisplayed({
            timeout: 60000,
            timeoutMsg: 'Asset Inspection list page did not load'
        });

        await this.waitForBusyIndicatorToDisappear(60);
    }

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

    public async submitInspectionCreation(): Promise<void> {
        await this.inspectionCreateButton.waitForClickable({ timeout: 20000 });
        await this.inspectionCreateButton.click();
        await this.waitForBusyIndicatorToDisappear();

        if (await this.skipAndCreateBtn.isDisplayed()) {
            await this.skipAndCreateBtn.click();
            await this.waitForBusyIndicatorToDisappear();
        }

        await this.handleInspectionSuccessPopup();
        await this.navigateBackToHome();
    }

    public async navigateBackToHome(): Promise<void> {
        await browser.switchFrame(null);
        await browser.url('https://apm-02-asint.launchpad.cfapps.us10.hana.ondemand.com');
        await this.waitForBusyIndicatorToDisappear(60);
        await this.assetInspectionApp.waitForDisplayed({
            timeout: 30000,
            timeoutMsg: 'Launchpad did not load after navigation'
        });
    }

    public async openFindingsFromAssetInspectionHome(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear(60);
        const findingsBtn = await this.assetInspectionFindingsSegment;
        await findingsBtn.waitForDisplayed({ timeout: 30000 });
        await findingsBtn.scrollIntoView();
        await findingsBtn.click();
        await browser.pause(200);
        await browser.keys(['Space']); 
        await this.waitForBusyIndicatorToDisappear(60);
    }

    public async searchAndOpenInspection(equipmentId: string): Promise<void> {
        await this.searchInput.waitForDisplayed({ timeout: 30000 });
        await this.searchInput.setValue(equipmentId);
        await browser.keys('Enter');
        await this.waitForBusyIndicatorToDisappear(60);

        const row = this.inspectionRowByEquipment(equipmentId);
        await row.waitForClickable({ timeout: 30000 });
        await row.scrollIntoView();
        await row.click();

        await browser.waitUntil(
            async () => await this.findingsTab.isExisting(),
            { timeout: 90000, timeoutMsg: 'Inspection detail page did not load' }
        );
        await this.waitForBusyIndicatorToDisappear(60);
    }

    public async openFindingsTab(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear(60);
        await this.findingsTab.waitForClickable({ timeout: 60000 });
        await this.findingsTab.scrollIntoView();
        await this.findingsTab.click();
        await this.waitForBusyIndicatorToDisappear(60);
    }

    public async selectCreatedFindingCheckbox(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear(60);
        const checkbox = await this.firstNewFindingCheckbox;
        await checkbox.waitForDisplayed({ timeout: 30000 });
        await checkbox.scrollIntoView();

        await browser.execute((el) => {
            el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
            el.click();
        }, checkbox);

        await browser.waitUntil(
            async () => (await checkbox.getAttribute('aria-checked')) === 'true',
            { timeout: 10000, timeoutMsg: 'Checkbox not selected' }
        );
        await this.waitForBusyIndicatorToDisappear(30);
    }

    public async createFinding(equipmentId: string): Promise<void> {
        await this.newFindingButton.waitForClickable({ timeout: 30000 });
        await this.newFindingButton.click();
        await this.waitForBusyIndicatorToDisappear(60);

        await this.activeSwitch.waitForClickable({ timeout: 10000 });
        await this.activeSwitch.click();

        await this.findingNameInput.setValue('Automation Testing');
        await this.findingTypeInput.setValue('testing');
        await this.dateRecordedInput.setValue('Dec 16, 2025');
        await this.assignFindingInput.setValue('Shaik Thahaseen');
        await this.damageClassInput.setValue('Minor degradation');
        await this.damageTypeInput.setValue('Mechanical Damage');
        await this.envClassInput.setValue('C5');

        await this.findingEquipmentInput.click();
        await this.dialogSearchInput.waitForDisplayed({ timeout: 10000 });
        await this.dialogSearchInput.setValue(equipmentId);
        await this.dialogSearchButton.click();
        await this.waitForBusyIndicatorToDisappear(60);

        const cell = this.equipmentRowInDialog(equipmentId);
        await cell.waitForClickable({ timeout: 30000 });
        await cell.click();

        await this.findingCreateButton.click();
        await this.waitForBusyIndicatorToDisappear(60);

        await this.handleInspectionSuccessPopup();
        await this.navigateBackToHome();

        await this.reOpenAssetInspection();
        await this.openFindingsFromAssetInspectionHome();
        await this.selectCreatedFindingCheckbox();
        await this.convertFindingToRecommendation(equipmentId);
        await this.revisitCreatedInspection(equipmentId);
        await this.deleteInspection();
    }

    public async revisitCreatedInspection(equipmentId: string): Promise<void> {
        await this.navigateBackToHome();
        await this.reOpenAssetInspection();
        await this.searchAndOpenInspection(equipmentId);
    }

    public async clickAsIntLoginLink(): Promise<void> {
        await this.asIntLoginLink.waitForClickable({ timeout: 30000 });
        await this.asIntLoginLink.click();
    }

    public async deleteInspection(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear(60);
        const deleteBtn = await $("//button[.//bdi[normalize-space()='Delete']]");
        await deleteBtn.waitForClickable({ timeout: 30000 });
        await deleteBtn.click();

        const yesBtn = await $("//button[.//bdi[normalize-space()='Yes']]");
        await yesBtn.waitForClickable({ timeout: 30000 });
        await yesBtn.click();
        await this.waitForBusyIndicatorToDisappear(60);

        const okBtn = await $("//button[.//bdi[normalize-space()='OK']]");
        await okBtn.waitForClickable({ timeout: 30000 });
        await okBtn.click();
        await this.waitForBusyIndicatorToDisappear(60);
    }
}

export default new AIRegressionTestPage();
import { ChainablePromiseElement } from 'webdriverio';

/**
 * Page Object Model for the Fixed AIP Application within the SAP UI.
 */
class FixedAIPPage {

    // SELECTORS

    private get asIntLoginLink() { return $('a.saml-login-link'); }
    private get iFrame() { return $('iframe[data-help-id="application-idms-manage"]'); }
    private readonly busyIndicatorSelector = ".sapUiLocalBusyIndicator";
    // private get sapBlockLayer() { return $("#sap-ui-blocklayer-popup"); }
    private get okClick() { return $("//button[.//bdi[normalize-space()='OK']]"); }
    private get createButton() { return $("//button[.//bdi[normalize-space()='Create']]"); }
    //private get saveButton() { return $("//button[.//bdi[text()='Save']]"); }
    private get skipAndCreateBtn() { return $("//bdi[text()='Skip & Create']"); }

    private get mandatoryFieldsErrorText() { return $("//span[contains(@class,'sapMMsgBoxText') and normalize-space()='Please fill all mandatory fields']"); }

    private get inspectionTemplateInput() { return $('#__box10-inner'); }
    // private get inspectionTemplateArrow() { return $("//span[contains(@id,'box10-arrow')]"); }
    // private get shell404Template() { return $("//ul[@role='listbox']//li[@role='option'][.//span[normalize-space()='shell 404']]"); }

    private get inspectionTypeInput() { return $('#__box11-inner'); }
    private get inspectionTypeArrow() { return $("//span[contains(@id,'box11-arrow')]"); }
    private inspectionTypeOption(typeName: string) { return $(`//ul[@role='listbox']//li[@role='option'][.//span[normalize-space()='${typeName}']]`); }

    private get stageInput() { return $('#__box12-inner'); }
    private get stageArrow() { return $("//span[contains(@id,'box12-arrow')]"); }
    private get outOfServiceStageOption() { return $("//ul[@role='listbox']//li[@role='option'][.//span[normalize-space()='Out of Service']]"); }

    private get assetInspectionApp() { return $("//a[contains(@aria-label, 'Asset Inspection')]"); }
    private get descriptionInput() { return $("//label[.//bdi[text()='Description']]/following::input"); }
    private get equipmentInput() { return $("//label[.//bdi[text()='Equipment/Component']]/following::input"); }
    private get equipmentSearchInput() { return $("//div[@role='dialog'][.//span[contains(text(),'Equipment')]]//input[@type='search']"); }
    private get equipmentSearchButton() { return $("//div[@role='dialog'][.//span[contains(text(),'Equipment')]]//input[@type='search']/following-sibling::div[last()]"); }
private get equipmentRow() {
    return $(
        "//td[@data-sap-ui-column='comasintaismiidms--idEquipmentName']" +
        "//span[normalize-space()='10000027-404-Shell']" +
        "/ancestor::tr"
    );
}    private get newAssessmentButton() { return $("//button[@title='New Assessment']"); }
    private get equipmentSelect() { return $("//div[text()='Equipment']/ancestor::li"); }


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
        const endTime = Date.now() + timeoutInSeconds * 1000;

        while (Date.now() < endTime) {
            const busyList = await $$(this.busyIndicatorSelector);
            let isAnyVisible = false;

            for (const busy of busyList) {
                if (await busy.isDisplayed()) {
                    isAnyVisible = true;
                    break;
                }
            }

            if (!isAnyVisible) break;
            await browser.pause(500);
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
        await this.assetInspectionApp.click();
        await this.waitForFrameAndSwitchToIt(60);
    }

    public async plusIconAndEquipSelect(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear();
        await this.newAssessmentButton.click();
        await this.equipmentSelect.waitForDisplayed();
        await this.equipmentSelect.click();
    }

    public async selectInspectionType(typeName: string): Promise<void> {
        const input = await this.inspectionTypeInput;
        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();
        await browser.pause(300);

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
        await browser.pause(300);

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
        await this.equipmentSearchInput.setValue("10000027");
        await this.equipmentSearchButton.click();

        await browser.pause(10000);
        await this.equipmentRow.waitForClickable({ timeout: 15000 });
        await this.equipmentRow.click();

        await this.waitForBusyIndicatorToDisappear(30);

        const templateInput = await this.inspectionTemplateInput;
        await templateInput.waitForDisplayed({ timeout: 10000 });
        await templateInput.click();

        // await this.jsClickElement(this.inspectionTemplateArrow);
        // await this.jsClickElement(this.shell404Template);

        // await templateInput.setValue('shell 404');
        // await browser.keys(['Enter']);

        // await this.selectInspectionType('Vibration Analysis');
        // await this.selectStageOutOfService();
    }

    public async submitInspectionCreation(): Promise<void> {
        await this.createButton.click();
        await this.waitForBusyIndicatorToDisappear();
        if (await this.skipAndCreateBtn.isDisplayed()) {
            await this.skipAndCreateBtn.click();
        }
    }

    //  NEGATIVE VALIDATION METHOD 

    public async validateMandatoryFieldsPopup(): Promise<boolean> {
        try {
            await this.mandatoryFieldsErrorText.waitForDisplayed({ timeout: 5000 });
            await this.okClick.click();
            await this.waitForBusyIndicatorToDisappear();
            return true;
        } catch {
            return false;
        }
    }

    public async clickAsIntLoginLink(): Promise<void> {
        await this.asIntLoginLink.waitForClickable({ timeout: 30000 });
        await this.asIntLoginLink.click();
    }
}

export default new FixedAIPPage();

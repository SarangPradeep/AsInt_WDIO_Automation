import { $, browser } from '@wdio/globals';
import SapUtils from '../../../utils/utils';

class MatricesPage {

    /* ========================
       SELECTORS
       ======================== */

    private get header() { return $('//h1[contains(text(),"Configuration")]');}
    private get matricesTile() { return $('//div[@role="button"][.//span[normalize-space()="Matrices"]]');}
    private get iFrame() { return $('iframe[title="Application"]');}
    private get createButton() { return $('button[aria-label="Create"]'); }
    private get matrixTitleInput() { return $('input[aria-labelledby="__label4"]'); }
    private get categoryValueHelpIcon() { return $('#idCategoryMultiInput-vhi'); }
    private get categoryCheckbox() { return $('div[id*="selectMulti-CbBg"]'); }
    private get selectButton() { return $('//bdi[normalize-space()="Select"]/ancestor::button'); }
    private get rowSizeIncrement() { return $('#idMatrixStep1-incrementBtn'); }
    private get columnSizeIncrement() { return $('#idMatrixStep2-incrementBtn'); }
    private get saveButton() { return $('//bdi[normalize-space()="Save"]/ancestor::button'); }
    private get OkButton() { return $('//bdi[text()="OK"]/ancestor::button'); }
    private get createdMatrix() { return $('//span[normalize-space()="AutomationMatrixTest"]'); }
    private get editButton() { return $('button[aria-label="Edit"]'); }
    private get descriptionTextarea() { return $('#idDetailDescTextArea-inner'); }
    private get matrixTitleEditInput() { return $('input.sapMInputBaseInner'); }    
    private get addRiskColorButton() { return $('button[aria-label="Add Risk Color"]'); }
    private get riskColorDescriptionInput() { return $('//div[contains(@class,"sapMDialog")]//input[contains(@class,"sapMInputBaseInner")]'); }
    private get colorPickerButton() { return $('.asintRbiColorBtn'); }
    private getColorOption(color: string) { return $(`div[style*="${color}"]`); }   
    private get saveRiskColorButton() {  return $('//div[contains(@class,"sapMDialog")]//bdi[normalize-space()="Save"]/ancestor::button'); }    
    private get addXAxisButton() { return $('button[aria-label="Add"]'); }
    private get xAxisDescriptionInput() { return $('//input[@class="sapMInputBaseInner" and @type="text"]'); }
    private get displayTextToggle() { return $('//*[normalize-space()="Display Text"]/following::div[@role="switch"][1]'); }
    private get descendingToggle() { return $('#__switch3'); }
    getMatrixInput(row: number) { return $(`#__input3-__table0-${row}-inner`);}
    private get yAxisAddButton() { return $('(//button[@title="Add"])[2]'); }
    private get yAxisDescriptionInput() { return $('//input[@class="sapMInputBaseInner" and @type="text"]'); }
    private get yAxisDisplayTextToggle() { return $('//*[normalize-space()="Display Text"]/following::div[@role="switch"][1]'); }
    private get addRiskLineButton() { return $('button[aria-label="Add Risk Line"]'); }
    private get riskLineDescriptionInput() { return $('//div[@role="dialog"]//input[@type="text"]'); }
    private get yAxisDropdownArrow() { return $('(//div[@role="dialog"]//span[contains(@class, "sapMSltArrow")])[1]'); }
    private get xAxisDropdownArrow() { return $('(//div[@role="dialog"]//span[contains(@class, "sapMSltArrow")])[2]'); }
    private get yAxisLabelOption() { return $('(//li[@role="option" and text()="Y-Axis Label"])[last()]'); }
    private get xAxisDescriptionOption() { return $('(//li[@role="option" and text()="description"])[last()]'); }
    private get startXInput() { return $('(//div[@role="dialog"]//input[@type="number"])[1]'); }
    private get startYInput() { return $('(//div[@role="dialog"]//input[@type="number"])[2]'); }
    private get endXInput() { return $('(//div[@role="dialog"]//input[@type="number"])[3]'); }
    private get endYInput() { return $('(//div[@role="dialog"]//input[@type="number"])[4]'); }
    private get publishButton() { return $('//bdi[normalize-space()="Publish"]/ancestor::button'); }
    private getMatrixCell(x: string, y: string) { return $(`rect[x="${x}"][y="${y}"]`); }
    private get riskColorsExpandButton() { return $('(//button[@title="Expand/Collapse"])[2]'); }
    private getRiskColorSelectButton(index: number) { return $(`button[title="Select"][id$="-${index}"]`); }
    private get colorSelectionSaveButton() { return $('//button[contains(@class, "sapMBtnInverted") and descendant::bdi[normalize-space()="Save"]]'); }
    private get yesConfirmationButton() { return $('//bdi[normalize-space()="Yes"]/ancestor::button'); }
    private get createdMatrixCheckbox() { return $('//span[normalize-space()="AutomationMatrixTest"]/ancestor::tr//div[contains(@class, "sapMCbBg")]'); }
    private get matrixSettingsButton() { return $('button[title="Settings"]'); }


    /* ========================
       ACTIONS
       ======================== */

    async isAppLoaded(): Promise<boolean> {
        try {
            const hd = await this.header;
            await hd.waitForDisplayed({ timeout: 20000 });
            return true;
        } catch {
            return false;
        }
    }

    async clickOkButton(): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();
        await SapUtils.clickWithWait(this.OkButton);
        console.log('[ACTION] OK button clicked after upload');
        await SapUtils.waitForBusyIndicatorToDisappear();
    }

    async navigateToMatrices(): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();
        await SapUtils.waitForSAPPopupAndClose();
        await SapUtils.switchToIframe(this.iFrame);
        await SapUtils.waitForBusyIndicatorToDisappear();

        await SapUtils.clickWithWait(this.matricesTile);
        console.log('[ACTION] Matrices tile clicked');

        await SapUtils.waitForBusyIndicatorToDisappear();
    }

    async clickCreateButton(): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();
        await SapUtils.clickWithWait(this.createButton);
        console.log('[ACTION] Create (+) button clicked');
        await SapUtils.waitForBusyIndicatorToDisappear();
    }

    async createMatrix(): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();

        await SapUtils.setValueWithWait(this.matrixTitleInput, 'AutomationMatrixTest');
        console.log('[ACTION] Matrix title entered');

        await SapUtils.clickWithWait(this.categoryValueHelpIcon);
        console.log('[ACTION] Category value help opened');

        await SapUtils.clickWithWait(this.categoryCheckbox);
        console.log('[ACTION] Category selected');

        await SapUtils.clickWithWait(this.selectButton);
        console.log('[ACTION] Select button clicked');

        await SapUtils.clickWithWait(this.rowSizeIncrement);
        console.log('[ACTION] Row size increased');

        await SapUtils.clickWithWait(this.columnSizeIncrement);
        console.log('[ACTION] Column size increased');

        await SapUtils.clickWithWait(this.saveButton);
        console.log('[ACTION] Matrix saved');

        await SapUtils.waitForBusyIndicatorToDisappear();
    }

    async openCreatedMatrix(): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();
        await SapUtils.clickWithWait(this.createdMatrix);
        console.log('[ACTION] Created Matrix opened');
        await SapUtils.waitForBusyIndicatorToDisappear();
    }

    async editMatrix(): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();

        await SapUtils.clickWithWait(this.editButton);
        console.log('[ACTION] Edit button clicked');

        await SapUtils.setValueWithWait(this.descriptionTextarea, 'description');
        console.log('[ACTION] Description entered');

        await SapUtils.setValueWithWait(this.matrixTitleEditInput, 'AutomationMatrixTest_007');
        console.log('[ACTION] Matrix title updated');

        await SapUtils.clickWithWait(this.saveButton);
        console.log('[ACTION] Save button clicked');

        await SapUtils.clickWithWait(this.OkButton);
        console.log('[ACTION] Update confirmation accepted');

        await SapUtils.waitForBusyIndicatorToDisappear();
    }

    async addRiskColor(description: string, color: string): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();

        await SapUtils.clickWithWait(this.addRiskColorButton);
        console.log('[ACTION] Add Risk Color button clicked');

        await SapUtils.setValueWithWait(this.riskColorDescriptionInput, description);
        console.log(`[ACTION] Description entered: ${description}`);

        await SapUtils.clickWithWait(this.colorPickerButton);
        console.log('[ACTION] Color picker opened');

        await SapUtils.clickWithWait(this.getColorOption(color));
        console.log(`[ACTION] Color selected: ${color}`);

        await SapUtils.clickWithWait(this.saveRiskColorButton);
        await SapUtils.clickWithWait(this.OkButton);

        await SapUtils.waitForBusyIndicatorToDisappear();
    }

    async assignColorToCells(colorIndex: number, cellCoordinates: {x: string, y: string}[]): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();

        // 1. Expand the Risk Colors panel first
        const expandBtn = await this.riskColorsExpandButton;
        await expandBtn.waitForDisplayed({ timeout: 20000 });
        
        const isExpanded = await expandBtn.getAttribute('aria-expanded');
        if (isExpanded === 'false') {
            await SapUtils.clickWithWait(expandBtn, 1000); // 1000ms delayAfter for animation
            console.log('[ACTION] Risk Colors panel expanded');
        }

        // 2. Click the specific color's Select button
        await SapUtils.clickWithWait(this.getRiskColorSelectButton(colorIndex), 500);
        console.log(`[ACTION] Color Select button for index ${colorIndex} clicked`);

        // 3. Loop through the SVG coordinates and click each cell
        for (const coord of cellCoordinates) {
            const cell = await this.getMatrixCell(coord.x, coord.y);
            await SapUtils.clickWithWait(cell, 500); 
            console.log(`[ACTION] Colored matrix cell at X:${coord.x}, Y:${coord.y}`);
        }
        
        // 4. Save and Confirm the color selection
        await SapUtils.clickWithWait(this.colorSelectionSaveButton);
        await SapUtils.clickWithWait(this.OkButton);

        await SapUtils.waitForBusyIndicatorToDisappear();
    }

    async configureXAxis(description: string, shouldEnable: boolean): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();

        await SapUtils.clickWithWait(this.addXAxisButton);
        console.log('[ACTION] X-Axis Add button clicked');

        await SapUtils.setValueWithWait(this.xAxisDescriptionInput, 'description');
        console.log(`[ACTION] X-Axis description entered: ${description}`);

        const toggle = await this.displayTextToggle;
        await toggle.waitForDisplayed({ timeout: 20000 });
        const isEnabled = await toggle.getAttribute('aria-checked') === 'true';
        console.log(`[INFO] Current toggle state: ${isEnabled ? 'YES' : 'NO'}`);

        if (isEnabled !== shouldEnable) {
            await SapUtils.clickWithWait(toggle);
            console.log(`[ACTION] Toggle switched to ${shouldEnable ? 'YES' : 'NO'}`);
        } else {
            console.log('[SKIP] Toggle already in desired state');
        }

        await browser.waitUntil(async () => {
            const state = await toggle.getAttribute('aria-checked');
            return state === (shouldEnable ? 'true' : 'false');
        }, { timeout: 10000, timeoutMsg: 'Toggle state did not update' });

        await SapUtils.waitForBusyIndicatorToDisappear();

        const toggle2 = await this.descendingToggle;
        await toggle2.waitForDisplayed({ timeout: 20000 });
        const isEnabled2 = await toggle2.getAttribute('aria-checked') === 'true';
        console.log(`[INFO] Descending current state: ${isEnabled2 ? 'ON' : 'OFF'}`);

        if (isEnabled2 !== shouldEnable) {
            await SapUtils.clickWithWait(toggle2);
            console.log(`[ACTION] Descending switched to ${shouldEnable ? 'ON' : 'OFF'}`);
        } else {
            console.log('[SKIP] Descending already in desired state');
        }

        await browser.waitUntil(async () => {
            const state = await toggle2.getAttribute('aria-checked');
            return state === (shouldEnable ? 'true' : 'false');
        }, { timeout: 10000, timeoutMsg: 'Descending toggle did not update' });
    }

    async enterTextValue(row: number, value: string): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();

        const input = await $(`(//td[@aria-colindex="3"])[${row + 1}]//input`);
        await SapUtils.setValueWithWait(input, value);

        if (row == 2) {
            await SapUtils.clickWithWait(this.saveRiskColorButton);
            await SapUtils.clickWithWait(this.OkButton);
        }
    }

    async configureYAxis(description: string, shouldEnableToggle: boolean): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();

        await SapUtils.clickWithWait(this.yAxisAddButton);
        console.log('[ACTION] Y-Axis Add (+) button clicked');

        await SapUtils.setValueWithWait(this.yAxisDescriptionInput, description);
        console.log(`[ACTION] Y-Axis description entered: ${description}`);

        const toggle = await this.yAxisDisplayTextToggle;
        await toggle.waitForDisplayed({ timeout: 20000 });
        const isEnabled = await toggle.getAttribute('aria-checked') === 'true';

        if (isEnabled !== shouldEnableToggle) {
            await SapUtils.clickWithWait(toggle);
            console.log(`[ACTION] Y-Axis Toggle switched to ${shouldEnableToggle}`);
        }

        await browser.waitUntil(async () => {
            const state = await toggle.getAttribute('aria-checked');
            return state === (shouldEnableToggle ? 'true' : 'false');
        }, { timeout: 5000 });

        await SapUtils.waitForBusyIndicatorToDisappear();
    }

    async enterYAxisRowValue(row: number, value: string): Promise<void> {
        const input = await $(`(//td[@aria-colindex="3"])[${row + 1}]//input`);
        await SapUtils.setValueWithWait(input, value);

        if (row == 2) {
            await SapUtils.clickWithWait(this.saveRiskColorButton);
            await SapUtils.clickWithWait(this.OkButton);
        }
    }

    /* ========================
       RISK LINE ACTION
       ======================== */
    async addRiskLine(
        description: string, 
        colorHex: string, 
        startX: string, 
        startY: string, 
        endX: string, 
        endY: string
    ): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();

        // 1. Click Add Risk Line
        await SapUtils.clickWithWait(this.addRiskLineButton);
        console.log('[ACTION] Add Risk Line button clicked');

        // 2. Enter Description
        await SapUtils.setValueWithWait(this.riskLineDescriptionInput, description);
        console.log(`[ACTION] Risk Line Description entered: ${description}`);

        // 3. Select Color
        await SapUtils.clickWithWait(this.colorPickerButton);
        const colorOption = await $(`div[data-sap-ui-color="${colorHex}"]`);
        await SapUtils.clickWithWait(colorOption);
        console.log(`[ACTION] Risk Line Color selected: ${colorHex}`);

        // 4. Select Y-Axis ("Y-Axis Label") - Using 1000ms delayAfter for dropdown animation
        await SapUtils.clickWithWait(this.yAxisDropdownArrow, 1000);
        await SapUtils.clickWithWait(this.yAxisLabelOption);
        console.log('[ACTION] Y-Axis selected: Y-Axis Label');

        // 5. Select X-Axis ("description") - Using 1000ms delayAfter for dropdown animation
        await SapUtils.clickWithWait(this.xAxisDropdownArrow, 1000);
        await SapUtils.clickWithWait(this.xAxisDescriptionOption);
        console.log('[ACTION] X-Axis selected: description');

        // 6. Enter Coordinates
        await SapUtils.setValueWithWait(this.startXInput, startX);
        await SapUtils.setValueWithWait(this.startYInput, startY);
        await SapUtils.setValueWithWait(this.endXInput, endX);
        await SapUtils.setValueWithWait(this.endYInput, endY);
        console.log(`[ACTION] Coordinates entered - Start(${startX}, ${startY}), End(${endX}, ${endY})`);

        await SapUtils.clickWithWait(this.saveRiskColorButton);
        await SapUtils.clickWithWait(this.OkButton);

        await SapUtils.waitForBusyIndicatorToDisappear();
        console.log('[SUCCESS] Risk Line saved');
    }
    
    async publishMatrix(): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();

        await SapUtils.clickWithWait(this.publishButton);
        await SapUtils.clickWithWait(this.yesConfirmationButton);
        await SapUtils.clickWithWait(this.OkButton);

        console.log('[ACTION] Publish button clicked');
        await SapUtils.waitForBusyIndicatorToDisappear();
    }

    async selectMatrixAndOpenSettings(): Promise<void> {
        await SapUtils.waitForBusyIndicatorToDisappear();

        await SapUtils.clickWithWait(this.createdMatrixCheckbox);
        console.log('[ACTION] Matrix checkbox selected');

        await SapUtils.clickWithWait(this.matrixSettingsButton);
        console.log('[ACTION] Settings button clicked');

        await SapUtils.clickWithWait(this.yesConfirmationButton);
        await SapUtils.clickWithWait(this.OkButton);

        await SapUtils.waitForBusyIndicatorToDisappear();
    }
}

export default new MatricesPage();
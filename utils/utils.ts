import { $$, browser } from '@wdio/globals';
import * as console from 'console';
import { utils } from 'mocha';
import * as path from 'path';
import type { ChainablePromiseElement } from 'webdriverio';
class Utils {

    private get equipmentIframe() {
        return $('iframe[data-help-id="application-equipment-manage"]');
    }

    private get funLocIframe() {
        return $('iframe[data-help-id="application-functionallocation-manage"]');
    }
    private get CMLIframe() {
        return $('iframe[data-help-id="application-cml-manage"]');
    }

    private get backBtn() {  
        return $("//a[@aria-label='Back']"); 
    }
    private get settingsBtn() {  
        return $("//span[text()='Settings']/preceding-sibling::span//span"); 
    }
    private get showHierarchyBtn() {  
        return $("//span[text()='Show Hierarchy']/preceding-sibling::span"); 
    }
    private get showAnalyticChartBtn() {  
        return $("//span[text()='Analytics Chart']/preceding-sibling::span"); 
    }
    private get closeHierarchyBtn() {  
        return $("//div[@role='toolbar']/button[@aria-label='Decline']"); 
    }
    private get closeAnalyticChartBtn() {  
        return $("//button[@title='Close']"); 
    }

    async switchToIframe(frameElement: any): Promise<void> {
        console.log("---- Switching to iframe ----");
        await browser.switchFrame(null);
        await frameElement.waitForExist({ timeout: 20000 });
        await frameElement.waitForDisplayed({ timeout: 20000 });
        await browser.switchFrame(frameElement);
        console.log("---- Switched successfully ----");
    }

    async uploadDocument(fileName: string): Promise<void> {
        const filePath = path.join(process.cwd(), 'test_data/btp_applications/', fileName);
        const remoteFilePath = await browser.uploadFile(filePath);
        const fileInput = await $('//input[@type="file"]');
        await fileInput.waitForExist();
        await fileInput.setValue(remoteFilePath);
    }

    async waitForObjectPageHeader(): Promise<void> {
        const headerToolbar = await $(
            "//*[contains(@class,'sapUxAPObjectPageLayout')]//header"
        );
        await headerToolbar.waitForExist({ timeout: 30000 });
        await headerToolbar.waitForDisplayed({ timeout: 30000 });
        console.log("Object Page header ready");
    }

    async switchIframe(): Promise<void> {
        console.log("--------------------------------------------- Before Switch ---------------------------------------------");
        console.log("URL:", await browser.getUrl());
        await browser.switchFrame(null);
        await this.equipmentIframe.waitForExist({ timeout: 20000 });
        await browser.switchFrame(this.equipmentIframe);
        console.log("--------------------------------------------- After Switch ---------------------------------------------");
        const internalTitle = await browser.execute(() => document.title);
        console.log("Internal Document Title:", internalTitle);
        const btnCount = await $$('button').length;
        console.log("Buttons found in current context:", btnCount);
    }

    async assertTextEquals(element: any, expectedText: string): Promise<void> {
        const el = await element;  
        await el.waitForDisplayed({ timeout: 10000 });
        const actualText = await el.getText();
        if (actualText.trim() !== expectedText.trim()) {
            throw new Error(`Text assertion failed. Expected: "${expectedText}", Actual: "${actualText}"`);
        } else {    
            console.log(`Text assertion passed. Text: "${actualText}"`);
        }
    }

    async clickWithWait(element: any,delayAfter: number = 0,timeout: number = 30000): Promise<void> {
        const el = await element;
        await el.waitForExist({ timeout });
        await el.waitForDisplayed({ timeout });

        // small buffer for animations (important for UI5)
        await browser.pause(200);

        await this.scrollIntoViewIfNeeded(el);

        await el.waitForClickable({
            timeout,
            timeoutMsg: `Element not clickable: ${el.selector}`
        });

        // ========== TRY 1 : normal click ==========
        try {
            await el.click();
            if (delayAfter) await browser.pause(delayAfter);
            return;
        } catch (err) {
            console.log(`Normal click failed → ${el.selector}`);
        }

        // ========== TRY 2 : scroll + retry ==========
        try {
            await browser.pause(500);
            await this.scrollIntoViewIfNeeded(el);
            await browser.pause(300);
            await el.click();
            if (delayAfter) await browser.pause(delayAfter);
            return;
        } catch (err) {
            console.log(`Retry click failed → ${el.selector}`);
        }

        // ========== TRY 3 : JS click ==========
        try {
            await browser.execute(
                (element: HTMLElement) => element.click(),
                el
            );
            if (delayAfter) await browser.pause(delayAfter);
            return;
        } catch (err) {
            console.log(`JS click failed → ${el.selector}`);
        }

        // ========== TRY 4 : real mouse action click ==========
        try {
            await el.moveTo();
            await browser.pause(200);

            await browser.action('pointer')
                .move({ origin: el })
                .down()
                .up()
                .perform();

            if (delayAfter) await browser.pause(delayAfter);
            return;
        } catch (err) {
            throw new Error(`All click strategies failed for: ${el.selector}`);
        }
    }

    async setValueWithWait(element: any, value: string, delayAfter = 0, timeout = 30000): Promise<void> {
        const el = await element;
        await el.waitForDisplayed({ timeout });
        await el.scrollIntoView();

        try {
            await el.click();
            await el.clearValue();
            await el.setValue(value);
        } catch {
            await browser.pause(1000);
            await el.scrollIntoView();
            await el.clearValue();
            await el.setValue(value);
        }
        if (delayAfter > 0) await browser.pause(delayAfter);
    }

    async waitForBusyIndicatorToDisappear(timeoutInSeconds = 30): Promise<void> {
        const busy = $("//div[@role='progressbar']");
        try {
            await busy.waitForDisplayed({
                timeout: timeoutInSeconds * 1000,
                reverse: true,
                interval: 200
            });
        } catch {
            console.warn("Busy indicator timeout");
        }
    }

    async generateRandomFuncName(): Promise<string> {
        console.log(`AUTOMATION-FUNC-LOC-${Math.floor(Math.random() * 10000)}`);
    return `AUTOMATION-FUNC-LOC-${Math.floor(Math.random() * 10000)}`;
    }

    async generateRandomFuncDescName(): Promise<string> {
        console.log(`AUTOMATION-FUNC-LOC-DESC-${Math.floor(Math.random() * 10000)}`);
    return `AUTOMATION-FUNC-LOC-DESC-${Math.floor(Math.random() * 10000)}`;
    }

    async setValueWithDelay(element: any, value: string) {
    const el = await element;
    await el.waitForDisplayed({ timeout: 10000 });
    await el.clearValue();
    await el.setValue(value);
    await browser.pause(1500);
    }

    async waitForSAPPopupAndClose(timeoutInSeconds = 30): Promise<void> {
        const popUpCloseBtn = $("//button[@title='Close Lightbox']");
        try {
            if (await popUpCloseBtn.waitForDisplayed({ timeout: timeoutInSeconds * 1000 })) {
                await popUpCloseBtn.click();
            }
        } catch {}
    }

    async waitAndSelect(element: any) {
        const el = await element;
        await el.waitForDisplayed({ timeout: 10000 });
        await el.click();
        await this.waitForBusyIndicatorToDisappear();
    }

    async getTextWithWait(element: any) {
        const el = await element;
        await el.waitForDisplayed({ timeout: 10000 });
        return await el.getText();
    }

    async getValueWithWait(element: any) {
        const el = await element;
        await el.waitForDisplayed({ timeout: 10000 });
        return await el.getValue();
    }

    async verifyText(element: any, expected: string) {
        const el = await element;
        await el.waitForDisplayed({ timeout: 10000 });
        const actual = await el.getText();
        await expect(actual).toEqual(expected);
    }

    async verifyValue(element: any, expected: string) {
        const el = await element;
        await el.waitForDisplayed({ timeout: 10000 });
        const actual = await el.getValue();
        await expect(actual).toEqual(expected);
    }

    async scrollAndClick(element: any, timeout = 30000) {
        await element.waitForExist({ timeout });

        await browser.waitUntil(async () => await element.isExisting(), {
            timeout,
            interval: 500
        });

        await browser.pause(2000);

        const el = await element;

        await browser.execute((e) => {
            if (e && e.nodeType === 1) e.scrollIntoView({ block: 'center' });
        }, el);

        await browser.pause(1500);

        await browser.execute((e) => {
            if (e && e.nodeType === 1) e.click();
        }, el);

        await browser.pause(2000);
    }

    async jsClickElement(element: any): Promise<void> {
        const el = await element;
        await browser.execute((e: HTMLElement) => e.click(), el);
    }

    async waitForDropdownOpen(timeout = 10000): Promise<WebdriverIO.Element> {
        const dropdownXpaths = [
        '//ul[@role="listbox" and not(contains(@style,"display: none"))]',
        '//div[contains(@class,"sapUiPopup")]//ul[@role="listbox"]'
        ];

        await browser.waitUntil(async () => {
            for (const xpath of dropdownXpaths) {
                const listboxes = await browser.$$(xpath);

                for (const listbox of listboxes) {
                    try {
                        if (await listbox.isDisplayed()) {
                            const options = await listbox.$$('.//li[@role="option"]'); 
                            if (await options.length > 0) return true;
                        }
                    } catch {}
                }
            }
            return false;
        }, {
            timeout,
            timeoutMsg: 'No visible dropdown listbox with options found'
        });

        // return the ACTIVE listbox element
        for (const xpath of dropdownXpaths) {
            const listboxes = await browser.$$(xpath);

            for (const listbox of listboxes) {
                try {
                    if (await listbox.isDisplayed()) {
                        const options = await listbox.$$('.//li[@role="option"]');
                        if (await options.length > 0) {
                            return listbox;
                        }
                    }
                } catch {}
            }
        }

        throw new Error('Dropdown opened but no usable listbox found');
    }

    async scrollIntoViewIfNeeded(element: WebdriverIO.Element) {
        await browser.execute((el: HTMLElement) => {

            function findScrollableParent(node: HTMLElement | null): HTMLElement {
                while (node) {
                    const style = window.getComputedStyle(node);
                    const overflowY = style.overflowY;
                    const overflow = style.overflow;

                    if (
                        overflowY === 'auto' || overflowY === 'scroll' ||
                        overflow === 'auto' || overflow === 'scroll'
                    ) {
                        return node;
                    }

                    node = node.parentElement;
                }
                return document.body as HTMLElement;
            }

            const scrollParent = findScrollableParent(el);
            scrollParent.scrollTop = el.offsetTop - 200;
            el.scrollIntoView({ block: 'center' });

        }, element);
    }

    async waitForAnyUI5OptionActive() {
        await browser.waitUntil(async () => {
            const activeItems = await $$('li[role="option"].sapMLIBActive');
            return await activeItems.length > 0;
        }, { timeout: 15000, timeoutMsg: 'No active dropdown options found' });
    }

    async openDropdown(dropdownArrow: ReturnType<typeof $>) {
        const arrow = await dropdownArrow; 

        await arrow.waitForExist({ timeout: 10000 });

        await browser.execute(el => {
            el.scrollIntoView({ block: 'center', inline: 'center' });
        }, arrow);

        await browser.pause(300);

        await arrow.moveTo();
        await browser.pause(200);

        try {
            await arrow.click();
        } catch {}

        // JS fallback click (SAP UI5 fix)
        await browser.execute(el => el.click(), arrow);

        await browser.pause(500);
    }

    async selectCheckboxes(noOfEquipment: number): Promise<void> {
        console.log(`Selecting checkboxes...`);
        for (let i = 1; i <= noOfEquipment; i++) {
            const expectedRow = i * 2;
            let resultCell = await $(`(//tr[@role="row"])[${expectedRow}]//div[@role="checkbox"]`);

            if (!(await resultCell.isExisting())) {
                resultCell = await $(`(//tr[@role="row"])[${expectedRow + 1}]//div[@role="checkbox"]`);
            }

            if (await resultCell.isExisting()) {
                await resultCell.waitForClickable({ timeout: 20000 });
                await resultCell.click();
            }
        }
        console.log(`Checkbox selection completed.`);
    }

    async selectCheckboxesForPhase(noOfPhases: number): Promise<void> {
        for (let i = 0; i <= noOfPhases; i++) {
            const expectedRow = i ;
            let resultCell = await $(`//li[@aria-posinset="${expectedRow}"]//div[@aria-checked='false']`);

            if (!(await resultCell.isExisting())) {
                resultCell = await $(`//li[@aria-posinset="${expectedRow +1 }"]//div[@aria-checked='false']`);
            }

            if (await resultCell.isExisting()) {
                await resultCell.waitForClickable({ timeout: 20000 });
                await resultCell.click();
            }
        }
    }

    async generateUniqueName(base: string): Promise<string> {
        const timestamp = new Date().getTime();
        return `${base}_${timestamp}`;
    }

    async getAssignedValue(text: string): Promise<number> {
    const match = text.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
    }

      private get adaptFilter() {
        return $("//input[@placeholder='Search']/following::bdi[contains(text(),'Adapt Filters')]");
    }

    async addAllAdaptFilter(): Promise<void> {

        let isAdaptFilterClickable = false;
        try {
            await this.adaptFilter.waitForClickable({ timeout: 30000 });
            isAdaptFilterClickable = true;
        } catch {
            isAdaptFilterClickable = false;
        }

        if (!isAdaptFilterClickable) {
            console.log("Settings not clickable → trying Back");
            await browser.switchFrame(null);
            const back = await this.backBtn;

            if (await back.isExisting()) {
                try {
                    await this.clickWithWait(back);
                    await this.waitForBusyIndicatorToDisappear();
                    console.log("Clicked Back");
                } catch {
                    console.log("Back present but not clickable → skipping");
                }
            } else {
                console.log("Back button not present → skipping");
            }
        }
        await browser.switchFrame(null);
        if(await this.funLocIframe.isExisting()) {
            await this.switchToIframe(this.funLocIframe);
        } else if (await this.equipmentIframe.isExisting()) {
            await this.switchToIframe(this.equipmentIframe);
        }
        await this.adaptFilter.waitForClickable({ timeout: 10000 });
        await this.adaptFilter.click();

        console.log("Adapt Filters opened");

        await browser.pause(10000);
        while (true) {
            const checkboxes = await $$(
                `//tr[@role="row"]//div[@role="checkbox" and @aria-checked="false"]`
            );

            const uncheckedCount = await checkboxes.length;
            console.log(`Found ${uncheckedCount} unchecked checkboxes`);

            if (uncheckedCount === 0) break;

            const checkbox = checkboxes[0];

            try {
                await this.clickWithWait(checkbox);
            } catch {
                await browser.execute(el => el.click(), checkbox);
            }
        }
        const filterNames = await $$('//tr[@role="row"]//bdi');
        const expectedFilters: string[] = [];
        for (const el of filterNames) {
            const text = await el.getText();
            if (text.trim()) {
                expectedFilters.push(text.trim());
            }
        }
        console.log('Expected Filters:', expectedFilters);

         await this.clickWithWait($('//button//bdi[text()="OK"]'));
        await browser.pause(5000);

        const actualFiltersElements = await $$('//label//bdi');
        const actualFilters: string[] = [];

        for (const el of actualFiltersElements) {
            const text = await el.getText();
            if (text.trim()) {
                actualFilters.push(text.trim());
            }
        }
        console.log('Actual Filters:', actualFilters);
        const missingFilters: string[] = [];
        for (const expected of expectedFilters) {
            if (!actualFilters.includes(expected)) {
                console.error(`Missing filter: ${expected}`);
                missingFilters.push(expected);
            } else {
                console.log(`Found filter: ${expected}`);
            }
        }
        if (missingFilters.length > 0) {
            throw new Error(`Missing filters: ${missingFilters.join(', ')}`);
        }
    }

    async resetAllAdaptFilter(): Promise<void> {
        await this.clickWithWait(this.adaptFilter);
        await browser.pause(3000);
        const resetBtn = await $('//button//bdi[text()="Reset"]');
        await this.clickWithWait(resetBtn);
        await this.clickWithWait($('(//button[.//bdi[text()="OK"]])[last()]'));
        await this.clickWithWait($('//button//bdi[text()="OK"]'));
        await browser.pause(5000);
        const actualFiltersElements = await $$('//label//bdi');
        const remainingFilters: string[] = [];

        for (const el of actualFiltersElements) {
            const text = await el.getText();
            if (text.trim()) {
                remainingFilters.push(text.trim());
            }
        }
        console.log('Remaining Filters after reset:', remainingFilters);
        if (remainingFilters.length > 0) {
            throw new Error(`Reset failed: Filters still present: ${remainingFilters.join(', ')}`);
        }
        console.log('All filters successfully reset');
    }

    public async verifyFieldsInListView(): Promise<void> {
        const settings = await this.settingsBtn;
        this.waitForBusyIndicatorToDisappear();
        console.log("Checking if Settings is available on current page");
        let isSettingsClickable = false;
        try {
            await settings.waitForClickable({ timeout: 30000 });
            isSettingsClickable = true;
        } catch {
            isSettingsClickable = false;
        }
        if (!isSettingsClickable) {
            console.log("Settings not clickable → trying Back");
            await browser.switchFrame(null);
            const back = await this.backBtn;
            if (await back.isExisting()) {
                try {
                    await this.clickWithWait(back);
                    await this.waitForBusyIndicatorToDisappear();
                    console.log("Clicked Back");
                } catch {
                    console.log("Back present but not clickable → skipping");
                }
            } else {
                console.log("Back button not present → skipping");
            }
        }
        await browser.switchFrame(null);
        if(await this.funLocIframe.isExisting()) {
            await this.switchToIframe(this.funLocIframe);
        } else if (await this.equipmentIframe.isExisting()) {
            await this.switchToIframe(this.equipmentIframe);
        }
        await settings.waitForClickable({ timeout: 10000 });
        await settings.click();
        console.log("Settings opened");
        await browser.pause(2000); 
        const allTextElems = await $$("//td[@role='gridcell']//bdi");
        const availableTexts: string[] = [];
        for (const el of allTextElems) {
            const text = await el.getText();
            if (text.trim()) {
                availableTexts.push(text.trim());
            }
        }
        console.log("Available fields:", availableTexts);
        const selectedFields: string[] = [];
        const rows = await $$("//tr[@role='row']");
        for (const row of rows) {
            const checkbox = await row.$(".//div[@role='checkbox']");
            const textElem = await row.$(".//td[@role='gridcell']//bdi");
            if (!(await checkbox.isExisting())) continue;
            let text = await textElem.getText();
            if (!text) text = await textElem.getAttribute("innerText");
            const isChecked = await checkbox.getAttribute("aria-checked");
            if (isChecked === "true") {
                if (text && text.trim()) {
                    selectedFields.push(text.trim());
                }
            }
            if (isChecked === "false") {
                if (text && text.trim()) {
                    selectedFields.push(text.trim()); // include newly selected also
                }
                await checkbox.click();
            }
        }

        console.log("Final selected fields (including pre-selected):", selectedFields);
        await this.clickWithWait($("//bdi[text()='OK']"));
        console.log("Clicked OK");
        await this.waitForBusyIndicatorToDisappear();
        for (const field of selectedFields) {
            let found = false;
            const headerElems = await $$("//th//span");
            for (const el of headerElems) {
                let text = await el.getText();
                if (!text) text = await el.getAttribute("innerText");
                const safeText = (text || "").trim();
                if (safeText === field) {
                    console.log(`Found in HEADER: ${field}`);
                    found = true;
                    break;
                }
            }
            if (found) continue;
            const rowElems = await $$("//tbody//tr[2]//span[1][normalize-space()][not(normalize-space()='Yes')]");
            for (const el of rowElems) {
                let text = await el.getText();
                if (!text) text = await el.getAttribute("innerText");
                const safeText = (text || "").trim();
                if (safeText === field) {
                    console.log(`Found in ROW: ${field}`);
                    found = true;
                    break;
                }
            }
            if (!found) {
                throw new Error(`Field NOT found on screen: ${field}`);
            }
        }
        console.log("All selected fields verified successfully");
    }

    async resetFieldsInListView(): Promise<void> {
        const settings = await this.settingsBtn;
        await this.waitForBusyIndicatorToDisappear();
        await settings.waitForClickable({ timeout: 10000 });
        await settings.click();
        console.log("Settings opened");
        const resetBtn = await $('//bdi[text()="Reset"]');
        let selectedFields: string[] = [];
        if (await resetBtn.isExisting() && await resetBtn.isEnabled()) {
            await this.clickWithWait(resetBtn);
            await this.waitForBusyIndicatorToDisappear();
            const OkWrnBtn = await $('//span[text()="Warning"]//following::bdi[text()="OK"]');
            await this.clickWithWait(OkWrnBtn);
            await this.waitForBusyIndicatorToDisappear();
            await browser.pause(5000); // wait for fields to update after reset
            console.log("Reset confirmed, capturing checked fields");
            const fieldElems = await $$(
            "(//div[@role='checkbox' and @aria-checked='true']/ancestor::tr//td[@role='gridcell']//bdi)[position() <= 12]"
            );
            for (const el of fieldElems) {
                let text = await el.getText();
                if (!text) text = await el.getAttribute("innerText");
                const safeText = (text || "").trim();
                if (safeText && !selectedFields.includes(safeText)) {
                    selectedFields.push(safeText);
                }
            }
            console.log("Fields after reset:", selectedFields);
            if (selectedFields.length < 8 || selectedFields.length > 12) {
                throw new Error(`Wrong number of reset fields: ${selectedFields.length}`);
            }
            if (selectedFields.length < 8 || selectedFields.length > 12) {
                throw new Error(`Wrong number of reset fields: ${selectedFields.length}`);
            }
            await this.clickWithWait($('//button//bdi[text()="OK"]'));
            await this.waitForBusyIndicatorToDisappear();
            console.log("Popup closed");
        } else 
        {
            console.log("Reset not available → skipping");
            await this.clickWithWait($('//button//bdi[text()="OK"]'));
            return;
        }
        const headerTexts: string[] = [];
        for (const el of await $$("//th//span")) {
            let text = await el.getText();
            if (!text) text = await el.getAttribute("innerText");

            const safeText = (text || "").trim();
            if (safeText) headerTexts.push(safeText);
        }
        const rowTexts: string[] = [];
        for (const el of await $$("//tbody//tr[2]//span[1][normalize-space()][not(normalize-space()='Yes')]")) {
            let text = await el.getText();
            if (!text) text = await el.getAttribute("innerText");

            const safeText = (text || "").trim();
            if (safeText) rowTexts.push(safeText);
        }
        console.log("DEBUG selectedFields length:", selectedFields.length);
        for (const field of selectedFields) {
            if (headerTexts.includes(field)) {
                console.log(`Found in HEADER: ${field}`);
                continue;
            }
            if (rowTexts.includes(field)) {
                console.log(`Found in ROW: ${field}`);
                continue;
            }
            console.log(`NOT FOUND: ${field}`);
            throw new Error(`Field NOT found on screen: ${field}`);
        }
        console.log("All reset fields verified successfully");
    }

    public async verifyShowHierarchy(): Promise<void> {
        await this.clickWithWait(this.showHierarchyBtn);
        await browser.pause(5000); // wait for hierarchy to show   
        console.log("Show Hierarchy clicked and hierarchy displayed");
        console.log("Some of the below entries are present"); 

        const entries = await browser.execute(() => {
        return Array.from(document.querySelectorAll("div[style*='-webkit-line-clamp']"))
        .map(el => el.textContent?.trim())
        .filter(text => text && text.length > 0);
        });

        console.log("Number of entries found:", entries.length);
        console.log("Entries:", entries);

        if (entries.length === 0) {
        throw new Error("No hierarchy entries found after clicking Show Hierarchy");
        }

        console.log("Hierarchy entries found successfully");
        console.log("Closing hierarchy view");
        await this.clickWithWait(this.closeHierarchyBtn);
        await browser.pause(3000);
    }

    public async verifyAnalyticsChart(): Promise<void> {
        console.log("Attempting to open Analytics Chart");
        await this.clickWithWait(this.showAnalyticChartBtn);
        console.log("Analytics chart is displayed");

        const charts = await $$("//span[text()='Analytics']/following::section//div//div[@aria-level='2']//div//div")
        if (await charts.length === 0) {
            throw new Error("No charts found in Analytics Chart view");
        }
        else {
            console.log(`Found ${charts.length} chart(s) in Analytics Chart view`);
            console.log("Analytics Chart entries:");
            for (const chart of charts) {
                let text = await chart.getText();
                if (!text) text = await chart.getAttribute("innerText");
                console.log(text);
            }
        }

        console.log("Closing Analytics Chart view");
        await this.clickWithWait(this.closeAnalyticChartBtn);
        await browser.pause(3000);
    }
}

export default new Utils();
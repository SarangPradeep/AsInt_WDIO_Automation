import { $$, browser } from '@wdio/globals';
import * as console from 'console';
import * as path from 'path';
import * as fs from 'fs';
class Utils {
    downloadDir = path.resolve(process.cwd(), 'downloads');

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

    async clickWithWait(element: any,delayAfter: number = 0,timeout: number = 300000): Promise<void> {
        const el = await element;
        await el.waitForExist({ timeout });
        await el.waitForDisplayed({ timeout });
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
        } catch {
            console.log("No SAP popup appeared within timeout");
            console.log("Continuing without closing popup");
        }
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
        // wait until any visible listbox appears
        await browser.waitUntil(async () => {
            const listboxes = await $$('//ul[@role="listbox"]');

            for (const box of listboxes) {
                if (await box.isDisplayed()) return true;
            }
            return false;
        }, {
            timeout: 15000,
            timeoutMsg: 'UI5 dropdown did not open'
        });

        // now wait until options exist in the visible listbox
        await browser.waitUntil(async () => {
            const listboxes = await $$('//ul[@role="listbox"]');

            for (const box of listboxes) {
                if (await box.isDisplayed()) {
                    const options = await box.$$('.//li[@role="option"]');
                    if (await options.length > 0) return true;
                }
            }
            return false;
        }, {
            timeout: 15000,
            timeoutMsg: 'Dropdown opened but no options found'
        });
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
        const firstCheckBox = await $('(//tr[@role="row"])[2]//div[@role="checkbox"]');
        await firstCheckBox.waitForDisplayed();
        await firstCheckBox.waitForClickable();
        console.log("Checkbox now clickable");
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

        await this.adaptFilter.waitForClickable({ timeout: 100000 });

        await browser.switchFrame(null);

        if (await this.funLocIframe.isExisting()) {
            await this.switchToIframe(this.funLocIframe);
        } else if (await this.equipmentIframe.isExisting()) {
            await this.switchToIframe(this.equipmentIframe);
        }

        await this.adaptFilter.waitForClickable({ timeout: 10000 });
        await this.adaptFilter.click();
        await browser.pause(5000);

        let prevCount: number = -1;

        while (true) {
        const checkboxes: any = await $$(`//tr[@role="row"]//div[@role="checkbox" and @aria-checked="false"]`);
        const uncheckedCount: number = checkboxes.length;

        if (uncheckedCount === 0) break;

        if (uncheckedCount === prevCount) {
            await browser.pause(2000);
        }

        const checkbox = checkboxes[0];
        try {
            await checkbox.click();
        } catch {
            await browser.execute((el) => el.click(), checkbox);
        }

        prevCount = uncheckedCount;
    }

        const filterNames = await $$('//tr[@role="row"]//bdi');
        const expectedFilters: string[] = [];

        for (const el of filterNames) {
            const text = (await el.getText()) || (await el.getAttribute("innerText")) || "";
            if (text.trim()) expectedFilters.push(text.trim());
        }

        await this.clickWithWait($('//button//bdi[text()="OK"]'));
        await browser.pause(5000);

        const actualFiltersElements = await $$('//label//bdi');
        const actualFilters: string[] = [];

        for (const el of actualFiltersElements) {
            const text = (await el.getText()) || (await el.getAttribute("innerText")) || "";
            if (text.trim()) actualFilters.push(text.trim());
        }

        const missingFilters: string[] = [];
        for (const expected of expectedFilters) {
            if (!actualFilters.includes(expected)) {
                missingFilters.push(expected);
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
    async generateRandomEquipmentName(): Promise<string> {
        console.log(`AUTO-EQUIP-${Math.floor(Math.random() * 10000)}`);
        return `${Math.floor(Math.random() * 10000000)}-EQUIP-AUTO`;
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
            // let text = await textElem.getText();
            // if (!text) text = await textElem.getAttribute("innerText");
            let text: string = (await textElem.getText()) || (await textElem.getAttribute("innerText")) || "";
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
        await this.clickWithWait($("//h1[.//text()='View Settings']/following::button[.//text()='OK']"));
        console.log("Clicked OK");
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(10000);
        for (const field of selectedFields) {
            let found = false;
            const headerElems = await $$("//th//span");
            for (const el of headerElems) {
                // let text = await el.getText();
                // if (!text) text = await el.getAttribute("innerText");
                let text: string = (await el.getText()) || (await el.getAttribute("innerText")) || "";
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
                // let text = await el.getText();
                // if (!text) text = await el.getAttribute("innerText");
                let text: string = (await el.getText()) || (await el.getAttribute("innerText")) || "";
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
        const resetBtn = await $('//h1[.//text()="View Settings"]/following::button[.//text()="Reset"]');
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
                // let text = await el.getText();
                // if (!text) text = await el.getAttribute("innerText");
                let text: string = (await el.getText()) || (await el.getAttribute("innerText")) || "";
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
            await this.clickWithWait($("//h1[.//text()='View Settings']/following::button[.//text()='OK']"));
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
            // let text = await el.getText();
            // if (!text) text = await el.getAttribute("innerText");
            let text: string = (await el.getText()) || (await el.getAttribute("innerText")) || "";
            const safeText = (text || "").trim();
            if (safeText) headerTexts.push(safeText);
        }
        const rowTexts: string[] = [];
        for (const el of await $$("//tbody//tr[2]//span[1][normalize-space()][not(normalize-space()='Yes')]")) {
            // let text = await el.getText();
            // if (!text) text = await el.getAttribute("innerText");
            let text: string = (await el.getText()) || (await el.getAttribute("innerText")) || "";
            const safeText = (text || "").trim();
            if (safeText) rowTexts.push(safeText);
        }
        await browser.pause(10000);
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
                // let text = await chart.getText();
                // if (!text) text = await chart.getAttribute("innerText");
                let text: string = (await chart.getText()) || (await chart.getAttribute("innerText")) || "";
                console.log(text);
            }
        }

        console.log("Closing Analytics Chart view");
        await this.clickWithWait(this.closeAnalyticChartBtn);
        await browser.pause(3000);
    }

    async createDownloadDir() {
        if (!fs.existsSync(this.downloadDir)) {
            fs.mkdirSync(this.downloadDir, { recursive: true });
        }
    }

    async cleanDownloads() {
        if (fs.existsSync(this.downloadDir)) {
            fs.readdirSync(this.downloadDir).forEach(file => {
                fs.unlinkSync(path.join(this.downloadDir, file));
            });
        }
    }

    async waitForDownload(extension: string = '.pdf'): Promise<string> {
        await browser.waitUntil(() => {
            const files = fs.readdirSync(this.downloadDir)
                .filter(f => f.endsWith(extension) && !f.endsWith('.crdownload'));
            return files.length > 0;
        }, { timeout: 20000 });

        const files = fs.readdirSync(this.downloadDir)
            .filter(f => f.endsWith(extension));

        const latest = files
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(this.downloadDir, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time)[0];

        return path.join(this.downloadDir, latest.name);
    }

    async extractTextFromPDF(filePath: string): Promise<string> {
        const fs = await import('fs');
        const pdfjsLib: any = await import('pdfjs-dist/legacy/build/pdf.js');
        const data = new Uint8Array(fs.readFileSync(filePath));
        const pdf = await pdfjsLib.getDocument({ data }).promise;
        let textContent = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();

            const pageText = content.items.map((item: any) => item.str).join(' ');
            textContent += pageText + '\n';
        }
        return textContent
        .replace(/\s+/g, ' ')          
        .replace(/\s*-\s*/g, '-')     
        .replace(/([A-Z])\s+(?=[A-Z])/g, '$1') 
        .trim();
    }

 async getAdvFilterVariableName(): Promise<string> {

    const options = ["Criticality", "Abc Indicator"];

    for (const option of options) {
        await browser.pause(3000);
        const el = await $(`//li[@role='listitem'][.//div[text()='${option}']]`);

        if (await el.isDisplayed()) {
            await el.click();
            return option;
        }
    }

    throw new Error("Neither Criticality nor Abc Indicator found");
}

    async createNewAdvancedFilter(filterName?: string): Promise<string> {
        await console.log("Creating new advanced filter");
        const uniqueFilterName = filterName ?? `Test Filter ${Date.now()}`;
        const advancedFilterBtn = await $('//span[text()="Advanced Filter"]/ancestor::button');

        await advancedFilterBtn.waitForExist({ timeout: 60000 });
        await advancedFilterBtn.waitForDisplayed({ timeout: 60000 });

        await this.clickWithWait(advancedFilterBtn, 5000);
        await browser.pause(1000);
        const filterInput = await $('//label[.//bdi[text()="Filter Name"]]/following::input[1]');
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(uniqueFilterName);
        await this.clickWithWait($('//div[@role="button" and .//div[@title="New Item"]]'));
        await this.clickWithWait($('//li[.//span[text()="Variables"]]'));
        await browser.pause(2000);
        const searchInput = await $('//input[@placeholder="Search..." and @aria-label="Search..."]');
        await searchInput.waitForDisplayed();
        await searchInput.click();
        await searchInput.clearValue();
        await this.getAdvFilterVariableName();
        await this.clickWithWait($('//div[@role="button" and .//div[@title="New Item"]]'));
        await this.clickWithWait($('//li[.//span[text()="Operators"]]'));
        await browser.pause(2000);
        const operator = await $(`//button[.//bdi[text()='=']]`);
        await operator.waitForDisplayed();
        await operator.click();
        await this.clickWithWait($('//div[@role="button" and .//div[@title="New Item"]]'));
        const literalValue = await $(`//input[@placeholder='Enter a text or a number.']`);
        await literalValue.waitForDisplayed();
        await this.clickWithWait(literalValue);
        await literalValue.clearValue();
        await literalValue.addValue('A');
        await browser.pause(1000);
        await this.clickWithWait($('//button//bdi[text()="OK"]'));
        await browser.pause(1000);
        await this.clickWithWait($('//button//bdi[text()="Save"]'));
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);  
        await this.clickWithWait($(`//h1[.//span[text()='Success']]//following::button[.//bdi[text()='OK']]`));
        console.log(`Created adapt filter: ${uniqueFilterName}`);
        return uniqueFilterName;
 
    }
 
    async deleteAdvancedFilter(): Promise<void> {
        await this.waitForBusyIndicatorToDisappear();
        await this.clickWithWait($('//button[@aria-label="Advanced Filter"]'));
        await browser.pause(2000);
        await this.clickWithWait($(`//div[@role='checkbox' and @aria-label='Select all rows']`));
        const deleteFlow = async () => {
            console.log("---- deleteFlow START ----");
            await this.clickWithWait($(`//button[@aria-label='Delete']`));
            await this.clickWithWait($(`//button//bdi[text()="Yes"]`));
            console.log("Clicked Delete -> Yes");
            console.log("---- deleteFlow END ----");
        };

        const waitForAnyPopup = async () => {
            console.log("---- waitForAnyPopup START ----");
            await browser.waitUntil(async () => {
                const err = await $("//header[.//text()='Error']").isDisplayed().catch(() => false);
                const suc = await $("//header[.//text()='Success']").isDisplayed().catch(() => false);
                return err || suc;
            }, { timeout: 10000 });
            console.log("Popup detected (Error or Success)");
            console.log("---- waitForAnyPopup END ----");
        };

        const clickAnyOkButton = async () => {
            console.log("---- clickAnyOkButton START ----");

            const errorOk = $(`//header[.//text()='Error']/following::bdi[.//text()='OK']`);
            const successOk = $(`//header[.//text()='Success']/following::button[.//text()='OK']`);

            if (await errorOk.isDisplayed().catch(()=>false)) {
                console.log("Error popup OK found → clicking");
                await errorOk.click();
            } else if (await successOk.isDisplayed().catch(()=>false)) {
                console.log("Success popup OK found → clicking");
                await successOk.click();
            } else {
                console.log("No OK button found");
            }

            console.log("Waiting for busy indicator after OK...");
            await this.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);

            console.log("---- clickAnyOkButton END ----");
        };

        const getAdvancedFilterCount = async () => {
            console.log("---- getAdvancedFilterCount START ----");

            const el = await $(`//span[contains(text(),'Advanced Filters')]`);
            await el.waitForDisplayed({ timeout: 10000 });

            const text = await el.getText();
            const count = await this.getAssignedValue(text);

            console.log(`Advanced Filters text: "${text}"`);
            console.log(`Parsed count value: ${count}`);

            console.log("---- getAdvancedFilterCount END ----");
            return count;
        };

        console.log("========= DELETE ADVANCED FILTER FLOW START =========");

        let attempts = 0;

        while (attempts < 3) {
            console.log(`\n***** DELETE ATTEMPT ${attempts + 1} *****`);

            await deleteFlow();
            await waitForAnyPopup();
            await clickAnyOkButton();

            const count = await getAdvancedFilterCount();

            if (count === 0) {
                console.log("Advanced Filter count is 0 → Deletion successful");
                break;
            }

            console.log(`Advanced Filter count still ${count} → Retrying delete`);
            attempts++;
        }

        if (attempts === 3) {
            throw new Error("Advanced Filters still not deleted after retries");
        }

        console.log("Preparing to close dialog...");
        const closeBtn = await $(`//button//bdi[normalize-space()='Close']`);
        await closeBtn.waitForDisplayed({ timeout: 10000 });
        await closeBtn.waitForClickable({ timeout: 10000 });
        console.log("Close button visible & clickable → clicking Close");
        await closeBtn.click();
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        const createHeader = await $(`//header//h1//span[normalize-space()='Create Advanced Filter']`);
        const isCreateScreenOpen = await createHeader.isDisplayed().catch(()=>false);
        if (isCreateScreenOpen) {
            console.log("Create Advanced Filter screen OPENED accidentally → clicking Cancel");

            const cancelBtn = await $(`//button//bdi[normalize-space()='Cancel']`);
            await cancelBtn.waitForDisplayed({ timeout: 10000 });
            await cancelBtn.waitForClickable({ timeout: 10000 });
            await cancelBtn.click();

            await this.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);

            console.log("Create Advanced Filter screen CLOSED");
        } else {
            console.log("Create Advanced Filter screen not opened → flow correct");
        }
        console.log("========= DELETE ADVANCED FILTER FLOW END =========");
 
    }
 
    async applyAdvancedFilter(): Promise<void> {
        await browser.pause(2000);
        const firstFilterCheckbox = await $(`(//tr[@role='row'])[2]//div[@role='checkbox']`);
        await firstFilterCheckbox.waitForDisplayed();
        await firstFilterCheckbox.click();
        await this.clickWithWait($('//button//bdi[text()="Apply"]'));
        await this.waitForBusyIndicatorToDisappear();
        await this.clickWithWait($('//button//bdi[text()="Go"]'));
        console.log("Applied advanced filter");
        const criticalityElement = await $(`(//tr[@aria-rowindex='2']/preceding::span[text()='Criticality']/following::span[text()='A'])[1]`);
        await criticalityElement.waitForExist({ timeout: 20000 });
        await criticalityElement.scrollIntoView();
        await criticalityElement.waitForDisplayed({ timeout: 20000 });
        if (!(await criticalityElement.isDisplayed())) {
            throw new Error("Criticality is NOT 'A'");
        }

        console.log("Criticality is correctly 'A' ✅");
    }
 
    async resetAdvancedFilter(): Promise<void> {
        await this.clickWithWait(this.adaptFilter);
        await browser.pause(3000);
        const resetBtn = await $('//button//bdi[text()="Reset"]');
        await this.clickWithWait(resetBtn);
        await this.clickWithWait($('(//button[.//bdi[text()="OK"]])[last()]'));
        await browser.pause(1000);
        await this.clickWithWait($(`//h1//span[starts-with(normalize-space(),'Adapt Filters')] /ancestor::div[@role='dialog'] //footer//button[.//bdi[normalize-space()='OK']]`));
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
}

export default new Utils();
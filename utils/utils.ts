import { $$, browser } from '@wdio/globals';
import * as console from 'console';
import * as path from 'path';
import * as fs from 'fs';
class Utils {
    downloadDir = path.resolve(process.cwd(), 'downloads');

    private get equipmentIframe() { return $('iframe[data-help-id="application-equipment-manage"]'); }
    private get funLocIframe() { return $('iframe[data-help-id="application-functionallocation-manage"]'); }
    private get ASDIframe() { return $('iframe[data-help-id="application-assetstrategydevelopment-manage"]'); }
    private get CMLIframe() { return $('iframe[data-help-id="application-cml-manage"]'); }
    private get documentIframe() { return $('iframe[data-help-id="application-documents-manage"]'); }
    private get notificationIframe() { return $('iframe[data-help-id="application-notifications-manage"]'); }
    private get inspectionIframe() { return $("//*[@data-help-id='application-idms-manage']"); }
    private get backBtn() { return $("//a[@aria-label='Back']"); }
    private get settingsBtn() { return $("//span[text()='Settings']/preceding-sibling::span//span"); }
    private get tableSettingsBtn() { return $("//span[text()='Table Settings']/preceding-sibling::span//span"); }
    private get showHierarchyBtn() { return $("//span[text()='Show Hierarchy']/preceding-sibling::span"); }
    private get showAnalyticChartBtn() { return $("//span[text()='Analytics Chart']/preceding-sibling::span"); }
    private get closeHierarchyBtn() { return $("//div[@role='toolbar']/button[@aria-label='Decline']"); }
    private get closeAnalyticChartBtn() { return $("//button[@title='Close']"); }
    private get cancelAnalyticChartBtn() { return $("//button[@title='Cancel']"); }
    private get hazopIframe(): any { return $("iframe[data-help-id='application-hazop-manage']"); }
    private get rcmIframe() { return $('iframe[data-help-id="application-rcm-manage"]'); }
    private get mspIframe() { return $('iframe[data-help-id="application-msp-manage"]'); }
    private get reccWorkbenchIframe() { return $('iframe[data-help-id="application-recommendationworkbenchplus-manage"]'); }
    private get attachSuccMsg() { return $("//span[text()='Success']"); }
    private get attachmentsSection() { return $('//button[.//bdi[text()="Attachments"]]'); }
    private get homeBtn() { return $('//li[@role="menuitem"]'); }
    private get navigationBtn() { return $('//div[@title="Navigation menu"]'); }

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

    async clickWithWait(element: any,delayAfter: number = 0,timeout: number = 75000): Promise<void> {
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

    async setValueWithWait(element: any, value: string, delayAfter = 0, timeout = 60000): Promise<void> {
        const el = await element;
        await el.waitForDisplayed({ timeout });
        await this.scrollIntoViewIfNeeded(el);

        try {
            await el.click();
            await el.clearValue();
            await el.setValue(value);
        } catch {
            await browser.pause(1000);
            await this.scrollIntoViewIfNeeded(el);
            await el.clearValue();
            await el.setValue(value);
        }
        await browser.keys("Enter");
        await browser.keys("Tab");
        if (delayAfter > 0) await browser.pause(delayAfter);
    }

    public async waitForLocalBusyToDisappear(timeoutInSeconds = 60): Promise<void> {
        try {
            await browser.waitUntil(async () => {
                const indicators = await $$("//div[contains(@class,'sapUiLocalBusyIndicatorAnimation')]");
                for (const el of indicators) {
                    if (await el.isDisplayed().catch(() => false)) {
                        return false;
                    }
                }
                return true;
            }, {
                timeout: timeoutInSeconds * 1000,
                interval: 300,
                timeoutMsg: "Local busy indicator did not disappear"
            });
        } catch {
            console.warn("Local busy indicator wait failed or timed out");
        }
    }

    public async waitForBusyIndicatorToDisappear(timeoutInSeconds = 60): Promise<void> {
        await browser.pause(1000);
        const busy = $("#sapUiBusyIndicator");
        const anim = $(".sapUiLocalBusyIndicatorAnimation");
        try {
            const appeared = await browser.waitUntil(async () => {
                const b = await busy.isDisplayed().catch(() => false);
                const a = await anim.isDisplayed().catch(() => false);
                return b || a;
            }, {
                timeout: 3000,
                interval: 300
            }).then(() => true).catch(() => false);

            if (!appeared) {
                console.log("Busy indicator did not appear → skipping wait");
                return;
            }
            await browser.waitUntil(async () => {
                const b = await busy.isDisplayed().catch(() => false);
                const a = await anim.isDisplayed().catch(() => false);
                return !(b || a);
            }, {
                timeout: timeoutInSeconds * 1000,
                interval: 300,
                timeoutMsg: "Busy indicator did not disappear"
            });
        } catch {
            console.warn("Busy indicator wait failed");
        }
    }

    async generateRandomFuncName(): Promise<string> {
        console.log(`AUTOMATION-FUNC-LOC-${Math.floor(Math.random() * 1000000)}`);
    return `AUTOMATION-FUNC-LOC-${Math.floor(Math.random() * 1000000)}`;
    }

    async generateRandomFuncDescName(): Promise<string> {
        console.log(`AUTOMATION-FUNC-LOC-DESC-${Math.floor(Math.random() * 1000000)}`);
    return `AUTOMATION-FUNC-LOC-DESC-${Math.floor(Math.random() * 1000000)}`;
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
            const listboxes = await $$('//ul[@role="listbox"]');

            for (const box of listboxes) {
                if (await box.isDisplayed()) return true;
            }
            return false;
        }, {
            timeout: 15000,
            timeoutMsg: 'UI5 dropdown did not open'
        });

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

        await browser.execute(el => el.click(), arrow);

        await browser.pause(500);
    }

    async selectCheckboxesForClass(noOfClass: number): Promise<void> {
        const classText = await $(`//header[.//text()='Assign Classes']/following-sibling::section//span[contains(text(),'Classes')]`);
        await classText.waitForDisplayed();
        const availableClasses = await this.getAssignedValue(await classText.getText());
        console.log(`Available Classes: ${availableClasses}`);
        const classesToSelect = Math.min(noOfClass, availableClasses);
        let selectedCount = 0;
        let rowIndex = 2;
        console.log(`Selecting ${classesToSelect} checkboxes...`);
        while (selectedCount < classesToSelect) {
            const checkbox = await $(`(//tr[@role="row"])[${rowIndex}]//div[@role="checkbox"]`);
            if (await checkbox.isExisting()) {
                await checkbox.scrollIntoView();
                await checkbox.waitForClickable({ timeout: 20000 });
                await checkbox.click();
                selectedCount++;
                console.log(`Selected checkbox ${selectedCount} at row ${rowIndex}`);
            }
            rowIndex++;
            if (rowIndex > 100) {
                break;
            }
        }
        console.log(`Checkbox selection completed.`);
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
        await console.log("Trying to open Adapt filter");
        await this.switchToFrame();
        await this.adaptFilter.waitForClickable({ timeout: 200000 });
        await this.adaptFilter.click();
        await browser.pause(5000);
        await console.log("Adapt filter opened");
        let prevCount: number = -1;
 
        while (true) {
            const checkboxes: any = await $$(`(//div[contains(@class,'sapMDialog') and not(@aria-hidden='true')])[last()]//div[@role='checkbox' and @aria-checked='false']`);
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
        console.log(`Automation_Equipment_${Math.floor(Math.random() * 10000)}`);
        return `Automation_Equipment_${Math.floor(Math.random() * 10000)}`;
    }

    async generateRandomHazopName(): Promise<string> {
        console.log(`Automation_Hazop_${Math.floor(Math.random() * 10000)}`);
        return `Automation_Hazop_${Math.floor(Math.random() * 10000)}`;
    }

    public async verifyFieldsInListView(): Promise<void> {
        await console.log("opening settings to verify fields in list view");
        await this.waitForBusyIndicatorToDisappear();
        await browser.switchFrame(null);
        if(await this.funLocIframe.isExisting()) await this.switchToIframe(this.funLocIframe);
        else if (await this.equipmentIframe.isExisting()) await this.switchToIframe(this.equipmentIframe);
        else if (await this.hazopIframe.isExisting()) await this.switchToIframe(this.hazopIframe);
        else if (await this.rcmIframe.isExisting()) await this.switchToIframe(this.rcmIframe);
        else if (await this.ASDIframe.isExisting()) await this.switchToIframe(this.ASDIframe);

        if (await this.settingsBtn.isDisplayed().catch(() => false)) {
        await this.clickWithWait(this.settingsBtn);
        }

        if (await this.tableSettingsBtn.isDisplayed().catch(() => false)) {
            await this.clickWithWait(this.tableSettingsBtn);
        }
        await browser.pause(2000);
        const rows = await browser.$$("(//div[contains(@class,'sapMDialog') and not(@aria-hidden='true')])[last()]//tr[@role='row']");
        const rowsArr = Array.from(rows);
        let uncheckedCheckboxes: any[] = [];
        let removedFields: string[] = [];
        let selectedFields: string[] = [];

        for (let i = 0; i < rowsArr.length; i++) {

        const row = rowsArr[i];
        const checkbox = await row.$(".//div[@role='checkbox']");
        const textElem = await row.$(".//td[@role='gridcell']//bdi");
        if (!(await checkbox.isExisting())) continue;
        const text = ((await textElem.getText()) || "").trim();
        const state = await checkbox.getAttribute("aria-checked");
        if (text) selectedFields.push(text);
        if (state === "false") uncheckedCheckboxes.push(checkbox);
        }

        if (uncheckedCheckboxes.length > 0) {
            for (let i = 0; i < uncheckedCheckboxes.length; i++) {
                await uncheckedCheckboxes[i].click();
            }
        }
        else {
            const startIndex = rowsArr.length - 2;
            for (let i = startIndex; i < rowsArr.length; i++) {
                const row = rowsArr[i];
                const checkbox = await row.$(".//div[@role='checkbox']");
                const textElem = await row.$(".//td[@role='gridcell']//bdi");

                const text = ((await textElem.getText()) || "").trim();
                await checkbox.click();
                removedFields.push(text);
            }
        }

        await this.clickWithWait($("//h1[.//text()='View Settings']/following::button[.//text()='OK']"));
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(8000);

        const headerElems = await $$("//th//span");
        const rowElems = await $$("//tbody//tr[2]//span[1][normalize-space()][not(normalize-space()='Yes')]");

        for (const field of selectedFields) {

            if (removedFields.includes(field)) continue;

            let found = false;

            for (const el of headerElems) {
                const txt = ((await el.getText()) || "").trim();
                if (txt === field) {
                    console.log(`FOUND: ${field} in HEADER`);
                    found = true;
                    break;
                }
            }

            if (!found) {
                for (const el of rowElems) {
                    const txt = ((await el.getText()) || "").trim();
                    if (txt === field) {
                        console.log(`FOUND: ${field} in ROW`);
                        found = true;
                        break;
                    }
                }
            }

            if (!found) {
                throw new Error(`Field NOT visible: ${field}`);
            }
        }

        for (const field of removedFields) {
            for (const el of headerElems) {
                const txt = ((await el.getText()) || "").trim();
                if (txt === field) {
                    throw new Error(`Field still visible after removal: ${field}`);
                }
            }
        }

        console.log("verifyFieldsInListView PASSED");
    }


   async resetFieldsInListView(): Promise<void> {
        const btn = await this.settingsBtn.isDisplayed().catch(() => false)
            ? this.settingsBtn
            : await this.tableSettingsBtn.isDisplayed().catch(() => false)
                ? this.tableSettingsBtn
                : null;

        if (!btn) throw new Error("Neither Settings nor Table Settings button is visible");

        await this.waitForBusyIndicatorToDisappear();
        await btn.waitForClickable({ timeout: 10000 });
        await btn.click();
        const resetBtn = await $('//h1[.//text()="View Settings"]/following::button[.//text()="Reset"]');

        if (!(await resetBtn.isExisting())) {
            await this.clickWithWait($('//button//bdi[text()="OK"]'));
            return;
        }

        await this.clickWithWait(resetBtn);
        await this.waitForBusyIndicatorToDisappear();
        await this.clickWithWait($('//span[text()="Warning"]//following::bdi[text()="OK"]'));
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        const elems = await browser.$$(
            "(//div[contains(@class,'sapMDialog') and not(@aria-hidden='true')])[last()]//div[@role='checkbox' and @aria-checked='true']/ancestor::tr//td[@role='gridcell']//bdi"
        );
        const elemsArr = Array.from(elems);
        const resetFields: string[] = [];
        for (let i = 0; i < elemsArr.length; i++) {
            const text = ((await elemsArr[i].getText()) || "").trim();
            if (text && !resetFields.includes(text)) resetFields.push(text);
        }
        console.log("Fields after RESET:", resetFields);
        await this.clickWithWait($("//h1[.//text()='View Settings']/following::button[.//text()='OK']"));
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(8000);
        const headerElems = await $$("//th//span");
        const rowElems = await $$("//tbody//tr[2]//span[1][normalize-space()][not(normalize-space()='Yes')]");

        const headerTexts: string[] = [];
        const rowTexts: string[] = [];

        for (let i = 0; i < await headerElems.length; i++) {
        const t = ((await headerElems[i].getText()) || "").trim();
        if (t) headerTexts.push(t);
        }

        for (let i = 0; i < await rowElems.length; i++) {
        const t = ((await rowElems[i].getText()) || "").trim();
        if (t) rowTexts.push(t);
        }
        console.log("HEADER:", headerTexts);
        console.log("ROW:", rowTexts);
        for (const field of resetFields) {

        if (headerTexts.includes(field)) {
            console.log(`FOUND AFTER RESET: ${field} in HEADER`);
            continue;
        }

        if (rowTexts.includes(field)) {
            console.log(`FOUND AFTER RESET: ${field} in ROW`);
            continue;
        }

        throw new Error(`Reset failed, field missing: ${field}`);
        }
        console.log("resetFieldsInListView PASSED");
    }

    public async verifyShowHierarchy(): Promise<void> {
        await this.clickWithWait(this.showHierarchyBtn);
        await browser.pause(5000);  
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
                let text: string = (await chart.getText()) || (await chart.getAttribute("innerText")) || "";
                console.log(text);
            }
        }

        console.log("Closing Analytics Chart view");
        if (await this.closeAnalyticChartBtn.isDisplayed().catch(() => false)) {
        await this.clickWithWait(this.closeAnalyticChartBtn);
            return;
        }

        if (await this.cancelAnalyticChartBtn.isDisplayed().catch(() => false)) {
            await this.clickWithWait(this.cancelAnalyticChartBtn);
        }
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

     async readExcelData(filePath: string): Promise<Record<string, string>[]> {
        const xlsxModule: any = await import('xlsx');
        const XLSX: any = xlsxModule.default ?? xlsxModule;
        if (!fs.existsSync(filePath)) {
            throw new Error(`Excel file not found: ${filePath}`);
        }
        const workbook = XLSX.readFile(filePath);
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        const rows: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        return rows.map(row => {
            const normalised: Record<string, string> = {};
            for (const key of Object.keys(row)) {
                normalised[key.trim()] = String(row[key] ?? '').trim();
            }
            return normalised;
        });
    }

    async extractRowsFromXlsx(filePath: string, sheetName?: string): Promise<Record<string, string>[]> {
        const xlsxModule: any = await import('xlsx');
        const XLSX: any = typeof xlsxModule.readFile === 'function'
            ? xlsxModule
            : (xlsxModule.default ?? xlsxModule);
        let workbook: any;
        if (typeof XLSX.readFile === 'function') {
            workbook = XLSX.readFile(filePath, { cellDates: true });
        } else {
            const fs = await import('fs');
            const buffer = fs.readFileSync(filePath);
            workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true });
        }
        const targetSheet = sheetName && workbook.Sheets[sheetName]
            ? workbook.Sheets[sheetName]
            : workbook.Sheets[workbook.SheetNames[0]];
        if (!targetSheet) {
            throw new Error(`No sheet found in workbook at '${filePath}'`);
        }
        const rows: Record<string, string>[] = XLSX.utils.sheet_to_json(targetSheet, {
            defval: "",
            raw: false,
        });
        return rows;
    }

    async compareExcelData(uploadedPath: string, downloadedPath: string): Promise<{ ok: boolean; diff: string[] }> {
        const uploaded = await this.readExcelData(uploadedPath);
        const downloaded = await this.readExcelData(downloadedPath);
        const diff: string[] = [];

        if (uploaded.length !== downloaded.length) {
            diff.push(`Row count mismatch — uploaded: ${uploaded.length}, downloaded: ${downloaded.length}`);
        }

        const rowsToCheck = Math.min(uploaded.length, downloaded.length);
        for (let i = 0; i < rowsToCheck; i++) {
            const up = uploaded[i];
            const dn = downloaded[i];
            const columns = new Set([...Object.keys(up), ...Object.keys(dn)]);
            for (const col of columns) {
                const a = up[col] ?? '';
                const b = dn[col] ?? '';
                if (a !== b) {
                    diff.push(`Row ${i + 1}, column "${col}": uploaded="${a}", downloaded="${b}"`);
                }
            }
        }

        return { ok: diff.length === 0, diff };
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
        const dialogHeader = await $(`//h1//span[starts-with(normalize-space(),'Advanced Filters')]`);
        const firstFilterCheckbox = await $(`(//tr[@role='row'])[2]//div[@role='checkbox']`);
        let isOpen = await dialogHeader.isDisplayed().catch(() => false)
            || await firstFilterCheckbox.isDisplayed().catch(() => false);
        if (!isOpen) {
            console.log("Advanced Filters dialog not open → opening via Advanced Filter button");
            const advancedFilterBtn = await $('//button[@aria-label="Advanced Filter"]');
            await this.clickWithWait(advancedFilterBtn);
            await browser.pause(2000);
        }
        await firstFilterCheckbox.waitForDisplayed({ timeout: 60000 });
        await firstFilterCheckbox.click();
        await this.clickWithWait($('//button//bdi[text()="Apply"]'));
        await this.waitForBusyIndicatorToDisappear();
        const expandHeader = await $(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`);
        if (await expandHeader.isExisting() && await expandHeader.isDisplayed().catch(() => false)) {
            await this.clickWithWait(expandHeader);
            await browser.pause(500);
        }
        await this.clickWithWait($('//button//bdi[text()="Go"]'));
        console.log("Applied advanced filter");
        const criticalityElement = await $(`(//tr[@aria-rowindex='2']/preceding::span[text()='Criticality']/following::span[text()='A'])[1]`);
        await criticalityElement.waitForExist({ timeout: 20000 });
        await criticalityElement.scrollIntoView();
        await criticalityElement.waitForDisplayed({ timeout: 20000 });
        if (!(await criticalityElement.isDisplayed())) {
            throw new Error("Criticality is NOT 'A'");
        }

        console.log("Criticality is correctly 'A'");
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

    public async captureHeaderDetails(): Promise<Record<string, string>> {
        console.log("Capturing header details");
        await this.switchToFrame();
        await this.waitForBusyIndicatorToDisappear();
        const result: Record<string, string> = {};

        const headerSection = await $(`//button[@aria-label='Collapse Header' or @aria-label='Expand Header']/ancestor::section[1]`);
        if (!(await headerSection.isExisting())) {
            console.log("Header section not found");
            await browser.switchToParentFrame();
            return result;
        }

        const fieldBlocks = await headerSection.$$(`./div/div`);
        for (const block of fieldBlocks) {
            try {
                const statusTitles = await block.$$(`.//span[@data-colon=':' and normalize-space(text())]`);
                let consumed = false;
                for (const titleEl of statusTitles) {
                    const key = (await titleEl.getText()).replace(/:$/, "").trim();
                    if (!key) continue;
                    let value = "";
                    const valueEl = await titleEl.$(`./following-sibling::span[1]`);
                    if (await valueEl.isExisting()) value = (await valueEl.getText()).trim();
                    result[key] = value;
                    consumed = true;
                }
                if (consumed) continue;

                const bdiEl = await block.$(`.//bdi[normalize-space(text())]`);
                if (!(await bdiEl.isExisting())) continue;
                const key = (await bdiEl.getText()).replace(/:$/, "").trim();
                if (!key) continue;

                const parts: string[] = [];
                const links = await block.$$(`.//a`);
                for (const link of links) {
                    if (!(await link.isDisplayed().catch(() => false))) continue;
                    const t = (await link.getText()).trim();
                    if (t && !parts.includes(t)) parts.push(t);
                }
                const autoEls = await block.$$(`.//*[@dir='auto']`);
                for (const el of autoEls) {
                    if (!(await el.isDisplayed().catch(() => false))) continue;
                    const t = (await el.getText()).trim();
                    if (t && !parts.includes(t)) parts.push(t);
                }
                result[key] = parts.join(" ").trim();
            } catch { /* skip malformed block */ }
        }

        console.log(result);
        await browser.switchToParentFrame();
        return result;
    }

    public async getEntityNameAndId(): Promise<{ name: string; id: string }> {
        const idPrefixes = ["ASDA", "MSPE", "MSP", "PMPL", "PMNO", "PMWO", "TASK", "RECO_ASINT_", "OPTA", "ASMT", "OBJT", "INSP", "CML", "DOCU", "FLOC", "EQUI", "RCM", "HAZOP"];
        let name = "";
        let id = "";
        const expandBtn = await $("(//span[text()='Expand Header']/preceding-sibling::span//span)[2]");
        const collapseBtn = await $("(//span[text()='Collapse Header']/preceding-sibling::span//span)[2]");
        for (let i = 0; i < 3; i++) {
            try {
                if (i === 0 && await expandBtn.isDisplayed()) {
                    await expandBtn.waitForClickable({ timeout: 5000 });
                    await expandBtn.click();
                } else if (i === 1 && await collapseBtn.isDisplayed()) {
                    await collapseBtn.waitForClickable({ timeout: 5000 });
                    await collapseBtn.click();
                }
            } catch { /* expand/collapse not present */ }
            await browser.pause(500);
            if (!name) name = await this.getEntityName();
            if (!id) id = await this.getEntityId(idPrefixes);
            console.log(`Attempt ${i + 1} → name="${name || 'EMPTY'}" | id="${id || 'EMPTY'}"`);
            if (name && id) break;
        }
        console.log(`Captured entity → name="${name}" | id="${id}"`);
        return { name, id };
    }

    public async getEntityName(): Promise<string> {
        const xpath = "//header[.//@role='heading']//div[@role='heading']//span";
        try {
            await browser.waitUntil(async () => {
                const found = await $$(xpath);
                return (await found.length) > 0;
            }, { timeout: 5000, interval: 500 });
        } catch { /* no elements yet */ }
        const els = await $$(xpath);
        for (const el of els) {
            try {
                if (!(await el.isDisplayed())) continue;
                let txt = (await el.getText()) ?? "";
                if (!txt) txt = (await el.getAttribute("innerText")) ?? "";
                txt = txt.trim();
                if (txt) return txt;
            } catch { /* stale, continue */ }
        }
        return "";
    }

    public async getEntityId(idPrefixes: string[]): Promise<string> {
        const displayIdXpath = "//span[starts-with(normalize-space(),'Display ID')]";
        const displayIdEls = await $$(displayIdXpath);
        for (const el of displayIdEls) {
            try {
                if (!(await el.isDisplayed())) continue;
                const raw = ((await el.getText()) ?? "").trim();
                const stripped = raw.replace(/^Display ID\s*:?\s*/i, "").trim();
                if (stripped) return stripped;
                const siblingVal = await el.$(`./following-sibling::*[normalize-space(text())][1]`);
                if (await siblingVal.isExisting()) {
                    const sibTxt = ((await siblingVal.getText()) ?? "").trim();
                    if (sibTxt) return sibTxt;
                }
                const parentNext = await el.$(`./parent::*/following-sibling::*[normalize-space(.)][1]`);
                if (await parentNext.isExisting()) {
                    const pTxt = ((await parentNext.getText()) ?? "").trim();
                    if (pTxt) return pTxt.split(/\s+/)[0];
                }
            } catch { /* continue */ }
        }
        for (const prefix of idPrefixes) {
            const matchToken = prefix.endsWith("_") ? prefix : `${prefix}.`;
            const tags = prefix === "CML" ? ["bdi", "span"] : ["span", "bdi"];
            for (const tag of tags) {
                const xpath = `//${tag}[starts-with(normalize-space(text()),'${matchToken}')]`;
                const els = await $$(xpath);
                for (const el of els) {
                    try {
                        if (!(await el.isDisplayed())) continue;
                        let txt = (await el.getText()) ?? "";
                        if (!txt) txt = (await el.getAttribute("innerText")) ?? "";
                        txt = txt.trim();
                        if (txt && txt.startsWith(matchToken)) return txt;
                    } catch { /* continue */ }
                }
            }
        }
        return "";
    }

    public selectFromDropdown = async (el: any, downCount: number) => {
        await el.waitForDisplayed();
        await browser.pause(1500);
        await el.click();
        for (let i = 0; i < downCount; i++) {
            await browser.keys("ArrowDown");
        }
        await browser.keys("Enter");
        await browser.keys("Escape");  
        await browser.keys("Tab");
    };

    public rand(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public formatDate(daysMinus: number): string {
        const d = new Date();
        d.setDate(d.getDate() - daysMinus);
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    }

    public formatDatePlus(daysMinus: number): string {
        const d = new Date();
        d.setDate(d.getDate() + daysMinus);
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    }

    public async verifyProgressBar(element: any, sectionName: string) {
        if (!(await element.isExisting())) {
            throw new Error(`${sectionName} progress bar not found`);
        }
        const style = await element.getAttribute("style");
        if (!style) {
            throw new Error(`${sectionName} style attribute not found`);
        }
        const match = style.match(/flex-basis:\s*([\d.]+)%/);
        const value = match ? parseFloat(match[1]) : 0;
        if (value === 100) {
            console.log(`${sectionName} - All mandatory fields are filled`);
        } else {
            throw new Error(`${sectionName} - Not all mandatory fields filled, current: ${value}%`);
        }
    }

    async waitForBlockLayerToDisappear(timeoutInSeconds = 30): Promise<void> {
        const blockLayer = $("//div[contains(@class,'sapUiBLy')]");

        try {
            await browser.waitUntil(async () => {
                return !(await blockLayer.isDisplayed().catch(() => false));
            }, {
                timeout: timeoutInSeconds * 1000,
                interval: 200
            });
        } catch {
            console.warn("Block layer timeout");
        }
    }

    xpathString(value: string): string {
        const s = String(value);
        if (!s.includes('"')) {
            return `"${s}"`;
        }
        if (!s.includes("'")) {
            return `'${s}'`;
        }
        const parts = s.split('"').map(p => `"${p}"`).join(`, '"', `);
        return `concat(${parts})`;
    }
    
    public clickSuccessOkButton = async (timeoutMs: number = 15000) => {
            const successOk = $(`//header[.//text()='Success']/following::button[.//text()='OK']`);
            const deadline = Date.now() + timeoutMs;
            let clicked = false;
            while (Date.now() < deadline) {
                try {
                    if (await successOk.isDisplayed() && await successOk.isClickable()) {
                        console.log("Success popup OK found → clicking");
                        await successOk.click();
                        clicked = true;
                        break;
                    }
                } catch { /* not yet rendered */ }
                await browser.pause(500);
            }
            if (!clicked) {
                console.log("No OK button found within timeout");
            }
            console.log("Waiting for busy indicator after OK...");
            await this.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
    }

    public clickInformationOkButton = async (timeoutMs: number = 15000) => {
            const informationOk = $(`//header[.//text()='Information']/following::button[.//text()='OK']`);
            const deadline = Date.now() + timeoutMs;
            let clicked = false;
            while (Date.now() < deadline) {
                try {
                    if (await informationOk.isDisplayed() && await informationOk.isClickable()) {
                        console.log("Information popup OK found → clicking");
                        await informationOk.click();
                        clicked = true;
                        break;
                    }
                } catch { /* not yet rendered */ }
                await browser.pause(500);
            }
            if (!clicked) {
                console.log("No Information OK button found within timeout");
            }
            console.log("Waiting for busy indicator after Information OK...");
            await this.waitForBusyIndicatorToDisappear();
            await browser.pause(1500);
    }

    async switchToVisibleAppFrame(): Promise<void> {
        await browser.switchFrame(null);
        const frames = await $$('//iframe');
        for (const frame of frames) {
            try {
                await browser.switchFrame(frame);
                const search = await $('//input[@type="search" or @placeholder="Search"]');
                const header = await $('//h1|//header//*[contains(text(),"Documents") or contains(.,"Documents")]');
                if (await search.isExisting()) {
                    return;
                }
                await browser.switchFrame(null);
            } catch {
                await browser.switchFrame(null);
            }
        }
    }

    public async addDocument() {
        await this.switchToFrame();
        await this.attachmentsSection.waitForDisplayed({ timeout: 50000 });
        await this.attachmentsSection.click();
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(4000);
        const addLinkBtn = await $('//button[.//bdi[text()="Add"]]');
        await this.clickWithWait(addLinkBtn,1000);
        await browser.pause(2000);
        const documentOption = await $('//li[contains(.,"Add Document")]');
        await this.clickWithWait(documentOption);
        await browser.pause(2000);
        await this.uploadDocument('vessel-1.png');
        await browser.pause(2000);
        console.log("Document uploaded successfully, now filling the details to assign document");
        const docShortDescInput = await $(`//label[.//bdi[text()='Short Description']]//following::input[1]`);
        await docShortDescInput.waitForDisplayed({ timeout: 10000 });
        await docShortDescInput.setValue("Test Document");
        console.log("Document Short Description entered");

        const saveDocBtn = await $(`//footer//button[.//text()='Save']`);
        await this.clickWithWait(saveDocBtn);
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await this.handleUploadErrorIfAny("Failed to upload document");
        await this.clickSuccessOkButton();
        await browser.pause(2000);
    }

    public async handleUploadErrorIfAny(errorText: string): Promise<void> {
        const errorHeader = await $(`//header[.//text()='Error']`);
        const exactMsg = await $(`//span[text()='${errorText}']`);
        const partialMsg = await $(`//span[contains(text(),'Failed to upload')]`);

        const isHeaderVisible = await errorHeader.isDisplayed().catch(() => false);
        const isExact = await exactMsg.isDisplayed().catch(() => false);
        const isPartial = await partialMsg.isDisplayed().catch(() => false);

        if (!isHeaderVisible && !isExact && !isPartial) return;

        let detectedText = errorText;
        try {
            if (isExact) detectedText = (await exactMsg.getText()).trim() || errorText;
            else if (isPartial) detectedText = (await partialMsg.getText()).trim() || errorText;
            else {
                const headerMsg = await $(`//header[.//text()='Error']/following::span[normalize-space()][1]`);
                if (await headerMsg.isDisplayed().catch(() => false)) {
                    detectedText = (await headerMsg.getText()).trim() || errorText;
                }
            }
        } catch { /* keep default */ }
        console.log(`Error popup detected: '${detectedText}'`);

        const errorOk = await $(`//header[.//text()='Error']/following::button[.//text()='OK']`);
        const errorClose = await $(`//header[.//text()='Error']/following::button[.//text()='Close']`);
        if (await errorOk.isDisplayed().catch(() => false)) {
            await errorOk.click();
            await this.waitForBusyIndicatorToDisappear();
        } else if (await errorClose.isDisplayed().catch(() => false)) {
            await errorClose.click();
            await this.waitForBusyIndicatorToDisappear();
        }
        await browser.pause(1000);
        await this.closeOpenDialogViaCancel();
        throw new Error(`Operation failed: ${detectedText}`);
    }

    public async closeOpenDialogViaCancel(): Promise<void> {
        const cancelSelectors = [
            `//header[.//text()='Add Document']/following::button[.//bdi[text()='Cancel'] or .//text()='Cancel']`,
            `//header[.//text()='Add Link']/following::button[.//bdi[text()='Cancel'] or .//text()='Cancel']`,
            `//div[@role='dialog' and not(@aria-hidden='true')]//footer//button[.//bdi[text()='Cancel'] or .//text()='Cancel']`,
            `//footer//button[.//bdi[text()='Cancel'] or .//text()='Cancel']`
        ];
        for (const xpath of cancelSelectors) {
            const candidates = await $$(xpath);
            for (const btn of candidates) {
                try {
                    if (!(await btn.isDisplayed())) continue;
                    if (!(await btn.isClickable())) continue;
                    console.log(`Closing open dialog via Cancel (selector: ${xpath})`);
                    await this.clickWithWait(btn, 1000);
                    await this.waitForBusyIndicatorToDisappear();
                    await browser.pause(500);
                    return;
                } catch { /* try next */ }
            }
        }
        console.log("No Cancel button found to close dialog");
    }

    async addLink() {
        await this.switchToFrame();
        await this.attachmentsSection.waitForDisplayed({ timeout: 50000 });
        await this.attachmentsSection.click();
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(4000);
        const addLinkBtn = await $('//button[.//bdi[text()="Add"]]');
        await this.clickWithWait(addLinkBtn);
        await browser.pause(2000);
        const link = await $('//li[contains(.,"Add Link")]');
        await this.clickWithWait(link);
        await browser.pause(2000);
        console.log("Filling the details to assign link");
        const displayNameInput = await $(`//label[.//bdi[text()='Display Name']]//following::input[1]`);
        await displayNameInput.waitForDisplayed({ timeout: 10000 });
        await displayNameInput.setValue("Test Link");
        console.log("Display Name entered");
        console.log("Entering URL for the link");
        const linkInput = await $(`//label[.//bdi[text()='Link']]//following::input[1]`);
        await linkInput.setValue("https://testlink.com");
        await this.clickWithWait($('//button[.//bdi[text()="Save"]]'));
        await this.waitForBusyIndicatorToDisappear();
        await this.handleUploadErrorIfAny("Failed to upload document");
        await this.attachSuccMsg.waitForDisplayed({
            timeout: 20000,
            timeoutMsg: 'Link assign success message not displayed'
        });

        console.log("Link assign success message displayed");
        await this.clickSuccessOkButton();
        await browser.pause(2000);
    }

    public async gotoAttachmentsTabAndAssignAttachment() {
        console.log("Navigating to Attachment tab to assign attachment");
        await browser.pause(4000);
        await this.switchToFrame();
        await this.attachmentsSection.waitForDisplayed({ timeout: 50000 });
        await this.attachmentsSection.click();
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(4000);
        const addAttachmentBtn = await $('//section[.//bdi[text()="Attachments"]]/following::bdi[text()="Assign"]');
        const addAttachmentBtn2 = await $('//header[.//bdi[text()="Attachments"]]/following::bdi[text()="Assign"]');
        if(await addAttachmentBtn.isExisting()){
            await this.clickWithWait(addAttachmentBtn,2000);
        }
        else if(await addAttachmentBtn2.isExisting()){
            await this.clickWithWait(addAttachmentBtn2,2000);
        }
        await browser.pause(2000);
        await this.selectCheckboxes(2);
        await this.clickWithWait($('//footer//button[.//bdi[text()="Assign"]]'),1000);

        await this.attachSuccMsg.waitForDisplayed({
            timeout: 20000,
            timeoutMsg: 'Document assign success message not displayed'
        });

        console.log("Document assign success message displayed");
        await this.clickSuccessOkButton();
        console.log("Attachment assigned successfully");
    }

    public async deleteAttachmentAndVerify() {
        console.log("Deleting assigned attachment and verifying");
        await this.switchToFrame();
        await this.attachmentsSection.waitForDisplayed({ timeout: 50000 });
        await this.attachmentsSection.click();
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(4000);
        let selectAllCheckbox: any = null;
        try {
            await browser.waitUntil(async () => {
                const candidates = await $$(`//div[@role='checkbox' and @aria-label='Select all rows']`);
                for (const el of candidates) {
                    try {
                        if (await el.isDisplayed()) {
                            selectAllCheckbox = el;
                            return true;
                        }
                    } catch { /* stale, continue */ }
                }
                return false;
            }, { timeout: 30000, interval: 500, timeoutMsg: "Select all rows checkbox not displayed" });
        } catch (e) {
            console.log("Select all checkbox not found, nothing to delete");
            return;
        }
        await this.clickWithWait(selectAllCheckbox, 2000);
        const selectedState = await selectAllCheckbox.getAttribute("aria-checked");
        if (selectedState !== "true") {
            console.log("No attachment got selected for deletion");
            return;
        }
        console.log("All attachments selected for deletion");
        await this.clickWithWait($('//section[.//bdi[text()="Attachments"]]/following::bdi[text()="Delete"]/ancestor::button'),1000);
        await this.waitForBusyIndicatorToDisappear();
        await this.clickWithWait($('//button[.//bdi[text()="Yes"]]'),1000);
        await this.waitForBusyIndicatorToDisappear();
        await this.clickSuccessOkButton();
        await browser.pause(2000);
        console.log("Attachment deleted successfully");
    }

    public async verifyAttachmentSection() {
        const steps: { name: string; fn: () => Promise<void> }[] = [
            { name: "gotoAttachmentsTabAndAssignAttachment", fn: () => this.gotoAttachmentsTabAndAssignAttachment() },
            { name: "addDocument", fn: () => this.addDocument() },
            { name: "addLink", fn: () => this.addLink() },
            { name: "deleteAttachmentAndVerify", fn: () => this.deleteAttachmentAndVerify() }
        ];
        const errors: string[] = [];
        for (const step of steps) {
            try {
                console.log(`Running attachment step: ${step.name}`);
                await step.fn();
            } catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                console.log(`Attachment step '${step.name}' failed: ${msg}`);
                errors.push(`[${step.name}] ${msg}`);
            }
        }
        if (errors.length > 0) {
            throw new Error(`Attachment section verification failed in ${errors.length} step(s):\n - ${errors.join("\n - ")}`);
        }
        console.log("Attachment section verified successfully");
    }

    public async switchToFrame()
    {
        await browser.switchFrame(null);
        if (await this.funLocIframe.isExisting()) {
            await this.switchToIframe(this.funLocIframe);
        } else if (await this.equipmentIframe.isExisting()) {
            await this.switchToIframe(this.equipmentIframe);
        }else if(await this.hazopIframe.isExisting()){
            await this.switchToIframe(this.hazopIframe);
        }else if(await this.rcmIframe.isExisting()){
            await this.switchToIframe(this.rcmIframe);
        }else if(await this.ASDIframe.isExisting()){
            await this.switchToIframe(this.ASDIframe);
        }else if(await this.CMLIframe.isExisting()){
            await this.switchToIframe(this.CMLIframe);
        }else if(await this.mspIframe.isExisting()){
            await this.switchToIframe(this.mspIframe);
        }else if(await this.reccWorkbenchIframe.isExisting()){
            await this.switchToIframe(this.reccWorkbenchIframe);
        }else if(await this.notificationIframe.isExisting()){
            await this.switchToIframe(this.notificationIframe);
        }else if(await this.documentIframe.isExisting()){
            await this.switchToIframe(this.documentIframe);
        }else if(await this.inspectionIframe.isExisting()){
            await this.switchToIframe(this.inspectionIframe);
        }
    }

    public async navigateToHomePage()
    {
        await console.log("Navigating back to Home Page...");
        await browser.switchFrame(null);
        await this.clickWithWait(this.navigationBtn);
        await this.waitForBusyIndicatorToDisappear();
        await this.clickWithWait(this.homeBtn);
        await this.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
    }
}

export default new Utils();

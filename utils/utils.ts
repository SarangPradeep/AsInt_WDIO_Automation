import { $$, browser } from '@wdio/globals';
import * as path from 'path';
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

    async funLocFrameSwitch(): Promise<void> {
        console.log("--------------------------------------------- Before Switch ---------------------------------------------");
        console.log("URL:", await browser.getUrl());

        await browser.switchFrame(null);

        await this.funLocIframe.waitForExist({ timeout: 20000 });
        await browser.switchFrame(this.funLocIframe);

        console.log("--------------------------------------------- After Switch ---------------------------------------------");

        const internalTitle = await browser.execute(() => document.title);
        console.log("Internal Document Title:", internalTitle);

        const btnCount = await $$('button').length;
        console.log("Buttons found in current context:", btnCount);
    }

    async CMLFrameSwitch(): Promise<void> {
        console.log("--------------------------------------------- Before Switch ---------------------------------------------");
        console.log("URL:", await browser.getUrl());

        await browser.switchFrame(null);

        await this.CMLIframe.waitForExist({ timeout: 20000 });
        await browser.switchFrame(this.CMLIframe);

        console.log("--------------------------------------------- After Switch ---------------------------------------------");

        const internalTitle = await browser.execute(() => document.title);
        console.log("Internal Document Title:", internalTitle);

        const btnCount = await $$('button').length;
        console.log("Buttons found in current context:", btnCount);
    }

    async uploadDocument(fileName: string): Promise<void> {

        // Absolute path of file
        const filePath = path.join(process.cwd(), 'test_data/btp_applications/', fileName);

        // Upload file to browser temp storage
        const remoteFilePath = await browser.uploadFile(filePath);

        // Select file input (type="file")
        const fileInput = await $('//input[@type="file"]');

        // Set file
        await fileInput.waitForExist();
        await fileInput.setValue(remoteFilePath);
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

    async clickWithWait(element: any, delayAfter = 0, timeout = 30000): Promise<void> {
        const el = await element;
        await el.waitForDisplayed({ timeout });
        await el.scrollIntoView();
        await el.waitForClickable({
            timeout,
            timeoutMsg: `Not clickable: ${el.selector}`
        });
        try {
            await el.click();
        } catch {
            await browser.pause(1000);
            await el.scrollIntoView();
            await el.click();
        }
        if (delayAfter > 0) await browser.pause(delayAfter);
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
        console.log(`FUNC-LOC-${Math.floor(Math.random() * 10000)}`);
    return `FUNC-LOC-${Math.floor(Math.random() * 10000)}`;
    }

    async generateRandomFuncDescName(): Promise<string> {
        console.log(`FUNC-LOC-DESC-${Math.floor(Math.random() * 10000)}`);
    return `FUNC-LOC-DESC-${Math.floor(Math.random() * 10000)}`;
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

    // async selectCheckboxes(noOfItems: number) {
    //     for (let i = 1; i <= noOfItems; i++) {
    //         const checkbox = $(`(//tr[@role='row'])[${i * 2}]//div[@role='checkbox']`);
    //         await this.clickWithWait(checkbox, 500);
    //     }
    // }

    async selectCheckboxes(noOfEquipment: number): Promise<void> {
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
}

export default new Utils();
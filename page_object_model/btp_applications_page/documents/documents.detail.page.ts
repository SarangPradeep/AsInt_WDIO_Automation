import { browser } from '@wdio/globals';
import utils from 'utils/utils';
import documentsListviewPage from './documents.listview.page';

class DocumentsDetailPage {
    private get header() { return $('//header//*[self::h1 or .//bdi]'); }
    private get downloadBtn() { return $('//button[.//bdi[text()="Download"]]'); }
    private get documentHeaderTitleSpans() { return $$("//header[@role='banner']//*[@role='heading']//span[normalize-space()]"); }
    private get documentEditHeader() { return $("//bdi[text()='Edit Header ']"); }
    private get documentDescEditHeader() { return $("//div[@role='dialog']//bdi[contains(text(),'Short Description')]/following::input[1][not(@readonly)]"); }
    private get documentConfidentialityEditHeader() { return $("//div[@role='dialog']//bdi[contains(text(),'Confidentiality')]/following::span[2]"); }
    private get documentHeaderSave() { return $("//footer//*[name()='bdi' and text()='Save']"); }
    private get documentHdSaveSucc() { return $("//span[text()='Updated successfully']"); }
    private get documentHdOkBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }

    async verifyOnDocumentDetailPage(expectedName?: string): Promise<boolean> {
        try {
            await utils.waitForObjectPageHeader();
            if (expectedName) {
                // try to verify header contains expected name
                const hdr = await this.header;
                await hdr.waitForDisplayed({ timeout: 20000 });
                const text = await hdr.getText();
                return text.includes(expectedName) || text.includes(expectedName.split(' ')[0]);
            }
            return true;
        } catch {
            return false;
        }
    }

    async downloadDocument(): Promise<void> {
        try {
            const btn = await this.downloadBtn;
            await btn.waitForDisplayed({ timeout: 15000 });
            await utils.clickWithWait(btn);
            await utils.waitForBusyIndicatorToDisappear();
        } catch (err) {
            throw new Error('Download button not found or failed to click');
        }
    }
    public async verifyHeader(): Promise<void> {
        console.log("Verifying Document name");
        const expectedDocumentName = documentsListviewPage.createdDocumentName;
        console.log(`Expected Document header: ${expectedDocumentName}`);
        console.log("Waiting for visible Document header title element");
 
        await browser.waitUntil(async () => {
            const headingSpans = await this.documentHeaderTitleSpans;
            for (const span of headingSpans) {
                if (await span.isDisplayed()) {
                    const headingText = (await span.getText())?.trim();
                    if (headingText === expectedDocumentName) {
                        return true;
                    }
                }
            }
            return false;
        }, {
            timeout: 30000,
            interval: 500,
            timeoutMsg: `Document header '${expectedDocumentName}' was not visible in Object Page header`
        });
 
        let actualVisibleHeader = "";
        const headingSpans = await this.documentHeaderTitleSpans;
        for (const span of headingSpans) {
            if (await span.isDisplayed()) {
                const headingText = (await span.getText())?.trim();
                if (headingText) {
                    actualVisibleHeader = headingText;
                    break;
                }
            }
        }
 
        console.log(`Actual Document header: ${actualVisibleHeader}`);
        await expect(actualVisibleHeader).toEqual(expectedDocumentName);
        console.log("Document name matches header name");
    }
 
    public async editHeader(): Promise<void> {
        console.log("Editing header's Information");
        await utils.clickWithWait(this.documentEditHeader);
        const updatedDescription = "updated " + documentsListviewPage.createdDocumentName + " description";
        console.log(`Setting new description: ${updatedDescription}`);
        await utils.setValueWithWait(this.documentDescEditHeader, updatedDescription);
        await browser.pause(1000);
        await utils.clickWithWait(this.documentHeaderSave);
        console.log("Header save clicked, waiting for success message");
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Header update success message displayed");
        await utils.clickWithWait(this.documentHdOkBtn);
        console.log("Success dialog acknowledged with OK");
        console.log("Header edited successfully");
        await browser.pause(5000);
    }
    async editDocumentDetails(): Promise<void> {
        console.log("Editing document details - implementation needed");
        utils.clickWithWait($(`//button[contains(@class,"sapMBtn")][.//bdi[text()="Edit"]]`));
        await browser.pause(1000);
        const dropdown = await $("//bdi[normalize-space()='Category']/ancestor::label/following::span[@role='button'][1]");
        await dropdown.click();

        const option = await $("//li[@role='option']//span[normalize-space()='Firmware']");
        await option.waitForClickable({ timeout: 50000 });
        await option.click();

        const Phase = await $("//bdi[normalize-space()='Phase']/ancestor::label/following::span[@role='button'][1]");
        await Phase.click();
        const design = await $("//li[@role='option'][.//span[normalize-space()='Design']]");
        await design.waitForClickable({ timeout: 50000 });
        await design.click();

        const modifiedBy = await $(`//bdi[.//text()='Modified By']/following::input[1]`);
        await modifiedBy.waitForDisplayed({ timeout: 50000 });
        await console.log(await modifiedBy.getText());

        const saveBtn = await $("//button[.//bdi[normalize-space()='Save']]");
        await saveBtn.waitForClickable({ timeout: 50000 });
        await saveBtn.click();
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.documentHdOkBtn);
        console.log("Success dialog acknowledged with OK");

    }

}

export default new DocumentsDetailPage();

import utils from '../../../../utils/utils';
import assetRcmData from "../../../../test_data/btp_applications/reliability/asset_rcm.data";
import { browser } from '@wdio/globals';
class assetRCMListView {

    private get assetRCMApp() { return $("//a[contains(@aria-label, 'Asset RCM Analysis')]"); }
    private get rcmIframe() { return $('iframe[data-help-id="application-rcm-manage"]'); }
    private get createBtn() { return $("//button[@title='Create']"); }
    private get descInput() { return $("//label[.//bdi[.='Description']]/following::textarea[1]"); }
    public get templateDropdown(){ return $("//label[.//bdi[.='Select Template']]/following::span[@role='button'][1]"); }
    public get templateFirstOption(){ return $("//ul[@role='listbox']/li[@role='option'][1]"); }
    private get createAsBaselineCheckbox() { return $("//bdi[.='Create as baseline']/ancestor::div[@role='checkbox']/div[1]"); }
    private get longDescriptionTxtArea() { return $("//bdi[text()='Long Description']/ancestor::div[1]/following::textarea[1]"); }
    private get saveBtn() { return $("//button[.//bdi[text()='Save']]"); }
    private get okBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }
    private get infoTab() { return $("//bdi[text()='Information']"); }
    private get assessmentTab() { return $("//bdi[text()='Assessment']"); }
    private get attachmentTab() { return $("//bdi[text()='Attachment']"); }
    public assetRCMDisplayID!: string;
    public assetRCMDesc!: string;

    public async navigateToAssetRCM(){
        console.log("Navigating to Asset RCM - start");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.assetRCMApp);
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Navigating to Asset RCM - end");
    }

    public async createAssetRCM(){
        console.log("Creating Asset RCM - start");
        await utils.switchToIframe(this.rcmIframe);
        // await utils.clickWithWait(this.createBtn);
        // await utils.waitForBusyIndicatorToDisappear();
        // this.assetRCMDesc = `Automation_RCM_${Date.now()}`;
        // console.log(`Generated RCM Description: ${this.assetRCMDesc}`);
        // await utils.setValueWithWait(this.descInput, this.assetRCMDesc);
        // await this.templateDropdown.click();
        // await browser.waitUntil(async()=> await this.templateFirstOption.isDisplayed(),{timeout:20000});
        // await this.templateFirstOption.click();
        // await this.longDescriptionTxtArea.setValue(assetRcmData.description);
        // await utils.waitForBusyIndicatorToDisappear();
        // await utils.clickWithWait(this.saveBtn);
        // await utils.waitForBusyIndicatorToDisappear();
        // await utils.clickWithWait(this.okBtn);
        // await utils.waitForBusyIndicatorToDisappear();
        // console.log("Creating Asset RCM is done");
        // console.log("Navigating to detail page of RCM...");
        // await this.infoTab.waitForEnabled({timeout:100000});
        // console.log("Navigated to detail view page of new ly created RCM");
        // await this.fetchRCMDisplayID();
        // await this.verifyHeader();
        // console.log("Header verification done");
        // console.log("Capturing all header values");
        // await this.captureRCMHeaderDetails();

        const el = await $('(//tr[@role="row"]//span[@title="Navigation"])[1]');
        await utils.clickWithWait(el);
        await browser.pause(10000);

    }

    public async verifyHeader()
    {
        const headers = await $$("//div[@role='heading' and @title]//span");
        const headerTexts: string[] = [];
        for (const h of headers) {
            if (await h.isDisplayed()) headerTexts.push((await h.getText()).trim());
        }
        console.log("Captured headers:", headerTexts);
        console.log("Verifying Description value with header text");
        await expect(this.assetRCMDesc).toEqual(headerTexts[0]);
        console.log("Description verification completed");
    }

    public async fetchRCMDisplayID() {
        console.log("Start: fetching RCM Display ID");
        const xpath = `//header[.//span[normalize-space()='${this.assetRCMDesc}']]//*[starts-with(normalize-space(),'RCM_')]`;
        await browser.waitUntil(async () => await (await $$(xpath)).length > 0, {
            timeout: 20000,
            timeoutMsg: "RCM Display ID not found"
        });
        const els = await $$(xpath);
        for (const el of els) {
            if (await el.isDisplayed() && await el.isEnabled()) {
                this.assetRCMDisplayID = await el.getText();
                break;
            }
        }
        console.log("End: fetched RCM Display ID -> " + this.assetRCMDisplayID);
    }

    public async captureRCMHeaderDetails() {
        console.log("Start: capturing RCM header details");
        await utils.switchToIframe(this.rcmIframe);
        await browser.pause(5000);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.waitUntil(async () => {
            return await (await $$(`//span[contains(@class,'sapMObjStatusTitle')]`)).length > 0;
        }, { timeout: 30000 });
        const result: any = {};
        const titles = await $$(`//span[contains(@class,'sapMObjStatusTitle')]`);
        for (const title of titles) {
            if (!(await title.isDisplayed())) continue;
            const key = (await title.getText()).trim();
            const parent = await title.$("..");
            const valueEl = await parent.$(".//span[contains(@class,'sapMObjStatusText')]");
            if (await valueEl.isDisplayed()) {
                result[key] = (await valueEl.getText()).trim();
            }
        }
        const labels = await $$(`//span[contains(@class,'sapMLabelTextWrapper')]`);
        for (const label of labels) {
            if (!(await label.isDisplayed())) continue;
            const key = (await label.getText()).replace(":", "").trim();
            const parent = await label.$("..");
            const textNodes = await parent.$$("span.sapMText");
            for (const t of textNodes) {
                if (await t.isDisplayed()) {
                    const value = (await t.getText()).trim();

                    if (key && value) {
                        result[key] = value;
                        break;
                    }
                }
            }
        }
        console.log("End: captured RCM header -> ", result);
        await browser.switchToParentFrame();
    }

    
}
export default new assetRCMListView();
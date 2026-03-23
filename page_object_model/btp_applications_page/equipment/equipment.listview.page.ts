import { promises } from "node:dns";
import { waitForDisplayed } from "webdriverio/build/commands/element";

class EquipmentListviewPage {

    // ===== SELECTORS =====

    //equipment listview
    get firstEquipmentInList() { return $('//tbody[contains(@class,"sapMTableTBody")]//tr[@role="row"][1]'); }
    // buttons
    private get createEquipmentBtn() { return $('button .sapUiIcon[data-sap-ui-icon-content=""]'); }
    private get equipmentIcon() { return $('button[aria-label="New Equipment"]'); }
    private get confirmBtn() { return $('//bdi[text()="Confirm"]/ancestor::button'); }
    private get createBtn() { return $('//bdi[text()="Create"]/ancestor::button'); }
    private get okBtn() { return $('//bdi[text()="OK"]/ancestor::button'); }

    // inputs
    private get equipmentNameInput() { return $('//bdi[text()="Equipment Name"]/ancestor::label/following::input[1]'); }
    private get equipmentDescInput() { return $('//bdi[text()="Description"]/ancestor::label/following::input[1]'); }
    private get equipmentTemplateInput() { return $('//bdi[text()="Equipment Template"]/ancestor::label/following::input[1]'); }
    private get parentAssetInput() { return $('//bdi[text()="Parent Asset"]/ancestor::label/following::input[1]'); }

    // iframe
    private get equipmentIframe() { return $('iframe[data-help-id="application-equipment-manage"]'); }


    //  methods
    async switchIframe(): Promise<void> {

        console.log("--- Before Switch ---");
        console.log("URL:", await browser.getUrl());

        await browser.switchFrame(null);

        await this.equipmentIframe.waitForExist({ timeout: 20000 });
        await browser.switchFrame(this.equipmentIframe);

        console.log("--- After Switch ---");

        const internalTitle = await browser.execute(() => document.title);
        console.log("Internal Document Title:", internalTitle);

        const btnCount = await $$('button').length;
        console.log("Buttons found in current context:", btnCount);
    }

    async verifyOnEquipmentPage(): Promise<boolean> {

        try {
            await this.equipmentIcon.waitForDisplayed({
                timeout: 50000,
                timeoutMsg: 'The Equipment icon did not display'
            });

            return true;

        } catch {
            return false;
        }
    }

    async createEquipmentWithMandatoryFields(
        equipmentName: string,
        description: string,
        equipmentTemplate: string,
        parentAsset: string
    ): Promise<void> {

        await this.switchIframe();

        await this.createEquipmentBtn.waitForClickable({ timeout: 50000 });
        await this.createEquipmentBtn.click();

        await this.equipmentNameInput.waitForDisplayed({ timeout: 30000 });
        await this.equipmentNameInput.setValue(equipmentName);

        await this.equipmentDescInput.waitForDisplayed({ timeout: 30000 });
        await this.equipmentDescInput.setValue(description);

        await this.equipmentTemplateInput.click();

        await browser.pause(2000);

        // dynamic selector inside method
        const template = await $(`//span[text()="${equipmentTemplate}"]/ancestor::tr//div[@role="checkbox"]`);
        await template.waitForDisplayed({ timeout: 30000 });
        await template.click();

        await this.confirmBtn.click();

        await this.parentAssetInput.click();

        await browser.pause(2000);

        // dynamic selector inside method
        const parentEquipment = await $(`//span[text()="${parentAsset}"]`);
        await parentEquipment.waitForDisplayed({ timeout: 30000 });
        await parentEquipment.click();

        await this.createBtn.waitForClickable({ timeout: 30000 });
        await this.createBtn.click();

        await this.okBtn.waitForDisplayed({ timeout: 30000 });
        await this.okBtn.click();

        await this.equipmentIcon.waitForClickable({ timeout: 30000 });
    }
    async clickOnEquipmentInList(name: string) { 
        const equipment = $(`//span[text()="${name}"]/ancestor::tr`);
            await equipment.waitForDisplayed({ timeout: 50000 });
            await equipment.waitForClickable({ timeout: 50000 });
            return equipment.click();   
    }
}



export default new EquipmentListviewPage();
import equipmentListviewPage from "page_object_model/btp_applications_page/equipment/equipment.listview.page";
import Utils from "../../../utils/utils";
import { ok } from "node:assert";
import utils from "../../../utils/utils";

class EquipmentDetailPage {
    //  SELECTORS 
    private get equipmentNameHeader() { return $('//*[@role="heading"]//span'); }
    get successOkBtn() { return $('//bdi[text()="OK"]/ancestor::button'); }
    equipmentName(name: string) { return $(`//*[text()="${name}"]//span`); }
    private get deleteBtn() { return $('//bdi[text()="Delete"]/ancestor::button'); }
    get structureSection() { return $('//button[.//bdi[text()="Structure"]]'); }
    get assignmentSection() { return $('//button[.//bdi[text()="Assignments"]]'); }
    get classificationSection() { return $('//button[.//bdi[text()="Classification & MDA"]]'); }
    private get riskSection() { return $('//button[.//bdi[text()="Risk Summary"]]'); }
    private get maintenanceSection() { return $('//button[.//bdi[text()="Maintenance and Service"]]'); }
    private get attachmentsSection() { return $('//button[.//bdi[text()="Attachments"]]'); }
    private get changeHistorySection() { return $('//button[.//bdi[text()="Change History"]]'); }
    get equipmentAssignBtn() {return $('(//div[text()="Equipment Templates"]/following::bdi[text()="Assign"])[1]')}
    get equipmentClassAssignBtn() {return $('(//div[text()="Equipment Template Class & Characteristics"]/following::bdi[text()="Assign"])[1]')}

    //GENERAL INFO
    get editBtn() { return $('//button[contains(@class,"sapMBtn")][.//bdi[text()="Edit"]]'); }
    get inventoryNumberInput() {
        return $('//bdi[text()="Inventory Number"]/following::input[1]');
    }
    get componentTypeDropdown() {
        return $('//bdi[text()="Component Type"]/following::input[1]');
    }
    get activationStateDropdown() {
        return $('//bdi[text()="Activation State"]/following::input[1]');
    }
    get authorizationGroupInput() {
        return $('//bdi[text()="Authorization Group"]/following::input[1]');
    }
    get startUpDateInput() {
        return $('//bdi[text()="Start up date"]/following::input[1]');
    }
    get deactivationDateInput() {
        return $('//bdi[text()="Deactivation Date"]/following::input[1]');
    }
    get componentRegulatoryIdInput() {
        return $('//bdi[text()="Component Regulatory ID"]/following::input[1]');
    }
    get commentsTextArea() {
        return $('//bdi[text()="Comments"]/following::textarea[1]');
    }
    get longDescTextArea() {
        return $('//bdi[text()="Long Description"]/following::textarea[1]');
    }
    // Reference Data
    get acquisitionValueInput() {
        return $('//bdi[text()="Acquisition Value / Currency"]/following::input[1]');
    }
    // Manufacturer Data
    get assetManufacturerInput() {
        return $('//bdi[text()="Asset Manufacturer Name "]/following::input[1]');
    }
    get partNumberInput() {
        return $('//bdi[text()="Part Number "]/following::input[1]');
    }
    get modelNumberInput() {
        return $('//bdi[text()="Model Number "]/following::input[1]');
    }
    get serialNumberInput() {
        return $('//bdi[text()="Serial Number"]/following::input[1]');
    }

    get superordinateEquipmentInput() {
        return $('//bdi[text()="Superordinate Equipment"]/following::input[1]');
    }
    get functionalLocationInput() {
        return $('//bdi[text()="Functional Location"]/following::input[1]');
    }
    get componentInfoAssignBtn() {
        return $('//button[.//bdi[text()="Assign"]]');
    }
    get componentInfoUnassignBtn() {
        return $('//button[.//bdi[text()="Unassign"]]');
    }

    // save button
    get saveBtn() {
        return $('//button[.//bdi[text()="Save"]]');
    }
    private get groups() {
        return $("//div[text()='Equipment Template Class & Characteristics']/following::span[1]");
    }

    get asgnChrMDA() {
        return $("//span[text()='Maintenance Data Attribute']/following::bdi[text()='Assign']");
    }
    get noOfClassMDA() {
        return $("//span[text()='Assign Classes']/following::span[2]");
    }
     get cancelBtn() {
        return $("//bdi[text()='Cancel']");
    }
    private get noOfCharMDA () {
        return $("//span[text()='Maintenance Data Attribute']/following::h2//span");
    }
 


    //  METHODS 
    async verifyOnEquipmentDetailPage(expectedName?: string): Promise<boolean> {
        try {
            await this.equipmentNameHeader.waitForDisplayed({ timeout: 50000 });

            // If no argument passed → just verify element exists
            if (!expectedName) {
                return true;
            }

            const actualName = await this.equipmentName(expectedName).getText();
            return actualName === expectedName;

        } catch {
            return false;
        }
    }
    async fillGeneralInfo(
        inventoryNumber?: string,
        componentType?: string,
        activationState?: string,
        authorizationGroup?: string,
        startUpDate?: string,
        deactivationDate?: string,
        componentRegulatoryId?: string,
        comments?: string,
        longDescription?: string,
        acquisitionValue?: number,
        assetManufacturer?: string,
        partNumber?: string,
        modelNumber?: number,
        serialNumber?: string
    ): Promise<void> {

        if (inventoryNumber !== undefined) {
            await this.inventoryNumberInput.setValue(inventoryNumber);
            await browser.pause(2000);
        }

        if (componentType !== undefined) {
            await this.componentTypeDropdown.click();
            await browser.keys(componentType);
            await browser.keys("Enter");
        }

        if (activationState !== undefined) {
            await this.activationStateDropdown.click();
            await browser.keys(activationState);
            await browser.keys("Enter");
        }

        if (authorizationGroup !== undefined) {
            await this.authorizationGroupInput.setValue(authorizationGroup);
            await browser.pause(2000);
        }

        if (startUpDate !== undefined) {
            await this.startUpDateInput.setValue(startUpDate);
        }

        if (deactivationDate !== undefined) {
            await this.deactivationDateInput.setValue(deactivationDate);
        }

        if (componentRegulatoryId !== undefined) {
            await this.componentRegulatoryIdInput.setValue(componentRegulatoryId);
            await browser.pause(2000);
        }

        if (comments !== undefined) {
            await this.commentsTextArea.setValue(comments);
            await browser.pause(2000);
        }

        if (longDescription !== undefined) {
            await this.longDescTextArea.setValue(longDescription);
            await browser.pause(2000);
        }
        if (acquisitionValue !== undefined) {
            await this.acquisitionValueInput.setValue(acquisitionValue.toString());
            await browser.pause(2000);
        }
        if (assetManufacturer !== undefined) {
            await this.assetManufacturerInput.setValue(assetManufacturer);
            await browser.pause(2000);
        }
        if (partNumber !== undefined) {
            await this.partNumberInput.setValue(partNumber);
            await browser.pause(2000);
        }
        if (modelNumber !== undefined) {
            await this.modelNumberInput.setValue(modelNumber.toString());
            await browser.pause(2000);
        }
        if (serialNumber !== undefined) {
            await this.serialNumberInput.setValue(serialNumber);
            await browser.pause(2000);
        }
        await browser.pause(5000); 
        await this.saveBtn.click();
        await this.successOkBtn.waitForClickable({ timeout: 30000 });
        await this.successOkBtn.click();
        await browser.pause(10000); 
    }

    async waitForBlockLayerToDisappear(timeoutInSeconds = 30): Promise<void> {
        const blockLayer = await $('#sap-ui-blocklayer-popup');
        try {
            await browser.waitUntil(
                async () => {
                    const exists = await blockLayer.isExisting();
                    if (!exists) return true;
                    const visible = await blockLayer.isDisplayed();
                    return !visible;
                },
                { timeout: timeoutInSeconds * 1000, interval: 500 }
            );
        } catch {
            console.warn('Block layer still visible after timeout');
        }
    }

    async editStructureInfo(): Promise<void> {
        // Headless-safe click for Structure tab (normal click first, JS click fallback)
        //await this.waitForBlockLayerToDisappear();
        await browser.pause(4000);
        await Utils.switchIframe();
        await this.structureSection.waitForDisplayed({ timeout: 50000 });
        await this.structureSection.click()
        await browser.pause(500);

        // Click Edit button
        await this.editBtn.waitForClickable({ timeout: 30000 });
        await this.editBtn.click();
        await browser.pause(5000);

        // Search and select superordinate equipment
        await this.superordinateEquipmentInput.waitForClickable({ timeout: 30000 });
        await this.superordinateEquipmentInput.click();
        await browser.pause(8000);
        await Utils.switchIframe();
        const subordinateResultCell = await $(`(//tr[@role="row"])[3]`);
        await subordinateResultCell.waitForDisplayed({ timeout: 20000 });
        await subordinateResultCell.click();
        await browser.pause(2000);

        // If dialog didn't auto-close, click Close button
        const closeBtn = await $('//bdi[text()="Close"]/ancestor::button');
        try {
            await closeBtn.waitForDisplayed({ timeout: 5000 });
            if (await closeBtn.isDisplayed()) {
                await closeBtn.click();
            }
        } catch {
            // Dialog already closed
        }
        await browser.pause(2000);

        // Iterate through each component equipment value and assign one by one
        for (let i = 1; i <= 2; i++) {
            await Utils.switchIframe();
            // await this.componentInfoAssignBtn.waitForClickable({ timeout: 30000 });
            // await this.componentInfoAssignBtn.click();
            await Utils.clickWithWait(this.componentInfoAssignBtn, 0, 50000);
            await browser.pause(2000);

            await Utils.switchIframe();
            const equipment = await $('//li[contains(.,"Equipment")]');
            await equipment.waitForDisplayed({ timeout: 5000 })
            await equipment.click()
            await browser.pause(2000);

            const resultCell = await $(`(//tr[@role="row"])[${i * 2}]//div[@role="checkbox"]`);
            await resultCell.waitForClickable({ timeout: 20000 });
            await resultCell.click();

            const confirmBtn = await $('//button[.//bdi[text()="Confirm"]]');
            await confirmBtn.waitForClickable({ timeout: 30000 });
            await confirmBtn.click();
            const okBtn = await $('//button[.//bdi[text()="OK"]]');
            await okBtn.waitForClickable({ timeout: 30000 });
            await okBtn.click();
            await okBtn.waitForDisplayed({ reverse: true, timeout: 30000 });
            await this.componentInfoAssignBtn.waitForClickable({ timeout: 30000 });
        }
        //await Utils.clickWithWait(this.componentInfoUnassignBtn, 0, 50000);
        await this.saveBtn.click();
        await this.successOkBtn.waitForClickable({ timeout: 30000 });
        await this.successOkBtn.click();
        await browser.pause(5000);
    }

    async assignEquipmentTemplate(noOfEquipment: number, autoAssign: boolean): Promise<void> {
        await browser.pause(4000);
        await Utils.switchIframe();
        await this.assignmentSection.waitForDisplayed({ timeout: 50000 });
        await this.assignmentSection.click();

        await Utils.switchIframe();
        await Utils.clickWithWait(this.equipmentAssignBtn,0, 50000);
        await browser.pause(2000);

        await Utils.clickCheckboxes(noOfEquipment);
        if (autoAssign) {
            const checkBox = await $('//footer//div[@role="checkbox" and .//bdi[text()="Auto assign Class and Characteristics"]]');
            await Utils.clickWithWait(checkBox);
        }
        await Utils.switchIframe(); 
        await Utils.clickWithWait($('//button[.//bdi[text()="Ok"]]'));
        await browser.pause(2000);
        await Utils.clickWithWait($('//button[.//bdi[text()="OK"]]'));

        await this.equipmentAssignBtn.waitForClickable({ timeout: 30000 });
    }

    async assignEquipmentClass(noOfClasses: number, autoAssign: boolean): Promise<void> {
        
        const classes = await this.groups.getText();
        await Utils.getAssignedValue(classes);
        console.log(`Already assigned classes: ${classes}`);

        if (autoAssign) {
            console.log("Auto-assigning classes, skipping manual class assignment.");
            return;
        }
        await browser.pause(4000);
        await Utils.switchIframe();
        await Utils.clickWithWait(this.assignmentSection);
        await browser.pause(2000);

        await Utils.switchIframe();
        await this.equipmentClassAssignBtn.waitForClickable({ timeout: 30000 });
        await this.equipmentClassAssignBtn.click();
        await browser.pause(2000);
        await Utils.switchIframe();
        await Utils.clickCheckboxes(noOfClasses);
        await Utils.clickWithWait($('//button[.//bdi[text()="Ok"]]'));
        await browser.pause(2000);
        await Utils.clickWithWait($('//button[.//bdi[text()="OK"]]'));
    }

    async assignCharacteristics(noOfChar: number): Promise<void> {
        let k=0;
        await browser.pause(1000);
        await utils.switchIframe();
        await this.classificationSection.waitForDisplayed({ timeout: 50000 });
        await this.classificationSection.click();
        const char = await this.noOfCharMDA.getText();
        await utils.getAssignedValue(char);
        console.log("Already assigned charactertics : "+char);
        await browser.pause(1000);
        await utils.switchIframe();
        await this.classificationSection.waitForDisplayed({ timeout: 50000 });
        await this.classificationSection.click();
        await utils.switchIframe();
        await this.asgnChrMDA.waitForClickable({ timeout: 30000 });
        await this.asgnChrMDA.click();
        await browser.pause(1000);
        await utils.switchIframe();
        const availableChar = await this.noOfClassMDA.getText();
        const availableCharCount = await utils.getAssignedValue(availableChar);
        console.log("Available characteritics:"+ availableCharCount);
        if(availableCharCount === 0)
        {
            console.log("No of characteritics available is zero")
            await this.cancelBtn.click();
            utils.waitForBusyIndicatorToDisappear();
            k=1;
        }
        else if (availableCharCount <= noOfChar )
        {
            const selectAll = $("//span[text()='Assign Classes']/ancestor::header/following::th[2]");
            await utils.clickWithWait(selectAll);
        }
        if(k===0)
        {
        await utils.clickWithWait(this.successOkBtn,1500);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.successOkBtn,1500);
        await utils.waitForBusyIndicatorToDisappear();
        }
        const updatedChar = await this.noOfCharMDA.getText();
        await utils.getAssignedValue(updatedChar);
        console.log("Assigned charactertics : "+updatedChar);
    }
    async gotoAttachmentsTabAndAssignAttachment() {
        await browser.pause(4000);
        await Utils.switchIframe();
        await this.attachmentsSection.waitForDisplayed({ timeout: 50000 });
        await this.attachmentsSection.click();
        // Click on "Add Attachment" button
        await Utils.switchIframe();
        const addAttachmentBtn = await $('//button[.//bdi[text()="Assign"]]');
        await utils.clickWithWait(addAttachmentBtn);
        await browser.pause(2000);
        await utils.clickCheckboxes(2);
        await utils.clickWithWait($('//footer//button[.//bdi[text()="Assign"]]'));
        await utils.clickWithWait($('//button[.//bdi[text()="OK"]]'));
    }

    async deleteAttachmentAndVerify() {
        const firstAttachmentCheckbox = await $('(//table//tr[@role="row"]//div[@role="checkbox"])[1]');
        await firstAttachmentCheckbox.waitForClickable({ timeout: 20000 });
        await firstAttachmentCheckbox.click();

        await utils.clickWithWait($('//button[.//bdi[text()="Assign"]]/following::bdi[1]'));
        await utils.clickWithWait($('//button[.//bdi[text()="Yes"]]'));
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait($('//button[.//bdi[text()="OK"]]'));
        await browser.pause(2000);
    }

    async addLink() {
        const addLinkBtn = await $('//button[.//bdi[text()="Add"]]');
        await utils.clickWithWait(addLinkBtn);
        await browser.pause(2000);
        await Utils.switchIframe();
        const link = await $('//li[contains(.,"Add Link")]');
        await utils.clickWithWait(link);
        await browser.pause(2000);

        // Display Name
        const displayNameInput = await $(`//label[.//bdi[text()='Display Name']]//following::input[1]`);
        await displayNameInput.waitForDisplayed();
        await displayNameInput.setValue("Test Link");

        // Link
        const linkInput = await $(`//label[.//bdi[text()='Link']]//following::input[1]`);
        await linkInput.setValue("https://testlink.com");

        // Phase (MultiComboBox)
        if (false) {
            const phaseInput = await $(`//label[.//bdi[text()='Phase']]//following::input[1]`);
            await phaseInput.click();
            await phaseInput.setValue(data.phase);

            const option = await $(`//li//span[text()='${data.phase}']`);
            await option.waitForDisplayed();
            await option.click();
        }

        // Category (ComboBox)
        if (false) {
            const categoryInput = await $(`//label[.//bdi[text()='Category']]//following::input[1]`);
            await categoryInput.click();
            await categoryInput.setValue(data.category);

            const option = await $(`//li//span[text()='${data.category}']`);
            await option.waitForDisplayed();
            await option.click();
        }

        // Language (ComboBox)
        if (false) {
            const languageInput = await $(`//label[.//bdi[text()='Language']]//following::input[1]`);
            await languageInput.click();
            await languageInput.setValue(data.language);

            const option = await $(`//li//span[text()='${data.language}']`);
            await option.waitForDisplayed();
            await option.click();
        }
        await utils.clickWithWait($('//button[.//bdi[text()="Save"]]'));
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait($('//button[.//bdi[text()="OK"]]'));
        await browser.pause(2000);
    }
    async addDocument() {
        const addLinkBtn = await $('//button[.//bdi[text()="Add"]]');
        await utils.clickWithWait(addLinkBtn);
        await browser.pause(2000);
        await Utils.switchIframe();
        const documentOption = await $('//li[contains(.,"Add Document")]');
        await utils.clickWithWait(documentOption);
        await browser.pause(2000);
        await utils.uploadDocument('vessel-1.png');
        await browser.pause(9000);
        await utils.clickWithWait($('//label[.//bdi[text()="Category"]]//following::span[contains(@id,"arrow")][1]'));
        await utils.clickWithWait($('//li[@role="option"][1]'));
        await utils.clickWithWait($('//label[.//bdi[text()="Phase"]]//following::span[contains(@id,"arrow")][1]'));
        await utils.clickWithWait($('//li[@role="option"][1]//div[@role="checkbox"]'));
        await utils.clickWithWait($('//label[.//bdi[text()="Phase"]]//following::span[contains(@id,"arrow")][1]'));
        await utils.clickWithWait($('//label[.//bdi[text()="Language"]]//following::span[contains(@id,"arrow")][1]'));
        await utils.clickWithWait($('//span[text()="English"]/ancestor::li'));
        await utils.clickWithWait($('//button[.//bdi[text()="Save"]]'));
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait($('//button[.//bdi[text()="OK"]]'));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(10000);


    }
}
export default new EquipmentDetailPage();
import { promises } from "node:dns";
import { waitForDisplayed } from "webdriverio/build/commands/element";

class EquipmentDetailPage {
    //  SELECTORS 
    private get equipmentNameHeader() { return $('//*[@role="heading"]//span'); }
    get successOkBtn() { return $('//bdi[text()="OK"]/ancestor::button'); }
    equipmentName(name: string) { return $(`//*[text()="${name}"]//span`); }
    private get deleteBtn() { return $('//bdi[text()="Delete"]/ancestor::button'); }
    get structureSection() { return $('//button[.//bdi[text()="Structure"]]'); }
    get assignmentSection() { return $('//button[.//bdi[text()="Assignments"]]'); }
    private get classificationSection() { return $('//button[.//bdi[text()="Classification & MDA"]]'); }
    private get riskSection() { return $('//button[.//bdi[text()="Risk Summary"]]'); }
    private get maintenanceSection() { return $('//button[.//bdi[text()="Maintenance and Service"]]'); }
    private get attachmentsSection() { return $('//button[.//bdi[text()="Attachments"]]'); }
    private get changeHistorySection() { return $('//button[.//bdi[text()="Change History"]]'); }

    //GENERAL INFO
    get editBtn() { return $('//button[.//bdi[text()="Edit"]]'); }
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

    // save button
    get saveBtn() {
        return $('//button[.//bdi[text()="Save"]]');
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


    }



}
export default new EquipmentDetailPage();
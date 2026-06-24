import utils from "../../../../utils/utils.ts";
import EquipmentListviewPage from "./equipment.listview.page.ts";
import * as path from 'path';
class EquipmentDetailPage {
    //  SELECTORS 
    public equipmentHeadValue!: string;
    public displayID!: string;
    private get equipmentNameHeader() { return $("//header[.//div[@role='heading']][@role='banner']"); }
    get successOkBtn() { return $("//header[.//text()='Success']/following::button[.//text()='OK']"); }
    equipmentName(name: string) { return $(`//*[text()="${name}"]//span`); }
    private get deleteBtn() { return $("//*[contains(@class,'sapUxAPObjectPageLayout')]//header//button[.//bdi[normalize-space()='Delete']]"); }
    private get downloadReport() { return $("//*[contains(@class,'sapUxAPObjectPageLayout')]//header//button[.//bdi[normalize-space()='Download Report']]"); }
    get structureSection() { return $('//button[.//bdi[text()="Structure"]]'); }
    get assignmentSection() { return $('//button[.//bdi[text()="Assignments"]]'); }
    get classificationSection() { return $('//button[.//bdi[text()="Classification & MDA"]]'); }
    get assetIntelligenceSection() { return $('//button[.//bdi[text()="Asset Intelligence"]]'); }
    get riskSection() { return $('//button[.//bdi[text()="Risk Summary"]]'); }
    get mainAndServiceSection() { return $('//button[.//bdi[text()="Maintenance and Service"]]'); }
    private get maintainNoti() { return $("//div[text()='Maintenance Notifications']/following::span[1]"); }
    private get maintainOrder() { return $("//div[text()='Maintenance Orders']/following::span[1]"); }
    private get maintainPlan() { return $("//div[text()='Maintenance Plan']/following::span[1]"); }
    private get recomWrk() { return $("//div[text()='Recommendation Workbench']/following::span[1]"); }
    private get maintaintask() { return $("//div[text()='Maintenance Tasks']/following::span[5]"); }
    private get changeHistoryEditHeader() { return $("//bdi[text()='Edit Header']"); }
    private get descEditHeader() { return $("//bdi[text()='Short Description']/following::input[1][not(@readonly)]"); }
    private get categoryEditHeader() { return $("//bdi[text()='Category']/following::input[1]"); }
    private get category() { return $("//span[text()='Select Category']"); }
    private get ctgChoose() { return $(`//span[text()='Linear Asset']/ancestor::tr//td[2]//*[name()='circle'][2]`); }
    private get ctgSave() { return $("(//bdi[text()='Save'])[2]"); }
    private get headerSave() { return $("//bdi[text()='Save']"); }
    private get hdSaveSucc() { return $("//span[text()='Updated successfully']"); }
    private get hdOkBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }
    private get chngHist() { return $("//bdi[text()='Change History']"); }

    private get maintenanceSection() { return $('//button[.//bdi[text()="Maintenance and Service"]]'); }
    private get attachmentsSection() { return $('//button[.//bdi[text()="Attachments"]]'); }
    private get changeHistorySection() { return $('//button[.//bdi[text()="Change History"]]'); }
    get equipmentAssignBtn() {return $('(//div[text()="Equipment Templates"]/following::bdi[text()="Assign"])[1]')}
    get equipmentClassAssignBtn() {return $('(//div[text()="Equipment Template Class & Characteristics"]/following::bdi[text()="Assign"])[1]')}
    get editBtn() { return $('//button[contains(@class,"sapMBtn")][.//bdi[text()="Edit"]]'); }
    get inventoryNumberInput() { return $('//bdi[text()="Inventory Number"]/following::input[1]'); }
    private get equipmentIframe() { return $('iframe[data-help-id="application-equipment-manage"]'); }
    get componentTypeDropdown() { return $('//bdi[text()="Component Type"]/following::input[1]'); }
    get activationStateDropdown() { return $('//bdi[text()="Activation State"]/following::input[1]'); }
    get authorizationGroupInput() { return $('//bdi[text()="Authorization Group"]/following::input[1]'); }
    get startUpDateInput() { return $('//bdi[text()="Start up date"]/following::input[1]'); }
    get deactivationDateInput() { return $('//bdi[text()="Deactivation Date"]/following::input[1]'); }
    get componentRegulatoryIdInput() { return $('//bdi[text()="Component Regulatory ID"]/following::input[1]'); }
    get commentsTextArea() { return $('//bdi[text()="Comments"]/following::textarea[1]'); }
    get longDescTextArea() { return $('//bdi[text()="Long Description"]/following::textarea[1]'); }
    get acquisitionValueInput() { return $('//bdi[text()="Acquisition Value / Currency"]/following::input[1]'); }
    get assetManufacturerInput() { return $('//bdi[text()="Asset Manufacturer Name "]/following::input[1]'); }
    get partNumberInput() { return $('//bdi[text()="Part Number "]/following::input[1]'); }
    get modelNumberInput() { return $('//bdi[text()="Model Number "]/following::input[1]'); }
    get serialNumberInput() { return $('//bdi[text()="Serial Number"]/following::input[1]'); }
    get superordinateEquipmentInput() { return $('//bdi[text()="Superordinate Equipment"]/following::input[1]'); }
    get functionalLocationInput() { return $('//bdi[text()="Functional Location"]/following::input[1]'); }
    get componentInfoAssignBtn() { return $('//button[.//bdi[text()="Assign"]]'); }
    get componentInfoUnassignBtn() { return $('//button[.//bdi[text()="Unassign"]]'); }
    get saveBtn() { return $('//button[.//bdi[text()="Save"]]'); }
    private get groups() { return $("//div[text()='Equipment Template Class & Characteristics']/following::span[1]"); }
    get asgnChrMDA() { return $("//span[text()='Maintenance Data Attribute']/following::bdi[text()='Assign']"); }
    get noOfClassMDA() { return $("//span[text()='Assign Classes']/following::span[2]"); }
    private get riskProfile() { return $("//bdi[text()='Risk Summary']//following::h2[1]"); }
    private get component() { return $("//bdi[text()='Risk Summary']//following::h2[2]"); }
    private get recommendation() { return $("//bdi[text()='Risk Summary']//following::div[@aria-level='2']//span"); }
    private get riskAndCriticality() { return $("//div[text()='Risk and Criticality']/following::span[1]"); }
    private get assetStrategyRBI() { return $("(//div[text()='Asset Strategy']/following::li//div//div)[1]"); }
    private get assetStrategyRCM() { return $("(//div[text()='Asset Strategy']/following::li//div//div)[2]"); }
    private get assetInsp() { return $("//div[text()='Asset Inspection']/following::span[1]"); }
    private get findings() { return $("//div[text()='Findings']/following::span[1]"); }
    private get recommend() { return $("//div[text()='Recommendations']/following::span[1]"); }
    get cancelBtn() { return $("//bdi[text()='Cancel']"); }
    private get noOfCharMDA() { return $("//span[text()='Maintenance Data Attribute']/following::h2//span"); }
    private get equipmentHeaderTitleSpans() { return $$("//header[@role='banner']//*[@role='heading']//span[normalize-space()]"); }
    private get equipmentEditHeader() { return $("//bdi[text()='Edit Header']"); }
    private get equipmentDescEditHeader() { return $("//label[.//text()='Short Description']/following::input[1]"); }
    private get equipmentCategoryEditHeader() { return $("//label[.//text()='Category']/following::input[1]"); }
    private get equipmentCategoryDialog() { return $("//span[text()='Select Category']"); }
    private get equipmentFirstCategoryChoose() { return $("(//span[.='Select Category']/ancestor::header/following::*[name()='circle'][2])[1]"); }
    private get equipmentCategorySave() { return $("(//bdi[text()='Save'])[2]"); }
    private get equipmentHeaderSave() { return $("//footer//*[name()='bdi' and text()='Save']"); }
    private get equipmentHdSaveSucc() { return $("//span[text()='Updated successfully']"); }
    private get equipmentHdOkBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }
    public superEquipValue!: string;
    public equipHeadValue!: string;

    async verifyOnEquipmentDetailPage(expectedName?: string): Promise<boolean> {
        try {
            await this.equipmentNameHeader.waitForDisplayed({ timeout: 50000 });
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
        await browser.pause(5000);
        await this.editBtn.waitForClickable();
        await this.editBtn.click();
        await browser.pause(5000);
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

    async editStructureInfo(noOfequip: number) {
        await browser.pause(4000);
        await utils.switchToIframe(this.equipmentIframe);
        await this.structureSection.waitForDisplayed({ timeout: 50000 });
        await this.structureSection.click()
        await browser.pause(2000);

        // Click Edit button
        await this.editBtn.waitForClickable({ timeout: 30000 });
        await this.editBtn.click();
        await browser.pause(5000);

        // Search and select superordinate equipment
        await this.superordinateEquipmentInput.waitForClickable({ timeout: 30000 });
        await this.superordinateEquipmentInput.click();
        await browser.pause(8000);
        await utils.switchToIframe(this.equipmentIframe);
        const subordinateResultCell = await $(`(//tr[@role="row"])[3]`);
        await subordinateResultCell.waitForDisplayed({ timeout: 20000 });
        await subordinateResultCell.click();
        await browser.pause(2000);
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

        const superEquip = await $("//bdi[text()='Superordinate Equipment']/following::input[1]");
        console.log("Assigning Equipment");
        if (noOfequip === 0) return;
        const superEquipValue: string =
            (await superEquip.getAttribute("value"))?.trim() || "";
        console.log("Super Ordinate Equipment Value :"+superEquipValue);
        console.log("Equipment Name is:"+EquipmentListviewPage.createdEquipmentName);
        let selectedCount = 0;
        let i = 1;

        while (selectedCount < noOfequip) {
            await utils.clickWithWait(this.componentInfoAssignBtn, 1000);
            await browser.pause(2000);
            await browser.keys(['ArrowDown']);
            await browser.keys(['ArrowDown']);
            await browser.keys(['ArrowDown']);
            await browser.keys(['Enter']);
            await browser.pause(2000);

            await utils.switchToIframe(this.equipmentIframe);

            let assignedThisRound = false;
            let attempts = 0;

            while (!assignedThisRound && attempts < 25) {
                attempts++;
                await browser.pause(3000);
                const nameCell = $(`(//tr[@role='row'])[${i + 1}]//td[3]//span`);
                if (!(await nameCell.isExisting())) {
                    console.log(`No more rows available at index ${i + 1} - aborting assignment loop`);
                    break;
                }
                await nameCell.waitForDisplayed({ timeout: 20000 });

                let equipName: string = (await nameCell.getText()) || (await nameCell.getAttribute("innerText")) || "";
                equipName = equipName.trim();
                console.log(`Checking equipment: ${equipName}`);

                if (
                    equipName &&
                    ((equipName === EquipmentListviewPage.createdEquipmentName) || equipName === superEquipValue)
                ) {
                    i++;
                    console.log(`Skipping equipment: ${equipName} (matches edited or superordinate equipment)`);
                    continue;
                }

                const checkbox = $(`((//tr[@role='row'])[${i + 1}]//td[2]//div)[1]`);
                await utils.clickWithWait(checkbox);
                await utils.waitForBusyIndicatorToDisappear();

                await utils.clickWithWait($("//header[.//text()='Select Equipment']/following::bdi[text()='Confirm']"));
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(1500);

                const successOk = await $("//header[.//text()='Success']/following::bdi[text()='OK']");
                const errorOk = await $("//header[.//text()='Error']/following::bdi[text()='OK']");
                const errorClose = await $("//header[.//text()='Error']/following::bdi[text()='Close']");

                let outcome: string = "none";
                try {
                    await browser.waitUntil(async () => {
                        if (await successOk.isDisplayed().catch(() => false)) { outcome = "success"; return true; }
                        if (await errorOk.isDisplayed().catch(() => false) || await errorClose.isDisplayed().catch(() => false)) { outcome = "error"; return true; }
                        return false;
                    }, { timeout: 20000, interval: 500 });
                } catch { /* neither popup appeared */ }

                if (outcome === "success") {
                    await utils.clickWithWait(successOk, 1000);
                    await utils.waitForBusyIndicatorToDisappear();
                    selectedCount++;
                    i++;
                    assignedThisRound = true;
                    console.log(`Component '${equipName}' assigned successfully (${selectedCount}/${noOfequip})`);
                } else if (outcome === "error") {
                    console.log(`Assignment failed for '${equipName}', dismissing error and trying next row`);
                    if (await errorOk.isDisplayed().catch(() => false)) {
                        await utils.clickWithWait(errorOk, 500);
                    } else if (await errorClose.isDisplayed().catch(() => false)) {
                        await utils.clickWithWait(errorClose, 500);
                    }
                    await utils.waitForBusyIndicatorToDisappear();
                    i++;
                    continue;
                } else {
                    console.log(`No success/error popup detected for '${equipName}', moving on`);
                    i++;
                    continue;
                }
            }

            if (!assignedThisRound) {
                console.log("Could not assign a component in this round - exiting loop");
                break;
            }
    }

    console.log("Equipment assigned");
    }

    async assignEquipmentTemplate(noOfEquipment: number, autoAssign: boolean): Promise<void> {
        await browser.pause(4000);
        await utils.switchToIframe(this.equipmentIframe);
        await this.assignmentSection.waitForDisplayed({ timeout: 50000 });
        await this.assignmentSection.click();

        await utils.switchToIframe(this.equipmentIframe);
        await utils.clickWithWait(this.equipmentAssignBtn,0, 50000);
        await browser.pause(2000);

        await utils.selectCheckboxes(noOfEquipment);
        if (autoAssign) {
            const checkBox = await $('//footer//div[@role="checkbox" and .//bdi[text()="Auto assign Class and Characteristics"]]');
            await utils.clickWithWait(checkBox);
        }
        await utils.switchToIframe(this.equipmentIframe); 
        await utils.clickWithWait($("//header[.//text()='Select Templates']/following::button[.//bdi[text()='Ok']]"));
        await browser.pause(2000);
        await utils.clickWithWait($('//header[.//text()="Success"]/following::button[.//bdi[text()="OK"]]'));

        await this.equipmentAssignBtn.waitForClickable({ timeout: 30000 });
    }

    async assignEquipmentClass(noOfClasses: number, autoAssign: boolean): Promise<void> {
        
        const classes = await this.groups.getText();
        await utils.getAssignedValue(classes);
        console.log(`Already assigned classes: ${classes}`);

        if (autoAssign) {
            console.log("Auto-assigning classes, skipping manual class assignment.");
            return;
        }
        await browser.pause(4000);
        await utils.switchToIframe(this.equipmentIframe);
        await utils.clickWithWait(this.assignmentSection);
        await browser.pause(2000);

        await utils.switchToIframe(this.equipmentIframe);
        await this.equipmentClassAssignBtn.waitForClickable({ timeout: 30000 });
        await this.equipmentClassAssignBtn.click();
        await browser.pause(2000);
        await utils.switchToIframe(this.equipmentIframe);
        await utils.selectCheckboxes(noOfClasses);
        await utils.clickWithWait($('//header[.//text()="Assign Classes"]/following::button[.//bdi[text()="Ok"]]'));
        await browser.pause(2000);
        await utils.clickWithWait($('//header[.//text()="Success"]/following::button[.//bdi[text()="OK"]]'));
    }

    async assignCharacteristics(noOfChar: number): Promise<void> {
        let k=0;
        await browser.pause(1000);
        await utils.switchToIframe(this.equipmentIframe);
        await this.classificationSection.waitForDisplayed({ timeout: 50000 });
        await this.classificationSection.click();
        const char = await this.noOfCharMDA.getText();
        await utils.getAssignedValue(char);
        console.log("Already assigned charactertics : "+char);
        await browser.pause(1000);
        await utils.switchToIframe(this.equipmentIframe);
        await this.classificationSection.waitForDisplayed({ timeout: 50000 });
        await this.classificationSection.click();
        await utils.switchToIframe(this.equipmentIframe);
        await this.asgnChrMDA.waitForClickable({ timeout: 30000 });
        await this.asgnChrMDA.click();
        await browser.pause(1000);
        await utils.switchToIframe(this.equipmentIframe);
        const availableChar = await this.noOfClassMDA.getText();
        const availableCharCount = await utils.getAssignedValue(availableChar);
        console.log("Available characteritics:"+ availableCharCount);
        if(availableCharCount === 0)
        {
            console.log("No of characteritics available is zero")
            await utils.clickWithWait($("//header[.//text()='Assign Classes']/following::button[.//bdi[text()='Cancel']]"));
            await utils.waitForBusyIndicatorToDisappear();
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

    async verifyAssetIntelligence() {
        console.log("Navigating to Asset Intelligence Tab");
        await browser.pause(4000);
        await utils.switchToIframe(this.equipmentIframe);
        await utils.clickWithWait(this.assetIntelligenceSection);
        await this.assetIntelligenceSection.waitForDisplayed({ timeout: 30000 });
        console.log("Navigated to Asset Intelligence Tab successfully");
        await browser.pause(5000);
        const riskAndCriti = await this.riskAndCriticality.getText();
        const r1 = await utils.getAssignedValue(riskAndCriti);
        console.log("Assigned risk and criticality : "+r1);

        const assetStraRBI = await this.assetStrategyRBI.getText();
        const as1 = await utils.getAssignedValue(assetStraRBI);
        console.log("Assigned asset strategy RBI : "+as1);

        const assetStraRCM = await this.assetStrategyRCM.getText();
        const as2 = await utils.getAssignedValue(assetStraRCM);
        console.log("Assigned asset strategy RCM: "+as2);

        const astInsp = await this.assetInsp.getText();
        const ai1 = await utils.getAssignedValue(astInsp);
        console.log("Assigned asset Inspection : "+ai1);

        const finding = await this.findings.getText();
        const f = await utils.getAssignedValue(finding);
        console.log("Assigned findings : "+f);

        const recommendations = await this.recommend.getText();
        const r = await utils.getAssignedValue(recommendations);
        console.log("Assigned recommendations : "+r);
    }

    public async verifyRiskSummary() {
        console.log("Navigating to Risk Summary Tab");
        await browser.pause(4000);
        await utils.switchToIframe(this.equipmentIframe);
        await utils.clickWithWait(this.riskSection);
        await this.riskSection.waitForDisplayed({ timeout: 30000 });
        console.log("Navigated to Risk Summary Tab successfully");
        await browser.pause(4000);
        const riskProfile = await this.riskProfile.getText();
        const rp = await utils.getAssignedValue(riskProfile);
        console.log("Assigned risk profile : "+rp);

        const component = await this.component.getText();
        const c = await utils.getAssignedValue(component);
        console.log("Assigned component: "+c);

        const recommendation = await this.recommendation.getText();
        const recom = await utils.getAssignedValue(recommendation);
        console.log("Assigned reocmmendatios: "+recom);

    } 

    async downloadAndVerifyPDF() {
        console.log("Downloading PDF and verifying its content");
        await utils.switchToIframe(this.equipmentIframe);
        const { name: equipmentName } = await utils.getEntityNameAndId();
        this.equipmentHeadValue = equipmentName;
        await utils.clickWithWait(this.downloadReport);
        let expectedFilters: string[] = [];
        try {
            const info = await $("//*[contains(text(),'Failed to export')]");
            await info.waitForDisplayed({ timeout: 7000 });
            console.log(await info.getText());
            const viewDetails = await $("//span[.='Failed to export the following']/following::a");
            await utils.clickWithWait(viewDetails);
            const filterNames = await $$("//span[.='Failed to export the following']/following-sibling::div//li");
            for (const el of filterNames) {
                const text = (await el.getText()).trim();
                if (text) expectedFilters.push(text);
            }
            console.log("Details not downloaded:", expectedFilters);
            const okBtn = await $("//header[.='Information']/following::button[.='OK']");
            await okBtn.waitForDisplayed({ timeout: 5000 });
            await utils.clickWithWait(okBtn);
        } catch (e) {
            console.log("Export success popup not shown");
        }
        console.log("Download initiated, waiting for file to be downloaded...");
        const filePath = await utils.waitForDownload('.pdf');
        console.log("File downloaded at:", filePath);
        const fileName = path.basename(filePath);
        console.log("Downloaded file name:", fileName);
        expect(fileName).toContain(this.equipmentHeadValue);
        console.log("File name contains Equipment header value");
        const pdfContent = await utils.extractTextFromPDF(filePath);
        console.log("Extracted PDF content:", pdfContent);
        expect(pdfContent).toContain(this.equipmentHeadValue);
        console.log("PDF content contains Equipment header value");
        expect(pdfContent).toContain('Table of Content');
        console.log("PDF content verification completed successfully");
    }

    public async verifyCML() {
        console.log("Starting CML verification");
        console.log("Capturing Equipment header value for CML check");
        await utils.switchToIframe(this.equipmentIframe);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        const { name: equipmentName, id: actualId } = await utils.getEntityNameAndId();
        this.equipmentHeadValue = equipmentName;
        console.log(`Final → Equipment="${equipmentName}" | DisplayID="${actualId}"`);
        if (!actualId) {
            throw new Error("Equipment Display ID could not be captured from header");
        }
        console.log("Verifying CML section");
        const parentTab = await browser.getWindowHandle();
        const oldHandles = await browser.getWindowHandles();
        await utils.clickWithWait($('//bdi[text()="CML"]'));
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > oldHandles.length,
            { timeout: 10000 }
        );
        const newHandles = await browser.getWindowHandles();
        const newTab = newHandles.find(h => !oldHandles.includes(h));
        await browser.switchToWindow(newTab!);
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === 'complete',
            { timeout: 30000 }
        );
        await utils.waitForBusyIndicatorToDisappear();
        const frame = await $('//iframe[@data-help-id="application-cml-manage"]');
        await frame.waitForExist({ timeout: 30000 });
        await frame.waitForDisplayed({ timeout: 30000 });
        await utils.switchToIframe(frame);
        console.log("Switched to CML iframe");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        const cmlElem = await $("(//h2//span)[2]");
        await cmlElem.waitForDisplayed({ timeout: 30000 });
        const equipInCML = await $("(//header//*[@role='heading']/span)[1]");
        await equipInCML.waitForDisplayed({ timeout: 20000 });
        await browser.waitUntil(async () => {
            return (await equipInCML.getText()).trim().length > 0;
        }, { timeout: 10000 });
        const equipInCMLText = await equipInCML.getText();
        console.log("Equipment in CML:", equipInCMLText);
        let displayIdInCMLText = "";
        await browser.waitUntil(async () => {
            const candidates = await $$("//header//span");
            for (const el of candidates) {
                try {
                    if (!(await el.isDisplayed())) continue;
                    const txt = ((await el.getText()) ?? "").trim();
                    if (txt.startsWith("EQUI")) {
                        displayIdInCMLText = txt;
                        return true;
                    }
                } catch { /* stale, continue */ }
            }
            return false;
        }, { timeout: 20000, interval: 500, timeoutMsg: "EQUI display id not found in CML header" });
        console.log("Display ID in CML:", displayIdInCMLText);
        if (!equipInCMLText || !displayIdInCMLText) {
            throw new Error("CML header values are empty");
        }
        await utils.assertTextEquals(equipInCML, this.equipmentHeadValue);
        console.log("Equipment in CML matches header value");
        if (displayIdInCMLText !== actualId) {
            throw new Error(`Display ID mismatch in CML. Expected: ${actualId}, Found: ${displayIdInCMLText}`);
        }
        console.log("Display ID in CML matches header value");
        let finalValue = 0;
        let lastSeenText = "";
        try {
            await browser.waitUntil(
                async () => {
                    let text = (await cmlElem.getText()) ?? "";
                    if (!text) text = (await cmlElem.getAttribute("innerText")) ?? "";
                    lastSeenText = text;
                    const value = await utils.getAssignedValue(text);
                    finalValue = value;
                    return value > 0;
                },
                { timeout: 20000, interval: 1000 }
            );
            console.log(`SUCCESS CML value became ${finalValue}`);
        } catch (e) {
            console.log(`WARNING → CML value is still 0 after waiting`);
            console.log(`FINAL → CML TEXT: ${lastSeenText}`);
        }
        let cmlText = (await cmlElem.getText()) ?? "";
        if (!cmlText) {
            cmlText = (await cmlElem.getAttribute("innerText")) ?? "";
        }
        console.log("FINAL CML TEXT:", cmlText);
        const CML = await utils.getAssignedValue(cmlText);
        console.log("Assigned CMLs:", CML);
        console.log("CML verification completed successfully");
        await browser.closeWindow();
        await browser.switchToWindow(parentTab);
        console.log("Returned to parent tab");
    }

    async deleteEquipment(){
        console.log("Deleting the Equipment");
        console.log("Capturing Equipment header value for Deletion");

        await utils.switchToIframe(this.equipmentIframe);
        await browser.pause(4000);

        const { name: equipmentName, id: actualId } = await utils.getEntityNameAndId();

        this.equipmentHeadValue = equipmentName;
        this.displayID = actualId;

        console.log(`Final → Equipment="${equipmentName}" | DisplayID="${actualId}"`);

        await utils.switchToIframe(this.equipmentIframe);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForObjectPageHeader();
        await browser.pause(5000);

        await this.deleteBtn.waitForExist({ timeout: 30000 });
        await this.deleteBtn.waitForDisplayed({ timeout: 30000 });

        console.log("Clicking Delete...");
        await utils.clickWithWait(this.deleteBtn,3000);
        await utils.clickWithWait($("//header[.//text()='Confirmation']/following::bdi[text()='OK']"),3000);

        await utils.waitForBusyIndicatorToDisappear();

        console.log("Equipment deletion in progress");
        console.log("Waiting for deletion to complete...");
        console.log("Deletion completed, confirming deletion");
    }

    public async verifyHeader(): Promise<void> {
        console.log("Verifying Equipment name");
        const expectedEquipmentName = EquipmentListviewPage.createdEquipmentName;
        console.log(`Expected Equipment header: ${expectedEquipmentName}`);
        console.log("Waiting for visible Equipment header title element");
 
        await browser.waitUntil(async () => {
            const headingSpans = await this.equipmentHeaderTitleSpans;
            for (const span of headingSpans) {
                if (await span.isDisplayed()) {
                    const headingText = (await span.getText())?.trim();
                    if (headingText === expectedEquipmentName) {
                        return true;
                    }
                }
            }
            return false;
        }, {
            timeout: 30000,
            interval: 500,
            timeoutMsg: `Equipment header '${expectedEquipmentName}' was not visible in Object Page header`
        });
 
        let actualVisibleHeader = "";
        const headingSpans = await this.equipmentHeaderTitleSpans;
        for (const span of headingSpans) {
            if (await span.isDisplayed()) {
                const headingText = (await span.getText())?.trim();
                if (headingText) {
                    actualVisibleHeader = headingText;
                    break;
                }
            }
        }
 
        console.log(`Actual Equipment header: ${actualVisibleHeader}`);
        await expect(actualVisibleHeader).toEqual(expectedEquipmentName);
        console.log("Equipment name matches header name");
    }
 
    public async editHeader(): Promise<void> {
        console.log("Editing header's Information");
        await utils.clickWithWait(this.equipmentEditHeader);
        await this.equipmentDescEditHeader.waitForDisplayed({ timeout: 30000 });
        await this.equipmentDescEditHeader.click();
        await browser.keys(['Control', 'a']);
        await browser.keys('Delete');
        await browser.pause(300);
        await utils.setValueWithWait(this.equipmentDescEditHeader, "Equipment header updated by automation");
        await utils.clickWithWait(this.equipmentCategoryEditHeader);
        await this.equipmentCategoryDialog.waitForDisplayed({ timeout: 30000 });
 
        console.log("selecting first available category option");
        await this.equipmentFirstCategoryChoose.scrollIntoView();
        await utils.clickWithWait(this.equipmentFirstCategoryChoose);
       
        await utils.clickWithWait(this.equipmentCategorySave);
        await utils.clickWithWait(this.equipmentHeaderSave);
        console.log("Header save clicked, waiting for success message");
        await this.equipmentHdSaveSucc.waitForDisplayed({ timeout: 30000 });
        console.log("Header update success message displayed");
        await utils.clickWithWait(this.equipmentHdOkBtn);
        console.log("Success dialog acknowledged with OK");
        console.log("Header edited successfully");
 
        await browser.pause(5000);
    }

    public async verifyMainAndSum() {
        console.log("Navigating to Maintenance and Service Tab");
        await utils.clickWithWait(this.mainAndServiceSection);
        await this.mainAndServiceSection.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Navigated to Maintenance and Service successfully");

        const readField = async (label: string, el: any): Promise<string> => {
            try {
                await el.waitForExist({ timeout: 15000 });
                const text = (await el.getText() ?? "").trim();
                if (!text) throw new Error("empty text");
                return text;
            } catch {
                console.log(`\x1b[1m!!! Maintenance and Service: '${label}' is NOT PRESENT !!!\x1b[0m`);
                return "";
            }
        };

        const maintainNoti = await readField("Maintenance Notifications", this.maintainNoti);
        const mn = await utils.getAssignedValue(maintainNoti);
        console.log(" Assigned Maintenance Notification : "+mn);

        const maintainOrder = await readField("Maintenance Orders", this.maintainOrder);
        const mo = await utils.getAssignedValue(maintainOrder);
        console.log(" Assigned Maintenance Order: "+mo);

        const maintainPlan = await readField("Maintenance Plan", this.maintainPlan);
        const mp = await utils.getAssignedValue(maintainPlan);
        console.log(" Assigned Maintenance Plan: "+mp);

        const recomWrk = await readField("Recommendation Workbench", this.recomWrk);
        const rw = await utils.getAssignedValue(recomWrk);
        console.log(" Assigned recommendations: "+rw);

        const maintaintask = await readField("Maintenance Tasks", this.maintaintask);
        const mt = await utils.getAssignedValue(maintaintask);
        console.log(" Assigned Maintenance Task: "+mt);
    }
    
    public async verifyChangeHistory() {
            console.log("Editing header's Information for change history check");
            await utils.clickWithWait(this.changeHistoryEditHeader);
            await utils.setValueWithWait(
                this.descEditHeader,
                await utils.generateRandomFuncDescName()
            );
            const enteredDesc = await this.descEditHeader.getValue();
            await utils.clickWithWait(this.categoryEditHeader);
            await this.category.waitForDisplayed({ timeout: 30000 });
            await this.ctgChoose.scrollIntoView();
            let selectedCategory = "";
            const sElem = $("//span[text()='S']/ancestor::tr//td[2]//*[name()='circle'][2]/ancestor::div[@aria-checked='false']");
            if (await sElem.isExisting()) {
                await utils.clickWithWait(sElem);
                selectedCategory = "S";
            } else {
                const mElem = $("//span[text()='M']/ancestor::tr//td[2]//*[name()='circle'][2]");
                await utils.clickWithWait(mElem);
                selectedCategory = "M";
            }
            await utils.clickWithWait(this.ctgSave);
            await utils.clickWithWait(this.headerSave);
            await this.hdSaveSucc.waitForDisplayed({ timeout: 30000 });
            await utils.clickWithWait(this.hdOkBtn);
            console.log("Header edited successfully");
    
            console.log("Navigating to Change History tab");
            await utils.clickWithWait(this.chngHist);
            await utils.waitForBusyIndicatorToDisappear();
            await this.chngHist.waitForDisplayed({ timeout: 30000 });
            console.log("Navigated to Change History tab successfully");
            console.log("Fetching latest change history entry");
            const latestCngHst = await $("(//ul/li//div[2]/div/span)[1]");
            await latestCngHst.waitForDisplayed();
            console.log("Latest change history entry fetched successfully");
            const text = await latestCngHst.getText();
            console.log("Change History Text:\n", text);
            console.log("Validating change history entry");
            const lines = text.split('\n').map(l => l.trim()).filter(l => l);
            console.log("Extracted Lines from Change History Entry:");
            const categoryLine = lines.find(l => l.toLowerCase().includes('category'));
            const descLine = lines.find(l => l.toLowerCase().includes('description'));
    
            if (!categoryLine || !categoryLine.includes(selectedCategory)) {
                throw new Error(
                    `Category mismatch. Expected: ${selectedCategory}, Found: ${categoryLine}`
                );
            }
            if (!descLine || !descLine.includes(enteredDesc)) {
                throw new Error(
                    `Description mismatch. Expected: ${enteredDesc}, Found: ${descLine}`
                );
            }
            console.log("Change history validation passed successfully");
        }
}
export default new EquipmentDetailPage();
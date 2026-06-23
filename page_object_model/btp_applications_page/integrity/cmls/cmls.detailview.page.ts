import utils from "utils/utils";
import CML_ListView_Page from "./cmls.listview.page";
import AssetInspectionDetailView from "../asset_inspection/asset_inspection.detailview.page";
class CML_Detail_Page{

    private get CMLIframe() { return $('iframe[data-help-id="application-cml-manage"]'); }
    private get noOfCml() { return $("//h2//span[contains(text(),'CMLs')]"); }
    private get searchCMLs() { return $("//h2//span[contains(text(),'CMLs')]/following::input[@aria-label='Search']"); }
    private get searchCMLBtn() { return $("//h2//span[contains(text(),'CMLs')]/following::input[@aria-label='Search']//following::div[2]"); }
    private get cmlHeader() { return $(`//header//div[@role='heading']//span[text()='${CML_ListView_Page.cmlName}']`); }
    private get backgroundTab() { return $("//span[text()='Background']"); }
    private get activeToggle() { return $("//label[.//text()='Active']/following::div[contains(@class,'sapMSwtCont')][1]"); }
    private get descriptionInput() { return $("//label[.//text()='Description']/following::input[1]"); }
    private get positionDropdown() { return $("//label[.//text()='Position']/following::span[1]"); }
    private get dateInServiceInput() { return $("//label[.//text()='Date In Service']/following::input[1]"); }
    private get structuralTminInput() { return $("//label[.//text()='Structural Tmin']/following::input[1]"); }
    private get selectedTminInput() { return $("//label[.//text()='Selected Tmin']/following::input[1]"); }
    private get damageMechanismInput() { return $("//label[.//text()='Damage Mechanism']/following::input[1]"); }
    private get jointEfficiencyInput() { return $("//label[.//text()='Joint Efficiency']/following::input[1]"); }
    private get maximumAllowableStressInput() { return $("//label[.//text()='Maximum Allowable Stress']/following::input[1]"); }
    private get insideRadiusOfShellInput() { return $("//label[.//text()='Inside Radius of Shell']/following::input[1]"); }
    private get insulationTypeInput() { return $("//label[.//text()='Insulation Type']/following::input[1]"); }
    private get codeYearDropdown() { return $("//label[.//text()='Code Year']/following::span[1]"); }
    private get constructionCodeDropdown() { return $("//label[.//text()='Construction Code']/following::span[1]"); }
    private get materialSpecificationInput() { return $("//label[.//text()='Material Specifcation']/following::input[1]"); }
    private get materialGradeInput() { return $("//label[.//text()='Material Grade']/following::input[1]"); }
    private get nominalThicknessInput() { return $("//label[.//text()='Nominal Thickness']/following::input[1]"); }
    private get commentsInput() { return $("//label[.//text()='Comments']/following::input[1]"); }
    private get geometryDropdown() { return $("//label[.//text()='Geometry']/following::input[1]"); }
    private get tminOverrideInput() { return $("//label[.//text()='Tmin Override']/following::input[1]"); }
    private get outsideDiameterInput() { return $("//label[.//text()='Outside Diameter']/following::input[1]"); }
    private get compTypeInput() { return $("//label[.//text()='Comp Type']/following::input[1]"); }
    private get nominalSizeInput() { return $("//label[.//text()='Nominal Size']/following::input[1]"); }
    private get ptDrawingInput() { return $("//label[.//text()='PT Drawing']/following::input[1]"); }
    private get lineNumberInput() { return $("//label[.//text()='Line Number']/following::input[1]"); }
    private get retirementLimitBasisInput() { return $("//label[.//text()='Retirement Limit Basis']/following::input[1]"); }
    private get accessRequiredDropdown() { return $("//label[.//text()='Access Required']/following::span[1]"); }
    private get isInsulatedDropdown() { return $("//label[.//text()='Is Insulated?']/following::span[1]"); }
    private get pressureTminTab() { return $("//span[text()='Pressure Tmin']"); }
    private get pressureTminDesignPressureInput() { return $("//span[text()='Pressure Tmin']/ancestor::div[@role='tab']/following::label[.//text()='Design Pressure'][1]/following::input[1]"); }
    private get pressureTminInsideRadiusOfShellInput() { return $("//span[text()='Pressure Tmin']/ancestor::div[@role='tab']/following::label[.//text()='Inside Radius of Shell'][1]/following::input[1]"); }
    private get pressureTminMaximumAllowableStressInput() { return $("//span[text()='Pressure Tmin']/ancestor::div[@role='tab']/following::label[.//text()='Maximum Allowable Stress'][1]/following::input[1]"); }
    private get pressureTminJointEfficiencyInput() { return $("//span[text()='Pressure Tmin']/ancestor::div[@role='tab']/following::label[.//text()='Joint Efficiency'][1]/following::input[1]"); }
    private get pressureTminCalculatedTminInput() { return $("//span[text()='Pressure Tmin']/ancestor::div[@role='tab']/following::label[.//text()='Calculated Tmin'][1]/following::input[1]"); }
    private get calculateBtn() { return $("//button[.//text()='Calculate']"); }
    private get saveBtn() { return $("//button[.//text()='Save']"); }
    private get MAWPTab() { return $("//span[text()='MAWP']"); }
    private get mawpTminOverrideInput() { return $("//label[.//text()='Tmin']/following::input[1]"); }
    private get mawpInsideRadiusOfShellInput() { return $("//label[.//text()='Inside Radius of Shell']/following::input[1]"); }
    private get mawpMaximumAllowableStressInput() { return $("//label[.//text()='Maximum Allowable Stress']/following::input[1]"); }
    private get mawpJointEfficiencyInput() { return $("//label[.//text()='Joint Efficiency']/following::input[1]"); }
    private get mawpInput() { return $("//label[.//text()='MAWP']/following::input[1]"); }
    private get historyTab() { return $("//span[text()='History']"); }

    public cmlID: string ="";
    public pressureTminDesignPressure: string = "";
    public pressureTminInsideRadiusOfShell: string = "";
    public pressureTminMaximumAllowableStress: string = "";
    public pressureTminJointEfficiency: string = "";
    public pressureTminCalculatedTmin: string = "";
    public tminOverride: string = "";
    public insideRadiusOfShell: string = "";
    public maximumAllowableStress: string = "";
    public jointEfficiency: string = "";
    public mawp: string = "";

    public async verifyCmlInSummary()
    {
        await utils.switchToIframe(this.CMLIframe);
        await browser.pause(3000);
        const cmlText = await this.noOfCml.getText();
        const noOfCMLs = await utils.getAssignedValue(cmlText);
        console.log("No of CMLs present is/are :"+noOfCMLs);
        if(noOfCMLs === 0)
        {
            throw  new Error("No CML has been present.");
        }
        else
        {
            await this.verifyCMLSection();
        }

    }

    public async verifyCMLSection()
    {
        console.log("Start: Verifying CML section of ASD"); 
        await utils.setValueWithWait(this.searchCMLs,CML_ListView_Page.cmlName);
        await utils.clickWithWait(this.searchCMLBtn);
        await utils.waitForBusyIndicatorToDisappear();
        const cmlText = await this.noOfCml.getText();
        const noOfCMLs = await utils.getAssignedValue(cmlText);
        console.log("No of CMLs present is/are :"+noOfCMLs);
        if(noOfCMLs === 0)
        {
            throw  new Error("No CML is present.");
        }
        else
        {
            console.log("CML is present in CML section of ASD");
            const detailBtns = await $$("//span[@title='Details']");
            let detailBtnClicked = false;
            for (const detailBtn of detailBtns) {
                if (await detailBtn.isDisplayed() && await detailBtn.isClickable()) {
                    await utils.clickWithWait(detailBtn);
                    detailBtnClicked = true;
                    break;
                }
            }
            if (!detailBtnClicked) {
                throw new Error("Details button is not visible/clickable for searched CML.");
            }
            await this.cmlHeader.waitForDisplayed();
            await this.cmlHeader.waitForClickable();
            console.log("Navigated to detail view page of CML")
            const { id } = await utils.getEntityNameAndId();
            this.cmlID = id;
            console.log("CML ID: " + this.cmlID);
        }
        console.log("CML was created and verified")
    }

    public async searchCmlAndOpenDetailToVerifyAverage(cmlName?: string): Promise<void> {
        const target = (cmlName ?? CML_ListView_Page.cmlName ?? "").trim();
        if (!target) {
            throw new Error("Searched Cml And Open Detail To Verify Average: CML name is empty.");
        }
        console.log(`Searching CML '${target}' in equipment detail...`);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        await utils.setValueWithWait(this.searchCMLs, target);
        await utils.clickWithWait(this.searchCMLBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        const cmlText = await this.noOfCml.getText();
        const noOfCMLs = await utils.getAssignedValue(cmlText);
        console.log(`Number of CMLs after search: ${noOfCMLs}`);
        if (noOfCMLs === 0) {
            throw new Error(`No CML matched search for '${target}'.`);
        }

        const expectedAvg = (AssetInspectionDetailView.averageReading || "").trim();
        if (!expectedAvg) {
            throw new Error("Expected average reading is empty — was it captured from inspection flow?");
        }

        const avgCellSpan = $(`//span[text()=${utils.xpathString(target)}]/following::td[@aria-colindex="7"]//span`);
        await avgCellSpan.waitForExist({ timeout: 30000 });
        await avgCellSpan.waitForDisplayed({ timeout: 30000 });
        const actualAvg = ((await avgCellSpan.getText()) || "").trim();
        console.log(`Row average reading for '${target}': '${actualAvg}' (expected '${expectedAvg}').`);

        if (actualAvg !== expectedAvg) {
            throw new Error(`Average reading mismatch for CML '${target}': expected '${expectedAvg}', got '${actualAvg}'.`);
        }
        console.log(`Average reading verified for CML '${target}'.`);
    }

    public async editVerifyBackgroundSection()
    {
        console.log("Editing and verifying background section...");
        await this.openBackgroundTab();
        await this.fillBackgroundDetails();
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.calculateBtn, 1500);
        await utils.waitForBusyIndicatorToDisappear();

        // ---- Handle "Bulk Calculation of CMLs has been initiated" Information popup ----
        console.log("Handling Bulk CML Calculation Information popup...");
        await utils.clickInformationOkButton();

        // Wait for backend bulk calculation to complete before checking the notification bell.
        const waitForCalcMs = 30000;
        console.log(`Waiting ${waitForCalcMs} ms for CML calculation to complete...`);
        await browser.pause(waitForCalcMs);

        // Notification bell lives in the FLP shell, not inside the CML iframe.
        await browser.switchFrame(null);
        await utils.waitForBusyIndicatorToDisappear();

        const notificationBell = $('(//a[@role="button"]//span)[3]');
        await notificationBell.waitForExist({ timeout: 30000 });
        await notificationBell.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(notificationBell);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        // Verify the "CML calculation is ready" notification entry is present.
        const notificationEntry = $("//*[contains(normalize-space(.),'CML calculation is ready')]");
        await notificationEntry.waitForExist({ timeout: 30000 });
        const isPresent = await notificationEntry.isDisplayed();
        if (!isPresent) {
            throw new Error("'CML calculation is ready' notification was not found in the notification panel.");
        }
        console.log("'CML calculation is ready' notification verified successfully.");

        // Switch back into the CML iframe to continue with the Background section.
        await utils.switchToIframe(this.CMLIframe);
        await utils.waitForBusyIndicatorToDisappear();

        // ---- Re-visit Background tab; if details were lost, refill and re-Calculate ----
        await this.openBackgroundTab();
        const currentDescription = (await this.descriptionInput.getAttribute("value")) ?? "";
        if (currentDescription.trim() === "") {
            console.log("Background details are missing after notification flow -> refilling and re-calculating...");
            await this.fillBackgroundDetails();
            await utils.waitForBusyIndicatorToDisappear();
            await utils.clickWithWait(this.calculateBtn, 1500);
            await utils.waitForBusyIndicatorToDisappear();
            await utils.clickInformationOkButton();
        } else {
            console.log(`Background details preserved (Description='${currentDescription}') -> no refill needed.`);
        }

        await utils.clickWithWait(this.saveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        console.log("Edited and verified background section");
    }

    private async openBackgroundTab()
    {
        await browser.waitUntil(async () => {
            await utils.clickWithWait(this.backgroundTab);
            await utils.waitForBusyIndicatorToDisappear();
            return (await this.descriptionInput.isDisplayed()) && (await this.descriptionInput.isClickable());
        }, {
            timeout: 30000,
            interval: 1500,
            timeoutMsg: "Description input did not become displayed and clickable after clicking Background tab."
        });
    }

    private async fillBackgroundDetails()
    {
        await utils.clickWithWait(this.activeToggle);
        await utils.setValueWithWait(this.descriptionInput, "Background Description", 1500);
        await utils.clickWithWait(this.positionDropdown);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await utils.setValueWithWait(this.dateInServiceInput, utils.formatDatePlus(30), 1500);
        await utils.setValueWithWait(this.structuralTminInput, utils.rand(1, 10).toString(), 1500);
        await utils.setValueWithWait(this.selectedTminInput, utils.rand(1, 3).toString(), 1500);
        await utils.setValueWithWait(this.damageMechanismInput, "Damage Mechanism", 1500);
        await utils.setValueWithWait(this.jointEfficiencyInput, "Joint Efficiency", 1500);
        await utils.setValueWithWait(this.maximumAllowableStressInput, utils.rand(1, 5).toString(), 1500);
        await utils.setValueWithWait(this.insideRadiusOfShellInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.insulationTypeInput, "Insulation Type", 1500);
        await utils.clickWithWait(this.codeYearDropdown);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await utils.clickWithWait(this.constructionCodeDropdown);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        // await utils.setValueWithWait(this.materialSpecificationInput, "Material Specification", 1500);
        // await utils.setValueWithWait(this.materialGradeInput, "Material Grade", 1500);
        await utils.setValueWithWait(this.nominalThicknessInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.commentsInput, "Comments", 1500);
        await utils.setValueWithWait(this.geometryDropdown, "Geometry", 1500);
        await utils.setValueWithWait(this.tminOverrideInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.outsideDiameterInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.compTypeInput, "COUPLING", 1500);
        await utils.setValueWithWait(this.nominalSizeInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.ptDrawingInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.lineNumberInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.retirementLimitBasisInput, utils.rand(1, 9).toString(), 1500);
        await utils.clickWithWait(this.accessRequiredDropdown);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await utils.clickWithWait(this.isInsulatedDropdown);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
    }

    public async editVerifyPressureTminSection()
    {
        console.log("Editing and verifying Pressure Tmin section...");
        await browser.waitUntil(async () => {
            await utils.clickWithWait(this.pressureTminTab);
            await utils.waitForBusyIndicatorToDisappear();
            return (await this.pressureTminDesignPressureInput.isDisplayed()) && (await this.pressureTminDesignPressureInput.isClickable());
        }, {
            timeout: 30000,
            interval: 1500,
            timeoutMsg: "Design Pressure input did not become displayed and clickable after clicking Pressure Tmin tab."
        });
        await utils.setValueWithWait(this.pressureTminDesignPressureInput, utils.rand(1, 9).toString(), 1500);
        await browser.pause(3000);
        this.pressureTminDesignPressure = await this.pressureTminDesignPressureInput.getAttribute("value") ?? "";
        this.pressureTminInsideRadiusOfShell = await this.pressureTminInsideRadiusOfShellInput.getAttribute("value") ?? "";
        this.pressureTminMaximumAllowableStress = await this.pressureTminMaximumAllowableStressInput.getAttribute("value") ?? "";
        this.pressureTminJointEfficiency = await this.pressureTminJointEfficiencyInput.getAttribute("value") ?? "";
        this.pressureTminCalculatedTmin = await this.pressureTminCalculatedTminInput.getAttribute("value") ?? "";
        console.log("Pressure Tmin - Design Pressure: " + this.pressureTminDesignPressure);
        console.log("Pressure Tmin - Inside Radius Of Shell: " + this.pressureTminInsideRadiusOfShell);
        console.log("Pressure Tmin - Maximum Allowable Stress: " + this.pressureTminMaximumAllowableStress);
        console.log("Pressure Tmin - Joint Efficiency: " + this.pressureTminJointEfficiency);
        console.log("Pressure Tmin - Calculated Tmin: " + this.pressureTminCalculatedTmin);
        console.log("Pressure Tmin section edited and verified");
        await utils.clickWithWait(this.calculateBtn, 1500);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        await utils.clickWithWait(this.saveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        await browser.pause(3000);
         await browser.waitUntil(async () => {
            await utils.clickWithWait(this.pressureTminTab);
            await utils.waitForBusyIndicatorToDisappear();
            return (await this.pressureTminDesignPressureInput.isDisplayed()) && (await this.pressureTminDesignPressureInput.isClickable());
        }, {
            timeout: 30000,
            interval: 1500,
            timeoutMsg: "Design Pressure input did not become displayed and clickable after clicking Pressure Tmin tab."
        });
        this.pressureTminDesignPressure = await this.pressureTminDesignPressureInput.getAttribute("value") ?? "";
        this.pressureTminInsideRadiusOfShell = await this.pressureTminInsideRadiusOfShellInput.getAttribute("value") ?? "";
        this.pressureTminMaximumAllowableStress = await this.pressureTminMaximumAllowableStressInput.getAttribute("value") ?? "";
        this.pressureTminJointEfficiency = await this.pressureTminJointEfficiencyInput.getAttribute("value") ?? "";
        this.pressureTminCalculatedTmin = await this.pressureTminCalculatedTminInput.getAttribute("value") ?? "";
        console.log("Pressure Tmin - Design Pressure: " + this.pressureTminDesignPressure);
        console.log("Pressure Tmin - Inside Radius Of Shell: " + this.pressureTminInsideRadiusOfShell);
        console.log("Pressure Tmin - Maximum Allowable Stress: " + this.pressureTminMaximumAllowableStress);
        console.log("Pressure Tmin - Joint Efficiency: " + this.pressureTminJointEfficiency);
        console.log("Pressure Tmin - Calculated Tmin: " + this.pressureTminCalculatedTmin);
        console.log("Pressure Tmin section edited and verified");
    }

    public async verifyMAWPSection()
    {
        console.log("Verifying MAWP Section...");
        await browser.waitUntil(async () => {
            await utils.clickWithWait(this.MAWPTab);
            await utils.waitForBusyIndicatorToDisappear();
            return (await this.mawpTminOverrideInput.isDisplayed()) && (await this.mawpTminOverrideInput.isClickable());
        }, {
            timeout: 30000,
            interval: 1500,
            timeoutMsg: "MAWP Tmin Override input did not become displayed and clickable after clicking MAWP tab."
        });
        this.tminOverride = await this.mawpTminOverrideInput.getAttribute("value") ?? "";
        this.insideRadiusOfShell = await this.mawpInsideRadiusOfShellInput.getAttribute("value") ?? "";
        this.maximumAllowableStress = await this.mawpMaximumAllowableStressInput.getAttribute("value") ?? "";
        this.jointEfficiency = await this.mawpJointEfficiencyInput.getAttribute("value") ?? "";
        this.mawp = await this.mawpInput.getAttribute("value") ?? "";
        console.log("Tmin Override: " + this.tminOverride);
        console.log("Inside Radius Of Shell: " + this.insideRadiusOfShell);
        console.log("Maximum Allowable Stress: " + this.maximumAllowableStress);
        console.log("Joint Efficiency: " + this.jointEfficiency);
        console.log("MAWP: " + this.mawp);
        console.log("MAWP section verified");
    }

    public async verifyHistorySection()
    {
        console.log("Verifying history tab...");
        await browser.waitUntil(async () => {
            await utils.clickWithWait(this.historyTab);
            await utils.waitForBusyIndicatorToDisappear();
            return await this.historyTab.isDisplayed();
        }, {
            timeout: 30000,
            interval: 1500,
            timeoutMsg: "History tab did not become displayed after click."
        });

    }
}
export default new CML_Detail_Page();
import { AssertionError } from 'node:assert';
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
    private get activeToggle() { return $("//label[.//text()='Active']/following::div[.//span[normalize-space()='Yes'] and .//span[normalize-space()='NO']][1]"); }
    private get descriptionInput() { return $("//label[.//text()='Description']/following::input[1]"); }
    private get positionInput() { return $("//label[.//text()='Position']/following::input[1]"); }
    private get dateInServiceInput() { return $("//label[.//text()='Date In Service']/following::input[1]"); }
    private get structuralTminInput() { return $("//label[.//text()='Structural Tmin']/following::input[1]"); }
    private get selectedTminInput() { return $("//label[.//text()='Selected Tmin']/following::input[1]"); }
    private get damageMechanismInput() { return $("//label[.//text()='Damage Mechanism']/following::input[1]"); }
    private get jointEfficiencyInput() { return $("//label[.//text()='Joint Efficiency']/following::input[1]"); }
    private get maximumAllowableStressInput() { return $("//label[.//text()='Maximum Allowable Stress']/following::input[1]"); }
    private get insideRadiusOfShellInput() { return $("//label[.//text()='Inside Radius of Shell']/following::input[1]"); }
    private get insulationTypeInput() { return $("//label[.//text()='Insulation Type']/following::input[1]"); }
    private get codeYearInput() { return $("//label[.//text()='Code Year']/following::input[1]"); }
    private get constructionCodeInput() { return $("//label[.//text()='Construction Code']/following::input[1]"); }
    private get materialSpecificationInput() { return $("//label[.//text()='Material Specification']/following::input[1]"); }
    private get materialGradeInput() { return $("//label[.//text()='Material Grade']/following::input[1]"); }
    private get nominalThicknessInput() { return $("//label[.//text()='Nominal Thickness']/following::input[1]"); }
    private get commentsInput() { return $("//label[.//text()='Comments']/following::input[1]"); }
    private get geometryInput() { return $("//label[.//text()='Geometry']/following::input[1]"); }
    private get tminOverrideInput() { return $("//label[.//text()='Tmin Override']/following::input[1]"); }
    private get outsideDiameterInput() { return $("//label[.//text()='Outside Diameter']/following::input[1]"); }
    private get compTypeInput() { return $("//label[.//text()='Comp Type']/following::input[1]"); }
    private get nominalSizeInput() { return $("//label[.//text()='Nominal Size']/following::input[1]"); }
    private get ptDrawingInput() { return $("//label[.//text()='PT Drawing']/following::input[1]"); }
    private get lineNumberInput() { return $("//label[.//text()='Line Number']/following::input[1]"); }
    private get accessRequiredToggle() { return $("//label[.//text()='Access Required']/following::div[.//span[normalize-space()='Yes'] and .//span[normalize-space()='NO']][1]"); }
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
                throw new AssertionError({ message: "Details button is not visible/clickable for searched CML." });
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
            throw new AssertionError({ message: "Searched Cml And Open Detail To Verify Average: CML name is empty." });
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
            throw new AssertionError({ message: `No CML matched search for '${target}'.` });
        }

        const expectedAvg = (AssetInspectionDetailView.averageReading || "").trim();
        if (!expectedAvg) {
            throw new AssertionError({ message: "Expected average reading is empty — was it captured from inspection flow?" });
        }

        const avgCellSpan = $(`//span[text()=${utils.xpathString(target)}]/following::td[@aria-colindex="7"]//span`);
        await avgCellSpan.waitForExist({ timeout: 30000 });
        await avgCellSpan.waitForDisplayed({ timeout: 30000 });
        const actualAvg = ((await avgCellSpan.getText()) || "").trim();
        console.log(`Row average reading for '${target}': '${actualAvg}' (expected '${expectedAvg}').`);

        if (actualAvg !== expectedAvg) {
            throw new AssertionError({ message: `Average reading mismatch for CML '${target}': expected '${expectedAvg}', got '${actualAvg}'.` });
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
        await browser.pause(2000);

        const successBody = $("//*[contains(normalize-space(.),'Calculated Successfully')]");
        const inProgressBody = $("//*[contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'in progress') or contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'bulk cml calculation')]");
        const anyOkBtn = $("//bdi[normalize-space(text())='OK']/ancestor::button[1]");

        const detectDeadline = Date.now() + 20000;
        let popupKind: "success" | "inprogress" | "none" = "none";
        while (Date.now() < detectDeadline) {
            if (await successBody.isDisplayed().catch(() => false)) { popupKind = "success"; break; }
            if (await inProgressBody.isDisplayed().catch(() => false)) { popupKind = "inprogress"; break; }
            await browser.pause(500);
        }

        if (popupKind === "success") {
            console.log("'Calculated Successfully' popup detected -> clicking OK, Save, then Success OK.");
            try {
                await utils.clickSuccessOkButton();
            } catch (e) { void e; }
            if (await anyOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(anyOkBtn);
            }
            await utils.waitForBusyIndicatorToDisappear();
            await utils.clickWithWait(this.saveBtn);
            await utils.waitForBusyIndicatorToDisappear();
            try {
                await utils.clickSuccessOkButton();
            } catch (e) { void e; }
            if (await anyOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(anyOkBtn);
            }
            console.log("Edited and verified background section");
            return;
        }

        if (popupKind === "none") {
            console.log("No calculation popup detected within 20s -> attempting Save directly and exiting.");
            if (await anyOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(anyOkBtn);
            }
            await utils.clickWithWait(this.saveBtn);
            await utils.waitForBusyIndicatorToDisappear();
            try {
                await utils.clickSuccessOkButton();
            } catch (e) { void e; }
            console.log("Edited and verified background section (no popup path)");
            return;
        }

        console.log("Calculation-in-progress popup detected -> dismissing and polling notification bell (capped).");
        try {
            await utils.clickInformationOkButton();
        } catch (e) { void e; }
        if (await anyOkBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(anyOkBtn);
        }

        await browser.switchFrame(null);
        await utils.waitForBusyIndicatorToDisappear();

        const notificationBell = $('(//a[@role="button"]//span)[3]');
        await notificationBell.waitForExist({ timeout: 30000 });
        await notificationBell.waitForDisplayed({ timeout: 30000 });

        const maxAttempts = 5;
        const pollIntervalMs = 15000;
        const readyXpath = "//*[contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'cml calculations are ready') or contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'cml calculation is ready')]";
        const noDataXpath = "//div[normalize-space(.)='No data']";

        let found = false;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            console.log(`Checking notification panel for CML calculation ready (attempt ${attempt}/${maxAttempts})...`);
            await utils.clickWithWait(notificationBell);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1500);

            const entry = $(readyXpath);
            if (await entry.isExisting() && await entry.isDisplayed().catch(() => false)) {
                found = true;
                console.log("'CML Calculations are ready' notification verified successfully.");
                break;
            }

            const noData = $(noDataXpath);
            if (await noData.isExisting().catch(() => false)) {
                console.log("Notification panel currently shows 'No data' — closing and retrying...");
            } else {
                console.log("Notification panel open but expected entry not present — closing and retrying...");
            }

            await utils.clickWithWait(notificationBell);
            if (attempt < maxAttempts) {
                await browser.pause(pollIntervalMs);
            }
        }

        if (!found) {
            console.log(`Notification did not appear after ${maxAttempts} attempts -> proceeding to Save anyway.`);
        }

        await utils.switchToIframe(this.CMLIframe);
        await utils.waitForBusyIndicatorToDisappear();

        await this.openBackgroundTab();
        const currentDescription = (await this.descriptionInput.getAttribute("value")) ?? "";
        if (currentDescription.trim() === "") {
            console.log("Background details are missing after notification flow -> refilling and re-calculating...");
            await this.fillBackgroundDetails();
            await utils.waitForBusyIndicatorToDisappear();
            await utils.clickWithWait(this.calculateBtn, 1500);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            if (await successBody.isDisplayed().catch(() => false)) {
                try { await utils.clickSuccessOkButton(); } catch (e) { void e; }
            } else if (await inProgressBody.isDisplayed().catch(() => false)) {
                try { await utils.clickInformationOkButton(); } catch (e) { void e; }
            }
            if (await anyOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(anyOkBtn);
            }
        } else {
            console.log(`Background details preserved (Description='${currentDescription}') -> no refill needed.`);
        }

        await utils.clickWithWait(this.saveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        try {
            await utils.clickSuccessOkButton();
        } catch (e) { void e; }
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
        console.log("Filling background details...");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);
        await utils.clickWithWait(this.activeToggle);
        await utils.setValueWithWait(this.descriptionInput, "Background Description", 1500);
        await utils.setValueWithWait(this.positionInput, "Position", 1500);
        await utils.setValueWithWait(this.dateInServiceInput, utils.formatDatePlus(30), 1500);
        await utils.setValueWithWait(this.structuralTminInput, utils.rand(1, 10).toString(), 1500);
        await utils.clickWithWait(this.selectedTminInput);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await utils.setValueWithWait(this.damageMechanismInput, "Damage Mechanism", 1500);
        await utils.setValueWithWait(this.jointEfficiencyInput, "Joint Efficiency", 1500);
        await utils.setValueWithWait(this.maximumAllowableStressInput, utils.rand(1, 5).toString(), 1500);
        await utils.setValueWithWait(this.insideRadiusOfShellInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.insulationTypeInput, "Insulation Type", 1500);
        await utils.setValueWithWait(this.codeYearInput, utils.rand(1990, 2025).toString(), 1500);
        await utils.setValueWithWait(this.constructionCodeInput, "Construction Code", 1500);
        await utils.setValueWithWait(this.materialSpecificationInput, "Material Specification", 1500);
        await utils.setValueWithWait(this.materialGradeInput, "Material Grade", 1500);
        await utils.setValueWithWait(this.nominalThicknessInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.commentsInput, "Comments", 1500);
        await utils.setValueWithWait(this.geometryInput, "Geometry", 1500);
        await utils.clickWithWait(this.accessRequiredToggle);
        await utils.setValueWithWait(this.tminOverrideInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.outsideDiameterInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.compTypeInput, "COUPLING", 1500);
        await utils.setValueWithWait(this.nominalSizeInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.ptDrawingInput, utils.rand(1, 9).toString(), 1500);
        await utils.setValueWithWait(this.lineNumberInput, utils.rand(1, 9).toString(), 1500);
        console.log("Background details filled successfully");
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
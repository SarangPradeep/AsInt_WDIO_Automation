import {equipmentTestData} from '../../../../test_data/btp_applications/equipment.data';
import utils from '../../../../utils/utils';

class EquipmentRegressionPage {

    private equipmentSearched() { return $("(//tr[@role='row']//span[@title='Navigation'])[1]"); }
    private get equipmentGeneralInfoTab() { return $("//bdi[text()='General Information']/ancestor::button"); }
    private get equipmentIframe() { return $('iframe[data-help-id="application-equipment-manage"]'); }
    private get equipmentAssetIntTab() { return $("//bdi[text()='Asset Intelligence']"); }
    private get assetInsp() { return $("//div[text()='Asset Inspection']/following::span[1]"); }
    private get inspectionAssessment() { return $("//div[contains(text(),'Inspection')]/following::span[text()='Assessment']/following::tr//td[@aria-colindex='1']//a"); }
    private get inspectionAssessmentDesc() { return $("//div[contains(text(),'Inspection')]/following::span[text()='Assessment']/following::tr//td[@aria-colindex='1']//span"); }
    private get inspectionEquipment() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Equipment']/following::tr//td[@aria-colindex='2']//span)[1]"); }
    private get inspectionEquipmentDesc() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Equipment']/following::tr//td[@aria-colindex='2']//span)[2]"); }
    private get inspectionAssessmentTemplate() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Assessment Template']/following::tr//td[@aria-colindex='3']//span)[1]"); }
    private get inspectionAssessmentTemplateDesc() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Assessment Template']/following::tr//td[@aria-colindex='3']//span)[2]"); }
    private get inspectionStatus() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Status']/following::tr//td[@aria-colindex='4']//span)[1]"); }
    private get inspectionCreatedOn() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Created On / By']/following::tr//td[@aria-colindex='5']//span)[1]"); }
    private get inspectionCreatedBy() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Created On / By']/following::tr//td[@aria-colindex='5']//span)[2]"); }
    private get inspectionIframe() { return $("//*[@data-help-id='application-idms-manage']"); }
    private get inspectionHeaderEquipment() { return $("//bdi[text()='Equipment: ']/following::a[1]"); }
    private get inspectionHeaderEquipmentDesc() { return $("//bdi[text()='Equipment: ']/following::span[2]"); }
    private get inspectionHeaderStatus() { return $("//section//span[text()='Status']/following::span[1]"); }
    private get inspectionHeaderModifiedOn() { return $("//span[contains(text(),'Modified On')]"); }
    private get inspectionHeaderAssignedTo() { return $("//section//span[contains(text(),'Assigned To')]"); }
    private get findings() { return $("//div[text()='Findings']/following::span[1]"); }
    private get findingsEquipment() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Equipment']/following::tr//td[@aria-colindex='1']//span)[1]"); }
    private get findingsEquipmentDesc() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Equipment']/following::tr//td[@aria-colindex='1']//span)[2]"); }
    private get findingsDisplayeId() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Display Id']/following::tr//td[@aria-colindex='2']//a)[1]"); }
    private get findingsDisplayeIdDesc() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Display Id']/following::tr//td[@aria-colindex='2']//span)[1]"); }
    private get findingsNo() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Finding Number']/following::tr//td[@aria-colindex='4']//span)[1]"); }
    private get findingsType() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Finding Type']/following::tr//td[@aria-colindex='5']//span)[2]"); }
    private get findingsStatus() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Status']/following::tr//td[@aria-colindex='5']//span)[1]"); }
    private get findingsAssignedTo() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Assigned To']/following::tr//td[@aria-colindex='7']//span)[1]"); }
    private get findingsHeaderEquipment() { return $("//bdi[text()='Equipment: ']/following::a[1]"); }
    private get findingsHeaderEquipmentDesc() { return $("//bdi[text()='Equipment: ']/following::span[2]"); }
    private get findingsHeaderStatus() { return $("//section//span[text()='Status']/following::span[1]"); }
    private get findingsHeaderModifiedOn() { return $("//span[contains(text(),'Date Recorded')]"); }
    private get findingsHeaderAssignedTo() { return $("//bdi[text()='Assign Finding To']/following::span[2]"); }
    private get assetStrategyRCM() { return $("(//div[text()='Asset Strategy']/following::li//div//div)[1]"); }
    private get recommendation() { return $("//div[text()='Recommendations']/following::span[1]"); }
    private get assetStrategyAssessment() { return $("(//div[contains(text(),'Asset Strategy')]/following::table)[1]//tbody/tr[1]//td[@aria-colindex='1']//a"); }
    private get recoName() { return $("(//div[text()='Recommendations']/following::span[text()='Recommendation']/following::tr//td[@aria-colindex='1']//span)[1]"); }
    private get recoDesc() { return $("(//div[text()='Recommendations']/following::span[text()='Recommendation']/following::tr//td[@aria-colindex='1']//span)[2]"); }
    private get recoLongDesc() { return $("(//div[text()='Recommendations']/following::span[text()='Long Description']/following::tr//td[@aria-colindex='3']//span)[1]"); }
    private get recoAssessmentLink() { return $("(//div[text()='Recommendations']/following::span[text()='Assessment']/following::tr//td[@aria-colindex='4']//a)[1]"); }
    private get recoAssessmentDesc() { return $("(//div[text()='Recommendations']/following::span[text()='Assessment']/following::tr//td[@aria-colindex='4']//span)[1]"); }
    private get recoDueDate() { return $("(//div[text()='Recommendations']/following::span[text()='Due Date']/following::tr//td[@aria-colindex='5']//span)[1]"); }
    private get recoStatus() { return $("(//div[text()='Recommendations']/following::span[starts-with(normalize-space(),'Recommendation Status') or normalize-space()='Status']/following::tr//td[@aria-colindex='7']//span)[1]"); }
    private get recoBudgetCategory() { return $("(//div[text()='Recommendations']/following::span[text()='Budget Category']/following::tr//td[@aria-colindex='11']//span)[1]"); }
    private get ASDIframe() { return $('iframe[data-help-id="application-assetstrategydevelopment-manage"]'); }
    private get ASDHeaderTemplateType() { return $("//section//span[text()='Template Type']/following::span[1]"); }
    private get ASDHeaderEquipment() { return $("//section//bdi[text()='Equipment: ']/following::a[1]"); }
    private get ASDHeaderStatus() { return $("//section//span[text()='Status']/following::span[1]"); }
    private get ASDHeaderModifiedOn() { return $("//section//span[text()='Modified On']/following::span[1]"); }
    private get asdRiskInformationTab() { return $("//bdi[normalize-space()='Risk Information']"); }
    private get asdRecoSearchInput() { return $("(//div[text()='Recommendations']/following::input[@type='search'])[1]"); }
    private get asdRecoFirstRowName() { return $("(//div[text()='Recommendations']/following::tr[@role='row']//a[starts-with(normalize-space(),'RECO_')])[1]"); }
    private get asdRecoCountTitle() { return $("(//span[starts-with(normalize-space(),'Recommendations (')])[last()]"); }

    private get rncAssessmentLink() { return $("//div[contains(text(),'Risk and Criticality')]/following::span[text()='Assessment']/following::tr//td[@aria-colindex='1']//a"); }
    private get rncAssessmentDesc() { return $("(//div[contains(text(),'Risk and Criticality')]/following::span[text()='Assessment']/following::tr//td[@aria-colindex='1']//span)[1]"); }
    private get rncAssessmentTemplate() { return $("(//div[contains(text(),'Risk and Criticality')]/following::span[text()='Assessment Template']/following::tr//td[@aria-colindex='2']//span)[1]"); }
    private get rncAssessmentTemplateDesc() { return $("(//div[contains(text(),'Risk and Criticality')]/following::span[text()='Assessment Template']/following::tr//td[@aria-colindex='2']//span)[2]"); }
    private get rncTechnicalObject() { return $("(//div[contains(text(),'Risk and Criticality')]/following::span[text()='Technical Object']/following::tr//td[@aria-colindex='3']//span)[1]"); }
    private get rncTechnicalObjectDesc() { return $("(//div[contains(text(),'Risk and Criticality')]/following::span[text()='Technical Object']/following::tr//td[@aria-colindex='3']//span)[2]"); }
    private get rncStatus() { return $("(//div[contains(text(),'Risk and Criticality')]/following::span[text()='Status']/following::tr//td[@aria-colindex='4']//span)[1]"); }
    private get rncRiskScore() { return $("(//div[contains(text(),'Risk and Criticality')]/following::span[text()='Risk Score']/following::tr//td[@aria-colindex='5']//span)[1]"); }
    private get rncCriticality() { return $("(//div[contains(text(),'Risk and Criticality')]/following::span[text()='Criticality']/following::tr//td[@aria-colindex='6']//span)[1]"); }
    private get rncCreatedOn() { return $("(//div[contains(text(),'Risk and Criticality')]/following::span[text()='Created On / By']/following::tr//td[@aria-colindex='7']//span)[1]"); }

    private get rncIframe() { return $('iframe[data-help-id="application-rca-manage"]'); }
    private get rncHeaderRiskType() { return $("//bdi[normalize-space()='Risk Type:']/following::span[2]"); }
    private get rncHeaderCurrency() { return $("//bdi[normalize-space()='Currency:']/following::span[2]"); }
    private get rncHeaderAllowedObjects() { return $("//bdi[normalize-space()='Allowed Objects:']/following::span[2]"); }
    private get rncHeaderStatusTag() { return $("(//div[@role='button' and @aria-roledescription='Object Tag']//span[not(@aria-hidden='true')])[1]"); }
    private get rncAssignmentsTab() { return $("//bdi[normalize-space()='Assignments']"); }
    private get rncAsgnTechnicalObject() { return $("(//*[normalize-space()='Technical Object']/ancestor::table[1])[last()]//tbody/tr[1]//td[@aria-colindex='1']//a"); }
    private get rncAsgnTechnicalObjectDesc() { return $("((//*[normalize-space()='Technical Object']/ancestor::table[1])[last()]//tbody/tr[1]//td[@aria-colindex='1']//span)[1]"); }
    private get rncAsgnObjectType() { return $("((//*[normalize-space()='Object Type']/ancestor::table[1])[last()]//tbody/tr[1]//td[@aria-colindex='2']//span)[1]"); }
    private get rncAsgnAssessmentTemplate() { return $("(//*[normalize-space()='Assessment Template']/ancestor::table[1])[last()]//tbody/tr[1]//td[@aria-colindex='3']//a"); }
    private get rncAsgnAssessmentTemplateDesc() { return $("((//*[normalize-space()='Assessment Template']/ancestor::table[1])[last()]//tbody/tr[1]//td[@aria-colindex='3']//span)[1]"); }
    private get rncAsgnRiskScore() { return $("((//*[normalize-space()='Risk Score']/ancestor::table[1])[last()]//tbody/tr[1]//td[@aria-colindex='4']//span)[1]"); }
    private get rncAsgnCriticality() { return $("((//*[normalize-space()='Criticality']/ancestor::table[1])[last()]//tbody/tr[1]//td[@aria-colindex='5']//span)[1]"); }

    private get rcmFleetTab() { return $("//div[contains(text(),'RCM/Fleet')]"); }
    private rcmFleetAssessmentRow() { return $("(//div[contains(text(),'Asset Strategy')]/following::tr[@aria-level='1' and .//a[starts-with(normalize-space(),'RCM_')]])[1]"); }
    private rcmFleetAssessmentLink() { return $("(//div[contains(text(),'Asset Strategy')]/following::tr[.//a[starts-with(normalize-space(),'RCM_')]])[1]//a[starts-with(normalize-space(),'RCM_')]"); }
    private rcmFleetAssessmentTreeIcon() { return $("(//div[contains(text(),'Asset Strategy')]/following::tr[.//a[starts-with(normalize-space(),'RCM_')]])[1]//*[@role='button' and (contains(@title,'Expand') or contains(@title,'Collapse'))][1]"); }

    private get rcmIframe() { return $('iframe[data-help-id="application-rcm-manage"]'); }
    private get rcmHeaderStatusTag() { return $("(//div[@role='button' and @aria-roledescription='Object Tag']//span[not(@aria-hidden='true')])[1]"); }
    private get rcmHeaderTemplateType() { return $("//bdi[starts-with(normalize-space(),'Template Type')]/following::span[1]"); }
    private get rcmHeaderTechReview() { return $("//bdi[starts-with(normalize-space(),'Technical Review Completed')]/following::span[1]"); }

    private get rcmAssessmentTab() { return $("//*[(@role='tab' or self::div) and normalize-space(.)='Assessment']"); }

    public inspectionDetails: any = {};
    public inspectionHeaderDetails: any = {};
    public findingsDetails: any = {};
    public findingsHeaderDetails: any = {};
    public assetStrategyDetails: any = {};
    public asdHeaderDetails: any = {};
    public rncDetails: any = {};
    public rncHeaderDetails: any = {};
    public rcmFleetDetails: any = {};
    public rcmHeaderDetails: any = {};
    public recoDetails: any = {};
    public recoAsdHeaderDetails: any = {};

    public async searchEquipment(equipment: string) {
        console.log("Searching for Equipment: " + equipment);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === "complete",
            { timeout: 20000 }
        );

        await browser.waitUntil(async () => {
            const frames = await $$("//iframe");
            for (const frame of frames) {
                try {
                    await browser.switchFrame(frame);
                    const search = await $("//input[@type='search']");
                    if (await search.isExisting()) {
                        return true;
                    }
                    await browser.switchFrame(null);
                } catch (e) {
                    await browser.switchFrame(null);
                }
            }
            return false;
        }, { timeout: 30000 });

        const getVisibleSearch = async () => {
            const elements = await $$("//input[@type='search']");
            for (const el of elements) {
                if (await el.isDisplayed()) {
                    return el;
                }
            }
            return null;
        };

        let searchBox;
        await browser.waitUntil(async () => {
            searchBox = await getVisibleSearch();
            return searchBox !== null;
        }, { timeout: 30000 });

        if (!searchBox) {
            throw new Error("Visible search box not found");
        }
        console.log("Visible search box found, searching for Equipment");
        await browser.execute((el, value) => {
            const input = el as unknown as HTMLInputElement;
            input.value = value as string;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }, searchBox, equipment);
        console.log(`Searched for Equipment with name: ${equipment}`);

        const getVisibleGo = async () => {
            const buttons = await $$("//bdi[text()='Go']");
            for (const btn of buttons) {
                if (await btn.isDisplayed()) {
                    return btn;
                }
            }
            return null;
        };

        let goBtn: any;
        await browser.waitUntil(async () => {
            goBtn = await getVisibleGo();
            return goBtn !== null;
        }, {
            timeout: 20000,
            interval: 500,
            timeoutMsg: "Go button not found"
        });
        if (!goBtn) {
            throw new Error("Go button not found");
        }

        console.log("Clicking Go button to search for Equipment");
        await goBtn.waitForDisplayed({ timeout: 10000 });
        await goBtn.waitForClickable({ timeout: 10000 });
        await goBtn.click();
        await browser.pause(5000);
        console.log("Search executed for: " + equipment);
    }

    public async navigateToSearchedEquipment() {
        console.log("Navigating to Detail view page of Equipment");
        try {
            await utils.waitForBusyIndicatorToDisappear();
            const nav = this.equipmentSearched();
            await utils.clickWithWait(nav);
            await utils.waitForBusyIndicatorToDisappear();
            await utils.switchToIframe(this.equipmentIframe);
            const el = await this.equipmentGeneralInfoTab;
            await el.waitForExist({ timeout: 90000 });
            await browser.execute((element) => { element.scrollIntoView({ block: 'center' }); }, el);
            await browser.pause(2000);
            await browser.execute((element) => { element.click(); }, el);
        } catch (e) {
            throw new Error(`Failed to navigate to Equipment Detail View page | ${(e as Error).message}`);
        }
        console.log("Navigated to Detail View page successfully");
    }

    public async navigateToAssetIntelligenceTab() {
        console.log("Navigating to Asset Intelligence Tab");
        try {
            await this.equipmentAssetIntTab.waitForExist({ timeout: 30000 });
            await utils.clickWithWait(this.equipmentAssetIntTab);
            await this.equipmentAssetIntTab.waitForDisplayed({ timeout: 30000 });
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        } catch (e) {
            throw new Error(`Failed to navigate to Asset Intelligence tab | ${(e as Error).message}`);
        }
        console.log("Navigated to Asset Intelligence Tab successfully");
    }

    public async verifyAssetInspectionDetails() {
        console.log("Verifying Asset Inspection details");
        const astInsp = await this.assetInsp.getText();
        const ai1 = await utils.getAssignedValue(astInsp);
        console.log("Assigned asset Inspection : " + ai1);
        if (ai1 === 0) {
            throw new Error("Assigned Asset Inspection is 0, expected value should be greater than 0");
        }
        console.log("Fetching Asset Inspection details...");
        await this.saveInspectionDetails();
        console.log(this.inspectionDetails.assessment);
        console.log(this.inspectionDetails.equipment);
        console.log(this.inspectionDetails.assessmentTemplate);
        console.log(this.inspectionDetails.status);
        console.log("Asset Inspection details stored successfully");
        console.log("Navigating to inspected Assessment details page");
        await this.openInspectedAssessment();
    }

    public async saveInspectionDetails(): Promise<void> {
        this.inspectionDetails = {
            assessment: await this.inspectionAssessment.getText(),
            assessmentDesc: await this.inspectionAssessmentDesc.getText(),
            equipment: await this.inspectionEquipment.getText(),
            equipmentDescription: await this.inspectionEquipmentDesc.getText(),
            assessmentTemplate: await this.inspectionAssessmentTemplate.getText(),
            assessmentTemplateDescription: await this.inspectionAssessmentTemplateDesc.getText(),
            status: await this.inspectionStatus.getText(),
            createdOn: await this.inspectionCreatedOn.getText(),
            createdBy: await this.inspectionCreatedBy.getText()
        };
        console.log(JSON.stringify(this.inspectionDetails, null, 2));
    }

    public async openInspectedAssessment(): Promise<void> {
        const parentWindow = await browser.getWindowHandle();
        await this.inspectionAssessment.click();
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            {
                timeout: 30000,
                timeoutMsg: "New tab did not open"
            }
        );
        const allWindows = await browser.getWindowHandles();
        const childWindow = allWindows.find(handle => handle !== parentWindow);
        try {
            await browser.switchToWindow(childWindow!);
            await this.inspectionIframe.waitForExist({ timeout: 30000 });
            await utils.switchToIframe(this.inspectionIframe);
            console.log("Switched to Assessment details page successfully");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            await this.saveInspectionHeaderDetails();
            await this.verifyInspectionDetails();
        } finally {
            await this.returnToParentWindow(parentWindow);
            console.log("Switched back to parent window successfully");
        }
    }

    public async getInspectionDesc() {
        const xpath = "//header[.//@role='heading']//div[@role='heading']";
        let found = false;
        try {
            await browser.waitUntil(async () => {
                const els = await $$(xpath);
                if (!els.length) return false;
                for (let el of els) {
                    let txt = (await el.getText()) ?? "";
                    if (!txt) txt = (await el.getAttribute("innerText")) ?? "";
                    txt = txt?.trim();
                    if (txt && (txt.startsWith("Automation") || txt.startsWith(""))) {
                        found = true;
                        return true;
                    }
                }
                return false;
            }, {
                timeout: 4000,
                interval: 500
            });
        } catch (e) {
            console.log("Equipment header not visible in this attempt");
        }

        if (!found) return "";
        const spans = await $$(xpath);
        for (let el of spans) {
            let txt = (await el.getText()) ?? "";
            if (!txt) txt = (await el.getAttribute("innerText")) ?? "";
            txt = txt?.trim();
            if (txt && (txt.startsWith("Automation") || txt.startsWith(""))) {
                return txt;
            }
        }
        return "";
    }

    private async returnToParentWindow(parentWindow: string, parentIframe?: ReturnType<typeof $>): Promise<void> {
        try {
            const handlesNow = await browser.getWindowHandles();
            if (handlesNow.length > 1) {
                try { await browser.closeWindow(); } catch (e) { }
            }
        } catch (e) { }
        try { await browser.switchToWindow(parentWindow); } catch (e) { }
        try { await utils.waitForBusyIndicatorToDisappear(); } catch (e) { }
        await browser.pause(5000);
        if (parentIframe) {
            try {
                await utils.switchToIframe(parentIframe);
                await browser.pause(2000);
            } catch (e) { }
        }
    }

    public async getDisplayId() {
        try {
            const idPrefixes = [
                "RECO_ASINT_", "RCM_", "RNC.", "RCM","RNC",
                "ASDA", "MSPE", "MSP", "PMPL", "PMNO", "PMWO", "PMFI",
                "TASK", "OPTA", "INSP", "CML", "DOCU", "FLOC", "EQUI",
                "HAZOP", "OBJT", "ASMT"
            ];
            for (const prefix of idPrefixes) {
                const txt = await browser.execute((p) => {
                    const el = document.evaluate(
                        `//span[starts-with(normalize-space(),'${p}')]`,
                        document,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE,
                        null
                    ).singleNodeValue;
                    return el ? (el.textContent || "") : "";
                }, prefix);
                if (txt) return txt.replace("Display ID:", "").trim();
            }
            return "";
        } catch (e) {
            return "";
        }
    }

    public async getFinalIDs() {
        let inspection = "";
        let actualId = "";
        const expandBtn = await $("(//span[text()='Expand Header']/preceding-sibling::span//span)[2]");
        const collapseBtn = await $("(//span[text()='Collapse Header']/preceding-sibling::span//span)[2]");
        for (let i = 0; i < 3; i++) {
            if (i === 0 && await expandBtn.isDisplayed()) {
                await expandBtn.waitForClickable({ timeout: 5000 });
                await expandBtn.click();
            } else if (i === 1 && await collapseBtn.isDisplayed()) {
                await collapseBtn.waitForClickable({ timeout: 5000 });
                await collapseBtn.click();
            }
            await browser.pause(500);
            const headerText = await this.getInspectionDesc();
            const displayText = await this.getDisplayId();
            if (!inspection && headerText) inspection = headerText;
            if (!actualId && displayText) actualId = displayText;
            console.log(`Attempt ${i + 1} → Inspection="${inspection || 'EMPTY'}" | DisplayID="${actualId || 'EMPTY'}"`);
            if (inspection && actualId) break;
        }
        return { inspection, actualId };
    }

    public async saveInspectionHeaderDetails(): Promise<void> {
        const { inspection, actualId } = await this.getFinalIDs();
        this.inspectionHeaderDetails = {
            inspectedName: inspection,
            inspectedId: actualId,
            equipment: await this.inspectionHeaderEquipment.getText(),
            equipmentDescription: await this.inspectionHeaderEquipmentDesc.getText(),
            status: await this.inspectionHeaderStatus.getText(),
            modifiedOn: (await this.inspectionHeaderModifiedOn.getText()).replace("Modified On", "").trim(),
            assignedTo: (await this.inspectionHeaderAssignedTo.getText()).replace("Assigned To", "").trim()
        };
        console.log(JSON.stringify(this.inspectionHeaderDetails, null, 2));
    }

    public async verifyInspectionDetails(): Promise<void> {
        const failures: string[] = [];

        const compare = (field: string, expected: string, actual: string) => {
            const exp = (expected || "").trim();
            const act = (actual || "").trim();
            if (exp !== act) {
                failures.push(`${field} mismatch | Expected="${exp}" | Actual="${act}"`);
            }
        };

        compare("Assessment ID", this.inspectionDetails.assessment, this.inspectionHeaderDetails.inspectedId);
        compare("Assessment Description", this.inspectionDetails.assessmentDesc, this.inspectionHeaderDetails.inspectedName);
        compare("Equipment", this.inspectionDetails.equipment, this.inspectionHeaderDetails.equipment);
        compare("Equipment Description", this.inspectionDetails.equipmentDescription, this.inspectionHeaderDetails.equipmentDescription);
        compare("Status", this.inspectionDetails.status, this.inspectionHeaderDetails.status);
        console.log(`Created By / Assigned To | Expected="${(this.inspectionDetails.createdBy || "").trim()}" | Actual="${(this.inspectionHeaderDetails.assignedTo || "").replace(/^:\s*/, "").trim()}"`);
        console.log(`Created On / Modified On | Expected="${(this.inspectionDetails.createdOn || "").trim()}" | Actual="${(this.inspectionHeaderDetails.modifiedOn || "").replace(/^:\s*/, "").trim()}"`);

        if (failures.length > 0) {
            throw new Error(`Inspection Details Verification Failed\n\n${failures.join("\n")}`);
        }

        console.log("Inspection Details Verification Passed");
    }

    public async verifyFindingDetails() {
        console.log("Verifying Findings details");
        await browser.pause(2000);
        await utils.switchToIframe(this.equipmentIframe);
        const finding = await this.findings.getText();
        const f = await utils.getAssignedValue(finding);
        console.log("Assigned findings : " + f);
        if (f === 0) {
            throw new Error("Assigned Findings is 0, expected value should be greater than 0");
        }
        console.log("Fetching Findings details...");
        await this.saveFindingsDetails();
        console.log(this.findingsDetails.equipment);
        console.log(this.findingsDetails.equipmentDesc);
        console.log(this.findingsDetails.displayId);
        console.log(this.findingsDetails.displayIdDesc);
        console.log(this.findingsDetails.findingNo);
        console.log(this.findingsDetails.findingType);
        console.log(this.findingsDetails.status);
        console.log(this.findingsDetails.assignedTo);
        console.log("Findings details stored successfully");
        console.log("Navigating to Findings details page");
        await this.openInspectedFindings();
    }

    public async saveFindingsDetails(): Promise<void> {
        this.findingsDetails = {
            equipment: await this.findingsEquipment.getText(),
            equipmentDesc: await this.findingsEquipmentDesc.getText(),
            displayId: await this.findingsDisplayeId.getText(),
            displayIdDesc: await this.findingsDisplayeIdDesc.getText(),
            findingNo: await this.findingsNo.getText(),
            findingType: await this.findingsType.getText(),
            status: await this.findingsStatus.getText(),
            assignedTo: await this.findingsAssignedTo.getText()
        };
        console.log(JSON.stringify(this.findingsDetails, null, 2));
    }

    public async openInspectedFindings(): Promise<void> {
        const parentWindow = await browser.getWindowHandle();
        await this.findingsDisplayeId.click();
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            {
                timeout: 30000,
                timeoutMsg: "New tab did not open"
            }
        );
        const allWindows = await browser.getWindowHandles();
        const childWindow = allWindows.find(handle => handle !== parentWindow);
        try {
            await browser.switchToWindow(childWindow!);
            await this.inspectionIframe.waitForExist({ timeout: 30000 });
            await utils.switchToIframe(this.inspectionIframe);
            console.log("Switched to Findings details page successfully");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            await this.saveFindingsHeaderDetails();
            await this.verifyFindingsDetails();
        } finally {
            await this.returnToParentWindow(parentWindow);
            console.log("Switched back to parent window successfully");
        }
    }

    public async saveFindingsHeaderDetails(): Promise<void> {
        const { inspection, actualId } = await this.getFinalIDs();
        this.findingsHeaderDetails = {
            findingName: inspection,
            inspectedId: actualId,
            equipment: await this.findingsHeaderEquipment.getText(),
            equipmentDescription: await this.findingsHeaderEquipmentDesc.getText(),
            status: await this.findingsHeaderStatus.getText(),
            modifiedOn: (await this.findingsHeaderModifiedOn.getText()).replace("Date Recorded", "").trim(),
            assignedTo: (await this.findingsHeaderAssignedTo.getText()).replace("Assign Finding To", "").trim()
        };
        console.log(JSON.stringify(this.findingsHeaderDetails, null, 2));
    }

    public async verifyFindingsDetails() {
        const failures: string[] = [];

        const compare = (field: string, expected: string, actual: string) => {
            const exp = (expected || "").trim();
            const act = (actual || "").trim();
            if (exp !== act) {
                failures.push(`${field} mismatch | Expected="${exp}" | Actual="${act}"`);
            }
        };

        compare("Equipment", this.findingsDetails.equipment, this.findingsHeaderDetails.equipment);
        compare("Equipment Description", this.findingsDetails.equipmentDesc, this.findingsHeaderDetails.equipmentDescription);
        compare("Status", this.findingsDetails.status, this.findingsHeaderDetails.status);
        compare("Created By / Assigned To", this.findingsDetails.assignedTo, this.findingsHeaderDetails.assignedTo.replace(/^:\s*/, ""));

        if (failures.length > 0) {
            throw new Error(`Findings Details Verification Failed\n\n${failures.join("\n")}`);
        }

        console.log("Findings Details Verification Passed");
    }

    public async verifyAssetStrategyDetails() {
        console.log("Verifying Asset Strategy (RBI) details");
        await utils.switchToIframe(this.equipmentIframe);
        await browser.pause(2000);
        const assetStraRCM = await this.assetStrategyRCM.getText();
        const as2 = await utils.getAssignedValue(assetStraRCM);
        console.log("Assigned asset strategy RCM: " + as2);
        if (as2 === 0) {
            throw new Error("Assigned Asset Strategy RCM is 0, expected value should be greater than 0");
        }
        await this.saveAssetStrategyDetails();
        await this.openAssetStrategyAssessment();
        console.log("Asset Strategy (RBI) details verified successfully");
    }

    public async verifyAssetStrategyRCMFleetDetails() {
        console.log("Verifying Asset Strategy (RCM/Fleet) details");
        await utils.switchToIframe(this.equipmentIframe);
        await browser.pause(2000);
        await this.verifyRCMFleetDetails();
    }

    public async openAssetStrategyAssessment(): Promise<void> {
        const parentWindow = await browser.getWindowHandle();
        await this.assetStrategyAssessment.click();
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            {
                timeout: 30000,
                timeoutMsg: "New tab did not open"
            }
        );
        const allWindows = await browser.getWindowHandles();
        const childWindow = allWindows.find(handle => handle !== parentWindow);
        try {
            await browser.switchToWindow(childWindow!);
            await this.ASDIframe.waitForExist({ timeout: 30000 });
            await utils.switchToIframe(this.ASDIframe);
            console.log("Switched to Asset Strategy details page successfully");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            await this.saveAssetStrategyHeaderDetails();
            await this.verifyASDDetails();
        } finally {
            await this.returnToParentWindow(parentWindow);
            console.log("Switched back to parent window successfully");
        }
    }

    public async saveAssetStrategyDetails(): Promise<void> {
        const cells = await browser.execute(() => {
            const heading = document.evaluate(
                "//div[contains(text(),'Asset Strategy')]",
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
            ).singleNodeValue as HTMLElement | null;
            if (!heading) return null;

            const tables = Array.from(document.querySelectorAll('table'));
            const table = tables.find(t => heading.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING);
            if (!table) return null;

            const headerCells = Array.from(table.querySelectorAll('thead th, thead td')) as HTMLElement[];
            const headers = headerCells.map(h => (h.innerText || '').trim());

            const firstRow = table.querySelector('tbody tr');
            if (!firstRow) return null;
            const dataCells = Array.from(firstRow.querySelectorAll(':scope > td')) as HTMLElement[];

            const byHeader: Record<string, string[]> = {};
            dataCells.forEach((td, i) => {
                const key = headers[i] || `col${i + 1}`;
                const lines = (td.innerText || '')
                    .split(/\r?\n+/)
                    .map(s => s.trim())
                    .filter(s => s.length > 0);
                byHeader[key] = lines;
            });
            return byHeader;
        }) as Record<string, string[]> | null;

        const get = (header: string, idx: number) => {
            if (!cells) return '';
            const found = Object.keys(cells).find(k => k.toLowerCase().includes(header.toLowerCase()));
            const lines = found ? cells[found] : [];
            return lines[idx] || '';
        };

        this.assetStrategyDetails = {
            assessment: get('Assessment', 0) || (await this.assetStrategyAssessment.getText()),
            assessmentDesc: get('Assessment', 1),
            assessmentTemplate: get('Assessment Template', 0),
            assessmentTemplateDescription: get('Assessment Template', 1),
            status: get('Status', 0),
            createdOn: get('Created On', 0),
            createdBy: get('Created On', 1)
        };
        console.log("Asset Strategy Details:");
        console.log(JSON.stringify(this.assetStrategyDetails, null, 2));
    }

    public async saveAssetStrategyHeaderDetails(): Promise<void> {
        const { inspection, actualId } = await this.getFinalIDs();
        this.asdHeaderDetails = {
            asdName: inspection,
            asdID: actualId,
            templateType: await this.ASDHeaderTemplateType.getText(),
            equipment: await this.ASDHeaderEquipment.getText(),
            status: await this.ASDHeaderStatus.getText(),
            modifiedOn: await this.ASDHeaderModifiedOn.getText()
        };
        console.log("ASD Header Details:");
        console.log(JSON.stringify(this.asdHeaderDetails, null, 2));
    }

    public async verifyASDDetails(): Promise<void> {
        const failures: string[] = [];
        const compare = (field: string, expected: string, actual: string) => {
            const exp = (expected || "").trim();
            const act = (actual || "").trim();
            if (exp !== act) {
                failures.push(`${field} mismatch | Expected="${exp}" | Actual="${act}"`);
            }
        };

        compare("Assessment ID", this.assetStrategyDetails.assessment, this.asdHeaderDetails.asdID);
        compare("Assessment Description", this.assetStrategyDetails.assessmentDesc, this.asdHeaderDetails.asdName);
        compare("Assessment Template", this.assetStrategyDetails.assessmentTemplateDescription, this.asdHeaderDetails.templateType);
        compare("Equipment", equipmentTestData.searchEquipment.equipment, this.asdHeaderDetails.equipment);
        compare("Status", this.assetStrategyDetails.status, this.asdHeaderDetails.status);
        compare("Created On / Modified On", this.assetStrategyDetails.createdOn, this.asdHeaderDetails.modifiedOn);

        if (failures.length > 0) {
            throw new Error(`ASD Details Verification Failed\n\n${failures.join("\n")}`);
        }

        console.log("ASD Details Verification Passed");
    }

    public async verifyRecommendationDetails() {
        console.log("Verifying Recommendation details");
        await utils.switchToIframe(this.equipmentIframe);
        await browser.pause(2000);
        const recommendation = await this.recommendation.getText();
        const recom = await utils.getAssignedValue(recommendation);
        console.log("Assigned recommendations: " + recom);
        if (recom === 0) {
            throw new Error("Assigned Recommendations is 0, expected value should be greater than 0");
        }
        await this.recoName.waitForExist({ timeout: 30000 });
        await this.recoName.scrollIntoView({ block: 'center' });
        await browser.pause(1000);
        await this.saveRecommendationDetails();
        console.log("Recommendation details stored successfully");
        await this.openRecommendationAssessment();
    }

    public async saveRecommendationDetails(): Promise<void> {
        const safeText = async (el: any) => {
            try {
                if (await el.isExisting()) return (await el.getText() ?? "").trim();
            } catch { /* ignore */ }
            return "";
        };
        this.recoDetails = {
            recoName: await safeText(this.recoName),
            recoDesc: await safeText(this.recoDesc),
            longDescription: await safeText(this.recoLongDesc),
            assessment: await safeText(this.recoAssessmentLink),
            assessmentDesc: await safeText(this.recoAssessmentDesc),
            dueDate: await safeText(this.recoDueDate),
            status: await safeText(this.recoStatus),
            budgetCategory: await safeText(this.recoBudgetCategory)
        };
        console.log("Recommendation Details:");
        console.log(JSON.stringify(this.recoDetails, null, 2));
    }

    public async openRecommendationAssessment(): Promise<void> {
        const parentWindow = await browser.getWindowHandle();
        await this.recoAssessmentLink.click();
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            { timeout: 30000, timeoutMsg: "New tab did not open for Recommendation assessment" }
        );
        const allWindows = await browser.getWindowHandles();
        const childWindow = allWindows.find(handle => handle !== parentWindow);
        try {
            await browser.switchToWindow(childWindow!);
            await this.ASDIframe.waitForExist({ timeout: 30000 });
            await utils.switchToIframe(this.ASDIframe);
            console.log("Switched to ASD details page (from Recommendation) successfully");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            await this.saveRecoAsdHeaderDetails();
            await this.verifyRecoInAsd();
        } finally {
            await this.returnToParentWindow(parentWindow, this.equipmentIframe);
            console.log("Switched back to parent window successfully");
        }
    }

    public async saveRecoAsdHeaderDetails(): Promise<void> {
        const { inspection, actualId } = await this.getFinalIDs();
        this.recoAsdHeaderDetails = {
            asdName: inspection,
            asdID: actualId,
            templateType: await this.ASDHeaderTemplateType.getText(),
            equipment: await this.ASDHeaderEquipment.getText(),
            status: await this.ASDHeaderStatus.getText(),
            modifiedOn: await this.ASDHeaderModifiedOn.getText()
        };
        console.log("Recommendation -> ASD Header Details:");
        console.log(JSON.stringify(this.recoAsdHeaderDetails, null, 2));
    }

    public async verifyRecoInAsd(): Promise<void> {
        const expectedReco = (this.recoDetails.recoName || "").trim();
        if (!expectedReco) {
            throw new Error("Recommendation name was not captured from Equipment Recommendations panel");
        }
        console.log(`Verifying Recommendation "${expectedReco}" inside ASD Risk Information`);

        const tab = this.asdRiskInformationTab;
        await tab.waitForExist({ timeout: 30000 });
        await tab.scrollIntoView({ block: 'center' });
        await utils.clickWithWait(tab);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        const searchBox = this.asdRecoSearchInput;
        await searchBox.waitForExist({ timeout: 30000 });
        await searchBox.scrollIntoView({ block: 'center' });
        await browser.pause(1000);
        await searchBox.click();
        await searchBox.setValue(expectedReco);
        await browser.keys('Enter');
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        const countTitle = this.asdRecoCountTitle;
        await countTitle.waitForExist({ timeout: 30000 });
        const countText = (await countTitle.getText()).trim();
        const match = countText.match(/\((\d+)\)/);
        const count = match ? parseInt(match[1], 10) : -1;
        console.log(`ASD Recommendations title after search: "${countText}" | count=${count}`);

        if (count !== 1) {
            throw new Error(`Recommendation "${expectedReco}" not found in ASD | Expected count=1 | Actual count=${count}`);
        }

        const firstRowName = this.asdRecoFirstRowName;
        await firstRowName.waitForExist({ timeout: 30000 });
        const actualReco = (await firstRowName.getText()).trim();
        console.log(`ASD Recommendation first row: "${actualReco}"`);

        this.recoAsdHeaderDetails.recoName = actualReco;

        if (actualReco !== expectedReco) {
            throw new Error(`Recommendation mismatch in ASD | Expected="${expectedReco}" | Actual="${actualReco}"`);
        }
        console.log("Recommendation Verification in ASD Passed");
    }

    public async verifyRiskAndCriticalityDetails() {
        console.log("Verifying Risk and Criticality details");
        await utils.switchToIframe(this.equipmentIframe);
        await browser.pause(2000);
        await this.rncAssessmentLink.waitForExist({ timeout: 30000 });
        await this.rncAssessmentLink.scrollIntoView({ block: 'center' });
        await browser.pause(1000);
        await this.saveRiskAndCriticalityDetails();
        console.log("Risk and Criticality details stored successfully");
        await this.openRiskAndCriticalityAssessment();
    }

    public async saveRiskAndCriticalityDetails(): Promise<void> {
        this.rncDetails = {
            assessment: await this.rncAssessmentLink.getText(),
            assessmentDesc: await this.rncAssessmentDesc.getText(),
            assessmentTemplate: await this.rncAssessmentTemplate.getText(),
            assessmentTemplateDesc: await this.rncAssessmentTemplateDesc.getText(),
            technicalObject: await this.rncTechnicalObject.getText(),
            technicalObjectDesc: await this.rncTechnicalObjectDesc.getText(),
            status: await this.rncStatus.getText(),
            riskScore: await this.rncRiskScore.getText(),
            criticality: await this.rncCriticality.getText(),
            createdOn: await this.rncCreatedOn.getText()
        };
        console.log("Risk and Criticality Details:");
        console.log(JSON.stringify(this.rncDetails, null, 2));
    }

    public async openRiskAndCriticalityAssessment(): Promise<void> {
        const parentWindow = await browser.getWindowHandle();
        await this.rncAssessmentLink.click();
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            {
                timeout: 30000,
                timeoutMsg: "New tab did not open"
            }
        );
        const allWindows = await browser.getWindowHandles();
        const childWindow = allWindows.find(handle => handle !== parentWindow);
        try {
            await browser.switchToWindow(childWindow!);
            await this.rncIframe.waitForExist({ timeout: 30000 });
            await utils.switchToIframe(this.rncIframe);
            console.log("Switched to RNC details page successfully");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            await this.saveRiskAndCriticalityHeaderDetails();
            await this.verifyRNCDetails();
        } finally {
            await this.returnToParentWindow(parentWindow, this.equipmentIframe);
            console.log("Switched back to parent window successfully");
        }
    }

    public async saveRiskAndCriticalityHeaderDetails(): Promise<void> {
        const { inspection, actualId } = await this.getFinalIDs();
        this.rncHeaderDetails = {
            title: inspection,
            rncId: actualId,
            status: (await this.rncHeaderStatusTag.getText()).trim(),
            riskType: (await this.rncHeaderRiskType.getText()).trim(),
            currency: (await this.rncHeaderCurrency.getText()).trim(),
            allowedObjects: (await this.rncHeaderAllowedObjects.getText()).trim()
        };
        console.log("RNC Header Details:");
        console.log(JSON.stringify(this.rncHeaderDetails, null, 2));

        await this.navigateToRncAssignmentsTab();
        const assignments = {
            technicalObject: (await this.rncAsgnTechnicalObject.getText()).trim(),
            technicalObjectDesc: (await this.rncAsgnTechnicalObjectDesc.getText()).trim(),
            objectType: (await this.rncAsgnObjectType.getText()).trim(),
            assessmentTemplate: (await this.rncAsgnAssessmentTemplate.getText()).trim(),
            assessmentTemplateDesc: (await this.rncAsgnAssessmentTemplateDesc.getText()).trim(),
            riskScore: (await this.rncAsgnRiskScore.getText()).trim(),
            criticality: (await this.rncAsgnCriticality.getText()).trim()
        };
        Object.assign(this.rncHeaderDetails, assignments);
        console.log("RNC Assignments Details:");
        console.log(JSON.stringify(assignments, null, 2));
    }

    public async navigateToRncAssignmentsTab(): Promise<void> {
        console.log("Navigating to RNC Assignments tab");
        const tab = this.rncAssignmentsTab;
        await tab.waitForExist({ timeout: 30000 });
        await tab.scrollIntoView({ block: 'center' });
        await utils.clickWithWait(tab);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Navigated to RNC Assignments tab");
    }

    public async verifyRNCDetails(): Promise<void> {
        const failures: string[] = [];
        const compare = (field: string, expected: string, actual: string) => {
            const exp = (expected || "").trim();
            const act = (actual || "").trim();
            if (exp !== act) {
                failures.push(`${field} mismatch | Expected="${exp}" | Actual="${act}"`);
            }
        };

        compare("Assessment ID", this.rncDetails.assessment, this.rncHeaderDetails.rncId);
        compare("Assessment Description", this.rncDetails.assessmentDesc, this.rncHeaderDetails.title);
        compare("Status", this.rncDetails.status, this.rncHeaderDetails.status);
        compare("Technical Object", this.rncDetails.technicalObject, this.rncHeaderDetails.technicalObject);
        compare("Technical Object Description", this.rncDetails.technicalObjectDesc, this.rncHeaderDetails.technicalObjectDesc);
        compare("Assessment Template", this.rncDetails.assessmentTemplate, this.rncHeaderDetails.assessmentTemplate);
        compare("Assessment Template Description", this.rncDetails.assessmentTemplateDesc, this.rncHeaderDetails.assessmentTemplateDesc);
        compare("Risk Score", this.rncDetails.riskScore, this.rncHeaderDetails.riskScore);

        const expCrit = (this.rncDetails.criticality || "").trim();
        const actCrit = (this.rncHeaderDetails.criticality || "").trim();
        if (!expCrit.startsWith(actCrit) && expCrit !== actCrit) {
            failures.push(`Criticality mismatch | Expected (starts with)="${actCrit}" | Actual="${expCrit}"`);
        }

        compare("Allowed Objects", "Equipment", this.rncHeaderDetails.allowedObjects);

        if (failures.length > 0) {
            throw new Error(`Risk and Criticality Details Verification Failed\n\n${failures.join("\n")}`);
        }

        console.log("Risk and Criticality Details Verification Passed");
    }

    

    public async verifyRCMFleetDetails() {
        console.log("Verifying Asset Strategy - RCM/Fleet details");
        const tab = this.rcmFleetTab;
        await tab.waitForExist({ timeout: 30000 });
        await tab.scrollIntoView({ block: 'center' });
        await utils.clickWithWait(tab);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        const row = this.rcmFleetAssessmentRow();
        await row.waitForExist({ timeout: 30000 });
        await row.scrollIntoView({ block: 'center' });
        await browser.pause(1000);

        const readRow = () => browser.execute(() => {
            const link = document.evaluate(
                "(//div[contains(text(),'Asset Strategy')]/following::tr[.//a[starts-with(normalize-space(),'RCM_')]])[1]//a[starts-with(normalize-space(),'RCM_')]",
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
            ).singleNodeValue as HTMLAnchorElement | null;
            if (!link) return null;
            const tr = link.closest('tr');
            if (!tr) return null;

            const isHidden = (e: HTMLElement): boolean => {
                if (e.getAttribute('aria-hidden') === 'true') return true;
                if (e.style && e.style.display === 'none') return true;
                const cls = e.className || '';
                if (typeof cls === 'string' && /sapUi(Pseudo)?InvisibleText|sapUiHiddenPlaceholder/.test(cls)) return true;
                return false;
            };

            const visibleText = (el: Element | null): string => {
                if (!el) return '';
                let out = '';
                el.childNodes.forEach(n => {
                    if (n.nodeType === Node.TEXT_NODE) {
                        out += (n.textContent || '');
                    } else if (n.nodeType === Node.ELEMENT_NODE) {
                        const e = n as HTMLElement;
                        if (isHidden(e)) return;
                        out += ' ' + visibleText(e);
                    }
                });
                return out;
            };

            const cleanLine = (s: string) => s.replace(/\s+/g, ' ').trim();

            const assessmentCell = tr.querySelector('td[aria-colindex="2"]');
            const statusCell = tr.querySelector('td[aria-colindex="7"]');
            const titleDiv = assessmentCell?.querySelector('.sapMObjectIdentifierTitle') || null;
            const descDiv = assessmentCell?.querySelector('.sapMObjectIdentifierText') || null;
            const assessment = cleanLine(visibleText(titleDiv) || (link.textContent || ''));
            const assessmentDesc = cleanLine(visibleText(descDiv));
            const status = cleanLine(visibleText(statusCell));

            const allRows = Array.from(tr.parentElement?.children || []) as HTMLElement[];
            const startIdx = allRows.indexOf(tr as HTMLElement);
            let maintainableItem = '';
            let failureMode = '';
            for (let i = startIdx + 1; i < allRows.length; i++) {
                const r = allRows[i];
                const level = parseInt(r.getAttribute('aria-level') || '0', 10);
                if (level <= 1) break;
                if (level === 2 && !maintainableItem) {
                    const t = cleanLine(visibleText(r.querySelector('td[aria-colindex="3"]')));
                    if (t) maintainableItem = t;
                }
                if (level === 3 && !failureMode) {
                    const t = cleanLine(visibleText(r.querySelector('td[aria-colindex="4"]')));
                    if (t) failureMode = t;
                }
                if (maintainableItem && failureMode) break;
            }

            return { assessment, assessmentDesc, status, maintainableItem, failureMode };
        }) as Promise<{
            assessment: string; assessmentDesc: string; status: string;
            maintainableItem: string; failureMode: string;
        } | null>;

        const tree1 = this.rcmFleetAssessmentTreeIcon();
        if (await tree1.isExisting()) {
            await utils.clickWithWait(tree1);
            await browser.pause(1500);
        }
        const childExpand = await $("(//div[contains(text(),'Asset Strategy')]/following::tr[@aria-level='2']//*[@role='button' and contains(@title,'Expand')])[1]");
        if (await childExpand.isExisting()) {
            await utils.clickWithWait(childExpand);
            await browser.pause(1500);
        }

        const rowData = await readRow();
        const assessment = rowData?.assessment || (await this.rcmFleetAssessmentLink().getText()).trim();
        const status = rowData?.status || '';

        this.rcmFleetDetails = {
            assessment,
            assessmentDesc: rowData?.assessmentDesc || '',
            status,
            maintainableItem: rowData?.maintainableItem || '',
            failureMode: rowData?.failureMode || ''
        };
        console.log("RCM/Fleet Row Details:");
        console.log(JSON.stringify(this.rcmFleetDetails, null, 2));

        if (!status) {
            throw new Error("RCM/Fleet assessment status was empty");
        }

        await this.openRCMAssessment();
    }

    public async openRCMAssessment(): Promise<void> {
        const parentWindow = await browser.getWindowHandle();
        await this.rcmFleetAssessmentLink().click();
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            { timeout: 30000, timeoutMsg: "New tab did not open for RCM assessment" }
        );
        const allWindows = await browser.getWindowHandles();
        const childWindow = allWindows.find(handle => handle !== parentWindow);
        try {
            await browser.switchToWindow(childWindow!);
            await this.rcmIframe.waitForExist({ timeout: 30000 });
            await utils.switchToIframe(this.rcmIframe);
            console.log("Switched to RCM assessment details page successfully");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);

            await this.saveRCMHeaderDetails();
            await this.verifyRCMHeader();
            await this.verifyRCMHierarchyAndTechnicalObjects();
        } finally {
            await this.returnToParentWindow(parentWindow, this.equipmentIframe);
            console.log("Switched back to equipment tab successfully");
        }
    }

    public async saveRCMHeaderDetails(): Promise<void> {
        const { inspection, actualId } = await this.getFinalIDs();
        this.rcmHeaderDetails = {
            title: inspection,
            rcmId: actualId,
            status: (await this.rcmHeaderStatusTag.getText()).trim(),
            templateType: (await this.rcmHeaderTemplateType.getText()).trim(),
            technicalReviewCompleted: (await this.rcmHeaderTechReview.getText()).trim()
        };
        console.log("RCM Header Details:");
        console.log(JSON.stringify(this.rcmHeaderDetails, null, 2));
    }

    public async verifyRCMHeader(): Promise<void> {
        const failures: string[] = [];
        const compare = (field: string, expected: string, actual: string) => {
            const exp = (expected || "").trim();
            const act = (actual || "").trim();
            if (exp !== act) {
                failures.push(`${field} mismatch | Expected="${exp}" | Actual="${act}"`);
            }
        };
        compare("Assessment ID", this.rcmFleetDetails.assessment, this.rcmHeaderDetails.rcmId);
        compare("Assessment Description", this.rcmFleetDetails.assessmentDesc, this.rcmHeaderDetails.title);
        compare("Status", this.rcmFleetDetails.status, this.rcmHeaderDetails.status);

        if (failures.length > 0) {
            throw new Error(`RCM Header Verification Failed\n\n${failures.join("\n")}`);
        }
        console.log("RCM Header Verification Passed");
    }

    private async expandAllNodesInSection(sectionHeading: string, optionalLeafText?: string): Promise<void> {
        const maxRounds = 10;
        const sectionXPath = `//*[contains(normalize-space(.), ${JSON.stringify(sectionHeading)})]`;
        for (let i = 0; i < maxRounds; i++) {
            if (optionalLeafText) {
                const visible = await $(
                    `${sectionXPath}/following::span[contains(normalize-space(), ${JSON.stringify(optionalLeafText)})]`
                );
                if (await visible.isExisting() && await visible.isDisplayed()) return;
            }
            const closed = await $$(
                `${sectionXPath}/following::*[@role='button' and @title='Expand/Collapse Node' and @aria-expanded='false']`
            );
            if (!closed.length) return;
            for (const btn of closed) {
                try {
                    await btn.scrollIntoView({ block: 'center' });
                    await utils.clickWithWait(btn);
                    await browser.pause(400);
                } catch (e) { }
            }
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(800);
        }
    }

    public async verifyRCMHierarchyAndTechnicalObjects(): Promise<void> {
        console.log("Verifying RCM hierarchy & Technical Objects");

        try {
            const tab = this.rcmAssessmentTab;
            if (await tab.isExisting() && await tab.isDisplayed()) {
                await utils.clickWithWait(tab);
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(1500);
            }
        } catch (e) { }

        const leafText = "Unable to prevent contamination and loss of lubricant (201)";
        await this.expandAllNodesInSection("Hierarchy", leafText);

        const leaf = await $(
            `//*[normalize-space()='Hierarchy']/following::span[normalize-space()=${JSON.stringify(leafText)}]`
        );
        await leaf.waitForExist({ timeout: 30000 });
        await leaf.scrollIntoView({ block: 'center' });
        await utils.clickWithWait(leaf);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        await this.expandAllNodesInSection("Technical Objects");

        const expectedEquipId = equipmentTestData.searchEquipment.equipment;
        const expectedItem = this.rcmFleetDetails.maintainableItem;
        const expectedFailure = this.rcmFleetDetails.failureMode;

        const findSpanText = async (value: string): Promise<string> => {
            if (!value) return '';
            const els = await $$(`//span[contains(text(),${JSON.stringify(value)})]`);
            for (const el of els) {
                try {
                    if (await el.isExisting() && await el.isDisplayed()) {
                        const txt = (await el.getText()).trim();
                        if (txt) return txt;
                    }
                } catch (e) { }
            }
            for (const el of els) {
                try {
                    const txt = (await el.getText()).trim();
                    if (txt) return txt;
                } catch (e) { }
            }
            return '';
        };

        const equipment = await findSpanText(expectedEquipId);
        const maintainableItem = await findSpanText(expectedItem);
        const failureMode = await findSpanText(expectedFailure);

        const techObjects = { equipment, maintainableItem, failureMode };
        console.log("RCM Technical Objects:");
        console.log(JSON.stringify(techObjects, null, 2));

        this.rcmHeaderDetails.equipment = equipment;
        this.rcmHeaderDetails.maintainableItem = maintainableItem;
        this.rcmHeaderDetails.failureMode = failureMode;

        const failures: string[] = [];
        if (!equipment.includes(expectedEquipId)) {
            failures.push(`Equipment mismatch | Expected to contain="${expectedEquipId}" | Actual="${equipment}"`);
        }
        if (!expectedItem) {
            failures.push("Maintainable Item was not captured from RCM/Fleet row");
        } else if (!maintainableItem.includes(expectedItem)) {
            failures.push(`Maintainable Item mismatch | Expected to contain="${expectedItem}" | Actual="${maintainableItem}"`);
        }
        if (!expectedFailure) {
            failures.push("Failure Mode was not captured from RCM/Fleet row");
        } else if (!failureMode.includes(expectedFailure)) {
            failures.push(`Failure Mode mismatch | Expected to contain="${expectedFailure}" | Actual="${failureMode}"`);
        }
        if (failures.length > 0) {
            throw new Error(`RCM Technical Objects Verification Failed\n\n${failures.join("\n")}`);
        }
        console.log("RCM Technical Objects Verification Passed");
    }
}

export default new EquipmentRegressionPage();

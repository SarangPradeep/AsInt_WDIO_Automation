import {funcLocTestData} from '../../../../test_data/btp_applications/functional_location.data.ts';
import utils from '../../../../utils/utils';
class FunctionalLocationRegressionPage {

    private funcLocSearched() { return $("(//tr[@role='row']//span[@title='Navigation'])[1]"); }
    private get funLocGeneralInfoTab() { return $("//bdi[text()='General Information']/ancestor::button"); }
    private get funLocIframe() { return $('iframe[data-help-id="application-functionallocation-manage"]'); }
    private get funLocAssetIntTab() { return $("//bdi[text()='Asset Intelligence']"); }
    private get assetInsp() { return $("//div[text()='Asset Inspection']/following::span[1]"); }
    private get inspectionAssessment() { return $("//div[contains(text(),'Inspection')]/following::span[text()='Assessment']/following::tr//td[@aria-colindex='1']//a"); }
    private get inspectionAssessmentDesc() { return $("//div[contains(text(),'Inspection')]/following::span[text()='Assessment']/following::tr//td[@aria-colindex='1']//span"); }
    private get inspectionEquipment() { return $("//div[contains(text(),'Inspection')]/following::span[text()='Equipment']/following::tr//td[@aria-colindex='2']//div[1]"); }
    private get inspectionFunctionalLocation() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Functional Location']/following::tr//td[@aria-colindex='3']//span)[1]"); }
    private get inspectionFunctionalLocationDesc() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Functional Location']/following::tr//td[@aria-colindex='3']//span)[2]"); }
    private get inspectionAssessmentTemplate() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Assessment Template']/following::tr//td[@aria-colindex='4']//span)[1]"); }
    private get inspectionAssessmentTemplateDesc() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Assessment Template']/following::tr//td[@aria-colindex='4']//span)[2]"); }
    private get inspectionStatus() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Status']/following::tr//td[@aria-colindex='5']//span)[1]"); }
    private get inspectionCreatedOn() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Created On / By']/following::tr//td[@aria-colindex='6']//span)[1]"); }
    private get inspectionCreatedBy() { return $("(//div[contains(text(),'Inspection')]/following::span[text()='Created On / By']/following::tr//td[@aria-colindex='6']//span)[2]"); }
    private get inspectionIframe() { return $("//*[@data-help-id='application-idms-manage']"); }
    private get inspectionHeaderFunctionalLocation() { return $("//bdi[text()='Functional Location: ']/following::a[1]"); }
    private get inspectionHeaderFunctionalLocationDesc() { return $("//bdi[text()='Functional Location: ']/following::span[2]"); }
    private get inspectionHeaderStatus() { return $("//section//span[text()='Status']/following::span[1]"); }
    private get inspectionHeaderModifiedOn() { return $("//span[contains(text(),'Modified On')]"); }
    private get inspectionHeaderAssignedTo() { return $("//section//span[contains(text(),'Assigned To')]"); }
    private get findings() { return $("//div[text()='Findings']/following::span[1]"); }
    private get findingsEquipment() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Equipment']/following::tr//td[@aria-colindex='1']//div)[1]"); }
    private get findingsFunctionalLocation() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Functional Location']/following::tr//td[@aria-colindex='2']//span)[1]"); }
    private get findingsFunctionalLocationDesc() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Functional Location']/following::tr//td[@aria-colindex='2']//span)[2]"); }
    private get findingsDisplayeId() { return $("//div[contains(text(),'Findings')]/following::span[text()='Display Id']/following::tr//td[@aria-colindex='3']//a"); }
    private get findingsDisplayeIdDesc() { return $("//div[contains(text(),'Findings')]/following::span[text()='Display Id']/following::tr//td[@aria-colindex='3']//span"); }
    private get findingsNo() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Finding Number']/following::tr//td[@aria-colindex='4']//span)[1]"); }
    private get findingsType() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Finding Type']/following::tr//td[@aria-colindex='5']//span)[2]"); }
    private get findingsStatus() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Status']/following::tr//td[@aria-colindex='6']//span)[1]"); }
    private get findingsAssignedTo() { return $("(//div[contains(text(),'Findings')]/following::span[text()='Assigned To']/following::tr//td[@aria-colindex='8']//span)[1]"); }
    private get findingsHeaderFunctionalLocation() { return $("//bdi[text()='Functional Location: ']/following::a[1]"); }
    private get findingsHeaderFunctionalLocationDesc() { return $("//bdi[text()='Functional Location: ']/following::span[2]"); }
    private get findingsHeaderStatus() { return $("//section//span[text()='Status']/following::span[1]"); }
    private get findingsHeaderModifiedOn() { return $("//span[contains(text(),'Date Recorded')]"); }
    private get findingsHeaderAssignedTo() { return $("//bdi[text()='Assign Finding To']/following::span[2]"); }
    private get assetStrategyRCM() { return $("(//div[text()='Asset Strategy']/following::li//div//div)[1]"); }
    private get recommendation() { return $("//div[text()='Recommendations']/following::span[1]"); }
    private get assetStrategyAssessment() { return $("(//div[contains(text(),'Asset Strategy')]/following::span[text()='Assessment']/following::tr//td[@aria-colindex='1']//div//a)[1]"); }
    private get assetStrategyAssessmentDesc() { return $("(//div[contains(text(),'Asset Strategy')]/following::span[text()='Assessment']/following::tr//td[@aria-colindex='1']//div//span)[1]"); }
    private get assetStrategyAssessmentTemplate() { return $("(//div[contains(text(),'Asset Strategy')]/following::span[text()='Assessment Template']/following::tr//td[@aria-colindex='4']//span)[1]"); }
    private get assetStrategyAssessmentTemplateDesc() { return $("(//div[contains(text(),'Asset Strategy')]/following::span[text()='Assessment Template']/following::tr//td[@aria-colindex='4']//span)[2]"); }
    private get assetStrategyStatus() { return $("(//div[contains(text(),'Asset Strategy')]/following::span[text()='Status']/following::tr//td[@aria-colindex='5']//span)[1]"); }
    private get assetStrategyCreatedOn() { return $("(//div[contains(text(),'Asset Strategy')]/following::span[text()='Created On / By']/following::tr//td[@aria-colindex='6']//span)[1]"); }
    private get assetStrategyCreatedBy() { return $("(//div[contains(text(),'Asset Strategy')]/following::span[text()='Created On / By']/following::tr//td[@aria-colindex='6']//span)[2]"); }
    private get ASDIframe() { return $('iframe[data-help-id="application-assetstrategydevelopment-manage"]'); }
    private get ASDHeaderTemplateType() { return $("//section//span[text()='Template Type']/following::span[1]"); }
    private get ASDHeaderFunctionalLocation() { return $("//section//bdi[text()='Functional Location: ']/following::a[1]"); }
    private get ASDHeaderStatus() { return $("//section//span[text()='Status']/following::span[1]"); }
    private get ASDHeaderModifiedOn() { return $("//section//span[text()='Modified On']/following::span[1]"); }

    public inspectionDetails: any = {};
    public inspectionHeaderDetails: any = {};
    public findingsDetails: any = {};
    public findingsHeaderDetails: any = {};
    public assetStrategyDetails: any = {};
    public asdHeaderDetails: any = {};

    public async searchFunctionalLocation(functionalLocation:string){
        console.log("Searching for Functional Location with short description: " + functionalLocation);
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
                    return true; // correct frame
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
        console.log("Visible search box found, searching for deleted Functional Location");
        await browser.execute((el, value) => {
            const input = el as unknown as HTMLInputElement;
            input.value = value as string;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }, searchBox, functionalLocation);
        console.log(`Searched for Functional Location with name: ${functionalLocation}`);
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

        console.log("Clicking Go button to search for Functional Location");
        await goBtn.waitForDisplayed({ timeout: 10000 });
        await goBtn.waitForClickable({ timeout: 10000 });
        await goBtn.click();
        await browser.pause(5000);
        console.log("Search executed for: " + functionalLocation);
    }

    public async navigateToSearchedFunctionalLocation(){
        console.log("Navigating to Detail view page of Functional Location");
        await utils.waitForBusyIndicatorToDisappear();
        const nav = this.funcLocSearched();
        await utils.clickWithWait(nav);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.funLocIframe);
        const el = await this.funLocGeneralInfoTab;
        await el.waitForExist({ timeout: 90000 });
        await browser.execute((element) => {element.scrollIntoView({ block: 'center' });}, el);
        await browser.pause(2000);
        await browser.execute((element) => {element.click();}, el);
        console.log("Navigated to Detail View page successfully");
    }

    public async navigateToAssetIntelligenceTab(){
        console.log("Navigating to Asset Intelligence Tab");
        await utils.clickWithWait(this.funLocAssetIntTab);
        await this.funLocAssetIntTab.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Navigated to Asset Intelligence Tab successfully");
    }

    public async verifyAssetInspectionDetails(){
        console.log("Verifying Asset Inspection details");
        const astInsp = await this.assetInsp.getText();
        const ai1 = await utils.getAssignedValue(astInsp);
        console.log("Assigned asset Inspection : "+ai1);
        if(ai1 === 0)
        {
            throw new Error("Assigned Asset Inspection is 0, expected value should be greater than 0");
        }
        console.log("Fetching Asset Inspection details...");
        await this.saveInspectionDetails();
        console.log(this.inspectionDetails.assessment);
        console.log(this.inspectionDetails.functionalLocation);
        console.log(this.inspectionDetails.assessmentTemplate);
        console.log(this.inspectionDetails.status);
        console.log("Asset Inspection details stroed successfully");
        console.log("Navigating to inspected Assessment details page");
        await this.openInspectedAssessment();
        

    }

    public async saveInspectionDetails(): Promise<void> {

        this.inspectionDetails = {
            assessment: await this.inspectionAssessment.getText(),
            assessmentDesc: await this.inspectionAssessmentDesc.getText(),
            equipment: await this.inspectionEquipment.getText(),
            functionalLocation: await this.inspectionFunctionalLocation.getText(),
            functionalLocationDescription: await this.inspectionFunctionalLocationDesc.getText(),
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
        await browser.switchToWindow(childWindow!);
        await this.inspectionIframe.waitForExist({ timeout: 30000 });
        await utils.switchToIframe(this.inspectionIframe);
        console.log("Switched to Assessment details page successfully");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        await this.saveInspectionHeaderDetails();
        await this.verifyInspectionDetails();
        await browser.closeWindow();
        await browser.switchToWindow(parentWindow);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        console.log("Switched back to parent window successfully");
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
                    if (!txt) txt =  (await el.getAttribute("innerText")) ?? "";
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
            console.log("FuncLoc not visible in this attempt");
        }

        if (!found) return "";
        const spans = await $$(xpath);
        for (let el of spans) {
            let txt = (await el.getText()) ?? "";
                    if (!txt) txt =  (await el.getAttribute("innerText")) ?? "";
            txt = txt?.trim();

            if (txt && (txt.startsWith("Automation") || txt.startsWith(""))) {
                return txt;
            }
        }
        return "";
    }

    public async getDisplayId() {
        try {
            const txt = await browser.execute(() => {
                const el = document.evaluate( 
                    "//span[starts-with(normalize-space(),'INSP') or starts-with(normalize-space(),'PMFI') or starts-with(normalize-space(),'ASDA')]",
                    document,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                ).singleNodeValue;
                return el ? (el.textContent || "") : "";
            });
            return txt ? txt.replace("Display ID:", "").trim() : "";
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
            } 
            else if (i === 1 && await collapseBtn.isDisplayed()) {
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
            functionalLocation: await this.inspectionHeaderFunctionalLocation.getText(),
            functionalLocationDescription: await this.inspectionHeaderFunctionalLocationDesc.getText(),
            status: await this.inspectionHeaderStatus.getText(),
            modifiedOn: (await this.inspectionHeaderModifiedOn.getText()).replace("Modified On", "").trim(),
            assignedTo: (await this.inspectionHeaderAssignedTo.getText()).replace("Assigned To", "").trim()
        };
        console.log(JSON.stringify(this.inspectionHeaderDetails, null, 2));
    }

    public async verifyInspectionDetails(): Promise<void> {

        const failures: string[] = [];

        const compare = (
            field: string,
            expected: string,
            actual: string
        ) => {
            const exp = (expected || "").trim();
            const act = (actual || "").trim();

            if (exp !== act) {
                failures.push(
                    `${field} mismatch | Expected="${exp}" | Actual="${act}"`
                );
            }
        };

        compare(
            "Assessment ID",
            this.inspectionDetails.assessment,
            this.inspectionHeaderDetails.inspectedId
        );

        compare(
            "Assessment Description",
            this.inspectionDetails.assessmentDesc,
            this.inspectionHeaderDetails.inspectedName
        );

        compare(
            "Functional Location",
            this.inspectionDetails.functionalLocation,
            this.inspectionHeaderDetails.functionalLocation
        );

        compare(
            "Functional Location Description",
            this.inspectionDetails.functionalLocationDescription,
            this.inspectionHeaderDetails.functionalLocationDescription
        );

        compare(
            "Status",
            this.inspectionDetails.status,
            this.inspectionHeaderDetails.status
        );

        compare(
            "Created By / Assigned To",
            this.inspectionDetails.createdBy,
            this.inspectionHeaderDetails.assignedTo.replace(/^:\s*/, "")
        );

        compare(
            "Created On / Modified On",
            this.inspectionDetails.createdOn,
            this.inspectionHeaderDetails.modifiedOn.replace(/^:\s*/, "")
        );

        if (failures.length > 0) {
            throw new Error(
                `Inspection Details Verification Failed\n\n${failures.join("\n")}`
            );
        }

        console.log("Inspection Details Verification Passed");
    }

    public async verifyFindingDetails() {
        console.log("Verifying Findings details");  
        await browser.pause(2000);
        await utils.switchToIframe(this.funLocIframe);
        const finding = await this.findings.getText();
        const f = await utils.getAssignedValue(finding);
        console.log("Assigned findings : "+f);
        if(f === 0)
        {
            throw new Error("Assigned Findings is 0, expected value should be greater than 0");
        }
        console.log("Fetching Asset Inspection details...");
        await this.saveFindingsDetails();
        console.log(this.findingsDetails.equipment);
        console.log(this.findingsDetails.functionalLocation);
        console.log(this.findingsDetails.functionalLocationDesc);
        console.log(this.findingsDetails.displayId);
        console.log(this.findingsDetails.displayIdDesc);
        console.log(this.findingsDetails.findingNo);
        console.log(this.findingsDetails.findingType);
        console.log(this.findingsDetails.status);
        console.log(this.findingsDetails.assignedTo);
        console.log("Asset Inspection details stroed successfully");
        console.log("Navigating to inspected Assessment details page");
        await this.openInspectedFindings();
    }

    public async saveFindingsDetails(): Promise<void> {

        this.findingsDetails = {
            equipment: await this.findingsEquipment.getText(),
            functionalLocation: await this.findingsFunctionalLocation.getText(),
            functionalLocationDesc: await this.findingsFunctionalLocationDesc.getText(),
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
        await browser.switchToWindow(childWindow!);
        await this.inspectionIframe.waitForExist({ timeout: 30000 });
        await utils.switchToIframe(this.inspectionIframe);
        console.log("Switched to Assessment details page successfully");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        await this.saveFindingsHeaderDetails();
        await this.verifyFindingsDetails();
        await browser.closeWindow();
        await browser.switchToWindow(parentWindow);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        console.log("Switched back to parent window successfully");
    }

    public async saveFindingsHeaderDetails(): Promise<void> {
        const { inspection, actualId } = await this.getFinalIDs();
        this.findingsHeaderDetails = {
            findingName: inspection,
            inspectedId: actualId,
            functionalLocation: await this.findingsHeaderFunctionalLocation.getText(),
            functionalLocationDescription: await this.findingsHeaderFunctionalLocationDesc.getText(),
            status: await this.findingsHeaderStatus.getText(),
            modifiedOn: (await this.findingsHeaderModifiedOn.getText()).replace("Date Recorded", "").trim(),
            assignedTo: (await this.findingsHeaderAssignedTo.getText()).replace("Assign Finding To", "").trim()
        };
        console.log(JSON.stringify(this.findingsHeaderDetails, null, 2));
    }

    public async verifyFindingsDetails(){
        const failures: string[] = [];

        const compare = (
            field: string,
            expected: string,
            actual: string
        ) => {
            const exp = (expected || "").trim();
            const act = (actual || "").trim();

            if (exp !== act) {
                failures.push(
                    `${field} mismatch | Expected="${exp}" | Actual="${act}"`
                );
            }
        };

        compare(
            "Functional Location",
            this.findingsDetails.functionalLocation,
            this.findingsHeaderDetails.functionalLocation
        );

        compare(
            "Functional Location Description",
            this.findingsDetails.functionalLocationDesc,
            this.findingsHeaderDetails.functionalLocationDescription
        );

        compare(
            "Status",
            this.findingsDetails.status,
            this.findingsHeaderDetails.status
        );

        compare(
            "Created By / Assigned To",
            this.findingsDetails.assignedTo,
            this.findingsHeaderDetails.assignedTo.replace(/^:\s*/, "")
        );

        if (failures.length > 0) {
            throw new Error(
                `Inspection Details Verification Failed\n\n${failures.join("\n")}`
            );
        }

        console.log("Inspection Details Verification Passed");
    }

    public async verifyAssetStrategyDetails(){
        console.log("Verifying Asset Strategy details");
        const assetStraRCM = await this.assetStrategyRCM.getText();
        const as2 = await utils.getAssignedValue(assetStraRCM);
        console.log("Assigned asset strategy RCM: "+as2);
        if(as2 === 0)
        {
            throw new Error("Assigned Asset Strategy RCM is 0, expected value should be greater than 0");
        }
        await this.saveAssetStrategyDetails();
        await this.openAssetStrategyAssessment();
        console.log("Asset Strategy details stored successfully");
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
        await browser.switchToWindow(childWindow!);
        await this.ASDIframe.waitForExist({ timeout: 30000 });
        await utils.switchToIframe(this.ASDIframe);
        console.log("Switched to Assessment details page successfully");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        await this.saveAssetStrategyHeaderDetails();
        await this.verifyASDDetails();
        await browser.closeWindow();
        await browser.switchToWindow(parentWindow);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        console.log("Switched back to parent window successfully");
    }

    public async saveAssetStrategyDetails(): Promise<void> {
        this.assetStrategyDetails = {
            assessment: await this.assetStrategyAssessment.getText(),
            assessmentDesc: await this.assetStrategyAssessmentDesc.getText(),
            assessmentTemplate: await this.assetStrategyAssessmentTemplate.getText(),
            assessmentTemplateDescription: await this.assetStrategyAssessmentTemplateDesc.getText(),
            status: await this.assetStrategyStatus.getText(),
            createdOn: await this.assetStrategyCreatedOn.getText(),
            createdBy: await this.assetStrategyCreatedBy.getText()
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
            functionalLocation: await this.ASDHeaderFunctionalLocation.getText(),
            status: await this.ASDHeaderStatus.getText(),
            modifiedOn: await this.ASDHeaderModifiedOn.getText()
        }
        console.log("ASD Header Details:");
        console.log(JSON.stringify(this.asdHeaderDetails, null, 2));
    }

    public async verifyASDDetails(): Promise<void> {
        const failures: string[] = [];
        const compare = (
            field: string,
            expected: string,
            actual: string
        ) => {
            const exp = (expected || "").trim();
            const act = (actual || "").trim();
            if (exp !== act) {
                failures.push(
                    `${field} mismatch | Expected="${exp}" | Actual="${act}"`
                );
            }
        };

        compare(
            "Assessment ID",
            this.assetStrategyDetails.assessment,
            this.asdHeaderDetails.asdID
        );

        compare(
            "Assessment Description",
            this.assetStrategyDetails.assessmentDesc,
            this.asdHeaderDetails.asdName
        );

        compare(
            "Assessment Template",
            this.assetStrategyDetails.assessmentTemplateDescription,
            this.asdHeaderDetails.templateType
        );

        compare(
            "Functional Location",
            funcLocTestData.searchFunLoc.functionallocation2,
            this.asdHeaderDetails.functionalLocation
        );

        compare(
            "Status",
            this.assetStrategyDetails.status,
            this.asdHeaderDetails.status
        );

        compare(
            "Created On / Modified On",
            this.assetStrategyDetails.createdOn,
            this.asdHeaderDetails.modifiedOn
        );

        if (failures.length > 0) {
            throw new Error(
                `ASD Details Verification Failed\n\n${failures.join("\n")}`
            );
        }

        console.log("ASD Details Verification Passed");
    }

    public async verifyRecommendationDetails(){
        console.log("Verifying Recommendation details");
        await utils.switchToIframe(this.funLocIframe);
        await browser.pause(2000);
        const recommendation = await this.recommendation.getText();
        const recom = await utils.getAssignedValue(recommendation);
        console.log(" Assigned recommendations: "+recom);
        if(recom === 0)
        {
            throw new Error("Assigned Recommendations is 0, expected value should be greater than 0");
        }
    }

}
export default new FunctionalLocationRegressionPage();
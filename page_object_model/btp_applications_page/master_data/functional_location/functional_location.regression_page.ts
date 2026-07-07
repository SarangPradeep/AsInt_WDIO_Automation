import { AssertionError } from 'node:assert';
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
    private get findingsDisplayeIdDesc() { return $("//div[contains(text(),'Findings')]/following::span[text()='Display Id']/following::tr//td[@aria-colindex='3']//a"); }
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
    private rncRoot = "(//span[starts-with(normalize-space(),'Risk and Criticality (')]/ancestor::div[contains(@class,'sapMList')])[1]";
    private get rncPanelTitle() { return $("(//span[starts-with(normalize-space(),'Risk and Criticality (')])[last()]"); }
    private get rncTableRows() { return $$(`${this.rncRoot}//tbody/tr`); }
    private get rncAssessmentDesc() { return $(`(${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='1']//div[contains(@class,'sapMObjectIdentifierTitle')]//span)[1]`); }
    private get rncAssessmentId() { return $(`(${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='1']//div[contains(@class,'sapMObjectIdentifierText')]//span)[1]`); }
    private get rncAssessmentLink() { return $(`(${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='1']//a | ${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='1']//div[contains(@class,'sapMObjectIdentifierText')]//span)[1]`); }
    private get rncAssessmentTemplate() { return $(`(${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='2']//div[contains(@class,'sapMObjectIdentifierTitle')]//span)[1]`); }
    private get rncAssessmentTemplateDesc() { return $(`(${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='2']//div[contains(@class,'sapMObjectIdentifierText')]//span)[1]`); }
    private get rncTechnicalObject() { return $(`(${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='3']//div[contains(@class,'sapMObjectIdentifierTitle')]//span)[1]`); }
    private get rncTechnicalObjectDesc() { return $(`(${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='3']//div[contains(@class,'sapMObjectIdentifierText')]//span)[1]`); }
    private get rncStatus() { return $(`${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='4']`); }
    private get rncRiskScore() { return $(`${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='5']`); }
    private get rncCriticality() { return $(`${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='6']`); }
    private get rncCreatedOn() { return $(`${this.rncRoot}//tbody/tr[1]//td[@aria-colindex='7']`); }
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
    private recRoot = "(//span[starts-with(normalize-space(),'Recommendations (')]/following::table)[1]";
    private get recPanelTitle() { return $("(//span[starts-with(normalize-space(),'Recommendations (')])[last()]"); }
    private get recTableRows() { return $$(`${this.recRoot}//tbody/tr`); }
    private get recFirstRowLink() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='1']//a)[1]`); }
    private get recFirstRowId() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='1']//a)[1]`); }
    private get recFirstRowDesc() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='1']//span[not(@aria-hidden='true') and normalize-space(text())!=''])[1]`); }
    private get recFirstRowComponent() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='2']//span[not(@aria-hidden='true')])[1]`); }
    private get recFirstRowLongDesc() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='3']//span[not(@aria-hidden='true')])[1]`); }
    private get recFirstRowAssessment() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='4']//span[not(@aria-hidden='true')])[1]`); }
    private get recFirstRowTargetDate() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='5']//span[not(@aria-hidden='true')])[1]`); }
    private get recFirstRowMDA() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='6']//span[not(@aria-hidden='true')])[1]`); }
    private get recFirstRowStatus() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='7']//span[not(@aria-hidden='true')])[1]`); }
    private get recFirstRowMaintEvent() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='8']//span[not(@aria-hidden='true')])[1]`); }
    private get recFirstRowLinkedProgram() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='9']//span[not(@aria-hidden='true')])[1]`); }
    private get recFirstRowDiscipline() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='10']//span[not(@aria-hidden='true')])[1]`); }
    private get recFirstRowBudgetCategory() { return $(`(${this.recRoot}//tbody/tr[1]//td[@aria-colindex='11']//span[not(@aria-hidden='true')])[1]`); }
    private get recIframe() { return $('iframe[data-help-id="application-recommendationworkbenchplus-manage"]'); }
    private get recHeaderStatusTag() { return $("(//div[@role='button' and @aria-roledescription='Object Tag']//span[not(@aria-hidden='true')])[1]"); }
    private recDetailValueByLabel(label: string) {
        return $(`//bdi[normalize-space(text())='${label}']/ancestor::*[self::label or self::span][last()]/parent::*[self::div or self::td]/following-sibling::*[self::div or self::td][1]`);
    }

    public inspectionDetails: any = {};
    public inspectionHeaderDetails: any = {};
    public findingsDetails: any = {};
    public findingsHeaderDetails: any = {};
    public assetStrategyDetails: any = {};
    public asdHeaderDetails: any = {};
    public rncDetails: any = {};
    public rncHeaderDetails: any = {};
    public rncCount: number = 0;
    public rcmFleetDetails: any = {};
    public rcmHeaderDetails: any = {};
    public recommendationDetails: any = {};
    public recommendationHeaderDetails: any = {};
    public recommendationCount: number = 0;

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
            throw new AssertionError({ message: "Visible search box not found" });
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
            throw new AssertionError({ message: "Go button not found" });
        }

        console.log("Clicking Go button to search for Functional Location");
        await goBtn.waitForDisplayed({ timeout: 10000 });
        await goBtn.waitForClickable({ timeout: 10000 });
        await goBtn.click();
        await browser.pause(5000);
        console.log("Search executed for: " + functionalLocation);
    }

    /**
     * Searches the Functional Location list by Display Id.
     *  1) Switches into the FL iframe
     *  2) Opens the "Adapt Filters" dialog
     *  3) Ticks the "Display Id" filter checkbox (if not already enabled) and confirms
     *  4) Types `displayId` into the Display Id input and clicks Go
     */
    public async searchFunctionalLocationByDisplayId(displayId: string) {
        console.log(`Searching Functional Location by Display Id: ${displayId}`);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === "complete",
            { timeout: 20000 }
        );

        // Enter the FL list-view iframe (the page hosts several iframes)
        await browser.waitUntil(async () => {
            const frames = await $$("//iframe");
            for (const frame of frames) {
                try {
                    await browser.switchFrame(frame);
                    const adapt = await $("//bdi[contains(text(),'Adapt Filters')]");
                    if (await adapt.isExisting()) {
                        return true;
                    }
                    await browser.switchFrame(null);
                } catch (e) {
                    await browser.switchFrame(null);
                }
            }
            return false;
        }, { timeout: 30000, timeoutMsg: "Adapt Filters button not found in any iframe" });

        const displayIdLabel = "Display Id";
        const filterInputXPath = `//label[.//bdi[text()='${displayIdLabel}']]/following::input[1]`;

        const displayIdInputAlreadyVisible = await $(filterInputXPath).isExisting()
            && await $(filterInputXPath).isDisplayed().catch(() => false);

        if (!displayIdInputAlreadyVisible) {
            console.log("Display Id filter not in filter bar — opening Adapt Filters");
            const adaptBtn = await $("//bdi[contains(text(),'Adapt Filters')]");
            await adaptBtn.waitForClickable({ timeout: 30000 });
            await adaptBtn.click();
            await browser.pause(3000);

            const checkbox = await $(
                `(//div[contains(@class,'sapMDialog') and not(@aria-hidden='true')])[last()]` +
                `//tr[@role='row' and .//bdi[normalize-space(text())='${displayIdLabel}']]//div[@role='checkbox']`
            );
            await checkbox.waitForExist({ timeout: 30000 });
            const checked = await checkbox.getAttribute("aria-checked");
            if (checked !== "true") {
                try {
                    await checkbox.click();
                } catch {
                    await browser.execute((el) => (el as HTMLElement).click(), checkbox);
                }
                await browser.pause(500);
            }

            const okBtn = await $('//button//bdi[text()="OK"]');
            await okBtn.waitForClickable({ timeout: 30000 });
            await okBtn.click();
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(3000);
        }

        const filterInput = await $(filterInputXPath);
        await filterInput.waitForDisplayed({ timeout: 30000 });
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(displayId);
        await browser.pause(500);

        const goBtn = await $('//button[.//bdi[normalize-space()="Go"]]');
        await goBtn.waitForClickable({ timeout: 30000 });
        await goBtn.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        console.log(`Search executed for Display Id: ${displayId}`);
    }

    public async navigateToSearchedFunctionalLocation(){
        console.log("Navigating to Detail view page of Functional Location");
        try {
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
        } catch (e) {
            throw new AssertionError({ message: `Failed to navigate to Functional Location Detail View page | ${(e as Error).message}` });
        }
        console.log("Navigated to Detail View page successfully");
    }

    public async navigateToAssetIntelligenceTab(){
        console.log("Navigating to Asset Intelligence Tab");
        try {
            await this.funLocAssetIntTab.waitForExist({ timeout: 30000 });
            await utils.clickWithWait(this.funLocAssetIntTab);
            await this.funLocAssetIntTab.waitForDisplayed({ timeout: 30000 });
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        } catch (e) {
            throw new AssertionError({ message: `Failed to navigate to Asset Intelligence tab | ${(e as Error).message}` });
        }
        console.log("Navigated to Asset Intelligence Tab successfully");
    }

    public async verifyAssetInspectionDetails(){
        console.log("Verifying Asset Inspection details");
        await utils.switchToIframe(this.funLocIframe);
        await browser.pause(2000);
        const astInsp = await this.assetInsp.getText();
        const ai1 = await utils.getAssignedValue(astInsp);
        console.log("Assigned asset Inspection : "+ai1);
        if(ai1 === 0)
        {
            throw new AssertionError({ message: "Assigned Asset Inspection is 0, expected value should be greater than 0" });
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
            await this.returnToParentWindow(parentWindow, this.funLocIframe);
            console.log("Switched back to parent window successfully");
        }
    }

    private async returnToParentWindow(parentWindow: string, parentIframe?: ReturnType<typeof $>): Promise<void> {
        try {
            const handlesNow = await browser.getWindowHandles();
            if (handlesNow.length > 1) {
                try { await browser.closeWindow(); } catch (e) { /* ignore */ }
            }
        } catch (e) { /* ignore */ }
        try { await browser.switchToWindow(parentWindow); } catch (e) { /* ignore */ }
        try { await utils.waitForBusyIndicatorToDisappear(); } catch (e) { /* ignore */ }
        await browser.pause(5000);
        if (parentIframe) {
            try {
                await utils.switchToIframe(parentIframe);
                await browser.pause(2000);
            } catch (e) { /* ignore */ }
        }
    }

    public async getFinalIDs() {
        const { name, id } = await utils.getEntityNameAndId();
        return { inspection: name, actualId: id };
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

        console.log(
            `Created By / Assigned To | Expected="${(this.inspectionDetails.createdBy || "").trim()}" | Actual="${(this.inspectionHeaderDetails.assignedTo || "").replace(/^:\s*/, "").trim()}"`
        );

        console.log(
            `Created On / Modified On | Expected="${(this.inspectionDetails.createdOn || "").trim()}" | Actual="${(this.inspectionHeaderDetails.modifiedOn || "").replace(/^:\s*/, "").trim()}"`
        );

        if (failures.length > 0) {
            throw new AssertionError({ message: 
                `Inspection Details Verification Failed\n\n${failures.join("\n")}`
             });
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
            throw new AssertionError({ message: "Assigned Findings is 0, expected value should be greater than 0" });
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

    private async safeGetText(el: ChainablePromiseElement): Promise<string> {
        try {
            if (await el.isExisting()) {
                return await el.getText();
            }
        } catch (e) {
            void e;
        }
        return "";
    }

    public async saveFindingsDetails(): Promise<void> {

        this.findingsDetails = {
            equipment: await this.safeGetText(this.findingsEquipment),
            functionalLocation: await this.findingsFunctionalLocation.getText(),
            functionalLocationDesc: await this.findingsFunctionalLocationDesc.getText(),
            displayId: await this.findingsDisplayeId.getText(),
            displayIdDesc: await this.findingsDisplayeIdDesc.getText(),
            findingNo: await this.safeGetText(this.findingsNo),
            findingType: await this.safeGetText(this.findingsType),
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
            console.log("Switched to Assessment details page successfully");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            await this.saveFindingsHeaderDetails();
            await this.verifyFindingsDetails();
        } finally {
            await this.returnToParentWindow(parentWindow, this.funLocIframe);
            console.log("Switched back to parent window successfully");
        }
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

        console.log(
            `Status | Row="${(this.findingsDetails.status || "").trim()}" | Header="${(this.findingsHeaderDetails.status || "").trim()}"`
        );

        compare(
            "Created By / Assigned To",
            this.findingsDetails.assignedTo,
            this.findingsHeaderDetails.assignedTo.replace(/^:\s*/, "")
        );

        if (failures.length > 0) {
            throw new AssertionError({ message: 
                `Inspection Details Verification Failed\n\n${failures.join("\n")}`
             });
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
            throw new AssertionError({ message: "Assigned Asset Strategy RCM is 0, expected value should be greater than 0" });
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
        try {
            await browser.switchToWindow(childWindow!);
            await this.ASDIframe.waitForExist({ timeout: 30000 });
            await utils.switchToIframe(this.ASDIframe);
            console.log("Switched to Assessment details page successfully");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            await this.saveAssetStrategyHeaderDetails();
            await this.verifyASDDetails();
        } finally {
            await this.returnToParentWindow(parentWindow, this.funLocIframe);
            console.log("Switched back to parent window successfully");
        }
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
            throw new AssertionError({ message: 
                `ASD Details Verification Failed\n\n${failures.join("\n")}`
             });
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
            throw new AssertionError({ message: "Assigned Recommendations is 0, expected value should be greater than 0" });
        }

        const title = this.recPanelTitle;
        await title.waitForExist({ timeout: 30000 });
        const titleText = (await title.getText()).trim();
        const match = titleText.match(/\((\d+)\)/);
        this.recommendationCount = match ? parseInt(match[1], 10) : 0;
        console.log(`Recommendations panel title: "${titleText}" | count saved globally = ${this.recommendationCount}`);

        const rows = await this.recTableRows;
        const rowsCount = await rows.length;
        console.log(`Recommendations visible table rows = ${rowsCount}`);
        if (rowsCount !== this.recommendationCount) {
            console.warn(`Title count (${this.recommendationCount}) does not match rendered row count (${rowsCount})`);
        }

        await this.recFirstRowLink.waitForExist({ timeout: 30000 });
        await this.recFirstRowLink.scrollIntoView({ block: 'center' });
        await browser.pause(1000);
        await this.saveRecommendationDetails();
        console.log("Recommendation details stored successfully");
        await this.openRecommendationDetail();
    }

    public async saveRecommendationDetails(): Promise<void> {
        this.recommendationDetails = {
            recommendation: (await this.safeGetText(this.recFirstRowId)).trim(),
            recommendationDesc: (await this.safeGetText(this.recFirstRowDesc)).trim(),
            component: (await this.safeGetText(this.recFirstRowComponent)).trim(),
            longDescription: (await this.safeGetText(this.recFirstRowLongDesc)).trim(),
            assessment: (await this.safeGetText(this.recFirstRowAssessment)).trim(),
            targetDate: (await this.safeGetText(this.recFirstRowTargetDate)).trim(),
            mda: (await this.safeGetText(this.recFirstRowMDA)).trim(),
            status: (await this.safeGetText(this.recFirstRowStatus)).trim(),
            maintenanceEvent: (await this.safeGetText(this.recFirstRowMaintEvent)).trim(),
            linkedProgram: (await this.safeGetText(this.recFirstRowLinkedProgram)).trim(),
            discipline: (await this.safeGetText(this.recFirstRowDiscipline)).trim(),
            budgetCategory: (await this.safeGetText(this.recFirstRowBudgetCategory)).trim()
        };
        console.log("Recommendation Details:");
        console.log(JSON.stringify(this.recommendationDetails, null, 2));
    }

    public async openRecommendationDetail(): Promise<void> {
        const parentWindow = await browser.getWindowHandle();
        try {
            await this.recFirstRowLink.click();
            await browser.waitUntil(
                async () => (await browser.getWindowHandles()).length > 1,
                { timeout: 30000, timeoutMsg: "New tab did not open for Recommendation detail page" }
            );
        } catch (e) {
            throw new AssertionError({ message: `Unable to navigate to Recommendation detail page | ${(e as Error).message}` });
        }
        const allWindows = await browser.getWindowHandles();
        const childWindow = allWindows.find(handle => handle !== parentWindow);
        let primaryError: Error | undefined;
        try {
            await browser.switchToWindow(childWindow!);
            await this.recIframe.waitForExist({ timeout: 30000 });
            await utils.switchToIframe(this.recIframe);
            console.log("Switched to Recommendation detail page successfully");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            await this.saveRecommendationHeaderDetails();
            await this.verifyRecommendationInfo();
        } catch (e) {
            primaryError = e as Error;
        } finally {
            try {
                await this.returnToParentWindow(parentWindow, this.funLocIframe);
                console.log("Switched back to parent window successfully");
            } catch (returnErr) {
                console.warn(`Failed to switch back to parent window: ${(returnErr as Error).message}`);
            }
        }
        if (primaryError) {
            throw primaryError;
        }
    }

    public async saveRecommendationHeaderDetails(): Promise<void> {
        const { inspection, actualId } = await this.getFinalIDs();
        const readByLabel = async (label: string): Promise<string> => {
            try {
                const el = this.recDetailValueByLabel(label);
                await el.waitForExist({ timeout: 10000 });
                const txt = (await el.getText()) ?? "";
                return txt.trim();
            } catch {
                return "";
            }
        };

        this.recommendationHeaderDetails = {
            recommendationName: inspection,
            recommendationId: actualId,
            status: (await this.recHeaderStatusTag.getText()).trim(),
            longDescription: await readByLabel("Long Description"),
            discipline: await readByLabel("Discipline"),
            budgetCategory: await readByLabel("Budget Category"),
            maintenanceEvent: await readByLabel("Maintenance Event"),
            linkedToProgram: await readByLabel("Linked to Program"),
            dueDate: await readByLabel("Due Date"),
            mda: await readByLabel("Recommendation MDA")
        };
        console.log("Recommendation Header Details:");
        console.log(JSON.stringify(this.recommendationHeaderDetails, null, 2));
    }

    public async verifyRecommendationInfo(): Promise<void> {
        const failures: string[] = [];
        const compare = (field: string, expected: string, actual: string) => {
            const exp = (expected || "").trim();
            const act = (actual || "").trim();
            if (exp !== act) {
                failures.push(`${field} mismatch | Expected="${exp}" | Actual="${act}"`);
            }
        };

        compare("Recommendation ID", this.recommendationDetails.recommendation, this.recommendationHeaderDetails.recommendationId);
        compare("Recommendation Description", this.recommendationDetails.recommendationDesc, this.recommendationHeaderDetails.recommendationName);
        compare("Status", this.recommendationDetails.status, this.recommendationHeaderDetails.status);
        compare("Long Description", this.recommendationDetails.longDescription, this.recommendationHeaderDetails.longDescription);
        compare("Discipline", this.recommendationDetails.discipline, this.recommendationHeaderDetails.discipline);
        compare("Budget Category", this.recommendationDetails.budgetCategory, this.recommendationHeaderDetails.budgetCategory);
        compare("Maintenance Event", this.recommendationDetails.maintenanceEvent, this.recommendationHeaderDetails.maintenanceEvent);
        compare("Linked to Program", this.recommendationDetails.linkedProgram, this.recommendationHeaderDetails.linkedToProgram);
        compare("Target Date / Due Date", this.recommendationDetails.targetDate, this.recommendationHeaderDetails.dueDate);
        compare("MDA / Recommendation MDA", this.recommendationDetails.mda, this.recommendationHeaderDetails.mda);

        if (failures.length > 0) {
            throw new AssertionError({ message: `Recommendation Details Verification Failed\n\n${failures.join("\n")}` });
        }

        console.log("Recommendation Details Verification Passed");
    }

    public async verifyRiskAndCriticalityDetails() {
        console.log("Verifying Risk and Criticality details");
        await utils.switchToIframe(this.funLocIframe);
        await browser.pause(2000);

        const title = this.rncPanelTitle;
        await title.waitForExist({ timeout: 30000 });
        const titleText = (await title.getText()).trim();
        const match = titleText.match(/\((\d+)\)/);
        this.rncCount = match ? parseInt(match[1], 10) : 0;
        console.log(`Risk and Criticality panel title: "${titleText}" | count saved globally = ${this.rncCount}`);

        if (this.rncCount === 0) {
            throw new AssertionError({ message: "Risk and Criticality count is 0, expected value should be greater than 0" });
        }

        const rows = await this.rncTableRows;
        const rowsCount = await rows.length;
        console.log(`Risk and Criticality visible table rows = ${rowsCount}`);
        if (rowsCount !== this.rncCount) {
            console.warn(`Title count (${this.rncCount}) does not match rendered row count (${rowsCount})`);
        }

        await this.rncAssessmentLink.waitForExist({ timeout: 30000 });
        await this.rncAssessmentLink.scrollIntoView({ block: 'center' });
        await browser.pause(1000);
        await this.saveRiskAndCriticalityDetails();
        console.log("Risk and Criticality details stored successfully");
        await this.openRiskAndCriticalityAssessment();
    }

    public async saveRiskAndCriticalityDetails(): Promise<void> {
        this.rncDetails = {
            assessment: (await this.rncAssessmentId.getText()).trim(),
            assessmentDesc: (await this.rncAssessmentDesc.getText()).trim(),
            assessmentTemplate: (await this.rncAssessmentTemplate.getText()).trim(),
            assessmentTemplateDesc: (await this.rncAssessmentTemplateDesc.getText()).trim(),
            technicalObject: (await this.rncTechnicalObject.getText()).trim(),
            technicalObjectDesc: (await this.rncTechnicalObjectDesc.getText()).trim(),
            status: (await this.rncStatus.getText()).trim(),
            riskScore: (await this.rncRiskScore.getText()).trim(),
            criticality: (await this.rncCriticality.getText()).trim(),
            createdOn: (await this.rncCreatedOn.getText()).trim()
        };
        console.log("Risk and Criticality Details:");
        console.log(JSON.stringify(this.rncDetails, null, 2));
    }

    public async openRiskAndCriticalityAssessment(): Promise<void> {
        const parentWindow = await browser.getWindowHandle();
        try {
            await this.rncAssessmentLink.click();
            await browser.waitUntil(
                async () => (await browser.getWindowHandles()).length > 1,
                { timeout: 30000, timeoutMsg: "New tab did not open for Risk and Criticality assessment" }
            );
        } catch (e) {
            throw new AssertionError({ message: `Unable to navigate to Risk and Criticality assessment tab | ${(e as Error).message}` });
        }
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
            await this.returnToParentWindow(parentWindow, this.funLocIframe);
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
        try {
            await tab.waitForExist({ timeout: 30000 });
            await tab.scrollIntoView({ block: 'center' });
            await utils.clickWithWait(tab);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        } catch (e) {
            throw new AssertionError({ message: `Unable to navigate to RNC Assignments tab | ${(e as Error).message}` });
        }
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

        compare("Allowed Objects", "Functional Location", this.rncHeaderDetails.allowedObjects);

        if (failures.length > 0) {
            throw new AssertionError({ message: `Risk and Criticality Details Verification Failed\n\n${failures.join("\n")}` });
        }

        console.log("Risk and Criticality Details Verification Passed");
    }

    // ============================================================
    // Asset Strategy - RCM/Fleet
    // ============================================================
    public async verifyAssetStrategyRCMFleetDetails() {
        console.log("Verifying Asset Strategy (RCM/Fleet) details");
        await utils.switchToIframe(this.funLocIframe);
        await browser.pause(2000);

        const tab = this.rcmFleetTab;
        try {
            await tab.waitForExist({ timeout: 30000 });
            await tab.scrollIntoView({ block: 'center' });
            await utils.clickWithWait(tab);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        } catch (e) {
            throw new AssertionError({ message: `Unable to navigate to RCM/Fleet tab | ${(e as Error).message}` });
        }

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
            throw new AssertionError({ message: "RCM/Fleet assessment status was empty" });
        }

        await this.openRCMAssessment();
    }

    public async openRCMAssessment(): Promise<void> {
        const parentWindow = await browser.getWindowHandle();
        try {
            await this.rcmFleetAssessmentLink().click();
            await browser.waitUntil(
                async () => (await browser.getWindowHandles()).length > 1,
                { timeout: 30000, timeoutMsg: "New tab did not open for RCM assessment" }
            );
        } catch (e) {
            throw new AssertionError({ message: `Unable to navigate to RCM assessment tab | ${(e as Error).message}` });
        }
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
            await this.verifyRCMTechnicalObjects();
        } finally {
            await this.returnToParentWindow(parentWindow, this.funLocIframe);
            console.log("Switched back to functional location tab successfully");
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
            throw new AssertionError({ message: `RCM Header Verification Failed\n\n${failures.join("\n")}` });
        }
        console.log("RCM Header Verification Passed");
    }

    private async expandAllNodesInSection(sectionHeading: string): Promise<void> {
        const maxRounds = 10;
        const sectionXPath = `//*[contains(normalize-space(.), ${JSON.stringify(sectionHeading)})]`;
        for (let i = 0; i < maxRounds; i++) {
            const closed = await $$(
                `${sectionXPath}/following::*[@role='button' and @title='Expand/Collapse Node' and @aria-expanded='false']`
            );
            if (!closed.length) return;
            for (const btn of closed) {
                try {
                    await btn.scrollIntoView({ block: 'center' });
                    await utils.clickWithWait(btn);
                    await browser.pause(400);
                } catch (e) { /* ignore */ }
            }
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(800);
        }
    }

    public async verifyRCMTechnicalObjects(): Promise<void> {
        console.log("Verifying RCM Technical Objects");

        try {
            const tab = this.rcmAssessmentTab;
            if (await tab.isExisting() && await tab.isDisplayed()) {
                await utils.clickWithWait(tab);
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(1500);
            }
        } catch (e) { /* ignore */ }

        await this.expandAllNodesInSection("Technical Objects");

        const expectedFL = funcLocTestData.searchFunLoc.functionallocation1;

        const findSpanText = async (value: string): Promise<string> => {
            if (!value) return '';
            const els = await $$(`//span[contains(text(),${JSON.stringify(value)})]`);
            for (const el of els) {
                try {
                    if (await el.isExisting() && await el.isDisplayed()) {
                        const txt = (await el.getText()).trim();
                        if (txt) return txt;
                    }
                } catch (e) { /* ignore */ }
            }
            for (const el of els) {
                try {
                    const txt = (await el.getText()).trim();
                    if (txt) return txt;
                } catch (e) { /* ignore */ }
            }
            return '';
        };

        const functionalLocation = await findSpanText(expectedFL);
        console.log(`RCM Technical Objects -> Functional Location="${functionalLocation}"`);

        this.rcmHeaderDetails.functionalLocation = functionalLocation;

        if (!functionalLocation.includes(expectedFL)) {
            throw new AssertionError({ message: `RCM Technical Objects Verification Failed | Expected Functional Location to contain="${expectedFL}" | Actual="${functionalLocation}"` });
        }
        console.log("RCM Technical Objects Verification Passed");
    }

}
export default new FunctionalLocationRegressionPage();
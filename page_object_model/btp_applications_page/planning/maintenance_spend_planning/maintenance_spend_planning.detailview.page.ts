import { AssertionError } from 'node:assert';

import utils from "utils/utils";
import MSPListView from './maintenance_spend_planning.listview.page';
class maintenance_detail_view{

    private get mspIframe() { return $('iframe[data-help-id="application-msp-manage"]'); }
    private get MSPEditHeader() { return $("//bdi[text()='Edit Header']"); }
    private get editHeaderTitle() { return $("//h1[.//text()='Edit Header Details']"); }
    private get shortDescriptionInput() { return $("//label[.//text()='Short Description']/following::textarea[1]"); }
    private get longDescriptionTextarea() { return $("//label[.//text()='Long Description']/following::textarea[1]"); }
    private get saveHeader() { return $("//footer//button[.//text()='Save']"); }
    private get generalInfoTab() { return $("//bdi[text()='General Information']"); }
    private get assignmentTab() { return $("//bdi[text()='Assignments']"); }
    private get detailTab() { return $("//bdi[text()='Details']"); }
    private get riskDataTab() { return $("//bdi[text()='Risk Data']"); }
    private get summaryTab() { return $("//bdi[text()='Summary']"); }
    private get attachmentsTab() { return $("//bdi[text()='Attachments']"); }
    private get historicDataTab() { return $("//bdi[text()='Historic Data']"); }
    private get changeHistoryTab() { return $("//bdi[text()='Change History']"); } 
    private get editInfo() { return $("//button[.//text()='Edit']"); }
    private get budgetCategoryDropdown(){ return $("//label[.//text()='Budget Category']/following::span[1]"); }
    private get linkedProgramDropdown(){ return $("//label[.//text()='Linked to Program']/following::span[1]"); }
    private get startDateInput(){ return $("//label[.//text()='Start Date']/following::input[1]"); }
    private get dueDateInput(){ return $("//label[.//text()='Due Date']/following::input[1]"); }
    private get priorityInput(){ return $("//label[.//text()='Priority']/following::input[1]"); }
    private get selectPriorityPopup(){ return $("//h1[.//text()='Select Priority']"); }
    private get priorityRow3Checkbox(){ return $("//header[.//text()='Select Priority']/following-sibling::section//tr[@aria-rowindex='3']//td[@aria-colindex='1']"); }
    private get saveBtn(){ return $("//footer//button[.//text()='Save']"); }
    private get deferralFollowupDropdown(){ return $("//label[.//text()='Deferral Follow-up']/following::span[1]"); }
    private get businessImpactDropdown(){ return $("//label[.//text()='Business Impact']/following::span[1]"); }
    private get saveDetailBtn() { return $("//button[.//text()='Save']"); }
    private get okBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }
    private get closeErrBtn() { return $("//footer//button[.//text()='Close']"); }
    private get technicalObjectsCount(){ return $("//div[text()='Technical Objects']/following::span[1]"); }
    private get maintenanceNotificationsCount(){ return $("//div[text()='Maintenance Notifications']/following::span[1]"); }
    private get maintenanceOrdersCount(){ return $("//div[text()='Maintenance Orders']/following::span[1]"); }
    private get taskListsCount(){ return $("//div[text()='Task Lists']/following::span[1]"); }
    private get maintenancePlansCount(){ return $("//div[text()='Maintenance Plans']/following::span[1]"); }
    private get callsCount(){ return $("//div[text()='Calls']/following::span[1]"); }
    private get linkedMSPsCount(){ return $("//div[text()='Linked MSPs']/following::span[1]"); }
    private get localCurrencyDD(){ return $("//label[.//text()='Local Currency']/following::span[1]"); }
    private get selectCurrencyPopup(){ return $("//h1[.//text()='Select Currency']"); }
    private get thirdCurrencyOption(){ return $("//header[.//text()='Select Currency']/following-sibling::section//tr[@aria-rowindex='3']//td[@aria-colindex='1']"); }
    private get localMaintenanceCost(){ return $("//label[.//text()='Local Maintenance Cost']/following::input[1]"); }
    private get localOtherCost(){ return $("//label[.//text()='Local Other Cost']/following::input[1]"); }
    private get localProcessCost(){ return $("//label[.//text()='Local Process Cost']/following::input[1]"); }
    private get localEngineeringCost(){ return $("//label[.//text()='Local Engineering Cost']/following::input[1]"); }
    private get localTotalCost(){ return $("//label[.//text()='Local Total Cost']/following::input[1]"); }
    private get exchangeRateUSD(){ return $("//label[.//text()='Exchange Rate to USD']/following::input[1]"); }
    private get maintenanceCostBasisDD(){ return $("//label[.//text()='Maintenance Cost Estimate Basis']/following::span[1]"); }
    private get finRiskEditBtn(){ return $("//div[text()='FIN Risk']/following::button[.//text()='Edit']"); }
    private get finPofOverrideInput(){ return $("//label[.//text()='FIN POF Override Value']/following::input[1]"); }
    private get finConsOverrideInput(){ return $("//label[.//text()='FIN Consequence Override ($K)']/following::input[1]"); }
    private get mitigatedFinPofInput(){ return $("//label[.//text()='Mitigated FIN POF Override']/following::input[1]"); }
    private get mitigatedFinConsInput(){ return $("//label[.//text()='Mitigated FIN Consequence Override ($K)']/following::input[1]"); }
    private get reoccurringBenefitDD(){ return $("//label[.//text()='Reoccurring Benefit']/following::span[1]"); }
    private get finRiskSaveBtn(){ return $("//div[text()='FIN Risk']/following::button[.//text()='Save']"); }
    private get sheRiskEditBtn(){ return $("//div[text()='SHE Risk']/following::button[.//text()='Edit']"); }
    private get sheRiskDueDateDD(){ return $("//label[.//text()='SHE Risk at Due Date Override']/following::span[1]"); }
    private get sheMrDueDateDD(){ return $("//label[.//text()='SHE MR at Due Date Override']/following::span[1]"); }
    private get sheRiskSaveBtn(){ return $("//div[text()='SHE Risk']/following::button[.//text()='Save']"); }
    private get processStageDD(){ return $("//label[.//text()='Process Stage']/following::span[1]"); }
    private get attachSuccMsg() { return $("//span[text()='Success']"); }
    private get historicDataCount(){ return $("//div[text()='Historic Data']/following::h2//span"); }
    private get maintenancePlanCount(){ return $("//div[text()='Maintenance Plan']/following::span[1]"); }
    private get latestChangeHistoryEntry(){ return $("(//ul/li//div[2]/div/span)[1]"); }
    private get changeStatusBtn() { return $("//button[.//text()='Change Status']"); }
    private get workflowBtn() { return $("//header//button[.//text()='Workflow']"); }
    private get workflowHeader() { return $("//span[contains(text(),'Workflow Inbox')]") };
    private get createWorkflowBtn() { return $("//span[contains(text(),'Workflow Inbox')]/following::button[.//text()='Create']")};
    private get createWorkflowBtn2() { return $("//span[contains(text(),'Create Workflow')]/following::button[.//text()='Create']")};
    private get workflowSuccessMsg() { return $("//span[.//text()='Workflow Created Successfully']"); }

    public async captureMSPId()
    {
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(4000);
        const { name, id } = await utils.getEntityNameAndId();
        MSPListView.MSPShortDesc = name;
        MSPListView.MSPDisplayID = id;
    }

    public async verifyHeader()
    {
        console.log("Verifying header information of MSP");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(4000);
        const { name } = await utils.getEntityNameAndId();
        await expect(name).toEqual(MSPListView.MSPShortDesc);
        console.log("MSP name matches header's name");
    }
    
    public async editHeader()
    {
        console.log("Editing header information of ASD");
        await utils.clickWithWait(this.MSPEditHeader);
        await browser.pause(2000);
        await this.editHeaderTitle.waitForDisplayed();
        const newMSPShortDEsc = `Automation_MSP_${Date.now()}`;
        console.log("Setting new short description: " + newMSPShortDEsc);
        await utils.setValueWithWait(this.shortDescriptionInput, newMSPShortDEsc);
        MSPListView.MSPShortDesc = newMSPShortDEsc;
        await utils.setValueWithWait(this.longDescriptionTextarea, "Automation long description");
        await this.saveHeader.waitForExist({ timeout: 30000 });
        await this.saveHeader.scrollIntoView({ block: 'center' });
        await this.saveHeader.waitForDisplayed({ timeout: 30000 });
        await this.saveHeader.waitForClickable({ timeout: 30000 });
        console.log("Clicking Save");
        await utils.clickWithWait(this.saveHeader);
        await utils.waitForBusyIndicatorToDisappear();
        if (await this.okBtn.isDisplayed().catch(() => false)) {
            console.log("Success popup appeared after save; clicking OK");
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }
        let saved = false;
        try {
            await browser.waitUntil(
                async () => !(await this.editHeaderTitle.isDisplayed().catch(() => false)),
                { timeout: 10000, interval: 500 }
            );
            saved = true;
        } catch (e) { void e; }

        if (!saved) {
            console.log("Save did not close the Edit Header dialog; clicking Close as cleanup");
            const closeButtons = await $$("//header[.//text()='Edit Header Details']/following::button[.//text()='Close']");
            for (const btn of closeButtons) {
                try {
                    if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                        await btn.click();
                        await utils.waitForBusyIndicatorToDisappear();
                        await browser.pause(500);
                        break;
                    }
                } catch (e) { void e; }
            }
            throw new AssertionError({ message: "AssertionError: Edit Header dialog did not close after Save; dialog closed via Close button as cleanup" });
        }
        console.log("Header saved successfully");
    }

    public async editGeneralInfo()
    {
        console.log("Editing general information...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(3000);
        await utils.clickWithWait(this.generalInfoTab);
        await utils.clickWithWait(this.editInfo);
        await utils.clickWithWait(this.budgetCategoryDropdown); await browser.keys(["ArrowDown","Enter"]);
        await utils.clickWithWait(this.linkedProgramDropdown); await browser.keys(["ArrowDown","Enter"]);
        await this.startDateInput.setValue(await utils.formatDate(0));
        await this.dueDateInput.setValue(await utils.formatDatePlus(10));
        await utils.clickWithWait(this.priorityInput);
        await this.selectPriorityPopup.waitForDisplayed();
        await utils.clickWithWait(this.priorityRow3Checkbox);
        await utils.clickWithWait(this.saveBtn);
        await utils.clickWithWait(this.deferralFollowupDropdown); await browser.keys(["ArrowDown","Enter"]);
        await utils.clickWithWait(this.businessImpactDropdown); await browser.keys(["ArrowDown","ArrowDown","Enter"]);
        await utils.clickWithWait(this.saveDetailBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        if (await this.okBtn.isDisplayed().catch(() => false)) {
            await this.okBtn.click();
        }
        if(await this.closeErrBtn.isDisplayed().catch(() => false)) {
            console.log("Can not enter the detail in general information section");
            await this.closeErrBtn.click();
        }
        console.log("General information details entered");
    }

    public async editAssigmentsSection()
    {
        console.log("Editing assignment section...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(3000);
        await utils.clickWithWait(this.assignmentTab);
        const objs: [string, any][] = [
        ["Technical Objects", this.technicalObjectsCount],
        ["Maintenance Notifications", this.maintenanceNotificationsCount],
        ["Maintenance Orders", this.maintenanceOrdersCount],
        ["Task Lists", this.taskListsCount],
        ["Maintenance Plans", this.maintenancePlansCount],
        ["Calls", this.callsCount],
        ["Linked MSPs", this.linkedMSPsCount]
        ];
        for(const [name, el] of objs){
            const txt = await el.getText();
            const val = await utils.getAssignedValue(txt);
            console.log(`${name} present are ${val}`);
        }
        console.log("Assignment section done");
    }

    public async editDetailSection()
    {
        console.log("Editing detail section...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);
        await utils.clickWithWait(this.detailTab);
        await utils.clickWithWait(this.editInfo);
        await utils.clickWithWait(this.localCurrencyDD);
        await this.selectCurrencyPopup.waitForDisplayed();
        await utils.clickWithWait(this.thirdCurrencyOption);
        await utils.clickWithWait(this.saveBtn);
        await this.localMaintenanceCost.setValue(utils.rand(100,9999).toString());
        await this.localOtherCost.setValue(utils.rand(100,9999).toString());
        await this.localProcessCost.setValue(utils.rand(100,9999).toString());
        await this.localEngineeringCost.setValue(utils.rand(100,9999).toString());
        // await this.localTotalCost.setValue(utils.rand(100,9999).toString());
        await this.exchangeRateUSD.setValue(utils.rand(1,99).toString());
        await utils.clickWithWait(this.maintenanceCostBasisDD);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await utils.clickWithWait(this.saveDetailBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.okBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("verification of detail section completed");
    }

    public async editRiskData()
    {
        console.log("Editing risk data...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);
        await utils.clickWithWait(this.riskDataTab);
        await utils.clickWithWait(this.finRiskEditBtn);
        await this.finPofOverrideInput.setValue(utils.rand(1,99).toString());
        await this.finConsOverrideInput.setValue(utils.rand(1,99).toString());
        await this.mitigatedFinPofInput.setValue(utils.rand(1,99).toString());
        await this.mitigatedFinConsInput.setValue(utils.rand(1,99).toString());
        await utils.clickWithWait(this.reoccurringBenefitDD);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await utils.clickWithWait(this.finRiskSaveBtn);
        await utils.clickWithWait(this.okBtn);
        await utils.clickWithWait(this.sheRiskEditBtn);
        await utils.clickWithWait(this.sheRiskDueDateDD);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await utils.clickWithWait(this.sheMrDueDateDD);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await utils.clickWithWait(this.sheRiskSaveBtn);
        await utils.clickWithWait(this.okBtn);
        console.log("Verified risk data");
    }

    public async editSummary()
    {
        console.log("Editing Summary data...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);
        await utils.clickWithWait(this.summaryTab);
        await utils.clickWithWait(this.editInfo);
        await utils.clickWithWait(this.processStageDD);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        const saveSummBtn = await $("//button[.//text()='Save']");
        await utils.clickWithWait(saveSummBtn);
        console.log("Verified summary data");
    }

    public async verifyHistoricData()
    {
        console.log("Historic + Maintenance count start");
        await utils.clickWithWait(this.historicDataTab);
        await browser.pause(2000);
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);
        const historic = await this.historicDataCount.getText();
        const maintenance = await this.maintenancePlanCount.getText();
        console.log("Historic Data present are:", await utils.getAssignedValue(historic));
        console.log("Maintenance Plan present are:", await utils.getAssignedValue(maintenance));
        console.log("Historic + Maintenance count end");
    }

    public async verifyChangeHistory()
    {
        console.log("Verifying change history...");
        console.log("Editing risk data...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);
        await utils.clickWithWait(this.riskDataTab);
        await utils.clickWithWait(this.finRiskEditBtn);
        await this.finPofOverrideInput.setValue(utils.rand(1,999).toString());
        await utils.clickWithWait(this.finRiskSaveBtn);
        await utils.clickWithWait(this.okBtn);
        const finValue=(await this.finPofOverrideInput.getAttribute("value")) ?? "";
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Navigating to change history tab...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);
        await utils.clickWithWait(this.changeHistoryTab);
        await utils.waitForBusyIndicatorToDisappear();
        await this.latestChangeHistoryEntry.waitForDisplayed();
        const text=await this.latestChangeHistoryEntry.getText();
        console.log("Change History Text :",text);
        const lines=text.split('\n').map(l=>l.trim()).filter(l=>l);
        const finLine=lines.find(l=>l.includes(finValue));
        if(!finLine){
            throw new AssertionError({ message: `FIN POF mismatch. Expected: ${finValue}, Found: ${finLine}` });
        }
        console.log("Validating FIN Risk Change History end");
    }

    public async changeStatus()
    {
        console.log("Changing the MSP status...");
        await utils.clickWithWait(this.changeStatusBtn);
        await browser.pause(2000);
        const day = new Date().getDay();
        if(day === 1 || day === 2)
        {
            console.log("Changing status to Ready for funding...");
            await browser.keys("Enter");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(3000);
            const fundingStatusElement=$("//bdi[text()='Funding Status: ']/following::span[2]");
            let fundingStatus="";
            if(
                await fundingStatusElement.isDisplayed().catch(()=>false) &&
                await fundingStatusElement.isClickable().catch(()=>false)
            ){
                fundingStatus=(await fundingStatusElement.getText()).trim();
            }else{
                const expandBtn=await $("(//span[text()='Expand Header']/preceding-sibling::span//span)[2]");
                if(await expandBtn.isDisplayed().catch(()=>false)){
                    await expandBtn.waitForClickable({timeout:10000});
                    await expandBtn.click();
                    await browser.pause(2000);
                }
                fundingStatus=(await fundingStatusElement.getText()).trim();
            }
            console.log("Funding Status :",fundingStatus);
            const normalizedStatus = fundingStatus?.trim().replace(/\s+/g, " ");
            if (normalizedStatus !== "Ready for Funding") {
                throw new AssertionError({ message: `Funding Status validation failed. Found: ${normalizedStatus}` });
            }
            console.log("Funding Status validation passed");
        }
        else if(day === 3 || day === 4)
        {
            console.log("Changing status to Planning...");
            await browser.keys("Arrow Down");
            await browser.keys("Enter");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
            const changeSts = await $("//h1[.//text()='Change Status']");
            await changeSts.waitForDisplayed();
            const textArea = await $("//label[.//text()='Comment']/following::textarea");
            await utils.setValueWithWait(textArea,"Test");
            const saveBtn = await $("//footer//button[.//text()='Save']");
            await utils.clickWithWait(saveBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(3000);
            const fundingStatusElement=$("//bdi[text()='Funding Status: ']/following::span[2]");
            let fundingStatus="";
            if(
                await fundingStatusElement.isDisplayed().catch(()=>false) &&
                await fundingStatusElement.isClickable().catch(()=>false)
            ){
                fundingStatus=(await fundingStatusElement.getText()).trim();
            }else{
                const expandBtn=await $("(//span[text()='Expand Header']/preceding-sibling::span//span)[2]");
                if(await expandBtn.isDisplayed().catch(()=>false)){
                    await expandBtn.waitForClickable({timeout:10000});
                    await expandBtn.click();
                    await browser.pause(2000);
                }
                fundingStatus=(await fundingStatusElement.getText()).trim();
            }
            console.log("Funding Status :",fundingStatus);
            const normalizedStatus = fundingStatus?.trim().replace(/\s+/g, " ");
            if (normalizedStatus !== "Planning") {
                throw new AssertionError({ message: `Funding Status validation failed. Found: ${normalizedStatus}` });
            }
            console.log("Funding Status validation passed");
            console.log("Status changed to Planning");
        }
        else
        {
            console.log("Changing status to Deferred...");
            await browser.keys("Arrow Down");
            await browser.keys("Arrow Down");
            await browser.keys("Enter");
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
            const changeSts = await $("//h1[.//text()='Change Status']");
            await changeSts.waitForDisplayed();
            const textArea = await $("//label[.//text()='Comment']/following::textarea");
            await utils.setValueWithWait(textArea,"Test");
            const saveBtn = await $("//footer//button[.//text()='Save']");
            await utils.clickWithWait(saveBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(3000);
            const fundingStatusElement=$("//bdi[text()='Funding Status: ']/following::span[2]");
            let fundingStatus="";
            if(
                await fundingStatusElement.isDisplayed().catch(()=>false) &&
                await fundingStatusElement.isClickable().catch(()=>false)
            ){
                fundingStatus=(await fundingStatusElement.getText()).trim();
            }else{
                const expandBtn=await $("(//span[text()='Expand Header']/preceding-sibling::span//span)[2]");
                if(await expandBtn.isDisplayed().catch(()=>false)){
                    await expandBtn.waitForClickable({timeout:10000});
                    await expandBtn.click();
                    await browser.pause(2000);
                }
                fundingStatus=(await fundingStatusElement.getText()).trim();
            }
            console.log("Funding Status :",fundingStatus);
            const normalizedStatus = fundingStatus?.trim().replace(/\s+/g, " ");
            if (normalizedStatus !== "Deferred") {
                throw new AssertionError({ message: `Funding Status validation failed. Found: ${normalizedStatus}` });
            }
            console.log("Funding Status validation passed");
            console.log("Status changed to Deferred");
        }

    }

    public async createWorkflow()
    {
        console.log("Creating workflow...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);
        await utils.clickWithWait(this.workflowBtn);
        await browser.pause(3000);
        await this.workflowHeader.waitForDisplayed({ timeout: 10000 });
        const day = new Date().getDay(); 
        const isdays = day >= 1 && day <= 3;
        if (await this.createWorkflowBtn.isDisplayed().catch(() => false)) {
            if (isdays) {
                console.log("Creating Approval Workflow");
                await utils.clickWithWait(this.createWorkflowBtn);
                await browser.keys("ArrowDown");
                await browser.keys("Enter");
                await browser.pause(2000);
                await utils.clickWithWait(this.createWorkflowBtn2);
                await this.workflowSuccessMsg.waitForDisplayed({ timeout: 10000 });
                console.log("Approval Workflow created");
                await utils.clickWithWait(this.okBtn);
                await browser.pause(2000);
                await utils.waitForBusyIndicatorToDisappear();
            }   
            else {
                console.log("Creating Deferral Workflow");
                await utils.clickWithWait(this.createWorkflowBtn);
                await browser.keys("Enter");
                await browser.pause(2000);
                const proposeDate = await $("//label[.//text()='Proposed Due Date']/following::input[1]");
                await proposeDate.waitForDisplayed();
                await utils.setValueWithWait(proposeDate,utils.formatDatePlus(1));
                const deferralFollowUp = await $("(//label[.//text()='Deferral Follow-up']/following::input[1])[1]");
                await utils.clickWithWait(deferralFollowUp);
                await browser.keys("ArrowDown");
                await browser.keys("Enter");
                const comments = await $("//label[.//text()='Comments']/following::textarea[1]");
                await utils.setValueWithWait(comments,"Testing");
                await utils.clickWithWait(this.createWorkflowBtn2);
                await this.workflowSuccessMsg.waitForDisplayed({ timeout: 10000 });
                console.log("Recommendation Workflow created");
                await utils.clickWithWait(this.okBtn);
                await browser.pause(2000);
                await utils.waitForBusyIndicatorToDisappear();
            }
        } else {
            console.log("Create button not present. Hence, workflow cannot be created");
        }
    }

    public async captureMSPEId()
    {
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(4000);
        const { name, id } = await utils.getEntityNameAndId();
        MSPListView.MSPEShortDesc = name;
        MSPListView.MSPEDisplayID = id;
    }

    public async verifyMSPEHeader()
    {
        console.log("Verifying header information of MSP");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(4000);
        const { name } = await utils.getEntityNameAndId();
        await expect(name).toEqual(MSPListView.MSPEShortDesc);
        console.log("MSP Event name matches header's name");
    }

    public static bulkSnapshots: Array<{
        shortDesc: string;
        displayId: string;
        planningYear: string;
        deferralFollowup: string;
        exchangeRateUSD: string;
        processStage: string;
        processSubStage: string;
        regionOnChart: string;
        statusApplied: string;
    }> = [];

    public static bulkUpdateValues: {
        planningYear: string;
        exchangeRateUSD: string;
        regionOnChart: string;
        processStage: string;
        processSubStage: string;
        deferralFollowup: string;
    } | null = null;

    public get bulkSnapshots() {
        return maintenance_detail_view.bulkSnapshots;
    }

    public get bulkUpdateValues(): typeof maintenance_detail_view.bulkUpdateValues {
        return maintenance_detail_view.bulkUpdateValues;
    }
    public set bulkUpdateValues(v: typeof maintenance_detail_view.bulkUpdateValues) {
        maintenance_detail_view.bulkUpdateValues = v;
    }

    private fieldInput(label: string) {
        return $(`(//label[.//text()='${label}']/following::input[1])[1]`);
    }

    private async readFieldValue(label: string): Promise<string> {
        const inputEl = await this.fieldInput(label);
        if (await inputEl.isExisting().catch(() => false)) {
            const v = (await inputEl.getValue().catch(() => "")) ?? "";
            if (v.trim().length > 0) return v.trim();
        }
        const spanEl = await $(`(//label[.//text()='${label}']/following::span[2])[1]`);
        if (await spanEl.isExisting().catch(() => false)) {
            const t = (await spanEl.getText().catch(() => "")) ?? "";
            return t.trim();
        }
        return "";
    }

    private genValueFor(label: string): string {
        switch (label) {
            case "Planning Year": return `${2030 + Math.floor(Math.random() * 50)}`;
            case "Exchange Rate to USD": return `${utils.rand(1, 99)}`;
            case "Region On Chart": return `${utils.rand(1, 9)}`;
            default: return "";
        }
    }

    private async ensureFieldsForSection(
        tab: any,
        textFields: string[],
        dropdownFields: string[]
    ): Promise<void> {
        await utils.clickWithWait(tab);
        await browser.pause(1500);

        const missingText: string[] = [];
        for (const label of textFields) {
            const v = await this.readFieldValue(label);
            if (!v) missingText.push(label);
        }
        const missingDropdowns: string[] = [];
        for (const label of dropdownFields) {
            const v = await this.readFieldValue(label);
            if (!v) missingDropdowns.push(label);
        }

        if (missingText.length === 0 && missingDropdowns.length === 0) {
            console.log("All target fields already populated in this section");
            return;
        }

        console.log(`Filling missing fields: text=[${missingText.join(", ")}] dropdowns=[${missingDropdowns.join(", ")}]`);
        await utils.clickWithWait(this.editInfo,1500);

        for (const label of missingText) {
            const inputEl = await this.fieldInput(label);
            if (await inputEl.isExisting().catch(() => false)) {
                await utils.setValueWithWait(inputEl, this.genValueFor(label));
            }
        }
        for (const label of missingDropdowns) {
            const dd = await $(`(//label[.//text()='${label}']/following::span[1])[1]`);
            if (!(await dd.isExisting().catch(() => false))) {
                console.log(`Dropdown '${label}' not found in DOM — skipping`);
                continue;
            }
            const isDisp = await dd.isDisplayed().catch(() => false);
            const isClickable = await dd.isClickable().catch(() => false);
            if (!isDisp || !isClickable) {
                console.log(`Dropdown '${label}' is not editable (displayed=${isDisp}, clickable=${isClickable}) — skipping (likely derived/disabled)`);
                continue;
            }
            await utils.clickWithWait(dd);
            await browser.keys(["ArrowDown", "Enter"]);
            await browser.pause(500);
        }

        await utils.clickWithWait(this.saveDetailBtn);
        await utils.waitForBusyIndicatorToDisappear();
        if (await this.okBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }
        if (await this.closeErrBtn.isDisplayed().catch(() => false)) {
            console.log(`Section save returned error; closing dialog`);
            await this.closeErrBtn.click();
        }
        await browser.pause(1500);
    }

    public async captureBulkSnapshot(statusApplied: string): Promise<void> {
        console.log(`Capturing bulk snapshot (target status: ${statusApplied})...`);
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(3000);
        const { name, id } = await utils.getEntityNameAndId();

        await this.ensureFieldsForSection(
            this.generalInfoTab,
            ["Planning Year"],
            ["Deferral Follow-up"]
        );
        const planningYear = await this.readFieldValue("Planning Year");
        const deferralFollowup = await this.readFieldValue("Deferral Follow-up");

        await this.ensureFieldsForSection(
            this.detailTab,
            ["Exchange Rate to USD", "Region On Chart"],
            []
        );
        const exchangeRateUSD = await this.readFieldValue("Exchange Rate to USD");
        const regionOnChart = await this.readFieldValue("Region On Chart");

        await this.ensureFieldsForSection(
            this.summaryTab,
            [],
            ["Process Stage"]
        );
        const processStage = await this.readFieldValue("Process Stage");
        const processSubStage = await this.readFieldValue("Process Sub-Stage");

        const snap = {
            shortDesc: name,
            displayId: id,
            planningYear,
            deferralFollowup,
            exchangeRateUSD,
            processStage,
            processSubStage,
            regionOnChart,
            statusApplied
        };
        maintenance_detail_view.bulkSnapshots.push(snap);
        console.log(`Snapshot for ${name} (${id}):`, JSON.stringify(snap));
    }

    private async readFundingStatus(): Promise<string> {
        const fundingStatusElement = await $("//bdi[text()='Funding Status: ']/following::span[2]");
        let fundingStatus = "";
        if (
            await fundingStatusElement.isDisplayed().catch(() => false) &&
            await fundingStatusElement.isClickable().catch(() => false)
        ) {
            fundingStatus = (await fundingStatusElement.getText()).trim();
        } else {
            const expandBtn = await $("(//span[text()='Expand Header']/preceding-sibling::span//span)[2]");
            if (await expandBtn.isDisplayed().catch(() => false)) {
                await expandBtn.waitForClickable({ timeout: 10000 });
                await expandBtn.click();
                await browser.pause(2000);
            }
            fundingStatus = (await fundingStatusElement.getText().catch(() => "")).trim();
        }
        return fundingStatus.replace(/\s+/g, " ");
    }

    private async applyStatusStep(label: string): Promise<void> {
        console.log(`  -> Applying status step '${label}'`);
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(1500);
        await utils.clickWithWait(this.changeStatusBtn);
        await browser.pause(2000);

        await utils.clickPopupMenuItem(label);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2500);

        const normalized = label.trim().toLowerCase();

        if (normalized === "ready for funding") {
            console.log("  'Ready for Funding' step -> no dialog expected, proceeding.");
        } else if (normalized === "planning" || normalized === "deferred") {
            console.log(`  '${label}' step -> Change Status comment dialog expected, filling and saving...`);
            const commentDialog = await $("//h1[.//text()='Change Status']");
            await commentDialog.waitForDisplayed({ timeout: 20000 });

            const textArea = await $("//h1[.//text()='Change Status']/following::label[.//bdi[normalize-space(text())='Comment']]/following::textarea[1]");
            await textArea.waitForDisplayed({ timeout: 15000 });
            await utils.setValueWithWait(textArea, `Automation - ${label}`);
            await browser.pause(500);

            const dialogSaveBtn = await $("//h1[.//text()='Change Status']/following::footer[1]//button[.//bdi[normalize-space(text())='Save']]");
            await browser.waitUntil(async () => {
                const disp = await dialogSaveBtn.isDisplayed().catch(() => false);
                const clk = await dialogSaveBtn.isClickable().catch(() => false);
                return disp && clk;
            }, { timeout: 15000, interval: 500, timeoutMsg: "Save button in Change Status dialog did not become enabled" });
            await utils.clickWithWait(dialogSaveBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(3000);
        } else if (normalized === "funded") {
            console.log("  'Funded' step -> Linked MSP Funding Info dialog expected, clicking OK...");
            const linkedTitle = await $("//h1[.//text()='Linked MSP Funding Info']");
            await linkedTitle.waitForDisplayed({ timeout: 20000 });

            const linkedOk = await $("//h1[.//text()='Linked MSP Funding Info']/following::footer[1]//button[.//bdi[normalize-space(text())='OK']]");
            await linkedOk.waitForClickable({ timeout: 15000 });
            await utils.clickWithWait(linkedOk);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2500);
        } else {
            console.log(`  Unknown step '${label}' -> best-effort dialog handling.`);
            const commentDialog = await $("//h1[.//text()='Change Status']");
            if (await commentDialog.isDisplayed().catch(() => false)) {
                const textArea = await $("//h1[.//text()='Change Status']/following::label[.//bdi[normalize-space(text())='Comment']]/following::textarea[1]");
                await utils.setValueWithWait(textArea, `Automation - ${label}`);
                const dialogSaveBtn = await $("//h1[.//text()='Change Status']/following::footer[1]//button[.//bdi[normalize-space(text())='Save']]");
                await utils.clickWithWait(dialogSaveBtn);
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(2500);
            }
        }

        if (await this.okBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1500);
        }

        const current = await this.readFundingStatus();
        console.log(`  Funding Status after step: '${current}'`);
        if (current.toLowerCase() !== label.toLowerCase()) {
            throw new AssertionError({ message: `Status step failed. Expected: '${label}', Found: '${current}'` });
        }
    }

    public async changeStatusToLabel(target: string): Promise<void> {
        console.log(`Changing MSP status to target '${target}'...`);
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);

        const currentStatus = await this.readFundingStatus();
        console.log(`Initial funding status: '${currentStatus}'`);

        if (currentStatus.toLowerCase() === target.toLowerCase()) {
            console.log(`MSP is already in '${target}' state; nothing to do.`);
            return;
        }

        const steps: string[] = [];
        switch (target) {
            case "Reviewing":
                return;
            case "Ready for Funding":
            case "Planning":
            case "Deferred":
                steps.push(target);
                break;
            case "Funded":
                steps.push("Ready for Funding", "Funded");
                break;
            default:
                throw new AssertionError({ message: `Status transition for '${target}' is not yet defined` });
        }

        for (const step of steps) {
            await this.applyStatusStep(step);
        }

        const final = await this.readFundingStatus();
        if (final.toLowerCase() !== target.toLowerCase()) {
            throw new AssertionError({ message: `Final status mismatch. Expected: '${target}', Found: '${final}'` });
        }
        console.log(`Status successfully changed to '${target}'`);
    }

    public async readBulkUpdatedFields(): Promise<{
        planningYear: string;
        exchangeRateUSD: string;
        regionOnChart: string;
        processStage: string;
        processSubStage: string;
        deferralFollowup: string;
    }> {
        console.log("Reading bulk-updated fields from detail view...");
        await utils.switchToIframe(this.mspIframe);
        await browser.pause(2000);

        await utils.clickWithWait(this.generalInfoTab);
        await browser.pause(1500);
        const planningYear = await this.readFieldValue("Planning Year");
        const deferralFollowup = await this.readFieldValue("Deferral Follow-up");

        await utils.clickWithWait(this.detailTab);
        await browser.pause(1500);
        const exchangeRateUSD = await this.readFieldValue("Exchange Rate to USD");
        const regionOnChart = await this.readFieldValue("Region On Chart");

        await utils.clickWithWait(this.summaryTab);
        await browser.pause(1500);
        const processStage = await this.readFieldValue("Process Stage");
        const processSubStage = await this.readFieldValue("Process Sub-Stage");

        const read = { planningYear, exchangeRateUSD, regionOnChart, processStage, processSubStage, deferralFollowup };
        console.log("Read fields:", JSON.stringify(read));
        return read;
    }
}
export default new maintenance_detail_view();
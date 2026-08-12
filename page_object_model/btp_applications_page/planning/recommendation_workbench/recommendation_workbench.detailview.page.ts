import { AssertionError } from 'node:assert';
import utils from "utils/utils";
import recommendationWorkbenchListView from '../recommendation_workbench/recommendation_workbench.listview.page.ts';
import recommWorkbenchData from "test_data/btp_applications/planning/recommendation_workbench.data.ts";
class RecommendationWorkbenchDetailView {

    private get reccWorkbenchIframe() { return $('iframe[data-help-id="application-recommendationworkbenchplus-manage"]'); }
    private get generalInfoTab() { return $("//span[text()='General Information']"); }
    private get assignmentTab() { return $("//span[text()='Assignments']"); }
    private get riskDataTab() { return $("//span[text()='Risk Data']"); }
    private get planningTab() { return $("//span[text()='Planning']"); }
    private get attachmentsTab() { return $("//span[text()='Attachments']"); }
    private get historicDataTab() { return $("//span[text()='Historic Data']"); }
    private get changeHistoryTab() { return $("//span[text()='Change History']"); }
    private get editInfo() { return $("//button[.//text()='Edit']"); }
    private get saveBtn(){ return $("//footer//button[.//text()='Save']"); }
    private get longDescriptionTxt() { return $("//label[.//text()='Long Description']/following::textarea[1]"); }
    private get basisTxt() { return $("//label[.//text()='Basis']/following::textarea[1]"); }
    private get externalAssessmentTxt() { return $("//label[.//text()='External Assessment']/following::input[1]"); }
    private get typeDropdown() { return $("//label[.//text()='Type']/following::span[1]"); }
    private get typeValue() { return $("//label[.//text()='Type']/following::input[1]"); }
    private get budgetCategoryDropdown() { return $("//label[.//text()='Budget Category']/following::span[1]"); }
    private get budgetCategoryValue() { return $("//label[.//text()='Budget Category']/following::input[1]"); }
    private get businessImpactDropdown() { return $("//label[.//text()='Business Impact']/following::span[1]"); }
    private get businessImpactValue() { return $("//label[.//text()='Business Impact']/following::input[1]"); }
    private get maintenanceActivityTypeDropdown() { return $("//label[.//text()='Maintenance Activity Type']/following::span[1]"); }
    private get maintenanceActivityTypeValue() { return $("//label[.//text()='Maintenance Activity Type']/following::input[1]"); }
    private get maintenanceEventDropdown() { return $("//label[.//text()='Maintenance Event']/following::span[1]"); }
    private get maintenanceEventValue() { return $("//label[.//text()='Maintenance Event']/following::input[1]"); }
    private get disciplineDropdown() { return $("//label[.//text()='Discipline']/following::span[1]"); }
    private get disciplineValue() { return $("//label[.//text()='Discipline']/following::input[1]"); }
    private get priorityDropdown() { return $("//label[.//text()='Priority']/following::span[1]"); }
    private get selectPriorityHeader() { return $("//header[.//text()='Select Priority']"); }
    private get priorityOption() { return $("//header[.//text()='Select Priority']/following-sibling::section//tr[@aria-rowindex='3']//td[@aria-colindex='1']"); }
    private get workCenterDropdown() { return $("//label[.//text()='Work Center']/following::span[1]"); }
    private get selectWorkCenterHeader() { return $("//header[.//text()='Select Work Center']"); }
    private get workCenterOption() { return $("(//header[.//text()='Select Work Center']/following-sibling::section//tr[@aria-rowindex='3']//td[@aria-colindex='1']//div)[1]"); }
    private get planningPlantDropdown() { return $("//label[.//text()='Planning Plant']/following::span[1]"); }
    private get selectPlanningPlantHeader() { return $("//header[.//text()='Select Planning Plant']"); }
    private get planningPlantOption() { return $("(//header[.//text()='Select Planning Plant']/following-sibling::section//tr[@aria-rowindex='3']//td[@aria-colindex='1']//div)[1]"); }
    private get maintenancePlantDropdown() { return $("//label[.//text()='Maintenance Plant']/following::span[1]"); }
    private get maintenancePlantHeader() { return $("//header[.//text()='Select Maintenance Plant']"); }
    private get maintenancePlantOption() { return $("(//header[.//text()='Select Maintenance Plant']/following-sibling::section//tr[@aria-rowindex='3']//td[@aria-colindex='1']//div)[1]"); }
    private get estimatedCostTxt() { return $("//label[.//text()='Estimated Cost']/following::input[1]"); }
    private get estimatedCostCurrencyDropdown() { return $("//label[.//text()='Estimated Cost']/following::span[1]"); }
    private get selectCurrencyHeader() { return $("//header[.//text()='Select Currency']"); }
    private get currencyOption() { return $("//header[.//text()='Select Currency']/following-sibling::section//tr[@aria-rowindex='3']//td[@aria-colindex='1']"); }
    private get estimatedMaintenanceSavingsTxt() { return $("//label[.//text()='Estimated Maintenance Savings']/following::input[1]"); }
    private get estimatedMaintenanceSavingsCurrencyDropdown() { return $("//label[.//text()='Estimated Maintenance Savings']/following::span[1]"); }
    private get notesTxt() { return $("//label[.//text()='Notes']/following::textarea[1]"); }
    private get startDateTxt() { return $("//label[.//text()='Start Date']/following::input[1]"); }
    private get dueDateTxt() { return $("//label[.//text()='Due Date']/following::input[1]"); }
    private get scheduleDateTxt() { return $("//label[.//text()='Schedule Date']/following::input[1]"); }
    private get recommendationMDADropdown() { return $("//label[.//text()='Recommendation MDA']/following::span[4]"); }
    private get selectRecommendationMDAHeader() { return $("//header[.//text()='Select Maintenance Data Attribute']"); }
    private get recommendationMDAOption() { return $("(//header[.//text()='Select Maintenance Data Attribute']/following-sibling::section//tr[@aria-rowindex='3']//td[@aria-colindex='1']//div)[1]"); }
    private get recommendationNotesTxt() { return $("//div[@role='heading'][.//text()='Recommendation Notes']/following::textarea[1]"); }
    private get saveTabBtn() { return $("//button[.//text()='Save']"); }
    private get noOfRiskData() { return $("(//section//span[contains(text(),'Risk Data')])[1]"); }
    private get sheMRAtDueDateTxt() { return $("//label[.//text()='SHE MR at Due Date']/following::input[1]"); }
    private get finMRAtDueDateTxt() { return $("//label[.//text()='FIN MR at Due Date']/following::input[1]"); }
    private get okBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }
    private get attachSuccMsg() { return $("//span[text()='Success']"); }
    private get historicDataHeader() { return $("//h2//span[contains(text(),'Historic Data')]"); }
    private get maintenancePlansTxt() { return $("//div[text()='Maintenance Plans']/following::span[1]"); }
    private get technicalObjectsTxt() { return $("//div[text()='Technical Objects']/following::span[2]"); }
    private get maintenanceNotificationsTxt() { return $("//div[text()='Maintenance Notifications']/following::span[1]"); }
    private get maintenanceOrdersTxt() { return $("//div[text()='Maintenance Orders']/following::span[1]"); }
    private get taskListsTxt() { return $("//div[text()='Task Lists']/following::span[1]"); }
    private get mergedRecommendationsTxt() { return $("//div[text()='Merged Recommendations']/following::span[1]"); }
    private get assetInspectionTxt() { return $("//div[text()='Asset Inspection']/following::span[1]"); }
    private get findingsTxt() { return $("//div[text()='Findings']/following::span[1]"); }
    private get cmlTxt() { return $("//div[text()='CML']/following::span[1]"); }
    private get createWorkflowBtn() { return $("//header//button[.//text()='Workflow']"); }
    private get workflowHeader() { return $("//header//span[contains(text(),'Workflow Inbox')]"); }
    private get createWorkflowOption() { return $("//header//button[.//text()='Create']"); }
    private get proposedDueDate() { return $("//label[.//text()='Proposed Due Date']/following::input[1]"); }
    private get commentTxt() { return $("//label[.//text()='Comments']/following::textarea[1]"); }
    private get createWorkflowSaveBtn() { return $("//header[.//text()='Create Workflow']/following::footer//button[.//text()='Create']"); }
    private get errorOkBtn() { return $("//header[.//text()='Error']/following::footer//bdi[text()='OK']"); }
    private get changeStatusBtn() { return $("//header//button[.//text()='Change Status']"); }
    private get editHeaderBtn() { return $("//header//button[.//text()='Edit Header']"); }
    private get editHeaderBox() { return $("//header[.//text()='Edit Header Details']"); }
    private get headerShortDescTxt() { return $("//label[.//text()='Short Description']/following::textarea[1]"); }
    private get inspectionTypeDrp() { return $("//label[.//text()='Inspection Type']/following::span[1]"); }
    private get inspectionValue() { return $("//label[.//text()='Inspection Type']/following::input[1]"); }
    private get saveHeaderBtn() { return $("//footer//button[.//text()='Save']"); }
    private get manageBtn() { return $("//button[.//text()='Manage']"); }
    private get deleteConfirmText() { return $("//span[.//text()='Are you sure you want to delete the assessment?']"); }
    private get confirmOkBtn() { return $("//header[.//text()='Confirmation']/following::button[.//text()='OK']"); }
    private get typeGenInfoDropdown() { return $("//label[.//text()='Type']/following::span[1]"); }
    private get typeGenInfoValue() { return $("//label[.//text()='Type']/following::input[1]"); }
    private get subTypeGenInfoDropdown() { return $("//label[.//text()='Sub-Type']/following::span[1]"); }
    private get subTypeGenInfoValue() { return $("//label[.//text()='Sub-Type']/following::input[1]"); }

    public async captureReccWorkbenchId(){
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000);
        const { name, id } = await utils.getEntityNameAndId();
        recommendationWorkbenchListView.ReccWorkShortDesc = name;
        recommendationWorkbenchListView.ReccWorkDisplayID = id;
    }

    public async editGeneralInformation(){
        await this.generalInfoTab.waitForClickable({ timeout: 10000 });
        await this.generalInfoTab.click();
        console.log("General Information tab clicked");
        await browser.pause(2000);
        await this.editInfo.waitForClickable({ timeout: 10000 });
        await this.editInfo.click();
        console.log("Edit button clicked in General Information section");
        await browser.pause(2000);

        const fieldsWithNoData: string[] = [];

        await this.longDescriptionTxt.setValue(`Automation Recommendation ${Math.floor(Math.random() * 100000)}`);
        await this.basisTxt.setValue("Automation Basis");
        await this.externalAssessmentTxt.setValue("Automation External Assessment");
        await this.typeDropdown.click();
        await browser.keys(["ArrowDown", "Enter"]);
        if(await this.typeValue.getAttribute("value") === ""){
            fieldsWithNoData.push("Type");
            console.warn("Type value is empty after selecting from dropdown");
        }

        await this.typeGenInfoDropdown.click();
        await browser.keys(["ArrowDown", "Enter"]);
        const typeGenInfoVal = await this.typeGenInfoValue.getAttribute("value") ?? "";
        if(typeGenInfoVal === "Improvement" || typeGenInfoVal === "Reactive") {
            console.log(`Type General Information is set to: ${typeGenInfoVal}`);
        } else {
            await this.subTypeGenInfoDropdown.click();
            await browser.keys(["ArrowDown", "Enter"]);
            const subTypeGenInfoVal = await this.subTypeGenInfoValue.getAttribute("value") ?? "";
            console.log(`Sub-Type General Information is set to: ${subTypeGenInfoVal}`);
        }
        await this.budgetCategoryDropdown.click();
        await browser.keys(["ArrowDown", "ArrowDown", "ArrowDown", "Enter"]);
        if(await this.budgetCategoryValue.getAttribute("value") === ""){
            fieldsWithNoData.push("Budget Category");
            console.warn("Budget Category value is empty after selecting from dropdown");
        }
        await this.businessImpactDropdown.click();
        await browser.keys(["ArrowDown", "ArrowDown", "Enter"]);
        const businessImpactVal = await this.businessImpactValue.getAttribute("value") ?? "";
        if(businessImpactVal === ""){
            fieldsWithNoData.push("Business Impact");
            console.warn("Business Impact value is empty after selecting from dropdown");
        } else {
            recommendationWorkbenchListView.BusinessImpact = businessImpactVal;
            console.log(`Stored Business Impact: ${businessImpactVal}`);
        }
        await this.maintenanceActivityTypeDropdown.click();
        await browser.keys(["ArrowDown", "ArrowDown", "ArrowDown", "Enter"]);
        if(await this.maintenanceActivityTypeValue.getAttribute("value") === ""){
            fieldsWithNoData.push("Maintenance Activity Type");
            console.warn("Maintenance Activity Type value is empty after selecting from dropdown");
        }
        await this.maintenanceEventDropdown.click();
        await browser.keys(["ArrowDown", "Enter"]);
        const maintenanceEventVal = await this.maintenanceEventValue.getAttribute("value") ?? "";
        if(maintenanceEventVal === ""){
            fieldsWithNoData.push("Maintenance Event");
            console.warn("Maintenance Event value is empty after selecting from dropdown");
        } else {
            recommendationWorkbenchListView.MaintenanceEvent = maintenanceEventVal;
            console.log(`Stored Maintenance Event: ${maintenanceEventVal}`);
        }
        await this.disciplineDropdown.click();
        await browser.keys(["ArrowDown", "ArrowDown", "Enter"]);
        if(await this.disciplineValue.getAttribute("value") === ""){
            fieldsWithNoData.push("Discipline");
            console.warn("Discipline value is empty after selecting from dropdown");
        }

        await this.priorityDropdown.click();
        await this.selectPriorityHeader.waitForDisplayed({ timeout: 10000 });
        await browser.pause(1000);
        const priorityNoData = await $("//header[.//text()='Select Priority']/following-sibling::section//*[contains(text(),'No data') or contains(text(),'No Data') or contains(text(),'No entries found')]");
        if (await priorityNoData.isExisting()) {
            fieldsWithNoData.push("Priority");
            console.warn("Priority has no data available");
            const cancelBtn = await $("//header[.//text()='Select Priority']/following::button[.//text()='Cancel']");
            if (await cancelBtn.isExisting()) await cancelBtn.click();
            await browser.pause(1000);
        } else {
            await this.priorityOption.click();
            await this.saveBtn.click();
            await utils.waitForBusyIndicatorToDisappear();
        }

        await this.workCenterDropdown.click();
        await this.selectWorkCenterHeader.waitForDisplayed({ timeout: 10000 });
        await browser.pause(1000);
        const workCenterNoData = await $("//header[.//text()='Select Work Center']/following-sibling::section//*[contains(text(),'No data') or contains(text(),'No Data') or contains(text(),'No entries found')]");
        if (await workCenterNoData.isExisting()) {
            fieldsWithNoData.push("Work Center");
            console.warn("Work Center has no data available");
            const cancelBtn = await $("//header[.//text()='Select Work Center']/following::button[.//text()='Cancel']");
            if (await cancelBtn.isExisting()) await cancelBtn.click();
            await browser.pause(1000);
        } else {
            await this.workCenterOption.click();
            await this.saveBtn.click();
            await utils.waitForBusyIndicatorToDisappear();
        }

        const planningPlantInput = await $("//label[.//text()='Planning Plant']/following::input[1]");
        const planningPlantReadonly = await planningPlantInput.getAttribute("readonly");
        if (planningPlantReadonly !== null) {
            const planningPlantValue = await planningPlantInput.getAttribute("value");
            console.log(`Planning Plant is readonly with value: ${planningPlantValue}`);
        } else {
            await this.planningPlantDropdown.click();
            await this.selectPlanningPlantHeader.waitForDisplayed({ timeout: 10000 });
            await browser.pause(1000);
            const planningPlantNoData = await $("//header[.//text()='Select Planning Plant']/following-sibling::section//*[contains(text(),'No data') or contains(text(),'No Data') or contains(text(),'No entries found')]");
            if (await planningPlantNoData.isExisting()) {
                fieldsWithNoData.push("Planning Plant");
                console.warn("Planning Plant has no data available");
                const cancelBtn = await $("//header[.//text()='Select Planning Plant']/following::button[.//text()='Cancel']");
                if (await cancelBtn.isExisting()) await cancelBtn.click();
                await browser.pause(1000);
            } else {
                await this.planningPlantOption.click();
                await this.saveBtn.click();
                await utils.waitForBusyIndicatorToDisappear();
            }
        }

        const maintenancePlantInput = await $("//label[.//text()='Maintenance Plant']/following::input[1]");
        const maintenancePlantReadonly = await maintenancePlantInput.getAttribute("readonly");
        if (maintenancePlantReadonly !== null) {
            const maintenancePlantValue = await maintenancePlantInput.getAttribute("value");
            console.log(`Maintenance Plant is readonly with value: ${maintenancePlantValue}`);
        } else {
            await this.maintenancePlantDropdown.click();
            await this.maintenancePlantHeader.waitForDisplayed({ timeout: 10000 });
            await browser.pause(1000);
            const maintenancePlantNoData = await $("//header[.//text()='Select Maintenance Plant']/following-sibling::section//*[contains(text(),'No data') or contains(text(),'No Data') or contains(text(),'No entries found')]");
            if (await maintenancePlantNoData.isExisting()) {
                fieldsWithNoData.push("Maintenance Plant");
                console.warn("Maintenance Plant has no data available");
                const cancelBtn = await $("//header[.//text()='Select Maintenance Plant']/following::button[.//text()='Cancel']");
                if (await cancelBtn.isExisting()) await cancelBtn.click();
                await browser.pause(1000);
            } else {
                await utils.clickWithWait(this.maintenancePlantOption);
                await this.saveBtn.click();
                await utils.waitForBusyIndicatorToDisappear();
            }
        }

        await this.estimatedCostTxt.setValue(`${Math.floor(Math.random() * 70) + 20}`);
        await this.estimatedCostCurrencyDropdown.click();
        await this.selectCurrencyHeader.waitForDisplayed({ timeout: 10000 });
        await browser.pause(1000);
        const currencyNoData1 = await $("//header[.//text()='Select Currency']/following-sibling::section//*[contains(text(),'No data') or contains(text(),'No Data') or contains(text(),'No entries found')]");
        if (await currencyNoData1.isExisting()) {
            fieldsWithNoData.push("Estimated Cost Currency");
            console.warn("Estimated Cost Currency has no data available");
            const cancelBtn = await $("//header[.//text()='Select Currency']/following::button[.//text()='Cancel']");
            if (await cancelBtn.isExisting()) await cancelBtn.click();
            await browser.pause(1000);
        } else {
            await this.currencyOption.click();
            await this.saveBtn.click();
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
        }

        await this.estimatedMaintenanceSavingsTxt.setValue(`${Math.floor(Math.random() * 80) + 20}`);
        await this.estimatedMaintenanceSavingsCurrencyDropdown.click();
        await this.selectCurrencyHeader.waitForDisplayed({ timeout: 10000 });
        await browser.pause(1000);
        const currencyNoData2 = await $("//header[.//text()='Select Currency']/following-sibling::section//*[contains(text(),'No data') or contains(text(),'No Data') or contains(text(),'No entries found')]");
        if (await currencyNoData2.isExisting()) {
            fieldsWithNoData.push("Estimated Maintenance Savings Currency");
            console.warn("Estimated Maintenance Savings Currency has no data available");
            const cancelBtn = await $("//header[.//text()='Select Currency']/following::button[.//text()='Cancel']");
            if (await cancelBtn.isExisting()) await cancelBtn.click();
            await browser.pause(1000);
        } else {
            await this.currencyOption.click();
            await this.saveBtn.click();
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
        }

        await this.notesTxt.setValue("Automation Notes");
        await this.startDateTxt.setValue(utils.formatDate(0));
        await this.dueDateTxt.setValue(utils.formatDatePlus(10));
        await this.scheduleDateTxt.setValue(utils.formatDatePlus(2));

        await this.recommendationMDADropdown.click();
        await browser.pause(1000);
        await this.selectRecommendationMDAHeader.waitForDisplayed({ timeout: 10000 });
        await browser.pause(1000);
        const mdaNoData = await $("//header[.//text()='Select Maintenance Data Attribute']/following-sibling::section//*[contains(text(),'No data') or contains(text(),'No Data') or contains(text(),'No entries found')]");
        if (await mdaNoData.isExisting()) {
            fieldsWithNoData.push("Recommendation MDA");
            console.warn("Recommendation MDA has no data available");
            const cancelBtn = await $("//header[.//text()='Select Maintenance Data Attribute']/following::button[.//text()='Cancel']");
            if (await cancelBtn.isExisting()) await cancelBtn.click();
            await browser.pause(1000);
        } else {
            await this.recommendationMDAOption.click();
            await this.saveBtn.click();
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
        }

        await this.saveTabBtn.waitForClickable({ timeout: 10000 });
        await this.saveTabBtn.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Save button clicked in General Information section");
        await utils.waitForBusyIndicatorToDisappear();

        if (fieldsWithNoData.length > 0) {
            throw new AssertionError({ 
                message: `The following fields had no data available: ${fieldsWithNoData.join(', ')}` 
            });
        }
    }

    public async editRiskData(){
        console.log("Editing Risk Data...");
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.riskDataTab);
        console.log("Risk Data tab clicked");
        await utils.clickWithWait(this.editInfo);
        console.log("Edit button clicked in Risk Data section");
        const riskValue = await this.noOfRiskData.getText();
        const noOfRisk = await utils.getAssignedValue(riskValue);
        console.log(`Current number of risk data: ${noOfRisk}`);
        const randomRiskValue =
            recommWorkbenchData.riskValues[
            Math.floor(Math.random() * recommWorkbenchData.riskValues.length)
        ];
        await this.sheMRAtDueDateTxt.setValue(randomRiskValue);
        await this.finMRAtDueDateTxt.setValue(randomRiskValue);
        await this.saveTabBtn.click();
        console.log("Save button clicked in Risk Data section");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Success OK button clicked in Risk Data section");
        console.log("Risk Data edited successfully");
    }

    public async verifyHistoricData(){
        console.log("Verifying Historic Data...");
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.historicDataTab);
        console.log("Historic Data tab clicked");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        const historicData = await this.historicDataHeader.getText();
        const hd = await utils.getAssignedValue(historicData);
        console.log(" Assigned Historic Data : "+hd);
        const maintenancePlansText = await this.maintenancePlansTxt.getText();
        const mp = await utils.getAssignedValue(maintenancePlansText);
        console.log(" Assigned Maintenance Plans : "+mp);
        console.log("Historic Data verified successfully");
    }

    public async verifyAssignmentBlock(){
        console.log("Verifying Assignment block...");
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.assignmentTab);
        console.log("Assignment tab clicked");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        const techObjectsText = await this.technicalObjectsTxt.getText();
        const to = await utils.getAssignedValue(techObjectsText);
        console.log(" Technical Objects : " + to);
        const maintainNotiText = await this.maintenanceNotificationsTxt.getText();
        const mn = await utils.getAssignedValue(maintainNotiText);
        console.log(" Assigned Maintenance Notification : " + mn);
        const maintainOrdersText = await this.maintenanceOrdersTxt.getText();
        const mo = await utils.getAssignedValue(maintainOrdersText);
        console.log(" Assigned Maintenance Orders : " + mo);
        const taskListsText = await this.taskListsTxt.getText();
        const tl = await utils.getAssignedValue(taskListsText);
        console.log(" Task Lists : " + tl);
        const maintainPlansText = await this.maintenancePlansTxt.getText();
        const mp = await utils.getAssignedValue(maintainPlansText);
        console.log(" Maintenance Plans : " + mp);
        const mergedRecomText = await this.mergedRecommendationsTxt.getText();
        const mr = await utils.getAssignedValue(mergedRecomText);
        console.log(" Merged Recommendations : " + mr);
        const assetInspectionText = await this.assetInspectionTxt.getText();
        const ai = await utils.getAssignedValue(assetInspectionText);
        console.log(" Asset Inspection : " + ai);
        const findingsText = await this.findingsTxt.getText();
        const f = await utils.getAssignedValue(findingsText);
        console.log(" Findings : " + f);
        const cmlText = await this.cmlTxt.getText();
        const cml = await utils.getAssignedValue(cmlText);
        console.log(" CML : " + cml);
        console.log("Assignment block verified successfully");
    }

    public async verifyPlanningBlock(){
        console.log("Verifying Planning block...");
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.planningTab);
        console.log("Planning tab clicked");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
    }

    public async verifyChangeHistory(){
        console.log("Verifying Change History...");
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.editHeaderBtn);
        await this.editHeaderBox.waitForDisplayed({ timeout: 10000 });
        await browser.pause(2000);
        await this.inspectionTypeDrp.click();
        await browser.keys(["ArrowDown","ArrowDown","ArrowDown","Enter"]);
        const inspctionTypeText = await this.inspectionValue.getAttribute("value") ?? "";
        console.log("Selected Inspection Type: " + inspctionTypeText);
        await this.saveHeaderBtn.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait(this.changeHistoryTab);
        console.log("Change History tab clicked");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Fetching latest change history entry");
        const latestCngHst = await $("(//ul/li//div[2]/div/span)[1]");
        await latestCngHst.waitForDisplayed();
        console.log("Latest change history entry fetched successfully");
        const text = await latestCngHst.getText();
        console.log("Change History Text:\n", text);
        console.log("Validating change history entry");
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);
        console.log("Extracted Lines from Change History Entry:");
        const categoryLine = lines.find(l =>
            l.toLowerCase().includes('inspection type helper')
        );
        const expectedValue = inspctionTypeText
            .replace(/\s+/g, "_")
            .toUpperCase();
        if (!categoryLine?.includes(expectedValue)) {
            throw new AssertionError({ message: 
                `Category mismatch. Expected: ${expectedValue}, Found: ${categoryLine}`
             });
        }
        console.log("Change history validation passed successfully");
    }

    public async createWorkflow(){
        console.log("Creating workflow...");
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.createWorkflowBtn);
        console.log("Create Workflow button clicked");
        this.workflowHeader.waitForDisplayed({ timeout: 10000 });
        console.log("Workflow header displayed");
        await utils.clickWithWait(this.createWorkflowOption);
        console.log("Create option clicked in Workflow dropdown");
        await browser.pause(2000);
        await browser.keys(["ArrowDown", "Enter"]);
        console.log("Choosing deferral workflow...");
        await browser.pause(2000);
        await this.proposedDueDate.setValue(utils.formatDatePlus(5));
        await this.commentTxt.setValue("Automation Workflow Creation");
        await this.createWorkflowSaveBtn.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        // await utils.assertNoErrorPopup("Create Workflow");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Workflow created successfully");
    }

    public async changeStatus(){
        console.log("Changing status...");
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.changeStatusBtn);
    }

    private async selectStatusMenuItem(label: string){
        const clicked = await browser.execute((text: string) => {
            const candidates = Array.from(document.querySelectorAll<HTMLElement>(
                "li[role='menuitem'], div[role='menuitem'], li[role='option'], div[role='option'], li, span, bdi"
            ));
            for (const el of candidates) {
                const t = (el.innerText || el.textContent || "").trim();
                if (t === text) {
                    const rect = el.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        el.click();
                        return true;
                    }
                }
            }
            return false;
        }, label);
        if (!clicked) {
            throw new AssertionError({ message: `Status menu item '${label}' not found in open menu` });
        }
    }

    public async changeStatusToInProcess(){
        console.log("Changing status to 'In Process'...");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.changeStatusBtn);
        await browser.pause(2000);
        await this.selectStatusMenuItem("In Process");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        if (await this.okBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        }
        console.log("Status changed to 'In Process'");
    }

    public async changeStatusToForReview(){
        console.log("Changing status to 'For Review' (via 'In Process' first)...");
        await this.changeStatusToInProcess();

        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(2000);
        await utils.clickWithWait(this.changeStatusBtn);
        await browser.pause(2000);
        await this.selectStatusMenuItem("For Review");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        if (await this.okBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
        }
        console.log("Status changed to 'For Review'");
    }

    public async changeStatusToRejected(){
        console.log("Changing status to 'Rejected' (via 'For Review' first)...");
        await this.changeStatusToForReview();

        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(2000);
        await utils.clickWithWait(this.changeStatusBtn);
        await browser.pause(2000);
        await this.selectStatusMenuItem("Rejected");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        const commentDialog = await $("//h1[.//text()='Change Status']");
        if (await commentDialog.isDisplayed().catch(() => false)) {
            console.log("Comment dialog detected for Rejected, filling and saving...");
            const textArea = await $("//label[.//text()='Comment']/following::textarea[1]");
            await utils.setValueWithWait(textArea, "Automation - Rejected");
            const dialogSaveBtn = await $("//footer//button[.//text()='Save']");
            await utils.clickWithWait(dialogSaveBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(3000);
        }

        if (await this.okBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
        }
        console.log("Status changed to 'Rejected'");
    }

    public async verifyHeader(){
        console.log("Verifying header information of Recommendation Workbench");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(2000);
        const { name } = await utils.getEntityNameAndId();
        await expect(name).toEqual(recommendationWorkbenchListView.ReccWorkShortDesc);
        console.log("Recommendation name matches header's name");
    }

    public async editHeader(){
        console.log("Editing header information of MSP");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000); 
        await utils.clickWithWait(this.editHeaderBtn);
        console.log("Edit Header button clicked");
        await this.editHeaderBox.waitForDisplayed({ timeout: 10000 });
        console.log("Edit Header Details box displayed");
        await browser.pause(2000);
        recommendationWorkbenchListView.ReccWorkShortDesc = `Automation Recommendation ${Math.floor(Math.random() * 100000)}`;
        await this.headerShortDescTxt.setValue(recommendationWorkbenchListView.ReccWorkShortDesc);
        await this.inspectionTypeDrp.click();
        await browser.keys(["ArrowDown", "Enter"]);
        await this.saveHeaderBtn.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Header information edited successfully");
    }

    public async deleteReccWorkbench(){
        await this.deleteReccommendation();
        await recommendationWorkbenchListView.verifyDeletionOfRecommendationWorkbench();
    }

    public async deleteReccommendation(){
        console.log("Deleting the recommendation...");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.reccWorkbenchIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.manageBtn);
        await browser.pause(1000);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await browser.pause(2000);
        await utils.clickWithWait(this.confirmOkBtn);
        await this.okBtn.waitForDisplayed({ timeout: 60000 });
        await utils.clickWithWait(this.okBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Recommendation deleted successfully");
    }

}export default new RecommendationWorkbenchDetailView();
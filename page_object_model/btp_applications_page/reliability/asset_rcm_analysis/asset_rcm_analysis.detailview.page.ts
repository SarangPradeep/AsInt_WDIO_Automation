import utils from '../../../../utils/utils';
import assetRCMListView from "./asset_rcm_analysis.listview.page";

class assetRCMDetailView {

    private get infoTab() { return $("//bdi[text()='Information']"); }
    private get rcmIframe() { return $('iframe[data-help-id="application-rcm-manage"]'); }
    private get assessmentTab() { return $("//bdi[text()='Assessment']"); }
    private get attachmentTab() { return $("//bdi[text()='Attachment']"); }
    private get editGenInfo() { return $("//div[text()='General Information']/ancestor::div[1]/following-sibling::div//button[.//text()='Edit']"); }
    private get descTextArea() { return $("//bdi[.='Description']/ancestor::div[1]/following::textarea[1]"); }
    private get longDescTextArea() { return $("//bdi[.='Long Description']/ancestor::div[1]/following::textarea[1]"); }
    private get systemBoundaryDescTextArea() { return $("//bdi[.='System Boundary Description']/ancestor::div[1]/following::textarea[1]"); }
    private get operatingContextTextArea() { return $("//bdi[.='Operating Context']/ancestor::div[1]/following::textarea[1]"); }
    private get saveGeneralInfoBtn() { return $("//div[.='General Information']/ancestor::div[1]/following-sibling::div//button[.//text()='Save']"); }
    private get okBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }
    private get editPlanData() { return $("//div[text()='Planning Data']/ancestor::div[1]/following-sibling::div//button[.//text()='Edit']"); }
    private get nextReviewDateInput() { return $("//bdi[.='Next Review Date']/ancestor::div[2]/following::input[1]"); }
    private get lastReviewDateInput() { return $("//bdi[.='Last Review Date']/ancestor::div[2]/following::input[1]"); }
    private get plannedReviewDateInput() { return $("//bdi[.='Planned Review Date (Next Refresh)']/ancestor::div[2]/following::input[1]"); }
    private get nextTADateInput() { return $("//bdi[.='Next TA Date (Unit Level)']/ancestor::div[2]/following::input[1]"); }
    private get secondTADateInput() { return $("//bdi[.='2nd TA Date (Unit Level)']/ancestor::div[2]/following::input[1]"); }
    private get savePlanDataBtn() { return $("//div[.='Planning Data']/ancestor::div[1]/following-sibling::div//button[.//text()='Save']"); }
    private get addRoleBtn() { return $("//button[.//text()='Add Role']"); }
    private get addRoleDialog() { return $("//header[.//text()='Add Role']/following-sibling::section"); }
    private get secondRoleCheckbox() { return $("//ul[@role='list']//li[@aria-posinset='2']//div[@role='checkbox']"); }
    private get addRoleOkBtn() { return $("//header[.//text()='Add Role']/following::button[.//text()='Ok']"); }
    private get maintenanceTechnicianRoleBtn() { return $("//bdi[.='Maintenance Technician']/ancestor::div[2]/following-sibling::div//span[@role='button']"); }
    private get selectUsersSearchInput() { return $("//header[.='Select Users']/following-sibling::section//input[@type='search']"); }
    private get qaAutomationUserCheckbox() { return $("//tr[.//span[.='qa automation']]//div[@role='checkbox']"); }
    private get selectUsersOkBtn() { return $("//header[.='Select Users']/following::button[.//text()='Ok']"); }
    private get saveBtnFooter() { return $("//bdi[text()='Save']"); }
    private get startAssessmentBtn() { return $("//button[.='Start Assessment']"); }
    private get technicalObjectsHeader() { return $("//h3[.//text()[contains(.,'Technical Objects')]]"); }
    private get equipmentValueBtn() { return $("//bdi[.='Equipment']/ancestor::div[2]/following::span[@role='button'][1]"); }
    private get confirmBtn() { return $("//button[.='Confirm']"); }
    private get nextBtn() { return $("//button[.='Next']"); }
    private get createBtnFooter() { return $("//footer//button[.//bdi[.='Create']]"); }
    private get warningMsg() { return $("//span[text()='All of the selected Technical Objects are already assigned to other ongoing assessments. Please select different Technical Objects.']"); }
    private get warningOkBtn() { return $("//button[.='OK']"); }
    private get previousBtn() { return $("//button[.='Previous']"); }
    private get removeSelectedToken() { return $("(//div[@role='listbox']//span[@aria-label='Remove'])[1]"); }
    private getRowByIndex(i:number){ return $(`(//tr[@role='row' and .//div[@role='checkbox']])[${i}]`); }
    private technicalObjectRowTxt = (techObj: string) => $(`//span[@dir='auto'][contains(text(),"${techObj}")]`);
    private technicalObjectRowClick = (techObj: string) => $(`//span[@dir='auto'][contains(text(),'${techObj}')]/ancestor::div[4]`);
    private get riskInformationSection() { return $("//bdi[normalize-space()='Risk Information']"); }
    private headerTechnicalObjectId = (id: string) => $(`(//header[@role='banner']//div[@role='heading']//span[@dir='auto'])[last()][normalize-space()='${id}']`);
    private headerTechnicalObjectName = (name: string) => $(`//header[@role='banner']//span[@dir='auto'][normalize-space()='${name}']`);
    private get criticalityLabel() { return $("//bdi[normalize-space()='Criticality:']"); }
    private criticalityValue = (crit: string) => $(`//bdi[normalize-space()='Criticality:']/ancestor::div[1]/following::span[1][normalize-space()='${crit}']`);
    private get riskInformationHeader() { return $("//div[@role='heading']//span[contains(text(),'Risk Information')]"); }
    private get riskInformationExpandBtn() { return $("//span[contains(text(),'Risk Information')]/preceding::button[1]"); }
    private riskRowValue = (i:number) => $(`//td[@aria-colindex='1']//bdi/following::tbody//tr[@aria-rowindex='${i}']//td[@aria-colindex='1']//bdi`);
    private get strategiesHeader() { return $("//div[@role='heading']//span[contains(text(),'Strategies')]"); }
    private get strategiesExpandBtn() { return $("//span[contains(text(),'Strategies')]/preceding::button[1]"); }
    private get strategiesRows() { return $$("//tr[@role='row']//div[@role='heading']//span"); }
    private get recommendationHeader() { return $("//div[@role='heading']//span[contains(text(),'Recommendation')]"); }
    private get recommendationExpandBtn() { return $("//span[contains(text(),'Recommendation')]/preceding::button[1][@aria-label]"); }
    private get recommendationRCMValues() { return $$("//tbody//tr[@role='row']//td[.//span[contains(text(),'RCM')]]//span[contains(text(),'RCM')]"); }
    private get assessmentDetailCloseBtn() { return $("//header[@role='banner']//button[@aria-label='Decline']"); }
    private addMaintainableBtn = (techObj: string) => $(`//span[@dir='auto'][contains(text(),"${techObj}")]/ancestor::div[3]/following-sibling::div//button[@title='Add']`);
    private get assignMaintainableItemsBtns() { return $$("//button[@title='Assign Maintainable Items']"); }
    private get assignMaintainableItemsHeader() { return $("//h1[normalize-space()='Assign Maintainable Items']"); }
    private get maintainableItemsText() {return $("//header[.//text()='Assign Maintainable Items']/following-sibling::section//span[contains(text(),'Maintainable Items')]"); }
    private get maintainableItemValue() {return $("//header[.//text()='Assign Maintainable Items']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[@aria-colindex='2']//span"); }
    private get maintainableItemRow() {return $("//header[.//text()='Assign Maintainable Items']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[2]"); }
    private get assignBtn() { return $("//button[.//text()='Assign']"); }
    private get cancelBtn() { return $("//button[.//text()='Cancel']"); }
    private expandBtn = (techObj: string) =>$$(`//span[@dir='auto'][contains(text(),"${techObj}")]/ancestor::div[5]//span[@role='button']`);
    private assignedItem = (value: string) =>$$(`//span[@dir='auto'][contains(text(),"${value}")]`);
    private maintainableItemHeader = (name: string) =>$(`(//header[@role='banner']//div[@role='heading']//span[@dir='auto'])[last()][normalize-space()='${name}']`);
    private maintainableItemIdValue = (id: string) =>$(`//section[@role='region']//span[text()='Code ID ']/following-sibling::span[normalize-space()='${id}']`);
    private get riskInfoText(){return $("//div[@role='heading']//div[contains(text(),'Risk Information')]//following::h2//span"); }
    private get strategyInfoText(){return $("//div[@role='heading']//div[contains(text(),'Risk Information')]//following::span[contains(text(),'Strategies')]");}
    private get closeMaintainableItemBtn() {return $$("//header[@role='banner']//button[@aria-label='Decline']"); }
    private failureModeAddBtn = (val: string) => $(`//span[@dir='auto'][contains(text(),"${val}")]/ancestor::div[3]/following-sibling::div//button[@title='Add']`);
    private get assignFailureModeBtn() { return $("//button[@title='Assign Failure Modes']"); }
    private get assignFailureModeHeader() { return $("//h1[normalize-space()='Assign Failure Modes']"); }
    private get failureModeCountText() { return $("//header[.//text()='Assign Failure Modes']/following-sibling::section//span[contains(text(),'Failure Modes')]"); }
    private get failureModeValue() { return $("//header[.//text()='Assign Failure Modes']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[@aria-colindex='2']//span"); }
    private get failureModeCheckbox() { return $("//header[.//text()='Assign Failure Modes']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[2]"); }
    private failureModeExpandBtn = (val: string) => $(`//span[@dir='auto'][contains(text(),"${val}")]/ancestor::div[5]//span[@role='button']`);
    private failureModeAssigned = (val: string) => $(`//span[@dir='auto'][contains(text(),"${val}")]`);
    // ===== Failure Mode Detail =====
    private failureModeRow = (val: string) => $(`//span[@dir='auto'][contains(text(),"${val}")]/ancestor::div[4]`);
    private failureModeHeader = (name: string) => $(`(//header[@role='banner']//div[@role='heading']//span[@dir='auto'])[last()][normalize-space()='${name}']`);
    private failureModeId = (id: string) => $(`//section[@role='region']//span[text()='Code ID ']/following-sibling::span[normalize-space()='${id}']`);


    // ===== Analysis Section =====
    private get analysisDetailsSection() { return $("//bdi[normalize-space()='Analysis Details']"); }


    // ===== Failure Effects =====
    private get failureEffectsText() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Effects')]"); }
    private get failureEffectsAssignBtn() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Effects')]/following::button[1]"); }
    private get assignFailureEffectsHeader() { return $("//h1[normalize-space()='Assign Failure Effects']"); }
    private get failureEffectsCountText() { return $("//header[.//text()='Assign Failure Effects']/following-sibling::section//span[contains(text(),'Failure Effects')]"); }
    private get failureEffectsValue() { return $("//header[.//text()='Assign Failure Effects']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[@aria-colindex='2']//span"); }
    private get failureEffectsCheckbox() { return $("//header[.//text()='Assign Failure Effects']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[2]"); }


    // ===== Failure Scenario =====
    private get failureScenarioEditBtn() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Scenario')]/following::bdi[text()='Edit'][1]"); }
    private get failureScenarioTextarea() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Scenario')]/following::textarea"); }
    private get failureScenarioSaveBtn() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Scenario')]/following::bdi[text()='Save']"); }


    // ===== Failure Mechanisms =====
    private get failureMechanismText() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Mechanisms')]"); }
    private get failureMechanismAssignBtn() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Mechanisms')]/following::button[1]"); }
    private get assignFailureMechanismHeader() { return $("//h1[normalize-space()='Assign Failure Mechanisms']"); }
    private get failureMechanismCountText() { return $("//header[.//text()='Assign Failure Mechanisms']/following-sibling::section//span[contains(text(),'Failure Mechanisms')]"); }
    private get failureMechanismValue() { return $("//header[.//text()='Assign Failure Mechanisms']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[@aria-colindex='2']//span"); }
    private get failureMechanismCheckbox() { return $("//header[.//text()='Assign Failure Mechanisms']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[2]"); }


    // ===== Consequence Evaluation =====
    private get consequenceEditBtn() { return $("//div[@role='heading']//following::span[contains(text(),'Consequence Evaluation')]/following::bdi[text()='Edit'][1]"); }
    private get consequenceHeader() { return $("//h1[normalize-space()='Consequence Evaluation']"); }
    private get hiddenFailureDropdown() { return $("//bdi[contains(text(),'Hidden Failure')]/ancestor::div[2]/following::span[4]"); }
    private get failurePatternDropdown() { return $("(//bdi[contains(text(),'Failure Pattern')]/ancestor::div[2]/following::span[4])[1]"); }
    private get safeLifePopupBtn() { return $("//bdi[contains(text(),'Safe Life')]/ancestor::div[2]/following::span[@role='button'][1]"); }
    private get pfIntervalPopupBtn() { return $("//bdi[contains(text(),'P-F Interval')]/ancestor::div[2]/following::span[@role='button'][1]"); }
    private get unitPopupHeader() { return $("//h1[normalize-space()='Select unit of measurement']"); }
    private get unitOption() { return $("//h1[normalize-space()='Select unit of measurement']/following::tr[3]"); }
    private get safeLifeInput() { return $("//bdi[contains(text(),'Safe Life')]/ancestor::div[2]/following::input[@type='text'][1]"); }
    private get pfIntervalInput() { return $("//bdi[contains(text(),'P-F Interval')]/ancestor::div[2]/following::input[@type='text'][1]"); }
    private get consequenceSaveBtn() { return $("//bdi[contains(text(),'Safe Life')]/following::button[.//text()='Save']"); }


    // ===== Causes =====
    private get causesText() { return $("(//div[@role='heading']//following::span[contains(text(),'Causes')])[1]"); }
    private get causesAssignBtn() { return $("(//div[@role='heading']//following::span[contains(text(),'Causes')])[1]/following::button[1]"); }
    private get assignCausesHeader() { return $("//h1[normalize-space()='Assign Failure Effects']"); }
    private get causesCountText() { return $("//header[.//text()='Assign Causes']/following-sibling::section//span[contains(text(),'Failure Effects')]"); }
    private get causesValue() { return $("//header[.//text()='Assign Causes']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[@aria-colindex='2']//span"); }
    private get causesCheckbox() { return $("//header[.//text()='Assign Causes']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[2]"); }


    // ===== Strategies =====
    private get strategiesTexts() { return $$("//div[@role='heading']//following::span[contains(text(),'Strategies')]"); }
    private get strategiesCreateBtns() { return $$("//span[contains(text(),'Strategies')]/following::button[.//text()='Create']"); }
    private get createStrategyHeader() { return $("//h1[normalize-space()='Create Strategy']"); }
    private get strategyDescInput() { return $("//bdi[text()='Description']/following::input[1]"); }
    private get strategyLongDesc() { return $("//bdi[text()='Long Description']/following::textarea"); }
    private get strategyTypeDropdown() { return $("//bdi[text()='Type']/following::span[@role='button'][1]"); }
    private get strategyStartDate() { return $("//bdi[text()='Start Date']/following::input[1]"); }
    private get strategyDueDate() { return $("//bdi[text()='Due Date']/following::input[1]"); }
    private get strategyCreateBtn() { return $("//footer//button[.//bdi[.='Create']]"); }

    public selectedEquipmentData:any = {};
    private techObj!: string;
    private maintanableItems!: string;
    private failureMode!: string;

    public async verifyAndEditGenInfo(){
        console.log("Navigating to Information Tab");
        utils.switchToIframe(this.rcmIframe);
        await utils.clickWithWait(this.infoTab);
        console.log("Navigated to information tab");
        const infoDesc = await $("//bdi[.='Description']/ancestor::div[1]/following::div[.//span][1]//span");
        const infoDescText = (await infoDesc.getText()).trim();
        console.log("Comparing Header vs Information tab Description");
        await expect(infoDescText).toEqual(assetRCMListView.assetRCMDesc);
        console.log("Description matched successfully");
        console.log("Editing infomation...");
        await utils.clickWithWait(this.editGenInfo);
        await utils.waitForBusyIndicatorToDisappear();
        assetRCMListView.assetRCMDesc = `Automation_RCM_${Date.now()}`;
        console.log(`Generated RCM Description for infomration verification: ${assetRCMListView.assetRCMDesc}`);
        await utils.setValueWithWait(this.descTextArea,assetRCMListView.assetRCMDesc);
        console.log("New description value is "+assetRCMListView.assetRCMDesc);
        await utils.setValueWithWait(this.longDescTextArea,"Automation Long Desc Test");
        await utils.setValueWithWait(this.systemBoundaryDescTextArea,"System Bounday Description");
        await utils.setValueWithWait(this.operatingContextTextArea,"Operating context");
        await utils.clickWithWait(this.saveGeneralInfoBtn);
        await utils.clickWithWait(this.okBtn);
        await browser.pause(5000);
        await assetRCMListView.verifyHeader();
        console.log("Verification and editing of Information tab done");
        console.log("Verifying if header value changed or not, after changing the description");
    }

    public async verifyAndEditPlanningData()
    {
        console.log("Editing planning section...");
        await utils.clickWithWait(this.editPlanData);
        const getFutureDate = (days:number)=> new Date(Date.now()+days*86400000)
        .toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"});
        await utils.setValueWithWait(this.lastReviewDateInput, getFutureDate(1));
        await utils.setValueWithWait(this.nextReviewDateInput, getFutureDate(5));
        await utils.setValueWithWait(this.plannedReviewDateInput, getFutureDate(6));
        await utils.setValueWithWait(this.secondTADateInput, getFutureDate(8));
        await utils.setValueWithWait(this.nextTADateInput, getFutureDate(10));
        await utils.clickWithWait(this.savePlanDataBtn);
        await utils.clickWithWait(this.okBtn);
        console.log("Verification of planning section is done");
    }

    public async addRoles()
    {
        console.log("Adding roles...");
        await utils.clickWithWait(this.addRoleBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await this.addRoleDialog.waitForDisplayed();
        await utils.clickWithWait(this.secondRoleCheckbox);
        await utils.clickWithWait(this.addRoleOkBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.maintenanceTechnicianRoleBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await this.selectUsersSearchInput.setValue("qa automation");
        await browser.pause(2000);
        await utils.clickWithWait(this.qaAutomationUserCheckbox);
        await utils.clickWithWait(this.selectUsersOkBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.saveBtnFooter);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.okBtn);
        console.log("Roles added");
    }

    public async createAssessmentFlow(){
        console.log("Navigating to Assessment Tab");
        utils.switchToIframe(this.rcmIframe);
        await utils.clickWithWait(this.assessmentTab);
        console.log("Navigated to Assessment tab");
        console.log("Assessment flow start");
        await utils.switchToIframe(this.rcmIframe);
        await utils.clickWithWait(this.startAssessmentBtn);
        await utils.switchToIframe(this.rcmIframe);
        await this.technicalObjectsHeader.waitForDisplayed();
        // for(let i=2;i<=41;i++){
        //     console.log(`Trying checkbox index: ${i}`);
        //     await utils.clickWithWait(this.equipmentValueBtn);
        //     await utils.waitForBusyIndicatorToDisappear();
        //     await browser.pause(5000);
        //     const checkBox = $(`(//tr[@role='row']//div[@role='checkbox'])[${i}]`);
        //     await checkBox.waitForClickable({timeout : 50000});
        //     await utils.clickWithWait(checkBox);
        //     await this.selectEquipmentAndStore(i);
        //     await utils.clickWithWait(this.confirmBtn);
        //     await utils.clickWithWait(this.nextBtn);
        //     await utils.clickWithWait(this.createBtnFooter);
        //     await utils.waitForBusyIndicatorToDisappear();
        //     await browser.pause(5000);
        //     await browser.waitUntil(async () => (await this.okBtn.isDisplayed()) || (await this.warningMsg.isDisplayed()), { timeout: 60000 });
        //     if (await this.okBtn.isDisplayed()) {
        //         console.log("Assessment created successfully");
        //         await utils.clickWithWait(this.okBtn);
        //         break;
        //     } else if (await this.warningMsg.isDisplayed()) {
        //         console.log("Warning displayed, retrying with next checkbox");
        //         await utils.clickWithWait(this.warningOkBtn);
        //         await utils.clickWithWait(this.previousBtn);
        //         await utils.clickWithWait(this.removeSelectedToken);
        //     }
        // }


        await browser.pause(5000);
        await utils.clickWithWait(this.equipmentValueBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        const search = await $('(//input[@aria-label="Search"])[1]');
        await search.click();
        await search.setValue('10000128');
        await browser.keys('Enter');
        await browser.pause(5000);
        const checkBox = $(`(//tr[@role='row']//div[@role='checkbox'])[2]`);
        await checkBox.waitForClickable({timeout : 50000});
        await utils.clickWithWait(checkBox);
        await this.selectEquipmentAndStore(2);
        await utils.clickWithWait(this.confirmBtn);
        await utils.clickWithWait(this.nextBtn);
        await utils.clickWithWait(this.createBtnFooter);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        await browser.waitUntil(async () => (await this.okBtn.isDisplayed()) || (await this.warningMsg.isDisplayed()), { timeout: 60000 });
        await this.okBtn.isDisplayed()
        console.log("Assessment created successfully");
        await utils.clickWithWait(this.okBtn);



        console.log("Assessment details :", this.selectedEquipmentData);
        console.log("Assessment flow end");
    }

    public async selectEquipmentAndStore(i:number){
        console.log("Store equipment data start");
        const row = await this.getRowByIndex(i);
        const equipmentId = await row.$(".//td[@aria-colindex='2']//span[contains(@id,'txt')]").getText();
        const equipmentName = await row.$(".//td[@aria-colindex='2']//div[contains(@class,'Text')]/span[last()]").getText();
        const category = await row.$(".//td[@aria-colindex='3']//span").getText();
        const objectType = await row.$(".//td[@aria-colindex='4']//span").getText();
        const catalogProfile = await row.$(".//td[@aria-colindex='8']//span").getText();
        const criticality = await row.nextElement().$(".//span[text()='Criticality']/ancestor::div[1]/following::span[1]").getText();
        this.selectedEquipmentData = {equipmentId,equipmentName,category,objectType,catalogProfile,criticality};
        console.log("Store equipment data end");
    }
    
    public async verifyAssessment(){
        console.log("Open technical object and verify start...");
        const data = this.selectedEquipmentData;
        await utils.waitForBusyIndicatorToDisappear();
        const cleanName = data.equipmentName.replace(/\\+/g, '\\');
        this.techObj = `${cleanName} (${data.equipmentId})`;
        console.log("Technical object selected : "+this.techObj);
        await expect(this.technicalObjectRowTxt(this.techObj)).toBeDisplayed();
        await utils.clickWithWait(this.technicalObjectRowClick(this.techObj));
        await utils.waitForBusyIndicatorToDisappear();
        await this.verifyAssessmentDetails();
        console.log("Technical object and verification ends");
    }

    public async verifyAssessmentDetails()
    {
        console.log("Verification of technical object details starts...");
        const data = this.selectedEquipmentData;
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(10000);
        const elements = [
        this.riskInformationSection,
        this.headerTechnicalObjectId(data.equipmentId),
        this.headerTechnicalObjectName(data.equipmentName),
        this.criticalityLabel,
        this.criticalityValue(data.criticality)
        ];

        for (const el of elements) {
            const elems = await $$(await el.selector);
            let isVisible = false;

            for (const e of elems) {
                if (await e.isDisplayed()) {
                    isVisible = true;
                    break;
                }
            }

            await expect(isVisible).toBe(true);
        }
        console.log("Verify technical object details end");
        console.log("Verifying deatil page of techinical object");
        console.log("Clicking risk information tab...");
        await utils.clickWithWait(this.riskInformationSection);
    }

    public async captureRiskStrategyRecommendation(){
        console.log("Capture Risk/Strategy/Recommendation start");

        // ---------- RISK ----------
        const riskHeaderTxt = await this.riskInformationHeader.getText();
        const riskCount = await utils.getAssignedValue(riskHeaderTxt);
        if(riskCount > 0){
            if((await this.riskInformationExpandBtn.getAttribute("aria-expanded")) === "false"){
                await utils.clickWithWait(this.riskInformationExpandBtn);
            }
            // for(let i=2;i<riskCount+2;i++){
            //     const val = await this.riskRowValue(i).getText();
            //     console.log("Risk Row:", val);
            // }
        }

        // ---------- STRATEGIES ----------
        const stratHeaderTxt = await this.strategiesHeader.getText();
        const stratCount = await utils.getAssignedValue(stratHeaderTxt);
        if(stratCount > 0){
            if((await this.strategiesExpandBtn.getAttribute("aria-expanded")) === "false"){
                await utils.clickWithWait(this.strategiesExpandBtn);
            }
            const rows = await this.strategiesRows;
            for(const row of rows){
                if(await row.isDisplayed()){
                    console.log("Strategy:", await row.getText());
                }
            }
        }

        // ---------- RECOMMENDATION ----------
        const recHeaderTxt = await this.recommendationHeader.getText();
        const recCount = await utils.getAssignedValue(recHeaderTxt);
        if(recCount > 0){
            if((await this.recommendationExpandBtn.getAttribute("aria-expanded")) === "false"){
                await utils.clickWithWait(this.recommendationExpandBtn);
            }
            const recs = await this.recommendationRCMValues;
            for(const rec of recs){
                if(await rec.isDisplayed()){
                    console.log("Recommendation:", await rec.getText());
                }
            }
        }

        console.log("Capture Risk/Strategy/Recommendation end");
        console.log("Closing Assessment detail page...")
        
        const tryClose = async (): Promise<boolean> => {
        const isDisplayed = await this.riskInformationHeader.isDisplayed().catch(() => false);

        if (!isDisplayed) {
            console.log("Assessment detail already closed");
            return true;
        }

        await this.assessmentDetailCloseBtn.click().catch(() => {});
        await browser.pause(1000);

        return !(await this.riskInformationHeader.isDisplayed().catch(() => false));
        };

        let closed = await tryClose();

        if (!closed) {
            console.log("Retry closing assessment detail");
            closed = await tryClose();
        }

        if (!closed) {
            throw new Error("Assessment detail NOT closed after 2 attempts");
        }
    }

    public async addMaintanableItems()
    {
        console.log("Adding maintanable items...");
        await utils.clickWithWait(this.addMaintainableBtn(this.techObj));
        await browser.pause(3000);
        for (const btn of await this.assignMaintainableItemsBtns) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                break;
            }
        }
        await expect(this.assignMaintainableItemsHeader).toBeDisplayed();
        const miText = await this.maintainableItemsText.getText();
        const assignedMaintainable = await utils.getAssignedValue(miText);
        console.log("Total assigned maintainable are :"+assignedMaintainable);
        if(assignedMaintainable === 0)
        {
            console.log("No maintainable values are present");
            await utils.clickWithWait(this.cancelBtn);
            return;
        }
        else
        {
            const miValue = await this.maintainableItemValue.getText();
            this.maintanableItems = miValue;
            console.log("Maintainable item is/are : "+miValue);
            await utils.clickWithWait(this.maintainableItemRow);
            await utils.clickWithWait(this.assignBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
        }
        console.log("Expanding the tenchinal object for maintainable items...");
        await browser.waitUntil(async () => {
            const btns = await this.expandBtn(this.techObj);
            if (await btns.length === 0) return false;

            for (const btn of btns) {
                if (await btn.isDisplayed()) return true;
            }
            return false;
        }, { timeout: 60000, interval: 1000 });
        const expandBtns = await this.expandBtn(this.techObj);
        for (const btn of expandBtns) {
            if (await btn.isDisplayed()) {
                if ((await btn.getAttribute("aria-expanded")) === "false") {
                    await utils.clickWithWait(btn);
                }
                break;
            }
        }
        console.log("Expanded the tenchinal object for maintainable items");
        let found = false;
        for (const item of await this.assignedItem(this.maintanableItems)) {
            if (await item.isDisplayed()) {
                found = true;
                await utils.clickWithWait(await item.$("./ancestor::div[4]"));
                break;
            }
        }
        await expect(found).toBe(true);

        console.log("MaintanableItems Added successfully");
    }

    public async verifyMaintainableDetails()
    {
        console.log("Verifying Maintainable Item Details...");
        const nameOnly = this.maintanableItems.split(' (')[0];
        await expect(this.maintainableItemHeader(nameOnly)).toBeDisplayed();
        const idMatch = this.maintanableItems?.match(/\((.*?)\)/);
        const idOnly = idMatch ? idMatch[1] : '';
        await expect(this.maintainableItemIdValue(idOnly)).toBeDisplayed();
        const riskText = await this.riskInfoText.getText();
        const riskValue = await utils.getAssignedValue(riskText);
        console.log("Risk Information value: " + riskValue);
        const strategyText = await this.strategyInfoText.getText();
        const strategyValue = await utils.getAssignedValue(strategyText);
        console.log("Strategy value: " + strategyValue);
        for (const btn of await this.closeMaintainableItemBtn) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                break;
            }
        }
        console.log("Verified Maintainable Item Details");
    }

    public async addFailureModes()
    {
        console.log("Adding Failure Modes...");
        await utils.clickWithWait(this.failureModeAddBtn(this.maintanableItems));
        await utils.clickWithWait(this.assignFailureModeBtn);
        await expect(this.assignFailureModeHeader).toBeDisplayed();
        const fmText = await this.failureModeCountText.getText();
        const count = await utils.getAssignedValue(fmText);
        console.log("Failure Modes count: " + count);
        if (count === 0) {
            await utils.clickWithWait(this.cancelBtn);
            console.log("addFailureModes end");
            return;
        }
        this.failureMode = await this.failureModeValue.getText();
        console.log("Failure mode selected :"+this.failureMode);
        await utils.clickWithWait(this.failureModeCheckbox);
        await utils.clickWithWait(this.assignBtn);
        await utils.clickWithWait(this.okBtn);
        await browser.pause(5000);
        const expandBtn = this.failureModeExpandBtn(this.maintanableItems);
        await expandBtn.waitForDisplayed({ timeout: 60000 });
        await expandBtn.waitForClickable({ timeout: 60000 });
        if ((await expandBtn.getAttribute("aria-expanded")) === "false") {
            await utils.clickWithWait(expandBtn);
        }
        await expect(this.failureModeAssigned(this.failureMode)).toBeDisplayed();
        console.log("Added Failure Modes");
    }

    public async verifyFailureModesDetails()
    {
        console.log("completeFailureModeFlow start");

        // ===== open failure mode =====
        const nameOnly = this.failureMode.split(' (')[0];
        const idOnly = this.failureMode.match(/\((.*?)\)/)?.[1] || '';

        await utils.clickWithWait(this.failureModeRow(this.failureMode));
        await expect(this.failureModeHeader(nameOnly)).toBeDisplayed();
        await expect(this.failureModeId(idOnly)).toBeDisplayed();

        // ===== analysis section =====
        await utils.clickWithWait(this.analysisDetailsSection);

        // ===== Failure Effects =====
        let txt = await this.failureEffectsText.getText();
        console.log("Failure Effects before: " + await utils.getAssignedValue(txt));

        await utils.clickWithWait(this.failureEffectsAssignBtn);
        await expect(this.assignFailureEffectsHeader).toBeDisplayed();

        let count = await utils.getAssignedValue(await this.failureEffectsCountText.getText());
        if (count === 0) {
            await utils.clickWithWait(this.cancelBtn);
        } else {
            const val = await this.failureEffectsValue.getText();
            await utils.clickWithWait(this.failureEffectsCheckbox);
            await utils.clickWithWait(this.assignBtn);
            await utils.clickWithWait(this.okBtn);
        }

        txt = await this.failureEffectsText.getText();
        console.log("Failure Effects after: " + await utils.getAssignedValue(txt));

        // ===== Failure Scenario =====
        await utils.clickWithWait(this.failureScenarioEditBtn);
        await this.failureScenarioTextarea.setValue("Test Scenario");
        await utils.clickWithWait(this.failureScenarioSaveBtn);
        await utils.clickWithWait(this.okBtn);

        // ===== Failure Mechanisms =====
        txt = await this.failureMechanismText.getText();
        console.log("Failure Mechanisms before: " + await utils.getAssignedValue(txt));

        await utils.clickWithWait(this.failureMechanismAssignBtn);
        await expect(this.assignFailureMechanismHeader).toBeDisplayed();

        count = await utils.getAssignedValue(await this.failureMechanismCountText.getText());
        if (count === 0) {
            await utils.clickWithWait(this.cancelBtn);
        } else {
            await utils.clickWithWait(this.failureMechanismCheckbox);
            await utils.clickWithWait(this.assignBtn);
            await utils.clickWithWait(this.okBtn);
        }

        txt = await this.failureMechanismText.getText();
        console.log("Failure Mechanisms after: " + await utils.getAssignedValue(txt));

        // ===== Consequence Evaluation =====
        await utils.clickWithWait(this.consequenceEditBtn);
        await expect(this.consequenceHeader).toBeDisplayed();

        await utils.clickWithWait(this.hiddenFailureDropdown);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");

        await utils.clickWithWait(this.failurePatternDropdown);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");

        await utils.clickWithWait(this.safeLifePopupBtn);
        await expect(this.unitPopupHeader).toBeDisplayed();
        await utils.clickWithWait(this.unitOption);

        await this.safeLifeInput.setValue("3");

        await utils.clickWithWait(this.pfIntervalPopupBtn);
        await expect(this.unitPopupHeader).toBeDisplayed();
        await utils.clickWithWait(this.unitOption);

        await this.pfIntervalInput.setValue("2");

        await utils.clickWithWait(this.consequenceSaveBtn);
        await utils.clickWithWait(this.okBtn);

        // ===== Causes =====
        txt = await this.causesText.getText();
        console.log("Causes before: " + await utils.getAssignedValue(txt));

        await utils.clickWithWait(this.causesAssignBtn);
        await expect(this.assignCausesHeader).toBeDisplayed();

        count = await utils.getAssignedValue(await this.causesCountText.getText());
        if (count === 0) {
            await utils.clickWithWait(this.cancelBtn);
        } else {
            await utils.clickWithWait(this.causesCheckbox);
            await utils.clickWithWait(this.assignBtn);
            await utils.clickWithWait(this.okBtn);
        }

        txt = await this.causesText.getText();
        console.log("Causes after: " + await utils.getAssignedValue(txt));

        // ===== Strategies =====
        for (const el of await this.strategiesTexts) {
            if (await el.isDisplayed()) {
                console.log("Strategies: " + await utils.getAssignedValue(await el.getText()));
            }
        }

        for (const btn of await this.strategiesCreateBtns) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                break;
            }
        }

        await expect(this.createStrategyHeader).toBeDisplayed();

        await this.strategyDescInput.setValue("Test Desc");
        await this.strategyLongDesc.setValue("Test Long Desc");

        await utils.clickWithWait(this.strategyTypeDropdown);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const format = (d: Date): string => d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

        await this.strategyStartDate.setValue(format(today));
        await this.strategyDueDate.setValue(format(tomorrow));

        await utils.clickWithWait(this.strategyCreateBtn);

        for (const el of await this.strategiesTexts) {
            if (await el.isDisplayed()) {
                console.log("Strategies after: " + await utils.getAssignedValue(await el.getText()));
            }
        }

        console.log("completeFailureModeFlow end");
    }
}
export default new assetRCMDetailView();
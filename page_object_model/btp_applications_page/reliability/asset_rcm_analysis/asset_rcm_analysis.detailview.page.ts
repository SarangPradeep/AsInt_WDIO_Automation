import utils from '../../../../utils/utils';
import assetRCMListView from "./asset_rcm_analysis.listview.page";
import assetRcmData from "../../../../test_data/btp_applications/reliability/asset_rcm.data";
import * as path from 'path';
import { url } from 'inspector';
import console from 'console';
import { strict as assert, AssertionError } from 'node:assert';
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
    private get funcLocValueBtn() { return $("//bdi[.='Functional Location']/ancestor::div[2]/following::span[@role='button'][1]"); }
    private get confirmBtn() { return $("//footer//button[.='Confirm']"); }
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
    private headerTechnicalObjectId = (id: string) => $$(`(//header[@role='banner']//div[@role='heading']//span[@dir='auto'])[normalize-space()='${id}']`);
    private headerTechnicalObjectName = (name: string) => $$(`//header[@role='banner']//span[@dir='auto'][normalize-space()='${name}']`);
    private get criticalityLabel() { return $("//bdi[normalize-space()='Criticality:']"); }
    private criticalityValue = (crit: string) => $(`//bdi[normalize-space()='Criticality:']/ancestor::div[1]/following::span[1][normalize-space()='${crit}']`);
    private get riskInformationHeader() { return $("//div[@role='heading']//span[contains(text(),'Risk Information')]"); }
    private get riskInformationExpandBtn() { return $("//span[contains(text(),'Risk Information')]/preceding::button[1]"); }
    private riskRowValue = (i:number) => $(`//td[@aria-colindex='1']//bdi/following::tbody//tr[@aria-rowindex='${i}']//td[@aria-colindex='1']//bdi`);
    private get maintenanceServiceSections() {return $$("//bdi[normalize-space()='Maintenance and Service']");}
    private get maintenanceNotifText() { return $("//div[contains(text(),'Maintenance Notifications')]"); }
    private get maintenanceNotifAssignBtn() { return $("//div[contains(text(),'Maintenance Notifications')]/following::button[.//text()='Assign'][1]"); }
    private get maintenanceNotifHeader() { return $("//header//span[contains(text(),'Maintenance Notifications')]"); }
    private get maintenanceOrdersText() { return $("//div[contains(text(),'Maintenance Orders')]"); }
    private get maintenanceOrdersAssignBtn() { return $("//div[contains(text(),'Maintenance Orders')]/following::button[.//text()='Assign'][1]"); }
    private get maintenanceOrdersHeader() { return $("//header//span[contains(text(),'Orders')]"); }
    private get maintenancePlansText() { return $("//div[contains(text(),'Maintenance Plans')]"); }
    private get footerCancelBtn() { return $("//footer//button[.//text()='Cancel']"); }
    private get strategiesHeader() { return $$("//div[@role='heading']//span[contains(text(),'Strategies')]"); }
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
    private get closeBtn() {return $$("//header[@role='banner']//button[@aria-label='Decline']"); }
    private failureModeAddBtn = (val: string) => $(`//span[@dir='auto'][contains(text(),"${val}")]/ancestor::div[3]/following-sibling::div//button[@title='Add']`);
    private get assignFailureModeBtn() { return $$("//button[@title='Assign Failure Modes']"); }
    private get assignFailureModeHeader() { return $("//h1[normalize-space()='Assign Failure Modes']"); }
    private get failureModeCountText() { return $("//header[.//text()='Assign Failure Modes']/following-sibling::section//span[contains(text(),'Failure Modes')]"); }
    private get failureModeValue() { return $("//header[.//text()='Assign Failure Modes']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[@aria-colindex='2']//span"); }
    private get failureModeCheckbox() { return $("//header[.//text()='Assign Failure Modes']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[2]"); }
    private failureModeExpandBtn = (val: string) => $(`//span[@dir='auto'][contains(text(),"${val}")]/ancestor::div[5]//span[@role='button']`);
    private failureModeAssigned = (val: string) => $(`//span[@dir='auto'][contains(text(),"${val}")]`);
    private failureModeRow = (val: string) => $(`//span[@dir='auto'][contains(text(),"${val}")]/ancestor::div[4]`);
    private failureModeHeaders = (name: string) => $$(`(//header[@role='banner']//div[@role='heading']//span[@dir='auto'])[normalize-space()='${name}']`);
    private failureModeId = (id: string) => $(`//section[@role='region']//span[text()='Code ID ']/following-sibling::span[normalize-space()='${id}']`);
    private get analysisDetailsSections() {return $$("//bdi[normalize-space()='Analysis Details']");}
    private get failureEffectsText() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Effects')]"); }
    private get failureEffectsAssignBtn() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Effects')]/following::button[1]"); }
    private get assignFailureEffectsHeader() { return $("//h1[normalize-space()='Assign Failure Effects']"); }
    private get failureEffectsCountText() { return $("//header[.//text()='Assign Failure Effects']/following-sibling::section//span[contains(text(),'Failure Effects')]"); }
    private get failureEffectsValue() { return $("//header[.//text()='Assign Failure Effects']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[@aria-colindex='2']//span"); }
    private get failureEffectsCheckbox() { return $("//header[.//text()='Assign Failure Effects']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[2]"); }
    private get failureScenarioEditBtn() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Scenario')]/following::bdi[text()='Edit'][1]"); }
    private get failureScenarioTextarea() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Scenario')]/following::textarea"); }
    private get failureScenarioSaveBtn() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Scenario')]/following::bdi[text()='Save']"); }
    private get failureMechanismText() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Mechanisms')]"); }
    private get failureMechanismAssignBtn() { return $("//div[@role='heading']//following::span[contains(text(),'Failure Mechanisms')]/following::button[1]"); }
    private get assignFailureMechanismHeader() { return $("//h1[normalize-space()='Assign Failure Mechanisms']"); }
    private get failureMechanismCountText() { return $("//header[.//text()='Assign Failure Mechanisms']/following-sibling::section//span[contains(text(),'Failure Mechanisms')]"); }
    private get failureMechanismValue() { return $("//header[.//text()='Assign Failure Mechanisms']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[@aria-colindex='2']//span"); }
    private get failureMechanismCheckbox() { return $("//header[.//text()='Assign Failure Mechanisms']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[2]"); }
    private get consequencePerformBtn() { return $("//div[@role='heading']//following::span[contains(text(),'Consequence Evaluation')]/following::bdi[text()='Perform'][1]"); }
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
    private get consequenceNotesBtn() { return $("//div[@role='toolbar'][.//*[normalize-space()='Consequence Evaluation']]//button[@aria-label='No Notes' or @aria-label='Notes']"); }
    private get failureModeNotesBtn() { return $("//div[@aria-roledescription='Overflow Toolbar']//button[@aria-label='Notes Present' or @aria-label='No Notes']"); }
    private get notesTextarea() { return $("(//div[.//textarea and .//div[@aria-roledescription='Overflow Toolbar'][.//button[.//bdi[normalize-space()='Save']] and .//button[.//bdi[normalize-space()='Close']]]])[last()]//textarea"); }
    private get notesSaveBtn() { return $("(//div[@aria-roledescription='Overflow Toolbar'][.//button[.//bdi[normalize-space()='Save']] and .//button[.//bdi[normalize-space()='Close']]])[last()]//button[.//bdi[normalize-space()='Save']]"); }
    private get notesCloseBtn() { return $("(//div[@aria-roledescription='Overflow Toolbar'][.//button[.//bdi[normalize-space()='Save']] and .//button[.//bdi[normalize-space()='Close']]])[last()]//button[.//bdi[normalize-space()='Close']]"); }
    private get errorDialogHeader() { return $("//header[.//text()='Error']"); }
    private get errorDialogOkBtn() { return $("//header[.//text()='Error']/following::button[.//bdi[normalize-space()='OK']]"); }
    private get causesText() { return $("(//div[@role='heading']//following::span[contains(text(),'Causes')])[1]"); }
    private get causesAssignBtn() { return $("(//div[@role='heading']//following::span[contains(text(),'Causes')])[1]/following::button[1]"); }
    private get assignCausesHeader() { return $("//h1[normalize-space()='Assign Causes']"); }
    private get causesCountText() { return $("//header[.//text()='Assign Causes']/following-sibling::section//span[contains(text(),'Causes')]"); }
    private get causesValue() { return $("//header[.//text()='Assign Causes']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[@aria-colindex='2']//span"); }
    private get causesCheckbox() { return $("//header[.//text()='Assign Causes']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[2]"); }
    private get strategiesTexts() { return $$("//div[@role='heading']//following::span[contains(text(),'Strategies')]"); }
    private get strategiesCreateBtn() { return $("(//div[@role='heading']//following::span[contains(text(),'Causes')])[1]/following::button[.='Create']"); }
    private get createStrategyHeader() { return $("//h1[normalize-space()='Create Strategy']"); }
    private get strategyDescInput() { return $("//bdi[text()='Description']/following::textarea[1]"); }
    private get strategyLongDesc() { return $("//bdi[text()='Long Description']/following::textarea"); }
    private get strategyTypeDropdown() { return $("//bdi[text()='Type']/following::span[@role='button'][1]"); }
    private get strategyInspTypDrp() { return $("//bdi[text()='Inspection Type ']/following::span[@role='button'][1]"); }
    private get strategyInspStageDrp() { return $("//bdi[text()='Inspection Stage']/following::span[@role='button'][1]"); }
    private get MDAwindowBtn() { return $("//bdi[text()='MDA']/following::span[@role='button'][1]"); }
    private get MDAheader() { return $("//h1[normalize-space()='Select Maintenance Data Attribution']"); }
    private get MDAcheckbox() { return $("//h1[normalize-space()='Select Maintenance Data Attribution']/following::tr[3]//div[@role='checkbox']"); }
    private get saveMDABtn() { return $("//h1[normalize-space()='Select Maintenance Data Attribution']/following::button[.//text()='Save']"); }
    private get sheMRvalues() { return $("//bdi[text()='SHE MR at Due Date']/following::input[1]"); }
    private get finMRvalues() { return $("//bdi[text()='FIN MR at Due Date']/following::input[1]"); }
    private get mitigatedRiskValue() { return $("//bdi[text()='Mitigated FIN Consequence ($K)']/following::input[1]"); }
    private get mitigatedPofValue() { return $("//bdi[text()='Mitigated FIN POF']/following::input[1]"); }
    private get strategyStartDate() { return $("//bdi[text()='Start Date']/following::input[1]"); }
    private get strategyDueDate() { return $("//bdi[text()='Due Date']/following::input[1]"); }
    private get strategyCreateBtn() { return $("//footer//button[.//bdi[.='Create']]"); }
    private get strategySaveBtn() { return $$("//footer//button[.//bdi[.='Save']] | //div[@aria-roledescription='Overflow Toolbar' or @role='toolbar'][.//button[.//bdi[normalize-space()='Save']]]//button[.//bdi[normalize-space()='Save']]"); }
    private get strategyFirstRow() { return (description: string) => $$(`//tr[@role='row']//span[contains(text(),'${description}')]/following::div[@title="Click to Select"][1]`); }
    private get strategyEditBtn() { return $("(//div[@role='heading']//following::span[contains(text(),'Causes')])[1]/following::button[.='Edit & Update']"); }
    private get selectAllStrategyCheckbox() { return $$("//div[@role='form' and .//*[contains(text(),'Strategies')]]//div[@title='Select All']"); }
    private get riskInformationSections() { return $$("//bdi[normalize-space()='Risk Information']"); }
    private get riskSearchInput() { return $("//input[@placeholder='Search by Transition , Last transition date , FIN Risk , SHE Risk   ']"); }
    private get editRiskBtn() { return $("//button[@title='Edit']"); }
    private get transitionTextRow1() { return $("(//th[@aria-colindex='2']//span[text()='Transition']/following::td[@aria-colindex='2']//span)[1]"); }
    private get lastTransitionDateRow1() { return $("(//th[@aria-colindex='3']//span[text()='Last Transition Date']/following::td[@aria-colindex='3']//input)[1]"); }
    private get sheRiskDropdownRow1() { return $("(//th[@aria-colindex='4']//span[text()='SHE Risk']/following::td[@aria-colindex='4']//input)[1]"); }
    private get finRiskDropdownRow1() { return $("(//th[@aria-colindex='5']//span[text()='FIN Risk']/following::td[@aria-colindex='5']//input)[1]"); }
    private get finConsequenceRow1() { return $("(//th[@aria-colindex='6']//span[text()='FIN Consequence ($K)']/following::td[@aria-colindex='6']//input)[1]"); }
    private get finPofRow1() { return $$("(//span[text()='FIN POF']/following::td[@colspan='6']//input)[1]"); }
    private get transitionTextRow2() { return $("(//th[@aria-colindex='2']//span[text()='Transition']/following::tr[@aria-rowindex='2']/following::td[@aria-colindex='2']//span)[1]"); }
    private get lastTransitionDateRow2() { return $("(//th[@aria-colindex='3']//span[text()='Last Transition Date']/following::tr[@aria-rowindex='2']/following::td[@aria-colindex='3']//input)[1]"); }
    private get sheRiskDropdownRow2() { return $("(//th[@aria-colindex='4']//span[text()='SHE Risk']/following::tr[@aria-rowindex='2']/following::td[@aria-colindex='4']//input)[1]"); }
    private get finRiskDropdownRow2() { return $("(//th[@aria-colindex='5']//span[text()='FIN Risk']/following::tr[@aria-rowindex='2']/following::td[@aria-colindex='5']//input)[1]"); }
    private get finConsequenceRow2() { return $("(//th[@aria-colindex='6']//span[text()='FIN Consequence ($K)']/following::tr[@aria-rowindex='2']/following::td[@aria-colindex='6']//input)[1]"); }
    private get finPofRow2() { return $$("(//span[text()='FIN POF']/following::td[@colspan='6']//input)[2]"); }
    private get transitionTextRow3() { return $("(//th[@aria-colindex='2']//span[text()='Transition']/following::tr[@aria-rowindex='3']/following::td[@aria-colindex='2']//span)[1]"); }
    private get lastTransitionDateRow3() { return $("(//th[@aria-colindex='3']//span[text()='Last Transition Date']/following::tr[@aria-rowindex='3']/following::td[@aria-colindex='3']//input)[1]"); }
    private get sheRiskDropdownRow3() { return $("(//th[@aria-colindex='4']//span[text()='SHE Risk']/following::tr[@aria-rowindex='3']/following::td[@aria-colindex='4']//input)[1]"); }
    private get finRiskDropdownRow3() { return $("(//th[@aria-colindex='5']//span[text()='FIN Risk']/following::tr[@aria-rowindex='3']/following::td[@aria-colindex='5']//input)[1]"); }
    private get finConsequenceRow3() { return $("(//th[@aria-colindex='6']//span[text()='FIN Consequence ($K)']/following::tr[@aria-rowindex='3']/following::td[@aria-colindex='6']//input)[1]"); }
    private get finPofRow3() { return $$("(//span[text()='FIN POF']/following::td[@colspan='6']//input)[3]"); }
    private get transitionTextRow4() { return $("(//th[@aria-colindex='2']//span[text()='Transition']/following::tr[@aria-rowindex='4']/following::td[@aria-colindex='2']//span)[1]"); }
    private get lastTransitionDateRow4() { return $("(//th[@aria-colindex='3']//span[text()='Last Transition Date']/following::tr[@aria-rowindex='4']/following::td[@aria-colindex='3']//input)[1]"); }
    private get sheRiskDropdownRow4() { return $("(//th[@aria-colindex='4']//span[text()='SHE Risk']/following::tr[@aria-rowindex='4']/following::td[@aria-colindex='4']//input)[1]"); }
    private get finRiskDropdownRow4() { return $("(//th[@aria-colindex='5']//span[text()='FIN Risk']/following::tr[@aria-rowindex='4']/following::td[@aria-colindex='5']//input)[1]"); }
    private get finConsequenceRow4() { return $("(//th[@aria-colindex='6']//span[text()='FIN Consequence ($K)']/following::tr[@aria-rowindex='4']/following::td[@aria-colindex='6']//input)[1]"); }
    private get finPofRow4() { return $$("(//span[text()='FIN POF']/following::td[@colspan='6']//input)[4]"); }
    private get transitionTextRow5() { return $("(//th[@aria-colindex='2']//span[text()='Transition']/following::tr[@aria-rowindex='5']/following::td[@aria-colindex='2']//span)[1]"); }
    private get lastTransitionDateRow5() { return $("(//th[@aria-colindex='3']//span[text()='Last Transition Date']/following::tr[@aria-rowindex='5']/following::td[@aria-colindex='3']//input)[1]"); }
    private get sheRiskDropdownRow5() { return $("(//th[@aria-colindex='4']//span[text()='SHE Risk']/following::tr[@aria-rowindex='5']/following::td[@aria-colindex='4']//input)[1]"); }
    private get finRiskDropdownRow5() { return $("(//th[@aria-colindex='5']//span[text()='FIN Risk']/following::tr[@aria-rowindex='5']/following::td[@aria-colindex='5']//input)[1]"); }
    private get finConsequenceRow5() { return $("(//th[@aria-colindex='6']//span[text()='FIN Consequence ($K)']/following::tr[@aria-rowindex='5']/following::td[@aria-colindex='6']//input)[1]"); }
    private get finPofRow5() { return $$("(//span[text()='FIN POF']/following::td[@colspan='6']//input)[5]"); }
    private get saveRiskBtn() { return $("//button[.//text()='Save']"); }
    private get riskMatrixSections() { return $$("//bdi[normalize-space()='Risk Matrix']"); }
    private get riskMatrixTitle() { return $("//div[text()='Exxon 4x5 FIN Risk Matrix']"); }
    private get finTodayText() { return $("//span[text()=\"FIN At Today's Date\"]"); }
    private get finPofValue() { return $("//div[contains(.,'FIN PoF')]/b"); }
    private get finCofValue() { return $("//div[contains(.,'FIN CoF ($K)')]/b"); }
    private get assignTechObjBtn() { return $("//button[.//text()='Assign Technical Objects']"); }
    private get hierarchyMoreBtn() { return $("//span[text()='Hierarchy']/following::button[@aria-label='Additional Options']//span[@role='presentation']"); }
    private get headerMoreBtn() { return $("//header//button[@aria-label='Additional Options']//span[@role='presentation']"); }
    private get functionalLocationHeader() { return $("//header//span[contains(text(),'Functional Location')]"); }
    private get checkBoxByIndex() { return (i: number) => $(`(//tr[@role='row']//div[@role='checkbox'])[${i}]`); }
    private functionalLocationRow = (funcLoc: string) =>$(`//span[@dir='auto'][contains(text(),'${funcLoc}')]`);
    private functionalLocationRowClick = (funcLoc: string) => $(`//span[@dir='auto'][contains(text(),'${funcLoc}')]/ancestor::div[4]`);
    private functionalLocationAddBtn = (locationName: string, locationId: string) =>$(`//span[@dir='auto'][contains(normalize-space(), '${locationName}') and contains(normalize-space(), '${locationId}')]/ancestor::div[3]/following-sibling::div//button[@title='Add']`);
    private get assignMaintainableItemsBtn() {return $$("//button[@title='Assign Maintainable Items']");}
    private get assignFunctionsBtn() {return $$("//button[@title='Assign Functions']");}
    private get assignFunctionsHeader() { return $("//h1[normalize-space()='Assign Functions']"); }
    private get functionsCountText() {return $("//header[.//text()='Assign Functions']/following-sibling::section//span[contains(text(),'Functions')]"); }
    private get firstFunctionValue() {return $("//header[.//text()='Assign Functions']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[@aria-colindex='2']//span"); }
    private get firstFunctionCheckbox() {return $("//header[.//text()='Assign Functions']/following-sibling::section//tbody//tr[@aria-rowindex='3']//td[2]"); }
    private expandBtnForFuncLoc = (locationName: string, locationId: string) =>$$(`//span[@dir='auto'][contains(normalize-space(), '${locationName}') and contains(normalize-space(), '${locationId}')]/ancestor::div[5]//span[@role='button']`);
    private expandBtnForFunc = (funtion: string) =>$$(`//span[@dir='auto'][contains(normalize-space(), '${funtion}')]/ancestor::div[5]//span[@role='button']`);
    private expandBtnForFuncFail = (funtion: string) =>$$(`//span[@dir='auto'][contains(normalize-space(), '${funtion}')]/ancestor::div[5]//span[@role='button']`);
    private functionRow = (fn: string) => $$(`//span[@dir='auto'][contains(text(),'${fn}')]`);
    private functionRowClick = (fn: string) => $(`//span[@dir='auto'][contains(text(),'${fn}')]/ancestor::div[4]`);
    private functionalFailureAddBtn = (functionName: string) =>$(`//span[@dir='auto'][contains(normalize-space(), '${functionName}')]/ancestor::div[3]/following-sibling::div//button[@title='Add']`);
    private get assignFunctionalFailureBtn() {return $$("//button[@title='Assign Functional Failure']"); }
    private get assignFunctionalFailureHeader() {return $("//h1[normalize-space()='Assign Functional Failures']"); }
    private get functionalFailureCountText() {return $("//header[.//text()='Assign Functional Failures']/following-sibling::section//span[contains(text(),'Functional Failure')]"); }
    private get firstFunctionalFailureValue() {return $("//header[.//text()='Assign Functional Failures']/following-sibling::section//tbody//tr[@aria-rowindex='5']//td[@aria-colindex='2']//span"); }
    private get firstFunctionalFailureCheckbox() {return $("//header[.//text()='Assign Functional Failures']/following-sibling::section//tbody//tr[@aria-rowindex='5']//td[2]"); }
    private functionalFailureRow = (val: string) => $$(`//span[@dir='auto'][contains(text(),"${val}")]`);
    private functionalFailureRowClick = (val: string) =>$(`//span[@dir='auto'][contains(text(),"${val}")]/ancestor::div[4]`);
    private get attachSuccMsg() { return $("//span[text()='Success']"); }
    private get summaryReportBtn() { return $("//button[.//text()='Summary Report']"); }
    private get downloadReportHeader() { return $("//h1[.//text()='Download Report']"); }
    private get includeAllTechObjText() { return $("//bdi[text()='Include all Technical Objects']"); }
    private get downloadReportOkBtn() { return $("//header[.//text()='Download Report']/following::footer//button[.//text()='Ok']"); }
    private get confirmationYesBtn() { return $("//header[.//text()='Confirmation']/following::footer//button[.//text()='Yes']"); }
    private get manageBtn() { return $("//button[.//text()='Manage']"); }
    private get deleteConfirmText() { return $("//span[.//text()='Are you sure you want to delete the assessment?']"); }
    private get confirmOkBtn() { return $("//header[.//text()='Confirmation']/following::button[.//text()='OK']"); }
    private get createSystemTab() { return $("//li[@role='option'][.//div[normalize-space()='Create System']]"); }
    private get systemNameInput() { return $("//bdi[normalize-space()='System Name']/following::textarea[1]"); }
    private get systemDescInput() { return $("//bdi[normalize-space()='System Description']/following::textarea[1]"); }
    private get genericCloseBtn() { return $("//button[.//text()='Close']"); }

    public selectedEquipmentData:any = {};
    public selectedFunctionalLocation:any ={};
    private techObj!: string;
    private maintainableItems!: string;
    private failureMode!: string;
    private funcLocObj!: string;
    private functionValue!: string;
    private functionalFailureValue!: string;
    private maintainableItemValueFunLoc!: string;
    private failureModeValueFunLoc!: string;
    private assignedMaintainable!: number;
    private maintainableItemEquip: boolean = false;
    private failureModeEquip: boolean = false;
    private failureModeFunLoc: boolean = false;
    private maintainableItemFunLoc: boolean = false;
    public createdStrategies: any[] = [];
    public commonStrategyValues: any = {};
    public analysisFailures: string[] = [];
    public systemName!: string;
    public subSystemName!: string;
    public failureEffectsCaptured: Array<{ name: string, codeId: string, codeGroup: string }> = [];
    public failureMechanismsCaptured: Array<{ name: string, codeId: string, codeGroup: string }> = [];
    public failureCausesCaptured: Array<{ name: string, codeId: string, codeGroup: string }> = [];
    public failureScenarioTextCaptured: string = "";
    public consequenceEvaluationCaptured: { typeOfFailure: string, failurePattern: string, safeLife: string, pfInterval: string } = { typeOfFailure: "", failurePattern: "", safeLife: "", pfInterval: "" };
    public failureStrategiesCaptured: Array<{ description: string, longDescription: string, mda: string, type: string, subtype: string, startDate: string, dueDate: string, sheRiskAtDueDate: string, finRiskAtDueDate: string, sheMRAtDueDate: string, finMRAtDueDate: string, finPof: string, mitigatedFinPof: string, finConsequence: string, mitigatedFinConsequence: string, inspectionType: string, inspectionStage: string }> = [];
    public riskInformationCaptured: Array<{ transition: string, lastTransitionDate: string, sheRisk: string, finRisk: string, finConsequence: string, finPof: string }> = [];

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
        await utils.setValueWithWait(this.nextTADateInput, getFutureDate(7));
        await utils.clickWithWait(this.savePlanDataBtn);
        await utils.clickWithWait(this.okBtn);
        await browser.pause(2500);
        console.log("Verification of planning section is done");
    }

    public async addRoles()
    {
        console.log("Adding roles...");
        await utils.clickWithWait(this.addRoleBtn);
        await browser.pause(2500);
        await utils.waitForBusyIndicatorToDisappear();
        await this.addRoleDialog.waitForDisplayed();
        await utils.clickWithWait(this.secondRoleCheckbox);
        await utils.clickWithWait(this.addRoleOkBtn);
        await browser.pause(2500);
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
        await browser.pause(2500);
        console.log("Roles added");
    }

    public async createAssessmentFlow(){
        console.log("Navigating to Assessment Tab");
        utils.switchToIframe(this.rcmIframe);
        await utils.clickWithWait(this.assessmentTab);
        console.log("Navigated to Assessment tab");
        console.log("Assessment flow start");
        await utils.switchToIframe(this.rcmIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.startAssessmentBtn);
        await browser.pause(2000);
        await utils.switchToIframe(this.rcmIframe);
        await browser.pause(4000);
        await this.technicalObjectsHeader.waitForDisplayed();
        let assessmentCreated = false;
        let lastFailureReason = "";
        for(let i=2;i<=81;i++){
            console.log(`Trying checkbox index: ${i}`);
            await utils.clickWithWait(this.equipmentValueBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            const checkBox = $(`(//tr[@role='row']//div[@role='checkbox'])[${i}]`);
            await this.ensureCheckboxLoaded(i);
            await checkBox.waitForExist({ timeout: 50000 });
            await checkBox.scrollIntoView({ block: "center", inline: "center" });
            await browser.pause(1000);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1500);
            await checkBox.waitForDisplayed({ timeout: 50000 });
            await checkBox.waitForClickable({ timeout: 50000 });
            await utils.clickWithWait(checkBox);
            await this.selectEquipmentAndStore(i);
            await utils.clickWithWait(this.confirmBtn);
            await utils.clickWithWait(this.nextBtn);
            await utils.clickWithWait(this.createBtnFooter);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            await browser.waitUntil(async () =>
                (await this.okBtn.isDisplayed().catch(() => false))
                || (await this.warningMsg.isDisplayed().catch(() => false))
                || (await this.errorDialogHeader.isDisplayed().catch(() => false)),
                { timeout: 60000, timeoutMsg: `No Success / Warning / Error popup detected for checkbox index ${i}` }
            );
            if (await this.okBtn.isDisplayed().catch(() => false)) {
                console.log("Assessment created successfully");
                await utils.clickWithWait(this.okBtn);
                assessmentCreated = true;
                break;
            } else if (await this.errorDialogHeader.isDisplayed().catch(() => false)) {
                let errMsg = "";
                try {
                    const bodyEl = $("//header[.//text()='Error']/following::section//span[normalize-space()][1]");
                    if (await bodyEl.isDisplayed().catch(() => false)) {
                        errMsg = (await bodyEl.getText().catch(() => "")).trim();
                    }
                } catch (e) { void e; }
                lastFailureReason = `Error: ${errMsg || "unknown"}`;
                console.log(`Error dialog displayed ('${errMsg}') → dismissing, going Previous, retrying with next checkbox`);
                await utils.clickWithWait(this.errorDialogOkBtn);
                await utils.waitForBusyIndicatorToDisappear();
                await utils.clickWithWait(this.previousBtn);
                await browser.pause(4000);
                await utils.waitForBusyIndicatorToDisappear();
                await utils.clickWithWait(this.removeSelectedToken);
            } else if (await this.warningMsg.isDisplayed().catch(() => false)) {
                lastFailureReason = "Warning displayed on Create";
                console.log("Warning displayed, retrying with next checkbox");
                await utils.clickWithWait(this.warningOkBtn);
                await utils.clickWithWait(this.previousBtn);
                await browser.pause(4000);
                await utils.waitForBusyIndicatorToDisappear();
                await utils.clickWithWait(this.removeSelectedToken);
            }
        }
        if (!assessmentCreated) {
            throw new AssertionError({ message: `RCM assessment could not be created after trying checkbox indexes 2..81. Last failure: ${lastFailureReason || "none captured"}` });
        }
        console.log("Assessment details :", this.selectedEquipmentData);
        console.log("Assessment flow end");
    }

    private async ensureCheckboxLoaded(targetIndex: number): Promise<void> {
        const checkboxXpath = "//tr[@role='row']//div[@role='checkbox']";
        const maxScrollAttempts = 20;
        let previousCount = 0;
        let stagnantScrolls = 0;
        for (let attempt = 1; attempt <= maxScrollAttempts; attempt++) {
            const count = await $$(checkboxXpath).length;
            if (count >= targetIndex) {
                console.log(`Checkbox index ${targetIndex} available (loaded ${count} rows).`);
                return;
            }
            if (count === previousCount) {
                stagnantScrolls++;
                if (stagnantScrolls >= 3) {
                    console.log(`No new rows loaded after ${stagnantScrolls} stagnant scrolls (total ${count}); stopping scroll loop.`);
                    return;
                }
            } else {
                stagnantScrolls = 0;
            }
            previousCount = count;
            if (count > 0) {
                const lastCheckbox = await $(`(${checkboxXpath})[${count}]`);
                try {
                    await lastCheckbox.scrollIntoView({ block: "end", inline: "center" });
                } catch (e) { void e; }
            }
            await browser.pause(1500);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(500);
        }
        console.log(`ensureCheckboxLoaded: exhausted ${maxScrollAttempts} scroll attempts trying to reach index ${targetIndex}.`);
    }

    public async selectEquipmentAndStore(i:number){
        console.log("Store equipment data start");
        const row = await this.getRowByIndex(i);
        const equipmentId = await row.$(".//td[@aria-colindex='2']//span[contains(@id,'txt')]").getText();
        console.log("Equipment ID selected: "+equipmentId);
        const equipmentName = await row.$(".//td[@aria-colindex='2']//div[contains(@class,'Text')]/span[last()]").getText();
        console.log("Equipment Name selected: "+equipmentName);
        const category = await row.$(".//td[@aria-colindex='3']//span").getText();
        console.log("Category selected: "+category);
        const objectType = await row.$(".//td[@aria-colindex='4']//span").getText();
        console.log("Object type selected: "+objectType);
        const catalogProfile = await row.$(".//td[@aria-colindex='8']//span").getText();
        console.log("Catalog profile selected: "+catalogProfile);
        //const criticality = await row.nextElement().$(".//span[text()='Criticality']/ancestor::div[1]/following::span[1]").getText();
        this.selectedEquipmentData = {equipmentId,equipmentName,category,objectType,catalogProfile};
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
        //this.criticalityLabel,
        //this.criticalityValue(data.criticality)
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

    public async verifyAssessmentSections()
    {
        await this.captureRiskStrategyRecommendation();
        await this.captureMaintainAndService();
    }

    public async captureRiskStrategyRecommendation(){
        console.log("Capture Risk/Strategy/Recommendation start");
        const riskHeaderTxt = await this.riskInformationHeader.getText();
        const riskCount = await utils.getAssignedValue(riskHeaderTxt);
        if(riskCount > 0){
            if((await this.riskInformationExpandBtn.getAttribute("aria-expanded")) === "false"){
                await utils.clickWithWait(this.riskInformationExpandBtn);
            }
        }
        let headerText = "";

        for (const el of await this.strategiesHeader) {
            if (await el.isDisplayed().catch(() => false)) {
                headerText = await el.getText();
                break;
            }
        }

        const strategyVal = await utils.getAssignedValue(headerText);
        console.log("Assigned strategies is/are :", strategyVal);

        if (strategyVal > 0) {
            await this.strategiesExpandBtn.waitForDisplayed({ timeout: 60000 });

            if ((await this.strategiesExpandBtn.getAttribute("aria-expanded")) === "false") {
                await utils.clickWithWait(this.strategiesExpandBtn);
                await browser.pause(2000);
            }

            for (const row of await this.strategiesRows) {
                if (await row.isDisplayed().catch(() => false)) {
                    console.log("Strategy Row: " + await row.getText());
                }
            }
        }
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
        
    }

    public async captureMaintainAndService()
    {
        console.log("Navigating to Maintenance and Service...");
        for (const el of await this.maintenanceServiceSections) {
                if (await el.isDisplayed() && await el.isClickable()) {
                    await utils.clickWithWait(el);
                    break;
                }
        };
        await browser.pause(2000);
        console.log("Navigated to Maintenance and Service");
        let txt = await this.maintenanceNotifText.getText();
        console.log("Maintenance Notifications: " + await utils.getAssignedValue(txt));

        await utils.clickWithWait(this.maintenanceNotifAssignBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await expect(this.maintenanceNotifHeader).toBeDisplayed();
        let count = await utils.getAssignedValue(await this.maintenanceNotifHeader.getText());
        console.log("Available maintenance notifications: " + count);
        if(count===0)
        {
            await utils.clickWithWait(this.footerCancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        }
        else
        {
            await browser.pause(5000);
            const rowCheckbox = await $("(//tr[@role='row'])[2]//div[@role='checkbox']");
            await utils.clickWithWait(rowCheckbox);

            const selectBtn = await $("//button[.//text()='Select']");
            await utils.clickWithWait(selectBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await utils.clickWithWait(this.okBtn);
            await browser.pause(2000);
        }
        txt = await this.maintenanceOrdersText.getText();
        console.log("Maintenance Orders: " + await utils.getAssignedValue(txt));
        await utils.clickWithWait(this.maintenanceOrdersAssignBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await expect(this.maintenanceOrdersHeader).toBeDisplayed();
        count = await utils.getAssignedValue(await this.maintenanceOrdersHeader.getText());
        console.log("Available maintenance orders: " + count);
        if(count===0)
        {
            await utils.clickWithWait(this.footerCancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        }
        else
        {
            await browser.pause(5000);
            const rowCheckbox = await $("(//tr[@role='row'])[2]//div[@role='checkbox']");
            await utils.clickWithWait(rowCheckbox);

            const selectBtn = await $("//button[.//text()='Select']");
            await utils.clickWithWait(selectBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await utils.clickWithWait(this.okBtn);
            await browser.pause(2000);
        }
        txt = await this.maintenancePlansText.getText();
        console.log("Maintenance Plans: " + await utils.getAssignedValue(txt));
        console.log("Maintenance and Service checks end");
        console.log("Closing Assessment detail page...")
        await utils.clickWithWait(this.assessmentDetailCloseBtn);
        console.log("Closed Assessment detail page")
    }

    public async addMaintanableItemsOrFunctions()
    {
        console.log("Adding maintanable items or functions...");
        await utils.clickWithWait(this.addMaintainableBtn(this.techObj));
        await browser.pause(3000);
        for (const btn of await this.assignMaintainableItemsBtns) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                break;
            }
        }
        await browser.pause(3000);
        await expect(this.assignMaintainableItemsHeader).toBeDisplayed();
        const miText = await this.maintainableItemsText.getText();
        this.assignedMaintainable = await utils.getAssignedValue(miText);
        console.log("Total assigned maintainable are :"+this.assignedMaintainable);
        if(this.assignedMaintainable === 0)
        {
            console.log("No maintainable values are present. Checking for Assign Functions option...");
            await utils.clickWithWait(this.cancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            const proceededWithFunctions = await this.tryAssignFunctionsFallback();
            if (!proceededWithFunctions) {
                this.maintainableItemEquip = true;
                return;
            }
        }
        else
        {
            const miValue = await this.maintainableItemValue.getText();
            this.maintainableItems = miValue;
            console.log("Maintainable item is/are : "+miValue);
            await utils.clickWithWait(this.maintainableItemRow);
            await utils.clickWithWait(this.assignBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
        }
        console.log("Expanding the technical object for maintainable items...");
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
        console.log("Expanded the technical object for maintainable items");
        let found = false;
        for (const item of await this.assignedItem(this.maintainableItems)) {
            if (await item.isDisplayed()) {
                found = true;
                await utils.clickWithWait(await item.$("./ancestor::div[4]"));
                break;
            }
        }
        await expect(found).toBe(true);

        console.log("Maintainable Items Added successfully");
    }

    public async tryAssignFunctionsFallback(): Promise<boolean> {
        console.log(`Clicking Add (+) icon again on technical object '${this.techObj}' to look for Assign Functions...`);
        await utils.clickWithWait(this.addMaintainableBtn(this.techObj));
        await browser.pause(3000);

        let assignFunctionsClicked = false;
        for (const btn of await this.assignFunctionsBtn) {
            if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                await utils.clickWithWait(btn);
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(2000);
                console.log("Assign Functions option found and clicked");
                assignFunctionsClicked = true;
                break;
            }
        }
        if (!assignFunctionsClicked) {
            console.log("Assign Functions option not present either");
            return false;
        }

        await this.assignFunctionsHeader.waitForDisplayed({ timeout: 60000, timeoutMsg: "Assign Functions dialog did not open" });
        await this.functionsCountText.waitForDisplayed({ timeout: 60000, timeoutMsg: "Assign Functions count text did not appear" });
        const fnText = await this.functionsCountText.getText();
        const fnCount = await utils.getAssignedValue(fnText);
        console.log(`Available Functions in Assign Functions dialog: ${fnCount}`);

        if (fnCount === 0) {
            console.log("No functions available to assign; clicking Cancel and returning");
            await utils.clickWithWait(this.cancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            return false;
        }

        await this.firstFunctionValue.waitForDisplayed({ timeout: 30000 });
        const fnValue = (await this.firstFunctionValue.getText() || "").trim();
        this.functionValue = fnValue;
        console.log(`Selecting first function: '${fnValue}'`);
        await utils.clickWithWait(this.firstFunctionCheckbox);
        await utils.clickWithWait(this.assignBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2500);
        if (await this.okBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }
        console.log(`Function assigned: '${fnValue}'`);

        this.selectedFunctionalLocation = {
            locationName: this.selectedEquipmentData.equipmentName,
            locationId: this.selectedEquipmentData.equipmentId
        };
        this.funcLocObj = this.techObj;

        await browser.pause(4000);
        console.log(`Expanding technical object '${this.techObj}' to open assigned function detail...`);
        for (const btn of await this.expandBtn(this.techObj)) {
            if ((await btn.isDisplayed().catch(() => false)) && (await btn.getAttribute("aria-expanded")) === "false") {
                await utils.clickWithWait(btn);
                await browser.pause(2500);
                break;
            }
        }

        let opened = false;
        for (const el of await this.functionRow(this.functionValue)) {
            if (await el.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.functionRowClick(this.functionValue));
                await browser.pause(2500);
                opened = true;
                console.log(`Function detail opened for '${this.functionValue}'`);
                break;
            }
        }
        if (opened) {
            for (const btn of await this.closeBtn) {
                if (await btn.isDisplayed().catch(() => false) && await btn.isClickable().catch(() => false)) {
                    await utils.clickWithWait(btn);
                    await browser.pause(2000);
                    break;
                }
            }
        } else {
            console.log(`Function row for '${this.functionValue}' not found after expand; skipping detail open`);
        }

        console.log("Continuing with Functional Failure -> Maintainable Items -> Failure Modes chain (equipment fallback)...");
        await this.assignFunctionalFailure();
        await this.addMaintainableItemsForFunction();
        await this.addFailureModesForFunction();

        return true;
    }

    public async verifyMaintainableOrFunctionsDetails()
    {
        if(this.assignedMaintainable === 0)
        return;
        console.log("Verifying Maintainable Item Details...");
        const nameOnly = this.maintainableItems.split(' (')[0];
        await expect(this.maintainableItemHeader(nameOnly)).toBeDisplayed();
        const idMatch = this.maintainableItems?.match(/\((.*?)\)/);
        const idOnly = idMatch ? idMatch[1] : '';
        await expect(this.maintainableItemIdValue(idOnly)).toBeDisplayed();
        const riskText = await this.riskInfoText.getText();
        const riskValue = await utils.getAssignedValue(riskText);
        console.log("Risk Information value: " + riskValue);
        const strategyText = await this.strategyInfoText.getText();
        const strategyValue = await utils.getAssignedValue(strategyText);
        console.log("Strategy value: " + strategyValue);
        for (const btn of await this.closeBtn) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                break;
            }
        }
        console.log("Verified Maintainable Item Details");
    }

    public async addFailureModes()
    {
        if(this.assignedMaintainable === 0)
            return;
        console.log("Adding Failure Modes...");
        await utils.clickWithWait(this.failureModeAddBtn(this.maintainableItems));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Clicking assign failure mode button...");
        let clicked = false;
        for (const btn of await this.assignFailureModeBtn) {
            if (await btn.isDisplayed().catch(() => false) && await btn.isClickable().catch(() => false)) {
                await btn.scrollIntoView();
                await browser.pause(500);
                await utils.clickWithWait(btn);
                const opened = await this.assignFailureModeHeader.waitForDisplayed({
                    timeout: 10000
                }).then(() => true).catch(() => false);
                if (opened) {
                    clicked = true;
                    break;
                }
            }
        }
        if (!clicked) {
            throw new AssertionError({ message: "Assign Failure Mode popup did not open" });
        }
        console.log("Assign failure mode button clicked");
        await expect(this.failureModeCountText).toBeDisplayed();
        const fmText = await this.failureModeCountText.getText();
        const count = await utils.getAssignedValue(fmText);
        console.log("Failure Modes count: " + count);
        if (count === 0) {
            this.failureModeEquip = true;
            await utils.clickWithWait(this.cancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            console.log("Add Failure Modes ends with no available failure mode to assign");
            return;
        }
        this.failureMode = await this.failureModeValue.getText();
        console.log("Failure mode selected :"+this.failureMode);
        await utils.clickWithWait(this.failureModeCheckbox);
        await utils.clickWithWait(this.assignBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait(this.okBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        const expandBtn = this.failureModeExpandBtn(this.maintainableItems);
        await expandBtn.waitForDisplayed({ timeout: 60000 });
        await expandBtn.waitForClickable({ timeout: 60000 });
        if ((await expandBtn.getAttribute("aria-expanded")) === "false") {
            await utils.clickWithWait(expandBtn);
        }
        await browser.pause(5000);
        await expect(this.failureModeAssigned(this.failureMode)).toBeDisplayed();
        console.log("Added Failure Modes");
    }

    public async verifyFailureModesDetails()
    {
        if (this.functionValue === "0") {
            return;
        }
        if (this.assignedMaintainable === 0) {
            return;
        }

        const sectionFailures: Record<string, string[]> = {
            "Analysis Details": [],
            "Risk Information": [],
            "Risk Matrix": []
        };

        console.log("========== Failure Mode Verification: START ==========");

        try {
            await this.verifyAnalysisDetails();
        } catch (e) {
            const msg = (e as Error).message || String(e);
            console.log("Analysis Details threw an unexpected error: " + msg);
            sectionFailures["Analysis Details"].push("Unexpected exception: " + msg);
        }
        if (this.analysisFailures && this.analysisFailures.length > 0) {
            sectionFailures["Analysis Details"].push(...this.analysisFailures);
        }
        await this.dismissOpenDialogs("after Analysis Details");

        try {
            await this.verifyRiskInfoDetails();
        } catch (e) {
            const msg = (e as Error).message || String(e);
            console.log("Risk Information threw an unexpected error: " + msg);
            sectionFailures["Risk Information"].push("Unexpected exception: " + msg);
        }
        await this.dismissOpenDialogs("after Risk Information");

        try {
            await this.verifyRiskMatrix();
        } catch (e) {
            const msg = (e as Error).message || String(e);
            console.log("Risk Matrix threw an unexpected error: " + msg);
            sectionFailures["Risk Matrix"].push("Unexpected exception: " + msg);
        }
        await this.dismissOpenDialogs("after Risk Matrix");

        const totalFailures = Object.values(sectionFailures).reduce((sum, arr) => sum + arr.length, 0);

        console.log("========== Failure Mode Verification: SUMMARY ==========");
        if (totalFailures === 0) {
            console.log("ALL PASSED in Failure Mode Verification section.");
            console.log("========================================================");
            return;
        }

        const lines: string[] = [];
        for (const section of Object.keys(sectionFailures)) {
            const errs = sectionFailures[section];
            if (errs.length === 0) {
                console.log(`[${section}] PASSED`);
            } else {
                console.log(`[${section}] FAILED (${errs.length} issue(s)):`);
                errs.forEach((er, idx) => console.log(`   ${idx + 1}. ${er}`));
                lines.push(`[${section}] (${errs.length} issue(s)):`);
                errs.forEach((er, idx) => lines.push(`   ${idx + 1}. ${er}`));
            }
        }
        console.log("========================================================");
        throw new AssertionError({ message: `Failure Mode Verification failed with ${totalFailures} issue(s):\n` + lines.join("\n") });
    }

    private async dismissOpenDialogs(stage: string)
    {
        try {
            if (await this.errorDialogHeader.isDisplayed().catch(() => false)) {
                console.log(`Dismissing Error dialog ${stage}...`);
                if (await this.errorDialogOkBtn.isDisplayed().catch(() => false)) {
                    await utils.clickWithWait(this.errorDialogOkBtn);
                    await utils.waitForBusyIndicatorToDisappear();
                }
            }
            if (await this.okBtn.isDisplayed().catch(() => false)) {
                console.log(`Dismissing stale OK popup ${stage}...`);
                await utils.clickWithWait(this.okBtn);
                await utils.waitForBusyIndicatorToDisappear();
            }
            if (await this.cancelBtn.isDisplayed().catch(() => false)) {
                console.log(`Dismissing stale Cancel popup ${stage}...`);
                await utils.clickWithWait(this.cancelBtn);
                await utils.waitForBusyIndicatorToDisappear();
            }
            if (await this.notesCloseBtn.isDisplayed().catch(() => false) &&
                await this.notesCloseBtn.isClickable().catch(() => false)) {
                console.log(`Closing leftover Notes popover ${stage}...`);
                await utils.clickWithWait(this.notesCloseBtn);
                await utils.waitForBusyIndicatorToDisappear();
            }
        } catch (cleanupErr) {
            console.log(`Dialog cleanup ${stage} encountered: ` + (cleanupErr as Error).message);
        }
        await browser.pause(800);
    }

    public async verifyAnalysisDetails()
    {
        console.log("Failure Mode Flow starts...");
        this.analysisFailures = [];
        await this.openFailureModeDetailHeader();

        const steps: Array<{ name: string, run: () => Promise<void> }> = [
            { name: "Failure Mode Notes", run: () => this.addFailureModeNote() },
            { name: "Open Analysis Details section", run: () => this.openAnalysisDetailsSection() },
            { name: "Failure Effects", run: () => this.assignFailureEffects() },
            { name: "Failure Scenario", run: () => this.editFailureScenario() },
            { name: "Failure Mechanisms", run: () => this.assignFailureMechanism() },
            { name: "Consequence Evaluation", run: () => this.performConsequenceEvaluation() },
            { name: "Consequence Notes", run: () => this.addConsequenceNote() },
            { name: "Causes", run: () => this.assignCauses() },
            { name: "Strategies", run: () => this.createEditStrategy() }
        ];

        for (const step of steps) {
            try {
                console.log(`>>> Analysis step: ${step.name}`);
                await step.run();
            } catch (err) {
                const msg = (err as Error).message || String(err);
                const failure = `${step.name} failed: ${msg}`;
                console.log(`ERROR in step '${step.name}': ${msg}`);
                this.analysisFailures.push(failure);
            }
            await this.dismissOpenDialogs(`after ${step.name}`);
        }

        try {
            await this.captureFailureModeAnalysisData();
        } catch (e) {
            console.log(`captureFailureModeAnalysisData encountered an issue: ${(e as Error).message}`);
        }

        console.log("Failure Mode Flow ends");
    }

    public async captureFailureModeAnalysisData(): Promise<void> {
        console.log("Capturing Failure Mode Analysis Details from DOM (for PDF verification)...");
        const captured = await browser.execute(() => {
            const norm = (t: string | null | undefined) => (t || "").replace(/\s+/g, " ").trim();
            const visible = (el: HTMLElement | null) => {
                if (!el) return false;
                const r = el.getBoundingClientRect();
                if (r.width <= 0 || r.height <= 0) return false;
                const s = window.getComputedStyle(el);
                return s.visibility !== "hidden" && s.display !== "none";
            };
            const findPanelByTitlePrefix = (titlePrefix: string): HTMLElement | null => {
                const titles = Array.from(document.querySelectorAll<HTMLElement>("span[dir='auto']"));
                for (const t of titles) {
                    const txt = norm(t.innerText || t.textContent || "");
                    if (!txt.startsWith(titlePrefix)) continue;
                    let n: HTMLElement | null = t;
                    while (n && !(n.getAttribute && n.getAttribute("role") === "form")) n = n.parentElement;
                    if (n) return n;
                }
                return null;
            };
            const readIdentifierTable = (panel: HTMLElement | null): Array<{ name: string, codeId: string, codeGroup: string }> => {
                const out: Array<{ name: string, codeId: string, codeGroup: string }> = [];
                if (!panel) return out;
                const rows = Array.from(panel.querySelectorAll<HTMLElement>("tbody tr[role='row']"));
                for (const tr of rows) {
                    const cells = Array.from(tr.querySelectorAll<HTMLElement>("td[role='gridcell']"));
                    let name = "", codeId = "", codeGroup = "";
                    for (const c of cells) {
                        const oi = c.querySelector<HTMLElement>(".sapMObjectIdentifierTitle span, [class*='ObjectIdentifierTitle'] span");
                        if (oi && !name) {
                            name = norm(oi.innerText || oi.textContent || "");
                            const idSpan = c.querySelector<HTMLElement>(".sapMObjectIdentifierText span, [class*='ObjectIdentifierText'] span");
                            if (idSpan) codeId = norm(idSpan.innerText || idSpan.textContent || "");
                        }
                    }
                    if (cells.length >= 3) {
                        const cg = cells[cells.length - 2]?.querySelector<HTMLElement>("span[dir='auto']");
                        if (cg) codeGroup = norm(cg.innerText || cg.textContent || "");
                    }
                    if (name) out.push({ name, codeId, codeGroup });
                }
                return out;
            };
            const readFailureScenario = (): string => {
                const panel = findPanelByTitlePrefix("Failure Scenario");
                if (!panel) return "";
                const descLabel = Array.from(panel.querySelectorAll<HTMLElement>("bdi")).find(b => norm(b.innerText || b.textContent || "") === "Description:");
                if (!descLabel) return "";
                let node: HTMLElement | null = descLabel;
                for (let i = 0; i < 8 && node; i++) node = node.parentElement;
                if (!node) return "";
                const textSpans = Array.from(node.querySelectorAll<HTMLElement>("span[dir='auto'], span[class*='ExTextString']"));
                for (const s of textSpans) {
                    const t = norm(s.innerText || s.textContent || "");
                    if (t && t !== "Description:" && t !== "Description" && t !== "Show the full text") return t;
                }
                return "";
            };
            const readConsequence = (): { typeOfFailure: string, failurePattern: string, safeLife: string, pfInterval: string } => {
                const result = { typeOfFailure: "", failurePattern: "", safeLife: "", pfInterval: "" };
                const panel = findPanelByTitlePrefix("Consequence Evaluation");
                if (!panel) return result;
                const labelPairs: Array<[string, keyof typeof result]> = [
                    ["Type of Failure", "typeOfFailure"],
                    ["Failure Pattern", "failurePattern"],
                    ["Safe Life", "safeLife"],
                    ["P-F Interval", "pfInterval"]
                ];
                const bdis = Array.from(panel.querySelectorAll<HTMLElement>("bdi"));
                for (const [label, key] of labelPairs) {
                    const bdi = bdis.find(b => norm(b.innerText || b.textContent || "") === label);
                    if (!bdi) continue;
                    let container: HTMLElement | null = bdi;
                    for (let i = 0; i < 6 && container; i++) container = container.parentElement;
                    if (!container) continue;
                    const valueSpans = Array.from(container.querySelectorAll<HTMLElement>("span[dir='auto']"));
                    for (const s of valueSpans) {
                        const t = norm(s.innerText || s.textContent || "");
                        if (t && t !== label && t !== `${label}:`) {
                            result[key] = t;
                            break;
                        }
                    }
                }
                return result;
            };
            const readStrategies = (): Array<any> => {
                const panel = findPanelByTitlePrefix("Strategies");
                if (!panel) return [];
                const headerCells = Array.from(panel.querySelectorAll<HTMLElement>("td[role='columnheader']"));
                const headerLabels: string[] = [];
                for (const h of headerCells) {
                    const span = h.querySelector<HTMLElement>("span[dir='auto']");
                    headerLabels.push(norm(span?.innerText || span?.textContent || ""));
                }
                const rows: any[] = [];
                const rowMap = new Map<string, Map<number, string>>();
                const dataRows = Array.from(panel.querySelectorAll<HTMLElement>("tr[role='row'][data-sap-ui-rowindex]"));
                for (const tr of dataRows) {
                    const rowIdx = tr.getAttribute("data-sap-ui-rowindex") || "";
                    if (!rowIdx) continue;
                    const cells = Array.from(tr.querySelectorAll<HTMLElement>("td[role='gridcell']"));
                    if (!rowMap.has(rowIdx)) rowMap.set(rowIdx, new Map());
                    const map = rowMap.get(rowIdx)!;
                    for (const c of cells) {
                        const colIdxRaw = c.getAttribute("aria-colindex");
                        if (!colIdxRaw) continue;
                        const colIdx = Number(colIdxRaw);
                        let text = "";
                        const linkEl = c.querySelector<HTMLElement>("a");
                        if (linkEl) text = norm(linkEl.innerText || linkEl.textContent || "");
                        if (!text) {
                            const titleEl = c.querySelector<HTMLElement>("[role='heading'] span[dir='auto'], .sapMTitle span[dir='auto']");
                            if (titleEl) text = norm(titleEl.innerText || titleEl.textContent || "");
                        }
                        if (!text) {
                            const exStr = c.querySelector<HTMLElement>("span[class*='ExTextString']");
                            if (exStr) text = norm(exStr.innerText || exStr.textContent || "");
                        }
                        if (!text) {
                            const tag = c.querySelector<HTMLElement>("[role='button'][aria-roledescription='Object Tag'] span, [role='button'] span");
                            if (tag) text = norm(tag.innerText || tag.textContent || "");
                        }
                        if (!text) {
                            const anySpan = c.querySelector<HTMLElement>("span[dir='auto']");
                            if (anySpan) text = norm(anySpan.innerText || anySpan.textContent || "");
                        }
                        if (!text) {
                            const tokenTxts = Array.from(c.querySelectorAll<HTMLElement>("[class*='TokenText']")).map(t => norm(t.innerText || t.textContent || "")).filter(Boolean);
                            if (tokenTxts.length) text = tokenTxts.join(",");
                        }
                        if (colIdx >= 2 && !map.has(colIdx)) map.set(colIdx, text);
                        if (colIdx >= 2 && text && !map.get(colIdx)) map.set(colIdx, text);
                    }
                }
                const sortedRowKeys = Array.from(rowMap.keys()).sort((a, b) => Number(a) - Number(b));
                for (const k of sortedRowKeys) {
                    const map = rowMap.get(k)!;
                    const row: any = { description: "", longDescription: "", mda: "", type: "", subtype: "", startDate: "", dueDate: "", sheRiskAtDueDate: "", finRiskAtDueDate: "", sheMRAtDueDate: "", finMRAtDueDate: "", finPof: "", mitigatedFinPof: "", finConsequence: "", mitigatedFinConsequence: "", inspectionType: "", inspectionStage: "" };
                    for (const [colIdx, txt] of map.entries()) {
                        const header = headerLabels[colIdx - 2] || "";
                        const H = header.toLowerCase();
                        if (H === "description") row.description = txt;
                        else if (H === "mda") row.mda = txt;
                        else if (H === "type") row.type = txt;
                        else if (H === "subtype") row.subtype = txt;
                        else if (H === "start date") row.startDate = txt;
                        else if (H === "due date") row.dueDate = txt;
                        else if (H === "she risk at due date") row.sheRiskAtDueDate = txt;
                        else if (H === "fin risk at due date") row.finRiskAtDueDate = txt;
                        else if (H === "she mr at due date") row.sheMRAtDueDate = txt;
                        else if (H === "fin mr at due date") row.finMRAtDueDate = txt;
                        else if (H === "fin pof") row.finPof = txt;
                        else if (H === "mitigated fin pof") row.mitigatedFinPof = txt;
                        else if (H === "fin consequence ($k)") row.finConsequence = txt;
                        else if (H === "mitigated fin consequence ($k)") row.mitigatedFinConsequence = txt;
                        else if (H === "inspection type") row.inspectionType = txt;
                        else if (H === "inspection stage") row.inspectionStage = txt;
                    }
                    if (row.description || row.type || row.startDate) rows.push(row);
                }
                return rows;
            };
            const readRiskInfo = (): Array<{ transition: string, lastTransitionDate: string, sheRisk: string, finRisk: string, finConsequence: string, finPof: string }> => {
                const out: Array<{ transition: string, lastTransitionDate: string, sheRisk: string, finRisk: string, finConsequence: string, finPof: string }> = [];
                const titleAnchors = Array.from(document.querySelectorAll<HTMLElement>("span[dir='auto']"));
                let riskTable: HTMLElement | null = null;
                for (const t of titleAnchors) {
                    if (norm(t.innerText || t.textContent || "") !== "Risk Information") continue;
                    let n: HTMLElement | null = t;
                    for (let i = 0; i < 20 && n; i++) {
                        const grid = n.querySelector<HTMLElement>("table[role='grid'][aria-colcount='6']");
                        if (grid) { riskTable = grid; break; }
                        n = n.parentElement;
                    }
                    if (riskTable) break;
                }
                if (!riskTable) return out;
                const bodyRows = Array.from(riskTable.querySelectorAll<HTMLElement>("tbody tr[role='row'][aria-rowindex]"));
                const subMap = new Map<string, HTMLElement>();
                const subRows = Array.from(riskTable.querySelectorAll<HTMLElement>("tbody tr[data-sap-ui-related]"));
                for (const sr of subRows) {
                    const rel = sr.getAttribute("data-sap-ui-related");
                    if (rel) subMap.set(rel, sr);
                }
                for (const tr of bodyRows) {
                    const rowIdx = tr.getAttribute("aria-rowindex") || "";
                    if (!rowIdx || rowIdx === "1") continue;
                    const trId = tr.id || "";
                    const cells = Array.from(tr.querySelectorAll<HTMLElement>("td[role='gridcell']"));
                    const getCellText = (colIdx: string): string => {
                        const c = cells.find(cell => cell.getAttribute("aria-colindex") === colIdx);
                        if (!c) return "";
                        const visSpans = Array.from(c.querySelectorAll<HTMLElement>("span[dir='auto']")).filter(s => {
                            const r = s.getBoundingClientRect();
                            const st = window.getComputedStyle(s);
                            if (r.width <= 0 && r.height <= 0) return false;
                            if (st.visibility === "hidden" || st.display === "none") return false;
                            if (s.getAttribute("aria-hidden") === "true") return false;
                            return !!norm(s.innerText || s.textContent || "");
                        });
                        return norm(visSpans[0]?.innerText || visSpans[0]?.textContent || "");
                    };
                    const getTagText = (colIdx: string): string => {
                        const c = cells.find(cell => cell.getAttribute("aria-colindex") === colIdx);
                        if (!c) return "";
                        const tag = c.querySelector<HTMLElement>("[role='button'][aria-roledescription='Object Tag'] span, [role='button'] span[class*='GenericTagText']");
                        return norm(tag?.innerText || tag?.textContent || "");
                    };
                    const transition = getCellText("2");
                    if (!transition) continue;
                    const lastTransitionDate = getCellText("3");
                    const sheRisk = getTagText("4");
                    const finRisk = getTagText("5");
                    let finConsequence = "";
                    let finPof = "";
                    const subRow = subMap.get(trId);
                    if (subRow) {
                        const finConsSpan = subRow.querySelector<HTMLElement>("span[title^='FIN Consequence']");
                        finConsequence = norm(finConsSpan?.innerText || finConsSpan?.textContent || "");
                        const finPofSpan = subRow.querySelector<HTMLElement>("span[title^='FIN POF']");
                        finPof = norm(finPofSpan?.innerText || finPofSpan?.textContent || "");
                    }
                    out.push({ transition, lastTransitionDate, sheRisk, finRisk, finConsequence, finPof });
                }
                return out;
            };

            return {
                failureEffects: readIdentifierTable(findPanelByTitlePrefix("Failure Effects")),
                failureMechanisms: readIdentifierTable(findPanelByTitlePrefix("Failure Mechanisms")),
                failureCauses: readIdentifierTable(findPanelByTitlePrefix("Causes")),
                failureScenario: readFailureScenario(),
                consequence: readConsequence(),
                strategies: readStrategies(),
                riskInfo: readRiskInfo()
            };
        });
        this.failureEffectsCaptured = captured?.failureEffects || [];
        this.failureMechanismsCaptured = captured?.failureMechanisms || [];
        this.failureCausesCaptured = captured?.failureCauses || [];
        this.failureScenarioTextCaptured = captured?.failureScenario || "";
        this.consequenceEvaluationCaptured = captured?.consequence || { typeOfFailure: "", failurePattern: "", safeLife: "", pfInterval: "" };
        this.failureStrategiesCaptured = captured?.strategies || [];
        this.riskInformationCaptured = captured?.riskInfo || [];
        console.log("Captured Failure Effects:", JSON.stringify(this.failureEffectsCaptured));
        console.log("Captured Failure Mechanisms:", JSON.stringify(this.failureMechanismsCaptured));
        console.log("Captured Failure Causes:", JSON.stringify(this.failureCausesCaptured));
        console.log("Captured Failure Scenario Description:", this.failureScenarioTextCaptured);
        console.log("Captured Consequence Evaluation:", JSON.stringify(this.consequenceEvaluationCaptured));
        console.log("Captured Failure Strategies:", JSON.stringify(this.failureStrategiesCaptured, null, 2));
        console.log("Captured Risk Information:", JSON.stringify(this.riskInformationCaptured, null, 2));
    }


    public async openFailureModeDetailHeader()
    {
        const isFunLoc = this.failureModeFunLoc === true;
        const failureModeText = isFunLoc ? this.failureModeValueFunLoc : this.failureMode;
        const nameOnly = failureModeText.split(' (')[0];
        const idOnly = failureModeText.match(/\((.*?)\)/)?.[1] || '';
        console.log(`Opening failure mode detail page for '${failureModeText}'...`);
        await utils.clickWithWait(this.failureModeRow(failureModeText));
        await browser.pause(5000);

        let isDisplayed = false;
        for (const el of await this.failureModeHeaders(nameOnly)) {
            if (await el.isDisplayed()) {
                isDisplayed = true;
                console.log("Displayed Failure Mode Header: " + await el.getText());
                break;
            }
        }
        await expect(isDisplayed).toBe(true);
        if (isFunLoc) {
            await browser.execute(() => window.scrollTo(0, 0));
        }
        await expect(this.failureModeId(idOnly)).toBeDisplayed();
    }

    public async openAnalysisDetailsSection()
    {
        for (const el of await this.analysisDetailsSections) {
            if (await el.isDisplayed() && await el.isClickable()) {
                await utils.clickWithWait(el);
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(2000);
                break;
            }
        }
    }

    public async assignFailureEffects()
    {
        console.log("--- Failure Effects ---");
        let txt = await this.failureEffectsText.getText();
        console.log("Failure Effects before: " + await utils.getAssignedValue(txt));
        await utils.clickWithWait(this.failureEffectsAssignBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        await expect(this.assignFailureEffectsHeader).toBeDisplayed();

        const count = await utils.getAssignedValue(await this.failureEffectsCountText.getText());
        if (count === 0) {
            await utils.clickWithWait(this.cancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        } else {
            const val = await this.failureEffectsValue.getText();
            console.log("Failure effect selected :" + val);
            await utils.clickWithWait(this.failureEffectsCheckbox);
            await utils.clickWithWait(this.assignBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }
        txt = await this.failureEffectsText.getText();
        console.log("Failure Effects after: " + await utils.getAssignedValue(txt));
    }

    public async editFailureScenario()
    {
        console.log("--- Failure Scenario ---");
        await utils.clickWithWait(this.failureScenarioEditBtn);
        await this.failureScenarioTextarea.setValue("Test Scenario");
        await utils.clickWithWait(this.failureScenarioSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait(this.okBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
    }

    public async assignFailureMechanism()
    {
        console.log("--- Failure Mechanisms ---");
        let txt = await this.failureMechanismText.getText();
        console.log("Failure Mechanisms before: " + await utils.getAssignedValue(txt));
        await utils.clickWithWait(this.failureMechanismAssignBtn);
        await expect(this.assignFailureMechanismHeader).toBeDisplayed();
        const count = await utils.getAssignedValue(await this.failureMechanismCountText.getText());
        if (count === 0) {
            await utils.clickWithWait(this.cancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        } else {
            await utils.clickWithWait(this.failureMechanismCheckbox);
            const failVal = await this.failureMechanismValue.getText();
            console.log("Failure value selected :", failVal);
            await utils.clickWithWait(this.assignBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }
        txt = await this.failureMechanismText.getText();
        console.log("Failure Mechanisms after: " + await utils.getAssignedValue(txt));
    }

    public async performConsequenceEvaluation()
    {
        console.log("--- Consequence Evaluation ---");
        await utils.clickWithWait(this.consequencePerformBtn);
        await browser.pause(2000);
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
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
    }

    public async addFailureModeNote()
    {
        console.log("--- Failure Mode Notes (5001-char limit check) ---");
        const notesBtn = this.failureModeNotesBtn;
        const visible = await notesBtn.isDisplayed().catch(() => false);
        if (!visible) {
            const failure = "Failure Mode detail-page 'Notes' button is not visible - skipping.";
            console.log(failure);
            this.analysisFailures.push(failure);
            return;
        }

        await utils.clickWithWait(notesBtn);
        await browser.pause(1500);
        await this.notesTextarea.waitForDisplayed({ timeout: 30000 });

        const longText = "A".repeat(5001);
        console.log(`Sending ${longText.length} characters into Failure Mode Notes textarea...`);
        await this.notesTextarea.click();
        await this.notesTextarea.clearValue();
        await this.notesTextarea.setValue(longText);
        await browser.pause(500);

        const actualValue = (await this.notesTextarea.getValue()) || "";
        console.log(`Failure Mode Notes textarea actually accepted ${actualValue.length} characters.`);

        const limitCheck = `Failure Mode Notes textarea must enforce 5000-char limit (typed 5001, accepted ${actualValue.length})`;
        if (actualValue.length === 5000) {
            console.log(`PASS: ${limitCheck}`);
        } else {
            const failure = `FAIL: ${limitCheck}`;
            console.log(failure);
            this.analysisFailures.push(failure);
        }

        console.log("Clicking 'Save' on Failure Mode Notes popover...");
        await utils.clickWithWait(this.notesSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        await browser.waitUntil(
            async () =>
                (await this.okBtn.isDisplayed().catch(() => false)) ||
                (await this.errorDialogHeader.isDisplayed().catch(() => false)) ||
                !(await this.notesTextarea.isDisplayed().catch(() => false)),
            { timeout: 30000, interval: 500, timeoutMsg: "No response after saving Failure Mode Notes" }
        );

        if (await this.errorDialogHeader.isDisplayed().catch(() => false)) {
            const failure = "Saving Failure Mode Note returned an Error popup - dismissing and continuing.";
            console.log(failure);
            this.analysisFailures.push(failure);
            if (await this.errorDialogOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.errorDialogOkBtn);
            }
            await utils.waitForBusyIndicatorToDisappear();
            if (await this.notesCloseBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.notesCloseBtn);
            }
        } else if (await this.okBtn.isDisplayed().catch(() => false)) {
            console.log("Failure Mode Note saved successfully - clicking OK.");
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
        } else {
            console.log("Failure Mode Notes popover closed without explicit Success/Error popup.");
        }
        await browser.pause(1500);
    }

    public async addConsequenceNote()
    {
        console.log("--- Consequence Notes (501-char limit check) ---");
        const notesBtn = this.consequenceNotesBtn;
        const visible = await notesBtn.isDisplayed().catch(() => false);
        if (!visible) {
            const failure = "Consequence Evaluation 'Notes' button is not visible - cannot add note.";
            console.log(failure);
            this.analysisFailures.push(failure);
            return;
        }

        await utils.clickWithWait(notesBtn);
        await browser.pause(1500);
        await this.notesTextarea.waitForDisplayed({ timeout: 30000 });

        const longText = "A".repeat(501);
        console.log(`Sending ${longText.length} characters into the Notes textarea...`);
        await this.notesTextarea.click();
        await this.notesTextarea.clearValue();
        await this.notesTextarea.setValue(longText);
        await browser.pause(500);

        const actualValue = (await this.notesTextarea.getValue()) || "";
        console.log(`Notes textarea actually accepted ${actualValue.length} characters.`);

        const limitCheck = `Notes textarea must enforce 500-char limit (typed 501, accepted ${actualValue.length})`;
        if (actualValue.length === 500) {
            console.log(`PASS: ${limitCheck}`);
        } else {
            const failure = `FAIL: ${limitCheck}`;
            console.log(failure);
            this.analysisFailures.push(failure);
        }

        console.log("Clicking 'Save' on Notes popover...");
        await utils.clickWithWait(this.notesSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        await browser.waitUntil(
            async () =>
                (await this.okBtn.isDisplayed().catch(() => false)) ||
                (await this.errorDialogHeader.isDisplayed().catch(() => false)) ||
                !(await this.notesTextarea.isDisplayed().catch(() => false)),
            { timeout: 30000, interval: 500, timeoutMsg: "No response after saving Notes" }
        );

        if (await this.errorDialogHeader.isDisplayed().catch(() => false)) {
            const failure = "Saving Consequence Note returned an Error popup - dismissing and continuing.";
            console.log(failure);
            this.analysisFailures.push(failure);
            if (await this.errorDialogOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.errorDialogOkBtn);
            }
            await utils.waitForBusyIndicatorToDisappear();
            if (await this.notesCloseBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.notesCloseBtn);
            }
        } else if (await this.okBtn.isDisplayed().catch(() => false)) {
            console.log("Consequence Note saved successfully - clicking OK.");
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
        } else {
            console.log("Notes popover closed without explicit Success/Error popup.");
        }
        await browser.pause(1500);
    }

    public async assignCauses()
    {
        console.log("--- Causes ---");
        let txt = await this.causesText.getText();
        console.log("Causes before: " + await utils.getAssignedValue(txt));
        await utils.clickWithWait(this.causesAssignBtn);
        await expect(this.assignCausesHeader).toBeDisplayed();
        const count = await utils.getAssignedValue(await this.causesCountText.getText());
        if (count === 0) {
            await utils.clickWithWait(this.cancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        } else {
            const causesVal = await this.causesValue.getText();
            console.log("Choosing : " + causesVal);
            await utils.clickWithWait(this.causesCheckbox);
            await utils.clickWithWait(this.assignBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }
        txt = await this.causesText.getText();
        console.log("Causes after: " + await utils.getAssignedValue(txt));
    }

    public async createEditStrategy()
    {
        await this.createStrategy();
        await this.editStrategies();
    }

    public async createStrategy()
    {
        console.log("Creating strategy for failure mode...");
        const alreadyAssignedStrategies = await this.strategiesTexts;
        for(const strategy of alreadyAssignedStrategies){
            const text = await strategy.getText();
            console.log("Already assigned strategy: "+await utils.getAssignedValue(text));
        }
        console.log("Creating 3 strategies for failure mode...");
        this.createdStrategies = [];
        for (let i = 1; i <= 3; i++) {
            await utils.clickWithWait(this.strategiesCreateBtn);
            await expect(this.createStrategyHeader).toBeDisplayed();
            await browser.pause(2000);
            const strategyDesc = `Strategies for RCM Automation ${i}`;
            const strategyLongDesc = `Test Long Desc ${i}`;
            await this.strategyDescInput.click();
            await browser.waitUntil(
                async () => await this.strategyDescInput.isEnabled(),
                { timeout: 5000 }
            );
            await this.strategyDescInput.clearValue();
            await this.strategyDescInput.setValue(strategyDesc);
            console.log("After setValue:", await this.strategyDescInput.getValue());
            await utils.setValueWithWait(this.strategyLongDesc,strategyLongDesc,1500);
            await browser.execute((el, value) => {
                const input = el.tagName === 'INPUT' ? el : el.querySelector('input');
                if (input) {
                    const inp = input as HTMLInputElement;
                    inp.focus();
                    inp.value = value;
                    inp.dispatchEvent(new Event('input', { bubbles: true }));
                    inp.dispatchEvent(new Event('change', { bubbles: true }));
                    inp.dispatchEvent(new Event('blur', { bubbles: true }));
                }
            }, await this.strategyDescInput, strategyDesc);
            await utils.clickWithWait(this.strategyTypeDropdown,1500);
            await browser.keys("ArrowDown");
            await browser.keys("Enter");

            await utils.clickWithWait(this.strategyInspTypDrp,1500);
            await browser.keys("ArrowDown");
            await browser.keys("Enter");

            await utils.clickWithWait(this.strategyInspStageDrp,1500);
            await browser.keys("ArrowDown");
            await browser.keys("Enter");

            await browser.pause(1000);

            const strategyType =
                (await $("//bdi[normalize-space()='Type']/following::input[1]").getValue()).trim();

            const inspectionType =
                (await $("//bdi[normalize-space()='Inspection Type']/following::input[1]").getValue()).trim();

            const inspectionStage =
                (await $("//bdi[normalize-space()='Inspection Stage']/following::input[1]").getValue()).trim();

            console.log("Selected strategy type: " + strategyType);
            console.log("Selected inspection type: " + inspectionType);
            console.log("Selected inspection stage: " + inspectionStage);
            await utils.clickWithWait(this.MDAwindowBtn,1500);
            await utils.waitForBusyIndicatorToDisappear();
            await this.MDAheader.waitForDisplayed();
            console.log("MDA window opened");
            await utils.clickWithWait(this.MDAcheckbox,1500);
            await utils.clickWithWait(this.saveMDABtn,1500);
            console.log("MDA value selected and saved");
            await utils.waitForBusyIndicatorToDisappear();
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            const format = (d: Date): string =>
                d.toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                });
            console.log("Formatted dates");
            const startDate = format(today);
            const dueDate = format(tomorrow);
            console.log("Start Date: " + startDate);
            console.log("Due Date: " + dueDate);
            await this.strategyStartDate.setValue(startDate);
            await this.strategyDueDate.setValue(dueDate);
            console.log("Start and Due dates set");
            const sheMR =
                assetRcmData.mrvalues[Math.floor(Math.random() * assetRcmData.mrvalues.length)];
            const finMR =
                assetRcmData.mrvalues[Math.floor(Math.random() * assetRcmData.mrvalues.length)];
            const mitigatedRisk =
                (Math.floor(Math.random() * (1000000 - 400000 + 1)) + 400000).toString();
            const mitigatedPOF =
                (Math.random()).toFixed(2);
            console.log("Risk and MR values generated");
            await utils.setValueWithWait(this.sheMRvalues, sheMR);
            await utils.setValueWithWait(this.finMRvalues, finMR);
            await utils.setValueWithWait(this.mitigatedRiskValue, mitigatedRisk);
            await utils.setValueWithWait(this.mitigatedPofValue, mitigatedPOF);
            console.log("Risk and MR values set in the form");
            this.createdStrategies.push({
                description: strategyDesc,
                longDescription: strategyLongDesc,
                strategyType,
                inspectionType,
                inspectionStage,
                startDate,
                dueDate,
                sheMR,
                finMR,
                mitigatedRisk,
                mitigatedPOF
            });
            await utils.clickWithWait(this.strategyCreateBtn,1500);
            console.log("Strategy creation button clicked");
            await utils.waitForBusyIndicatorToDisappear();
            console.log(`Strategy ${i} created`);
        }
        console.log("Created Strategies:");
        console.log(JSON.stringify(this.createdStrategies, null, 2));
    }

    public async editStrategies()
    {
        await this.editStrategy();
        await this.editAllStrategies();
    }

    public async editStrategy()
    {
        console.log("Editing the first strategy...");
        for (const btn of await this.strategyFirstRow(this.createdStrategies[0].description))
        {
            if (await btn.isDisplayed() && await btn.isClickable())
            {
                await utils.clickWithWait(btn,1500);
                await browser.pause(2500);
                break;
            }
        }
        await utils.clickWithWait(this.strategyEditBtn,1500);
        await browser.pause(3000);
        const newDescription = `${this.createdStrategies[0].description} - Edited`;
        await utils.setValueWithWait(this.strategyDescInput, newDescription);
        let strategySaveClicked = false;
        for (const btn of await this.strategySaveBtn) {
            if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                await utils.clickWithWait(btn, 1500);
                strategySaveClicked = true;
                break;
            }
        }
        if (!strategySaveClicked) {
            throw new AssertionError({ message: "AssertionError: Strategy Save button not visible/clickable" });
        }
        await utils.waitForBusyIndicatorToDisappear();
        this.createdStrategies[0].description = newDescription;
        console.log("Updated Strategy:");
        await utils.clickSuccessOkButton();
        console.log(JSON.stringify(this.createdStrategies[0], null, 2));
    }

    public async editAllStrategies()
    {
        console.log("Editing all strategies...");
        const checkboxes = await this.selectAllStrategyCheckbox;
        for (const checkbox of checkboxes) {
            const displayed = await checkbox.isDisplayed().catch(() => false);
            const clickable = await checkbox.isClickable().catch(() => false);
            if (displayed && clickable) {
                await utils.clickWithWait(checkbox);
                break;
            }
        }
        await utils.clickWithWait(this.strategyEditBtn, 1500);
        await $("//h1[.//text()='Edit Strategy']").waitForDisplayed({
            timeout: 30000
        });
        console.log("Edit Strategy page opened for all strategies");
        console.log("Capturing common values for all strategies...");
        const getValue = async (xpath: string): Promise<string> => {
            const el = await $(xpath);
            await el.waitForExist({ timeout: 5000 });
            const tagName = await el.getTagName();
            if (tagName === "input" || tagName === "textarea") {
                return ((await el.getValue()) || "").trim();
            }
            const valueAttr = await el.getAttribute("value");
            if (valueAttr) {
                return valueAttr.trim();
            }
            return ((await el.getText()) || "").trim();
        };
        this.commonStrategyValues = {
            description: await getValue("//bdi[normalize-space()='Description']/following::textarea[1]"),
            longDescription: await getValue("//bdi[normalize-space()='Long Description']/following::textarea[1]"),
            type: await getValue("//bdi[normalize-space()='Type']/following::input[1]"),
            inspectionType: await getValue("//bdi[normalize-space()='Inspection Type']/following::input[1]"),
            inspectionStage: await getValue("//bdi[normalize-space()='Inspection Stage']/following::input[1]"),
            startDate: await getValue("//bdi[normalize-space()='Start Date']/following::input[1]"),
            dueDate: await getValue("//bdi[normalize-space()='Due Date']/following::input[1]"),
            sheMR: await getValue("//bdi[normalize-space()='SHE MR at Due Date']/following::input[1]"),
            finMR: await getValue("//bdi[normalize-space()='FIN MR at Due Date']/following::input[1]"),
            mitigatedRisk: await getValue("//bdi[normalize-space()='Mitigated FIN Consequence ($K)']/following::input[1]"),
            mitigatedPOF: await getValue("//bdi[normalize-space()='Mitigated FIN POF']/following::input[1]")
        };

        console.log("Common Values Captured for Edit All Strategies:");
        console.log(JSON.stringify(this.commonStrategyValues, null, 2));
        const failures: string[] = [];
        const verifyCommon = (field: string, actual: string, values: string[]) => {
            const unique = [...new Set(values.map(v => (v || "").trim()))];
            if (unique.length === 1) {
                if ((actual || "").trim() !== unique[0]) {
                    failures.push(
                        `${field} should be "${unique[0]}" but found "${actual}"`
                    );
                }
            } else {
                if ((actual || "").trim() !== "") {
                    failures.push(
                        `${field} should be blank because strategies have different values. Found "${actual}"`
                    );
                }
            }
        };
        console.log("Verifying common values across all strategies...");
        verifyCommon(
            "Description",
            this.commonStrategyValues.description,
            this.createdStrategies.map(x => x.description)
        );

        verifyCommon(
            "Long Description",
            this.commonStrategyValues.longDescription,
            this.createdStrategies.map(x => x.longDescription)
        );
        verifyCommon(
            "Type",
            this.commonStrategyValues.type,
            this.createdStrategies.map(x => x.strategyType)
        );
        verifyCommon(
            "Inspection Type",
            this.commonStrategyValues.inspectionType,
            this.createdStrategies.map(x => x.inspectionType)
        );
        verifyCommon(
            "Inspection Stage",
            this.commonStrategyValues.inspectionStage,
            this.createdStrategies.map(x => x.inspectionStage)
        );
        verifyCommon(
            "Start Date",
            this.commonStrategyValues.startDate,
            this.createdStrategies.map(x => x.startDate)
        );
        verifyCommon(
            "Due Date",
            this.commonStrategyValues.dueDate,
            this.createdStrategies.map(x => x.dueDate)
        );
        verifyCommon(
            "SHE MR",
            this.commonStrategyValues.sheMR,
            this.createdStrategies.map(x => x.sheMR)
        );
        verifyCommon(
            "FIN MR",
            this.commonStrategyValues.finMR,
            this.createdStrategies.map(x => x.finMR)
        );
        if (failures.length > 0) {
            throw new AssertionError({ message: 
                `Edit All Strategies Validation Failed\n\n${failures.join("\n")}`
             });
        }
        if(failures.length === 0){
            console.log("Only common values are getting reflected. Hence, All the checks passed")
        }
        console.log("Editing All the Strategies....");
        await utils.setValueWithWait(this.strategyDescInput, "Edited All Strategies", 1500);
        let strategySaveAllClicked = false;
        for (const btn of await this.strategySaveBtn) {
            if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                await utils.clickWithWait(btn, 1500);
                strategySaveAllClicked = true;
                break;
            }
        }
        if (!strategySaveAllClicked) {
            throw new AssertionError({ message: "AssertionError: Edit-All Strategies Save button not visible/clickable" });
        }
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        const expectedDescription = "Edited All Strategies";
        const descriptions = await $$("//table[contains(@id,'table-fixed')]//div[@role='heading']/following-sibling::div//span");
        const visibleDescriptions = [];
        for (const description of descriptions) {
            if (await description.isDisplayed()) {
                visibleDescriptions.push(description);
            }
        }
        for (const description of visibleDescriptions) {
            await expect(description).toHaveText(expectedDescription);
        }
        console.log("Verification done for all the edited startegies");
    }

    private extractBaseFromTransition(transitionText: string): string {
        const t = (transitionText || "").trim();
        if (!t) return "";
        const m = t.match(/[A-Za-z]/);
        return m ? m[0].toUpperCase() : "";
    }

    private async clickHeaderActionWithOverflowFallback(labelText: string): Promise<boolean> {
        const directSelectors = [
            `//button[.//bdi[normalize-space()="${labelText}"]]`,
            `//button[.//text()="${labelText}"]`,
            `//button[normalize-space()="${labelText}"]`
        ];
        for (const sel of directSelectors) {
            const cands = await $$(sel);
            for (const btn of cands) {
                if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                    try {
                        await utils.clickWithWait(btn);
                        console.log(`Clicked '${labelText}' directly via: ${sel}`);
                        await browser.pause(800);
                        return true;
                    } catch { /* try next */ }
                }
            }
        }
        console.log(`'${labelText}' not directly clickable - trying 'Additional Options' overflow buttons...`);
        const overflowBtns = await $$("//button[@aria-label='Additional Options' or @title='Additional Options']");
        for (const ovBtn of overflowBtns) {
            if (!(await ovBtn.isDisplayed().catch(() => false)) || !(await ovBtn.isClickable().catch(() => false))) continue;
            try {
                await utils.clickWithWait(ovBtn);
            } catch {
                try { await browser.execute((n: HTMLElement) => n.click(), await ovBtn); } catch { continue; }
            }
            await browser.pause(1200);
            const menuItemSelectors = [
                `//li[@role='menuitem' or @role='menuitemradio' or @role='menuitemcheckbox'][.//bdi[normalize-space()="${labelText}"]]`,
                `//li[@role='menuitem' or @role='menuitemradio' or @role='menuitemcheckbox'][normalize-space()="${labelText}"]`,
                `//div[@role='menuitem' or @role='menuitemradio' or @role='menuitemcheckbox'][normalize-space()="${labelText}"]`,
                `//*[@role='menuitem' or @role='menuitemradio' or @role='menuitemcheckbox'][.//span[normalize-space()="${labelText}"]]`,
                `//li[.//bdi[normalize-space()="${labelText}"]]`,
                `//bdi[normalize-space()="${labelText}"]/ancestor::li[1]`
            ];
            for (const mSel of menuItemSelectors) {
                const items = await $$(mSel);
                for (const item of items) {
                    if (!(await item.isDisplayed().catch(() => false))) continue;
                    try {
                        await utils.clickWithWait(item);
                        console.log(`Clicked '${labelText}' via overflow menu selector: ${mSel}`);
                        await browser.pause(800);
                        return true;
                    } catch {
                        try {
                            await browser.execute((n: HTMLElement) => n.click(), await item);
                            console.log(`Clicked '${labelText}' via overflow menu (JS click) selector: ${mSel}`);
                            await browser.pause(800);
                            return true;
                        } catch { /* try next */ }
                    }
                }
            }
            console.log(`Opened overflow but '${labelText}' menu item not found; trying next overflow button if any`);
        }
        return false;
    }

    private async closeTopMostDetailPanel(panelTitle?: string): Promise<boolean> {
        const anchoredToolbar = "//div[@role='toolbar' and @aria-roledescription='Overflow Toolbar'][.//button[@aria-label='Enter Full Screen Mode' or @aria-label='Exit Full Screen Mode']]";
        const candidateSelectors: string[] = [];
        if (panelTitle) {
            candidateSelectors.push(
                `//*[self::span or self::bdi or self::div or self::h1 or self::h2][normalize-space()="${panelTitle}"]/ancestor::*[.//div[@role='toolbar' and @aria-roledescription='Overflow Toolbar'][.//button[@aria-label='Enter Full Screen Mode' or @aria-label='Exit Full Screen Mode']]][1]${anchoredToolbar}//button[@aria-label='Decline']`
            );
        }
        candidateSelectors.push(`${anchoredToolbar}//button[@aria-label='Decline']`);

        for (const sel of candidateSelectors) {
            const cands = Array.from(await $$(sel));
            for (let i = cands.length - 1; i >= 0; i--) {
                const btn = cands[i];
                if (!(await btn.isDisplayed().catch(() => false))) continue;
                if (!(await btn.isClickable().catch(() => false))) continue;
                try { await btn.scrollIntoView({ block: "center" }); } catch { /* ignore */ }
                try {
                    await utils.clickWithWait(btn);
                } catch {
                    try { await browser.execute((n: HTMLElement) => n.click(), await btn); } catch { continue; }
                }
                await browser.pause(1200);
                const confirmDialog = $("//header[.//text()='Confirmation'][.//following::span[contains(normalize-space(),'Removing the selected technical object(s)')]] | //div[@role='dialog'][.//text()='Confirmation'][.//span[contains(normalize-space(),'Removing the selected technical object(s)')]]");
                if (await confirmDialog.isDisplayed().catch(() => false)) {
                    console.log("WARNING: Wrong Decline clicked → 'Removing technical object(s)' confirmation appeared. Clicking 'No' to abort.");
                    const noBtn = $("//header[.//text()='Confirmation']/following::button[.//bdi[normalize-space()='No'] or .//text()='No']");
                    if (await noBtn.isDisplayed().catch(() => false)) {
                        try { await utils.clickWithWait(noBtn); } catch { /* ignore */ }
                        await browser.pause(800);
                    }
                    continue;
                }
                console.log(`Closed panel via selector: ${sel} (candidate index ${i} of ${cands.length})`);
                return true;
            }
        }
        return false;
    }

    private async setFinConsequenceForRow(base: string, value: string, fallbackEls: any): Promise<boolean> {
        const candidates: any[] = [];
        if (base) {
            const dynamicXpath = `//div[@title="FIN Consequence ($K) at Base ${base}"]//input`;
            console.log(`FIN Consequence: collecting dynamic xpath -> ${dynamicXpath}`);
            try {
                const dynamicEls = await $$(dynamicXpath);
                for (const el of dynamicEls) candidates.push({ el, source: `dynamic Base ${base}` });
            } catch { /* ignore */ }
        }
        console.log("FIN Consequence: collecting fallback xpath");
        try {
            const resolved = await fallbackEls;
            if (resolved && typeof (resolved as any)[Symbol.iterator] === "function") {
                for (const el of resolved) candidates.push({ el, source: "fallback (array)" });
            } else if (resolved) {
                candidates.push({ el: resolved, source: "fallback (single)" });
            }
        } catch { /* ignore */ }

        for (const c of candidates) {
            const visible = await c.el.isDisplayed().catch(() => false);
            const clickable = await c.el.isClickable().catch(() => false);
            if (visible && clickable) {
                await utils.setValueWithWait(c.el, value);
                console.log(`FIN Consequence: set via ${c.source}`);
                return true;
            }
        }
        console.log(`FIN Consequence: no visible/clickable input from ${candidates.length} candidate(s)`);
        return false;
    }

    private async setFinPofForRow(base: string, value: string, fallbackEls: any): Promise<boolean> {
        const candidates: any[] = [];
        if (base) {
            const dynamicXpath = `//div[@title="FIN POF at Base ${base}"]//input`;
            console.log(`FIN POF: collecting dynamic xpath -> ${dynamicXpath}`);
            try {
                const dynamicEls = await $$(dynamicXpath);
                for (const el of dynamicEls) candidates.push({ el, source: `dynamic Base ${base}` });
            } catch { /* ignore */ }
        }
        console.log("FIN POF: collecting fallback xpath");
        try {
            const resolved = await fallbackEls;
            if (resolved && typeof (resolved as any)[Symbol.iterator] === "function") {
                for (const el of resolved) candidates.push({ el, source: "fallback (array)" });
            } else if (resolved) {
                candidates.push({ el: resolved, source: "fallback (single)" });
            }
        } catch { /* ignore */ }

        for (const c of candidates) {
            const visible = await c.el.isDisplayed().catch(() => false);
            const clickable = await c.el.isClickable().catch(() => false);
            if (visible && clickable) {
                await utils.setValueWithWait(c.el, value);
                console.log(`FIN POF: set via ${c.source}`);
                return true;
            }
        }
        console.log(`FIN POF: no visible/clickable input from ${candidates.length} candidate(s)`);
        return false;
    }

    public async verifyRiskInfoDetails()
    {
        console.log("Handle Risk Information starts...");
        for (const el of await this.riskInformationSections) {
            if (await el.isDisplayed()) {
                await utils.clickWithWait(el,1500);
                await browser.pause(1000);
                break;
            }
        }
        await this.riskSearchInput.waitForClickable({ timeout: 60000 });
        await utils.clickWithWait(this.editRiskBtn,1500);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        const format = (d: Date): string => d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        const today = new Date();

        const t1 = await this.transitionTextRow1.getText();
        const base1 = this.extractBaseFromTransition(t1);
        console.log(`Editing Transition '${t1}' (Base '${base1}')`);
        await utils.setValueWithWait(this.lastTransitionDateRow1, format(today));
        const getRandomRisk1 = () => assetRcmData.riskValues[Math.floor(Math.random() * assetRcmData.riskValues.length)];
        await utils.setValueWithWait(this.sheRiskDropdownRow1, getRandomRisk1());
        await browser.pause(2000);
        await utils.setValueWithWait(this.finRiskDropdownRow1, getRandomRisk1());
        await browser.pause(2000);
        await this.setFinConsequenceForRow(base1, (Math.floor(Math.random() * (9999999 - 500000 + 1)) + 500000).toString(), this.finConsequenceRow1);
        await browser.pause(2000);
        await this.setFinPofForRow(base1, (Math.random()).toFixed(2), this.finPofRow1);
        await browser.pause(2000);

        const t2 = await this.transitionTextRow2.getText();
        const base2 = this.extractBaseFromTransition(t2);
        console.log(`Editing Transition '${t2}' (Base '${base2}')`);
        await utils.setValueWithWait(this.lastTransitionDateRow2, format(today));
        await browser.pause(2000);
        const getRandomRisk2 = () => assetRcmData.riskValues[Math.floor(Math.random() * assetRcmData.riskValues.length)];
        await utils.setValueWithWait(this.sheRiskDropdownRow2, getRandomRisk2());
        await browser.pause(2000);
        await utils.setValueWithWait(this.finRiskDropdownRow2, getRandomRisk2());
        await browser.pause(2000);
        await this.setFinConsequenceForRow(base2, (Math.floor(Math.random() * (9999999 - 500000 + 1)) + 500000).toString(), this.finConsequenceRow2);
        await browser.pause(2000);
        await this.setFinPofForRow(base2, (Math.random()).toFixed(2), this.finPofRow2);

        const t3 = await this.transitionTextRow3.getText();
        const base3 = this.extractBaseFromTransition(t3);
        console.log(`Editing Transition '${t3}' (Base '${base3}')`);
        await utils.setValueWithWait(this.lastTransitionDateRow3, format(today));
        await browser.pause(2000);
        const getRandomRisk3 = () => assetRcmData.riskValues[Math.floor(Math.random() * assetRcmData.riskValues.length)];
        await utils.setValueWithWait(this.sheRiskDropdownRow3, getRandomRisk3());
        await browser.pause(2000);
        await utils.setValueWithWait(this.finRiskDropdownRow3, getRandomRisk3());
        await browser.pause(2000);
        await this.setFinConsequenceForRow(base3, (Math.floor(Math.random() * (9999999 - 500000 + 1)) + 500000).toString(), this.finConsequenceRow3);
        await browser.pause(2000);
        await this.setFinPofForRow(base3, (Math.random()).toFixed(2), this.finPofRow3);

        const t4 = await this.transitionTextRow4.getText();
        const base4 = this.extractBaseFromTransition(t4);
        console.log(`Editing Transition '${t4}' (Base '${base4}')`);
        await utils.setValueWithWait(this.lastTransitionDateRow4, format(today));
        await browser.pause(2000);
        const getRandomRisk4 = () => assetRcmData.riskValues[Math.floor(Math.random() * assetRcmData.riskValues.length)];
        await utils.setValueWithWait(this.sheRiskDropdownRow4, getRandomRisk4());
        await browser.pause(2000);
        await utils.setValueWithWait(this.finRiskDropdownRow4, getRandomRisk4());
        await browser.pause(2000);
        await this.setFinConsequenceForRow(base4, (Math.floor(Math.random() * (9999999 - 500000 + 1)) + 500000).toString(), this.finConsequenceRow4);
        await browser.pause(2000);
        await this.setFinPofForRow(base4, (Math.random()).toFixed(2), this.finPofRow4);

        // try {
        //     const t5 = await this.transitionTextRow5.getText();
        //     console.log("Editing Transition " + t5);
        //     await utils.setValueWithWait(this.lastTransitionDateRow5, format(today));
        //     await browser.pause(2000);
        //     const getRandomRisk5 = () => assetRcmData.riskValues[Math.floor(Math.random() * assetRcmData.riskValues.length)];
        //     await utils.setValueWithWait(this.sheRiskDropdownRow5, getRandomRisk5());
        //     await browser.pause(2000);
        //     await utils.setValueWithWait(this.finRiskDropdownRow5, getRandomRisk5());
        //     await browser.pause(2000);
        //     await utils.setValueWithWait(this.finConsequenceRow5, (Math.floor(Math.random() * (1000000 - 400000 + 1)) + 400000).toString());
        //     await browser.pause(2000);
        //     for (const el of await this.finPofRow5) {
        //         if (await el.isDisplayed().catch(() => false) && await el.isClickable().catch(() => false)) {
        //             await utils.setValueWithWait(el, (Math.random()).toFixed(2));
        //             break;
        //         }
        //     }
        // } catch (e) {
        //     console.log("Row 5 not present or not editable: " + (e as Error).message);
        // }

        console.log("Clicking 'Save' on Risk Information panel toolbar after editing all 4 rows...");
        const riskInfoSaveSelectors = [
            "//div[@role='toolbar'][.//span[@dir='auto' and normalize-space()='Risk Information']]//button[.//bdi[normalize-space()='Save']]",
            "//div[@aria-roledescription='Overflow Toolbar'][.//span[@dir='auto' and normalize-space()='Risk Information']]//button[.//bdi[normalize-space()='Save']]",
            "//span[@dir='auto' and normalize-space()='Risk Information']/ancestor::div[@role='toolbar' or @aria-roledescription='Overflow Toolbar'][1]//button[.//bdi[normalize-space()='Save']]",
            "//span[@dir='auto' and normalize-space()='Risk Information']/ancestor::*[.//button[@title='Save' or .//bdi[normalize-space()='Save']]][1]//button[@title='Save' or .//bdi[normalize-space()='Save']]"
        ];
        let riskSaveClicked = false;
        for (const sel of riskInfoSaveSelectors) {
            const cands = await $$(sel);
            for (const btn of cands) {
                if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                    try {
                        await utils.clickWithWait(btn);
                        console.log(`Risk Information: clicked Save via ${sel}`);
                        riskSaveClicked = true;
                        break;
                    } catch { /* try next candidate/selector */ }
                }
            }
            if (riskSaveClicked) break;
        }
        if (!riskSaveClicked) {
            console.log("Risk Information: scoped Save not found; falling back to generic saveRiskBtn");
            await utils.clickWithWait(this.saveRiskBtn);
        }
        await browser.pause(1500);
        console.log("Handle Risk Information ends");
    }

    public async verifyTechnicalObjectRiskInfo()
    {
        console.log("Reading Risk Information section on Technical Object detail page (read-only)...");
        try {
            const titleEls = await $$("//div[@role='heading']//span[contains(text(),'Risk Information')]");
            for (const el of titleEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    console.log(`Risk Information title: '${(await el.getText()).trim()}'`);
                    break;
                }
            }
        } catch (e) { void e; }

        try {
            const expandBtn = await $("//span[contains(text(),'Risk Information')]/ancestor::div[.//button[@aria-label='Expand/Collapse']][1]//button[@aria-label='Expand/Collapse']");
            if (await expandBtn.isDisplayed().catch(() => false)) {
                const expanded = await expandBtn.getAttribute("aria-expanded").catch(() => "false");
                if (expanded !== "true") {
                    await utils.clickWithWait(expandBtn);
                    await browser.pause(1500);
                    console.log("Expanded Risk Information panel");
                } else {
                    console.log("Risk Information panel already expanded");
                }
            } else {
                console.log("Risk Information expand button not visible; assuming panel already open");
            }
        } catch (e) {
            console.log(`Could not expand Risk Information panel: ${(e as Error).message}`);
        }

        try {
            const result = await browser.execute(() => {
                const norm = (t: string | null | undefined) => (t || "").replace(/\s+/g, " ").trim();
                const grids = Array.from(document.querySelectorAll<HTMLElement>("[role='treegrid']"));
                let target: HTMLElement | null = null;
                for (const g of grids) {
                    const cc = g.getAttribute("aria-colcount");
                    if (cc === "26") { target = g; break; }
                }
                if (!target) return { headers: [] as string[], rows: [] as Array<{ rowIndex: string, values: Array<{ col: string, text: string }> }> };

                const headerBdis = Array.from(target.querySelectorAll<HTMLElement>("thead td[role='columnheader'] bdi"));
                const headers = headerBdis.map(b => norm(b.innerText || b.textContent));

                const dataRows = Array.from(target.querySelectorAll<HTMLElement>("tr[role='row']"));
                const rowMap = new Map<string, Array<{ col: string, text: string }>>();
                for (const tr of dataRows) {
                    const rowIdx = tr.getAttribute("aria-rowindex");
                    if (!rowIdx || rowIdx === "1") continue;
                    const cells = Array.from(tr.querySelectorAll<HTMLElement>("td[role='gridcell']"));
                    const values: Array<{ col: string, text: string }> = cells.map(td => ({
                        col: td.getAttribute("aria-colindex") || "",
                        text: norm(td.innerText || td.textContent)
                    }));
                    const existing = rowMap.get(rowIdx) || [];
                    rowMap.set(rowIdx, existing.concat(values));
                }
                const rows: Array<{ rowIndex: string, values: Array<{ col: string, text: string }> }> = [];
                for (const [k, v] of rowMap.entries()) {
                    rows.push({ rowIndex: k, values: v });
                }
                rows.sort((a, b) => Number(a.rowIndex) - Number(b.rowIndex));
                return { headers, rows };
            });

            if (result && result.headers && result.headers.length) {
                console.log(`Risk Info headers (${result.headers.length}): [${result.headers.join(" | ")}]`);
            } else {
                console.log("Risk Info: could not read headers (table not found)");
            }
            if (result && result.rows && result.rows.length) {
                for (const r of result.rows) {
                    const parts: string[] = [];
                    for (const cell of (r.values || [])) {
                        if (cell.text && cell.text.length > 0) {
                            const label = result.headers && result.headers[Number(cell.col) - 1]
                                ? result.headers[Number(cell.col) - 1]
                                : `col${cell.col}`;
                            parts.push(`${label}=${cell.text}`);
                        }
                    }
                    if (parts.length > 0) {
                        console.log(`Risk Info Row ${r.rowIndex}: ${parts.join(" | ")}`);
                    }
                }
            } else {
                console.log("Risk Info: no data rows found");
            }
        } catch (e) {
            console.log(`Could not read Risk Info rows: ${(e as Error).message}`);
        }
    }

    public async verifyRiskMatrix()
    {
        console.log("Verification of risk matrix starts...");
            for (const el of await this.riskMatrixSections) {
            if (await el.isDisplayed()) {
                await utils.clickWithWait(el);
                await browser.pause(1000);
                break;
            }
        }
        console.log("Risk Matrix: " + await this.riskMatrixTitle.getText());
        console.log(await this.finTodayText.getText());
        console.log("FIN PoF = " + await this.finPofValue.getText());
        console.log("FIN CoF ($K) = " + await this.finCofValue.getText());
        for (const btn of await this.closeBtn) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                break;
            }
        }
        console.log("Risk matrix ends");
    }

    public async addFunLocTechObj()
    {
        utils.switchToIframe(this.rcmIframe);
        await utils.clickWithWait(this.infoTab);
        await browser.pause(5000);

        console.log("Navigating to Assessment Tab");
        utils.switchToIframe(this.rcmIframe);
        await utils.clickWithWait(this.assessmentTab);
        console.log("Navigated to Assessment tab");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        utils.switchToIframe(this.rcmIframe);
        await browser.pause(5000);

        console.log("Assigning Functional Location as technical object");

        let assigned = false;
        let i = 2;

        while (!assigned && i <= 50) {

            console.log(`Trying checkbox index: ${i}`);

            if (await this.hierarchyMoreBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.hierarchyMoreBtn);
                await browser.pause(1000);
            }

            await utils.clickWithWait(this.assignTechObjBtn);
            await browser.pause(1000);
            await browser.keys("ArrowDown");
            await browser.keys("ArrowDown");
            await browser.keys("Enter");

            await browser.pause(3000);
            await expect(this.functionalLocationHeader).toBeDisplayed();
            await browser.pause(8000);
            const checkBox = this.checkBoxByIndex(i);
            await checkBox.waitForClickable({ timeout: 60000 });
            await utils.clickWithWait(checkBox);

            // await this.selectFunctionalLocationAndStore(i);
            const isValidLocation=await this.selectFunctionalLocationAndStore(i);

            if(!isValidLocation){

                console.log("Unchecking invalid functional location");

                await utils.clickWithWait(checkBox);
                await browser.pause(1500);
                const close = await $("//footer//button[.//text()='Close']");
                await utils.clickWithWait(close);
                i++;

                continue;
            }

            await utils.switchToIframe(this.rcmIframe);
            await browser.pause(5000);
            await utils.clickWithWait(this.confirmBtn);
            await utils.waitForBusyIndicatorToDisappear();

            await browser.waitUntil(
                async () =>
                    (await this.okBtn.isDisplayed()) ||
                    (await this.warningMsg.isDisplayed()),
                { timeout: 60000 }
            );

            if (await this.okBtn.isDisplayed()) {
                console.log("Functional Location assigned successfully");
                await utils.clickWithWait(this.okBtn);
                assigned = true;
            } else {
                console.log("Warning displayed, retrying...");
                await utils.clickWithWait(this.warningOkBtn);
                i++;
            }
        }
        console.log("The functional location selected is :",this.selectedFunctionalLocation);
        console.log("Verifying if functional location is added or not...");
        const data = this.selectedFunctionalLocation;
        const cleanName = data.locationName.replace(/\\+/g, '\\');
        this.funcLocObj = `${cleanName} (${data.locationId})`;
        await this.functionalLocationRow(this.funcLocObj).waitForDisplayed({ timeout: 60000 });
        console.log("Functional location is added");
        console.log("Functional Location assigned");
    }

    // public async selectFunctionalLocationAndStore(i: number) {
    //     console.log("Store functional location data start");
    //     const row = await this.getRowByIndex(i);
    //     const locationId = await row.$(".//td[@aria-colindex='2']//span").getText();
    //     const locationName = await row.$("(.//td[@aria-colindex='2']//span/following::span[1])[1]").getText();
    //     this.selectedFunctionalLocation = { locationId, locationName };
    //     console.log("Store functional location data end");
    // }

    public async selectFunctionalLocationAndStore(i:number){
        console.log("Store functional location data start");
        const row=await this.getRowByIndex(i);
        const locationId=await row.$(".//td[@aria-colindex='2']//span").getText();
        const locationNameElements=await row.$$(".//td[@aria-colindex='2']//span");
        let locationName="";
        for(const el of locationNameElements){
            const text=(await el.getText()).trim();
            if(
                text &&
                text!==locationId &&
                !text.includes("Technical system")
            ){
                locationName=text;
                break;
            }
        }
        if(!locationName){
            console.log(`Invalid Functional Location at index ${i}`);
            return false;
        }
        this.selectedFunctionalLocation={locationId,locationName};
        console.log("Selected Functional Location :",this.selectedFunctionalLocation);
        console.log("Store functional location data end");
        return true;
    }

    public async verifyDetailPageFunLoc()
    {
        console.log("Navigating to detail page of functional location...");
        await utils.clickWithWait(this.functionalLocationRowClick(this.funcLocObj));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2500);
        console.log("Navigated to Functional location detail page data");
        const data = this.selectedFunctionalLocation;
        const cleanName = data.locationName.replace(/\\+/g, '\\');
        const nameOnly = cleanName;
        const idOnly = data.locationId;
        await browser.pause(3000);
        await utils.waitForBusyIndicatorToDisappear();
        let isDisplayed2 = false;
        for (const el of await this.headerTechnicalObjectId(idOnly)) {
            if (await el.isDisplayed()) {
                isDisplayed2 = true;
                break;
            }
        }
        await expect(isDisplayed2).toBe(true);

        let isDisplayed = false;
        for (const el of await this.headerTechnicalObjectName(nameOnly)) {
            if (await el.isDisplayed()) {
                isDisplayed = true;
                break;
            }
        }

        await expect(isDisplayed).toBe(true);
        console.log(`Verified Functional Location -> ${nameOnly} (${idOnly})`);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        console.log("Navigating to Risk Information");
        for (const el of await this.riskInformationSections) {
            if (await el.isDisplayed()) {
                await utils.clickWithWait(el);
                await browser.pause(2000);
                break;
            }
        }

        await expect(this.riskInformationHeader).toBeDisplayed();
        await browser.pause(2500);
        const riskVal = await utils.getAssignedValue(await this.riskInformationHeader.getText());
        console.log("Assigned Risk Informations is/are :", riskVal);
        let headerText = "";

        for (const el of await this.strategiesHeader) {
            if (await el.isDisplayed().catch(() => false)) {
                headerText = await el.getText();
                break;
            }
        }

        const strategyVal = await utils.getAssignedValue(headerText);
        console.log("Assigned strategies is/are :", strategyVal);

        if (strategyVal > 0) {
            await this.strategiesExpandBtn.waitForDisplayed({ timeout: 60000 });

            if ((await this.strategiesExpandBtn.getAttribute("aria-expanded")) === "false") {
                await utils.clickWithWait(this.strategiesExpandBtn);
                await browser.pause(2000);
            }

            for (const row of await this.strategiesRows) {
                if (await row.isDisplayed().catch(() => false)) {
                    console.log("Strategy Row: " + await row.getText());
                }
            }
        }

        await this.recommendationHeader.waitForDisplayed({ timeout: 60000 });
        const recommendationVal = await utils.getAssignedValue(await this.recommendationHeader.getText());
        console.log("Assigned Recoomendations is/are :", recommendationVal);

        if(await utils.getAssignedValue(await this.recommendationHeader.getText()) >0)
        {
            await this.recommendationExpandBtn.waitForDisplayed({ timeout: 60000 });
            if ((await this.recommendationExpandBtn.getAttribute("aria-expanded")) === "false") {
                await utils.clickWithWait(this.recommendationExpandBtn);
                await browser.pause(2500);
            }

            for (const val of await this.recommendationRCMValues) {
                if (await val.isDisplayed()) {
                    console.log("Recommendation RCM: " + await val.getText());
                }
            }
        }
        
        console.log("Navigating to maintenance and service sections...");
        for (const el of await this.maintenanceServiceSections) {
            if (await el.isDisplayed() && await el.isClickable()) {
                await utils.clickWithWait(el);
                await browser.pause(2500);
                break;
            }
        }


        let txt = await this.maintenanceNotifText.getText();
        console.log("Maintenance Notifications: " , await utils.getAssignedValue(txt));
        await utils.clickWithWait(this.maintenanceNotifAssignBtn);
        await browser.pause(2500);
        await expect(this.maintenanceNotifHeader).toBeDisplayed();
        console.log("Available Notifications: " , await utils.getAssignedValue(await this.maintenanceNotifHeader.getText()));
        await utils.clickWithWait(this.footerCancelBtn);
        await browser.pause(2500);
        txt = await this.maintenanceOrdersText.getText();
        console.log("Maintenance Orders: " , await utils.getAssignedValue(txt));

        await utils.clickWithWait(this.maintenanceOrdersAssignBtn);
        await browser.pause(2500);
        await expect(this.maintenanceOrdersHeader).toBeDisplayed();
        console.log("Available Orders: " , await utils.getAssignedValue(await this.maintenanceOrdersHeader.getText()));
        await utils.clickWithWait(this.footerCancelBtn);
        await browser.pause(2500);

        txt = await this.maintenancePlansText.getText();
        console.log("Maintenance Plans: " , await utils.getAssignedValue(txt));

        let clicked = false;
        for (const btn of await this.closeBtn) {
            try {
                if (await btn.isDisplayed()) {
                    await browser.execute((el) => el.click(), await btn);
                    clicked = true;
                    break;
                }
            } catch (e) {
                console.log(`Skipping close button (not interactable): ${(e as Error).message}`);
            }
        }
        if (!clicked) {
            console.log("No close button clicked");
        }
    }

    public async assignFunctions()
    {
        const data = this.selectedFunctionalLocation;

        console.log("---- Test start for assigning functions ----");

        await utils.clickWithWait(this.functionalLocationAddBtn(data.locationName, data.locationId));
        let functionClicked = false;

        for (const btn of await this.assignFunctionsBtn) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                await browser.pause(2500);
                functionClicked = true;
                break;
            }
        }

        if (!functionClicked) {
            console.log("Assign Functions not present, only Maintainable Items available");
            return;
        }
        await browser.pause(3000);
        await this.assignFunctionsHeader.waitForDisplayed({ timeout: 60000 });
        const fnText = await this.functionsCountText.getText();
        const fnCount = await utils.getAssignedValue(fnText);
        console.log("Available Functions: " + fnCount);

        if (fnCount === 0) {
            await utils.clickWithWait(this.cancelBtn);
            await browser.pause(2500);
            console.log("No Functions available");
        } else {
            const fnValue = await this.firstFunctionValue.getText();

            if (!fnValue) {
                throw new AssertionError({ message: "Function Value is empty" });
            }

            this.functionValue = fnValue;

            await utils.clickWithWait(this.firstFunctionCheckbox);
            await utils.clickWithWait(this.assignBtn);
            await browser.pause(2500);

            console.log("Functions assigned: " + fnValue);
        }

        await browser.pause(5000);

        for (const btn of await this.expandBtnForFuncLoc(data.locationName, data.locationId)) {
            if (await btn.isDisplayed() && (await btn.getAttribute("aria-expanded")) === "false") {
                await utils.clickWithWait(btn);
                await browser.pause(2500);
                break;
            }
        }

        let found = false;
        if (!this.functionValue) {
            throw new AssertionError({ message: "functionValue not set" });
        }

        for (const el of await this.functionRow(this.functionValue)) {
            if (await el.isDisplayed()) {
                found = true;
                await utils.clickWithWait(this.functionRowClick(this.functionValue));
                await browser.pause(2500);
                break;
            }
        }

        if (!found) {
            console.log("Function NOT found:", this.functionValue);
        }

        await expect(found).toBe(true);
        console.log("Function opened from list: " + this.functionValue);
        console.log("Closing detail page...");
        console.log("Closing detail page..."); 
        for (const btn of await this.closeBtn) 
            { if (await btn.isDisplayed() && await btn.isClickable()) 
            { await utils.clickWithWait(btn);
                await browser.pause(2500); break; 
            }
        }

        await this.assignFunctionsHeader.waitForDisplayed({ reverse: true, timeout: 10000 });
        console.log("Function detail view closed");
    }

    public async assignFunctionalFailure()
    {
        if(this.functionValue === "0")
        {
            return;
        }
        console.log("Assinging functional failures...")
        const data = this.selectedFunctionalLocation;
        await utils.clickWithWait(this.functionalFailureAddBtn(this.functionValue));
        await browser.pause(5000);
        for (const btn of await this.expandBtnForFuncLoc(data.locationName, data.locationId)) {
            if (await btn.isDisplayed() && (await btn.getAttribute("aria-expanded")) === "false") {
                await utils.clickWithWait(btn);
                await browser.pause(2500);
                break;
            }
        }
        await browser.pause(3000);
        let ffClicked = false;
        for (const btn of await this.assignFunctionalFailureBtn) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                await browser.pause(2500);
                ffClicked = true;
                break;
            }
        }

        if (!ffClicked) {
            console.log("Assign Functional Failure not present");
            return;
        }

        await this.assignFunctionalFailureHeader.waitForDisplayed({ timeout: 60000 });
        const ffText = await this.functionalFailureCountText.getText();
        const ffCount = await utils.getAssignedValue(ffText);
        console.log("Available Functional Failures: " + ffCount);

        if (ffCount === 0) {
            await utils.clickWithWait(this.cancelBtn);
            await browser.pause(2500);
            return;
        }

        const ffValue = await this.firstFunctionalFailureValue.getText();
        this.functionalFailureValue = ffValue;

        await utils.clickWithWait(this.firstFunctionalFailureCheckbox);
        await utils.clickWithWait(this.assignBtn);
        await browser.pause(2500);
        await utils.clickWithWait(this.okBtn);

        console.log("Functional Failure assigned: " + ffValue);
        await browser.pause(5000);

        for (const btn of await this.expandBtnForFunc(this.functionValue)) {
            if ((await btn.getAttribute("aria-expanded")) === "false") {
                await utils.clickWithWait(btn);
                break;
            }
        }

        let found = false;
        for (const el of await this.functionalFailureRow(this.functionalFailureValue)) {
            if (await el.isDisplayed()) {
                found = true;
                await utils.clickWithWait(this.functionalFailureRowClick(this.functionalFailureValue));
                await browser.pause(2500);
                break;
            }
        }

        await expect(found).toBe(true);

        console.log("Verified Functional Failure: " + this.functionalFailureValue);

        for (const btn of await this.closeBtn) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                await browser.pause(2500);
                break;
            }
        }
    }

    public async addMaintainableItemsForFunction() {
        if(this.functionValue === "0")
        {
            return;
        }
        console.log("Add Maintainable Items For FuncLoc starts...");
        await utils.clickWithWait(this.addMaintainableBtn(this.functionalFailureValue));
        let clicked = false;
        for (const btn of await this.assignMaintainableItemsBtn) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                await browser.pause(2500);
                clicked = true;
                break;
            }
        }

        if (!clicked) {
            console.log("Assign Maintainable Items not present");
            return;
        }
        await browser.pause(3000);
        await this.assignMaintainableItemsHeader.waitForDisplayed({ timeout: 60000 });
        const txt = await this.maintainableItemsText.getText();
        const count = await utils.getAssignedValue(txt);
        console.log("Available Maintainable Items: " + count);
        if (count === 0) {
            await utils.clickWithWait(this.cancelBtn);
            this.maintainableItemFunLoc = true;
            await browser.pause(2500);
            return;
        }

        const value = await this.maintainableItemValue.getText();
        this.maintainableItemValueFunLoc = value;
        await utils.clickWithWait(this.maintainableItemRow);
        await utils.clickWithWait(this.assignBtn);
        await browser.pause(2500);
        await utils.clickWithWait(this.okBtn);
        await browser.pause(2500);

        console.log("Maintainable Item assigned: " + value);
        await browser.pause(5000);
        for (const btn of await this.expandBtnForFuncFail(this.functionalFailureValue)) {
            if ((await btn.getAttribute("aria-expanded")) === "false") {
                await utils.clickWithWait(btn);
                await browser.pause(2500);
                break;
            }
        }

        let found = false;
        for (const el of await this.assignedItem(this.maintainableItemValueFunLoc)) {
            if (await el.isDisplayed()) {
                found = true;
                await utils.clickWithWait(this.functionalFailureRowClick(this.maintainableItemValueFunLoc));
                break;
            }
        }
        await expect(found).toBe(true);

        console.log("Verified Maintainable Item: " + this.maintainableItemValueFunLoc);
        const riskText = await this.riskInfoText.getText();
        const riskValue = await utils.getAssignedValue(riskText);
        console.log("Risk Information value: " + riskValue);
        const strategyText = await this.strategyInfoText.getText();
        const strategyValue = await utils.getAssignedValue(strategyText);
        console.log("Strategy value: " + strategyValue);

        console.log("Closing detail page...");
        await utils.switchToIframe(this.rcmIframe);
        await browser.pause(5000);
        for (const btn of await this.closeBtn) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                await browser.pause(2500);
                break;
            }
        }

        console.log("Add Maintainable Items For FuncLoc ends");
    }

    public async addFailureModesForFunction() {
        if(this.functionValue === "0")
        {
            return;
        }
        if(this.maintainableItemFunLoc === true)
        {
            return;
        }
        console.log("Adding Failure Modes...");
        await browser.pause(2000);
        await utils.clickWithWait(this.failureModeAddBtn(this.maintainableItemValueFunLoc));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Clicking assign falilure mode button...");
        for (const btn of await this.assignFailureModeBtn) {
            if (await btn.isDisplayed() && await btn.isClickable()) {
                await utils.clickWithWait(btn);
                break;
            }
        }
        console.log("Assign falilure mode button clicked");

        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await expect(this.assignFailureModeHeader).toBeDisplayed();
        const fmText = await this.failureModeCountText.getText();
        const count = await utils.getAssignedValue(fmText);
        console.log("Failure Modes count: " + count);
        if (count === 0) {
            await utils.clickWithWait(this.cancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1500);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            console.log("addFailureModes end");
            return;
        }
        this.failureModeValueFunLoc = await this.failureModeValue.getText();
        console.log("Failure mode selected :"+this.failureModeValueFunLoc);
        await utils.clickWithWait(this.failureModeCheckbox);
        await utils.clickWithWait(this.assignBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait(this.okBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        const expandBtn = this.failureModeExpandBtn(this.maintainableItemValueFunLoc);
        await expandBtn.waitForDisplayed({ timeout: 60000 });
        await expandBtn.waitForClickable({ timeout: 60000 });
        this.failureModeFunLoc = true;
        if ((await expandBtn.getAttribute("aria-expanded")) === "false") {
            await utils.clickWithWait(expandBtn);
        }
        await browser.pause(5000);
        await expect(this.failureModeAssigned(this.failureModeValueFunLoc)).toBeDisplayed();
        console.log("Added Failure Modes");
    }

    public async downloadSummaryReport() {
        console.log("Downloading Summary Report for RCM...");
        const srClicked = await this.clickHeaderActionWithOverflowFallback("Summary Report");
        if (!srClicked) {
            throw new AssertionError({ message: "AssertionError: 'Summary Report' button not found (directly or via Additional Options overflow)" });
        }
        await (await this.downloadReportHeader).waitForDisplayed({ timeout: 20000 });
        if (await (await this.includeAllTechObjText).isDisplayed().catch(() => false)) {
            await (await this.includeAllTechObjText).click();
        }
        await (await this.downloadReportOkBtn).click();
        await browser.pause(3000);
        await utils.waitForBusyIndicatorToDisappear();
        if (await (await this.confirmationYesBtn).isDisplayed().catch(() => false)) {
            await (await this.confirmationYesBtn).click();
        }
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(4000);
        await utils.clickWithWait(this.okBtn);
        await utils.waitForBusyIndicatorToDisappear();
        const filePath = await utils.waitForDownload(".pdf");
        const pdfContent = await utils.extractTextFromPDF(filePath);
        console.log("----- PDF CONTENT START -----");
        console.log(pdfContent);
        console.log("----- PDF CONTENT END -----");
        const normalize = (val: string) =>
            (val || "")
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "");
        const content = normalize(pdfContent);
        const failures: string[] = [];
        const verifyValue = (label: string, value: string) => {
            if (!value) {
                console.log(`${label} skipped (empty)`);
                return;
            }
            console.log(`\nVerifying ${label}: ${value}`);
            const norm = normalize(value);
            if (value.includes("(")) {
                const match = value.match(/^(.*?)\s*\((.*?)\)$/);
                if (match) {
                    const name = normalize(match[1].trim());
                    const id = normalize(match[2].trim());
                    const hasName = content.includes(name);
                    const hasId = content.includes(id);
                    console.log(`Name check (${name}): ${hasName}`);
                    console.log(`ID check (${id}): ${hasId}`);
                    if (!hasName || !hasId) {
                        failures.push(
                            `${label}: "${value}" | Name Found=${hasName}, ID Found=${hasId}`
                        );
                    }
                    return;
                }
            }
            const found = content.includes(norm);
            console.log(`Check (${norm}): ${found}`);
            if (!found) {
                failures.push(
                    `${label}: "${value}" not found in PDF`
                );
            }
        };

        verifyValue("techObj", this.techObj);
        verifyValue("maintainableItems", this.maintainableItems);
        verifyValue("failureMode", this.failureMode);
        verifyValue("funcLocObj", this.funcLocObj);
        verifyValue("functionValue", this.functionValue);
        verifyValue("functionalFailureValue", this.functionalFailureValue);
        verifyValue("maintainableItemValueFunLoc", this.maintainableItemValueFunLoc);
        verifyValue("failureModeValueFunLoc", this.failureModeValueFunLoc);
        if (failures.length > 0) {
            console.log("\n===== PDF VALIDATION FAILURES =====");
            failures.forEach((failure, index) => {
                console.log(`${index + 1}. ${failure}`);
            });
            console.log("===================================\n");
            throw new AssertionError({ message: `PDF Summary Report Validation Failed:\n\n${failures.join("\n")}` });
        }
        console.log("PDF Summary report verification completed");
    }

    public async deleteRCM()
    {
        console.log("Deleting the RCM...");
        console.log("Deleting :"+assetRCMListView.assetRCMDisplayID);
        const manageClicked = await this.clickHeaderActionWithOverflowFallback("Manage");
        if (!manageClicked) {
            throw new AssertionError({ message: "AssertionError: 'Manage' button not found (directly or via Additional Options overflow)" });
        }
        await browser.pause(1000);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await this.deleteConfirmText.waitForDisplayed({ timeout: 60000 });
        await utils.clickWithWait(this.confirmOkBtn);

        // After confirming deletion, either:
        //  - a Success popup appears with an OK button   -> deletion succeeded
        //  - an Error popup ("Something went wrong, please try again.") appears -> FAIL
        const successOkBtn = this.okBtn;
        const errorDialog = $("//header[.//text()='Error']");
        const errorOkBtn = $("//header[.//text()='Error']/following::button[.//bdi[text()='OK']]");

        await browser.waitUntil(
            async () =>
                (await successOkBtn.isDisplayed().catch(() => false)) ||
                (await errorDialog.isDisplayed().catch(() => false)),
            {
                timeout: 60000,
                interval: 500,
                timeoutMsg: "Neither Success nor Error popup appeared after delete confirmation",
            }
        );

        if (await errorDialog.isDisplayed().catch(() => false)) {
            // Dismiss the error popup so the next spec/run isn't blocked, then fail.
            if (await errorOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(errorOkBtn).catch(() => { /* ignore */ });
            }
            const msg = "RCM deletion failed: server returned 'Something went wrong, please try again.'";
            console.error(`\x1b[31m${msg}\x1b[0m`);
            throw new AssertionError({ message: msg });
        }

        await utils.clickWithWait(successOkBtn);
        console.log("RCM deleted successfully");
    }

    public async createAssessmentFlowWithCreateSystem() {
        console.log("Navigating to Assessment Tab");
        utils.switchToIframe(this.rcmIframe);
        await utils.clickWithWait(this.assessmentTab);
        console.log("Navigated to Assessment tab");
        console.log("Assessment (Create System) flow start");
        await utils.switchToIframe(this.rcmIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.startAssessmentBtn);
        await browser.pause(2000);
        await utils.switchToIframe(this.rcmIframe);
        await browser.pause(4000);
        await this.technicalObjectsHeader.waitForDisplayed();
        let assessmentCreated = false;
        let lastFailureReason = "";
        /*
        for (let i = 2; i <= 81; i++) {
            console.log(`Trying checkbox index: ${i}`);
            await utils.clickWithWait(this.equipmentValueBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            const checkBox = $(`(//tr[@role='row']//div[@role='checkbox'])[${i}]`);
            await this.ensureCheckboxLoaded(i);
            await checkBox.waitForExist({ timeout: 50000 });
            await checkBox.scrollIntoView({ block: "center", inline: "center" });
            await browser.pause(1000);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1500);
            await checkBox.waitForDisplayed({ timeout: 50000 });
            await checkBox.waitForClickable({ timeout: 50000 });
            await utils.clickWithWait(checkBox);
            await this.selectEquipmentAndStore(i);
            await utils.clickWithWait(this.confirmBtn);
            await utils.clickWithWait(this.nextBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            console.log("Switching to 'Create System' tab...");
            await this.createSystemTab.waitForDisplayed({ timeout: 30000, timeoutMsg: "'Create System' segmented option not visible" });
            await utils.clickWithWait(this.createSystemTab);
            await browser.pause(2000);
            const stamp = Date.now();
            const systemName = `Auto_System_${stamp}`;
            const systemDesc = `Automation System Description ${stamp}`;
            console.log(`Filling System Name='${systemName}', Description='${systemDesc}'`);
            await this.systemNameInput.waitForDisplayed({ timeout: 30000 });
            await utils.setValueWithWait(this.systemNameInput, systemName);
            await utils.setValueWithWait(this.systemDescInput, systemDesc);
            await utils.clickWithWait(this.createBtnFooter);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(5000);
            await browser.waitUntil(async () =>
                (await this.okBtn.isDisplayed().catch(() => false))
                || (await this.warningMsg.isDisplayed().catch(() => false))
                || (await this.errorDialogHeader.isDisplayed().catch(() => false)),
                { timeout: 60000, timeoutMsg: `No Success / Warning / Error popup detected for checkbox index ${i} (Create System)` }
            );
            if (await this.okBtn.isDisplayed().catch(() => false)) {
                console.log(`Assessment created successfully with new system '${systemName}'`);
                await utils.clickWithWait(this.okBtn);
                this.systemName = systemName;
                assessmentCreated = true;
                break;
            } else if (await this.errorDialogHeader.isDisplayed().catch(() => false)) {
                let errMsg = "";
                try {
                    const bodyEl = $("//header[.//text()='Error']/following::section//span[normalize-space()][1]");
                    if (await bodyEl.isDisplayed().catch(() => false)) {
                        errMsg = (await bodyEl.getText().catch(() => "")).trim();
                    }
                } catch (e) { void e; }
                lastFailureReason = `Error: ${errMsg || "unknown"}`;
                console.log(`Error dialog displayed ('${errMsg}') → dismissing and retrying with next checkbox`);
                if (await this.errorDialogOkBtn.isDisplayed().catch(() => false)) {
                    await utils.clickWithWait(this.errorDialogOkBtn);
                } else if (await this.genericCloseBtn.isDisplayed().catch(() => false)) {
                    await utils.clickWithWait(this.genericCloseBtn);
                }
                await utils.waitForBusyIndicatorToDisappear();
                await utils.clickWithWait(this.previousBtn);
                await browser.pause(4000);
                await utils.waitForBusyIndicatorToDisappear();
                await utils.clickWithWait(this.removeSelectedToken);
            } else if (await this.warningMsg.isDisplayed().catch(() => false)) {
                lastFailureReason = "Warning displayed on Create (Create System)";
                console.log("Warning displayed, retrying with next checkbox");
                await utils.clickWithWait(this.warningOkBtn);
                await utils.clickWithWait(this.previousBtn);
                await browser.pause(4000);
                await utils.waitForBusyIndicatorToDisappear();
                await utils.clickWithWait(this.removeSelectedToken);
            }
        }
        */

        // ********** START: TEST-MODE FIXED EQUIPMENT (remove this block and uncomment the original loop above) **********
        const testEquipmentId = "10000127";
        console.log(`[TEST MODE] Using fixed Technical Object '${testEquipmentId}' for Create System flow`);
        await utils.clickWithWait(this.equipmentValueBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(4000);

        const equipmentDialog = $(`(//div[@role='dialog'][.//input[@type='search']])[last()]`);
        await equipmentDialog.waitForDisplayed({ timeout: 30000, timeoutMsg: "AssertionError: Equipment value help dialog did not open" });

        const dialogSearchInput = $(`(//div[@role='dialog'][.//input[@type='search']])[last()]//input[@type='search']`);
        await dialogSearchInput.waitForDisplayed({ timeout: 30000 });
        await dialogSearchInput.clearValue().catch(() => { void 0; });
        await utils.setValueWithWait(dialogSearchInput, testEquipmentId);
        console.log(`Searched for equipment: ${testEquipmentId}`);

        const goBtn = $(`(//div[@role='dialog'][.//input[@type='search']])[last()]//button[.//bdi[normalize-space()='Go']]`);
        await goBtn.waitForClickable({ timeout: 30000, timeoutMsg: "AssertionError: 'Go' button not clickable in Equipment value help dialog" });
        await utils.clickWithWait(goBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);

        const targetRow = $(`(//div[@role='dialog'][.//input[@type='search']])[last()]//tr[@role='row' and .//span[normalize-space()="${testEquipmentId}"]]`);
        await targetRow.waitForDisplayed({ timeout: 30000, timeoutMsg: `AssertionError: Equipment row '${testEquipmentId}' not found after Go` });
        const targetCheckbox = targetRow.$(".//div[@role='checkbox']");
        await targetCheckbox.waitForClickable({ timeout: 30000, timeoutMsg: `AssertionError: Checkbox for equipment '${testEquipmentId}' not clickable` });
        await utils.clickWithWait(targetCheckbox);
        console.log(`Selected equipment row '${testEquipmentId}'`);

        const equipmentName = (await targetRow.$(".//td[@aria-colindex='2']//div[contains(@class,'Text')]/span[last()]").getText().catch(() => "")).trim();
        this.selectedEquipmentData = {
            equipmentId: testEquipmentId,
            equipmentName,
            category: "",
            objectType: "",
            catalogProfile: ""
        };
        console.log("Store equipment data (test mode):", this.selectedEquipmentData);

        await utils.clickWithWait(this.confirmBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait(this.nextBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        console.log("Switching to 'Create System' tab...");
        await this.createSystemTab.waitForDisplayed({ timeout: 30000, timeoutMsg: "'Create System' segmented option not visible" });
        await utils.clickWithWait(this.createSystemTab);
        await browser.pause(2000);
        const stamp = Date.now();
        const systemName = `Auto_System_${stamp}`;
        const systemDesc = `Automation System Description ${stamp}`;
        console.log(`Filling System Name='${systemName}', Description='${systemDesc}'`);
        await this.systemNameInput.waitForDisplayed({ timeout: 30000 });
        await utils.setValueWithWait(this.systemNameInput, systemName);
        await utils.setValueWithWait(this.systemDescInput, systemDesc);
        await utils.clickWithWait(this.createBtnFooter);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        await browser.waitUntil(async () =>
            (await this.okBtn.isDisplayed().catch(() => false))
            || (await this.warningMsg.isDisplayed().catch(() => false))
            || (await this.errorDialogHeader.isDisplayed().catch(() => false)),
            { timeout: 60000, timeoutMsg: `No Success / Warning / Error popup detected for equipment '${testEquipmentId}' (Create System)` }
        );
        if (await this.okBtn.isDisplayed().catch(() => false)) {
            console.log(`Assessment created successfully with new system '${systemName}'`);
            await utils.clickWithWait(this.okBtn);
            this.systemName = systemName;
            assessmentCreated = true;
        } else if (await this.errorDialogHeader.isDisplayed().catch(() => false)) {
            let errMsg = "";
            try {
                const bodyEl = $("//header[.//text()='Error']/following::section//span[normalize-space()][1]");
                if (await bodyEl.isDisplayed().catch(() => false)) {
                    errMsg = (await bodyEl.getText().catch(() => "")).trim();
                }
            } catch (e) { void e; }
            lastFailureReason = `Error: ${errMsg || "unknown"}`;
            console.log(`Error dialog displayed ('${errMsg}') in test-mode create system for '${testEquipmentId}'`);
            if (await this.errorDialogOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.errorDialogOkBtn);
            } else if (await this.genericCloseBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.genericCloseBtn);
            }
        } else if (await this.warningMsg.isDisplayed().catch(() => false)) {
            lastFailureReason = "Warning displayed on Create (Create System)";
            console.log(`Warning displayed in test-mode create system for '${testEquipmentId}'`);
            await utils.clickWithWait(this.warningOkBtn);
        }
        // ********** END: TEST-MODE FIXED EQUIPMENT (remove this block and uncomment the original loop above) **********

        if (!assessmentCreated) {
            throw new AssertionError({ message: `RCM assessment (Create System) could not be created after trying checkbox indexes 2..81. Last failure: ${lastFailureReason || "none captured"}` });
        }
        console.log("Assessment details :", this.selectedEquipmentData);
        console.log("Assessment (Create System) flow end");
    }

    public async verifySystemInHierarchy() {
        console.log(`Verifying System '${this.systemName}' is reflected in hierarchy...`);
        const el = $(`//span[@dir='auto'][normalize-space()="${this.systemName}"]`);
        await el.waitForDisplayed({ timeout: 60000, timeoutMsg: `AssertionError: System '${this.systemName}' not visible in hierarchy` });
        console.log(`System '${this.systemName}' is displayed in hierarchy`);

        console.log(`Opening System '${this.systemName}' detail page by clicking the row...`);
        const rowClick = $(`//span[@dir='auto'][normalize-space()="${this.systemName}"]/ancestor::div[4]`);
        await utils.clickWithWait(rowClick);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);

        console.log(`Verifying System detail page header shows '${this.systemName}'...`);
        const headerTitleEls = await $$(`//header[@aria-roledescription='Object page header']//div[@role='heading']//span[@dir='auto'][normalize-space()="${this.systemName}"]`);
        let systemHeaderShown = false;
        await browser.waitUntil(async () => {
            for (const el of headerTitleEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    systemHeaderShown = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 60000, interval: 1000, timeoutMsg: `AssertionError: System detail page header did not show '${this.systemName}'` });
        if (!systemHeaderShown) {
            throw new AssertionError({ message: `AssertionError: System detail page header did not show '${this.systemName}'` });
        }
        console.log(`System detail page header shows '${this.systemName}'`);

        const techObjSectionEls = await $$("//h2[contains(normalize-space(),'Technical Objects')]");
        let techObjSectionVisible = false;
        await browser.waitUntil(async () => {
            for (const el of techObjSectionEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    techObjSectionVisible = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 30000, interval: 1000, timeoutMsg: "AssertionError: 'Technical Objects' section not found on System detail page" });
        if (!techObjSectionVisible) {
            throw new AssertionError({ message: "AssertionError: 'Technical Objects' section not found on System detail page" });
        }

        const equipmentId = this.selectedEquipmentData.equipmentId;
        const equipmentName = this.selectedEquipmentData.equipmentName;
        console.log(`Verifying Technical Object '${equipmentName} (${equipmentId})' is present on System detail page...`);
        let sysIdShown = false;
        await browser.waitUntil(async () => {
            const idEls = await $$(`//tr[@role='row']//span[@dir='auto' and normalize-space()="${equipmentId}"]`);
            for (const el of idEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    sysIdShown = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 30000, interval: 1000, timeoutMsg: `AssertionError: Equipment ID '${equipmentId}' not shown in System detail page Technical Objects` });
        if (!sysIdShown) {
            throw new AssertionError({ message: `AssertionError: Equipment ID '${equipmentId}' not shown in System detail page Technical Objects` });
        }
        let sysNameShown = false;
        await browser.waitUntil(async () => {
            const nameEls = await $$(`//tr[@role='row']//span[@dir='auto' and normalize-space()="${equipmentName}"]`);
            for (const el of nameEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    sysNameShown = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 30000, interval: 1000, timeoutMsg: `AssertionError: Equipment Name '${equipmentName}' not shown in System detail page Technical Objects` });
        if (!sysNameShown) {
            throw new AssertionError({ message: `AssertionError: Equipment Name '${equipmentName}' not shown in System detail page Technical Objects` });
        }
        console.log(`System detail page shows same Technical Object: '${equipmentName} (${equipmentId})'`);

        console.log("Closing System detail page...");
        let closed = false;
        for (const btn of await this.closeBtn) {
            if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                await utils.clickWithWait(btn);
                await browser.pause(2000);
                closed = true;
                break;
            }
        }
        if (!closed) {
            console.log("No visible Decline button found to close System detail page");
        } else {
            console.log("System detail page closed");
        }
    }

    public async addSubSystem() {
        const equipmentId = this.selectedEquipmentData.equipmentId;
        const equipmentName = this.selectedEquipmentData.equipmentName;
        if (!this.systemName) {
            throw new AssertionError({ message: "AssertionError: systemName not set - createAssessmentFlowWithCreateSystem must run first" });
        }
        console.log(`Clicking Add (+) on System '${this.systemName}'...`);
        const addBtn = $(`//span[@dir='auto'][normalize-space()="${this.systemName}"]/following::button[@title='Add' and @aria-label='Add'][1]`);
        await addBtn.waitForClickable({ timeout: 60000, timeoutMsg: `AssertionError: Add (+) button on System '${this.systemName}' not clickable` });
        await utils.clickWithWait(addBtn);
        await browser.pause(1500);
        console.log("Clicking 'Create Sub-System' menu item...");
        const createSubSysMenuItem = $("//span[normalize-space()='Create Sub-System']");
        await createSubSysMenuItem.waitForDisplayed({ timeout: 30000, timeoutMsg: "AssertionError: 'Create Sub-System' menu item not shown" });
        await utils.clickWithWait(createSubSysMenuItem);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        const dialogHeader = $("//div[@role='dialog' and .//h1[normalize-space()='Create Sub-System']]//h1[normalize-space()='Create Sub-System']");
        await dialogHeader.waitForDisplayed({ timeout: 30000, timeoutMsg: "AssertionError: 'Create Sub-System' dialog did not open" });
        const stamp = Date.now();
        const subSystemName = `Auto_SubSystem_${stamp}`;
        const subSystemDesc = `Automation Sub-System Description ${stamp}`;
        this.subSystemName = subSystemName;
        const nameArea = $("//div[@role='dialog' and .//h1[normalize-space()='Create Sub-System']]//bdi[normalize-space()='Sub-System Name']/ancestor::label[1]/following::textarea[1]");
        const descArea = $("//div[@role='dialog' and .//h1[normalize-space()='Create Sub-System']]//bdi[normalize-space()='Description']/ancestor::label[1]/following::textarea[1]");
        await nameArea.waitForDisplayed({ timeout: 30000 });
        await utils.setValueWithWait(nameArea, subSystemName);
        await utils.setValueWithWait(descArea, subSystemDesc);
        console.log(`Sub-System Name='${subSystemName}', Desc='${subSystemDesc}'`);
        console.log(`Verifying same Technical Object ('${equipmentName} (${equipmentId})') is reflected in sub-system dialog...`);
        const techObjIdSpan = $(`//div[@role='dialog' and .//h1[normalize-space()='Create Sub-System']]//tr[@role='row' and @aria-rowindex>1]//span[normalize-space()="${equipmentId}"]`);
        const techObjNameSpan = $(`//div[@role='dialog' and .//h1[normalize-space()='Create Sub-System']]//tr[@role='row' and @aria-rowindex>1]//span[normalize-space()="${equipmentName}"]`);
        await techObjIdSpan.waitForDisplayed({ timeout: 30000, timeoutMsg: `AssertionError: Equipment ID '${equipmentId}' not shown in sub-system dialog` });
        await techObjNameSpan.waitForDisplayed({ timeout: 30000, timeoutMsg: `AssertionError: Equipment Name '${equipmentName}' not shown in sub-system dialog` });
        console.log("Technical Object matches the equipment used earlier");
        console.log("Selecting the Technical Object row checkbox...");
        const rowCheckbox = $(`//div[@role='dialog' and .//h1[normalize-space()='Create Sub-System']]//tr[@role='row' and @aria-rowindex>1][.//span[normalize-space()="${equipmentId}"]]//div[@role='checkbox']`);
        await rowCheckbox.waitForClickable({ timeout: 30000 });
        await utils.clickWithWait(rowCheckbox);
        await browser.pause(1500);
        console.log("Clicking Save on Sub-System dialog...");
        const saveBtn = $("//div[@role='dialog' and .//h1[normalize-space()='Create Sub-System']]//footer//button[.//bdi[normalize-space()='Save']]");
        await saveBtn.waitForClickable({ timeout: 30000, timeoutMsg: "AssertionError: Sub-System Save button did not become clickable" });
        await utils.clickWithWait(saveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        await browser.waitUntil(async () =>
            (await this.okBtn.isDisplayed().catch(() => false))
            || (await this.errorDialogHeader.isDisplayed().catch(() => false))
            || !(await dialogHeader.isDisplayed().catch(() => false)),
            { timeout: 60000, timeoutMsg: "AssertionError: No response after saving Sub-System" }
        );
        if (await this.errorDialogHeader.isDisplayed().catch(() => false)) {
            let errMsg = "";
            try {
                const bodyEl = $("//header[.//text()='Error']/following::section//span[normalize-space()][1]");
                if (await bodyEl.isDisplayed().catch(() => false)) {
                    errMsg = (await bodyEl.getText().catch(() => "")).trim();
                }
            } catch (e) { void e; }
            if (await this.errorDialogOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.errorDialogOkBtn);
            }
            throw new AssertionError({ message: `AssertionError: Sub-System creation failed with error: '${errMsg || "unknown"}'` });
        }
        if (await this.okBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }
        console.log(`Sub-System created. Verifying '${subSystemName}' is reflected in hierarchy...`);
        const subSysRow = $(`//span[@dir='auto'][normalize-space()="${subSystemName}"]`);
        if (!(await subSysRow.isDisplayed().catch(() => false))) {
            console.log(`Expanding System '${this.systemName}' to reveal newly-created Sub-System '${subSystemName}'...`);
            const sysTreeIcon = await $(`(//tr[.//span[@dir='auto'][normalize-space()="${this.systemName}"]]//span[@aria-label='Node'])[1]`);
            if (await sysTreeIcon.isExisting().catch(() => false)) {
                await browser.execute((el: HTMLElement) => el.click(), await sysTreeIcon);
                await browser.pause(2500);
            } else {
                for (const btn of await this.expandBtn(this.systemName)) {
                    if ((await btn.isDisplayed().catch(() => false)) && (await btn.getAttribute("aria-expanded")) === "false") {
                        await utils.clickWithWait(btn);
                        await browser.pause(2500);
                        break;
                    }
                }
            }
        }
        await subSysRow.waitForDisplayed({ timeout: 60000, timeoutMsg: `AssertionError: Sub-System '${subSystemName}' not reflected in hierarchy after save` });
        console.log(`Sub-System '${subSystemName}' reflected in hierarchy`);

        console.log(`Opening Sub-System '${subSystemName}' detail page by clicking the row...`);
        const subSysRowClick = $(`//span[@dir='auto'][normalize-space()="${subSystemName}"]/ancestor::div[4]`);
        await utils.clickWithWait(subSysRowClick);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);

        console.log(`Verifying Sub-System detail page header shows '${subSystemName}'...`);
        const subSysHeaderTitleEls = await $$(`//header[@aria-roledescription='Object page header']//div[@role='heading']//span[@dir='auto'][normalize-space()="${subSystemName}"]`);
        let subSysHeaderShown = false;
        await browser.waitUntil(async () => {
            for (const el of subSysHeaderTitleEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    subSysHeaderShown = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 60000, interval: 1000, timeoutMsg: `AssertionError: Sub-System detail page header did not show '${subSystemName}'` });
        if (!subSysHeaderShown) {
            throw new AssertionError({ message: `AssertionError: Sub-System detail page header did not show '${subSystemName}'` });
        }
        console.log(`Sub-System detail page header shows '${subSystemName}'`);

        const subSysTechObjSectionEls = await $$("//h2[contains(normalize-space(),'Technical Objects')]");
        let subSysTechObjSectionVisible = false;
        await browser.waitUntil(async () => {
            for (const el of subSysTechObjSectionEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    subSysTechObjSectionVisible = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 30000, interval: 1000, timeoutMsg: "AssertionError: 'Technical Objects' section not found on Sub-System detail page" });
        if (!subSysTechObjSectionVisible) {
            throw new AssertionError({ message: "AssertionError: 'Technical Objects' section not found on Sub-System detail page" });
        }

        console.log(`Verifying Technical Object '${equipmentName} (${equipmentId})' is present on Sub-System detail page...`);
        let subSysIdShown = false;
        await browser.waitUntil(async () => {
            const idEls = await $$(`//tr[@role='row']//span[@dir='auto' and normalize-space()="${equipmentId}"]`);
            for (const el of idEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    subSysIdShown = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 30000, interval: 1000, timeoutMsg: `AssertionError: Equipment ID '${equipmentId}' not shown in Sub-System detail page Technical Objects` });
        if (!subSysIdShown) {
            throw new AssertionError({ message: `AssertionError: Equipment ID '${equipmentId}' not shown in Sub-System detail page Technical Objects` });
        }
        let subSysNameShown = false;
        await browser.waitUntil(async () => {
            const nameEls = await $$(`//tr[@role='row']//span[@dir='auto' and normalize-space()="${equipmentName}"]`);
            for (const el of nameEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    subSysNameShown = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 30000, interval: 1000, timeoutMsg: `AssertionError: Equipment Name '${equipmentName}' not shown in Sub-System detail page Technical Objects` });
        if (!subSysNameShown) {
            throw new AssertionError({ message: `AssertionError: Equipment Name '${equipmentName}' not shown in Sub-System detail page Technical Objects` });
        }
        console.log(`Sub-System detail page shows same Technical Object: '${equipmentName} (${equipmentId})'`);

        console.log("Closing Sub-System detail page...");
        const subSysClosed = await this.closeTopMostDetailPanel(subSystemName);
        if (!subSysClosed) {
            console.log("No visible panel-Decline button found to close Sub-System detail page");
        } else {
            console.log("Sub-System detail page closed");
        }
    }

    public async assignFunctionsToSubSystem() {
        if (!this.systemName) {
            throw new AssertionError({ message: "AssertionError: systemName not set - createAssessmentFlowWithCreateSystem must run first" });
        }
        if (!this.subSystemName) {
            throw new AssertionError({ message: "AssertionError: subSystemName not set - addSubSystem must run first" });
        }

        const subSysSpan = $(`//span[@dir='auto'][normalize-space()="${this.subSystemName}"]`);
        if (!(await subSysSpan.isDisplayed().catch(() => false))) {
            console.log(`Expanding System '${this.systemName}' to reveal Sub-System '${this.subSystemName}'...`);
            const treeIcon = await $(`(//tr[.//span[@dir='auto'][normalize-space()="${this.systemName}"]]//span[@aria-label='Node'])[1]`);
            await treeIcon.waitForExist({ timeout: 30000, timeoutMsg: `AssertionError: Tree icon for System '${this.systemName}' not found` });
            await browser.execute((el: HTMLElement) => el.click(), await treeIcon);
            await browser.pause(2500);
        }
        await subSysSpan.waitForDisplayed({ timeout: 60000, timeoutMsg: `AssertionError: Sub-System '${this.subSystemName}' not visible after expanding System '${this.systemName}'` });
        console.log(`Sub-System '${this.subSystemName}' visible under '${this.systemName}'`);

        console.log(`Clicking Add (+) on Sub-System '${this.subSystemName}'...`);
        await utils.clickWithWait(this.addMaintainableBtn(this.subSystemName));
        await browser.pause(2000);

        let assignFunctionsClicked = false;
        for (const btn of await this.assignFunctionsBtn) {
            if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                await utils.clickWithWait(btn);
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(2000);
                console.log("'Assign Functions' menu item clicked");
                assignFunctionsClicked = true;
                break;
            }
        }
        if (!assignFunctionsClicked) {
            throw new AssertionError({ message: `AssertionError: 'Assign Functions' not available on Sub-System '${this.subSystemName}'` });
        }

        await this.assignFunctionsHeader.waitForDisplayed({ timeout: 60000, timeoutMsg: "AssertionError: Assign Functions dialog did not open" });
        await this.functionsCountText.waitForDisplayed({ timeout: 60000 });
        const fnText = await this.functionsCountText.getText();
        const fnCount = await utils.getAssignedValue(fnText);
        console.log(`Available Functions for Sub-System '${this.subSystemName}': ${fnCount}`);
        if (fnCount === 0) {
            await utils.clickWithWait(this.cancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            throw new AssertionError({ message: `AssertionError: No Functions available to assign for Sub-System '${this.subSystemName}'` });
        }

        await this.firstFunctionValue.waitForDisplayed({ timeout: 30000 });
        const fnValue = (await this.firstFunctionValue.getText() || "").trim();
        this.functionValue = fnValue;
        console.log(`Selecting first function: '${fnValue}'`);
        await utils.clickWithWait(this.firstFunctionCheckbox);
        await utils.clickWithWait(this.assignBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2500);
        if (await this.okBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }
        console.log(`Function assigned: '${fnValue}'`);

        this.selectedFunctionalLocation = { locationName: this.subSystemName, locationId: this.subSystemName };
        this.funcLocObj = this.subSystemName;
    }

    public async verifyFunctionUnderSubSystem() {
        if (!this.functionValue) {
            throw new AssertionError({ message: "AssertionError: functionValue not set - assignFunctionsToSubSystem must run first" });
        }
        console.log(`Expanding Sub-System '${this.subSystemName}' to verify assigned Function '${this.functionValue}'...`);
        const fnSpan = $(`//span[@dir='auto'][normalize-space()="${this.functionValue}"]`);
        if (!(await fnSpan.isDisplayed().catch(() => false))) {
            for (const btn of await this.expandBtn(this.subSystemName)) {
                if ((await btn.isDisplayed().catch(() => false)) && (await btn.getAttribute("aria-expanded")) === "false") {
                    await utils.clickWithWait(btn);
                    await browser.pause(2500);
                    break;
                }
            }
            if (!(await fnSpan.isDisplayed().catch(() => false))) {
                const treeIcon = await $(`(//tr[.//span[@dir='auto'][normalize-space()="${this.subSystemName}"]]//span[@aria-label='Node'])[1]`);
                if (await treeIcon.isExisting().catch(() => false)) {
                    await browser.execute((el: HTMLElement) => el.click(), await treeIcon);
                    await browser.pause(2500);
                }
            }
        }
        await fnSpan.waitForDisplayed({ timeout: 60000, timeoutMsg: `AssertionError: Function '${this.functionValue}' not visible under Sub-System '${this.subSystemName}' after expand` });
        console.log(`Function '${this.functionValue}' verified under Sub-System '${this.subSystemName}'`);
    }

    public async verifyFunctionDetail() {
        if (!this.functionValue) {
            throw new AssertionError({ message: "AssertionError: functionValue not set - assignFunctionsToSubSystem must run first" });
        }
        await this.verifyFunctionUnderSubSystem();
        const baseName = this.functionValue.split(' (')[0].trim();
        const codeId = this.functionValue.match(/\((.*?)\)/)?.[1] || '';
        console.log(`Opening Function detail page for '${this.functionValue}' (baseName='${baseName}', codeId='${codeId}')...`);
        await utils.clickWithWait(this.functionRowClick(this.functionValue));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);

        console.log(`Verifying Function detail page header shows '${baseName}'...`);
        const fnHeaderTitleEls = await $$(`//header[@aria-roledescription='Object page header']//div[@role='heading']//span[@dir='auto'][normalize-space()="${baseName}"]`);
        let fnHeaderShown = false;
        await browser.waitUntil(async () => {
            for (const el of fnHeaderTitleEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    fnHeaderShown = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 60000, interval: 1000, timeoutMsg: `AssertionError: Function detail page header did not show '${baseName}'` });
        if (!fnHeaderShown) {
            throw new AssertionError({ message: `AssertionError: Function detail page header did not show '${baseName}'` });
        }
        console.log(`Function detail page header shows '${baseName}'`);

        if (codeId) {
            console.log(`Verifying Code ID '${codeId}' is present on Function detail page...`);
            const codeIdValue = $(`//bdi[normalize-space()='Code ID']/ancestor::dt[1]/following-sibling::dd[1]//span[normalize-space()="${codeId}"]`);
            await codeIdValue.waitForDisplayed({ timeout: 30000, timeoutMsg: `AssertionError: Code ID '${codeId}' not shown on Function detail page` });
            console.log(`Code ID matches: '${codeId}'`);
        }

        try {
            const codeGroupIdEl = $("//bdi[normalize-space()='Code Group ID']/ancestor::dt[1]/following-sibling::dd[1]//span[normalize-space()][1]");
            if (await codeGroupIdEl.isDisplayed().catch(() => false)) {
                console.log(`Code Group ID: '${(await codeGroupIdEl.getText()).trim()}'`);
            }
        } catch (e) { void e; }
        try {
            const codeGroupDescEl = $("//bdi[normalize-space()='Code Group Description']/ancestor::dt[1]/following-sibling::dd[1]//span[normalize-space()][1]");
            if (await codeGroupDescEl.isDisplayed().catch(() => false)) {
                console.log(`Code Group Description: '${(await codeGroupDescEl.getText()).trim()}'`);
            }
        } catch (e) { void e; }

        console.log("Closing Function detail page...");
        let closed = false;
        for (const btn of await this.closeBtn) {
            if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                await utils.clickWithWait(btn);
                await browser.pause(2000);
                closed = true;
                break;
            }
        }
        if (!closed) {
            console.log("No visible Decline button found to close Function detail page");
        } else {
            console.log("Function detail page closed");
        }
    }

    public async verifyFunctionalFailureDetail() {
        if (!this.functionalFailureValue) {
            throw new AssertionError({ message: "AssertionError: functionalFailureValue not set - assignFunctionalFailure must run first" });
        }
        const baseName = this.functionalFailureValue.split(' (')[0].trim();
        const codeId = this.functionalFailureValue.match(/\((.*?)\)/)?.[1] || '';
        console.log(`Opening Functional Failure detail page for '${this.functionalFailureValue}' (baseName='${baseName}', codeId='${codeId}')...`);
        await utils.clickWithWait(this.functionalFailureRowClick(this.functionalFailureValue));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);

        console.log(`Verifying Functional Failure detail page header shows '${baseName}'...`);
        const ffHeaderTitleEls = await $$(`//header[@aria-roledescription='Object page header']//div[@role='heading']//span[@dir='auto'][normalize-space()="${baseName}"]`);
        let ffHeaderShown = false;
        await browser.waitUntil(async () => {
            for (const el of ffHeaderTitleEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    ffHeaderShown = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 60000, interval: 1000, timeoutMsg: `AssertionError: Functional Failure detail header did not show '${baseName}'` });
        if (!ffHeaderShown) {
            throw new AssertionError({ message: `AssertionError: Functional Failure detail header did not show '${baseName}'` });
        }
        console.log(`Functional Failure detail page header shows '${baseName}'`);

        console.log("Opening Assign menu on Functional Failure detail...");
        const assignMenuBtn = $("//button[.//bdi[normalize-space()='Assign']]");
        if (!(await assignMenuBtn.isDisplayed().catch(() => false))) {
            for (const ovBtn of await $$("//button[@aria-label='Additional Options']")) {
                if ((await ovBtn.isDisplayed().catch(() => false)) && (await ovBtn.isClickable().catch(() => false))) {
                    await utils.clickWithWait(ovBtn);
                    await browser.pause(1500);
                    break;
                }
            }
        }
        await assignMenuBtn.waitForClickable({ timeout: 30000, timeoutMsg: "AssertionError: Assign menu button not clickable on Functional Failure detail page" });
        await utils.clickWithWait(assignMenuBtn);
        await browser.pause(1500);

        const useEquipment = !!(this.selectedEquipmentData && this.selectedEquipmentData.equipmentId);
        const menuText = useEquipment ? "Equipment" : "Functional Location";
        const selectDialogTitle = useEquipment ? "Select Equipment" : "Select Functional Location";
        console.log(`Choosing '${menuText}' from Assign menu...`);
        let itemClicked = false;
        try {
            await browser.waitUntil(async () => {
                const xpath =
                    `//li[@role='menuitem' or @role='menuitemradio' or @role='menuitemcheckbox'][normalize-space()="${menuText}"]` +
                    ` | //div[@role='menuitem' or @role='menuitemradio' or @role='menuitemcheckbox'][normalize-space()="${menuText}"]` +
                    ` | //li[@title="${menuText}"]` +
                    ` | //*[@role='menuitem' or @role='menuitemradio' or @role='menuitemcheckbox'][.//bdi[normalize-space()="${menuText}"] or .//span[normalize-space()="${menuText}"]]` +
                    ` | //span[normalize-space()="${menuText}"]` +
                    ` | //bdi[normalize-space()="${menuText}"]`;
                const menuItemEls = await $$(xpath);
                for (const el of menuItemEls) {
                    if (!(await el.isDisplayed().catch(() => false))) continue;
                    try {
                        await utils.clickWithWait(el);
                        itemClicked = true;
                        return true;
                    } catch {
                        try {
                            await browser.execute((n: HTMLElement) => n.click(), el);
                            itemClicked = true;
                            return true;
                        } catch { /* try next */ }
                    }
                }
                const jsClicked = await browser.execute((label: string) => {
                    const norm = (t: string | null | undefined) => (t || "").replace(/\s+/g, " ").trim();
                    const visible = (el: HTMLElement) => {
                        const r = el.getBoundingClientRect();
                        if (r.width <= 0 || r.height <= 0) return false;
                        const s = window.getComputedStyle(el);
                        return s.visibility !== "hidden" && s.display !== "none";
                    };
                    const roleSel = "[role='menuitem'],[role='menuitemradio'],[role='menuitemcheckbox']";
                    const items = Array.from(document.querySelectorAll<HTMLElement>(roleSel));
                    for (const it of items) {
                        if (!visible(it)) continue;
                        if (norm(it.innerText) === label || norm(it.textContent) === label || it.getAttribute("title") === label) {
                            it.click();
                            return true;
                        }
                    }
                    const anyLi = Array.from(document.querySelectorAll<HTMLElement>("li"));
                    for (const li of anyLi) {
                        if (!visible(li)) continue;
                        if (norm(li.innerText) === label || norm(li.textContent) === label || li.getAttribute("title") === label) {
                            li.click();
                            return true;
                        }
                    }
                    return false;
                }, menuText);
                if (jsClicked) {
                    itemClicked = true;
                    return true;
                }
                if (await assignMenuBtn.isDisplayed().catch(() => false) &&
                    await assignMenuBtn.isClickable().catch(() => false)) {
                    try { await utils.clickWithWait(assignMenuBtn); } catch { /* ignore */ }
                    await browser.pause(1000);
                }
                return false;
            }, { timeout: 30000, interval: 1000, timeoutMsg: `AssertionError: '${menuText}' menu item not shown` });
        } catch (e) {
            if (!itemClicked) {
                throw new AssertionError({ message: `AssertionError: '${menuText}' menu item not shown` });
            }
        }
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        const dialogHeader = $(`//div[@role='dialog' and .//h1[normalize-space()='${selectDialogTitle}']]`);
        await dialogHeader.waitForDisplayed({ timeout: 30000, timeoutMsg: `AssertionError: '${selectDialogTitle}' dialog did not open` });

        const equipmentId = this.selectedEquipmentData.equipmentId;
        const equipmentName = this.selectedEquipmentData.equipmentName;
        console.log(`Verifying equipment '${equipmentName} (${equipmentId})' is present in '${selectDialogTitle}' dialog...`);
        const equipmentRow = $(`//div[@role='dialog' and .//h1[normalize-space()='${selectDialogTitle}']]//tr[@role='row' and @aria-rowindex>1][.//span[normalize-space()="${equipmentId}"]]`);
        const equipmentPresent = await equipmentRow.isExisting().catch(() => false)
            && await equipmentRow.isDisplayed().catch(() => false);

        if (!equipmentPresent) {
            console.log(`Equipment '${equipmentName} (${equipmentId})' NOT present in '${selectDialogTitle}' dialog. Clicking Close and failing.`);
            const closeBtn = $(`//div[@role='dialog' and .//h1[normalize-space()='${selectDialogTitle}']]//footer//button[.//bdi[normalize-space()='Close']]`);
            if (await closeBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(closeBtn);
                await utils.waitForBusyIndicatorToDisappear();
            }
            throw new AssertionError({ message: `AssertionError: Equipment '${equipmentName} (${equipmentId})' not present in '${selectDialogTitle}' dialog on Functional Failure detail page` });
        }

        console.log(`Selecting equipment '${equipmentName} (${equipmentId})' and clicking Confirm...`);
        const rowCheckbox = $(`//div[@role='dialog' and .//h1[normalize-space()='${selectDialogTitle}']]//tr[@role='row' and @aria-rowindex>1][.//span[normalize-space()="${equipmentId}"]]//div[@role='checkbox']`);
        await rowCheckbox.waitForClickable({ timeout: 30000 });
        await utils.clickWithWait(rowCheckbox);
        await browser.pause(1500);
        const confirmBtn = $(`//div[@role='dialog' and .//h1[normalize-space()='${selectDialogTitle}']]//footer//button[.//bdi[normalize-space()='Confirm']]`);
        await confirmBtn.waitForClickable({ timeout: 30000, timeoutMsg: "AssertionError: Confirm button did not become clickable" });
        await utils.clickWithWait(confirmBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        if (await this.okBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }
        console.log(`Equipment '${equipmentName} (${equipmentId})' assigned to Functional Failure '${baseName}'`);

        console.log(`Verifying equipment row '${equipmentName} (${equipmentId})' is now listed under Technical Objects on Functional Failure detail page...`);
        const assignedRow = $(`//span[@dir='auto'][normalize-space()="${equipmentName} (${equipmentId})"]`);
        await assignedRow.waitForDisplayed({ timeout: 60000, timeoutMsg: `AssertionError: Equipment '${equipmentName} (${equipmentId})' not reflected under Technical Objects on Functional Failure detail page after Confirm` });
        console.log(`Equipment '${equipmentName} (${equipmentId})' verified under Technical Objects on Functional Failure detail page`);
    }

    public async addMaintainableItemsFromFFDetail() {
        if (!this.functionalFailureValue) {
            throw new AssertionError({ message: "AssertionError: functionalFailureValue not set - verifyFunctionalFailureDetail must run first" });
        }
        if (!this.selectedEquipmentData || !this.selectedEquipmentData.equipmentId) {
            throw new AssertionError({ message: "AssertionError: selectedEquipmentData not set" });
        }
        const equipmentId = this.selectedEquipmentData.equipmentId;
        const equipmentName = this.selectedEquipmentData.equipmentName;
        const equipmentDisplayText = `${equipmentName} (${equipmentId})`;
        const baseName = this.functionalFailureValue.split(' (')[0].trim();

        console.log(`Clicking + on equipment row '${equipmentDisplayText}' inside Functional Failure detail page to add Maintainable Items...`);
        await utils.clickWithWait(this.addMaintainableBtn(equipmentDisplayText));
        await browser.pause(2000);

        let miClicked = false;
        for (const btn of await this.assignMaintainableItemsBtns) {
            if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                await utils.clickWithWait(btn);
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(2000);
                miClicked = true;
                console.log("'Assign Maintainable Items' button clicked");
                break;
            }
        }
        if (!miClicked) {
            throw new AssertionError({ message: `AssertionError: 'Assign Maintainable Items' not available on equipment row '${equipmentDisplayText}' inside Functional Failure detail page` });
        }

        await this.assignMaintainableItemsHeader.waitForDisplayed({ timeout: 60000, timeoutMsg: "AssertionError: Assign Maintainable Items dialog did not open" });
        const miText = await this.maintainableItemsText.getText();
        const miCount = await utils.getAssignedValue(miText);
        console.log(`Available Maintainable Items: ${miCount}`);
        if (miCount === 0) {
            console.log("No Maintainable Items available to assign; cancelling dialog");
            await utils.clickWithWait(this.cancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            this.maintainableItemFunLoc = true;

            console.log("Closing Functional Failure detail page (no Maintainable Items available; skipping downstream FM steps)...");
            const ffCloseBtn = $(`//header[@aria-roledescription='Object page header'][.//span[@dir='auto'][normalize-space()="${baseName}"]]//button[@aria-label='Decline']`);
            if (await ffCloseBtn.isDisplayed().catch(() => false) && await ffCloseBtn.isClickable().catch(() => false)) {
                await utils.clickWithWait(ffCloseBtn);
                await browser.pause(2000);
                console.log("Functional Failure detail page closed");
            } else {
                for (const btn of await this.closeBtn) {
                    if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                        await utils.clickWithWait(btn);
                        await browser.pause(2000);
                        console.log("Functional Failure detail page closed (via fallback)");
                        break;
                    }
                }
            }
        } else {
            const miValue = (await this.maintainableItemValue.getText() || "").trim();
            this.maintainableItemValueFunLoc = miValue;
            console.log(`Selected Maintainable Item: '${miValue}'`);
            await utils.clickWithWait(this.maintainableItemRow);
            await utils.clickWithWait(this.assignBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2500);
            if (await this.okBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.okBtn);
                await utils.waitForBusyIndicatorToDisappear();
            }
            console.log(`Maintainable Item '${miValue}' assigned to equipment '${equipmentDisplayText}' under Functional Failure '${baseName}'`);
        }
    }

    public async verifyMaintainableItemAddedUnderEquipment() {
        if (this.maintainableItemFunLoc === true) {
            console.log("No Maintainable Item was added (count was 0); skipping verification");
            return;
        }
        if (!this.maintainableItemValueFunLoc) {
            throw new AssertionError({ message: "AssertionError: maintainableItemValueFunLoc not set - addMaintainableItemsFromFFDetail must run first" });
        }
        if (!this.selectedEquipmentData || !this.selectedEquipmentData.equipmentId) {
            throw new AssertionError({ message: "AssertionError: selectedEquipmentData not set" });
        }
        const equipmentId = this.selectedEquipmentData.equipmentId;
        const equipmentName = this.selectedEquipmentData.equipmentName;
        const equipmentDisplayText = `${equipmentName} (${equipmentId})`;

        console.log(`Expanding equipment row '${equipmentDisplayText}' in hierarchy to verify Maintainable Item '${this.maintainableItemValueFunLoc}'...`);
        const miSpanXpath = `//span[@dir='auto'][normalize-space()="${this.maintainableItemValueFunLoc}"]`;
        const miSpanFirst = $(miSpanXpath);
        if (!(await miSpanFirst.isDisplayed().catch(() => false))) {
            const chevronXpath =
                `//span[@dir='auto'][normalize-space()="${equipmentDisplayText}"]` +
                `/ancestor::div[span[@role='button' and @title='Expand/Collapse Node']][1]` +
                `/span[@role='button' and @title='Expand/Collapse Node']`;
            const chevron = await $(chevronXpath);
            if (await chevron.isExisting().catch(() => false)) {
                let expanded = (await chevron.getAttribute("aria-expanded").catch(() => "false")) || "false";
                if (expanded !== "true") {
                    try { await chevron.scrollIntoView({ block: "center" }); } catch { /* ignore */ }
                    await browser.pause(300);
                    try {
                        await utils.clickWithWait(chevron);
                    } catch {
                        try { await browser.execute((el: HTMLElement) => el.click(), await chevron); } catch { /* ignore */ }
                    }
                    await browser.pause(2000);
                    expanded = (await chevron.getAttribute("aria-expanded").catch(() => "false")) || "false";
                    if (expanded !== "true") {
                        try {
                            await browser.execute((el: HTMLElement) => {
                                el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
                                el.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
                                el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
                            }, await chevron);
                        } catch { /* ignore */ }
                        await browser.pause(2000);
                        expanded = (await chevron.getAttribute("aria-expanded").catch(() => "false")) || "false";
                    }
                    console.log(`Chevron aria-expanded after click: '${expanded}'`);
                } else {
                    console.log("Equipment row already expanded (aria-expanded='true')");
                }
            } else {
                const nodeIcon = await $(`//span[@dir='auto'][normalize-space()="${equipmentDisplayText}"]/ancestor::div[.//span[@aria-label='Node']][1]//span[@aria-label='Node']`);
                if (await nodeIcon.isExisting().catch(() => false)) {
                    try { await utils.clickWithWait(nodeIcon); }
                    catch { await browser.execute((el: HTMLElement) => el.click(), await nodeIcon); }
                    await browser.pause(2500);
                    console.log(`Fallback: clicked tree Node icon on equipment row '${equipmentDisplayText}'`);
                }
            }
        }
        let miShown = false;
        await browser.waitUntil(async () => {
            const els = await $$(miSpanXpath);
            for (const el of els) {
                if (await el.isDisplayed().catch(() => false)) {
                    miShown = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 60000, interval: 1000, timeoutMsg: `AssertionError: Maintainable Item '${this.maintainableItemValueFunLoc}' not visible under equipment '${equipmentDisplayText}' after expand` });
        if (!miShown) {
            throw new AssertionError({ message: `AssertionError: Maintainable Item '${this.maintainableItemValueFunLoc}' not visible under equipment '${equipmentDisplayText}' after expand` });
        }
        console.log(`Maintainable Item '${this.maintainableItemValueFunLoc}' verified under equipment '${equipmentDisplayText}'`);
    }

    public async addFailureModesFromFFDetail() {
        if (this.maintainableItemFunLoc === true) {
            console.log("No Maintainable Item was added; skipping Failure Modes step");
            return;
        }
        if (!this.maintainableItemValueFunLoc) {
            throw new AssertionError({ message: "AssertionError: maintainableItemValueFunLoc not set - addMaintainableItemsFromFFDetail must run first" });
        }
        console.log(`Clicking + on Maintainable Item '${this.maintainableItemValueFunLoc}' inside Functional Failure detail page to add Failure Modes...`);
        await utils.clickWithWait(this.failureModeAddBtn(this.maintainableItemValueFunLoc));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        let fmClicked = false;
        for (const btn of await this.assignFailureModeBtn) {
            if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                await btn.scrollIntoView();
                await browser.pause(500);
                await utils.clickWithWait(btn);
                const opened = await this.assignFailureModeHeader.waitForDisplayed({ timeout: 15000 }).then(() => true).catch(() => false);
                if (opened) {
                    fmClicked = true;
                    console.log("'Assign Failure Modes' button clicked");
                    break;
                }
            }
        }
        if (!fmClicked) {
            throw new AssertionError({ message: `AssertionError: 'Assign Failure Modes' not available on Maintainable Item '${this.maintainableItemValueFunLoc}' inside Functional Failure detail page` });
        }

        const fmText = await this.failureModeCountText.getText();
        const fmCount = await utils.getAssignedValue(fmText);
        console.log(`Available Failure Modes: ${fmCount}`);
        if (fmCount === 0) {
            console.log("No Failure Modes available to assign; cancelling dialog");
            await utils.clickWithWait(this.cancelBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
            this.failureModeFunLoc = false;

            const ffBaseName = (this.functionalFailureValue || '').split(' (')[0].trim();
            console.log("Closing Functional Failure detail page (no Failure Modes available; skipping downstream FM detail verification)...");
            const ffCloseBtn = $(`//header[@aria-roledescription='Object page header'][.//span[@dir='auto'][normalize-space()="${ffBaseName}"]]//button[@aria-label='Decline']`);
            if (await ffCloseBtn.isDisplayed().catch(() => false) && await ffCloseBtn.isClickable().catch(() => false)) {
                await utils.clickWithWait(ffCloseBtn);
                await browser.pause(2000);
                console.log("Functional Failure detail page closed");
            } else {
                for (const btn of await this.closeBtn) {
                    if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                        await utils.clickWithWait(btn);
                        await browser.pause(2000);
                        console.log("Functional Failure detail page closed (via fallback)");
                        break;
                    }
                }
            }
        } else {
            const fmValue = (await this.failureModeValue.getText() || "").trim();
            this.failureModeValueFunLoc = fmValue;
            console.log(`Selected Failure Mode: '${fmValue}'`);
            await utils.clickWithWait(this.failureModeCheckbox);
            await utils.clickWithWait(this.assignBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2500);
            if (await this.okBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.okBtn);
                await utils.waitForBusyIndicatorToDisappear();
            }
            this.failureModeFunLoc = true;
            console.log(`Failure Mode '${fmValue}' assigned to Maintainable Item '${this.maintainableItemValueFunLoc}'`);
        }
    }

    public async verifyTechnicalObjectDetailFromFF() {
        if (!this.selectedEquipmentData || !this.selectedEquipmentData.equipmentId) {
            throw new AssertionError({ message: "AssertionError: selectedEquipmentData not set" });
        }
        if (!this.functionalFailureValue) {
            throw new AssertionError({ message: "AssertionError: functionalFailureValue not set" });
        }
        const equipmentId = this.selectedEquipmentData.equipmentId;
        const equipmentName = this.selectedEquipmentData.equipmentName;
        const equipmentDisplayText = `${equipmentName} (${equipmentId})`;
        const ffBaseName = this.functionalFailureValue.split(' (')[0].trim();

        console.log(`Opening Technical Object detail page for '${equipmentDisplayText}' from Functional Failure detail...`);
        const openTechObjSelectors = [
            `//tr[@role='row'][.//span[@dir='auto' and normalize-space()="${equipmentDisplayText}"]]//a[normalize-space()="${equipmentDisplayText}" or contains(normalize-space(),"${equipmentId}")]`,
            `//tr[@role='row'][.//span[@dir='auto' and normalize-space()="${equipmentDisplayText}"]]//span[@role='link']`,
            `//span[@dir='auto'][normalize-space()="${equipmentDisplayText}"]/ancestor::tr[@role='row'][1]//span[@role='link' or @role='button']`,
            `//span[@dir='auto'][normalize-space()="${equipmentDisplayText}"]/ancestor::div[4]`
        ];
        let toOpened = false;
        for (const sel of openTechObjSelectors) {
            const candidates = await $$(sel);
            for (const cand of candidates) {
                if (!(await cand.isDisplayed().catch(() => false))) continue;
                try {
                    await cand.scrollIntoView({ block: "center" });
                } catch { /* ignore */ }
                try {
                    await utils.clickWithWait(cand);
                } catch {
                    try { await browser.execute((el: HTMLElement) => el.click(), await cand); } catch { /* ignore */ }
                }
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(2500);
                const headerVisible = await browser.waitUntil(async () => {
                    for (const el of await this.headerTechnicalObjectName(equipmentName)) {
                        if (await el.isDisplayed().catch(() => false)) return true;
                    }
                    return false;
                }, { timeout: 15000, interval: 500 }).then(() => true).catch(() => false);
                if (headerVisible) {
                    toOpened = true;
                    console.log(`Technical Object detail page opened via selector: ${sel}`);
                    break;
                }
                console.log(`Click on candidate did not open TO detail; trying next candidate/selector`);
            }
            if (toOpened) break;
        }
        if (!toOpened) {
            throw new AssertionError({ message: `AssertionError: Could not open Technical Object detail page for '${equipmentDisplayText}' from Functional Failure detail (row click did not navigate)` });
        }
        await browser.pause(1500);

        console.log(`Verifying Technical Object detail page header shows '${equipmentName}'...`);
        let nameFound = false;
        for (const el of await this.headerTechnicalObjectName(equipmentName)) {
            if (await el.isDisplayed().catch(() => false)) {
                nameFound = true;
                break;
            }
        }
        if (!nameFound) {
            throw new AssertionError({ message: `AssertionError: Equipment name '${equipmentName}' not visible on Technical Object detail page header` });
        }
        console.log(`Header name verified: '${equipmentName}'`);

        let idFound = false;
        for (const el of await this.headerTechnicalObjectId(equipmentId)) {
            if (await el.isDisplayed().catch(() => false)) {
                idFound = true;
                break;
            }
        }
        if (!idFound) {
            throw new AssertionError({ message: `AssertionError: Equipment id '${equipmentId}' not visible on Technical Object detail page header` });
        }
        console.log(`Header id verified: '${equipmentId}'`);

        try {
            const fdpEl = $("//bdi[normalize-space()='Failure Data Profile:']/ancestor::div[1]/following::span[normalize-space()][1]");
            if (await fdpEl.isDisplayed().catch(() => false)) {
                console.log(`Failure Data Profile: '${(await fdpEl.getText()).trim()}'`);
            }
        } catch (e) { void e; }
        try {
            const classEl = $("//bdi[normalize-space()='Class:']/ancestor::div[1]/following::span[normalize-space()][1]");
            if (await classEl.isDisplayed().catch(() => false)) {
                console.log(`Class: '${(await classEl.getText()).trim()}'`);
            }
        } catch (e) { void e; }
        try {
            const critEl = $("//bdi[normalize-space()='Criticality:']/ancestor::div[1]/following::span[normalize-space()][1]");
            if (await critEl.isDisplayed().catch(() => false)) {
                console.log(`Criticality: '${(await critEl.getText()).trim()}'`);
            }
        } catch (e) { void e; }

        console.log("Verifying Risk Information section on Technical Object detail page (read-only)...");
        try {
            await this.verifyTechnicalObjectRiskInfo();
        } catch (e) {
            console.log(`Risk Information (Technical Object) read encountered an issue: ${(e as Error).message}`);
        }

        console.log("Verifying Maintenance and Service section on Technical Object detail page...");
        let msClicked = false;
        for (const el of await this.maintenanceServiceSections) {
            if (!(await el.isDisplayed().catch(() => false))) continue;
            try { await el.scrollIntoView({ block: "center" }); } catch { /* ignore */ }
            await browser.pause(300);
            try {
                await utils.clickWithWait(el);
                msClicked = true;
            } catch {
                try {
                    await browser.execute((n: HTMLElement) => n.click(), await el);
                    msClicked = true;
                } catch { /* try next */ }
            }
            if (msClicked) {
                await utils.waitForBusyIndicatorToDisappear();
                await browser.pause(2500);
                break;
            }
        }
        if (!msClicked) {
            console.log("Maintenance and Service tab not clickable on Technical Object detail page; skipping counts");
        } else {
            const msReady = await browser.waitUntil(async () =>
                (await this.maintenanceNotifText.isDisplayed().catch(() => false))
                || (await this.maintenanceOrdersText.isDisplayed().catch(() => false))
                || (await this.maintenancePlansText.isDisplayed().catch(() => false)),
                { timeout: 30000, interval: 1000 }
            ).then(() => true).catch(() => false);
            if (!msReady) {
                console.log("Maintenance and Service content did not render within 30s on Technical Object detail page");
            }
        }
        try {
            const mnText = await this.maintenanceNotifText.getText();
            console.log(`Maintenance Notifications: ${await utils.getAssignedValue(mnText)}`);
        } catch (e) { void e; }
        try {
            const moText = await this.maintenanceOrdersText.getText();
            console.log(`Maintenance Orders: ${await utils.getAssignedValue(moText)}`);
        } catch (e) { void e; }
        try {
            const mpText = await this.maintenancePlansText.getText();
            console.log(`Maintenance Plans: ${await utils.getAssignedValue(mpText)}`);
        } catch (e) { void e; }

        console.log("Closing Technical Object detail page (Functional Failure detail stays open)...");
        void ffBaseName;
        const techObjCloseBtn = $(`//header[@aria-roledescription='Object page header'][.//span[@dir='auto'][normalize-space()="${equipmentName}"]]//button[@aria-label='Decline']`);
        if (await techObjCloseBtn.isDisplayed().catch(() => false) && await techObjCloseBtn.isClickable().catch(() => false)) {
            await utils.clickWithWait(techObjCloseBtn);
            await browser.pause(2000);
        } else {
            for (const btn of await this.closeBtn) {
                if ((await btn.isDisplayed().catch(() => false)) && (await btn.isClickable().catch(() => false))) {
                    await utils.clickWithWait(btn);
                    await browser.pause(2000);
                    break;
                }
            }
        }
        console.log("Technical Object detail page closed");
    }

    public async verifyFailureModeDetail() {
        if (this.failureModeFunLoc !== true) {
            console.log("Failure Mode was not added; skipping Failure Mode detail verification");
            return;
        }
        if (!this.failureModeValueFunLoc) {
            throw new AssertionError({ message: "AssertionError: failureModeValueFunLoc not set - addFailureModesFromFFDetail must run first" });
        }
        const baseName = this.failureModeValueFunLoc.split(' (')[0].trim();
        const codeId = this.failureModeValueFunLoc.match(/\((.*?)\)/)?.[1] || '';
        console.log(`Opening Failure Mode detail page for '${this.failureModeValueFunLoc}' (baseName='${baseName}', codeId='${codeId}')...`);

        const fmSpan = $(`//span[@dir='auto'][normalize-space()="${this.failureModeValueFunLoc}"]`);
        if (!(await fmSpan.isDisplayed().catch(() => false))) {
            console.log(`Expanding Maintainable Item '${this.maintainableItemValueFunLoc}' to reveal Failure Mode '${this.failureModeValueFunLoc}'...`);
            for (const btn of await this.expandBtn(this.maintainableItemValueFunLoc)) {
                if ((await btn.isDisplayed().catch(() => false)) && (await btn.getAttribute("aria-expanded")) === "false") {
                    await utils.clickWithWait(btn);
                    await browser.pause(2500);
                    break;
                }
            }
            if (!(await fmSpan.isDisplayed().catch(() => false))) {
                const nodeIcon = await $(`(//tr[.//span[@dir='auto'][normalize-space()="${this.maintainableItemValueFunLoc}"]]//span[@role='button' and @title='Expand/Collapse Node' and @aria-expanded='false'])[1]`);
                if (await nodeIcon.isExisting().catch(() => false)) {
                    await browser.execute((el: HTMLElement) => el.click(), await nodeIcon);
                    await browser.pause(2500);
                }
            }
        }

        await utils.clickWithWait(this.failureModeRow(this.failureModeValueFunLoc));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);

        console.log(`Verifying Failure Mode detail page header shows '${baseName}'...`);
        const fmHeaderTitleEls = await $$(`//header[@aria-roledescription='Object page header']//div[@role='heading']//span[@dir='auto'][normalize-space()="${baseName}"]`);
        let fmHeaderShown = false;
        await browser.waitUntil(async () => {
            for (const el of fmHeaderTitleEls) {
                if (await el.isDisplayed().catch(() => false)) {
                    fmHeaderShown = true;
                    return true;
                }
            }
            return false;
        }, { timeout: 60000, interval: 1000, timeoutMsg: `AssertionError: Failure Mode detail header did not show '${baseName}'` });
        if (!fmHeaderShown) {
            throw new AssertionError({ message: `AssertionError: Failure Mode detail header did not show '${baseName}'` });
        }
        console.log(`Failure Mode detail page header shows '${baseName}'`);

        if (codeId) {
            console.log(`Verifying Code ID '${codeId}' is present on Failure Mode detail page...`);
            const codeIdEl = $(`//span[normalize-space()='Code ID']/following-sibling::span[normalize-space()="${codeId}"]`);
            await codeIdEl.waitForDisplayed({ timeout: 30000, timeoutMsg: `AssertionError: Code ID '${codeId}' not shown on Failure Mode detail page` });
            console.log(`Code ID matches: '${codeId}'`);
        }

        try {
            const cgIdEl = $("//span[normalize-space()='Code Group ID']/following-sibling::span[normalize-space()][1]");
            if (await cgIdEl.isDisplayed().catch(() => false)) {
                console.log(`Code Group ID: '${(await cgIdEl.getText()).trim()}'`);
            }
        } catch (e) { void e; }
        try {
            const cgsdEl = $("//bdi[normalize-space()='Code Group Short Description:']/ancestor::span[1]/following::span[normalize-space() and not(@aria-hidden='true')][1]");
            if (await cgsdEl.isDisplayed().catch(() => false)) {
                console.log(`Code Group Short Description: '${(await cgsdEl.getText()).trim()}'`);
            }
        } catch (e) { void e; }

        const sectionFailures: string[] = [];
        console.log("========== Failure Mode Detail Verification: START ==========");
        this.analysisFailures = [];
        try {
            await this.verifyAnalysisDetails();
        } catch (e) {
            const msg = (e as Error).message || String(e);
            console.log("Analysis Details error: " + msg);
            sectionFailures.push("Analysis Details: " + msg);
        }
        if (this.analysisFailures && this.analysisFailures.length > 0) {
            for (const f of this.analysisFailures) sectionFailures.push("Analysis Details: " + f);
        }
        await this.dismissOpenDialogs("after Analysis Details on FM detail");

        try { await this.verifyRiskInfoDetails(); } catch (e) {
            const msg = (e as Error).message || String(e);
            console.log("Risk Information error: " + msg);
            sectionFailures.push("Risk Information: " + msg);
        }
        await this.dismissOpenDialogs("after Risk Information on FM detail");

        try { await this.verifyRiskMatrix(); } catch (e) {
            const msg = (e as Error).message || String(e);
            console.log("Risk Matrix error: " + msg);
            sectionFailures.push("Risk Matrix: " + msg);
        }
        console.log("========== Failure Mode Detail Verification: END ==========");

        console.log("Closing Failure Mode detail page (if still open)...");
        let fmStillOpen = false;
        for (const el of fmHeaderTitleEls) {
            if (await el.isDisplayed().catch(() => false)) {
                fmStillOpen = true;
                break;
            }
        }
        if (fmStillOpen) {
            const fmClosed = await this.closeTopMostDetailPanel(baseName);
            if (fmClosed) {
                console.log("Failure Mode detail page closed");
            } else {
                console.log("WARNING: Failure Mode detail panel-Decline not found");
            }
        } else {
            console.log("Failure Mode detail already closed (likely by verifyRiskMatrix)");
        }

        const ffBase = (this.functionalFailureValue || '').split(' (')[0].trim();
        console.log(`Closing Functional Failure detail page (title='${ffBase}')...`);
        const ffTitleXpath = `//*[self::span or self::bdi or self::div or self::h1 or self::h2][normalize-space()="${ffBase}"]`;
        let ffClosed = false;
        for (let attempt = 1; attempt <= 3 && !ffClosed; attempt++) {
            const clicked = await this.closeTopMostDetailPanel(ffBase);
            if (!clicked) {
                console.log(`Attempt ${attempt}: no panel-Decline candidate matched Functional Failure`);
                await browser.pause(1000);
                continue;
            }
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1500);
            const gone = await browser.waitUntil(async () => {
                const titleEls = await $$(ffTitleXpath);
                for (const t of titleEls) {
                    if (await t.isDisplayed().catch(() => false)) return false;
                }
                return true;
            }, { timeout: 8000, interval: 500 }).then(() => true).catch(() => false);
            if (gone) {
                ffClosed = true;
                console.log(`Functional Failure detail page closed (attempt ${attempt})`);
            } else {
                console.log(`Attempt ${attempt}: FF title still visible after Decline click; retrying`);
            }
        }
        if (!ffClosed) {
            console.log(`WARNING: Functional Failure detail page still visible after close attempts (title='${ffBase}')`);
        }

        if (sectionFailures.length > 0) {
            throw new AssertionError({ message: `AssertionError: Failure Mode detail verification had ${sectionFailures.length} issue(s):\n` + sectionFailures.join("\n") });
        }
    }

    public async downloadCreateSystemSummaryReport() {
        if (!this.systemName) {
            throw new AssertionError({ message: "AssertionError: systemName not set - create-system flow must run first" });
        }
        console.log("Downloading Summary Report for Create-System RCM flow...");
        const srClicked = await this.clickHeaderActionWithOverflowFallback("Summary Report");
        if (!srClicked) {
            throw new AssertionError({ message: "AssertionError: 'Summary Report' button not found (directly or via Additional Options overflow)" });
        }
        await (await this.downloadReportHeader).waitForDisplayed({ timeout: 20000 });
        if (await (await this.includeAllTechObjText).isDisplayed().catch(() => false)) {
            await (await this.includeAllTechObjText).click();
        }
        await (await this.downloadReportOkBtn).click();
        await browser.pause(3000);
        await utils.waitForBusyIndicatorToDisappear();
        if (await (await this.confirmationYesBtn).isDisplayed().catch(() => false)) {
            await (await this.confirmationYesBtn).click();
        }
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(4000);
        await utils.clickWithWait(this.okBtn);
        await utils.waitForBusyIndicatorToDisappear();
        const filePath = await utils.waitForDownload(".pdf");
        const pdfContent = await utils.extractTextFromPDF(filePath);
        console.log("----- PDF CONTENT START -----");
        console.log(pdfContent);
        console.log("----- PDF CONTENT END -----");
        const normalize = (val: string) => (val || "").toLowerCase().replace(/[^a-z0-9]/g, "");
        const content = normalize(pdfContent);
        const failures: string[] = [];
        const verifyValue = (label: string, value: string) => {
            if (!value) {
                console.log(`${label} skipped (empty)`);
                return;
            }
            console.log(`\nVerifying ${label}: ${value}`);
            const norm = normalize(value);
            if (value.includes("(")) {
                const match = value.match(/^(.*?)\s*\((.*?)\)$/);
                if (match) {
                    const name = normalize(match[1].trim());
                    const id = normalize(match[2].trim());
                    const hasName = content.includes(name);
                    const hasId = content.includes(id);
                    console.log(`Name check (${name}): ${hasName}`);
                    console.log(`ID check (${id}): ${hasId}`);
                    if (!hasName || !hasId) {
                        failures.push(`${label}: "${value}" | Name Found=${hasName}, ID Found=${hasId}`);
                    }
                    return;
                }
            }
            const found = content.includes(norm);
            console.log(`Check (${norm}): ${found}`);
            if (!found) {
                failures.push(`${label}: "${value}" not found in PDF`);
            }
        };

        verifyValue("systemName", this.systemName);
        verifyValue("subSystemName", this.subSystemName);
        if (this.selectedEquipmentData && this.selectedEquipmentData.equipmentId && this.selectedEquipmentData.equipmentName) {
            const equipmentDisplayText = `${this.selectedEquipmentData.equipmentName} (${this.selectedEquipmentData.equipmentId})`;
            verifyValue("equipmentAssignedToSubSystem", equipmentDisplayText);
        }
        verifyValue("functionValue", this.functionValue);
        verifyValue("functionalFailureValue", this.functionalFailureValue);
        verifyValue("maintainableItemValueFunLoc", this.maintainableItemValueFunLoc);
        verifyValue("failureModeValueFunLoc", this.failureModeValueFunLoc);

        for (const fe of this.failureEffectsCaptured || []) {
            if (fe.name) verifyValue("failureEffect.name", fe.name);
            if (fe.codeId) verifyValue("failureEffect.codeId", fe.codeId);
        }
        for (const fm of this.failureMechanismsCaptured || []) {
            if (fm.name) verifyValue("failureMechanism.name", fm.name);
            if (fm.codeId) verifyValue("failureMechanism.codeId", fm.codeId);
        }
        for (const fc of this.failureCausesCaptured || []) {
            if (fc.name) verifyValue("failureCause.name", fc.name);
            if (fc.codeId) verifyValue("failureCause.codeId", fc.codeId);
        }
        if (this.failureScenarioTextCaptured) {
            verifyValue("failureScenario.description", this.failureScenarioTextCaptured);
        }
        if (this.consequenceEvaluationCaptured) {
            if (this.consequenceEvaluationCaptured.typeOfFailure) verifyValue("consequenceEvaluation.typeOfFailure", this.consequenceEvaluationCaptured.typeOfFailure);
            if (this.consequenceEvaluationCaptured.failurePattern) verifyValue("consequenceEvaluation.failurePattern", this.consequenceEvaluationCaptured.failurePattern);
            if (this.consequenceEvaluationCaptured.safeLife) {
                const safeLifeCore = this.consequenceEvaluationCaptured.safeLife.replace(/\s*\(\d+\)\s*$/, "").trim();
                if (safeLifeCore) verifyValue("consequenceEvaluation.safeLife", safeLifeCore);
            }
            if (this.consequenceEvaluationCaptured.pfInterval) {
                const pfCore = this.consequenceEvaluationCaptured.pfInterval.replace(/\s*\(\d+\)\s*$/, "").trim();
                if (pfCore) verifyValue("consequenceEvaluation.pfInterval", pfCore);
            }
        }

        for (const cs of this.failureStrategiesCaptured || []) {
            const tag = (cs.description || "captured-strategy").toString();
            if (cs.description) verifyValue(`strategyCaptured[${tag}].description`, cs.description);
            if (cs.longDescription) verifyValue(`strategyCaptured[${tag}].longDescription`, cs.longDescription);
            if (cs.mda) verifyValue(`strategyCaptured[${tag}].mda`, cs.mda);
            if (cs.type) verifyValue(`strategyCaptured[${tag}].type`, cs.type);
            if (cs.startDate) verifyValue(`strategyCaptured[${tag}].startDate`, cs.startDate);
            if (cs.sheRiskAtDueDate) verifyValue(`strategyCaptured[${tag}].sheRiskAtDueDate`, cs.sheRiskAtDueDate);
            if (cs.finRiskAtDueDate) verifyValue(`strategyCaptured[${tag}].finRiskAtDueDate`, cs.finRiskAtDueDate);
            if (cs.sheMRAtDueDate) verifyValue(`strategyCaptured[${tag}].sheMRAtDueDate`, cs.sheMRAtDueDate);
            if (cs.finMRAtDueDate) verifyValue(`strategyCaptured[${tag}].finMRAtDueDate`, cs.finMRAtDueDate);
            if (cs.finPof) verifyValue(`strategyCaptured[${tag}].finPof`, cs.finPof);
            if (cs.mitigatedFinPof) verifyValue(`strategyCaptured[${tag}].mitigatedFinPof`, cs.mitigatedFinPof);
            if (cs.inspectionType) verifyValue(`strategyCaptured[${tag}].inspectionType`, cs.inspectionType);
        }

        for (const ri of this.riskInformationCaptured || []) {
            const tag = (ri.transition || "riskRow").toString();
            if (ri.transition) verifyValue(`riskInfo[${tag}].transition`, ri.transition);
            if (ri.lastTransitionDate) verifyValue(`riskInfo[${tag}].lastTransitionDate`, ri.lastTransitionDate);
            if (ri.sheRisk) verifyValue(`riskInfo[${tag}].sheRisk`, ri.sheRisk);
            if (ri.finRisk) verifyValue(`riskInfo[${tag}].finRisk`, ri.finRisk);
            if (ri.finConsequence) verifyValue(`riskInfo[${tag}].finConsequence`, ri.finConsequence);
            if (ri.finPof) verifyValue(`riskInfo[${tag}].finPof`, ri.finPof);
        }

        if (failures.length > 0) {
            console.log("\n===== CREATE-SYSTEM PDF VALIDATION FAILURES =====");
            failures.forEach((failure, index) => {
                console.log(`${index + 1}. ${failure}`);
            });
            console.log("=================================================\n");
            throw new AssertionError({ message: `AssertionError: Create-System PDF Summary Report Validation Failed:\n\n${failures.join("\n")}` });
        }
        console.log("Create-System PDF Summary report verification completed");
    }
}
export default new assetRCMDetailView();
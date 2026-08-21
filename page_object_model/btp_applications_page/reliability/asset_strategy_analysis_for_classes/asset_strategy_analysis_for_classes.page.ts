import { $, browser } from '@wdio/globals';
import utils from '../../../../utils/utils';

export interface CreateAssessmentInput {
    description: string;
    className: string;
    failureDataProfile?: string;
}

export interface PlanningDataInput {
    lastReviewDate?: string;
    nextReviewDate?: string;
    plannedReviewDate?: string;
    nextTADate?: string;
    secondTADate?: string;
}

export interface OrganizationalDataInput {
    planningPlant?: string;
    maintenancePlant?: string;
}

export interface RolesAssignmentInput {
    roles: readonly string[];
    user: string;
}

export interface CharacteristicSelection {
    id: string;
    label?: string;
    value?: string;
    valueIndex?: number;
}

export interface OperatingContextAndConditionInput {
    name: string;
    characteristics: readonly CharacteristicSelection[];
}

class AssetStrategyAnalysisForClassesPage {

    /* ========================
       SELECTORS
       ======================== */

    private get appTile() { return $('//a[starts-with(@aria-label, "Asset Strategy Analysis for Classes")]'); }
    private get appIframe() { return $('iframe[data-help-id="application-fleet-manage"]'); }
    private get createButton() { return $('button[aria-label="Create"]'); }
    private get createDialog() { return $('//div[@role="dialog"][.//h1[normalize-space()="Create Assessment"]]'); }
    private get descriptionInput() { return $('//div[@role="dialog"][.//h1[normalize-space()="Create Assessment"]]//bdi[normalize-space()="Description"]/ancestor::label/following::textarea[1]'); }
    private get classValueHelpIcon() { return $('//div[@role="dialog"][.//h1[normalize-space()="Create Assessment"]]//bdi[normalize-space()="Class"]/ancestor::label/following::span[@aria-label="Show Value Help"][1]'); }
    private get failureDataProfileValueHelpIcon() { return $('//div[@role="dialog"][.//h1[normalize-space()="Create Assessment"]]//bdi[normalize-space()="Failure Data Profile"]/ancestor::label/following::span[@aria-label="Show Value Help"][1]'); }
    private get templateArrow() { return $('//div[@role="dialog"][.//h1[normalize-space()="Create Assessment"]]//bdi[normalize-space()="Select Template"]/ancestor::label/following::span[@role="button"][1]'); }
    private get createAsBaselineCheckbox() { return $('//div[@role="dialog"][.//h1[normalize-space()="Create Assessment"]]//div[contains(@class,"sapMCb")][.//bdi[contains(normalize-space(),"Baseline")] or .//label[contains(normalize-space(),"Baseline")] or @aria-labelledby[contains(.,"Baseline")]] | //div[@role="dialog"][.//h1[normalize-space()="Create Assessment"]]//*[self::label or self::span or self::bdi][contains(normalize-space(),"Create as Baseline") or contains(normalize-space(),"Create As Baseline")]/preceding::div[contains(@class,"sapMCb")][1]'); }
    private get dialogCreateButton() { return $('//div[@role="dialog"][.//h1[normalize-space()="Create Assessment"]]//footer//bdi[normalize-space()="Create"]/ancestor::button'); }
    private get valueHelpFirstRow() { return $('(//div[contains(@class,"sapMDialog")][.//table or .//tbody]//tbody/tr[@role="row"])[1]'); }
    private failureDataProfileRowByDescription(description: string) { return $(`//div[contains(@class,"sapMDialog")]//tbody/tr[@role="row"][.//*[normalize-space()=${utils.xpathString(description)}]]`); }
    private classValueHelpRow(className: string) { return $(`//div[contains(@class,"sapMDialog")]//tr[@role="row"][.//*[normalize-space()=${utils.xpathString(className)}]]`); }
    private get comboboxFirstOption() { return $('(//ul[@role="listbox" and not(ancestor::*[contains(@style,"display: none")])]//li[@role="option"])[1]'); }
    private get saveButton() { return $('//button[@data-ui5-accesskey="s"][.//bdi[normalize-space()="Save"]]'); }
    private get okButton() { return $('//button[@data-ui5-accesskey="o" or @data-ui5-accesskey="y" or ancestor::*[contains(@class,"sapMMessageBox") or contains(@class,"sapMDialogMessage") or @role="alertdialog"]][.//bdi[normalize-space()="OK" or normalize-space()="Ok" or normalize-space()="Yes"]]'); }
    private get manageButton() { return $('//button[@aria-haspopup="menu"][.//bdi[normalize-space()="Manage"]]'); }
    private get deleteMenuItem() { return $('//div[@role="menu"]//li[.//*[normalize-space()="Delete"]] | //ul[@role="menu"]//li[.//*[normalize-space()="Delete"]]'); }
    private get listSearchInput() { return $('//input[@type="search" and @aria-label="Search"]'); }
    private listRowByDescription(description: string) { return $(`//tr[@role="row"][.//*[normalize-space()=${utils.xpathString(description)}]]`); }
    private get editButton() { return $('//button[@data-ui5-accesskey="e"][.//bdi[normalize-space()="Edit"]]'); }
    private get editDescriptionInput() { return $('//bdi[normalize-space()="Description"]/ancestor::label/following::textarea[1] | //bdi[normalize-space()="Description"]/ancestor::label/following::input[1]'); }
    private get editLongDescriptionInput() { return $('//textarea[@id="application-fleet-manage-component---idFleetAssessmentDetailPage--idAssessmentLongDescTextArea-inner"]'); }
    private get editOperatingContextInput() { return $('//textarea[@id="application-fleet-manage-component---idFleetAssessmentDetailPage--idAssessmentOperatingContextTextArea-inner"]'); }
    // New thingy down here
    private editButtonByIndex(index: number) { return $(`(//button[@data-ui5-accesskey="e"][.//bdi[normalize-space()="Edit"]][not(ancestor::*[@id="sap-ui-preserve"])])[${index}]`); }
    private sectionEditButtonByFieldLabel(fieldLabel: string) { return $(`//label//bdi[normalize-space()=${utils.xpathString(fieldLabel)}][not(ancestor::*[@id="sap-ui-preserve"])]` + `/ancestor::*[.//button[@data-ui5-accesskey="e"][.//bdi[normalize-space()="Edit"]]][1]` + `//button[@data-ui5-accesskey="e"][.//bdi[normalize-space()="Edit"]][not(ancestor::*[@id="sap-ui-preserve"])]`);}
    private sectionSaveButtonByFieldLabel(fieldLabel: string) { return $(`//label//bdi[normalize-space()=${utils.xpathString(fieldLabel)}][not(ancestor::*[@id="sap-ui-preserve"])]` +`/ancestor::*[.//button[@data-ui5-accesskey="s"][.//bdi[normalize-space()="Save"]]][1]` +`//button[@data-ui5-accesskey="s"][.//bdi[normalize-space()="Save"]][not(ancestor::*[@id="sap-ui-preserve"])]`);}
    private objectPageSubSectionByTitle(title: string) { return $(`//div[contains(@class,"sapUxAPObjectPageSubSection")]` + `[.//h4[contains(@class,"sapUxAPObjectPageSubSectionTitle")]//span[normalize-space()=${utils.xpathString(title)}]]` + `[not(ancestor::*[@id="sap-ui-preserve"])]`);}
    private sectionEditButtonByTitle(title: string) { return $(`//div[contains(@class,"sapUxAPObjectPageSubSection")]` + `[.//h4[contains(@class,"sapUxAPObjectPageSubSectionTitle")]//span[normalize-space()=${utils.xpathString(title)}]]` + `[not(ancestor::*[@id="sap-ui-preserve"])]` + `//button[@data-ui5-accesskey="e"][.//bdi[normalize-space()="Edit"]][not(ancestor::*[@id="sap-ui-preserve"])]`);}
    private sectionSaveButtonByTitle(title: string) { return $(`//div[contains(@class,"sapUxAPObjectPageSubSection")]` + `[.//h4[contains(@class,"sapUxAPObjectPageSubSectionTitle")]//span[normalize-space()=${utils.xpathString(title)}]]` + `[not(ancestor::*[@id="sap-ui-preserve"])]` + `//button[@data-ui5-accesskey="s"][.//bdi[normalize-space()="Save"]][not(ancestor::*[@id="sap-ui-preserve"])]`);}
    private planningDataPickerIcon(label: string) { return $(`//input[not(ancestor::*[@id="sap-ui-preserve"]) and @id=//label[.//bdi[normalize-space()=${utils.xpathString(label)}] and not(ancestor::*[@id="sap-ui-preserve"])]/@for]/ancestor::div[contains(@class,"sapMInputBase")][1]//span[@aria-label="Open Picker"]`); }
    private planningDataInput(label: string) { return $(`//input[not(ancestor::*[@id="sap-ui-preserve"]) and @id=//label[.//bdi[normalize-space()=${utils.xpathString(label)}] and not(ancestor::*[@id="sap-ui-preserve"])]/@for]`); }
    // Above thingy new thingy
    private static readonly OPEN_POPOVER_XPATH =
        '(//div[contains(@class,"sapMPopover") and not(contains(@style,"display: none")) and not(contains(@style,"visibility: hidden")) and not(@aria-hidden="true")][.//*[contains(@class,"sapUiCal")]])[last()]';
    private get visibleCalendarPopover() { return $(AssetStrategyAnalysisForClassesPage.OPEN_POPOVER_XPATH); }
    private get calendarHeaderMonthButton() { return $(`${AssetStrategyAnalysisForClassesPage.OPEN_POPOVER_XPATH}//button[contains(@class,"sapUiCalHeadB")][1]`); }
    private get calendarHeaderYearButton() { return $(`${AssetStrategyAnalysisForClassesPage.OPEN_POPOVER_XPATH}//button[contains(@class,"sapUiCalHeadB")][2]`); }
    private get calendarPrevButton() { return $(`${AssetStrategyAnalysisForClassesPage.OPEN_POPOVER_XPATH}//button[contains(@class,"sapUiCalHeadBPrev") or @aria-label="Previous"]`); }
    private get calendarNextButton() { return $(`${AssetStrategyAnalysisForClassesPage.OPEN_POPOVER_XPATH}//button[contains(@class,"sapUiCalHeadBNext") or @aria-label="Next"]`); }
    private calendarDayByDataAttr(yyyymmdd: string) { return $(`${AssetStrategyAnalysisForClassesPage.OPEN_POPOVER_XPATH}//*[(@data-sap-day=${utils.xpathString(yyyymmdd)} or @data-sap-ui-date=${utils.xpathString(yyyymmdd)}) and not(contains(@class,"sapUiCalItemOtherMonth"))]`); }
    private organizationalDataValueHelpIcon(label: string) { return $(`//input[not(ancestor::*[@id="sap-ui-preserve"]) and @id=//label[.//bdi[normalize-space()=${utils.xpathString(label)}] and not(ancestor::*[@id="sap-ui-preserve"])]/@for]/ancestor::div[contains(@class,"sapMInputBase")][1]//span[@aria-label="Show Value Help"]`); }

    /* --- Roles section --- */
    private get addRoleButton() { return $('//button[@data-ui5-accesskey="a"][.//bdi[normalize-space()="Add Role"]]'); }
    private get rolesEditButton() { return $('//button[.//bdi[normalize-space()="Add Role"]]/ancestor::*[contains(@class,"sapMTB") or contains(@class,"sapMOTB")][1]//button[@data-ui5-accesskey="e"][.//bdi[normalize-space()="Edit"]]'); }
    private get roleSelectionDialog() { return $('//div[contains(@class,"sapMDialog") and not(contains(@style,"display: none"))][.//li[@role="listitem"][.//div[@role="checkbox"]]]'); }
    private roleSelectionCheckbox(roleName: string) { return $(`//div[contains(@class,"sapMDialog")]//li[@role="listitem"][.//*[normalize-space()=${utils.xpathString(roleName)}]]//div[@role="checkbox"]`); }
    private roleAssignmentValueHelpIcon(roleName: string) { return $(`//label[.//bdi[normalize-space()=${utils.xpathString(roleName)}]]/following::span[@aria-label="Show Value Help"][1]`); }

    /* --- User-selection dialog --- */
    private get userSelectionDialog() { return $('//div[contains(@class,"sapMDialog")][.//h1[normalize-space()="Select Users"]]'); }
    private get userSelectionSearchInput() { return $('//div[contains(@class,"sapMDialog")][.//h1[normalize-space()="Select Users"]]//input[@type="search"]'); }
    private userSelectionRow(userName: string) { return $(`//div[contains(@class,"sapMDialog")][.//h1[normalize-space()="Select Users"]]//tr[@role="row"][.//*[normalize-space()=${utils.xpathString(userName)}]]`); }
    private userSelectionRowCheckbox(userName: string) { return $(`//div[contains(@class,"sapMDialog")][.//h1[normalize-space()="Select Users"]]//tr[@role="row"][.//*[normalize-space()=${utils.xpathString(userName)}]]//div[@role="checkbox"]`); }
    private get userSelectionOkButton() { return $('//div[contains(@class,"sapMDialog")][.//h1[normalize-space()="Select Users"]]//footer//button[.//bdi[normalize-space()="Ok" or normalize-space()="OK"]]'); }
    private roleAssignmentRemoveTokenIcon(roleName: string, userName: string) { return $(`//label[.//bdi[normalize-space()=${utils.xpathString(roleName)}]]/following::div[contains(@class,"sapMToken")][.//*[normalize-space()=${utils.xpathString(userName)}]][1]//span[@aria-label="Remove" or @title="Remove"]`); }

    /* --- Assessment section --- */
    private get assessmentAnchorButton() { return $('//*[@role="tab"][.//span[contains(@class,"sapMITHTextContent") and normalize-space()="Assessment"] or .//bdi[normalize-space()="Assessment"]]'); }
    private get createOperatingContextAndConditionButton() { return $('//button[.//bdi[normalize-space()="Create Operating Context and Condition"]]'); }

    /* --- "Operating Context and Condition" dialog --- */
    private get occDialog() { return $('//div[contains(@class,"sapMDialog")][.//h1[normalize-space()="Operating Context and Condition"]]'); }
    private get occNameTextarea() { return $('//div[contains(@class,"sapMDialog")][.//h1[normalize-space()="Operating Context and Condition"]]//bdi[normalize-space()="Operating Context and Condition Name"]/ancestor::label/following::textarea[1]'); }
    private get addCharacteristicsButton() { return $('//div[contains(@class,"sapMDialog")][.//h1[normalize-space()="Operating Context and Condition"]]//button[.//bdi[normalize-space()="Add Characterstics" or normalize-space()="Add Characteristics"]]'); }
    private get occCreateButton() { return $('//div[contains(@class,"sapMDialog")][.//h1[normalize-space()="Operating Context and Condition"]]//footer//button[@data-ui5-accesskey="c"][.//bdi[normalize-space()="Create"]]'); }
    private characteristicsRowCheckbox(charId: string) { return $(`//div[contains(@class,"sapMDialog")]//tr[@role="row"][.//*[normalize-space()=${utils.xpathString(charId)} or contains(normalize-space(),${utils.xpathString(`(${charId})`)})]]//div[@role="checkbox"]`); }
    private get characteristicsAssignButton() { return $('//div[contains(@class,"sapMDialog")]//footer//button[.//bdi[normalize-space()="Assign" or normalize-space()="OK" or normalize-space()="Ok" or normalize-space()="Select"]]'); }
    private characteristicComboboxArrow(charId: string) { return $(`//div[contains(@class,"sapMDialog")][.//h1[normalize-space()="Operating Context and Condition"]]//label[.//bdi[contains(normalize-space(),${utils.xpathString(`(${charId})`)})]]/following::div[contains(@class,"sapMComboBoxBase") or contains(@class,"sapMMultiComboBox")][1]//span[@role="button" and (@aria-label="Select Options" or @aria-label="Open")]`); }
    private comboboxOptionByText(value: string) { return $(`//div[(contains(@class,"sapMPopover") or contains(@class,"sapMSelectList")) and not(contains(@style,"display: none")) and not(contains(@style,"visibility: hidden"))]//li[@role="option"][normalize-space()=${utils.xpathString(value)} or contains(normalize-space(),${utils.xpathString(`(${value})`)}) or .//bdi[normalize-space()=${utils.xpathString(value)} or contains(normalize-space(),${utils.xpathString(`(${value})`)})] or .//span[normalize-space()=${utils.xpathString(value)} or contains(normalize-space(),${utils.xpathString(`(${value})`)})]]`); }
    private comboboxCheckboxByIndex(index: number) { return $(`(//div[(contains(@class,"sapMPopover") or contains(@class,"sapMSelectList") or contains(@class,"sapMComboBoxBasePicker")) and not(contains(@style,"display: none")) and not(contains(@style,"visibility: hidden"))][.//li[@role="option"]])[last()]//li[@role="option"][${index}]//div[@role="checkbox"]`); }
    private comboboxLiByIndex(index: number) { return $(`(//div[(contains(@class,"sapMPopover") or contains(@class,"sapMSelectList") or contains(@class,"sapMComboBoxBasePicker")) and not(contains(@style,"display: none")) and not(contains(@style,"visibility: hidden"))][.//li[@role="option"]])[last()]//li[@role="option"][${index}]`); }
    private get useBaselineButton() { return $('//button[@data-ui5-accesskey="u"][.//bdi[normalize-space()="Use Baseline"]]'); }
    private occAddButtonByName(occName: string) { return $(`(//*[normalize-space()=${utils.xpathString(occName)}]/ancestor::*[.//button[@aria-label="Add" or @title="Add"]][1]//button[@aria-label="Add" or @title="Add"])[1]`); }
    private occEditButtonByName(occName: string) { return $(`(//*[normalize-space()=${utils.xpathString(occName)}]/ancestor::*[.//button[@aria-label="edit" or @title="edit" or @aria-label="Edit" or @title="Edit"]][1]//button[@aria-label="edit" or @title="edit" or @aria-label="Edit" or @title="Edit"])[1]`); }
    private get assignMaintainableItemsMenuItem() { return $('//li[@role="listitem" and (@title="Assign Maintainable Items" or .//div[normalize-space()="Assign Maintainable Items"])]'); }
    private get assignFailureModesMenuItem() { return $('//li[@role="listitem" and (@title="Assign Failure Modes" or .//div[normalize-space()="Assign Failure Modes"] or .//*[normalize-space()="Assign Failure Modes"])]'); }
    private maintainableItemRowCheckbox(rowText: string) { return $(`//tr[@role="row"][.//*[contains(normalize-space(),${utils.xpathString(rowText)})]]//td[contains(@class,"sapMListTblSelCol")]//div[@role="checkbox"]`); }
    private maintainableItemRow(rowText: string) { return $(`//tr[@role="row"][.//*[contains(normalize-space(),${utils.xpathString(rowText)})]]`); }
    private get firstMaintainableItemMultiSelectCheckbox() { return $('(//div[contains(@class,"sapMDialog") and not(contains(@style,"display: none"))]//tr[@role="row"]//td[contains(@class,"sapMListTblSelCol")]//div[@role="checkbox" or contains(@class,"sapMCb")])[1]'); }
    private get assignDialogSearchInput() { return $('(//div[(contains(@class,"sapMPopover") or contains(@class,"sapMDialog")) and not(contains(@style,"display: none"))]//input[@type="search"])[last()]'); }
    private get firstAssignDialogItemCheckbox() { return $('(//li[@role="option" or @role="listitem"][.//div[@role="checkbox"]][not(.//*[normalize-space()="Codes"])])[1]//div[@role="checkbox"] | (//tr[@role="row"]//td[contains(@class,"sapMListTblSelCol")]//div[@role="checkbox"])[1] | (//div[contains(@class,"sapMCb")][@role="checkbox"])[2]'); }
    private firstAssignDialogItemCheckboxByText(text: string) { return $(`((//li[.//*[contains(normalize-space(),${utils.xpathString(text)})]] | //tr[@role="row"][.//*[contains(normalize-space(),${utils.xpathString(text)})]])[1]//input[translate(@type,"checkbox","CHECKBOX")="CHECKBOX"]/parent::*)[1] | ((//li[.//*[contains(normalize-space(),${utils.xpathString(text)})]] | //tr[@role="row"][.//*[contains(normalize-space(),${utils.xpathString(text)})]])[1]//*[@role="checkbox"])[1]`); }
    private get assignDialogAssignButton() { return $('//div[contains(@class,"sapMDialog")]//footer//button[.//bdi[normalize-space()="Assign"]]'); }
    private sectionAssignButtonByName(sectionName: string) { return $(`(//*[self::span or self::bdi or self::div][starts-with(normalize-space(),${utils.xpathString(sectionName)})]/ancestor::*[.//*[(self::a or self::button or @role="button") and (.//bdi[normalize-space()="Assign"] or normalize-space()="Assign")]][1]//*[(self::a or self::button or @role="button") and (.//bdi[normalize-space()="Assign"] or normalize-space()="Assign")])[1]`); }
    //  New thingy 
    private sectionRemoveButtonByName(sectionName: string) {
        if (sectionName.startsWith('Failure Mechanism')) {
            return $('//button[contains(@id,"idMechanisamEfectRemoveBtn") and @data-ui5-accesskey="u"] | //button[contains(@id,"idMechanisamEfectRemoveBtn")][.//bdi[normalize-space()="Unassign" or normalize-space()="Remove"]]');
        }
        if (sectionName.startsWith('Causes')) {
            return $('//button[contains(@id,"idCauseEfectRemoveBtn") and @data-ui5-accesskey="u"] | //button[contains(@id,"idCauseEfectRemoveBtn")][.//bdi[normalize-space()="Unassign" or normalize-space()="Remove"]]');
}
        return $(`(//*[self::span or self::bdi or self::div][starts-with(normalize-space(),${utils.xpathString(sectionName)})]/ancestor::*[.//*[(self::a or self::button or @role="button") and (@data-ui5-accesskey="u" or .//bdi[normalize-space()="Unassign" or normalize-space()="Remove"] or normalize-space()="Unassign" or normalize-space()="Remove")]][1]//*[(self::a or self::button or @role="button") and (@data-ui5-accesskey="u" or .//bdi[normalize-space()="Unassign" or normalize-space()="Remove"] or normalize-space()="Unassign" or normalize-space()="Remove")])[1]`);}   
    private sectionExpandIconByName(sectionName: string) { return $(`(//*[self::span or self::bdi or self::div][starts-with(normalize-space(),${utils.xpathString(sectionName)})]/ancestor::*[.//button[@aria-label="Expand/Collapse" or @title="Expand/Collapse"]][1]//button[@aria-label="Expand/Collapse" or @title="Expand/Collapse"])[1]`); }
    private sectionRowCheckboxByText(itemText: string) { return $(`(//tr[@role="row"][.//*[normalize-space()=${utils.xpathString(itemText)} or starts-with(normalize-space(),${utils.xpathString(itemText)})]]//td[contains(@class,"sapMListTblSelCol")]//div[@role="checkbox" or contains(@class,"sapMCb")])[1]`); }
    private sectionCreateButtonByName(sectionName: string) { return $(`(//*[self::span or self::bdi or self::div][starts-with(normalize-space(),${utils.xpathString(sectionName)})]/ancestor::*[.//*[(self::a or self::button or @role="button") and (.//bdi[normalize-space()="Create"] or normalize-space()="Create")]][1]//*[(self::a or self::button or @role="button") and (.//bdi[normalize-space()="Create"] or normalize-space()="Create")])[1]`); }

    /* --- Create Strategy dialog --- */
    private get createStrategyDialog() { return $('//div[contains(@class,"sapMDialog") and not(contains(@style,"display: none"))][.//*[normalize-space()="Create Strategy"]]'); }
    private createStrategyDialogField(label: string) { return $(`//div[contains(@class,"sapMDialog")][.//*[normalize-space()="Create Strategy"]]//label[.//bdi[starts-with(normalize-space(),${utils.xpathString(label)})] or starts-with(normalize-space(),${utils.xpathString(label)})]/following::*[self::input or self::textarea][1]`); }
    private createStrategyDialogSelectArrow(label: string) { return $(`//div[contains(@class,"sapMDialog")][.//*[normalize-space()="Create Strategy"]]//label[.//bdi[starts-with(normalize-space(),${utils.xpathString(label)})] or starts-with(normalize-space(),${utils.xpathString(label)})]/following::*[(@role="button") and (.//span[normalize-space()="Select Options" or normalize-space()="Open"] or @aria-label="Select Options" or @aria-label="Open")][1]`); }
    private get createStrategyDialogCreateButton() { return $('//div[contains(@class,"sapMDialog")][.//*[normalize-space()="Create Strategy"]]//footer//button[.//bdi[normalize-space()="Create"]]'); }

    /* --- Edit Strategy dialog --- */
    private get editStrategyDialog() { return $('//div[contains(@class,"sapMDialog") and not(contains(@style,"display: none"))][.//*[normalize-space()="Edit Strategy"]]'); }
    private editStrategyDialogField(label: string) { return $(`//div[contains(@class,"sapMDialog")][.//*[normalize-space()="Edit Strategy"]]//label[.//bdi[starts-with(normalize-space(),${utils.xpathString(label)})] or starts-with(normalize-space(),${utils.xpathString(label)})]/following::*[self::input or self::textarea][1]`); }
    private editStrategyDialogSelectArrow(label: string) { return $(`//div[contains(@class,"sapMDialog")][.//*[normalize-space()="Edit Strategy"]]//label[.//bdi[starts-with(normalize-space(),${utils.xpathString(label)})] or starts-with(normalize-space(),${utils.xpathString(label)})]/following::*[(@role="button") and (.//span[normalize-space()="Select Options" or normalize-space()="Open"] or @aria-label="Select Options" or @aria-label="Open")][1]`); }
    private get editStrategyDialogSaveButton() { return $('//div[contains(@class,"sapMDialog")][.//*[normalize-space()="Edit Strategy"]]//footer//button[.//bdi[normalize-space()="Save"]]'); }
    private strategyRowCheckboxByText(itemText: string) { return $(`(//tr[@role="row"][.//*[normalize-space()=${utils.xpathString(itemText)} or starts-with(normalize-space(),${utils.xpathString(itemText)})]]//td[contains(@class,"sapMListTblSelCol")]//div[@role="checkbox" or contains(@class,"sapMCb")])[1]`); }
    private sectionToolbarButtonByName(sectionName: string, buttonText: string) { return $(`(//*[self::span or self::bdi or self::div][starts-with(normalize-space(),${utils.xpathString(sectionName)})]/ancestor::*[.//*[(self::a or self::button or @role="button") and (.//bdi[normalize-space()=${utils.xpathString(buttonText)}] or normalize-space()=${utils.xpathString(buttonText)})]][1]//*[(self::a or self::button or @role="button") and (.//bdi[normalize-space()=${utils.xpathString(buttonText)}] or normalize-space()=${utils.xpathString(buttonText)})])[1]`); }
    private operatingContextLabelByName(occName: string) { return $(`(//div[contains(@class,"sapMFlexBox") and contains(@class,"sapMHBox")][.//span[contains(@class,"sapMText")][normalize-space()=${utils.xpathString(occName)}]][.//button[@aria-label="Add" or @title="Add"]]//div[contains(@class,"sapMFlexBox") and contains(@class,"sapMHBox")][.//span[contains(@class,"sapMText")][normalize-space()=${utils.xpathString(occName)}]])[1]`); }
    private operatingContextTextByName(occName: string) { return $(`(//span[contains(@class,"sapMText")][normalize-space()=${utils.xpathString(occName)}])[last()]`); }
    private operatingContextRowByName(occName: string) { return $(`((//span[contains(@class,"sapMText")][normalize-space()=${utils.xpathString(occName)}]` + `/ancestor::div[contains(@class,"sapMFlexBox") and contains(@class,"sapMHBox")][1]` + `/ancestor::div[contains(@class,"sapMFlexBox") and contains(@class,"sapMHBox")][1])[1])`);}
    
    /* --- Assign/Unassign Technical Object --- */
    private get assignUnassignTechnicalObjectButton() { return $('//button[@data-ui5-accesskey="a" and @aria-haspopup="menu"][.//bdi[normalize-space()="Assign/Unassign Technical Object"]]'); }
    private unifiedMenuItemByText(text: string) { return $(`(//ul[@role="menu"]//li[@role="menuitem"][.//div[contains(@class,"sapUiMnuItmTxt") and normalize-space()=${utils.xpathString(text)}] or .//*[normalize-space()=${utils.xpathString(text)}]])[last()]`); }
    private get equipmentDialog() { return $('(//*[self::div or self::section][.//*[starts-with(normalize-space(),"Equipment (")]][.//tr[@role="row"]])[last()]'); }
    private get firstEquipmentRowCheckbox() {
        const root = '(//*[self::div or self::section][.//*[starts-with(normalize-space(),"Equipment (")]][.//tr[@role="row"]])[last()]';
        return $(`(${root}//tr[@role="row"][.//td]//td[contains(@class,"sapMListTblSelCol")]//*[@role="checkbox"])[1] | (${root}//tr[@role="row"][.//td]//td[contains(@class,"sapMListTblSelCol")]//div[contains(@class,"sapMCb")])[1] | (${root}//tr[@role="row"][.//td]//td[contains(@class,"sapMListTblSelCol")]//input[translate(@type,"checkbox","CHECKBOX")="CHECKBOX"]/parent::*)[1]`);
    }
    private get equipmentDialogConfirmButton() { return $('//button[.//bdi[normalize-space()="Confirm"]]'); }
    private get closeColumnButton() { return $('//button[@aria-label="Close column" or @title="Close column"]'); }

    /* --- Notes (header button on a detail panel) --- */
    private get notesHeaderButton() { return $('//button[(contains(@aria-label,"Note") or contains(@title,"Note")) and not(contains(@aria-label,"Notification")) and not(contains(@title,"Notification"))]'); }
    private get notesContainer() { return $('(//div[(contains(@class,"sapMDialog") or contains(@class,"sapMPopover")) and not(contains(@style,"display: none")) and not(contains(@style,"visibility: hidden"))][.//*[normalize-space()="Notes"]])[last()]'); }
    private get notesContainerTextarea() { return $('(//div[(contains(@class,"sapMDialog") or contains(@class,"sapMPopover")) and not(contains(@style,"display: none")) and not(contains(@style,"visibility: hidden"))][.//*[normalize-space()="Notes"]]//textarea)[last()]'); }
    private get notesContainerSaveButton() { return $('(//div[(contains(@class,"sapMDialog") or contains(@class,"sapMPopover")) and not(contains(@style,"display: none")) and not(contains(@style,"visibility: hidden"))][.//*[normalize-space()="Notes"]]//button[.//bdi[normalize-space()="Save"]])[last()]'); }
    private get notesContainerCloseButton() { return $('(//div[(contains(@class,"sapMDialog") or contains(@class,"sapMPopover")) and not(contains(@style,"display: none")) and not(contains(@style,"visibility: hidden"))][.//*[normalize-space()="Notes"]]//button[.//bdi[normalize-space()="Close"]])[last()]'); }

    private assessmentHierarchyTreeIcon(rowIndex: number = 0) { return $(`//span[contains(@id,"idAssessmentHierarchy-rows-row${rowIndex}-treeicon") and @role="button"]`); }
    private assessmentHierarchyAddButtonByRowIndex(rowIndex: number) { return $(`//tr[contains(@id,"idAssessmentHierarchy-rows-row${rowIndex}-") or substring-after(@id,"idAssessmentHierarchy-rows-row")="${rowIndex}"]//button[@aria-label="Add" or @title="Add"]`); }
    private assessmentHierarchyAddButtonByRowText(rowText: string) { return $(`//*[contains(@id,"idAssessmentHierarchy-rows-row") and .//*[normalize-space()=${utils.xpathString(rowText)} or contains(normalize-space(),${utils.xpathString(rowText)})]][not(.//*[contains(@id,"idAssessmentHierarchy-rows-row") and not(.//*[normalize-space()=${utils.xpathString(rowText)} or contains(normalize-space(),${utils.xpathString(rowText)})])])]//button[@aria-label="Add" or @title="Add"]`); }
    private assessmentHierarchyDeclineButtonByRowText(rowText: string) {
        const t = utils.xpathString(rowText);
        return $(
            `//*[contains(@id,"idAssessmentHierarchy-rows-row") and .//*[normalize-space()=${t} or contains(normalize-space(),${t})]][not(.//*[contains(@id,"idAssessmentHierarchy-rows-row") and not(.//*[normalize-space()=${t} or contains(normalize-space(),${t})])])]//button[@aria-label="Decline" or @title="Decline"]`
            + ` | `
            + `(//span[contains(@class,"sapMText")][normalize-space()=${t} or starts-with(normalize-space(),${t})]/ancestor::div[contains(@class,"sapMFlexBox") and contains(@class,"sapMHBox")][.//button[@aria-label="Decline" or @title="Decline"]][1]//button[@aria-label="Decline" or @title="Decline"])[1]`
        );
    }
    private assessmentHierarchyRowByText(rowText: string) { return $(`(//tr[@role="row"]//span[contains(@class,"sapMText")][normalize-space()=${utils.xpathString(rowText)} or starts-with(normalize-space(),${utils.xpathString(rowText)})])[1]`); }

    /* --- Select Baselines dialog --- */
    private get selectBaselinesDialog() { return $('//div[contains(@class,"sapMDialog") and not(contains(@style,"display: none"))][.//*[normalize-space()="Select Baselines"]]'); }
    private get firstBaselineRadioButton() { return $('(//div[contains(@class,"sapMDialog")][.//*[normalize-space()="Select Baselines"]]//tr[@role="row"][.//td]//*[@role="radio" or contains(@class,"sapMRb")])[1]'); }
    private get selectBaselinesApplyButton() { return $('//div[contains(@class,"sapMDialog")][.//*[normalize-space()="Select Baselines"]]//footer//button[.//bdi[normalize-space()="Apply"]]'); }

    /* --- Summary Report --- */
    private get summaryReportButton() { return $('//button[.//bdi[normalize-space()="Summary Report"]] | //a[.//bdi[normalize-space()="Summary Report"]]'); }
    private get yesButton() { return $('//div[contains(@class,"sapMDialog") or contains(@class,"sapMMessageBox") or @role="alertdialog"][not(contains(@style,"display: none"))]//footer//button[.//bdi[normalize-space()="Yes"]] | //div[contains(@class,"sapMMessageBox") or @role="alertdialog"][not(contains(@style,"display: none"))]//button[.//bdi[normalize-space()="Yes"]]'); }

    /* ========================
       ACTIONS
       ======================== */

    async navigateToApp(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForSAPPopupAndClose(10);
        await utils.clickWithWait(this.appTile);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.appIframe);
        await browser.pause(2000);
        console.log('[ACTION] Navigated to Asset Strategy Analysis for Classes app');
    }

    async refreshApp(): Promise<void> {
        await browser.switchToParentFrame();
        await browser.refresh();
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForSAPPopupAndClose(10);
        await utils.switchToIframe(this.appIframe);
        await browser.pause(2000);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Page refreshed and re-entered app iframe');
    }

    async clickCreateButton(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.createButton);
        await utils.waitForBusyIndicatorToDisappear();
        await this.createDialog.waitForDisplayed({ timeout: 30000 });
        console.log('[ACTION] Create button clicked, dialog displayed');
    }

    async fillDescription(description: string): Promise<void> {
        const el = await this.descriptionInput;
        await el.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.descriptionInput);
        await el.clearValue();
        await el.setValue(description);
        await browser.keys('Tab');
        console.log(`[ACTION] Description entered: ${description}`);
    }

    async selectClass(className: string): Promise<void> {
        await utils.clickWithWait(this.classValueHelpIcon);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.classValueHelpRow(className));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Class selected: ${className}`);
    }

    async selectFailureDataProfileFirstRow(): Promise<void> {
        await utils.clickWithWait(this.failureDataProfileValueHelpIcon);
        await utils.waitForBusyIndicatorToDisappear();
        await this.valueHelpFirstRow.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.valueHelpFirstRow);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Failure Data Profile — first row selected');
    }

    async selectFailureDataProfileByDescription(description: string): Promise<void> {
        await utils.clickWithWait(this.failureDataProfileValueHelpIcon);
        await utils.waitForBusyIndicatorToDisappear();
        const row = await this.failureDataProfileRowByDescription(description);
        await row.waitForDisplayed({ timeout: 30000 });
        await row.scrollIntoView({ block: 'center' });
        await utils.clickWithWait(this.failureDataProfileRowByDescription(description));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Failure Data Profile selected: ${description}`);
    }

    async selectTemplateFirstOption(): Promise<void> {
        await utils.clickWithWait(this.templateArrow);
        await utils.waitForBusyIndicatorToDisappear();
        await this.comboboxFirstOption.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.comboboxFirstOption);
        console.log('[ACTION] Template — first option selected');
    }

    async checkCreateAsBaselineCheckbox(): Promise<void> {
        const checkbox = await this.createAsBaselineCheckbox;
        await checkbox.waitForDisplayed({ timeout: 30000 });
        await checkbox.scrollIntoView({ block: 'center' });
        await utils.clickWithWait(this.createAsBaselineCheckbox);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] "Create as Baseline" checkbox checked');
    }

    async clickDialogCreate(): Promise<void> {
        await utils.clickWithWait(this.dialogCreateButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Dialog Create button clicked');
    }

    async confirmSuccessPopup(): Promise<void> {
        const ok = await this.okButton;
        await ok.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.okButton);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(4000);
        console.log('[ACTION] Success popup OK clicked, assessment opened');
    }

    async clickEditButton(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.editButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Edit button clicked');
    }

    async clickEditButtonByIndex(index: number): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.editButtonByIndex(index);
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.editButtonByIndex(index));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Edit button #${index} clicked`);
    }

    async clickSectionEditButton(sectionTitle: string): Promise<void> {
        const indexMap: Record<string, number> = {
            'General Information': 1,
            'Planning Data': 2,
            'Organizational Data': 3,
            'Roles': 4
        };
        const idx = indexMap[sectionTitle] ?? 1;
        await this.clickEditButtonByIndex(idx);
        console.log(`[ACTION] Edit button clicked for section: ${sectionTitle}`);
    }

    /**
     * Type a date directly into a Planning Data input (format matches placeholder,
     * e.g. "Dec 31, 2026"). Avoids the fragile calendar-popover navigation which
     * fails when a MessageBox / overlay is intercepting clicks.
     */
    private async fillPlanningDataField(label: string, value: string): Promise<void> {
        await this.dismissAnyMessageBox();
        await this.dismissAnyOpenCalendarPopover();

        const input = await this.planningDataInput(label);
        await input.waitForExist({ timeout: 30000 });
        await input.scrollIntoView({ block: 'center' });
        await input.waitForDisplayed({ timeout: 30000 });

        // Focus + clear + type. clickWithWait handles overlay retries.
        await utils.clickWithWait(this.planningDataInput(label));
        try { await input.clearValue(); } catch { /* some SAP inputs disallow clearValue */ }
        // Fallback clear: Ctrl+A / Delete in case clearValue was a no-op.
        try {
            await browser.keys(['Control', 'a']);
            await browser.keys('Delete');
        } catch { /* ignore */ }
        await input.setValue(value);
        await browser.keys('Enter');
        await browser.keys('Tab');
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Planning Data — ${label}: ${value}`);
    }

    private async dismissAnyOpenCalendarPopover(): Promise<void> {
        for (let attempt = 0; attempt < 3; attempt++) {
            const popover = await this.visibleCalendarPopover;
            if (!(await popover.isExisting()) || !(await popover.isDisplayed())) {
                return;
            }
            await browser.keys('Escape');
            await browser.pause(300);
        }
        // Last-resort: click on the body to dismiss.
        try {
            await browser.execute(() => document.body.click());
            await browser.pause(300);
        } catch {
            /* ignore */
        }
    }

    /** Close any open success / warning / error MessageBox that could be intercepting clicks. */
    private async dismissAnyMessageBox(): Promise<void> {
        const boxOk = $(
            '//div[(contains(@class,"sapMMessageBox") or @role="alertdialog") and not(contains(@style,"display: none")) and not(contains(@style,"visibility: hidden"))]' +
            '//button[.//bdi[normalize-space()="OK" or normalize-space()="Ok" or normalize-space()="Close" or normalize-space()="Yes"]]'
        );
        for (let attempt = 0; attempt < 4; attempt++) {
            if (!(await boxOk.isExisting())) return;
            if (!(await boxOk.isDisplayed().catch(() => false))) return;
            try {
                await boxOk.click();
            } catch {
                try { await browser.execute((el: HTMLButtonElement) => el.click(), boxOk as unknown as HTMLButtonElement); } catch { /* ignore */ }
            }
            await browser.pause(400);
        }
    }

    private parseDate(value: string): Date {
        const d = new Date(value);
        if (isNaN(d.getTime())) {
            throw new Error(`Unrecognized date format: "${value}". Expected e.g. "Dec 31, 2026".`);
        }
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    private toYyyymmdd(d: Date): string {
        const y = d.getFullYear().toString().padStart(4, '0');
        const m = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${y}${m}${day}`;
    }

    private async navigateCalendarToMonth(target: Date): Promise<void> {
        const targetYear = target.getFullYear();
        const targetMonth = target.getMonth();

        for (let i = 0; i < 600; i++) {
            const monthEl = await this.calendarHeaderMonthButton;
            const yearEl = await this.calendarHeaderYearButton;
            await monthEl.waitForExist({ timeout: 30000 });
            await yearEl.waitForExist({ timeout: 30000 });

            const monthText = (await monthEl.getText()).trim();
            const yearText = (await yearEl.getText()).trim();

            const currentYear = parseInt(yearText, 10);
            const parsedMonth = new Date(`${monthText} 1, 2000`);
            const currentMonth = isNaN(parsedMonth.getTime()) ? NaN : parsedMonth.getMonth();

            if (!isNaN(currentYear) && !isNaN(currentMonth)
                && currentYear === targetYear && currentMonth === targetMonth) {
                return;
            }

            const goForward = isNaN(currentYear) || isNaN(currentMonth)
                ? true
                : (currentYear < targetYear
                    || (currentYear === targetYear && currentMonth < targetMonth));

            await utils.clickWithWait(goForward ? this.calendarNextButton : this.calendarPrevButton);
            await browser.pause(120);
        }
        throw new Error(`Could not navigate calendar to ${target.toDateString()}`);
    }

    async fillPlanningDataForm(data: PlanningDataInput): Promise<void> {
        if (data.lastReviewDate)    await this.fillPlanningDataField('Last Review Date', data.lastReviewDate);
        if (data.nextReviewDate)    await this.fillPlanningDataField('Next Review Date', data.nextReviewDate);
        if (data.plannedReviewDate) await this.fillPlanningDataField('Planned Review Date (Next Refresh)', data.plannedReviewDate);
        if (data.nextTADate)        await this.fillPlanningDataField('Next TA Date (Unit Level)', data.nextTADate);
        if (data.secondTADate)      await this.fillPlanningDataField('2nd TA Date (Unit Level)', data.secondTADate);
        console.log('[ACTION] Planning Data form filled');
    }

    async clickPlanningDataSave(): Promise<void> {
        await this.clickSaveButton();
        await this.confirmSuccessPopup();
        console.log('[ACTION] Planning Data Save clicked');
    }

    /**
     * Click the Edit button of the section that contains the given field label, and wait until
     * the same section's Save button is visible (i.e. edit mode has actually engaged).
     */
    private async clickSectionEditByFieldLabel(fieldLabel: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.sectionEditButtonByFieldLabel(fieldLabel);
        await btn.waitForExist({ timeout: 30000 });
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.sectionEditButtonByFieldLabel(fieldLabel));
        await utils.waitForBusyIndicatorToDisappear();
        const save = await this.sectionSaveButtonByFieldLabel(fieldLabel);
        await save.waitForDisplayed({ timeout: 30000 });
        console.log(`[ACTION] Edit clicked for section containing "${fieldLabel}"`);
    }

    private async clickSectionEditByTitle(title: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await this.dismissAnyMessageBox();

        const section = await this.objectPageSubSectionByTitle(title);
        await section.waitForExist({ timeout: 30000 });
        await section.scrollIntoView({ block: 'center' });
        await utils.waitForBusyIndicatorToDisappear();

        const btn = await this.sectionEditButtonByTitle(title);
        await btn.waitForExist({ timeout: 30000 });
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.sectionEditButtonByTitle(title));
        await utils.waitForBusyIndicatorToDisappear();

        const save = await this.sectionSaveButtonByTitle(title);
        await save.waitForDisplayed({ timeout: 30000 });
        console.log(`[ACTION] Edit clicked for section "${title}"`);
    }

    async editPlanningData(data: PlanningDataInput): Promise<void> {
        await this.clickSectionEditByTitle('Planning Data');
        await this.fillPlanningDataForm(data);
        await this.clickPlanningDataSave();
    }

    async selectOrganizationalDataViaValueHelp(label: string, value: string): Promise<void> {
        await utils.clickWithWait(this.organizationalDataValueHelpIcon(label));
        await utils.waitForBusyIndicatorToDisappear();

        const rowRadio = $(
            `(//div[contains(@class,"sapMDialog")]//tr[@role="row"][.//*[normalize-space()=${utils.xpathString(value)}]]//div[contains(@class,"sapMRbB")])[1]`
        );
        const fallbackRadio = $(
            `(//div[contains(@class,"sapMDialog")]//tbody/tr[@role="row"]//div[contains(@class,"sapMRbB")])[1]`
        );

        if (await rowRadio.isExisting()) {
            await rowRadio.waitForDisplayed({ timeout: 30000 });
            await utils.clickWithWait(rowRadio);
        } else {
            await fallbackRadio.waitForDisplayed({ timeout: 30000 });
            await utils.clickWithWait(fallbackRadio);
        }
        await utils.waitForBusyIndicatorToDisappear();

        const dialogSave = $(
            `(//div[contains(@class,"sapMDialog")]//button[.//bdi[normalize-space()="Save"]])[1]`
        );
        await dialogSave.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(dialogSave);
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Organizational Data — ${label} selected via value help: ${value}`);
    }

    async fillOrganizationalDataForm(data: OrganizationalDataInput): Promise<void> {
        if (data.planningPlant)    await this.selectOrganizationalDataViaValueHelp('Planning Plant', data.planningPlant);
        if (data.maintenancePlant) await this.selectOrganizationalDataViaValueHelp('Maintenance Plant', data.maintenancePlant);
        console.log('[ACTION] Organizational Data form filled via value help');
    }

    async clickOrganizationalDataSave(): Promise<void> {
        await this.clickSaveButton();
        await this.confirmSuccessPopup();
        console.log('[ACTION] Organizational Data Save clicked');
    }

    async editOrganizationalData(data: OrganizationalDataInput): Promise<void> {
        await this.clickSectionEditByTitle('Organizational Data');
        await this.fillOrganizationalDataForm(data);
        await this.clickOrganizationalDataSave();
    }

    async editPlanningAndOrganizationalData(
        planning: PlanningDataInput,
        organizational: OrganizationalDataInput
    ): Promise<void> {
        await this.dismissAnyMessageBox();
        await this.editPlanningData(planning);
        await this.dismissAnyMessageBox();
        await this.editOrganizationalData(organizational);
    }

    async editDescription(newDescription: string): Promise<void> {
        const el = await this.editDescriptionInput;
        await el.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.editDescriptionInput);
        await el.clearValue();
        await el.setValue(newDescription);
        await browser.keys('Tab');
        console.log(`[ACTION] Description edited to: ${newDescription}`);
    }

    async editLongDescription(value: string): Promise<void> {
        const el = await this.editLongDescriptionInput;
        await el.waitForExist({ timeout: 30000 });
        await el.scrollIntoView({ block: 'center' });
        await el.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.editLongDescriptionInput);
        await el.clearValue();
        await el.setValue(value);
        await browser.keys('Tab');
        console.log(`[ACTION] Long Description edited to: ${value}`);
    }

    async editOperatingContext(value: string): Promise<void> {
        const el = await this.editOperatingContextInput;
        await el.waitForExist({ timeout: 30000 });
        await el.scrollIntoView({ block: 'center' });
        await el.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.editOperatingContextInput);
        await el.clearValue();
        await el.setValue(value);
        await browser.keys('Tab');
        console.log(`[ACTION] Operating Context edited to: ${value}`);
    }

    async clickSaveButton(): Promise<void> {
        const openDialog = $('//div[contains(@class,"sapMDialog") and not(contains(@style,"display: none"))]');
        try {
            await openDialog.waitForDisplayed({ timeout: 3000, reverse: true });
        } catch {
            /* dialog still around */
        }
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(500);

        const btn = await this.saveButton;
        await btn.waitForExist({ timeout: 30000 });
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });

        try {
            await btn.waitForClickable({ timeout: 10000 });
            await btn.click();
        } catch {
            await browser.execute((el: HTMLButtonElement) => el.click(), btn as unknown as HTMLButtonElement);
        }
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Save button clicked');
    }

    async editAssessmentDescription(newDescription: string, extra?: {
        longDescription?: string;
        operatingContext?: string;
    }): Promise<void> {
        await this.clickEditButton();
        await this.editDescription(newDescription);
        if (extra?.longDescription !== undefined) {
            await this.editLongDescription(extra.longDescription);
        }
        if (extra?.operatingContext !== undefined) {
            await this.editOperatingContext(extra.operatingContext);
        }
        await this.clickSaveButton();
        await this.confirmSuccessPopup();
    }

    async clickManageButton(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.manageButton);
        await this.deleteMenuItem.waitForDisplayed({ timeout: 30000 });
        console.log('[ACTION] Manage button clicked');
    }

    async clickDeleteMenuItem(): Promise<void> {
        await utils.clickWithWait(this.deleteMenuItem);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Delete menu item clicked');
    }

    async confirmDelete(): Promise<void> {
        const ok = await this.okButton;
        await ok.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.okButton);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log('[ACTION] Delete confirmation OK clicked');
    }

    async deleteAssessment(): Promise<void> {
        await this.clickManageButton();
        await this.clickDeleteMenuItem();
        await this.confirmDelete();
        await this.confirmDelete();
    }

    async searchInListView(description: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const search = await this.listSearchInput;
        await search.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.listSearchInput);
        await search.clearValue();
        await search.setValue(description);
        await browser.keys('Enter');
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log(`[ACTION] List view searched for: ${description}`);
    }

    async verifyAssessmentDeleted(description: string): Promise<void> {
        const row = await this.listRowByDescription(description);
        const exists = await row.isExisting();
        if (exists) {
            const displayed = await row.isDisplayed();
            if (displayed) {
                throw new Error(`Assessment "${description}" is still present after deletion`);
            }
        }
        console.log(`[VERIFY] Assessment "${description}" is deleted`);
        await browser.pause(4000);
    }

    async fillCreateAssessmentForm(data: CreateAssessmentInput): Promise<void> {
        await this.fillDescription(data.description);
        await this.selectClass(data.className);
        if (data.failureDataProfile) {
            await this.selectFailureDataProfileByDescription(data.failureDataProfile);
        } else {
            await this.selectFailureDataProfileFirstRow();
        }
        await this.selectTemplateFirstOption();
        console.log('[ACTION] Create Assessment form filled');
    }

    /* ---------- Roles section actions ---------- */

    async clickAddRoleButton(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.addRoleButton;
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.addRoleButton);
        await this.roleSelectionDialog.waitForDisplayed({ timeout: 30000 });
        console.log('[ACTION] Add Role button clicked, role-selection dialog displayed');
    }

    private async toggleRoleCheckbox(roleName: string): Promise<void> {
        const cb = await this.roleSelectionCheckbox(roleName);
        await cb.waitForExist({ timeout: 30000 });
        await cb.scrollIntoView({ block: 'center' });
        const checked = await cb.getAttribute('aria-checked');
        if (checked !== 'true') {
            await utils.clickWithWait(this.roleSelectionCheckbox(roleName));
            console.log(`[ACTION] Role checked: ${roleName}`);
        } else {
            console.log(`[ACTION] Role already checked: ${roleName}`);
        }
    }

    async selectRolesInDialog(roles: readonly string[]): Promise<void> {
        for (const r of roles) await this.toggleRoleCheckbox(r);
        await utils.clickWithWait(this.okButton);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(500);
        console.log(`[ACTION] Roles selected and confirmed: ${roles.join(', ')}`);
    }

    private async assignUserToRole(roleName: string, userName: string): Promise<void> {
        const vhi = await this.roleAssignmentValueHelpIcon(roleName);
        await vhi.scrollIntoView({ block: 'center' });
        await vhi.waitForExist({ timeout: 30000 });
        await vhi.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.roleAssignmentValueHelpIcon(roleName));

        const dialog = await this.userSelectionDialog;
        await dialog.waitForDisplayed({ timeout: 30000 });

        const search = await this.userSelectionSearchInput;
        await search.waitForDisplayed({ timeout: 30000 });
        await search.clearValue();
        await search.setValue(userName);
        await browser.keys('Enter');
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(800);

        const row = await this.userSelectionRow(userName);
        await row.waitForExist({ timeout: 30000 });
        await row.scrollIntoView({ block: 'center' });
        const cb = await this.userSelectionRowCheckbox(userName);
        await cb.waitForDisplayed({ timeout: 30000 });
        const checked = await cb.getAttribute('aria-checked');
        if (checked !== 'true') {
            await utils.clickWithWait(this.userSelectionRowCheckbox(userName));
        }

        await utils.clickWithWait(this.userSelectionOkButton);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(500);
        console.log(`[ACTION] User "${userName}" assigned to role "${roleName}" via user-selection dialog`);
    }

    async addRolesAndAssignUser(data: RolesAssignmentInput): Promise<void> {
        await this.clickAddRoleButton();
        await this.selectRolesInDialog(data.roles);
        for (const r of data.roles) await this.assignUserToRole(r, data.user);
        await this.clickSaveButton();
        await this.confirmSuccessPopup();
        console.log('[ACTION] Roles added, user assigned, and saved');
    }

    async clickRolesEditButton(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.rolesEditButton;
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.rolesEditButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Roles section Edit button clicked');
    }

    private async removeUserFromRole(roleName: string, userName: string): Promise<void> {
        const icon = await this.roleAssignmentRemoveTokenIcon(roleName, userName);
        await icon.scrollIntoView({ block: 'center' });
        await icon.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.roleAssignmentRemoveTokenIcon(roleName, userName));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] User "${userName}" removed from role "${roleName}"`);
    }

    async unassignUserFromRoleAndSave(roleName: string, userName: string): Promise<void> {
        await this.clickRolesEditButton();
        await this.removeUserFromRole(roleName, userName);
        await this.clickSaveButton();
        await this.confirmSuccessPopup();
        console.log(`[ACTION] User "${userName}" unassigned from role "${roleName}" and saved`);
    }

    /* ---------- Assessment section actions ---------- */

    async navigateToAssessmentSection(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.assessmentAnchorButton;
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assessmentAnchorButton);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(800);
        console.log('[ACTION] Navigated to Assessment section');
    }

    async clickCreateOperatingContextAndCondition(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.createOperatingContextAndConditionButton;
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.createOperatingContextAndConditionButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] "Create Operating Context and Condition" button clicked');
    }

    async openAssessmentAndCreateOperatingContextAndCondition(): Promise<void> {
        await this.navigateToAssessmentSection();
        await this.clickCreateOperatingContextAndCondition();
    }

    /* ---------- Operating Context and Condition dialog actions ---------- */

    async fillOccName(name: string): Promise<void> {
        await this.occDialog.waitForDisplayed({ timeout: 30000 });
        const ta = await this.occNameTextarea;
        await ta.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.occNameTextarea);
        await ta.clearValue();
        await ta.setValue(name);
        await browser.keys('Tab');
        console.log(`[ACTION] OCC name entered: ${name}`);
    }

    async clickAddCharacteristicsButton(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.addCharacteristicsButton;
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.addCharacteristicsButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] "Add Characterstics" button clicked');
    }

    async selectCharacteristicsAndAssign(charIds: readonly string[]): Promise<void> {
        for (const id of charIds) {
            const cb = await this.characteristicsRowCheckbox(id);
            await cb.waitForExist({ timeout: 30000 });
            await cb.scrollIntoView({ block: 'center' });
            await cb.waitForDisplayed({ timeout: 30000 });
            const checked = await cb.getAttribute('aria-checked');
            if (checked !== 'true') {
                await utils.clickWithWait(this.characteristicsRowCheckbox(id));
                console.log(`[ACTION] Characteristic checked: ${id}`);
            } else {
                console.log(`[ACTION] Characteristic already checked: ${id}`);
            }
        }
        await utils.clickWithWait(this.characteristicsAssignButton);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(500);
        console.log(`[ACTION] Characteristics assigned: ${charIds.join(', ')}`);
    }

    async selectCharacteristicValue(charId: string, value: string): Promise<void> {
        const arrow = await this.characteristicComboboxArrow(charId);
        await arrow.scrollIntoView({ block: 'center' });
        await arrow.waitForExist({ timeout: 30000 });
        await arrow.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.characteristicComboboxArrow(charId));

        await browser.pause(800);

        const opt = await this.comboboxOptionByText(value);
        await opt.waitForExist({ timeout: 30000 });
        await opt.scrollIntoView({ block: 'center' });
        await opt.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.comboboxOptionByText(value));

        try {
            const stillOpen = await opt.isDisplayed();
            if (stillOpen) {
                await utils.clickWithWait(this.characteristicComboboxArrow(charId));
            }
        } catch {
            /* popover already closed */
        }

        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Characteristic "${charId}" set to "${value}"`);
    }

    async selectCharacteristicValueByIndex(charId: string, index: number): Promise<void> {
        const arrow = await this.characteristicComboboxArrow(charId);
        await arrow.scrollIntoView({ block: 'center' });
        await arrow.waitForExist({ timeout: 30000 });
        await arrow.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.characteristicComboboxArrow(charId));

        await browser.pause(800);

        const checkbox = await this.comboboxCheckboxByIndex(index);
        const li = await this.comboboxLiByIndex(index);

        if (await checkbox.isExisting()) {
            await checkbox.scrollIntoView({ block: 'center' });
            await checkbox.waitForDisplayed({ timeout: 30000 });
            await utils.clickWithWait(this.comboboxCheckboxByIndex(index));
            console.log(`[ACTION] Characteristic "${charId}" — option #${index} checkbox ticked`);
        } else {
            await li.waitForExist({ timeout: 30000 });
            await li.scrollIntoView({ block: 'center' });
            await li.waitForDisplayed({ timeout: 30000 });
            await utils.clickWithWait(this.comboboxLiByIndex(index));
            console.log(`[ACTION] Characteristic "${charId}" — option #${index} <li> clicked`);
        }

        try {
            const occTitle = await $('//div[contains(@class,"sapMDialog")]//h1[normalize-space()="Operating Context and Condition"]');
            if (await occTitle.isExisting()) {
                await occTitle.click();
            } else {
                await browser.keys('Escape');
            }
        } catch {
            await browser.keys('Escape');
        }

        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Characteristic "${charId}" set to option #${index}`);
    }

    async clickOccCreateButton(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.occCreateButton;
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.occCreateButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] OCC dialog Create button clicked');
    }

    async clickUseBaselineButton(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.useBaselineButton;
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.useBaselineButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] "Use Baseline" button clicked');
    }

    async selectFirstBaselineAndApply(): Promise<void> {
        const dialog = await this.selectBaselinesDialog;
        await dialog.waitForDisplayed({ timeout: 30000 });

        const radio = await this.firstBaselineRadioButton;
        await radio.waitForExist({ timeout: 30000 });
        await radio.scrollIntoView({ block: 'center' });
        await radio.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.firstBaselineRadioButton);
        console.log('[ACTION] First recommended baseline selected');

        const apply = await this.selectBaselinesApplyButton;
        await apply.waitForExist({ timeout: 30000 });
        await apply.waitForDisplayed({ timeout: 30000 });
        await browser.waitUntil(
            async () => apply.isEnabled().catch(() => false),
            { timeout: 15000, interval: 200, timeoutMsg: 'Apply button never became enabled' }
        );
        await utils.clickWithWait(this.selectBaselinesApplyButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Select Baselines — Apply clicked');
        await this.confirmSuccessPopup();
    }

    async createOperatingContextAndConditionFlow(
        data: OperatingContextAndConditionInput,
        options: { useBaseline?: boolean } = {}
    ): Promise<void> {
        const { useBaseline = true } = options;

        await this.clickAddCharacteristicsButton();
        await this.selectCharacteristicsAndAssign(data.characteristics.map(c => c.id));

        for (const c of data.characteristics) {
            if (typeof c.valueIndex === 'number') {
                await this.selectCharacteristicValueByIndex(c.id, c.valueIndex);
            } else if (c.value) {
                await this.selectCharacteristicValue(c.id, c.value);
            } else {
                throw new Error(`Characteristic "${c.id}" has neither value nor valueIndex`);
            }
        }

        await this.fillOccName(data.name);
        await this.clickOccCreateButton();

        await this.confirmSuccessPopup();

        if (useBaseline) {
            await this.clickUseBaselineButton();
            await this.selectFirstBaselineAndApply();
            console.log('[ACTION] OCC creation flow complete; baseline applied');
        } else {
            console.log('[ACTION] OCC creation flow complete; Use Baseline skipped');
        }
    }

    async clickOccAddButton(occName: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.occAddButtonByName(occName);
        await btn.waitForExist({ timeout: 30000 });
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.occAddButtonByName(occName));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] "+" Add button clicked on Operating Context "${occName}"`);
    }

    async editOccName(currentName: string, newName: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.occEditButtonByName(currentName);
        await btn.waitForExist({ timeout: 30000 });
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.occEditButtonByName(currentName));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Edit button clicked on Operating Context "${currentName}"`);

        await this.fillOccName(newName);

        const save = await this.saveButton;
        await save.waitForExist({ timeout: 30000 });
        await save.scrollIntoView({ block: 'center' });
        await save.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.saveButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] OCC edit dialog — Save clicked');

        const ok = await this.okButton;
        await ok.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.okButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] OCC edit confirmation OK clicked');
    }

    async clickAssignMaintainableItemsMenuItem(): Promise<void> {
        const item = await this.assignMaintainableItemsMenuItem;
        await item.waitForExist({ timeout: 30000 });
        await item.scrollIntoView({ block: 'center' });
        await item.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assignMaintainableItemsMenuItem);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] "Assign Maintainable Items" menu item clicked');
    }
    
    async assignMaintainableItem(rowText: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        if (rowText && rowText.trim().length > 0) {
            const checkbox = await this.maintainableItemRowCheckbox(rowText);
            if (await checkbox.isExisting()) {
                await checkbox.scrollIntoView({ block: 'center' });
                await checkbox.waitForDisplayed({ timeout: 30000 });
                await utils.clickWithWait(this.maintainableItemRowCheckbox(rowText));
                console.log(`[ACTION] Maintainable item row checkbox ticked: "${rowText}"`);
            } else {
                const row = await this.maintainableItemRow(rowText);
                await row.waitForExist({ timeout: 30000 });
                await row.scrollIntoView({ block: 'center' });
                await row.waitForDisplayed({ timeout: 30000 });
                await utils.clickWithWait(this.maintainableItemRow(rowText));
                console.log(`[ACTION] Maintainable item row clicked: "${rowText}"`);
            }
        } else {
            const firstCb = await this.firstMaintainableItemMultiSelectCheckbox;
            await firstCb.waitForExist({ timeout: 30000 });
            await firstCb.scrollIntoView({ block: 'center' });
            await firstCb.waitForDisplayed({ timeout: 30000 });
            await utils.clickWithWait(this.firstMaintainableItemMultiSelectCheckbox);
            console.log('[ACTION] First maintainable item multi-select checkbox ticked');
        }

        const assign = await this.assignDialogAssignButton;
        await assign.waitForExist({ timeout: 30000 });
        await assign.scrollIntoView({ block: 'center' });
        await assign.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assignDialogAssignButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Assign Maintainable Items dialog Assign button clicked');

        const ok = await this.okButton;
        await ok.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.okButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Assign Maintainable Items confirmation OK clicked');
    }

    async searchAndAssignFirstMaintainableItem(searchText: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const search = await this.assignDialogSearchInput;
        await search.waitForExist({ timeout: 30000 });
        await search.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assignDialogSearchInput);
        await search.clearValue();
        await search.setValue(searchText);
        await browser.keys('Enter');
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(800);
        console.log(`[ACTION] Assign Maintainable Items — searched: "${searchText}"`);

        let firstCb = await this.firstAssignDialogItemCheckboxByText(searchText);
        if (!(await firstCb.isExisting())) {
            firstCb = await this.firstAssignDialogItemCheckbox;
        }
        await firstCb.waitForExist({ timeout: 30000 });
        await firstCb.scrollIntoView({ block: 'center' });
        await firstCb.waitForDisplayed({ timeout: 30000 });
        await firstCb.click();
        console.log('[ACTION] First filtered maintainable item checkbox ticked');

        const assign = await this.assignDialogAssignButton;
        await assign.waitForExist({ timeout: 30000 });
        await assign.scrollIntoView({ block: 'center' });
        await assign.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assignDialogAssignButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Assign Maintainable Items dialog Assign button clicked');

        const ok = await this.okButton;
        await ok.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.okButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Assign Maintainable Items confirmation OK clicked');
    }

    async clickAssignFailureModesMenuItem(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const item = await this.assignFailureModesMenuItem;
        await item.waitForExist({ timeout: 30000 });
        await item.scrollIntoView({ block: 'center' });
        await item.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assignFailureModesMenuItem);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] "Assign Failure Modes" menu item clicked');
    }

    async searchAndAssignFailureMode(searchText: string | string[]): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const search = await this.assignDialogSearchInput;
        await search.waitForExist({ timeout: 30000 });
        await search.waitForDisplayed({ timeout: 30000 });

        const items = Array.isArray(searchText) ? searchText : [searchText];
        for (const item of items) {
            await utils.clickWithWait(this.assignDialogSearchInput);
            await search.clearValue();
            await search.setValue(item);
            await browser.keys('Enter');
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(800);
            console.log(`[ACTION] Assign Failure Modes — searched: "${item}"`);

            let cb = await this.firstAssignDialogItemCheckboxByText(item);
            if (!(await cb.isExisting())) {
                cb = await this.firstAssignDialogItemCheckbox;
            }
            await cb.waitForExist({ timeout: 30000 });
            await cb.scrollIntoView({ block: 'center' });
            await cb.waitForDisplayed({ timeout: 30000 });
            await cb.click();
            console.log(`[ACTION] Failure mode checkbox ticked: "${item}"`);
        }

        const assign = await this.assignDialogAssignButton;
        await assign.waitForExist({ timeout: 30000 });
        await assign.scrollIntoView({ block: 'center' });
        await assign.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assignDialogAssignButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Assign Failure Modes dialog Assign button clicked');

        const ok = await this.okButton;
        await ok.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.okButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Assign Failure Modes confirmation OK clicked');
    }
    async expandAssessmentHierarchyRow(rowIndex: number = 0): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const icon = await this.assessmentHierarchyTreeIcon(rowIndex);
        await icon.waitForExist({ timeout: 30000 });
        await icon.scrollIntoView({ block: 'center' });
        await icon.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assessmentHierarchyTreeIcon(rowIndex));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Assessment Hierarchy row${rowIndex} expand arrow clicked`);
    }

    async clickAssessmentHierarchyRowAddButton(rowText?: string, rowIndex?: number): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        let btn;
        if (typeof rowIndex === 'number') {
            btn = await this.assessmentHierarchyAddButtonByRowIndex(rowIndex);
        } else if (rowText && rowText.trim().length > 0) {
            btn = await this.assessmentHierarchyAddButtonByRowText(rowText);
        } else {
            throw new Error('clickAssessmentHierarchyRowAddButton: provide rowText or rowIndex');
        }

        await btn.waitForExist({ timeout: 30000 });
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await btn.click();
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] "+" Add button clicked on Assessment Hierarchy row (${typeof rowIndex === 'number' ? `row${rowIndex}` : `"${rowText}"`})`);
    }

    async clickAssessmentHierarchyRowByText(rowText: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const row = await this.assessmentHierarchyRowByText(rowText);
        await row.waitForExist({ timeout: 30000 });
        await row.scrollIntoView({ block: 'center' });
        await row.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assessmentHierarchyRowByText(rowText));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Assessment Hierarchy row clicked: "${rowText}"`);
    }

    async deleteAssessmentHierarchyRowByText(rowText: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const decline = await this.assessmentHierarchyDeclineButtonByRowText(rowText);
        await decline.waitForExist({ timeout: 30000 });
        await decline.scrollIntoView({ block: 'center' });
        await decline.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assessmentHierarchyDeclineButtonByRowText(rowText));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Assessment Hierarchy row "X" clicked: "${rowText}"`);

        const yes = await this.yesButton;
        await yes.waitForExist({ timeout: 30000 });
        await yes.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.yesButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Delete confirmation — Yes clicked');

        await browser.pause(500);
        try { await this.confirmSuccessPopup(); } catch { /* no popup */ }
        console.log(`[ACTION] Assessment Hierarchy row deleted: "${rowText}"`);
    }

    async assignSectionItemByText(sectionName: string, itemText: string | string[]): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const sectionAssign = await this.sectionAssignButtonByName(sectionName);
        await sectionAssign.waitForExist({ timeout: 30000 });
        await sectionAssign.scrollIntoView({ block: 'center' });
        await sectionAssign.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.sectionAssignButtonByName(sectionName));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] "${sectionName}" Assign button clicked`);

        const items = Array.isArray(itemText) ? itemText : [itemText];
        for (const item of items) {
            const cb = await this.firstAssignDialogItemCheckboxByText(item);
            await cb.waitForExist({ timeout: 30000 });
            await cb.scrollIntoView({ block: 'center' });
            await cb.waitForDisplayed({ timeout: 30000 });
            await cb.click();
            console.log(`[ACTION] "${sectionName}" item checkbox ticked: "${item}"`);
        }

        const assign = await this.assignDialogAssignButton;
        await assign.waitForExist({ timeout: 30000 });
        await assign.scrollIntoView({ block: 'center' });
        await assign.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assignDialogAssignButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] "${sectionName}" dialog Assign button clicked`);

        const ok = await this.okButton;
        await ok.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.okButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] "${sectionName}" assignment confirmation OK clicked`);
    }

    async removeSectionItemByText(sectionName: string, itemText: string | string[]): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const expand = await this.sectionExpandIconByName(sectionName);
        await expand.waitForExist({ timeout: 30000 });
        await expand.scrollIntoView({ block: 'center' });
        await expand.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.sectionExpandIconByName(sectionName));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] "${sectionName}" section expanded`);

        const items = Array.isArray(itemText) ? itemText : [itemText];
        for (const item of items) {
            const cb = await this.sectionRowCheckboxByText(item);
            await cb.waitForExist({ timeout: 30000 });
            await cb.scrollIntoView({ block: 'center' });
            await cb.waitForDisplayed({ timeout: 30000 });
            await cb.click();
            console.log(`[ACTION] "${sectionName}" row checkbox ticked: "${item}"`);
        }

        const remove = await this.sectionRemoveButtonByName(sectionName);
        await remove.waitForExist({ timeout: 30000 });
        await remove.scrollIntoView({ block: 'center' });
        await remove.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.sectionRemoveButtonByName(sectionName));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] "${sectionName}" Remove button clicked`);

        const yes = await this.yesButton;
        await yes.waitForExist({ timeout: 30000 });
        await yes.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.yesButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] "${sectionName}" remove confirmation Yes clicked`);

        await yes.waitForDisplayed({ reverse: true, timeout: 30000 }).catch(() => { /* may already be gone */ });
        await browser.pause(500);
        await this.confirmSuccessPopup();
        console.log(`[ACTION] "${sectionName}" remove success popup OK clicked`);
    }

    async expandSection(sectionName: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const expand = await this.sectionExpandIconByName(sectionName);
        await expand.waitForExist({ timeout: 30000 });
        await expand.scrollIntoView({ block: 'center' });
        await expand.waitForDisplayed({ timeout: 30000 });
        const expanded = await expand.getAttribute('aria-expanded');
        if (expanded === 'true') {
            console.log(`[ACTION] "${sectionName}" section already expanded`);
            return;
        }
        await utils.clickWithWait(this.sectionExpandIconByName(sectionName));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] "${sectionName}" section expanded`);
    }

    async createStrategy(data: {
        description: string;
        longDescription?: string;
        type: string;
        inspectionType?: string;
        inspectionStage?: string;
        startDate: string;
        dueDate: string;
    }): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const createLink = await this.sectionCreateButtonByName('Strategies');
        await createLink.waitForExist({ timeout: 30000 });
        await createLink.scrollIntoView({ block: 'center' });
        await createLink.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.sectionCreateButtonByName('Strategies'));
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Strategies — Create link clicked');

        const dialog = await this.createStrategyDialog;
        await dialog.waitForExist({ timeout: 30000 });
        await dialog.waitForDisplayed({ timeout: 30000 });

        const descInput = await this.createStrategyDialogField('Description');
        await descInput.waitForDisplayed({ timeout: 30000 });
        await descInput.click();
        await descInput.setValue(data.description);
        console.log(`[ACTION] Create Strategy — Description: "${data.description}"`);

        if (data.longDescription && data.longDescription.length > 0) {
            const longInput = await this.createStrategyDialogField('Long Description');
            await longInput.waitForDisplayed({ timeout: 30000 });
            await longInput.click();
            await longInput.setValue(data.longDescription);
            console.log(`[ACTION] Create Strategy — Long Description set`);
        }

        await this.selectCreateStrategyDropdown('Type', data.type);
        if (data.inspectionType) {
            await this.selectCreateStrategyDropdown('Inspection Type', data.inspectionType);
        }
        if (data.inspectionStage) {
            await this.selectCreateStrategyDropdown('Inspection Stage', data.inspectionStage);
        }

        await this.fillCreateStrategyDate('Start Date', data.startDate);
        await this.fillCreateStrategyDate('Due Date', data.dueDate);

        const create = await this.createStrategyDialogCreateButton;
        await create.waitForExist({ timeout: 30000 });
        await create.scrollIntoView({ block: 'center' });
        await create.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.createStrategyDialogCreateButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Create Strategy — Create clicked');

        try { await this.confirmSuccessPopup(); } catch { /* no popup */ }
    }

    async editStrategy(currentDescription: string, data: {
        newDescription: string;
        longDescription?: string;
        type?: string;
        subtype?: string;
        inspectionType?: string;
        inspectionStage?: string;
        startDate?: string;
        dueDate?: string;
    }): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const cb = await this.strategyRowCheckboxByText(currentDescription);
        await cb.waitForExist({ timeout: 30000 });
        await cb.scrollIntoView({ block: 'center' });
        await cb.waitForDisplayed({ timeout: 30000 });
        await cb.click();
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Strategies — row checkbox ticked: "${currentDescription}"`);

        const editUpdate = await this.sectionToolbarButtonByName('Strategies', 'Edit & Update');
        await editUpdate.waitForExist({ timeout: 30000 });
        await editUpdate.scrollIntoView({ block: 'center' });
        await editUpdate.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.sectionToolbarButtonByName('Strategies', 'Edit & Update'));
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Strategies — "Edit & Update" clicked');

        const dialog = await this.editStrategyDialog;
        await dialog.waitForExist({ timeout: 30000 });
        await dialog.waitForDisplayed({ timeout: 30000 });

        const descInput = await this.editStrategyDialogField('Description');
        await descInput.waitForDisplayed({ timeout: 30000 });
        await descInput.click();
        await descInput.setValue('');
        await descInput.setValue(data.newDescription);
        console.log(`[ACTION] Edit Strategy — Description: "${data.newDescription}"`);

        if (data.longDescription && data.longDescription.length > 0) {
            const longInput = await this.editStrategyDialogField('Long Description');
            await longInput.waitForDisplayed({ timeout: 30000 });
            await longInput.click();
            await longInput.setValue('');
            await longInput.setValue(data.longDescription);
            console.log(`[ACTION] Edit Strategy — Long Description set`);
        }

        if (data.type) await this.selectEditStrategyDropdown('Type', data.type);
        if (data.subtype) await this.selectEditStrategyDropdown('Subtype', data.subtype);
        if (data.inspectionType) await this.selectEditStrategyDropdown('Inspection Type', data.inspectionType);
        if (data.inspectionStage) await this.selectEditStrategyDropdown('Inspection Stage', data.inspectionStage);

        if (data.startDate) await this.fillEditStrategyDate('Start Date', data.startDate);
        if (data.dueDate) await this.fillEditStrategyDate('Due Date', data.dueDate);

        const save = await this.editStrategyDialogSaveButton;
        await save.waitForExist({ timeout: 30000 });
        await save.scrollIntoView({ block: 'center' });
        await save.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.editStrategyDialogSaveButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Edit Strategy — Save clicked');

        await dialog.waitForDisplayed({ reverse: true, timeout: 30000 }).catch(() => { /* may already be gone */ });
        await browser.pause(500);
        await this.confirmSuccessPopup();
        console.log('[ACTION] Edit Strategy — success popup OK clicked');
    }

    async deleteStrategy(description: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const cb = await this.strategyRowCheckboxByText(description);
        await cb.waitForExist({ timeout: 30000 });
        await cb.scrollIntoView({ block: 'center' });
        await cb.waitForDisplayed({ timeout: 30000 });
        await cb.click();
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Strategies — row checkbox ticked for delete: "${description}"`);

        const del = await this.sectionToolbarButtonByName('Strategies', 'Delete');
        await del.waitForExist({ timeout: 30000 });
        await del.scrollIntoView({ block: 'center' });
        await del.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.sectionToolbarButtonByName('Strategies', 'Delete'));
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Strategies — Delete clicked');

        const yes = await this.yesButton;
        await yes.waitForExist({ timeout: 30000 });
        await yes.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.yesButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Delete confirmation — Yes clicked');

        await browser.pause(500);
        try { await this.confirmSuccessPopup(); } catch { /* no popup */ }
        console.log('[ACTION] Delete Strategy — success popup OK clicked (if any)');

        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(800);
        const rowLocator = `(//tr[@role="row"][.//*[normalize-space()=${utils.xpathString(description)} or .//span[normalize-space()=${utils.xpathString(description)}]]])[1]`;
        try {
            await browser.waitUntil(
                async () => !(await $(rowLocator).isExisting()),
                { timeout: 15000, interval: 500, timeoutMsg: 'Strategy row still present after delete' }
            );
            console.log(`[VERIFY] Strategy row removed from table: "${description}"`);
        } catch {
            throw new Error(`[VERIFY] Strategy "${description}" was NOT removed from the Strategies table after delete.`);
        }
    }

    async verifyStrategyRow(description: string, expected: {
        longDescription?: string;
        type?: string;
        subtype?: string;
        startDate?: string;
        dueDate?: string;
        inspectionType?: string;
    }): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(500);

        const rowLocator = `(//tr[@role="row"][.//*[normalize-space()=${utils.xpathString(description)} or .//span[normalize-space()=${utils.xpathString(description)}]]])[1]`;
        const row = await $(rowLocator);
        await row.waitForExist({ timeout: 30000 });
        await row.scrollIntoView({ block: 'center' });
        await row.waitForDisplayed({ timeout: 30000 });

        const rowText = (await row.getText()).replace(/\s+/g, ' ').trim();
        console.log(`[VERIFY] Strategy row text: "${rowText}"`);

        const assertContains = (label: string, value?: string) => {
            if (!value) return;
            const normalized = value.replace(/\s+/g, ' ').trim();
            if (!rowText.toLowerCase().includes(normalized.toLowerCase())) {
                throw new Error(`[VERIFY] Strategy row is missing expected ${label}: "${value}". Row text was: "${rowText}"`);
            }
            console.log(`[VERIFY] Strategy row contains ${label}: "${value}"`);
        };

        assertContains('Description', description);
        assertContains('Long Description', expected.longDescription);
        assertContains('Type', expected.type);
        assertContains('Subtype', expected.subtype);
        assertContains('Start Date', expected.startDate);
        assertContains('Due Date', expected.dueDate);
        assertContains('Inspection Type', expected.inspectionType);
    }

    async addNote(text: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const btn = await this.notesHeaderButton;
        await btn.waitForExist({ timeout: 30000 });
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.notesHeaderButton);
        console.log('[ACTION] Notes button clicked');

        const container = await this.notesContainer;
        await container.waitForExist({ timeout: 30000 });
        await container.waitForDisplayed({ timeout: 30000 });
        await browser.pause(400);

        const ta = await this.notesContainerTextarea;
        await ta.waitForExist({ timeout: 30000 });
        await ta.waitForDisplayed({ timeout: 30000 });
        await ta.click();
        await browser.pause(200);

        await browser.keys(['Control', 'a']);
        await browser.keys('Delete');
        await browser.keys(text);
        await browser.pause(200);
        console.log(`[ACTION] Note text entered: "${text}"`);

        const save = await this.notesContainerSaveButton;
        await save.waitForExist({ timeout: 30000 });
        await save.scrollIntoView({ block: 'center' });
        await save.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.notesContainerSaveButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Note — Save clicked');

        await container.waitForDisplayed({ reverse: true, timeout: 30000 }).catch(() => { /* may already be gone */ });
        await browser.pause(500);
        try { await this.confirmSuccessPopup(); } catch { /* no popup */ }
        console.log('[ACTION] Note — success popup OK clicked (if any)');
    }

    async verifyNoteText(expected: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const btn = await this.notesHeaderButton;
        await btn.waitForExist({ timeout: 30000 });
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.notesHeaderButton);
        console.log('[VERIFY] Notes button clicked (reopen for verification)');

        const container = await this.notesContainer;
        await container.waitForExist({ timeout: 30000 });
        await container.waitForDisplayed({ timeout: 30000 });
        await browser.pause(400);

        const ta = await this.notesContainerTextarea;
        await ta.waitForExist({ timeout: 30000 });
        await ta.waitForDisplayed({ timeout: 30000 });
        const actual = (await ta.getValue()) ?? '';
        console.log(`[VERIFY] Note text actual: "${actual}" | expected: "${expected}"`);

        if (actual.trim() !== expected.trim()) {
            try {
                await utils.clickWithWait(this.notesContainerCloseButton);
            } catch { /* best-effort close */ }
            throw new Error(`[VERIFY] Note text mismatch. Expected: "${expected}". Got: "${actual}"`);
        }

        const close = await this.notesContainerCloseButton;
        await close.waitForExist({ timeout: 30000 });
        await close.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.notesContainerCloseButton);
        await container.waitForDisplayed({ reverse: true, timeout: 30000 }).catch(() => { /* may already be gone */ });
        await browser.pause(300);
        console.log('[VERIFY] Notes popover closed after verification');
    }

    async editNoteAndClose(newText: string): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const btn = await this.notesHeaderButton;
        await btn.waitForExist({ timeout: 30000 });
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.notesHeaderButton);
        console.log('[ACTION] Notes button clicked (edit + close)');

        const container = await this.notesContainer;
        await container.waitForExist({ timeout: 30000 });
        await container.waitForDisplayed({ timeout: 30000 });
        await browser.pause(400);

        const ta = await this.notesContainerTextarea;
        await ta.waitForExist({ timeout: 30000 });
        await ta.waitForDisplayed({ timeout: 30000 });
        await ta.click();
        await browser.pause(200);

        await browser.keys(['Control', 'a']);
        await browser.keys('Delete');
        await browser.keys(newText);
        await browser.pause(200);
        console.log(`[ACTION] Note text replaced (unsaved): "${newText}"`);

        const close = await this.notesContainerCloseButton;
        await close.waitForExist({ timeout: 30000 });
        await close.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.notesContainerCloseButton);
        await container.waitForDisplayed({ reverse: true, timeout: 30000 }).catch(() => { /* may already be gone */ });
        await browser.pause(300);
        console.log('[ACTION] Notes popover closed without saving');
    }

    async clickOperatingContextByName(occName: string): Promise<void> {
          await utils.waitForBusyIndicatorToDisappear();
        const row = await this.operatingContextRowByName(occName);
        await row.waitForExist({ timeout: 30000 });
        await row.scrollIntoView({ block: 'center' });
        await row.waitForDisplayed({ timeout: 30000 });
        try {
            await utils.clickWithWait(this.operatingContextRowByName(occName));
        } catch {
            const label = await this.operatingContextLabelByName(occName);
            await label.waitForDisplayed({ timeout: 30000 });
            await browser.execute((el: HTMLElement) => el.click(), label as unknown as HTMLElement);
        }
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Operating Context clicked: "${occName}"`);
    }

    async assignTechnicalObject(type: 'Equipment' | 'Functional Location' = 'Equipment'): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const dropdown = await this.assignUnassignTechnicalObjectButton;
        await dropdown.waitForExist({ timeout: 30000 });
        await dropdown.scrollIntoView({ block: 'center' });
        await dropdown.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.assignUnassignTechnicalObjectButton);
        await browser.pause(400);
        console.log('[ACTION] "Assign/Unassign Technical Object" dropdown clicked');

        const assignItem = await this.unifiedMenuItemByText('Assign');
        await assignItem.waitForExist({ timeout: 30000 });
        await assignItem.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.unifiedMenuItemByText('Assign'));
        await browser.pause(400);
        console.log('[ACTION] Assign menu item clicked');

        const typeItem = await this.unifiedMenuItemByText(type);
        await typeItem.waitForExist({ timeout: 30000 });
        await typeItem.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.unifiedMenuItemByText(type));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] "${type}" submenu item clicked`);
    }

    async confirmFirstEquipmentAndCloseColumn(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();

        const dialog = await this.equipmentDialog;
        await dialog.waitForExist({ timeout: 30000 });
        await dialog.waitForDisplayed({ timeout: 30000 });
        await browser.pause(800);

        const cb = await this.firstEquipmentRowCheckbox;
        await cb.waitForExist({ timeout: 30000 });
        await cb.scrollIntoView({ block: 'center' });
        await cb.waitForDisplayed({ timeout: 30000 });
        await cb.click();
        console.log('[ACTION] Equipment — first row checkbox ticked');

        const confirm = await this.equipmentDialogConfirmButton;
        await confirm.waitForExist({ timeout: 30000 });
        await confirm.scrollIntoView({ block: 'center' });
        await confirm.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.equipmentDialogConfirmButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Equipment — Confirm clicked');

        await browser.pause(500);
        await this.confirmSuccessPopup();
        console.log('[ACTION] Equipment — success popup OK clicked');

        const close = await this.closeColumnButton;
        await close.waitForExist({ timeout: 30000 });
        await close.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.closeColumnButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Equipment column closed');
    }

    private async selectCreateStrategyDropdown(label: string, value: string): Promise<void> {
        const arrow = await this.createStrategyDialogSelectArrow(label);
        await arrow.waitForExist({ timeout: 30000 });
        await arrow.scrollIntoView({ block: 'center' });
        await arrow.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.createStrategyDialogSelectArrow(label));
        await browser.pause(400);

        const option = await this.comboboxOptionByText(value);
        await option.waitForExist({ timeout: 30000 });
        await option.scrollIntoView({ block: 'center' });
        await option.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.comboboxOptionByText(value));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Create Strategy — ${label}: "${value}"`);
    }

    private async selectEditStrategyDropdown(label: string, value: string): Promise<void> {
        const arrow = await this.editStrategyDialogSelectArrow(label);
        await arrow.waitForExist({ timeout: 30000 });
        await arrow.scrollIntoView({ block: 'center' });
        await arrow.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.editStrategyDialogSelectArrow(label));
        await browser.pause(400);

        const option = await this.comboboxOptionByText(value);
        await option.waitForExist({ timeout: 30000 });
        await option.scrollIntoView({ block: 'center' });
        await option.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.comboboxOptionByText(value));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Edit Strategy — ${label}: "${value}"`);
    }

    private async fillCreateStrategyDate(label: string, value: string): Promise<void> {
        await this.dismissAnyOpenCalendarPopover();

        const input = await this.createStrategyDialogField(label);
        await input.waitForExist({ timeout: 30000 });
        await input.scrollIntoView({ block: 'center' });
        await input.waitForDisplayed({ timeout: 30000 });

        await input.click();
        await browser.pause(200);
        await browser.keys(['Control', 'a']);
        await browser.keys('Delete');
        await input.setValue(value);
        await browser.keys('Tab');
        await browser.pause(300);

        await this.dismissAnyOpenCalendarPopover();
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Create Strategy — ${label}: ${value}`);
    }

    private async fillEditStrategyDate(label: string, value: string): Promise<void> {
        await this.dismissAnyOpenCalendarPopover();

        const input = await this.editStrategyDialogField(label);
        await input.waitForExist({ timeout: 30000 });
        await input.scrollIntoView({ block: 'center' });
        await input.waitForDisplayed({ timeout: 30000 });

        await input.click();
        await browser.pause(200);
        await browser.keys(['Control', 'a']);
        await browser.keys('Delete');
        await input.setValue(value);
        await browser.keys('Tab');
        await browser.pause(300);

        await this.dismissAnyOpenCalendarPopover();
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`[ACTION] Edit Strategy — ${label}: ${value}`);
    }

    /**
     * Click the "Summary Report" button and confirm the follow-up "Yes" dialog.
     */
    async openSummaryReportAndConfirm(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        const btn = await this.summaryReportButton;
        await btn.waitForExist({ timeout: 30000 });
        await btn.scrollIntoView({ block: 'center' });
        await btn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.summaryReportButton);
        console.log('[ACTION] Summary Report button clicked');

        const yes = await this.yesButton;
        await yes.waitForExist({ timeout: 30000 });
        await yes.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.yesButton);
        await utils.waitForBusyIndicatorToDisappear();
        console.log('[ACTION] Summary Report confirmation — Yes clicked');
        await browser.pause(5000);
        // A second popup appears after Yes — dismiss it with OK.
        await this.confirmSuccessPopup();
        console.log('[ACTION] Summary Report final popup — OK clicked');
    }

    async downloadAndVerifySummaryReport(expected: {
        present?: string[];
        absent?: string[];
        sections?: Array<{
            name: string;
            aliases?: string[];
            mustContain?: string[];
            mustNotContain?: string[];
        }>;
    }): Promise<string> {
        await utils.cleanDownloads();

        await this.openSummaryReportAndConfirm();

        const filePath = await utils.waitForDownload('.pdf');
        console.log(`[VERIFY] Summary Report PDF downloaded: ${filePath}`);

        const pdfText = await utils.extractTextFromPDF(filePath);
        console.log('----- PDF CONTENT START -----');
        console.log(pdfText);
        console.log('----- PDF CONTENT END -----');

        const normalize = (val: string) => (val || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const content = normalize(pdfText);

        const looseToken = (val: string) =>
            ' ' + (val || '').toLowerCase().replace(/[^a-z0-9_]+/g, ' ').trim() + ' ';
        const looseContent = looseToken(pdfText);

        const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const defaultKnownSectionHeaders = [
            'Assessment',
            'Operating Context and Condition',
            'Operating Context',
            'Characteristics',
            'Maintainable Items',
            'Maintainable Item',
            'Failure Modes',
            'Failure Mode',
            'Failure Effects',
            'Failure Effect',
            'Failure Mechanisms',
            'Failure Mechanism',
            'Causes',
            'Cause',
            'Strategies',
            'Strategy',
            'Recommendations',
            'Recommendation',
            'Notes',
            'Note',
            'Technical Objects',
            'Technical Object',
            'Equipment',
            'Roles',
            'Planning Data',
            'Organizational Data',
            'Summary'
        ];

        const allSectionNames = new Set<string>(defaultKnownSectionHeaders);
        for (const s of (expected.sections ?? [])) {
            allSectionNames.add(s.name);
            for (const a of (s.aliases ?? [])) allSectionNames.add(a);
        }
        const orderedHeaderNames = Array.from(allSectionNames).sort((a, b) => b.length - a.length);

        const headerPattern = (names: string[]) => {
            const namesRe = names.map(escapeRegExp).join('|');
            return new RegExp(
                `(?:${namesRe})[\\t ]+\\d+\\b`
                + `|`
                + `(?:^|[^A-Za-z])(?:${namesRe})[\\t ]*(?::|\\r?\\n|$)`,
                'gi'
            );
        };

        const sliceSection = (name: string, aliases: string[] | undefined): string | null => {
            const headerNames = [name, ...(aliases ?? [])];
            const headerRe = headerPattern(headerNames);
            const headerMatch = headerRe.exec(pdfText);
            if (!headerMatch) return null;

            const sectionStart = headerMatch.index + headerMatch[0].length;

            const ownNamesLower = new Set(headerNames.map(n => n.toLowerCase().trim()));
            const otherHeaderNames = orderedHeaderNames.filter(
                n => !ownNamesLower.has(n.toLowerCase().trim())
            );
            let sectionEnd = pdfText.length;
            if (otherHeaderNames.length > 0) {
                const nextRe = headerPattern(otherHeaderNames);
                nextRe.lastIndex = sectionStart;
                const nextMatch = nextRe.exec(pdfText);
                if (nextMatch && nextMatch.index >= sectionStart) {
                    sectionEnd = nextMatch.index;
                }
            }

            return pdfText.substring(sectionStart, sectionEnd);
        };

        const missing: string[] = [];
        for (const value of (expected.present ?? [])) {
            if (!value) continue;

            const parenMatch = value.match(/^(.*)\((.*)\)$/);
            let found = false;
            if (parenMatch) {
                const name = normalize(parenMatch[1]);
                const id = normalize(parenMatch[2]);
                found = (name.length > 0 && content.includes(name)) || (id.length > 0 && content.includes(id));
            } else {
                found = content.includes(normalize(value));
            }

            if (found) {
                console.log(`[VERIFY] PDF contains: "${value}"`);
            } else {
                console.log(`[VERIFY] PDF MISSING: "${value}"`);
                missing.push(value);
            }
        }

        const unexpected: string[] = [];
        for (const value of (expected.absent ?? [])) {
            if (!value) continue;
            const token = looseToken(value);
            if (token.trim().length > 0 && looseContent.includes(token)) {
                console.log(`[VERIFY] PDF UNEXPECTEDLY contains: "${value}"`);
                unexpected.push(value);
            } else {
                console.log(`[VERIFY] PDF correctly excludes: "${value}"`);
            }
        }

        const sectionErrors: string[] = [];
        for (const sec of (expected.sections ?? [])) {
            const slice = sliceSection(sec.name, sec.aliases);
            if (slice === null) {
                const msg = `section "${sec.name}" header not found in PDF` +
                    (sec.aliases?.length ? ` (aliases tried: ${sec.aliases.map(a => `"${a}"`).join(', ')})` : '');
                console.log(`[VERIFY] ${msg}`);
                sectionErrors.push(msg);
                continue;
            }

            const sectionContent = normalize(slice);
            const sectionLoose = looseToken(slice);
            console.log(`[VERIFY] Section "${sec.name}" slice length=${slice.length}`);

            for (const value of (sec.mustContain ?? [])) {
                if (!value) continue;
                if (sectionContent.includes(normalize(value))) {
                    console.log(`[VERIFY] Section "${sec.name}" contains: "${value}"`);
                } else {
                    const msg = `section "${sec.name}" missing value: "${value}"`;
                    console.log(`[VERIFY] ${msg}`);
                    sectionErrors.push(msg);
                }
            }

            for (const value of (sec.mustNotContain ?? [])) {
                if (!value) continue;
                const token = looseToken(value);
                if (token.trim().length > 0 && sectionLoose.includes(token)) {
                    const msg = `section "${sec.name}" unexpectedly contains: "${value}"`;
                    console.log(`[VERIFY] ${msg}`);
                    sectionErrors.push(msg);
                } else {
                    console.log(`[VERIFY] Section "${sec.name}" correctly excludes: "${value}"`);
                }
            }
        }

        if (missing.length > 0 || unexpected.length > 0 || sectionErrors.length > 0) {
            const parts: string[] = [];
            if (missing.length > 0) parts.push(`missing values: ${missing.map(v => `"${v}"`).join(', ')}`);
            if (unexpected.length > 0) parts.push(`unexpected values: ${unexpected.map(v => `"${v}"`).join(', ')}`);
            if (sectionErrors.length > 0) parts.push(`section issues: ${sectionErrors.join('; ')}`);
            throw new Error(`[VERIFY] Summary Report PDF verification failed — ${parts.join(' | ')}`);
        }

        console.log('[VERIFY] Summary Report PDF verification passed');
        return filePath;
    }
}

export default new AssetStrategyAnalysisForClassesPage();

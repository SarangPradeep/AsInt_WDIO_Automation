import utils from "utils/utils";
import CMLListView from "../cmls/cmls.listview.page";
import CMLDetailView from "../cmls/cmls.detailview.page";
import AssetInspectionListView from "./asset_inspection.listview.page";
import * as path from "path";
import * as fs from "fs";

class AssetInspectionDetailView {

    // Supports both the legacy tab (button with <bdi>) and the new IconTabBar tab (div[role='tab'] with sapMITHTextContent span).
    private get informationTab() { return $("//button[.//bdi[normalize-space()='Information']] | //div[@role='tab'][.//span[contains(concat(' ', normalize-space(@class), ' '), ' sapMITHTextContent ') and normalize-space(.)='Information']]"); }
    private get cmlTab() { return $("//button[.//bdi[normalize-space()='CML']] | //div[@role='tab'][.//span[contains(concat(' ', normalize-space(@class), ' '), ' sapMITHTextContent ') and normalize-space(.)='CML']]"); }
    private get checklistTab() { return $("//button[.//bdi[normalize-space()='Checklist']] | //div[@role='tab'][.//span[contains(concat(' ', normalize-space(@class), ' '), ' sapMITHTextContent ') and normalize-space(.)='Checklist']]"); }
    private get attachmentsTab() { return $("//button[.//bdi[normalize-space()='Attachments']] | //div[@role='tab'][.//span[contains(concat(' ', normalize-space(@class), ' '), ' sapMITHTextContent ') and normalize-space(.)='Attachments']]"); }
    private get attachmentsAddBtn() { return $("//div[contains(@class,'sapMMenuBtn')]//button[.//bdi[normalize-space()='Add']]"); }
    private get attachmentsAssignBtn() { return $("//button[not(@disabled)][.//bdi[normalize-space()='Assign']]"); }
    private get findingsTab() { return $("//button[.//bdi[starts-with(normalize-space(),'Findings')]] | //li[.//bdi[starts-with(normalize-space(),'Findings')]] | //*[self::div or self::a][@role='tab' or @role='menuitem'][.//bdi[starts-with(normalize-space(),'Findings')]] | //div[@role='tab'][.//span[contains(concat(' ', normalize-space(@class), ' '), ' sapMITHTextContent ') and starts-with(normalize-space(.),'Findings')]]"); }
    private get findingsNewBtn() { return $("//button[@title='Create Findings']"); }
    private get maintenanceServiceTab() { return $("//button[.//bdi[normalize-space()='Maintenance and Service']] | //div[contains(@class,'sapMSB')][.//bdi[normalize-space()='Maintenance and Service']]//button[contains(@id,'textButton')] | //div[@role='tab'][.//span[contains(concat(' ', normalize-space(@class), ' '), ' sapMITHTextContent ') and normalize-space(.)='Maintenance and Service']]"); }
    private get maintenanceNotificationsNewBtn() { return $("(//*[normalize-space(.)='Maintenance Notifications' or starts-with(normalize-space(.),'Maintenance Notifications ')]/ancestor::div[contains(@class,'sapMTB')][1]//button[.//bdi[normalize-space()='New']])[1]"); }
    private get maintenanceNotificationsAssignBtn() { return $("(//*[normalize-space(.)='Maintenance Notifications' or starts-with(normalize-space(.),'Maintenance Notifications ')]/ancestor::div[contains(@class,'sapMTB')][1]//button[not(@disabled)][.//bdi[normalize-space()='Assign']])[1]"); }
    private get maintenanceNotificationsUnassignBtn() { return $("(//*[normalize-space(.)='Maintenance Notifications' or starts-with(normalize-space(.),'Maintenance Notifications ')]/ancestor::div[contains(@class,'sapMTB')][1]//button[not(@disabled)][.//bdi[normalize-space()='Unassign']])[1]"); }
    private get maintenanceNotificationsSearchInput() { return $("//input[@type='search' and (@aria-label='Search Notifications' or @placeholder='Search Notifications')]"); }
    private get assignNotificationsDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][starts-with(normalize-space(.),'Maintenance Notifications (')]]"); }
    private get assignNotificationsSelectBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][starts-with(normalize-space(.),'Maintenance Notifications (')]]//footer//button[.//bdi[normalize-space()='Select']]"); }
    private get maintenanceOrdersAssignBtn() { return $("(//*[normalize-space(.)='Maintenance Orders' or starts-with(normalize-space(.),'Maintenance Orders ')]/ancestor::div[contains(@class,'sapMTB')][1]//button[not(@disabled)][.//bdi[normalize-space()='Assign']])[1]"); }
    private get maintenanceOrdersUnassignBtn() { return $("(//*[normalize-space(.)='Maintenance Orders' or starts-with(normalize-space(.),'Maintenance Orders ')]/ancestor::div[contains(@class,'sapMTB')][1]//button[not(@disabled)][.//bdi[normalize-space()='Unassign']])[1]"); }
    private get assignOrdersDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][starts-with(normalize-space(.),'Maintenance Orders (')]]"); }
    private get assignOrdersSelectBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][starts-with(normalize-space(.),'Maintenance Orders (')]]//footer//button[.//bdi[normalize-space()='Select']]"); }
    private get maintenanceTasksNewBtn() { return $("(//*[normalize-space(.)='Maintenance Tasks' or starts-with(normalize-space(.),'Maintenance Tasks ')]/ancestor::div[contains(@class,'sapMTB')][1]//button[.//bdi[normalize-space()='New']])[1]"); }
    private get maintenanceTasksAssignBtn() { return $("(//*[normalize-space(.)='Maintenance Tasks' or starts-with(normalize-space(.),'Maintenance Tasks ')]/ancestor::div[contains(@class,'sapMTB')][1]//button[not(@disabled)][.//bdi[normalize-space()='Assign']])[1]"); }
    private get maintenanceTasksUnassignBtn() { return $("(//*[normalize-space(.)='Maintenance Tasks' or starts-with(normalize-space(.),'Maintenance Tasks ')]/ancestor::div[contains(@class,'sapMTB')][1]//button[not(@disabled)][.//bdi[normalize-space()='Unassign']])[1]"); }
    private get createTaskDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][normalize-space(.)='Create Task']]"); }
    private get createTaskSaveBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][normalize-space(.)='Create Task']]//footer//button[.//bdi[normalize-space()='Save']]"); }
    private get assignTasksDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][starts-with(normalize-space(.),'Maintenance Tasks (')]]"); }
    private get assignTasksSelectBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][starts-with(normalize-space(.),'Maintenance Tasks (')]]//footer//button[.//bdi[normalize-space()='Select']]"); }
    private get createNotificationDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][contains(normalize-space(.),'Create Notification')]]"); }
    private get createNotificationCreateBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][contains(normalize-space(.),'Create Notification')]]//footer//button[.//bdi[normalize-space()='Create']]"); }
    private get createNotificationBreakdownSwitch() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][contains(normalize-space(.),'Create Notification')]]//label[.//bdi[normalize-space()='Breakdown']]/following::div[@role='switch'][1]"); }
    private get createFindingDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][contains(normalize-space(.),'Create Finding')]]"); }
    private get createFindingCreateBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][contains(normalize-space(.),'Create Finding')]]//footer//button[.//bdi[normalize-space()='Create']]"); }
    private get findingEquipmentValueHelpBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][contains(normalize-space(.),'Create Finding')]]//label[.//bdi[normalize-space()='Equipment']]/following::span[@role='button' and @aria-label='Show Value Help'][1]"); }
    private get addDocumentMenuItem() { return $("//li[@role='menuitem' and .//*[normalize-space()='Add Document']]"); }
    private get addDocumentDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[contains(normalize-space(.),'Add Document')]]"); }
    private get addDocumentFileInput() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[contains(normalize-space(.),'Add Document')]]//input[@type='file']"); }
    private get addDocumentShortDescInput() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[contains(normalize-space(.),'Add Document')]]//label[.//bdi[normalize-space()='Short Description']]/following::input[1]"); }
    private get addDocumentSaveBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[contains(normalize-space(.),'Add Document')]]//footer//button[.//bdi[normalize-space()='Save']]"); }
    private get componentChecklistExpandBtn() { return $("//div[contains(@class,'sapMPanel')][.//span[normalize-space()='Component Checklist']]//button[@aria-label='Expand/Collapse']"); }
    private get componentChecklistEditBtn() { return $("(//span[normalize-space()='Component Checklist'])[1]/preceding::button[.//bdi[normalize-space()='Edit']][1]"); }
    private get componentChecklistSaveBtn() { return $("(//span[normalize-space()='Component Checklist'])[1]/preceding::button[.//bdi[normalize-space()='Save']][1]"); }
    private get componentChecklistCommentsTextarea() { return $("(//bdi[normalize-space()='Comments'])[1]/ancestor::label[1]/following::textarea[1]"); }
    // Section title may render as <div>, <span>, <bdi>, <h*> etc. — match any element whose normalized text is exactly the title.
    private get backgroundSection() { return $("(//*[normalize-space(text())='Background Information'] | //bdi[normalize-space()='Background Information'])/ancestor::*[self::section or contains(concat(' ', normalize-space(@class), ' '), ' sapMPanel ') or contains(concat(' ', normalize-space(@class), ' '), ' sapUxAPBlockBase ') or contains(concat(' ', normalize-space(@class), ' '), ' sapUxAPObjectPageSubSection ')][1]"); }
    private get rolesSection() { return $("(//*[normalize-space(text())='Roles'] | //bdi[normalize-space()='Roles'])/ancestor::*[self::section or contains(concat(' ', normalize-space(@class), ' '), ' sapMPanel ') or contains(concat(' ', normalize-space(@class), ' '), ' sapUxAPBlockBase ') or contains(concat(' ', normalize-space(@class), ' '), ' sapUxAPObjectPageSubSection ')][1]"); }
    private get backgroundEditBtn() { return $("(//*[normalize-space(text())='Background Information'] | //bdi[normalize-space()='Background Information'])[1]/following::button[.//bdi[normalize-space()='Edit'] or .//text()[normalize-space()='Edit']][1]"); }
    private get rolesEditBtn() { return $("(//*[normalize-space(text())='Roles'] | //bdi[normalize-space()='Roles'])[1]/following::button[.//bdi[normalize-space()='Edit'] or .//text()[normalize-space()='Edit']][1]"); }
    private get backgroundSaveBtn() { return $("(//*[normalize-space(text())='Background Information'] | //bdi[normalize-space()='Background Information'])[1]/following::button[.//bdi[normalize-space()='Save'] or .//text()[normalize-space()='Save']][1]"); }
    private get rolesSaveBtn() { return $("(//*[normalize-space(text())='Roles'] | //bdi[normalize-space()='Roles'])[1]/following::button[.//bdi[normalize-space()='Save'] or .//text()[normalize-space()='Save']][1]"); }
    private get addCmlBtn() { return $("//button[not(@disabled)][.//bdi[normalize-space()='Add CML'] or .//text()[normalize-space()='Add CML']]"); }
    private get addCmlDialog() { return $("//*[contains(@id,'_oDialogAddCML--idAddCMLPage') and .//span[normalize-space()='Add CML']] | //div[@role='dialog' and not(@aria-hidden='true')][.//span[normalize-space()='Add CML']]"); }
    private get addCmlDialogAddBtn() { return $("(//*[contains(@id,'_oDialogAddCML--idAddCMLPage') and .//span[normalize-space()='Add CML']] | //div[@role='dialog' and not(@aria-hidden='true')][.//span[normalize-space()='Add CML']])//button[.//bdi[normalize-space()='Add'] or .//text()[normalize-space()='Add']]"); }
    private get addCmlDialogCancelBtn() { return $("(//*[contains(@id,'_oDialogAddCML--idAddCMLPage') and .//span[normalize-space()='Add CML']] | //div[@role='dialog' and not(@aria-hidden='true')][.//span[normalize-space()='Add CML']])//button[.//bdi[normalize-space()='Cancel'] or .//text()[normalize-space()='Cancel']]"); }
    private get cmlEditBtn() { return $("//button[.//bdi[normalize-space()='Add CML'] or .//text()[normalize-space()='Add CML']]/following::button[.//bdi[normalize-space()='Edit'] or .//text()[normalize-space()='Edit']][1]"); }
    private get calculateBtn() { return $("//button[.//bdi[normalize-space()='Calculate'] or .//text()[normalize-space()='Calculate']]"); }
    private get cmlSaveBtn() { return $("(//button[.//bdi[normalize-space()='Calculate'] or .//text()[normalize-space()='Calculate']]/following::button[.//bdi[normalize-space()='Save'] or .//text()[normalize-space()='Save']])[1]"); }
    private get cmlCancelBtn() { return $("(//button[.//bdi[normalize-space()='Calculate'] or .//text()[normalize-space()='Calculate']]/following::button[.//bdi[normalize-space()='Cancel'] or .//text()[normalize-space()='Cancel']])[1]"); }
    private get confirmYesBtn() { return $("//div[contains(@role,'dialog')]//button[.//bdi[normalize-space()='Yes'] or .//text()[normalize-space()='Yes']] | //bdi[normalize-space()='Yes']/ancestor::button[1]"); }
    private get confirmOkBtn() { return $("//div[contains(@role,'dialog')]//button[.//bdi[normalize-space()='OK'] or .//text()[normalize-space()='OK']]"); }
    private get deleteBtn() { return $("//div[contains(@class,'sapFDynamicPageTitleMainActions') or contains(@class,'sapFDynamicPageTitleActionsBar')]//button[.//bdi[normalize-space()='Delete']]"); }
    private get reportMenuBtn() { return $("//div[contains(@class,'sapFDynamicPageTitleMainActions') or contains(@class,'sapFDynamicPageTitleActionsBar')]//div[contains(@class,'sapMMenuBtn')][.//bdi[normalize-space()='Report']]//button"); }
    private get reportMenuSummaryItem() { return $("//ul[contains(@class,'sapMMenu')]//li[.//*[normalize-space(.)='Summary']] | //div[contains(@class,'sapMMenu')]//li[@role='menuitem'][.//*[normalize-space(.)='Summary']]"); }
    private get reportMenuDetailItem() { return $("//ul[contains(@class,'sapMMenu')]//li[.//*[normalize-space(.)='Detail']] | //div[contains(@class,'sapMMenu')]//li[@role='menuitem'][.//*[normalize-space(.)='Detail']]"); }
    private get reportMenuFieldsWithValuesItem() { return $("//ul[contains(@class,'sapMMenu')]//li[.//*[normalize-space(.)='Fields Where Values Are Present']] | //div[contains(@class,'sapMMenu')]//li[@role='menuitem'][.//*[normalize-space(.)='Fields Where Values Are Present']]"); }
    private get reportMenuAllFieldsItem() { return $("//ul[contains(@class,'sapMMenu')]//li[.//*[normalize-space(.)='All Available Fields']] | //div[contains(@class,'sapMMenu')]//li[@role='menuitem'][.//*[normalize-space(.)='All Available Fields']]"); }
    private get reportOptionsDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][contains(normalize-space(.),'Include all attachments')]]"); }
    private get includeAllAttachmentsOption() { return $("//div[@role='dialog' and not(@aria-hidden='true')]//bdi[normalize-space()='Include all attachments']/ancestor::div[contains(concat(' ', normalize-space(@class), ' '), ' sapMRb ')][1]"); }
    private get selectAttachmentsOption() { return $("//div[@role='dialog' and not(@aria-hidden='true')]//bdi[normalize-space()='Select attachments']/ancestor::div[contains(concat(' ', normalize-space(@class), ' '), ' sapMRb ')][1]"); }
    private get reportOptionsOkBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[contains(normalize-space(.),'Include all attachments')]]//footer//button[.//bdi[normalize-space()='OK' or normalize-space()='Ok']]"); }
    private get attachmentsSelectionDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[starts-with(normalize-space(.),'Attachments (')]]"); }
    private get attachmentsSelectionDialogOkBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[starts-with(normalize-space(.),'Attachments (')]]//footer//button[.//bdi[normalize-space()='OK' or normalize-space()='Ok']]"); }
    private attachmentSelectionRowCheckbox(fileNameToken: string) {
        const token = utils.xpathString(fileNameToken.toLowerCase());
        return $(`//div[@role='dialog' and not(@aria-hidden='true')][.//h1[starts-with(normalize-space(.),'Attachments (')]]//tr[.//a[contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),${token})]]//div[@role='checkbox' and contains(concat(' ', normalize-space(@class), ' '), ' sapMLIBSelectM ')]`);
    }
    private get deleteConfirmYesBtn() { return $("//bdi[normalize-space()='Yes']/ancestor::button[1]"); }

    private get editHeaderBtn() { return $("//button[not(@disabled)][.//bdi[normalize-space()='Edit Header']]"); }
    // Publish action button on the object-page header. HTML anchor:
    //   <button ... data-ui5-accesskey="p" class="... sapUxAPObjectPageHeaderActionButtonHideIcon ..."><bdi>Publish</bdi></button>
    private get publishBtn() { return $("//button[contains(concat(' ', normalize-space(@class), ' '), ' sapUxAPObjectPageHeaderActionButtonHideIcon ') and .//bdi[normalize-space()='Publish']]"); }
    private get editHeaderDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[normalize-space()='Edit Header']]"); }
    private get editHeaderShortDescInput() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[normalize-space()='Edit Header']]//textarea[@id='idEditHeaderFragment--idEditHeaderTextAreaShortDesc-inner']"); }
    private get editHeaderLongDescTextarea() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[normalize-space()='Edit Header']]//textarea[@id='idEditHeaderFragment--idEditHeaderTextAreaLongDesc-inner']"); }
    private get editHeaderInspectionTypeInput() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[normalize-space()='Edit Header']]//input[@id='idEditHeaderFragment--idInspectionType-inner']"); }
    private get editHeaderSaveBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//h1[normalize-space()='Edit Header']]//footer//button[.//bdi[normalize-space()='Save']]"); }

    public averageReading: string = "";
    public capturedInspectionDate: string = "";
    public capturedFindingNumber: string = "";
    public capturedNotificationShortDesc: string = "";

    private labelInput(label: string) {
        return $(`//label[.//text()=${utils.xpathString(label)} or .//bdi[normalize-space()=${utils.xpathString(label)}]]/following::input[1]`);
    }

    private labelTextarea(label: string) {
        return $(`//label[.//text()=${utils.xpathString(label)} or .//bdi[normalize-space()=${utils.xpathString(label)}]]/following::textarea[1]`);
    }

    private async setLabelInputIfPresent(label: string, value: string): Promise<void> {
        const labelXp = utils.xpathString(label);
        // Locate the actual <label> element for this field. Use its id + aria-labelledby link to
        // find the exact input/textarea (SAP UI5 associates them via aria-labelledby).
        const labelEl = $(`//label[.//text()=${labelXp} or .//bdi[normalize-space()=${labelXp}]]`);
        if (await labelEl.isExisting().catch(() => false)) {
            const labelId = ((await labelEl.getAttribute("id").catch(() => "")) || "").trim();
            if (labelId) {
                const linked = $(`//*[self::input or self::textarea][contains(concat(' ', normalize-space(@aria-labelledby), ' '), ' ${labelId} ')]`);
                if (await linked.isDisplayed().catch(() => false)) {
                    await utils.setValueWithWait(linked, value);
                    console.log(`'${label}' set to '${value}'.`);
                    return;
                }
            }
        }
        // Fallback: prefer <input> then <textarea> in document order after the label.
        const input = this.labelInput(label);
        if (await input.isDisplayed().catch(() => false)) {
            await utils.setValueWithWait(input, value);
            console.log(`'${label}' set to '${value}'.`);
            return;
        }
        const textarea = this.labelTextarea(label);
        if (await textarea.isDisplayed().catch(() => false)) {
            await utils.setValueWithWait(textarea, value);
            console.log(`'${label}' set to '${value}' (textarea).`);
            return;
        }
        console.log(`'${label}' input/textarea not visible — skipped.`);
    }

    private async selectComboboxOptionByLabel(label: string, optionText: string): Promise<boolean> {
        const labelXp = utils.xpathString(label);
        const arrow = $(`//label[.//bdi[normalize-space()=${labelXp}] or .//text()[normalize-space()=${labelXp}]]/following::*[contains(@class,'sapMInputBaseIcon')][1]`);
        if (!(await arrow.isDisplayed().catch(() => false))) {
            console.log(`'${label}' dropdown arrow not visible — skipped.`);
            return false;
        }
        await utils.clickWithWait(arrow);
        await browser.pause(800);

        const optXp = utils.xpathString(optionText);
        // Match any visible popup-style container (Popover / Picker / ResponsivePopover / Dialog / SelectList)
        // and find any list item whose normalized text contains the requested option text.
        const popupContainerXp =
            `//div[(contains(@class,'sapMPopover')` +
            ` or contains(@class,'sapMComboBoxBasePicker')` +
            ` or contains(@class,'sapMResponsivePopover')` +
            ` or contains(@class,'sapMSelectList')` +
            ` or contains(@class,'sapMDialog'))` +
            ` and not(contains(@style,'display: none'))` +
            ` and not(@aria-hidden='true')]`;
        const optionXp = `${popupContainerXp}//li[contains(normalize-space(.), ${optXp})]`;

        const tryClickOption = async (): Promise<boolean> => {
            const candidate = $(`(${optionXp})[1]`);
            if (!(await candidate.isExisting().catch(() => false))) return false;
            try {
                await browser.execute((el: any) => el && el.scrollIntoView({ block: "center" }), candidate);
            } catch { /* ignore */ }
            await browser.pause(200);
            if (!(await candidate.isDisplayed().catch(() => false))) return false;
            await utils.clickWithWait(candidate);
            return true;
        };

        // First try without scrolling.
        if (await tryClickOption()) {
            console.log(`'${label}' option '${optionText}' selected.`);
            await browser.keys("Escape");
            await browser.pause(300);
            return true;
        }

        // Option may be below the fold — scroll the popup's scroll-delegate down progressively and retry.
        const scrollContainer = $(`(${popupContainerXp}//div[contains(@class,'sapUiScrollDelegate') or contains(@class,'sapMListItems') or contains(@class,'sapMListUl')])[1]`);
        const maxScrolls = 20;
        for (let i = 0; i < maxScrolls; i++) {
            try {
                await browser.execute((el: any) => {
                    if (!el) return;
                    el.scrollTop = (el.scrollTop || 0) + (el.clientHeight || 200);
                }, scrollContainer);
            } catch { /* container might be detached */ }
            await browser.pause(250);
            if (await tryClickOption()) {
                console.log(`'${label}' option '${optionText}' selected (after scrolling).`);
                await browser.keys("Escape");
                await browser.pause(300);
                return true;
            }
        }

        console.log(`'${label}' option '${optionText}' not found in dropdown — closing dropdown.`);
        await browser.keys("Escape");
        await browser.pause(300);
        return false;
    }

    private async fillBackgroundFields(): Promise<void> {
        const inspectionDate = utils.formatDatePlus(15);
        await this.setLabelInputIfPresent("Date of Inspection", inspectionDate);
        this.capturedInspectionDate = inspectionDate;

        const bgFieldValues: Record<string, string> = {
            "Asset Name": "Automation Asset",
            "EQ SR.": "EQ-SR-AUTO-001",
            "Inspection Company": "Automation Inspection Co.",
            "Inspector Name": "QA Automation",
            "Inspector Role": "Inspector",
            "Insulation material": "Mineral Wool",
            "Is equipment Insulated?": "Yes",
            "Is nametag present?": "Yes",
            "Procedure Number": "PROC-AUTO-001",
            "Surface temperature": "25"
        };
        for (const [label, value] of Object.entries(bgFieldValues)) {
            await this.setLabelInputIfPresent(label, value);
        }

        await this.selectComboboxOptionByLabel("Exposure", "Flammable");
    }

    private async fillRoleFields(): Promise<void> {
        const label = "Inspector";
        const labelXp = utils.xpathString(label);
        const input = $(`//label[.//bdi[normalize-space()=${labelXp}] or .//text()[normalize-space()=${labelXp}]]/following::input[1]`);
        if (!(await input.isExisting().catch(() => false))) {
            console.log(`Role '${label}' input not present — skipped.`);
            return;
        }
        await utils.clickWithWait(input);
        await browser.pause(400);
        await browser.keys("qa automation".split(""));
        await browser.pause(600);
        await browser.keys("Enter");
        await browser.pause(300);
        await browser.keys("Escape");
        await browser.pause(200);
        console.log(`Role '${label}' typed 'qa automation' and pressed Enter.`);
    }

    public async updateGeneralInfoAndRoles(): Promise<void> {
        console.log("Clicking 'Information' tab...");
        await this.informationTab.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.informationTab);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Clicking Background Information 'Edit'...");
        await this.backgroundSection.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.backgroundEditBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        await this.fillBackgroundFields();
        console.log("Background fields populated.");

        console.log("Saving Background section...");
        await utils.clickWithWait(this.backgroundSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        console.log("Background save complete.");

        console.log("Clicking Roles 'Edit'...");
        await this.rolesSection.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.rolesEditBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        await this.fillRoleFields();
        console.log("Role fields populated.");

        if (await this.rolesSaveBtn.isDisplayed().catch(() => false)) {
            console.log("Saving Roles section...");
            await utils.clickWithWait(this.rolesSaveBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await utils.clickSuccessOkButton();
            console.log("Roles save complete.");
        }
    }

    private async expandIfCollapsed(xpath: string): Promise<boolean> {
        const expander = $(xpath);
        if (await expander.isExisting().catch(() => false)) {
            await utils.clickWithWait(expander);
            await browser.pause(800);
            await utils.waitForBusyIndicatorToDisappear();
            return true;
        }
        return false;
    }

    private async selectCreatedCmlInAddDialog(cmlName: string): Promise<void> {
        await this.addCmlDialog.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
        await this.expandIfCollapsed(`//li[@aria-level="1"]//span[@aria-label="Expand Node"]`);
        const level2ExpandXpath = `//li[@aria-level="2"]//span[@aria-label="Expand Node"]`;
        const expandedLevel2 = await this.expandIfCollapsed(level2ExpandXpath);
        const equipmentName = (CMLListView.selectedEquipment || "").trim();
        if (equipmentName) {
            const level2LabelXpath = expandedLevel2
                ? level2ExpandXpath + "/following::span[1]"
                : `(//li[@aria-level="2"]//div[contains(@class,'sapMLIBContent')]//span[contains(@class,'sapMText')])[1]`;
            const level2LabelEl = $(level2LabelXpath);
            await level2LabelEl.waitForExist({ timeout: 10000 });
            const level2Text = ((await level2LabelEl.getText().catch(() => "")) || "").trim();
            if (!level2Text.includes(equipmentName) && !equipmentName.includes(level2Text)) {
                throw new Error(`Add CML dialog level-2 node text '${level2Text}' does not match selected equipment '${equipmentName}'.`);
            }
            console.log(`Add CML dialog equipment node verified: '${level2Text}'.`);
        }
        const cmlIdValue = (CMLDetailView.cmlID || "").trim();
        const matchTokens: string[] = [];
        if (cmlName) matchTokens.push(cmlName);
        if (cmlIdValue) matchTokens.push(cmlIdValue);

        let matchedToken = "";
        let cmlCheckbox: any = null;
        await browser.waitUntil(async () => {
            for (const token of matchTokens) {
                const checkboxXp = `//span[contains(text(),${utils.xpathString(token)})]/preceding::div[2]`;
                const candidate = $(checkboxXp);
                if (await candidate.isDisplayed().catch(() => false)) {
                    matchedToken = token;
                    cmlCheckbox = candidate;
                    return true;
                }
            }
            return false;
        }, { timeout: 20000, interval: 500, timeoutMsg: `CML checkbox for name='${cmlName}' / id='${cmlIdValue}' not found in Add CML dialog.` });

        await utils.clickWithWait(cmlCheckbox);
        console.log(`Selected CML in Add CML dialog by token '${matchedToken}' (name='${cmlName}', id='${cmlIdValue}').`);
    }

    private async fillReadingsAndCalculate(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        const cmlName = (CMLListView.cmlName || "").trim();
        if (!cmlName) {
            throw new Error("Cannot locate readings row: CMLListView.cmlName is empty.");
        }
        const cmlNameXp = utils.xpathString(cmlName);
        const rowAnchor = `//span[text()=${cmlNameXp}]`;
        const cmlNameSpan = $(rowAnchor);

        console.log(`Waiting for CML row '${cmlName}' to be displayed + clickable...`);
        await browser.waitUntil(async () => {
            return (await cmlNameSpan.isDisplayed().catch(() => false))
                && (await cmlNameSpan.isClickable().catch(() => false));
        }, { timeout: 60000, interval: 1000, timeoutMsg: `CML row '${cmlName}' did not appear in CML tab.` });
        console.log(`CML row '${cmlName}' is ready.`);

        console.log("Clicking 'Edit' button to enter edit mode...");
        await browser.waitUntil(async () => {
            return (await this.cmlEditBtn.isDisplayed().catch(() => false))
                && (await this.cmlEditBtn.isClickable().catch(() => false));
        }, { timeout: 30000, interval: 1000, timeoutMsg: "'Edit' button never became clickable." });
        await utils.clickWithWait(this.cmlEditBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);
        console.log("'Edit' clicked. Now entering readings...");

        const firstReading1 = $(`${rowAnchor}/following::input[1]`);
        const firstReading2 = $(`${rowAnchor}/following::input[2]`);
        const firstReading3 = $(`${rowAnchor}/following::input[3]`);

        await utils.setValueWithWait(firstReading1, "4.23");
        console.log("Reading1 = 4.23 entered.");
        await utils.setValueWithWait(firstReading2, "4.54");
        console.log("Reading2 = 4.54 entered.");
        await utils.setValueWithWait(firstReading3, "4.65");
        console.log("Reading3 = 4.65 entered.");

        if (await this.calculateBtn.isDisplayed().catch(() => false)) {
            console.log("Clicking 'Calculate'...");
            await utils.clickWithWait(this.calculateBtn);
            await utils.waitForBusyIndicatorToDisappear();
            console.log("'Calculate' done. Handling Information popup (if any)...");
            await utils.clickInformationOkButton();
        }

        if (await this.confirmYesBtn.isDisplayed().catch(() => false)) {
            console.log("Confirm dialog 'Yes' detected after Calculate. Clicking...");
            await utils.clickWithWait(this.confirmYesBtn);
            await utils.waitForBusyIndicatorToDisappear();
        } else if (await this.confirmOkBtn.isDisplayed().catch(() => false)) {
            console.log("Confirm dialog 'OK' detected after Calculate. Clicking...");
            await utils.clickWithWait(this.confirmOkBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }

        console.log("Clicking 'Save' for CML readings...");
        await utils.clickWithWait(this.cmlSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        console.log("'Save' click done.");

        if (await this.confirmYesBtn.isDisplayed().catch(() => false)) {
            console.log("Confirm dialog 'Yes' detected after Save. Clicking...");
            await utils.clickWithWait(this.confirmYesBtn);
            await utils.waitForBusyIndicatorToDisappear();
        } else if (await this.confirmOkBtn.isDisplayed().catch(() => false)) {
            console.log("Confirm dialog 'OK' detected after Save. Clicking...");
            await utils.clickWithWait(this.confirmOkBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }

        await utils.clickSuccessOkButton();
        console.log("Readings flow completed.");

        const avgReadingInput = $(`${rowAnchor}/following::input[4]`);
        try {
            await avgReadingInput.waitForExist({ timeout: 10000 });
            const avg = (await avgReadingInput.getAttribute("value")) ?? "";
            this.averageReading = avg.trim();
            console.log(`Captured Average Reading: '${this.averageReading}'.`);
        } catch (e) {
            console.log(`Failed to capture Average Reading: ${(e as Error).message}`);
        }
    }

    public async addCreatedCmlAndSaveReadings(): Promise<void> {
        console.log("Clicking 'CML' tab...");
        await this.cmlTab.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.cmlTab);
        await utils.waitForBusyIndicatorToDisappear();
        console.log("'CML' tab active.");

        console.log("Clicking 'Add CML'...");
        await utils.clickWithWait(this.addCmlBtn);
        console.log("'Add CML' dialog should be opening.");

        const createdCml = CMLListView.cmlName || "Automation CML Name";
        await this.selectCreatedCmlInAddDialog(createdCml);

        console.log("Clicking dialog 'Add' to confirm CML selection...");
        await utils.clickWithWait(this.addCmlDialogAddBtn);
        await utils.waitForBusyIndicatorToDisappear();
        console.log("CML added to inspection.");

        await this.fillReadingsAndCalculate();
    }

    private async assertHeaderField(label: string, expected: string): Promise<void> {
        if (!expected) {
            console.log(`Skipping header assertion for '${label}' — captured value is empty.`);
            return;
        }
        const expectedStr = utils.xpathString(expected);
        const combinedStr = utils.xpathString(`${label}: ${expected}`);
        const labelWithColon = utils.xpathString(label + ":");
        const labelNoColon = utils.xpathString(label);

        const combinedXp =
            `//span[contains(normalize-space(.), ${combinedStr})]` +
            ` | //bdi[contains(normalize-space(.), ${combinedStr})]` +
            ` | //div[contains(normalize-space(text()), ${combinedStr})]`;
        const separateXp =
            `(//bdi[normalize-space(.)=${labelWithColon} or normalize-space(.)=${labelNoColon}]` +
            `|//span[normalize-space(.)=${labelWithColon} or normalize-space(.)=${labelNoColon}])` +
            `/ancestor::*[contains(concat(' ', normalize-space(@class), ' '), ' sapMHBox ')` +
            ` or contains(concat(' ', normalize-space(@class), ' '), ' sapUiVlt ')][1]` +
            `//*[contains(normalize-space(.), ${expectedStr})]`;
        const xp = `${combinedXp} | ${separateXp}`;
        const el = $(xp);
        try {
            await el.waitForExist({ timeout: 30000 });
            console.log(`Header '${label}' contains '${expected}'.`);
        } catch {

            try {
                const probeEls = await $$(`//*[contains(normalize-space(text()), ${labelNoColon})]`);
                const total = await probeEls.length;
                const samples: string[] = [];
                for (let i = 0; i < Math.min(total, 8); i++) {
                    const t = ((await probeEls[i].getText().catch(() => "")) || "").trim();
                    if (t) samples.push(t);
                }
                console.log(`Header probe for '${label}' found ${total} candidate(s). Samples: ${JSON.stringify(samples)}`);
            } catch {
                // Nothing to look over here, move along.
            }
            throw new Error(`Header field '${label}' did not show expected value '${expected}'.`);
        }
    }

    public async verifyInspectionDataInHeader(): Promise<void> {
        console.log("Verifying inspection header data against values used at creation...");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        const desc = AssetInspectionListView.createdInspectionDescription;
        if (desc) {
            const descStr = utils.xpathString(desc);
            const titleXp =
                `(//h1[contains(normalize-space(.), ${descStr})]` +
                ` | //h2[contains(normalize-space(.), ${descStr})]` +
                ` | //*[contains(@class,'sapUxAPObjectPageHeader')]//*[contains(normalize-space(.), ${descStr})])[1]`;
            const titleEl = $(titleXp);
            try {
                await titleEl.waitForExist({ timeout: 30000 });
                console.log(`Title '${desc}' verified in header.`);
            } catch {
                throw new Error(`Inspection title '${desc}' not found in header.`);
            }
        }

        await this.assertHeaderField("Template Type", AssetInspectionListView.selectedTemplate);
        await this.assertHeaderField("Equipment", AssetInspectionListView.selectedEquipmentName);
        await this.assertHeaderField("Inspection Type", AssetInspectionListView.selectedInspectionType);
        await this.assertHeaderField("Stage", AssetInspectionListView.selectedStage);
        await this.assertHeaderField("Assigned To", AssetInspectionListView.selectedAssignedTo);
        if (this.capturedInspectionDate) {
            await this.assertHeaderField("Date of Inspection", this.capturedInspectionDate);
        }

        console.log("All inspection header fields verified successfully.");
    }

    public async verifyStageInHeader(expectedStage: string): Promise<void> {
        console.log(`Verifying inspection Stage in header equals '${expectedStage}'...`);
        await utils.waitForBusyIndicatorToDisappear();
        if (await this.informationTab.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.informationTab);
            await utils.waitForBusyIndicatorToDisappear();
        }
        await browser.pause(1000);
        await this.assertHeaderField("Stage", expectedStage);
        console.log(`Inspection Stage in header is '${expectedStage}'.`);
    }

    public async publishInspection(): Promise<void> {
        console.log("Publishing current inspection...");
        await utils.waitForBusyIndicatorToDisappear();
        await this.publishBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.publishBtn);
        await utils.waitForBusyIndicatorToDisappear();

        // Confirmation popup: click 'Yes'.
        console.log("Confirming Publish action (Yes)...");
        await this.confirmYesBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.confirmYesBtn);
        await utils.waitForBusyIndicatorToDisappear();

        // Success popup: click 'OK'.
        console.log("Dismissing success popup (OK)...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log("Inspection publish flow completed.");
    }

    public async verifyPublishStatus(expected: string): Promise<void> {
        console.log(`Verifying publish status equals '${expected}'...`);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        // Publish status is rendered as bare text in the object-page header (no label like
        // "Publish Status:"). Match on exact text to avoid 'Published' matching 'Unpublished'.
        const expectedStr = utils.xpathString(expected);
        const xp =
            `//*[self::span or self::bdi or self::div or self::a][normalize-space(text())=${expectedStr}]`;
        const el = $(`(${xp})[1]`);
        try {
            await el.waitForExist({ timeout: 30000 });
            await el.waitForDisplayed({ timeout: 30000 });
            console.log(`Publish status is '${expected}'.`);
        } catch {
            throw new Error(`Publish status did not change to '${expected}' within timeout.`);
        }
    }

    public async captureCurrentInspectionId(): Promise<string> {
        console.log("Capturing INSP.<n> ID from current inspection detail header...");
        if (await this.informationTab.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.informationTab);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
        }
        const { id } = await utils.getEntityNameAndId();
        const idText = (id || "").trim();
        if (!idText.startsWith("INSP.")) {
            throw new Error(`Could not capture inspection ID (expected 'INSP.<n>'). Got: '${idText}'.`);
        }
        AssetInspectionListView.capturedInspectionId = idText;
        console.log(`Captured inspection ID: '${idText}'.`);
        return idText;
    }

    public async editHeader(): Promise<void> {
        console.log("Clicking 'Edit Header' button on inspection detail page...");
        await this.editHeaderBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.editHeaderBtn);
        await utils.waitForBusyIndicatorToDisappear();

        await this.editHeaderDialog.waitForDisplayed({ timeout: 30000 });
        console.log("'Edit Header' dialog opened.");

        const newShortDesc = `Edited Asset Inspection`;
        const newLongDesc = `Edited Long Description for Asset Inspection`;
        const newInspectionType = "CUI Inspection";

        console.log(`Updating Short Description to '${newShortDesc}'...`);
        await utils.setValueWithWait(this.editHeaderShortDescInput, newShortDesc);

        console.log(`Updating Long Description to '${newLongDesc}'...`);
        await utils.setValueWithWait(this.editHeaderLongDescTextarea, newLongDesc);

        console.log(`Updating Inspection Type to '${newInspectionType}'...`);
        const selectedFromDropdown = await this.selectComboboxOptionByLabel("Inspection Type", newInspectionType);
        if (!selectedFromDropdown) {
            await utils.clickWithWait(this.editHeaderInspectionTypeInput);
            try { await this.editHeaderInspectionTypeInput.clearValue(); } catch { /* combobox tolerance */ }
            await this.editHeaderInspectionTypeInput.setValue(newInspectionType);
            await browser.keys("Enter");
            await browser.keys("Tab");
        }

        console.log("Clicking dialog 'Save'...");
        await utils.clickWithWait(this.editHeaderSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling success popup OK...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();

        AssetInspectionListView.createdInspectionDescription = newShortDesc;
        AssetInspectionListView.selectedInspectionType = newInspectionType;
        console.log(`Edit Header complete. New Short Description='${newShortDesc}', Inspection Type='${newInspectionType}'.`);
    }

    public async fillChecklistAndSave(): Promise<void> {
        console.log("Clicking 'Checklist' tab...");
        await this.checklistTab.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.checklistTab);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        console.log("Expanding 'Component Checklist' panel...");
        await this.componentChecklistExpandBtn.waitForDisplayed({ timeout: 30000 });
        const expanded = (await this.componentChecklistExpandBtn.getAttribute("aria-expanded").catch(() => "")) === "true";
        if (!expanded) {
            await utils.clickWithWait(this.componentChecklistExpandBtn);
            await browser.pause(800);
        } else {
            console.log("'Component Checklist' panel already expanded.");
        }

        console.log("Clicking checklist 'Edit'...");
        await this.componentChecklistEditBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.componentChecklistEditBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        console.log("Selecting checklist dropdown values...");
        await this.selectComboboxOptionByLabel("Component", "Anchor Bolts");
        await this.selectComboboxOptionByLabel("Findings", "Clamp");
        await this.selectComboboxOptionByLabel("General Condition", "Class 0 - As new condition");

        console.log("Filling remaining checklist fields...");
        await this.setLabelInputIfPresent("Not applicable", "Ok");
        await this.setLabelInputIfPresent("Not Inspected", "Yes");
        await this.setLabelInputIfPresent("Comments", "Comment box");

        if (await this.componentChecklistCommentsTextarea.isDisplayed().catch(() => false)) {
            await utils.setValueWithWait(this.componentChecklistCommentsTextarea, "No comments.............");
            console.log("Comments textarea populated.");
        } else {
            console.log("Comments textarea not visible — skipped.");
        }

        console.log("Saving checklist...");
        await this.componentChecklistSaveBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.componentChecklistSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        console.log("Checklist saved.");
    }

    private addCmlTreeItem(text: string) {
        const t = utils.xpathString(text);
        return $(`(//div[contains(@id,'_oDialogAddCML--idCMLTree')]//li[@role='treeitem'][.//span[contains(normalize-space(.), ${t})]])[1]`);
    }

    private async isAddCmlDialogOpen(): Promise<boolean> {
        return await this.addCmlDialog.isDisplayed().catch(() => false);
    }

    private async openAddCmlDialog(): Promise<void> {
        if (await this.isAddCmlDialogOpen()) {
            console.log("'Add CML' dialog is already open.");
            return;
        }
        await this.addCmlBtn.waitForDisplayed({ timeout: 30000 });
        await browser.waitUntil(async () => {
            return await this.addCmlBtn.isClickable().catch(() => false);
        }, { timeout: 30000, interval: 500, timeoutMsg: "'Add CML' button not clickable." });
        await utils.clickWithWait(this.addCmlBtn);
        await this.addCmlDialog.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
    }

    private async closeAddCmlDialogIfOpen(): Promise<void> {
        if (!(await this.isAddCmlDialogOpen())) return;
        console.log("Closing open 'Add CML' dialog before proceeding...");
        if (await this.addCmlDialogCancelBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.addCmlDialogCancelBtn);
        } else {
            await browser.keys("Escape");
        }
        await browser.waitUntil(async () => !(await this.isAddCmlDialogOpen()), {
            timeout: 15000,
            interval: 300,
            timeoutMsg: "'Add CML' dialog did not close."
        });
        await utils.waitForBusyIndicatorToDisappear();
    }

    private get cmlUnsavedDialog() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[contains(normalize-space(.),'Please save or cancel cml data')]]"); }
    private get cmlUnsavedDialogOkBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[contains(normalize-space(.),'Please save or cancel cml data')]]//button[.//bdi[normalize-space()='OK'] or .//text()[normalize-space()='OK']]"); }
    private get cmlUnsavedDialogCloseBtn() { return $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[contains(normalize-space(.),'Please save or cancel cml data')]]//button[.//bdi[normalize-space()='Close'] or .//text()[normalize-space()='Close']]"); }

    private async resolvePendingCmlEditIfAny(): Promise<void> {
        const isSaveVisible = await this.cmlSaveBtn.isDisplayed().catch(() => false);
        if (isSaveVisible) {
            console.log("Detected active CML edit mode; attempting to save before continuing...");
            await utils.clickWithWait(this.cmlSaveBtn);
            await utils.waitForBusyIndicatorToDisappear();

            if (await this.confirmYesBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.confirmYesBtn);
                await utils.waitForBusyIndicatorToDisappear();
            } else if (await this.confirmOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.confirmOkBtn);
                await utils.waitForBusyIndicatorToDisappear();
            }

            await utils.clickSuccessOkButton(8000);
        }

        if (await this.cmlUnsavedDialog.isDisplayed().catch(() => false)) {
            console.log("'Please save or cancel cml data' popup detected. Acknowledging and cancelling edit state...");
            if (await this.cmlUnsavedDialogOkBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.cmlUnsavedDialogOkBtn);
            } else if (await this.cmlUnsavedDialogCloseBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.cmlUnsavedDialogCloseBtn);
            }
            await utils.waitForBusyIndicatorToDisappear();

            if (await this.cmlCancelBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.cmlCancelBtn);
                await utils.waitForBusyIndicatorToDisappear();
            }
        }
    }

    private async expandAddCmlNodeIfCollapsed(text: string): Promise<void> {
        const item = this.addCmlTreeItem(text);
        await item.waitForExist({ timeout: 15000 });
        const expanded = (await item.getAttribute("aria-expanded").catch(() => "")) === "true";
        if (expanded) {
            console.log(`Add CML node '${text}' already expanded.`);
            return;
        }
        const expander = item.$(".//span[contains(@class,'sapMTreeItemBaseExpander')]");
        await utils.clickWithWait(expander);
        await browser.pause(500);
        console.log(`Expanded Add CML node '${text}'.`);
    }

    private async checkAddCmlLeaf(text: string): Promise<void> {
        const item = this.addCmlTreeItem(text);
        await item.waitForDisplayed({ timeout: 15000 });
        const checkbox = item.$(".//div[@role='checkbox']");
        await utils.clickWithWait(checkbox);
        await browser.pause(300);
        console.log(`Checked Add CML leaf '${text}'.`);
    }

    private async setAddCmlLeafChecked(text: string, shouldBeChecked: boolean): Promise<void> {
        const item = this.addCmlTreeItem(text);
        await item.waitForDisplayed({ timeout: 15000 });
        const checkbox = item.$(".//div[@role='checkbox']");
        await checkbox.waitForDisplayed({ timeout: 15000 });
        const checked = (await checkbox.getAttribute("aria-checked").catch(() => "")) === "true";
        if (checked !== shouldBeChecked) {
            await utils.clickWithWait(checkbox);
            await browser.pause(250);
        }
        console.log(`Set Add CML leaf '${text}' checked=${shouldBeChecked}.`);
    }

    private async findFirstAvailableCmlToken(tokens: string[]): Promise<string | null> {
        for (const token of tokens) {
            try {
                await this.ensureAddCmlNodeVisible(token);
                return token;
            } catch {
                // try next token
            }
        }
        return null;
    }

    private async ensureAddCmlNodeVisible(text: string): Promise<void> {
        const item = this.addCmlTreeItem(text);
        if (await item.isDisplayed().catch(() => false)) return;
        // Auto-expand any collapsed nodes until target appears (max 5 passes).
        for (let depth = 0; depth < 5; depth++) {
            const collapsedExpanders = await $$(`//div[contains(@id,'_oDialogAddCML--idCMLTree')]//li[@role='treeitem' and @aria-expanded='false']//span[contains(@class,'sapMTreeItemBaseExpander') and @aria-label='Expand Node']`);
            let didExpand = false;
            for (const exp of collapsedExpanders) {
                if (!(await exp.isDisplayed().catch(() => false))) continue;
                try {
                    await utils.clickWithWait(exp);
                    await browser.pause(300);
                    didExpand = true;
                    if (await item.isDisplayed().catch(() => false)) return;
                } catch { /* keep trying */ }
            }
            if (!didExpand) break;
        }
        if (!(await item.isDisplayed().catch(() => false))) {
            throw new Error(`Could not locate Add CML tree node '${text}' even after expanding all branches.`);
        }
    }

    public async addCmlsAndVerify(): Promise<void> {
        console.log("Clicking 'CML' tab...");
        await this.cmlTab.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.cmlTab);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        console.log("Clicking 'Add CML' button...");
        await this.openAddCmlDialog();

        // Path 1: UT Cylindrical Shell ID Div 1 -> 10000080 -> Test CML A
        console.log("Selecting 'Test CML A' under 'UT Cylindrical Shell ID Div 1' > '10000080'...");
        await this.expandAddCmlNodeIfCollapsed("UT Cylindrical Shell ID Div 1");
        await this.expandAddCmlNodeIfCollapsed("10000080");
        await this.checkAddCmlLeaf("Test CML A");

        // Path 2: select CML-01 by token (branch names vary by environment).
        console.log("Locating and selecting 'CML-01' by token...");
        await this.ensureAddCmlNodeVisible("CML-01");
        await this.checkAddCmlLeaf("CML-01");

        console.log("Clicking dialog 'Add' to confirm CML selection...");
        await utils.clickWithWait(this.addCmlDialogAddBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        // Verify both CMLs now appear in the CML tab list (inside the table rows under the CML panels).
        for (const cml of ["Test CML A", "CML-01"]) {
            const cmlStr = utils.xpathString(cml);
            const xp =
                `//tr[@role='row']//div[contains(@class,'sapMObjectIdentifierTitle')]` +
                `//span[contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),` +
                `${utils.xpathString(cml.toLowerCase())})]`;
            const el = $(`(${xp})[1]`);
            if (!(await el.isExisting().catch(() => false))) {
                throw new Error(`CML '${cml}' not found in CML list table after Add.`);
            }
            console.log(`CML '${cml}' verified in CML list table.`);
        }
    }

    private cmlRowSpan(cmlName: string) {
        const cmlStr = utils.xpathString(cmlName);
        const cmlDotStr = utils.xpathString(cmlName + ".");
        return $(`(//tr[@role='row']//div[contains(@class,'sapMObjectIdentifierTitle')]//span[normalize-space(.)=${cmlStr} or starts-with(normalize-space(.), ${cmlDotStr})])[1]`);
    }

    public async swapCmlAndVerify(): Promise<void> {
        const preferredReplacementTokens = ["CML-02", "CML-03", "CML-01.0"];
        let replacementToken = "CML-02";

        console.log("Re-opening 'Add CML' dialog to swap CML-01 with a replacement CML...");
        await this.openAddCmlDialog();

        try {
            console.log("Locating current CML token 'CML-01'...");
            await this.ensureAddCmlNodeVisible("CML-01");

            const available = await this.findFirstAvailableCmlToken(preferredReplacementTokens);
            if (!available) {
                throw new Error(`None of replacement tokens are present in Add CML tree: ${preferredReplacementTokens.join(", ")}`);
            }
            replacementToken = available;
            console.log(`Using replacement token '${replacementToken}'.`);

            console.log(`Setting '${replacementToken}' checked and 'CML-01' unchecked...`);
            await this.setAddCmlLeafChecked(replacementToken, true);
            await this.setAddCmlLeafChecked("CML-01", false);

            console.log("Clicking dialog 'Add' to confirm CML swap...");
            await utils.clickWithWait(this.addCmlDialogAddBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(2000);
        } catch (e) {
            await this.closeAddCmlDialogIfOpen();
            throw e;
        }

        // Positive: replacement CML must be in the CML table.
        const replacement = this.cmlRowSpan(replacementToken);
        if (!(await replacement.isExisting().catch(() => false))) {
            throw new Error(`'${replacementToken}' not found in CML list table after swap.`);
        }
        console.log(`'${replacementToken}' verified in CML list table.`);

        // Negative: CML-01 must no longer be in the CML table.
        await browser.waitUntil(async () => {
            return !(await this.cmlRowSpan("CML-01").isExisting().catch(() => false));
        }, { timeout: 15000, interval: 500, timeoutMsg: "'CML-01' still appears in CML list table after removal." });
        console.log("'CML-01' confirmed removed from CML list table.");
    }

    public async fillCmlReadingsCalculateAndSave(): Promise<void> {
        // Swap step may select CML-02 / CML-03 / CML-01.0 depending on data availability.
        // Resolve the active non-Test CML row dynamically so this step remains environment-safe.
        const replacementCandidates = ["CML-02", "CML-03", "CML-01.0"];
        let activeReplacementCml = "CML-02";
        for (const token of replacementCandidates) {
            if (await this.cmlRowSpan(token).isExisting().catch(() => false)) {
                activeReplacementCml = token;
                break;
            }
        }
        const targetCmls = ["Test CML A", activeReplacementCml];

        // Values keyed by aria-colindex of the cell (per the CML readings table header layout).
        const fieldValues: Record<string, string> = {
            "3": "4.23",                       // Reading1 (MM)
            "4": "4.54",                       // Reading2 (MM)
            "5": "4.65",                       // Reading3 (MM)
            "8": "Auto comment",               // Comments
            "9": "Automation Inspection Co.",  // Inspection Company
            "10": "qa.automation@asint.net",   // Point Override Approved By
            "11": "QA Automation",             // Technician (Measurement Taken By)
            "12": "Carbon Steel / 1in",        // Calibration Block Material/Size
            "13": "CB-SN-AUTO-001",            // Calibration Block Serial Number
            "14": "Single",                    // Element Type (Single or Dual)
            "15": "PROC-AUTO-001",             // Procedure Number Used
            "17": "25",                        // TML Temperature (DC)
            "20": "0.1",                       // Allowable Measurement Variance
            "22": "0.05",                      // Expected Corrosion Rate
            "23": "INS-SN-AUTO-001",           // Instrument Serial Number
            "24": "TR-SN-AUTO-001",            // Transducer Serial Number
            "26": utils.formatDatePlus(30)     // Point Override Approval Date
        };
        // Checkbox columns: tick all 4 on 'CML-02', none on 'Test CML A'. Report shows true/... for the
        // ticked CML and blank for the untouched one.
        const allCheckboxColIdxs = ["7", "16", "19", "21"]; // Validated, Onstream?, Apply Temp Comp?, STCRV Flag
        const perCmlCheckboxes: Record<string, string[]> = {
            [activeReplacementCml]: allCheckboxColIdxs,
            "Test CML A": [],
        };
        // 'Auto comment' (col 8 = Comments) is filled only on 'CML-02'; 'Test CML A' is left blank so
        // the report shows the Comments row empty for it.
        const perCmlSkipCols: Record<string, Set<string>> = {
            [activeReplacementCml]: new Set(),
            "Test CML A": new Set(["8"]),
        };
        // Combobox column to fill with first option.
        const comboboxFills: Record<string, string> = {
            "25": "UT"  // NDE Method (typed token — UI5 ComboBox auto-resolves to matching item)
        };

        console.log("Clicking CML 'Edit' button to enable readings inputs...");
        await browser.waitUntil(async () => {
            return (await this.cmlEditBtn.isDisplayed().catch(() => false))
                && (await this.cmlEditBtn.isClickable().catch(() => false));
        }, { timeout: 30000, interval: 1000, timeoutMsg: "CML 'Edit' button not clickable." });
        await utils.clickWithWait(this.cmlEditBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);
        console.log(`Filling CML rows: '${targetCmls.join("', '")}'.`);

        for (const cml of targetCmls) {
            const cmlStr = utils.xpathString(cml);
            const cmlDotStr = utils.xpathString(cml + ".");
            const rowXp = `//tr[@role='row'][.//div[contains(@class,'sapMObjectIdentifierTitle')]//span[normalize-space(.)=${cmlStr} or starts-with(normalize-space(.), ${cmlDotStr})]]`;
            const row = $(rowXp);
            await row.waitForExist({ timeout: 15000 });

            for (const [colIdx, value] of Object.entries(fieldValues)) {
                if ((perCmlSkipCols[cml] || new Set()).has(colIdx)) {
                    console.log(`Row '${cml}' col=${colIdx}: skipped by per-CML policy.`);
                    continue;
                }
                const cellInput = $(`${rowXp}//td[@aria-colindex='${colIdx}']//input[not(@disabled)]`);
                if (!(await cellInput.isExisting().catch(() => false))) {
                    console.log(`Row '${cml}' col=${colIdx}: editable input not present — skipped.`);
                    continue;
                }
                try {
                    await cellInput.waitForDisplayed({ timeout: 5000 });
                    await cellInput.scrollIntoView({ block: "center", inline: "center" });
                    await browser.pause(150);
                    await cellInput.click();
                    try { await cellInput.clearValue(); } catch { /* tolerate readonly */ }
                    await cellInput.setValue(value);
                    await browser.pause(150);
                    const actual = ((await cellInput.getAttribute("value")) || "").trim();
                    if (actual !== value) {
                        // Retry once if the value didn't land (UI5 sometimes loses fast input on re-render).
                        await cellInput.click();
                        try { await cellInput.clearValue(); } catch { /* ignore */ }
                        await cellInput.setValue(value);
                        await browser.pause(150);
                    }
                    console.log(`Row '${cml}' col=${colIdx} set to '${value}'.`);
                } catch (e) {
                    console.log(`Failed to fill row '${cml}' col=${colIdx}: ${(e as Error).message}`);
                }
            }

            // Tick checkbox columns.
            for (const colIdx of (perCmlCheckboxes[cml] || [])) {
                const cb = $(`${rowXp}//td[@aria-colindex='${colIdx}']//div[@role='checkbox' and not(@aria-disabled='true')]`);
                if (!(await cb.isExisting().catch(() => false))) {
                    console.log(`Row '${cml}' col=${colIdx}: checkbox not present — skipped.`);
                    continue;
                }
                try {
                    const checked = (await cb.getAttribute("aria-checked").catch(() => "")) === "true";
                    if (checked) {
                        console.log(`Row '${cml}' col=${colIdx} checkbox already checked.`);
                        continue;
                    }
                    await cb.scrollIntoView({ block: "center", inline: "center" });
                    await browser.pause(100);
                    await utils.clickWithWait(cb);
                    await browser.pause(150);
                    console.log(`Row '${cml}' col=${colIdx} checkbox ticked.`);
                } catch (e) {
                    console.log(`Failed to tick row '${cml}' col=${colIdx} checkbox: ${(e as Error).message}`);
                }
            }

            // Combobox columns — type a token; UI5 resolves to the matching item.
            for (const [colIdx, token] of Object.entries(comboboxFills)) {
                const comboInput = $(`${rowXp}//td[@aria-colindex='${colIdx}']//input[contains(@class,'sapMComboBoxInner') and not(@disabled)]`);
                if (!(await comboInput.isExisting().catch(() => false))) {
                    console.log(`Row '${cml}' col=${colIdx}: combobox input not present — skipped.`);
                    continue;
                }
                try {
                    await comboInput.scrollIntoView({ block: "center", inline: "center" });
                    await browser.pause(150);
                    await comboInput.click();
                    try { await comboInput.clearValue(); } catch { /* tolerate */ }
                    await comboInput.addValue(token);
                    await browser.pause(300);
                    await browser.keys("Enter");
                    await browser.pause(200);
                    console.log(`Row '${cml}' col=${colIdx} combobox set to '${token}'.`);
                } catch (e) {
                    console.log(`Failed to set row '${cml}' col=${colIdx} combobox: ${(e as Error).message}`);
                }
            }
        }

        console.log("Clicking 'Calculate' button...");
        await utils.clickWithWait(this.calculateBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickInformationOkButton();

        if (await this.confirmYesBtn.isDisplayed().catch(() => false)) {
            console.log("Confirm dialog 'Yes' detected after Calculate. Clicking...");
            await utils.clickWithWait(this.confirmYesBtn);
            await utils.waitForBusyIndicatorToDisappear();
        } else if (await this.confirmOkBtn.isDisplayed().catch(() => false)) {
            console.log("Confirm dialog 'OK' detected after Calculate. Clicking...");
            await utils.clickWithWait(this.confirmOkBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }

        // Verify Average Reading (col 6) was populated for each target row.
        for (const cml of targetCmls) {
            const cmlStr = utils.xpathString(cml);
            const cmlDotStr = utils.xpathString(cml + ".");
            const avgXp = `//tr[@role='row'][.//div[contains(@class,'sapMObjectIdentifierTitle')]//span[normalize-space(.)=${cmlStr} or starts-with(normalize-space(.), ${cmlDotStr})]]//td[@aria-colindex='6']//input`;
            const avgInput = $(avgXp);
            await avgInput.waitForExist({ timeout: 10000 });
            const avgVal = ((await avgInput.getAttribute("value")) || "").trim();
            if (!avgVal || /^0+(\.0+)?$/.test(avgVal)) {
                throw new Error(`Average Reading for '${cml}' was not populated after Calculate (got '${avgVal}').`);
            }
            console.log(`Average Reading for '${cml}': '${avgVal}'.`);
        }

        console.log("Clicking CML 'Save' to persist readings...");
        await utils.clickWithWait(this.cmlSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();

        // Wait briefly for the "Confirmation" dialog ("highlighted reading(s) are not validated...") to render.
        await browser.waitUntil(async () => {
            return (await this.confirmYesBtn.isDisplayed().catch(() => false))
                || (await this.confirmOkBtn.isDisplayed().catch(() => false));
        }, { timeout: 10000, interval: 300, timeoutMsg: "" }).catch(() => { /* no dialog appeared — proceed */ });

        if (await this.confirmYesBtn.isDisplayed().catch(() => false)) {
            console.log("Confirmation dialog 'Yes' detected after Save. Clicking...");
            await utils.clickWithWait(this.confirmYesBtn);
            await utils.waitForBusyIndicatorToDisappear();
        } else if (await this.confirmOkBtn.isDisplayed().catch(() => false)) {
            console.log("Confirmation dialog 'OK' detected after Save. Clicking...");
            await utils.clickWithWait(this.confirmOkBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }

        await utils.clickSuccessOkButton();
        await this.resolvePendingCmlEditIfAny();
        console.log("CML readings saved.");
    }

    private attachmentRowSpanByFileName(filename: string) {
        const needle = utils.xpathString(filename.toLowerCase());
        return $(`(//tr[@role='row']//span[contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), ${needle})])[1]`);
    }

    private async uploadFileInAddDocumentDialog(absoluteFilePath: string): Promise<void> {
        await this.addDocumentFileInput.waitForExist({ timeout: 15000 });
        const remoteFilePath = await browser.uploadFile(absoluteFilePath);
        await this.addDocumentFileInput.setValue(remoteFilePath);
    }

    private async dismissWarningIfPresent(): Promise<boolean> {
        const okBtn = $("//div[contains(@role,'dialog')]//button[.//bdi[normalize-space()='OK'] or .//text()[normalize-space()='OK']]");
        const closeBtn = $("//div[contains(@role,'dialog')]//button[.//bdi[normalize-space()='Close'] or .//text()[normalize-space()='Close']]");
        const appeared = await browser.waitUntil(async () => {
            return (await okBtn.isDisplayed().catch(() => false))
                || (await closeBtn.isDisplayed().catch(() => false));
        }, { timeout: 6000, interval: 300 }).then(() => true).catch(() => false);
        if (!appeared) return false;
        if (await okBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(okBtn);
            console.log("Dismissed warning dialog via OK.");
        } else if (await closeBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(closeBtn);
            console.log("Dismissed warning dialog via Close.");
        }
        await utils.waitForBusyIndicatorToDisappear();
        return true;
    }

    public async addAttachmentsAndVerify(): Promise<void> {
        console.log("Clicking 'Attachments' tab...");
        await this.attachmentsTab.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.attachmentsTab);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        console.log("Clicking 'Add' dropdown button on Attachments toolbar...");
        await utils.clickWithWait(this.attachmentsAddBtn);
        await browser.pause(800);

        console.log("Selecting 'Add Document' menu item...");
        await utils.clickWithWait(this.addDocumentMenuItem);
        await this.addDocumentDialog.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();

        const testDataDir = path.join(process.cwd(), "test_data", "btp_applications", "integrity", "asset_inspection_attachments");
        const oversizedFile = path.join(testDataDir, "60mb.png");
        const validFile = path.join(testDataDir, "Storagetank.png");

        // Attempt to upload the oversized 60MB file — UI should reject it.
        console.log("Attempting to upload '60mb.png' (expected: rejected by 50MB limit)...");
        try {
            await this.uploadFileInAddDocumentDialog(oversizedFile);
            await browser.pause(1500);
        } catch (e) {
            console.log(`'60mb.png' upload threw at file-input level: ${(e as Error).message}`);
        }
        await this.dismissWarningIfPresent();

        // Upload the valid file.
        console.log("Uploading 'Storagetank.png'...");
        await this.uploadFileInAddDocumentDialog(validFile);
        await browser.pause(1000);

        console.log("Filling 'Short Description'...");
        await utils.setValueWithWait(this.addDocumentShortDescInput, "Storage Tank Attachment");

        console.log("Clicking dialog 'Save'...");
        await utils.clickWithWait(this.addDocumentSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling success popup OK...");
        await utils.clickSuccessOkButton();
        await browser.pause(1500);

        console.log("Verifying attachments list...");
        const storageRow = this.attachmentRowSpanByFileName("storagetank");
        if (!(await storageRow.isExisting().catch(() => false))) {
            throw new Error("'storagetank.png' was not found in the Attachments list after upload.");
        }
        console.log("'storagetank.png' verified in Attachments list.");

        const oversizedRow = this.attachmentRowSpanByFileName("60mb");
        if (await oversizedRow.isExisting().catch(() => false)) {
            throw new Error("'60mb.png' should NOT have been uploaded (exceeds 50MB) but appears in the Attachments list.");
        }
        console.log("'60mb.png' confirmed NOT in Attachments list (correctly rejected by 50MB limit).");
    }

    public async assignDocumentAndVerify(documentName: string = "header.png"): Promise<void> {
        console.log("Clicking 'Attachments' tab (in case we're not already there)...");
        await this.attachmentsTab.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.attachmentsTab);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        console.log("Clicking 'Assign' button on Attachments toolbar...");
        await this.attachmentsAssignBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.attachmentsAssignBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1200);

        // Find the document row (by filename) inside the Assign dialog and click its row checkbox.
        const nameStr = utils.xpathString(documentName);
        const lowerName = utils.xpathString(documentName.toLowerCase());
        const dialogXp =
            `//div[@role='dialog' and not(@aria-hidden='true')` +
            ` and (.//h1[contains(normalize-space(.),'Assign')]` +
            ` or .//span[contains(normalize-space(.),'Assign')])]`;
        const rowXp =
            `${dialogXp}//tr[@role='row']` +
            `[.//*[contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), ${lowerName})]]`;
        const docRow = $(`(${rowXp})[1]`);

        console.log(`Looking for '${documentName}' row in Assign dialog...`);
        await docRow.waitForExist({ timeout: 20000 });
        await docRow.scrollIntoView({ block: "center" });
        const rowCheckbox = docRow.$(".//div[@role='checkbox']");
        await utils.clickWithWait(rowCheckbox);
        await browser.pause(300);
        console.log(`Selected '${documentName}' in Assign dialog.`);

        // Click the footer 'Assign' button (inside the dialog).
        const dialogAssignBtn = $(`${dialogXp}//footer//button[.//bdi[normalize-space()='Assign'] or .//text()[normalize-space()='Assign']]`);
        await dialogAssignBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(dialogAssignBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling success popup OK...");
        await utils.clickSuccessOkButton();
        await browser.pause(1500);

        console.log(`Verifying '${documentName}' appears in Attachments list...`);
        const assignedRow = this.attachmentRowSpanByFileName(documentName.replace(/\.[^.]+$/, ""));
        if (!(await assignedRow.isExisting().catch(() => false))) {
            throw new Error(`'${documentName}' was not found in the Attachments list after assignment.`);
        }
        console.log(`'${documentName}' verified in Attachments list. (name token search: '${nameStr}')`);
    }

    public async intelliEditAttachmentAndAttachFinding(fileNameToken: string = "storagetank"): Promise<void> {
        const tokenStr = utils.xpathString(fileNameToken.toLowerCase());

        console.log(`Clicking 'IntelliEdit' on attachment row whose file name contains '${fileNameToken}'...`);
        const intelliEditBtn = $(
            `(//tr[@role='row']` +
            `[.//*[contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), ${tokenStr})]]` +
            `//button[.//bdi[normalize-space()='IntelliEdit']])[1]`
        );
        await intelliEditBtn.waitForDisplayed({ timeout: 30000 });
        await intelliEditBtn.scrollIntoView({ block: "center" });
        await utils.clickWithWait(intelliEditBtn);
        await utils.waitForBusyIndicatorToDisappear();

        // IntelliEdit popup
        const intelliEditDialogXp =
            `//div[@role='dialog' and not(@aria-hidden='true')]` +
            `[.//*[self::h1 or self::span][contains(normalize-space(.),'IntelliEdit')]]`;
        const intelliEditDialog = $(intelliEditDialogXp);
        await intelliEditDialog.waitForDisplayed({ timeout: 30000 });
        await browser.pause(800);
        console.log("'IntelliEdit' popup opened.");

        console.log("Clicking 'Attach Finding' inside IntelliEdit popup...");
        const attachFindingBtn = $(`${intelliEditDialogXp}//button[.//bdi[normalize-space()='Attach Finding'] or .//*[normalize-space()='Attach Finding']]`);
        await attachFindingBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(attachFindingBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(800);

        // Select Finding popup
        const selectFindingDialogXp =
            `//div[@role='dialog' and not(@aria-hidden='true')]` +
            `[.//*[self::h1 or self::span][contains(normalize-space(.),'Select Finding')]]`;
        const selectFindingDialog = $(selectFindingDialogXp);
        await selectFindingDialog.waitForDisplayed({ timeout: 30000 });
        console.log("'Select Finding' popup opened.");

        console.log("Clicking first listed finding...");
        const firstFindingRow = $(`(${selectFindingDialogXp}//li[contains(@class,'sapMLIB') and .//a[contains(@class,'sapMLnk')]])[1]`);
        await firstFindingRow.waitForDisplayed({ timeout: 15000 });
        await firstFindingRow.scrollIntoView({ block: "center" });
        const firstFindingClickTarget = firstFindingRow.$(".//span[contains(@class,'sapMText') and string-length(normalize-space(.)) > 0][1]");
        if (await firstFindingClickTarget.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(firstFindingClickTarget);
        } else {
            await utils.clickWithWait(firstFindingRow);
        }
        await browser.pause(500);

        console.log("Clicking 'Continue' on Select Finding popup...");
        const continueBtn = $(`${selectFindingDialogXp}//footer//button[.//bdi[normalize-space()='Continue']] | ${selectFindingDialogXp}//button[.//bdi[normalize-space()='Continue']]`);
        await continueBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(continueBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        // Back in IntelliEdit popup — click Save.
        console.log("Clicking 'Save' on IntelliEdit popup...");
        const intelliEditSaveBtn = $(`${intelliEditDialogXp}//button[.//bdi[normalize-space()='Save'] or .//text()[normalize-space()='Save']]`);
        await intelliEditSaveBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(intelliEditSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();

        // Confirmation dialog: "Save edited image with markups?" — click OK.
        console.log("Waiting for 'Save edited image with markups?' confirmation and clicking OK...");
        await browser.waitUntil(async () => {
            return (await this.confirmOkBtn.isDisplayed().catch(() => false));
        }, { timeout: 10000, interval: 300, timeoutMsg: "" }).catch(() => { /* no confirmation appeared */ });
        if (await this.confirmOkBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.confirmOkBtn);
            await utils.waitForBusyIndicatorToDisappear();
            console.log("Confirmation 'OK' clicked.");
        } else {
            console.log("No confirmation dialog appeared after Save.");
        }

        // If a Success popup also shows up after confirmation, dismiss it too.
        await utils.clickSuccessOkButton();
        await browser.pause(1500);

        // The IntelliEdit save may auto-open a sap.m.LightBox previewing the saved image. Dismiss it.
        await this.dismissAnyOpenLightbox();

        console.log("IntelliEdit + Attach Finding flow complete.");
    }

    private async dismissAnyOpenLightbox(): Promise<void> {
        const lightboxCloseBtn = $(
            "//div[contains(@class,'sapMLightBox') and not(contains(@style,'display: none'))]" +
            "//button[contains(@class,'sapMLightBoxCloseButton') or @aria-label='Close']"
        );
        for (let i = 0; i < 3; i++) {
            if (!(await lightboxCloseBtn.isDisplayed().catch(() => false))) return;
            try {
                console.log("Open LightBox detected — clicking its Close (X) button to dismiss.");
                await utils.clickWithWait(lightboxCloseBtn);
                await browser.pause(500);
            } catch {
                // Fallback: press Escape
                try { await browser.keys("Escape"); } catch { /* ignore */ }
                await browser.pause(500);
            }
        }
    }

    private findingDialogInputByLabel(label: string) {
        const labelXp = utils.xpathString(label);
        return $(`//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][contains(normalize-space(.),'Create Finding')]]//label[.//bdi[normalize-space()=${labelXp}]]/following::input[1]`);
    }

    private findingDialogTextareaByLabel(label: string) {
        const labelXp = utils.xpathString(label);
        return $(`//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][contains(normalize-space(.),'Create Finding')]]//label[.//bdi[normalize-space()=${labelXp}]]/following::textarea[1]`);
    }

    public async createFindingAndVerify(): Promise<void> {
        console.log("Clicking 'Findings And Observation' tab...");
        // If the tab is off-screen inside the anchor bar, SAP UI5 may hide it — try scrolling the
        // anchor bar into view first, and if the tab still isn't found, click the overflow chevron.
        const anchorBar = $("//div[contains(@class,'sapUxAPAnchorBar')]");
        if (await anchorBar.isExisting().catch(() => false)) {
            try { await anchorBar.scrollIntoView({ block: "center" }); } catch { /* best-effort */ }
            await browser.pause(500);
        }
        if (!(await this.findingsTab.isDisplayed().catch(() => false))) {
            const overflowChevron = $("//div[contains(@class,'sapUxAPAnchorBar')]//button[contains(@class,'sapUxAPAnchorBarScrollFinal') or contains(@id,'-arrowRight') or @aria-haspopup='menu']");
            if (await overflowChevron.isExisting().catch(() => false)) {
                try {
                    await utils.clickWithWait(overflowChevron);
                    await browser.pause(500);
                } catch { /* best-effort */ }
            }
        }
        try {
            await this.findingsTab.waitForDisplayed({ timeout: 30000 });
        } catch (e) {
            // Dump all visible tab labels so we can immediately see what the tab is actually called.
            const labels = await $$("//div[contains(@class,'sapUxAPAnchorBar')]//bdi | //div[contains(@class,'sapUxAPAnchorBar')]//button//bdi | //li[@role='menuitem']//bdi")
                .map(el => el.getText().catch(() => ""));
            throw new Error(`'Findings' tab not visible. Visible tab labels in anchor bar / overflow menu: [${labels.filter(x => x && x.trim()).map(x => `"${x.trim()}"`).join(", ")}]. Original error: ${(e as Error).message}`);
        }
        await utils.clickWithWait(this.findingsTab);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        console.log("Clicking 'New' (Create Findings) button...");
        await this.findingsNewBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.findingsNewBtn);
        await this.createFindingDialog.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(800);

        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const findingName = `Automation Finding ${randomNum}`;
        const findingNumber = `FND-AUTO-${randomNum}`;
        const dateRecorded = utils.formatDate(0);
        const dateApproved = utils.formatDatePlus(15);
        this.capturedFindingNumber = findingNumber;

        console.log(`Filling Finding Name = '${findingName}'...`);
        await utils.setValueWithWait(this.findingDialogInputByLabel("Finding Name"), findingName);

        console.log(`Filling Finding Number = '${findingNumber}'...`);
        await utils.setValueWithWait(this.findingDialogInputByLabel("Finding Number"), findingNumber);

        console.log(`Filling Date Recorded = '${dateRecorded}'...`);
        await utils.setValueWithWait(this.findingDialogInputByLabel("Date Recorded"), dateRecorded);

        console.log(`Filling Date Approved (if Approved) = '${dateApproved}'...`);
        await utils.setValueWithWait(this.findingDialogInputByLabel("Date Approved (if Approved)"), dateApproved);

        console.log("Filling Finding Details...");
        await utils.setValueWithWait(this.findingDialogTextareaByLabel("Finding Details"), "Auto-generated finding details for testing.");

        // Type-into-combobox helper: focuses the input, types the value, presses Enter then Tab so UI5 commits.
        const typeIntoComboboxByLabel = async (label: string, value: string): Promise<void> => {
            const input = this.findingDialogInputByLabel(label);
            await input.waitForDisplayed({ timeout: 10000 });
            await input.scrollIntoView({ block: "center" });
            await input.click();
            try { await input.clearValue(); } catch { /* readonly combobox tolerance */ }
            await browser.pause(200);
            await browser.keys(value.split(""));
            await browser.pause(400);
            await browser.keys("Enter");
            await browser.pause(200);
            await browser.keys("Tab");
            await browser.pause(200);
            console.log(`'${label}' typed = '${value}'.`);
        };

        await typeIntoComboboxByLabel("Assign Finding to", "qa automation");
        await typeIntoComboboxByLabel("Damage Class", "As new condition");
        await typeIntoComboboxByLabel("Damage Type", "Part missing");
        await typeIntoComboboxByLabel("Environment Classification", "C1");

        console.log("Filling Quantified Remaining Thickness = '0.00'...");
        await utils.setValueWithWait(this.findingDialogInputByLabel("Quantified Remaining Thickness"), "0.00");

        await typeIntoComboboxByLabel("Checklist Items", "Component Checklist_Component Checklist");
        await typeIntoComboboxByLabel("Supplemental Data", "Pipe Support Type-Spring Can");

        console.log("Opening Equipment value help and selecting '10000080'...");
        await utils.clickWithWait(this.findingEquipmentValueHelpBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        // Scope everything to the 'Select Equipment' dialog so we can't accidentally hit elements in the underlying Create Finding dialog.
        const selectEquipmentDialogXp =
            `//div[@role='dialog' and not(@aria-hidden='true')]` +
            `[.//*[self::h1 or self::span][contains(normalize-space(.),'Select Equipment')]]`;
        const vhDialog = $(selectEquipmentDialogXp);
        await vhDialog.waitForDisplayed({ timeout: 20000 });

        const vhSearchInput = $(`${selectEquipmentDialogXp}//input[@type='search' or @aria-label='Search']`);
        await vhSearchInput.waitForDisplayed({ timeout: 15000 });

        // Type the equipment ID via keystrokes so the SAP SearchField fires its live-search listeners.
        await vhSearchInput.click();
        try { await vhSearchInput.clearValue(); } catch { /* ignore */ }
        await browser.pause(200);
        await browser.keys("10000080".split(""));
        await browser.pause(400);
        const typedInSearch = ((await vhSearchInput.getAttribute("value")) || "").trim();
        console.log(`Select Equipment search input now contains: '${typedInSearch}'.`);

        // Trigger search: prefer the dialog's Search/Go button or the SearchField's magnifier icon, fallback to Enter.
        const vhGoBtn = $(`${selectEquipmentDialogXp}//button[.//bdi[normalize-space()='Go'] or .//text()[normalize-space()='Go']]`);
        const vhSearchIcon = $(`${selectEquipmentDialogXp}//div[contains(@class,'sapMSFS')]`);
        if (await vhGoBtn.isDisplayed().catch(() => false)) {
            console.log("Clicking dialog 'Go' button to trigger search.");
            await utils.clickWithWait(vhGoBtn);
        } else if (await vhSearchIcon.isDisplayed().catch(() => false)) {
            console.log("Clicking SearchField magnifier icon to trigger search.");
            await utils.clickWithWait(vhSearchIcon);
        } else {
            console.log("No Go/Search button visible — pressing Enter on the search input.");
            await vhSearchInput.click();
            await browser.keys("Enter");
        }
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.pause(2000);

        // Click the row inside the Select Equipment dialog whose content matches '10000080'.
        // Use a broader row matcher (tr OR li OR role=row/listitem) for SAP variants that render results in different element types.
        const vhRow = $(`(${selectEquipmentDialogXp}//*[(self::tr or self::li or @role='row' or @role='listitem')][.//*[contains(normalize-space(.),'10000080')]])[1]`);
        await vhRow.waitForDisplayed({ timeout: 30000 });
        await vhRow.scrollIntoView({ block: "center" });
        await utils.clickWithWait(vhRow);
        await browser.pause(400);
        // Some SAP TableSelectDialog variants need Enter to confirm row selection.
        await browser.keys("Enter");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(800);

        // Verify the Equipment field in the Create Finding dialog has been populated. If not, retry via JS click and Enter.
        const equipmentInput = this.findingDialogInputByLabel("Equipment");
        const checkEquipmentFilled = async (): Promise<boolean> => {
            const val = ((await equipmentInput.getAttribute("value").catch(() => "")) || "").trim();
            return val.length > 0;
        };
        if (!(await checkEquipmentFilled())) {
            console.log("Equipment field empty after row click — retrying with JS click on row.");
            try {
                await browser.execute((el: any) => el && el.click && el.click(), vhRow);
            } catch { /* ignore */ }
            await browser.pause(400);
            await browser.keys("Enter");
            await browser.pause(800);
            await utils.waitForBusyIndicatorToDisappear();
        }
        if (!(await checkEquipmentFilled())) {
            console.log("Equipment field still empty — retrying click on row's identifier cell.");
            const vhRowFirstDataCell = $(`(${selectEquipmentDialogXp}//tr[@role='row'][.//*[contains(normalize-space(.),'10000080')]]//td[normalize-space(.)!=''])[1]`);
            if (await vhRowFirstDataCell.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(vhRowFirstDataCell);
                await browser.pause(400);
                await browser.keys("Enter");
                await browser.pause(800);
                await utils.waitForBusyIndicatorToDisappear();
            }
        }
        if (!(await checkEquipmentFilled())) {
            throw new Error("Equipment value-help did not populate the Equipment field after multiple attempts.");
        }
        console.log("Equipment selected successfully.");

        // Equipment field is populated, but in this dialog variant the Select Equipment overlay stays open and blocks
        // subsequent clicks. Dismiss it via the Close button so the Create Finding dialog becomes interactive again.
        const vhCloseBtn = $(`${selectEquipmentDialogXp}//button[.//bdi[normalize-space()='Close'] or .//text()[normalize-space()='Close']]`);
        if (await vhCloseBtn.isDisplayed().catch(() => false)) {
            console.log("Closing the Select Equipment overlay (equipment is already selected in the underlying field).");
            await utils.clickWithWait(vhCloseBtn);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(500);
        }

        // Re-confirm the equipment value survived the dialog close.
        if (!(await checkEquipmentFilled())) {
            throw new Error("Equipment field was cleared after closing the Select Equipment dialog.");
        }

        // Attach a document to the finding via the in-dialog 'Add Document' flow.
        console.log("Clicking 'Add Document' button inside Create Finding dialog...");
        const findingAddDocumentBtn = $(
            `//div[@role='dialog' and not(@aria-hidden='true')]` +
            `[.//*[self::h1 or self::span][contains(normalize-space(.),'Create Finding')]]` +
            `//button[.//bdi[normalize-space()='Add Document']]`
        );
        await findingAddDocumentBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(findingAddDocumentBtn);
        await this.addDocumentDialog.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(800);

        console.log("Uploading 'Storagetank.png' into the finding's Add Document dialog...");
        const findingDocFile = path.join(
            process.cwd(), "test_data", "btp_applications", "integrity", "asset_inspection_attachments", "Storagetank.png"
        );
        await this.uploadFileInAddDocumentDialog(findingDocFile);
        await browser.pause(1000);

        console.log("Filling Short Description in Add Document dialog...");
        await utils.setValueWithWait(this.addDocumentShortDescInput, "Finding Storage Tank Attachment");

        console.log("Clicking 'Save' on Add Document dialog...");
        await utils.clickWithWait(this.addDocumentSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        console.log("Clicking dialog 'Create' button...");
        await this.createFindingCreateBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(this.createFindingCreateBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        // The Create Finding dialog can spin on a local busy indicator for a while after Create is clicked.
        // Wait explicitly for the dialog to close before continuing.
        try {
            await this.createFindingDialog.waitForDisplayed({ timeout: 60000, reverse: true });
        } catch (e) {
            console.log(`Create Finding dialog did not close within 60s: ${(e as Error).message}`);
        }
        await browser.pause(1000);

        console.log("Handling success popup OK...");
        await utils.clickSuccessOkButton();
        await browser.pause(1500);

        console.log(`Verifying finding '${findingNumber}' / '${findingName}' appears in Findings list...`);
        const numStr = utils.xpathString(findingNumber);
        const nameStr = utils.xpathString(findingName);
        const xp =
            `//tr[@role='row']//*[contains(normalize-space(.), ${numStr}) or contains(normalize-space(.), ${nameStr})]`;
        const row = $(`(${xp})[1]`);
        try {
            await row.waitForExist({ timeout: 20000 });
        } catch {
            throw new Error(`Finding '${findingNumber}' / '${findingName}' was not found in Findings list after creation.`);
        }
        console.log(`Finding '${findingNumber}' verified in Findings list.`);
    }

    private apmDialogInputByLabel(label: string) {
        const labelXp = utils.xpathString(label);
        return $(`//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][contains(normalize-space(.),'Create APM Recommendation')]]//label[.//bdi[normalize-space()=${labelXp}]]/following::input[1]`);
    }

    private apmDialogTextareaByLabel(label: string) {
        const labelXp = utils.xpathString(label);
        return $(`//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][contains(normalize-space(.),'Create APM Recommendation')]]//label[.//bdi[normalize-space()=${labelXp}]]/following::textarea[1]`);
    }

    private apmDialogComponentValueHelpBtn() {
        return $(`//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][contains(normalize-space(.),'Create APM Recommendation')]]//label[.//bdi[normalize-space()='Component']]/following::span[@role='button' and @aria-label='Show Value Help'][1]`);
    }

    public async createApmRecommendationFromFinding(): Promise<void> {
        // 1. Select the first finding via its radio button (sapMRb / selectSingle).
        console.log("Selecting first finding via its radio button...");
        const findingRadio = $("(//tr[@role='row']//div[contains(@class,'sapMRb') and (@role='radio' or .//svg[@class='sapMRbSvg'])])[1]");
        await findingRadio.waitForDisplayed({ timeout: 15000 });
        await findingRadio.scrollIntoView({ block: "center" });
        await utils.clickWithWait(findingRadio);
        await browser.pause(500);

        // 2. Click the Create dropdown.
        console.log("Clicking 'Create' dropdown button on Findings toolbar...");
        const createDropdown = $("//div[contains(@class,'sapMMenuBtn')]//button[.//bdi[normalize-space()='Create']]");
        await createDropdown.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(createDropdown);
        await browser.pause(800);

        // 3. Select APM Recommendation from the menu.
        console.log("Selecting 'APM Recommendation' from Create menu...");
        const apmMenuItem = $("//li[@role='menuitem'][.//*[normalize-space()='APM Recommendation']]");
        await apmMenuItem.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(apmMenuItem);
        await utils.waitForBusyIndicatorToDisappear();

        // 4. Wait for the Create APM Recommendation dialog.
        const apmDialogXp =
            `//div[@role='dialog' and not(@aria-hidden='true')]` +
            `[.//*[self::h1 or self::span][contains(normalize-space(.),'Create APM Recommendation')]]`;
        const apmDialog = $(apmDialogXp);
        await apmDialog.waitForDisplayed({ timeout: 30000 });
        console.log("'Create APM Recommendation' dialog opened.");

        // 5. Capture inspection URL so we can return after RWB verification.
        const inspectionUrl = await browser.getUrl();

        // 6. Build unique short description so we can search it in RWB later.
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const shortDesc = `Auto APM Reco ${randomNum}`;
        const longDesc = `Auto APM Reco Long Description ${randomNum}`;
        const startDate = utils.formatDatePlus(1);
        const dueDate = utils.formatDatePlus(2);

        // 7. Component (value-help) -> 'Piping'
        console.log("Opening Component value help and selecting 'Piping'...");
        await utils.clickWithWait(this.apmDialogComponentValueHelpBtn());
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        const componentDialogXp = `//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][contains(normalize-space(.),'Component')]]`;
        const componentRow = $(`(${componentDialogXp}//tr[@role='row'][.//*[contains(normalize-space(.),'Piping')]])[1]`);
        try {
            await componentRow.waitForDisplayed({ timeout: 15000 });
            await utils.clickWithWait(componentRow);
            await browser.pause(400);
            await browser.keys("Enter");
            await browser.pause(600);
            const compCloseBtn = $(`${componentDialogXp}//button[.//bdi[normalize-space()='Close']]`);
            if (await compCloseBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(compCloseBtn);
            }
            await utils.waitForBusyIndicatorToDisappear();
        } catch {
            console.log("Component 'Piping' row not found in value help — leaving component empty.");
        }

        // 8. Fill required fields.
        const typeIntoDialogCombobox = async (label: string, value: string): Promise<void> => {
            const input = this.apmDialogInputByLabel(label);
            await input.waitForDisplayed({ timeout: 10000 });
            await input.scrollIntoView({ block: "center" });
            await input.click();
            try { await input.clearValue(); } catch { /* tolerate */ }
            await browser.pause(150);
            await browser.keys(value.split(""));
            await browser.pause(300);
            await browser.keys("Enter");
            await browser.pause(150);
            await browser.keys("Tab");
            await browser.pause(150);
            console.log(`APM '${label}' typed = '${value}'.`);
        };

        console.log(`Filling Short Description = '${shortDesc}'...`);
        await utils.setValueWithWait(this.apmDialogInputByLabel("Short Description"), shortDesc);

        console.log(`Filling Long Description...`);
        await utils.setValueWithWait(this.apmDialogTextareaByLabel("Long Description"), longDesc);

        await typeIntoDialogCombobox("Type", "Improvement");
        await utils.setValueWithWait(this.apmDialogInputByLabel("Start Date"), startDate);
        await utils.setValueWithWait(this.apmDialogInputByLabel("Due Date"), dueDate);
        await typeIntoDialogCombobox("Inspection Type", "Thickness Monitoring");
        await typeIntoDialogCombobox("Inspection Stage", "Ready for Inspection");
        await typeIntoDialogCombobox("Inspection Template", "Visual Inspection and UT Thickness Template");

        // 9. Click Create.
        console.log("Clicking 'Create' on Create APM Recommendation dialog...");
        const apmCreateBtn = $(
            `${apmDialogXp}//button[not(@disabled)][.//bdi[normalize-space()='Create'] or .//span[normalize-space()='Create']]`
        );
        await apmCreateBtn.waitForDisplayed({ timeout: 15000 });
        await apmCreateBtn.waitForClickable({ timeout: 15000 });
        await utils.clickWithWait(apmCreateBtn);
        await utils.waitForBusyIndicatorToDisappear();

        // 10. Dismiss success popup.
        console.log("Handling success popup OK...");
        await utils.clickSuccessOkButton();
        await browser.pause(1500);

        // 11. Navigate to Recommendation Workbench listview, search for the short description, verify, then return.
        const rwbUrl =
            "https://apm-02-asint.launchpad.cfapps.us10.hana.ondemand.com/site?siteId=1ecd90c7-56f7-4915-a267-2d1c7ca1ba94" +
            "#recommendationworkbenchplus-manage?sap-ui-app-id-hint=saas_approuter_com.asint.ais.mi.recommendation_workbench_plus";
        console.log("Navigating to Recommendation Workbench listview...");
        await browser.switchFrame(null);
        await browser.url(rwbUrl);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);

        try {
            const rwbIframe = $("iframe[data-help-id='application-recommendationworkbenchplus-manage']");
            await utils.switchToIframe(rwbIframe);
        } catch (e) {
            console.log(`Could not switch into RWB iframe: ${(e as Error).message}`);
        }

        console.log(`Searching for recommendation '${shortDesc}' in RWB listview...`);
        const rwbSearchInput = $("(//form//input[@type='search'])[1]");
        await rwbSearchInput.waitForDisplayed({ timeout: 30000 });
        await utils.setValueWithWait(rwbSearchInput, shortDesc);
        const rwbGoBtn = $("//button[.//bdi[normalize-space()='Go'] or .//text()[normalize-space()='Go']]");
        if (await rwbGoBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(rwbGoBtn);
        } else {
            await browser.keys("Enter");
        }
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.pause(2500);

        const rwbResultRow = $(`(//tr[@role='row']//*[contains(normalize-space(.), ${utils.xpathString(shortDesc)})])[1]`);
        const found = await rwbResultRow.isExisting().catch(() => false);
        if (!found) {
            throw new Error(`Recommendation '${shortDesc}' was not found in the Recommendation Workbench listview.`);
        }
        console.log(`Recommendation '${shortDesc}' verified in RWB listview.`);

        // 12. Return to inspection detail page.
        console.log("Navigating back to inspection detail page (Findings section)...");
        await browser.switchFrame(null);
        await browser.url(inspectionUrl);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        // Re-enter the inspection app's iframe so subsequent steps (if any) keep working.
        try {
            const inspIframe = $('iframe[data-help-id="application-idms-manage"]');
            await utils.switchToIframe(inspIframe);
        } catch (e) {
            console.log(`Could not switch back into inspection iframe: ${(e as Error).message}`);
        }
        // Activate Findings tab if not already.
        if (await this.findingsTab.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.findingsTab);
            await utils.waitForBusyIndicatorToDisappear();
        }
        console.log("APM Recommendation creation and RWB verification complete.");
    }

    private notificationDialogInputByLabel(label: string) {
        const labelXp = utils.xpathString(label);
        return $(`//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][contains(normalize-space(.),'Create Notification')]]//label[.//bdi[normalize-space()=${labelXp}]]/following::input[1]`);
    }

    private notificationDialogTextareaByLabel(label: string) {
        const labelXp = utils.xpathString(label);
        return $(`//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][contains(normalize-space(.),'Create Notification')]]//label[.//bdi[normalize-space()=${labelXp}]]/following::textarea[1]`);
    }

    public async createMaintenanceNotificationAndVerify(): Promise<void> {
        // Capture inspection URL up-front so we can return after the create flow
        // (creating a Notification navigates the page to the new Notification's detail).
        const inspectionUrl = await browser.getUrl();

        console.log("Clicking 'Maintenance and Service' tab...");
        await this.maintenanceServiceTab.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.maintenanceServiceTab);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        console.log("Clicking 'New' button in Maintenance Notifications section...");
        await this.maintenanceNotificationsNewBtn.waitForDisplayed({ timeout: 30000 });
        await this.maintenanceNotificationsNewBtn.scrollIntoView({ block: "center" });
        await utils.clickWithWait(this.maintenanceNotificationsNewBtn);
        await this.createNotificationDialog.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(800);
        console.log("'Create Notification' dialog opened.");

        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const shortDesc = `Auto Notif ${randomNum}`;
        this.capturedNotificationShortDesc = shortDesc;
        const longDesc = `Automation notification long description ${randomNum}.`;
        const startDate = utils.formatDatePlus(2);
        const endDate = utils.formatDatePlus(3);

        // Helper: type into a combobox/input and commit via Enter+Tab so UI5 resolves the value.
        const typeInDialog = async (label: string, value: string): Promise<void> => {
            const input = this.notificationDialogInputByLabel(label);
            await input.waitForDisplayed({ timeout: 10000 });
            await input.scrollIntoView({ block: "center" });
            await input.click();
            try { await input.clearValue(); } catch { /* readonly-style combobox tolerance */ }
            await browser.pause(150);
            await browser.keys(value.split(""));
            await browser.pause(300);
            await browser.keys("Enter");
            await browser.pause(150);
            await browser.keys("Tab");
            await browser.pause(150);
            console.log(`Notification '${label}' typed = '${value}'.`);
        };

        await typeInDialog("Section", "Component Checklist");
        await typeInDialog("Sub Section", "Component Checklist");

        console.log(`Filling Short Description = '${shortDesc}'...`);
        await utils.setValueWithWait(this.notificationDialogInputByLabel("Short Description"), shortDesc);

        console.log("Filling Long Description...");
        await utils.setValueWithWait(this.notificationDialogTextareaByLabel("Long Description"), longDesc);

        await typeInDialog("Type", "Maintenance Request");
        await typeInDialog("Priority", "Low");

        console.log(`Filling Start Date = '${startDate}'...`);
        await utils.setValueWithWait(this.notificationDialogInputByLabel("Start Date"), startDate);

        console.log(`Filling End Date = '${endDate}'...`);
        await utils.setValueWithWait(this.notificationDialogInputByLabel("End Date"), endDate);

        console.log("Toggling Breakdown switch ON...");
        if (await this.createNotificationBreakdownSwitch.isDisplayed().catch(() => false)) {
            const checked = (await this.createNotificationBreakdownSwitch.getAttribute("aria-checked").catch(() => "")) === "true";
            if (!checked) {
                await utils.clickWithWait(this.createNotificationBreakdownSwitch);
                console.log("Breakdown switch toggled ON.");
            } else {
                console.log("Breakdown switch already ON.");
            }
        }

        console.log("Clicking 'Create' on Create Notification dialog...");
        await this.createNotificationCreateBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(this.createNotificationCreateBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling success popup OK...");
        await utils.clickSuccessOkButton();
        await browser.pause(1500);

        // Creating a Notification navigates the app to the new Notification detail page
        // (e.g. PMNO.<n>). Navigate back to the inspection detail URL captured earlier.
        console.log("Navigating back to inspection detail page after Notification creation...");
        await browser.switchFrame(null);
        await browser.url(inspectionUrl);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        try {
            const inspIframe = $('iframe[data-help-id="application-idms-manage"]');
            await utils.switchToIframe(inspIframe);
        } catch (e) {
            console.log(`Could not switch back into inspection iframe: ${(e as Error).message}`);
        }
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        // Re-activate the Maintenance and Service tab to verify the new row.
        if (await this.maintenanceServiceTab.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.maintenanceServiceTab);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1500);
        }

        // Verify the notification appears in the Maintenance Notifications listview.
        console.log(`Verifying notification '${shortDesc}' appears in Maintenance Notifications list...`);

        // Scroll the Maintenance Notifications section into view so its table renders rows.
        const maintNotifSectionTitle = $("//*[normalize-space(.)='Maintenance Notifications' or starts-with(normalize-space(.),'Maintenance Notifications ')]");
        if (await maintNotifSectionTitle.isExisting().catch(() => false)) {
            try { await maintNotifSectionTitle.scrollIntoView({ block: "center" }); } catch { /* best-effort */ }
            await browser.pause(800);
        }

        // Optional: try to filter via the section's search input if present.
        if (await this.maintenanceNotificationsSearchInput.isDisplayed().catch(() => false)) {
            console.log(`Filtering Maintenance Notifications list with '${shortDesc}'...`);
            await utils.setValueWithWait(this.maintenanceNotificationsSearchInput, shortDesc);
            await utils.waitForBusyIndicatorToDisappear();
            await utils.waitForLocalBusyToDisappear();
            await browser.pause(1500);
        } else {
            console.log("Maintenance Notifications search input not displayed; verifying directly in table.");
        }

        // Scope the row search to the table that immediately follows the 'Maintenance Notifications' section
        // title so unrelated tables on the page (e.g. Maintenance Plans/Orders/Tasks) cannot satisfy the match.
        const shortDescXp = utils.xpathString(shortDesc);
        const scopedRowXp = `(//*[normalize-space(.)='Maintenance Notifications' or starts-with(normalize-space(.),'Maintenance Notifications ')]/following::table[1]//tr[@role='row'][.//*[contains(normalize-space(.), ${shortDescXp})]])[1]`;
        const notifRow = $(scopedRowXp);
        try {
            await notifRow.waitForExist({ timeout: 20000 });
        } catch {
            throw new Error(`Maintenance Notification '${shortDesc}' was not found in the Maintenance Notifications table after creation.`);
        }
        console.log(`Maintenance Notification '${shortDesc}' verified in list.`);
    }

    public async assignAndUnassignMaintenanceNotifications(): Promise<void> {
        // Ensure we're on the Maintenance and Service tab.
        if (await this.maintenanceServiceTab.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.maintenanceServiceTab);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
        }

        const maintNotifSectionTitle = $("//*[normalize-space(.)='Maintenance Notifications' or starts-with(normalize-space(.),'Maintenance Notifications ')]");
        if (await maintNotifSectionTitle.isExisting().catch(() => false)) {
            try { await maintNotifSectionTitle.scrollIntoView({ block: "center" }); } catch { /* best-effort */ }
            await browser.pause(500);
        }

        console.log("Clicking 'Assign' on Maintenance Notifications section...");
        await this.maintenanceNotificationsAssignBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.maintenanceNotificationsAssignBtn);
        await this.assignNotificationsDialog.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log("'Assign Maintenance Notifications' dialog opened.");

        // Capture PMNO ids from first 2 rows so we can verify them in the listview afterwards.
        // Exclude the header row (which also has role='row' and a 'Select All' checkbox) by requiring
        // the row to contain a 'PMNO.' identifier span.
        const dialogRowXp = "//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][starts-with(normalize-space(.),'Maintenance Notifications (')]]//tr[@role='row' and not(contains(@class,'sapMListTblHeader'))][.//*[starts-with(normalize-space(text()),'PMNO.')]]";
        await browser.waitUntil(async () => (await $$(dialogRowXp).length) >= 2,
            { timeout: 20000, interval: 500, timeoutMsg: "Less than 2 selectable rows appeared in the Assign Notifications dialog." });
        const dialogRows = await $$(dialogRowXp);

        const capturedPmnos: string[] = [];
        for (let i = 0; i < 2; i++) {
            const row = dialogRows[i];
            await row.scrollIntoView({ block: "center" }).catch(() => { /* best-effort */ });
            // Read the PMNO.<n> id from this row.
            const pmnoEl = await row.$(".//*[starts-with(normalize-space(text()),'PMNO.')]");
            let pmnoText = "";
            if (await pmnoEl.isExisting().catch(() => false)) {
                pmnoText = ((await pmnoEl.getText()) || "").trim();
            }
            if (!pmnoText.startsWith("PMNO.")) {
                throw new Error(`Could not capture PMNO id from row ${i + 1} in the Assign Notifications dialog.`);
            }
            capturedPmnos.push(pmnoText);
            console.log(`Row ${i + 1}: captured '${pmnoText}'.`);

            // The clickable visual is the inner sapMCbBg div; fall back to the role='checkbox' wrapper.
            const cbBg = await row.$(".//div[contains(@class,'sapMCbBg')]");
            const cb = (await cbBg.isExisting().catch(() => false))
                ? cbBg
                : await row.$(".//div[@role='checkbox']");
            await cb.waitForExist({ timeout: 10000 });
            await cb.scrollIntoView({ block: "center" }).catch(() => { /* best-effort */ });
            await utils.clickWithWait(cb);
            await browser.pause(400);
        }
        console.log(`Captured PMNO ids to assign: ${capturedPmnos.join(", ")}`);

        console.log("Clicking 'Select' on Assign Notifications dialog...");
        await this.assignNotificationsSelectBtn.waitForDisplayed({ timeout: 10000 });
        await utils.clickWithWait(this.assignNotificationsSelectBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling success popup OK after assignment...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        // Verify both assigned PMNOs appear in the Maintenance Notifications table.
        for (const pmno of capturedPmnos) {
            const rowXp = `(//*[normalize-space(.)='Maintenance Notifications' or starts-with(normalize-space(.),'Maintenance Notifications ')]/following::table[1]//tr[@role='row'][.//*[contains(normalize-space(.), ${utils.xpathString(pmno)})]])[1]`;
            const row = $(rowXp);
            try {
                await row.waitForExist({ timeout: 20000 });
            } catch {
                throw new Error(`Assigned Maintenance Notification '${pmno}' was not found in the Maintenance Notifications listview after assignment.`);
            }
            console.log(`Assigned notification '${pmno}' verified in listview.`);
        }

        // Unassign the first captured PMNO: check its row checkbox in the listview, then click Unassign.
        const pmnoToUnassign = capturedPmnos[0];
        console.log(`Selecting checkbox for '${pmnoToUnassign}' in Maintenance Notifications listview...`);
        const targetRowXp = `(//*[normalize-space(.)='Maintenance Notifications' or starts-with(normalize-space(.),'Maintenance Notifications ')]/following::table[1]//tr[@role='row'][.//*[contains(normalize-space(.), ${utils.xpathString(pmnoToUnassign)})]])[1]`;
        const targetRow = $(targetRowXp);
        await targetRow.waitForExist({ timeout: 15000 });
        await targetRow.scrollIntoView({ block: "center" }).catch(() => { /* best-effort */ });
        const targetCheckbox = await targetRow.$(".//div[@role='checkbox'] | .//td[contains(@class,'sapMListTblSelCol')]//div[contains(@class,'sapMCb')]");
        await targetCheckbox.waitForClickable({ timeout: 10000 });
        await utils.clickWithWait(targetCheckbox);
        await browser.pause(800);

        console.log("Clicking 'Unassign' button...");
        await this.maintenanceNotificationsUnassignBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(this.maintenanceNotificationsUnassignBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Waiting for confirmation 'Yes' on Unassign...");
        await browser.waitUntil(async () => (await this.confirmYesBtn.isDisplayed().catch(() => false)),
            { timeout: 20000, interval: 500, timeoutMsg: "Unassign confirmation 'Yes' did not appear." });
        await utils.clickWithWait(this.confirmYesBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling success popup OK after unassignment...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        // Verify the unassigned PMNO row is no longer in the table.
        const removedRow = $(targetRowXp);
        const stillThere = await removedRow.isExisting().catch(() => false);
        if (stillThere) {
            throw new Error(`Unassigned notification '${pmnoToUnassign}' is still present in the Maintenance Notifications listview.`);
        }
        console.log(`Unassigned notification '${pmnoToUnassign}' verified removed from listview.`);
    }

    public async assignAndUnassignMaintenanceOrders(): Promise<void> {
        // Ensure we're on the Maintenance and Service tab.
        if (await this.maintenanceServiceTab.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.maintenanceServiceTab);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
        }

        const ordersSectionTitle = $("//*[normalize-space(.)='Maintenance Orders' or starts-with(normalize-space(.),'Maintenance Orders ')]");
        if (await ordersSectionTitle.isExisting().catch(() => false)) {
            try { await ordersSectionTitle.scrollIntoView({ block: "center" }); } catch { /* best-effort */ }
            await browser.pause(500);
        }

        console.log("Clicking 'Assign' on Maintenance Orders section...");
        await this.maintenanceOrdersAssignBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.maintenanceOrdersAssignBtn);
        await this.assignOrdersDialog.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log("'Assign Maintenance Orders' dialog opened.");

        // Capture PMWO ids from first 2 rows so we can verify them in the listview afterwards.
        // Exclude the header row (which also has role='row' and a 'Select All' checkbox) by requiring
        // the row to contain a 'PMWO.' identifier span.
        const dialogRowXp = "//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][starts-with(normalize-space(.),'Maintenance Orders (')]]//tr[@role='row' and not(contains(@class,'sapMListTblHeader'))][.//*[starts-with(normalize-space(text()),'PMWO.')]]";
        await browser.waitUntil(async () => (await $$(dialogRowXp).length) >= 2,
            { timeout: 20000, interval: 500, timeoutMsg: "Less than 2 selectable rows appeared in the Assign Orders dialog." });
        const dialogRows = await $$(dialogRowXp);

        const capturedPmwos: string[] = [];
        for (let i = 0; i < 2; i++) {
            const row = dialogRows[i];
            await row.scrollIntoView({ block: "center" }).catch(() => { /* best-effort */ });
            const pmwoEl = await row.$(".//*[starts-with(normalize-space(text()),'PMWO.')]");
            let pmwoText = "";
            if (await pmwoEl.isExisting().catch(() => false)) {
                pmwoText = ((await pmwoEl.getText()) || "").trim();
            }
            if (!pmwoText.startsWith("PMWO.")) {
                throw new Error(`Could not capture PMWO id from row ${i + 1} in the Assign Orders dialog.`);
            }
            capturedPmwos.push(pmwoText);
            console.log(`Row ${i + 1}: captured '${pmwoText}'.`);

            const cbBg = await row.$(".//div[contains(@class,'sapMCbBg')]");
            const cb = (await cbBg.isExisting().catch(() => false))
                ? cbBg
                : await row.$(".//div[@role='checkbox']");
            await cb.waitForExist({ timeout: 10000 });
            await cb.scrollIntoView({ block: "center" }).catch(() => { /* best-effort */ });
            await utils.clickWithWait(cb);
            await browser.pause(400);
        }
        console.log(`Captured PMWO ids to assign: ${capturedPmwos.join(", ")}`);

        console.log("Clicking 'Select' on Assign Orders dialog...");
        await this.assignOrdersSelectBtn.waitForDisplayed({ timeout: 10000 });
        await utils.clickWithWait(this.assignOrdersSelectBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling success popup OK after order assignment...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        // Verify both assigned PMWOs appear in the Maintenance Orders table.
        for (const pmwo of capturedPmwos) {
            const rowXp = `(//*[normalize-space(.)='Maintenance Orders' or starts-with(normalize-space(.),'Maintenance Orders ')]/following::table[1]//tr[@role='row'][.//*[contains(normalize-space(.), ${utils.xpathString(pmwo)})]])[1]`;
            const row = $(rowXp);
            try {
                await row.waitForExist({ timeout: 20000 });
            } catch {
                throw new Error(`Assigned Maintenance Order '${pmwo}' was not found in the Maintenance Orders listview after assignment.`);
            }
            console.log(`Assigned order '${pmwo}' verified in listview.`);
        }

        // Unassign the first captured PMWO: check its row checkbox in the listview, then click Unassign.
        const pmwoToUnassign = capturedPmwos[0];
        console.log(`Selecting checkbox for '${pmwoToUnassign}' in Maintenance Orders listview...`);
        const targetRowXp = `(//*[normalize-space(.)='Maintenance Orders' or starts-with(normalize-space(.),'Maintenance Orders ')]/following::table[1]//tr[@role='row'][.//*[contains(normalize-space(.), ${utils.xpathString(pmwoToUnassign)})]])[1]`;
        const targetRow = $(targetRowXp);
        await targetRow.waitForExist({ timeout: 15000 });
        await targetRow.scrollIntoView({ block: "center" }).catch(() => { /* best-effort */ });
        const targetCheckbox = await targetRow.$(".//div[@role='checkbox'] | .//td[contains(@class,'sapMListTblSelCol')]//div[contains(@class,'sapMCb')]");
        await targetCheckbox.waitForClickable({ timeout: 10000 });
        await utils.clickWithWait(targetCheckbox);
        await browser.pause(800);

        console.log("Clicking 'Unassign' button on Maintenance Orders...");
        await this.maintenanceOrdersUnassignBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(this.maintenanceOrdersUnassignBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Waiting for confirmation 'Yes' on Unassign...");
        await browser.waitUntil(async () => (await this.confirmYesBtn.isDisplayed().catch(() => false)),
            { timeout: 20000, interval: 500, timeoutMsg: "Unassign Order confirmation 'Yes' did not appear." });
        await utils.clickWithWait(this.confirmYesBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling success popup OK after order unassignment...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        // Verify the unassigned PMWO row is no longer in the table.
        const removedRow = $(targetRowXp);
        const stillThere = await removedRow.isExisting().catch(() => false);
        if (stillThere) {
            throw new Error(`Unassigned order '${pmwoToUnassign}' is still present in the Maintenance Orders listview.`);
        }
        console.log(`Unassigned order '${pmwoToUnassign}' verified removed from listview.`);
    }

    private taskDialogInputByLabel(label: string) {
        const labelXp = utils.xpathString(label);
        return $(`//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][normalize-space(.)='Create Task']]//label[.//bdi[normalize-space()=${labelXp}]]/following::input[1]`);
    }

    private taskDialogTextareaByLabel(label: string) {
        const labelXp = utils.xpathString(label);
        return $(`//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][normalize-space(.)='Create Task']]//label[.//bdi[normalize-space()=${labelXp}]]/following::textarea[1]`);
    }

    public async createAndManageMaintenanceTasks(): Promise<void> {
        // Ensure we're on the Maintenance and Service tab.
        if (await this.maintenanceServiceTab.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.maintenanceServiceTab);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
        }

        const tasksSectionTitle = $("//*[normalize-space(.)='Maintenance Tasks' or starts-with(normalize-space(.),'Maintenance Tasks ')]");
        if (await tasksSectionTitle.isExisting().catch(() => false)) {
            try { await tasksSectionTitle.scrollIntoView({ block: "center" }); } catch { /* best-effort */ }
            await browser.pause(500);
        }

        // ==================== CREATE TASK ====================
        console.log("Clicking 'New' on Maintenance Tasks section...");
        await this.maintenanceTasksNewBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.maintenanceTasksNewBtn);
        await this.createTaskDialog.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(800);
        console.log("'Create Task' dialog opened.");

        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const taskShortDesc = `Auto Task ${randomNum}`;
        const taskLongDesc = `Automation task long description ${randomNum}.`;
        const dueDate = utils.formatDatePlus(30);

        const typeInTaskDialog = async (label: string, value: string): Promise<void> => {
            const input = this.taskDialogInputByLabel(label);
            await input.waitForDisplayed({ timeout: 10000 });
            await input.scrollIntoView({ block: "center" });
            await input.click();
            try { await input.clearValue(); } catch { /* readonly-style combobox tolerance */ }
            await browser.pause(150);
            await browser.keys(value.split(""));
            await browser.pause(300);
            await browser.keys("Enter");
            await browser.pause(150);
            await browser.keys("Tab");
            await browser.pause(150);
            console.log(`Task '${label}' typed = '${value}'.`);
        };

        console.log(`Filling Short Description = '${taskShortDesc}'...`);
        await utils.setValueWithWait(this.taskDialogInputByLabel("Short Description"), taskShortDesc);

        console.log("Filling Long Description...");
        await utils.setValueWithWait(this.taskDialogTextareaByLabel("Long Description"), taskLongDesc);

        // Priority combobox rejects typed input as 'Invalid entry' — open dropdown and click the option.
        console.log("Selecting Priority = 'Low' via dropdown arrow...");
        const priorityArrow = $("//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span][normalize-space(.)='Create Task']]//label[.//bdi[normalize-space()='Priority']]/following::span[@role='button' and contains(@aria-labelledby,'arrow-label')][1]");
        await priorityArrow.waitForDisplayed({ timeout: 10000 });
        await priorityArrow.scrollIntoView({ block: "center" }).catch(() => { /* best-effort */ });
        await utils.clickWithWait(priorityArrow);
        await browser.pause(500);
        const priorityLowOption = $("//div[contains(@class,'sapMPopover') or contains(@class,'sapMDialog')]//li[@role='option'][.//*[normalize-space(.)='4: Low'] or normalize-space(.)='4: Low']");
        await priorityLowOption.waitForDisplayed({ timeout: 10000 });
        await utils.clickWithWait(priorityLowOption);
        await browser.pause(300);
        console.log("Priority 'Low' selected.");

        console.log(`Filling Due Date = '${dueDate}'...`);
        await utils.setValueWithWait(this.taskDialogInputByLabel("Due Date"), dueDate);

        await typeInTaskDialog("Assigned To", "qa automation");

        console.log("Clicking 'Save' on Create Task dialog...");
        await this.createTaskSaveBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(this.createTaskSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling success popup OK after task creation...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        // Scroll section back into view (creating may have shifted layout).
        if (await tasksSectionTitle.isExisting().catch(() => false)) {
            try { await tasksSectionTitle.scrollIntoView({ block: "center" }); } catch { /* best-effort */ }
            await browser.pause(500);
        }

        // Verify created task appears in the Maintenance Tasks table.
        console.log(`Verifying created task '${taskShortDesc}' appears in Maintenance Tasks list...`);
        const createdRowXp = `(//*[normalize-space(.)='Maintenance Tasks' or starts-with(normalize-space(.),'Maintenance Tasks ')]/following::table[1]//tr[@role='row'][.//*[contains(normalize-space(.), ${utils.xpathString(taskShortDesc)})]])[1]`;
        try {
            await $(createdRowXp).waitForExist({ timeout: 20000 });
        } catch {
            throw new Error(`Created Maintenance Task '${taskShortDesc}' was not found in the Maintenance Tasks table after creation.`);
        }
        console.log(`Created task '${taskShortDesc}' verified in listview.`);

        // ==================== ASSIGN EXISTING TASK ====================
        console.log("Clicking 'Assign' on Maintenance Tasks section...");
        await this.maintenanceTasksAssignBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.maintenanceTasksAssignBtn);
        await this.assignTasksDialog.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log("'Assign Maintenance Tasks' dialog opened.");

        const assignDialogRowXp = "//div[@role='dialog' and not(@aria-hidden='true')][.//*[self::h1 or self::span or self::div][starts-with(normalize-space(.),'Maintenance Tasks (')]]//tr[@role='row' and not(contains(@class,'sapMListTblHeader'))][.//*[starts-with(normalize-space(text()),'TASK.')]]";
        await browser.waitUntil(async () => (await $$(assignDialogRowXp).length) >= 1,
            { timeout: 20000, interval: 500, timeoutMsg: "No selectable task rows appeared in the Assign Tasks dialog." });
        const firstDialogRow = (await $$(assignDialogRowXp))[0];
        await firstDialogRow.scrollIntoView({ block: "center" }).catch(() => { /* best-effort */ });

        // Capture the TASK.<n> id from the first row.
        const taskIdEl = await firstDialogRow.$(".//*[starts-with(normalize-space(text()),'TASK.')]");
        let assignedTaskId = "";
        if (await taskIdEl.isExisting().catch(() => false)) {
            assignedTaskId = ((await taskIdEl.getText()) || "").trim();
        }
        if (!assignedTaskId.startsWith("TASK.")) {
            throw new Error("Could not capture TASK id from first row in the Assign Tasks dialog.");
        }
        console.log(`Row 1: captured '${assignedTaskId}'.`);

        const assignCbBg = await firstDialogRow.$(".//div[contains(@class,'sapMCbBg')]");
        const assignCb = (await assignCbBg.isExisting().catch(() => false))
            ? assignCbBg
            : await firstDialogRow.$(".//div[@role='checkbox']");
        await assignCb.waitForExist({ timeout: 10000 });
        await assignCb.scrollIntoView({ block: "center" }).catch(() => { /* best-effort */ });
        await utils.clickWithWait(assignCb);
        await browser.pause(400);

        console.log("Clicking 'Select' on Assign Tasks dialog...");
        await this.assignTasksSelectBtn.waitForDisplayed({ timeout: 10000 });
        await utils.clickWithWait(this.assignTasksSelectBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling success popup OK after task assignment...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        // Verify the assigned TASK appears in the Maintenance Tasks table.
        console.log(`Verifying assigned task '${assignedTaskId}' appears in Maintenance Tasks list...`);
        const assignedRowXp = `(//*[normalize-space(.)='Maintenance Tasks' or starts-with(normalize-space(.),'Maintenance Tasks ')]/following::table[1]//tr[@role='row'][.//*[contains(normalize-space(.), ${utils.xpathString(assignedTaskId)})]])[1]`;
        try {
            await $(assignedRowXp).waitForExist({ timeout: 20000 });
        } catch {
            throw new Error(`Assigned Maintenance Task '${assignedTaskId}' was not found in the Maintenance Tasks table after assignment.`);
        }
        console.log(`Assigned task '${assignedTaskId}' verified in listview.`);

        // ==================== UNASSIGN THE ASSIGNED TASK ====================
        console.log(`Selecting checkbox for '${assignedTaskId}' in Maintenance Tasks listview...`);
        const targetRow = $(assignedRowXp);
        await targetRow.waitForExist({ timeout: 15000 });
        await targetRow.scrollIntoView({ block: "center" }).catch(() => { /* best-effort */ });
        const targetCheckbox = await targetRow.$(".//div[@role='checkbox'] | .//td[contains(@class,'sapMListTblSelCol')]//div[contains(@class,'sapMCb')]");
        await targetCheckbox.waitForClickable({ timeout: 10000 });
        await utils.clickWithWait(targetCheckbox);
        await browser.pause(800);

        console.log("Clicking 'Unassign' button on Maintenance Tasks...");
        await this.maintenanceTasksUnassignBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(this.maintenanceTasksUnassignBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Waiting for confirmation 'Yes' on Unassign Task...");
        await browser.waitUntil(async () => (await this.confirmYesBtn.isDisplayed().catch(() => false)),
            { timeout: 20000, interval: 500, timeoutMsg: "Unassign Task confirmation 'Yes' did not appear." });
        await utils.clickWithWait(this.confirmYesBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Handling success popup OK after task unassignment...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        const removedRow = $(assignedRowXp);
        const stillThere = await removedRow.isExisting().catch(() => false);
        if (stillThere) {
            throw new Error(`Unassigned task '${assignedTaskId}' is still present in the Maintenance Tasks listview.`);
        }
        console.log(`Unassigned task '${assignedTaskId}' verified removed from listview.`);
    }

    /**
     * Attachment markers for Detail report variants. Default (no override) asserts both
     * attachments and header.png's assigned Phase / Category. When only a subset is selected via
     * "Select attachments", Decommissioning / Commercial Documents are only included when header.png
     * is in the token list (they are assigned to that specific attachment).
     */
    private detailAttachmentMarkers(attachmentTokens?: string[]): string[] {
        const tokens = attachmentTokens ?? ["Storagetank", "header.png"];
        const markers: string[] = [...tokens];
        if (tokens.some(t => t.toLowerCase().includes("header"))) {
            markers.push("Decommissioning", "Commercial Documents");
        }
        return markers;
    }

    public async downloadReportAndVerify(): Promise<void> {
        // Summary → Fields Where Values Are Present.
        const ctx = await this.downloadReportViaMenu("Summary", "Fields Where Values Are Present");
        await this.assertReportBaseMarkers(ctx);
        await this.assertReportAttachmentsAndFindingsSections(ctx);
        await this.assertReportCmlBooleanCheckboxes(ctx, "CML-02", "Test CML A");
        console.log("Summary → Fields Where Values Are Present report verified.");
    }

    public async downloadReportSummaryAllFieldsAndVerify(): Promise<void> {
        // Summary → All Available Fields. Base markers already include Equipment ID / Description /
        // Location / Stage / Inspection Type — nothing extra needed here.
        const ctx = await this.downloadReportViaMenu("Summary", "All Available Fields");
        await this.assertReportBaseMarkers(ctx);
        await this.assertReportAttachmentsAndFindingsSections(ctx);
        await this.assertReportCmlBooleanCheckboxes(ctx, "CML-02", "Test CML A");
        console.log("Summary → All Available Fields report verified.");
    }

    /**
     * Detail → Fields Where Values Are Present. This variant
     *  - is titled "Inspection Report" (not "Summary Report"),
     *  - has no Equipment ID / Description / Stage / Inspection Type row in the header table,
     *  - adds Roles, Components and Maintenance Notifications sections (raw PDF uses an 'fi'
     *    ligature glyph in "Notifications" — the extractor normalizes it to plain ASCII),
     *  - renders every attachment with Phase / Category / Size (no S.No column),
     *  - lists CMLs under a per-component heading with ~15+ fields each (no Validated row),
     *  - hides fields with empty values (so Test CML A shows fewer rows than CML-02),
     *  - shows Findings in a compact table with Active / Status / Date / Is Notifcation / Assigned To.
     */
    public async downloadReportDetailFieldsWithValuesAndVerify(): Promise<void> {
        const ctx = await this.downloadReportViaMenu("Detail", "Fields Where Values Are Present");
        await this.assertDetailFwvpBaseMarkers(ctx);
        await this.assertDetailFwvpAttachmentsSection(ctx);
        await this.assertDetailFwvpFindingsSection(ctx);
        await this.assertDetailFwvpCmlBooleans(ctx, "CML-02", "Test CML A");
        console.log("Detail → Fields Where Values Are Present report verified.");
    }

    /**
     * Detail → All Available Fields. Superset of the FWVP variant:
     *  - Header table adds `Equipment ID` and `Equipment Description` rows (still no Stage or
     *    Inspection Type — those remain variant-omissions in both Detail variants).
     *  - CML section renders EVERY field row, including `Validated` and `Comments`, even when the
     *    value cell is blank. So the `Validated` and `Comments` labels are present, but the value
     *    "true" for Validated and the "Auto comment" text for Comments are still absent because
     *    the underlying columns don't persist / display for this layout.
     *  - Test CML A now shows all boolean row labels (`Onstream?`, `Apply Temperature
     *    Compensation?`, `STCRV Flag`) with empty value cells (vs. FWVP which hides them).
     *  - Findings table may split rows across pages (Display Id on page N, Finding Number on
     *    page N+1) — the extractor's whitespace normalization joins these so substring checks
     *    still succeed.
     * Section-scoped Attachments, Findings and CML-boolean checks are shared with the FWVP
     * variant (structure is identical).
     */
    public async downloadReportDetailAllFieldsAndVerify(): Promise<void> {
        const ctx = await this.downloadReportViaMenu("Detail", "All Available Fields");
        await this.assertDetailAllFieldsBaseMarkers(ctx);
        await this.assertDetailFwvpAttachmentsSection(ctx);
        await this.assertDetailFwvpFindingsSection(ctx);
        await this.assertDetailFwvpCmlBooleans(ctx, "CML-02", "Test CML A");
        console.log("Detail → All Available Fields report verified.");
    }

    /**
     * Summary → Fields Where Values Are Present with only the Storagetank attachment selected via
     * the "Select attachments" flow. The generated PDF must contain the Storagetank IntelliEdit
     * PNG and must NOT contain header.png (nor its Phase / Category assignments).
     */
    public async downloadReportSummaryFwvpSelectAttachmentsAndVerify(): Promise<void> {
        const ctx = await this.downloadReportViaMenu("Summary", "Fields Where Values Are Present", ["Storagetank"]);
        await this.assertReportBaseMarkers(ctx, [], { attachmentTokens: ["Storagetank"] });
        await this.assertReportAttachmentsAndFindingsSections(ctx, {
            presentAttachments: [/Storagetank[\w.]*edited[\w.]*\.png/i],
            absentAttachments: ["header.png"],
        });
        await this.assertReportCmlBooleanCheckboxes(ctx, "CML-02", "Test CML A");
        console.log("Summary → FWVP → Select attachments (Storagetank only) report verified.");
    }

    /**
     * Summary → All Available Fields with only the Storagetank attachment selected via the
     * "Select attachments" flow.
     */
    public async downloadReportSummaryAllFieldsSelectAttachmentsAndVerify(): Promise<void> {
        const ctx = await this.downloadReportViaMenu("Summary", "All Available Fields", ["Storagetank"]);
        await this.assertReportBaseMarkers(ctx, [], { attachmentTokens: ["Storagetank"] });
        await this.assertReportAttachmentsAndFindingsSections(ctx, {
            presentAttachments: [/Storagetank[\w.]*edited[\w.]*\.png/i],
            absentAttachments: ["header.png"],
        });
        await this.assertReportCmlBooleanCheckboxes(ctx, "CML-02", "Test CML A");
        console.log("Summary → All Available Fields → Select attachments (Storagetank only) report verified.");
    }

    /**
     * Detail → Fields Where Values Are Present with only the Storagetank attachment selected via
     * the "Select attachments" flow. header.png (and therefore its Phase / Category) must be
     * absent from the Attachments section.
     */
    public async downloadReportDetailFwvpSelectAttachmentsAndVerify(): Promise<void> {
        const ctx = await this.downloadReportViaMenu("Detail", "Fields Where Values Are Present", ["Storagetank"]);
        await this.assertDetailFwvpBaseMarkers(ctx, { attachmentTokens: ["Storagetank"] });
        await this.assertDetailFwvpAttachmentsSection(ctx, {
            presentAttachments: [/Storagetank[\w.]*edited[\w.]*\.png/i],
            absentAttachments: ["header.png"],
            expectPhaseAndCategory: false,
        });
        await this.assertDetailFwvpFindingsSection(ctx);
        await this.assertDetailFwvpCmlBooleans(ctx, "CML-02", "Test CML A");
        console.log("Detail → FWVP → Select attachments (Storagetank only) report verified.");
    }

    /**
     * Detail → All Available Fields with only the Storagetank attachment selected via the
     * "Select attachments" flow.
     */
    public async downloadReportDetailAllFieldsSelectAttachmentsAndVerify(): Promise<void> {
        const ctx = await this.downloadReportViaMenu("Detail", "All Available Fields", ["Storagetank"]);
        await this.assertDetailAllFieldsBaseMarkers(ctx, { attachmentTokens: ["Storagetank"] });
        await this.assertDetailFwvpAttachmentsSection(ctx, {
            presentAttachments: [/Storagetank[\w.]*edited[\w.]*\.png/i],
            absentAttachments: ["header.png"],
            expectPhaseAndCategory: false,
        });
        await this.assertDetailFwvpFindingsSection(ctx);
        await this.assertDetailFwvpCmlBooleans(ctx, "CML-02", "Test CML A");
        console.log("Detail → All Available Fields → Select attachments (Storagetank only) report verified.");
    }

    /**
     * Report download flow: Report menu → subMenu → option → Include all attachments / Select
     * attachments → OK. When `selectedAttachments` is provided, the "Select attachments" radio is
     * chosen and, in the follow-up Attachments dialog, only rows whose filename contains one of
     * the given tokens are ticked before pressing OK.
     * Waits for the PDF to appear in the downloads folder and returns the extracted text.
     */
    private async downloadReportViaMenu(
        subMenu: "Summary" | "Detail",
        option: "All Available Fields" | "Fields Where Values Are Present",
        selectedAttachments?: string[]
    ): Promise<{ raw: string; norm: string; normCompact: string; pdfPath: string; containsInPdf: (needle: string) => boolean }> {
        // Clean the downloads dir so waitForDownload picks up only the file produced by this action.
        await utils.createDownloadDir();
        await utils.cleanDownloads();

        console.log("Clicking 'Report' menu button in inspection header...");
        await this.reportMenuBtn.waitForDisplayed({ timeout: 30000 });
        await this.reportMenuBtn.scrollIntoView({ block: "center" }).catch(() => { /* best-effort */ });
        await utils.clickWithWait(this.reportMenuBtn);
        await browser.pause(600);

        console.log(`Clicking '${subMenu}' menu item...`);
        const subMenuEl = subMenu === "Summary" ? this.reportMenuSummaryItem : this.reportMenuDetailItem;
        await subMenuEl.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(subMenuEl);
        await browser.pause(600);

        console.log(`Clicking '${option}' menu item...`);
        const optionEl = option === "Fields Where Values Are Present"
            ? this.reportMenuFieldsWithValuesItem
            : this.reportMenuAllFieldsItem;
        await optionEl.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(optionEl);
        await this.reportOptionsDialog.waitForDisplayed({ timeout: 30000 });
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(800);
        console.log("Report options dialog opened.");

        const useSelectAttachments = Array.isArray(selectedAttachments) && selectedAttachments.length > 0;
        if (useSelectAttachments) {
            console.log(`Selecting 'Select attachments' option (tokens: ${JSON.stringify(selectedAttachments)})...`);
            try {
                await this.selectAttachmentsOption.waitForDisplayed({ timeout: 10000 });
            } catch {
                const html = await this.reportOptionsDialog.getHTML().catch(() => "(unavailable)");
                throw new Error(`'Select attachments' option not found in report options dialog. Dialog HTML:\n${html}`);
            }
            await utils.clickWithWait(this.selectAttachmentsOption);
            await browser.pause(400);

            console.log("Clicking 'OK' on report options dialog...");
            await this.reportOptionsOkBtn.waitForDisplayed({ timeout: 10000 });
            await utils.clickWithWait(this.reportOptionsOkBtn);
            await utils.waitForBusyIndicatorToDisappear();

            console.log("Waiting for Attachments selection dialog...");
            await this.attachmentsSelectionDialog.waitForDisplayed({ timeout: 30000 });
            await browser.pause(500);

            for (const token of selectedAttachments!) {
                console.log(`Ticking attachment row matching token '${token}'...`);
                const rowCb = this.attachmentSelectionRowCheckbox(token);
                try {
                    await rowCb.waitForDisplayed({ timeout: 10000 });
                } catch {
                    const html = await this.attachmentsSelectionDialog.getHTML().catch(() => "(unavailable)");
                    throw new Error(`Attachment row matching token '${token}' not found in Attachments dialog. Dialog HTML:\n${html}`);
                }
                await utils.clickWithWait(rowCb);
                await browser.pause(300);
            }

            console.log("Clicking 'OK' on Attachments selection dialog...");
            await this.attachmentsSelectionDialogOkBtn.waitForDisplayed({ timeout: 10000 });
            await utils.clickWithWait(this.attachmentsSelectionDialogOkBtn);
            await utils.waitForBusyIndicatorToDisappear();
        } else {
            console.log("Selecting 'Include all attachments' option...");
            try {
                await this.includeAllAttachmentsOption.waitForDisplayed({ timeout: 10000 });
            } catch {
                const html = await this.reportOptionsDialog.getHTML().catch(() => "(unavailable)");
                throw new Error(`'Include all attachments' option not found in report options dialog. Dialog HTML:\n${html}`);
            }
            await utils.clickWithWait(this.includeAllAttachmentsOption);
            await browser.pause(400);

            console.log("Clicking 'OK' on report options dialog...");
            await this.reportOptionsOkBtn.waitForDisplayed({ timeout: 10000 });
            await utils.clickWithWait(this.reportOptionsOkBtn);
            await utils.waitForBusyIndicatorToDisappear();
        }

        console.log("Waiting for PDF report download to complete...");
        // Reports with 'Include all attachments' embed images and can take longer than 20s.
        const downloadDir = path.resolve(process.cwd(), "downloads");
        await browser.waitUntil(async () => {
            if (!fs.existsSync(downloadDir)) return false;
            const files = fs.readdirSync(downloadDir).filter(f => f.toLowerCase().endsWith(".pdf") && !f.endsWith(".crdownload"));
            return files.length > 0;
        }, { timeout: 120000, interval: 1000, timeoutMsg: `No PDF report appeared in '${downloadDir}' within 120s after clicking OK.` });
        const pdfFiles = fs.readdirSync(downloadDir).filter(f => f.toLowerCase().endsWith(".pdf"));
        const latest = pdfFiles
            .map(name => ({ name, mtime: fs.statSync(path.join(downloadDir, name)).mtime.getTime() }))
            .sort((a, b) => b.mtime - a.mtime)[0];
        const pdfPath = path.join(downloadDir, latest.name);
        console.log(`Report downloaded: ${pdfPath}`);

        console.log("Extracting text from downloaded PDF...");
        // Use a local minimal-normalization extractor. The shared utils.extractTextFromPDF collapses
        // spaces between consecutive capital letters and around dashes, which breaks phrases such as
        // "UT Thickness", "QA Automation", "CML A", "Class 0 - As new condition".
        const pdfjsLib: any = await import("pdfjs-dist/legacy/build/pdf.js");
        const pdfBytes = new Uint8Array(fs.readFileSync(pdfPath));
        const pdfDoc = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
        let rawText = "";
        for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const content = await page.getTextContent();
            rawText += content.items.map((item: any) => item.str).join(" ") + "\n";
        }
        // Normalize Latin ligatures the PDF font emits as single codepoints. Without this, tokens
        // such as "Notifications", "Findings", "Verified" etc. surface as "Notiﬁcations",
        // "Findings", "Veriﬁed" (U+FB01 / U+FB00 / U+FB02) in the extracted text and never match a
        // plain-ASCII assertion. Do this before the whitespace collapse so downstream normalization
        // sees pure ASCII.
        rawText = rawText
            .replace(/\uFB00/g, "ff")
            .replace(/\uFB01/g, "fi")
            .replace(/\uFB02/g, "fl")
            .replace(/\uFB03/g, "ffi")
            .replace(/\uFB04/g, "ffl")
            // Fraction slash / division slash → ASCII '/' so labels like "Calibration Block
            // Material/Size" and dates like "8/21/26" match regardless of font choice.
            .replace(/[\u2044\u2215]/g, "/");
        const norm = rawText.replace(/\s+/g, " ").trim();
        // Some hyphenated identifier codes render in the PDF with a space after certain dashes,
        // e.g. "EQ- SR- AUTO-001", "PROC- AUTO-001", "FND- AUTO-7635". Also create a compact
        // variant that removes any whitespace immediately following a dash so those codes match.
        const normCompact = norm.replace(/-\s+/g, "-");
        // A third view with ALL whitespace stripped, used as a last-resort fallback for labels the
        // extractor breaks across items with extra spaces (e.g. "Material / Size" instead of
        // "Material/Size"). Only used when the needle has no space-sensitive semantics.
        const normStripped = norm.replace(/\s+/g, "");
        const containsInPdf = (needle: string): boolean => {
            if (norm.includes(needle) || normCompact.includes(needle)) return true;
            const strippedNeedle = needle.replace(/\s+/g, "");
            return strippedNeedle.length > 0 && normStripped.includes(strippedNeedle);
        };

        return { raw: rawText, norm, normCompact, pdfPath, containsInPdf };
    }

    /**
     * Common marker verification for every Summary / Detail report variant.
     * Includes: report structure sections, header identifiers, background info values, checklist,
     * CML entries, attachment filenames, and finding number.
     */
    private async assertReportBaseMarkers(
        ctx: { pdfPath: string; norm: string; containsInPdf: (needle: string) => boolean },
        extraMarkers: Array<string | string[]> = [],
        opts: { attachmentTokens?: string[] } = {}
    ): Promise<void> {
        const inspectionId = AssetInspectionListView.capturedInspectionId || "";
        const editedDesc = AssetInspectionListView.createdInspectionDescription || "";
        const templateType = AssetInspectionListView.selectedTemplate || "";
        const inspectionDate = this.capturedInspectionDate || "";
        const findingNumber = this.capturedFindingNumber || "";
        const notificationShortDesc = this.capturedNotificationShortDesc || "";
        const inspectionType = AssetInspectionListView.selectedInspectionType || "";
        const stage = AssetInspectionListView.selectedStage || "";

        // The report renders Date of Inspection in ISO (YYYY-MM-DD) even though we enter "MMM d, yyyy".
        const monthMap: Record<string, string> = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
        };
        const dateVariants: string[] = [];
        if (inspectionDate) {
            dateVariants.push(inspectionDate);
            const m = /^([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})$/.exec(inspectionDate.trim());
            if (m && monthMap[m[1]]) {
                const iso = `${m[3]}-${monthMap[m[1]]}-${String(m[2]).padStart(2, "0")}`;
                dateVariants.push(iso);
            }
        }

        const requiredMarkers: Array<string | string[]> = [
            // Report structure / sections
            "Summary Report",
            "Background Information",
            "Checklist",
            "CML",
            "Attachments",
            "Findings",
            // Header — Summary Report table
            inspectionId,
            editedDesc,
            templateType,
            "Equipment ID",
            "10000080",
            "Equipment Description",
            "STORAGE TANK",
            "Instrumentation for Compressor Unit",
            "ASIN-1001-PROD-UTLY-COMP-INST",
            "Unpublished",
            // Header — Stage / Inspection Type (may only appear in Detail report; asserted here per user request)
            stage,
            inspectionType,
            // Background Information field values
            "Yes",
            "Mineral Wool",
            "EQ-SR-AUTO-001",
            "QA Automation",
            "Inspector",
            "Automation Inspection Co.",
            "PROC-AUTO-001",
            "Automation Asset",
            "Flammable",
            "25",
            dateVariants.length > 0 ? dateVariants : "",
            // Checklist section
            "Anchor Bolts",
            "Clamp",
            "Class 0 - As new condition",
            "Ok",
            "Comment box",
            "No comments.............",
            // Maintenance Notifications section
            notificationShortDesc,
            "Maintenance Request",
            "Low",
            "Outstanding",
            // CML section — CML IDs and inch-converted reading value prefixes (mm -> in / 25.4)
            "CML-02",
            "Test CML A",
            "UT Cylindrical Shell ID Div 1",
            "0.1665354330", // Reading1: 4.23 mm -> 0.16653543307086614 in
            "0.1787401574", // Reading2: 4.54 mm -> 0.17874015748031496 in
            "0.1830708661", // Reading3: 4.65 mm -> 0.18307086614173228 in
            "0.1761154855", // Average Reading -> 0.17611548...
            "Auto comment",
            "Carbon Steel / 1in",
            "CB-SN-AUTO-001",
            "Single",
            "77",
            "Allowable Measurement Variance",
            "Expected Corrosion Rate",
            "INS-SN-AUTO-001",
            "TR-SN-AUTO-001",
            "Point Override Approval Date",
            // Attachments
            ...(opts.attachmentTokens ?? ["Storagetank", "header.png"]),
            // Findings
            findingNumber,
            // Additional variant-specific markers (kept in the API so future variants can add more).
            ...extraMarkers,
        ];

        const missing: string[] = [];
        const found: string[] = [];
        for (const m of requiredMarkers) {
            if (Array.isArray(m)) {
                if (m.length === 0) continue;
                const label = m.join(" OR ");
                if (m.some(x => ctx.containsInPdf(x))) found.push(label);
                else missing.push(label);
            } else if (m && m.trim().length > 0) {
                if (ctx.containsInPdf(m)) found.push(m);
                else missing.push(m);
            }
        }

        console.log(`Report markers FOUND in PDF (${found.length}):\n  - ${found.join("\n  - ")}`);
        if (missing.length > 0) {
            console.log(`Report markers MISSING from PDF (${missing.length}):\n  - ${missing.join("\n  - ")}`);
            throw new Error(
                `Report content mismatch — see details below.\n\n` +
                `Found in PDF (${found.length}):\n  - ${found.join("\n  - ")}\n\n` +
                `MISSING from PDF (${missing.length}):\n  - ${missing.join("\n  - ")}\n\n` +
                `PDF path: ${ctx.pdfPath}`
            );
        }
    }

    /**
     * Verifies the Attachments and Findings sections' table content matches what the test uploaded /
     * created (image-referenced by the user). When `opts.presentAttachments` /
     * `opts.absentAttachments` are provided, only those filename tokens are asserted (used by the
     * "Select attachments" report variants).
     */
    private async assertReportAttachmentsAndFindingsSections(
        ctx: { pdfPath: string; norm: string },
        opts: { presentAttachments?: Array<string | RegExp>; absentAttachments?: string[] } = {}
    ): Promise<void> {
        const findingNumber = this.capturedFindingNumber || "";

        // Attachments-section-specific check.
        const attachmentsIdx = ctx.norm.indexOf("Attachments");
        const findingsIdx = ctx.norm.indexOf("Findings", attachmentsIdx >= 0 ? attachmentsIdx : 0);
        const attachmentsSection = attachmentsIdx >= 0
            ? ctx.norm.slice(attachmentsIdx, findingsIdx > attachmentsIdx ? findingsIdx : undefined)
            : "";
        const attachmentIssues: string[] = [];
        if (!attachmentsSection.includes("S.No")) {
            attachmentIssues.push("Attachments section header 'S.No' column not found.");
        }
        const presentAttachments: Array<string | RegExp> = opts.presentAttachments ?? [
            "header.png",
            /Storagetank[\w.]*edited[\w.]*\.png/i,
        ];
        for (const needle of presentAttachments) {
            const ok = typeof needle === "string" ? attachmentsSection.includes(needle) : needle.test(attachmentsSection);
            if (!ok) attachmentIssues.push(`Expected attachment '${needle}' not listed under the Attachments section.`);
        }
        for (const absent of opts.absentAttachments ?? []) {
            if (attachmentsSection.includes(absent)) {
                attachmentIssues.push(`Un-selected attachment '${absent}' should NOT be in the Attachments section but is present.`);
            }
        }
        if (attachmentIssues.length > 0) {
            throw new Error(`Report attachments section mismatch:\n  - ${attachmentIssues.join("\n  - ")}\nPDF path: ${ctx.pdfPath}`);
        }

        // Findings-section-specific check.
        const findingsSection = findingsIdx >= 0 ? ctx.norm.slice(findingsIdx) : "";
        const findingsSectionCompact = findingsSection.replace(/-\s+/g, "-");
        const findingsIssues: string[] = [];
        if (!/PMFI\.\d+/.test(findingsSectionCompact)) {
            findingsIssues.push("No 'PMFI.<n>' Display Id found in the Findings section.");
        }
        if (findingNumber && !findingsSectionCompact.includes(findingNumber)) {
            findingsIssues.push(`Finding Number '${findingNumber}' not found in the Findings section.`);
        }
        if (!findingsSection.includes("In Progress")) {
            findingsIssues.push("Finding Status 'In Progress' not found in the Findings section.");
        }
        if (!findingsSection.includes("qa.automation@asint.net")) {
            findingsIssues.push("Finding 'Assigned To' value 'qa.automation@asint.net' not found in the Findings section.");
        }
        if (findingsIssues.length > 0) {
            throw new Error(`Report findings section mismatch:\n  - ${findingsIssues.join("\n  - ")}\nPDF path: ${ctx.pdfPath}`);
        }
    }

    /**
     * Per-CML checkbox verification: the first target CML has all boolean fields (Validated, Onstream?,
     * Apply Temperature Compensation?, STCRV Flag) ticked; the second has none. Assert the report
     * reflects true/... vs blank for each CML section.
     */
    private async assertReportCmlBooleanCheckboxes(
        ctx: { pdfPath: string; norm: string },
        allTickedCml: string,
        noneTickedCml: string
    ): Promise<void> {
        const booleanLabels = ["Validated", "Onstream?", "Apply Temperature Compensation?", "STCRV Flag"];

        // Slice text between successive "CML ID" occurrences so we look at one CML's block at a time.
        const cmlIdIdxs: number[] = [];
        let searchFrom = 0;
        while (true) {
            const idx = ctx.norm.indexOf("CML ID", searchFrom);
            if (idx < 0) break;
            cmlIdIdxs.push(idx);
            searchFrom = idx + 6;
        }
        if (cmlIdIdxs.length === 0) {
            throw new Error(`No 'CML ID' rows found in the report — cannot verify CML boolean checkboxes. PDF path: ${ctx.pdfPath}`);
        }

        const sliceForCml = (cmlName: string): string => {
            for (let i = 0; i < cmlIdIdxs.length; i++) {
                const start = cmlIdIdxs[i];
                const end = i + 1 < cmlIdIdxs.length ? cmlIdIdxs[i + 1] : ctx.norm.length;
                const block = ctx.norm.slice(start, end);
                if (block.includes(cmlName)) return block;
            }
            return "";
        };

        const allTickedBlock = sliceForCml(allTickedCml);
        const noneTickedBlock = sliceForCml(noneTickedCml);
        const issues: string[] = [];

        if (!allTickedBlock) {
            issues.push(`CML block for '${allTickedCml}' not found in the CML section.`);
        } else {
            for (const label of booleanLabels) {
                // Expect `<label> true` (whitespace between label and value collapsed).
                const re = new RegExp(`${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+true\\b`);
                if (!re.test(allTickedBlock)) {
                    issues.push(`Expected '${label} true' in CML '${allTickedCml}' section.`);
                }
            }
            if (!allTickedBlock.includes("Auto comment")) {
                issues.push(`Expected 'Auto comment' in CML '${allTickedCml}' section (Comments should be filled).`);
            }
        }

        if (!noneTickedBlock) {
            issues.push(`CML block for '${noneTickedCml}' not found in the CML section.`);
        } else {
            for (const label of booleanLabels) {
                const re = new RegExp(`${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+true\\b`);
                if (re.test(noneTickedBlock)) {
                    issues.push(`Did NOT expect '${label} true' in CML '${noneTickedCml}' section (all checkboxes should be untouched).`);
                }
            }
            if (noneTickedBlock.includes("Auto comment")) {
                issues.push(`Did NOT expect 'Auto comment' in CML '${noneTickedCml}' section (Comments should be empty).`);
            }
        }

        if (issues.length > 0) {
            throw new Error(`Report CML boolean checkbox mismatch:\n  - ${issues.join("\n  - ")}\nPDF path: ${ctx.pdfPath}`);
        }
    }

    /**
     * Detail-FWVP variant marker list. Only markers we KNOW the sample report renders are asserted;
     * fields we fill in the UI but which this variant deliberately omits are logged separately by the
     * throw message ("Found in PDF" vs "MISSING from PDF") so the terminal makes both sides visible.
     */
    private async assertDetailFwvpBaseMarkers(
        ctx: { pdfPath: string; norm: string; containsInPdf: (needle: string) => boolean },
        opts: { attachmentTokens?: string[] } = {}
    ): Promise<void> {
        const inspectionId = AssetInspectionListView.capturedInspectionId || "";
        const editedDesc = AssetInspectionListView.createdInspectionDescription || "";
        const templateType = AssetInspectionListView.selectedTemplate || "";
        const inspectionType = AssetInspectionListView.selectedInspectionType || "";
        const stage = AssetInspectionListView.selectedStage || "";
        const assignedTo = AssetInspectionListView.selectedAssignedTo || "";
        const equipmentName = AssetInspectionListView.selectedEquipmentName || "";
        const inspectionDate = this.capturedInspectionDate || "";
        const findingNumber = this.capturedFindingNumber || "";
        const notificationShortDesc = this.capturedNotificationShortDesc || "";

        // Report renders Date of Inspection in ISO (YYYY-MM-DD).
        const monthMap: Record<string, string> = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
        };
        const dateVariants: string[] = [];
        if (inspectionDate) {
            dateVariants.push(inspectionDate);
            const m = /^([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})$/.exec(inspectionDate.trim());
            if (m && monthMap[m[1]]) {
                dateVariants.push(`${m[3]}-${monthMap[m[1]]}-${String(m[2]).padStart(2, "0")}`);
            }
        }

        // pdfjs can split the finding number code into pieces so the extractor's `norm` view may show
        // e.g. "FND -AUTO-3425" or "FNDAUTO-3425" (dash absorbed). Provide all viable variants.
        const fnVariants: string[] = [];
        if (findingNumber) {
            fnVariants.push(findingNumber);
            fnVariants.push(findingNumber.replace(/^([A-Z]+)-([A-Z]+)-/, "$1$2-"));
            fnVariants.push(findingNumber.replace(/^([A-Z]+)-([A-Z]+)-/, "$1 $2-"));
            fnVariants.push(findingNumber.replace(/-/g, ""));
        }

        // Exhaustive marker list: every value we fill in the UI + every visible label from the sample
        // Detail-FWVP PDF. Anything missing is flagged in the terminal so we can see which fields the
        // report layout genuinely omits vs. which we forgot to fill.
        const requiredMarkers: Array<string | string[]> = [
            // ==================== Title & TOC / Section headers ====================
            "Inspection Report",
            "Background Information",
            "Roles",
            "Checklist",
            "Attachments",
            "Maintenance Notifications", // ligature-normalized — raw PDF glyph is 'fi' ligature
            "Components",
            "CML",
            "Findings",

            // ==================== Header table (labels + values) ====================
            "Name",
            "Description",
            "Template Type",
            "Location",
            "Location Description",
            "Analysis Status",
            inspectionId,
            editedDesc,
            templateType,
            "Instrumentation for Compressor Unit",
            "ASIN-1001-PROD-UTLY-COMP-INST",
            "Unpublished",
            // NOTE: Inspection Type / Stage / Equipment ID+Name are NOT asserted here — the Detail-FWVP
            // variant deliberately omits them from the header. They're covered by the
            // `expectedAbsentMarkers` list below so the terminal still reports their status.

            // ==================== Background Information (labels + values) ====================
            "Date of Inspection",
            "Is equipment Insulated?",
            "Is nametag present?",
            "Surface temperature",
            "Insulation material",
            "EQ SR.",
            "Inspector Name",
            "Inspector Role",
            "Inspection Company",
            "Procedure Number",
            "Asset Name",
            "Exposure",
            dateVariants.length > 0 ? dateVariants : "",
            "Mineral Wool",
            "EQ-SR-AUTO-001",
            "QA Automation",
            "Inspector",
            "Automation Inspection Co.",
            "PROC-AUTO-001",
            "Automation Asset",
            "Flammable",
            "25",

            // ==================== Roles ====================
            "Role - Inspector",
            assignedTo, // qa.automation@asint.net
            "Signature with date",

            // ==================== Checklist ====================
            "Checklist - Category: Component Checklist",
            "Component",
            "General Condition",
            "Not applicable",
            "Not Inspected",
            "Comments",
            "Anchor Bolts",
            "Clamp",
            "Class 0 - As new condition",
            "Ok",
            "Comment box",
            "No comments.............",

            // ==================== Attachments (labels + values) ====================
            "Display Id",
            "Phase",
            "Category",
            "DOCU.", // any DOCU.<n> id
            ...this.detailAttachmentMarkers(opts.attachmentTokens),

            // ==================== Maintenance Notifications (labels + values) ====================
            "Type",
            "Priority",
            "Status",
            "Required Start Date / End Date",
            "PMNO.", // any PMNO.<n> id
            notificationShortDesc,
            "Maintenance Request",
            "Low",
            "Outstanding",

            // ==================== Components / CML (labels + values) ====================
            "UT Cylindrical Shell ID Div 1",
            "CML ID",
            "Reading1",
            "Reading2",
            "Reading3",
            "Average Reading",
            "Point Override Approved By",
            "Technician (Measurement Taken By)",
            "Calibration Block Material/Size",
            "Calibration Block Serial Number",
            "Element Type (Single or Dual)",
            "Procedure Number Used",
            "TML Temperature",
            "Temperature Corrected Avg",
            "Allowable Measurement Variance",
            "Expected Corrosion Rate",
            "Instrument Serial Number",
            "Transducer Serial Number",
            "NDE Method",
            "Point Override Approval Date",
            // Boolean row labels the FWVP variant does render
            "Onstream?",
            "Apply Temperature Compensation?",
            "STCRV Flag",
            // NOTE: Validated boolean row and CML Comments ("Auto comment") are handled by the
            // `expectedAbsentMarkers` list below — they are deliberately hidden in Detail-FWVP.
            // CML IDs
            "CML-02",
            "Test CML A",
            // Reading values (inch-converted prefixes)
            "0.1665354330",
            "0.1787401574",
            "0.1830708661",
            "0.1761154855",
            // Computed / entered CML numeric values
            "0.1760012626516069", // Temperature Corrected Avg
            "0.003937007874",     // Allowable Measurement Variance
            "0.001968503937",     // Expected Corrosion Rate
            "Carbon Steel / 1in",
            "CB-SN-AUTO-001",
            "INS-SN-AUTO-001",
            "TR-SN-AUTO-001",
            "Single",
            "77",
            "UT",

            // ==================== Findings (labels + values) ====================
            "Active",
            "Finding Type",
            "Date Recorded / Approved",
            "Is Notification Created", // ligature-normalized — raw PDF glyph is 'fi' ligature
            "Assigned To",
            "PMFI.", // any PMFI.<n> display id
            fnVariants.length > 0 ? fnVariants : "",
            "In Progress",
        ];

        // Fields we KNOW the Detail-FWVP variant deliberately omits. These are logged separately
        // for visibility: if any of them ever appears in the PDF we surface it (report layout may
        // have changed and the markers should be moved back into `requiredMarkers`).
        const expectedAbsentMarkers: Array<{ label: string; needles: string[] }> = [
            { label: "Inspection Type", needles: inspectionType ? [inspectionType] : [] },
            { label: "Stage", needles: stage ? [stage] : [] },
            { label: "Equipment Name", needles: equipmentName ? [equipmentName] : [] },
            { label: "Equipment ID (10000080)", needles: ["10000080"] },
            { label: "CML boolean row: Validated", needles: ["Validated"] },
            { label: "CML Comments text: Auto comment", needles: ["Auto comment"] },
        ];

        const missing: string[] = [];
        const found: string[] = [];
        for (const m of requiredMarkers) {
            if (Array.isArray(m)) {
                if (m.length === 0) continue;
                const label = m.join(" OR ");
                if (m.some(x => ctx.containsInPdf(x))) found.push(label);
                else missing.push(label);
            } else if (m && m.trim().length > 0) {
                if (ctx.containsInPdf(m)) found.push(m);
                else missing.push(m);
            }
        }

        // Evaluate the by-design omissions. absentAsExpected = still missing (good); unexpectedlyPresent
        // = the layout started rendering something we thought was hidden (report change, surface it).
        const absentAsExpected: string[] = [];
        const unexpectedlyPresent: string[] = [];
        for (const item of expectedAbsentMarkers) {
            if (item.needles.length === 0) continue;
            const present = item.needles.some(n => n && n.trim().length > 0 && ctx.containsInPdf(n));
            if (present) unexpectedlyPresent.push(`${item.label} (needle: ${item.needles.join(" / ")})`);
            else absentAsExpected.push(`${item.label} (needle: ${item.needles.join(" / ")})`);
        }

        console.log(`[Detail-FWVP] Required markers FOUND in PDF (${found.length}):\n  - ${found.join("\n  - ")}`);
        if (absentAsExpected.length > 0) {
            console.log(`[Detail-FWVP] By-design omissions (correctly absent from PDF, ${absentAsExpected.length}):\n  - ${absentAsExpected.join("\n  - ")}`);
        }
        if (unexpectedlyPresent.length > 0) {
            console.log(`[Detail-FWVP] Notice: these were expected to be ABSENT but the PDF now renders them (${unexpectedlyPresent.length}):\n  - ${unexpectedlyPresent.join("\n  - ")}`);
        }
        if (missing.length > 0) {
            console.log(`[Detail-FWVP] Required markers MISSING from PDF (${missing.length}):\n  - ${missing.join("\n  - ")}`);
            throw new Error(
                `[Detail — Fields Where Values Are Present] Report content mismatch — see details below.\n\n` +
                `Found in PDF (${found.length}):\n  - ${found.join("\n  - ")}\n\n` +
                `MISSING from PDF (${missing.length}):\n  - ${missing.join("\n  - ")}\n\n` +
                (absentAsExpected.length > 0
                    ? `By-design omissions (correctly absent, ${absentAsExpected.length}):\n  - ${absentAsExpected.join("\n  - ")}\n\n`
                    : "") +
                `PDF path: ${ctx.pdfPath}`
            );
        }
    }

    /**
     * Detail-All-Available-Fields marker list. Superset of the FWVP list:
     *  - Header adds Equipment ID + Equipment Description labels/values.
     *  - CML section renders the `Validated` and `Comments` row labels (empty values).
     * Still-absent items (kept in `expectedAbsentMarkers`):
     *  - Header: Stage, Inspection Type (Detail report layout doesn't render either).
     *  - CML: value "true" after `Validated` and the "Auto comment" text after `Comments`
     *    (labels present, cells blank in the sample PDF).
     */
    private async assertDetailAllFieldsBaseMarkers(
        ctx: { pdfPath: string; norm: string; containsInPdf: (needle: string) => boolean },
        opts: { attachmentTokens?: string[] } = {}
    ): Promise<void> {
        const inspectionId = AssetInspectionListView.capturedInspectionId || "";
        const editedDesc = AssetInspectionListView.createdInspectionDescription || "";
        const templateType = AssetInspectionListView.selectedTemplate || "";
        const inspectionType = AssetInspectionListView.selectedInspectionType || "";
        const stage = AssetInspectionListView.selectedStage || "";
        const assignedTo = AssetInspectionListView.selectedAssignedTo || "";
        const equipmentName = AssetInspectionListView.selectedEquipmentName || "";
        const inspectionDate = this.capturedInspectionDate || "";
        const findingNumber = this.capturedFindingNumber || "";
        const notificationShortDesc = this.capturedNotificationShortDesc || "";

        const monthMap: Record<string, string> = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
        };
        const dateVariants: string[] = [];
        if (inspectionDate) {
            dateVariants.push(inspectionDate);
            const m = /^([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})$/.exec(inspectionDate.trim());
            if (m && monthMap[m[1]]) {
                dateVariants.push(`${m[3]}-${monthMap[m[1]]}-${String(m[2]).padStart(2, "0")}`);
            }
        }

        const fnVariants: string[] = [];
        if (findingNumber) {
            fnVariants.push(findingNumber);
            fnVariants.push(findingNumber.replace(/^([A-Z]+)-([A-Z]+)-/, "$1$2-"));
            fnVariants.push(findingNumber.replace(/^([A-Z]+)-([A-Z]+)-/, "$1 $2-"));
            fnVariants.push(findingNumber.replace(/-/g, ""));
        }

        const requiredMarkers: Array<string | string[]> = [
            // ==================== Title & TOC / Section headers ====================
            "Inspection Report",
            "Background Information",
            "Roles",
            "Checklist",
            "Attachments",
            "Maintenance Notifications", // ligature-normalized
            "Components",
            "CML",
            "Findings",

            // ==================== Header table (labels + values) ====================
            "Name",
            "Description",
            "Template Type",
            "Equipment ID",
            "Equipment Description",
            "Location",
            "Location Description",
            "Analysis Status",
            inspectionId,
            editedDesc,
            templateType,
            "10000080",       // Equipment ID value
            "STORAGE TANK",  // partial Equipment Description
            "Instrumentation for Compressor Unit",
            "ASIN-1001-PROD-UTLY-COMP-INST",
            "Unpublished",

            // ==================== Background Information (labels + values) ====================
            "Date of Inspection",
            "Is equipment Insulated?",
            "Is nametag present?",
            "Surface temperature",
            "Insulation material",
            "EQ SR.",
            "Inspector Name",
            "Inspector Role",
            "Inspection Company",
            "Procedure Number",
            "Asset Name",
            "Exposure",
            dateVariants.length > 0 ? dateVariants : "",
            "Mineral Wool",
            "EQ-SR-AUTO-001",
            "QA Automation",
            "Inspector",
            "Automation Inspection Co.",
            "PROC-AUTO-001",
            "Automation Asset",
            "Flammable",
            "25",

            // ==================== Roles ====================
            "Role - Inspector",
            assignedTo,
            "Signature with date",

            // ==================== Checklist ====================
            "Checklist - Category: Component Checklist",
            "Component",
            "General Condition",
            "Not applicable",
            "Not Inspected",
            "Comments",
            "Anchor Bolts",
            "Clamp",
            "Class 0 - As new condition",
            "Ok",
            "Comment box",
            "No comments.............",

            // ==================== Attachments (labels + values) ====================
            "Display Id",
            "Phase",
            "Category",
            "DOCU.",
            ...this.detailAttachmentMarkers(opts.attachmentTokens),

            // ==================== Maintenance Notifications ====================
            "Type",
            "Priority",
            "Status",
            "Required Start Date / End Date",
            "PMNO.",
            notificationShortDesc,
            "Maintenance Request",
            "Low",
            "Outstanding",

            // ==================== Components / CML ====================
            "UT Cylindrical Shell ID Div 1",
            "CML ID",
            "Reading1",
            "Reading2",
            "Reading3",
            "Average Reading",
            "Validated",       // label present in All-Fields (value blank)
            "Comments",        // label present in All-Fields (value blank)
            "Point Override Approved By",
            "Technician (Measurement Taken By)",
            "Calibration Block Material/Size",
            "Calibration Block Serial Number",
            "Element Type (Single or Dual)",
            "Procedure Number Used",
            "TML Temperature",
            "Temperature Corrected Avg",
            "Allowable Measurement Variance",
            "Expected Corrosion Rate",
            "Instrument Serial Number",
            "Transducer Serial Number",
            "NDE Method",
            "Point Override Approval Date",
            "Onstream?",
            "Apply Temperature Compensation?",
            "STCRV Flag",
            "CML-02",
            "Test CML A",
            "0.1665354330",
            "0.1787401574",
            "0.1830708661",
            "0.1761154855",
            "0.1760012626516069",
            "0.003937007874",
            "0.001968503937",
            "Carbon Steel / 1in",
            "CB-SN-AUTO-001",
            "INS-SN-AUTO-001",
            "TR-SN-AUTO-001",
            "Single",
            "77",
            "UT",

            // ==================== Findings (labels + values) ====================
            "Active",
            "Finding Type",
            "Date Recorded / Approved",
            "Is Notification Created", // ligature-normalized
            "Assigned To",
            "PMFI.",
            fnVariants.length > 0 ? fnVariants : "",
            "In Progress",
        ];

        // Genuine variant omissions for Detail → All Available Fields. Kept in an expected-absent
        // bucket so the terminal logs their status without failing the test.
        const expectedAbsentMarkers: Array<{ label: string; needles: string[] }> = [
            { label: "Inspection Type", needles: inspectionType ? [inspectionType] : [] },
            { label: "Stage", needles: stage ? [stage] : [] },
            {
                label: "CML Validated value ('Validated true' after the label)",
                needles: ["Validated true"],
            },
            {
                label: "CML Comments text ('Auto comment' after the Comments label)",
                needles: ["Auto comment"],
            },
        ];
        // If the captured equipment name (e.g. "10000080") happens to already match the Equipment
        // ID marker we assert as required, don't duplicate it — the required list already covers it.
        if (equipmentName && equipmentName !== "10000080") {
            expectedAbsentMarkers.push({ label: "Equipment Name", needles: [equipmentName] });
        }

        const missing: string[] = [];
        const found: string[] = [];
        for (const m of requiredMarkers) {
            if (Array.isArray(m)) {
                if (m.length === 0) continue;
                const label = m.join(" OR ");
                if (m.some(x => ctx.containsInPdf(x))) found.push(label);
                else missing.push(label);
            } else if (m && m.trim().length > 0) {
                if (ctx.containsInPdf(m)) found.push(m);
                else missing.push(m);
            }
        }

        const absentAsExpected: string[] = [];
        const unexpectedlyPresent: string[] = [];
        for (const item of expectedAbsentMarkers) {
            if (item.needles.length === 0) continue;
            const present = item.needles.some(n => n && n.trim().length > 0 && ctx.containsInPdf(n));
            if (present) unexpectedlyPresent.push(`${item.label} (needle: ${item.needles.join(" / ")})`);
            else absentAsExpected.push(`${item.label} (needle: ${item.needles.join(" / ")})`);
        }

        console.log(`[Detail-AllFields] Required markers FOUND in PDF (${found.length}):\n  - ${found.join("\n  - ")}`);
        if (absentAsExpected.length > 0) {
            console.log(`[Detail-AllFields] By-design omissions (correctly absent from PDF, ${absentAsExpected.length}):\n  - ${absentAsExpected.join("\n  - ")}`);
        }
        if (unexpectedlyPresent.length > 0) {
            console.log(`[Detail-AllFields] Notice: these were expected to be ABSENT but the PDF now renders them (${unexpectedlyPresent.length}):\n  - ${unexpectedlyPresent.join("\n  - ")}`);
        }
        if (missing.length > 0) {
            console.log(`[Detail-AllFields] Required markers MISSING from PDF (${missing.length}):\n  - ${missing.join("\n  - ")}`);
            throw new Error(
                `[Detail — All Available Fields] Report content mismatch — see details below.\n\n` +
                `Found in PDF (${found.length}):\n  - ${found.join("\n  - ")}\n\n` +
                `MISSING from PDF (${missing.length}):\n  - ${missing.join("\n  - ")}\n\n` +
                (absentAsExpected.length > 0
                    ? `By-design omissions (correctly absent, ${absentAsExpected.length}):\n  - ${absentAsExpected.join("\n  - ")}\n\n`
                    : "") +
                `PDF path: ${ctx.pdfPath}`
            );
        }
    }

    /**
     * Detail (both variants) Attachments section: two attachments (Storagetank IntelliEdit-produced
     * PNG and header.png). Section is field/value-oriented — no S.No column. header.png row must
     * carry the Phase and Category we assigned during `assignDocumentAndVerify`.
     *
     * The section markers ("Attachments", "Maintenance Notifications") appear multiple times in
     * the normalized text:
     *  - 1st = TOC entry (e.g. "Attachments 2"),
     *  - 2nd = actual section heading,
     *  - 3rd (Maintenance Notifications only) = table caption reprinted on the section heading row.
     * Use the 2nd occurrence for the slice boundaries so the TOC entries don't create an empty
     * slice.
     */
    private async assertDetailFwvpAttachmentsSection(
        ctx: { pdfPath: string; norm: string },
        opts: { presentAttachments?: Array<string | RegExp>; absentAttachments?: string[]; expectPhaseAndCategory?: boolean } = {}
    ): Promise<void> {
        const nthIndexOf = (haystack: string, needle: string, n: number): number => {
            let idx = -1;
            for (let i = 0; i < n; i++) {
                idx = haystack.indexOf(needle, idx + 1);
                if (idx < 0) return -1;
            }
            return idx;
        };
        // Attachments section heading is the 2nd occurrence (1st is the TOC).
        let startIdx = nthIndexOf(ctx.norm, "Attachments", 2);
        if (startIdx < 0) startIdx = ctx.norm.indexOf("Attachments"); // fallback: single occurrence
        // Maintenance Notifications section heading is also the 2nd occurrence.
        let endIdx = nthIndexOf(ctx.norm, "Maintenance Notifications", 2);
        if (endIdx < 0 || endIdx <= startIdx) {
            // Fallback: any Maintenance Notifications occurrence after our start.
            endIdx = startIdx >= 0 ? ctx.norm.indexOf("Maintenance Notifications", startIdx + 1) : -1;
        }
        const attachmentsSection = startIdx >= 0
            ? ctx.norm.slice(startIdx, endIdx > startIdx ? endIdx : undefined)
            : "";

        const issues: string[] = [];
        if (!attachmentsSection) {
            issues.push("'Attachments' section header not found in the report.");
        } else {
            const presentAttachments: Array<string | RegExp> = opts.presentAttachments ?? [
                /Storagetank[\w.]*edited[\w.]*\.png/i,
                "header.png",
            ];
            for (const needle of presentAttachments) {
                const ok = typeof needle === "string" ? attachmentsSection.includes(needle) : needle.test(attachmentsSection);
                if (!ok) issues.push(`Expected attachment '${needle}' not listed under the Attachments section.`);
            }
            for (const absent of opts.absentAttachments ?? []) {
                if (attachmentsSection.includes(absent)) {
                    issues.push(`Un-selected attachment '${absent}' should NOT be in the Attachments section but is present.`);
                }
            }
            // header.png row must carry the assigned Phase and Category values (only when header.png
            // is expected in this report).
            const expectPhaseAndCategory = opts.expectPhaseAndCategory ?? true;
            if (expectPhaseAndCategory) {
                if (!attachmentsSection.includes("Decommissioning")) {
                    issues.push("Phase 'Decommissioning' (assigned to header.png) is not present in the Attachments section.");
                }
                if (!attachmentsSection.includes("Commercial Documents")) {
                    issues.push("Category 'Commercial Documents' (assigned to header.png) is not present in the Attachments section.");
                }
            }
        }

        if (issues.length > 0) {
            throw new Error(
                `Detail report Attachments section mismatch:\n  - ${issues.join("\n  - ")}\n` +
                `PDF path: ${ctx.pdfPath}\n` +
                `Section slice (${attachmentsSection.length} chars): ${JSON.stringify(attachmentsSection.slice(0, 400))}${attachmentsSection.length > 400 ? "\u2026" : ""}`
            );
        }
    }

    /**
     * Detail-FWVP Findings section: single-row table. Locate the LAST 'Findings' occurrence in the
     * document (earlier ones show up in the TOC and inside the Checklist section as the row label
     * 'Findings Clamp').
     */
    private async assertDetailFwvpFindingsSection(
        ctx: { pdfPath: string; norm: string; normCompact: string }
    ): Promise<void> {
        const findingNumber = this.capturedFindingNumber || "";
        const findingsIdx = ctx.norm.lastIndexOf("Findings");
        const findingsSection = findingsIdx >= 0 ? ctx.norm.slice(findingsIdx) : "";
        const findingsSectionCompact = findingsSection.replace(/-\s+/g, "-");

        const issues: string[] = [];
        if (!findingsSection) {
            issues.push("'Findings' section header not found in the report.");
        } else {
            if (!/PMFI\.\d+/.test(findingsSectionCompact)) {
                issues.push("No 'PMFI.<n>' Display Id found in the Findings section.");
            }
            const fnMatched =
                !findingNumber ||
                findingsSection.includes(findingNumber) ||
                findingsSectionCompact.includes(findingNumber) ||
                findingsSection.includes(findingNumber.replace(/-/g, "")) ||
                findingsSection.includes(findingNumber.replace(/^([A-Z]+)-([A-Z]+)-/, "$1$2-"));
            if (!fnMatched) {
                issues.push(`Finding Number '${findingNumber}' not found in the Findings section.`);
            }
            if (!findingsSection.includes("In Progress")) {
                issues.push("Finding Status 'In Progress' not found in the Findings section.");
            }
            if (!findingsSection.includes("qa.automation@asint.net")) {
                issues.push("Finding 'Assigned To' value 'qa.automation@asint.net' not found in the Findings section.");
            }
        }

        if (issues.length > 0) {
            throw new Error(`Detail-FWVP report Findings section mismatch:\n  - ${issues.join("\n  - ")}\nPDF path: ${ctx.pdfPath}`);
        }
    }

    /**
     * Detail-FWVP CML boolean verification. This variant renders three booleans per CML row
     * (Onstream?, Apply Temperature Compensation?, STCRV Flag) — no 'Validated' row and no
     * 'Auto comment' text. Fields with unchecked/empty values are hidden entirely.
     */
    private async assertDetailFwvpCmlBooleans(
        ctx: { pdfPath: string; norm: string },
        allTickedCml: string,
        noneTickedCml: string
    ): Promise<void> {
        const booleanLabels = ["Onstream?", "Apply Temperature Compensation?", "STCRV Flag"];

        const cmlIdIdxs: number[] = [];
        let searchFrom = 0;
        while (true) {
            const idx = ctx.norm.indexOf("CML ID", searchFrom);
            if (idx < 0) break;
            cmlIdIdxs.push(idx);
            searchFrom = idx + 6;
        }
        if (cmlIdIdxs.length === 0) {
            throw new Error(`No 'CML ID' rows found in the Detail-FWVP report — cannot verify CML booleans. PDF path: ${ctx.pdfPath}`);
        }

        const sliceForCml = (cmlName: string): string => {
            for (let i = 0; i < cmlIdIdxs.length; i++) {
                const start = cmlIdIdxs[i];
                const end = i + 1 < cmlIdIdxs.length ? cmlIdIdxs[i + 1] : ctx.norm.length;
                const block = ctx.norm.slice(start, end);
                if (block.includes(cmlName)) return block;
            }
            return "";
        };

        const allTickedBlock = sliceForCml(allTickedCml);
        const noneTickedBlock = sliceForCml(noneTickedCml);
        const issues: string[] = [];

        if (!allTickedBlock) {
            issues.push(`CML block for '${allTickedCml}' not found in the CML section.`);
        } else {
            for (const label of booleanLabels) {
                const re = new RegExp(`${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+true\\b`);
                if (!re.test(allTickedBlock)) {
                    issues.push(`Expected '${label} true' in CML '${allTickedCml}' section.`);
                }
            }
        }

        if (!noneTickedBlock) {
            issues.push(`CML block for '${noneTickedCml}' not found in the CML section.`);
        } else {
            for (const label of booleanLabels) {
                const re = new RegExp(`${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+true\\b`);
                if (re.test(noneTickedBlock)) {
                    issues.push(`Did NOT expect '${label} true' in CML '${noneTickedCml}' section (all checkboxes should be untouched).`);
                }
            }
        }

        if (issues.length > 0) {
            throw new Error(`Detail-FWVP report CML boolean mismatch:\n  - ${issues.join("\n  - ")}\nPDF path: ${ctx.pdfPath}`);
        }
    }

    public async deleteInspection(): Promise<void> {
        await this.resolvePendingCmlEditIfAny();
        await this.closeAddCmlDialogIfOpen();

        if (await this.informationTab.isDisplayed().catch(() => false)) {
            console.log("Switching to 'Information' tab before capturing inspection ID...");
            await this.informationTab.waitForDisplayed({ timeout: 30000 });
            try {
                await utils.clickWithWait(this.informationTab);
            } catch {
                // Fallback click for cases where transient overlays intercept pointer events.
                await browser.execute((el: any) => el && el.click(), this.informationTab);
            }
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1500);
        }

        console.log("Capturing inspection ID from detail page header before delete...");
        const { id } = await utils.getEntityNameAndId();
        const idText = (id || "").trim();
        if (!idText.startsWith("INSP.")) {
            throw new Error(`Could not capture inspection ID (expected 'INSP.<n>') from detail page header. Got: '${idText}'.`);
        }
        AssetInspectionListView.capturedInspectionId = idText;
        console.log(`Captured inspection ID: '${idText}'.`);

        console.log("Clicking 'Delete' button on inspection detail page...");
        await this.deleteBtn.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.deleteBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Waiting for confirmation dialog 'Yes'...");
        await browser.waitUntil(async () => {
            return (await this.deleteConfirmYesBtn.isDisplayed().catch(() => false))
                && (await this.deleteConfirmYesBtn.isClickable().catch(() => false));
        }, { timeout: 30000, interval: 500, timeoutMsg: "Delete confirmation 'Yes' button did not appear." });
        await utils.clickWithWait(this.deleteConfirmYesBtn);
        await utils.waitForBusyIndicatorToDisappear();

        console.log("Clicking success popup 'OK'...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Inspection deletion confirmed. Waiting for auto-redirect to list view...");
        // SAP auto-redirects from the deleted inspection detail page back to the list view.
        // verifyInspectionDeleted will assert that we land on the list and the deleted inspection
        // is no longer present.
        await browser.pause(2000);
    }
}

export default new AssetInspectionDetailView();

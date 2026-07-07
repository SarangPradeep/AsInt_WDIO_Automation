import { AssertionError } from 'node:assert';
import utils from "utils/utils";
import CMLListView from "../cmls/cmls.listview.page";
import CMLDetailView from "../cmls/cmls.detailview.page";

class AssetInspectionDetailView {

    private get informationTab() { return $("//button[.//bdi[normalize-space()='Information']]"); }
    private get cmlTab() { return $("//button[.//bdi[normalize-space()='CML']]"); }
    private get backgroundSection() { return $("//div[text()='Background Information']/ancestor::section[1]"); }
    private get rolesSection() { return $("//div[text()='Roles']/ancestor::section[1]"); }
    private get backgroundEditBtn() { return $("//div[text()='Background Information']/following::button[.//text()='Edit'][1]"); }
    private get rolesEditBtn() { return $("//div[text()='Roles']/following::button[.//text()='Edit'][1]"); }
    private get backgroundSaveBtn() { return $("//div[text()='Background Information']/following::button[.//text()='Save'][1]"); }
    private get rolesSaveBtn() { return $("//div[text()='Roles']/following::button[.//text()='Save'][1]"); }
    private get addCmlBtn() { return $("//button[.//bdi[normalize-space()='Add CML'] or .//text()[normalize-space()='Add CML']]"); }
    private get addCmlDialog() { return $("//div[@role='dialog'][.//span[normalize-space()='Add CML']]"); }
    private get addCmlDialogAddBtn() { return $("//div[@role='dialog'][.//span[normalize-space()='Add CML']]//button[.//text()='Add' or .//bdi[text()='Add']]"); }
    private get cmlEditBtn() { return $("//button[.//bdi[normalize-space()='Add CML'] or .//text()[normalize-space()='Add CML']]/following::button[.//bdi[normalize-space()='Edit'] or .//text()[normalize-space()='Edit']][1]"); }
    private get calculateBtn() { return $("//button[.//bdi[normalize-space()='Calculate'] or .//text()[normalize-space()='Calculate']]"); }
    private get cmlSaveBtn() { return $("//button[.//bdi[normalize-space()='Save'] or .//text()[normalize-space()='Save']]"); }
    private get confirmYesBtn() { return $("//div[@role='dialog']//button[.//bdi[normalize-space()='Yes'] or .//text()[normalize-space()='Yes']]"); }
    private get confirmOkBtn() { return $("//div[@role='dialog']//button[.//bdi[normalize-space()='OK'] or .//text()[normalize-space()='OK']]"); }

    public averageReading: string = "";

    private labelInput(label: string) {
        return $(`//label[.//text()=${utils.xpathString(label)}]/following::input[1]`);
    }

    private async setLabelInputIfPresent(label: string, value: string): Promise<void> {
        const input = this.labelInput(label);
        if (await input.isDisplayed().catch(() => false)) {
            await utils.setValueWithWait(input, value);
            console.log(`'${label}' set to '${value}'.`);
        } else {
            console.log(`'${label}' input not visible — skipped.`);
        }
    }

    private async fillBackgroundFields(): Promise<void> {
        const inspectionDate = utils.formatDatePlus(15);
        await this.setLabelInputIfPresent("Date of Inspection", inspectionDate);

        const bgFieldValues: Record<string, string> = {
            "Calibration Block Thickness Range": "1.0 - 2.0 in",
            "Test Unit-Serial Number": "TU-SN-AUTO-001",
            "Test Unit - Manufacturer": "Automation Manufacturer",
            "Test Unit - Model Number": "TU-MODEL-AUTO-001",
            "Transducer Serial Number": "TR-SN-AUTO-001",
            "Transducer - Frequency (MHz)": "5",
            "Transducer Diameter": "0.5",
            "Calibration Block-Serial Number": "CB-SN-AUTO-001",
            "Calibration Block-Material": "Carbon Steel"
        };
        for (const [label, value] of Object.entries(bgFieldValues)) {
            await this.setLabelInputIfPresent(label, value);
        }
    }

    private async fillRoleFields(): Promise<void> {
        const roleLabels = [
            "Approver",
            "Maintenance Technician",
            "Operator",
            "Maintenance Planner",
            "Moderator",
            "Facilitator",
            "Subject-Matter Expert",
            "Maintenance Engineer",
            "Requester",
            "Reliability Engineer"
        ];
        for (const label of roleLabels) {
            const input = this.labelInput(label);
            if (!(await input.isDisplayed().catch(() => false))) {
                console.log(`Role '${label}' input not visible — skipped.`);
                continue;
            }
            await utils.clickWithWait(input);
            try { await input.clearValue(); } catch { /* some role inputs may be readonly comboboxes */ }
            await input.setValue("qa automation");
            await browser.keys("Enter");
            await browser.keys("Tab");
            console.log(`Role '${label}' set to qa automation`);
        }
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
                throw new AssertionError({ message: `Add CML dialog level-2 node text '${level2Text}' does not match selected equipment '${equipmentName}'.` });
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
            throw new AssertionError({ message: "Cannot locate readings row: CMLListView.cmlName is empty." });
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
}

export default new AssetInspectionDetailView();

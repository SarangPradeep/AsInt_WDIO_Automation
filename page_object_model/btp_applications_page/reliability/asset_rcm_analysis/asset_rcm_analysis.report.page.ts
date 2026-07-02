import { $, $$, browser } from '@wdio/globals';
import utils from '../../../../utils/utils';
import assetRCMList from './asset_rcm_analysis.listview.page';

interface AssessmentRow {
    assessment: string;
    technicalObject: string;
    status: string;
    archiveStatus: string;
    createdOnBy: string;
    modifiedOnBy: string;
    technicalReviewCompleted?: string;
    templateIdentifier?: string;
    workflowApprovedOnBy?: string;
    workflowLevel?: string;
    workflowRequestedOnBy?: string;
    workflowStatus?: string;
    workflowType?: string;
}

class AssetRCMReportPage {

    public targetTechnicalObject: string = "10000102";
    public capturedRows: AssessmentRow[] = [];
    public capturedRowCount: number = 0;
    public headerAssessmentCount: number = 0;
    public totalTechnicalObjects: number = 0;
    public exportedFilePath: string = "";
    public addedFields: string[] = [];
    public extendedCapture: boolean = false;
    public secondExportedFilePath: string = "";

    private get rcmIframe() { return $('iframe[data-help-id="application-rcm-manage"]'); }
    private get adaptFilterBtn() { return $("//bdi[contains(text(),'Adapt Filters')]/ancestor::button"); }
    private get adaptFiltersDialog() {
        return $("//div[@role='dialog'][.//span[starts-with(normalize-space(),'Adapt Filters')]]");
    }
    private get technicalObjectFilterCheckbox() {
        return $("//div[@role='dialog'][.//span[starts-with(normalize-space(),'Adapt Filters')]]//tr[@role='row'][.//bdi[normalize-space()='Technical Object']]//div[@role='checkbox']");
    }
    private get dialogOkBtn() {
        return $("//div[@role='dialog'][.//span[starts-with(normalize-space(),'Adapt Filters')]]//footer//button[.//bdi[normalize-space()='OK']]");
    }
    private get technicalObjectInput() { return $("//label[.//bdi[normalize-space()='Technical Object']]/following::input[1]"); }
    private get goBtn() { return $("//button[.//bdi[normalize-space()='Go']]"); }
    private get exportToExcelBtn() { return $('//button[@aria-label="Export to Excel"]'); }
    private get assessmentsHeader() { return $("//h2//span[contains(normalize-space(),'Assessments')]"); }
    private get settingsBtn() { return $("//button[@aria-label='Settings' and @title='Settings']"); }
    private get viewSettingsDialog() {
        return $("//div[@role='dialog'][.//h1//*[normalize-space()='View Settings']]");
    }
    private get viewSettingsOkBtn() {
        return $("//div[@role='dialog'][.//h1//*[normalize-space()='View Settings']]//footer//button[.//bdi[normalize-space()='OK']]");
    }

    public async navigateToRCM(): Promise<void> {
        console.log("Step 1: Opening the Asset RCM Analysis application...");
        await assetRCMList.navigateToAssetRCM();
        await utils.switchToIframe(this.rcmIframe);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Asset RCM Analysis list view is now visible.");
    }

    public async addTechnicalObjectAdaptFilter(): Promise<void> {
        console.log("Step 2: Opening 'Adapt Filters' to add the 'Technical Object' filter...");
        await utils.clickWithWait(this.adaptFilterBtn);
        await browser.pause(3000);
        await this.adaptFiltersDialog.waitForDisplayed({ timeout: 30000 });

        const checkbox = this.technicalObjectFilterCheckbox;
        await checkbox.waitForExist({ timeout: 30000 });
        const state = await checkbox.getAttribute("aria-checked");
        if (state !== "true") {
            console.log("  -> Ticking the 'Technical Object' checkbox.");
            try {
                await utils.clickWithWait(checkbox);
            } catch {
                await browser.execute((el) => (el as HTMLElement).click(), checkbox);
            }
        } else {
            console.log("  -> 'Technical Object' was already selected.");
        }

        await browser.pause(500);
        await utils.clickWithWait(this.dialogOkBtn);
        await browser.pause(3000);
        await utils.waitForBusyIndicatorToDisappear();
        console.log("'Technical Object' filter is now visible on the filter bar.");
    }

    public async searchByTechnicalObject(value: string = this.targetTechnicalObject): Promise<void> {
        this.targetTechnicalObject = value;
        console.log(`Step 3: Searching for Technical Object '${value}'...`);
        const input = this.technicalObjectInput;
        await input.waitForDisplayed({ timeout: 30000 });
        await input.click();
        await input.clearValue();
        await input.addValue(value);
        await browser.pause(500);
        await utils.clickWithWait(this.goBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        console.log(`Search completed for Technical Object '${value}'.`);
    }

    public async captureAssessmentRows(): Promise<void> {
        console.log("Step 4: Reading all assessment rows from the list view...");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        await this.assessmentsHeader.waitForDisplayed({ timeout: 30000 });
        const headerText = ((await this.assessmentsHeader.getText()) || "").trim();
        const headerMatch = headerText.match(/\((\d+)\)/);
        this.headerAssessmentCount = headerMatch ? parseInt(headerMatch[1], 10) : 0;
        console.log(`Page header says '${headerText}' (expecting ${this.headerAssessmentCount} assessment(s)).`);

        const rowLocator = "//table[@role='grid' and @aria-roledescription='Responsive Table']//tr[@role='row' and @aria-rowindex>='2']";
        const rows = await $$(rowLocator);
        const rowsArr = Array.from(rows);
        console.log(`Found ${rowsArr.length} assessment row(s) in the table.`);

        this.capturedRows = [];
        this.totalTechnicalObjects = 0;

        for (let i = 0; i < rowsArr.length; i++) {
            const row = rowsArr[i];

            const getCell = async (colIndex: number): Promise<string> => {
                const cell = await row.$(`.//td[@aria-colindex='${colIndex}']`);
                if (!(await cell.isExisting())) return "";
                const txt = ((await cell.getText()) || "").replace(/\s+/g, " ").trim();
                return txt;
            };

            const assessment = await getCell(2);
            const technicalObject = await getCell(3);
            const status = await getCell(4);
            const archiveStatus = await getCell(5);
            const createdOnBy = await getCell(6);
            const modifiedOnBy = await getCell(7);

            const objMatch = technicalObject.match(/(\d+)\s*Object/i);
            const objCount = objMatch ? parseInt(objMatch[1], 10) : 0;
            this.totalTechnicalObjects += objCount;

            const data: AssessmentRow = {
                assessment,
                technicalObject,
                status,
                archiveStatus,
                createdOnBy,
                modifiedOnBy,
            };

            if (this.extendedCapture) {
                data.technicalReviewCompleted = await getCell(8);
                data.templateIdentifier = await getCell(9);
                data.workflowApprovedOnBy = await getCell(10);
                data.workflowLevel = await getCell(11);

                const rowId = (await row.getAttribute("id")) || "";
                if (rowId) {
                    const popinRow = await $(`//tr[@data-sap-ui-related='${rowId}']`);
                    if (await popinRow.isExisting()) {
                        const popinText = ((await popinRow.getText()) || "").replace(/\s+/g, " ").trim();
                        const extractAfter = (label: string): string => {
                            const re = new RegExp(`${label}\\s*:?[\\s]*([^|\\n\\r]+?)(?=\\s*(?:Workflow\\s+(?:Requested\\s+On\\s*/\\s*By|Status|Type)|$))`, "i");
                            const m = popinText.match(re);
                            return m ? m[1].trim() : "";
                        };
                        data.workflowRequestedOnBy = extractAfter("Workflow Requested On / By");
                        data.workflowStatus = extractAfter("Workflow Status");
                        data.workflowType = extractAfter("Workflow Type");
                    }
                }
            }

            this.capturedRows.push(data);
            console.log(`  Row ${i + 1} captured -> ${assessment} | ${technicalObject} | Status: ${status} (${objCount} technical object(s))`);
        }

        this.capturedRowCount = this.capturedRows.length;
        console.log(`Summary: captured ${this.capturedRowCount} assessment(s) covering ${this.totalTechnicalObjects} technical object(s) in total.`);

        if (this.capturedRowCount === 0) {
            throw new Error(`No assessment rows found for Technical Object '${this.targetTechnicalObject}'.`);
        }
        if (this.headerAssessmentCount > 0 && this.headerAssessmentCount !== this.capturedRowCount) {
            throw new Error(
                `Captured row count (${this.capturedRowCount}) does not match header Assessments count (${this.headerAssessmentCount}).`
            );
        }
    }

    public async clickExportToExcelAndDownload(): Promise<string> {
        console.log("Step 5: Exporting the list view to Excel...");
        console.log("  -> Clearing the downloads folder before export.");
        await utils.cleanDownloads();

        console.log("  -> Clicking the 'Export to Excel' button.");
        await utils.clickWithWait(this.exportToExcelBtn);

        try {
            const dialogExport = $("//div[@role='dialog']//footer//button[.//bdi[normalize-space()='Export']]");
            if (await dialogExport.isExisting() && await dialogExport.isDisplayed()) {
                console.log("  -> Confirming export in the dialog.");
                await utils.clickWithWait(dialogExport);
            }
        } catch (e) {
            console.log(`  -> No export confirmation dialog appeared (${(e as Error).message}).`);
        }

        console.log("  -> Waiting for the .xlsx file to finish downloading...");
        const filePath = await utils.waitForDownload(".xlsx");
        this.exportedFilePath = filePath;
        console.log(`Excel report downloaded successfully: ${filePath}`);
        return filePath;
    }

    private parseAssessment(text: string): { displayId: string; description: string } {
        const t = (text || "").replace(/\s+/g, " ").trim();
        const m = t.match(/^(RCM\.[A-Za-z0-9._-]+)\s*(.*)$/i);
        if (m) {
            return { displayId: m[1].trim(), description: (m[2] || "").trim() };
        }
        return { displayId: t.split(" ")[0] || "", description: "" };
    }

    private parseOnBy(text: string): { on: string; by: string } {
        const t = (text || "").replace(/\s+/g, " ").trim();
        const emailMatch = t.match(/\S+@\S+/);
        if (!emailMatch) {
            return { on: t, by: "" };
        }
        const by = emailMatch[0].trim();
        const on = t.replace(by, "").trim();
        return { on, by };
    }

    private getRowField(row: Record<string, string>, candidates: string[]): string {
        const keys = Object.keys(row);
        let value = "";
        for (const cand of candidates) {
            const exact = keys.find(k => k.trim().toLowerCase() === cand.trim().toLowerCase());
            if (exact) { value = (row[exact] ?? "").toString().trim(); break; }
        }
        if (!value) {
            for (const cand of candidates) {
                const partial = keys.find(k => k.trim().toLowerCase().includes(cand.trim().toLowerCase()));
                if (partial) { value = (row[partial] ?? "").toString().trim(); break; }
            }
        }
        return value;
    }

    private normalizeDate(s: string): string {
        return (s || "").toString().replace(/\s+/g, " ").replace(/,/g, "").trim().toLowerCase();
    }

    public async extractAndVerifyExcelReport(): Promise<void> {
        console.log("Step 6: Verifying the downloaded Excel report against the captured UI data...");
        if (!this.exportedFilePath) {
            throw new Error("No exported file path stored. Run clickExportToExcelAndDownload() first.");
        }

        console.log(`  -> Reading Excel file: ${this.exportedFilePath}`);
        const rows = await utils.extractRowsFromXlsx(this.exportedFilePath);
        console.log(`  -> Excel contains ${rows.length} data row(s).`);

        if (rows.length > 0) {
            const cols = Object.keys(rows[0]);
            console.log(`  -> Excel has ${cols.length} column(s): ${cols.join(" | ")}`);
            rows.forEach((r, i) => console.log(`     Excel Row ${i + 1}: ${JSON.stringify(r)}`));
        }

        const passed: string[] = [];
        const failed: string[] = [];

        const totalCheck = `Excel row count (${rows.length}) equals total technical objects (${this.totalTechnicalObjects})`;
        if (rows.length === this.totalTechnicalObjects) {
            passed.push(totalCheck);
        } else {
            failed.push(totalCheck);
        }

        const assessmentColCandidates = ["Assessment", "Display Id", "Display ID", "RCM", "ID"];
        const techObjColCandidates = ["Technical Object", "Object", "TechnicalObject"];
        const statusColCandidates = ["Status"];
        const archiveColCandidates = ["Archive Status", "Archive"];
        const createdOnCandidates = ["Created On", "CreatedOn", "Creation Date"];
        const createdByCandidates = ["Created By", "CreatedBy", "Creator"];
        const modifiedOnCandidates = ["Modified On", "Changed On", "Last Modified", "ChangedOn"];
        const modifiedByCandidates = ["Modified By", "Changed By", "ChangedBy", "Last Modified By"];

        for (const captured of this.capturedRows) {
            const { displayId, description } = this.parseAssessment(captured.assessment);
            const { on: createdOn, by: createdBy } = this.parseOnBy(captured.createdOnBy);
            const { on: modifiedOn, by: modifiedBy } = this.parseOnBy(captured.modifiedOnBy);
            const objCountMatch = captured.technicalObject.match(/(\d+)\s*Object/i);
            const expectedObjCount = objCountMatch ? parseInt(objCountMatch[1], 10) : 0;

            console.log(`\n--- Checking assessment '${displayId}' (expecting ${expectedObjCount} row(s) in Excel) ---`);

            const matching = rows.filter(r => {
                const aVal = this.getRowField(r, assessmentColCandidates);
                return aVal && aVal.toLowerCase().includes(displayId.toLowerCase());
            });

            const countCheck = `Assessment '${displayId}': Excel rows (${matching.length}) match technical object count (${expectedObjCount})`;
            if (matching.length === expectedObjCount) {
                passed.push(countCheck);
            } else {
                failed.push(countCheck);
            }

            if (matching.length === 0) {
                failed.push(`Assessment '${displayId}': not found in Excel`);
                continue;
            }

            const sample = matching[0];

            const statusVal = this.getRowField(sample, statusColCandidates);
            const statusCheck = `Assessment '${displayId}': Status '${captured.status}' present in Excel ('${statusVal}')`;
            if (statusVal && statusVal.toLowerCase().includes(captured.status.toLowerCase())) {
                passed.push(statusCheck);
            } else {
                failed.push(statusCheck);
            }

            const archiveVal = this.getRowField(sample, archiveColCandidates);
            const expectedArchive = (captured.archiveStatus || "").trim();
            const archiveCheck = `Assessment '${displayId}': Archive Status matches Excel ('${archiveVal}')`;
            if (expectedArchive === "" || archiveVal.toLowerCase().includes(expectedArchive.toLowerCase())) {
                passed.push(archiveCheck);
            } else {
                failed.push(archiveCheck);
            }

            const excelCreatedOn = this.getRowField(sample, createdOnCandidates);
            const createdOnCheck = `Assessment '${displayId}': Created On '${createdOn}' present in Excel ('${excelCreatedOn}')`;
            if (this.normalizeDate(excelCreatedOn).includes(this.normalizeDate(createdOn)) ||
                this.normalizeDate(createdOn).includes(this.normalizeDate(excelCreatedOn))) {
                passed.push(createdOnCheck);
            } else {
                failed.push(createdOnCheck);
            }

            const excelCreatedBy = this.getRowField(sample, createdByCandidates);
            const createdByCheck = `Assessment '${displayId}': Created By '${createdBy}' present in Excel ('${excelCreatedBy}')`;
            if (excelCreatedBy && createdBy && excelCreatedBy.toLowerCase().includes(createdBy.toLowerCase())) {
                passed.push(createdByCheck);
            } else {
                failed.push(createdByCheck);
            }

            const excelModifiedOn = this.getRowField(sample, modifiedOnCandidates);
            const modifiedOnCheck = `Assessment '${displayId}': Modified On '${modifiedOn}' present in Excel ('${excelModifiedOn}')`;
            if (this.normalizeDate(excelModifiedOn).includes(this.normalizeDate(modifiedOn)) ||
                this.normalizeDate(modifiedOn).includes(this.normalizeDate(excelModifiedOn))) {
                passed.push(modifiedOnCheck);
            } else {
                failed.push(modifiedOnCheck);
            }

            const excelModifiedBy = this.getRowField(sample, modifiedByCandidates);
            const modifiedByCheck = `Assessment '${displayId}': Modified By '${modifiedBy}' present in Excel ('${excelModifiedBy}')`;
            if (excelModifiedBy && modifiedBy && excelModifiedBy.toLowerCase().includes(modifiedBy.toLowerCase())) {
                passed.push(modifiedByCheck);
            } else {
                failed.push(modifiedByCheck);
            }

            const techObjectsInExcel = matching.map(r => this.getRowField(r, techObjColCandidates));
            const uniqueTechObjects = new Set(techObjectsInExcel.filter(v => v && v.length > 0));
            const uniqueCheck = `Assessment '${displayId}': unique Technical Objects in Excel (${uniqueTechObjects.size}) equals expected (${expectedObjCount})`;
            if (uniqueTechObjects.size === expectedObjCount) {
                passed.push(uniqueCheck);
            } else {
                failed.push(uniqueCheck);
            }
            console.log(`  Technical Objects for '${displayId}' found in Excel: ${Array.from(uniqueTechObjects).join(", ")}`);
        }

        console.log("\n=================== EXCEL REPORT VERIFICATION SUMMARY ===================");
        console.log(`Total checks performed: ${passed.length + failed.length}`);
        console.log(`PASSED (${passed.length}):`);
        passed.forEach((c, i) => console.log(`   [PASS ${i + 1}] ${c}`));
        console.log(`FAILED (${failed.length}):`);
        failed.forEach((c, i) => console.log(`   [FAIL ${i + 1}] ${c}`));
        console.log("=========================================================================\n");

        if (failed.length > 0) {
            throw new Error(`Excel verification failed for ${failed.length} check(s). See log above for details.`);
        }
        console.log("All checks passed - the Excel report matches the UI data.");
    }

    public async addAllListViewFields(): Promise<void> {
        console.log("Step 7: Opening the 'Settings' dialog to add every available column to the list view...");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.settingsBtn);
        await this.viewSettingsDialog.waitForDisplayed({ timeout: 30000 });
        await browser.pause(1500);

        const rowsLocator = "//div[@role='dialog'][.//h1//*[normalize-space()='View Settings']]//tr[@role='row'][.//div[@role='checkbox']]";
        const rows = await $$(rowsLocator);
        const rowsArr = Array.from(rows);
        console.log(`  -> Settings dialog lists ${rowsArr.length} field(s).`);

        const added: string[] = [];
        const alreadySelected: string[] = [];

        for (const row of rowsArr) {
            const labelEl = await row.$(".//td[@role='gridcell']//bdi");
            const label = (await labelEl.isExisting())
                ? ((await labelEl.getText()) || "").trim()
                : "";
            const cb = await row.$(".//div[@role='checkbox']");
            if (!(await cb.isExisting())) continue;
            const checked = (await cb.getAttribute("aria-checked")) === "true";
            if (!checked) {
                try {
                    await cb.click();
                } catch {
                    await browser.execute((el) => (el as HTMLElement).click(), cb);
                }
                if (label) {
                    added.push(label);
                    console.log(`     + Added field: '${label}'`);
                }
                await browser.pause(150);
            } else if (label) {
                alreadySelected.push(label);
            }
        }

        console.log(`Newly added fields (${added.length}): ${added.join(" | ") || "(none)"}`);
        console.log(`Already-selected fields (${alreadySelected.length}): ${alreadySelected.join(" | ") || "(none)"}`);
        this.addedFields = added;

        await utils.clickWithWait(this.viewSettingsOkBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        console.log("Settings saved - the list view now shows all available columns.");
    }

    public async recaptureWithAllFields(): Promise<void> {
        console.log("Step 8: Re-reading all assessment rows now that the new columns are visible...");
        this.extendedCapture = true;
        await this.captureAssessmentRows();
        this.extendedCapture = false;
        console.log("Captured row details (with extended columns):");
        this.capturedRows.forEach((r, i) => console.log(`   Row ${i + 1}: ${JSON.stringify(r)}`));
    }

    public async reExportToExcel(): Promise<void> {
        console.log("Step 9: Exporting the updated list view to Excel again...");
        const filePath = await this.clickExportToExcelAndDownload();
        this.secondExportedFilePath = filePath;
        console.log(`Updated Excel report downloaded: ${filePath}`);
    }

    public async verifySecondExcelHasAddedFields(): Promise<void> {
        console.log("Step 10: Verifying the re-exported Excel contains the newly added columns and their values...");
        if (!this.secondExportedFilePath) {
            throw new Error("No second exported file path stored. Run reExportToExcel() first.");
        }

        console.log(`  -> Reading updated Excel file: ${this.secondExportedFilePath}`);
        const rows = await utils.extractRowsFromXlsx(this.secondExportedFilePath);
        console.log(`  -> Updated Excel contains ${rows.length} data row(s).`);

        if (rows.length > 0) {
            const cols = Object.keys(rows[0]);
            console.log(`  -> Updated Excel has ${cols.length} column(s): ${cols.join(" | ")}`);
            rows.forEach((r, i) => console.log(`     Excel Row ${i + 1}: ${JSON.stringify(r)}`));
        }

        const passed: string[] = [];
        const failed: string[] = [];

        const totalCheck = `Second Excel row count (${rows.length}) equals total technical objects (${this.totalTechnicalObjects})`;
        if (rows.length === this.totalTechnicalObjects) {
            passed.push(totalCheck);
        } else {
            failed.push(totalCheck);
        }

        const excelColumns = rows.length > 0 ? Object.keys(rows[0]).map(c => c.trim()) : [];
        for (const field of this.addedFields) {
            const present = excelColumns.some(c => c.toLowerCase().includes(field.toLowerCase()))
                || excelColumns.some(c => field.toLowerCase().includes(c.toLowerCase()));
            const check = `Added field '${field}' present as a column in Excel`;
            if (present) passed.push(check); else failed.push(check);
        }

        const assessmentColCandidates = ["Assessment", "Display Id", "Display ID", "RCM", "ID"];
        const techReviewCandidates = ["Technical Review Completed", "Technical Review"];
        const templateIdCandidates = ["Template Identifier", "Template Id", "Template"];
        const wfApprovedOnCandidates = ["Workflow Approved On", "Approved On"];
        const wfApprovedByCandidates = ["Workflow Approved By", "Approved By"];
        const wfLevelCandidates = ["Workflow Level", "Level"];
        const wfRequestedOnCandidates = ["Workflow Requested On", "Requested On"];
        const wfRequestedByCandidates = ["Workflow Requested By", "Requested By"];
        const wfStatusCandidates = ["Workflow Status"];
        const wfTypeCandidates = ["Workflow Type"];

        for (const captured of this.capturedRows) {
            const { displayId } = this.parseAssessment(captured.assessment);
            const matching = rows.filter(r => {
                const aVal = this.getRowField(r, assessmentColCandidates);
                return aVal && aVal.toLowerCase().includes(displayId.toLowerCase());
            });

            if (matching.length === 0) {
                failed.push(`Assessment '${displayId}': not found in second Excel`);
                continue;
            }

            const sample = matching[0];

            const checkText = (label: string, expected: string, candidates: string[]) => {
                if (!expected) return;
                const actual = this.getRowField(sample, candidates);
                const check = `Assessment '${displayId}': ${label} '${expected}' present in Excel ('${actual}')`;
                if (actual && actual.toLowerCase().includes(expected.toLowerCase())) {
                    passed.push(check);
                } else {
                    failed.push(check);
                }
            };

            const checkOnBy = (label: string, raw: string | undefined, onCands: string[], byCands: string[]) => {
                if (!raw) return;
                const { on, by } = this.parseOnBy(raw);
                if (on) {
                    const actualOn = this.getRowField(sample, onCands);
                    const c = `Assessment '${displayId}': ${label} On '${on}' present in Excel ('${actualOn}')`;
                    if (this.normalizeDate(actualOn).includes(this.normalizeDate(on)) ||
                        this.normalizeDate(on).includes(this.normalizeDate(actualOn))) {
                        passed.push(c);
                    } else {
                        failed.push(c);
                    }
                }
                if (by) {
                    const actualBy = this.getRowField(sample, byCands);
                    const c = `Assessment '${displayId}': ${label} By '${by}' present in Excel ('${actualBy}')`;
                    if (actualBy && actualBy.toLowerCase().includes(by.toLowerCase())) {
                        passed.push(c);
                    } else {
                        failed.push(c);
                    }
                }
            };

            checkText("Technical Review Completed", (captured.technicalReviewCompleted || "").trim(), techReviewCandidates);
            checkText("Template Identifier", (captured.templateIdentifier || "").trim(), templateIdCandidates);
            checkOnBy("Workflow Approved", captured.workflowApprovedOnBy, wfApprovedOnCandidates, wfApprovedByCandidates);
            checkText("Workflow Level", (captured.workflowLevel || "").trim(), wfLevelCandidates);
            checkOnBy("Workflow Requested", captured.workflowRequestedOnBy, wfRequestedOnCandidates, wfRequestedByCandidates);
            checkText("Workflow Status", (captured.workflowStatus || "").trim(), wfStatusCandidates);
            checkText("Workflow Type", (captured.workflowType || "").trim(), wfTypeCandidates);
        }

        console.log("\n=========== UPDATED EXCEL (EXTENDED FIELDS) VERIFICATION SUMMARY ===========");
        console.log(`Total checks performed: ${passed.length + failed.length}`);
        console.log(`PASSED (${passed.length}):`);
        passed.forEach((c, i) => console.log(`   [PASS ${i + 1}] ${c}`));
        console.log(`FAILED (${failed.length}):`);
        failed.forEach((c, i) => console.log(`   [FAIL ${i + 1}] ${c}`));
        console.log("=============================================================================\n");

        if (failed.length > 0) {
            throw new Error(`Updated Excel verification failed for ${failed.length} check(s). See log above for details.`);
        }
        console.log("All checks passed - the updated Excel contains every newly added column and value.");
    }
}

export default new AssetRCMReportPage();

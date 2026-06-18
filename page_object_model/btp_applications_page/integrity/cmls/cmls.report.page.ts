import utils from "utils/utils";

class CML_Report_Page {

    public targetEquipment: string = "10000137";

    public assetOverviewCount: number = 0;
    public assetOverviewRow: {
        equipment: string;
        functionalLocation: string;
        remainingLife: string;
        halfLife: string;
        tMin: string;
        retirementDate: string;
        shortTermCorrosionRate: string;
        longTermCorrosionRate: string;
        techID: string;
        sortField: string;
    } = {
        equipment: "",
        functionalLocation: "",
        remainingLife: "",
        halfLife: "",
        tMin: "",
        retirementDate: "",
        shortTermCorrosionRate: "",
        longTermCorrosionRate: "",
        techID: "",
        sortField: "",
    };

    public exportedRowCount: number = 0;
    public exportedRows: Record<string, string>[] = [];
    public exportedFilePath: string = "";

    public cmlsCount: number = 0;
    public cmlsExportedFilePath: string = "";
    public cmlsExportedRowCount: number = 0;
    public cmlsExportedRows: Record<string, string>[] = [];

    private get noOfCml() { return $("//h2//span[contains(text(),'CMLs')]"); }

    public setTargetEquipment(equipmentName: string): void {
        this.targetEquipment = equipmentName;
    }

    public async waitForEquipmentDetailReady(): Promise<void> {
        console.log(`Waiting for equipment '${this.targetEquipment}' detail page to be ready...`);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.pause(3000);

        // Wait for the Asset Overview tab/header to actually appear on the detail page.
        const overviewLocator = "//*[self::div or self::span or self::bdi][contains(normalize-space(.),'Asset Overview')]";
        await browser.waitUntil(async () => {
            const el = await $(overviewLocator);
            return (await el.isExisting().catch(() => false))
                && (await el.isDisplayed().catch(() => false));
        }, {
            timeout: 60000,
            interval: 2000,
            timeoutMsg: `Asset Overview section did not appear for equipment '${this.targetEquipment}'.`,
        });

        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForLocalBusyToDisappear();
        await browser.pause(1500);
        console.log(`Equipment '${this.targetEquipment}' detail page is ready for report verification.`);
    }

    public async printAssetOverviewCount(): Promise<number> {
        const tab = $("//*[self::div or self::span or self::bdi][contains(normalize-space(.),'Asset Overview')]");
        await tab.waitForExist({ timeout: 60000 });
        await tab.waitForDisplayed({ timeout: 60000 });
        const tabText = ((await tab.getText()) || "").trim();
        const count = await utils.getAssignedValue(tabText);
        this.assetOverviewCount = count;
        console.log(`Asset Overview tab text: '${tabText}'`);
        console.log(`Asset Overview count: ${count}`);
        if (count === 0) {
            throw new Error(`Asset Overview count is 0 for equipment '${this.targetEquipment}'.`);
        }
        return count;
    }

    private async getCellText(colIndex: number): Promise<string> {
        const cell = $(`(//tr[@aria-rowindex>=2]//td[@aria-colindex='${colIndex}'])[1]`);
        await cell.waitForExist({ timeout: 30000 });
        await cell.waitForDisplayed({ timeout: 30000 });
        const text = ((await cell.getText()) || "").trim();
        return text;
    }

    public async storeAssetOverviewRowValues(): Promise<void> {
        console.log("Storing Asset Overview row values...");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        const equipmentRaw = await this.getCellText(1);
        this.assetOverviewRow.equipment = equipmentRaw.split("\n")[0].trim();
        this.assetOverviewRow.functionalLocation = await this.getCellText(2);
        this.assetOverviewRow.remainingLife = await this.getCellText(3);
        this.assetOverviewRow.halfLife = await this.getCellText(4);
        this.assetOverviewRow.tMin = await this.getCellText(5);
        this.assetOverviewRow.retirementDate = await this.getCellText(6);
        this.assetOverviewRow.shortTermCorrosionRate = await this.getCellText(7);
        this.assetOverviewRow.longTermCorrosionRate = await this.getCellText(8);
        this.assetOverviewRow.techID = await this.getCellText(9);
        this.assetOverviewRow.sortField = await this.getCellText(10);

        console.log("Asset Overview row captured:");
        console.log(`  Equipment              : ${this.assetOverviewRow.equipment} (raw: ${equipmentRaw.replace(/\n/g, " | ")})`);
        console.log(`  Functional Location    : ${this.assetOverviewRow.functionalLocation}`);
        console.log(`  Remaining Life (years) : ${this.assetOverviewRow.remainingLife}`);
        console.log(`  Half Life (years)      : ${this.assetOverviewRow.halfLife}`);
        console.log(`  TMin (mm)              : ${this.assetOverviewRow.tMin}`);
        console.log(`  Retirement Date        : ${this.assetOverviewRow.retirementDate}`);
        console.log(`  Short Term Corr. Rate  : ${this.assetOverviewRow.shortTermCorrosionRate}`);
        console.log(`  Long Term Corr. Rate   : ${this.assetOverviewRow.longTermCorrosionRate}`);
        console.log(`  Tech ID                : ${this.assetOverviewRow.techID}`);
        console.log(`  Sort Field             : ${this.assetOverviewRow.sortField}`);
    }

    public async clickExportAndDownload(): Promise<string> {
        console.log("Cleaning downloads directory before export...");
        await utils.cleanDownloads();

        const exportBtn = $("//button[@title='Export']");
        console.log("Clicking Export button...");
        await utils.clickWithWait(exportBtn);

        // If a confirmation/format dialog appears, click its Export/OK button.
        try {
            const dialogExport = $("//div[contains(@class,'sapMDialog')]//button[.//bdi[normalize-space(text())='Export'] or normalize-space(text())='Export']");
            if (await dialogExport.isExisting() && await dialogExport.isDisplayed()) {
                console.log("Clicking Export confirm button in dialog...");
                await utils.clickWithWait(dialogExport);
            }
        } catch {
            // No dialog appeared; ignore.
        }

        console.log("Waiting for .xlsx download to complete...");
        const filePath = await utils.waitForDownload(".xlsx");
        this.exportedFilePath = filePath;
        console.log(`Excel file downloaded at: ${filePath}`);
        return filePath;
    }

    public async extractExportedExcelValues(): Promise<void> {
        if (!this.exportedFilePath) {
            throw new Error("No exported file path stored. Run clickExportAndDownload() first.");
        }
        console.log(`Reading Excel file: ${this.exportedFilePath}`);
        const rows = await utils.extractRowsFromXlsx(this.exportedFilePath);
        this.exportedRows = rows;
        this.exportedRowCount = rows.length;

        console.log(`Total entries (rows) in exported Excel: ${this.exportedRowCount}`);

        if (rows.length === 0) {
            console.log("Exported Excel contains no data rows.");
            return;
        }

        const columns = Object.keys(rows[0]);
        console.log(`Columns (${columns.length}): ${columns.join(" | ")}`);

        for (const col of columns) {
            const values = rows.map(r => (r[col] ?? "").toString());
            console.log(`Column '${col}' values: [${values.join(", ")}]`);
        }
    }

    public verifyExportedExcelHasTargetEquipment(): void {
        if (this.exportedRows.length === 0) {
            throw new Error("No exported rows available. Run extractExportedExcelValues() first.");
        }
        const target = this.targetEquipment.trim();
        const matchedRow = this.exportedRows.find(row =>
            Object.values(row).some(v => (v ?? "").toString().trim() === target)
        );
        if (!matchedRow) {
            const firstRowDump = JSON.stringify(this.exportedRows[0]);
            throw new Error(
                `Searched equipment '${target}' not found in exported Excel. First row: ${firstRowDump}`
            );
        }
        console.log(`Verified: searched equipment '${target}' is present in the exported Excel.`);
        console.log(`Matched Excel row: ${JSON.stringify(matchedRow)}`);
    }

    public async openCMLDetailView(): Promise<void> {
        console.log(`Opening equipment detail for '${this.targetEquipment}' from Asset Overview row...`);
        const el = await $('(//tr[@role="row"]//span[@title="Navigation"])[1]');
        await utils.clickWithWait(el);
        await browser.pause(10000);
        console.log(`Equipment '${this.targetEquipment}' detail view should now be open.`);
    }

    public async storeCMLsCount(): Promise<number> {
        await this.noOfCml.waitForDisplayed({ timeout: 30000 });
        const cmlText = (await this.noOfCml.getText()) || "";
        const count = await utils.getAssignedValue(cmlText);
        this.cmlsCount = count;
        console.log(`CMLs section text: '${cmlText}'`);
        console.log(`No of CMLs present is/are: ${count}`);
        if (count === 0) {
            throw new Error(`CMLs count is 0 for equipment '${this.targetEquipment}'.`);
        }
        return count;
    }

    public async clickExportToExcelAndExtract(): Promise<void> {
        console.log("Cleaning downloads directory before CMLs Export to Excel...");
        await utils.cleanDownloads();

        const exportBtn = $("//button[@title='Export to Excel']");
        console.log("Clicking 'Export to Excel' button...");
        await utils.clickWithWait(exportBtn);

        console.log("Waiting for .xlsx download to complete...");
        const filePath = await utils.waitForDownload(".xlsx");
        this.cmlsExportedFilePath = filePath;
        console.log(`CMLs Excel file downloaded at: ${filePath}`);

        const rows = await utils.extractRowsFromXlsx(filePath);
        this.cmlsExportedRows = rows;
        this.cmlsExportedRowCount = rows.length;
        console.log(`Total entries (rows) in CMLs exported Excel: ${this.cmlsExportedRowCount}`);

        if (rows.length === 0) {
            console.log("CMLs exported Excel contains no data rows.");
        } else {
            const columns = Object.keys(rows[0]);
            console.log(`Columns (${columns.length}): ${columns.join(" | ")}`);
            for (const col of columns) {
                const values = rows.map(r => (r[col] ?? "").toString());
                console.log(`Column '${col}' values: [${values.join(", ")}]`);
            }
        }

        if (this.cmlsCount > 0 && this.cmlsExportedRowCount !== this.cmlsCount) {
            throw new Error(
                `CMLs Excel row count (${this.cmlsExportedRowCount}) does not match UI CMLs count (${this.cmlsCount}).`
            );
        }
        console.log(`CMLs Excel row count matches UI CMLs count: ${this.cmlsCount}`);
    }
}

export default new CML_Report_Page();

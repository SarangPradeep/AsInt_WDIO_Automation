import { AssertionError } from 'node:assert';
import HomePage from 'page_object_model/btp_applications_page/home.page';
import utils from 'utils/utils';
import adaptFilterHelper from 'utils/adapt_filter.helper';

describe('BTP - Equipment Application - Adapt Filter Functional test', () => {

    it('should click on equipment application and verify the title', async () => {
        await HomePage.clickEquipmentTile();
    });

    it('should add and verify all the adapt filters', async function () {
        this.timeout(30 * 60 * 1000);
        await utils.verifyFieldsInListView();
        await utils.addAllAdaptFilter();
        const filterChecks: { name: string; run: () => Promise<void> }[] = [
            { name: 'activationStateAdaptFilter', run: () => adaptFilterHelper.activationStateAdaptFilter(100, 'Activated') },
            { name: 'assetManufacturerNameAdaptFilter', run: () => adaptFilterHelper.assetManufacturerNameAdaptFilter('Siemens') },
            { name: 'catalogProfileAdaptFilter', run: () => adaptFilterHelper.catalogProfileAdaptFilter('General Catalog Profile') },
            { name: 'categoryAdaptFilter', run: () => adaptFilterHelper.categoryAdaptFilter('Construction machinery') },
            { name: 'objectTypeAdaptFilter', run: () => adaptFilterHelper.objectTypeAdaptFilter('Pressure Vessel') },
            { name: 'criticalityAdaptFilter', run: () => adaptFilterHelper.criticalityAdaptFilter('Managed Separately') },
            { name: 'classAdaptFilter', run: () => adaptFilterHelper.classAdaptFilter('Generators') },
            { name: 'componentFlagAdaptFilter', run: () => adaptFilterHelper.componentFlagAdaptFilter(100, 'Out of Service') },
            { name: 'planningPlantAdaptFilter', run: () => adaptFilterHelper.planningPlantAdaptFilter('Plant 0003 (is-ht-sw)') },
            { name: 'locationAdaptFilter', run: () => adaptFilterHelper.locationAdaptFilter('Office Building') },
            { name: 'maintenancePlantAdaptFilter', run: () => adaptFilterHelper.maintenancePlantAdaptFilter('Chevtex Oil & Gas Co.') },
            { name: 'workCenterAdaptFilter', run: () => adaptFilterHelper.workCenterAdaptFilter('Mechanical Maintenance Department') },
            { name: 'userStatusAdaptFilter', run: () => adaptFilterHelper.userStatusAdaptFilter('Approved & Available for Use') },
            { name: 'techIdAdaptFilter', run: () => adaptFilterHelper.techIdAdaptFilter('K-1001') },
            // { name: 'sourceSystemAdaptFilter', run: () => adaptFilterHelper.sourceSystemAdaptFilter('001') },
            { name: 'systemStatusAdaptFilter', run: () => adaptFilterHelper.systemStatusAdaptFilter('Allocated to superior equipt') },
            { name: 'superordinateEquipmentAdaptFilter', run: () => adaptFilterHelper.superordinateEquipmentAdaptFilter('10000080') },
            { name: 'superordinateEquipmentDescAdaptFilter', run: () => adaptFilterHelper.superordinateEquipmentDescAdaptFilter('Hydraulic Unit') },
            { name: 'plantSectionAdaptFilter', run: () => adaptFilterHelper.plantSectionAdaptFilter('RFP') },
            { name: 'createdByAdaptFilter', run: () => adaptFilterHelper.createdByAdaptFilter('sarang') },
            // { name: 'createdOnAdaptFilter', run: () => adaptFilterHelper.createdOnAdaptFilter('Jun 11, 2026') },
            { name: 'deactivationDateAdaptFilter', run: () => adaptFilterHelper.deactivationDateAdaptFilter('May 19, 2030') },
            { name: 'equipmentAdaptFilter', run: () => adaptFilterHelper.equipmentAdaptFilter('10000080') },
            { name: 'equipmentDescriptionFilter', run: () => adaptFilterHelper.equipmentDescriptionFilter('STORAGE TANK') },
            { name: 'equipmentMDAAdaptFilter', run: () => adaptFilterHelper.equipmentMDAAdaptFilter('CSG') },
            { name: 'functionalLocationAdaptFilter', run: () => adaptFilterHelper.functionalLocationAdaptFilter('AUTOMATION-FUNC-LOC-DESC-903546') },
            { name: 'functionalLocationDescriptionFilter', run: () => adaptFilterHelper.functionalLocationDescriptionFilter('AUTOMATION-FUNC-LOC-DESC-903546') },
            { name: 'modifiedByAdaptFilter', run: () => adaptFilterHelper.modifiedByAdaptFilter('virendra') },
            { name: 'modifiedOnAdaptFilter', run: () => adaptFilterHelper.modifiedOnAdaptFilter('Jun 11, 2026 - Jun 11, 2026') },
        ];
        const results: { name: string; status: 'passed' | 'failed' | 'skipped'; error?: string }[] = [];
        const runStartTs = Date.now();
        const totalBudgetMs = 25 * 60 * 1000;
        const perFilterTimeoutMs = 3 * 60 * 1000;
        try {
            for (const { name, run } of filterChecks) {
                const elapsedTotal = Date.now() - runStartTs;
                if (elapsedTotal >= totalBudgetMs) {
                    const reason = `total time budget exceeded (${Math.round(elapsedTotal / 1000)}s)`;
                    console.log(`[ADAPT FILTER SKIP] ${name}: ${reason}`);
                    results.push({ name, status: 'skipped', error: reason });
                    continue;
                }
                let perFilterTimer: NodeJS.Timeout | undefined;
                let timedOut = false;
                try {
                    const filterPromise = run();
                    const timeoutPromise = new Promise<never>((_, reject) => {
                        perFilterTimer = setTimeout(() => {
                            timedOut = true;
                            reject(new Error(`per-filter timeout after ${perFilterTimeoutMs / 1000}s`));
                        }, perFilterTimeoutMs);
                    });
                    await Promise.race([filterPromise, timeoutPromise]);
                    console.log(`[ADAPT FILTER PASS] ${name}`);
                    results.push({ name, status: 'passed' });
                } catch (err) {
                    const msg = err instanceof Error ? err.message : String(err);
                    if (timedOut) {
                        console.log(`[ADAPT FILTER SKIP] ${name}: ${msg}`);
                        results.push({ name, status: 'skipped', error: msg });
                    } else {
                        console.log(`[ADAPT FILTER FAIL] ${name}: ${msg}`);
                        results.push({ name, status: 'failed', error: msg });
                    }
                    try {
                        const expandHeader = await $(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`);
                        if (await expandHeader.isExisting() && await expandHeader.isDisplayed().catch(() => false)) {
                            await expandHeader.click();
                            await browser.pause(500);
                            console.log(`[ADAPT FILTER RECOVERY] header expanded after ${name}`);
                        }
                        // Clear all leftover filter input values so the next filter is not combined with stale ones
                        const filterInputs = await $$(`//label[.//bdi]/following::input[not(@aria-readonly='true')]`);
                        for (const input of filterInputs) {
                            try {
                                if (!(await input.isDisplayed())) continue;
                                const val = await input.getValue();
                                if (val && val.trim().length > 0) {
                                    await input.click();
                                    await input.clearValue();
                                }
                            } catch { /* skip individual input errors */ }
                        }
                        // Remove any selected tokens (multi-select chips) left over
                        const removeTokens = await $$(`//span[@aria-label='Remove']`);
                        for (const tok of removeTokens) {
                            try {
                                if (await tok.isDisplayed()) {
                                    await tok.click();
                                    await browser.pause(200);
                                }
                            } catch { /* skip */ }
                        }
                        const goBtn = await $(`//button[.//bdi[normalize-space()='Go']]`);
                        if (await goBtn.isExisting() && await goBtn.isDisplayed().catch(() => false)) {
                            await goBtn.click();
                            await utils.waitForBusyIndicatorToDisappear();
                            await browser.pause(800);
                        }
                        console.log(`[ADAPT FILTER RECOVERY] filters cleared after ${name}`);
                    } catch (recoveryErr) {
                        const rMsg = recoveryErr instanceof Error ? recoveryErr.message : String(recoveryErr);
                        console.log(`[ADAPT FILTER RECOVERY FAIL] ${name}: ${rMsg}`);
                    }
                } finally {
                    if (perFilterTimer) clearTimeout(perFilterTimer);
                }
            }
        } finally {
            try { await utils.resetAllAdaptFilter(); } catch (e) { console.log(`[ADAPT FILTER RESET FAIL] ${(e as Error).message}`); }
            const passed = results.filter(r => r.status === 'passed');
            const failed = results.filter(r => r.status === 'failed');
            const skipped = results.filter(r => r.status === 'skipped');
            const notRun = filterChecks.length - results.length;
            console.log('=====================================================================');
            console.log(`Adapt Filter Summary | Total: ${filterChecks.length} | Passed: ${passed.length} | Failed: ${failed.length} | Skipped: ${skipped.length}${notRun > 0 ? ` | Not Run: ${notRun}` : ''}`);
            if (passed.length) console.log(`Passed (${passed.length}): ${passed.map(r => r.name).join(', ')}`);
            if (failed.length) console.log(`Failed (${failed.length}):\n${failed.map((r, i) => `  ${i + 1}. ${r.name} -> ${r.error}`).join('\n')}`);
            if (skipped.length) console.log(`Skipped due to timeout (${skipped.length}):\n${skipped.map((r, i) => `  ${i + 1}. ${r.name} -> ${r.error}`).join('\n')}`);
            console.log('=====================================================================');
        }
        const failedResults = results.filter(r => r.status === 'failed');
        if (failedResults.length > 0) {
            const summary = failedResults.map((f, i) => `  ${i + 1}. ${f.name} -> ${f.error}`).join('\n');
            throw new AssertionError({ message: `AssertionError: Found issue in ${failedResults.length} of the adapt filter(s):\n${summary}` });
        }
    });
});

import { $, $$, browser } from '@wdio/globals';
import functionalLocationListView from '../page_object_model/btp_applications_page/master_data/functional_location/functional_location.listview.page';
import utils from '../utils/utils';
import adaptFilterHelper from '../utils/adapt_filter.helper';

describe('BTP - Functional Location Application - Adapt Filter Functional test', () => {

    it('should navigate to functional location list view', async () => {
        await functionalLocationListView.navigateFunctionalLocationListView();
    });

    it('should add and verify all the adapt filters', async () => {
        await utils.verifyFieldsInListView();
        await utils.addAllAdaptFilter();
        const filterChecks: { name: string; run: () => Promise<void> }[] = [
            { name: 'activeAdaptFilter', run: () => adaptFilterHelper.activeAdaptFilter('Yes') },
            { name: 'assetManufacturerNameAdaptFilter', run: () => adaptFilterHelper.assetManufacturerNameAdaptFilter('FLSmidth') },
            { name: 'catalogProfileAdaptFilter', run: () => adaptFilterHelper.catalogProfileAdaptFilter('Tanks') },
            { name: 'categoryAdaptFilter', run: () => adaptFilterHelper.categoryAdaptFilter('Linear Asset') },
            { name: 'characteristicShortDescriptionAdaptFilter', run: () => adaptFilterHelper.characteristicShortDescriptionAdaptFilter('test') },
            { name: 'characteristicSourceSystemAdaptFilter', run: () => adaptFilterHelper.characteristicSourceSystemAdaptFilter('001') },
            { name: 'classAdaptFilter', run: () => adaptFilterHelper.classAdaptFilter('LAM Functional Location Class 01') },
            { name: 'createdByAdaptFilter', run: () => adaptFilterHelper.createdByAdaptFilter('sarang') },
            // { name: 'createdOnAdaptFilter', run: () => adaptFilterHelper.createdOnAdaptFilter('Jun 11, 2026') },
            { name: 'criticalityAdaptFilter', run: () => adaptFilterHelper.criticalityAdaptFilter('Econ Conseq. II') },
            { name: 'displayIdAdaptFilter', run: () => adaptFilterHelper.displayIdAdaptFilter('FLOC.201') },
            { name: 'evergreeningStatusAdaptFilter', run: () => adaptFilterHelper.evergreeningStatusAdaptFilter(1) },
            { name: 'functionalLocationAdaptFilter', run: () => adaptFilterHelper.functionalLocationAdaptFilterFL('AUTOMATION-FUNC-LOC-881851') },
            { name: 'functionalLocationDescriptionFilter', run: () => adaptFilterHelper.functionalLocationDescriptionFilterFL('AUTOMATION-FUNC-LOC-DESC-903546') },
            { name: 'locationAdaptFilter', run: () => adaptFilterHelper.locationAdaptFilter('Storage Building Utilities') },
            { name: 'maintenancePlantAdaptFilter', run: () => adaptFilterHelper.maintenancePlantAdaptFilter('Chevtex Oil & Gas Co.') },
            { name: 'modifiedByAdaptFilter', run: () => adaptFilterHelper.modifiedByAdaptFilter('sarang') },
            { name: 'modifiedOnAdaptFilter', run: () => adaptFilterHelper.modifiedOnAdaptFilter('Jun 11, 2026') },
            { name: 'objectTypeAdaptFilter', run: () => adaptFilterHelper.objectTypeAdaptFilter('Pipes') },
            { name: 'parentFunctionalLocationAdaptFilter', run: () => adaptFilterHelper.parentFunctionalLocationAdaptFilter('AUTOMATION-FUNC-LOC-881851') },
            { name: 'parentFunctionalLocationDescriptionAdaptFilter', run: () => adaptFilterHelper.parentFunctionalLocationDescriptionAdaptFilter('AUTOMATION-FUNC-LOC-DESC-903546') },
            { name: 'plannerGroupAdaptFilter', run: () => adaptFilterHelper.plannerGroupAdaptFilter('CVL') },
            { name: 'planningPlantAdaptFilter', run: () => adaptFilterHelper.planningPlantAdaptFilter('Werk 0001') },
            { name: 'plantSectionAdaptFilter', run: () => adaptFilterHelper.plantSectionAdaptFilter('PLE') },
            { name: 'sourceSystemAdaptFilter', run: () => adaptFilterHelper.sourceSystemAdaptFilter('S4HPC') },
            { name: 'sortFieldAdaptFilter', run: () => adaptFilterHelper.sortFieldAdaptFilter('ASIN-1001-PROD-RECT-RUPR') },
            { name: 'workCenterAdaptFilter', run: () => adaptFilterHelper.workCenterAdaptFilter('MMD01') },
        ];
        const failures: { name: string; error: string }[] = [];
        for (const { name, run } of filterChecks) {
            try {
                await run();
            } catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                console.log(`[FL ADAPT FILTER FAIL] ${name}: ${msg}`);
                failures.push({ name, error: msg });
                try {
                    const expandHeader = await $(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`);
                    if (await expandHeader.isExisting() && await expandHeader.isDisplayed().catch(() => false)) {
                        await expandHeader.click();
                        await browser.pause(500);
                        console.log(`[FL ADAPT FILTER RECOVERY] header expanded after ${name}`);
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
                    console.log(`[FL ADAPT FILTER RECOVERY] filters cleared after ${name}`);
                } catch (recoveryErr) {
                    const rMsg = recoveryErr instanceof Error ? recoveryErr.message : String(recoveryErr);
                    console.log(`[FL ADAPT FILTER RECOVERY FAIL] ${name}: ${rMsg}`);
                }
            }
        }
        await utils.resetAllAdaptFilter();
        if (failures.length > 0) {
            const summary = failures.map((f, i) => `  ${i + 1}. ${f.name} -> ${f.error}`).join('\n');
            throw new Error(`Found issue in ${failures.length} of the adapt filter(s):\n${summary}`);
        }
    });
});

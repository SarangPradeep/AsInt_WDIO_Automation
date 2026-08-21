import assetStrategyAnalysisForClassesPage from 'page_object_model/btp_applications_page/reliability/asset_strategy_analysis_for_classes/asset_strategy_analysis_for_classes.page';
import { fleetAssessmentTestData } from 'test_data/btp_applications/reliability/fleet_assessment.data';

const assessmentDescription = fleetAssessmentTestData.createMandatory.description;

describe('BTP - (Fleet) - Asset Strategy Analysis for Classes App - Flow 3 (Create & Delete without Baseline)', () => {

    it('should create a new assessment with all mandatory fields (without baseline)', async () => {
        await assetStrategyAnalysisForClassesPage.navigateToApp();
        await assetStrategyAnalysisForClassesPage.clickCreateButton();
        await assetStrategyAnalysisForClassesPage.fillCreateAssessmentForm({
            description: assessmentDescription,
            className: fleetAssessmentTestData.createMandatory.className,
            failureDataProfile: fleetAssessmentTestData.createMandatory.failureDataProfile
        });
        await assetStrategyAnalysisForClassesPage.clickDialogCreate();
        await assetStrategyAnalysisForClassesPage.confirmSuccessPopup();
    });

    it('should open the Assessment section and click Create Operating Context and Condition', async () => {
        await assetStrategyAnalysisForClassesPage.openAssessmentAndCreateOperatingContextAndCondition();
    });

    it('should add characteristics (incl. FLUID_CR), set their values, and create the OCC', async () => {
        await assetStrategyAnalysisForClassesPage.createOperatingContextAndConditionFlow(
            fleetAssessmentTestData.operatingContextAndConditionFlow2,
            { useBaseline: false }
        );
    });

    it('should click the "+" Add button on the newly created Operating Context and select "Assign Maintainable Items"', async () => {
        await assetStrategyAnalysisForClassesPage.clickOccAddButton(
            fleetAssessmentTestData.operatingContextAndConditionFlow2.name
        );
        await assetStrategyAnalysisForClassesPage.clickAssignMaintainableItemsMenuItem();
    });

    it('should select a maintainable item row and click Assign', async () => {
        await assetStrategyAnalysisForClassesPage.searchAndAssignFirstMaintainableItem(
            fleetAssessmentTestData.maintainableItemFlow2.searchText
        );
    });

    it('should expand the newly created Operating Context row in the Assessment Hierarchy', async () => {
        await assetStrategyAnalysisForClassesPage.expandAssessmentHierarchyRow();
    });

    it('should click the "+" Add button on the assigned maintainable item row', async () => {
        await assetStrategyAnalysisForClassesPage.clickAssessmentHierarchyRowAddButton(
            fleetAssessmentTestData.maintainableItemFlow2.searchText,
            1
        );
    });

    it('should select "Assign Failure Modes", search, tick the matching row and click Assign', async () => {
        await assetStrategyAnalysisForClassesPage.clickAssignFailureModesMenuItem();
        await assetStrategyAnalysisForClassesPage.searchAndAssignFailureMode(
            fleetAssessmentTestData.failureModeFlow2.searchText
        );
    });

    it('should expand the Inspection Ports row to reveal the assigned failure mode', async () => {
        await assetStrategyAnalysisForClassesPage.expandAssessmentHierarchyRow(1);
    });

    it('should click on the assigned failure mode (False alarms)', async () => {
        await assetStrategyAnalysisForClassesPage.clickAssessmentHierarchyRowByText(
            fleetAssessmentTestData.failureModeFlow2.searchText
        );
    });

    it('should add a note on the Failure Mode (False alarms) detail and confirm', async () => {
        await assetStrategyAnalysisForClassesPage.addNote(
            fleetAssessmentTestData.notesFlow3.failureMode
        );
    });

    it('should reopen the Failure Mode note and verify the saved text', async () => {
        await assetStrategyAnalysisForClassesPage.verifyNoteText(
            fleetAssessmentTestData.notesFlow3.failureMode
        );
    });

    it('should reopen the Failure Mode note, edit the text and click Close (no save)', async () => {
        await assetStrategyAnalysisForClassesPage.editNoteAndClose(
            fleetAssessmentTestData.notesFlow3.failureModeEditedUnsaved
        );
    });

    it('should reopen the Failure Mode note again and verify the unsaved edit was NOT persisted', async () => {
        await assetStrategyAnalysisForClassesPage.verifyNoteText(
            fleetAssessmentTestData.notesFlow3.failureMode
        );
    });

    it('should click "Assign" on the Failure Effect section, tick "Slow Down" and confirm', async () => {
        await assetStrategyAnalysisForClassesPage.assignSectionItemByText(
            'Failure Effect',
            fleetAssessmentTestData.failureEffectFlow3.itemText
        );
    });

    it('should click "Assign" on the Failure Mechanism section, tick "Loose Hub" and "Corrosion/Erosion" and confirm', async () => {
        await assetStrategyAnalysisForClassesPage.assignSectionItemByText(
            'Failure Mechanism',
            [...fleetAssessmentTestData.failureMechanismFlow3.itemTexts]
        );
    });

    it('should expand the Failure Mechanism section, tick "Loose Hub", click Remove and confirm', async () => {
        await assetStrategyAnalysisForClassesPage.removeSectionItemByText(
            'Failure Mechanism',
            fleetAssessmentTestData.failureMechanismRemoveFlow3.itemText
        );
    });

    it('should click "Assign" on the Causes section, tick "Misaligned" and "EROSION" and confirm', async () => {
        await assetStrategyAnalysisForClassesPage.assignSectionItemByText(
            'Causes',
            [...fleetAssessmentTestData.causesFlow3.itemTexts]
        );
    });

    it('should expand the Causes section, tick "EROSION", click Remove and confirm', async () => {
        await assetStrategyAnalysisForClassesPage.removeSectionItemByText(
            'Causes',
            fleetAssessmentTestData.causesRemoveFlow3.itemText
        );
    });

    it('should expand the Strategies section', async () => {
        await assetStrategyAnalysisForClassesPage.expandSection('Strategies');
    });

    it('should click "Create" on the Strategies section, fill the form and submit', async () => {
        await assetStrategyAnalysisForClassesPage.createStrategy({
            description: fleetAssessmentTestData.strategyFlow3.description,
            longDescription: fleetAssessmentTestData.strategyFlow3.longDescription,
            type: fleetAssessmentTestData.strategyFlow3.type,
            inspectionType: fleetAssessmentTestData.strategyFlow3.inspectionType,
            inspectionStage: fleetAssessmentTestData.strategyFlow3.inspectionStage,
            startDate: fleetAssessmentTestData.strategyFlow3.startDate,
            dueDate: fleetAssessmentTestData.strategyFlow3.dueDate
        });
    });

    it('should tick the created strategy, click "Edit & Update", update all fields, save and confirm', async () => {
        await assetStrategyAnalysisForClassesPage.editStrategy(
            fleetAssessmentTestData.strategyEditFlow3.currentDescription,
            {
                newDescription: fleetAssessmentTestData.strategyEditFlow3.newDescription,
                longDescription: fleetAssessmentTestData.strategyEditFlow3.longDescription,
                type: fleetAssessmentTestData.strategyEditFlow3.type,
                subtype: fleetAssessmentTestData.strategyEditFlow3.subtype,
                inspectionType: fleetAssessmentTestData.strategyEditFlow3.inspectionType,
                inspectionStage: fleetAssessmentTestData.strategyEditFlow3.inspectionStage,
                startDate: fleetAssessmentTestData.strategyEditFlow3.startDate,
                dueDate: fleetAssessmentTestData.strategyEditFlow3.dueDate
            }
        );
    });

    it('should verify the edited strategy row reflects the updated values', async () => {
        await assetStrategyAnalysisForClassesPage.verifyStrategyRow(
            fleetAssessmentTestData.strategyEditFlow3.newDescription,
            {
                longDescription: fleetAssessmentTestData.strategyEditFlow3.longDescription,
                type: fleetAssessmentTestData.strategyEditFlow3.type,
                subtype: fleetAssessmentTestData.strategyEditFlow3.subtype,
                startDate: fleetAssessmentTestData.strategyEditFlow3.startDate,
                dueDate: fleetAssessmentTestData.strategyEditFlow3.dueDate
            }
        );
    });

    it('should click "Create" on the Strategies section to add a strategy for deletion', async () => {
        await assetStrategyAnalysisForClassesPage.createStrategy({
            description: fleetAssessmentTestData.strategyDeleteFlow3.description,
            longDescription: fleetAssessmentTestData.strategyDeleteFlow3.longDescription,
            type: fleetAssessmentTestData.strategyDeleteFlow3.type,
            inspectionType: fleetAssessmentTestData.strategyDeleteFlow3.inspectionType,
            inspectionStage: fleetAssessmentTestData.strategyDeleteFlow3.inspectionStage,
            startDate: fleetAssessmentTestData.strategyDeleteFlow3.startDate,
            dueDate: fleetAssessmentTestData.strategyDeleteFlow3.dueDate
        });
    });

    it('should tick the new strategy, click Delete, confirm Yes and OK', async () => {
        await assetStrategyAnalysisForClassesPage.deleteStrategy(
            fleetAssessmentTestData.strategyDeleteFlow3.description
        );
    });

    it('should click on the Operating Context (TestOCC1)', async () => {
        await assetStrategyAnalysisForClassesPage.clickOperatingContextByName(
            fleetAssessmentTestData.operatingContextAndConditionFlow2.name
        );
    });

    it('should add a note on the Operating Context (TestOCC1) detail and confirm', async () => {
        await assetStrategyAnalysisForClassesPage.addNote(
            fleetAssessmentTestData.notesFlow3.operatingContext
        );
    });

    it('should reopen the TestOCC1 note and verify the saved text', async () => {
        await assetStrategyAnalysisForClassesPage.verifyNoteText(
            fleetAssessmentTestData.notesFlow3.operatingContext
        );
    });

    it('should reopen the TestOCC1 note, edit the text and click Close (no save)', async () => {
        await assetStrategyAnalysisForClassesPage.editNoteAndClose(
            fleetAssessmentTestData.notesFlow3.operatingContextEditedUnsaved
        );
    });

    it('should reopen the TestOCC1 note again and verify the unsaved edit was NOT persisted', async () => {
        await assetStrategyAnalysisForClassesPage.verifyNoteText(
            fleetAssessmentTestData.notesFlow3.operatingContext
        );
    });

    it('should click on the Maintainable Item (Inspection Ports) row', async () => {
        await assetStrategyAnalysisForClassesPage.clickAssessmentHierarchyRowByText(
            fleetAssessmentTestData.maintainableItemFlow2.searchText
        );
    });

    it('should add a note on the Maintainable Item (Inspection Ports) detail and confirm', async () => {
        await assetStrategyAnalysisForClassesPage.addNote(
            fleetAssessmentTestData.notesFlow3.maintainableItem
        );
    });

    it('should reopen the Inspection Ports note and verify the saved text', async () => {
        await assetStrategyAnalysisForClassesPage.verifyNoteText(
            fleetAssessmentTestData.notesFlow3.maintainableItem
        );
    });

    it('should reopen the Inspection Ports note, edit the text and click Close (no save)', async () => {
        await assetStrategyAnalysisForClassesPage.editNoteAndClose(
            fleetAssessmentTestData.notesFlow3.maintainableItemEditedUnsaved
        );
    });

    it('should reopen the Inspection Ports note again and verify the unsaved edit was NOT persisted', async () => {
        await assetStrategyAnalysisForClassesPage.verifyNoteText(
            fleetAssessmentTestData.notesFlow3.maintainableItem
        );
    });

    it('should click on the Operating Context (TestOCC1) again to return for verification', async () => {
        await assetStrategyAnalysisForClassesPage.clickOperatingContextByName(
            fleetAssessmentTestData.operatingContextAndConditionFlow2.name
        );
    });

    it('should expand the Strategies section under TestOCC1', async () => {
        await assetStrategyAnalysisForClassesPage.expandSection('Strategies');
    });

    it('should verify the edited strategy row (incl. Inspection Type) is shown under TestOCC1', async () => {
        await assetStrategyAnalysisForClassesPage.verifyStrategyRow(
            fleetAssessmentTestData.strategyEditFlow3.newDescription,
            {
                longDescription: fleetAssessmentTestData.strategyEditFlow3.longDescription,
                type: fleetAssessmentTestData.strategyEditFlow3.type,
                subtype: fleetAssessmentTestData.strategyEditFlow3.subtype,
                startDate: fleetAssessmentTestData.strategyEditFlow3.startDate,
                dueDate: fleetAssessmentTestData.strategyEditFlow3.dueDate,
                inspectionType: fleetAssessmentTestData.strategyEditFlow3.inspectionType
            }
        );
    });

    it('should click "Assign/Unassign Technical Object" → Assign → Equipment', async () => {
        await assetStrategyAnalysisForClassesPage.assignTechnicalObject('Equipment');
    });

    it('should tick the first equipment, click Confirm, OK, then close the column', async () => {
        await assetStrategyAnalysisForClassesPage.confirmFirstEquipmentAndCloseColumn();
    });

    it('should download the Summary Report PDF and verify it reflects the flow_3 assessment data', async () => {
        const occ = fleetAssessmentTestData.operatingContextAndConditionFlow2;

        const present: string[] = [
            assessmentDescription,
            fleetAssessmentTestData.createMandatory.className,
            occ.name,
            fleetAssessmentTestData.maintainableItemFlow2.searchText,
            fleetAssessmentTestData.failureModeFlow2.searchText,
            // Characteristic labels — flow_3 (re)uses operatingContextAndConditionFlow2.
            ...occ.characteristics
                .map(c => c.label as string | undefined)
                .filter((l): l is string => typeof l === 'string' && l.length > 0),
            // Edited strategy and its long description should appear in the report.
            fleetAssessmentTestData.strategyEditFlow3.newDescription,
            fleetAssessmentTestData.strategyEditFlow3.longDescription
        ];

        const absent: string[] = [
            // Strategy that was created then immediately deleted must not appear.
            // NOTE: if this fails it likely means the report still returns
            // deleted strategies — that is a product behavior to investigate,
            // not a test-framework issue.
            fleetAssessmentTestData.strategyDeleteFlow3.description,
            // (Intentionally NOT asserting the pre-edit strategy description
            // "Test Strategy - Automation" as absent — it is a strict prefix
            // of the edited description "Test Strategy - Automation (Edited)"
            // which must be present, so plain-text PDF extraction can't
            // distinguish the two.)
            // The OCC-level unsaved note edits must not have been persisted.
            fleetAssessmentTestData.notesFlow3.operatingContextEditedUnsaved,
            fleetAssessmentTestData.notesFlow3.maintainableItemEditedUnsaved,
            fleetAssessmentTestData.notesFlow3.failureModeEditedUnsaved
        ];

        // Section-scoped check: active strategies (with their long descriptions)
        // are expected to appear under "Recommendation N" blocks in the PDF —
        // that is the intended product behavior. The strategy that was created
        // then immediately deleted must not leak into that section.
        const sections = [
            {
                name: 'Recommendations',
                aliases: ['Recommendation'],
                mustContain: [
                    fleetAssessmentTestData.strategyEditFlow3.newDescription,
                    fleetAssessmentTestData.strategyEditFlow3.longDescription
                ],
                mustNotContain: [
                    fleetAssessmentTestData.strategyDeleteFlow3.description
                ]
            }
        ];

        await assetStrategyAnalysisForClassesPage.downloadAndVerifySummaryReport({ present, absent, sections });
    });


    it('should delete the assessment and verify it is removed', async () => {
        await assetStrategyAnalysisForClassesPage.deleteAssessment();
        await assetStrategyAnalysisForClassesPage.searchInListView(assessmentDescription);
        await assetStrategyAnalysisForClassesPage.verifyAssessmentDeleted(assessmentDescription);
    });

});

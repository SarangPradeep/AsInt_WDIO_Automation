import assetStrategyAnalysisForClassesPage from 'page_object_model/btp_applications_page/reliability/asset_strategy_analysis_for_classes/asset_strategy_analysis_for_classes.page';
import { fleetAssessmentTestData } from 'test_data/btp_applications/reliability/fleet_assessment.data';

const editedDescription = `${fleetAssessmentTestData.createMandatory.description} - Edited`;

describe('BTP - (Fleet) - Asset Strategy Analysis for Classes App - Flow 1 (Create, Edit, Operating Context & Summary Report Download) - Functional Test', () => {

    it('should create a new assessment with all mandatory fields', async () => {
        await assetStrategyAnalysisForClassesPage.navigateToApp();
        await assetStrategyAnalysisForClassesPage.clickCreateButton();
        await assetStrategyAnalysisForClassesPage.fillCreateAssessmentForm({
            description: fleetAssessmentTestData.createMandatory.description,
            className: fleetAssessmentTestData.createMandatory.className,
            failureDataProfile: fleetAssessmentTestData.createMandatory.failureDataProfile
        });
        await assetStrategyAnalysisForClassesPage.clickDialogCreate();
        await assetStrategyAnalysisForClassesPage.confirmSuccessPopup();
    });

    it('should edit the assessment description and save', async () => {
        await assetStrategyAnalysisForClassesPage.editAssessmentDescription(editedDescription, {
            longDescription: fleetAssessmentTestData.editAssessmentFlow1.longDescription,
            operatingContext: fleetAssessmentTestData.editAssessmentFlow1.operatingContext
        });
    });

    it('should edit the Planning Data and Organizational Data sections and save', async () => {
        await assetStrategyAnalysisForClassesPage.editPlanningAndOrganizationalData(
            fleetAssessmentTestData.planningData,
            fleetAssessmentTestData.organizationalData
        );
    });

    it('should add roles, assign the user, then unassign one role', async () => {
        await assetStrategyAnalysisForClassesPage.addRolesAndAssignUser(fleetAssessmentTestData.rolesAssignment);
        await assetStrategyAnalysisForClassesPage.unassignUserFromRoleAndSave(
            fleetAssessmentTestData.rolesUnassignment.role,
            fleetAssessmentTestData.rolesUnassignment.user
        );
    });

    it('should open the Assessment section and click Create Operating Context and Condition', async () => {
        await assetStrategyAnalysisForClassesPage.openAssessmentAndCreateOperatingContextAndCondition();
    });

    it('should add characteristics, set their values, create the OCC and use Baseline', async () => {
        await assetStrategyAnalysisForClassesPage.createOperatingContextAndConditionFlow(
            fleetAssessmentTestData.operatingContextAndCondition
        );
    });

    it('should download the Summary Report PDF and verify it contains the assessment data', async () => {
        const planning = fleetAssessmentTestData.planningData;
        const occ = fleetAssessmentTestData.operatingContextAndCondition;
        const toIso = (value: string): string => {
            const d = new Date(value);
            if (isNaN(d.getTime())) return value;
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };

        const present: string[] = [
            editedDescription,
            fleetAssessmentTestData.editAssessmentFlow1.longDescription,
            fleetAssessmentTestData.editAssessmentFlow1.operatingContext,
            fleetAssessmentTestData.createMandatory.className,
            toIso(planning.lastReviewDate),
            toIso(planning.nextReviewDate),
            toIso(planning.plannedReviewDate),
            toIso(planning.nextTADate),
            toIso(planning.secondTADate),
            fleetAssessmentTestData.rolesAssignment.user,
            ...fleetAssessmentTestData.rolesAssignment.roles.filter(
                r => r !== fleetAssessmentTestData.rolesUnassignment.role
            ),
            occ.name,
            ...occ.characteristics.flatMap(c => [c.label, c.value])
        ];

        const absent: string[] = [
            fleetAssessmentTestData.rolesUnassignment.role
        ];

        await assetStrategyAnalysisForClassesPage.downloadAndVerifySummaryReport({ present, absent });
    });

    it('should delete the edited assessment and verify it is removed', async () => {
        await assetStrategyAnalysisForClassesPage.deleteAssessment();
        await assetStrategyAnalysisForClassesPage.searchInListView(editedDescription);
        await assetStrategyAnalysisForClassesPage.verifyAssessmentDeleted(editedDescription);
    });

});


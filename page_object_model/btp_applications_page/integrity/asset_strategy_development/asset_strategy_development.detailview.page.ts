import utils from "utils/utils";
import ASDListView from "./asset_strategy_development.listview.page";
class asset_strategy_development_detailview_page {
    private get ASDIframe() { return $('iframe[data-help-id="application-assetstrategydevelopment-manage"]'); }
    private get genInfoTab() { return $("//bdi[text()='General Information']"); }
    private get analysisDetailTab() { return $("//bdi[text()='Analysis Detail']"); }
    private get riskMatrixTab() { return $("//bdi[text()='Risk Matrix']"); }
    private get cmlTab() { return $("//bdi[text()='CML']"); }
    private get riskAndInfoTab() { return $("//bdi[text()='Risk Information']"); }
    private get maintenanceAndServiceTab() { return $("//bdi[text()='Maintenance and Service']"); }
    private get attachmentTab() { return $("//bdi[text()='Attachments']"); }
    private get addRoleBtn() { return $("//button[.//text()='Add Role']"); }
    private get addRoleDialog() { return $("//header[.//text()='Add Role']/following-sibling::section"); }
    private get secondRoleCheckbox() { return $("//ul[@role='list']//li[@aria-posinset='2']//div[@role='checkbox']"); }
    private get addRoleOkBtn() { return $("//header[.//text()='Add Role']/following::button[.//text()='Ok']"); }
    private get maintenanceTechnicianRoleBtn() { return $("//bdi[.='Maintenance Technician']/ancestor::div[2]/following-sibling::div//span[@role='button']"); }
    private get selectUsersSearchInput() { return $("//header[.='Select Users']/following-sibling::section//input[@type='search']"); }
    private get qaAutomationUserCheckbox() { return $("//tr[.//span[.='qa automation']]//div[@role='checkbox']"); }
    private get selectUsersOkBtn() { return $("//header[.='Select Users']/following::button[.//text()='Ok']"); }
    private get saveBtnFooter() { return $("//bdi[text()='General Information']/following::bdi[text()='Save']"); }
    private get okBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }
    private get generalSelectionLink() { return $("//bdi[text()='General Selection:']/following::a[1]")}
    private get selectedCheckboxTexts() { return $$("//li[@role='treeitem']//div[@role='checkbox']/following::div[1]"); }
    private get selectAllToggle() { return $("//span[.='Select All / Deselect All']/preceding-sibling::div/ancestor::div[1]"); }
    private get saveButton() { return $("//button[.//bdi[.='Save']]"); }
    private get generalSelectionHeader() { return $("//h1[.='General Selection']"); }
    private get processExpandBtn() { return $("//div[text()='Process and Design Construction Data']/following::button[1]"); }
    private get equipmentTypeDrp() { return $("//bdi[.='Equipment Type']/ancestor::div[2]/following::span[1]"); }
    private get componentTypeInput() { return $("//bdi[.='Component Type']/ancestor::div[2]/following::input[1]"); }
    private get componentGeometryDrp() { return $("//bdi[.='Component Geometry']/ancestor::div[2]/following::span[1]"); }
    private get designPressureInput() { return $("//bdi[.='Design Pressure']/ancestor::div[2]/following::input[1]"); }
    private get designTemperatureInput() { return $("//bdi[.='Design Temperature']/ancestor::div[2]/following::input[1]"); }
    private get operatingPressureInput() { return $("//bdi[.='Operating Pressure']/ancestor::div[2]/following::input[1]"); }
    private get operatingTemperatureInput() { return $("(//bdi[.='Operating Temperature']/ancestor::div[2]/following::input[1])[1]"); }
    private get representativeFluidDrp() { return $("//bdi[.='Representative Fluid']/ancestor::div[2]/following::span[1]"); }
    private get initialFluidPhaseDrp() { return $("//bdi[.='Initial Fluid Phase']/ancestor::div[2]/following::span[1]"); }
    private get materialCodeDrp() { return $("//bdi[.='Material Code']/ancestor::div[2]/following::span[1]"); }
    private get materialCodeYearInput() { return $("//bdi[.='Material Code Year']/ancestor::div[2]/following::input[1]"); }
    private get materialSpecDrp() { return $("//bdi[.='Material Spec']/ancestor::div[2]/following::span[1]"); }
    private get materialGradeDrp() { return $("//bdi[.='Material Grade']/ancestor::div[2]/following::span[1]"); }
    private get weldJointEfficiencyInput() { return $("//bdi[.='Weld Joint Efficiency']/ancestor::div[2]/following::input[1]"); }
    private get originalThicknessInput() { return $("//bdi[.='Original Thickness']/ancestor::div[2]/following::input[1]"); }
    private get yieldStrengthOverrideInput() { return $("//bdi[.='Yield Strength Override']/ancestor::div[2]/following::input[1]"); }
    private get allowableStressOverrideInput() { return $("//bdi[.='Allowable Stress Override']/ancestor::div[2]/following::input[1]"); }
    private get tensileStrengthOverrideInput() { return $("//bdi[.='Tensile Strength Override']/ancestor::div[2]/following::input[1]"); }
    private get mixedToxicFluidDrp() { return $("//bdi[.='Mixed Toxic Fluid']/ancestor::div[2]/following::span[1]"); }
    private get percentMixedToxicInput() { return $("//bdi[.='% Mixed Toxic']/ancestor::div[2]/following::input[1]"); }
    private get isolatedInventoryDrp() { return $("//bdi[.='Isolated Inventory System (Yes or No)']/ancestor::div[2]/following::span[1]"); }
    private get diameterInput() { return $("//bdi[.='Diameter']/ancestor::div[2]/following::input[1]"); }
    private get largestDiameterInput() { return $("//bdi[.='Largest Diameter In System']/ancestor::div[2]/following::input[1]"); }
    private get assessmentDateInput() { return $("//bdi[.='Assessment Date']/ancestor::div[2]/following::input[1]"); }
    private get serviceDateInput() { return $("//bdi[.='Service Date']/ancestor::div[2]/following::input[1]"); }
    private get progBarForProcAndDes() { return $("//div[text()='Process and Design Construction Data']/following::div[@style and contains(@style,'flex-basis')][1]")}
    private get releaseInfoExpandBtn() { return $("//div[text()='Release Information']/following::button[1]"); }
    private get populationInformationExpandBtn() { return $("//div[.='Population Information']/following::button[1]"); }
    private get thinningExpandBtn() { return $("//div[.='Thinning']/following::button[1]"); }
    private get externalCorrosionExpandBtn() { return $("//div[.='External Corrosion']/following::button[1]"); }
    private get cuiExpandBtn() { return $("//div[.='Corrosion Under Insulation (CUI)']/following::button[1]"); }
    private get causticSccDfExpandBtn() { return $("//div[.='Caustic SCC DF']/following::button[1]"); }
    private get chlorideSccDfExpandBtn() { return $("//div[.='Chloride SCC DF']/following::button[1]"); }
    private get internalCoatingLiningExpandBtn() { return $("//div[.='Internal Coating/Lining']/following::button[1]"); }
    private get externalCoatingExpandBtn() { return $("//div[.='External Coating']/following::button[1]"); }
    private get brittleFractureDfExpandBtn() { return $("//div[.='Brittle Fracture DF']/following::button[1]"); }
    private get hydrogenStressCrackingDfExpandBtn() { return $("//div[.='Hydrogen Stress Cracking DF']/following::button[1]"); }
    private get qualitativeMechanismsExpandBtn() { return $("//div[.='Qualitative Mechanisms']/following::button[1]"); }
    private get amineSccDfExpandBtn() { return $("//div[.='Amine SCC DF']/following::button[1]"); }
    private get ammoniaSccDfExpandBtn() { return $("//div[.='Ammonia SCC DF']/following::button[1]"); }
    private get planningExpandBtn() { return $("//div[.='Planning']/following::button[1]"); }
    private get riskSummaryExpandBtn() { return $("//div[.='Risk Summary']/following::button[1]"); }
    private get inventoryDrp() { return $("//bdi[.='Inventory']/ancestor::div[2]/following::span[1]"); }
    private get detectIsolateCategoryDrp() { return $("//bdi[.='Detect&Isolate Category']/ancestor::div[2]/following::span[1]"); }
    private get populationDescriptionDrp() { return $("//bdi[.='Population Description']/ancestor::div[2]/following::span[1]"); }
    private get releaseInformationProgBar() { return $("//div[.='Release Information']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get populationInformationProgBar() { return $("//div[.='Population Information']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get thinningProgBar() { return $("//div[.='Thinning']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get externalCorrosionProgBar() { return $("//div[.='External Corrosion']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    //private get cuiProgBar() { return $("//div[.='Corrosion Under Insulation (CUI)']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get causticSccDfProgBar() { return $("//div[.='Caustic SCC DF']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get chlorideSccDfProgBar() { return $("//div[.='Chloride SCC DF']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get internalCoatingLiningProgBar() { return $("//div[.='Internal Coating/Lining']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get externalCoatingProgBar() { return $("//div[.='External Coating']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get brittleFractureDfProgBar() { return $("//div[.='Brittle Fracture DF']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get hydrogenStressCrackingDfProgBar() { return $("//div[.='Hydrogen Stress Cracking DF']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get qualitativeMechanismsProgBar() { return $("//div[.='Qualitative Mechanisms']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get amineSccDfProgBar() { return $("//div[.='Amine SCC DF']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get ammoniaSccDfProgBar() { return $("//div[.='Ammonia SCC DF']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get planningProgBar() { return $("//div[.='Planning']/following::div[@style and contains(@style,'flex-basis')][1]"); }
    private get corrosionRateInput() { return $("//bdi[.='Corrosion Rate Since Last Inspection (per year)']/ancestor::div[2]/following::input[1]"); }
    private get lastInternalInspectionDateInput() { return $("//bdi[.='Last Internal Inspection date (service date if no inspection)']/ancestor::div[2]/following::input[1]"); }
    private get corrosionRateDeterminedDrp() { return $("//bdi[.='Corrosion Rate Determined?']/ancestor::div[2]/following::span[1]"); }
    private get thinningCorrTypeDrp() { return $("(//div[.//text()='Thinning']//bdi[.='Corrosion Type']/ancestor::div[2]/following::span[1])[1]"); }
    private get corrRateConfiDrp() { return $("//bdi[.='Corrosion Rate Confidence']/ancestor::div[2]/following::span[1]"); }
    private get thinningALvlInspInput() { return $("(//div[text()='Thinning']/following::div[.//text()='A Level Inspection Count']/following-sibling::div//input)[1]"); }
    private get thinningBLvlInspInput() { return $("(//div[text()='Thinning']/following::div[.//text()='B Level Inspection Count']/following-sibling::div//input)[1]"); }
    private get thinningCLvlInspInput() { return $("(//div[text()='Thinning']/following::div[.//text()='C Level Inspection Count']/following-sibling::div//input)[1]"); }
    private get thinningDLvlInspInput() { return $("(//div[text()='Thinning']/following::div[.//text()='D Level Inspection Count']/following-sibling::div//input)[1]"); }
    private get thinningELvlInspInput() { return $("(//div[text()='Thinning']/following::div[.//text()='E Level Inspection Count']/following-sibling::div//input)[1]"); }
    private get thinningInspEffDrp() { return $("(//div[text()='Thinning']/following::div[.//text()='Inspection Effectiveness']/following-sibling::div//span[1])[1]"); }
    private get thinningIterTimeLenDrp() { return $("(//div[.//text()='Thinning']//bdi[.='Iteration time length']/ancestor::div[2]/following::span[1])[1]"); }
    private get thinningMaxInspIntInp() { return $("(//div[.//text()='Thinning']//bdi[.='Max Inspection Interval']/ancestor::div[2]/following::input[1])[1]"); }
    private get thinningMeasWallThickInp() { return $("(//div[.//text()='Thinning']//bdi[.='Measured Wall Thickness - Last Inspection']/ancestor::div[2]/following::input[1])[1]"); }
    private get extCorrosionLastInspectionDateInput() { return $("//bdi[.='Last External Inspection date (service date if no inspection)']/ancestor::div[2]/following::input[1]"); }
    private get extCorrosionMeasuredThicknessInput() { return $("//bdi[.='Measured Thickness at Last Inspection']/ancestor::div[2]/following::input[1]"); }
    private get extCorrosionEquipmentTypeDrp() { return $("//bdi[.='Equipment Design allows Water to Pool?']/ancestor::div[2]/following::span[1]"); }
    private get extCorrosionComponentOrientationDrp() { return $("//bdi[.='Does Component enter soil or water?']/ancestor::div[2]/following::span[1]"); }
    private get extBasisForThicknessDrp() { return $("//bdi[.='Basis for Thickness']/ancestor::div[2]/following::span[1]"); } 
    private get extCorrosionTypeDrp() { return $("//div[text()='External Corrosion']/following::bdi[.='Corrosion Type']/ancestor::div[2]/following::span[1]")}
    private get extCorrosionConfidenceDrp() { return $("(//bdi[.='Corrosion Rate Confidence']/ancestor::div[2]/following::span[1])[2]"); }
    private get extCorrosionALevelInput() { return $("(//bdi[.='A Level Inspection Count']/ancestor::div[2]/following::input[1])[2]"); }
    private get extCorrosionBLevelInput() { return $("(//bdi[.='B Level Inspection Count']/ancestor::div[2]/following::input[1])[2]"); }
    private get extCorrosionCLevelInput() { return $("(//bdi[.='C Level Inspection Count']/ancestor::div[2]/following::input[1])[2]"); }
    private get extCorrosionDLevelInput() { return $("(//bdi[.='D Level Inspection Count']/ancestor::div[2]/following::input[1])[2]"); }
    private get extCorrosionELevelInput() { return $("(//bdi[.='E Level Inspection Count']/ancestor::div[2]/following::input[1])[2]"); }
    private get extCorrosionInspectionEffectivenessDrp() { return $("(//bdi[.='Inspection Effectiveness']/ancestor::div[2]/following::span[1])[2]"); }
    private get extCorrosionIterationTimeDrp() { return $("(//bdi[.='Iteration time length']/ancestor::div[2]/following::span[1])[2]"); }
    private get extCorrosionMaxIntervalInput() { return $("(//bdi[.='Max Inspection Interval']/ancestor::div[2]/following::input[1])[2]"); }
    private get cuiIsOperatingBetweenDrp() { return $("//bdi[.='Is the Operating Temperature Between 18F and 323F?']/ancestor::div[2]/following::span[1]"); }
    private get cuiLastInspectionDateInput() { return $("//bdi[.='Last CUI Inspection date']/ancestor::div[2]/following::input[1]"); }
    private get cuiAtmosphericConditionsDrp() { return $("//bdi[.='Atmospheric Conditions']/ancestor::div[2]/following::span[1]"); }
    private get causticWasFoundDrp() { return $("//bdi[.='Was Caustic SCC found at last inspection?']/ancestor::div[2]/following::span[1]"); }
    private get causticWasCrackingRemovedDrp() { return $("//bdi[.='Was the Cracking Removed?']/ancestor::div[2]/following::span[1]"); }
    private get causticMaterialAlloyDrp() { return $("//bdi[.='Is Material Carbon or Low Alloy Ferritic Steel?']/ancestor::div[2]/following::span[1]"); }
    private get causticEquipStressReliefDrp() { return $("//bdi[.='Was the Equipment Stress Relieved?']/ancestor::div[2]/following::span[1]"); }
    private get causticMaxOperatingTempInput() { return $("(//bdi[.='Maximum Operating Temperature']/ancestor::div[2]/following::input[1])[1]"); }
    private get causticIsEquipmentHeatedDrp() { return $("(//bdi[.='Is Equipment heated or traced?']/ancestor::div[2]/following::span[1])[1]"); }
    private get causticIsEquipmentSteamedDrp() { return $("(//bdi[.='Is Equipment Steamed out?']/ancestor::div[2]/following::span[1])[1]"); }
    private get causticConcentrationInput() { return $("(//bdi[.='Caustic Concentration (%)']/ancestor::div[2]/following::input[1])[1]"); }
    private get causticNACEDrp() { return $("(//bdi[.='Area on NACE Caustic SCC Graph']/ancestor::div[2]/following::span[1])[1]"); }
    private get causticLastInspectionDateInput() { return $("(//bdi[.='Last Caustic SCC Inspection Date']/ancestor::div[2]/following::input[1])[1]"); }
    private get causticInspectionEffectivenessDrp() { return $("(//bdi[.='Inspection Effectiveness Category (default Ineffective)']/ancestor::div[2]/following::span[1])[1]"); }
    private get causticIterationTimeDrp() { return $("(//bdi[.='Iteration time length']/ancestor::div[2]/following::span[1])[1]"); }
    private get causticMaxInspectionIntervalInput() { return $("(//bdi[.='Max Inspection Interval']/ancestor::div[2]/following::input[1])[3]"); }
    private get chlorideMaterialDrp() { return $("(//bdi[.='Is Material austenitic stainless steel?']/ancestor::div[2]/following::span[1])[1]"); }
    private get chlorideProcessPhDrp() { return $("(//bdi[.='Process Ph']/ancestor::div[2]/following::span[1])[1]"); }
    private get chlorideConcentrationInput() { return $("(//bdi[.='Chloride Concentration in Process (PPM) (Default 0)']/ancestor::div[2]/following::input[1])[1]"); }
    private get chlorideLastInspectionDateInput() { return $("(//bdi[.='Last External Chloride SCC Inspection date']/ancestor::div[2]/following::input[1])[1]"); }
    private get chlorideWasFoundDrp() { return $("(//bdi[.='Was Chloride SCC Found by External Inspection?']/ancestor::div[2]/following::span[1])[1]"); }
    private get chlorideInternalCountInput() { return $("(//bdi[.='Number of Internal SCC Inspections (max 6)']/ancestor::div[2]/following::input[1])[1]"); }
    private get chlorideEffectivenessDrp() { return $("(//bdi[.='Internal Inspection Effectiveness Category']/ancestor::div[2]/following::span[1])[1]"); }
    private get chlorideMaxIntervalInput() { return $("(//bdi[.='Max Inspection Interval']/ancestor::div[2]/following::input[1])[4]"); }
    private get chlorideIterationTimeDrp() { return $("(//bdi[.='Iteration time length']/ancestor::div[2]/following::span[1])[4]"); }
    private get coatingInstallDateInput() { return $("(//bdi[.='Coating/Lining Installation Date']/ancestor::div[2]/following::input[1])[1]"); }
    private get coatingConditionDrp() { return $("(//bdi[.='Coating/Lining Condition - Last Inspection']/ancestor::div[2]/following::span[1])[1]"); }
    private get coatingQualityDrp() { return $("(//bdi[.='Coating/Lining Quality']/ancestor::div[2]/following::span[1])[1]"); }
    private get extCoatingInstallDateInput() { return $("(//bdi[.='Coating/Liner Installation date']/ancestor::div[2]/following::input[1])"); }
    private get extCoatingConditionDrp() { return $("(//bdi[.='Coating/Lining Condition - Last Inspection']/ancestor::div[2]/following::span[1])[2]"); }
    private get extCoatingQualityDrp() { return $("(//bdi[.='Coating/Lining Quality']/ancestor::div[2]/following::span[1])[2]"); }
    private get brittleMaterialDrp() { return $("(//bdi[.='Is Material of Construction Carbon or Low Alloy Steel?']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleMdmtUnknownDrp() { return $("(//bdi[.='Is the MDMT or MAT Unknown?']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleBelowMdmtDrp() { return $("(//bdi[.='Can the equipment operate below the MDMT or MAT?']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleQualifiedDrp() { return $("(//bdi[.='Was material qualified by impact testing?']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittlePwhtDrp() { return $("(//bdi[.='Has the component been PWHT?']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleInstrDrp() { return $("(//bdi[.='Is there specific instrumentation in place to prevent brittle fracture of this equipment?']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleAdminCtrlDrp() { return $("(//bdi[contains(.,'robust administrative controls')]/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleCriticalExposureDrp() { return $("(//bdi[.='Critical Exposure Temperature - normal or upset']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleAsmeCurveDrp() { return $("(//bdi[.='ASME Exemption Curve']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleFabricatedDrp() { return $("(//bdi[.='Fabricated from P-1 or P-3 Steels with design temperature less than 650F.']/ancestor::div[2]/following::span[1])"); }
    private get brittleImpactTestDrp() { return $("(//bdi[.='Equipment designed to recognized code that required impact testing for thick wall or cold temperature service.']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleOperatedDrp() { return $("(//bdi[.='Equipment has been operated for more than 10 years without Low Temperature incident and none expected in Future']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleCetDrp() { return $("(//bdi[.='CET at MAWP > -20F (-20C) for vessel and > -155F (-104C) for piping']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleNominalThkDrp() { return $("(//bdi[.='Nominal thickness < 2 inch (50.8 mm']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleNotCyclicDrp() { return $("(//bdi[contains(text(),' fatigue or vibration service')]/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleNoEnvCrackDrp() { return $("(//bdi[.='Not subject to environmental cracking']/ancestor::div[2]/following::span[1])[1]"); }
    private get brittleNoShockDrp() { return $("(//bdi[.='Not subject to shock chilling']/ancestor::div[2]/following::span[1])[1]"); }
    private get hydrogenMaterialDrp() { return $("(//bdi[.='Is Material of Construction Carbon or Low Alloy Steel?']/ancestor::div[2]/following::span[1])[2]"); }
    private get hydrogenInspectionDateInput() { return $("(//bdi[.='Last Hydrogen SCC Inspection Date']/ancestor::div[2]/following::input[1])[1]"); }
    private get hydrogenInspectionCountInput() { return $("(//bdi[.='Number of SCC Inspections (max 6)']/ancestor::div[2]/following::input[1])[2]"); }
    private get hydrogenEffectivenessDrp() { return $("(//bdi[.='External Inspection Effectiveness Category']/ancestor::div[2]/following::span[1])[2]"); }
    private get hydrogenMaxIntervalInput() { return $("(//bdi[.='Max Inspection Interval']/ancestor::div[2]/following::input[1])[5]"); }
    private get hydrogenIterationTimeDrp() { return $("(//bdi[.='Iteration time length']/ancestor::div[2]/following::span[1])[5]"); }   
    private get damageMechanism1Drp() { return $("(//bdi[.='Damage Mechanism 1']/ancestor::div[2]/following::span[1])[1]"); }
    private get damageMechanism2Drp() { return $("(//bdi[.='Damage Mechanism 2']/ancestor::div[2]/following::span[1])[1]"); }
    private get damageMechanism3Drp() { return $("(//bdi[.='Damage Mechanism 3']/ancestor::div[2]/following::span[1])[1]"); }
    private get damageMechanism4Drp() { return $("(//bdi[.='Damage Mechanism 4']/ancestor::div[2]/following::span[1])[1]"); }
    private get confidenceDamageDrp() { return $("(//bdi[.='Confidence Damage mechanisms are Understood']/ancestor::div[2]/following::span[1])[1]"); }
    private get amineCrackRemovedInput() { return $("(//bdi[.='Was the Cracking Removed?']/ancestor::div[2]/following::input[1])[2]"); }
    private get amineSccFoundInput() { return $("(//bdi[.='Was Amine SCC Found by Inspection?']/ancestor::div[2]/following::input[1])"); }
    private get amineSteamedOutInput() { return $("(//bdi[.='Is Equipment Steamed out?']/ancestor::div[2]/following::input[1])[2]"); }
    private get amineHeatedInput() { return $("(//bdi[.='Is Equipment heated or traced?']/ancestor::div[2]/following::input[1])[2]"); }
    private get amineLastInspectionDateInput() { return $("(//bdi[.='Last Amine SCC Inspection Date (service date if no inspection)']/ancestor::div[2]/following::input[1])"); }
    private get amineMaxTempInput() { return $("(//bdi[.='Maximum Operating Temperature']/ancestor::div[2]/following::input[1])[2]"); }
    private get amineInspectionEffDrp() { return $("(//bdi[.='Inspection Effectiveness Category (default Ineffective)']/ancestor::div[2]/following::input[1])[2]"); }
    private get amineMaxIntervalInput() { return $("(//bdi[.='Max Inspection Interval']/ancestor::div[2]/following::input[1])[6]"); }
    private get amineNoOfInspectionsInput() { return $("(//bdi[.='Number of Amine SCC Inspections (max 6)']/ancestor::div[2]/following::input[1])"); }
    private get amineSccFoundLastInput() { return $("(//bdi[.='Was Amine SCC found at last inspection?']/ancestor::div[2]/following::input[1])"); }
    private get amineMaterialInput() { return $("(//bdi[.='Is Material Carbon or Low Alloy Ferritic Steel?']/ancestor::div[2]/following::input[1])[2]"); }
    private get amineIterationInput() { return $("(//bdi[.='Iteration time length']/ancestor::div[2]/following::input[1])[6]"); }
    private get amineStressRelievedInput() { return $("(//bdi[.='Was the Equipment Stress Relieved?']/ancestor::div[2]/following::input[1])[2]"); }
    private get amineConcentrationInput() { return $("(//bdi[.='Amine Concentration']/ancestor::div[2]/following::input[1])"); }
    private get ammoniaStressRelievedInput() { return $("(//bdi[.='Was the Equipment Stress Relieved?']/ancestor::div[2]/following::input[1])[3]"); }
    private get ammoniaConcentrationInput() { return $("//bdi[.='Ammonia Concentration (%)']/ancestor::div[2]/following::input[1]"); }
    private get ammoniaMaterialInput() { return $("(//bdi[.='Is Material Carbon or Low Alloy Ferritic Steel?']/ancestor::div[2]/following::input[1])[3]"); }
    private get ammoniaSccFoundInput() { return $("//bdi[.='Was Ammonia SCC Found by Inspection?']/ancestor::div[2]/following::input[1]"); }
    private get ammoniaSccFoundLastInput() { return $("//bdi[.='Was Ammonia SCC found at last inspection?']/ancestor::div[2]/following::input[1]"); }
    private get ammoniaMaxTempInput() { return $("(//bdi[.='Maximum Operating Temperature']/ancestor::div[2]/following::input[1])[3]"); }
    private get ammoniaInspectionEffInput() { return $("(//bdi[.='Inspection Effectiveness Category (default Ineffective)']/ancestor::div[2]/following::input[1])[3]"); }
    private get ammoniaSteamedOutInput() { return $("(//bdi[.='Is Equipment Steamed out?']/ancestor::div[2]/following::input[1])[3]"); }
    private get ammoniaIterationInput() { return $("(//bdi[.='Iteration time length']/ancestor::div[2]/following::input[1])[7]"); }
    private get ammoniaLastInspectionDateInput() { return $("//bdi[.='Last Ammonia SCC Inspection Date (service date if no inspection)']/ancestor::div[2]/following::input[1]"); }
    private get ammoniaNoOfInspectionsInput() { return $("//bdi[.='Number of Ammonia SCC Inspections (max 6)']/ancestor::div[2]/following::input[1]"); }
    private get ammoniaMaxIntervalInput() { return $("(//bdi[.='Max Inspection Interval']/ancestor::div[2]/following::input[1])[7]"); }
    private get ammoniaCrackRemovedInput() { return $("(//bdi[.='Was the Cracking Removed?']/ancestor::div[2]/following::input[1])[3]"); }
    private get ammoniaHeatedInput() { return $("(//bdi[.='Is Equipment heated or traced?']/ancestor::div[2]/following::input[1])[3]"); }
    private get planningInServiceDateInput() { return $("(//bdi[.='In Service Date']/ancestor::div[2]/following::input[1])[1]"); }
    private get planningNominalThicknessInput() { return $("(//bdi[.='Nominal Thickness']/ancestor::div[2]/following::input[1])[1]"); }
    private get planningMeasuredThicknessInput() { return $("(//bdi[.='Measured Thickness']/ancestor::div[2]/following::input[1])[1]"); }
    private get planningCorrosionAllowanceInput() { return $("(//bdi[.='Design Corrosion Allowance']/ancestor::div[2]/following::input[1])[1]"); }
    private get planningDeteriorationRateInput() { return $("(//bdi[.='Deterioration Rate']/ancestor::div[2]/following::input[1])[1]"); }
    private get planningIntervalInput() { return $("(//bdi[.='Jurisdictional Req Interval']/ancestor::div[2]/following::input[1])[1]"); }
    private get planningLastInspectionDateInput() { return $("(//bdi[.='Last Insepction Date']/ancestor::div[2]/following::input[1])"); }
    private get calculateBtn() { return $("//button[.//bdi[.='Calculate']]"); }
    private get headerData() { return $("//header//span[contains(text(),'Recommendations')]")};
    private get closeBtn() { return $("//button[.//bdi[.='Close']]"); }
    private get noOfCML() { return $("(//h2//span)[2]"); }
    private get riskInformationValue() { return $("//div[text()='Risk Information']/following::span[1]"); }
    private get strategiesValue() { return $("//div[text()='Strategies']/following::span[2]"); }
    private get recommendationsValue() { return $("//div[text()='Recommendations']/following::span[1]"); }
    private get maintenanceNotificationValue() { return $("//div[text()='Maintenance Notification']/following::span[1]"); }
    private get maintenanceOrdersValue() { return $("//div[text()='Maintenance Orders']/following::span[1]"); }
    private get maintenancePlansValue() { return $("//div[text()='Maintenance Plans']/following::span[1]"); }
    private get attachSuccMsg() { return $("//span[text()='Success']"); }
    private get attachmentsSection() { return $('//button[.//bdi[text()="Attachments"]]'); }
    private get ASDEditHeader() { return $("//bdi[text()='Edit Header']"); }
    private ASDHeader(i: number) { return $(`(//header//*[@role='heading']/span[text()='${ASDListView.assetASDDesc}'])[${i}]`);}
    private get editHeaderTitle() { return $("//h1[.//text()='Edit Header']"); }
    private get shortDescriptionInput() { return $("//label[.//text()='Short Description']/following::input[1]"); }
    private get assessDateInput() { return $("//label[.//text()='Assessment Date']/following::input[1]"); }
    private get longDescriptionTextarea() { return $("//label[.//text()='Long Description']/following::textarea[1]"); }
    private get okHeaderBtn() { return $("//h1[.//text()='Edit Header']/following::button[.//text()='Ok']"); }
    private get headerMoreBtn() { return $("//header//button[@aria-label='Additional Options']//span[@role='presentation']"); }
    private get deleteBtn() { return $("//body//button[.//text()='Delete']"); }
    private get reportBtn() { return $("//button[.//text()='Report']"); }
    private get deleteConfirmText() { return $("//span[.//text()='Are you sure want to delete the Assessment?']"); }
    private get confirmOkBtn() { return $("//header[.//text()='Confirmation']/following::button[.//text()='OK']"); }
    private get workflowBtn() { return $("//header//button[.//text()='Workflow']"); }
    private get workflowHeader() { return $("//span[contains(text(),'Workflow Inbox')]") };
    private get createWorkflowBtn() { return $("//span[contains(text(),'Workflow Inbox')]/following::button[.//text()='Create']")};
    private get createWorkflowBtn2() { return $("//span[contains(text(),'Create Workflow')]/following::button[.//text()='Create']")};
    private get reviewersInput() { return $("//label[.//text()='Reviewers']/following::input[1]"); }
    private get selectUserPopupHeader() { return $("//header[.//text()='Select User']"); }
    private get selectUserSearchInput() { return $("//header[.//text()='Select User']/following::input[@type='search'][1]"); }
    private get selectUserFirstRowCheckbox() { return $("(//header[.//text()='Select User']/following::div[@role='checkbox'])[2]"); }
    private get selectUserConfirmBtn() { return $("//header[.//text()='Select User']/following::button[.//text()='Confirm']"); }
    private get workflowSuccessMsg() { return $("//span[.//text()='Workflow Created Successfully']"); }
    private get calculationFailedMsg() { return $("//span[.//text()='Failed to calculate, Please try again']"); }
    private get failedOkBtn() { return $("//button[.//text()='OK']"); }
    private get publishASDBtn() { return $("//header//button[.//text()='Publish']"); }
    private get publishConfirmBtn() { return $("//h1[.//text()='Confirmation']/following::button[.//text()='Yes']"); }
    private get selectAllRecc() { return $("//table[@aria-rowcount='3']//div[@title='Select All']"); }
    private get publishBtn() { return $("//footer//button[.//text()='Publish']"); }
    private get notificationHeader() { return $("//header//span[contains(text(),'Notification')]"); }
    private get notificationTypeDrp() { return $("//bdi[text()='Type']/following::span[@role='button'][1]"); }
    private get notificationTypePopup() { return $("//header[.//text()='Select Notification Type']"); }
    private get notificationTypeFirstRow() { return $("(//table[@aria-colcount='3']//td[@aria-colindex='1'])[1]"); }
    private get notificationTypeSaveBtn() { return $("//header[.//text()='Select Notification Type']/following::button[.//text()='Save'][1]"); }
    private get notificationPriorityDrp() { return $("//bdi[text()='Priority']/following::span[@role='button'][1]"); }
    private get notificationPriorityPopup() { return $("//header[.//text()='Select Notification Priority']"); }
    private get notificationPriorityFirstRow() { return $("(//table[@aria-colcount='3']//td[@aria-colindex='1'])[1]"); }
    private get notificationPrioritySaveBtn() { return $("//header[.//text()='Select Notification Priority']/following::button[.//text()='Save'][1]"); }
    private get notificationNextBtn() { return $("//header//span[contains(text(),'Notification')]/following::button[.//text()='Next']"); }
    private get notificationPublishBtn() { return $("//header//span[contains(text(),'Notification')]/following::button[.//text()='Publish'][1]"); }
    private get notiSucMsg() { return $("//span[.//text()='Notification Created and Assessment Published Successfully']"); }
    private get recWorkbenchHeader() { return $("//header//span[contains(text(),'Recommendation')]"); }
    private get recNextBtn() { return $("//header//span[contains(text(),'Recommendation')]/following::button[.//text()='Next']"); }
    private get recPublishBtn() { return $("//header//span[contains(text(),'Recommendation')]/following::button[.//text()='Publish'][1]"); }
    private get reccSucMsg() { return $("//span[.//text()='Work Bench Created and Assessment Published Successfully']"); }
    private get skipAllReccSuccMsg() { return $("//span[.//text()='Assessment Published Successfully']"); }
    private get cancelBtn() { return $("//footer//button[.//text()='Cancel']"); }
    private get errorOkBtn() { return $("//header[.//text()='Error']/following::button[.//text()='OK']"); }
    private get yesBtn() { return $("//header[.//text()='Confirmation']/following::button[.//text()='Yes']"); }
    private get newStrategyBtn() { return $("//span[contains(text(),'Strategies')]/following::button[.//text()='New'][1]"); }
    private get createNewStrategyHeader() { return $("//h1[.//text()='Create New Strategy']"); }
    private get shortDescriptionDropdown() { return $("(//label[.//text()='Short Description']//following::span[2])[1]"); }
    private get shortDescriptionOption() { return $("(//tr[@role='row' and @aria-rowindex='2']//td[@aria-colindex='1'])[1]"); }
    private get strategyShortDescriptionInput() { return $("//label[.//text()='Short Description']//following::input[1]"); }
    private get longDescriptionText() { return $("//label[.//text()='Long Description']//following::div[4]"); }
    private get sectionDropdown() { return $("(//label[.//text()='Section']//following::span[2])[1]"); }
    private get sectionSecondOption() { return $("(//tr[@role='row']//td[@aria-colindex='1'])[2]"); }
    private get sectionInput() { return $("//label[.//text()='Section']//following::input[1]"); }
    private get dueDateInput() { return $("//label[.//text()='Due Date']//following::input[1]"); }
    private get createBtn() { return $("//footer//button[.//text()='Create']"); }
    private get strategySearchInput() { return $("//span[contains(text(),'Strategies')]/following::input[@title='Search']"); }
    private get strategySearchBtn() { return $("//span[contains(text(),'Strategies')]/following::input[@title='Search']/following::div[2]"); }
    private get updateRecommendationsHeader() { return $("//h1[.//text()='Update Recommendations']"); }
    private get updateRecommendationsSaveBtn() { return $("//h1[.//text()='Update Recommendations']/following::button[.//text()='Save'][1]"); }
    private get editAndUpdateBtn() { return $("//span[contains(text(),'Strategies')]/following::button[.//text()='Edit & Update'][1]"); }
    private get freezeStrategyBtn() { return $("//span[contains(text(),'Strategies')]/following::button[.//text()='Freeze'][1]"); }
    private get deleteStartegyBtn() { return $("//span[contains(text(),'Strategies')]/following::button[.//text()='Delete'][1]"); }
    private get equipmentSectionHeader() { return $("//span[starts-with(normalize-space(),'Equipment (')]"); }
    private equipmentCell(equipNo: string) { return $(`//div[@tabindex='0']//span[normalize-space()='${equipNo}']`); }

    public selectedItemsGlobal:any = {};
    public calculateAnalysis :boolean = false;
    public publish :boolean = false;
    public strategyData: any = {};
    
    public async verifyEditGenInfo() {
        console.log("Start: Verifying and editing general information section of ASD");
        await utils.switchToIframe(this.ASDIframe);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        await utils.clickWithWait(this.genInfoTab);
        await browser.pause(5000);
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
        console.log("General information section of ASD verified and edited successfully");
    }

    public async captureGeneralSelection() {
        console.log("Capturing general selection details of ASD");
        await utils.switchToIframe(this.ASDIframe);
        await browser.pause(4000);
        await utils.waitForBusyIndicatorToDisappear();
        const isHeaderVisible = await this.generalSelectionHeader.isDisplayed().catch(() => false);
        const isLinkVisible = await this.generalSelectionLink.isDisplayed().catch(() => false);

        if (isHeaderVisible) {
            console.log("Verifying selected items in General Selection");
            const items = await this.selectedCheckboxTexts;
            this.selectedItemsGlobal = {} as any;
            for (let el of items) {
                const text: string = await el.getText();
                this.selectedItemsGlobal[text] = true;
                console.log("Selected: " + text);
            }
            if (Object.keys(this.selectedItemsGlobal).length === 0) {
                ASDListView.generalSelectionData = false;
                await utils.clickWithWait(this.cancelBtn);
                await utils.waitForBusyIndicatorToDisappear();
                console.log("No items selected → Cancel clicked");
            } else {
                const isChecked = await this.selectAllToggle.getAttribute("aria-checked");
                if (isChecked === "false") {
                    await this.selectAllToggle.click();
                }
                await this.saveButton.click();
                await utils.waitForBusyIndicatorToDisappear();
                console.log("Saved general ASD after creation");
            }
        } 
        else if (isLinkVisible) {
            console.log("Header not found → opening via link");
            await this.generalSelectionLink.waitForDisplayed({ timeout: 10000 });
            await this.generalSelectionLink.scrollIntoView();
            await browser.execute(el => el.click(), await this.generalSelectionLink);
            await utils.waitForBusyIndicatorToDisappear();
            const checkboxes = await $$("//li[@role='treeitem']//div[@role='checkbox']/following::div[1]");
            if (await checkboxes.length === 0) {
                console.log("No General Sections are present");
                if (await this.cancelBtn.isDisplayed().catch(() => false)) {
                    await this.cancelBtn.click();
                }
                return;
            }
            const items = await this.selectedCheckboxTexts;
            this.selectedItemsGlobal = {} as any;
            for (let el of items) {
                if (await el.isDisplayed().catch(() => false)) {
                    const text: string = await el.getText();
                    this.selectedItemsGlobal[text] = true;
                    console.log("Selected: " + text);
                }
            }
            const isChecked = await this.selectAllToggle.getAttribute("aria-checked");
            if (isChecked === "false") {
                await this.selectAllToggle.click();
            }
            await this.saveButton.click();
            await utils.waitForBusyIndicatorToDisappear();
            console.log("Selected items are : ", this.selectedItemsGlobal);
        } 
        else {
            console.log("GENERAL SELECTION SECTION NOT PRESENT FOR THIS ASD");
        }
        console.log("General selection details of ASD captured successfully");
    }

    public async verifyHeader()
    {
        console.log("Verifying header information of ASD");
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.ASDIframe);
        await browser.pause(4000);
        const { name, id } = await utils.getEntityNameAndId();
        if (id) ASDListView.assetASDDisplayID = id;
        const expected = ASDListView.singleCreate ? ASDListView.assetASDDesc : ASDListView.assetASDFunLoc;
        await expect(name).toEqual(expected);
        console.log("Asset Strategy Development name matches header's name");
    }

    public async editHeader()
    {
        console.log("Editing header information of ASD");
        await utils.clickWithWait(this.ASDEditHeader);
        await browser.pause(2000);
        await this.editHeaderTitle.waitForDisplayed();
        if(ASDListView.singleCreate = true)
        {
            ASDListView.assetASDDesc = `Automation_ASD_Single_Equipment_${Date.now()}`;
            console.log(`Generated ASD Description: ${ASDListView.assetASDDesc}`);
            await utils.setValueWithWait(this.shortDescriptionInput, ASDListView.assetASDDesc);
        }
        else
        {
            const newASDDesc = `Automation_ASD_Multiple_Equipment_${Date.now()}`;
            console.log("Setting new short description: " + newASDDesc);
            await utils.setValueWithWait(this.shortDescriptionInput, newASDDesc);
            ASDListView.assetASDFunLoc = newASDDesc;
        }
        await utils.setValueWithWait(this.assessDateInput, utils.formatDate(0));
        await utils.setValueWithWait(this.longDescriptionTextarea, "Automation long description");
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Header information of ASD edited successfully");
        console.log("Saving header information of ASD");
        await utils.clickWithWait(this.okHeaderBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.okBtn);
        await utils.captureHeaderDetails();
    }

    public async editAnalysisInfo() {
        if(ASDListView.generalSelectionData === false)
        {
            console.log("Skipping this as there were no data for general selection")
            return;
        }
        console.log("Start: Verifying and editing analysis information section of ASD");
        await utils.switchToIframe(this.ASDIframe);
        await browser.pause(4000);
        if (await this.analysisDetailTab.isExisting()) {
            await this.analysisDetailTab.waitForDisplayed({ timeout: 10000 });
            await utils.clickWithWait(this.analysisDetailTab);
        } else {
            console.log("Analysis Detail tab not present");
            return;
        }
        await browser.pause(4000);
        await this.processAndConstructionData();
        await this.releaseInfoData();
        await this.populationInformationData();
        await this.thinningData();
        await this.externalCorrosionData();
        await this.cuiData();
        await this.causticSccDfData();
        await this.chlorideSccDfData();
        await this.internalCoatingLiningData();
        await this.externalCoatingData();
        await this.brittleFractureDfData();
        await this.hydrogenStressCrackingDfData();
        await this.qualitativeMechanismsData();
        await this.amineSccDfData();
        await this.ammoniaSccDfData();
        await this.planningData();
        console.log("Values Entered in Process and Design Construction Data");
    }

    public async processAndConstructionData() {
        console.log("Editing Process and Design Construction Data in Analysis Detail tab");
        const expanded = await this.processExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.processExpandBtn.click();
        }
        await utils.selectFromDropdown(this.equipmentTypeDrp, 3);
        await utils.setValueWithWait(this.componentTypeInput, "shell");
        await utils.selectFromDropdown(this.componentGeometryDrp, 2);
        await utils.setValueWithWait(this.designPressureInput, "4");
        await utils.setValueWithWait(this.designTemperatureInput, "1");
        await utils.setValueWithWait(this.operatingPressureInput, "2");
        await utils.setValueWithWait(this.operatingTemperatureInput, "9");
        await utils.selectFromDropdown(this.representativeFluidDrp, 2);
        await utils.selectFromDropdown(this.initialFluidPhaseDrp, 2);
        await utils.selectFromDropdown(this.materialCodeDrp, 2);
        await utils.setValueWithWait(this.materialCodeYearInput, "1998.0");
        await utils.selectFromDropdown(this.materialSpecDrp, 2);
        await utils.selectFromDropdown(this.materialGradeDrp, 2);
        await utils.setValueWithWait(this.weldJointEfficiencyInput, "24");
        await utils.setValueWithWait(this.originalThicknessInput, "7");
        await utils.setValueWithWait(this.yieldStrengthOverrideInput, "30699");
        await utils.setValueWithWait(this.allowableStressOverrideInput, "15692");
        await utils.setValueWithWait(this.tensileStrengthOverrideInput, "71123");
        await utils.selectFromDropdown(this.mixedToxicFluidDrp, 2);
        await utils.setValueWithWait(this.percentMixedToxicInput, "1");
        await utils.selectFromDropdown(this.isolatedInventoryDrp, 2);
        await utils.setValueWithWait(this.diameterInput, "4");
        await utils.setValueWithWait(this.largestDiameterInput, "0");
        await utils.setValueWithWait(this.assessmentDateInput, utils.formatDate(1));
        await utils.setValueWithWait(this.serviceDateInput, utils.formatDate(2));

        console.log("Checking if all the mandatory fields in Process and Design Construction Data are filled");
        await utils.verifyProgressBar(this.progBarForProcAndDes, "Process and Design Construction Data");
    }

    public async releaseInfoData() {
        console.log("Editing Release Information Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.releaseInfoExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.releaseInfoExpandBtn.click();
        }
        await utils.selectFromDropdown(this.inventoryDrp, 2);             
        await utils.selectFromDropdown(this.detectIsolateCategoryDrp, 2); 
        await utils.verifyProgressBar(this.releaseInformationProgBar, "Release Information");
        console.log("Values Entered in Release Information");
    }

    public async populationInformationData() {
        console.log("Editing Population Information Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.populationInformationExpandBtn.getAttribute("aria-expanded");   
        if (expanded === "false") {
            await this.populationInformationExpandBtn.click();
        }
        await utils.selectFromDropdown(this.populationDescriptionDrp, 3);
        await utils.verifyProgressBar(this.populationInformationProgBar, "Population Information");
        console.log("Values Entered in Population Information");
    }

    public async thinningData() {
        console.log("Editing Thinning Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.thinningExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.thinningExpandBtn.click();
        }
        await utils.setValueWithWait(this.corrosionRateInput, "0.003");
        await utils.setValueWithWait(this.lastInternalInspectionDateInput, utils.formatDate(15));
        await utils.selectFromDropdown(this.corrosionRateDeterminedDrp, 2);
        await utils.selectFromDropdown(this.thinningCorrTypeDrp, 2);
        await utils.selectFromDropdown(this.corrRateConfiDrp, 2);
        await utils.setValueWithWait(this.thinningALvlInspInput, "-2");
        await utils.setValueWithWait(this.thinningBLvlInspInput, "5");
        await utils.setValueWithWait(this.thinningCLvlInspInput, "2");
        await utils.setValueWithWait(this.thinningDLvlInspInput, "1");
        await utils.setValueWithWait(this.thinningELvlInspInput, "3");
        await utils.selectFromDropdown(this.thinningInspEffDrp, 2);
        await utils.selectFromDropdown(this.thinningIterTimeLenDrp, 2);
        await utils.setValueWithWait(this.thinningMaxInspIntInp, "2");
        await utils.setValueWithWait(this.thinningMeasWallThickInp, "2");
        await utils.verifyProgressBar(this.thinningProgBar, "Thinning");
        console.log("Values Entered in Thinning");
    }

    public async externalCorrosionData() {      
        console.log("Editing External Corrosion Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.externalCorrosionExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.externalCorrosionExpandBtn.click();
        }
        await utils.setValueWithWait(this.extCorrosionLastInspectionDateInput, utils.formatDate(20));
        await utils.setValueWithWait(this.extCorrosionMeasuredThicknessInput, "3");

        await utils.selectFromDropdown(this.extCorrosionEquipmentTypeDrp, 2);
        await utils.selectFromDropdown(this.extCorrosionComponentOrientationDrp, 2);
        await utils.selectFromDropdown(this.extBasisForThicknessDrp, 2);
        await utils.selectFromDropdown(this.extCorrosionTypeDrp,3);
        await utils.selectFromDropdown(this.extCorrosionConfidenceDrp, 2);

        await utils.setValueWithWait(this.extCorrosionALevelInput, "3");
        await utils.setValueWithWait(this.extCorrosionBLevelInput, "4");
        await utils.setValueWithWait(this.extCorrosionCLevelInput, "0");
        await utils.setValueWithWait(this.extCorrosionDLevelInput, "2");
        await utils.setValueWithWait(this.extCorrosionELevelInput, "3");

        await utils.selectFromDropdown(this.extCorrosionInspectionEffectivenessDrp, 2);
        await utils.selectFromDropdown(this.extCorrosionIterationTimeDrp, 2);

        await utils.setValueWithWait(this.extCorrosionMaxIntervalInput, "3");
        await utils.verifyProgressBar(this.externalCorrosionProgBar, "External Corrosion");
        console.log("Values Entered in External Corrosion");
    }

    public async cuiData() {
        console.log("Editing Corrosion Under Insulation (CUI) Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.cuiExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.cuiExpandBtn.click();
        }
        await utils.selectFromDropdown(this.cuiIsOperatingBetweenDrp, 2);
        await utils.setValueWithWait(this.cuiLastInspectionDateInput, utils.formatDate(15));
        await utils.selectFromDropdown(this.cuiAtmosphericConditionsDrp, 2);
        console.log("Values Entered in CUI");
    }

    public async causticSccDfData() {
        console.log("Editing Caustic SCC DF Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.causticSccDfExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.causticSccDfExpandBtn.click();
        }
        await utils.selectFromDropdown(this.causticWasFoundDrp, 2);
        await utils.selectFromDropdown(this.causticWasCrackingRemovedDrp, 2);
        await utils.selectFromDropdown(this.causticMaterialAlloyDrp, 2);
        await utils.selectFromDropdown(this.causticEquipStressReliefDrp, 2);
        await utils.setValueWithWait(this.causticMaxOperatingTempInput, "129");
        await utils.selectFromDropdown(this.causticIsEquipmentHeatedDrp, 2);
        await utils.selectFromDropdown(this.causticIsEquipmentSteamedDrp, 2);

        await utils.setValueWithWait(this.causticConcentrationInput, "5");
        await utils.selectFromDropdown(this.causticNACEDrp, 2);

        await utils.setValueWithWait(this.causticLastInspectionDateInput, utils.formatDate(10));
        await utils.selectFromDropdown(this.causticInspectionEffectivenessDrp, 2);
        await utils.selectFromDropdown(this.causticIterationTimeDrp, 2);

        await utils.setValueWithWait(this.causticMaxInspectionIntervalInput, "2");
        await utils.verifyProgressBar(this.causticSccDfProgBar, "Caustic SCC DF");
        console.log("Values Entered in Caustic SCC DF");

    }

    public async chlorideSccDfData() {  
        console.log("Editing Chloride SCC DF Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.chlorideSccDfExpandBtn.getAttribute("aria-expanded");   
        if (expanded === "false") {
            await this.chlorideSccDfExpandBtn.click();
        }
        await utils.selectFromDropdown(this.chlorideMaterialDrp, 2);
        await utils.selectFromDropdown(this.chlorideProcessPhDrp, 2);

        await utils.setValueWithWait(this.chlorideConcentrationInput, "12");
        await utils.setValueWithWait(this.chlorideLastInspectionDateInput, utils.formatDate(5));

        await utils.selectFromDropdown(this.chlorideWasFoundDrp, 2);
        await utils.setValueWithWait(this.chlorideInternalCountInput, "4");

        await utils.selectFromDropdown(this.chlorideEffectivenessDrp, 2);
        await utils.setValueWithWait(this.chlorideMaxIntervalInput, "2");
        await utils.selectFromDropdown(this.chlorideIterationTimeDrp, 2);
        await utils.verifyProgressBar(this.chlorideSccDfProgBar, "Chloride SCC DF");
        console.log("Values Entered in Chloride SCC DF");

    }

    public async internalCoatingLiningData() {
        console.log("Editing Internal Coating/Lining Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.internalCoatingLiningExpandBtn.getAttribute("aria-expanded");   
        if (expanded === "false") {
            await this.internalCoatingLiningExpandBtn.click();
        }
        await utils.setValueWithWait(this.coatingInstallDateInput, utils.formatDate(30));
        await utils.selectFromDropdown(this.coatingConditionDrp, 2);
        await utils.selectFromDropdown(this.coatingQualityDrp, 2);
        await utils.verifyProgressBar(this.internalCoatingLiningProgBar, "Internal Coating/Lining");
        console.log("Values Entered in Internal Coating/Lining");

    }

    public async externalCoatingData() {
        console.log("Editing External Coating Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.externalCoatingExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.externalCoatingExpandBtn.click();
        }   
        await utils.setValueWithWait(this.extCoatingInstallDateInput, utils.formatDate(31));
        await utils.selectFromDropdown(this.extCoatingQualityDrp, 2);
        await utils.selectFromDropdown(this.extCoatingConditionDrp, 2);
        await utils.verifyProgressBar(this.externalCoatingProgBar, "External Coating");
        console.log("Values Entered in External Coating");

    }

    public async brittleFractureDfData() {
        console.log("Editing Brittle Fracture DF Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.brittleFractureDfExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.brittleFractureDfExpandBtn.click();
        }
        await utils.selectFromDropdown(this.brittleMaterialDrp, 2);
        await utils.selectFromDropdown(this.brittleMaterialDrp, 2);
        await utils.selectFromDropdown(this.brittleMdmtUnknownDrp, 2);
        await utils.selectFromDropdown(this.brittleBelowMdmtDrp, 2);
        await utils.selectFromDropdown(this.brittleQualifiedDrp, 2);
        await utils.selectFromDropdown(this.brittlePwhtDrp, 2);
        await utils.selectFromDropdown(this.brittleInstrDrp, 2);
        await utils.selectFromDropdown(this.brittleAdminCtrlDrp, 2);
        await utils.selectFromDropdown(this.brittleCriticalExposureDrp, 2);
        await utils.selectFromDropdown(this.brittleAsmeCurveDrp, 2);
        await utils.selectFromDropdown(this.brittleFabricatedDrp, 2);
        await utils.selectFromDropdown(this.brittleImpactTestDrp, 2);
        await utils.selectFromDropdown(this.brittleOperatedDrp, 2);
        await utils.selectFromDropdown(this.brittleCetDrp, 2);
        await utils.selectFromDropdown(this.brittleNominalThkDrp, 2);
        await utils.selectFromDropdown(this.brittleNotCyclicDrp, 2);
        await utils.selectFromDropdown(this.brittleNoEnvCrackDrp, 2);
        await utils.selectFromDropdown(this.brittleNoShockDrp, 2);
        await utils.verifyProgressBar(this.brittleFractureDfProgBar, "Brittle Fracture DF");
        console.log("Values Entered in Brittle Fracture DF");

    }

    public async hydrogenStressCrackingDfData() {
        console.log("Editing Hydrogen Stress Cracking DF Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.hydrogenStressCrackingDfExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.hydrogenStressCrackingDfExpandBtn.click();
        }
        await utils.selectFromDropdown(this.hydrogenMaterialDrp, 2);
        await utils.setValueWithWait(this.hydrogenInspectionDateInput, utils.formatDate(3));
        await utils.setValueWithWait(this.hydrogenInspectionCountInput, "1");

        await utils.selectFromDropdown(this.hydrogenEffectivenessDrp, 2);
        await utils.setValueWithWait(this.hydrogenMaxIntervalInput, "4");
        await utils.selectFromDropdown(this.hydrogenIterationTimeDrp, 2);
        await utils.verifyProgressBar(this.hydrogenStressCrackingDfProgBar, "Hydrogen Stress Cracking DF");
        console.log("Values Entered in Hydrogen Stress Cracking DF");
    }

    public async qualitativeMechanismsData() {
        console.log("Editing Qualitative Mechanisms Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.qualitativeMechanismsExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.qualitativeMechanismsExpandBtn.click();
        }
        await utils.selectFromDropdown(this.damageMechanism1Drp, 2);
        await utils.selectFromDropdown(this.damageMechanism2Drp, 2);
        await utils.selectFromDropdown(this.damageMechanism3Drp, 2);
        await utils.selectFromDropdown(this.damageMechanism4Drp, 2);
        await utils.selectFromDropdown(this.confidenceDamageDrp, 2);
        await utils.verifyProgressBar(this.qualitativeMechanismsProgBar, "Qualitative Mechanisms");
        console.log("Values Entered in Qualitative Mechanisms");

    }

    public async amineSccDfData() {
        console.log("Editing Amine SCC DF Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.amineSccDfExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.amineSccDfExpandBtn.click();
        }   
        await utils.setValueWithWait(this.amineCrackRemovedInput, "d");
        await utils.setValueWithWait(this.amineSccFoundInput, "d");
        await utils.setValueWithWait(this.amineSteamedOutInput, "a");
        await utils.setValueWithWait(this.amineHeatedInput, "a");

        await utils.setValueWithWait(this.amineLastInspectionDateInput, utils.formatDate(10));

        await utils.setValueWithWait(this.amineMaxTempInput, "1");
        // await utils.selectFromDropdown(this.amineInspectionEffDrp, 2);

        await utils.setValueWithWait(this.amineMaxIntervalInput, "1");
        await utils.setValueWithWait(this.amineNoOfInspectionsInput, "2");
        await utils.setValueWithWait(this.amineSccFoundLastInput, "1");

        await utils.setValueWithWait(this.amineMaterialInput, "1");
        await utils.setValueWithWait(this.amineIterationInput, "1");
        await utils.setValueWithWait(this.amineStressRelievedInput, "1");
        await utils.setValueWithWait(this.amineConcentrationInput, "1");
        await utils.verifyProgressBar(this.amineSccDfProgBar, "Amine SCC DF");
        console.log("Values Entered in Amine SCC DF");

    }

    public async ammoniaSccDfData() {
        console.log("Editing Ammonia SCC DF Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.ammoniaSccDfExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.ammoniaSccDfExpandBtn.click();
        }
        await utils.setValueWithWait(this.ammoniaStressRelievedInput, "1");
        await utils.setValueWithWait(this.ammoniaConcentrationInput, "10");
        await utils.setValueWithWait(this.ammoniaMaterialInput, "0");
        await utils.setValueWithWait(this.ammoniaSccFoundInput, "14");
        await utils.setValueWithWait(this.ammoniaSccFoundLastInput, "1");
        await utils.setValueWithWait(this.ammoniaMaxTempInput, "6");
        await utils.setValueWithWait(this.ammoniaInspectionEffInput, "2");
        await utils.setValueWithWait(this.ammoniaSteamedOutInput, "0");
        await utils.setValueWithWait(this.ammoniaIterationInput, "2");
        await utils.setValueWithWait(this.ammoniaLastInspectionDateInput, utils.formatDate(5));
        await utils.setValueWithWait(this.ammoniaNoOfInspectionsInput, "3");
        await utils.setValueWithWait(this.ammoniaMaxIntervalInput, "4");
        await utils.setValueWithWait(this.ammoniaCrackRemovedInput, "0");
        await utils.setValueWithWait(this.ammoniaHeatedInput, "0");
        await utils.verifyProgressBar(this.ammoniaSccDfProgBar, "Ammonia SCC DF");
        console.log("Values Entered in Ammonia SCC DF");
    }

    public async planningData() {
        console.log("Editing Planning Data in Analysis Detail tab");
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        const expanded = await this.planningExpandBtn.getAttribute("aria-expanded");
        if (expanded === "false") {
            await this.planningExpandBtn.click();
        }
        await utils.setValueWithWait(this.planningInServiceDateInput, utils.formatDate(2000));
        await utils.setValueWithWait(this.planningNominalThicknessInput, "2");
        await utils.setValueWithWait(this.planningMeasuredThicknessInput, "1");

        await utils.setValueWithWait(this.planningCorrosionAllowanceInput, "4");
        await utils.setValueWithWait(this.planningDeteriorationRateInput, "1");
        await utils.setValueWithWait(this.planningIntervalInput, "3");

        await utils.setValueWithWait(this.planningLastInspectionDateInput, utils.formatDate(10));
        await utils.verifyProgressBar(this.planningProgBar, "Planning");
        console.log("Values Entered in Planning");
    }

    public async verifyAnalysisInfo()
    {
        if(ASDListView.generalSelectionData === false)
        {
            console.log("Skipping this as there were no data for general selection")
            return;
        }
        console.log("Start: Verifying analysis information of ASD");
        await utils.switchToIframe(this.ASDIframe);
        await browser.pause(4000);
        if (await this.analysisDetailTab.isExisting()) {
            await this.analysisDetailTab.waitForDisplayed({ timeout: 10000 });
        } else {
            console.log("Analysis Detail tab not present");
            return;
        }
        await this.calculateAnalysisInfo();
        await this.printAllSectionData();
        console.log("Analysis information section of ASD verified successfully");
    }

    public async calculateAnalysisInfo() {
        console.log("Calculating analysis information of ASD");
        await utils.switchToIframe(this.ASDIframe);
        await browser.pause(4000);
        await utils.clickWithWait(this.analysisDetailTab);
        await browser.pause(2000);
        await utils.clickWithWait(this.calculateBtn);
        await browser.pause(10000);
        if( await this.calculationFailedMsg.isDisplayed())
        {
            await utils.clickWithWait(this.failedOkBtn);
            this.calculateAnalysis = false;
            throw new Error("Analysis information calculation failed");
        }
        await utils.waitForBusyIndicatorToDisappear();
        await this.headerData.waitForDisplayed({timeout: 10000});
        const text = await this.headerData.getText();
        const noOfRecc = await utils.getAssignedValue(text);
        if (noOfRecc === 0) {
            this.calculateAnalysis = false;
            throw new Error("No recommendations found, calculation might have failed");
        }
        else
        {
            this.calculateAnalysis = true;
            console.log("Number of recommendations found: " + noOfRecc);
            for (let i = 1; i <= noOfRecc; i++) {
                const el = await $(`(//tr[@aria-rowindex='${i+1}']//td[@aria-colindex='1']//span)[1]`);
                if (await el.isDisplayed()) {
                    console.log("Recommendation title for row " + i + ": " + await el.getText());
                } else {
                    console.log("Recommendation title not found for row: " + i);
                    break;
                }
            }
            await utils.clickWithWait(this.closeBtn);
            await browser.pause(2000);
            await utils.waitForBusyIndicatorToDisappear();
            console.log("Analysis information calculated successfully");
        }
    }

    public async printAllSectionData() {
        console.log("Printing all section data in Analysis Detail tab");
        const sectionNames = [
        "Process and Design Construction Data",
        "Release Information",
        "Population Information",
        "Thinning",
        "External Corrosion",
        "Corrosion Under Insulation (CUI)",
        "Caustic SCC DF",
        "Chloride SCC DF",
        "Internal Coating/Lining",
        "External Coating",
        "Brittle Fracture DF",
        "Hydrogen Stress Cracking DF",
        "Qualitative Mechanisms",
        "Amine SCC DF",
        "Ammonia SCC DF",
        "Planning",
        "Risk Summary"
        ];

        const outputs = await $$("//span[.='Output']/following::div[2]");

        for (let i = 0; i < await outputs.length; i++) {

            console.log(`---- Output -> ${sectionNames[i]} ----`);

            const labels = await outputs[i].$$(".//span[.//bdi]");

            for (const label of labels) {

                const labelText = await label.$(".//bdi").getText();

                const valueEl = await label.$("./ancestor::div[1]/following-sibling::div[1]//*[1]");

                if (await valueEl.isExisting()) {

                    let value = await valueEl.getText();

                    if (!value || value.trim() === "") {
                        value = await valueEl.getAttribute("value") || "";
                    }

                    if (labelText.trim() && value.trim()) {
                        console.log(`${labelText} : ${value}`);
                    }
                }
            }
        }
        console.log("All section data printed successfully");
    }

    public async verifyRiskMatrixInfo()
    {
        console.log("Start: Verifying risk matrix information of ASD");
        await utils.switchToIframe(this.ASDIframe);
        if (await this.riskMatrixTab.isExisting()) {
            await this.riskMatrixTab.waitForDisplayed({ timeout: 10000 });
            await utils.clickWithWait(this.riskMatrixTab);
        } else {
            console.log("Risk Matrix tab not present");
            return;
        }
        await browser.pause(2000);
        await this.printRiskMatrixData();
        await this.printScaledRiskMatrixData();
        console.log("Risk matrix information of ASD verified successfully");
    }

    public async printRiskMatrixData() {
        console.log("---- Risk Matrix Data ----");
        const container = await $(`(//div[.//span and .//b])[1]`);
        const blocks = await container.$$(`./div[.//span and .//b]`);
        for (const block of blocks) {
            const title = await block.$(`.//span[1]`).getText();
            console.log(title);
            const rows = await block.$$(`./div[.//b]`);
            for (const row of rows) {
                const text = await row.getText();
                if (text.trim()) console.log(text.trim());
            }
            console.log("");
        }
    }

    public async printScaledRiskMatrixData() {
        console.log("---- Scaled Risk Matrix Data ----");
        const container = await $(`(//div[.//span and .//b])[2]`);
        const blocks = await container.$$(`./div[.//span and .//b]`);
        for (const block of blocks) {
            const title = await block.$(`.//span[1]`).getText();
            console.log(title);
            const rows = await block.$$(`./div[.//b]`);
            for (const row of rows) {
                const text = await row.getText();
                if (text.trim()) console.log(text.trim());
            }
            console.log("");
        }
    }

    public async verifyCMLSection()
    {
        console.log("Start: Verifying CML section of ASD");
        await utils.switchToIframe(this.ASDIframe);
        await this.cmlTab.waitForExist({ timeout: 30000 });
        await this.cmlTab.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.cmlTab);
        await browser.pause(2000);
        await this.noOfCML.waitForDisplayed({timeout: 10000});
        const text = await this.noOfCML.getText();
        const noOfCML = parseInt(text);
        console.log("Number of CML found: " + noOfCML);
        const table = await $("//div[@role='treegrid']");
        let prevCount = 0;
        while (true) {
            const rows = await $$("//tr[@role='row']");
            const currentCount = await rows.length;
            if (currentCount === prevCount) break;
            prevCount = currentCount;
            await browser.execute(el => {
                el.scrollTop = el.scrollHeight;
            }, table);
            await browser.pause(1000);
        }
        const techObjs = await $$("//td[@aria-colindex='2']//span[normalize-space()]");
        console.log("The technical objects assigned are:");
        for (let obj of techObjs) {
            const text = await obj.getText();
            if (text.trim() !== "") {
                console.log(text);
            }
        }
        const cmls = await $$("//td[@aria-colindex='3']//div[normalize-space()]");
        console.log("\n and the CMLs assigned are:");
        for (let cml of cmls) {
            const text = await cml.getText();
            if (text.trim() !== "") {
                console.log(text);
            }
        }
    }

    public async verifyRiskInfo()
    {
        console.log("Start: Verifying risk information of ASD");
        await utils.switchToIframe(this.ASDIframe);
        await this.riskAndInfoTab.waitForExist({ timeout: 30000 });
        await this.riskAndInfoTab.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.riskAndInfoTab);
        await browser.pause(2000);
        const isErrorPresent = await this.errorOkBtn.isDisplayed().catch(() => false);
        if (isErrorPresent) {
            await this.errorOkBtn.waitForClickable({ timeout: 5000 });
            await this.errorOkBtn.click();
            console.log("Error popup handled → OK clicked");
            return;
        }
        const riskInfo = await utils.getAssignedValue(await this.riskInformationValue.getText());
        const strategies = await utils.getAssignedValue(await this.strategiesValue.getText());
        const recommendations = await utils.getAssignedValue(await this.recommendationsValue.getText());
        console.log("Risk Information:"+ riskInfo);
        await this.verifyEquipmentInfo();
        console.log("Strategies:"+ strategies);
        await this.createEditFreezeDeleteStrategy();
        console.log("Recommendations:"+ recommendations);
        console.log("Risk information of ASD verified successfully");
    }

    public async verifyEquipmentInfo()
    {
        console.log("Verifying equipment count and equipment numbers in Risk Information...");
        const expectedEquipmentNumbers = ASDListView.assetEquipmentNumbers || [];
        const expectedCount = expectedEquipmentNumbers.length;
        await this.equipmentSectionHeader.waitForDisplayed({ timeout: 15000 });
        const headerText = (await this.equipmentSectionHeader.getText()).trim();
        const actualCount = await utils.getAssignedValue(headerText);
        console.log(`Equipment header text: '${headerText}' → actual count: ${actualCount}, expected: ${expectedCount}`);
        if (actualCount !== expectedCount) {
            throw new Error(`Equipment count mismatch: expected ${expectedCount}, found ${actualCount}`);
        }
        for (const equipNo of expectedEquipmentNumbers) {
            const cell = await this.equipmentCell(equipNo);
            await cell.waitForDisplayed({ timeout: 15000 });
            if (!(await cell.isDisplayed())) {
                throw new Error(`Equipment '${equipNo}' not found in Risk Information section`);
            }
            console.log(`Equipment '${equipNo}' confirmed present in Risk Information section`);
        }
        console.log("Equipment count and equipment numbers verified successfully");
    }

    public async createEditFreezeDeleteStrategy()
    {
        await this.createStartegy();
        await this.editStrategy();
        await this.freezeStrategy();
        await this.deleteStrategy();
    }

    public async createStartegy()
    {
        console.log("Creating new startegy in risk information...");
        await utils.clickWithWait(this.newStrategyBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await this.createNewStrategyHeader.waitForDisplayed();
        await utils.clickWithWait(this.shortDescriptionDropdown);
        await utils.clickWithWait(this.shortDescriptionOption);
        this.strategyData.shortDescription = await this.strategyShortDescriptionInput.getAttribute("value");
        this.strategyData.longDescription = (await this.longDescriptionText.getText()).trim();
        await utils.clickWithWait(this.sectionDropdown);
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        this.strategyData.section = await this.sectionInput.getAttribute("value");
        await utils.setValueWithWait(
            this.dueDateInput,
            utils.formatDatePlus(30),
            1000
        );
        await utils.clickWithWait(this.createBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton(5000);
        console.log("Short Description: " + this.strategyData.shortDescription);
        console.log("Long Description: " + this.strategyData.longDescription);
        console.log("Section: " + this.strategyData.section);
        console.log("New startegy in risk information created");
    }

    public async editStrategy()
    {
        console.log("Editing newly created strategy...");
        const searchText = (this.strategyData.shortDescription || "").trim();
        const sectionText = (this.strategyData.section || "").trim();
        const searchInput = await this.strategySearchInput;
        await searchInput.waitForDisplayed({ timeout: 30000 });
        await searchInput.click();
        // Hard-clear any pre-existing text (UI5 search field sometimes retains prior value)
        try { await searchInput.clearValue(); } catch { /* ignore */ }
        await browser.keys(["Control", "a"]);
        await browser.keys("Backspace");
        // Type the strategy name exactly once
        await searchInput.addValue(searchText);
        const typedValue = await searchInput.getAttribute("value");
        console.log(`Strategies search input value after typing: '${typedValue}'`);
        await utils.clickWithWait(this.strategySearchBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await this.selectStrategyRowByDetails(searchText, sectionText);

        await utils.clickWithWait(this.editAndUpdateBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await this.updateRecommendationsHeader.waitForDisplayed({ timeout: 30000 });
        const updatedShortDescription = `Updated ${this.strategyData.shortDescription}`;
        await utils.setValueWithWait(
            this.strategyShortDescriptionInput,
            updatedShortDescription,
            1000
        );
        this.strategyData.shortDescription = updatedShortDescription;
        await utils.clickWithWait(this.updateRecommendationsSaveBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton(5000);
        console.log("Newly created strategy edited successfully");
    }

    private async selectStrategyRowByDetails(shortDescription: string, section: string): Promise<void> {
        console.log(`Locating strategy row with Short Description='${shortDescription}' and Section='${section}'...`);
        const candidateRows = await $$(
            `//tr[@data-sap-ui-rowindex and .//h5//span[normalize-space()=${this.xpathLiteral(shortDescription)}]]`
        );
        let matchedRowIndex: string | null = null;
        for (const row of candidateRows) {
            const rowIndex = await row.getAttribute("data-sap-ui-rowindex");
            if (rowIndex === null) continue;
            const twinRows = await $$(
                `//tr[@data-sap-ui-rowindex='${rowIndex}' and .//td[@aria-colindex='6']]`
            );
            let sectionCellText = "";
            for (const twin of twinRows) {
                const cell = await twin.$(`.//td[@aria-colindex='6']//span`);
                if (await cell.isExisting()) {
                    const txt = (await cell.getText().catch(() => "")).trim();
                    if (txt) { sectionCellText = txt; break; }
                }
            }
            console.log(`  Row #${rowIndex}: shortDesc='${shortDescription}', section='${sectionCellText}'`);
            if (!section || sectionCellText === section) {
                matchedRowIndex = rowIndex;
                break;
            }
        }
        if (matchedRowIndex === null) {
            throw new Error(`Could not find strategy row matching shortDescription='${shortDescription}' and section='${section}'.`);
        }
        const rowSelector = await $(`//div[@id='idNewTable-rowsel${matchedRowIndex}']`);
        await rowSelector.waitForDisplayed({ timeout: 10000 });
        await utils.clickWithWait(rowSelector);
        console.log(`Selected strategy row index ${matchedRowIndex}.`);
    }

    private xpathLiteral(value: string): string {
        if (!value.includes("'")) return `'${value}'`;
        if (!value.includes('"')) return `"${value}"`;
        const parts = value.split("'");
        return "concat(" + parts.map((p, i) => `'${p}'${i < parts.length - 1 ? ", \"'\", " : ""}`).join("") + ")";
    }

    public async freezeStrategy()
    {
        console.log("Freezing newly created strategy...");
        
    }

    public async deleteStrategy()
    {
        console.log("Deleting newly created strategy...");
        const searchText = (this.strategyData.shortDescription || "").trim();
        const sectionText = (this.strategyData.section || "").trim();
        await this.searchStrategy(searchText);
        await this.selectStrategyRowByDetails(searchText, sectionText);
        await utils.clickWithWait(this.deleteStartegyBtn);
        await browser.pause(1500);
        await this.yesBtn.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(this.yesBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton(5000);
        await browser.pause(2000);
        await this.searchStrategy(searchText);
        const remainingRows = await $$(
            `//tr[@data-sap-ui-rowindex and .//h5//span[normalize-space()=${this.xpathLiteral(searchText)}]]`
        );
        const remainingCount = await remainingRows.length;
        if (remainingCount > 0) {
            throw new Error(`Strategy '${searchText}' still present after delete (found ${remainingCount} row(s)).`);
        }
        console.log(`Strategy '${searchText}' confirmed deleted (not present after re-search).`);
    }

    private async searchStrategy(searchText: string): Promise<void> {
        const searchInput = await this.strategySearchInput;
        await searchInput.waitForDisplayed({ timeout: 30000 });
        await searchInput.click();
        try { await searchInput.clearValue(); } catch { /* ignore */ }
        await browser.keys(["Control", "a"]);
        await browser.keys("Backspace");
        await searchInput.addValue(searchText);
        console.log(`Strategies search input value after typing: '${await searchInput.getAttribute("value")}'`);
        await utils.clickWithWait(this.strategySearchBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
    }

    public async verifyMaintenanceAndServiceInfo()
    {
        console.log("Start: Verifying maintenance and service information of ASD");
        await utils.clickWithWait(this.maintenanceAndServiceTab);
        await browser.pause(2000);
        const maintenanceNotification = await utils.getAssignedValue(await this.maintenanceNotificationValue.getText());
        const maintenanceOrders = await utils.getAssignedValue(await this.maintenanceOrdersValue.getText());
        const maintenancePlans = await utils.getAssignedValue(await this.maintenancePlansValue.getText());
        console.log("Maintenance Notification:", maintenanceNotification);
        console.log("Maintenance Orders:", maintenanceOrders);
        console.log("Maintenance Plans:", maintenancePlans);
        console.log("Maintenance and service information of ASD verified successfully");
    }

    public async downloadAndVerifyReport() {
        console.log("Downloading detail report...");
        await utils.switchToIframe(this.ASDIframe);
        if (await this.headerMoreBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.headerMoreBtn);
            await browser.pause(1000);
        }
        await ASDListView.captureASDNameAndId();
        await utils.clickWithWait(this.reportBtn);
        await browser.pause(2000);
        await browser.keys("ArrowDown");
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await utils.waitForBusyIndicatorToDisappear();
        const filePath = await utils.waitForDownload('.pdf');
        const pdfContent = await utils.extractTextFromPDF(filePath);

        if (!pdfContent || pdfContent.trim() === "") {
            throw new Error("PDF content is empty");
        }

        console.log("------ PDF CONTENT ------");
        console.log(pdfContent);
        console.log("-------------------------");
        const normalize = (val: string) =>
            (val || "").toLowerCase().replace(/[^a-z0-9]/g, "");

        const content = normalize(pdfContent);
        const verifyValue = (label: string, value: string) => {
            if (!value) return;
            const norm = normalize(value);
            if (value.includes("(")) {
                const match = value.match(/(.*)\((.*)\)/);
                if (match) {
                    const name = normalize(match[1]);
                    const id = normalize(match[2]);
                    const ok = content.includes(name) && content.includes(id);

                    expect(ok).toBe(true);
                    console.log(`PDF contains ${label} (name + id)`);
                    return;
                }
            }
            expect(content).toContain(norm);
            console.log(`PDF contains ${label}`);
        };

        verifyValue("ASD ID", ASDListView.assetASDDisplayID);
        verifyValue("ASD Description", ASDListView.assetASDDesc);
        console.log("PDF Detail report verification completed");
    }

    private async selectReviewer(searchText: string) {
        console.log(`Selecting reviewer '${searchText}'...`);
        await utils.clickWithWait(this.reviewersInput);
        await this.selectUserPopupHeader.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(this.selectUserSearchInput);
        await utils.setValueWithWait(this.selectUserSearchInput, searchText);
        await browser.keys("Enter");
        await browser.pause(1500);
        await utils.waitForBusyIndicatorToDisappear();
        await this.selectUserFirstRowCheckbox.waitForDisplayed({ timeout: 15000 });
        await utils.clickWithWait(this.selectUserFirstRowCheckbox);
        await utils.clickWithWait(this.selectUserConfirmBtn);
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`Reviewer '${searchText}' selected`);
    }

    public async createWorkflow()
    {
        await utils.switchToIframe(this.ASDIframe);
        await browser.pause(4000);
        const isOddDay = new Date().getDate() % 2 !== 0;
        if (!isOddDay) 
        {
            console.log("Workflow creation will not execute today...");
            return;
        }
        console.log("Creating workflow for the ASD...");

        if (await this.headerMoreBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.headerMoreBtn);
            await browser.pause(3000);
        }
        await utils.clickWithWait(this.workflowBtn);
        await browser.pause(3000);

        await this.workflowHeader.waitForDisplayed({ timeout: 10000 });
        const day = new Date().getDay(); 
        const isdays = day >= 1 && day <= 3;

        if (await this.createWorkflowBtn.isDisplayed().catch(() => false)) {
            if (isdays) {
                console.log("Creating Technical Review Workflow");
                await utils.clickWithWait(this.createWorkflowBtn);
                await browser.keys("ArrowDown");
                await browser.keys("Enter");
                await browser.pause(2000);
                await this.selectReviewer("qa.automation");
                await utils.clickWithWait(this.createWorkflowBtn2);
                await this.workflowSuccessMsg.waitForDisplayed({ timeout: 10000 });
                console.log("Technical Workflow created");
                await utils.clickWithWait(this.okBtn);
                await browser.pause(2000);
                await utils.waitForBusyIndicatorToDisappear();
            }   
            else {
                console.log("Creating Recommendation Workflow");
                await utils.clickWithWait(this.createWorkflowBtn);
                await browser.keys("Enter");
                await browser.pause(2000);
                await utils.clickWithWait(this.createWorkflowBtn2);
                await this.workflowSuccessMsg.waitForDisplayed({ timeout: 10000 });
                console.log("Recommendation Workflow created");
                await utils.clickWithWait(this.okBtn);
                await browser.pause(2000);
                await utils.waitForBusyIndicatorToDisappear();
                const headers = await utils.captureHeaderDetails();
                if (headers["Status"] !== "Published") {
                    throw new Error(`Status is not Published → ${headers["Status"]}`);
                }
                this.publish = true;
                console.log("Status is Published");
            }
        } else {
            throw new Error("Create Workflow button not available. Hence, workflow cannot be created");
        }
        console.log("Workflow verified successfully");
    }

    public async deleteASD()
    {
        console.log("Inside deletion ASD method...");
        await utils.switchToIframe(this.ASDIframe);
        await browser.pause(4000);
        const headers = await utils.captureHeaderDetails();
        if (this.publish || headers["Status"]?.trim() === "Published") {
            console.log("Status is Published, Cannot delete the ASD");
            return;
        }
        console.log("Deleting the ASD...");
        // captureHeaderDetails() exits to the parent frame at the end, so we
        // must re-enter the ASD iframe before doing anything inside the app.
        await utils.switchToIframe(this.ASDIframe);
        await browser.pause(1000);
        await ASDListView.captureASDNameAndId();
        console.log("Deleting :" + ASDListView.assetASDDisplayID);
        if (await this.headerMoreBtn.isDisplayed().catch(() => false)) {
            await utils.clickWithWait(this.headerMoreBtn);
            await browser.pause(4000);
        }
        await utils.clickWithWait(this.deleteBtn);
        await browser.pause(2000);
        await utils.clickWithWait(this.yesBtn);
        await browser.pause(4000);
        await this.okBtn.waitForDisplayed({ timeout: 60000 });
        await utils.clickSuccessOkButton();
        console.log("ASD deleted successfully");
    }

    public async publishASD()
    {
        console.log("In publish method...");
        const today = new Date();
        const day = today.getDay();     
        const date = today.getDate();   
        const isEvenDay = date % 2 === 0;

        if (!isEvenDay){
            console.log("ASD publish will not execute today...");
            return;
        }

        if(await this.calculateAnalysis === false)
        {
            this.publish === false
            console.log("ASD CALCULATION WAS FAILED, HENCE CANNOT PUBLISH THE ASD");
            return;
        }
        else
        {
            console.log("Publishing the ASD...");
            if (await this.headerMoreBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.headerMoreBtn);
                await browser.pause(1000);
            }
            await utils.clickWithWait(this.publishASDBtn);
            await browser.pause(2000);
            await utils.clickWithWait(this.publishConfirmBtn);
            await this.headerData.waitForDisplayed({timeout: 10000});
            const text = await this.headerData.getText();
            const noOfRecc = await utils.getAssignedValue(text);
            if (noOfRecc === 0) {
                this.publish === false
                throw new Error("No recommendations found after publishing, something went wrong");
            }
            else
            {
                if (day === 1) {
                    await this.convertToNotification();
                }

                if (day === 3) {
                    await this.convertToAPMRecc();
                }

                if (day === 2 || day === 4 || day === 5) {
                    await this.skipAllRecc();
                }
            }
        }
    }

    public async convertToNotification() 
    {
        await utils.clickWithWait(this.selectAllRecc);
        await utils.clickWithWait(this.publishBtn);
        console.log("Converting to notification");
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await browser.pause(2000);
        await utils.waitForBusyIndicatorToDisappear();
        while (true) {
            await this.notificationHeader.waitForDisplayed({ timeout: 20000 });
            await utils.clickWithWait(this.notificationTypeDrp);
            await this.notificationTypePopup.waitForDisplayed({ timeout: 20000 });
            await utils.clickWithWait(this.notificationTypeFirstRow);
            await utils.clickWithWait(this.notificationTypeSaveBtn);
            await browser.pause(2000);
            await utils.waitForBusyIndicatorToDisappear();

            await utils.clickWithWait(this.notificationPriorityDrp);
            await this.notificationPriorityPopup.waitForDisplayed({ timeout: 10000 });
            await utils.clickWithWait(this.notificationPriorityFirstRow);
            await utils.clickWithWait(this.notificationPrioritySaveBtn);
            await browser.pause(2000);
            await utils.waitForBusyIndicatorToDisappear();

            if (await this.notificationPublishBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.notificationPublishBtn);
                await browser.pause(2000);
                await this.notiSucMsg.waitForDisplayed({ timeout: 20000 });
                console.log("Notification created successfully");
                await utils.clickWithWait(this.okBtn);
                await browser.pause(5000);
                const headers = await utils.captureHeaderDetails();
                if (headers["Status"] !== "Published") {
                    throw new Error(`Status is not Published → ${headers["Status"]}`);
                }
                this.publish === true;
                console.log("Status is Published");
                break;
            }

            if (await this.notificationNextBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.notificationNextBtn);
                await browser.pause(1000);
            } else {
                break;
            }
        }
    }

    public async convertToAPMRecc()
    {
        await utils.clickWithWait(this.selectAllRecc);
        await utils.clickWithWait(this.publishBtn);
        console.log("Converting to APM recommendation");
        await browser.keys("ArrowDown");
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        while (true) {
            await this.recWorkbenchHeader.waitForDisplayed({ timeout: 20000 });
            
            if (await this.recPublishBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.recPublishBtn);
                await browser.pause(2000);
                await this.reccSucMsg.waitForDisplayed({ timeout: 20000 });
                console.log("Recommendation created successfully");
                await utils.clickWithWait(this.okBtn);
                await browser.pause(5000);
                const headers = await utils.captureHeaderDetails();
                if (headers["Status"] !== "Published") {
                    throw new Error(`Status is not Published → ${headers["Status"]}`);
                }
                this.publish === true;
                console.log("Status is Published");
                break;
            }
            if (await this.recNextBtn.isDisplayed().catch(() => false)) {
                await utils.clickWithWait(this.recNextBtn);
                await browser.pause(1000);
            } else {
                break;
            }
        }
    }

    public async skipAllRecc()
    {
        await utils.clickWithWait(this.selectAllRecc);
        await utils.clickWithWait(this.publishBtn);
        console.log("Skipping all the recommendation");
        await browser.keys("ArrowDown");
        await browser.keys("ArrowDown");
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await this.skipAllReccSuccMsg.waitForDisplayed({ timeout: 20000 });
        await utils.clickWithWait(this.okBtn);
        console.log("All recommendations are skipped successfully");
        const headers = await utils.captureHeaderDetails();
        if (headers["Status"] !== "Published") {
            throw new Error(`Status is not Published → ${headers["Status"]}`);
        }
        this.publish === true;
        console.log("Status is Published");
    }

}export default new asset_strategy_development_detailview_page();
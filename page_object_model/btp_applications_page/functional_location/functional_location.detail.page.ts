import functionalLocationListView from './functional_location.listview.page';
import {funcLocTestData} from '../../../test_data/btp_applications/functional_location.data';
import utils from '../../../utils/utils';
/**
 * Page Object Model for the Fixed AIP Application within the SAP utils.
 */
class functionalLocationDetailView {

    private get funLocHeader() {  
        return $(`(//header//*[@role='heading']/span[text()='${functionalLocationListView.functionalLocName}'])[2]`); 
    }

    private get funLocHeadChk() {  
        return $("(//header//*[@role='heading']/span)[3]"); 
    }

    private get funLocEditHeader() {  
        return $("//bdi[text()='Edit Header']"); 
    }

    private get funLocDescEditHeader() {  
        return $("//bdi[text()='Functional Location Description']/following::input[1][not(@readonly)]"); 
    }

    private get funLocCategoryEditHeader() {
        return $("//bdi[text()='Category']/following::input[1]");
    }

    private get funLocCategory() {
        return $("//span[text()='Select Category']");
    }

    private get funLocCtgChoose() {
        return $(`//span[text()='${funcLocTestData.headerInfoEdit.linearAsset}']/ancestor::tr//td[2]//*[name()='circle'][2]`);
    }

    private get funLocCtgSave() {
        return $("(//bdi[text()='Save'])[2]");
    }

    private get funLocheaderSave() {
        return $("//bdi[text()='Save']");
    }

    private get funLocHdSaveSucc() {
        return $("//span[text()='Updated successfully']");
    }

    private get funLocHdOkBtn() {
        return $("//bdi[text()='OK']");
    }

    private get objectType() {
        return $("//bdi[text()='Object Type']/following::input[1]");
    }

    private get selectObjGrpBox() {
        return $("//span[text()='Select Object Type']");
    }
    private get selectObj() {
        return $("//span[.='Select Object Type']/ancestor::header/following::*[name()='circle'][2]");
    }
    private get selectObjSave() {
        return $("//footer//*[name()='bdi' and text()='Save']");
    }

    private get editGenInfo() {
        return $("//bdi[text()='Edit']");
    }
    private get authGrp() {
        return $("//bdi[text()='Authorization Group']/following::input[1]");
    }

    private get inventryGrp() {
        return $("//bdi[text()='Inventory Number']/following::input[1]");
    }

    private get strUpDt() {
        return $("//bdi[text()='Start up date']/following::input[1]");
    }

    private get longDesc() {
        return $("//bdi[text()='Long Description']/following::textarea[1]");
    }

    private get acqValue() {
        return $("//bdi[text()='Acquisition Value / Currency']/following::input[1]");
    }
    private get acqCurr() {
        return $("//bdi[text()='Acquisition Value / Currency']/following::input[2]");
    }
    private get selectCurrBox() {
        return $("//span[text()='Select Currency']");
    }
    private get selectCurr() {
        return $("//span[.='Select Currency']/ancestor::header/following::*[name()='circle'][2]");
    }
    private get selectCurrSave() {
        return $("//footer//*[name()='bdi' and text()='Save']");
    }

    private get asstManuName() {
        return $("//bdi[text()='Asset Manufacturer Name ']/following::input[1]");
    }
    private get modelNum() {
        return $("//bdi[text()='Model Number ']/following::input[1]");
    }
    private get partNum() {
        return $("//bdi[text()='Part Number']/following::input[1]");
    }
    private get manuSrlNum() {
        return $("//bdi[text()='Manufacturer Serial Number']/following::input[1]");
    }
    private get country() {
        return $("//bdi[text()='Country']/following::input[1]");
    }
    private get cntryBox() {
        return $("//span[text()='Select Country']");
    }
     private get cntryBoxSelect() {
        return $("//span[.='Select Country']/ancestor::header/following::*[name()='circle'][2]");
    }
    private get cntrySave() {
        return $("//footer//*[name()='bdi' and text()='Save']");
    }
    private get cnstYear() {
        return $("(//bdi[text()='Construction Year / Month']/ancestor::label/../following-sibling::div//span)[1]");
    }
    private get cnstYearSelect() {
        return $(`//div[text()='${funcLocTestData.generalInfoEdit.constructionYear}']`);
    }
    private get cnstMon() {
        return $("(//bdi[text()='Construction Year / Month']/ancestor::label/../following-sibling::div//span)[2]");
    }
    private get cnstMonSelect() {
        return $(`//span[text()='${funcLocTestData.generalInfoEdit.constructionMonth}']`);
    }
    private get mntPlant() {
        return $("//bdi[text()='Maintenance Plant']/following::input[1]");
    }
    private get mntPlantBox() {
        return $("//span[text()='Select Maintenance Plant']");
    }
    private get mntPlantSelect() {
        return $("//span[.='Select Maintenance Plant']/ancestor::header/following::*[name()='circle'][2]");
    }
    private get mntPlantSave() {
        return $("//footer//*[name()='bdi' and text()='Save']");
    }
    private get plantSec() {
        return $("//bdi[text()='Plant Section']/following::input[1]");
    }
    private get plantSecBox() {
        return $("//span[text()='Select Plant Section']");
    }
    private get plantSecSelect() {
        return $("//span[.='Select Plant Section']/ancestor::header/following::*[name()='circle'][2]");
    }
    private get plantSecSave() {
        return $("//footer//*[name()='bdi' and text()='Save']");
    }
    private get workCen() {
        return $("//bdi[text()='Work Center ']/following::input[1]");
    }
    private get workCenBox() {
        return $("//span[text()='Select Work Center ']");
    }
    private get workCenSelect() {
        return $("//span[.='Select Work Center ']/ancestor::header/following::*[name()='circle'][2]");
    }
    private get workCenSave() {
        return $("//footer//*[name()='bdi' and text()='Save']");
    }
    private get criticality() {
        return $("//bdi[text()='Criticality']/following::input[1]");
    }
    private get criticalityBox() {
        return $("//span[text()='Select Criticality']");
    }
    private get criticalitySelect() {
        return $("//span[.='Select Criticality']/ancestor::header/following::*[name()='circle'][4]");
    }
    private get criticalitySave() {
        return $("//footer//*[name()='bdi' and text()='Save']");
    }
    private get sortField() {
        return $("//bdi[text()='Sort Field ']/following::input[1]");
    }
    private get funLoc() {
        return $("//bdi[text()='Functional Location']/following::input[1]");
    }
    private get compCode() {
        return $("//bdi[text()='Company Code ']/following::input[1]");
    }
    private get costCenter() {
        return $("//bdi[text()='Cost Center ']/following::input[1]");
    }
    private get bussArea() {
        return $("//bdi[text()='Business Area']/following::input[1]");
    }
    private get planPlant() {
        return $("//bdi[text()='Planning Plant']/following::input[1]");
    }
    private get planPlantBox() {
        return $("//span[text()='Select Planning Plant']");
    }
    private get planPlantSelect() {
        return $("//span[.='Select Planning Plant']/ancestor::header/following::*[name()='circle'][4]");
    }
    private get planPlantSave() {
        return $("//footer//*[name()='bdi' and text()='Save']");
    }
    private get planGrp() {
        return $("//bdi[text()='Planner Group']/following::input[1]");
    }
    private get planGrpBox() {
        return $("//span[text()='Select Planner Group']");
    }
    private get planGrpSelect() {
        return $("//span[.='Select Planner Group']/ancestor::header/following::*[name()='circle'][4]");
    }
    private get planGrpSave() {
        return $("//footer//*[name()='bdi' and text()='Save']");
    }
    private get ctgProfile() {
        return $("//bdi[text()='Catalog Profile']/following::input[1]");
    }
    private get ctgProfileBox() {
        return $("//span[text()='Select Catalog Profile']");
    }
    private get CtgProfileSelect() {
        return $("//span[.='Select Catalog Profile']/ancestor::header/following::*[name()='circle'][6]");
    }
    private get CtgProfileSave() {
        return $("//footer//*[name()='bdi' and text()='Save']");
    }
    private get infoSave() { 
        return $("//bdi[normalize-space()='Save']/ancestor::button");
    }
    private get infoSuccUpdate() {
        return $("//span[normalize-space()='Updated successfully']");
    }
    private get infoUpdateOK() {
        return $("//bdi[text()='OK']");
    }
    private get funLocStrucTab() {  
        return $("//bdi[text()='Structure']"); 
    }
    private get funLocAssetIntTab() {  
        return $("//bdi[text()='Asset Intelligence']"); 
    }
    private get funLocRiskSumTab() {  
        return $("//bdi[text()='Risk Summary']"); 
    }
    private get editStrucInfo() {
        return $("//bdi[text()='Edit']");
    }
    private get superFunLoc() {
        return $("//bdi[text()='Superior Functional Location']/following::input[1]");
    }
    private get superFunLocBox() {
        return $("//span[text()='Select Functional Location']");
    }
    private get superFunLocSelect() {
        return $("(//tr[@role='row'])[2]//td[2]//span");
    }
    private get superFunLocDesc() {
        return $("//bdi[text()='Superior Functional Location Description']/following::input[1]");
    }
    private get compInfoAsgn() {
        return $("//bdi[text()='Assign']");
    }
    private get compInfoEqAsgn() {
        return $("//li[contains(.,'Equipment')]");
    }
    private get compInfoEqCnf() {
        return $("//bdi[text()='Confirm']");
    }
    private get yesBtn() {
        return $("//bdi[text()='Yes']");
    }
    private get cancelBtn() {
        return $("//bdi[text()='Cancel']");
    }
    private get okBtn() {
        return $("//bdi[text()='OK']");
    }
    private get okBtn2() {
        return $("//bdi[text()='Ok']");
    }
    private get compInfoFunLocAsgn() {
        return $("//li[contains(.,'Functional Location')]");
    }
    private get groups() {
        return $("//div[text()='Groups']/following::span[1]");
    }
    private get components() {
        return $("//div[text()='Component Information']/following::span[1]");
    }
    private get funLocAsgnTab() {  
        return $("//bdi[text()='Assignments']"); 
    }
    private get funLocMDATab() {  
        return $("//bdi[text()='Classification & MDA']"); 
    }
    private get asgnFunLocTemp() {
        return $("(//div[text()='Functional Location Templates']/following::bdi[text()='Assign'])[1]");
    }
    private get asgnClsAndChr() {
        return $("(//div[text()='Class & Characteristics']/following::bdi[text()='Assign'])[1]");
    }
    private get asgnChrMDA() {
        return $("//span[text()='Maintenance Data Attribute']/following::bdi[text()='Assign']");
    }
    private get autoAsgnClsAndChr() {
        return $("//footer//div[@role='checkbox' and .//bdi[text()='Auto assign Class and Characteristics']]");
    }
    private get class() {
        return $("//div[text()='Class & Characteristics']/following::span[1]");
    }
    private get noOfClassMDA() {
        return $("//span[text()='Assign Classes']/following::span[2]");
    }
    private get characteristics () {
        return $("//div[text()='Class & Characteristics']/following::h2[2]");
    }
    private get noOfCharMDA () {
        return $("//span[text()='Maintenance Data Attribute']/following::h2//span");
    }
    private get riskAndCriticality() {
        return $("//div[text()='Risk and Criticality']/following::span[1]");
    }
    private get assetInsp() {
        return $("//div[text()='Asset Inspection']/following::span[1]");
    }
    private get findings() {
        return $("//div[text()='Findings']/following::span[1]");
    }
    private get recommend() {
        return $("//div[text()='Recommendations']/following::span[1]");
    }
    private get assetStrategyRBI() {
        return $("(//div[text()='Asset Strategy']/following::li//div//div)[1]");
    }
    private get assetStrategyRCM() {
        return $("(//div[text()='Asset Strategy']/following::li//div//div)[2]");
    }
    private get riskProfile() {
        return $("//bdi[text()='Risk Summary']//following::h2[1]");
    }
    private get component() {
        return $("//bdi[text()='Risk Summary']//following::h2[2]");
    }
    private get recommendation() {
        return $("//bdi[text()='Risk Summary']//following::div[@aria-level='2']//span");
    }
    private get funLocTemp() {
        return $("//div[text()='Functional Location Templates']/following::span[1]");
    }

    public async verifyHeader(): Promise<void> {
        console.log("Verifying Functional Location name");
        await this.funLocHeader.isDisplayed();
        const funHeader = await this.funLocHeader.getText();
        console.log(funHeader);
        const funLocName = functionalLocationListView.functionalLocName;
        await expect(funHeader).toEqual(funLocName);
        console.log("Functional Location name matches header's name");
    }

    public async editHeader(): Promise<void> {
        console.log("Editing header's Information");
        await utils.clickWithWait(this.funLocEditHeader);
        await utils.setValueWithWait(this.funLocDescEditHeader,funcLocTestData.headerInfoEdit.funLocDesc);
        await utils.clickWithWait(this.funLocCategoryEditHeader);
        await this.funLocCategory.waitForDisplayed({ timeout: 30000 });
        await this.funLocCtgChoose.scrollIntoView();
        await utils.clickWithWait(this.funLocCtgChoose);
        await utils.clickWithWait(this.funLocCtgSave);
        await utils.clickWithWait(this.funLocheaderSave);
        await this.funLocHdSaveSucc.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.funLocHdOkBtn);
        console.log("Header edited successfully");

    }

    public async verifyAndEditGeneralInfo() {
        console.log("Verifying and editing General Information");
        await utils.clickWithWait(this.editGenInfo);
        await utils.clickWithWait(this.objectType);
        await this.selectObjGrpBox.waitForDisplayed({ timeout: 90000 });
        await utils.clickWithWait(this.selectObj,2000);
        await utils.clickWithWait(this.selectObjSave,1000);
        await utils.setValueWithWait(
            this.authGrp,
            funcLocTestData.generalInfoEdit.authorizationGroup
        );
        await utils.setValueWithWait(
            this.inventryGrp,
            funcLocTestData.generalInfoEdit.inventoryNumber
        );
        await utils.setValueWithWait(
            this.strUpDt,
            funcLocTestData.generalInfoEdit.startUpDate
        );
        await utils.setValueWithWait(
            this.longDesc,
            funcLocTestData.generalInfoEdit.longDescription
        );
        await utils.setValueWithWait(
            this.acqValue,
            funcLocTestData.generalInfoEdit.acqValue
        );
        await utils.clickWithWait(this.acqCurr);
        await this.selectCurrBox.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.selectCurr,2000);
        await utils.clickWithWait(this.selectCurrSave,1000);
        await utils.setValueWithWait(
            this.asstManuName,
            funcLocTestData.generalInfoEdit.assetManufacturer
        );
        await utils.setValueWithWait(
            this.modelNum,
            funcLocTestData.generalInfoEdit.modelNumber
        );
        await utils.setValueWithWait(
            this.partNum,
            funcLocTestData.generalInfoEdit.partNumber
        );
        await utils.setValueWithWait(
            this.manuSrlNum,
            funcLocTestData.generalInfoEdit.manufacturerSerialNum
        );
        await utils.clickWithWait(this.country);
        await this.cntryBox.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.cntryBoxSelect,2000);
        await utils.clickWithWait(this.cntrySave,1000);
        await utils.clickWithWait(this.cnstYear);
        await utils.clickWithWait(this.cnstYearSelect);
        await utils.clickWithWait(this.cnstMon);
        await utils.clickWithWait(this.cnstMonSelect);
        await utils.clickWithWait(this.mntPlant);
        await this.mntPlantBox.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.mntPlantSelect,2000);
        await utils.clickWithWait(this.mntPlantSave,1000);
        await utils.clickWithWait(this.plantSec);
        await this.plantSecBox.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.plantSecSelect,2000);
        await utils.clickWithWait(this.plantSecSave,1000);
        await utils.clickWithWait(this.workCen);
        await this.workCenBox.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.workCenSelect,2000);
        await utils.clickWithWait(this.workCenSave,1000);
        await utils.clickWithWait(this.criticality);
        await this.criticalityBox.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.criticalitySelect,2000);
        await utils.clickWithWait(this.criticalitySave,1000);
        await utils.setValueWithWait(
            this.sortField,
            funcLocTestData.generalInfoEdit.sortField
        );
        const funLocation = await utils.getValueWithWait(this.funLoc);
        console.log("Functional Location Assigned : "+funLocation);
        const compCode = await utils.getValueWithWait(this.compCode);
        console.log("Company Code : "+compCode);
        const costCenter = await utils.getValueWithWait(this.costCenter);
        console.log("Cost Center : "+costCenter)
        const bussinessArea = await utils.getValueWithWait(this.bussArea);
        console.log("Bussiness Area : "+bussinessArea)
        await utils.clickWithWait(this.planPlant);
        await this.planPlantBox.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.planPlantSelect,2000);
        await utils.clickWithWait(this.planPlantSave,1000);
        await utils.clickWithWait(this.planGrp);
        await this.planGrpBox.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.planGrpSelect,2000);
        await utils.clickWithWait(this.planGrpSave,1000);
        await utils.clickWithWait(this.ctgProfile);
        await this.ctgProfileBox.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.CtgProfileSelect,2000);
        await utils.clickWithWait(this.CtgProfileSave,1000);
        await this.infoSave.scrollIntoView();
        await utils.clickWithWait(this.infoSave,1000);
        await this.infoSuccUpdate.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.infoUpdateOK);
        console.log("General Information Edited and verifed");
    }

    public superFuncLocValue!: string;
    public funcLocHeadValue!: string;
    public async verifyAndEditStructure() {
        console.log("Navigating to Structure Tab");
        this.funcLocHeadValue = await utils.getTextWithWait(this.funLocHeadChk);
        await utils.clickWithWait(this.funLocStrucTab);
        await this.funLocStrucTab.waitForDisplayed({ timeout: 30000 });
        console.log("Navigated to Structure Tab successfully");
        await utils.clickWithWait(this.editStrucInfo);
        await utils.clickWithWait(this.superFunLoc);
        await this.superFunLocBox.waitForDisplayed({ timeout: 30000 });
        await browser.pause(8000);
        await utils.funLocFrameSwitch();

        this.superFuncLocValue = await utils.getTextWithWait(this.superFunLocSelect);

        //await utils.clickWithWait(this.superFunLocSelect);
        let i = 2;
        while (true) {
            const row = $(`(//tr[@role='row'])[${i}]//td[2]//span`);
            await row.waitForDisplayed({ timeout: 20000 });
            const text = await row.getText();
            if (text === this.funcLocHeadValue) {
                i++;
                continue;
            }
            this.superFuncLocValue = text; // store selected value
            await utils.clickWithWait(row);
            break;
        }

        await browser.pause(8000);
        const superFunLocDesc = await utils.getValueWithWait(this.superFunLocDesc);
        console.log(superFunLocDesc);
        await utils.clickWithWait(this.infoSave,1000);
        await this.infoSuccUpdate.waitForDisplayed({ timeout: 30000 });
        await utils.clickWithWait(this.infoUpdateOK);
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Structuring saved successfully");
    }

    public async assignEquipment(noOfEquipments: number) {
        await utils.clickWithWait(this.compInfoAsgn);
        await utils.clickWithWait(this.compInfoEqAsgn);
        await utils.selectCheckboxes(noOfEquipments);
        await utils.clickWithWait(this.compInfoEqCnf);
        await utils.clickWithWait(this.yesBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.okBtn);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        console.log("Equipment Components assigned successfully");
        const components = await this.components.getText();
        const count = await utils.getAssignedValue(components);
        console.log("No of Components assigned are :"+count);
    }

    public async assignFuncLoc(noOfFunLoc: number) {
    console.log("Assigning Functional Location");
    if (noOfFunLoc === 0) return;
    let selectedCount = 0;
    let i = 1;
    while (selectedCount < noOfFunLoc) {
        await utils.clickWithWait(this.compInfoAsgn);
        await utils.clickWithWait(this.compInfoFunLocAsgn);
        await browser.pause(2000);
        await utils.funLocFrameSwitch();
        let foundValid = false;
        while (!foundValid) {
            const row = $(`(//tr[@role='row'])[${i + 1}]//td[2]//span`);
            await row.waitForDisplayed({ timeout: 20000 });
            const text = await row.getText();
            console.log("Text -> "+text);
            if (text === this.funcLocHeadValue ||text === this.superFuncLocValue) {
                i++;
                continue;
            }
            await utils.clickWithWait(row);
            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1000);
            await utils.clickWithWait(this.okBtn);
            await utils.waitForBusyIndicatorToDisappear();
            selectedCount++;
            i++;
            foundValid = true;
            }
        }
        console.log("Funtional Location assigned");
        const components = await this.components.getText();
        const count = await utils.getAssignedValue(components);
        console.log("No of Components assigned are :"+count);
    }

    public async verifyGroups() {
        const groups = await this.groups.getText();
        const count = await utils.getAssignedValue(groups);
        console.log("No of groups assigned are :"+count);
    }

    public async asgFunLocTempAndCls(noOfFunTemp: number, autoAssign: boolean) {
        await this.asgnFunLocTemplate(noOfFunTemp, autoAssign)
    }

    public async asgnFunLocTemplate(noOfFunTemp: number, autoAssign: boolean): Promise<void> {
        await browser.pause(1000);
        await utils.funLocFrameSwitch();
        await this.funLocAsgnTab.waitForDisplayed({ timeout: 50000 });
        await this.funLocAsgnTab.click();

        await utils.funLocFrameSwitch();
        await this.asgnFunLocTemp.waitForClickable({ timeout: 30000 });
        await this.asgnFunLocTemp.click();
        await browser.pause(1000);

        await utils.selectCheckboxes(noOfFunTemp);
        if (autoAssign) {
            const checkBox = await this.autoAsgnClsAndChr;
            await checkBox.waitForClickable({ timeout: 30000 });
            await checkBox.click();
        }
        await utils.funLocFrameSwitch(); 
        await utils.clickWithWait(this.okBtn2);
        await browser.pause(1000);
        await utils.clickWithWait(this.okBtn);
        await utils.waitForBusyIndicatorToDisappear();
        const funLocTemp = await this.funLocTemp.getText();
        const count = await utils.getAssignedValue(funLocTemp);
        console.log("No of Functional Location Template assigned are :"+count);
    }

    async assignFunLocClass(noOfClasses: number, autoAssign: boolean): Promise<void> {
        const classes = await this.class.getText();
        await utils.getAssignedValue(classes);
        console.log("Already assigned classes: "+classes);
        const characteristics = await this.characteristics.getText(); 
        await utils.getAssignedValue(characteristics);
        console.log("No of characteristics assigned are -> "+characteristics);
        if (autoAssign) {
            console.log("Auto-assigning classes, skipping manual class assignment.");
            return;
        }
        await browser.pause(1000);
        await utils.funLocFrameSwitch();
        await this.funLocAsgnTab.waitForDisplayed({ timeout: 50000 });
        await this.funLocAsgnTab.click();
        await utils.funLocFrameSwitch();
        await this.asgnClsAndChr.waitForClickable({ timeout: 30000 });
        await this.asgnClsAndChr.click();
        await browser.pause(1000);
        await utils.funLocFrameSwitch();
        const availableText = await $("//span[text()='Assign Classes']/ancestor::header/following::span[1]").getText();
        const availableCount = await utils.getAssignedValue(availableText);
        console.log("Available classes:"+ availableCount);
        if (availableCount <= noOfClasses )
        {
            const selectAll = $("//span[text()='Assign Classes']/ancestor::header/following::th[2]");
            await utils.clickWithWait(selectAll);
        } 
        else {
            await utils.selectCheckboxes(noOfClasses);
        }
        await utils.clickWithWait(this.okBtn2,1500);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.okBtn,1500);
        await utils.waitForBusyIndicatorToDisappear();
        const updatedCharacteristicsText = await this.characteristics.getText();
        const updatedCharacteristics = await utils.getAssignedValue(updatedCharacteristicsText);
        console.log("No of characteristics assigned are -> " + updatedCharacteristics);
        const updatedClassesText = await this.class.getText();
        const updatedClasses = await utils.getAssignedValue(updatedClassesText);
        console.log("No of Assigned classes -> " + updatedClasses);
    }

    async assignFunLocChar(noOfChar: number): Promise<void> {
        let k=0;
        await browser.pause(1000);
        await utils.funLocFrameSwitch();
        await this.funLocMDATab.waitForDisplayed({ timeout: 50000 });
        await this.funLocMDATab.click();
        const char = await this.noOfCharMDA.getText();
        const c2 = await utils.getAssignedValue(char);
        console.log("Already assigned charactertics : "+c2);
        await browser.pause(1000);
        await utils.funLocFrameSwitch();
        await this.funLocMDATab.waitForDisplayed({ timeout: 50000 });
        await this.funLocMDATab.click();
        await utils.funLocFrameSwitch();
        await this.asgnChrMDA.waitForClickable({ timeout: 30000 });
        await this.asgnChrMDA.click();
        await browser.pause(1000);
        await utils.funLocFrameSwitch();
        const availableChar = await this.noOfClassMDA.getText();
        const availableCharCount = await utils.getAssignedValue(availableChar);
        console.log("Available characteritics:"+ availableCharCount);
        if(availableCharCount === 0)
        {
            console.log("No of characteritics available is zero")
            await this.cancelBtn.click();
            utils.waitForBusyIndicatorToDisappear();
            k=1;
        }
        else if (availableCharCount <= noOfChar )
        {
            const selectAll = $("//span[text()='Assign Classes']/ancestor::header/following::th[2]");
            await utils.clickWithWait(selectAll);
        } 
        if(k===0)
        {
        await utils.clickWithWait(this.okBtn2,1500);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.okBtn,1500);
        await utils.waitForBusyIndicatorToDisappear();
        }
        const updatedChar = await this.noOfCharMDA.getText();
        const uc = await utils.getAssignedValue(updatedChar);
        console.log("Assigned charactertics : "+uc);
    }

    public async verifyAssetIntelligence() {
        console.log("Navigating to Asset Intelligence Tab");
        await utils.clickWithWait(this.funLocAssetIntTab);
        await this.funLocAssetIntTab.waitForDisplayed({ timeout: 30000 });
        console.log("Navigated to Asset Intelligence Tab successfully");

        const riskAndCriti = await this.riskAndCriticality.getText();
        const r1 = await utils.getAssignedValue(riskAndCriti);
        console.log("Assigned risk and criticality : "+r1);

        const assetStraRBI = await this.assetStrategyRBI.getText();
        const as1 = await utils.getAssignedValue(assetStraRBI);
        console.log("Assigned asset strategy RBI : "+as1);

        const assetStraRCM = await this.assetStrategyRCM.getText();
        const as2 = await utils.getAssignedValue(assetStraRCM);
        console.log("Assigned asset strategy RCM: "+as2);

        const astInsp = await this.assetInsp.getText();
        const ai1 = await utils.getAssignedValue(astInsp);
        console.log("Assigned asset Inspection : "+ai1);

        const finding = await this.findings.getText();
        const f = await utils.getAssignedValue(finding);
        console.log("Assigned findings : "+f);

        const recommendations = await this.recommend.getText();
        const r = await utils.getAssignedValue(recommendations);
        console.log("Assigned recommendations : "+r);

    }

    public async verifyRiskSummary() {
        console.log("Navigating to Risk Summary Tab");
        await utils.clickWithWait(this.funLocRiskSumTab);
        await this.funLocRiskSumTab.waitForDisplayed({ timeout: 30000 });
        console.log("Navigated to Risk Summary Tab successfully");

        const riskProfile = await this.riskProfile.getText();
        const rp = await utils.getAssignedValue(riskProfile);
        console.log("Assigned risk profile : "+rp);

        const component = await this.component.getText();
        const c = await utils.getAssignedValue(component);
        console.log("Assigned component: "+c);

        const recommendation = await this.recommendation.getText();
        const recom = await utils.getAssignedValue(recommendation);
        console.log("Assigned reocmmendatios: "+recom);

    }

    public async verifyMainAndSum() {

    }
}
export default new functionalLocationDetailView();
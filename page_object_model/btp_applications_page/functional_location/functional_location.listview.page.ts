import { ChainablePromiseElement } from 'webdriverio';
import utils from '../../../utils/utils';

class functionalLocationListView {

    private get functionalLocationApp() { 
        return $("//a[contains(@aria-label, 'Functional Location')]"); 
    }
    private get newFunctionalLocButton() { 
        return $("//span[text()='Add']/ancestor::button"); 
    }

    private get newFunctionalLocName() { 
        return $("//bdi[text()='Functional Location Name']/ancestor::div[1]/following::input[1]"); 
    }

    private get shortDescName() { 
        return $("//bdi[text()='Short Description']/ancestor::div[1]/following::input[1]"); 
    }

    private get selectFunLocTemp() { 
        return $("//bdi[text()='Functional Location Template']/ancestor::div[1]/following::input[1]"); 
    }

    private get selectFuncTempBox() { 
        return $("//span[text()='Functional Location Template']"); 
    }

    private get selectParentAsset() { 
        return $("//bdi[text()='Parent Asset']/ancestor::div[1]/following::input[1]"); 
    }

    private get selectFuncLocBox() { 
        return $("//span[text()='Select Functional Location']"); 
    }
    private get selectParentFuncLoc() { 
        return $("(//tr[@role='row'])[3]//td[2]//span"); 
    }
    private get parentFuncLocDesc() { 
        return $("(//tr[@role='row'])[3]//td[3]//span"); 
    }
    private get createFuncLocButton() { 
        return $("//bdi[text()='Create']"); 
    }

    private get succCrtMsg() {  
        return $("//span[text()='Functional Location created successfully']"); 
    }

    private get oKbtn() {  
        return $("//bdi[text()='Ok']"); 
    }
    private funcLocSearched() {  
    return $("(//tr[@role='row']//span[@title='Navigation'])[1]");
    }

    private get funLocGeneralInfoTab() {  
        return $("//bdi[text()='General Information']/ancestor::button"); 
    }
    public functionalLocName!: string;
    public functionalLocDescName!: string;
    public parentFunctionalLoc: string = "FL0603";

        public async navigateToFunctionalLocation(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.functionalLocationApp);
        await utils.waitForBusyIndicatorToDisappear();
    }

    public async plusIconAndFuncLocSelect(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.newFunctionalLocButton);
    }

    public async funcLocSuccCreation(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await this.succCrtMsg.waitForDisplayed({ timeout: 100000 });
        console.log("Functional Location created successfully");
        await utils.clickWithWait(this.oKbtn);
    }

    public async naviagteFunctionalLocationListView(): Promise<void> {
        await utils.waitForSAPPopupAndClose();
        await this.navigateToFunctionalLocation();
        await utils.waitForSAPPopupAndClose();
        await utils.waitForBusyIndicatorToDisappear();
        await utils.funLocFrameSwitch();
        await utils.waitForSAPPopupAndClose();
        console.log("Navigated to Functional Location List View");
    }

    public async createFunctionalLocation(assignCount: number = 0): Promise<void> {
        console.log("Creating of Functional Location started");
        await this.plusIconAndFuncLocSelect();
        
        await utils.waitForBusyIndicatorToDisappear();
        this.functionalLocName = await utils.generateRandomFuncName();
        await utils.setValueWithWait(this.newFunctionalLocName, this.functionalLocName);

        this.functionalLocDescName = await utils.generateRandomFuncDescName();
        await utils.setValueWithWait(this.shortDescName, this.functionalLocDescName);

        if (assignCount > 0) {
            await utils.clickWithWait(this.selectFunLocTemp);
            await browser.pause(5000);
            await utils.selectCheckboxes(assignCount);
            await utils.clickWithWait(this.oKbtn, 3000);
            await utils.waitForBusyIndicatorToDisappear();
        }
        await utils.clickWithWait(this.selectParentAsset);
        await this.selectFuncLocBox.waitForDisplayed({ timeout: 30000 });
        await browser.pause(8000);
        await utils.funLocFrameSwitch();
        await utils.clickWithWait(this.selectParentFuncLoc);
        await browser.pause(8000);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.createFuncLocButton, 2000);
        await this.funcLocSuccCreation();
        console.log("Functional Location created");
    }

    public async navigateFunctionalLocation(): Promise<void> {

        await utils.waitForSAPPopupAndClose();
        await this.navigateToFunctionalLocation();
        await utils.waitForSAPPopupAndClose();  
        await utils.waitForBusyIndicatorToDisappear();
        await utils.funLocFrameSwitch();
        await utils.waitForSAPPopupAndClose();

        console.log("Navigating to Detail view page of Functional Location");
        await utils.waitForBusyIndicatorToDisappear();
        const nav = this.funcLocSearched();
        await utils.clickWithWait(nav);
        await utils.waitForBusyIndicatorToDisappear();
        await browser.switchFrame(null);
        await utils.funLocFrameSwitch();
        const el = await this.funLocGeneralInfoTab;
        await el.waitForExist({ timeout: 90000 });
        await browser.execute((element) => {element.scrollIntoView({ block: 'center' });}, el);
        await browser.pause(2000);
        await browser.execute((element) => {element.click();}, el);
        console.log("Navigated to Detail View page successfully");
    }
    
}

export default new functionalLocationListView();
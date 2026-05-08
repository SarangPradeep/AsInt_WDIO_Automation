
import utils from "utils/utils";  
class CML_ListView_Page {

    private get cmlApp() { return $("//a[contains(@aria-label, 'CMLs')]"); }
    private get CMLIframe() { return $('iframe[data-help-id="application-cml-manage"]'); }
    private get newCMLButton() { return $("//span[text()='New']/ancestor::button"); }
    private get createCMLHeader() { return $("//h1[.//text()='Create CML']"); }
    private get objectTypeValue() { return $("//bdi[text()='Object Type']/following::div[@tabindex='0'][1]"); }
    private get equipmentInput() { return $("//bdi[text()='Equipment']/following::span[2]"); }
    private get selectEquipmentHeader() { return $("//h1[.//text()='Select Equipment']"); }
    private equipmentRow(i: number) { return $(`(//tr[@role='row'])[${i}]//td[2]//span`); }
    private get cmlTemplateDropdown() { return $("//bdi[text()='CML Template']/following::span[5]"); }
    private cmlTemplateOption() { return $(`//bdi[text()='CML Template']/following::span[5]/following::li`); }
    private get errorHeader() { return $("//h1[.//text()='Error']"); }
    private get errorOkBtn() { return $("//h1[.//text()='Error']/following::button[.//text()='OK']"); }
    private get nextBtn() { return $("//footer//button[.//text()='Next']"); }
    private get selectedEquipmentText() { return $("//bdi[text()='EQUI:']/following::span[2]"); }
    private get selectedTemplateText() { return $("//bdi[text()='CML Template:']/following::span[2]"); }
    private get nameInput() { return $("(//th[.//text()='Name']/following::td[@aria-colindex='1']//input)[1]"); }
    private get descriptionInput() { return $("(//th[.//text()='Description']/following::td[@aria-colindex='2']//input)[1]"); }
    private get cmlTemplateCell() { return $("(//th[.//text()='CML Template']/following::td[@aria-colindex='3']//span)[1]"); }
    private cmlTemplateOptions(i: number) { return $(`((//th[.//text()='CML Template']/following::td[@aria-colindex='3']//span)[1]/following::li[@aria-posinset='${i}'])[1]`); }
    private get previousBtn() { return $("//footer//button[.//text()='Previous']"); }
    private get addGridCMLCheckbox() { return $("(//bdi[text()='Add Grid CMLs']/ancestor::div[@role='radio']//div)[1]"); }
    private get gridCMLNameInput() { return $("//bdi[text()='Grid CML Name']/following::input[1]"); }
    private get gridCMLTemplateDropdown() { return $("//bdi[text()='CML Template']/following::span[2]"); }
    private get gridCMLTemplateOption() { return $("//bdi[text()='CML Template']/following::span[2]/following::li[@aria-posinset='2'][1]"); }
    private get addGridCMLHeader() { return $("//h3[.//text()='Add Grid CMLs']"); }
    private get gridNameInputs() { return $$("//span[text()='Name']/following::td[@aria-colindex='1']//input"); }
    private get gridDescInputs() { return $$("//span[text()='Description']/following::td[@aria-colindex='2']//input"); }


    public selectedEquipment: string = "";
    public selectedEquTemplate: string = "";
    
    public async navigateToCMLListView() {
        console.log("Navigating to Asset Strategy Development List View");
        await this.navigateToCML(); 
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.CMLIframe);
        await browser.pause(2000);
        console.log("Navigated to Asset Strategy Development List View");

        // const el = await $('(//tr[@role="row"]//span[@title="Navigation"])[1]');
        // await utils.clickWithWait(el);
        // await browser.pause(10000);
    }
    
    public async navigateToCML(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.cmlApp);
        await utils.waitForBusyIndicatorToDisappear();
    }

    public async plusIconAndCMLSelect(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.newCMLButton);
    }

    public async createNewCMLs() {
        console.log("Creating new CMLs...");
        await this.plusIconAndCMLSelect();
        console.log("Chossing CML for creation")
        await browser.keys('Enter');
        await this.createCMLHeader.waitForDisplayed();

        const isOddDay = new Date().getDate() % 2 !== 0;
        if(!isOddDay)
        {
            const objType = await this.objectTypeValue.getText();
            console.log("Object Type:", objType);
            for (let eq = 2; eq <= 50; eq++) {
                await browser.pause(2000);
                await utils.clickWithWait(this.equipmentInput);
                await browser.pause(5000);
                await this.selectEquipmentHeader.waitForDisplayed();
                if (!(await this.equipmentRow(eq).isDisplayed().catch(() => false))) continue;
                const equipmentText = await this.equipmentRow(eq).getText();
                await utils.clickWithWait(this.equipmentRow(eq));
                await browser.pause(5000);
                await utils.waitForBusyIndicatorToDisappear();
                let templateText = '';
                console.log("Selected Equipment:", equipmentText);
                    for (let t = 3; ; t++) {
                        await utils.clickWithWait(this.cmlTemplateDropdown);
                        await browser.pause(4000);
                        const option = $(`(//bdi[text()='CML Template']/following::span[5]/following::li)[${t}]`);

                        if (!(await option.isExisting().catch(() => false))) break;
                        if (!(await option.isDisplayed().catch(() => false))) continue;
                        if (!(await option.isClickable().catch(() => false))) continue;

                        const currentText = await option.getText();

                        await option.scrollIntoView();
                        try {
                            await option.click();
                        } catch {
                            await browser.execute(el => el.click(), option);
                        }

                        await browser.pause(5000);
                        await utils.waitForBusyIndicatorToDisappear();
                        console.log("Trying Template:", currentText);

                        if (await this.errorHeader.isDisplayed().catch(() => false)) {
                            await utils.clickWithWait(this.errorOkBtn);
                            continue;
                        }
                        templateText = currentText;
                        break;
                    }
                    this.selectedEquipment = equipmentText;
                    this.selectedEquTemplate = templateText;
                    console.log("Final Selected → Equipment:", equipmentText, "Template:", templateText);
                    await utils.clickWithWait(this.nextBtn);
                    await browser.pause(2000);
                    await utils.waitForBusyIndicatorToDisappear();
                    const cmlsSec = await $("//h3[.//text()='CMLs']");
                    await cmlsSec.waitForDisplayed({ timeout: 20000 });

                    const equi = await this.selectedEquipmentText.getText();
                    const template = await this.selectedTemplateText.getText();

                    await expect(equi).toEqual(this.selectedEquipment);
                    await expect(template).toEqual(this.selectedEquTemplate);

                    console.log("Confirmed the selected equipment and template");

                    await utils.clickWithWait(this.nameInput);
                    await this.nameInput.setValue("Automation CML Name");

                    await utils.clickWithWait(this.descriptionInput);
                    await this.descriptionInput.setValue("Automation CML Description");

                    console.log("Choosing CML template...");
                    for (let ct = 2; ct <= 10; ct++) {
                        await utils.clickWithWait(this.cmlTemplateCell);

                        if (await this.cmlTemplateOptions(ct).isDisplayed().catch(() => false)) {
                            await utils.clickWithWait(this.cmlTemplateOptions(ct));
                            console.log("CML template choosen");
                            return;
                        } else {
                            if (await this.previousBtn.isDisplayed().catch(() => false)) {
                                await utils.clickWithWait(this.previousBtn);
                                break;
                            }
                        }
                    }
                    console.log("Choosing add grif CMLs check box")
                    await utils.clickWithWait(this.addGridCMLCheckbox);
                    await browser.pause(2000);
                    await this.gridCMLNameInput.isClickable();
                    await utils.clickWithWait(this.gridCMLNameInput);
                    await this.gridCMLNameInput.setValue("Automation Grid CML");
                    await utils.clickWithWait(this.gridCMLTemplateDropdown);
                    await utils.clickWithWait(this.gridCMLTemplateOption);
                    await utils.clickWithWait(this.nextBtn);

                    await this.addGridCMLHeader.waitForDisplayed();
                    const names = await this.gridNameInputs;
                    const descs = await this.gridDescInputs;
                    for (let i = 0; i < await names.length; i++) {
                        const uniqueName = `Auto_Name_${Date.now()}_${i}`;
                        const uniqueDesc = `Auto_Desc_${Date.now()}_${i}`;

                        await utils.clickWithWait(names[i]);
                        await names[i].setValue(uniqueName);
                        await utils.clickWithWait(descs[i]);
                        await descs[i].setValue(uniqueDesc);
                    }
                }
            }
        else
        {
            
        }
        console.log("New CMLs has been created");
    }
}
export default new CML_ListView_Page();
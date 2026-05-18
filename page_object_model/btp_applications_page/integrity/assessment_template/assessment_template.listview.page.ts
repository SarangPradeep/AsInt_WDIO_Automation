import {assessmentTempData} from "../../../../test_data/btp_applications/integrity/assessment_template.data"
import utils from 'utils/utils';
class assessment_template_listview
{
    private get assessmentTempApp() { return $("//a[contains(@aria-label, 'Assessment Template')]"); }
    private get AssessmentTempIframe() { return $('iframe[data-help-id="application-assessmenttemp-manage"]'); }
    private get newAssessmentTempButton() { return $("//span[text()='Add']/ancestor::button"); }
    private get createNewTemplateHeader() { return $("//h1//span[text()='Create New Template']"); }
    private get descriptionInput() { return $("//bdi[text()='Description']/ancestor::div[1]/following::input[1]"); }
    private get relevantForInput() { return $("//bdi[text()='Relevant For']/ancestor::div[1]/following::input[1]"); }
    private get categoryInput() { return $("//bdi[text()='Category']/ancestor::div[1]/following::input[1]"); }
    private get createButton() { return $("//bdi[text()='Create']"); }
    private get okBtn() { return $("//header[.//text()='Success']/following::bdi[text()='OK']"); }

    public assessmentTempDesc!: string;

    public async navigateToAssessmentTempListView() {
        console.log("Navigating to Asset Strategy Development List View");
        await this.navigateToAssessmentTemp(); 
        await utils.waitForBusyIndicatorToDisappear();
        await utils.switchToIframe(this.AssessmentTempIframe);
        await browser.pause(2000);
        console.log("Navigated to Asset Strategy Development List View");

        // const el = await $('(//tr[@role="row"]//span[@title="Navigation"])[1]');
        // await utils.clickWithWait(el);
        // await browser.pause(10000);
    }

    public async navigateToAssessmentTemp(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.assessmentTempApp);
        await utils.waitForBusyIndicatorToDisappear();
    }

    public async plusIconSelect(): Promise<void> {
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.newAssessmentTempButton);
    }

    public async createAssessmentTemplate(): Promise<void> {
        
        console.log("Creating of Assessment Template started");
        await this.plusIconSelect();
        await utils.waitForBusyIndicatorToDisappear();
        await this.createNewTemplateHeader.waitForDisplayed({ timeout: 20000 });
        this.assessmentTempDesc = assessmentTempData.description;
        await utils.setValueWithWait(this.descriptionInput,this.assessmentTempDesc);
        console.log("Assessmnet Template Description is : "+this.assessmentTempDesc);
        await utils.setValueWithWait(this.relevantForInput,assessmentTempData.relevantFor);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.setValueWithWait(this.categoryInput,assessmentTempData.randomCategory);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.createButton);
        await utils.waitForBusyIndicatorToDisappear();
        if (await this.okBtn.isDisplayed().catch(() => false) &&
            await this.okBtn.isClickable().catch(() => false)) {
            await utils.clickWithWait(this.okBtn);
        }
        await utils.waitForBusyIndicatorToDisappear();
        await this.verifyAssessmentTempCreation();
        console.log("Assessment Template created");
    }

    public async verifyAssessmentTempCreation()
    {
        await utils.waitForBusyIndicatorToDisappear();
        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === "complete",
            { timeout: 20000 }
        );

        await browser.waitUntil(async () => {
        const frames = await $$("//iframe");
        for (const frame of frames) {
            try {
                await browser.switchFrame(frame);

                const search = await $("//input[@type='search']");
                if (await search.isExisting()) {
                    return true; // correct frame
                }
                await browser.switchFrame(null);
            } catch (e) {
                await browser.switchFrame(null);
            }
        }
        return false;
        }, { timeout: 30000 });

        const getVisibleSearch = async () => {
            const elements = await $$("//input[@type='search']");
            for (const el of elements) {
                if (await el.isDisplayed()) {
                    return el;
                }
            }
            return null;
        };

        let searchBox;
        await browser.waitUntil(async () => {
            searchBox = await getVisibleSearch();
            return searchBox !== null;
        }, { timeout: 30000 });

        if (!searchBox) {
            throw new Error("Visible search box not found");
        }
        console.log("Visible search box found, searching for deleted Functional Location");
        await browser.execute((el, value) => {
            const input = el as unknown as HTMLInputElement;
            input.value = value as string;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }, searchBox, this.assessmentTempDesc);
        console.log(`Searched for Functional Location with Display ID: ${this.assessmentTempDesc}`);
        const getVisibleGo = async () => {
            const buttons = await $$("//bdi[text()='Go']");
            for (const btn of buttons) {
                if (await btn.isDisplayed()) {
                    return btn;
                }
            }
            return null;
        };

        let goBtn: any;
        await browser.waitUntil(async () => {
            goBtn = await getVisibleGo();  
            return goBtn !== null;
        }, {
            timeout: 20000,
            interval: 500,
            timeoutMsg: "Go button not found"
        });
        if (!goBtn) {
            throw new Error("Go button not found");
        }

        console.log("Clicking Go button to search for Functional Location");
        await goBtn.waitForDisplayed({ timeout: 10000 });
        await goBtn.waitForClickable({ timeout: 10000 });
        await goBtn.click();
        await browser.pause(5000);

        console.log("Waiting for table to refresh after search...");
        const noDataCell = '//td[text()="No data"]';
        const tableRows = '//table//tr[contains(@class,"sapMListTblRow")]';

        await browser.waitUntil(async () => {
            const noDataExists = await $(noDataCell).isExisting();
            const rowsExist = await $$(tableRows).length > 0;
            return noDataExists || rowsExist;
        }, {
            timeout: 20000,
            interval: 500,
            timeoutMsg: "Search results never loaded"
        });

        console.log("Checking if Assessment Template is present in the list after creation");
        const isAssessTemp = await $(noDataCell).isExisting();

        if (!isAssessTemp) 
        {
            const el = await $('(//tr[@role="row"]//span[@title="Navigation"])[1]');
            await utils.clickWithWait(el);
            await browser.pause(10000);
            
        } else {
            throw new Error("Assessment template not created...");
        }
    }

}
export default new assessment_template_listview;
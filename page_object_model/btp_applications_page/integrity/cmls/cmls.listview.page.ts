
import utils from "utils/utils";  
class CML_ListView_Page {

    private get cmlApp() { return $("//a[contains(@aria-label, 'CMLs')]"); }
    private get CMLIframe() { return $('iframe[data-help-id="application-cml-manage"]'); }
    
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

    public async createNewCMLs() {
        console.log("Creating new CMLs...");
        
        console.log("New CMLs has been created");
    }

}
export default new CML_ListView_Page();
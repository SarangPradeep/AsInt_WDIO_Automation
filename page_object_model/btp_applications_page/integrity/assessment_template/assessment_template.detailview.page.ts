
import assessment_templateListviewPage from "./assessment_template.listview.page";
class assessment_template_detailview{

    private get infoTab() { return $("//bdi[text()='Information']"); }
    private get assignmentTab() { return $("//bdi[text()='Assignments']"); }
    private get definSecTab() { return $("//bdi[text()='Define Section']"); }
    private get defineSubSecTab() { return $("//bdi[text()='Define Sub Section']"); }
    private get algoMapTab() { return $("//bdi[text()='Algorithm Mapping']"); }
    private get condLookupTab() { return $("//bdi[text()='Condition Lookup']"); }
    private get picklistMappingTab() { return $("//bdi[text()='Picklist Mapping']"); }
    private get riskMatrixTab() { return $("//bdi[text()='Risk Matrix']"); }
    private get riskTransitionTab() { return $("//bdi[text()='Risk Transition ']"); }
    private get recommTab() { return $("//bdi[text()='Recommendation']"); }
    private get inspecInteTab() { return $("//bdi[text()='Inspection Integration']"); }
    private get changeHistTab() { return $("//bdi[text()='Change History']"); }

    public assessmentTempID!: string;

    public async verifyAndEditHeaderDetails()
    {
        console.log("Verifying header details...");
        const AssessmentTempHeader = await this.getFinalIDs();
        console.log("Header details :",AssessmentTempHeader);
        await expect(AssessmentTempHeader.AssessmentTemp).toEqual(assessment_templateListviewPage.assessmentTempDesc);
        console.log("Verified header details");
        console.log("Editing header details...");
        
    }

     public async getFinalIDs() {
        let AssessmentTemp = "";
        let actualId = "";

        const expandBtn = await $("(//span[text()='Expand Header']/preceding-sibling::span//span)[2]");
        const collapseBtn = await $("(//span[text()='Collapse Header']/preceding-sibling::span//span)[2]");

        for (let i = 0; i < 3; i++) {

            if (i === 0 && await expandBtn.isDisplayed().catch(() => false)) {
                await expandBtn.waitForClickable({ timeout: 5000 });
                await expandBtn.click();
            } 
            else if (i === 1 && await collapseBtn.isDisplayed().catch(() => false)) {
                await collapseBtn.waitForClickable({ timeout: 5000 });
                await collapseBtn.click();
            }
            await browser.pause(1000);
            try {
                await browser.waitUntil(async () => {
                    const txt = await this.getAssessmentTempId();
                    return !!txt;
                }, { timeout: 10000, interval: 500 });
            } catch {}

            AssessmentTemp = await this.getAssessmentTempId();
            actualId = await this.getDisplayId();

            console.log(`Attempt ${i + 1} → ASMT="${AssessmentTemp || 'EMPTY'}" | DisplayID="${actualId || 'EMPTY'}"`);

            if (AssessmentTemp && actualId) break;
        }

        return { AssessmentTemp, actualId };
    }


    public async getAssessmentTempId() {
        const xpath = "//header//*[@role='heading']//span";

        const spans = await $$(xpath);

        for (let el of spans) {
            let txt = (await el.getText().catch(() => "")) || "";
            if (!txt) txt = (await el.getAttribute("innerText").catch(() => "")) || "";

            txt = txt.trim();

            if (txt && txt.includes("Automation")) {
                return txt;
            }
        }

        return "";
    }


    public async getDisplayId() {
        try {
            const txt = await browser.execute(() => {
                const result = document.evaluate(
                    "//header//span[contains(text(),'ASMT')]",
                    document,
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null
                );

                for (let i = 0; i < result.snapshotLength; i++) {
                    const el = result.snapshotItem(i);
                    if (el && el.textContent && el.textContent.trim()) {
                        return el.textContent;
                    }
                }

                return "";
            });

            return txt ? txt.replace("Display ID:", "").trim() : "";
        } catch (e) {
            return "";
        }
    }

}
export default new assessment_template_detailview();
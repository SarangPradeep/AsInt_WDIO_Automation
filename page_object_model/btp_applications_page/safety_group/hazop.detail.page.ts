import { safetydata } from 'test_data/btp_applications/safety.data';
import utils from '../../../utils/utils';

class safetyHAZOPDetailView {

    //Locators

  private get addDeviation() { 
        return $("//button[@title='Add Deviation']");     
    } 

     private get addParameter() { 
        return $("(//input[@aria-haspopup='listbox'])[1]");     
    }
    
    private get addGuidedWord() { 
        return $("//input[@aria-roledescription='Multi Value Combo Box']");     
    } 

     private get createDeviationBtn() { 
        return $("//div[contains(@class,'sapMDialog')]//button[.//bdi='Create']");     
    } 

     private get OKbTN () { 
        return $("//bdi[text()='OK']");     
    } 

     private get landonNodeInfo () { 
        return $("//span[@aria-label='goal']");     
    } 

     private get navigateTechObjs() { 
        return $("//bdi[text()='Technical Objects']");     
    } 

     private get assignTechObjs() { 
        return $("//bdi[text()='Assign']");     
    } 

      private get selectAllTechObjs() { 
        return $("(//th[@aria-label='Selection']//div[@role='checkbox' and @title='Select All' and not(contains(@style,'display: none'))])[1]");     
    } 

     private get searchTechObjs() { 
        return $("(//input[@type='search' and @aria-label='Search' and not(ancestor::*[@aria-hidden='true'])])[1]");     
    } 


     private get confirmTechObjs() { 
        return $("//bdi[text() = 'Confirm']");     
    } 

     private get teamMemTab() { 
        return $("(//bdi[text() = 'Team Members'])[2]");     
    } 

     private get addTeamMem() { 
        return $("(//bdi[text() = 'Add Role'])[2]");     
    } 

     private get addRolesHzLead() { 
        return $("//div[text()='HAZOP Lead']");     
    } 

     private get addRolesHzFacilitator() { 
        return $("//div[text()='HAZOP Facilitator']");     
    } 

    
     private get selectsearchedTeamMem() { 
        return $("(//tr[contains(@class,'sapMLIB')][1]//div[@role='checkbox' and @tabindex='0'])[1]");     
    } 

    
     private get searchtemMem() { 
        return $("//form[contains(@id,'idUsersSearchField')]//input[@type='search']");     
    } 
    
     private get saveTeamMem() { 
        return $("//button[.//bdi[text()='Save'] and following-sibling::button[.//bdi[text()='Cancel']] and preceding-sibling::button[.//bdi[text()='Add Role']]]");     
    } 

     private get expandCollapseNode() { 
        return $("//span[@title='Expand/Collapse Node']");     
    } 

     private get addCauseBtn() { 
        return $("(//button[@title='Add Cause' and @class='sapMBtnBase sapMBtn'])[1]");     
    } 

     private get addCauseField() { 
        return $("//div[contains(@class,'sapMDialog')]//textarea[@rows='1']");     
    } 

     private get causeLD() { 
        return $("//div[contains(@class,'sapMDialog')]//textarea[@rows='2']");     
    } 

     private get createBtn() { 
        return $("(//bdi[text() = 'Create'])[1]");     
    } 

     private get addRolesSME() { 
        return $("//div[text()='Subject Matter Expert']");     
    } 

    
     private get landonCauseConseScreen() { 
        //return $("(//span[@aria-label='Node' and contains(@class,'sapUiTableTreeIcon')])[1]");  
        return $("(//span[text()='Temperature_Less'])[1]");   
    } 

     private get frame(): any { 
    return $("//iframe[@title='Application']");
}


     private get addConseBtn(): any { 
    return $("(//button[.//span[contains(text(),'Add Consequence')]])[1]");
}

  private get addConsefield(): any { 
    return $("//textarea[@aria-required='true' and contains(@id,'inner')]");
}

  private get addConseLD(): any { 
    return $("(//textarea[contains(@aria-labelledby,'label')])[2]");
}

 private get conseDrpdwn(): any { 
    return $("(//span[@title='Expand/Collapse Node' and @role='button'])[2]");
}

private get landonConsePg(): any { 
    return $("(//span[text()='AutomationConsequence'])[1]");
}

 private get addunmitigatedRiskbtn(): any { 
    return $("(//button[contains(@class,'sapMBtnBase sapMBtn') and @title='Add'])[2]");
}
 private get severityFld(): any { 
    return $("//input[@placeholder='Select Severity']");
}
 private get severityFld2(): any { 
    return $("(//input[@placeholder='Select Severity'])[2]");
}
 private get severityFld3(): any { 
    return $("(//input[@placeholder='Select Severity'])[3]");
}

 private get severityFld4(): any { 
    return $("(//input[@placeholder='Select Severity'])[4]");
}
 private get severityFld5(): any { 
    return $("(//input[@placeholder='Select Severity'])[5]");
}
 private get severityFld6(): any { 
    return $("(//input[@placeholder='Select Severity'])[6]");
}

private get likelihoodFld4(): any { 
    return $("(//input[@placeholder='Select Likelihood'])[4]");
}

private get likelihoodFld5(): any { 
    return $("(//input[@placeholder='Select Likelihood'])[5]");
}

private get likelihoodFld6(): any { 
    return $("(//input[@placeholder='Select Likelihood'])[6]");
}

private get likelihoodFld(): any { 
    return $("//input[@placeholder='Select Likelihood']");
}

private get likelihoodFld2(): any { 
    return $("(//input[@placeholder='Select Likelihood'])[2]");
}

private get likelihoodFld3(): any { 
    return $("(//input[@placeholder='Select Likelihood'])[3]");
}

private get impactFld(): any { 
    return $("//input[@placeholder='Select Impact']");
}

private get impactFld2(): any { 
    return $("(//input[@placeholder='Select Impact'])[2]");
}

private get impactFld3(): any { 
    return $("(//input[@placeholder='Select Impact'])[3]");
}

private get saveUnmitigatedrisk(): any { 
    return $("(//bdi[text()='Save'])[1]");
}

private get addBarrierBtn(): any { 
    return $("//button[@aria-label='Add Barrier']");
}

private get barrierdesc(): any { 
    return $("//textarea[@rows='1']");
}

private get barrierType(): any { 
    return $("//input[@placeholder='Select Barrier Type']");
}

private get barrierDiscipline(): any { 
    return $("//input[@placeholder='Select Discipline']");
}

private get barrierRemarks(): any { 
    return $("//textarea[@rows='3']");
}

private get editMitigatedRisk(): any { 
    return $("(//bdi[text()='Edit'])[3]");
}

private get riskComments(): any { 
    return $("//textarea[@rows='6']");
}
private get saveBarrier(): any { 
    return $("(//bdi[text()='Save'])[1]");
}

private get addRecomm(): any { 
    return $("(//button[@title='Add'])[2]");
}

private get objectTypeRecomm(): any { 
    return $("(//input[contains(@id,'idRecommendation')])[1]");
}

private get sdofRecomm(): any { 
    return $("//textarea[@rows='1']");
}

private get ldofRecomm(): any { 
    return $("//textarea[@rows='3']");
}

private get recommSubtype(): any { 
    return $("(//input[@role='combobox' and @aria-autocomplete='both' ])[2]");
}

private get dueDaterecomm(): any { 
    return $("//input[@placeholder='e.g. 31 Dec, 2026']");
}

private get saveRecomm(): any { 
    return $("//bdi[text()='Save']");
}

private get toggleBtn(): any { 
    return $("//span[contains(@class,'sapMSwtLabel sapMSwtLabelOff')]");
}

private get toggleYES(): any { 
    return $("//bdi[text()='Yes']");
}

private get navBack(): any { 
    return $("//a[@aria-label='Back']");
}

private get publishBtn(): any { 
    return $("//bdi[text()='Publish']");
}

private get selectRecommforPublish(): any { 
    return $("//footer[.//text()='Publish']/preceding::div[@aria-label='Select all rows' and @tabindex='0']");
}

private get publishDrpdwn(): any { 
    return $("(//button[.//bdi[text()='Publish']])[1]");
}

private get convertToAPMrecomm(): any { 
    return $("//li[.//text()='Convert to APM Recommendation']");
}

public async detailViewPages(): Promise<void> {

    console.log("*********");
    await utils.waitForBusyIndicatorToDisappear();
    await utils.switchToIframe(this.frame);

    //Adding Deviation to the NODE

    await utils.clickWithWait(this.addDeviation,3000);
    await utils.clickWithWait(this.addParameter,3000);
    await utils.setValueWithWait(this.addParameter , safetydata.createHAZOP.parameter);
    await browser.keys('Enter');
    await utils.clickWithWait(this.addGuidedWord,2000);
    await utils.setValueWithWait(this.addGuidedWord,safetydata.createHAZOP.guidedWord);
    await browser.keys('Enter');
    await utils.clickWithWait(this.createDeviationBtn);
    await utils.waitForBusyIndicatorToDisappear();
    await utils.clickWithWait(this.OKbTN);
    await utils.clickWithWait(this.expandCollapseNode,2000);
    
    //Adding Cause to the Deviation

    await utils.clickWithWait(this.addCauseBtn,2000);
    await utils.clickWithWait(this.addCauseField,2000);
    await utils.setValueWithWait(this.addCauseField, safetydata.createHAZOP.cause);
    await utils.clickWithWait(this.causeLD);
    await utils.setValueWithWait(this.causeLD, safetydata.createHAZOP.causeld);
    await utils.clickWithWait(this.createBtn);
    await utils.clickWithWait(this.OKbTN);
    await utils.waitForBusyIndicatorToDisappear();
    
    //Landing on Cause and Consequences Tree Layer

    await utils.switchToIframe(this.frame);
    await utils.clickWithWait(this.landonCauseConseScreen);
    await utils.waitForBusyIndicatorToDisappear();

    //Adding Consequences to the Causes

    await utils.clickWithWait(this.addConseBtn,2000);
    await utils.clickWithWait(this.addConsefield,2000);
    await utils.setValueWithWait(this.addConsefield, safetydata.createHAZOP.conse);
    await utils.clickWithWait(this.addConseLD,2000);
    await utils.setValueWithWait(this.addConseLD, safetydata.createHAZOP.conseLD);
    await utils.clickWithWait(this.createBtn);
    await utils.clickWithWait(this.OKbTN);
    await utils.waitForBusyIndicatorToDisappear();

    //Landing on Consequence
    await utils.switchToIframe(this.frame);
    await utils.clickWithWait(this.conseDrpdwn,2000);
    await utils.waitForBusyIndicatorToDisappear();
    await utils.clickWithWait(this.landonConsePg,2000);
    await utils.waitForBusyIndicatorToDisappear();


    //Adding Unmitigated Risk
    
    await utils.clickWithWait(this.addunmitigatedRiskbtn,3000);
    await utils.clickWithWait(this.impactFld,3000);
    await utils.setValueWithWait(this.impactFld,safetydata.createHAZOP.impact1);
    await browser.keys('Enter');
    await utils.clickWithWait(this.severityFld,3000);
    await utils.setValueWithWait(this.severityFld,safetydata.createHAZOP.severity1);
    await browser.keys('Enter');
    await utils.clickWithWait(this.likelihoodFld,3000);
    await utils.setValueWithWait(this.likelihoodFld,safetydata.createHAZOP.likelihood1);
    await browser.keys('Enter');
    timeout: 30000;

    await utils.clickWithWait(this.addunmitigatedRiskbtn,3000);
    await utils.clickWithWait(this.impactFld2,3000);
    await utils.setValueWithWait(this.impactFld2,safetydata.createHAZOP.impact2);
    await browser.keys('Enter');
    await utils.clickWithWait(this.severityFld2,3000);
    await utils.setValueWithWait(this.severityFld2,safetydata.createHAZOP.severity2);
    await browser.keys('Enter');
    await utils.clickWithWait(this.likelihoodFld2,3000);
    await utils.setValueWithWait(this.likelihoodFld2,safetydata.createHAZOP.likelihood2);
    await browser.keys('Enter');
    timeout: 30000;
    
    await utils.clickWithWait(this.addunmitigatedRiskbtn,3000);
    await utils.clickWithWait(this.impactFld3,3000);
    await utils.setValueWithWait(this.impactFld3,safetydata.createHAZOP.impact3);
    await browser.keys('Enter');
    await utils.clickWithWait(this.severityFld3,3000);
    await utils.setValueWithWait(this.severityFld3,safetydata.createHAZOP.severity3);
    await browser.keys('Enter');
    await utils.clickWithWait(this.likelihoodFld3,3000);
    await utils.setValueWithWait(this.likelihoodFld3,safetydata.createHAZOP.likelihood3);
    await browser.keys('Enter');
    timeout: 30000;
    await utils.clickWithWait(this.saveUnmitigatedrisk,3000);
    await utils.waitForBusyIndicatorToDisappear();
    await utils.clickWithWait(this.OKbTN,3000);
    await utils.waitForBusyIndicatorToDisappear();

    //Adding Barrier

    await utils.clickWithWait(this.addBarrierBtn,2000);
    timeout: 30000;
    await utils.switchToIframe(this.frame);
    timeout: 30000;

    await utils.clickWithWait(this.barrierdesc,8000);
    await utils.setValueWithWait(this.barrierdesc,safetydata.createHAZOP.barrierdes);
    timeout: 30000;
    await utils.clickWithWait(this.barrierType,2000);
    await utils.setValueWithWait(this.barrierType,safetydata.createHAZOP.barriertype);
    await browser.keys('Enter');
    timeout: 30000;
    await utils.clickWithWait(this.barrierDiscipline,2000);
    await utils.setValueWithWait(this.barrierDiscipline,safetydata.createHAZOP.barrierDiscipline);
    await browser.keys('Enter');
    timeout: 30000;
    await utils.clickWithWait(this.barrierRemarks,2000);
    await utils.setValueWithWait(this.barrierRemarks,safetydata.createHAZOP.barrierRemarks);
    timeout: 30000;
    await utils.clickWithWait(this.saveBarrier,2000);
    await utils.waitForBusyIndicatorToDisappear();
    await utils.clickWithWait(this.OKbTN,1000);

    await utils.clickWithWait(this.editMitigatedRisk,2000);
    await utils.clickWithWait(this.severityFld4,2000);
    await utils.setValueWithWait(this.severityFld4,safetydata.createHAZOP.severity3);

    await utils.clickWithWait(this.severityFld5,2000);
    await utils.setValueWithWait(this.severityFld5,safetydata.createHAZOP.severity2);

    await utils.clickWithWait(this.severityFld6,2000);
    await utils.setValueWithWait(this.severityFld6,safetydata.createHAZOP.severity1);

        //Adding likelihood
    await utils.clickWithWait(this.likelihoodFld4,2000);
    await utils.setValueWithWait(this.likelihoodFld4,safetydata.createHAZOP.likelihood3);

    await utils.clickWithWait(this.likelihoodFld5,2000);
    await utils.setValueWithWait(this.likelihoodFld5,safetydata.createHAZOP.likelihood2);

    await utils.clickWithWait(this.likelihoodFld6,2000);
    await utils.setValueWithWait(this.likelihoodFld6,safetydata.createHAZOP.likelihood1);

    await utils.clickWithWait(this.saveUnmitigatedrisk);
    await utils.waitForBusyIndicatorToDisappear();
    await utils.clickWithWait(this.OKbTN);

    await utils.clickWithWait(this.riskComments,2000);
    await utils.setValueWithWait(this.riskComments, safetydata.createHAZOP.barrierRemarks);
    await utils.clickWithWait(this.saveUnmitigatedrisk);
    await utils.waitForBusyIndicatorToDisappear();
    await utils.clickWithWait(this.OKbTN);
    await utils.waitForBusyIndicatorToDisappear();

    await utils.clickWithWait(this.addRecomm);
    await utils.clickWithWait(this.objectTypeRecomm,2000);
    await utils.setValueWithWait(this.objectTypeRecomm,safetydata.createHAZOP.objtypeRecomm);
    await browser.keys('Enter');
    await utils.clickWithWait(this.sdofRecomm,2000);
    await utils.setValueWithWait(this.sdofRecomm,safetydata.createHAZOP.sdOfRecomme);
    await utils.clickWithWait(this.ldofRecomm,2000);
    await utils.setValueWithWait(this.ldofRecomm,safetydata.createHAZOP.LdofRecomme);
    await utils.clickWithWait(this.recommSubtype,2000);
    await utils.setValueWithWait(this.recommSubtype,safetydata.createHAZOP.recommSubType);
    await browser.keys('Enter');
    await utils.clickWithWait(this.barrierDiscipline,2000);
    await utils.setValueWithWait(this.barrierDiscipline,safetydata.createHAZOP.barrierDiscipline);
    await browser.keys('Enter');
    await utils.clickWithWait(this.dueDaterecomm,2000);
    await utils.setValueWithWait(this.dueDaterecomm,safetydata.createHAZOP.hzenddate);
    await utils.clickWithWait(this.saveRecomm,2000);
    await utils.waitForBusyIndicatorToDisappear();
    await utils.clickWithWait(this.OKbTN,2000);
    await utils.waitForBusyIndicatorToDisappear();

    await utils.clickWithWait(this.toggleBtn,2000);
    await utils.clickWithWait(this.toggleYES,2000);
    await utils.waitForBusyIndicatorToDisappear();
    await utils.clickWithWait(this.OKbTN,2000);
    console.log("Toggled as Ready");
    await utils.waitForBusyIndicatorToDisappear();

    // Switch to default content
    await browser.switchFrame(null);

    // wait for page to stabilize after navigation
    await browser.pause(2000);

    console.log("Clicking back button");
    // Back button
    const backBtn = await this.navBack;

    await backBtn.waitForExist({ timeout: 40000 });
    await backBtn.waitForDisplayed({ timeout: 40000 });
    await backBtn.waitForClickable({ timeout: 40000 });

    // use JS click (prevents hang)
    await browser.execute((el) => el.click(), backBtn);

    // wait for navigation to complete
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes("Hazop"),
        {
            timeout: 40000,
            timeoutMsg: "Navigation after back click failed"
        }
    );

    console.log("Clicked back");
    console.log("Switched to default content");
    // console.log("Toggled as Ready");
    // await utils.waitForBusyIndicatorToDisappear();
    // //timeout: 40000;
    

    // //Navigating back to List view page of HAZOP Assessment
    // await browser.switchFrame(null);
    // await utils.clickWithWait(this.navBack,40000);
    console.log("Clicked back");
    console.log("Switched to default content");
    await utils.waitForBusyIndicatorToDisappear();

    console.log("**********");
    
    //Publishing the HAZOP Study
    // await browser.pause(4000);
    // await utils.waitForBusyIndicatorToDisappear();
    // await browser.switchFrame(null);
    
    // await this.frame.waitForExist({ timeout: 20000 });
    // await browser.switchFrame(this.frame);
    // const nav = await $('(//tr[@role="row"]//span[@title="Navigation"])[1]')
    // await nav.waitForExist({ timeout: 40000 });
    // await nav.waitForDisplayed({ timeout: 40000 });
    // await nav.waitForClickable({ timeout: 40000 });

    // // use JS click (prevents hang)
    // await browser.execute((el) => el.click(), nav);
    //await utils.clickWithWait(nav);

    console.log("Switching frame to publish");
    await utils.switchToIframe(this.frame);
    console.log("Frame swicthed to publish");
    await browser.pause(5000);
    await utils.clickWithWait(this.publishBtn);
    console.log("Publish Button clicked");
    
    console.log("Publish Button clicked");

    await utils.clickWithWait(this.toggleYES);
    await utils.waitForBusyIndicatorToDisappear();

    
    await utils.switchToIframe(this.frame);
    
    const selectRecomm = await this.selectRecommforPublish;
    await utils.clickWithWait(selectRecomm);
    await browser.pause(1500);
    console.log("Selected recommendation for publish");
    // dropdown
    const publishDropdown = await this.publishDrpdwn;
    await utils.clickWithWait(publishDropdown);
    await browser.pause(1500);
    console.log("Clicked Publish Dropdown ******************************");
    // wait after action
    await utils.waitForBusyIndicatorToDisappear();

    console.log("Clicked Publish");
    //await utils.clickWithWait(this.selectRecommforPublish,2000);
    //console.log("Selected recommendation for publish");
    //await utils.clickWithWait(this.publishDrpdwn,2000);
    // console.log("Clicked Publish Dropdown");
    await utils.waitForBusyIndicatorToDisappear();
    await utils.clickWithWait(this.convertToAPMrecomm,2000);
//         const convertXpath = "//li[.//span[contains(text(),'Convert to APM Recommendation')]]";

// await browser.waitUntil(async () => {
//     const el = await $(convertXpath);
//     if (!(await el.isExisting())) return false;

//     await el.scrollIntoView();
//     await browser.pause(300); // animation buffer

//     try {
//         await el.click();
//     } catch {
//         await browser.execute(e => e.click(), el);
//     }

//     return true;
// }, {
//     timeout: 40000,
//     interval: 1000,
//     timeoutMsg: "Convert to APM Recommendation not clickable"
// });
    console.log("Clicked Convert to APM Recomm");
    await utils.waitForBusyIndicatorToDisappear();
    await utils.clickWithWait(this.OKbTN,2000);
    await utils.waitForBusyIndicatorToDisappear();
    await utils.clickWithWait(this.OKbTN,2000);
    console.log("Hazop published");
    console.log("Clicked OK Button");

     }
   

}
export default new safetyHAZOPDetailView  ();


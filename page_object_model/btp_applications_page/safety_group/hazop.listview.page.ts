import { ChainablePromiseElement } from 'webdriverio';
import { browser } from '@wdio/globals';
import {safetydata} from '../../../test_data/btp_applications/safety.data';
import utils from '../../../utils/utils';

class safetyHAZOPListView {
    
    /* =========================
        LOCATORS
    ========================== */

    private readonly busyIndicatorSelector = ".sapUiLocalBusyIndicator"; 

      private get hazopTile() { 
        return $("//a[@role='link' and contains(@aria-label, 'HAZOP') and contains(@href, 'apm-02-asint.launchpad.cfapps.us10')]");     
    } 

     private get createNewHazop() { 
        return $("//button[contains(@title,'Hazop')]");     
    } 

    private get frame(): any { 
    return $("//iframe[@title='Application']");
}

     private get hazopnameField() { 
        return $("//textarea[@aria-required='true' and @rows='1']");     
    } 

    
     private get hazopdesc() { 
        return $("//textarea[@aria-required='true' and @rows='3']");     
    } 

      private get flocdropdown() { 
        return $("//span[@aria-label = 'Show Value Help']");     
    }
    
      private get flocsearchbar() { 
        return $("//div[@role='dialog']//input[@type='search']");     
    }

    
      private get flocselect() { 
        return $("//table[@aria-rowcount='2']");     
    }

    
      private get startDate() { 
        return $("//input[contains(@id,'StartDate')]");     
    }

    
      private get endDate() { 
        return $("//input[contains(@id,'EndDate')]");     
    }

      private get riskmatrixDropdown() { 
        return $("//span[@id='__box1-arrow']");     
    }

      private get riskMatrixSelect() { 
        return $("//span[contains (text(),'HAZOP 5*5')]");     
    }

       private get saveButton() { 
        return $("//bdi[contains(text(),'Save')]");   
        
    }

      private get OKButton() { 
        return $("//bdi[text()='OK']");   
        
    }
    
       private get createAssemtBtn() { 
        return $("//bdi[text()='Create Assessment']");   
        
    }

    
       private get nodeNumfield() { 
        return $("//textarea[@id='__area0-inner']");   
        
    }

    
       private get nodeSDes() { 
        return $("//textarea[@id='__area1-inner']");   
        
    }

      private get nodeLDes() { 
        return $("//textarea[@id='__area2-inner']");   
        
    }
     private get createNodeBtn() { 
        return $("//bdi[text() = 'Create']");   
        
    }

      private get navtoNode() { 
        return $("(//tr[@aria-rowindex='2']//span[@title='Navigation' and @aria-hidden='true'])[3]");   
        
    }

    

 

     //   ACTIONS

     public async navigateToHazopTile(): Promise<void> {
       
      
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait(this.hazopTile);
        await utils.waitForBusyIndicatorToDisappear();
       
    }
     public async createHazopstudy(): Promise<void> {
        await browser.switchFrame(null);

        await this.frame.waitForExist({ timeout: 20000 });
        await browser.switchFrame(this.frame);
       
        
        await utils.clickWithWait(this.createNewHazop);
        await utils.waitForBusyIndicatorToDisappear();    
        await utils.clickWithWait(this.hazopnameField);
        await utils.setValueWithWait(this.hazopnameField,safetydata.createHAZOP.hazopname);
      
       await utils.clickWithWait(this.hazopdesc);
       await utils.setValueWithWait(this.hazopdesc,safetydata.createHAZOP.Hzdescription);

       await utils.clickWithWait(this.flocdropdown);
       await utils.clickWithWait(this.flocsearchbar);
       await utils.setValueWithWait(this.flocsearchbar, safetydata.createHAZOP.Hzfloc);
       await browser.keys('Enter');
       await utils.clickWithWait(this.flocselect,3000);
        
       await utils.clickWithWait(this.startDate);
       await utils.setValueWithWait(this.startDate,safetydata.createHAZOP.hzstartdate);

      await utils.clickWithWait(this.endDate);
       await utils.setValueWithWait(this.endDate,safetydata.createHAZOP.hzenddate);

      await utils.clickWithWait(this.riskmatrixDropdown);
      await utils.clickWithWait(this.riskMatrixSelect);

      await utils.clickWithWait(this.saveButton);
      await utils.waitForBusyIndicatorToDisappear();

      await utils.clickWithWait(this.OKButton);

      await utils.clickWithWait(this.createAssemtBtn);
      await utils.waitForBusyIndicatorToDisappear();

      await utils.clickWithWait(this.nodeNumfield);
      await utils.setValueWithWait(this.nodeNumfield,safetydata.createHAZOP.nodeNumName);


      await utils.clickWithWait(this.nodeSDes);
      await utils.setValueWithWait(this.nodeSDes,safetydata.createHAZOP.nodeSD);

     await utils.clickWithWait(this.nodeLDes);
     await utils.setValueWithWait(this.nodeLDes,safetydata.createHAZOP.nodeLD);

      await utils.clickWithWait(this.createNodeBtn);

      await utils.clickWithWait(this.OKButton);
       await browser.switchFrame(null);

        await this.frame.waitForExist({ timeout: 20000 });
        await browser.switchFrame(this.frame);

      await utils.clickWithWait(this.navtoNode);
      await utils.waitForBusyIndicatorToDisappear();
       
      }

}
export default new safetyHAZOPListView ();
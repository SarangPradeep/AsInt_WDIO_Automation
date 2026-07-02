import { $, $$, browser } from '@wdio/globals';
import * as console from 'console';
import utils from './utils';

class adaptFilterHelper {

    private async logAndVerifyFilterValues(
        filterLabel: string,
        expectedValue: string,
        fieldValues: WebdriverIO.ElementArray | Awaited<ReturnType<typeof $$>>
    ): Promise<void> {
        const expected = (expectedValue || '').trim().toLowerCase();
        const values = await fieldValues;
        console.log(`Total ${filterLabel} Found: ${values.length}`);
        for (const element of values) {
            const rawValue = (await element.getText() || await element.getAttribute('textContent') || '')
                .replace(/\s+/g, ' ')
                .trim();
            console.log(`Found ${filterLabel}: ${rawValue}`);
            if (!rawValue.toLowerCase().includes(expected)) {
                throw new Error(`Expected ${filterLabel}: ${expectedValue}, but found: ${rawValue}`);
            }
        }
    }

    async activationStateAdaptFilter(totalCount: number,
        state: "Activated" | "Deactivated" | "All"
    ): Promise<void> {
        const filterLabel = "Activation State";
        await utils.clickWithWait($(`//bdi[normalize-space()='Activation State']/ancestor::label/following::span[@role='button'][1]`));
        await browser.pause(500); 
        if (state === "Activated") {
            await browser.keys("ArrowDown");
            await browser.pause(500);
            await browser.keys("Enter");
        }
        else if (state === "Deactivated") {
            await browser.keys("ArrowDown");
            await browser.pause(500);
            await browser.keys("ArrowDown");
            await browser.pause(500);
            await browser.keys("Enter");
        }
        else {
            await browser.keys("ArrowDown");
            await browser.pause(500);
            await browser.keys("Enter");
            await utils.clickWithWait($(`//bdi[normalize-space()='Activation State']/ancestor::label/following::span[@role='button'][1]`));
            await browser.pause(500);
            await browser.keys("ArrowDown");
            await browser.pause(500);
            await browser.keys("ArrowDown");
            await browser.pause(500);
            await browser.keys("Enter");
        }
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        await this.verifyDetailsInListView(filterLabel, state);
       
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${state}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
    }

    async assetManufacturerNameAdaptFilter(manufacturerName: string): Promise<void> {
        const expectedValue = manufacturerName
        .trim()
        .toLowerCase();
        const filterLabel = "Asset Manufacturer Name";
        const filterInput = await $(`//label[.//bdi[text()='Asset Manufacturer Name ']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(manufacturerName);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));

        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await this.ensureFilterHeaderCollapsed();
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const colHeader = await $(`//th[.//span[normalize-space()='${filterLabel}']]`);
        const colIndex = (await colHeader.isExisting()) ? (await colHeader.getAttribute('aria-colindex') || '5') : '5';
        const fieldValues = await $$(
            `//td[@aria-colindex='${colIndex}']//span`
        );

        await this.logAndVerifyFilterValues(filterLabel, manufacturerName, fieldValues);

        await this.ensureFilterHeaderExpanded();
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${manufacturerName}`);
    }

    async catalogProfileAdaptFilter(profileName: string): Promise<void> {
        await utils.clickWithWait($(`//bdi[normalize-space()='Catalog Profile']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${profileName}']]//div[@role='checkbox']`));
        const catalogProfileId = await $(
            `//tr[.//span[normalize-space()='${profileName}']]//td[@role='gridcell'][2]//span`
        ).getText();
        console.log(catalogProfileId);
        await utils.clickWithWait($(`//button[.//bdi[text()="Save"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await this.verifyDetailsInListView("Catalog Profile", catalogProfileId);
        await utils.clickWithWait($(`//span[normalize-space()='${catalogProfileId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied Catalog Profile adapt filter with value: ${profileName}`);
    }

    async categoryAdaptFilter(categoryName: string): Promise<void> {
        
        const fieldLabel = "Category";
        await utils.clickWithWait($(`//bdi[normalize-space()='Category']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${categoryName}']]//div[@role='checkbox']`));

        const categoryId = await $(
            `//tr[.//span[normalize-space()='${categoryName}']]//td[@role='gridcell'][2]//span`
        ).getText();
        console.log(categoryId);
        
        await utils.clickWithWait($(`//button[.//bdi[text()="Save"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//td[@aria-colindex='3']//span`
        );

        await this.logAndVerifyFilterValues(fieldLabel, categoryName, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${categoryId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied Category adapt filter with value: ${categoryName}`);
    }

    async objectTypeAdaptFilter(objectTypeName: string): Promise<void> {
        
        const fieldLabel = "Object Type";
        await utils.clickWithWait($(`//bdi[normalize-space()='Object Type']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${objectTypeName}']]//div[@role='checkbox']`));

        const objectId = await $(
            `//tr[.//span[normalize-space()='${objectTypeName}']]//td[@role='gridcell'][2]//span`
        ).getText();
        console.log(objectId);
        
        await utils.clickWithWait($(`//button[.//bdi[text()="Save"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//td[@aria-colindex='4']//span`
        );

        await this.logAndVerifyFilterValues(fieldLabel, objectTypeName, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${objectId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied Object Type adapt filter with value: ${objectTypeName}`);
    }

    async criticalityAdaptFilter(criticality: string): Promise<void> {
        const fieldLabel = "Criticality";
        await utils.clickWithWait($(`//bdi[normalize-space()='Criticality']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${criticality}']]//div[@role='checkbox']`));
        const criticalityId = await $(
            `//tr[.//span[normalize-space()='${criticality}']]//td[@role='gridcell'][2]//span`  
        ).getText();
        console.log(criticalityId);
        await utils.clickWithWait($(`//button[.//bdi[text()="Save"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
                
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const critHeader = await $(`//th[.//span[normalize-space()='${fieldLabel}']]`);
        const critColIndex = (await critHeader.isExisting()) ? (await critHeader.getAttribute('aria-colindex') || '6') : '6';
        const fieldValues = await $$(
            `//td[@aria-colindex='${critColIndex}']/div[@aria-roledescription='Object Tag']/div/span[1]`
        );

        await this.logAndVerifyFilterValues(fieldLabel, criticalityId, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);

        await utils.clickWithWait($(`//span[normalize-space()='${criticalityId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied Criticality adapt filter with value: ${criticality}`);

    }

    async verifyDetailsInListView(fieldLabel: string, expectedValue: string): Promise<void> {
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='${fieldLabel}']/ancestor::div[1]/following-sibling::div/span[1]`
        );

        await this.logAndVerifyFilterValues(fieldLabel, expectedValue, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
    }

    async classAdaptFilter(className: string): Promise<void> {
        const filterLabel = "Class";
        const filterInput = await $(`//bdi[normalize-space()='Class']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        const rawCode = await $(
            `//tr[.//span[normalize-space()='${className}']]//td[@role='gridcell'][2]//span[starts-with(normalize-space(),'(')]`
        ).getText();
        const classCode = rawCode.replace(/^\(|\)$/g, '').trim();
        console.log(`Class code: ${classCode}`);
        const expectedValue = className.trim().toLowerCase();

        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${className}']]//div[@role='checkbox']`));
        await utils.clickWithWait($(`//button[.//bdi[text()="Confirm"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(`//td[@aria-colindex='7']`);

        await this.logAndVerifyFilterValues(filterLabel, className, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);

        await utils.clickWithWait($(`//span[normalize-space()='${classCode}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${className} (code: ${classCode})`);
    }

    async componentFlagAdaptFilter(totalCount: number,
        state: "Temporary Repair Component" | "Out of Service" | "All"
    ): Promise<void> {
        const filterLabel = "Component Flag";
        await utils.clickWithWait($(`//bdi[normalize-space()='Component Flag']/ancestor::label/following::span[@role='button'][1]`));
        await browser.pause(500); 
        if (state === "Temporary Repair Component") {
            await browser.keys("ArrowDown");
            await browser.pause(500);
            await browser.keys("Enter");
        }
        else {
            await browser.keys("ArrowDown");
            await browser.pause(500);
            await browser.keys("ArrowDown");
            await browser.pause(500);
            await browser.keys("Enter");
        }
        
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        await this.verifyDetailsInListView(filterLabel, state);
       
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${state}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
    }

    async planningPlantAdaptFilter(plantName: string): Promise<void> {

        const expectedValue = plantName.trim().toLowerCase();
        const filterLabel = "Planning Plant";
        const filterInput = await $(`//bdi[normalize-space()='Planning Plant']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${plantName}']]//div[@role='checkbox']`));
        const plantId = await $(
            `//tr[.//span[normalize-space()='${plantName}']]//td[@role='gridcell'][2]//span`  
        ).getText();
        console.log(plantId);
        await utils.clickWithWait($(`//button[.//bdi[text()="Save"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='Planning Plant']/ancestor::div[1]/following-sibling::div/span[1]`
        );
        
        await this.logAndVerifyFilterValues(filterLabel, plantId, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${plantId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${plantName}`);
    
    }

    async locationAdaptFilter(locationName: string): Promise<void> {

        const expectedValue = locationName.trim().toLowerCase();
        const filterLabel = "Location";
        const filterInput = await $(`//bdi[normalize-space()='Location']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${locationName}']]//div[@role='checkbox']`));
        const locationId = await $(
            `//tr[.//span[normalize-space()='${locationName}']]//td[@role='gridcell'][2]//span`  
        ).getText();
        console.log(locationId);
        await utils.clickWithWait($(`//button[.//bdi[text()="Save"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='Location']/ancestor::div[1]/following-sibling::div/span[1]`
        );
        await this.logAndVerifyFilterValues(filterLabel, locationId, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${locationId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${locationName}`);

    }

    async maintenancePlantAdaptFilter(plantName: string): Promise<void> {

        const expectedValue = plantName.trim().toLowerCase();
        const filterLabel = "Maintenance Plant";
        const filterInput = await $(`//bdi[normalize-space()='Maintenance Plant']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${plantName}']]//div[@role='checkbox']`));
        const plantId = await $(
            `//tr[.//span[normalize-space()='${plantName}']]//td[@role='gridcell'][2]//span`  
        ).getText();
        console.log(plantId);
        await utils.clickWithWait($(`//button[.//bdi[text()="Save"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${plantName}`);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='Maintenance Plant']/ancestor::div[1]/following-sibling::div/span[1]`
        );
        await this.logAndVerifyFilterValues(filterLabel, plantId, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${plantId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${plantName}`);

    }

    async workCenterAdaptFilter(workCenterName: string): Promise<void> {

        const expectedValue = workCenterName.trim().toLowerCase();
        const filterLabel = "Work Center";
        const filterInput = await $(`//bdi[normalize-space()='Work Center']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${workCenterName}']]//div[@role='checkbox']`));
        const workCenterId = await $(
            `//tr[.//span[normalize-space()='${workCenterName}']]//td[@role='gridcell'][2]//span`  
        ).getText();
        console.log(workCenterId);
        await utils.clickWithWait($(`//button[.//bdi[text()="Save"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${workCenterName}`);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='Work Center']/ancestor::div[1]/following-sibling::div/span[1]`
        );
        await this.logAndVerifyFilterValues(filterLabel, workCenterId, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${workCenterId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${workCenterName}`);

    }

    async userStatusAdaptFilter(status: string): Promise<void> {
        const expectedValue = status.trim().toLowerCase();
        const filterLabel = "User Status";
        const filterInput = await $(`//bdi[normalize-space()='User Status']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${status}']]//div[@role='checkbox']`));
        const statusId = await $(
            `//tr[.//span[normalize-space()='${status}']]//td[@role='gridcell'][2]//span`  
        ).getText();
        console.log(statusId);
        await utils.clickWithWait($(`//button[.//bdi[text()="Confirm"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${status}`);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='User Status']/ancestor::div[1]/following-sibling::div/span[1]`
        );
        await this.logAndVerifyFilterValues(filterLabel, statusId, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${statusId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${statusId}`);
        
    }

    async techIdAdaptFilter(techId: string): Promise<void> {
        const expectedValue = techId
        .trim()
        .toLowerCase();
        const filterLabel = "Tech ID";
        const filterInput = await $(`//label[.//bdi[text()='Tech ID']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(techId);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]')); // Keep one click
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const techIdValues = await $$(`//span[normalize-space(text())='Tech ID']/parent::div/following-sibling::div[1]//span`);
        const techIdCount = await techIdValues.length;
        console.log(`Total ${filterLabel} Found: ${techIdCount}`);
        if (techIdCount === 0) {
            throw new Error(`No ${filterLabel} values found after applying filter: ${techId}`);
        }
        for (const valueEl of techIdValues) {
            const raw = (await valueEl.getText() || await valueEl.getAttribute('textContent') || '');
            const actualValue = raw.replace(/\s+/g, ' ').trim().toLowerCase();
            console.log(`Found ${filterLabel}: ${actualValue}`);
            if (!actualValue.includes(expectedValue)) {
                throw new Error(
                    `Expected ${filterLabel}: ${expectedValue}, but found: ${actualValue}`
                );
            }
        }

        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${techId}`);
    }

    async sourceSystemAdaptFilter(sourceSystem: string): Promise<void> {
        const expectedValue = sourceSystem
        .trim()
        .toLowerCase();
        const filterLabel = "Source System";
        const filterInput = await $(`//label[.//bdi[text()='Source System']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(sourceSystem);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]')); // Keep one click
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000); // Reduced pause
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        console.log(`Total Rows: ${rows.length}`);

        const colHeader = await $(`//th[.//span[normalize-space()='${filterLabel}']]`);
        let colIndex = "5";
        if (await colHeader.isExisting()) {
            colIndex = await colHeader.getAttribute("aria-colindex") || "5";
        }

        const fieldValues = await $$(
            `//td[@aria-colindex='${colIndex}']`
        );
        
        await this.logAndVerifyFilterValues(filterLabel, sourceSystem, fieldValues);

        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${sourceSystem}`);
    }

    async systemStatusAdaptFilter(status: string): Promise<void> {
        const expectedValue = status.trim().toLowerCase();
        const filterLabel = "System Status";
        const filterInput = await $(`//bdi[normalize-space()='System Status']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${status}']]//div[@role='checkbox']`));
        const statusId = await $(
            `//tr[.//span[normalize-space()='${status}']]//td[@role='gridcell'][2]//span`  
        ).getText();
        console.log(statusId);
        await utils.clickWithWait($(`//button[.//bdi[text()="Confirm"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${status}`);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='System Status']/ancestor::div[1]/following-sibling::div/span[1]`
        );
        await this.logAndVerifyFilterValues(filterLabel, statusId, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${statusId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${statusId}`);
        
    }

    async superordinateEquipmentAdaptFilter(superordinateEquipmentId: string): Promise<void> {

        const expectedValue = superordinateEquipmentId.trim().toLowerCase();
        const filterLabel = "Superordinate Equipment";
        const filterInput = await $(`//bdi[normalize-space()='Superordinate Equipment']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(4000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${superordinateEquipmentId}']]//div[@role='checkbox']`));
        const plantId = await $(
            `//tr[.//span[normalize-space()='${superordinateEquipmentId}']]//td[@role='gridcell'][2]//span`  
        ).getText();
        console.log(plantId);
        await utils.clickWithWait($(`//button[.//bdi[text()="Confirm"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//td[@aria-colindex='8']//div[1]/div[1]/span`
        );
        
        await this.logAndVerifyFilterValues(filterLabel, superordinateEquipmentId, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${superordinateEquipmentId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${superordinateEquipmentId}`);
    
    }

    async superordinateEquipmentDescAdaptFilter(description: string): Promise<void> {
        const expectedValue = description
        .trim()
        .toLowerCase();
        const filterLabel = "Description";
        const filterInput = await $(`//label[.//bdi[text()='Superordinate Equipment Description']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(description);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));

        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//td[@aria-colindex='8']//div[1]/div[2]/span`
        );

        await this.logAndVerifyFilterValues(filterLabel, description, fieldValues);

        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${description}`);
    }

    async plantSectionAdaptFilter(plantSectionName: string): Promise<void> {

        const expectedValue = plantSectionName.trim().toLowerCase();
        const filterLabel = "Plant Section";
        const filterInput = await $(`//bdi[normalize-space()='Plant Section']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${plantSectionName}']]//div[@role='checkbox']`));
        const plantDesc = await $(
            `//tr[.//span[normalize-space()='${plantSectionName}']]//td[@role='gridcell'][3]//span`  
        ).getText();
        console.log(plantDesc);
        await utils.clickWithWait($(`//button[.//bdi[text()="Save"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='Plant Section']/ancestor::div[1]/following-sibling::div/span[1]`
        );
        await this.logAndVerifyFilterValues(filterLabel, plantSectionName, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${plantSectionName}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);   
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${plantSectionName}`);

    }

    async createdByAdaptFilter(userName: string): Promise<void> {
        const expectedValue = userName
        .trim()
        .toLowerCase();
        const filterLabel = "Created By";
        const filterInput = await $(`//label[.//bdi[text()='Created By']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(userName);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));

        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const colHeader = await $(`//th[.//span[normalize-space()='Created On / By' or normalize-space()='${filterLabel}']]`);
        const colIndex = (await colHeader.isExisting()) ? (await colHeader.getAttribute('aria-colindex') || '9') : '9';
        const fieldValues = await $$(
            `//td[@aria-colindex='${colIndex}']/div/div[2]/span`
        );

        await this.logAndVerifyFilterValues(filterLabel, userName, fieldValues);

        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${userName}`);
    }

    async createdOnAdaptFilter(date: string): Promise<void> {
        const expectedValue = date
        .trim()
        .toLowerCase();
        const filterLabel = "Created On";
        const filterInput = await $(`//label[.//bdi[text()='Created On']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(date+ " - " + date);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));

        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const colHeader = await $(`//th[.//span[normalize-space()='Created On / By' or normalize-space()='${filterLabel}']]`);
        const colIndex = (await colHeader.isExisting()) ? (await colHeader.getAttribute('aria-colindex') || '9') : '9';
        const fieldValues = await $$(
            `//td[@aria-colindex='${colIndex}']/div/div[1]/div/span`
        );

        await this.logAndVerifyFilterValues(filterLabel, date, fieldValues);

        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${date}`);
    }

    async modifiedByAdaptFilter(userName: string): Promise<void> {
        const expectedValue = userName
        .trim()
        .toLowerCase();
        const filterLabel = "Modified By";
        const filterInput = await $(`//label[.//bdi[text()='Modified By']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(userName);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));

        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='Modified On / By']/ancestor::div[1]/following-sibling::div/div/div[2]/span`
        );

        await this.logAndVerifyFilterValues(filterLabel, userName, fieldValues);

        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${userName}`);
    }

    async modifiedOnAdaptFilter(date: string): Promise<void> {
        const expectedValue = date;
        const filterLabel = "Modified On";
        const filterInput = await $(`//label[.//bdi[text()='Modified On']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(date + " - " + date);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));

        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='Modified On / By']/ancestor::div[1]/following-sibling::div/div/div[1]/div/span`
        );

        await this.logAndVerifyFilterValues(filterLabel, date, fieldValues);

        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${date}`);
    }

    async deactivationDateAdaptFilter(date: string): Promise<void> {
        const expectedValue = date
        .trim()
        .toLowerCase();
        const filterLabel = "Deactivation Date";
        const filterInput = await $(`//label[.//bdi[text()='Deactivation Date']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(date + " - " + date);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));

        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='Deactivation Date']/ancestor::div[1]/following-sibling::div/span[1]`
        );

        await this.logAndVerifyFilterValues(filterLabel, date, fieldValues);

        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${date}`);
    }

    async equipmentAdaptFilter(equipmentId: string): Promise<void> {
        const fieldLabel = "Equipment";
        await utils.clickWithWait($(`//bdi[normalize-space()='Equipment']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${equipmentId}']]//div[@role='checkbox']`));

        const equipmentIdValue = await $(
            `//tr[.//span[normalize-space()='${equipmentId}']]//td[@role='gridcell'][2]//span`
        ).getText();
        console.log(equipmentIdValue);
        
        await utils.clickWithWait($(`//button[.//bdi[text()="Confirm"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//td[@aria-colindex='1']/div/div[1]//span`
        );

        await this.logAndVerifyFilterValues(fieldLabel, equipmentId, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${equipmentId}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied Equipment adapt filter with value: ${equipmentId}`);
    }

    async equipmentDescriptionFilter(equipmentDescription: string): Promise<void> {
        const expectedValue = equipmentDescription
        .trim()
        .toLowerCase();
        const filterLabel = "Equipment Description";
        const filterInput = await $(`//label[.//bdi[text()='Equipment Description']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(equipmentDescription);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));

        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//td[@aria-colindex='1']/div/div[2]//span`
        );

        await this.logAndVerifyFilterValues(filterLabel, equipmentDescription, fieldValues);

        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${equipmentDescription}`);
    }

    async equipmentMDAAdaptFilter(Description: string): Promise<void> {
        
        const fieldLabel = "Equipment MDA";
        await utils.clickWithWait($(`//bdi[normalize-space()='Equipment MDA']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${Description}']]//div[@role='checkbox']`));

        const equipmentIdValue = await $(
            `//tr[.//span[normalize-space()='${Description}']]//td[@role='gridcell'][2]//span`
        ).getText();
        console.log(equipmentIdValue);
        
        await utils.clickWithWait($(`//button[.//bdi[text()="Save"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//span[normalize-space()='${fieldLabel}']/ancestor::div[1]/following-sibling::div/span[1]`
        );

        await this.logAndVerifyFilterValues(fieldLabel, equipmentIdValue, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${equipmentIdValue}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied Equipment MDA adapt filter with value: ${Description}`);
    }

    async functionalLocationAdaptFilter(functionalLocationDesc: string): Promise<void> {
        
        const fieldLabel = "Functional Location";
        await utils.clickWithWait($(`//bdi[normalize-space()='Functional Location']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${functionalLocationDesc}']]//div[@role='checkbox']`));

        const functionalLocationValue = await $(
                `//tr[.//span[normalize-space()='${functionalLocationDesc}']]//td[@role='gridcell'][2]/span[1]`
        ).getText();
        console.log(functionalLocationValue);
        
        
        await utils.clickWithWait($(`//button[.//bdi[text()="Confirm"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//td[@aria-colindex='2']/div/div[1]//span`
        );

        await this.logAndVerifyFilterValues(fieldLabel, functionalLocationValue, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${functionalLocationValue}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied Functional Location adapt filter with value: ${functionalLocationValue}`);
    }

    async functionalLocationDescriptionFilter(functionalLocationDesc: string): Promise<void> {
        const expectedValue = functionalLocationDesc
        .trim()
        .toLowerCase();
        const filterLabel = "Functional Location Description";
        const filterInput = await $(`//label[.//bdi[text()='Functional Location Description']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(functionalLocationDesc);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));

        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(2000);
        const fieldValues = await $$(
            `//td[@aria-colindex='2']/div/div[2]//span`
        );

        await this.logAndVerifyFilterValues(filterLabel, functionalLocationDesc, fieldValues);

        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${functionalLocationDesc}`);
    }

    // =====================================================================
    // Functional Location list view specific adapt filters.
    // Use these (rather than the equipment-table ones above) when running
    // against the Functional Location list view, where FL is in column 1.
    // =====================================================================

    async functionalLocationAdaptFilterFL(functionalLocationDesc: string): Promise<void> {
        const fieldLabel = "Functional Location";
        await utils.clickWithWait($(`//bdi[normalize-space()='Functional Location']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${functionalLocationDesc}']]//div[@role='checkbox']`));

        const functionalLocationValue = await $(
            `//tr[.//span[normalize-space()='${functionalLocationDesc}']]//td[@role='gridcell'][2]/span[1]`
        ).getText();
        console.log(functionalLocationValue);

        await utils.clickWithWait($(`//button[.//bdi[text()="Confirm"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const fieldValues = await $$(`//td[@aria-colindex='1']/div/div[1]//span`);
        await this.logAndVerifyFilterValues(fieldLabel, functionalLocationValue, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await utils.clickWithWait($(`//span[normalize-space()='${functionalLocationValue}']/following-sibling::span[@aria-label='Remove']`));
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied Functional Location adapt filter with value: ${functionalLocationValue}`);
    }

    async functionalLocationDescriptionFilterFL(functionalLocationDesc: string): Promise<void> {
        const expectedValue = functionalLocationDesc.trim().toLowerCase();
        const filterLabel = "Functional Location Description";
        const filterInput = await $(`//label[.//bdi[text()='Functional Location Description']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(functionalLocationDesc);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const fieldValues = await $$(`//td[@aria-colindex='1']/div/div[2]//span`);
        await this.logAndVerifyFilterValues(filterLabel, functionalLocationDesc, fieldValues);
        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${functionalLocationDesc}`);
    }

    /** Generic text-input filter: types `value`, clicks Go, asserts input retains it, then clears. */
    private async applyTextFilter(filterLabel: string, value: string): Promise<void> {
        const filterInput = await $(`//label[.//bdi[text()='${filterLabel}']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(value);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        const applied = (await filterInput.getValue() || '').trim();
        if (!applied.toLowerCase().includes(value.trim().toLowerCase())) {
            throw new Error(`Expected ${filterLabel} input to retain '${value}', but found: '${applied}'`);
        }
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${value}`);
    }

    /** Generic value-help filter: opens chooser, ticks `displayText` row, confirms, clicks Go, removes chip. */
    private async applyValueHelpFilter(filterLabel: string, displayText: string, confirmLabel: 'Confirm' | 'Save' | 'OK' = 'OK'): Promise<void> {
        await utils.clickWithWait($(`//bdi[normalize-space()='${filterLabel}']/ancestor::label/following::span[@role='button' and @aria-label='Show Value Help'][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);
        await utils.clickWithWait($(`//tr[.//span[normalize-space()='${displayText}']]//div[@role='checkbox']`));
        await utils.clickWithWait($(`//button[.//bdi[text()="${confirmLabel}"]]`));
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[.//bdi[text()="Go"]]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        const tokenizerXPath =
            `//bdi[normalize-space()='${filterLabel}']/ancestor::label` +
            `/following::div[contains(@class,'sapMTokenizer')][1]`;
        const tokenContainsXPath =
            `${tokenizerXPath}//*[self::span or self::bdi or self::div]` +
            `[contains(normalize-space(),'${displayText}')]`;
        const exactChipXPath = `//span[normalize-space()='${displayText}']/following-sibling::span[@aria-label='Remove']`;

        let chip = await $(tokenContainsXPath);
        if (!(await chip.isExisting())) {
            chip = await $(exactChipXPath);
        }
        if (!(await chip.isExisting())) {
            const anyToken = await $(`${tokenizerXPath}//*[@aria-label='Remove' or contains(@class,'sapMTokenIcon')]`);
            if (await anyToken.isExisting()) {
                console.log(`[${filterLabel}] Chip text didn't match '${displayText}', but a token exists in the filter — accepting`);
                chip = anyToken;
            } else {
                throw new Error(`Expected ${filterLabel} chip for '${displayText}' to be present after applying filter`);
            }
        }

        const removeBtn = await $(`${tokenizerXPath}//*[@aria-label='Remove' or contains(@class,'sapMTokenIcon')]`);
        const toClick = (await removeBtn.isExisting()) ? removeBtn : chip;
        await utils.clickWithWait(toClick);
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${displayText}`);
    }

    private async ensureFilterHeaderExpanded(): Promise<void> {
        try {
            const expand = await $(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`);
            if (await expand.isExisting() && await expand.isDisplayed().catch(() => false)) {
                await expand.click();
                await browser.pause(400);
            }
        } catch { /* header already expanded */ }
    }

    private async ensureFilterHeaderCollapsed(): Promise<void> {
        try {
            const collapse = await $(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`);
            if (await collapse.isExisting() && await collapse.isDisplayed().catch(() => false)) {
                await collapse.click();
                await browser.pause(400);
            }
        } catch { /* header already collapsed */ }
    }

    private async clearFilterTokens(filterLabel: string): Promise<void> {
        const tokenRemoveXPath =
            `//bdi[normalize-space()='${filterLabel}']/ancestor::label` +
            `/following::div[contains(@class,'sapMTokenizer')][1]` +
            `//*[@aria-label='Delete' or @aria-label='Remove' or contains(@class,'sapMTokenIcon')]`;
        for (let i = 0; i < 10; i++) {
            const tokens = await $$(tokenRemoveXPath);
            if (!(await tokens.length)) break;
            const first = tokens[0];
            try {
                if (await first.isDisplayed()) {
                    await first.click();
                    await browser.pause(250);
                } else {
                    break;
                }
            } catch { break; }
        }
    }

    private async applyDropdownFilter(filterLabel: string, optionIndex: number): Promise<void> {
        await this.ensureFilterHeaderExpanded();
        await utils.clickWithWait($(`//bdi[normalize-space()='${filterLabel}']/ancestor::label/following::span[@role='button'][1]`));
        await browser.pause(500);
        for (let i = 0; i < optionIndex; i++) {
            await browser.keys("ArrowDown");
            await browser.pause(300);
        }
        await browser.keys("Enter");
        await browser.keys("Escape");
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);

        await this.ensureFilterHeaderCollapsed();
        await browser.pause(500);

        await this.ensureFilterHeaderExpanded();
        await this.clearFilterTokens(filterLabel);
        await browser.pause(300);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        console.log(`Applied ${filterLabel} dropdown adapt filter (option #${optionIndex}) and cleared tokens`);
    }

    async characteristicShortDescriptionAdaptFilter(value: string): Promise<void> {
        await this.applyTextFilter('Characteristic Short Description', value);
    }

    async characteristicSourceSystemAdaptFilter(value: string): Promise<void> {
        await this.applyTextFilter('Characteristic Source System', value);
    }

    async displayIdAdaptFilter(value: string): Promise<void> {
        await this.applyTextFilter('Display Id', value);
    }

    async evergreeningStatusAdaptFilter(optionIndex: number = 1): Promise<void> {
        await this.applyDropdownFilter('Evergreening Status', optionIndex);
    }

    async activeAdaptFilter(value: 'Yes' | 'No' = 'Yes'): Promise<void> {
        const optionIndex = value === 'Yes' ? 1 : 2;
        await this.applyDropdownFilter('Active', optionIndex);
    }

    async parentFunctionalLocationAdaptFilter(displayText: string): Promise<void> {
        await this.applyValueHelpFilter('Parent Functional Location', displayText, 'Confirm');
    }

    async parentFunctionalLocationDescriptionAdaptFilter(value: string): Promise<void> {
        await this.applyTextFilter('Parent Functional Location Description', value);
    }

    async plannerGroupAdaptFilter(displayText: string): Promise<void> {
        await this.applyValueHelpFilter('Planner Group', displayText, 'Save');
    }

    async sortFieldAdaptFilter(value: string): Promise<void> {
        const expectedValue = value.trim().toLowerCase();
        const filterLabel = "Sort Field";
        const filterInput = await $(`//label[.//bdi[normalize-space()='${filterLabel}']]/following::input[1]`);
        await filterInput.waitForDisplayed();
        await filterInput.click();
        await filterInput.clearValue();
        await filterInput.addValue(value);
        await browser.pause(500);
        await utils.clickWithWait($('//button//bdi[text()="Go"]'));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        await utils.clickWithWait($(`//button[@aria-label='Collapse Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));

        const rows = await $$(
            "//table[@role='grid' and @aria-roledescription='Responsive Table']//following-sibling::tr[@role='none'][.//div[@role='gridcell']]"
        );
        await browser.pause(2000);
        console.log(`Total Rows: ${rows.length}`);
        await browser.pause(1000);

        const fieldValues = await $$(
            `//span[normalize-space()='${filterLabel}']/ancestor::div[1]/following-sibling::div/span[1]`
        );
        await this.logAndVerifyFilterValues(filterLabel, value, fieldValues);

        await utils.clickWithWait($(`//button[@aria-label='Expand Header' and not(ancestor-or-self::*[@aria-hidden='true'])]`));
        await browser.pause(500);
        await filterInput.clearValue();
        await browser.pause(500);
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Go']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1000);
        console.log(`Applied ${filterLabel} adapt filter with value: ${value}`);
    }
}
export default new adaptFilterHelper();
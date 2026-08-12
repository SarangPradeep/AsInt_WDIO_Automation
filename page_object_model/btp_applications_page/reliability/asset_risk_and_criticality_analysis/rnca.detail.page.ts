import { AssertionError } from 'node:assert';
import HomePage from '../../home.page';
import utils from '../../../../utils/utils';
import { RNCARiskData } from '../../../../test_data/btp_applications/reliability/asset_criticality_analysis.data';

class RNCADetailPage {

    private get rncaIframe() { return $('iframe[data-help-id="application-rca-manage"]'); }

    private get generalInfoEditBtn() {
        return $(`//span[text()='General Information']//following::bdi[text()='Edit'][1]`);
    }
    private get validityInfoEditBtn() {
        return $(`//span[text()='Validity']//following::bdi[text()='Edit'][1]`);
    }
    private get scopeInfoEditBtn() {
        return $(`//span[text()='Scope']//following::bdi[text()='Edit'][1]`);
    }

    private async clickSuccessOkIfPresent(timeout = 5000) {
        await browser.pause(2500);
        const okBtn = await $("//span[text()='Success']/following::button[.//bdi[text()='OK']][1]");

        try {
            await okBtn.waitForExist({ timeout });
        } catch (err) {
            return;
        }

        if (await okBtn.isDisplayed().catch(() => false)) {
            await okBtn.waitForClickable({ timeout });
            await okBtn.click();
        }
    }

    async editGeneralInformation(description: string, longDescription: string) {
        await console.log("Editing General Information with description:", description, "and longDescription:", longDescription);
        await browser.pause(3000);
        await utils.switchToIframe(this.rncaIframe);

        const editBtn = await this.generalInfoEditBtn;
        await editBtn.waitForClickable({ timeout: 50000 });
        await editBtn.click();

        const descriptionInput = await $("//bdi[text()='Description']/following::textarea[1]");
        await descriptionInput.waitForDisplayed();
        await descriptionInput.setValue(description);

        const longDescriptionInput = await $("//bdi[text()='Long Description']/following::textarea[1]");
        await longDescriptionInput.setValue(longDescription);

        const saveBtn = await $("//span[text()='General Information']//following::bdi[text()='Save'][1]");
        await saveBtn.waitForClickable({ timeout: 50000 });
        await saveBtn.click();

        await utils.waitForBusyIndicatorToDisappear();

        await utils.clickSuccessOkButton();
        await console.log("General Information edited successfully");
        await utils.waitForBusyIndicatorToDisappear();
    }

    async editValidity(validFrom: string, validTo: string) {
        await console.log("Editing Validity with validFrom:", validFrom, "and validTo:", validTo);
        await this.validityInfoEditBtn.click();

        const validFromInput = await $("//bdi[text()='Valid From']/following::input[1]");
        await validFromInput.setValue(validFrom);

        const validToInput = await $("//bdi[text()='Valid To']/following::input[1]");
        await validToInput.setValue(validTo);

        const saveBtn = await $("//span[text()='Validity']//following::bdi[text()='Save'][1]");
        await saveBtn.waitForClickable({ timeout: 50000 });
        await saveBtn.click();

        await utils.waitForBusyIndicatorToDisappear();

        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await console.log("Validity edited successfully");

    }

    async editScope(description: string) {
        await console.log("Editing Scope with description:", description);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.waitForBlockLayerToDisappear();
        await utils.clickWithWait(this.scopeInfoEditBtn);

        const descriptionInput = await $(`//span[text()='Scope']//following::bdi[text()='Description']/following::textarea[1]`);
        await descriptionInput.setValue(description);

        const saveBtn = await $("//span[text()='Scope']//following::bdi[text()='Save'][1]");
        await saveBtn.waitForClickable({ timeout: 50000 });
        await saveBtn.click();

        await utils.waitForBusyIndicatorToDisappear();

        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await console.log("Scope edited successfully");
        await browser.pause(3000);
    }

    private async getEquipmentTable() {
        const table = await $("(//table[@role='grid' and @aria-multiselectable='true' and @aria-rowcount])[1]");
        await table.waitForExist({ timeout: 10000 });
        return table;
    }

    private async getEquipmentRows() {
        const table = await this.getEquipmentTable();
        return await table.$$(".//tbody//tr[@role='row']");
    }

    private async getEquipmentCheckboxes() {
        const table = await this.getEquipmentTable();
        return await table.$$(".//tbody//tr[@role='row']//div[@role='checkbox']");
    }

    private async getDialogScrollContainer() {
        const table = await this.getEquipmentTable();
        const dialogSection = await table.$("./ancestor::section[contains(@style,'overflow')][1]");

        if (await dialogSection.isExisting()) {
            return dialogSection;
        }

        const dialogScroll = await table.$("./ancestor::div[contains(@style,'overflow')][1]");

        if (await dialogScroll.isExisting()) {
            return dialogScroll;
        }

        return table;
    }

    private async loadMoreRowsUntil(targetIndex: number) {
        let rows = (await this.getEquipmentRows()) as unknown as any[];
        let lastCount = rows.length;
        let attempts = 0;

        while (rows.length <= targetIndex) {
            console.log(`Loading more rows... current rows: ${rows.length}, need: ${targetIndex}`);

            const container = await this.getDialogScrollContainer();
            await container.scrollIntoView();
            await browser.execute((el: any) => {
                el.scrollTop = el.scrollHeight;
            }, container);

            await browser.pause(3000);
            const moreBtn = await $("(//div[@role='button' and .//span[normalize-space()='More']])[1]");
            if (await moreBtn.isDisplayed().catch(() => false)) {
                await moreBtn.click();
            }

            await utils.waitForBusyIndicatorToDisappear();
            await browser.pause(1500);

            rows = (await this.getEquipmentRows()) as unknown as any[];

            if (rows.length <= lastCount) {
                attempts += 1;
                if (attempts >= 3) {
                    throw new AssertionError({ message: "No more rows can be loaded." });
                }
            } else {
                lastCount = rows.length;
                attempts = 0;
            }
        }
    }
    async ensureItemsLoaded(requiredIndex: number) {
        await this.loadMoreRowsUntil(requiredIndex);
        return await this.getEquipmentCheckboxes();
    }
    async ensureRowVisible(targetIndex: number) {
        await this.loadMoreRowsUntil(targetIndex);
        return await this.getEquipmentCheckboxes();
    }

    async assignEquipment(equipmentName: string) {
        await console.log("Assigning equipment:", equipmentName);
        await utils.switchToIframe(this.rncaIframe);
        await utils.clickWithWait($("//span[normalize-space()='Assignments']"));
        // let count = 0;
        // while(true) {
        //     await console.log("Attempting to assign equipment, batch starting at index:", count);
        //     const assignBtn = await $(`//div[.//span[normalize-space()='Assignments']]//button[.//bdi[normalize-space()='Assign']]`);
        //     await assignBtn.waitForClickable({ timeout: 50000 });
        //     await assignBtn.click();

        //     const equipmentDropdown = await $("//*[normalize-space()='Equipment']");
        //     await equipmentDropdown.waitForClickable({ timeout: 50000 });
        //     await equipmentDropdown.click();

        //     await browser.pause(6000); // Wait for dropdown options to load
        //     const checkboxes = await $$("//tbody//tr[@role='row']//div[@role='checkbox']");
        //     const checkboxesCount = await checkboxes.length;
        //     if (count >= checkboxesCount) {
        //         throw new AssertionError({ message: "No more technical objects available to assign after duplicate-selection retries." });
        //     }
        //     if(count > 10) {
        //         const container = await $('//section[contains(@style,"overflow: auto")]');
        //         let lastScrollTop = 0;
        //         while (true) {
        //             const newScrollTop = await browser.execute((el) => {
        //                 el.scrollTop += 20;   // scroll step
        //                 return el.scrollTop;
        //             }, container);

        //             if (newScrollTop === lastScrollTop) break;

        //             lastScrollTop = newScrollTop;

        //             await browser.pause(1500); // wait for new data load
        //         }
        //     }
        //     await console.log(`Selecting equipment checkbox at index: ${count}`);
        //     await checkboxes[count].waitForClickable({ timeout: 10000 });
        //     await browser.execute(el => el.scrollIntoView({ block: 'center' }), checkboxes[count]);
        //     await checkboxes[count].click();

        //     await utils.clickWithWait($(`//bdi[text()='Confirm']`));
        //     await utils.waitForBusyIndicatorToDisappear();

        //     const dialog = await $("//div[@role='alertdialog']");
        //     await dialog.waitForDisplayed({ timeout: 50000 });
        //     await browser.pause(500);

        //     const dialogText = await dialog.getText();
        //     console.log("Assignment Dialog Message:", dialogText);

        //     if (dialogText.includes("Please select different Technical Objects")) {
        //         const warningOkBtn = await dialog.$(".//button[.//bdi[normalize-space()='OK']]");
        //         await warningOkBtn.waitForClickable({ timeout: 10000 });
        //         await warningOkBtn.click();
        //         await utils.waitForBusyIndicatorToDisappear();
        //         count++;
        //         continue;
        //     }

        //     const isAssignmentSuccess = /Technical\s*Object\s*Assigned\s*successfully|Assigned\s*successfully/i.test(dialogText);
        //     if (!isAssignmentSuccess) {
        //         throw new AssertionError({ message: `Unexpected assignment dialog message: ${dialogText}` });
        //     }

        //     const yesBtn = await dialog.$(".//button[.//bdi[normalize-space()='Yes' or normalize-space()='OK']]");
        //     await yesBtn.waitForClickable({ timeout: 10000 });
        //     await yesBtn.click();
        //     await utils.waitForBusyIndicatorToDisappear();
        //     await utils.clickSuccessOkButton();
        //     await utils.waitForBusyIndicatorToDisappear();
        //     await console.log("Equipment assigned successfully");
        //     break;
        // }
        let batchStart = 0;
        let batchSize = 20;

        while (true) {

            console.log(`Starting batch from index: ${batchStart}`);

            const assignBtn = await $(`//div[.//span[normalize-space()='Assignments']]//button[.//bdi[normalize-space()='Assign']]`);
            await assignBtn.waitForClickable({ timeout: 50000 });
            await assignBtn.click();

            const equipmentDropdown = await $("//*[normalize-space()='Equipment']");
            await equipmentDropdown.waitForClickable({ timeout: 50000 });
            await equipmentDropdown.click();

            await browser.pause(3000);

            await this.loadMoreRowsUntil(batchStart + batchSize - 1);

            const checkboxes = (await this.getEquipmentCheckboxes()) as unknown as any[];
            const totalLoaded = checkboxes.length;

            let selectedCount = 0;
            for (let i = batchStart; i < Math.min(batchStart + batchSize, totalLoaded); i++) {
                try {
                    await browser.execute((el: any) => el.scrollIntoView({ block: 'center' }), checkboxes[i]);
                    await checkboxes[i].waitForClickable({ timeout: 5000 });
                    await checkboxes[i].click();

                    selectedCount++;
                } catch (err) {
                    console.log(`Skipping index ${i}`);
                }
            }

            console.log(`Selected ${selectedCount} items`);

            if (selectedCount === 0) {
                throw new AssertionError({ message: "No selectable items found in batch." });
            }

            // ✅ SINGLE CONFIRM CLICK
            await utils.clickWithWait($(`//bdi[text()='Confirm']`));
            await utils.waitForBusyIndicatorToDisappear();

            const dialog = await $("//div[@role='alertdialog']");
            await dialog.waitForDisplayed({ timeout: 50000 });

            const dialogText = await dialog.getText();
            console.log("Dialog:", dialogText);

            // ⚠️ HANDLE DUPLICATES / PARTIAL FAIL
            if (dialogText.includes("Please select different Technical Objects")) {
                console.log("Some duplicates found, moving to next batch...");

                const okBtn = await dialog.$(".//button[.//bdi[normalize-space()='OK']]");
                await okBtn.click();

                await utils.waitForBusyIndicatorToDisappear();

                batchStart += batchSize;
                continue;
            }
            if (dialogText.includes("Few of the selected Technical Objects are already assigned to other ongoing assessments")) {
                await console.log(dialogText);
                console.log("Some items already assigned, confirming to assign the rest...");
                const yesBtn = await dialog.$(".//button[.//bdi[normalize-space()='Yes' or normalize-space()='OK']]");
                await yesBtn.waitForClickable({ timeout: 10000 });
                await yesBtn.click();
                await utils.waitForBusyIndicatorToDisappear();
                await utils.clickSuccessOkButton();
                await browser.pause(3000);
                const noDataCell = await $("//td[normalize-space()='No data']");
                if (await noDataCell.isDisplayed()) {
                    console.log("⚠️ No equipment available (No data found), skipping...");
                    batchStart += batchSize;
                    continue;
                }
                console.log("Batch assigned with some duplicates skipped, done.");
                break;
            }

            // ✅ SUCCESS
            // const isSuccess = /Assigned\s*successfully/i.test(dialogText);

            // if (!isSuccess) {
            //     throw new AssertionError({ message: `Unexpected dialog: ${dialogText}` });
            // }

            const yesBtn = await dialog.$(".//button[.//bdi[normalize-space()='Yes' or normalize-space()='OK']]");
            await yesBtn.click();

            await utils.waitForBusyIndicatorToDisappear();
            await utils.clickSuccessOkButton();

            console.log("✅ Batch assigned successfully");

            // 🔁 MOVE TO NEXT BATCH
            batchStart += batchSize;
        }
    }

    // async assignEquipment(equipmentName: string) {
    //     await console.log("Assigning equipment:", equipmentName);
    //     await utils.switchToIframe(this.rncaIframe);
    //     await utils.clickWithWait($("//bdi[normalize-space()='Assignments']"));

    //     const assignBtn = await $(`//div[.//span[normalize-space()='Assignments']]//button[.//bdi[normalize-space()='Assign']]`);
    //     await assignBtn.waitForClickable({ timeout: 50000 });
    //     await assignBtn.click();

    //     const equipmentDropdown = await $("//*[normalize-space()='Equipment']");
    //     await equipmentDropdown.waitForClickable({ timeout: 50000 });
    //     await equipmentDropdown.click();

    //     await browser.pause(4000); // Wait for dropdown options to load
    //     const checkboxes = await $$("//tbody//tr[@role='row']//div[@role='checkbox']");

    //     for (let i = 0; i < 15; i++) {
    //         await checkboxes[i].waitForClickable({ timeout: 10000 });
    //         await checkboxes[i].scrollIntoView();
    //         await checkboxes[i].click();
    //     }
    //     await console.log("Checkboxes clicked successfully");

    //     await utils.clickWithWait($(`//bdi[text()='Confirm']`));
    //     await utils.waitForBusyIndicatorToDisappear();
    //     // Wait for dialog
    //     const dialog = await $("//div[@role='alertdialog']");
    //     await dialog.waitForDisplayed({ timeout: 50000 });
    //     // Get message text
    //     const message = await dialog.$(".//span[contains(text(),'Few')]").getText();
    //     console.log("Confirmation Message:", message);

    //     // Click Yes
    //     const yesBtn = await dialog.$(".//button[.//bdi[normalize-space()='Yes']]");
    //     await yesBtn.waitForClickable({ timeout: 10000 });
    //     await yesBtn.click();
    //     await utils.waitForBusyIndicatorToDisappear();
    //     await utils.clickSuccessOkButton();
    //     await console.log("Equipment assigned successfully");
    //     await utils.waitForBusyIndicatorToDisappear();
    // }

    async assignFunctionalLocation(equipmentName: string) {
        await console.log("Assigning functional location:", equipmentName);
        await utils.switchToIframe(this.rncaIframe);
        await utils.clickWithWait($("//bdi[normalize-space()='Assignments']"));

        const assignBtn = await $(`//div[.//span[normalize-space()='Assignments']]//button[.//bdi[normalize-space()='Assign']]`);
        await assignBtn.waitForClickable({ timeout: 50000 });
        await assignBtn.click();

        const equipmentDropdown = await $("//*[normalize-space()='Functional Location']");
        await equipmentDropdown.waitForClickable({ timeout: 50000 });
        await equipmentDropdown.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(4000); // Wait for dropdown options to load
        const checkboxes = await $$("//tbody//tr[@role='row']//div[@role='checkbox']");

        for (let i = 0; i < 20; i++) {
            await checkboxes[i].waitForClickable({ timeout: 10000 });
            await checkboxes[i].scrollIntoView();
            await checkboxes[i].click();
        }

        await utils.clickWithWait($(`//bdi[text()='Confirm']`));
        await utils.waitForBusyIndicatorToDisappear();
        // Wait for dialog
        const dialog = await $("//div[@role='alertdialog']");
        await dialog.waitForDisplayed({ timeout: 50000 });

        // Get message text
        const message = await dialog.$(".//span[contains(text(),'Few')]").getText();
        console.log("Confirmation Message:", message);

        // Click Yes
        const yesBtn = await dialog.$(".//button[.//bdi[normalize-space()='Yes']]");
        await yesBtn.waitForClickable({ timeout: 10000 });
        await yesBtn.click();
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
    }
    async assignTemplate(TemplateName: string) {
        await console.log("Assigning template:", TemplateName);
        await browser.pause(3000);
        await utils.switchToIframe(this.rncaIframe);
        const firstCheckbox = await $("(//tbody//tr[@role='row']//div[@role='checkbox' and @tabindex='0' and not(ancestor::*[@aria-hidden='true'])])[1]");
        await firstCheckbox.scrollIntoView();
        await firstCheckbox.click();
        //await browser.execute(el => el.click(), firstCheckbox);

        const manageTemplateBtn = await $(`//button[.//bdi[normalize-space()='Manage Template'] or .//span[normalize-space()='Manage Template']]`);
        await manageTemplateBtn.waitForClickable({ timeout: 50000 });
        await manageTemplateBtn.click();
        await browser.pause(3000);
        // const manageTemplateAssignOption = await $(`(//li[@role='menuitem' and .//bdi[normalize-space()='Assign'] and not(ancestor::*[@aria-hidden='true'])])[1]`);
        // await utils.clickWithWait(manageTemplateAssignOption);
        //await browser.keys(['ArrowDown']);
        await browser.keys(['Enter']);
        await browser.pause(4000);
        const firstRadio = await $("(//tr[@role='row']//div[@role='radio'])[1]");

        await firstRadio.waitForDisplayed({ timeout: 10000 });
        await firstRadio.scrollIntoView();
        await firstRadio.waitForClickable({ timeout: 10000 });

        const isSelected = await firstRadio.getAttribute("aria-checked");

        if (isSelected !== "true") {
            await firstRadio.click();
        }

        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='Cancel']]/preceding::button[.//bdi[normalize-space()='Assign']][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await console.log("Template assigned successfully");
        await browser.pause(3000);
    }
    async calculateRiskOnAssessment() {
        await console.log("Calculating risk on assessment");
        await utils.switchToIframe(this.rncaIframe);
        const assessmentElements = await $$("//span[normalize-space()='Assessment']");
        for (const element of assessmentElements) {
            if (await element.isDisplayed() && await element.isClickable()) {
                await element.click();
                break;
            }
        }
        await utils.clickWithWait($(`(//li[@role='listitem']//div[@role='checkbox'])[1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);

        const expcolBtns = (await $$("//button[@title='Expand/Collapse']")) as unknown as any[];
        const totalPanels = expcolBtns.length;
        console.log("Total panels:", totalPanels);

        for (let i = 0; i < totalPanels; i++) {
            try {
                await console.log(`Processing panel ${i + 1}`);
                
                const buttons = (await $$("//button[@title='Expand/Collapse']")) as unknown as any[];
                if (i >= buttons.length) {
                    console.log(`Panel ${i + 1}: Button no longer exists, skipping`);
                    continue;
                }
                
                const btn = buttons[i];

                try {
                    await browser.execute((el: any) => el.scrollIntoView({ block: 'center' }), btn);
                } catch (scrollErr) {
                    console.log(`Panel ${i + 1}: Scroll failed, continuing...`);
                }
                
                await browser.pause(300);
                
                const isClickable = await btn.isClickable().catch(() => false);
                if (!isClickable) {
                    console.log(`Panel ${i + 1}: Button not clickable, skipping`);
                    continue;
                }

                const isExpanded = await btn.getAttribute("aria-expanded").catch(() => "true");
                if (isExpanded === "false") {
                    await btn.click().catch(() => console.log(`Panel ${i + 1}: Click failed`));
                    await browser.pause(500);
                }

                console.log(`Panel ${i + 1} expanded`);

                const panel = await btn.$("./ancestor::div[contains(@id,'idImpactPanels')]").catch(() => null);
                if (!panel) {
                    console.log(`Panel ${i + 1}: Panel not found, skipping`);
                    continue;
                }

                const tables = ((await panel.$$("//table[@role='grid']").catch(() => [])) as unknown as any[]);
                console.log(`Panel ${i + 1}: tables =`, tables.length);

                for (let j = 0; j < tables.length; j++) {
                    try {
                        await console.log(`Processing table ${j + 1} in panel ${i + 1}`);
                        
                        const freshButtons = (await $$("//button[@title='Expand/Collapse']")) as unknown as any[];
                        if (i >= freshButtons.length) continue;
                        
                        const freshPanel: any = await freshButtons[i].$("./ancestor::div[contains(@id,'idImpactPanels')]").catch(() => null);
                        if (!freshPanel) continue;
                        
                        const freshTables = ((await freshPanel.$$(".//table[@role='grid']").catch(() => [])) as unknown as any[]);
                        if (j >= freshTables.length) continue;
                        
                        const table = freshTables[j];
                        
                        const radios = ((await table.$$(".//tbody//div[@role='radio']").catch(() => [])) as unknown as any[]);
                        if (radios.length === 0) {
                            console.log(`Panel ${i + 1} - Table ${j + 1}: No radios`);
                            continue;
                        }

                        for (const radio of radios) {
                            try {
                                const isDisplayed = await radio.isDisplayed().catch(() => false);
                                const isClickable = await radio.isClickable().catch(() => false);
                                
                                if (!isDisplayed || !isClickable) continue;
                                
                                const isSelected = await radio.getAttribute("aria-checked").catch(() => "true");
                                
                                if (isSelected !== "true") {
                                    try {
                                        await browser.execute((el: any) => el.scrollIntoView({ block: 'center' }), radio);
                                    } catch (scrollErr) {}
                                    
                                    await browser.pause(200);
                                    
                                    try {
                                        await radio.click();
                                        console.log(`Panel ${i + 1} - Table ${j + 1}: Radio selected`);
                                        break;
                                    } catch (clickErr) {
                                        try {
                                            await browser.execute((el: any) => el.click(), radio);
                                            console.log(`Panel ${i + 1} - Table ${j + 1}: Radio selected via JS`);
                                            break;
                                        } catch (jsErr) {}
                                    }
                                } else {
                                    console.log(`Panel ${i + 1} - Table ${j + 1}: Already selected`);
                                    break;
                                }
                            } catch (radioErr) {
                                continue;
                            }
                        }

                    } catch (tableErr) {
                        console.log(`Panel ${i + 1} - Table ${j + 1}: Error - ${(tableErr as Error).message}`);
                        continue;
                    }
                }
                
            } catch (panelErr) {
                console.log(`Panel ${i + 1}: Error - ${(panelErr as Error).message}, continuing...`);
                continue;
            }
        }
        await utils.clickWithWait($(`//bdi[normalize-space()='Action:']/following::button[.//bdi[normalize-space()='Save']][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);

        const table = await $(
            "//span[normalize-space()='Risk Details']/ancestor::*[.//table][1]//table"
        );
        if (await table.isDisplayed().catch(() => false)) {

            const rows = (await table.$$("//tbody/tr")) as unknown as any[];


            if (rows.length === 0) {
                console.log("Risk Details present but empty");
            } else {
                console.log(`Risk Details found (${rows.length} rows)`);

                for (let row of rows) {
                    if (!(await row.isDisplayed())) continue;

                    const impact = await row.$("./td[2]//span").getText();
                    const risk = await row.$("./td[3]//span").getText();

                    console.log(`Impact: ${impact} | Risk: ${risk}`);
                }
            }

        } else {
            console.log("Risk Details section not found");
        }

        const riskScore = await $(
            "(//bdi[normalize-space()='Risk Score/Criticality:']/following::div[1])[1]"
        ).getText();
        await console.log("Risk Score:", riskScore);
    }

    async selectImpactValuesAndSave() {
        await console.log("Selecting random impact values on first block");
        await utils.switchToIframe(this.rncaIframe);

        const assessmentTabs = await $$("//span[normalize-space()='Assessment']");
        for (const tab of assessmentTabs) {
            if (await tab.isDisplayed() && await tab.isClickable()) {
                await tab.click();
                break;
            }
        }
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(1500);

        await utils.clickWithWait($(`(//li[@role='listitem']//div[@role='checkbox'])[1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(2000);

        const firstExpandBtn = await $("(//button[@title='Expand/Collapse'])[1]");
        await firstExpandBtn.waitForClickable({ timeout: 50000 });
        const isExpanded = await firstExpandBtn.getAttribute("aria-expanded").catch(() => "true");
        if (isExpanded === "false") {
            await firstExpandBtn.click();
            await browser.pause(1000);
        }

        const panel = await firstExpandBtn.$("./ancestor::div[contains(@id,'idImpactPanels')]");

        const selectRandomRadio = async (sectionTitle: string, label: string) => {
            const rowsXpath = `//span[normalize-space()='${sectionTitle}']/ancestor::div[contains(@class,'sapMPanel')][1]//table[@role='grid']//tbody//tr[@role='row' and .//div[@role='radio']]`;
            const rows = ((await $$(rowsXpath)) as unknown as any[]);
            const visibleRows: any[] = [];
            for (const r of rows) {
                if (await r.isDisplayed().catch(() => false)) visibleRows.push(r);
            }
            if (visibleRows.length === 0) {
                console.log(`${label}: no rows found under '${sectionTitle}'`);
                return;
            }
            const randomIndex = Math.floor(Math.random() * visibleRows.length);
            const row = visibleRows[randomIndex];
            const value = await row.$("./td[3]//span").getText().catch(() => "");
            console.log(`${label}: randomly selected row ${randomIndex + 1} of ${visibleRows.length} (value='${value}')`);
            const radio = await row.$(".//div[@role='radio']");
            await browser.execute((el: any) => el.scrollIntoView({ block: 'center' }), radio);
            await browser.pause(300);
            const checked = await radio.getAttribute("aria-checked").catch(() => "false");
            if (checked !== "true") {
                try {
                    await radio.click();
                } catch (e) {
                    await browser.execute((el: any) => el.click(), radio);
                }
            }
            await browser.pause(300);
        };

        const notesXpath = (sectionTitle: string) =>
            `//span[normalize-space()='${sectionTitle}']/following::textarea[1]`;

        const oversizeText = "A".repeat(5200);

        const enterNotes = async (sectionTitle: string, text: string) => {
            const textarea = await $(notesXpath(sectionTitle));
            if (await textarea.isDisplayed().catch(() => false)) {
                await textarea.scrollIntoView();
                await textarea.click();
                await browser.execute((el: any, val: string) => {
                    el.value = val;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }, textarea, text);
                console.log(`Entered ${text.length} chars in section '${sectionTitle}'`);
            } else {
                console.log(`Textarea not found under section '${sectionTitle}'`);
            }
        };

        const choosingExternalReference = async () => {
            const externalRefBtn = await $("//span[normalize-space()='External reference']/following::span[@aria-label='Select Options']");
            await externalRefBtn.waitForClickable({ timeout: 10000 });
            await externalRefBtn.click();
            await utils.waitForBusyIndicatorToDisappear();
            const options = await $$("//li[@role='option']");
            for (const option of options) {
                const text = await option.getText().catch(() => "");
                console.log(`External reference option: ${text}`);
            }
            await options[0].click();
            await utils.waitForBusyIndicatorToDisappear();
            console.log("External reference selected");
        };

        const enterNotesForExternalReference = async (text: string) => {
            const noteOpt = await $("//span[normalize-space()='External reference']/following::button[@title='course-book']");
            if (await noteOpt.isDisplayed().catch(() => false)) {
                await noteOpt.scrollIntoView();
                await noteOpt.click();
                await browser.execute((el: any, val: string) => {
                    el.value = val;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }, noteOpt, text);
                console.log(`Entered ${text.length} chars in External reference section`);
            } else {
                console.log(`Note Button not found under External reference section`);
            }
            const noteTextarea = await $("//span[normalize-space()='Notes']/following::textarea[1]");
            if (await noteTextarea.isDisplayed().catch(() => false)) {
                await noteTextarea.scrollIntoView();
                await noteTextarea.click();
                await browser.execute((el: any, val: string) => {
                    el.value = val;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }, noteTextarea, text);
                console.log(`Entered ${text.length} chars in Notes section`);
                await browser.pause(300);   
                const addNotesBtn = await $("//span[normalize-space()='Notes']/following::button[.//text()='Add']");
                if (await addNotesBtn.isDisplayed().catch(() => false)) {
                    await addNotesBtn.scrollIntoView();
                    await addNotesBtn.click();
                }
            } else {
                console.log(`Notes textarea not found under External reference section`);
            }
        };

        await selectRandomRadio("Criticality : Operation", "SHE");
        await enterNotes("Criticality : Operation", oversizeText);
        await selectRandomRadio("Consequence", "FIN");
        await enterNotes("Consequence", oversizeText);

        await choosingExternalReference();
        await enterNotesForExternalReference(oversizeText);

        await utils.clickWithWait($(`//bdi[normalize-space()='Action:']/following::button[.//bdi[normalize-space()='Save']][1]`));
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        await console.log("Impact values saved");

        const savedTextarea = await $(notesXpath("Criticality : Operation"));
        await savedTextarea.waitForDisplayed({ timeout: 30000 });
        await savedTextarea.scrollIntoView();
        const savedValue = await browser.execute((el: any) => el.value, savedTextarea) as string;
        const savedLength = (savedValue || "").length;
        console.log(`Saved notes length after save: ${savedLength}`);
        if (savedLength !== 5000) {
            throw new AssertionError({
                message: `Notes truncation failed: expected exactly 5000 characters after save but got ${savedLength}`
            });
        }
        console.log("Notes truncated to exactly 5000 characters as expected");
    }

    async deleteAssessment() {
        await console.log("Deleting assessment");
        await utils.switchToIframe(this.rncaIframe);
        const deleteBtn = await $(`//button[.//bdi[normalize-space()='Manage']]`);
        await deleteBtn.waitForClickable({ timeout: 50000 });
        await deleteBtn.click();
        await browser.keys(['Enter']);
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait($(`//button[.//bdi[normalize-space()='OK']]`));
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickSuccessOkButton();
        await console.log("Assessment deleted successfully");
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
    }
    async verifyAdministrativeInformation() {
        await console.log("Verifying Administrative Information");
        await utils.switchToIframe(this.rncaIframe);
        const createdBy = await $("//dt[.//text()='Created By']/following::span[1]").getText();
        const createdOn = await $("//dt[.//text()='Created On']/following::span[1]").getText();
        const changedOn = await $("//dt[.//text()='Changed On']/following::span[1]").getText();
        const changedBy = await $("//dt[.//text()='Changed By']/following::span[1]").getText();
        await console.log(`Created By: ${createdBy} | Created On: ${createdOn} | Changed By: ${changedBy} | Changed On: ${changedOn}`);
    }

    async enableImpactForCalculation() {
        await console.log("Enabling impact for calculation");
        const impactNoSwitch = await $(
            "//span[contains(text(),'Test Impact') and contains(text(),'Schedule')]/ancestor::div[@role='toolbar']//div[@role='switch']"
        );
        await impactNoSwitch.click();
        const safetyNoSwitch = await $("//span[text()='Safety : Saftey'] /ancestor::div[@role='toolbar'] //div[@role='switch']");
        await safetyNoSwitch.click();
    }
    async publishAssessment() {

        await console.log("Publishing assessment");
        const publishBtn = await $("//bdi[text()='Publish']");
        await publishBtn.click();
        await utils.clickWithWait($("//div[@role='alertdialog']//bdi[text()='Yes']"));
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait($("//div[@role='alertdialog']//bdi[text()='OK']"));
        await utils.waitForBusyIndicatorToDisappear();
        await console.log("Assessment published successfully");
    }

    async assignEquipmentByName() {
        await console.log("Assigning equipment:");
        await utils.switchToIframe(this.rncaIframe);
        await utils.clickWithWait($("//bdi[normalize-space()='Assignments']"));
        const assignBtn = await $(`//div[.//span[normalize-space()='Assignments']]//button[.//bdi[normalize-space()='Assign']]`);
        await assignBtn.waitForClickable({ timeout: 50000 });
        await assignBtn.click();
        const equipmentDropdown = await $("//*[normalize-space()='Equipment']");
        await equipmentDropdown.waitForClickable({ timeout: 50000 });
        await equipmentDropdown.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        const equipmentSearchBox = await $("//div[@role='dialog']//input[@aria-label='Search']");
        await equipmentSearchBox.waitForDisplayed({ timeout: 30000 });
        await equipmentSearchBox.clearValue();
        await equipmentSearchBox.setValue("10000099");
        const searchIcon = await $("//div[@role='dialog']//input[@aria-label='Search']/parent::form/div[contains(@id,'search')]");
        await searchIcon.click();
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait($("//div[@role='dialog']//tbody//tr[1]//div[@role='checkbox']"));
        await utils.clickWithWait($(`//bdi[text()='Confirm']`));
        await utils.waitForBusyIndicatorToDisappear();
        const assignedSuccessDialog = await $("//div[@role='alertdialog']//span[text()='Technical Object Assigned successfully.']");
        await assignedSuccessDialog.waitForDisplayed({ timeout: 30000 });
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        await utils.clickWithWait($("//a[text()='10000099']/ancestor::tr//div[@role='checkbox']"));
        const manageTemplateBtn = await $(`//button[.//bdi[normalize-space()='Manage Template'] or .//span[normalize-space()='Manage Template']]`);
        await manageTemplateBtn.waitForClickable({ timeout: 50000 });
        await manageTemplateBtn.click();
        const manageTemplateAssignOption = await $(`//div[text()='Assign']`);
        await utils.clickWithWait(manageTemplateAssignOption);

    }

    async assignTemplateByName(): Promise<void> {
        console.log("\n==================================================");
        console.log("START : assignTemplateByName()");
        console.log("==================================================");
        console.log("[STEP 1] Switching to RNCA iframe...");
        await utils.switchToIframe(this.rncaIframe);
        console.log("✓ Successfully switched to RNCA iframe.");
        await browser.pause(3000);
        await utils.switchToIframe(this.rncaIframe);
        const firstCheckbox = await $("(//tbody//tr[@role='row']//div[@role='checkbox' and @tabindex='0' and not(ancestor::*[@aria-hidden='true'])])[1]");
        await firstCheckbox.scrollIntoView();
        await firstCheckbox.click();
        const manageTemplateBtn = await $(`//button[.//bdi[normalize-space()='Manage Template'] or .//span[normalize-space()='Manage Template']]`);
        await manageTemplateBtn.waitForClickable({ timeout: 50000 });
        await manageTemplateBtn.click();
        await browser.pause(3000);
        await browser.keys(['Enter']);
        await browser.pause(4000);
        console.log("[STEP 2] Locating Template Search textbox...");
        const searchTemplateBox = await $(
            "//div[@role='dialog']//input[@aria-label='Search']"
        );
        console.log("[STEP 3] Waiting for Search textbox to be displayed...");
        await searchTemplateBox.waitForDisplayed({ timeout: 30000 });
        console.log("✓ Search textbox is displayed.");
        console.log("[STEP 4] Clearing existing text from Search textbox...");
        await searchTemplateBox.clearValue();
        console.log("✓ Search textbox cleared.");
        console.log("[STEP 5] Entering template name: " + RNCARiskData.templates.template_id);
        await searchTemplateBox.setValue(RNCARiskData.templates.template_id);
        console.log("✓ Template name entered successfully.");
        console.log("[STEP 6] Locating Search icon...");
        const searchIcon = await $(
            "//div[@role='dialog']//input[@aria-label='Search']/parent::form/div[contains(@id,'search')]"
        );
        console.log("[STEP 7] Clicking Search icon...");
        await searchIcon.waitForClickable({ timeout: 30000 });
        await searchIcon.click();
        console.log("✓ Search initiated.");
        console.log("[STEP 8] Locating first matching template...");
        const firstTemplate = await $(
            "//div[@role='dialog']//div[@role='radio']"
        );
        console.log("[STEP 9] Selecting first matching template...");
        await utils.clickWithWait(firstTemplate);
        console.log("✓ Template selected.");
        console.log("[STEP 10] Locating Assign button...");
        const assignButton = await $(
            "//div[@role='dialog']//bdi[normalize-space()='Assign']"
        );
        console.log("[STEP 11] Clicking Assign button...");
        await utils.clickWithWait(assignButton);
        console.log("✓ Assign button clicked.");
        console.log("[STEP 12] Waiting for Busy Indicator to disappear...");
        await utils.waitForBusyIndicatorToDisappear();
        console.log("✓ Busy Indicator disappeared.");
        console.log("[STEP 13] Waiting for Success dialog...");
        const assignedSuccessDialog = await $(
            "//div[@role='alertdialog']//span[text()='Template Assigned successfully.']"
        );
        await assignedSuccessDialog.waitForDisplayed({ timeout: 30000 });
        console.log("✓ Success dialog displayed.");
        console.log("[STEP 14] Closing Success dialog...");
        await utils.clickSuccessOkButton();
        console.log("✓ Success dialog closed.");
        console.log("[STEP 15] Waiting for Busy Indicator after dialog...");
        await utils.waitForBusyIndicatorToDisappear();
        console.log("✓ Busy Indicator disappeared.");
        console.log("[STEP 16] Waiting for page stabilization (5 seconds)...");
        await browser.pause(5000);
        console.log("==================================================");
        console.log("END : assignTemplateByName()");
        console.log("==================================================\n");
    }


    async assignTemplateByAlphaNumericRisk() {
        console.log("========== Assign Template by Risk Score Type ==========");
        console.log(`Risk Score Type : AlphaNumeric`);
        await utils.switchToIframe(this.rncaIframe);
        console.log("✓ Switched to RNCA iframe");
        console.log("Opening Risk Score Type dropdown...");
        const riskScoreTypeDropdown = await $(
            "//div[@role='dialog']//bdi[text()='Risk Score Type']/following::div[1]//span"
        );
        await riskScoreTypeDropdown.waitForClickable({ timeout: 30000 });
        await riskScoreTypeDropdown.click();
        console.log(`Selecting Risk Score Type: AlphaNumeric`);
        const scoreTypeOptionAlphaNumeric = await $("//div[@role='dialog'][2]//span[text()='AlphaNumeric']");
        await scoreTypeOptionAlphaNumeric.waitForClickable({ timeout: 30000 });
        await scoreTypeOptionAlphaNumeric.click();
        const searchTemplateBox = await $(
            "//div[@role='dialog']//input[@aria-label='Search']"
        );
        await searchTemplateBox.waitForDisplayed({ timeout: 30000 });
        await searchTemplateBox.clearValue();
        await searchTemplateBox.setValue("AT_ASINT_11");
        console.log("Clicking Search...");
        const searchIcon = await $(
            "//div[@role='dialog']//input[@aria-label='Search']/parent::form/div[contains(@id,'search')]"
        );
        await searchIcon.waitForClickable({ timeout: 30000 });
        await searchIcon.click();
        console.log("Selecting first matching template...");
        const firstTemplate = await $(
            "//div[@role='dialog']//div[@role='radio']"
        );
        await utils.clickWithWait(firstTemplate);
        console.log("✓ Template selected");
        console.log("Clicking Assign button...");
        const assignButton = await $(
            "//div[@role='dialog']//bdi[normalize-space()='Assign']"
        );
        await utils.clickWithWait(assignButton);
        console.log("Waiting for template assignment to complete...");
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Verifying success message...");
        const assignedSuccessDialog = await $(
            "//div[@role='alertdialog']//span[text()='Template Assigned successfully.']"
        );
        await assignedSuccessDialog.waitForDisplayed({ timeout: 30000 });
        console.log("✓ Template assigned successfully");
        console.log("Closing success dialog...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        console.log("========== Template Assignment Completed Successfully ==========");
        await browser.pause(5000);
    }

    async removeTemplate(): Promise<void> {
        console.log("========== START : removeTemplate() ==========");
        console.log("[STEP 1] Locating Technical Object checkbox...");
        const technicalObjectcheckbox = await $("//a[text()='10000099']/ancestor::tr//div[@role='checkbox']");
        console.log("[STEP 2] Waiting for checkbox...");
        await technicalObjectcheckbox.waitForClickable({ timeout: 50000 });
        console.log("[STEP 3] Clicking checkbox...");
        await technicalObjectcheckbox.click();
        console.log("✓ Technical Object selected.");
        console.log("[STEP 4] Locating Remove button...");
        const removeTechnicalObjectBtn = await $("//div[@role='toolbar']//bdi[text()='Remove']");
        console.log("[STEP 5] Waiting for Remove button...");
        await removeTechnicalObjectBtn.waitForClickable({ timeout: 50000 });
        console.log("[STEP 6] Clicking Remove button...");
        await removeTechnicalObjectBtn.click();
        console.log("✓ Remove button clicked.");
        console.log("[STEP 7] Locating Yes button...");
        const removeTemplateConfirmBtn = await $("//div[@role='alertdialog']//bdi[text()='Yes']");
        console.log("[STEP 8] Waiting for Yes button...");
        await removeTemplateConfirmBtn.waitForClickable({ timeout: 50000 });
        console.log("[STEP 9] Clicking Yes button...");
        await removeTemplateConfirmBtn.click();
        console.log("✓ Removal confirmed.");
        console.log("[STEP 10] Waiting for Busy Indicator...");
        await utils.waitForBusyIndicatorToDisappear();
        console.log("✓ Busy Indicator disappeared.");
        console.log("[STEP 11] Waiting for success dialog...");
        const assignedSuccessDialog = await $("//div[@role='alertdialog']//span[text()='Technical Object Removed successfully']");
        await assignedSuccessDialog.waitForDisplayed({ timeout: 30000 });
        console.log("✓ Success dialog displayed.");
        console.log("[STEP 12] Closing success dialog...");
        await utils.clickSuccessOkButton();
        console.log("✓ Success dialog closed.");
        console.log("[STEP 13] Waiting for Busy Indicator...");
        await utils.waitForBusyIndicatorToDisappear();
        console.log("✓ Busy Indicator disappeared.");
        console.log("[STEP 14] Waiting 5 seconds...");
        await browser.pause(5000);
        console.log("========== END : removeTemplate() ==========");
    }

    async assignEquipmentAgainForNumericRisk() {
        await console.log("Assigning equipment:");
        await utils.switchToIframe(this.rncaIframe);
        const assignBtn = await $(`//div[.//span[normalize-space()='Assignments']]//button[.//bdi[normalize-space()='Assign']]`);
        await assignBtn.waitForClickable({ timeout: 50000 });
        await assignBtn.click();
        const equipmentDropdown = await $("//*[normalize-space()='Equipment']");
        await equipmentDropdown.waitForClickable({ timeout: 50000 });
        await equipmentDropdown.click();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(3000);
        const equipmentSearchBox = await $("//div[@role='dialog']//input[@aria-label='Search']");
        await equipmentSearchBox.waitForDisplayed({ timeout: 30000 });
        await equipmentSearchBox.clearValue();
        await equipmentSearchBox.setValue("10000099");
        const searchIcon = await $("//div[@role='dialog']//input[@aria-label='Search']/parent::form/div[contains(@id,'search')]");
        await searchIcon.click();
        await utils.waitForBusyIndicatorToDisappear();
        await utils.clickWithWait($("//div[@role='dialog']//tbody//tr[1]//div[@role='checkbox']"));
        await utils.clickWithWait($(`//bdi[text()='Confirm']`));
        await utils.waitForBusyIndicatorToDisappear();
        const assignedSuccessDialog = await $("//div[@role='alertdialog']//span[text()='Technical Object Assigned successfully.']");
        await assignedSuccessDialog.waitForDisplayed({ timeout: 30000 });
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        await browser.pause(5000);
        await utils.clickWithWait($("//a[text()='10000099']/ancestor::tr//div[@role='checkbox']"));
        const manageTemplateBtn = await $(`//button[.//bdi[normalize-space()='Manage Template'] or .//span[normalize-space()='Manage Template']]`);
        await manageTemplateBtn.waitForClickable({ timeout: 50000 });
        await manageTemplateBtn.click();
        const manageTemplateAssignOption = await $(`//div[text()='Assign']`);
        await utils.clickWithWait(manageTemplateAssignOption);

    }

    async assignTemplateByNumericRisk() {
        console.log("========== Assign Template by Risk Score Type ==========");
        console.log(`Risk Score Type : AlphaNumeric`);
        await utils.switchToIframe(this.rncaIframe);
        console.log("✓ Switched to RNCA iframe");
        console.log("Opening Risk Score Type dropdown...");
        const riskScoreTypeDropdown = await $(
            "//div[@role='dialog']//bdi[text()='Risk Score Type']/following::div[1]//span"
        );
        await riskScoreTypeDropdown.waitForClickable({ timeout: 30000 });
        await riskScoreTypeDropdown.click();
        console.log(`Selecting Risk Score Type: AlphaNumeric`);
        const scoreTypeOptionNumeric = await $("//div[@role='dialog'][2]//span[text()='Numeric']");
        await scoreTypeOptionNumeric.waitForClickable({ timeout: 30000 });
        await scoreTypeOptionNumeric.click();
        const searchTemplateBox = await $(
            "//div[@role='dialog']//input[@aria-label='Search']"
        );
        await searchTemplateBox.waitForDisplayed({ timeout: 30000 });
        await searchTemplateBox.clearValue();
        await searchTemplateBox.setValue("AT_ASINT_35");
        console.log("Clicking Search...");
        const searchIcon = await $(
            "//div[@role='dialog']//input[@aria-label='Search']/parent::form/div[contains(@id,'search')]"
        );
        await searchIcon.waitForClickable({ timeout: 30000 });
        await searchIcon.click();
        console.log("Selecting first matching template...");
        const firstTemplate = await $(
            "//div[@role='dialog']//div[@role='radio']"
        );
        await utils.clickWithWait(firstTemplate);
        console.log("✓ Template selected");
        console.log("Clicking Assign button...");
        const assignButton = await $(
            "//div[@role='dialog']//bdi[normalize-space()='Assign']"
        );
        await utils.clickWithWait(assignButton);
        console.log("Waiting for template assignment to complete...");
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Verifying success message...");
        const assignedSuccessDialog = await $(
            "//div[@role='alertdialog']//span[text()='Template Assigned successfully.']"
        );
        await assignedSuccessDialog.waitForDisplayed({ timeout: 30000 });
        console.log("✓ Template assigned successfully");
        console.log("Closing success dialog...");
        await utils.clickSuccessOkButton();
        await utils.waitForBusyIndicatorToDisappear();
        console.log("========== Template Assignment Completed Successfully ==========");
        await browser.pause(5000);
    }

    async enterTextInTextAreaRange(start: number, end: number): Promise<void> {
        const textValue = "Testing via automation";
        for (let i = start; i <= end; i++) {
            const textArea = await $(`(//textarea)[${i}]`);
            await textArea.waitForDisplayed({ timeout: 10000 });
            await browser.execute(
                (el: any) => el.scrollIntoView({ block: 'center' }),
                textArea
            );
            await textArea.click();
            await textArea.clearValue();
            await textArea.setValue(textValue);
            console.log(`Entered text in textarea ${i}`);
        }
    }

    async assignAndCalculateAssessment() {
        console.log("Calculating risk on assessment");
        await utils.switchToIframe(this.rncaIframe);
        await utils.clickWithWait($("//bdi[normalize-space()='Assessment']"));
        await utils.clickWithWait($("(//li[@role='listitem']//div[@role='checkbox'])[1]"));
        // const updateMDABtn = await $("//bdi[text()='Update MDA']");
        // await updateMDABtn.waitForClickable({ timeout: 50000 });
        // await updateMDABtn.click();
        await utils.waitForBusyIndicatorToDisappear();
        const expandConsequenceBtn = await $(
            "//div[contains(@class,'sapMPanelWrappingDivTb')][.//span[text()='Consequences of failures : Operation']]//button[@title='Expand/Collapse']"
        );
        await expandConsequenceBtn.waitForClickable({ timeout: 50000 });
        await expandConsequenceBtn.click();
        await this.enterTextInTextAreaRange(1, 7);
        await utils.clickWithWait($("//tr[.//span[contains(normalize-space(.),'81% to 100')]]//td[2]"));
        await utils.clickWithWait($("(//span[contains(normalize-space(.),'Serious injury')])[1]/ancestor::tr//div[@role='radio']"));
        await utils.clickWithWait($("(//span[contains(normalize-space(.),'Complete Plant shutdown')])[1]/ancestor::tr//div[@role='radio']"));
        await utils.clickWithWait($("(//span[contains(normalize-space(.),'Compliance Issue')])[1]/ancestor::tr//div[@role='radio']"));
        await utils.clickWithWait($("(//span[contains(normalize-space(.),'Other Location/Plant')])[1]/ancestor::tr//div[@role='radio']"));
        await utils.clickWithWait($("(//span[contains(normalize-space(.),'Recoverable impact on quality')])[1]/ancestor::tr//div[@role='radio']"));
        await utils.clickWithWait($("(//span[contains(normalize-space(.),'Acceptable Delivery Delays')])[1]/ancestor::tr//div[@role='radio']"));
        const expandProbabilityFailureBtn = await $(
            "//div[contains(@class,'sapMPanelWrappingDivTb')][.//span[text()='Probability of Failure : Operation']]//button[@title='Expand/Collapse']"
        );
        await expandProbabilityFailureBtn.waitForClickable({ timeout: 50000 });
        await expandProbabilityFailureBtn.click();
        await this.enterTextInTextAreaRange(8, 10);
        await utils.clickWithWait($("(//span[contains(normalize-space(.),'Daily')])[1]/ancestor::tr//div[@role='radio']"));
        await utils.clickWithWait($("(//span[contains(normalize-space(.),'> 24 Hours upto 72 Hours')])[1]/ancestor::tr//div[@role='radio']"));
        await utils.clickWithWait($("(//span[contains(normalize-space(.),'1e-12')])[1]/ancestor::tr//div[@role='radio']"));
        console.log("Assessment calculation data entered successfully");
        await utils.clickWithWait($("//div[@role='toolbar']//bdi[text()='Save']"));
        await utils.waitForBusyIndicatorToDisappear();
        console.log("Assessment calculation saved successfully");
        await utils.clickWithWait($("//div[@role='alertdialog']//bdi[text()='OK']"));
        await utils.waitForBusyIndicatorToDisappear();
    }

}
export default new RNCADetailPage();
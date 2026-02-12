import { expect } from '@wdio/globals';

export async function handleFailedUserRolesPopup() {
    const errorMessage = await $('//Text[contains(@Name,"Failed to fetch user roles")]');
    const okBtn = await $('//Button[@Name="OK"]');

    const isErrorVisible = await errorMessage
        .waitForExist({ timeout: 1000 })
        .catch(() => false);

    if (isErrorVisible) {
        console.log('Failed to fetch user roles popup detected');
        
        if (await okBtn.waitForExist({ timeout: 1000 }).catch(() => false)) {
            await okBtn.click();
            console.log('Error popup dismissed');
        } else {
            console.log('OK button not found');
        }
    } else {
        console.log('No error popup detected');
    }
}
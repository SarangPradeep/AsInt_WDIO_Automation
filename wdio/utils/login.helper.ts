import functionalLocationListView from '../PageObjectModel/BTP_Applications_Page/Functional Location/functionalLocation.listview.page';

export async function loginToSAP(): Promise<void> {

    const USERNAME = process.env.SAP_USERNAME!;
    const PASSWORD = process.env.SAP_PASSWORD!;
    const APP_URL = process.env.APP_URL!;

    await browser.url(APP_URL);

    await functionalLocationListView.clickAsIntLoginLink();

    const emailInput = await $('#j_username');
    await emailInput.waitForDisplayed({ timeout: 15000 });
    await emailInput.setValue(USERNAME);

    const continueButton = await $('#logOnFormSubmit');
    await continueButton.click();

    const passwordInput = await $('#j_password');
    await passwordInput.waitForDisplayed({ timeout: 15000 });
    await passwordInput.setValue(PASSWORD);

    await continueButton.click();

    await browser.pause(8000);

    await functionalLocationListView.waitForSAPPopupAndClose(30);
    await functionalLocationListView.waitForBusyIndicatorToDisappear(90);
}
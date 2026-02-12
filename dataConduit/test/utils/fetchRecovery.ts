export async function recoverFromFetchErrorInExcelAddin(): Promise<boolean> {
    const fetchError = await $('//*[contains(@Name,"Fetch") or contains(@Name,"fetch")]');

    const isFetchError = await fetchError.waitForExist({ timeout: 5000 }).catch(() => false);

    if (!isFetchError) {
        return false;
    }

    console.log('Fetch error detected → reloading task pane');

    // Switch to native (detach webview)
    await browser.switchContext('NATIVE_APP');
    await browser.pause(1000);

    // Switch back to WEBVIEW (forces reload)
    const contexts = await browser.getContexts();
    const webview = contexts.find(c => c.toString().includes('WEBVIEW'));

    if (webview) {
        await browser.switchContext(webview);
        console.log('Task pane reloaded via context switch');
    }

    await browser.pause(8000);
    return true;
}

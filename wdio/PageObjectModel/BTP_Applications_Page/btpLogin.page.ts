import { browser, $ } from '@wdio/globals';

class BtpLoginPage {

    /* =========================
       SELECTORS
    ========================== */

    private get asIntLoginLink() { return $('a.saml-login-link'); }
    private get usernameInput() { return $('#j_username'); }
    private get passwordInput() { return $('#j_password'); }
    private get continueButton() { return $('#logOnFormSubmit'); }
    private get homeTile() { return $('//a[contains(@aria-label,"Asset Inspection")]'); }
    private get loginError() { return $('//div[contains(@class,"sapMMessage")]'); }


    //  ACTIONS

    async open(appUrl: string): Promise<void> {
        await browser.url(appUrl);
    }

    async login(username: string, password: string): Promise<void> {
        // Step 0: AsInt Log-On
        await this.asIntLoginLink.waitForClickable({ timeout: 30000 });
        await this.asIntLoginLink.click();

        // Step 1: Username
        await this.usernameInput.waitForDisplayed({ timeout: 15000 });
        await this.usernameInput.setValue(username);
        await this.continueButton.click();

        // Step 2: Password
        await this.passwordInput.waitForDisplayed({ timeout: 15000 });
        await this.passwordInput.setValue(password);
        await this.continueButton.click();
    }

    //   VERIFICATIONS

    async isLoginSuccessful(): Promise<boolean> {
        try {
            await this.homeTile.waitForDisplayed({ timeout: 30000 });
            return true;
        } catch {
            return false;
        }
    }

    async isLoginFailed(): Promise<boolean> {
        try {
            if (await this.loginError.isDisplayed()) {
                return true;
            }
            await this.homeTile.waitForDisplayed({ timeout: 10000 });
            return false;
        } catch {
            return true;
        }
    }
}

export default new BtpLoginPage();

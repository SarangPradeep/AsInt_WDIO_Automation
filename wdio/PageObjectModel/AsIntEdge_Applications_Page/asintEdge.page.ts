
class AsIntEdgeLoginPage {
    // ==================== Selectors ====================
    
    private readonly baseUrl = 'https://asint-dwc-login-42086456950.us-central1.run.app/';

    // Logo and Welcome text
    private readonly logoSelector = 'img.logo[alt="AsInt logo"]';
    private readonly welcomeTextSelector = 'h2.welcome-text';
    private readonly dashboardWelcomeTextSelector = 'h3.welcome-text-launchpad';
    // Email and Password inputs
    private readonly emailInputSelector = 'input[placeholder="Enter your email"]';
    private readonly passwordInputSelector = 'input[placeholder="Enter your password"]';
    
    // Password visibility toggle
    private readonly passwordToggleSelector = 'svg.fa-eye';
    
    // Remember me checkbox
    private readonly rememberMeCheckboxSelector = '#autoSizingCheck2';
    
    // Sign in buttons
    private readonly signInButtonSelector = 'button.btn.btn-primary:not(:disabled)';
    private readonly microsoftSignInButtonSelector = 'button.btn.btn-outline-primary';
    
    // Error message selectors
    //private readonly errorMessageSelector = '[class*="error"], [class*="alert"], [class*="invalid"]';
    
    
    
    async navigateToLoginPage(): Promise<void> {
        await browser.navigateTo(this.baseUrl);
    }
    
    async resetAuthState() {
        // Clear cookies
        await browser.deleteAllCookies();

        // Clear local & session storage
        await browser.execute(() => {
            window.localStorage.clear();
            window.sessionStorage.clear();
        });
    }

    
    /** Wait for login page to be ready (use instead of fixed pause after navigate). */
    async waitForLoginPageLoaded(timeoutMs: number = 10000): Promise<void> {
        const logoElement = await $(this.logoSelector);
        await logoElement.waitForDisplayed({ timeout: timeoutMs });
        const welcomeText = await $(this.welcomeTextSelector);
        await welcomeText.waitForDisplayed({ timeout: timeoutMs });
    }

    /** Wait for redirect back to login page (e.g. after sign out). */
    async waitForLoginPageAfterRedirect(timeoutMs: number = 10000): Promise<void> {
        await browser.waitUntil(
            async () => await this.verifyLoginPageLoaded(),
            { timeout: timeoutMs, timeoutMsg: 'Did not redirect to login page' }
        );
    }

    // Verify that the login page is loaded correctly
    async verifyLoginPageLoaded(): Promise<boolean> {
        try {
            const logoElement = await $(this.logoSelector);
            const welcomeText = await $(this.welcomeTextSelector);
            
            const isLogoDisplayed = await logoElement.isDisplayed();
            const isWelcomeTextDisplayed = await welcomeText.isDisplayed();
            
            return isLogoDisplayed && isWelcomeTextDisplayed;
        } catch (error) {
            console.error('Error verifying login page:', error);
            return false;
        }
    }
    
    
    // Enter email address in the email input field
    async enterEmail(email: string): Promise<void> {
        const emailInput = await $(this.emailInputSelector);
        await emailInput.click();
        await emailInput.clearValue();
        await emailInput.addValue(email);
    }
    

    // Enter password in the password input field
    
    async enterPassword(password: string): Promise<void> {
        const passwordInput = await $(this.passwordInputSelector);
        await passwordInput.click();
        await passwordInput.clearValue();
        await passwordInput.addValue(password);
    }
    
    // Toggle password visibility
    
    async togglePasswordVisibility(): Promise<void> {
        const passwordToggle = await $(this.passwordToggleSelector);
        await passwordToggle.click();
    }
    
    // Check/Uncheck the "Remember me" checkbox
    async setRememberMe(check: boolean): Promise<void> {
        try {
            const rememberMeCheckbox = await $(this.rememberMeCheckboxSelector);
            const isChecked = await rememberMeCheckbox.isSelected();
            
            if (check && !isChecked) {
                await rememberMeCheckbox.click();
            } else if (!check && isChecked) {
                await rememberMeCheckbox.click();
            }
        } catch (error) {
            console.warn('Remember me checkbox not found or not interactable');
        }
    }
    
    // Click the Sign In button
    async clickSignInButton(): Promise<void> {
        try {
            const signInButton = await $(this.signInButtonSelector);
            // Wait for button to be clickable
            await signInButton.waitForClickable({ timeout: 5000 });
            // Scroll to button if needed
            await signInButton.scrollIntoView();
            // Click the button
            await signInButton.click();
        } catch (error) {
            console.error('Error clicking sign in button:', error);
            // Try alternative approach - JavaScript click
            try {
                await browser.execute((selector) => {
                    const button = document.querySelector(selector) as HTMLButtonElement;
                    if (button) {
                        button.click();
                    }
                }, this.signInButtonSelector);
            } catch (jsClickError) {
                console.error('JavaScript click also failed:', jsClickError);
                throw new Error(`Failed to click Sign In button. Original error: ${error}`);
            }
        }
    }
    
    // Click the Sign In with Microsoft button
    async clickMicrosoftSignInButton(): Promise<void> {
        const microsoftButton = await $(this.microsoftSignInButtonSelector);
        await microsoftButton.click();
    }
    
    // Perform complete login flow
    async login(email: string, password: string, rememberMe: boolean = false): Promise<void> {
        await this.navigateToLoginPage();
        const emailInput = await $(this.emailInputSelector);
        await emailInput.waitForDisplayed({ timeout: 10000 });
        
        await this.enterEmail(email);
        // await browser.pause(500);
        
        await this.enterPassword(password);
        // await browser.pause(500);
        
        if (rememberMe) {
            await this.setRememberMe(true);
        }
        
        // Wait a bit more to ensure form is ready
        // await browser.pause(500);
        
        await this.clickSignInButton();
    }
    
    // Verify successful login by checking the launchpad welcome message
    async verifySuccessfulLogin(): Promise<boolean> {
        try {
            const launchpadWelcome = await $(this.dashboardWelcomeTextSelector);
            await launchpadWelcome.waitForDisplayed({ timeout: 15000 });
            const text = await launchpadWelcome.getText();
            console.log(launchpadWelcome);
            console.log(text);
            
            return text.includes('Welcome') && text.includes('what would you like to do today?');
        } catch (error) {
            console.error('Error verifying successful login:', error);
            return false;
        }
    }
    
    // Verify if email input is visible
    async isEmailInputVisible(): Promise<boolean> {
        const emailInput = await $(this.emailInputSelector);
        return await emailInput.isDisplayed();
    }
    
    //  Verify if password input is visible
    async isPasswordInputVisible(): Promise<boolean> {
        const passwordInput = await $(this.passwordInputSelector);
        return await passwordInput.isDisplayed();
    }
    
    
    /** Wait for login error message to appear (use after submitting invalid credentials). */
    async waitForErrorMessageDisplayed(timeoutMs: number = 4000): Promise<void> {
        await browser.waitUntil(
            async () => await this.isErrorMessageDisplayed(),
            {
                timeout: timeoutMs,
                interval: 200,
                timeoutMsg: 'Error message did not appear'
            }
        );
    }

    // Check if any error message is displayed on the page
    async isErrorMessageDisplayed(): Promise<boolean> {
        try {
            // Check for common error message patterns
            const errorSelectors = [
                '//*[contains(normalize-space(.),"Firebase: Error (auth/invalid-credential)")]',
                '//*[contains(normalize-space(.),"Invalid credentials")]',
                '//*[contains(normalize-space(.),"Email or password is incorrect")]',
                '//*[contains(normalize-space(.),"Invalid email or password")]',
                '//*[contains(normalize-space(.),"Login failed")]',
                '[role="alert"]',
                '.error-message',
                '.alert-danger',
                '[class*="error"]'
            ];
            
            for (const selector of errorSelectors) {
                try {
                    const element = await $(selector);
                    const isDisplayed = await element.isDisplayed().catch(() => false);
                    if (isDisplayed) {
                        return true;
                    }
                } catch (e) {
                    // Selector not found, continue to next one
                }
            }
            return false;
        } catch (error) {
            console.error('Error checking error message:', error);
            return false;
        }
    }
    
    // Get error message text from the page
    async getErrorMessage(): Promise<string> {
        try {
            // Try multiple selectors to find error message
            const errorSelectors = [
                '//*[contains(normalize-space(.),"Firebase: Error (auth/invalid-credential)")]',
                '//*[contains(normalize-space(.),"Invalid credentials")]',
                '//*[contains(normalize-space(.),"Email or password is incorrect")]',
                '//*[contains(normalize-space(.),"Invalid email or password")]',
                '.error-message',
                '.alert-danger',
                '[role="alert"]'
            ];
            
            for (const selector of errorSelectors) {
                try {
                    const element = await $(selector);
                    const isDisplayed = await element.isDisplayed().catch(() => false);
                    if (isDisplayed) {
                        return await element.getText();
                    }
                } catch (e) {
                    // Selector not found, continue to next one
                }
            }
            
            // Fallback: try generic error message selector
            try {
                const errorElement = await $('[class*="error"]');
                return await errorElement.getText();
            } catch (e) {
                return '';
            }
        } catch (error) {
            console.error('Error getting error message:', error);
            return '';
        }
    }
    
    // Clear all form fields (email and password)
    async clearFormFields(): Promise<void> {
        try {
            const emailInput = await $(this.emailInputSelector);
            const passwordInput = await $(this.passwordInputSelector);
            
            await emailInput.clearValue();
            await passwordInput.clearValue();
        } catch (error) {
            console.warn('Error clearing form fields:', error);
        }
    }
    
    // Get the current value of email input field
    async getEmailValue(): Promise<string> {
        try {
            const emailInput = await $(this.emailInputSelector);
            return await emailInput.getValue();
        } catch (error) {
            console.error('Error getting email value:', error);
            return '';
        }
    }
    
    // Get the current value of password input field
    async getPasswordValue(): Promise<string> {
        try {
            const passwordInput = await $(this.passwordInputSelector);
            return await passwordInput.getValue();
        } catch (error) {
            console.error('Error getting password value:', error);
            return '';
        }
    }
    
    
    // Verify if the login button is enabled
    async isSignInButtonEnabled(): Promise<boolean> {
        try {
            const signInButton = await $(this.signInButtonSelector);
            return !(await signInButton.isEnabled().then(enabled => !enabled));
        } catch (error) {
            console.error('Error checking if sign in button is enabled:', error);
            return false;
        }
    }
}

export default new AsIntEdgeLoginPage();

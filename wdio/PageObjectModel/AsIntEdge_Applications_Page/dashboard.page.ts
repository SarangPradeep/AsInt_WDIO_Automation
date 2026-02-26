
class AsIntEdgeDashboardPage {
    

    private readonly baseUrl = 'https://asint-dwc-login-42086456950.us-central1.run.app/launchpad';

    private readonly launchpadWelcomeTextSelector = 'h3.welcome-text-launchpad';
    
    readonly profileButtonSelector = 'i.fa-user-circle.navbar-avatar-icon';
    readonly dropdownMenuSelector = 'div.navbar-dropdown-menu';
    private readonly userNameInDropdownSelector = 'div.dropdown-item.user-name';
    private readonly signOutButtonSelector = '//i[@title="User Menu"]';
    private readonly signOutButton = '//div[text()=" Sign Out "]';
    

    // Dashboard applications selectors
    private readonly administratorAppSelector = 'div.admin-app';
    private readonly managerAppSelector = 'div.mgr-app';
    

    async navigateToDashboardPage(): Promise<void> {
        await browser.navigateTo(this.baseUrl);
    }
    async waitForAdministratorApp() {
    const adminApp = await $(this.administratorAppSelector);
    await adminApp.waitForDisplayed({ timeout: 15000 });
    return true;
    }

    async waitForManagerApp() {
    const managerApp = await $(this.managerAppSelector);
    await managerApp.waitForDisplayed({ timeout: 15000 });
    return true;
    }

    async verifyDashboardLoaded(): Promise<boolean> {
        try {
            const welcomeText = await $(this.launchpadWelcomeTextSelector);
            return await welcomeText.isDisplayed();
        } catch (error) {
            console.error('Error verifying dashboard:', error);
            return false;
        }
    }
    
    async clickProfileButton(): Promise<void> {
        const profileButton = await $(this.profileButtonSelector);
        await profileButton.click();
    }
    
    async isDropdownMenuDisplayed(): Promise<boolean> {
        try {
            const dropdownMenu = await $(this.dropdownMenuSelector);
            return await dropdownMenu.isDisplayed();
        } catch (error) {
            console.warn('Dropdown menu not found:', error);
            return false;
        }
    }
    
    async getUserNameFromDropdown(): Promise<string> {
        try {
            const userNameElement = await $(this.userNameInDropdownSelector);
            return await userNameElement.getText();
        } catch (error) {
            console.error('Error getting username from dropdown:', error);
            return '';
        }
    }
    
    async clickSignOut(): Promise<void> {
        const signOutButton = await $(this.signOutButtonSelector);
        await signOutButton.click();
        const signOut = await $(this.signOutButton);
        await signOut.click();
    }
    
    // Verify if Administrator application is present on dashboard
    async isAdministratorAppPresent(): Promise<boolean> {
        try {
            const administratorApp = await $(this.administratorAppSelector);
            return await administratorApp.isDisplayed();
        } catch (error) {
            console.warn('Administrator app not found:', error);
            return false;
        }
    }
    async openAdministratorApplication(): Promise<void> {
        const administratorApp = await $(this.administratorAppSelector);
        await browser.pause(4000);
        await administratorApp.click();
    }
    
    async isOnAdministratorApplication(): Promise<boolean> {
        const url = await browser.getUrl();
        return url.includes('/AdminHome');
    }
    // Verify if Manager application is present on dashboard
    async isManagerAppPresent(): Promise<boolean> {
        try {
            const managerApp = await $(this.managerAppSelector);
            return await managerApp.isDisplayed();
        } catch (error) {
            console.warn('Manager app not found:', error);
            return false;
        }
    }
    
    // Verify if both Administrator and Manager applications are present
    async areBothAppsPresent(): Promise<boolean> {
        const isAdminPresent = await this.isAdministratorAppPresent();
        const isManagerPresent = await this.isManagerAppPresent();
        return isAdminPresent && isManagerPresent;
    }
}

export default new AsIntEdgeDashboardPage();

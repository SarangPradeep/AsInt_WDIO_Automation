import asintEdgeLoginPage from '@pages/AsIntEdge_Applications_Page/asintEdge.page';
import asintEdgeDashboardPage from '@pages/AsIntEdge_Applications_Page/dashboard.page';


describe('FUNCTIONAL TEST : Login and Logout Functional Tests', () => {
    
    const testEmail: string = process.env.ASINT_EDGE_TEST_EMAIL!;
    const testPassword: string = process.env.ASINT_EDGE_TEST_PASSWORD!;
    
    it('Should load the login page with all required elements', async () => {
        await asintEdgeLoginPage.navigateToLoginPage();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
        
        const isEmailInputVisible = await asintEdgeLoginPage.isEmailInputVisible();
        expect(isEmailInputVisible).toBe(true);
        
        const isPasswordInputVisible = await asintEdgeLoginPage.isPasswordInputVisible();
        expect(isPasswordInputVisible).toBe(true);
    });

    
    it('Should successfully login with valid credentials', async () => {        
        await asintEdgeLoginPage.login(testEmail, testPassword, false);
        const isLoginSuccessful = await asintEdgeLoginPage.verifySuccessfulLogin();
        expect(isLoginSuccessful).toBe(true);
    });

    it('Should display Administrator and Manager applications on dashboard', async () => {
        
        const isAdministratorAppPresent = await asintEdgeDashboardPage.isAdministratorAppPresent();
        expect(isAdministratorAppPresent).toBe(true);
        
        const isManagerAppPresent = await asintEdgeDashboardPage.isManagerAppPresent();
        expect(isManagerAppPresent).toBe(true);

    });

    it('Should successfully logout and redirect to login page', async () => {
        // Click sign out button
        await asintEdgeDashboardPage.clickSignOut();
        
        // Verify logout and redirect to login page
        await browser.pause(2000);
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
    });
});
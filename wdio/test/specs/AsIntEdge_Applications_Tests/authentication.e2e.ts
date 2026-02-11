import asintEdgeLoginPage from '../../../PageObjectModel/AsIntEdge_Applications_Page/asintEdge.page';
import asintEdgeDashboardPage from '../../../PageObjectModel/AsIntEdge_Applications_Page/dashboard.page';


describe('FUNCTIONAL TEST: AsInt Edge Application - Login and Logout Functional Tests', () => {
    
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

    
    // it('Should display user profile dropdown when clicking profile button', async () => {
       
    //     await asintEdgeDashboardPage.clickProfileButton();
    //     await browser.pause(1000);
        
     
    // });

    // it('Should display logged-in username in profile dropdown', async () => {
       
    //     const userName = await asintEdgeDashboardPage.getUserNameFromDropdown();
        
    //     // Verify username matches expected value
    //     expect(userName).toContain(expectedUserName);
    // });

    
    // it('Should successfully logout and redirect to login page', async () => {
    //     // Click sign out button
    //     await asintEdgeDashboardPage.clickSignOut();
        
    //     // Verify logout and redirect to login page
    //     await browser.pause(2000);
    //     const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
    //     expect(isLoginPageLoaded).toBe(true);
    // });

    
    // it('Should display both Administrator and Manager applications on dashboard', async () => {
    //     // Navigate to login page
    //     await asintEdgeLoginPage.navigateToLoginPage();
    //     await browser.pause(1500);
        
    //     // Perform login
    //     await asintEdgeLoginPage.login(testEmail, testPassword, false);
        
    //     // Wait for dashboard to fully load
    //     await browser.pause(4000);
        
    //     // Verify both applications are present
    //     const areAppPresent = await asintEdgeDashboardPage.areBothAppsPresent();
    //     expect(areAppPresent).toBe(true);
    // });
    
    it('Should display Administrator and Manager applications on dashboard', async () => {
        
        const isAdministratorAppPresent = await asintEdgeDashboardPage.isAdministratorAppPresent();
        expect(isAdministratorAppPresent).toBe(true);
        
        const isManagerAppPresent = await asintEdgeDashboardPage.isManagerAppPresent();
        expect(isManagerAppPresent).toBe(true);

    });

    
    it('Should fail login with invalid email and password', async () => {
        await asintEdgeDashboardPage.clickProfileButton();
        await asintEdgeDashboardPage.clickSignOut();
        await asintEdgeLoginPage.waitForLoginPageAfterRedirect();

        await asintEdgeLoginPage.navigateToLoginPage();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        await asintEdgeLoginPage.enterEmail('invalid@test.com');
        await asintEdgeLoginPage.enterPassword('invalidpassword123');
        await asintEdgeLoginPage.clickSignInButton();
        await asintEdgeLoginPage.waitForErrorMessageDisplayed();
        
        const isErrorDisplayed = await asintEdgeLoginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBe(true);
        // const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        // expect(isLoginPageLoaded).toBe(true);
    });
    
    it('Should fail login with correct email but wrong password', async () => {
        await asintEdgeLoginPage.enterEmail(testEmail);
        await asintEdgeLoginPage.enterPassword('WrongPassword123!');
        await asintEdgeLoginPage.clickSignInButton();
        await asintEdgeLoginPage.waitForErrorMessageDisplayed();
        
        const isErrorDisplayed = await asintEdgeLoginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBe(true);
        // const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        // expect(isLoginPageLoaded).toBe(true);
    });

    it('Should fail login with empty email field', async () => {
        await asintEdgeLoginPage.navigateToLoginPage();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        await asintEdgeLoginPage.clearFormFields();
        await asintEdgeLoginPage.enterPassword(testPassword);
        await asintEdgeLoginPage.clickSignInButton();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
        const emailValue = await asintEdgeLoginPage.getEmailValue();
        expect(emailValue).toBe('');
    });
    
    it('Should fail login with empty password field', async () => {
        await asintEdgeLoginPage.navigateToLoginPage();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        await asintEdgeLoginPage.clearFormFields();
        await asintEdgeLoginPage.enterEmail(testEmail);
        await asintEdgeLoginPage.clickSignInButton();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
        const passwordValue = await asintEdgeLoginPage.getPasswordValue();
        expect(passwordValue).toBe('');
    });
    
    it('Should fail login with both email and password fields empty', async () => {
        await asintEdgeLoginPage.navigateToLoginPage();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        await asintEdgeLoginPage.clearFormFields();
        await asintEdgeLoginPage.clickSignInButton();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
        const emailValue = await asintEdgeLoginPage.getEmailValue();
        const passwordValue = await asintEdgeLoginPage.getPasswordValue();
        expect(emailValue).toBe('');
        expect(passwordValue).toBe('');
    });
    
    it('Should fail login with invalid email format', async () => {
        await asintEdgeLoginPage.navigateToLoginPage();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        await asintEdgeLoginPage.enterEmail('notanemail');
        await asintEdgeLoginPage.enterPassword(testPassword);
        await asintEdgeLoginPage.clickSignInButton();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
    });
    
    it('Should fail login with special characters in email field', async () => {
        await asintEdgeLoginPage.navigateToLoginPage();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        await asintEdgeLoginPage.enterEmail('test@@@example.com');
        await asintEdgeLoginPage.enterPassword(testPassword);
        await asintEdgeLoginPage.clickSignInButton();
        await asintEdgeLoginPage.waitForErrorMessageDisplayed();
        
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
    });
    
    it('Should fail login with SQL injection attempt', async () => {
        await asintEdgeLoginPage.navigateToLoginPage();
        await asintEdgeLoginPage.waitForLoginPageLoaded();
        
        await asintEdgeLoginPage.enterEmail("' OR '1'='1");
        await asintEdgeLoginPage.enterPassword("' OR '1'='1");
        await asintEdgeLoginPage.clickSignInButton();
        await asintEdgeLoginPage.waitForErrorMessageDisplayed();
        
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
    });
});
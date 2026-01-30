import asintEdgeLoginPage from '../../../PageObjectModel/AsIntEdge_Applications_Page/asintEdge.page';
import asintEdgeDashboardPage from '../../../PageObjectModel/AsIntEdge_Applications_Page/dashboard.page';


describe('AsInt Edge Application - Login and Logout Functional Tests', () => {
    
    const testEmail = 'virendra.singh@asint.net';
    const testPassword = 'Kavi@1234';
    const expectedUserName = 'Virendrasingh Pawar';
    
    it('Should load the login page with all required elements', async () => {
        // Navigate to login page
        await asintEdgeLoginPage.navigateToLoginPage();
        await browser.pause(1500);
        
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
        
        const isEmailInputVisible = await asintEdgeLoginPage.isEmailInputVisible();
        expect(isEmailInputVisible).toBe(true);
        
        const isPasswordInputVisible = await asintEdgeLoginPage.isPasswordInputVisible();
        expect(isPasswordInputVisible).toBe(true);
    });

    
    it('Should successfully login with valid credentials', async () => {        
        // Perform login with valid credentials
        await asintEdgeLoginPage.login(testEmail, testPassword, false);
        
        // Wait for navigation to complete
        await browser.pause(2000);
        
        // Verify successful login
        const isLoginSuccessful = await asintEdgeLoginPage.verifySuccessfulLogin();
        expect(isLoginSuccessful).toBe(true);
    });

    
    it('Should display user profile dropdown when clicking profile button', async () => {
       
        await asintEdgeDashboardPage.clickProfileButton();
        await browser.pause(1000);
        
     
    });

    it('Should display logged-in username in profile dropdown', async () => {
       
        const userName = await asintEdgeDashboardPage.getUserNameFromDropdown();
        
        // Verify username matches expected value
        expect(userName).toContain(expectedUserName);
    });

    
    it('Should successfully logout and redirect to login page', async () => {
        // Click sign out button
        await asintEdgeDashboardPage.clickSignOut();
        
        // Verify logout and redirect to login page
        await browser.pause(2000);
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
    });

    
    it('Should display both Administrator and Manager applications on dashboard', async () => {
        // Navigate to login page
        await asintEdgeLoginPage.navigateToLoginPage();
        await browser.pause(1500);
        
        // Perform login
        await asintEdgeLoginPage.login(testEmail, testPassword, false);
        
        // Wait for dashboard to fully load
        await browser.pause(4000);
        
        // Verify both applications are present
        const areAppPresent = await asintEdgeDashboardPage.areBothAppsPresent();
        expect(areAppPresent).toBe(true);
    });
    
    it('Should display Administrator application on dashboard', async () => {
        const isAdministratorAppPresent = await asintEdgeDashboardPage.isAdministratorAppPresent();
        expect(isAdministratorAppPresent).toBe(true);
    });
    
    it('Should display Manager application on dashboard', async () => {
       
        // Verify Manager app is present
        const isManagerAppPresent = await asintEdgeDashboardPage.isManagerAppPresent();
        expect(isManagerAppPresent).toBe(true);


    });

    
    it('Should fail login with invalid email and password', async () => {


        // Click on profile button to open dropdown
        await asintEdgeDashboardPage.clickProfileButton();
        await browser.pause(1000);
        
        // Click sign out button
        await asintEdgeDashboardPage.clickSignOut();
        
        // Verify logout and redirect to login page
        await browser.pause(2000);
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);

        // Navigate to login page
        await asintEdgeLoginPage.navigateToLoginPage();
        await browser.pause(1500);
        
        // Enter invalid credentials
        await asintEdgeLoginPage.enterEmail('invalid@test.com');
        await browser.pause(300);
        await asintEdgeLoginPage.enterPassword('invalidpassword123');
        await browser.pause(300);
        
        // Click sign in button
        await asintEdgeLoginPage.clickSignInButton();
        
        // Wait for response
        // await browser.pause(3000);
        
        // Verify error message is displayed
        const isErrorDisplayed = await asintEdgeLoginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBe(true);
        
        // Verify user is still on login page (not redirected)
        expect(isLoginPageLoaded).toBe(true);
    });
    
    it('Should fail login with correct email but wrong password', async () => {
        // Enter correct email but wrong password
        await asintEdgeLoginPage.enterEmail(testEmail);
        await browser.pause(300);
        await asintEdgeLoginPage.enterPassword('WrongPassword123!');
        await browser.pause(300);
        
        // Click sign in button
        await asintEdgeLoginPage.clickSignInButton();
        
        // Wait for response
        //await browser.pause(3000);
        
        // Verify error message is displayed
        const isErrorDisplayed = await asintEdgeLoginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBe(true);
        
        // Verify user is still on login page
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
    });

    it('Should fail login with empty email field', async () => {
        // Navigate to login page
        await asintEdgeLoginPage.navigateToLoginPage();
        await browser.pause(1500);
        
        // Clear email field and enter only password
        await asintEdgeLoginPage.clearFormFields();
        await browser.pause(300);
        await asintEdgeLoginPage.enterPassword(testPassword);
        await browser.pause(300);
        
        // Click sign in button
        await asintEdgeLoginPage.clickSignInButton();
        
        // Wait for validation
        await browser.pause(2000);
        
        // Verify user is still on login page (validation should prevent submission)
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
        
        // Verify email field is empty
        const emailValue = await asintEdgeLoginPage.getEmailValue();
        expect(emailValue).toBe('');
    });
    
    it('Should fail login with empty password field', async () => {
        // Navigate to login page
        await asintEdgeLoginPage.navigateToLoginPage();
        await browser.pause(1500);
        
        // Clear password field and enter only email
        await asintEdgeLoginPage.clearFormFields();
        await browser.pause(300);
        await asintEdgeLoginPage.enterEmail(testEmail);
        await browser.pause(300);
        
        // Click sign in button
        await asintEdgeLoginPage.clickSignInButton();
        
        // Wait for validation
        await browser.pause(2000);
        
        // Verify user is still on login page
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
        
        // Verify password field is empty
        const passwordValue = await asintEdgeLoginPage.getPasswordValue();
        expect(passwordValue).toBe('');
    });
    
    it('Should fail login with both email and password fields empty', async () => {
        // Navigate to login page
        await asintEdgeLoginPage.navigateToLoginPage();
        await browser.pause(1500);
        
        // Clear all form fields
        await asintEdgeLoginPage.clearFormFields();
        await browser.pause(500);
        
        // Click sign in button with empty fields
        await asintEdgeLoginPage.clickSignInButton();
        
        // Wait for validation
        await browser.pause(2000);
        
        // Verify user is still on login page
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
        
        // Verify both fields are empty
        const emailValue = await asintEdgeLoginPage.getEmailValue();
        const passwordValue = await asintEdgeLoginPage.getPasswordValue();
        expect(emailValue).toBe('');
        expect(passwordValue).toBe('');
    });
    
    it('Should fail login with invalid email format', async () => {
        // Navigate to login page
        await asintEdgeLoginPage.navigateToLoginPage();
        await browser.pause(1500);
        
        // Enter invalid email format and valid password
        await asintEdgeLoginPage.enterEmail('notanemail');
        await browser.pause(300);
        await asintEdgeLoginPage.enterPassword(testPassword);
        await browser.pause(300);
        
        // Click sign in button
        await asintEdgeLoginPage.clickSignInButton();
        
        // Wait for validation/response
        await browser.pause(2000);
        
        // Verify user is still on login page
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
    });
    
    it('Should fail login with special characters in email field', async () => {
        // Navigate to login page
        await asintEdgeLoginPage.navigateToLoginPage();
        await browser.pause(1500);
        
        // Enter email with special characters
        await asintEdgeLoginPage.enterEmail('test@@@example.com');
        await browser.pause(300);
        await asintEdgeLoginPage.enterPassword(testPassword);
        await browser.pause(300);
        
        // Click sign in button
        await asintEdgeLoginPage.clickSignInButton();
        
        // Wait for response
        await browser.pause(3000);
        
        // Verify user is still on login page
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
    });
    
    it('Should fail login with SQL injection attempt', async () => {
        // Navigate to login page
        await asintEdgeLoginPage.navigateToLoginPage();
        await browser.pause(1500);
        
        // Enter SQL injection attempt
        await asintEdgeLoginPage.enterEmail("' OR '1'='1");
        await browser.pause(300);
        await asintEdgeLoginPage.enterPassword("' OR '1'='1");
        await browser.pause(300);
        
        // Click sign in button
        await asintEdgeLoginPage.clickSignInButton();
        
        // Wait for response
        await browser.pause(3000);
        
        // Verify user is still on login page (should reject injection)
        const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
        expect(isLoginPageLoaded).toBe(true);
    });
});
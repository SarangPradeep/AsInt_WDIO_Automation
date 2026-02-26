import asintEdgeLoginPage from '@pages/AsIntEdge_Applications_Page/asintEdge.page';
import asintEdgeDashboardPage from '@pages/AsIntEdge_Applications_Page/dashboard.page';

describe('NEGATIVE TEST : Login', () => {
    
    const testEmail: string = process.env.ASINT_EDGE_TEST_EMAIL!;
    const testPassword: string = process.env.ASINT_EDGE_TEST_PASSWORD!;
    
    it('Should load the login page', async () => {
            await asintEdgeLoginPage.navigateToLoginPage();
            await asintEdgeLoginPage.waitForLoginPageLoaded();
            const isLoginPageLoaded = await asintEdgeLoginPage.verifyLoginPageLoaded();
            expect(isLoginPageLoaded).toBe(true);
        });
   
    it('Should fail login with invalid email and password', async () => {
        await asintEdgeLoginPage.enterEmail('invalid@test.com');
        await asintEdgeLoginPage.enterPassword('invalidpassword123');
        await asintEdgeLoginPage.clickSignInButton();
        await asintEdgeLoginPage.waitForErrorMessageDisplayed();
        const isErrorDisplayed = await asintEdgeLoginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBe(true);
    });
    
    it('Should fail login with correct email but wrong password', async () => {
        await asintEdgeLoginPage.enterEmail(testEmail);
        await asintEdgeLoginPage.enterPassword('WrongPassword123!');
        await asintEdgeLoginPage.clickSignInButton();
        await asintEdgeLoginPage.waitForErrorMessageDisplayed();
        
        const isErrorDisplayed = await asintEdgeLoginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBe(true);
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
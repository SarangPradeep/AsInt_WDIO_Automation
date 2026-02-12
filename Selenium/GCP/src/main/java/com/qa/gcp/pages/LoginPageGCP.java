package com.qa.gcp.pages;

import java.time.Duration;
import java.util.Properties;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import com.qa.gcp.constants.Constants;
import com.qa.gcp.utils.ElementUtil;

public class LoginPageGCP {

	WebDriver driver;
	WebDriverWait wait;
	private ElementUtil eleUtil;

	// Locators
	private By emailField = By.xpath("//input[@placeholder='Enter your email']");
	private By passwordField = By.xpath("//input[@placeholder='Enter your password']");
	private By signin = By.xpath("//button[@type='submit']");
	private By errorMessage = By.xpath("//p[text()='Firebase: Error (auth/missing-password).']");
	private By logoutmenu = By.xpath("//i[@title='User Menu']");
	private By signout = By.xpath("//div[text()=' Sign Out ']");

	public LoginPageGCP(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		eleUtil = new ElementUtil(this.driver);
	}

	public void gcpLogin(String email, String pwd) {
		driver.navigate().refresh();
		eleUtil.waitForElementPresence(emailField, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys(email);
		eleUtil.waitForDuration(Duration.ofSeconds(2));
		eleUtil.waitForElementPresence(passwordField, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys(pwd);
		eleUtil.waitForDuration(Duration.ofSeconds(2));
		eleUtil.waitForElementPresence(signin, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(2));
		System.out.println("Logged in successfully");

	}

	public void gcpLogout() {
		eleUtil.waitForDuration(Duration.ofSeconds(2));
		eleUtil.waitForElementPresence(logoutmenu, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(2));
		eleUtil.waitForElementPresence(signout, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(2));
		System.out.println("Logged out successfully");

	}

	public void gcpNegativeLoginCheck(String email) {
		eleUtil.waitForElementPresence(emailField, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys(email);
		eleUtil.waitForDuration(Duration.ofSeconds(2));
		eleUtil.waitForElementPresence(signin, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(2));

	}

	public String gcpNegativeLoginMessage() {
		eleUtil.waitForDuration(Duration.ofSeconds(3));
		String errorMsg = eleUtil.waitForElementPresence(errorMessage, Constants.DEFAULT_ELEMENT_TIME_OUT).getText();
		System.out.println("Error Msg : " + errorMsg);
		return errorMsg;
	}

	public void launchbrowser(Properties prop) {
		driver.get(prop.getProperty("url").trim());
	}

}

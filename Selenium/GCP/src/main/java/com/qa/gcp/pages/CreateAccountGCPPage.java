package com.qa.gcp.pages;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import com.qa.gcp.constants.Constants;
import com.qa.gcp.utils.ElementUtil;

public class CreateAccountGCPPage {

	WebDriver driver;
	WebDriverWait wait;
	private ElementUtil eleUtil;

	// Locators
	private By firstname = By.xpath("//input[@placeholder='First Name' or @name='firstName']");
	private By lastname = By.xpath("//input[@placeholder='Last Name' or @name='lastName']");
	private By emailResgiter = By.xpath("//input[@type='email']");
	private By pass = By.xpath("//input[@placeholder='Password']");
	private By confirmpass = By.xpath("//input[@placeholder='Confirm Password']");
	private By registerBtn = By.xpath("//button[contains(text(),'Create') or contains(text(),'Register')]");
	private By successMessage = By.xpath("//span[@class='navbar-title']");
	private By accountcreation = By.xpath("//a[contains(text(),'Create account')]");
	private By busyIndicator = By.className("sapUiLocalBusyIndicator");

	public CreateAccountGCPPage(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		eleUtil = new ElementUtil(this.driver);
	}

	public List<String> createAccountGCP(String fname, String lname, String pwd, String cpass)
			throws InterruptedException {
		String randomEmail = eleUtil.getRandomEmail();
		System.out.println("Registering with generated email: " + randomEmail);

		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.DEFAULT_TIME_OUT);
		eleUtil.doClickWithJS(accountcreation);
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.DEFAULT_TIME_OUT);
		Thread.sleep(3000);
		eleUtil.waitForElementPresence(firstname, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys(fname);
		eleUtil.waitForElementPresence(lastname, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys(lname);
		eleUtil.waitForElementPresence(emailResgiter, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys(randomEmail);
		eleUtil.waitForElementPresence(pass, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys(pwd);
		eleUtil.waitForElementPresence(confirmpass, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys(cpass);
		eleUtil.waitForElementPresence(registerBtn, Constants.DEFAULT_ELEMENT_TIME_OUT).click();

		Thread.sleep(5000);

		String succTest = eleUtil.getElement(successMessage).getText();
		return Arrays.asList(succTest);
	}
}
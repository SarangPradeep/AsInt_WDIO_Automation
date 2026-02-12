package com.qa.gcp.pages;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.qa.gcp.constants.Constants;
import com.qa.gcp.utils.ElementUtil;

public class EquipmentCreationPage {

	WebDriver driver;
	WebDriverWait wait;
	private ElementUtil eleUtil;

	// Locators
	private By adminstrator = By.xpath("//p[text()='Administrator']/..");
	private By equipment = By.xpath("//span[text()='Equipment']/ancestor::div[5]");
	private By equipPlusIcon = By.xpath("//button[@title='Add']/span/span");
	private By equipmentName = By.xpath("//bdi[text()='Equipment Name']/following::input[@type='text'][1]");
	private By ownerusernamedrp = By
			.xpath("//bdi[text()='Owner/User Name']/following::span[@aria-hidden='true'][2]/following-sibling::span");
	private By ownerusername = By.xpath("//ul//li[@aria-posinset='1']");
	private By site = By.xpath("//bdi[text()='Site']/following::input[@type='text'][1]");
	private By category = By.xpath("//bdi[text()='Category']/following::input[@type='text'][1]");
	private By busyIndicator = By.className("sapUiLocalBusyIndicator");
	private By saveEquipment = By.xpath("//bdi[text()='Save']");
	private By equipDetPage = By.xpath("//span[text()='DETAILS']");
	private By equipmentDelete = By.xpath("//span[text()='Delete']/preceding-sibling::span//span");
	private By deleteOkButton = By
			.xpath("//span[text()='Are you sure you want to delete?']/following::button//bdi[text()='OK']");
	private By deleteSuccPopup = By.xpath("//span[text()='Equipment Deleted Successfully!']");
	private By deleteSuccBtn = By
			.xpath("//span[text()='Equipment Deleted Successfully!']/following::bdi[text()='OK'][1]");
	private By negEquipCheck = By
			.xpath("//section[.='Mandatory Field(s) are Missing!']/following-sibling::footer//bdi[text()='OK']");

	public EquipmentCreationPage(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		eleUtil = new ElementUtil(this.driver);
	}

	// Methods
	public void navigateToAdministrator() {
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		eleUtil.waitForElementPresence(adminstrator, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(5));
	}
	
	public void navigateToEquimentPage() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.DEFAULT_TIME_OUT);
		eleUtil.waitForElementPresence(equipment, Constants.DEFAULT_ELEMENT_TIME_OUT).click();

		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.DEFAULT_TIME_OUT);
		
	}

	public void equipmentCreation() {

		// ✅ Generate unique equipment name
		String uniqueEquipmentName = "EQ_" + System.currentTimeMillis();
		System.out.println("Creating Equipment: " + uniqueEquipmentName);
		eleUtil.waitForElementPresence(equipPlusIcon, Constants.DEFAULT_ELEMENT_TIME_OUT).click();

		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.DEFAULT_TIME_OUT);
		eleUtil.waitForElementPresence(equipmentName, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys(uniqueEquipmentName);
		eleUtil.waitForDuration(Duration.ofSeconds(3));
		eleUtil.waitForElementPresence(ownerusernamedrp, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(3));
		eleUtil.waitForElementPresence(ownerusername, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(3));
		eleUtil.waitForElementPresence(site, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys("site");
		eleUtil.waitForElementPresence(category, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys("Category");
		eleUtil.waitForElementPresence(saveEquipment, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.DEFAULT_TIME_OUT);
		eleUtil.waitForElementPresence(equipDetPage, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		System.out.println("Equipment created successfully: " + uniqueEquipmentName);
	}

	public String equipmentDeletion() {
		eleUtil.waitForElementPresence(equipmentDelete, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.DEFAULT_TIME_OUT);
		eleUtil.waitForElementPresence(deleteOkButton, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		String errorMessage = eleUtil.waitForElementPresence(deleteSuccPopup, Constants.DEFAULT_ELEMENT_TIME_OUT)
				.getText();
		eleUtil.waitForElementPresence(deleteSuccBtn, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		System.out.println(errorMessage);
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.DEFAULT_TIME_OUT);
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.DEFAULT_TIME_OUT);
		return errorMessage;
	}

	public void negativeEquipmentCheck() {
		eleUtil.waitForElementPresence(equipPlusIcon, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.DEFAULT_TIME_OUT);
		eleUtil.waitForElementPresence(equipmentName, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys("Test");
		eleUtil.waitForDuration(Duration.ofSeconds(3));
		eleUtil.waitForElementPresence(ownerusernamedrp, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(3));
		eleUtil.waitForElementPresence(ownerusername, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(3));
		eleUtil.waitForElementPresence(saveEquipment, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(2));
		eleUtil.waitForElementPresence(negEquipCheck, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		System.out.println("Equipment negative check done done successfully");

	}
}
package com.qa.flp.utils;

import java.time.Duration;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class WaitUtil {

	private WebDriver driver;
	private WebDriverWait wait;

	public WaitUtil(WebDriver driver, int timeoutInSeconds) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutInSeconds));
	}

	// Wait for element to be clickable
	public WebElement waitForElementToBeClickable(By locator) {
		return wait.until(ExpectedConditions.elementToBeClickable(locator));
	}

	// Wait for element to be visible
	public WebElement waitForElementToBeVisible(By locator) {
		return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
	}

	// Wait for element to be present in the DOM
	public WebElement waitForElementPresence(By locator) {
		return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
	}

	// Wait for SAP busy indicator to disappear
	public void waitForSAPBusyIndicatorToDisappear() {
		wait.until(driver -> {
			List<WebElement> busyIndicators = driver
					.findElements(By.cssSelector(".sapUiLocalBusyIndicator, .sapUiBusy"));
			for (WebElement busy : busyIndicators) {
				if (busy.isDisplayed()) {
					return false;
				}
			}
			return true;
		});
	}

	// Wait for frame and switch to it
	public void waitForFrameAndSwitchToIt(By frameLocator) {
		wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameLocator));
	}

	// Wait for element to disappear
	public void waitForElementToDisappear(By locator) {
		wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
	}

	// Wait for text to be present in element
	public void waitForTextInElement(By locator, String text) {
		wait.until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
	}

	// Wait for attribute value
	public void waitForAttributeValue(By locator, String attribute, String value) {
		wait.until(driver -> {
			WebElement element = driver.findElement(locator);
			String attrValue = element.getDomAttribute(attribute); // use getDomProperty() if needed
			return value.equals(attrValue);
		});
	}

	// Wait for SAP popup and close it
	public void waitForSAPPopupAndClose(By popUpCloseBtn, int timeOutInSeconds) {
		System.out.println("Starting popup detection for " + timeOutInSeconds + " seconds...");
		try {
			WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOutInSeconds));
			WebElement closeButton = wait.until(ExpectedConditions.elementToBeClickable(popUpCloseBtn));
			closeButton.click();
			System.out.println("SAP popup closed successfully");
		} catch (TimeoutException e) {
			System.out.println("No SAP popup appeared Continuing with tests.");
		}
	}

	// Wait for text in a WebElement to change from a specific value.
	public void waitForTextToChange(WebElement element, String oldText) {
		try {
			wait.until(driver -> {
				String currentText = element.getText();
				return !currentText.equals(oldText);
			});
		} catch (TimeoutException e) {
			System.out.println("Timeout: Text did not change for the element");
		}
	}

	// Get text after a conditional delay if unwanted text is present
	public String getTextAfterConditionalDelay(By locator, String unwantedText) {
		String currentText = driver.findElement(locator).getText();
		if (currentText.contains(unwantedText)) {
			try {
				Thread.sleep(1500);
			} catch (InterruptedException e) {
				Thread.currentThread().interrupt();
			}
			return driver.findElement(locator).getText();
		}
		return currentText;
	}
}
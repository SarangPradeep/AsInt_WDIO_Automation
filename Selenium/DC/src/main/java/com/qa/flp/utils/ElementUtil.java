package com.qa.flp.utils;

import java.io.File;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.HasCapabilities;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.qa.flp.constants.Constants;

public class ElementUtil {

	private WebDriver driver;
	private WaitUtil waitUtil;
	private JavaScriptUtil jsUtil;

	public ElementUtil(WebDriver driver) {
		this.driver = driver;
		this.waitUtil = new WaitUtil(driver, Constants.DEFAULT_ELEMENT_TIME_OUT);
		this.jsUtil = new JavaScriptUtil(this.driver);

	}

	public By getBy(String locatorType, String locatorValue) {
		By locator = null;
		switch (locatorType.toLowerCase()) {
		case "id":
			locator = By.id(locatorValue);
			break;
		case "name":
			locator = By.name(locatorValue);
			break;
		case "classname":
			locator = By.className(locatorValue);
			break;
		case "xpath":
			locator = By.xpath(locatorValue);
			break;
		case "css":
			locator = By.cssSelector(locatorValue);
			break;
		case "linktext":
			locator = By.linkText(locatorValue);
			break;
		case "partiallinktext":
			locator = By.partialLinkText(locatorValue);
			break;
		case "tagname":
			locator = By.tagName(locatorValue);
			break;

		default:
			break;
		}

		return locator;

	}

	public void waitForSeconds(int seconds) {
		try {
			Thread.sleep(seconds * 1000L);
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
			throw new RuntimeException("Interrupted while waiting for " + seconds + " seconds", e);
		}
	}

	public void waitForDuration(Duration duration) {
		new WebDriverWait(driver, duration).until(d -> {
			try {
				Thread.sleep(duration.toMillis());
			} catch (InterruptedException e) {
				Thread.currentThread().interrupt();
			}
			return true;
		});
	}

	public boolean doIsDisplayed(By locator) {
		return getElement(locator).isDisplayed();
	}

	public String getAttributeValue(By locator, String attrName) {
		return getElement(locator).getDomAttribute(attrName); // use getDomProperty() if needed
	}

	public boolean doIsEnabled(By locator) {
		return getElement(locator).isEnabled();
	}

	public String doGetText(By locator) {
		return getElement(locator).getText();
	}

	public String getText(By locator) {
		try {
			WebElement element = waitForElementPresence(locator, Constants.DEFAULT_ELEMENT_TIME_OUT);
			return element.getText().trim();
		} catch (Exception e) {
			System.out.println("❗[ElementUtil] Unable to fetch text for locator: " + locator + " | " + e.getMessage());
			return "";
		}
	}

	public void doClick(By locator) {
		getElement(locator).click();
	}

	public void doSendKeys(String locatorType, String locatorValue, String value) {
		getElement(getBy(locatorType, locatorValue)).sendKeys(value);
	}

	public void doSendKeys(By locator, String value) {
		WebElement ele = getElement(locator);
		ele.clear();
		ele.sendKeys(value);
	}

	public WebElement getElement(By locator) {
		return driver.findElement(locator);
	}

	public List<WebElement> getElements(By locator) {
		return driver.findElements(locator);
	}

	public int getElementCount(By locator) {
		return getElements(locator).size();
	}

	public List<String> getElementsAttributeList(By locator, String attrName) {
		List<WebElement> eleList = getElements(locator);
		List<String> eleAttrList = new ArrayList<String>();
		for (WebElement e : eleList) {
			String attrVal = e.getDomAttribute(attrName); // use getDomProperty() if needed
			eleAttrList.add(attrVal);
		}
		return eleAttrList;
	}

	/**
	 * Retrieves the visible text of all elements matching the given locator. This
	 * helps avoid pinpointing each element manually and prints all found texts.
	 *
	 * @param locator The By locator to find the elements.
	 * @return A list of non-null visible texts extracted from the located elements.
	 */

	// Updated method
	public List<String> getElementsTextList(By locator) {
		List<WebElement> eleList = waitForElementsVisible(locator, Constants.DEFAULT_ELEMENT_TIME_OUT);
		List<String> eleTextList = new ArrayList<>();

		if (eleList.isEmpty()) {
			System.out.print("No element(s) found");
			return eleTextList;
		}

		for (WebElement e : eleList) {
			String eleText = e.getText().trim(); // Trim to remove leading/trailing spaces
			System.out.print(eleText + "  ");
			if (!eleText.isEmpty()) {
				eleTextList.add(eleText);
			}
		}
		// Check if the final list is empty (no valid text found)
		if (eleTextList.isEmpty()) {
			System.out.print("No element(s) found");
		}
		return eleTextList;
	}

	public void selectSuggestion(By locator, String suggVal) throws InterruptedException {
		List<WebElement> suggList = driver.findElements(locator);
		for (WebElement e : suggList) {
			String text = e.getText();
			System.out.println(text);
			if (text.contains(suggVal)) {
				e.click();
				break;
			}
		}
	}

	public List<String> getSuggList(By locator, String searchKey) throws InterruptedException {
		List<WebElement> suggList = driver.findElements(locator);
		List<String> suggValList = new ArrayList<String>();
		for (WebElement e : suggList) {
			String text = e.getText();
			System.out.println(text);
			suggValList.add(text);
		}
		return suggValList;
	}

	public boolean isElementDisplayed(By locator) {
		WebElement ele = getElement(locator);
		List<WebElement> eleList = getElements(locator);
		if (eleList.size() > 0) {
			if (ele.isDisplayed())
				return true;
		}
		return false;
	}

	public boolean isElementDisplayedWithSize(By locator) {
		List<WebElement> eleList = getElements(locator);
		if (eleList.size() > 0) {
			return true;
		}
		return false;
	}

	public long getEpochSeconds() {
		return Instant.now().getEpochSecond();
	}

	// *********************************Drop Down
	// Utils*****************************//
	public void selectDropDownByIndex(By locator, int index) {
		Select select = new Select(getElement(locator));
		select.selectByIndex(index);
	}

	public void selectDropDownByVisible(By locator, String visibleText) {
		Select select = new Select(getElement(locator));
		select.selectByVisibleText(visibleText);
	}

	public void selectDropDownByValue(By locator, String value) {
		Select select = new Select(getElement(locator));
		select.selectByValue(value);
	}

	public int getDropDownValuesCount(By locator) {
		Select select = new Select(getElement(locator));
		return select.getOptions().size();
	}

	public void dropDownSelectValueWithGetOptions(By locator, String value) {
		Select select = new Select(getElement(locator));
		List<WebElement> optionsList = select.getOptions();

		for (WebElement e : optionsList) {
			String text = e.getText();
			System.out.println(text);
			if (text.equals(value)) {
				e.click();
				break;
			}
		}
	}

	public void dropDownValueUsingLocator(By locator, String value) {
		List<WebElement> list = getElements(locator);
		for (WebElement e : list) {
			String text = e.getText();
			if (text.equals(value)) {
				e.click();
				break;
			}
		}
	}

	// *******************************Actions Utils ********************/
	public void levelTwoMenuHandling(By parentMenu, By childMenu) throws InterruptedException {
		Actions act = new Actions(driver);
		act.moveToElement(getElement(parentMenu)).perform();
		Thread.sleep(1500);
		getElement(childMenu).click();
	}

	public void multiLevelMenuHandling(By parentMenu, String l1, String l2, String l3, String l4)
			throws InterruptedException {
		Actions act = new Actions(driver);
		act.moveToElement(getElement(parentMenu)).perform();
		Thread.sleep(1500);
		act.moveToElement(driver.findElement(By.linkText(l1))).perform();
		Thread.sleep(1500);
		act.moveToElement(driver.findElement(By.linkText(l2))).perform();
		Thread.sleep(1500);
		act.moveToElement(driver.findElement(By.linkText(l3))).perform();
		Thread.sleep(1500);
		getElement(By.linkText(l4)).click();
	}

	public void selectRightClickMenu(By rightClickElementLocator, By rightMenuItem) {
		Actions act = new Actions(driver);
		act.contextClick(getElement(rightClickElementLocator)).perform();
		getElement(rightMenuItem).click();
	}

	public List<String> getRightClickMenuList(By rightClickElementLocator, By rightMenuItems) {
		List<String> rightMenuList = new ArrayList<String>();
		Actions act = new Actions(driver);
		act.contextClick(getElement(rightClickElementLocator)).perform();
		List<WebElement> menuItems = driver.findElements(rightMenuItems);

		for (WebElement e : menuItems) {
			String text = e.getText();
			rightMenuList.add(text);
		}
		return rightMenuList;
	}

	public void dragAndDropAction(By source, By target) {
		Actions act = new Actions(driver);
		act.clickAndHold(getElement(source)).moveToElement(getElement(target)).release().build().perform();
	}

	public void doActionsSendKeys(By locator, String value) {
		Actions act = new Actions(driver);
		act.sendKeys(getElement(locator), value).perform();
	}

	public void doActionsClick(By locator) {
		Actions act = new Actions(driver);
		act.click(getElement(locator)).perform();
	}

	public void doActionsDoubleClick(WebElement element) {
		Actions actions = new Actions(driver);
		actions.doubleClick(element).perform();
	}

	// **********************************Wait Utils *************************//

	/**
	 * An expectation for checking that the title contains a case-sensitive
	 * substring
	 * 
	 * @param titleFraction
	 * @param timeOut
	 * @return
	 */
	public String waitForTitleContains(String titleFraction, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		if (wait.until(ExpectedConditions.titleContains(titleFraction))) {
			return driver.getTitle();
		}
		return null;
	}

	/**
	 * An expectation for checking the title of a page.
	 * 
	 * @param title
	 * @param timeOut
	 * @return
	 */
	public String waitForTitleIs(String title, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		if (wait.until(ExpectedConditions.titleIs(title))) {
			return driver.getTitle();
		}
		return null;
	}

	public String waitForUrlContains(String urlFraction, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		if (wait.until(ExpectedConditions.urlContains(urlFraction))) {
			return driver.getCurrentUrl();
		}
		return null;
	}

	public String waitForUrlIs(String url, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		if (wait.until(ExpectedConditions.urlToBe(url))) {
			return driver.getCurrentUrl();
		}
		return null;
	}

	public void acceptAlert(int timeOut) {
		waitForAlert(timeOut).accept();
	}

	public void dismissAlert(int timeOut) {
		waitForAlert(timeOut).dismiss();
	}

	public void alertSendKeys(int timeOut, String value) {
		waitForAlert(timeOut).sendKeys(value);
	}

	public String doGetAlertText(int timeOut) {
		return waitForAlert(timeOut).getText();
	}

	public Alert waitForAlert(int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		return wait.until(ExpectedConditions.alertIsPresent()); // wait for alert and then switch to alert

	}

	public void waitForFrameByLocator(By frameLocator, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameLocator));
	}

	public void waitForFrameByIndex(int frameIndex, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameIndex));
	}

	public void waitForFrameByElement(WebElement frameElement, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameElement));
	}

	public void clearAndSendKeys(By locator, String value, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		WebElement el = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
		el.clear();
		el.sendKeys(value);
	}

	public WebElement waitForElementPresence(By locator, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
	}

	public WebElement waitForElementPresenceWithPolling(By locator, int timeOut, int pollingTime) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut), Duration.ofMillis(pollingTime));
		return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
	}

	public String getTextValue(By locator) {
		try {
			WebElement ele = waitForElementPresenceWithPolling(locator, Constants.DEFAULT_ELEMENT_TIME_OUT,
					Constants.DEFAULT_POLLING_TIME_OUT);

			try {
				String txt = ele.getText();
				if (txt != null && !txt.trim().isEmpty()) {
					return txt.trim();
				}
			} catch (Exception ignoreGetText) {
			}

			try {
				java.util.List<String> texts = getElementsTextList(locator);
				if (texts != null && !texts.isEmpty()) {
					String joined = String.join(" ", texts).trim();
					if (!joined.isEmpty()) {
						return joined;
					}
				}
			} catch (Exception ignoreList) {
			}

			return "";

		} catch (Exception e) {
			try {
				WebElement element = driver.findElement(locator);
				JavascriptExecutor js = (JavascriptExecutor) driver;
				Object res = js.executeScript("return arguments[0].innerText;", element);
				return res != null ? res.toString().trim() : "";
			} catch (Exception jsErr) {
				// final fail-safe
				return "";
			}
		}
	}

	public String getTextValue(WebElement element) {
		try {
			String txt = element.getText();
			if (txt != null && !txt.trim().isEmpty()) {
				return txt.trim();
			}
		} catch (Exception ignore) {
		}

		// JS fallback
		try {
			JavascriptExecutor js = (JavascriptExecutor) driver;
			Object res = js.executeScript("return arguments[0].innerText;", element);
			return res != null ? res.toString().trim() : "";
		} catch (Exception ignore) {
		}

		return "";
	}

	public List<String> getTexts(By locator) {
		List<String> result = new ArrayList<>();
		List<WebElement> elems = getElements(locator); // you already have this
		for (WebElement e : elems) {
			result.add(getTextValue(e)); // uses getText() + JS fallback
		}
		return result;
	}

	public WebElement waitForElementVisible(By locator, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
	}

	public WebElement waitForElementVisibleWithPolling(By locator, int timeOut, int pollingTime) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
	}

	public List<WebElement> waitForElementsVisibleWithPolling(By locator, int timeOut, int pollingTime) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut), Duration.ofMillis(pollingTime));
		return wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(locator));
	}

	public void clickElementWhenReady(By locator, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
	}

	public boolean clickWhenReady(By locator, int timeoutSeconds) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
		By overlays = By.xpath(
				"//*[contains(@class,'overlay') or contains(@class,'sapUiOverlay') or contains(@class,'busy') or contains(@class,'spinner') or @aria-busy='true']");

		// best-effort headless detection
		boolean isHeadless = false;
		try {
			if (driver instanceof HasCapabilities) {
				Capabilities caps = ((HasCapabilities) driver).getCapabilities();
				Object headlessCap = caps.getCapability("headless");
				if (headlessCap instanceof Boolean)
					isHeadless = (Boolean) headlessCap;
				Object chromeOpts = caps.getCapability("goog:chromeOptions");
				if (!isHeadless && chromeOpts instanceof java.util.Map) {
					@SuppressWarnings("unchecked")
					java.util.Map<String, Object> opts = (java.util.Map<String, Object>) chromeOpts;
					Object args = opts.get("args");
					if (args instanceof java.util.List) {
						@SuppressWarnings("unchecked")
						java.util.List<String> argList = (java.util.List<String>) args;
						for (String a : argList)
							if (a != null && a.contains("headless")) {
								isHeadless = true;
								break;
							}
					}
				}
			}
		} catch (Exception ignored) {
		}

		// try to set large viewport when headless (helps rendering)
		if (isHeadless) {
			try {
				driver.manage().window().setSize(new org.openqa.selenium.Dimension(1920, 1200));
			} catch (Exception ignored) {
			}
		}

		// Attempt in current document and in frames if needed
		int frameCount = 0;
		try {
			frameCount = driver.findElements(By.tagName("iframe")).size();
		} catch (Exception ignored) {
		}

		// We'll try main document first, then each iframe (switching context), then
		// return to default
		// Single method that attempts click logic in current context (return true if
		// succeeded)
		java.util.function.Supplier<Boolean> tryClickInCurrentContext = () -> {
			for (int attempt = 1; attempt <= 2; attempt++) {
				try {
					// 1) presence => get element reference (avoid stale later)
					WebElement el = wait.until(ExpectedConditions.presenceOfElementLocated(locator));

					// 2) scroll into center (JS) - helpful in headless
					try {
						((JavascriptExecutor) driver)
								.executeScript("arguments[0].scrollIntoView({block:'center', inline:'center'});", el);
						// small nudge
						((JavascriptExecutor) driver).executeScript("window.scrollBy(0, -40);");
					} catch (Exception ignored) {
					}

					// 3) fast path: elementToBeClickable -> click
					try {
						wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
						return true;
					} catch (Throwable ignored) {
					}

					// 4) early JS click (headless likes this)
					try {
						el = wait.until(ExpectedConditions.presenceOfElementLocated(locator)); // refresh ref
						((JavascriptExecutor) driver).executeScript("arguments[0].click();", el);
						return true;
					} catch (Throwable ignored) {
					}

					// 5) wait for overlays to disappear (non-fatal)
					try {
						wait.until(ExpectedConditions.invisibilityOfElementLocated(overlays));
					} catch (Exception ignored) {
					}

					// 6) try keyboard (ENTER) on element if focusable
					try {
						el = wait.until(ExpectedConditions.elementToBeClickable(locator));
						el.sendKeys(Keys.ENTER);
						return true;
					} catch (Throwable ignored) {
					}

					// 7) try clicking nearest clickable ancestor via JS
					try {
						String jsAnc = "var el = arguments[0]; function findClickable(e){ var cur=e; while(cur && cur!==document){ if(cur.tagName && (cur.tagName.toLowerCase()==='button'||cur.tagName.toLowerCase()==='a')) return cur; if(cur.onclick) return cur; cur=cur.parentElement;} return e; }"
								+ "var c = findClickable(el); try{ c.scrollIntoView({block:'center'}); c.click(); return true;}catch(e){ return false; }";
						el = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
						Object r = ((JavascriptExecutor) driver).executeScript(jsAnc, el);
						if (r instanceof Boolean && (Boolean) r)
							return true;
					} catch (Throwable ignored) {
					}

					// 8) last attempt: Actions click
					try {
						el = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
						new Actions(driver).moveToElement(el).click().perform();
						return true;
					} catch (Throwable ignored) {
					}

				} catch (StaleElementReferenceException sere) {
					// retry once
					continue;
				} catch (TimeoutException toe) {
					return false; // element not present in this context within timeout
				} catch (WebDriverException wde) {
					// transient; try second attempt only
					if (attempt == 2)
						return false;
				} catch (Exception ex) {
					return false;
				}
			}
			return false;
		};

		// Try main document
		try {
			if (tryClickInCurrentContext.get())
				return true;
		} catch (Exception ignored) {
		}

		// Try each iframe (iterate and try same logic)
		if (frameCount > 0) {
			List<WebElement> frames = driver.findElements(By.tagName("iframe"));
			for (int i = 0; i < frames.size(); i++) {
				try {
					driver.switchTo().defaultContent();
					driver.switchTo().frame(i);
					if (tryClickInCurrentContext.get()) {
						driver.switchTo().defaultContent();
						return true;
					}
				} catch (Exception ignored) {
					// ignore and continue to next frame
				} finally {
					try {
						driver.switchTo().defaultContent();
					} catch (Exception ignored) {
					}
				}
			}
		}

		// nothing worked
		return false;
	}

	public boolean clickWhenReadyWithJS(By locator, int timeoutSeconds) {
		JavascriptExecutor js = (JavascriptExecutor) driver;
		long end = System.currentTimeMillis() + timeoutSeconds * 1000L;
		int attempt = 0;

		// short initial wait for presence to avoid immediate failures
		try {
			new WebDriverWait(driver, Duration.ofSeconds(Math.max(1, Math.min(timeoutSeconds, 5))))
					.until(ExpectedConditions.presenceOfElementLocated(locator));
		} catch (Exception e) {
			// continue, loop below will keep trying until full timeout
		}

		while (System.currentTimeMillis() < end) {
			attempt++;
			try {
				// re-find element each iteration to avoid stale refs
				WebElement el = driver.findElement(locator);

				// quick visibility & size checks
				boolean displayed = false;
				try {
					displayed = el.isDisplayed();
				} catch (Exception ignored) {
				}
				Dimension d = el.getSize();
				if (!displayed || d.getHeight() == 0 || d.getWidth() == 0) {
					// scroll and retry after a small sleep
					try {
						js.executeScript("arguments[0].scrollIntoView({block:'center', inline:'center'});", el);
					} catch (Exception ignored) {
					}
					Thread.sleep(150);
					continue;
				}

				// Try normal WebElement click first (works in most browser cases)
				try {
					el.click();
					System.out.println("clickWhenReadyWithJS: clicked by WebElement.click() on attempt " + attempt);
					return true;
				} catch (Exception eWebClick) {
					// proceed to JS fallbacks
					System.out.println("clickWhenReadyWithJS: WebElement.click() failed on attempt " + attempt + " -> "
							+ eWebClick.getClass().getSimpleName());
				}

				// JS native click fallback (simple)
				try {
					js.executeScript("arguments[0].focus(); arguments[0].click();", el);
					System.out.println("clickWhenReadyWithJS: clicked by JS click() on attempt " + attempt);
					return true;
				} catch (Exception eJsClick) {
					System.out.println("clickWhenReadyWithJS: JS click() failed on attempt " + attempt + " -> "
							+ eJsClick.getClass().getSimpleName());
				}

				// JS synthesized mouse events (helps headless)
				try {
					String synth = "var el = arguments[0];" + "el.scrollIntoView({block:'center', inline:'center'});"
							+ "el.focus();"
							+ "var down = new MouseEvent('pointerdown', {bubbles:true, cancelable:true}); el.dispatchEvent(down);"
							+ "var up   = new MouseEvent('pointerup',   {bubbles:true, cancelable:true}); el.dispatchEvent(up);"
							+ "var clk  = new MouseEvent('click',       {bubbles:true, cancelable:true}); el.dispatchEvent(clk);"
							+ "return true;";
					Object res = js.executeScript(synth, el);
					if (Boolean.TRUE.equals(res)) {
						System.out.println("clickWhenReadyWithJS: clicked by synthesized events on attempt " + attempt);
						return true;
					}
				} catch (Exception eSynthetic) {
					System.out.println("clickWhenReadyWithJS: synthetic events failed on attempt " + attempt + " -> "
							+ eSynthetic.getClass().getSimpleName());
				}

				// Actions move + click fallback
				try {
					new Actions(driver).moveToElement(el).pause(Duration.ofMillis(50)).click().build().perform();
					System.out.println("clickWhenReadyWithJS: clicked by Actions on attempt " + attempt);
					return true;
				} catch (Exception eAction) {
					System.out.println("clickWhenReadyWithJS: Actions click failed on attempt " + attempt + " -> "
							+ eAction.getClass().getSimpleName());
				}

			} catch (StaleElementReferenceException sere) {
				// DOM changed, retry
				System.out.println("clickWhenReadyWithJS: StaleElementReferenceException on attempt " + attempt);
			} catch (NoSuchElementException nsee) {
				// element not present yet
				// System.out.println("clickWhenReadyWithJS: NoSuchElement on attempt " +
				// attempt);
			} catch (InterruptedException ie) {
				Thread.currentThread().interrupt();
				System.out.println("clickWhenReadyWithJS: Interrupted");
				return false;
			} catch (Exception ex) {
				System.out.println("clickWhenReadyWithJS: unexpected exception on attempt " + attempt + " -> "
						+ ex.getClass().getSimpleName() + ": " + ex.getMessage());
			}

			// small backoff before next attempt
			try {
				Thread.sleep(200);
			} catch (InterruptedException ie) {
				Thread.currentThread().interrupt();
				return false;
			}
		}

		System.out.println("clickWhenReadyWithJS: timed out after " + timeoutSeconds + "s and "
				+ (System.currentTimeMillis() / 1000) + " attempts");
		return false;
	}

	public void waitForElementToBeClickableWithPolling(By locator, int timeOut, int pollingTime) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut), Duration.ofMillis(pollingTime));
		wait.until(ExpectedConditions.elementToBeClickable(locator)).click();

	}

	public void waitForBusyIndicatorToDisappear(By locator, int timeoutInSeconds) {
		try {
			long endTime = System.currentTimeMillis() + (timeoutInSeconds * 1000L);
			int stableCount = 0;

			while (System.currentTimeMillis() < endTime) {
				// Re-find elements each poll to avoid stale references
				List<WebElement> busyList = driver.findElements(locator);
				boolean visible = false;

				for (WebElement busy : busyList) {
					try {
						if (busy.isDisplayed()) {
							visible = true;
							break;
						}
					} catch (org.openqa.selenium.StaleElementReferenceException sere) {
						// Element became stale between find and isDisplayed() — ignore and continue
						// We'll re-query on the next poll
						continue;
					} catch (Exception e) {
						// Non-fatal: log and continue checking others
						System.out.println("⚠ Ignored exception checking busy element: " + e.getMessage());
						continue;
					}
				}

				if (!visible) {
					stableCount++;
					// Wait a short period to confirm it doesn't reappear
					if (stableCount >= 3) {
						System.out.println("✅ Busy indicator is fully gone and stable.");
						return;
					}
				} else {
					stableCount = 0; // reset if it reappears
				}

				Thread.sleep(500); // short polling interval
			}

			System.err.println("⚠️ Busy indicator did not disappear within " + timeoutInSeconds + " seconds.");
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
			throw new RuntimeException("Busy indicator wait interrupted.", e);
		} catch (Exception e) {
			System.err.println("❌ Exception while waiting for busy indicator: " + e.getMessage());
			throw new RuntimeException(e);
		}
	}

	public void waitForBlockLayerToDisappear(By locator, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
	}

	public void switchToModalPopup(By locator, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
	}

	public void waitForElementToDisappear(By locator) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(Constants.DEFAULT_TIME_OUT));
		wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
	}

	public WebElement waitForElementPresenceAndVisible(By locator, int timeoutSeconds) {
		WebElement el = waitForElementPresence(locator, timeoutSeconds); // reuse your existing presence wait
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
		try {
			wait.pollingEvery(Duration.ofMillis(500)).until(d -> {
				try {
					Object displayed = ((JavascriptExecutor) d).executeScript("const e = arguments[0];"
							+ "if(!e) return false;" + "const rect = e.getBoundingClientRect();"
							+ "const style = window.getComputedStyle(e);"
							+ "return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';",
							el);
					return Boolean.TRUE.equals(displayed);
				} catch (Exception ex) {
					return false;
				}
			});
		} catch (TimeoutException te) {
			// fallback: attempt scroll into view once
			try {
				((JavascriptExecutor) driver)
						.executeScript("arguments[0].scrollIntoView({block:'center', inline:'center'});", el);
			} catch (Exception ignore) {
			}
		}
		return el;
	}

	// 2) Click with fallback to JS click (useful when normal click fails in
	// headless)
	public void clickWithFallback(WebElement el) {
		try {
			el.click();
		} catch (Exception e) {
			try {
				((JavascriptExecutor) driver).executeScript("arguments[0].click();", el);
			} catch (Exception ex) {
				// last-ditch: scroll + js click
				try {
					((JavascriptExecutor) driver).executeScript(
							"arguments[0].scrollIntoView({block:'center', inline:'center'}); arguments[0].click();",
							el);
				} catch (Exception ignore) {
				}
			}
		}
	}

	// 3) Robust dialog finder: uses xpath role=dialog and JS fallback
	public WebElement waitForDialogAndReturn(int timeoutSeconds) {
		By dialogBy = By.xpath("//div[contains(@id,'dialog') and @role='dialog']");
		try {
			return waitForElementPresenceAndVisible(dialogBy, timeoutSeconds);
		} catch (Exception ex) {
			// fallback: find any element with role=dialog via JS and return a driver-find
			try {
				Object found = ((JavascriptExecutor) driver)
						.executeScript("return document.querySelector('[role=\"dialog\"]');");
				if (found != null) {
					return driver.findElement(By.cssSelector("[role='dialog']"));
				}
			} catch (Exception ignore) {
			}
		}
		throw new TimeoutException("Dialog not found within " + timeoutSeconds + "s");
	}

	public void safeClick(By locator, By blockLayerLocator, By busyIndicatorLocator) {
		// Wait for block layer to disappear
		waitForElementToDisappear(blockLayerLocator);

		// Wait for busy indicator to disappear
		waitForElementToDisappear(busyIndicatorLocator);

		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(Constants.DEFAULT_ELEMENT_TIME_OUT));
		WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));

		try {
			element.click();
		} catch (ElementClickInterceptedException e) {
			// Retry once after delay
			try {
				Thread.sleep(1000);
			} catch (InterruptedException ignored) {
			}

			// Wait again for overlays
			waitForElementToDisappear(blockLayerLocator);
			waitForElementToDisappear(busyIndicatorLocator);

			// Retry clicking the element
			wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
		}
	}

	/**
	 * An expectation for checking that all elements present on the web page that
	 * match the locator are visible. Visibility means that the elements are not
	 * only displayed but also have a height and width that is greater than 0.
	 * 
	 * @param locator
	 * @param timeOut
	 * @return
	 */
	public List<WebElement> waitForElementsVisible(By locator, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		return wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(locator));
	}

	/**
	 * An expectation for checking that there is at least one element present on a
	 * web page. Default Polling Time = 500ms
	 * 
	 * @param locator
	 * @param timeOut
	 * @return
	 */
	public List<WebElement> waitForElementsPresence(By locator, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		return wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator));
	}

	/**
	 * An expectation for checking that there is at least one element present on a
	 * web page. Default Polling Time = customized
	 * 
	 * @param locator
	 * @param timeOut
	 * @return
	 */
	public List<WebElement> waitForElementsPresence(By locator, int timeOut, int pollingTime) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut), Duration.ofMillis(pollingTime));
		return wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator));
	}

	public void waitForElementPresenceWithFluentWait(By locator, int timeOut, int pollingTime, String message) {

		Wait<WebDriver> wait = new FluentWait<WebDriver>(driver).withTimeout(Duration.ofSeconds(timeOut))
				.pollingEvery(Duration.ofMillis(pollingTime))
				.ignoring(NoSuchElementException.class, StaleElementReferenceException.class).withMessage(message);

		wait.until(ExpectedConditions.presenceOfElementLocated(locator)).click();
	}

	public void clickWithHeaderOffset(By locator, By headerLocator, int timeoutSeconds) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
		WebElement el = wait.until(ExpectedConditions.presenceOfElementLocated(locator));

		long headerHeight = 0;
		try {
			WebElement header = driver.findElement(headerLocator);
			Object hh = ((JavascriptExecutor) driver)
					.executeScript("return arguments[0].getBoundingClientRect().height;", header);
			headerHeight = hh == null ? 0 : ((Number) hh).longValue();
		} catch (Exception ignored) {
		}

		((JavascriptExecutor) driver).executeScript(
				"var el = arguments[0]; var headerH = arguments[1];"
						+ "var r = el.getBoundingClientRect(); window.scrollBy(0, r.top - headerH - 20);",
				el, headerHeight);

		try {
			WebElement visible = wait.until(ExpectedConditions.visibilityOf(el));
			wait.until(ExpectedConditions.elementToBeClickable(visible)).click();
			return;
		} catch (ElementClickInterceptedException | TimeoutException e) {
			try {
				new Actions(driver).moveToElement(el).click().perform();
				return;
			} catch (Exception ignored) {
			}
			((JavascriptExecutor) driver).executeScript("arguments[0].click();", el);
		}
	}

	public void disableAnimations() {
		String script = "var css = document.createElement('style');" + "css.type = 'text/css';"
				+ "css.id = 'disable-animations';" + "css.appendChild(document.createTextNode('* { "
				+ "transition-duration: 0s !important; animation-duration: 0s !important; "
				+ "animation-delay: 0s !important; }'));" + "document.head.appendChild(css);";
		try {
			((JavascriptExecutor) driver).executeScript(script);
		} catch (Exception ignored) {
		}
	}

	public void waitUntilBusyIndicatorGone(int timeoutSeconds) {
		List<By> commonBusyLocators = List.of(By.xpath(
				"//*[contains(@class,'sapUiBusy') or contains(@class,'busy') or contains(@class,'sapUiBlockLayer')]"),
				By.xpath(
						"//div[contains(@class,'overlay') or contains(@class,'loading') or contains(@class,'spinner')]"),
				By.xpath("//*[contains(@id,'busy') or contains(@id,'loading')]"));
		for (By busy : commonBusyLocators) {
			try {
				new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds))
						.until(ExpectedConditions.invisibilityOfElementLocated(busy));
			} catch (TimeoutException ignored) {
			}
		}
	}

	//
	public WebElement retryingElement(By locator, int timeOut, int pollingTime) {

		WebElement element = null;

		int attempts = 0;
		while (attempts < timeOut) {
			try {
				element = driver.findElement(locator);
				break;
			} catch (NoSuchElementException e) {
				System.out.println("element is not found in attempt : " + attempts + " for : " + locator);
				try {
					Thread.sleep(pollingTime);
				} catch (InterruptedException e1) {
					e1.printStackTrace();
				}
			}
			attempts++;
		}

		if (element == null) {
			try {
				throw new Exception("ELEMENTNOTFOUNDEXCEPTION");
			} catch (Exception e) {
				System.out.println("element is not found exception....tried for : " + timeOut + " secs"
						+ " with the interval of : " + pollingTime + " ms ");
			}
		}

		return element;

	}

	public void waitForPageLoad(int timeOut) {

		long endTime = System.currentTimeMillis() + timeOut;

		while (System.currentTimeMillis() < endTime) {

			JavascriptExecutor js = (JavascriptExecutor) driver;
			String state = js.executeScript("return document.readyState").toString();
			System.out.println("page is : " + state);
			if (state.equals("complete")) {
				System.out.println("page is fully loaded now....");
				break;
			}
		}
	}

	/*
	 * iFrame
	 */
	public void waitForFrameAndSwitchToIt(By frameLocator, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameLocator));
	}

	public void waitForFrameAndSwitchToIt(String frameNameOrID, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameNameOrID));
	}

	public void waitForFrameAndSwitchToIt(int frameIndex, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameIndex));
	}

	public void waitForFrameAndSwitchToIt(WebElement frameElement, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(frameElement));
	}

	public WebElement waitForDialogAnyFrame(By locator, int timeoutSeconds) {
		long end = System.currentTimeMillis() + timeoutSeconds * 1000L;

		while (System.currentTimeMillis() < end) {
			driver.switchTo().defaultContent();

			// 1) Check main DOM
			List<WebElement> dialogs = driver.findElements(locator);
			for (WebElement dlg : dialogs) {
				try {
					if (dlg.isDisplayed() && dlg.getSize().height > 1 && dlg.getSize().width > 1) {
						return dlg;
					}
				} catch (Exception ignored) {
				}
			}

			// 2) Check all iframes
			List<WebElement> frames = driver.findElements(By.tagName("iframe"));
			for (int i = 0; i < frames.size(); i++) {
				try {
					driver.switchTo().defaultContent();
					driver.switchTo().frame(i);
					List<WebElement> dialogsInFrame = driver.findElements(locator);

					for (WebElement dlg : dialogsInFrame) {
						try {
							if (dlg.isDisplayed() && dlg.getSize().height > 1 && dlg.getSize().width > 1) {
								return dlg;
							}
						} catch (Exception ignored) {
						}
					}
				} catch (Exception ignored) {
				}
			}

			try {
				Thread.sleep(200);
			} catch (Exception ignored) {
			}
		}

		throw new TimeoutException("Dialog not found in ANY frame: " + locator);
	}

	public boolean jsClickwithPolling(By locator, int timeoutSeconds) {
		JavascriptExecutor js = (JavascriptExecutor) driver;
		long end = System.currentTimeMillis() + timeoutSeconds * 1000L;
		String xp = locator.toString().replaceFirst("By\\.xpath:\\s*", "");
		while (System.currentTimeMillis() < end) {
			try {
				Object res = js.executeScript("var xpath = arguments[0];"
						+ "var e = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;"
						+ "if(!e) return null;" + "e.scrollIntoView({block:'center', inline:'center'});"
						+ "try{ e.click(); return true; } catch(err) { var ev = new MouseEvent('click',{bubbles:true,cancelable:true}); e.dispatchEvent(ev); return true; }",
						xp);
				if (res != null && Boolean.TRUE.equals(res))
					return true;
			} catch (Exception ignored) {
			}
			try {
				Thread.sleep(300);
			} catch (InterruptedException ignored) {
			}
		}
		return false;
	}

	/*
	 * Click on the back-Button once.
	 */
	public void clickBackBtn(By backBtn) {
		try {
			driver.switchTo().defaultContent();
			clickElementWhenReady(backBtn, Constants.DEFAULT_ELEMENT_TIME_OUT);
		} catch (Exception e) {
			System.out.println("Failed to press back" + e.getMessage());
		}
	}

	/**
	 * Get all available options from a dropdown or filter list.
	 * 
	 * @return A String List of all the available options
	 */
	public List<String> getAllAvailableOptions(By locator) throws InterruptedException {
		List<String> optionsList = new ArrayList<>();
		List<WebElement> options = waitForElementsVisible(locator, Constants.DEFAULT_ELEMENT_TIME_OUT);
		for (WebElement option : options) {
			System.out.println("Filter Option: " + option.getText());
			String optionText = option.getText();
			if (!optionText.isEmpty()) {
				optionsList.add(optionText);
			}
		}
		return optionsList;
	}

	/*
	 * Get the Tile's/App's Outer Display number and inner Number
	 */

	// Updated method
	public String getTileOuterNumber(WebElement anyOuterTileElement, By tileAnchor, By outerTileNumberSpan)
			throws InterruptedException {
		try {
			WebElement anchor = anyOuterTileElement.findElement(tileAnchor);

			// safe lookup instead of crashing
			List<WebElement> numberElements = anchor.findElements(outerTileNumberSpan);
			if (numberElements.isEmpty()) {
				return "No Outer App Number Present";
			}

			WebElement numberElement = numberElements.get(0);
			String number = numberElement.getText().trim();

			if ("...".equals(number)) {
				waitUtil.waitForTextToChange(numberElement, "...");
				number = numberElement.getText().trim();
			}

			return number;
		} catch (NoSuchElementException e) {
			return "No Outer App Number Present";
		}
	}

	public String getInnerHeaders(By locator) throws InterruptedException {
		String result = "inner number(s) not found";
		List<String> numbersList = new ArrayList<>();
		try {
			// --
			Thread.sleep(5000); // FOR MSP-ITEMS in MSP APP.
			// --
			List<WebElement> toolbarElements = waitForElementsVisibleWithPolling(locator,
					Constants.DEFAULT_ELEMENT_TIME_OUT, Constants.DEFAULT_POLLING_TIME_OUT);

			if (!toolbarElements.isEmpty()) {
				for (WebElement element : toolbarElements) {
					String elementText = element.getText();
					if (elementText.contains("(0)")) {
						Thread.sleep(3000);
						elementText = element.getText();
					}
					numbersList.add(elementText);
				}
				result = numbersList.toString();
			}
		} catch (NoSuchElementException | TimeoutException e) {
			System.out.println("No inner numbers found within timeout period");
		}
		return result;
	}

	/*
	 * 
	 */
	public void navigateToApplication(By tabDropDownBtnLocator, By appTabLocator, By appLinkLocator,
			By tileOuterNumberLocator, By tileAnchorLocator, By outerTileNumberSpanLocator, By iFrameLocator,
			By numberReflectedAfterGoLocator) throws InterruptedException {

		System.out.println("Navigating to above application");
		waitForPageLoad(Constants.DEFAULT_TIME_OUT);

		System.out.println("Clicking tab dropdown button");
		clickElementWhenReady(tabDropDownBtnLocator, Constants.DEFAULT_ELEMENT_TIME_OUT);

		System.out.println("Selecting application tab");
		clickElementWhenReady(appTabLocator, Constants.DEFAULT_ELEMENT_TIME_OUT);

		System.out.println("Retrieving tile count number");
		WebElement appElement = waitForElementVisible(appLinkLocator, Constants.DEFAULT_ELEMENT_TIME_OUT);
		WebElement tileCountElement = appElement.findElement(tileOuterNumberLocator);

		String tileCount = getTileOuterNumber(tileCountElement, tileAnchorLocator, outerTileNumberSpanLocator);
		System.out.println("Tile count number: " + tileCount);

		System.out.println("Clicking application link");
		clickElementWhenReady(appLinkLocator, Constants.DEFAULT_ELEMENT_TIME_OUT);

		System.out.println("Waiting for application to load");
		waitUtil.waitForSAPBusyIndicatorToDisappear();
		waitUtil.waitForFrameAndSwitchToIt(iFrameLocator);

		String toolbarCount = getInnerHeaders(numberReflectedAfterGoLocator);
		System.out.println("[App Tile Count: " + tileCount + " | App Toolbar Count: " + toolbarCount + "]");
	}

	public void doSelectAllTextAndClear(By locator) {
		WebElement inputField = waitForElementVisible(locator, Constants.DEFAULT_ELEMENT_TIME_OUT);
		inputField.sendKeys(Keys.chord(Keys.COMMAND, "a"));
		inputField.sendKeys(Keys.BACK_SPACE);
	}

	/**
	 * Clicks an element repeatedly until it becomes invisible or is no longer
	 * present on the screen. This is useful for buttons like "confirm", "cancel",
	 * or any modal dialogs that need to be dismissed by clicking until they
	 * disappear.
	 * 
	 * @param locator The By locator of the element to click
	 */
	public void clickUntilInvisible(By locator) {
		int attempts = 0;
		int maxAttempts = 5;

		while (attempts < maxAttempts) {
			try {
				// Check if element is still present and visible
				if (!isElementDisplayedWithSize(locator)) {
					return;
				}
				waitForElementVisibleWithPolling(locator, Constants.DEFAULT_ELEMENT_TIME_OUT,
						Constants.DEFAULT_POLLING_TIME_OUT).click();
				attempts++;

				// Small wait between clicks
				Thread.sleep(1000);

			} catch (Exception e) {
				System.out.println("Element disappeared or error occurred: " + e.getMessage());
				return;
			}
		}
		System.out.println("Max attempts reached. Element may still be present.");
	}

	public void waitForAllBusyIndicatorsToDisappear(int timeout) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));

		// Wait for all common SAP busy indicator types
		By[] busyIndicatorSelectors = { By.className("sapUiLocalBusyIndicator"),
				By.className("sapUiGlobalBusyIndicator"), By.cssSelector("[role='progressbar']"),
				By.cssSelector(".sapUiLocalBusyIndicatorSizeBig"), By.id("sap-ui-blocklayer-popup") };

		for (By selector : busyIndicatorSelectors) {
			try {
				wait.until(ExpectedConditions.invisibilityOfElementLocated(selector));
				System.out.println("Busy indicator disappeared: " + selector.toString());
			} catch (Exception e) {
				// Indicator might not be present, continue
				System.out.println("Busy indicator not found or already gone: " + selector.toString());
			}
		}
	}

	private By busyIndicator = By.className("sapUiLocalBusyIndicator");

	public void waitForBusyIndicatorToDisappear1(By busyIndicator, int timeout) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeout));
		try {
			wait.until(ExpectedConditions.invisibilityOfElementLocated(busyIndicator));
			System.out.println("Busy indicator is no longer visible.");
		} catch (Exception e) {
			System.out.println("Busy indicator did not disappear within the timeout period.");
			e.printStackTrace();
		}
	}

	// ----- ADD / REPLACE THESE METHODS IN ElementUtil.java ----- //

	/**
	 * Robust modal popup switcher: Waits until a dialog matching the locator is
	 * visible *and* has non-zero size (painted). This avoids headless-mode false
	 * positives where the element exists in DOM but is not displayed/painted.
	 *
	 * Usage: eleUtil.switchToModalPopupRobust(mspConfirmationDialog,
	 * Constants.DEFAULT_ELEMENT_TIME_OUT);
	 */
	public void switchToModalPopupRobust(By locator, int timeOut) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOut));
		try {
			wait.until(d -> {
				List<WebElement> dialogs = d.findElements(locator);
				if (dialogs == null || dialogs.isEmpty()) {
					return false;
				}
				for (WebElement dlg : dialogs) {
					try {
						if (!dlg.isDisplayed())
							continue;
						// check bounding rect width/height via JS to ensure it's painted
						Object w = ((JavascriptExecutor) d)
								.executeScript("return arguments[0].getBoundingClientRect().width;", dlg);
						Object h = ((JavascriptExecutor) d)
								.executeScript("return arguments[0].getBoundingClientRect().height;", dlg);
						double width = (w instanceof Number) ? ((Number) w).doubleValue() : 0;
						double height = (h instanceof Number) ? ((Number) h).doubleValue() : 0;
						if (width > 1.0 && height > 1.0) {
							return true;
						}
					} catch (StaleElementReferenceException se) {
						// ignore and retry
					} catch (Exception ex) {
						// ignore and continue checking other dialogs
					}
				}
				return false;
			});
		} catch (TimeoutException te) {
			// fallback: try a simpler visibility wait (so tests still fail with proper
			// message)
			wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
		}
	}

	/**
	 * Waits up to timeOutSeconds for any cell located by 'cellsLocator' to contain
	 * expectedText. Returns true when found; false after timeout.
	 *
	 * Usage: eleUtil.waitForTextInTable(recommCellLocator, expectedRecommId, 40);
	 */
	public boolean waitForTextInTable(By cellsLocator, String expectedText, int timeOutSeconds) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOutSeconds));
		try {
			return wait.until(d -> {
				List<WebElement> cells = d.findElements(cellsLocator);
				if (cells == null || cells.isEmpty())
					return false;
				for (WebElement c : cells) {
					try {
						String txt = c.getText();
						if (txt != null && txt.trim().contains(expectedText)) {
							return true;
						}
					} catch (StaleElementReferenceException se) {
						// ignore this cell; will check again on next poll
					}
				}
				return false;
			});
		} catch (TimeoutException e) {
			return false;
		}
	}

	/**
	 * Wrapper around clickWithHeaderOffset that tries a soft header-hide fallback
	 * as last resort. Use only when header overlay persistent blocks clicks. It
	 * will attempt: 1) normal header-offset click, 2) Actions click, 3) JS click,
	 * 4) temporarily hide header and JS-click (restores header after click).
	 *
	 * Signature matches your class style (no driver param).
	 *
	 * Usage: eleUtil.clickWithHeaderOffsetIfNeeded(editRecommBtn, pageHeader,
	 * Constants.DEFAULT_ELEMENT_TIME_OUT);
	 */
	public void clickWithHeaderOffsetIfNeeded(By locator, By headerLocator, int timeoutSeconds) {
		try {
			// attempt standard header-offset click (you already have clickWithHeaderOffset)
			clickWithHeaderOffset(locator, headerLocator, timeoutSeconds);
			return;
		} catch (Exception e) {
			// fall through to other attempts
		}

		// try actions click
		try {
			WebElement el = waitForElementVisible(locator, timeoutSeconds);
			new Actions(driver).moveToElement(el).click().perform();
			return;
		} catch (Exception ignored) {
		}

		// try JS click
		try {
			WebElement el = waitForElementVisible(locator, timeoutSeconds);
			((JavascriptExecutor) driver).executeScript("arguments[0].click();", el);
			return;
		} catch (Exception ignored) {
		}

		// final fallback: temporarily hide the header and JS-click, then restore it
		try {
			((JavascriptExecutor) driver).executeScript(
					"var h = document.querySelector(arguments[0]); if (h) { h.setAttribute('data-old-style', h.getAttribute('style')||''); h.style.pointerEvents='none'; h.style.visibility='hidden'; }",
					headerLocator.toString().replace("By.cssSelector: ", "").replace("By.xpath: ", ""));
		} catch (Exception ignored) {
		}

		try {
			WebElement el = waitForElementVisible(locator, timeoutSeconds);
			((JavascriptExecutor) driver).executeScript("arguments[0].click();", el);
		} catch (Exception ignored) {
		}

		// restore header (best-effort)
		try {
			((JavascriptExecutor) driver).executeScript(
					"var h = document.querySelector(arguments[0]); if (h) { var s = h.getAttribute('data-old-style'); if(s){ h.setAttribute('style', s); } h.removeAttribute('data-old-style'); h.style.pointerEvents=''; h.style.visibility=''; }",
					headerLocator.toString().replace("By.cssSelector: ", "").replace("By.xpath: ", ""));
		} catch (Exception ignored) {
		}
	}

	// ---------- optional private helper (used by advanced popup logic) ----------
	private boolean isElementPainted(WebElement el) {
		try {
			if (!el.isDisplayed())
				return false;
			Object w = ((JavascriptExecutor) driver).executeScript("return arguments[0].getBoundingClientRect().width;",
					el);
			Object h = ((JavascriptExecutor) driver)
					.executeScript("return arguments[0].getBoundingClientRect().height;", el);
			double width = (w instanceof Number) ? ((Number) w).doubleValue() : 0;
			double height = (h instanceof Number) ? ((Number) h).doubleValue() : 0;
			return width > 1.0 && height > 1.0;
		} catch (StaleElementReferenceException se) {
			return false;
		} catch (Exception ex) {
			return false;
		}
	}

	// Add this inside ElementUtil

	public void smartClick(By locator) {
		WebElement element = null;

		try {
			element = waitUtil.waitForElementPresence(locator);
			// use JS util to scroll into view (uses your JavaScriptUtil.scrollIntoView)
			jsUtil.scrollIntoView(element);
			element.click();
			System.out.println("smartClick: clicked using NORMAL CLICK -> " + locator);
			return;
		} catch (Exception e1) {
			System.out.println("smartClick: normal click failed -> trying ACTIONS click for: " + locator);
		}

		try {
			element = waitForElementVisible(locator, 10);
			jsUtil.scrollIntoView(element);
			Actions act = new Actions(driver);
			act.moveToElement(element).click().perform();
			System.out.println("smartClick: clicked using ACTIONS CLICK -> " + locator);
			return;
		} catch (Exception e2) {
			System.out.println("smartClick: actions click failed -> trying JS click for: " + locator);
		}

		try {
			element = waitForElementPresence(locator, 15);
			jsUtil.scrollIntoView(element);
			// prefer jsScrollAndClick which centers then clicks, else clickElementByJS
			try {
				jsUtil.jsScrollAndClick(element);
				System.out.println("smartClick: clicked using JS (jsScrollAndClick) -> " + locator);
			} catch (Exception jsInner) {
				// fallback to simple JS click
				jsUtil.clickElementByJS(element);
				System.out.println("smartClick: clicked using JS (clickElementByJS) -> " + locator);
			}
			return;
		} catch (Exception e3) {
			System.out.println("smartClick: JS click also failed -> ELEMENT BROKEN: " + locator);
			throw e3;
		}
	}

	public void smartClick(WebElement element) {
		if (element == null) {
			throw new IllegalArgumentException("smartClick: provided element is null");
		}

		// 1) Try normal click first
		try {
			jsUtil.scrollIntoView(element);
			element.click();
			System.out.println("smartClick(WebElement): clicked using NORMAL CLICK");
			return;
		} catch (Exception e1) {
			System.out.println("smartClick(WebElement): normal click failed -> trying ACTIONS click");
		}

		// 2) Actions click
		try {
			jsUtil.scrollIntoView(element);
			Actions act = new Actions(driver);
			act.moveToElement(element).click().perform();
			System.out.println("smartClick(WebElement): clicked using ACTIONS CLICK");
			return;
		} catch (Exception e2) {
			System.out.println("smartClick(WebElement): actions click failed -> trying JS click");
		}

		// 3) JS click
		try {
			jsUtil.scrollIntoView(element);
			try {
				jsUtil.jsScrollAndClick(element);
				System.out.println("smartClick(WebElement): clicked using JS (jsScrollAndClick)");
			} catch (Exception inner) {
				jsUtil.clickElementByJS(element);
				System.out.println("smartClick(WebElement): clicked using JS (clickElementByJS)");
			}
			return;
		} catch (Exception e3) {
			System.out.println("smartClick(WebElement): JS click also failed -> ELEMENT BROKEN");
			throw e3;
		}
	}

	public boolean isElementPresentJS(By locator) {
		try {
			// driver.findElements won't throw, returns empty if not present
			return !driver.findElements(locator).isEmpty();
		} catch (Exception e) {
			return false;
		}
	}

	public boolean isVisibleJS(By locator) {
		try {
			WebElement ele = driver.findElement(locator);
			String script = "var e = arguments[0];" + "if(!e) return false;" + "var style = window.getComputedStyle(e);"
					+ "if(style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;"
					+ "var rect = e.getBoundingClientRect();" + "return (rect.width > 0 && rect.height > 0);";
			Object res = jsUtil.executeScript(script, ele);
			return res != null && Boolean.TRUE.equals(res);
		} catch (Exception e) {
			return false;
		}
	}

	public WebElement waitForElementJS(By locator, int timeoutSec) {
		long end = System.currentTimeMillis() + timeoutSec * 1000;

		while (System.currentTimeMillis() < end) {
			try {
				if (isElementPresentJS(locator) && isVisibleJS(locator)) {
					return driver.findElement(locator);
				}
			} catch (Exception ignored) {
			}

			try {
				Thread.sleep(300);
			} catch (InterruptedException ignored) {
			}
		}

		throw new RuntimeException("Element not found in headless: " + locator);
	}

	public boolean jsClickPolling(By locator, int timeoutSeconds) {
		JavascriptExecutor js = (JavascriptExecutor) driver;
		long end = System.currentTimeMillis() + timeoutSeconds * 1000L;

		String xpath = locator.toString().replace("By.xpath: ", "").trim();

		while (System.currentTimeMillis() < end) {
			try {
				Object clicked = js.executeScript(
						"var el = document.evaluate(arguments[0], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;"
								+ "if (!el) return false;"
								+ "try { el.scrollIntoView({block:'center'}); el.click(); return true; } catch(e) {}"
								+ "return false;",
						xpath);

				if (Boolean.TRUE.equals(clicked)) {
					return true;
				}
			} catch (Exception ignored) {
			}

			try {
				Thread.sleep(200);
			} catch (InterruptedException e) {
			}
		}

		return false;
	}

	public boolean clickWithJSPolling(By locator, int timeout) {
		WebElement element = null;
		long end = System.currentTimeMillis() + (timeout * 1000);

		while (System.currentTimeMillis() < end) {
			try {
				// 1) Try normal wait + click
				element = waitForElementVisible(locator, 2);
				element.click();
				return true;
			} catch (Exception e1) {
				try {
					// 2) Try JS click using your existing JSUtil
					element = getElement(locator);
					jsUtil.clickElementByJS(element);
					return true;
				} catch (Exception e2) {
					// retry loop
					try {
						Thread.sleep(300);
					} catch (InterruptedException ignored) {
					}
				}
			}
		}
		return false;
	}

	public void takeScreenshot(String fileName) {
		try {
			TakesScreenshot ts = (TakesScreenshot) driver;
			File src = ts.getScreenshotAs(OutputType.FILE);

			String path = System.getProperty("user.dir") + "/screenshots/" + fileName + "_" + System.currentTimeMillis()
					+ ".png";

			FileUtils.copyFile(src, new File(path));
			System.out.println("📸 Screenshot saved: " + path);

		} catch (Exception e) {
			System.out.println("❌ Failed to capture screenshot: " + e.getMessage());
		}
	}

	public void robustClearAndType(By locator, String value, int timeOutInSeconds) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeOutInSeconds));
		WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
		try {
			element.click();
		} catch (Exception e) {
			((JavascriptExecutor) driver).executeScript("arguments[0].focus();", element);
		}
		element.sendKeys(Keys.chord(Keys.CONTROL, "a"));
		element.sendKeys(Keys.BACK_SPACE);
		element.sendKeys(value);
		System.out.println("Input value: " + value);
		element.sendKeys(Keys.TAB);
	}

	public void doClickWithJS(By locator) {
		WebElement element = waitForElementPresence(locator, 10);
		JavascriptExecutor js = (JavascriptExecutor) driver;
		js.executeScript("arguments[0].click();", element);
	}

	public static void waitForBlockLayerToDisappear(WebDriver driver, int timeoutInSeconds, By locator) {
		System.out.println("-> Waiting for blocking layer to disappear...");
		try {
			WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutInSeconds));
			wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
			System.out.println("-> Blocking layer disappeared.");
		} catch (Exception e) {
			System.out.println("Warning: Blocking layer element may still be present or did not exist.");
		}
	}

}
package com.qa.flp.utils;

import java.time.Duration;
import java.util.Map;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

public class JavaScriptUtil {

	private WebDriver driver;
	private JavascriptExecutor js;

	public JavaScriptUtil(WebDriver driver) {
		this.driver = driver;
		js = (JavascriptExecutor) this.driver;
	}

	public String getTitleByJS() {
		return js.executeScript("return document.title;").toString();
	}

	public String getURLByJS() {
		return js.executeScript("return document.URL;").toString();
	}

	public void refreshBrowserByJS() {
		js.executeScript("history.go(0)");
	}

	public void navigateToBackPage() {
		js.executeScript("history.go(-1)");
	}

	public void navigateToForwardPage() {
		js.executeScript("history.go(1)");
	}

	public void generateJSAlert(String message) {
		js.executeScript("alert('" + message + "')");
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		driver.switchTo().alert().dismiss();
	}

	public String getPageInnerText() {
		return js.executeScript("return document.documentElement.innerText;").toString();
	}

	public void scrollPageDown() {
		js.executeScript("window.scrollTo(0, document.body.scrollHeight)");
	}

	public void scrollPageDown(String height) {
		js.executeScript("window.scrollTo(0, '" + height + "')");
	}

	public void scrollPageUp() {
		js.executeScript("window.scrollTo(document.body.scrollHeight, 0)");
	}

	public void scrollIntoView(WebElement element) {
		js.executeScript("arguments[0].scrollIntoView(true);", element);
	}

	public void drawBorder(WebElement element) {
		js.executeScript("arguments[0].style.border='3px solid red'", element);
	}

	public void flash(WebElement element) {
		String bgcolor = element.getCssValue("backgroundColor");// blue
		for (int i = 0; i < 5; i++) {
			changeColor("rgb(0,200,0)", element);// green
			changeColor(bgcolor, element);// blue
		}
	}

	private void changeColor(String color, WebElement element) {
		js.executeScript("arguments[0].style.backgroundColor = '" + color + "'", element);// GBGBGBGBGBGB

		try {
			Thread.sleep(20);
		} catch (InterruptedException e) {
		}
	}

	public void zoomBrowserWindow(String zoomPercentage) {
		String zoom = "document.body.style.zoom = '" + zoomPercentage + "%'";
		js.executeScript(zoom);
	}

	public void zoomFirefox(String zoomPercentage) {
		String zoom = "document.body.style.MozTransform = 'scale(" + zoomPercentage + ")'";
		js.executeScript(zoom);

	}

	public void clickElementByJS(WebElement element) {
		js.executeScript("arguments[0].click();", element);
	}

	public void sendKeysUsingWithIdByJS(String id, String value) {
		js.executeScript("document.getElementById('" + id + "').value='" + value + "'");
		// document.getElementById('input-email').value ='tom@gmail.com'
	}

	public void jsScrollAndClick(WebElement element) {
		js.executeScript("arguments[0].scrollIntoView({block:'center', inline:'center'});", element);
		js.executeScript("arguments[0].click();", element);
	}

	public String getElementInnerTextByJS(WebElement element) {
		try {
			Object res = js.executeScript("return arguments[0].innerText;", element);
			return res != null ? res.toString().trim() : "";
		} catch (Exception e) {
			// keep behavior consistent with other util methods: fail-safe empty string
			return "";
		}
	}

	public Object executeScript(String script, Object... args) {
		try {
			return js.executeScript(script, args);
		} catch (Exception e) {
			return null;
		}
	}

	public void waitForUI5TableToStabilize() {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));

		wait.until(d -> (Boolean) ((JavascriptExecutor) d)
				.executeScript("var tbl = document.querySelector('table');" + "if (!tbl) return false;"
						+ "var rows = tbl.querySelectorAll('tbody tr');" + "if (rows.length === 0) return false;"
						+ "return Array.from(rows).every(r => r.innerText.trim().length > 30);"));
	}

	public void forceNonResponsiveTableLayout() {

		JavascriptExecutor js = (JavascriptExecutor) driver;

		js.executeScript(
				// Force page width
				"document.documentElement.style.width='3000px';" + "document.body.style.width='3000px';" +

				// Disable UI5 responsive behavior (pop-in)
						"var tables = document.querySelectorAll('table');" + "tables.forEach(function(tbl) {"
						+ "  tbl.style.tableLayout='fixed';" + "  tbl.style.width='3000px';" + "});" +

						// Force UI5 to re-render
						"if (window.sap && sap.ui && sap.ui.getCore) {" + "  sap.ui.getCore().applyChanges();" + "}");
	}

	public void logViewportMetrics(String tag) {
		JavascriptExecutor js = (JavascriptExecutor) driver;

		Map<String, Object> metrics = (Map<String, Object>) js
				.executeScript("return {" + "  innerWidth: window.innerWidth," + "  innerHeight: window.innerHeight,"
						+ "  outerWidth: window.outerWidth," + "  outerHeight: window.outerHeight,"
						+ "  devicePixelRatio: window.devicePixelRatio," + "  screenWidth: screen.width,"
						+ "  screenHeight: screen.height,"
						+ "  visualViewportWidth: window.visualViewport ? window.visualViewport.width : null,"
						+ "  visualViewportHeight: window.visualViewport ? window.visualViewport.height : null" + "};");

		//System.out.println("===== VIEWPORT METRICS [" + tag + "] =====");
		//metrics.forEach((k, v) -> System.out.println(k + " = " + v));
	}

	public void normalizeBrowserViewport() {

		JavascriptExecutor js = (JavascriptExecutor) driver;

		// Force desktop viewport BEFORE any UI loads
		js.executeScript("window.moveTo(0,0);" + "window.resizeTo(1920, 1080);" +

		// Ensure layout viewport matches
				"document.documentElement.style.width='1920px';" + "document.documentElement.style.height='1080px';"
				+ "document.body.style.width='1920px';" + "document.body.style.height='1080px';"
				+ "document.documentElement.style.zoom='1';");

		// Normalize DPR if needed
		js.executeScript("Object.defineProperty(window, 'devicePixelRatio', { get: () => 1 });");
	}

}

package com.qa.flp.factory;

import java.util.Arrays;
import java.util.Properties;
import java.util.logging.Level;

import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.logging.LoggingPreferences;

public class OptionsManager {

	private Properties prop;
	private ChromeOptions co;
	private FirefoxOptions fo;
	private EdgeOptions eo;

	public OptionsManager(Properties prop) {
		this.prop = prop;
	}

	public ChromeOptions getChromeOptions() {
		co = new ChromeOptions();

		boolean headless = Boolean.parseBoolean(prop.getProperty("headless", "false"));
		boolean incognito = Boolean.parseBoolean(prop.getProperty("incognito", "false"));

		if (headless) {
			co.addArguments("--headless=new"); // modern headless
			co.addArguments("--window-size=1920,1080"); // critical for SAP UI5
			co.addArguments("--force-device-scale-factor=1");
			co.addArguments("--disable-gpu");
			co.addArguments("--no-sandbox");
			co.addArguments("--disable-dev-shm-usage");
			co.addArguments("--disable-blink-features=AutomationControlled");
		}
		if (incognito) {
			co.addArguments("--incognito");
		}
		co.addArguments("--remote-allow-origins=*");
		co.addArguments("--disable-extensions");
		co.addArguments("--disable-infobars");
		co.addArguments("--disable-popup-blocking");
		co.setExperimentalOption("excludeSwitches", Arrays.asList("enable-automation"));
		co.setExperimentalOption("useAutomationExtension", false);
		LoggingPreferences logs = new LoggingPreferences();
		logs.enable(LogType.BROWSER, Level.ALL);
		co.setCapability("goog:loggingPrefs", logs);
		co.setAcceptInsecureCerts(true);
		return co;
	}

	public FirefoxOptions getFirefoxOptions() {
		fo = new FirefoxOptions();
		if (Boolean.parseBoolean(prop.getProperty("headless"))) {
			fo.addArguments("--headless");
		}
		if (Boolean.parseBoolean(prop.getProperty("incognito"))) {
			fo.addArguments("--incognito");
		}
		return fo;
	}

	public EdgeOptions getEdgeOptions() {
		eo = new EdgeOptions();

		if (Boolean.parseBoolean(prop.getProperty("headless", "false"))) {
			eo.addArguments("--headless=new");
			eo.addArguments("--window-size=1920,1080");
		}
		if (Boolean.parseBoolean(prop.getProperty("incognito", "false"))) {
			eo.addArguments("-inprivate");
		}

		eo.setAcceptInsecureCerts(true);
		return eo;
	}

}

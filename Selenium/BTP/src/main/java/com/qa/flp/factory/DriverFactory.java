package com.qa.flp.factory;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.safari.SafariDriver;

import io.github.bonigarcia.wdm.WebDriverManager;

public class DriverFactory {

	private Properties prop;
	private OptionsManager optionsManager;

	private static ThreadLocal<WebDriver> tlDriver = new ThreadLocal<>();

	public static WebDriver getDriver() {
		return tlDriver.get();
	}

	public void initialise_driver(Properties prop) {

		String browserName = prop.getProperty("browser", "chrome").trim();
		boolean isHeadless = Boolean.parseBoolean(prop.getProperty("headless", "false"));

		boolean isCI = Boolean.parseBoolean(System.getenv("GITHUB_ACTIONS"));

		optionsManager = new OptionsManager(prop);

		System.out.println(">>> DriverFactory received browser = " + browserName);
		System.out.println(">>> Headless = " + isHeadless);
		System.out.println(">>> Running on CI = " + isCI);

		switch (browserName.toLowerCase()) {

		case "chrome":
			WebDriverManager.chromedriver().setup();
			tlDriver.set(new ChromeDriver(optionsManager.getChromeOptions()));
			break;

		case "edge":
			if (isCI) {
				System.setProperty("webdriver.edge.driver",
						System.getProperty("user.dir") + "/drivers/edge/linux/msedgedriver");
				System.out.println("✅ Using bundled EdgeDriver (Linux CI)");
			} else {
				System.setProperty("webdriver.edge.driver",
						System.getProperty("user.dir") + "/drivers/edge/windows/msedgedriver.exe");
				System.out.println("✅ Using bundled EdgeDriver (Windows)");
			}
			tlDriver.set(new EdgeDriver(optionsManager.getEdgeOptions()));
			break;

		case "firefox":
			WebDriverManager.firefoxdriver().setup();
			tlDriver.set(new FirefoxDriver(optionsManager.getFirefoxOptions()));
			break;

		case "safari":
			tlDriver.set(new SafariDriver());
			break;

		default:
			throw new RuntimeException("❌ Unsupported browser: " + browserName);
		}

		if (isHeadless) {
			getDriver().manage().window().setSize(new Dimension(1920, 1080));
		} else {
			getDriver().manage().window().maximize();
		}

		getDriver().manage().deleteAllCookies();
		getDriver().get(prop.getProperty("url").trim());
	}

	public Properties initialise_prop() {

		prop = new Properties();

		String envName = "apm02";
		String configFileName;

		switch (envName.toLowerCase()) {
		case "apm01":
			configFileName = "config/config_apm01.properties";
			break;
		case "apm02":
			configFileName = "config/config_apm02.properties";
			break;
		case "emps":
			configFileName = "config/config_emps.properties";
			break;
		default:
			throw new RuntimeException("❌ Invalid environment: " + envName);
		}

		try (InputStream ip = getClass().getClassLoader().getResourceAsStream(configFileName)) {

			if (ip != null) {
				prop.load(ip);
				System.out.println("📄 Config loaded from classpath: " + configFileName);
			} else {
				try (FileInputStream fis = new FileInputStream("./src/test/resources/" + configFileName)) {
					prop.load(fis);
					System.out.println("📄 Config loaded from filesystem: " + configFileName);
				}
			}

		} catch (IOException e) {
			throw new RuntimeException("❌ Failed to load config file: " + configFileName, e);
		}

		return prop;
	}

	public static void quitDriver() {
		if (getDriver() != null) {
			getDriver().quit();
			tlDriver.remove();
		}
	}
}

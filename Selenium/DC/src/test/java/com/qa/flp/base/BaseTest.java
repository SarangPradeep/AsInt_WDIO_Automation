package com.qa.flp.base;

import java.util.Properties;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;

import com.qa.flp.factory.DriverFactory;
import com.qa.flp.pages.DataConduit;
import com.qa.flp.utils.ElementUtil;

public class BaseTest {

	public DriverFactory df;

	protected WebDriver getDriver() {
		return DriverFactory.getDriver();
	}

	public Properties prop;
	public ElementUtil eleUtil;

	protected DataConduit dataConduit;

	@BeforeTest
	@Parameters("browser")
	public void setup(@Optional("chrome") String browser) {

		df = new DriverFactory();
		prop = df.initialise_prop();
		prop.setProperty("browser", browser);
		df.initialise_driver(prop);

		eleUtil = new ElementUtil(getDriver());

		// 🔒 Minimal change: disable Sikuli on CI
		if (!Boolean.parseBoolean(System.getenv("CI"))) {
			dataConduit = new DataConduit(getDriver());
		}
	}

	@AfterTest(alwaysRun = true)
	public void tearDown() {
		DriverFactory.quitDriver();
	}

}

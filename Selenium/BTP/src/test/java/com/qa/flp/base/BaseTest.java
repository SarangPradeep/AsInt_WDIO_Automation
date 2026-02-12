package com.qa.flp.base;

import java.util.Properties;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;

import com.qa.flp.constants.Constants;
import com.qa.flp.factory.DriverFactory;
import com.qa.flp.pages.AssetInspectionPage;
import com.qa.flp.utils.ElementUtil;
import com.qa.flp.utils.JavaScriptUtil;
import com.qa.flp.utils.WaitUtil;

public class BaseTest {

	public DriverFactory df;

	protected WebDriver getDriver() {
		return DriverFactory.getDriver();
	}

	public Properties prop;
	public WaitUtil waitUtil;
	public ElementUtil eleUtil;
	public JavaScriptUtil jsUtil;

	protected AssetInspectionPage assetInspectionPage;

	@BeforeClass(alwaysRun = true)
	@Parameters("browser")
	public void setup(@Optional("chrome") String browser) {

		df = new DriverFactory();
		prop = df.initialise_prop();
		prop.setProperty("browser", browser);
		df.initialise_driver(prop);

		waitUtil = new WaitUtil(getDriver(), Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil = new ElementUtil(getDriver());
		jsUtil = new JavaScriptUtil(getDriver());

		jsUtil.normalizeBrowserViewport();
		jsUtil.logViewportMetrics("SESSION_START");

		assetInspectionPage = new AssetInspectionPage(getDriver());
	}

	@AfterSuite(alwaysRun = true)
	public void tearDown() {
		DriverFactory.quitDriver();
	}

}

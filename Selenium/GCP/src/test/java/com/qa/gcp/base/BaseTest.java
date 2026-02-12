package com.qa.gcp.base;

import java.util.Properties;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;

import com.qa.gcp.constants.Constants;
import com.qa.gcp.factory.DriverFactory;
import com.qa.gcp.pages.CreateAccountGCPPage;
import com.qa.gcp.pages.EquipmentCreationPage;
import com.qa.gcp.pages.LoginPageGCP;
import com.qa.gcp.utils.ElementUtil;
import com.qa.gcp.utils.JavaScriptUtil;
import com.qa.gcp.utils.WaitUtil;

public class BaseTest {

	protected DriverFactory df;
	protected Properties prop;

	protected WaitUtil waitUtil;
	protected ElementUtil eleUtil;
	protected JavaScriptUtil jsUtil;

	protected CreateAccountGCPPage createAccountGCPPage;
	protected LoginPageGCP loginPageGCP;
	protected EquipmentCreationPage equipmentCreationPage;

	protected WebDriver getDriver() {
		return DriverFactory.getDriver();
	}

	@BeforeClass(alwaysRun = true)
	@Parameters("browser")
	public void setUpClass(@Optional("chrome") String browser) {

		df = new DriverFactory();
		prop = df.initialise_prop();
		prop.setProperty("browser", browser);

		df.initialise_driver(prop);

		waitUtil = new WaitUtil(getDriver(), Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil = new ElementUtil(getDriver());
		jsUtil = new JavaScriptUtil(getDriver());

		jsUtil.normalizeBrowserViewport();
		jsUtil.logViewportMetrics("SESSION_START");

		loginPageGCP = new LoginPageGCP(getDriver());
		createAccountGCPPage = new CreateAccountGCPPage(getDriver());
		equipmentCreationPage = new EquipmentCreationPage(getDriver());
	}

	@AfterSuite(alwaysRun = true)
	public void tearDownSuite() {
		DriverFactory.quitDriver();
	}

}

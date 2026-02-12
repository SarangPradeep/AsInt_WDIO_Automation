package com.qa.gcp.tests;

import org.testng.annotations.Test;
import com.qa.gcp.base.BaseTest;

public class FunctionalGCPTest extends BaseTest {

	@Test(priority = 1)
	public void gcpLoginTest() {
		loginPageGCP.gcpLogin(prop.getProperty("remail").trim(), prop.getProperty("rpass").trim());
		loginPageGCP.gcpLogout();
	}

}

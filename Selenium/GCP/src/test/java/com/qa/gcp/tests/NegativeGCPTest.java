package com.qa.gcp.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.qa.gcp.base.BaseTest;
import com.qa.gcp.constants.Constants;

public class NegativeGCPTest extends BaseTest {

	@Test(priority = 1)
	public void gcpNegativeLoginTest() {
		loginPageGCP.gcpNegativeLoginCheck(prop.getProperty("remail").trim());
		String negativeLoginError = loginPageGCP.gcpNegativeLoginMessage();
		Assert.assertEquals(Constants.GCP_NEGATIVE_LOGIN_ERROR, negativeLoginError);
	}
	
	@Test(priority = 2)
	public void gcpNegativeEquipTest() throws InterruptedException {
		loginPageGCP.gcpLogin(prop.getProperty("remail").trim(),prop.getProperty("rpass").trim());
		equipmentCreationPage.navigateToAdministrator();
		equipmentCreationPage.navigateToEquimentPage();
		equipmentCreationPage.negativeEquipmentCheck();
	}
	
}

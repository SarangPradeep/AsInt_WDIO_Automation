package com.qa.gcp.tests;

import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.qa.gcp.base.BaseTest;
import com.qa.gcp.constants.Constants;

public class RegressionGCPTest extends BaseTest {

	@BeforeClass
	public void gcpLoginTest() throws InterruptedException {
		loginPageGCP.gcpLogin(prop.getProperty("remail").trim(), prop.getProperty("rpass").trim());

	}

	@Test(priority = 1)
	public void createEquipment() {
		equipmentCreationPage.navigateToAdministrator();
		equipmentCreationPage.navigateToEquimentPage();
		equipmentCreationPage.equipmentCreation();
	}

	@Test(priority = 2)
	public void deleteEquipment() {
		String equipmentDeleteMessage = equipmentCreationPage.equipmentDeletion();
		Assert.assertEquals(Constants.GCP_EQUIPMENT_DELETE_MESSAGE, equipmentDeleteMessage);
	}

	

}

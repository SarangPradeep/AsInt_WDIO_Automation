package com.qa.flp.tests;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.qa.flp.base.BaseTest;
import com.qa.flp.constants.Constants;

public class NegativeTest extends BaseTest {

	@BeforeClass
	public void homePageSetup() {
		By popUpCloseBtn = By.xpath("//button[@title='Close Lightbox']");
		try {
			assetInspectionPage.defaultDoLogin(prop.getProperty("username").trim(),
					prop.getProperty("default_password").trim());
			waitUtil.waitForSAPPopupAndClose(popUpCloseBtn, Constants.MAX_TIME_OUT);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	@Test(priority = 1, description = "Navigate to Asset Inspection App")
	public void testNavigateToAssetInspection() {
		assetInspectionPage.navigateToHome();
		assetInspectionPage.navigateToAsIntAISTab();
		assetInspectionPage.openAssetInspectionApp();
	}

	@Test(priority = 2, description = "Verify error when creating Inspection with missing fields")
	public void testCreateInspectionNegative() {
		assetInspectionPage.initiateNewAssessment();
		assetInspectionPage.createInspectionMissingFields();
		String text = assetInspectionPage.verifyErrorMessage();
		Assert.assertEquals(text, Constants.ERROR_MSG);
		assetInspectionPage.cancelBtn();
	}

	@Test(priority = 3, description = "Setup: Open Inspection for Finding Test")
	public void testNavigateToInspectionDetails() {
		assetInspectionPage.navigateToHome();
		assetInspectionPage.navigateToAsIntAISTab();
		assetInspectionPage.openAssetInspectionApp();
		assetInspectionPage.switchToAppFrame();
		assetInspectionPage.navigateToInspectionDetails();
	}

	@Test(priority = 4, description = "Verify error when creating Finding with missing fields")
	public void testCreateFindingNegative() {
		assetInspectionPage.createBasicFinding();
		String text = assetInspectionPage.verifyErrorMessage();
		Assert.assertEquals(text, Constants.ERROR_MSG);
	}
}
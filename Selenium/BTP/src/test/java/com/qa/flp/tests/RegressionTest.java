package com.qa.flp.tests;

import org.openqa.selenium.By;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.qa.flp.base.BaseTest;
import com.qa.flp.constants.Constants;

public class RegressionTest extends BaseTest {

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
	
	@Test(priority = 1, description = "Setup: Navigate to Inspection Findings")
	public void testPrepareForConversion() {
		assetInspectionPage.navigateToAsIntAISTab();
		assetInspectionPage.openAssetInspectionApp();
		assetInspectionPage.switchToAppFrame();
		assetInspectionPage.navigateToInspectionDetails();
	}

	@Test(priority = 2, description = "Convert Finding to Task")
	public void testConvertToTask() {
		assetInspectionPage.convertFindingToTask();
	}

	@Test(priority = 3, description = "Navigate to Asset Inspection App")
	public void testNavigateToAssetInspection() {
		assetInspectionPage.navigateToHome();
		assetInspectionPage.navigateToAsIntAISTab();
		assetInspectionPage.openAssetInspectionApp();
	}

	@Test(priority = 4, description = "Convert Finding to Recommendation")
	public void testConvertToRecommendation() {
		assetInspectionPage.selectFindingTab();
		assetInspectionPage.selectFirstFindingCheckbox();
		assetInspectionPage.convertFindingToRecommendation();
	}

	@Test(priority = 5, description = "Convert Finding to Notification")
	public void testConvertToNotification() {
		assetInspectionPage.selectFirstFindingCheckbox();
		assetInspectionPage.convertFindingToNotification();
	}

	@Test(priority = 6, description = "Delete Inspection Record")
	public void testDeleteInspection() {
		assetInspectionPage.navigateToHome();
		assetInspectionPage.navigateToAsIntAISTab();
		assetInspectionPage.openAssetInspectionApp();
		assetInspectionPage.switchToAppFrame();
		assetInspectionPage.navigateToInspectionDetails();
		assetInspectionPage.deleteInspectionRecord();
	}

}
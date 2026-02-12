package com.qa.flp.tests;

import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.qa.flp.base.BaseTest;
import com.qa.flp.constants.Constants;

public class FunctionalTest extends BaseTest {

	@BeforeClass
	public void setupHomePage() {
		By popUpCloseBtn = By.xpath("//button[@title='Close Lightbox']");
		try {
			assetInspectionPage.defaultDoLogin(prop.getProperty("username").trim(),
					prop.getProperty("default_password").trim());
			waitUtil.waitForSAPPopupAndClose(popUpCloseBtn, Constants.MAX_TIME_OUT);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	@Test(priority = 1, description = "Navigate to AsInt AIS tab")
	public void testNavigateToAsintAIS() {
		assetInspectionPage.navigateToAsIntAISTab();
	}

	@Test(priority = 2, description = "Open Asset Inspection application")
	public void testOpenAssetInspectionApp() {
		assetInspectionPage.openAssetInspectionApp();
	}

	@Test(priority = 3, description = "Initiate new assessment")
	public void testInitiateNewAssessment() {
		assetInspectionPage.initiateNewAssessment();
	}

	@Test(priority = 4, description = "Create Inspection with valid data")
	public void testCreateInspection() {
		assetInspectionPage.createInspection();
		String actualMsg = assetInspectionPage.verifyInspectionSuccessMessage();
		Assert.assertEquals(actualMsg, Constants.OK_BTN_SUCC_MSG);
	}

	@Test(priority = 5, description = "Navigate to Inspection Search")
	public void testNavigateToInspectionSearch() {
		assetInspectionPage.navigateToHome();
		assetInspectionPage.navigateToAsIntAISTab();
		assetInspectionPage.openAssetInspectionApp();
	}

	@Test(priority = 6, description = "Search and Open Inspection Details")
	public void testSearchAndOpenInspectionDetails() {
		assetInspectionPage.searchInspection();
		assetInspectionPage.navigateToInspectionDetails();
	}

	@Test(priority = 7, description = "Edit General Information")
	public void testEditInspectionGeneralInfo() {
		assetInspectionPage.editInspectionDetails();
	}

	@Test(priority = 8, description = "Create Detailed Finding")
	public void testCreateDetailedFinding() {
		assetInspectionPage.createDetailedFinding();
	}

	@Test(priority = 9, description = "Navigate for Attachments")
	public void testNavigateForAttachments() {
		assetInspectionPage.navigateToHome();
		assetInspectionPage.navigateToAsIntAISTab();
		assetInspectionPage.openAssetInspectionApp();
	}

	@Test(priority = 10, description = "Add Attachment to Inspection")
	public void testAddAttachmentToInspection() {
		assetInspectionPage.switchToAppFrame();
		assetInspectionPage.navigateToInspectionDetails();
		assetInspectionPage.addAttachmentToInspection();
		String actualMsg = assetInspectionPage.verifyDocumentSuccessMessage();
		Assert.assertEquals(actualMsg, Constants.DATA_ADDED_SUCC_MSG);
	}

	@Test(priority = 11, description = "Add Link & Upload Document")
	public void testAddDocumentLink() {
		assetInspectionPage.addDocumentLink();
		String actualMsg = assetInspectionPage.verifyDocumentSuccessMessage();
		Assert.assertEquals(actualMsg, Constants.DATA_ADDED_SUCC_MSG);
	}
}
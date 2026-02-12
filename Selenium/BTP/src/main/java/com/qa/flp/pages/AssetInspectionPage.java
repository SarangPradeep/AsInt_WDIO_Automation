package com.qa.flp.pages;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.qa.flp.constants.Constants;
import com.qa.flp.utils.ElementUtil;
import com.qa.flp.utils.JavaScriptUtil;
import com.qa.flp.utils.WaitUtil;

public class AssetInspectionPage {
	private WebDriver driver;
	private ElementUtil eleUtil;
	private WaitUtil waitUtil;
	private JavaScriptUtil jsUtil;

	// --- Locators ---
	private By iframeApp = By.xpath("//iframe[@title='Application']");
	private By busyIndicator = By.className("sapUiLocalBusyIndicator");
	private static final By BLOCK_LAYER = By.id("sap-ui-blocklayer-popup");

	// --- Buttons & Actions ---
	private By btnOK = By.xpath("//button[.//bdi[normalize-space()='OK']]");
	private By btnGo = By.xpath("//button[.//bdi[normalize-space()='Go']]");
	private By btnCreate = By.xpath("//button[.//bdi[normalize-space()='Create']]");
	private By btnSave = By.xpath("//button[.//bdi[text()='Save']]");
	private By btnEdit = By.xpath("//button[.//bdi[text()='Edit']]");
	private By btnCancel = By.xpath("(//button[.//bdi[text()='Cancel']])[1]");
	private By btnDelete = By.xpath("//button[.//bdi[text()='Delete']]");
	private By btnYes = By.xpath("//button[.//bdi[text()='Yes']]");
	private By btnAdd = By.xpath("//button[.//bdi[text()='Add']]");
	private By btnAssign = By.xpath("(//button[.//bdi[text()='Assign']])[1]");
	private By btnConvert = By.xpath("(//button[.//bdi[text()='Convert']])[1]");
	private By btnNewAssessment = By.xpath("//button[@title='New Assessment']");
	private By btnHome = By.xpath("//a[@title='Navigate to Home' and @role='button']");
	private By btnSuccessOK = By.xpath("//button[.//bdi[normalize-space()='OK']]");

	// --- Tabs & Navigation ---
	private By tabFindings = By.xpath("//button[.//bdi[text()='Findings']]");
	private By tabAttachments = By.xpath("//button[.//bdi[text()='Attachments']]");
	private By tabAsIntAIS = By.xpath("//div[@role='tab']//span[text()='AsInt AIS']");
	private By tabFindingsInner = By.xpath("(//div[contains(text(), 'Findings')])[1]");
	private By tileAssetInspection = By.xpath("//a[contains(@aria-label, 'Asset Inspection')]");
	private By btnNavDetails = By
			.xpath("(//tr[.//span[contains(normalize-space(),'Unpublished')]]//span[@title='Navigation'])[1]");

	// --- Inputs: Inspection Creation ---
	private By inputDescription = By.xpath("//label[.//bdi[text()='Description']]/following::input[1]");
	private By inputEquipment = By.xpath("//label[.//bdi[text()='Equipment/Component']]/following::input[1]");
	private By inputEquipSearch = By
			.xpath("//div[@role='dialog'][.//span[contains(text(),'Equipment')]]//input[@type='search']");
	private By btnEquipSearch = By.xpath(
			"//div[@role='dialog'][.//span[contains(text(),'Equipment')]]//input[@type='search']/following-sibling::div[last()]");
	private By rowEquipResult = By.xpath("//div[@role='dialog']//tr[.//span[text()='10000090']]");
	private By inputInspTemplate = By.xpath("//label[.//bdi[text()='Inspection Template']]/following::input[1]");
	private By inputInspType = By.xpath("//label[.//bdi[text()='Inspection Type']]/following::input[1]");
	private By inputStage = By.xpath("//label[.//bdi[text()='Stage']]/following::input[1]");
	private By inputCMLS = By.xpath("//label[.//bdi[text()='Stage']]/following::input[2]");
	private By inputInspDate = By.xpath("//label[.//bdi[text()='Inspection Date']]/following::input[1]");

	// --- Inputs: Finding Creation ---
	private By btnNewFinding = By.xpath("//button[.//bdi[text()='New']]");
	private By btnCreateDialog = By.xpath("//div[@role='dialog']//button[.//bdi[text()='Create']]");
	private By inputFindingName = By.xpath("//label[.//bdi[text()='Finding Name']]/following::input[1]");
	private By inputFindingType = By.xpath("//label[.//bdi[text()='Finding Type']]/following::input[1]");
	private By inputDateRecorded = By.xpath("//label[.//bdi[text()='Date Recorded']]/following::input[1]");
	private By inputAssignFinding = By.xpath("//label[.//bdi[text()='Assign Finding to']]/following::input[1]");
	private By inputDamageClass = By.xpath("//label[.//bdi[text()='Damage Class']]/following::input[1]");
	private By inputDamageType = By.xpath("//label[.//bdi[text()='Damage Type']]/following::input[1]");
	private By inputEnvClass = By.xpath("//label[.//bdi[text()='Environment Classification']]/following::input[1]");
	private By inputEquipDialog = By.xpath("//label[.//bdi[text()='Equipment']]/following::input[1]");
	private By inputEquipSearchDialog = By.xpath("//div[@role='dialog']//input[@placeholder='Search']");
	private By btnEquipSearchDialog = By
			.xpath("//div[@role='dialog']//input[@placeholder='Search']/following-sibling::div[last()]");
	private By switchActive = By.xpath("//label[.//bdi[text()='Active']]/following::div[@role='switch'][1]");

	// --- Search & Filter ---
	private By inputFilterSearch = By.xpath("//div[.//button//bdi[text()='Go']]//input[@placeholder='Search']");

	// --- Conversion: Recommendation/Notification/Task ---
	private By optRecommendation = By.xpath("//li[@role='menuitem']//div[text()='Recommendation']");
	private By optNotification = By.xpath("//li[@role='menuitem']//div[text()='Notification']");
	private By optEquipment = By.xpath("//li[@role='menuitem']//div[text()='Equipment']");
	private By optTask = By.xpath("//div[text()='Task']/ancestor::li[1]");

	private By inputObjectType = By.xpath("//input[@aria-labelledby=//label[.//bdi[text()='Object Type']]/@id]");
	private By inputShortDesc = By.xpath("//input[@aria-labelledby=//label[.//bdi[text()='Short Description']]/@id]");
	private By inputLongDesc = By.xpath("//textarea[@aria-labelledby=//label[.//bdi[text()='Long Description']]/@id]");
	private By inputType = By.xpath("//input[@aria-labelledby=//label[.//bdi[text()='Type']]/@id]");
	private By inputAssessTemplate = By
			.xpath("//input[@aria-labelledby=//label[.//bdi[text()='Assessment Template']]/@id]");
	private By inputReadOnly = By.xpath("(//input[@readonly='readonly'])[1]");

	private By inputNotifType = By.xpath("//input[@aria-labelledby=//label[.//bdi[text()='Type']]/@id]");
	private By inputNotifPriority = By.xpath("//input[@aria-labelledby=//label[.//bdi[text()='Priority']]/@id]");
	private By inputNotifStartDate = By.xpath("//input[@aria-labelledby=//label[.//bdi[text()='Start Date']]/@id]");
	private By inputNotifEndDate = By.xpath("//input[@aria-labelledby=//label[.//bdi[text()='End Date']]/@id]");
	private By radioNotifTypeFirst = By
			.xpath("(//div[@role='dialog'][.//span[text()='Select Notification Type']]//div[@role='radio'])[1]");
	private By radioPrioritySelect = By
			.xpath("(//div[@role='dialog'][.//span[text()='Select Priority']]//div[@role='radio'])[1]");
	private By radioPriorityFirst = By
			.xpath("(//div[@role='radio']//*[local-name()='svg']/*[local-name()='circle'])[2]");

	private By inputTaskPriority = By.xpath("//input[@aria-labelledby=//label[.//bdi[text()='Priority']]/@id]");
	private By inputTaskAssignedTo = By.xpath("//input[@aria-labelledby=//label[.//bdi[text()='Assigned To']]/@id]");
	private By inputTaskDueDate = By.xpath("//input[@aria-labelledby=//label[.//bdi[text()='Due Date']]/@id]");

	// --- Documents & Links ---
	private By optAddLink = By.xpath("//div[text()='Add Link']/ancestor::li[1]");
	private By inputDisplayName = By.xpath("//label[.//bdi[text()='Display Name']]/following::input[1]");
	private By inputLink = By.xpath("//label[.//bdi[text()='Link']]/following::input[1]");
	private By inputPhase = By.xpath("//label[.//bdi[text()='Phase']]/following::input[1]");
	private By inputCategory = By.xpath("//label[.//bdi[text()='Category']]/following::input[1]");
	private By chkDocument = By.xpath("//tr[.//span[text()='DOCU.9695']]//div[@role='checkbox']");

	// --- Messages & Other ---
	private By msgError = By.xpath("//div[@role='alertdialog']//span[text()='Please fill all mandatory fields']");
	private By msgSuccess = By
			.xpath("//div[@role='alertdialog'][.//span[text()='Success']]//section//span[@dir='auto']");
	private By optEquipmentSelect = By.xpath("//div[text()='Equipment']/ancestor::li[1]");
	private By chkNewFinding = By.xpath("(//tr[.//span[contains(normalize-space(),'New')]]//div[@role='checkbox'])[1]");

	// Default Identity Provider Locators
	private By defaultIdentityClick = By.xpath("//a[@class='saml-login-link' and text()='Default Identity Provider']");
	private By defaultIdentityEmailClick = By.xpath("//input[@name='j_username']");
	private By defaultIdentityPassClick = By.xpath("//input[@id='j_password']");
	private By defaultIdentityContinueClick = By.xpath("//button[@id='logOnFormSubmit']");

	public AssetInspectionPage(WebDriver driver) {
		this.driver = driver;
		eleUtil = new ElementUtil(this.driver);
		this.waitUtil = new WaitUtil(driver, Constants.DEFAULT_ELEMENT_TIME_OUT);
		this.jsUtil = new JavaScriptUtil(driver);
	}

	public void switchToAppFrame() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForFrameAndSwitchToIt(iframeApp, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(1));
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
	}

	public String verifyDocumentSuccessMessage() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(1));
		String docuAddSuccMsg = eleUtil.waitForElementPresence(msgSuccess, Constants.DEFAULT_ELEMENT_TIME_OUT)
				.getText();
		System.out.println(Constants.MSG_CALC_SUCCESS + docuAddSuccMsg);
		eleUtil.waitForElementPresence(btnOK, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		System.out.println(Constants.MSG_OK_CLICKED);
		return docuAddSuccMsg;
	}

	public void addDocumentLink() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		WebElement addClick = eleUtil.waitForElementPresence(btnAdd, Constants.DEFAULT_ELEMENT_TIME_OUT);
		try {
			addClick.click();
		} catch (Exception e) {
			System.out.println(Constants.MSG_INTERCEPT_CLICK);
			eleUtil.doClickWithJS(btnAdd);
		}

		System.out.println(Constants.MSG_PLUS_CLICKED);
		eleUtil.waitForElementPresence(optAddLink, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		System.out.println(Constants.MSG_EQUIP_SELECTED);
		eleUtil.robustClearAndType(inputDisplayName, Constants.DISPLAY_INPUT_NAME, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputLink, Constants.LAUNCHPAD_URL, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputPhase, Constants.MAINTENANCE_PHASE, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputCategory, Constants.SPARE_PARTS_CATEGORY, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForElementPresence(btnSave, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
	}

	public void navigateToHome() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(4));
		driver.switchTo().defaultContent();
		eleUtil.doActionsClick(btnHome);
		eleUtil.waitForPageLoad(Constants.DEFAULT_TIME_OUT);
		System.out.println(Constants.MSG_NAV_HOME);
	}

	public String verifyInspectionSuccessMessage() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		String inspectionSuccessMessageText = eleUtil
				.waitForElementPresence(msgSuccess, Constants.DEFAULT_ELEMENT_TIME_OUT).getText();
		System.out.println(Constants.MSG_INSP_SUCCESS + inspectionSuccessMessageText);
		eleUtil.waitForElementPresence(btnSuccessOK, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		System.out.println(Constants.MSG_OK_CLICKED);
		return inspectionSuccessMessageText;
	}

	public void initiateNewAssessment() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		ElementUtil.waitForBlockLayerToDisappear(driver, 10, BLOCK_LAYER);
		eleUtil.waitForFrameAndSwitchToIt(iframeApp, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		ElementUtil.waitForBlockLayerToDisappear(driver, 10, BLOCK_LAYER);
		eleUtil.waitForDuration(Duration.ofSeconds(10));
		WebElement plusButton = eleUtil.waitForElementVisible(btnNewAssessment, Constants.DEFAULT_ELEMENT_TIME_OUT);
		try {
			plusButton.click();
		} catch (Exception e) {
			System.out.println(Constants.MSG_INTERCEPT_CLICK);
			eleUtil.doClickWithJS(btnNewAssessment);
		}
		System.out.println(Constants.MSG_PLUS_CLICKED);
		eleUtil.waitForElementPresence(optEquipmentSelect, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		System.out.println(Constants.MSG_EQUIP_SELECTED);
	}

	public void openAssetInspectionApp() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(tileAssetInspection, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		System.out.println(Constants.MSG_ASSET_INSP_CLICK);
	}

	public void createInspection() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.robustClearAndType(inputDescription, Constants.INSPECTION_DESCRIPTION,
				Constants.DEFAULT_ELEMENT_TIME_OUT);
		System.out.println(Constants.MSG_DESC_ENTERED);
		eleUtil.waitForElementPresence(inputEquipment, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		eleUtil.robustClearAndType(inputEquipSearch, Constants.EQUIPMENT_ID, Constants.DEFAULT_ELEMENT_TIME_OUT);
		System.out.println(Constants.MSG_EQUIP_SEARCHED);
		eleUtil.waitForElementPresence(btnEquipSearch, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(rowEquipResult, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		System.out.println(Constants.MSG_EQUIP_SELECTED);
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.robustClearAndType(inputInspTemplate, Constants.INSPECTION_TEMPLATE,
				Constants.DEFAULT_ELEMENT_TIME_OUT);
		System.out.println(Constants.MSG_INSP_TEMP_SELECTED);
		eleUtil.robustClearAndType(inputInspType, Constants.INSPECTION_TYPE, Constants.DEFAULT_ELEMENT_TIME_OUT);
		System.out.println(Constants.MSG_INSP_TYPE_SELECTED);
		eleUtil.robustClearAndType(inputStage, Constants.INSPECTION_STAGE, Constants.DEFAULT_ELEMENT_TIME_OUT);
		System.out.println(Constants.MSG_STAGE_SELECTED);
		eleUtil.robustClearAndType(inputCMLS, Constants.USER_NAME, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForElementPresence(btnCreate, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
	}

	public void editInspectionDetails() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		System.out.println(Constants.MSG_EDIT_PAGE);
		eleUtil.waitForElementPresence(btnEdit, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.robustClearAndType(inputInspDate, Constants.INSPECTION_DATE, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForElementPresence(btnSave, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
	}

	public void createInspectionMissingFields() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(inputDescription, Constants.DEFAULT_ELEMENT_TIME_OUT)
				.sendKeys(Constants.INSPECTION_DESCRIPTION);
		System.out.println(Constants.MSG_DESC_ENTERED);
		eleUtil.waitForElementPresence(btnCreate, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
	}

	public String verifyErrorMessage() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		String errorMsg = eleUtil.waitForElementPresence(msgError, Constants.DEFAULT_ELEMENT_TIME_OUT).getText();
		System.out.println(Constants.MSG_ERR_MSG + errorMsg);
		eleUtil.waitForElementPresence(btnOK, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		System.out.println(Constants.MSG_OK_CLICKED);
		return errorMsg;
	}

	public void searchInspection() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForFrameAndSwitchToIt(iframeApp, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(1));
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.robustClearAndType(inputFilterSearch, Constants.EQUIPMENT_ID, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForElementPresence(btnGo, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
	}

	public void navigateToInspectionDetails() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnNavDetails, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		System.out.println(Constants.MSG_NAV_DETAILS);
	}

	public void createBasicFinding() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(tabFindings, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnNewFinding, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.robustClearAndType(inputFindingName, Constants.FINDING_NAME, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputFindingType, Constants.FINDING_TYPE, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputDateRecorded, Constants.DATE_RECORDED, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnCreateDialog, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
	}

	public void selectFindingTab() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForFrameAndSwitchToIt(iframeApp, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(tabFindingsInner, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
	}

	public void selectFirstFindingCheckbox() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(10));
		eleUtil.waitForElementPresence(chkNewFinding, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
	}

	public void convertFindingToRecommendation() {
		eleUtil.waitForElementPresence(btnConvert, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		eleUtil.waitForElementPresence(optRecommendation, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.robustClearAndType(inputObjectType, Constants.OBJECT_TYPE_EQUIPMENT,
				Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(2));
		eleUtil.waitForElementPresence(inputReadOnly, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		eleUtil.robustClearAndType(inputEquipSearchDialog, Constants.EQUIPMENT_ID, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForElementPresence(btnEquipSearchDialog, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(rowEquipResult, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.robustClearAndType(inputShortDesc, Constants.SHORT_DESCRIPTION, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputLongDesc, Constants.LONG_DESCRIPTION, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputType, Constants.IMPROVEMENT_TYPE, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputAssessTemplate, Constants.ASSESSMENT_TEMPLATE,
				Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForElementPresence(btnConvert, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnOK, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
	}

	public void convertFindingToNotification() {
		eleUtil.waitForElementPresence(btnConvert, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		eleUtil.waitForElementPresence(optNotification, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		eleUtil.waitForElementPresence(optEquipment, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.robustClearAndType(inputShortDesc, Constants.SHORT_DESCRIPTION, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForElementPresence(inputNotifType, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(radioNotifTypeFirst, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForElementPresence(btnSave, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(inputNotifPriority, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(radioPrioritySelect, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForElementPresence(btnSave, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.robustClearAndType(inputNotifStartDate, Constants.NOTIFICATION_START_DATE,
				Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputNotifEndDate, Constants.NOTIFICATION_END_DATE,
				Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForElementPresence(btnConvert, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnOK, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
	}

	public void cancelBtn() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnCancel, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
	}

	public void convertFindingToTask() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(tabFindings, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(radioPriorityFirst, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForElementPresence(btnCreate, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForElementPresence(optTask, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.robustClearAndType(inputShortDesc, Constants.SHORT_DESCRIPTION, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputLongDesc, Constants.LONG_DESCRIPTION, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputTaskDueDate, Constants.TASK_DUE_DATE, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputTaskPriority, Constants.TASK_PRIORITY_VERY_HIGH,
				Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputTaskAssignedTo, Constants.USER_NAME, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForElementPresence(btnConvert, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnOK, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
	}

	public void createDetailedFinding() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(tabFindings, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnNewFinding, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(switchActive, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.robustClearAndType(inputFindingName, Constants.FINDING_NAME, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputFindingType, Constants.FINDING_TYPE, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputDateRecorded, Constants.DATE_RECORDED, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputAssignFinding, Constants.USER_NAME, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputDamageClass, Constants.DAMAGE_CLASS, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputDamageType, Constants.DAMAGE_TYPE, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.robustClearAndType(inputEnvClass, Constants.ENV_CLASS, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForElementPresence(inputEquipDialog, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.robustClearAndType(inputEquipSearchDialog, Constants.EQUIPMENT_ID, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForElementPresence(btnEquipSearchDialog, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(rowEquipResult, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnCreateDialog, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnOK, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
	}

	public void addAttachmentToInspection() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(tabAttachments, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnAssign, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(chkDocument, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForElementPresence(btnAssign, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
	}

	public void navigateToAsIntAISTab() {
		eleUtil.waitForPageLoad(Constants.MAX_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(tabAsIntAIS, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		System.out.println(Constants.MSG_NAV_ASINT);
	}

	public void deleteInspectionRecord() {
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnDelete, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnYes, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForElementPresence(btnSuccessOK, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
	}

	// Default Identity Provider
	public AssetInspectionPage defaultDoLogin(String un, String pwd) throws InterruptedException {
		eleUtil.waitForElementPresence(defaultIdentityClick, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		System.out.println("login credentials are :" + un + " " + pwd);
		eleUtil.getElement(defaultIdentityEmailClick).sendKeys(un);
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		eleUtil.getElement(defaultIdentityContinueClick).click();
		eleUtil.waitForElementPresence(defaultIdentityPassClick, Constants.DEFAULT_ELEMENT_TIME_OUT).sendKeys(pwd);
		eleUtil.waitForElementPresence(defaultIdentityContinueClick, Constants.DEFAULT_ELEMENT_TIME_OUT).click();
		return new AssetInspectionPage(driver);
	}
}
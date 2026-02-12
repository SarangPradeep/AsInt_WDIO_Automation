package com.qa.flp.pages;

import java.awt.Robot;
import java.awt.event.KeyEvent;
import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.sikuli.script.Screen;

import com.qa.flp.constants.Constants;
import com.qa.flp.utils.DataConduitUtil;
import com.qa.flp.utils.ElementUtil;

public class DataConduit {

	private final WebDriver driver;
	private final ElementUtil eleUtil;
	private final DataConduitUtil dcUtil;
	private final Robot robot;
	private final Screen screen = new Screen();

	// Image identifiers (logical names only)
	private static final String ASINT_TAB = "asint_tab.png";
	private static final String ASINT_CONDUIT_BTN = "asint_data_conduit_tab.png";
	private static final String APM02_BTN = "apm02_btn.png";
	private static final String ASINT_LOGON = "asint_logon.png";
	private static final String FAILED_OK_BTN = "failed_ok_btn.png";
	private static final String ASD_APP = "asd_app.png";
	private static final String ASSESSMENT_BTN = "assessment_btn.png";
	private static final String EQUIPMENT_BTN = "equipment_btn.png";
	private static final String GET_DATA = "get_data.png";
	private static final String NO_DATA = "no_data.png";
	private static final String ASSESSMENT_TAB_FOCUS = "assessment_tab_focus.png";
	private static final String EQUIPMENT_TAB_FOCUS = "equipment_tab_focus.png";
	private static final String ASSESSMENT_ID_HEADER = "assessment_id_header.png";
	private static final String CONFIRM_BTN = "confirm_btn.png";
	private static final String TEMPLATE_DROPDOWN = "template_dropdown.png";
	private static final String EDDS_XOM = "edds_xom.png";
	private static final String SEARCH_SECTION = "search_section.png";
	private static final String CLEAR_SEARCH_FIELD = "clear_search_field.png";
	private static final String CHECKBOX = "checkbox.png";
	private static final String SAVE_BTN = "save_btn.png";
	private static final String USERNAME = "username.png";
	private static final String PASSWORD = "password.png";
	private static final String CONTINUE_BTN = "continue_btn.png";
	private static final String PROCESS_DATA = "process_data.png";
	private static final String OPERATING_PRESSURE = "operating_pressure.png";

	public DataConduit(WebDriver driver) {
		try {
			this.driver = driver;
			eleUtil = new ElementUtil(this.driver);
			this.dcUtil = new DataConduitUtil(driver);
			this.robot = new Robot();
		} catch (Exception e) {
			throw new RuntimeException("Failed to initialize DataConduit page", e);
		}
	}

	public void openExcelFromDesktop() {
		System.out.println(">>> Launching Excel via Robot");

		try {
			// 1. Open Start menu
			robot.keyPress(KeyEvent.VK_WINDOWS);
			robot.keyRelease(KeyEvent.VK_WINDOWS);
			eleUtil.waitForDuration(Duration.ofSeconds(2));

			// 2. Type Excel
			dcUtil.typeTextUsingRobot("Excel");
			eleUtil.waitForDuration(Duration.ofSeconds(1));

			// 3. Launch Excel
			robot.keyPress(KeyEvent.VK_ENTER);
			robot.keyRelease(KeyEvent.VK_ENTER);

			// 4. Wait for Excel app to load
			eleUtil.waitForDuration(Duration.ofSeconds(8));

			// 5. Open Blank Workbook explicitly
			robot.keyPress(KeyEvent.VK_ENTER);
			robot.keyRelease(KeyEvent.VK_ENTER);
			eleUtil.waitForDuration(Duration.ofSeconds(5));

			// 6. Force focus inside Excel grid
			robot.keyPress(KeyEvent.VK_ESCAPE);
			robot.keyRelease(KeyEvent.VK_ESCAPE);

			robot.keyPress(KeyEvent.VK_CONTROL);
			robot.keyPress(KeyEvent.VK_HOME);
			robot.keyRelease(KeyEvent.VK_HOME);
			robot.keyRelease(KeyEvent.VK_CONTROL);

			eleUtil.waitForDuration(Duration.ofSeconds(1));

			// 7. Maximize Excel window (ALT + SPACE → X)
			robot.keyPress(KeyEvent.VK_ALT);
			robot.keyPress(KeyEvent.VK_SPACE);
			robot.keyRelease(KeyEvent.VK_SPACE);
			robot.keyRelease(KeyEvent.VK_ALT);

			eleUtil.waitForDuration(Duration.ofMillis(500));

			robot.keyPress(KeyEvent.VK_X);
			robot.keyRelease(KeyEvent.VK_X);

			eleUtil.waitForDuration(Duration.ofSeconds(2));

			System.out.println("✅ Excel opened, focused, and maximized successfully");

		} catch (Exception e) {
			throw new RuntimeException("Failed to launch and prepare Excel", e);
		}
	}

	private By getData = By.xpath("//span[text()='Get Data']");
	private By busyIndicator = By.className("sapUiLocalBusyIndicator");
	private By apm02 = By.xpath("//span[text()='apm02']");

	public void runDataConduitWorkflow() {
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		System.out.println(">>> Starting Data Conduit workflow");

		dcUtil.clickImageWithPolling(ASINT_TAB, Constants.DEFAULT_ELEMENT_TIME_OUT);
		dcUtil.clickImageWithPolling(ASINT_CONDUIT_BTN, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(10));
		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		dcUtil.clickImageWithPolling(APM02_BTN, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(10));
		// dcUtil.sendKeysSafely(USERNAME, "ragiv.rehmani",
		// Constants.DEFAULT_ELEMENT_TIME_OUT);
		// dcUtil.sendKeysSafely(PASSWORD, "MySecret@123",
		// Constants.DEFAULT_ELEMENT_TIME_OUT);
		// dcUtil.clickSafely("login_button.png", Constants.DEFAULT_ELEMENT_TIME_OUT);

		if (dcUtil.isImageVisible(ASINT_LOGON, 5)) {
			System.out.println(">>> ASINT logon detected, proceeding");
			dcUtil.clickImageWithPolling(ASINT_LOGON, Constants.DEFAULT_ELEMENT_TIME_OUT);
		} else {
			System.out.println(">>> ASINT session already active, skipping logon");
		}

		eleUtil.waitForDuration(Duration.ofSeconds(1));
		if (dcUtil.isImageVisible(FAILED_OK_BTN, 5)) {
			System.out.println(">>> Failed popup detected");
			dcUtil.clickImageWithPolling(FAILED_OK_BTN, Constants.DEFAULT_ELEMENT_TIME_OUT);
		}
		dcUtil.clickImageWithPolling(ASD_APP, Constants.DEFAULT_ELEMENT_TIME_OUT);
		dcUtil.clickImageWithPolling(ASSESSMENT_BTN, Constants.DEFAULT_ELEMENT_TIME_OUT);
		dcUtil.clickImageWithPolling(EQUIPMENT_BTN, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		System.out.println(">>> Waiting for Equipment page state (GET DATA / NO DATA)");
		long startTime = System.currentTimeMillis();
		long maxWaitTime = 60_000; // 60 seconds timeout
		boolean stateResolved = false;

		while (System.currentTimeMillis() - startTime < maxWaitTime) {
			if (dcUtil.isImageVisible(GET_DATA, 5)) {
				System.out.println(">>> GET DATA detected. Proceeding automatically.");
				eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
				dcUtil.clickImageWithPolling(GET_DATA, Constants.DEFAULT_ELEMENT_TIME_OUT);
				stateResolved = true;
				break;
			}

			if (dcUtil.isImageVisible(NO_DATA, 5)) {
				System.out.println(">>> NO DATA detected. Performing right-click + CTRL+R refresh");

				try {
					// Small wait to ensure UI is stable
					eleUtil.waitForDuration(Duration.ofSeconds(1));

					// Right-click at current mouse position
					robot.mousePress(java.awt.event.InputEvent.BUTTON3_DOWN_MASK);
					robot.mouseRelease(java.awt.event.InputEvent.BUTTON3_DOWN_MASK);

					eleUtil.waitForDuration(Duration.ofMillis(500));

					// CTRL + R (refresh)
					robot.keyPress(KeyEvent.VK_CONTROL);
					robot.keyPress(KeyEvent.VK_R);
					robot.keyRelease(KeyEvent.VK_R);
					robot.keyRelease(KeyEvent.VK_CONTROL);

					eleUtil.waitForDuration(Duration.ofSeconds(5));

					stateResolved = true;
					break;

				} catch (Exception e) {
					throw new RuntimeException("Failed to refresh after NO DATA state", e);
				}
			}

			eleUtil.waitForDuration(Duration.ofSeconds(2));
		}

		if (!stateResolved) {
			throw new RuntimeException("Timeout: Neither GET DATA nor NO DATA appeared on Equipment page");
		}

		System.out.println(">>> Data Conduit workflow completed");
	}

	public void selectEquipment(String equipmentValue) {

		eleUtil.waitForBusyIndicatorToDisappear(busyIndicator, Constants.MAX_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(10));

		System.out.println(">>> Selecting equipment in A4: " + equipmentValue);

		try {
			// 1. Click Equipment header to force Excel grid focus
			dcUtil.clickImageWithPolling(ASSESSMENT_ID_HEADER, Constants.DEFAULT_ELEMENT_TIME_OUT);
			eleUtil.waitForDuration(Duration.ofSeconds(1));

			// 2. Go directly to A4
			dcUtil.goToExcelCell("A4");
			eleUtil.waitForDuration(Duration.ofSeconds(1));

			// 3. Edit active cell
			dcUtil.editActiveExcelCell();

			// 4. Type equipment value
			screen.type(equipmentValue);
			eleUtil.waitForDuration(Duration.ofSeconds(1));

			// 5. Commit value
			dcUtil.commitExcelCell();
			eleUtil.waitForDuration(Duration.ofSeconds(1));

			// 6. Confirm
			dcUtil.clickImageWithPolling(CONFIRM_BTN, Constants.DEFAULT_ELEMENT_TIME_OUT);

			System.out.println("✅ Equipment entered into A4 correctly");

		} catch (Exception e) {
			throw new RuntimeException("Failed to select equipment in A4", e);
		}

		eleUtil.waitForDuration(Duration.ofSeconds(1));
	}

	private void waitForManualIntervention() {

		System.out.println("⏸ Automation paused due to NO DATA.");
		System.out.println("👉 Please complete the manual steps in Excel.");
		System.out.println("👉 After finishing, press ENTER in the console to continue...");

		try {
			System.in.read(); // waits for Enter
		} catch (Exception e) {
			throw new RuntimeException("Error while waiting for manual intervention", e);
		}

		System.out.println("▶ Manual steps completed. Resuming automation...");
	}

	public void selectTemplateWithGeneralSelection(String... values) {
		eleUtil.waitForDuration(Duration.ofSeconds(10));
		dcUtil.clickImageWithPolling(TEMPLATE_DROPDOWN, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(1));
		dcUtil.clickImageWithPolling(EDDS_XOM, Constants.DEFAULT_ELEMENT_TIME_OUT);
		eleUtil.waitForDuration(Duration.ofSeconds(5));
		dcUtil.clickImageWithPolling(SEARCH_SECTION, Constants.DEFAULT_ELEMENT_TIME_OUT);
		for (String value : values) {
			screen.type(value);
			dcUtil.clickImageWithPolling(CHECKBOX, Constants.DEFAULT_ELEMENT_TIME_OUT);
			eleUtil.waitForDuration(Duration.ofSeconds(1));
			dcUtil.clickImageWithPolling(CLEAR_SEARCH_FIELD, Constants.DEFAULT_ELEMENT_TIME_OUT);
		}
		dcUtil.clickImageWithPolling(SAVE_BTN, Constants.DEFAULT_ELEMENT_TIME_OUT);
	}

	public void updateCapData() {

	}

	public void updateProcessData() {

	    eleUtil.waitForDuration(Duration.ofSeconds(3));
	    dcUtil.clickImageWithPolling(PROCESS_DATA, Constants.DEFAULT_ELEMENT_TIME_OUT);
	    dcUtil.clickImageWithPolling(OPERATING_PRESSURE, Constants.DEFAULT_ELEMENT_TIME_OUT);
	    dcUtil.goToExcelCell("F10");
	    eleUtil.waitForDuration(Duration.ofSeconds(1));
	    dcUtil.editActiveExcelCell();
	    eleUtil.waitForDuration(Duration.ofSeconds(1));
	    int randomValue = new java.util.Random().nextInt(100) + 1;
	    screen.type(String.valueOf(randomValue));
	    eleUtil.waitForDuration(Duration.ofSeconds(5));
	    dcUtil.commitExcelCell();
	    eleUtil.waitForDuration(Duration.ofSeconds(1));
	    System.out.println("Operating pressure Updated in F10: " + randomValue);
	    dcUtil.clickImageWithPolling(SAVE_BTN, Constants.DEFAULT_ELEMENT_TIME_OUT);
	    eleUtil.waitForDuration(Duration.ofSeconds(2));
	}



}
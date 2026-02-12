package com.qa.flp.utils;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;
import java.io.File;
import java.util.Random;

import org.openqa.selenium.WebDriver;
import org.sikuli.script.FindFailed;
import org.sikuli.script.Pattern;
import org.sikuli.script.Screen;

public class DataConduitUtil {

	private WebDriver driver;
	private Screen screen;
	private Robot robot;
	private String imagePath;
	private Random random;

	public DataConduitUtil(WebDriver driver) {
		this.driver = driver;
		this.screen = new Screen();
		this.random = new Random();

		// ✅ CORRECT image path (src/test/resources/images)
		this.imagePath = System.getProperty("user.dir") + File.separator + "src" + File.separator + "test"
				+ File.separator + "resources" + File.separator + "images" + File.separator;

		// ✅ Fail fast if images folder is missing
		File imgDir = new File(imagePath);
		if (!imgDir.exists()) {
			throw new RuntimeException("❌ Image directory NOT found: " + imagePath);
		}

		System.out.println("✅ DataConduitUtil Image Path: " + imagePath);

		try {
			this.robot = new Robot();
			this.robot.setAutoDelay(40);
		} catch (AWTException e) {
			throw new RuntimeException("❌ Failed to initialize Robot", e);
		}
	}

	// ===================== Sikuli Utilities =====================

	public void clickImageWithPolling(String imageName, int maxWaitSeconds) {

		String fullPath = imagePath + imageName;
		File imageFile = new File(fullPath);

		if (!imageFile.exists()) {
			throw new RuntimeException("❌ Image file does not exist: " + fullPath);
		}

		Pattern pattern = new Pattern(fullPath).similar(0.6);
		long endTime = System.currentTimeMillis() + (maxWaitSeconds * 1000L);

		System.out.println("🔍 Looking for image (max " + maxWaitSeconds + "s): " + imageName);

		while (System.currentTimeMillis() < endTime) {

			if (screen.exists(pattern, 0) != null) {
				try {
					screen.click(pattern);
					System.out.println("✅ Clicked image: " + imageName);
					return;
				} catch (FindFailed e) {
					throw new RuntimeException("❌ Failed to click image: " + imageName, e);
				}
			}

			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				Thread.currentThread().interrupt();
				break;
			}
		}

		throw new RuntimeException("❌ Image not found within " + maxWaitSeconds + " seconds: " + fullPath);
	}

	public void sendKeysSafely(String imageName, String text, int timeout) {

		String fullPath = imagePath + imageName;
		File imageFile = new File(fullPath);

		if (!imageFile.exists()) {
			throw new RuntimeException("❌ Image file does not exist: " + fullPath);
		}

		try {
			Pattern pattern = new Pattern(fullPath).similar(0.6);
			screen.wait(pattern, timeout);
			screen.click(pattern);
			screen.type(text);
		} catch (FindFailed e) {
			throw new RuntimeException("❌ Unable to send keys to image: " + imageName, e);
		}
	}

	public boolean isImageVisible(String imageName, int timeout) {
		String fullPath = imagePath + imageName;
		return screen.exists(fullPath, timeout) != null;
	}

	// ===================== Robot Utilities =====================

	public void typeTextUsingRobot(String text) {
		for (char c : text.toCharArray()) {
			int keyCode = KeyEvent.getExtendedKeyCodeForChar(c);
			if (keyCode == KeyEvent.VK_UNDEFINED) {
				continue;
			}
			robot.keyPress(keyCode);
			robot.keyRelease(keyCode);
			sleep(30);
		}
	}

	public void openExcelGoToDialog() {
		robot.keyPress(KeyEvent.VK_CONTROL);
		robot.keyPress(KeyEvent.VK_G);
		robot.keyRelease(KeyEvent.VK_G);
		robot.keyRelease(KeyEvent.VK_CONTROL);
	}

	public void goToExcelCell(String cellRef) {
		openExcelGoToDialog();
		sleep(500);
		screen.type(cellRef);
		robot.keyPress(KeyEvent.VK_ENTER);
		robot.keyRelease(KeyEvent.VK_ENTER);
	}

	public void editActiveExcelCell() {
		robot.keyPress(KeyEvent.VK_F2);
		robot.keyRelease(KeyEvent.VK_F2);
		sleep(500);
	}

	public void commitExcelCell() {
		robot.keyPress(KeyEvent.VK_ENTER);
		robot.keyRelease(KeyEvent.VK_ENTER);
		sleep(500);
	}

	// ===================== Helpers =====================

	private void sleep(long millis) {
		try {
			Thread.sleep(millis);
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
		}
	}
}

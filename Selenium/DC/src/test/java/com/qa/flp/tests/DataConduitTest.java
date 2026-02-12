package com.qa.flp.tests;

import org.testng.annotations.Test;
import com.qa.flp.base.BaseTest;

public class DataConduitTest extends BaseTest {

	@Test
	public void testAsIntConduit() {

		dataConduit.openExcelFromDesktop();
		dataConduit.runDataConduitWorkflow();
		dataConduit.selectEquipment("ASDA.5596");
		dataConduit.selectTemplateWithGeneralSelection("Cracking Cap", "Process Data", "Cap Data", "EDD-2A (Upstream)");
	}
}

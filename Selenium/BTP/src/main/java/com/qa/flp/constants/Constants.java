package com.qa.flp.constants;

import java.util.Arrays;
import java.util.List;

public class Constants {
	public static final int DEFAULT_ELEMENT_TIME_OUT = 60;
	public static final int DEFAULT_TIME_OUT = 30;
	public static final int DEFAULT_POLLING_TIME_OUT = 10;
	public static final String SUCC_MSG_TEXT = null;
	public static final int MAX_TIME_OUT = 120;
	
	// BTP
	// --- General Inputs ---
	public static final String DISPLAY_INPUT_NAME = "ASINT";
	public static final String USER_NAME = "Gyanendra Tiwari";
	public static final String LAUNCHPAD_URL = "https://dev-n-1-d-us10-aws-zv2ieu8z.launchpad.cfapps.us10.hana.ondemand.com/";

	// --- Equipment & Assets ---
	public static final String EQUIPMENT_ID = "10000090";
	public static final String OBJECT_TYPE_EQUIPMENT = "Equipment";
	public static final String OK_BTN_SUCC_MSG = "Inspection created successfully";

	// --- Inspection Data ---
	public static final String INSPECTION_DESCRIPTION = "SOUR WATER";
	public static final String INSPECTION_TEMPLATE = "External Inspection Template TE";
	public static final String INSPECTION_TYPE = "Other";
	public static final String INSPECTION_STAGE = "NDE Scoping";
	public static final String ERROR_MSG = "Please fill all mandatory fields";
	public static final String DATA_ADDED_SUCC_MSG = "Document(s) added successfully.";

	// --- Document & Maintenance ---
	public static final String MAINTENANCE_PHASE = "Maintenance";
	public static final String SPARE_PARTS_CATEGORY = "Spare Parts";

	// --- Findings Data ---
	public static final String FINDING_NAME = "Automation Testing";
	public static final String FINDING_TYPE = "testing";
	public static final String DAMAGE_CLASS = "Minor degradation";
	public static final String DAMAGE_TYPE = "Mechanical Damage";
	public static final String ENV_CLASS = "C5";

	// --- Task & Notification Conversion ---
	public static final String SHORT_DESCRIPTION = "Testing Short Desc";
	public static final String LONG_DESCRIPTION = "Testing Long Desc";
	public static final String IMPROVEMENT_TYPE = "Improvement";
	public static final String ASSESSMENT_TEMPLATE = "Regulatory / Legal";
	public static final String TASK_PRIORITY_VERY_HIGH = "1: Very high";

	// --- Dates ---
	public static final String INSPECTION_DATE = "Dec 12, 2025";
	public static final String DATE_RECORDED = "Dec 16, 2025";
	public static final String NOTIFICATION_START_DATE = "Dec 13, 2025";
	public static final String NOTIFICATION_END_DATE = "Dec 13, 2026";
	public static final String TASK_DUE_DATE = "Dec 13, 2026";

	// --- Console Messages (Hidden Strings) ---
	public static final String MSG_CALC_SUCCESS = "Calculated Success Message: ";
	public static final String MSG_OK_CLICKED = "OK Button Clicked";
	public static final String MSG_PLUS_CLICKED = "Plus Icon Clicked";
	public static final String MSG_EQUIP_SELECTED = "Equipment Selected";
	public static final String MSG_NAV_HOME = "Navigated to SAP Home Page";
	public static final String MSG_INSP_SUCCESS = "Inspection Creation Success Message: ";
	public static final String MSG_ASSET_INSP_CLICK = "Asset Inspection Clicked";
	public static final String MSG_DESC_ENTERED = "Description Entered";
	public static final String MSG_EQUIP_SEARCHED = "Equipment Searched";
	public static final String MSG_INSP_TEMP_SELECTED = "Inspection Template Selected";
	public static final String MSG_INSP_TYPE_SELECTED = "Inspection Type Selected";
	public static final String MSG_STAGE_SELECTED = "Stage Input Selected";
	public static final String MSG_EDIT_PAGE = "Editing General Information Page: ";
	public static final String MSG_ERR_MSG = "Error Message: ";
	public static final String MSG_NAV_DETAILS = "Navigated to details page";
	public static final String MSG_NAV_ASINT = "Navigated to Asint AIS";
	public static final String MSG_INTERCEPT_CLICK = "Standard click intercepted. Attempting JS Click on Plus Icon...";
	
}

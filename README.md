# AsInt QA Automation Tool Selection Proof-of-concept

We are pitting Java with Selenium vs JS/TS with WDIO for autmating all test types for each of our applications.

## Target Test Types
 - Functional Tests

    One basic functionality in the first view of the application. Is the click of a create button working fully.
 - Regression Tests

    One test that covers functionality across two applications.
 - Environmental Tests
    
    Use the functional test and execute it across two browsers.
 - Negative Tests
    
    Create a error scenario for the same functional test.

## Target Application Types
 - **SAP BTP Applications**, developed using SAP UI5 following SAP Fiori design guidelines running on SAP Cloud Foundry.
   - Example: Asset Inspection in APM-01
 - **Edge Applications**, developed using VueJS, containerized using Docker running on Google Cloud Run.
   - Example: Digital Wall Chart in asint-digital-wall-chart project
 - **Mobile Applications**, written in Flutter to support both Android and iOS.
   - Example: IntelliSuite target the inspection functions.
 - **Excel Add-In Applications**, written in SAP UI5 running as a Javascript based Excel Add-In.
   - Example: Data Conduit 
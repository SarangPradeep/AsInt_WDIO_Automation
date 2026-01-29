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

## Progress Sheet

### Test Type Progress
<table>
  <col>
  <colgroup span="4"></colgroup>
  <colgroup span="4"></colgroup>
  <tr>
    <th rowspan="2">Test Type</th>
    <th colspan="4" scope="colgroup">Selenium</th>
    <th colspan="4" scope="colgroup">WDIO</th>
  </tr>
  <tr>
    <th scope="col">BTP</th>
    <th scope="col">Edge</th>
    <th scope="col">Mobile</th>
    <th scope="col">Excel Add-In</th>
    <th scope="col">BTP</th>
    <th scope="col">Edge</th>
    <th scope="col">Mobile</th>
    <th scope="col">Excel Add-In</th>
  </tr>
  <tr>
    <th scope="row">Functional Tests</th>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td style="color: green;">✓</td>
    <td style="color: green;">✓</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <th scope="row">Regression Tests</th>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <th scope="row">Environmental Tests</th>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>N/A</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>N/A</td>
    <!-- <td style="color: red;">✗</td> -->
  </tr>
  <tr>
    <th scope="row">Negative Tests</th>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td style="color: green;">✓</td>
    <td>-</td>
    <td>-</td>
  </tr>
</table>

### Automation Progress

<table>
  <col>
  <colgroup span="2"></colgroup>
  <colgroup span="2"></colgroup>
  <tr>
    <th rowspan="2">Test Type</th>
    <th colspan="2" scope="colgroup">Selenium</th>
    <th colspan="2" scope="colgroup">WDIO</th>
  </tr>
  <tr>
    <th scope="col">Headless Mode</th>
    <th scope="col">GH Actions</th>
    <th scope="col">Headless Mode</th>
    <th scope="col">GH Actions</th>
  </tr>
  <tr>
    <th scope="row">Functional Tests</th>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <th scope="row">Regression Tests</th>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <th scope="row">Environmental Tests</th>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <th scope="row">Negative Tests</th>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
</table>

*PS: Only BTP and Edge applications will be GH Actions*
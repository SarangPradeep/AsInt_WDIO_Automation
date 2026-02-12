export const config: WebdriverIO.Config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        // Running all tests in this directory
        './test/specs/BTP_Applications_Tests/**/*.ts'
        // './test/specs/BTP_Applications_Tests/Negative_tests/fixedAIPNegative.e2e.ts'
        // './test/specs/BTP_Applications_Tests/Functional_tests/fixedAIP.e2e.ts'
        // './test/specs/BTP_Applications_Tests/Functional_tests/btpLogin.e2e.ts'
        // './test/specs/BTP_Applications_Tests/Negative_tests/btpLoginNegative.e2e.ts'
        //  './test/specs/BTP_Applications_Tests/Functional_tests/Home.e2e.ts'
        // './test/specs/BTP_Applications_Tests/Regression_tests/assetInspectionRegretionTest.e2e.ts'
    
    ],
    exclude: [],

    //
    // ============
    // Capabilities
    // ============
    // Reduced maxInstances from 10 to 3 to prevent resource contention
    // which often causes "all tests fail" scenarios in parallel.
    maxInstances: 3,

    capabilities: [
    //     {
    //     browserName: 'chrome',
    //     // 'goog:chromeOptions': {
    //     //     args: [
    //     //         '--headless=new',
    //     //         '--disable-gpu',
    //     //         '--window-size=1920,1080',
    //     //         '--no-sandbox',
    //     //         '--disable-dev-shm-usage'
    //     //     ]
    //     // }
    // },
        {
            browserName: 'MicrosoftEdge',
            'ms:edgeOptions': {
                args: [
                    '--headless=new',
                    '--disable-gpu',
                    '--window-size=1920,1080',
                    '--no-sandbox',
                    '--disable-dev-shm-usage'
                ]
            }
        }
    ],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    
    // Increased timeouts to account for slower execution when 
    // multiple browsers are competing for CPU/Network.
    waitforTimeout: 20000, 
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['visual'],

    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        // Increased from 60s to 90s to prevent flaky timeouts
        timeout: 90000 
    },

    // =====
    // Hooks
    // =====
    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     */
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
}
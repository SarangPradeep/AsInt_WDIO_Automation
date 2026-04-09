import * as dotenv from 'dotenv'
import allureReporter from '@wdio/allure-reporter';
import * as fs from 'fs';
import * as path from 'path';
import { loginToSAP } from './utils/login.helper';
import utils from './utils/utils';

dotenv.config();

const downloadDir = path.resolve(process.cwd(), 'downloads');
const isHeadless = process.env.CI === 'true' || process.argv.includes('--headless');


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

        './functional_location/functional_location.e2e.ts',
         './equipment/equipment.e2e.ts',
        './configuration/**/*.e2e.ts',
        './safety_group/safety.e2e.ts'
    
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
        // {
        //         browserName: 'MicrosoftEdge',
        //         'ms:edgeOptions': {
        //             args: isHeadless ? ['--headless', '--disable-gpu', '--no-sandbox', '--window-size=1920,1080'] : []
        //         }
        //     },
            // {
            //     browserName: 'chrome',
            //     'goog:chromeOptions': {
            //         args: isHeadless ? ['--headless', '--disable-gpu', '--no-sandbox', '--window-size=1920,1080'] : []
            //     }
            // },
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                prefs: {
                    'download.default_directory': downloadDir,
                    'download.prompt_for_download': false,
                    'download.directory_upgrade': true,
                    'plugins.always_open_pdf_externally': true
                },
                args: isHeadless ? ['--headless', '--disable-gpu', '--no-sandbox', '--window-size=1920,1080'] : []
            }
        }
    ],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    logLevels: {
        webdriver: 'silent',
        '@wdio/mocha-framework': 'info'
    },

    bail: 0,  // stop execution after ' ' failure(S)
    
    // Increased timeouts to account for slower execution when 
    // multiple browsers are competing for CPU/Network.
    waitforTimeout: 60000, 
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,

    services: [],
    automationProtocol: 'webdriver',

    framework: 'mocha',
    reporters: [
        ['spec', {
            outputDir: './test-results',
            outputFileFormat: function (options: any) {
            const browserName = options.capabilities.browserName || 'unknown';
            return `${browserName}/results-${new Date().getTime()}.txt`
            }
        }],
        ['allure', {
            outputDir: 'allure-results',
            useCucumberStepReporter: false,
            disableWebdriverStepsReporting: true,
            addExecutorInfo: true,
        }],
        ['timeline', {
            outputDir: './timeline-report',
            embedImages: true
        }]
        ],
    mochaOpts: {
        ui: 'bdd',
        // Increased from 60s to 90s to prevent flaky timeouts
        timeout: 180000 ,
        reporter: 'spec'
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */

    onPrepare: function (config, capabilities) {
        // Clean old Allure results
        const allureResultsDir = './allure-results';
        if (fs.existsSync(allureResultsDir)) {
            fs.rmSync(allureResultsDir, { recursive: true, force: true });
            console.log('✓ Cleaned old allure-results');
        }
        
        // Clean old Allure report (optional)
        const allureReportDir = './allure-report';
        if (fs.existsSync(allureReportDir)) {
            fs.rmSync(allureReportDir, { recursive: true, force: true });
            console.log('✓ Cleaned old allure-report');
        }
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialize specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {string} cid      capability id (e.g 0-0)
     * @param  {object} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {object} specs    specs to be run in the worker process
     * @param  {object} args     object that will be merged with the main configuration once worker is initialized
     * @param  {object} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just after a worker process has exited.
     * @param  {string} cid      capability id (e.g 0-0)
     * @param  {number} exitCode 0 - success, 1 - fail
     * @param  {object} specs    specs to be run in the worker process
     * @param  {number} retries  number of retries used
     */
    // onWorkerEnd: function (cid, exitCode, specs, retries) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     * @param {string} cid worker id (e.g. 0-0)
     */
    // beforeSession: function (config, capabilities, specs, cid) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {object}         browser      instance of created browser/device session
     */

    
    before: async function (capabilities) {
        // Add browser information to Allure report
        const browserName = (capabilities as any).browserName || 'unknown';
        // Add browser as feature tag for grouping in Allure
        allureReporter.addFeature(`Browser: ${browserName}`);
        if (!isHeadless) {
        await browser.maximizeWindow();
    };
    },

    
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {string} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {object} suite suite details
     */
    beforeSuite: async function (suite) {
        console.log(`Starting suite: ${suite.title}`);
        await utils.createDownloadDir();
        await utils.cleanDownloads();
        await loginToSAP();
        const browserName = (browser.capabilities as any).browserName || 'unknown';
        // Add browser name to suite title for clear identification
        suite.title = `[${browserName}] ${suite.title}`;
        allureReporter.addEpic(browserName);
    },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: function (test) {
        const browserName = (browser.capabilities as any).browserName || 'unknown';
        allureReporter.addLabel('browser', browserName);
        allureReporter.addLabel('tag', browserName);
        allureReporter.addStory(`Browser: ${browserName}`);
    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context, hookName) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {object}  test             test object
     * @param {object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {*}       result.result    return object of test function
     * @param {number}  result.duration  duration of test
     * @param {boolean} result.passed    true if test has passed, otherwise false
     * @param {object}  result.retries   information about spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    // afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    //     if (!passed) {
    //         await browser.takeScreenshot();
    //     }
    // },_test, _
    afterTest: async function (test, context, { passed }) {
        if (!passed) {
            const screenshot = await browser.takeScreenshot();
            allureReporter.addAttachment(
                'Failure Screenshot',
                Buffer.from(screenshot, 'base64'),
                'image/png'
            );
        }
    },

    

    /**
     * Hook that gets executed after the suite has ended
     * @param {object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {string} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {number} result 0 - command success, 1 - command error
     * @param {object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {object} exitCode 0 - success, 1 - fail
     * @param {object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
    * Gets executed when a refresh happens.
    * @param {string} oldSessionId session ID of the old session
    * @param {string} newSessionId session ID of the new session
    */
    // onReload: function(oldSessionId, newSessionId) {
    // }
    /**
    * Hook that gets executed before a WebdriverIO assertion happens.
    * @param {object} params information about the assertion to be executed
    */
    // beforeAssertion: function(params) {
    // }
    /**
    * Hook that gets executed after a WebdriverIO assertion happened.
    * @param {object} params information about the assertion that was executed, including its results
    */
    // afterAssertion: function(params) {
    // }

}
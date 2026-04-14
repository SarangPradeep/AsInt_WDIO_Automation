import * as dotenv from 'dotenv'
import allureReporter from '@wdio/allure-reporter';
import * as fs from 'fs';
import * as path from 'path';
import { loginToSAP } from './utils/login.helper';
import utils from './utils/utils';

if (!process.env.CI) {
  dotenv.config();
}
const downloadDir = path.resolve(process.cwd(), 'downloads');
const isHeadless = process.env.CI === 'true' || process.argv.includes('--headless');

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    specs: [

        './functional_location/functional_location.e2e.ts',
        './equipment/equipment.e2e.ts',
        './configuration/**/*.e2e.ts',
        './safety_group/safety.e2e.ts'
    
    ],
    exclude: [],
    maxInstances: 3,

    capabilities: [
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
    logLevel: 'info',
    logLevels: {
        webdriver: 'silent',
        '@wdio/mocha-framework': 'info'
    },

    bail: 0, 
    waitforTimeout: 60000, 
    connectionRetryTimeout: 180000,
    connectionRetryCount: 3,

    services: [],
    automationProtocol: 'webdriver',

    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            useCucumberStepReporter: false,
            disableWebdriverStepsReporting: true,
            addExecutorInfo: true,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 180000 ,
        reporter: 'spec'
    },
    onPrepare: function (config, capabilities) {
        const allureResultsDir = './allure-results';
        if (fs.existsSync(allureResultsDir)) {
            fs.rmSync(allureResultsDir, { recursive: true, force: true });
            console.log('✓ Cleaned old allure-results');
        }
        const allureReportDir = './allure-report';
        if (fs.existsSync(allureReportDir)) {
            fs.rmSync(allureReportDir, { recursive: true, force: true });
            console.log('✓ Cleaned old allure-report');
        }
    },

    before: async function (capabilities) {
        const browserName = (capabilities as any).browserName || 'unknown';
        allureReporter.addFeature(`Browser: ${browserName}`);
        if (!isHeadless) {
        await browser.maximizeWindow();
    };
    },

    beforeSuite: async function (suite) {
        console.log(`Starting suite: ${suite.title}`);
        await utils.createDownloadDir();
        await utils.cleanDownloads();
        await loginToSAP();
        const browserName = (browser.capabilities as any).browserName || 'unknown';
        suite.title = `[${browserName}] ${suite.title}`;
        allureReporter.addEpic(browserName);
    },

    beforeTest: function (test) {
        const browserName = (browser.capabilities as any).browserName || 'unknown';
        allureReporter.addLabel('browser', browserName);
        allureReporter.addLabel('tag', browserName);
        allureReporter.addStory(`Browser: ${browserName}`);
    },

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
}
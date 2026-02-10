import { browser, $ } from '@wdio/globals';

/**
 * Base Page Object class that provides access to browser and selector methods
 */
export class BasePage {
    protected browser = browser;
    protected $ = $;
}

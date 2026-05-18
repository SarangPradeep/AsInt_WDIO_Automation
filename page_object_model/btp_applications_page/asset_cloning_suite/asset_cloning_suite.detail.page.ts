import { browser } from '@wdio/globals';
import utils from 'utils/utils';

class AssetCloningSuiteDetailPage {
	private get backButton() {
		return $(
			"//button[@aria-label='Back' or @title='Back'] | //a[@aria-label='Back' or @title='Back']"
		);
	}

	private listHeaderByPrefix(prefix: string) {
		const text = utils.xpathString(prefix);
		return $(
			`//*[self::span or self::h1 or self::h2 or self::bdi][starts-with(normalize-space(), ${text})]`
		);
	}

	private labelByText(text: string) {
		const label = utils.xpathString(text);
		return $(
			`//*[self::label or self::span or self::bdi][normalize-space()=${label}]`
		);
	}

	private async waitForHeaderPrefix(prefix: string): Promise<void> {
		const header = this.listHeaderByPrefix(prefix);
		await header.waitForDisplayed({ timeout: 60000 });
	}

	private async waitForLabel(text: string): Promise<void> {
		const label = this.labelByText(text);
		await label.waitForDisplayed({ timeout: 60000 });
	}

	public async verifyAssetStrategyAssessmentsList(): Promise<void> {
		await utils.waitForBusyIndicatorToDisappear();
		await this.waitForLabel('Equipment Description');
	}

	public async verifyAssetRCMAnalysisList(): Promise<void> {
		await utils.waitForBusyIndicatorToDisappear();
		await this.waitForHeaderPrefix('Asset RCM Analysis');
	}

	public async verifyAssetStrategyAnalysisForClassesList(): Promise<void> {
		await utils.waitForBusyIndicatorToDisappear();
		await this.waitForHeaderPrefix('Asset Strategy Analysis for Classes');
	}

	public async verifyRiskAndCriticalityAssessmentsList(): Promise<void> {
		await utils.waitForBusyIndicatorToDisappear();
		await this.waitForHeaderPrefix('Risk and Criticality Assessments');
	}

	public async verifyAssetCloningTemplatesList(): Promise<void> {
		await utils.waitForBusyIndicatorToDisappear();
		await this.waitForLabel('Task description');
	}

	public async navigateBackToCards(): Promise<void> {
		await utils.waitForBusyIndicatorToDisappear();

		const tryClickBack = async (): Promise<boolean> => {
			const btn = await this.backButton;
			if (await btn.isDisplayed().catch(() => false)) {
				await utils.clickWithWait(btn);
				return true;
			}
			return false;
		};

		if (!(await tryClickBack())) {
			await browser.switchFrame(null);
			const clicked = await tryClickBack();
			if (!clicked) {
				throw new Error('Back button not found to return to cards page');
			}
		}
		await utils.waitForBusyIndicatorToDisappear();
	}
}

export default new AssetCloningSuiteDetailPage();

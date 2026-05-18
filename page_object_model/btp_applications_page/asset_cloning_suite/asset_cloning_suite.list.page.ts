import { browser } from '@wdio/globals';
import HomePage from '../home.page';
import utils from 'utils/utils';
import assetCloningSuiteDetailPage from './asset_cloning_suite.detail.page';

class AssetCloningSuiteListPage {
	private get appTile() { return $("//a[contains(@aria-label, 'Asset Cloning Suite')]"); }
	private get appIframe() { return $('iframe[data-help-id="application-cloneapp-manage"]'); }

	private tileByName(tileName: string) {
		const label = utils.xpathString(tileName);
		return $(
			`(//*[self::span or self::bdi][normalize-space()=${label}])[1]/ancestor::*[(self::a or self::button or @role='button' or @role='link')][1] | (//*[self::span or self::bdi][normalize-space()=${label}])[1]`
		);
	}

	private get cardsReadyTile() {
		return this.tileByName('Asset Strategy Assessments');
	}

	private async switchToCloneAppFrame(): Promise<void> {
		await utils.switchToIframe(this.appIframe);
	}

	private async waitForCardsView(): Promise<void> {
		await this.cardsReadyTile.waitForDisplayed({ timeout: 60000 });
	}

	private async clickCardAndVerify(tileName: string, verifyFn: () => Promise<void>): Promise<void> {
		console.log(`Clicking on card: ${tileName}`);
        await utils.waitForBusyIndicatorToDisappear();
		await this.switchToCloneAppFrame();
		const tile = await this.tileByName(tileName);
		await tile.waitForDisplayed({ timeout: 60000 });
		await utils.clickWithWait(tile);
        console.log(`Clicked on card: ${tileName}, now verifying...`);
		await utils.waitForBusyIndicatorToDisappear();
		// await verifyFn();
        console.log(`Verification completed for card: ${tileName}, now navigating back...`);
		await assetCloningSuiteDetailPage.navigateBackToCards();
        console.log(`Navigated back to all application page from card: ${tileName}`);
		await utils.waitForBusyIndicatorToDisappear();
		await this.switchToCloneAppFrame();
		// await this.waitForCardsView();
	}

	public async openAssetCloningSuiteCards(): Promise<void> {
		await HomePage.waitForHomePageToLoad();
		await utils.waitForSAPPopupAndClose();
		await utils.clickWithWait(this.appTile);
		await utils.waitForBusyIndicatorToDisappear();
		await utils.waitForSAPPopupAndClose();
		await this.switchToCloneAppFrame();
		// await this.waitForCardsView();
		await browser.pause(1000);
	}

	public async openAssetStrategyAssessmentsCard(): Promise<void> {
		await this.clickCardAndVerify(
			'Asset Strategy Assessments',
			() => assetCloningSuiteDetailPage.verifyAssetStrategyAssessmentsList()
		);
	}

	public async openAssetRCMAnalysisCard(): Promise<void> {
		await this.clickCardAndVerify(
			'Asset RCM Analysis',
			() => assetCloningSuiteDetailPage.verifyAssetRCMAnalysisList()
		);
	}

	public async openAssetStrategyAnalysisForClassesCard(): Promise<void> {
		await this.clickCardAndVerify(
			'Asset Strategy Analysis for Classes',
			() => assetCloningSuiteDetailPage.verifyAssetStrategyAnalysisForClassesList()
		);
	}

	public async openRiskAndCriticalityAssessmentsCard(): Promise<void> {
		await this.clickCardAndVerify(
			'Risk and Criticality Assessments',
			() => assetCloningSuiteDetailPage.verifyRiskAndCriticalityAssessmentsList()
		);
	}

	public async openAssetCloningTemplatesCard(): Promise<void> {
		await this.clickCardAndVerify(
			'Asset Cloning Templates',
			() => assetCloningSuiteDetailPage.verifyAssetCloningTemplatesList()
		);
	}
}

export default new AssetCloningSuiteListPage();

import { CursorItem, FeatureType } from "./types";

chrome.action.onClicked.addListener(() => {
	const absoluteUrl = chrome.runtime.getURL("dist/index.html");
	chrome.tabs.create({ url: absoluteUrl });
});

chrome.runtime.onMessage.addListener(
	async (item: CursorItem, sender, sendResponse: Function) => {
		switch (item.featureType) {
			case FeatureType.Capture:
				setTimeout(async () => {
					try {
						const captureDataUrl = await captureCurrentTab();
						chrome.tabs.create({ url: captureDataUrl });

						sendResponse({
							status: "Capture successful",
							dataUrl: captureDataUrl,
						});
					} catch (error: any) {
						console.error(
							"Failed to capture the current tab:",
							error
						);
						sendResponse({
							status: "Capture failed",
							error: error.message,
						});
					}
				}, 1);

				break;
			case FeatureType.HistoryBack:
				chrome.tabs.executeScript({ code: "window.history.back();" });
				break;
			case FeatureType.HistoryForward:
				chrome.tabs.executeScript({
					code: "window.history.forward();",
				});
				break;
			case FeatureType.NewEmptyTab:
				chrome.tabs.create({ url: "chrome://newtab" });
				break;
			case FeatureType.UndoCloseTab:
				chrome.sessions.restore();
				break;
			case FeatureType.Link:
				chrome.tabs.create({
					url: item.url,
				});
				break;
		}
	}
);

async function captureCurrentTab(): Promise<string> {
	return new Promise((resolve, reject) => {
		chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
			if (chrome.runtime.lastError || !dataUrl) {
				reject(
					new Error(
						chrome.runtime.lastError?.message || "Capture failed"
					)
				);
			} else {
				resolve(dataUrl);
			}
		});
	});
}

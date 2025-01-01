import { CursorItem, FeatureType } from "./types";

chrome.action.onClicked.addListener(() => {
	const absoluteUrl = chrome.runtime.getURL("dist/index.html");
	chrome.tabs.create({ url: absoluteUrl });
});

chrome.runtime.onMessage.addListener(
	(item: CursorItem, sender, sendResponse: Function) => {
		if (item.featureType === FeatureType.Capture) {
		} else if (item.featureType === FeatureType.HistoryBack) {
			chrome.tabs.executeScript({ code: "window.history.back()" });
		} else if (item.featureType === FeatureType.HistoryForward) {
			chrome.tabs.executeScript({ code: "window.history.forward()" });
		} else if (item.featureType === FeatureType.NewEmptyTab) {
			chrome.tabs.create({ url: "chrome://newtab" });
		} else if (item.featureType === FeatureType.UndoCloseTab) {
			chrome.sessions.restore();
		} else if (item.featureType === FeatureType.Link) {
			chrome.tabs.create({
				url: item.url,
			});
		}
	}
);

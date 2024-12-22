chrome.action.onClicked.addListener(() => {
	const absoluteUrl = chrome.runtime.getURL("dist/index.html");
	chrome.tabs.create({ url: absoluteUrl });
});

export class CursorItem {
	name?: string;
	callback: Function = () => {};
	constructor(callback: Function, name?: string) {
		this.name = name;
		this.callback = callback;
	}
}

export class LinkItem extends CursorItem {
	constructor(url: string, name?: string) {
		super(() => {
			chrome.tabs.create({
				url: url,
			});
		}, name);
	}
}

export const defaultItems = {
	//closeTab: new CursorItem(() => {}, "closeTab"),
	HistoryBack: new CursorItem(() => {
		chrome.tabs.executeScript({ code: "window.history.back()" });
	}, "HistoryBack"),
	HistoryForward: new CursorItem(() => {
		chrome.tabs.executeScript({ code: "window.history.forward()" });
	}, "HistoryForward"),
	NewEmptyTab: new CursorItem(() => {
		chrome.tabs.create({ url: "chrome://newtab" });
	}, "NewEmptyTab"),
	UndoCloseTab: new CursorItem(() => {
		chrome.sessions.restore();
	}, "UndoCloseTab"),
};

export const featureTypeMap = {
	Link: "Link",
	Forward: "Forward",
	Backward: "Backward",
};

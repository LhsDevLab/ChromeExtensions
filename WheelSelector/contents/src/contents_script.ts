import { MouseWheelSelector } from "@lhs7/wheel-selector";
import { loadList } from "./utils/chromeUtil";
import { CursorItem } from "./types";

let wheelSelector = new MouseWheelSelector({
	items: [],
	activateKey: "Escape",
});
function load() {
	loadList().then((items: CursorItem[]) => {
		items = items.map((item: CursorItem) => {
			return {
				name: item.name,
				callback: () => {
					chrome.runtime.sendMessage(item);
				},
			};
		});

		wheelSelector.updateItems(items as any);
	});
}

load();

chrome.storage.onChanged.addListener(load);

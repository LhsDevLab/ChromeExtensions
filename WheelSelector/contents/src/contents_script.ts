import { MouseWheelSelector, SelectorItem } from "@lhs7/wheel-selector";
import { loadList } from "./utils/chromeUtil";
let wheelSelector = new MouseWheelSelector({
	items: [],
	activateKey: "Escape",
	theme: {
		defaultColor: "rgba(0, 0, 0, 0.8)",
	},
});
function load() {
	loadList().then((items: SelectorItem[]) => {
		items = items.map((item: SelectorItem) => {
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

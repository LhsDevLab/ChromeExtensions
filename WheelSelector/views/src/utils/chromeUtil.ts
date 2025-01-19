import { SelectorItem } from "@lhs7/wheel-selector";

export async function loadList() {
	const res = await chrome.storage.local.get("featureList");
	if (res.featureList === undefined) {
		await chrome.storage.local.set({ featureList: [] });
	}
	return res.featureList;
}

export async function saveList(list: SelectorItem[]) {
	const res = await chrome.storage.local.set({ featureList: list });
	return res;
}

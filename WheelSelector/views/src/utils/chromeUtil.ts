import { CursorItem } from "../types/CursorItem";

export function loadStorage() {
	let res: CursorItem[] = [];
	chrome.storage.local.get("featureList", (featureList: any) => {
		res = featureList ?? [];
	});
	return res;
}

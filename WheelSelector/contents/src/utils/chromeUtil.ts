export async function loadList() {
	const res = await chrome.storage.local.get("featureList");
	if (res.featureList === undefined) {
		await chrome.storage.local.set({ featureList: [] });
	}
	return res.featureList;
}

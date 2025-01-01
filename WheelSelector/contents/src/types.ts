export enum FeatureType {
	Link = "Link",
	Capture = "Capture",
	HistoryBack = "HistoryBack",
	HistoryForward = "HistoryForward",
	NewEmptyTab = "NewEmptyTab",
	UndoCloseTab = "UndoCloseTab",
}

export class CursorItem {
	name?: string;
	featureType?: FeatureType;
	url?: string;
	constructor({
		name,
		featureType,
	}: {
		name?: string;
		featureType?: FeatureType;
	}) {
		this.name = name;
		this.featureType = featureType;
	}
}

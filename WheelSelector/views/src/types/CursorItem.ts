export class CursorItem {
	name?: string;
	featureType?: FeatureType;
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

export class LinkItem extends CursorItem {
	url?: string;
	constructor({ url, name }: { url: string; name?: string }) {
		super({
			name,
			featureType: FeatureType.Link,
		});
		this.url = url;
	}
}

export enum FeatureType {
	Link = "Link",
	Capture = "Capture",
	HistoryBack = "HistoryBack",
	HistoryForward = "HistoryForward",
	NewEmptyTab = "NewEmptyTab",
	UndoCloseTab = "UndoCloseTab",
}

import { CursorItem, FeatureType, LinkItem } from "../../types/CursorItem";
import { CursorItemElement } from "./Components/CursorItemElement";
import { AddButton } from "./Components/AddButton";

export function CursorItemList({
	items,
	updateItems,
}: {
	items: CursorItem[];
	updateItems: Function;
}) {
	function onDelete(key: number) {
		const newItems = items.filter((_, index) => index !== key);
		updateItems(newItems);
	}
	function onAddClick(type: FeatureType, data: any) {
		if ([undefined, null, ""].includes(type)) return;
		let newItem = new CursorItem(
			Object.assign({ featureType: type, callback: () => {} }, data)
		);
		if (type === FeatureType.Link) {
			newItem = new LinkItem(Object.assign({ featureType: type }, data));
		} else {
			newItem = new CursorItem(
				Object.assign({ featureType: type }, data)
			);
		}
		updateItems([...items, newItem]);
	}
	return (
		<div style={{ display: "flex", flexDirection: "column", width: 500 }}>
			{items.map((item, i) => (
				<CursorItemElement index={i} item={item} onDelete={onDelete} />
			))}
			<AddButton onAddClick={onAddClick} />
		</div>
	);
}

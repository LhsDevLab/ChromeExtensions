import { FeatureType } from "../../types/CursorItem";
import { CursorItemElement } from "./Components/CursorItemElement";
import { AddButton } from "./Components/AddButton";
import { SelectorItem } from "@lhs7/wheel-selector";

export function CursorItemList({
	items,
	updateItems,
}: {
	items: SelectorItem[];
	updateItems: Function;
}) {
	function onDelete(key: number) {
		const newItems = items.filter((_, index) => index !== key);
		updateItems(newItems);
	}
	function onAddClick(type: FeatureType, name: String, data: any) {
		if (!type) return;
		let newItem = {
			name: name,
			payload: Object.assign(
				{
					featureType: type,
				},
				data
			),
		};
		updateItems([...items, newItem]);
	}
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: 500,
				marginBlock: "50px",
			}}
		>
			{items.map((item, i) => (
				<CursorItemElement index={i} item={item} onDelete={onDelete} />
			))}
			<AddButton onAddClick={onAddClick} />
		</div>
	);
}

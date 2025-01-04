import { FeatureType } from "../../../types/CursorItem";
import { selectStyle } from "../styles";

export function TypeSelect({
	id,
	onChange,
	selected,
}: {
	id?: string;
	onChange?: Function;
	selected?: FeatureType;
}) {
	const TypeList: FeatureType[] = [
		FeatureType.Link,
		FeatureType.Capture,
		// FeatureType.HistoryBack,
		// FeatureType.HistoryForward,
		FeatureType.NewEmptyTab,
		FeatureType.UndoCloseTab,
	];

	// Dynamically adjust styles based on `selected`
	const dynamicStyle = {
		...selectStyle,
		backgroundColor: selected ? "black" : selectStyle.backgroundColor, // Gray background if disabled
		cursor: selected ? "not-allowed" : selectStyle.cursor, // Not-allowed cursor if disabled
	};

	return (
		<select
			id={id}
			style={dynamicStyle}
			onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
				if (onChange) onChange(event.currentTarget.value);
			}}
			defaultValue={selected ? selected : ""}
			disabled={!!selected} // Disable select if `selected` exists
		>
			<option value="" disabled>
				Select a type...
			</option>
			{TypeList.map((type) => (
				<option value={type} key={type}>
					{type}
				</option>
			))}
		</select>
	);
}

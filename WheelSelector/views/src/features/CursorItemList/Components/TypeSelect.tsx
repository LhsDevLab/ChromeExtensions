import { FeatureType } from "../../../types/CursorItem";
import { selectStyle } from "../styles";

export function TypeSelect({
	id,
	onChange,
}: {
	id: string;
	onChange: Function;
}) {
	const TypeList: FeatureType[] = [
		FeatureType.Link,
		FeatureType.Capture,
		FeatureType.HistoryBack,
		FeatureType.HistoryForward,
		FeatureType.NewEmptyTab,
		FeatureType.UndoCloseTab,
	];

	return (
		<select
			id={id}
			style={selectStyle}
			onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
				onChange(event.currentTarget.value);
			}}
			defaultValue=""
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

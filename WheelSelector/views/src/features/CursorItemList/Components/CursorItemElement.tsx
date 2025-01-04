import { CursorItem, FeatureType, LinkItem } from "../../../types/CursorItem";
import {
	containerStyle,
	buttonStyle,
	dataInputStyle,
	textInputStyle,
} from "../styles";
import { TypeSelect } from "./TypeSelect";

export function CursorItemElement({
	index,
	item,
	onDelete,
}: {
	index: number;
	item: CursorItem | LinkItem;
	onDelete: Function;
}) {
	return (
		<div style={containerStyle} key={index} draggable="true">
			<TypeSelect selected={item.featureType} />
			{(() => {
				if (item.featureType === undefined) {
					return null;
				} else if (item.featureType === FeatureType.Link) {
					return (
						<div style={dataInputStyle}>
							<input
								style={Object.assign(textInputStyle, {
									flex: "1",
								})}
								value={item.name}
								type="text"
							/>
							<input
								style={Object.assign(textInputStyle, {
									flex: "1",
								})}
								value={(item as LinkItem).url}
								type="text"
							/>
						</div>
					);
				} else {
					return (
						<input
							style={Object.assign(textInputStyle, { flex: "1" })}
							value={item.name}
							type="text"
						/>
					);
				}
			})()}
			<button
				style={buttonStyle}
				title="Remove this item"
				onClick={() => {
					onDelete(index);
				}}
				onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
					Object.assign(e.currentTarget.style, {
						backgroundColor: "#F60102",
					});
				}}
				onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
					Object.assign(e.currentTarget.style, buttonStyle);
				}}
			>
				-
			</button>
		</div>
	);
}

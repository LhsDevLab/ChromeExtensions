import { CursorItem, FeatureType, LinkItem } from "../../../types/CursorItem";
import {
	containerStyle,
	buttonStyle,
	featureStyle,
	linkStyle,
} from "../styles";

export function CursorItemElement({
	index,
	item,
	onDelete,
}: {
	index: number;
	item: CursorItem;
	onDelete: Function;
}) {
	return (
		<div style={containerStyle} key={index} draggable="true">
			<span style={featureStyle}>{item.featureType}</span>
			<span>{item.name}</span>
			{item.featureType === FeatureType.Link && (
				<span style={linkStyle} rel="noopener noreferrer">
					{(item as LinkItem).url}
				</span>
			)}
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

import { useRef } from "react";
import {
	containerStyle,
	buttonStyle,
	dataInputStyle,
	textInputStyle,
} from "../styles";
import { TypeSelect } from "./TypeSelect";
import { SelectorItem } from "@lhs7/wheel-selector";

export function CursorItemElement({
	index,
	item,
	onDelete,
}: {
	index: number;
	item: SelectorItem;
	onDelete: Function;
}) {
	const containerRef = useRef<HTMLDivElement>(null);

	console.log(item.name, item.payload.featureType);

	return (
		<div ref={containerRef} style={containerStyle} key={index}>
			<TypeSelect selected={item.payload.featureType} />
			{(() => {
				if (item.payload.featureType === undefined) {
					return null;
				} else {
					return (
						<div style={dataInputStyle}>
							<input
								style={Object.assign(textInputStyle, {
									flex: "1",
								})}
								value={item.name}
								type="text"
								disabled
							/>
							{item.payload.url ? (
								<input
									style={Object.assign(textInputStyle, {
										flex: "1",
									})}
									value={item.payload.url}
									type="text"
									disabled
								/>
							) : null}
						</div>
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

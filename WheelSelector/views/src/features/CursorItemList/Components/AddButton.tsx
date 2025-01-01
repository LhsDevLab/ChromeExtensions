import { FeatureType } from "../../../types/CursorItem";
import { containerStyle, buttonStyle } from "../styles";
import { TypeSelect } from "./TypeSelect";
import { useState } from "react";
import { LinkInput } from "./LinkInput";
import { DefaultInput } from "./DefaultInput";

export function AddButton({ onAddClick }: { onAddClick: Function }) {
	const [type, setType] = useState<FeatureType>();
	const [data, setData] = useState<any>({});

	function onTypeChange(type: FeatureType) {
		setType(type);
		setData({});
	}

	return (
		<div style={containerStyle}>
			<TypeSelect id={"addedType"} onChange={onTypeChange} />
			{(() => {
				if (type === undefined) {
					return null;
				} else if (type === FeatureType.Link) {
					return <LinkInput setData={setData} />;
				} else {
					return <DefaultInput setData={setData} />;
				}
			})()}
			<button
				style={buttonStyle}
				onClick={() => {
					onAddClick(type, data);
				}}
				onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
					Object.assign(e.currentTarget.style, {
						backgroundColor: "#27ae60",
					});
				}}
				onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
					Object.assign(e.currentTarget.style, buttonStyle);
				}}
			>
				+
			</button>
		</div>
	);
}

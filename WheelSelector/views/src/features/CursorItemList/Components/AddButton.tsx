import { FeatureType } from "../../../types/CursorItem";
import {
	containerStyle,
	buttonStyle,
	dataInputStyle,
	textInputStyle,
} from "../styles";
import { TypeSelect } from "./TypeSelect";
import { useState } from "react";

export function AddButton({ onAddClick }: { onAddClick: Function }) {
	const [name, setName] = useState<string>("");
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
				} else {
					return (
						<div style={dataInputStyle}>
							<input
								style={Object.assign(textInputStyle, {
									flex: "1",
								})}
								type="text"
								placeholder="Name"
								onChange={(event) =>
									setName(event.target.value)
								}
							/>
							{type === FeatureType.Link ? (
								<input
									style={Object.assign(textInputStyle, {
										flex: "1",
									})}
									type="text"
									placeholder="Url"
									onChange={(event) =>
										setData((prev: any) => ({
											...prev,
											url: event.target.value,
										}))
									}
								/>
							) : null}
						</div>
					);
				}
			})()}
			<button
				style={buttonStyle}
				onClick={() => {
					onAddClick(type, name, data);
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

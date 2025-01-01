import { dataInputStyle, textInputStyle } from "../styles";

export function LinkInput({ setData }: { setData: Function }) {
	return (
		<div style={dataInputStyle}>
			<input
				style={Object.assign(textInputStyle, { flex: "1" })}
				type="text"
				placeholder="Name"
				onChange={(event) =>
					setData((prev: any) => ({
						...prev,
						name: event.target.value,
					}))
				}
			/>
			<input
				style={Object.assign(textInputStyle, { flex: "1" })}
				type="text"
				placeholder="Url"
				onChange={(event) =>
					setData((prev: any) => ({
						...prev,
						url: event.target.value,
					}))
				}
			/>
		</div>
	);
}

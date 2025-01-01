import { textInputStyle } from "../styles";

export function DefaultInput({ setData }: { setData: Function }) {
	return (
		<input
			style={Object.assign(textInputStyle, { flex: "1" })}
			type="text"
			placeholder="Name"
			onChange={(event) =>
				setData((prev: any) => ({ ...prev, name: event.target.value }))
			}
		/>
	);
}

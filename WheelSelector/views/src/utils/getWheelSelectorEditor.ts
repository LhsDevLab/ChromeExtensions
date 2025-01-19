import { SelectorItem, WheelSelectorEditor } from "@lhs7/wheel-selector";

let wheelSelectorEditor: WheelSelectorEditor | null = null;

export function getWheelSelectorEditor(
	baseElement: HTMLElement | null,
	onUpdated?: (items: SelectorItem[]) => void
) {
	if (wheelSelectorEditor === null) {
		wheelSelectorEditor = new WheelSelectorEditor({
			items: [],
			baseElement: baseElement,
			onUpdated: onUpdated,
		});
	} else {
		wheelSelectorEditor.calculate_Size_Pos(baseElement);
	}
	return wheelSelectorEditor;
}

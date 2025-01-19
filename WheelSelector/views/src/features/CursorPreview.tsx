import { useRef, useEffect } from "react";
import { getWheelSelectorEditor } from "../utils/getWheelSelectorEditor";
import { SelectorItem } from "@lhs7/wheel-selector";

export function CursorPreview({
	items,
	updateItems,
}: {
	items: any[];
	updateItems: (items: any[]) => void;
}) {
	const divRef = useRef<HTMLDivElement>(null);
	const wheelSelector = getWheelSelectorEditor(
		divRef.current,
		(items: SelectorItem[]) => {
			updateItems(items);
		}
	);

	useEffect(() => {
		wheelSelector.updateItems(items);
		wheelSelector.calculate_Size_Pos(divRef.current);
	}, [items]);

	useEffect(() => {
		wheelSelector.calculate_Size_Pos(divRef.current);
	}, [divRef.current]);

	useEffect(() => {
		function handleResize() {
			wheelSelector.calculate_Size_Pos(divRef.current);
		}
		wheelSelector.calculate_Size_Pos(divRef.current);
		window.addEventListener("resize", handleResize);
		return () => {
			wheelSelector.deactivateSelector();
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return <div ref={divRef} style={{ height: 500, width: 500 }}></div>;
}

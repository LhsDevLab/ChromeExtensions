import { useRef, useEffect } from "react";
import { WheelSelector } from "@lhs7/wheel-selector";

export function CursorPreview() {
	const divRef = useRef<HTMLDivElement>(null);

	const wheelSelector = new WheelSelector({
		items: [
			{
				name: "1",
				callBack: () => {
					alert("1");
				},
			},
			{
				name: "2",
				callBack: () => {
					alert("2");
				},
			},
			{
				name: "3",
				callBack: () => {
					alert("3");
				},
			},
		],
		outerDistance: 200,
		innerDistance: 100,
	});

	const calculateCenter = () => {
		if (divRef.current) {
			const rect = divRef.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			wheelSelector.deactivateSelector();
			wheelSelector.activateSelector(centerX, centerY);
		}
	};

	useEffect(() => {
		calculateCenter();

		window.addEventListener("resize", calculateCenter);

		return () => {
			window.removeEventListener("resize", calculateCenter);
		};
	}, []);

	return <div ref={divRef} style={{ height: 500, width: 500 }}></div>;
}

import { useRef, useEffect, useState } from "react";
import { WheelSelector } from "@lhs7/wheel-selector";

export function CursorPreview({ items }: { items: any[] }) {
	const divRef = useRef<HTMLDivElement>(null);
	const [wheelSelector] = useState<WheelSelector>(
		new WheelSelector({
			items: [],
			outerDistance: 200,
			innerDistance: 100,
		})
	);

	const calculateCenter = () => {
		if (divRef.current) {
			const rect = divRef.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			wheelSelector.activateSelector({ x: centerX, y: centerY });
		}
	};

	useEffect(() => {
		wheelSelector.updateItems(items);
	}, [items]);

	useEffect(() => {
		calculateCenter();
		window.addEventListener("resize", calculateCenter);
		return () => {
			wheelSelector.deactivateSelector();
			window.removeEventListener("resize", calculateCenter);
		};
	}, []);

	return <div ref={divRef} style={{ height: 500, width: 500 }}></div>;
}

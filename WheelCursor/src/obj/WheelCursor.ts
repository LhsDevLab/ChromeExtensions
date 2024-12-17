import { CursorItem } from "../types/CursorItem";
import { Position } from "../types/Position";
import {
	disableIframePointerEvents,
	restoreIframePointerEvents,
} from "../util/iframe";
import {
	makeCanvas,
	removeCanvas,
	drawDoughnut,
	drawLineFromCenter,
} from "../util/canvas";

export class WheelCursor {
	isActive: Boolean = false;
	items: CursorItem[];
	clickedMousePos: Position | null = null;
	selectedItemNo: number | null = null;
	outerDistance: number = 0;
	innerDistance: number = 0;
	cursorCanvas: HTMLCanvasElement | null = null;
	mouseCanvas: HTMLCanvasElement | null = null;

	constructor(items: CursorItem[], document: Document) {
		this.listenMouseEvents(document);
		this.items = items;
		this.outerDistance = 200;
		this.innerDistance = 100;
	}

	activateCursor(x: number, y: number) {
		if (this.isActive === true) return;
		this.clickedMousePos = { x, y };
		this.cursorCanvas = makeCanvas(
			document,
			{ x, y },
			this.outerDistance * 2
		);
		this.mouseCanvas = makeCanvas(
			document,
			{ x, y },
			this.outerDistance * 2
		);
		disableIframePointerEvents(document);
		this.isActive = true;
	}
	calculLine(
		ex: number,
		ey: number
	): {
		angle: number;
		length: number;
	} {
		const { x, y } = this.clickedMousePos!!;
		const [dx, dy] = [ex - x, ey - y];
		const angle = Math.atan2(dy, dx) * (180 / Math.PI);
		const length = Math.min(
			Math.sqrt(dy * dy + dx * dx),
			this.outerDistance
		);
		return {
			angle,
			length,
		};
	}
	deactivateCursor() {
		this.clickedMousePos = null;
		removeCanvas(this.cursorCanvas!!);
		removeCanvas(this.mouseCanvas!!);
		restoreIframePointerEvents(document);
		this.isActive = false;
	}
	listenMouseEvents(document: Document) {
		document.addEventListener("mousedown", (event: MouseEvent) => {
			//event.preventDefault();
			console.log(event.buttons);
			this.activateCursor(event.clientX, event.clientY);
		});

		document.addEventListener("mousemove", (event: MouseEvent) => {
			if (this.clickedMousePos !== null) {
				const { angle, length } = this.calculLine(
					event.clientX,
					event.clientY
				);
				drawDoughnut(
					this.cursorCanvas!!,
					this.innerDistance,
					this.outerDistance
				);
				drawLineFromCenter(this.mouseCanvas!!, angle, length);
			}
		});

		document.addEventListener("mouseup", (event: MouseEvent) => {
			this.deactivateCursor();
		});

		document.addEventListener("touchstart", (event: TouchEvent) => {});

		document.addEventListener("touchend", (event: TouchEvent) => {});
	}
}

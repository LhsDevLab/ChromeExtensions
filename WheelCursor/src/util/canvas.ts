import { Position } from "../types/Position";

export function makeCanvas(
	document: Document,
	pos: Position,
	size: number
): HTMLCanvasElement {
	const canvas = document.createElement("canvas");

	canvas.style.position = "fixed";
	canvas.style.left = `${pos.x - size / 2}px`;
	canvas.style.top = `${pos.y - size / 2}px`;
	canvas.style.pointerEvents = "none"; // Make sure it doesn't block mouse events
	canvas.style.zIndex = "100";
	canvas.width = size;
	canvas.height = size;

	document.body.appendChild(canvas);
	return canvas;
}

export function removeCanvas(canvas: HTMLCanvasElement) {
	canvas.remove();
}

export function drawDoughnut(
	canvas: HTMLCanvasElement,
	innerSize: number,
	outerSize: number
) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();

	ctx.arc(outerSize, outerSize, outerSize, 0, Math.PI * 2, false);

	ctx.arc(outerSize, outerSize, innerSize, 0, Math.PI * 2, true);

	ctx.closePath();

	ctx.lineWidth = 0;

	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.fill();
}

export function drawLineFromCenter(
	canvas: HTMLCanvasElement,
	angle: number,
	length: number
) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	// Get the center of the canvas
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;

	// Convert angle from degrees to radians
	const angleRadians = (angle * Math.PI) / 180;

	// Calculate the endpoint of the line using trigonometry
	const endX = centerX + length * Math.cos(angleRadians);
	const endY = centerY + length * Math.sin(angleRadians);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the line
	ctx.beginPath();
	ctx.moveTo(centerX, centerY); // Start at the center of the canvas
	ctx.lineTo(endX, endY); // Draw to the calculated endpoint
	ctx.strokeStyle = "black"; // Set the line color
	ctx.lineWidth = 2; // Set the line width
	ctx.stroke(); // Render the line
}

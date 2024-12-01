import { engToKor, korToEng } from "korean-ime-simple";
import { isKorean } from "../common/isKorean";

// State to track language mode
let isKoreanMode = false;
let languageSwitchCombination = "";

// Load saved key from storage
chrome.storage.sync.get("languageSwitchCombination", (data) => {
	if (data.languageSwitchCombination) {
		languageSwitchCombination = data.languageSwitchCombination;
	}
});

function toggleKoreanMode(event: KeyboardEvent) {
	isKoreanMode = !isKoreanMode; // Toggle language mode

	// // Update cursor style based on the mode
	// document.body.style.cursor = isKoreanMode
	// 	? "url('korean-mode-cursor.png'), auto"
	// 	: "text";

	// Optionally change the caret color
	document.documentElement.style.setProperty(
		"caret-color",
		isKoreanMode ? "red" : "black"
	);
	event.preventDefault();
}

// Add a key listener to toggle language mode
document.addEventListener("keydown", (event) => {
	// Build the key combination string for comparison
	const combinationString = [
		event.ctrlKey ? "Ctrl" : "",
		event.shiftKey ? "Shift" : "",
		event.altKey ? "Alt" : "",
		event.metaKey ? "Meta" : "",
		event.keyCode,
	]
		.filter(Boolean)
		.join(", ");
	// Check if the pressed key combination matches the saved language switch key
	if (
		combinationString === languageSwitchCombination &&
		event.repeat !== true
	) {
		toggleKoreanMode(event);
		return; // Exit the function to avoid interfering with other keys
	}

	// Ignore special keys
	if (event.ctrlKey || event.metaKey || event.altKey) {
		return;
	}

	// Handle character input
	if (event.key.match(/^[a-zA-Z]$/)) {
		// Match both lowercase and uppercase letters
		const input = document.activeElement as HTMLInputElement;
		if (input && ["INPUT", "TEXTAREA"].includes(input.tagName)) {
			event.preventDefault();
			const charToConvert = event.key.toLowerCase(); // Convert the key to lowercase for processing
			if (isKoreanMode) {
				// Get the last character of the input
				const lastChar = input.value.slice(-1);

				if (isKorean(lastChar)) {
					// Combine the last Korean character with the new input
					const combinedChar = engToKor(
						korToEng(lastChar + charToConvert)
					);
					input.value = input.value.slice(0, -1) + combinedChar;
				} else {
					// Append converted Korean directly
					input.value += engToKor(charToConvert);
				}
			} else {
				// Retain English input, keep the original case
				input.value += event.key;
			}
		}
	}
});

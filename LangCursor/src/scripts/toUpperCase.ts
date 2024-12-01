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
	// Match both lowercase and uppercase letters
	const input = document.activeElement as HTMLInputElement;
	if (input && ["INPUT", "TEXTAREA"].includes(input.tagName)) {
		if (event.key.match(/^[a-zA-Z]$/) && isKoreanMode) {
			event.preventDefault();

			// Get the caret position
			const caretPos = input.selectionStart ?? input.value.length;

			// Get the character to the left of the caret
			const precedingChar = input.value.charAt(caretPos - 1);

			// Convert the current key to lower case if needed
			const convertedChar = ["Q", "W", "E", "R", "T", "O", "P"].includes(
				event.key
			)
				? event.key
				: event.key.toLowerCase();

			if (isKorean(precedingChar)) {
				// Combine the preceding Korean character with the new input
				const combinedChar = engToKor(
					korToEng(precedingChar + convertedChar)
				);

				// Replace the preceding character with the combined character
				input.value =
					input.value.slice(0, caretPos - 1) +
					combinedChar +
					input.value.slice(caretPos);

				// Adjust the caret position
				input.setSelectionRange(caretPos, caretPos);
			} else {
				// Insert the converted Korean character at the caret position
				input.value =
					input.value.slice(0, caretPos) +
					engToKor(convertedChar) +
					input.value.slice(caretPos);

				// Move the caret forward
				input.setSelectionRange(caretPos + 1, caretPos + 1);
			}
		}
		if (isKorean(event.key) && !isKoreanMode) {
			event.preventDefault();
			const caretPos = input.selectionStart ?? input.value.length;

			// Convert the Korean character to English equivalent
			input.value =
				input.value.slice(0, caretPos) +
				korToEng(event.key) +
				input.value.slice(caretPos);

			// Move the caret forward
			input.setSelectionRange(caretPos + 1, caretPos + 1);
		}
	}
});

// Listen for the `input` event to override IME input
document.addEventListener("input", (event) => {
	const input = event.target as HTMLInputElement;
	if (input && ["INPUT", "TEXTAREA"].includes(input.tagName)) {
		const caretPos = input.selectionStart ?? input.value.length;

		// Remove the last character if it's Korean and Korean mode is off
		if (!isKoreanMode && isKorean(input.value.charAt(caretPos - 1))) {
			input.value =
				input.value.slice(0, caretPos - 1) +
				input.value.slice(caretPos);
			input.setSelectionRange(caretPos - 1, caretPos - 1);
		}
	}
});

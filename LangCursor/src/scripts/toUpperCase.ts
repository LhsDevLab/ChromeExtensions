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
	const input = document.activeElement as HTMLInputElement;
	if (input && ["INPUT", "TEXTAREA"].includes(input.tagName)) {
		if (event.key.match(/^[a-zA-Z]$/) && isKoreanMode) {
			event.preventDefault();

			// Get the caret position and selected range
			const start = input.selectionStart ?? 0;
			const end = input.selectionEnd ?? 0;

			// Determine the preceding character only if no selection is made
			const precedingChar =
				start > 0 && start === end ? input.value.charAt(start - 1) : "";

			// Convert the current key to lower case if needed
			const convertedChar = ["Q", "W", "E", "R", "T", "O", "P"].includes(
				event.key
			)
				? event.key
				: event.key.toLowerCase();

			if (isKorean(precedingChar) && start === end) {
				// Combine the preceding Korean character with the new input
				const combinedChar = engToKor(
					korToEng(precedingChar + convertedChar)
				);

				// Replace the preceding character
				input.value =
					input.value.slice(0, start - 1) +
					combinedChar +
					input.value.slice(end);

				// Adjust the caret position
				const newCaretPos = start + 1; // Caret stays after the combined character
				input.setSelectionRange(newCaretPos, newCaretPos);
			} else {
				// Replace the selected range or insert converted Korean
				const replacementText = engToKor(convertedChar);
				input.value =
					input.value.slice(0, start) +
					replacementText +
					input.value.slice(end);

				// Move the caret forward
				const newCaretPos = start + replacementText.length;
				input.setSelectionRange(newCaretPos, newCaretPos);
			}
		}
		if (isKorean(event.key) && !isKoreanMode) {
			event.preventDefault();
			const start = input.selectionStart ?? 0;
			const end = input.selectionEnd ?? 0;

			// Convert the Korean character to English equivalent
			const replacementText = korToEng(event.key);
			input.value =
				input.value.slice(0, start) +
				replacementText +
				input.value.slice(end);

			// Move the caret forward
			const newCaretPos = start + replacementText.length;
			input.setSelectionRange(newCaretPos, newCaretPos);
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

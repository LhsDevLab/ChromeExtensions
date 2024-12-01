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
			// Get the last character of the input
			const lastChar = input.value.slice(-1);
			// 쉬프트와 조합되어도 변화 없는 한글 매칭 알파벳은 소문자로 치환
			const convertedChar = ["Q", "W", "E", "R", "T", "O", "P"].includes(
				event.key
			)
				? event.key
				: event.key.toLowerCase();

			if (isKorean(lastChar)) {
				// Combine the last Korean character with the new input
				const combinedChar = engToKor(
					korToEng(lastChar + convertedChar)
				);
				input.value = input.value.slice(0, -1) + combinedChar;
			} else {
				// Append converted Korean directly
				input.value += engToKor(convertedChar);
			}
		}
		if (isKorean(event.key) && !isKoreanMode) {
			event.preventDefault();
			input.value += korToEng(event.key);
		}
	}
});

// Listen for the `input` event to override IME input
document.addEventListener("input", (event) => {
	const input = event.target as HTMLInputElement;
	if (input && ["INPUT", "TEXTAREA"].includes(input.tagName)) {
		if (!isKoreanMode && isKorean(input.value.slice(-1))) {
			// Remove the last character if it's Korean
			input.value = input.value.slice(0, -1);
		}
	}
});

import { engToKor } from "korean-ime-simple";

// State to track language mode
let isKoreanMode = false;

navigator.keyboard.getLayoutMap().then((keyboardLayoutMap) => {
	console.log(keyboardLayoutMap.entries());
});

// Add a key listener to toggle language mode
document.addEventListener("keydown", (event) => {
	//Lang1
	console.log(event.key);
	// Ignore special keys
	if (event.ctrlKey || event.metaKey || event.altKey) {
		return;
	}

	// Handle character input
	if (event.key.match(/^[a-z]$/)) {
		const input = document.activeElement as HTMLInputElement;
		if (input && ["INPUT", "TEXTAREA"].includes(input.tagName)) {
			event.preventDefault();
			if (isKoreanMode) {
				// Convert to Korean
				input.value = engToKor(input.value + event.key);
			} else {
				// Retain English input
				input.value += event.key;
			}
		}
	}
});

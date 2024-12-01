document.addEventListener("DOMContentLoaded", () => {
	const keyInput = document.getElementById("keyInput") as HTMLInputElement;
	const saveButton = document.getElementById(
		"saveButton"
	) as HTMLButtonElement;
	const status = document.getElementById("status") as HTMLParagraphElement;

	interface KeyCombination {
		ctrl: boolean;
		shift: boolean;
		alt: boolean;
		meta: boolean;
		code: number;
	}

	let keyCombination: KeyCombination = {
		ctrl: false,
		shift: false,
		alt: false,
		meta: false,
		code: -1,
	};

	// Load saved key combination from storage
	chrome.storage.sync.get("languageSwitchCombination", (data) => {
		if (data.languageSwitchCombination) {
			keyInput.value = data.languageSwitchCombination;
		}
	});

	// Listen for key combination input
	document.addEventListener("keydown", (event: KeyboardEvent) => {
		event.preventDefault();

		// Reset combination and build it
		keyCombination = {
			ctrl: event.ctrlKey,
			shift: event.shiftKey,
			alt: event.altKey,
			meta: event.metaKey,
			code: event.keyCode,
		};

		// Build a display string
		const combinationString = [
			event.ctrlKey ? "Ctrl" : "",
			event.shiftKey ? "Shift" : "",
			event.altKey ? "Alt" : "",
			event.metaKey ? "Meta" : "",
			event.keyCode,
		]
			.filter(Boolean)
			.join(", ");
		keyInput.value = combinationString;
	});

	// Save the selected key combination
	saveButton.addEventListener("click", () => {
		if (!keyInput.value) {
			status.textContent =
				"Please press a key combination before saving.";
			return;
		}

		chrome.storage.sync.set(
			{ languageSwitchCombination: keyInput.value },
			() => {
				status.textContent = `Combination "${keyInput.value}" saved!`;
				setTimeout(() => {
					if (status) status.textContent = "";
				}, 2000);
			}
		);
	});
});

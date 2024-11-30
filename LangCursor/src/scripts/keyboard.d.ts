interface Navigator {
	keyboard: Keyboard;
}

interface Keyboard {
	lock(keyCodes?: string[]): Promise<void>;
	unlock(): void;
	getLayoutMap(): Promise<KeyboardLayoutMap>;
}

interface KeyboardLayoutMap {
	get(key: string): string | undefined;
	entries(): IterableIterator<[string, string]>;
	keys(): IterableIterator<string>;
	values(): IterableIterator<string>;
	forEach(
		callback: (value: string, key: string, map: KeyboardLayoutMap) => void,
		thisArg?: any
	): void;
}

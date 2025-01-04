import { CursorPreview } from "./features/CursorPreview";
import { CursorItemList } from "./features/CursorItemList/CursorItemList";
import "./App.css";
import { useEffect, useState } from "react";
import { CursorItem } from "./types/CursorItem";
import { loadList, saveList } from "./utils/chromeUtil";

function App() {
	const [items, setItems] = useState<CursorItem[]>([]);

	async function updateItems(items: CursorItem[]) {
		await saveList(items);
		loadList().then((list) => {
			setItems(list);
		});
	}

	useEffect(() => {
		loadList().then((list) => {
			setItems(list);
		});
	}, []);

	return (
		<>
			{items.length === 0 ? null : <CursorPreview items={items} />}
			<CursorItemList items={items} updateItems={updateItems} />
		</>
	);
}

export default App;

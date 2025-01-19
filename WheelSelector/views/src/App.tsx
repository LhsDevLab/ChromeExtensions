import { CursorPreview } from "./features/CursorPreview";
import { CursorItemList } from "./features/CursorItemList/CursorItemList";
import "./App.css";
import { useEffect, useState } from "react";
import { loadList, saveList } from "./utils/chromeUtil";
import { SelectorItem } from "@lhs7/wheel-selector";
import { saveStyle, appStyle } from "./features/CursorItemList/styles";
import { Toast } from "./features/Toast";
import { Explain } from "./features/Explain";

function App() {
	const [items, setItems] = useState<SelectorItem[]>([]);
	const [toast, setToast] = useState<string | null>(null);

	async function updateItems(items: SelectorItem[]) {
		setItems(items);
	}

	useEffect(() => {
		loadList().then((list) => {
			setItems(list);
		});
	}, []);

	return (
		<>
			<div
				style={Object.assign(
					{
						flexDirection: "column" as any,
						position: "relative" as any,
					},
					appStyle
				)}
			>
				<CursorPreview items={items} updateItems={updateItems} />
				<CursorItemList items={items} updateItems={updateItems} />
				<button
					style={saveStyle}
					onClick={() => {
						saveList(items);
						loadList().then((list) => {
							setItems(list);
						});
						setToast("SAVED");
					}}
					onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
						Object.assign(e.currentTarget.style, {
							backgroundColor: "#27ae60",
						});
					}}
					onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
						Object.assign(e.currentTarget.style, saveStyle);
					}}
				>
					SAVE
				</button>
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "550px",
						transform: "translateY(-50%)",
						display: "flex",
						flexDirection: "column",
						margin: "0 20px",
						zIndex: 1000,
					}}
				>
					<Explain
						title="How to Use"
						content={`
  <Activation>
  1. Right-click after left-clicking the mouse.
  2. Press ESC to exit.

  <Execute Action>
  1. After activation, release the action over the item.
  `}
					/>
					<Explain
						title="Rearranging & Deleting Items"
						content={`
  <Rearranging>
  1. Drag the item to rearrange.

  <Deleting>
  1. Drag the item outside to delete it.
  `}
					/>
					<Explain
						title="Adding & Deleting Items"
						content={`
  <Adding>
  1. Select a function type.
  2. Enter the name and additional data.
  3. Click the + button to add it.

  <Deleting>
  1. Click the - button to delete it.
  `}
					/>
					<Explain
						title="Function Types"
						content={`
  Link: Redirects to the configured URL.
  Capture: Takes a screenshot.
  UndoCloseTab: Restores the recently closed tab.
  NewEmptyTab: Creates a new tab.
  `}
					/>
				</div>
			</div>
			{toast && (
				<Toast
					message={toast}
					duration={1000}
					onClose={() => setToast(null)}
				/>
			)}
		</>
	);
}

export default App;

import { CSSProperties } from "react";

export function Explain({
	title,
	content,
	style,
}: {
	title: string;
	content: string;
	style?: CSSProperties;
}) {
	const containerStyle: CSSProperties = {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		padding: "20px",
		border: "2px solid #ddd",
		borderRadius: "10px",
		backgroundColor: "#f9f9f9",
		boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
		width: "350px",
		margin: "20px auto",
		wordWrap: "break-word",
		overflow: "hidden",
		...style,
	};

	const titleStyle: CSSProperties = {
		fontSize: "20px",
		fontWeight: "bold",
		color: "#333",
		marginBottom: "10px",
		wordWrap: "break-word",
		textAlign: "center",
	};

	const contentStyle: CSSProperties = {
		fontSize: "16px",
		width: "100%",
		color: "#555",
		lineHeight: "1.5",
		wordWrap: "break-word",
		textAlign: "left",
	};

	return (
		<div style={containerStyle}>
			<div style={titleStyle}>{title}</div>
			{content.split("\n").map((line) => (
				<div style={contentStyle}>{line}</div>
			))}
		</div>
	);
}

import { useEffect, CSSProperties } from "react";

export function Toast({
	message,
	duration,
	onClose,
}: {
	message: string;
	duration: number;
	onClose: () => void;
}) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	const toastStyle: CSSProperties = {
		position: "fixed",
		top: "50px",
		left: "50%",
		transform: "translateX(-50%)",
		padding: "15px 100px",
		backgroundColor: "#333",
		color: "#fff",
		borderRadius: "10px",
		boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
		zIndex: 1000,
		fontSize: "20px",
		fontWeight: "bold",
		textAlign: "center",
	};

	return <div style={toastStyle}>{message}</div>;
}

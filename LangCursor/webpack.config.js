import path from "path";

export default {
	entry: "./src/scripts/toUpperCase.ts",
	output: {
		filename: "toUpperCase.js",
		path: path.resolve("dist"),
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
};

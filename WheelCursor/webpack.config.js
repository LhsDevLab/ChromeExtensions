import path from "path";

export default {
	entry: {
		"contents-script": "./src/contents-script.ts",
	},
	output: {
		filename: "[name].js",
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

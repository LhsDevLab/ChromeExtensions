import path from "path";

export default {
	entry: {
		contents_script: "./src/contents_script.ts",
		service_worker: "./src/service_worker.ts",
	},
	output: {
		filename: "[name].js",
		path: path.resolve("../dist"),
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

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		main: "./src/app.js",
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
			{
				test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[hash].[ext]",
						outputPath: "assets",
					},
				},
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
		],
	},
};

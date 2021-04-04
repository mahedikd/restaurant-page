const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
	mode: "production",
	output: {
		filename: "[name].[hash].bundle.js",
		path: path.resolve(__dirname, "build"),
	},
	optimization: {
		splitChunks: { chunks: "all" },
		minimizer: [
			new CssMinimizerPlugin({
				parallel: true,
			}),
			new TerserPlugin({ parallel: true }),
			new HtmlWebpackPlugin({
				filename: "index.html",
				inject: true,
				template: "./src/index.html",
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true,
				},
			}),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, //2. Extract css into files
					"css-loader", //1. Turns css into commonjs
				],
			},
		],
	},
});

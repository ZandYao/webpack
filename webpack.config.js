const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
	entry: path.join(__dirname, '/src/index.js'),
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: './dist', //本地服务器所加载文件目录
		port: '8080',
		inline: true, //本地源文件修改后实时刷新
		historyApiFallback: true,//所有的调转都指向html
		hot: true // 热更新
	},
	devtool: 'source-map',//对于打包的文件生成Map 文件用于调试，会提示生成错误的位置
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					"style-loader", // 将 JS 字符串生成为 style 节点
					"css-loader", // 将 CSS 转化成 CommonJS 模块
					"sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /(\.jsx|\.js)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "/public/index.html"),// new一个这个插件的实例，并传入相关的参数
			hash: true,
			minify: {
				collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
			},
			filename: 'index.html'
		}),
		new CleanWebpackPlugin(),// 清理文件夹设置清理的文件夹名称
		new webpack.HotModuleReplacementPlugin() //热更新插件
	]
}
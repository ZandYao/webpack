const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	entry: path.join(__dirname, '/src/index.js'),
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					// "style-loader", // 将 JS 字符串生成为 style 节点 （这个文件不能和css分离插件共存）
					"css-loader", // 将 CSS 转化成 CommonJS 模块
					"sass-loader", // 将 Sass 编译成 CSS，默认使用 Node Sass
					 "postcss-loader"
				],
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src')
				// publicPath: '../'  // 给背景图片设置一个公共路径
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader' , options: {
							limit: 1000 , // 限制只有小于1kb的图片才转为base64，例子图片为1.47kb,所以不会被转化
							outputPath: 'images'
						}
					}
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
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		})
	]
}
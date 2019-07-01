const path = require('path')
const common = require('./webpack.common.js');
const webpack = require('webpack');
const merge = require('webpack-merge');
module.exports = merge(common, {
	devServer: {
		contentBase: './dist', //本地服务器所加载文件目录
		port: '8080',
		inline: true, //本地源文件修改后实时刷新
		historyApiFallback: true,//所有的调转都指向html
		hot: true // 热更新
	},
	devtool: 'source-map',//对于打包的文件生成Map 文件用于调试，会提示生成错误的位置
	plugins: [
		new webpack.HotModuleReplacementPlugin() //热更新插件
	]
})
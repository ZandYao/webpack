const path = require('path')
const common = require('./webpack.common')
const merge = require('webpack-merge');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurifyCssWebpack = require('purifycss-webpack'); // 引入PurifyCssWebpack插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const glob = require('glob');  // 引入glob模块,用于扫描全部html文件中所引用的css\
module.exports = merge(common, {
	optimization: {
		minimizer: [
			new UglifyWebpackPlugin({
				parallel: 4
			}),
			new OptimizeCssAssetsWebpackPlugin()
		]
	},

	devtool: 'source-map',//对于打包的文件生成Map 文件用于调试，会提示生成错误的位置
	plugins: [
		new CleanWebpackPlugin(),// 清理文件夹设置清理的文件夹名称
		new PurifyCssWebpack({
			paths: glob.sync(path.join(__dirname, 'public/*.html')) // 同步扫描所有html文件中所引用的css
		})
	]
})
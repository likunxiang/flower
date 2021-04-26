process.env.VUE_APP_VERSION = require('./package.json').version

if (process.env.NODE_ENV === 'development') {
	console.log('开发环境')
	process.env.VUE_APP_API = ''
	process.env.VUE_APP_WEBSOCKET = ''
} else {
	console.log('生产环境')
	process.env.VUE_APP_API = ''
	process.env.VUE_APP_WEBSOCKET = ''
}
//路由pages.json
const TransformPages = require('uni-read-pages')
const {webpack} = new TransformPages()
module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'meta']
					});
					return JSON.stringify(tfPages.routes)
				}, true)
			})
		]
	}
}

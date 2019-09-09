const webpack = require('webpack')

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map', //mode为production时建议使用‘cheap-module-source-map’
    devServer: {
        port: 8080,
        contentBase: './dist', //本地服务运行的文件件
        open: true, //自动打开浏览器
        proxy: { //跨域代理
            index: '', //如果是对根目录的请求转发，需要设置index为空/false
            '/react/api': {
                target: 'http://www.dell-lee.com',
                secure: false, //请求https时需要设置为false
                pathRewrite: {
                    'header.json': 'demo.json' //转发
                },
                changeOrigin: true //某些网站加了爬虫限制
            } 
        },
        hot: true, //开启hot module replacement,配合webpack插件一起使用
        //hotOnly: true, //即使HMR没有生效，浏览器也不会自动刷新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = devConfig
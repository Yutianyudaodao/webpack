const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyrightWebpackPlugin = require('../plugins/copyright-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')

const commonConfig = {
    entry: {
        main: './src/app.js', //生成名字为main的js文件
    },
    //externals: ["lodash"], //打包时忽略lodash,用户使用我的库的时候，需要自行安装lodash
    output: {
        publicPath: '', //会作为名字的前缀
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        //library: 'library', //文件被作为库以script标签被引用，引用之后把它挂载到了全局变量上，叫做library
        //libraryTarget: 'umd' //文件被作为库被引用时采用的语法,如果设置为this,和上面的参数一起使用意思为将变量挂载在this上
    },
    module: {
        rules: [{
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader', //会把图片转换成base64直接放进js文件
                    options: {
                        name: '[name].[ext]', //打包名称，placeholder 占位符[hash],
                        outputPath: 'images/', //相对于出口文件的打包地址
                        limit: 20480000 //超过2048个字节时，会像file-loader一样放进文件夹里
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader',
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, //排除node_modules
                loader: 'babel-loader',
                //options: {  //在这里写等同于在 .babelrc文件里
                //业务代码这样写 babel/polyfill就可以
                // presets: [['@babel/preset-env',{
                //     targets: {
                //         chrome: '67' //chrome67以上的版本不用转换
                //     },
                //     useBuiltIns: 'usage'  //当作babel/polyfill的时候，用什么添加什么
                // }]],  

                //如果是ui组建，babel/polyfill会污染全剧环境，plugin-transform-runtime会以闭包形式存在
                // "plugins": [["@babel/plugin-transform-runtime",{
                //     "absoluteRuntime": false,
                //     "corejs": 2, //当页面上不存在ES6的语法时才会打包到main文件里
                //     "helpers": true,
                //     "regenerator": true,
                //     "useESModules": false
                // }]]
                //}
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }), //会在打包结束后生成一个html文件，并把打包生成的js文件引入html
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery'  //如果某个模块中用了$，就会在该模块中自动引用jquery
        }),
        new CopyrightWebpackPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'async', //异步引用，all,同步时会去找cacheGroups
            minSize: 30000,
            maxSize: 0,
            minChunks: 1, //至少有一个文件引用就代码分割
            maxAsyncRequests: 5, //最多分割5个引入
            maxInitialRequests: 3, //入口文件最多分割3个引入
            automaticNameDelimiter: '~', //命名连接符
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: { //代码分割打包去向，缓存组
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, //值越大，组的优先级越高
                    // filename: 'vendor.js'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true, //之前的打包中如果已经打包过，就不再打包了，用之前的
                    // filename: 'common.js'
                }
            }
        }
    }
}

module.exports = (env) => {
    if(env && env.production){
        return merge(commonConfig,prodConfig)
    }else{
        return merge(commonConfig,devConfig)
    }
}

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./build/webpack.dev.js/index.js.js.js.js');

const complier = webpack(config) //生成编译器

const app = new express();


//只要文件改变了，complier就会重新运行，打包生成的文件路径就是config中的路径
app.use(webpackDevMiddleware(complier,{
  publicPath: config.output.publicPath
}))


app.listen(3000,()=>{
  console.log('hello')
})
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    jquery: ['jquery'],
    react: ['react','react-dom'],
    lodash: ['lodash']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname,'../dll'),
    library: '[name]', //作为全局变量暴露出去
  },
  plugins: [
    new webpack.DllPlugin({ //生成打包库的映射文件
      name: '[name]',
      path: path.resolve(__dirname,'../dll/[name].manifest.json'),
    })
  ]
}
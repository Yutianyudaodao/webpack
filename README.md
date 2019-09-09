webpack 是基于node.js开发的打包工具，本质上是由node实现的

npm init -y 以node规范的形式创建一个node的项目，或者说是创建一个node的包文件
npx webpack -v :执行npx时会在当前项目的node_modules里找对应的包
webpack-cli: 让我们可以在命令行中使用webpack


"webpack --watch" 只要文件发生变化，会自动打包
"webpack-dev-server" 启动本地服务，监听文件变换，自动打包，热加载，打包生成的dist目录放在电脑内存里


webpack.config.js
mode: 'development' //文件不压缩,
      'production'  //文件压缩成一行

entry: // 写字符串，默认为main
      './src/app.js';
      {
        main: './src/app.js', //生成名字为main的js文件
        sub: './src/app.js', //生成名字为sub的js文件
      }

output: { //出口
          publicPath: 'http://cdn.com.cn', //会作为名字的前缀
          filename: '[name].js',
          path: path.resolve(__dirname, 'dist')
        },
module: //模块打包方案loader

plugins: 会在某个时刻帮助你做一些事情


sourceMap:是一种映射关系，它能将打包之后的内容映射到源文件的相应地方，方便在控制台中查看问题，在mode=development是，默认开启

ES6 --> ES5
1.npm install --save-dev babel-loader @babel/core   //webpack和babel做通信的桥梁，但并不会做语法转换
2.{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
3.npm install @babel/preset-env --save-dev  //语法转换模块,包含各种翻译语法
4.'.babelrc'
{
  "presets": ["@babel/preset-env"]
}
5.npm install --save @babel/polyfill  //低版本浏览器语法转化，对应文件都要引入，业务代码用这个就行
6.npm install --save-dev @babel/plugin-transform-runtime 
  //如果是ui组建，babel/polyfill会污染全剧环境，plugin-transform-runtime会以闭包形式存在
  npm install --save @babel/runtime-corejs2  
  //当页面上不存在ES6的语法时才会打包到main文件里


Tree Shaking 只支持ES Module的引入，只打包引用的
"sideEffects"  --> 排除某个文件

postcss-loader: 在样式前加上浏览器前缀 需要创建postcss.config文件，使用autoprefixer插件

四
code splitting 代码分割
splitChunks: {
    chunks: 'all'
}

五
typescript
npm i ts-loader typescript -D
需要创建tsconfig.json的文件
引入的包文件想使用ts: npm i @types/lodash -D
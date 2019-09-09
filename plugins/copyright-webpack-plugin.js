class CopyRightWebpackPlugin {
  constructor() {
    console.log('used')
  }

  apply(compiler){
    //compiler相当与webpack的实例
    //compiler.hooks //时刻，钩子
    compiler.hooks.emit.tapAsync('CopyRightWebpackPlugin',(compilation,cb)=>{
      //compilation //与此次打包相关的内容
      //compilation.assets 里面存放着打包文件的json数据
      compilation.assets['copyright.txt'] = {
        source: function(){
          return 'copyright by daodao'
        },
        size: function(){
          return 21
        }
      }
      console.log(compilation.assets);
      cb()
    })
    
  }
}

module.exports = CopyRightWebpackPlugin
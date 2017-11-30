var path = require("path")
var config = {
   entry: './index.js',   //设置入口文件
   output: {
      path: path.resolve(__dirname, './'),
      filename: 'bundle.js',  //设置导出文件为index.js
   },
   devServer: {
      inline: true,
      port: 7777   //设定使用webpack-dev-server工具的服务器端口
   },
   module: {
      loaders: [ {   //引入babel模块处理ES6代码
         test: /\.(js|jsx)?$/,
         exclude: /node_modules/,
         loader: 'babel-loader',

         query: {
            presets: ['es2015','react']
         }
      }]
   },
  resolve:{
      extensions:['.js',".css",".jsx"]
  }
}
module.exports = config;  //导出config文件

var webpack = require("webpack")
var path = require("path")
var config = {
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    blog: path.resolve(__dirname, 'blog/src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].js'
  },
  devServer: {
    inline: true,
    compress: false,
    contentBase: path.join(__dirname, ""),
    open: "http://localhost:7777/webpack-dev-server/main",
    port: 7777,   //设定使用webpack-dev-server工具的服务器端口
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
  ],
  module: {
  	rules: [
  		{test: /\.(js|jsx)?$/, use: ['babel-loader']}
  	]
  },
  resolve:{
    extensions:['.js',".css",".jsx"]
  }
}
module.exports = config;  //导出config文件

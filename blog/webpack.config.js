var webpack = require("webpack")
var path = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'bundle'),
  },
  devServer: {
    inline: true,
    compress: false,
    contentBase: path.join(__dirname, "./"),
    open: "http://localhost:7777/webpack-dev-server",
    port: 7777,
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname,'index.html'),
          filename:'index.html',
          chunks:['index'],
          hash: true,
          minify:{
              removeAttributeQuotes:true//压缩 去掉引号
          }
      }),
  ],
  module: {
  	rules: [
  		{
        test: /\.(js|jsx)?$/,
        use: [
          {
            loader:'babel-loader',
            options:{
                presets: ['react'],
            }
          }
        ]
      }
  	]
  },
  resolve:{
    extensions:['.js',".css",".jsx"]
  }
}
module.exports = config;  //导出config文件

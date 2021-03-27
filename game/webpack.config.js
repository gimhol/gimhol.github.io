var webpack = require("webpack")
var path = require("path")
var config = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'bundle'),
  },
  devServer: {
    inline: true,
    compress: false,
    contentBase: path.join(__dirname, "./"),
    open: "http://localhost:7777/webpack-dev-server/main",
    port: 7777,
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
  ],
  module: {
  	rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },{
        test: /\.(js|jsx)?$/,
        use: [
          {
            loader:'babel-loader',
            options:{
                presets: ['react'],
            }
          }
        ],
        exclude: /node_modules/
      }
  	]
  },
  resolve:{
    extensions:['.tsx', '.ts', '.js',".css",".jsx"]
  }
}
module.exports = config;  //导出config文件

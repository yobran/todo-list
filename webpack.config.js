const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // main JS file
  output: {
    filename: 'main.js',    // bundled JS
    path: path.resolve(__dirname, 'dist'),
    clean: true,            // clears old build files
  },
  mode: 'development',      // 'production' for deploy
  devServer: {
    static: './dist',
    port: 8080,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // uses our html template
    }),
  ],
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] }, // handles CSS
    ],
  },
};
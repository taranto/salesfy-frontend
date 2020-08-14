// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');
const {resolve} = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://localhost:8080',// bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    './index.tsx' // the entry point of our app
  ],
  output: {
    publicPath: '/',
  },
  devServer: {
    // https: true,
    hot: true, // enable HMR on the server,
    historyApiFallback: true
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      web: resolve(__dirname, "..", "../ts", "web"),
			"app-core": resolve(__dirname, "..", "../ts", "core"),
			utils: resolve(__dirname, "..", "../ts/web/", "utils"),
			assets: resolve(__dirname, "..", "../assets"),
			containers: resolve(__dirname, "..", "../ts/web", "container"),
			components: resolve(__dirname, "..", "../ts/web/stories", "component"),
			screens: resolve(__dirname, "..", "../ts/web/stories", "screen"),
      boot: resolve(__dirname, "..", "../ts/web/", "boot"),
      native: resolve(__dirname, "..", "../ts/web/", "native"),
      root:  resolve(__dirname, "..", "../", "ts")
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
});

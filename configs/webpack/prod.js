// production config
const merge = require('webpack-merge');
const {resolve} = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: {
    bundle: [
      'babel-polyfill',
      './index.tsx'
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  // devtool: 'source-map',
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
    new CopyWebpackPlugin([
      {from:'assets',to:'assets'},
      {from:'onesignal',to:'.'} 
    ])
  ],
});

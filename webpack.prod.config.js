const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = function(env) {
  return merge(baseConfig.call(this, env), {
    mode: 'production',
    devtool: env.sourcemap ? 'nosources-source-map' : false,
    output: {
      filename: 'assets/js/[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js'
    },
    module: {
      rules: [
        // all css in src/style will be bundled in an external css file
        {
          test: /\.css$/,
          include: root('src', 'style'),
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader', use: [
              { loader: 'css-loader', options: { root: path.resolve(__dirname, 'src/public') } },
              { loader: 'postcss-loader' }
            ]
          })
        },
        // all css in src/style will be bundled in an external css file
        {
          test: /\.(scss|sass)$/,
          include: root('src', 'style'),
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader', use: [
              { loader: 'css-loader', options: { root: path.resolve(__dirname, 'src/public') } },
              { loader: 'postcss-loader' },
              { loader: 'sass-loader' }
            ]
          })
        },
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          use: ['@ngtools/webpack']
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'assets/css/[name].bundle.css',
      }),
      new AngularCompilerPlugin({
        mainPath: './src/main.ts',
        tsConfigPath: 'tsconfig.json',
        sourceMap: env.sourcemap
      })
    ]
  })
}

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

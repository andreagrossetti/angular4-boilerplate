const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = function (env) {
  return merge(baseConfig.call(this, env), {
    mode: 'production',
    devtool: env.sourcemap ? 'nosources-source-map' : false,
    output: {
      filename: 'assets/js/[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          use: 'source-map-loader',
          exclude: [
            path.join(process.cwd(), 'node_modules')
          ]
        },
        // all css in src/style will be bundled in an external css file
        {
          test: /\.css$/,
          include: root('src', 'style'),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { root: path.resolve(__dirname, 'src/public') } },
            { loader: 'postcss-loader' }
          ]
        },
        // all css in src/style will be bundled in an external css file
        {
          test: /\.(scss|sass)$/,
          include: root('src', 'style'),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { root: path.resolve(__dirname, 'src/public') } },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        },
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          use: ['@ngtools/webpack']
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: env.sourcemap // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'assets/css/[name].bundle.css',
        chunkFilename: "[id].css"
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

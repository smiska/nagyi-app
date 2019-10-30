const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const MiniCSSPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contentHash].bundle.js'
    },
    optimization: {
        minimizer: [ 
            new TerserPlugin (),
            new OptimizeCSSPlugin()
        ]
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template: './src/template.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true 
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCSSPlugin({ filename: '[name].[contentHash].css'}),
        new OptimizeCSSPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ MiniCSSPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    }
})
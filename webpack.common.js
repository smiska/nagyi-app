const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html'
        }),
        new CleanWebpackPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|gif|svg|jpg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'imgs',
                        name: '[name].[hash].[ext]'
                    }
                }
            }
        ]
    }
}
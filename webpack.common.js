const path = require('path')

module.exports = {
    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
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
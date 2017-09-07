import * as path from 'path'
const webpack = require('webpack')

import * as HtmlWebpackPlugin from 'html-webpack-plugin'
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: [
        path.join(__dirname, 'client/main.tsx'),
        'webpack-hot-middleware/client'
    ],
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
			{test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/},
			{test: /\.tsx$/, use: 'ts-loader', exclude: /node_modules/},
			{
                test: /\.scss$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader', query: {modules: true, localIdentName: '[name]__[local]___[hash:base64:5]'}}, {loader: 'sass-loader'}]
            }
    	]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devtool: 'inline-source-map'
}

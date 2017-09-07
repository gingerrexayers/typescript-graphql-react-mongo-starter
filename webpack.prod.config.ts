const path = require('path')
const webpack = require('webpack')

//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === 'development'
})

module.exports = {
    entry: [
        path.join(__dirname, 'client/main.js'),
        'webpack-hot-middleware/client'
    ],
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
			{test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
			{test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/},
			{
                test: /\.scss$/,
                use: extractSass({use: [{loader: 'css-loader'}, {loader: 'sass-loader'}], fallback: 'style-loader'}),
                query: {modules: true, localIdentName: '[name]__[local]___[hash:base64:5]'}
            }
    	]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            "environment": '"production"',
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                drop_debugger: false
            },
            comments: false
        }),
        //new BundleAnalyzerPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}

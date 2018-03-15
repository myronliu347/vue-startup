const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CompressionPlugin = require('compression-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');   
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const getHappyPackConfig = require('./happypack');
const utils = require('./utils');
const baseWebpackConfig = require('./webpack.base.config');
const config = require('../config');

const env = process.env.NODE_ENV || 'development';

module.exports = merge(baseWebpackConfig, {
    entry: {
        app: utils.resolve('src/page/index.js')
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: ['happypack/loader?id=css']
                })
            }
        ]
    },
    output: {
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        path: config[env].assetsRoot,
        publicPath: config[env].assetsPublicPath,
        sourceMapFilename: '[file].map',
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
    },
    devtool: false,
    plugins: [
        new webpack.HashedModuleIdsPlugin(),

        new HappyPack(getHappyPackConfig({
            id: 'css',
            loaders: utils.extractCSS()
        })),

        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash:8].css')
        }),

        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: ({ resource }) => (
        //         resource &&
        //         resource.indexOf('node_modules') >= 0 &&
        //         resource.match(/\.js$/)
        //     )
        // }),

        // gzip
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|html|less|css)$/,
            threshold: 10240,
            minRatio: 0.8
        }),

        new AddAssetHtmlPlugin({
            filepath: utils.resolve('dist/*.dll.js'),
        }),

        new ParallelUglifyPlugin({
            workerCount: 6,
            cache: '.cache/',
            sourceMap: false,
            uglifyJS: {
                compress: {
                    warnings: false,
                    /* eslint-disable camelcase */
                    drop_debugger: true,
                    drop_console: true
                },
                mangle: true
            }
        }),
        
        new webpack.optimize.ModuleConcatenationPlugin(),
        new WebpackMd5Hash()
    ]
});


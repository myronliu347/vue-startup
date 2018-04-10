const webpack = require('webpack');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
{{#skeleton}}
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
{{/skeleton}}
{{#serverwork}}
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const SwRegisterWebpackPlugin = require('sw-register-webpack-plugin');
{{/serverwork}}
const HappyPack = require('happypack');   

const getHappyPackConfig = require('./happypack');
const utils = require('./utils');
const baseWebpackConfig = require('./webpack.base.config');
const config = require('../config');

const env = process.env.NODE_ENV || 'development';
const url = `http://${config[env].clientIp}:${config[env].port}`;

module.exports = merge(baseWebpackConfig, {
    entry: {
        app: [
            'webpack/hot/dev-server',
            `webpack-dev-server/client?http://localhost:${config[env].port}/`,
            utils.resolve('src/main.js')
        ]
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: ['happypack/loader?id=css']
            }{{#skeleton}},
            SkeletonWebpackPlugin.loader({
                resource: path.resolve(__dirname, '../src/router/index.js'), 
                options: {
                    entry: 'skeleton',
                    routePathTemplate: '/skeleton',
                    importTemplate: 'import [nameHash] from \'../[name]/index.vue\';'
                }
            })
            {{/skeleton}}
        ]
    },
    devtool: '#source-map',
    output: {
        filename: '[name].js',
        path: config[env].assetsRoot,
        publicPath: config[env].assetsPublicPath,
        sourceMapFilename: '[file].map',
        chunkFilename: '[name].js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        new HappyPack(getHappyPackConfig({
            id: 'css',
            loaders: utils.extractCSS()
        })),
        {{#skeleton}}
        new SkeletonWebpackPlugin({
            webpackConfig: require('./webpack.skeleton.config'),
            quiet: true
        }),
        {{/skeleton}}
        {{#serverwork}}
        new SWPrecacheWebpackPlugin({
            cacheId: 'sw-cache-*__name__*',
            filename: 'service-worker.js',
            staticFileGlobs: ['assets/**/*'],
            mergeStaticsConfig: true,
            staticFileGlobsIgnorePatterns: [
                /\.map$/ // map文件不需要缓存
            ],
            stripPrefix: 'dist/',
            navigateFallback: '/index.html',
            navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/],
            minify: true,
            verbose: true
        }),
        new SwRegisterWebpackPlugin({
            filePath: path.resolve(__dirname, '../src/sw-register.js')
        }),
        {{/serverwork}}
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
        new OpenBrowserPlugin({ url: url })
    ],
    // see https://webpack.github.io/docs/webpack-dev-server.html
    devServer: {
        hot: true,
        noInfo: false,
        quiet: false,
        port: config[env].port,
        // #https://github.com/webpack/webpack-dev-server/issues/882
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        inline: true,
        // 解决开发模式下 在子路由刷新返回 404 的情景
        historyApiFallback: {
            index: config[env].assetsPublicPath
        },
        stats: {
            colors: true,
            modules: false
        },
        contentBase: config[env].contentBase,
        publicPath: config[env].assetsPublicPath
    }
});

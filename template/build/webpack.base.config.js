const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack'); 
const MxWebpackContentReplacePlugin = require('mx-webpack-content-replace-plugin');

const getHappyPackConfig = require('./happypack');

const config = require('../config');
let exclude = /node_modules/
{{#fmcomponents}}
let include = [
    path.resolve(__dirname, '../src/'),
    path.resolve(__dirname, '../node_modules/fmcomponents/src/')
];
exclude = function (modulePath) {
    return /node_modules/.test(modulePath) &&
        !/node_modules\/fmcomponents/.test(modulePath);
};
{{/fmcomponents}}

const env = process.env.NODE_ENV || 'development';

// 全局变量
const cdn = process.env.FM_CDN ? process.env.FM_CDN : config[env].cdn;
const api = process.env.FM_API ? process.env.FM_API : config[env].api;
const base = process.env.FM_BASE ? process.env.FM_BASE : config[env].base;

console.log('\n---------env------:\n', env);
console.log('\n---------cdn------:\n', cdn);
console.log('\n---------base------:\n', base);
console.log('\n---------api------:\n', api, '\n');

module.exports = {
    context: path.resolve(__dirname, '../src'),
    module: {
        noParse: [/static|assets/],
        rules: [
            {
                test: /\.vue$/,
                exclude: exclude,
                {{#fmcomponents}}
                include: include,
                {{/fmcomponents}}
                use: [{
                    loader: 'happypack/loader?id=vue'
                }]
            },
            {
                test: /\.js$/,
                exclude: exclude,
                {{#fmcomponents}}
                include: include,
                {{/fmcomponents}}
                use: ['happypack/loader?id=js']
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[ext]?[hash:8]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[ext]?[hash:8]'
                    }
                }]
            }
        ]
    },

    resolve: {
        extensions: ['.vue', '.js'],
        modules: [path.join(__dirname, '../node_modules')],
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@components': path.resolve(__dirname, '../src/components'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },

    performance: {
        hints: false
    },

    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(env),
            CDN: JSON.stringify(cdn),
            API: JSON.stringify(api),
            BASE: JSON.stringify(base),
            'process.env': {
                'NODE_ENV': env === '"development"' ? '"development"' : '"production"'
            }
        }),

        // copy assets
        new CopyWebpackPlugin([
            { context: '../src', from: 'assets/**/*', to: path.resolve(__dirname, '../dist'), force: true }
        ]),

        new HappyPack(getHappyPackConfig({
            id: 'vue',
            loaders: ['vue-loader']
            // loaders: [{
            //     path: 'vue-loader',
            //     query: {
            //         // https://github.com/vuejs/vue-loader/issues/863
            //         esModule: false
            //     }
            // }]
        })),

        new HappyPack(getHappyPackConfig({
            id: 'js',
            loaders: ['babel-loader']
        })),


        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            env: env,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
            }
        }),

        new MxWebpackContentReplacePlugin({
            src: /(https?:)?\/\/cdn\.followme\.com\/cdn/g,
            dest: cdn,
            exts: ['html', 'js', 'json', 'css']
        })
    ]
};

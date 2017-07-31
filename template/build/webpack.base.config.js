'use strict';

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HappyPack = require('happypack'); 
let MxWebpackContentReplacePlugin = require('mx-webpack-content-replace-plugin');

let getHappyPackConfig = require('./happypack');

let config = require('../config');
let exclude = /node_modules/;
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
let {cdn, api, base} = config[env];

console.log('\n---------env------:\n', env);
console.log('\n---------cdn------:\n', cdn);
console.log('\n---------base------:\n', base);
console.log('\n---------api------:\n', api, '\n');

module.exports = {
    context: path.resolve(__dirname, "../src"),
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

    resolve:{
        extensions:[".vue",".js"],
        modules: [path.join(__dirname, '../node_modules')],
        alias:{
            '@src': path.resolve(__dirname, '../src'),
            '@components': path.resolve(__dirname, '../src/components'),
            'vue$': 'vue/dist/vue.js'
        }
    },

    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },

    performance: {
        hints: false
    },

    plugins:[
        new webpack.DefinePlugin({
            ENV: JSON.stringify(env),
            CDN: JSON.stringify(cdn),
            API: JSON.stringify(api),
            BASE: JSON.stringify(base)
        }),

        //copy assets
        new CopyWebpackPlugin([
            {context: '../src', from: 'assets/**/*', to: path.resolve(__dirname, '../{{path}}'), force: true}
        ]),

        new HappyPack(getHappyPackConfig({
            id: 'vue',
            loaders: [{
                path: 'vue-loader',
                query: {
                    // https://github.com/vuejs/vue-loader/issues/863
                    esModule: false
                }
            }]
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

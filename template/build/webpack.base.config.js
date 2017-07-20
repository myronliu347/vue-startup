'use strict';

let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HappyPack = require('happypack'); 
let MxWebpackContentReplacePlugin = require('mx-webpack-content-replace-plugin');

let getHappyPackConfig = require('./happypack');

let config = require('../config');

const env = process.env.NODE_ENV || 'development';
const prefix = env === 'development' ?
                config.prefix.development :
                env === 'staging' ? config.prefix.staging :
                env === 'preview' ? config.prefix.preview : config.prefix.production;

console.log('---------env------:', env, '------prefix-------:', prefix);

//针对 beta 环境的配置
let cdn = '';
let api = '';
let base = '';

switch(env){
    case 'development':
        cdn = 'http://cdn.followme.com/cdn';
        api = 'http://beta.api.followme.com/api/v1';
        base = 'http://www.followme.com';
        break;
    case 'staging':
        cdn = 'http://cdn.followme.com/cdn';
        api = 'http://ismemories.cn/api/v1';
        base = 'http://www.followme.com';
        break;
    case 'preview':
        cdn = 'http://cdn.followme.com/cdn';
        api = 'http://frontend.followme.com/api/v1';
        base = 'http://www.followme.com';
        break;
    case 'production':
        cdn = 'http://cdn.followme.com/cdn';
        api = 'http://www.followme.com/api/v1';
        base = 'http://www.followme.com';
        break;
    case 'beta':
        cdn = 'http://beta.www.followme.com/cdn';
        api = 'http://beta.www.followme.com/api/v1';
        base = 'http://beta.www.followme.com';
        break;
    case 'test':
        cdn = 'http://pre.followme.com/cdn';
        api = 'http://pre.followme.com/api/v1';
        base = 'http://pre.followme.com';
        break;
}

module.exports = {
    context: path.resolve(__dirname, "../src"),
    module: {
        noParse: [/static|assets/],
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'happypack/loader?id=vue'
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
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
    {{#jquery}}
    externals: {
       jquery: 'jQuery'
    },
    {{/jquery}}

    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },

    performance: {
        hints: false
    },

    plugins:[
        {{#jquery}}
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        {{/jquery}}

        new webpack.DefinePlugin({
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
          env: process.env.NODE_ENV,
          minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: false
          }
        }),

        new MxWebpackContentReplacePlugin({
            src: /\/\/cdn\.followme\.com\/cdn/g,
            dest: cdn,
            exts: ['html', 'js', 'json', 'css']
        })
    ]
};

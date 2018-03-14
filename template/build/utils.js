const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config');

const env = process.env.NODE_ENV || 'development';

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

function assetsPath (_path) {
    const assetsSubDirectory = config[env].assetsSubDirectory || 'static';
    return path.posix.join(assetsSubDirectory, _path);
}

function extractCSS (opts) {
    // only support css/less
    const options = opts || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: env !== 'development',
            sourceMap: env !== 'development',
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: env !== 'development'
        }
    };

    const loaders = [cssLoader, postcssLoader];
    if (options.lang === 'less') {
        loaders.push({
            loader: 'less-loader',
            options: {
                sourceMap: env !== 'development'
            }
        });
    }

    if (env !== 'development') {
        return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader'
        });
    } else {
        return ['vue-style-loader'].concat(loaders);
    }
}

function getExcludAndInclude () {
    let exclude = /node_modules/;
    let include = [];
    {{#fmcomponents}}
    include = [
        resolve('src'),
        resolve('node_modules/fmcomponents/src/')
    ];
    exclude = function (modulePath) {
        return /node_modules/.test(modulePath) &&
            !/node_modules\/fmcomponents/.test(modulePath);
    };
    {{/fmcomponents}}

    return {
        exclude: exclude,
        include: include
    };
}

module.exports = {
    resolve: resolve,
    assetsPath: assetsPath,
    extractCSS: extractCSS,
    getExcludAndInclude: getExcludAndInclude
};

'use strict';

let path = require('path');

module.exports =  {
    dev:{
        assetsRoot: path.resolve(__dirname, '../{{path}}'),
        assetsPublicPath: '{{publicPath}}',
        contentBase: path.resolve(__dirname, '../{{path}}'),
        port: {{port}}
    },
    build:{
        assetsRoot: path.resolve(__dirname, '../{{path}}'),
        assetsPublicPath: '{{publicPath}}',
        contentBase: path.resolve(__dirname, '../{{path}}')
    },
    prefix: {
        development: '',
        staging: '',
        preview: '',
        production: ''
    }
}

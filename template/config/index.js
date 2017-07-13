'use strict';

let path = require('path');

module.exports =  {
    dev:{
        assetsRoot: path.resolve(__dirname, '../{{path}}'),
        assetsPublicPath: '{{publicPath}}',
        contentBase: path.resolve(__dirname, '../{{path}}'),
        port: {{port}},
        env: {
            NODE_ENV: "'development'"
        }
    },
    build:{
        assetsRoot: path.resolve(__dirname, '../{{path}}'),
        assetsPublicPath: '{{publicPath}}',
        contentBase: path.resolve(__dirname, '../{{path}}'),
        env: {
            NODE_ENV: "'production'"
        }
    },
    prefix: {
        development: '',
        staging: '',
        preview: '',
        production: ''
    }
}

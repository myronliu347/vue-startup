const path = require('path');
const myIP = require('my-ip');
const utils = require('../build/utils');

module.exports = {
    development: {
        assetsRoot: utils.resolve('dist'),
        assetsPublicPath: '/',
        contentBase: utils.resolve('dist'),
        port: 8080,
        clientIp: myIP()
    },
    master: {
        assetsRoot: utils.resolve('dist'),
        assetsPublicPath: '/',
        contentBase: utils.resolve('dist'),
        cdn: '//cdn.fmfe.com',
        api: '//dev.fmfe.com',
        base: '//dev.fmfe.com',
        fmbase: '//dev.fmfe.com'
    },
    alibeta: {
        assetsRoot: utils.resolve('dist'),
        assetsPublicPath: '/',
        contentBase: putils.resolve('dist'),
        cdn: 'https://alibetacdn.followme.com',
        api: 'https://alibetawww.followme.com',
        base: 'https://alibetawww.followme.com',
        fmbase: 'https://alibetawww.followme.com'
    },
    production: {
        assetsRoot: utils.resolve('dist'),
        assetsPublicPath: '/',
        contentBase: utils.resolve('dist'),
        cdn: 'https://cdn.followme.com',
        api: 'https://www.followme.com',
        base: 'https://trade.followme.com',
        fmbase: 'https://www.followme.com'
    }
};
const path = require('path');
const myIP = require('my-ip');

module.exports = {
    dev: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../dist'),
        port: 8080,
        clientIp: myIP()
    },
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        contentBase: path.resolve(__dirname, '../dist')
    },
    development: {
        cdn: '//alibetacdn.followme.com',
        // api: '//dev.fmfe.com',
        api: 'https://alibetawww.followme.com',
        base: '//alibetawww.followme.com',
        fmbase: '//alibetawww.followme.com'
    },
    beta: {
        cdn: '//cdn.fmfe.com',
        api: '//dev.fmfe.com',
        base: '//dev.fmfe.com',
        fmbase: '//dev.fmfe.com'
    },
    alibeta: {
        cdn: '//alibetacdn.followme.com',
        api: '//alibetawww.followme.com',
        base: '//alibetatrade.followme.com',
        fmbase: '//alibetawww.followme.com'
    },
    production: {
        cdn: '//cdn.followme.com',
        api: '//www.followme.com',
        base: '//trade.followme.com',
        fmbase: '//www.followme.com'
    }
};
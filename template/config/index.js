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
        cdn: 'https://cdn.followme.com/cdn',
        // api: '//dev.fmfe.com',
        api: 'https://alibetawww.followme.com',
        base: 'https://www.followme.com'
    },
    staging: {
        cdn: '//cdn.followme.com/cdn',
        api: '//beta.api.followme.com',
        base: '//www.followme.com'
    },
    preview: {
        cdn: '//cdn.followme.com/cdn',
        api: '//frontend.followme.com',
        base: '//www.followme.com'
    },
    beta: {
        cdn: '//beta.www.followme.com/cdn',
        api: '//beta.www.followme.com',
        base: '//beta.www.followme.com'
    },
    production: {
        cdn: '//cdn.followme.com/cdn',
        api: '//www.followme.com',
        base: '//www.followme.com'
    },
    test: {
        cdn: '//pre.followme.com/cdn',
        api: '//pre.followme.com',
        base: '//pre.followme.com'
    }
};
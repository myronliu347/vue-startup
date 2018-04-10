const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    target: 'node',
    devtool: false,
    entry: {
        app: resolve('../src/skeleton/entry.js')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    output: {
        path: resolve('../dist'),
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            use: [
                                'css-loader',
                                'postcss-loader',
                                'less-loader'
                            ],
                            fallback: 'vue-style-loader'
                        }),
                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'postcss-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                },
                include: [resolve('../src')]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('../src')]
            }
        ]
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: []
};

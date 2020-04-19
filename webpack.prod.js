const resolve = require('path').resolve;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BABEL_CONFIG = {
    presets: ['@babel/env', '@babel/react']
};

const config = {
    mode: 'production',

    entry: {
        app: resolve('./src/index.js')
    },

    output: {
        library: 'MapGLGeophotos',
        chunkFilename: '[name].bundle.js',
        path: resolve('public')
    },

    optimization: {
        usedExports: true,
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },

    module: {
        rules: [
            {
                // Compile ES2015 using babel
                test: /\.js$/,
                include: [resolve('.')],
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: BABEL_CONFIG
                    }
                ]
            },
            {
                // enable SASS loading
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                // enable CSS loading
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                // JSON loading + geoJSON
                test: /\.geojson$/,
                use: ['json-loader']
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css',
        })
    ]
};

module.exports = config;

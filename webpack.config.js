const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const root = pathname => path.resolve(__dirname, pathname);
const devMode = process.env.NODE_ENV !== 'production';
const excludePaths = [/node_modules/, /2014/, /2015/, /2016/, /2017/];

module.exports = {
    mode: process.env.NODE_ENV,

    devtool: devMode ? 'source-map' : false,

    context: root('src'),

    entry: {
        index: root('src/js/index.js')
    },

    output: {
        path: root('dist'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.js', '.html'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: excludePaths,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            },
            {
                test: /index\.html$/,
                exclude: excludePaths,
                use: [{
                    loader: 'html-loader',
                    // options: {
                    //     minimize: true
                    // }
                }],
            },
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: root('src/index.html'),
            inject: true,
            cache: false,
            filename: devMode ? 'index.html' : '../index.html'
        }),
        // new CopyWebpackPlugin([
        //     {
        //         from: 'model/**/*',
        //         to: root('dist/')
        //     }
        // ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        // new BrowserSyncPlugin({
        //     host: 'localhost',
        //     port: 8123,
        //     proxy: 'http://localhost:8080/'
        // }),
        // ...(
        //     !devMode
        //         ? [new webpack.LoaderOptionsPlugin({
        //             minimize: true,
        //             debug: false
        //         })]
        //         : []
        // )
    ]
}

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const root = pathname => path.resolve(__dirname, pathname);
const devMode = process.env.NODE_ENV !== 'production';
const excludePaths = [/node_modules/, /2014/, /2015/, /2016/, /2017/];

module.exports = {
    mode: process.env.NODE_ENV,

    devtool: devMode ? 'cheap-module-eval-source-map' : false,

    context: root('src'),

    entry: {
        app: root('src/js/app.js')
    },

    output: {
        path: root('dist'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.js', '.html'],
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
                    options: {
                        minimize: true
                    }
                }],
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: root('src/index.html'),
            inject: true,
            cache: false,
            filename: '../index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'model/**/*',
                to: root('dist/')
            }
        ]),
        ...(
            !devMode
                ? [new webpack.LoaderOptionsPlugin({
                    minimize: true,
                    debug: false
                })]
                : []
        )
    ]
}

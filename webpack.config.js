const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.TARGET;
const ROOT_PATH = path.resolve(__dirname);

//Common configuration settings
const common = {
    entry: path.resolve(ROOT_PATH, 'src/index.js'),
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules'],
    },
    output: {
        path: path.resolve(ROOT_PATH, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: path.resolve(ROOT_PATH, 'src'),
            },
            {
                test: /\.png.*$/,
                loaders: ['url-loader?limit=100000&mimetype=image/png'],
                exclude: /node_modules/,
            },
        ],
    },
};

//Development configuration settings
if (TARGET === 'dev') {
    module.exports = merge(common, {
        devtool: 'inline-source-map',
        devServer: {
            publicPath: 'http://localhost:8182/',
            port: '8182',
            host: '0.0.0.0',
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            contentBase: 'dist',
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development'),
                },
                __DEV__: true,
            }),
        ],
    });
}

//Production configuration settings
if (TARGET === 'build') {
    module.exports = merge(common, {
        entry: {
            'react-phone-input': path.resolve(ROOT_PATH, 'src/index.js'),
        },
        output: {
            path: path.resolve(ROOT_PATH, 'dist'),
            filename: 'index.js',
            library: 'ReactPhoneInput',
            libraryTarget: 'umd',
        },
        externals: [
            {
                lodash: 'lodash',
                react: {
                    root: 'React',
                    commonjs2: 'react',
                    commonjs: 'react',
                    amd: 'react',
                },
                'styled-components': {
                    commonjs: 'styled-components',
                    commonjs2: 'styled-components',
                    amd: 'styled-components',
                },
            },
        ],
        optimization: {
            minimize: true,
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                },
                __DEV__: false,
            }),
        ],
    });
}

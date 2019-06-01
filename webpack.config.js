const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, "src/main.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        inline: true,
        hot: true
    },

    resolve:{
        extensions: ['.js', '.jsx'],
        alias:{
            '#': path.resolve(__dirname, './src')
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html",
            favicon: path.resolve(__dirname, "src/assets/favicon.ico")
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { modules: true } }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|jpeg|glb|gltf|ttf|woff)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'assets',
                            name: '[name]-[hash:8].[ext]'
                        }
                    }
                ]
            },
        ]
    }
};
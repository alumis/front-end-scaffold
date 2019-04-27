const path = require("path");
const ObservableI18nPlugin = require("@alumis/observables-i18n");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss"],
        modules: [
            "node_modules",
            "src",
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    //{ loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                            localIdentName: "[hash:base64:5]"
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function () {
                                return [
                                    require("precss"),
                                    require("autoprefixer")
                                ];
                            }
                        }
                    },
                    { loader: "sass-loader" }
                ]
            }
        ]
    },
    plugins: [
        new ObservableI18nPlugin({
            defaultLanguageCode: "nob",
            languageCodes: ["nob", "eng"]
        }),
        new HtmlWebpackPlugin({
            title: "Alumis App",
            template: "./src/index.html",
            filename: "index.html",
            hash: true
        }),
        new MiniCssExtractPlugin()
    ],
    devtool: "inline-source-map"
};
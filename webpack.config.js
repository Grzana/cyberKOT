var path = require("path");

module.exports = {
    entry:"./src/app.jsx",
    output: { filename: "out.js", path: path.resolve(__dirname, "js") },
    mode: "development", watch: true,
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "stage-2", "react"]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                new require('autoprefixer')({
                                    browsers: ['Chrome > 60']
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }]
    }
};
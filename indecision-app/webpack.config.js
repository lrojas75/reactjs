const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    // loader
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/, //files that end in .js
            exclude: /node_modules/,
            options: {
                presets: [
                    "@babel/preset-react", 
                    "@babel/preset-env"
                ]
            }
        }]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: path.join(__dirname, 'public')
    }
};
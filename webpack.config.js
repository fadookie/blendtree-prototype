const PathModule = require('path')

module.exports = {
    mode: 'development',
    devtool: 'none',
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: PathModule.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: PathModule.join(__dirname, 'dist')
    }
}


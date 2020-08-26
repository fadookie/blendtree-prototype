const PathModule = require('path')

module.exports = {
    mode: 'development',
    devtool: 'none',
    target: 'node',
    entry: './index.js',
    output: {
        filename: 'index.js',
        path: PathModule.resolve(__dirname, 'build')
    }
}


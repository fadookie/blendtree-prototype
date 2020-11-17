const PathModule = require('path')
const GitRevisionPlugin = require('git-revision-webpack-plugin')

// const getDepPath = pathFragment => PathModule.resolve(
//     __dirname,
//     `./node_modules/${pathFragment}`
// );

module.exports = {
    mode: 'development',
    devtool: 'none',
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        sourceMapFilename: 'index.js.map',
        path: PathModule.resolve(__dirname, 'docs')
    },
    devServer: {
        contentBase: PathModule.join(__dirname, 'docs')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
      new GitRevisionPlugin()
    ]
}


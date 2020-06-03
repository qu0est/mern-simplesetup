const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "browser",
    //* MODE sets process.env.NODE_ENV to the given value and tells Webpack to use
    //* its built-in optimizations accordingly. if not set explicitly, it defaults to
    //*production. also, it could be set via the cli by passing the value as a cli argument
    mode: "development",
    //! DEVTOOLS specifies how source map are generate, if at all. Generally, a source map
    //! provides a way of mapping code within a compressed file back to it's original position
    //! in a source file to aid debugging.     
    devtools: 'eval-source-map',
    //? ENTRY specifies the entry file where Webpack starts bundling, in this case with 
    //? the main.js file in the client folder
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ],
    //* OUTPUT specifies the output path for the bundled code, in this case set to dist/bundle.js
    //? PUBLICPATH allows specifying the base path for all assets in the application
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    //! MODULE sets the regex rule for the file extension to be used for transpilation
    //! and the folders to be excluded. The transpilation tool to be used here is babel-loader.
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    //TODO HOTMODULEREPLACEMENTPLUGIN enables hot module replacement for react-hot-loader. 
    //TODO NOEMITONERRORSPLUGIN allows skipping emitting when there are compile errors. 
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }
 }

module.exports = config
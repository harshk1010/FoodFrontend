

const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: 'file-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // For modern JS and React JSX
                    },
                },
            },
        ],
    },
    resolve: {
        // fullySpecified: false,
        extensions : [`.js`,`.jsx`,`.json`],
        fallback: {
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            process: require.resolve('process/browser'),  
            assert: require.resolve('assert/'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            stream: require.resolve('stream-browserify'),
        },
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        fallback: {
            os: false, // Use an empty module for 'os'
        },
    },
    
    // resolve: {
    //     fallback: {
    //       fs: false,         // Add this to prevent issues with 'fs' module in the browser
    //       path: false,       // Add this to handle 'path' module issues
    //       process: require.resolve('process/browser'),  // Polyfill for 'process'
    //     },
    //   },
    plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
    mode : 'development',
    devtool : 'source-map',
    
};

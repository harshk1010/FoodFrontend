const webpack = require('webpack');

module.exports = function override(config, env) {
    // Add fallback for 'os'
    config.resolve.fallback = {
        ...config.resolve.fallback,
        os: require.resolve('os-browserify/browser'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      );
    return config;
};

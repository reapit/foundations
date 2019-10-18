module.exports = {
  webpack: function(config, env) {
    config.output.filename = 'bundle.min.js'

    // Disable chunk - create only one file when building, without hash
    delete config.output.chunkFileName
    delete config.optimization.splitChunks
    delete config.optimization.runtimeChunk
    config.plugins.splice(1,1)
    return config;
  },
  jest: function(config) {
    config.setupFiles = [...config.setupFiles, '<rootDir>/jest-setup.js']
    config.snapshotSerializers = ['enzyme-to-json/serializer']
    return config;
  },
  // The paths config to use when compiling your react app for development or production.
  paths: function(paths, env) {
    // ...add your paths config
    return paths;
  },
}
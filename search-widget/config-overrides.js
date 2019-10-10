module.exports = {
  webpack: function(config, env) {
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
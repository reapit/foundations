module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react', '@linaria'],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],
  ],
}

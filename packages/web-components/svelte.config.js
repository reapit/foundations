const sveltePreprocess = require('svelte-preprocess')

module.exports = {
  dev: process.env.NODE_ENV !== 'development',
  preprocess: sveltePreprocess(),
}

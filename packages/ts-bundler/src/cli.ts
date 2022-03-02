import { bundle } from './ts-bundler'

bundle({
  relModuleDir: '.',
  isIncremental: process.argv.includes('--incremental'),
})

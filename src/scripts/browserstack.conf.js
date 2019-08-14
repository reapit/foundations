const BSReporter = require('./browserstack-reporter')
BSReporter.reporterName = 'browserstack'

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  specs: ['./src/tests/webdriver/specs/login.ts'],

  capabilities: [
    {
      browserName: 'Chrome',
      browser_version: '75.0'
    },
    {
      browserName: 'Firefox',
      browser_version: '68.0'
    },
    {
      browserName: 'Safari',
      browser_version: '12.0'
    },
    {
      browserName: 'Edge',
      browser_version: '18.0'
    },
    {
      browserName: 'IE',
      browser_version: '11.0'
    }
  ].map(c => ({
    ...c,
    project: 'reapit/app-store',
    build: process.env.BROWSER_STACK_BUILD || 'Unknown build',
    'browserstack.local': process.env.BROWSERSTACK_LOCAL || 'true',
    'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER
  })),

  baseUrl: 'http://localhost:8080',

  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 20000
  },

  reporters: [BSReporter],
  reporterOptions: {
    browserstack: {
      outputDir: './'
    }
  },

  before: function(capabilities, specs) {
    require('ts-node').register({
      project: 'src/tests/webdriver/tsconfig.json'
    })
  }
}

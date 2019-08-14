var util = require('util'),
  events = require('events'),
  path = require('path'),
  fs = require('fs'),
  mkdirp = require('mkdirp')

var BrowserStackReporter = function(baseReporter, config, options = {}) {
  this.reporterName = 'browserstack'
  this.baseReporter = baseReporter
  this.config = config
  this.options = options
  this.specs = {}

  this.on('end', function() {
    onSingleFileOutput()
  })

  function onSingleFileOutput() {
    const xml = prepareXml(baseReporter.stats.runners)
    let filename = `REPORT-browserstack.all.xml`
    write(filename, xml)
  }

  function prepareName(name = 'Skipped test') {
    return name
      .split(/[^a-zA-Z0-9]+/)
      .filter(item => item && item.length)
      .join('_')
  }

  function prepareXml(runners) {
    var xmlbuilder = require('xmlbuilder')
    const builder = xmlbuilder.create('testsuites', { encoding: 'UTF-8', allowSurrogateChars: true })
    var testCaseIndex = 0
    for (const key of Object.keys(runners)) {
      const capabilities = runners[key]
      const packageName = options.packageName
        ? `${capabilities.sanitizedCapabilities}-${options.packageName}`
        : capabilities.sanitizedCapabilities
      for (let specId of Object.keys(capabilities.specs)) {
        const spec = capabilities.specs[specId]

        for (let suiteKey of Object.keys(spec.suites)) {
          if (suiteKey.match(/^"before all"/)) {
            continue
          }

          const suite = spec.suites[suiteKey]
          const suiteName = prepareName(suite.title)
          const testSuite = builder.ele('testsuite', { name: suiteName })

          for (let testKey of Object.keys(suite.tests)) {
            if (testKey !== 'undefined') {
              const test = suite.tests[testKey]
              const testName = prepareName(test.title)
              const testCase = testSuite.ele('testcase', {
                name: testName,
                id: `${suiteName}.${testName}{0}`,
                index: 0
              })
              testCase.ele('session', {}, runners[key].sessionID)
              if (test.state === 'pending') {
                testCase.ele('skipped')
              }
            }
          }
        }
      }
    }
    return builder.end({ pretty: true })
  }

  function write(filename, xml) {
    var outputDir = '.'
    if (this.options && typeof this.options.outputDir == 'string') {
      outputDir = this.options.outputDir
    }
    outputDir = `${outputDir}/browserstack-reports`

    try {
      const dir = path.resolve(outputDir)
      const filepath = path.join(dir, filename)
      mkdirp.sync(dir)
      fs.writeFileSync(filepath, xml)
      console.log(`Wrote xunit report "${filename}" to [${outputDir}].`)
    } catch (e) {
      console.log(`Failed to write xunit report "${filename}"
       to [${outputDir}]. Error: ${e}`)
    }
  }

  function format(val) {
    return JSON.stringify(baseReporter.limit(val))
  }
}

util.inherits(BrowserStackReporter, events.EventEmitter)

module.exports = BrowserStackReporter

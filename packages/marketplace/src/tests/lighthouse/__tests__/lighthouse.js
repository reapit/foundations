const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const CONSTANTS = require('../lighthouse-config')
// 2.5 minutes max to run each test - will fail if exceeds this.
// Currently takes ~5minutes to run entire suite basis 2 Chrome instances so should never make this
// limit. Just there so tests will eventually exit and not hang the pipeline.
jest.setTimeout(150000)

// Returns an object with keys specified in the CONSTANTS.lighthouseOptions.onlyCategories array.
const sortLighthouseReport = results => {
  const categoryReport = {}

  Object.keys(results.categories).forEach(categoryName => {
    const category = results.categories[categoryName]

    categoryReport[category.id] = Math.round(category.score * 100)
  })

  return categoryReport
}

// Runs the lighthouse test on your URL with options and returns the report
const runLighthouse = async (url, chrome) => {
  const results = await lighthouse(url, {
    ...CONSTANTS.lighthouseOptions,
    port: chrome.port
  })

  return sortLighthouseReport(results.lhr)
}

// Results is an array of each test result run. I want an average score for each, returns this as
// an object of keys in CONSTANTS.lighthouseOptions.onlyCategories array
const getAverageResults = results =>
  results.reduce((current, next, index) => {
    if (!index) {
      return next
    }

    Object.keys(current).forEach(key => {
      current[key] = current[key] += next[key]

      if (index === results.length - 1) {
        current[key] = Math.round(current[key] / (index + 1))
      }
    })

    return current
  }, {})

// If I want one instance of chrome to run the tests one at a time, will execute each run in turn.
// Slower to run but gives a more reliable score.
const getResultsSequentially = async (url, chrome) =>
  getAverageResults([
    // Add additional await runLighthouse(url, chrome) commands here to increase the number of
    // test runs to be executed.
    await runLighthouse(url, chrome),
    await runLighthouse(url, chrome),
    await runLighthouse(url, chrome)
  ])

// If I want multiple instances of chrome to run the tests in parallel, will all at the same time.
// Much faster to run but gives occassional outlier results, less stable for CI.
const getResultsInParallel = async (url, chromeInstances) =>
  getAverageResults(await Promise.all(chromeInstances.map(chrome => runLighthouse(url, chrome))))

// Determines if I need ro run in paralel or sequentially based on CONSTANTS.paralleliseChrome.
const getResults = (url, chromeInstances) =>
  CONSTANTS.paralleliseChrome
    ? getResultsInParallel(url, chromeInstances)
    : getResultsSequentially(url, chromeInstances)

// Helpful for debugging, logs out acutal scores vs benchmark. SUCCESS if actual over benchmark,
// WARNING if within tolerance specified in CONSTANTS, ERROR if less than benchmark, less tolerance
const logger = (results, item) => {
  Object.keys(results).forEach(key => {
    const expected = item.expected[key]
    const actual = results[key]
    const passMessage =
      expected <= actual ? 'SUCCESS:' : expected - actual <= CONSTANTS.tolerence[key] ? 'WARNING:' : 'ERROR:'

    // eslint-disable-next-line no-console
    console.log(`${passMessage} ${item.page} page score for ${key} was `, `${actual}. Benchmark was ${expected}.`)
  })
}

// This is the actual assertion, compares expected benchmarks in config against actual values.
// Will only fail if tolerance is exceeded.
const executeTest = (results, config) => {
  logger(results, config)

  Object.keys(results).forEach(key => {
    expect(results[key]).toBeGreaterThanOrEqual(config.expected[key] - CONSTANTS.tolerence[key])
  })
}

describe('Lighthouse Tests', function() {
  const { chromeLauncherOptions } = CONSTANTS

  // I need to instantiate an appropriate number of Chrome instances depending on whether I want
  // to run tests sequentially or in parallel
  beforeAll(async () => {
    this.chromeInstances = CONSTANTS.paralleliseChrome
      ? await Promise.all([
          // I am running in paralel, add a chromeLauncher.launch() command for each required
          // instance of Chrome to run in paralell
          chromeLauncher.launch(chromeLauncherOptions),
          chromeLauncher.launch(chromeLauncherOptions),
          chromeLauncher.launch(chromeLauncherOptions)
        ])
      : // Every test run will be in the same instance of Chrome
        await chromeLauncher.launch(chromeLauncherOptions)
  })

  // Run all the tests in the config
  CONSTANTS.configs.forEach(config => {
    it(`should test the lighthouse score for the ${config.page} page`, async () => {
      const results = await getResults(config.url, this.chromeInstances)

      executeTest(results, config)
    })
  })

  afterAll(() => {
    // I need to kill all instanced of Chrome I have started.
    CONSTANTS.paralleliseChrome
      ? this.chromeInstances.forEach(instance => {
          instance.kill()
        })
      : this.chromeInstances.kill()
  })
})

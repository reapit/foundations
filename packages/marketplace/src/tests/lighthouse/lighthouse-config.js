const urlBase = 'http://localhost:8080'

module.exports = {
  // Determines if I want to run a single or multiple Chrome instances.
  paralleliseChrome: false,
  // For each metric, I allow a default failure tolerance to allow for the flakiess of the
  // lighthouse tests. Sometimes still get false fails so increase tolerance if happening too often.
  tolerence: {
    // Tolerance set quite high as the SEO target score for performance is 65 and we are currently averaging below this.
    // We should adjust these tolerances and the expected benchmarks as performance is imroved.
    performance: 10,
    pwa: 10,
    accessibility: 10,
    'best-practices': 10,
    seo: 10
  },
  lighthouseOptions: {
    // Choose which device type to simulate (options: mobile/desktop/none). default is mobile.
    emulatedFormFactor: 'mobile',
    // If you want to run in desktop mode
    // disableDeviceEmulation: true,
    // If you want to remove throttling, by default Lighthouse uses "fast 3G, 1.5mb/s"
    // throttlingMethod: 'provided',
    onlyCategories: [
      // comment out categories if we want to limit the number of lighthouse audits and / or speed up the tests.
      'performance'
      // 'pwa',
      // 'accessibility',
      // 'best-practices',
      // 'seo'
    ]
  },
  configs: [
    {
      page: 'Home',
      url: `${urlBase}/`,
      expected: {
        performance: 50,
        pwa: 50,
        accessibility: 50,
        'best-practices': 50,
        seo: 50
      }
    },
    {
      page: 'Item',
      url: `${urlBase}/item/`,
      expected: {
        performance: 50,
        pwa: 50,
        accessibility: 50,
        'best-practices': 50,
        seo: 50
      }
    }
  ],
  chromeLauncherOptions: {
    // Comment out if we want to run on a real Chrome instance
    chromeFlags: ['--headless']
  }
}

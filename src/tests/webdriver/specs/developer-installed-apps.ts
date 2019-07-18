import DeveloperInstalledApps from '../page-objects/developer-installed-apps'

describe('DeveloperInstalledApps', () => {
  beforeEach(() => {
    DeveloperInstalledApps.open()
    DeveloperInstalledApps.cardContainer.waitForVisible()
  })

  it('should load the page correctly', () => {
    // TODO: will re-write the test after e2e test for login is ready
    // expect(DeveloperInstalledApps.allCards.length).toBe(7)
  })

  afterEach(() => {
    browser.localStorage('DELETE', 'token')
  })
})

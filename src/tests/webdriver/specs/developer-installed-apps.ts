import DeveloperInstalledApps from '../page-objects/developer-installed-apps'

describe('DeveloperInstalledApps', () => {
  beforeEach(() => {
    DeveloperInstalledApps.open()
    DeveloperInstalledApps.cardContainer.waitForVisible()
  })

  it('should load the page correctly', () => {
    // TODO: this is a fake test for mock data render
    // should be more relevant tests when integrate with the real API(s)
    expect(DeveloperInstalledApps.allCards.length).toBe(7)
  })

  afterEach(() => {
    browser.localStorage('DELETE', 'token')
  })
})

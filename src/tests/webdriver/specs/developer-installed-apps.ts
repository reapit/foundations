import DeveloperInstalledApps from '../page-objects/developer-installed-apps'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

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
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

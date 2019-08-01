import InstalledAppsPage from '../page-objects/installed-apps'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

describe('InstalledAppsPage', () => {
  beforeEach(() => {
    InstalledAppsPage.open()
    InstalledAppsPage.cardContainer.waitForVisible()
  })

  it('should load the page correctly', () => {
    // TODO: will re-write the test after e2e test for login is ready
    // expect(InstalledAppsPage.allCards.length).toBe(7)
  })

  afterEach(() => {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

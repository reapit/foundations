import InstalledAppsPage from '../page-objects/installed-apps'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'
import { APPS_PER_PAGE } from '../../../constants/paginator'

describe('InstalledAppsPage', () => {
  beforeEach(() => {
    InstalledAppsPage.open()
    InstalledAppsPage.cardContainer.waitForVisible()
  })

  it('should load the page correctly', () => {
    expect(InstalledAppsPage.heading.getText()).toEqual('Installed Apps')
    expect(InstalledAppsPage.allCards.length).toBeLessThanOrEqual(APPS_PER_PAGE)
  })

  afterEach(() => {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

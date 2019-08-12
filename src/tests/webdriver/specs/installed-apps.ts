import InstalledAppsPage from '../page-objects/installed-apps'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

const ITEMS_PER_PAGE = 10

describe('InstalledAppsPage', () => {
  beforeEach(() => {
    InstalledAppsPage.open()
    InstalledAppsPage.cardContainer.waitForVisible()
  })

  it('should load the page correctly', () => {
    expect(InstalledAppsPage.heading.getText()).toEqual('Installed Apps')
    expect(InstalledAppsPage.allCards.length).toBeLessThanOrEqual(ITEMS_PER_PAGE)
  })

  afterEach(() => {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

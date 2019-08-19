import DeveloperHomePage from '../page-objects/developer-home'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'
import { APPS_PER_PAGE } from '../../../constants/paginator'

describe('DeveloperHomePage', () => {
  beforeEach(() => {
    DeveloperHomePage.open()
    DeveloperHomePage.cardContainer.waitForVisible()
  })

  it('should load the page correctly', () => {
    expect(DeveloperHomePage.heading.getText()).toEqual('My Apps')
    expect(DeveloperHomePage.allCards.length).toBeLessThanOrEqual(APPS_PER_PAGE)
  })

  afterEach(() => {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

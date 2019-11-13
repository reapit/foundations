import DeveloperHomePage from '../page-objects/developer-manage-apps'
import { APPS_PER_PAGE } from '../../../constants/paginator'
import Common from '../shared/common'

describe('Developer Manage Apps Page', () => {
  beforeAll(() => {
    Common.createApp()
  })

  beforeEach(() => {
    DeveloperHomePage.open()
    DeveloperHomePage.cardContainer.waitForVisible()
  })

  it('should load the page correctly', () => {
    expect(DeveloperHomePage.heading.getText()).toEqual('My Apps')
    expect(DeveloperHomePage.allCards.length).toBeLessThanOrEqual(APPS_PER_PAGE)
    expect(DeveloperHomePage.allCards.length).toBeGreaterThanOrEqual(1)
  })

  it('should find the app submitted in the list', () => {
    expect(Common.appId.length).toBeGreaterThan(0)
    const testString = DeveloperHomePage.getAppCardByName().getAttribute('data-test') as string
    expect(testString.split('_')[1]).toEqual(Common.appId)
  })

  afterAll(() => {
    Common.tearDown()
  })
})

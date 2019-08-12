import ClientPage from '../page-objects/client'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

const ITEMS_PER_PAGE = 10

describe('ClientPage', () => {
  beforeEach(() => {
    ClientPage.open()
    ClientPage.cardContainer.waitForVisible()
  })

  it('should load the page correctly', () => {
    expect(ClientPage.heading.getText()).toEqual('Browse Apps')
    expect(ClientPage.allCards.length).toBeLessThanOrEqual(ITEMS_PER_PAGE)
  })

  afterEach(() => {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

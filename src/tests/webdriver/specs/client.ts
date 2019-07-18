import ClientPage from '../page-objects/client'

describe('ClientPage', () => {
  beforeEach(() => {
    ClientPage.open()
    ClientPage.cardContainer.waitForVisible()
  })

  it('should load the page correctly', () => {
    // TODO: will re-write the test after e2e test for login is ready
    // expect(ClientPage.allCards.length).toBe(3)
  })

  afterEach(() => {
    browser.localStorage('DELETE', 'token')
  })
})

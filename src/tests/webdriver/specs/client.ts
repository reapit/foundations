import ClientPage from '../page-objects/client'

describe('ClientPage', () => {
  beforeEach(() => {
    ClientPage.open()
    ClientPage.cardContainer.waitForVisible()
  })

  it('should load the page correctly', () => {
    // TODO: this is a fake test for mock data render
    // should be more relevant tests when integrate with the real API(s)
    expect(ClientPage.allCards.length).toBe(3)
  })

  afterEach(() => {
    browser.localStorage('DELETE', 'token')
  })
})

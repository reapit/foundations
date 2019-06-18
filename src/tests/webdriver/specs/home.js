const HomePage = require('../page-objects/home')

describe('HomePage', () => {
  beforeEach(() => {
    HomePage.open()
  })

  it('should load', () => {
    expect(HomePage.root).not.to.be.undefined
  })
})

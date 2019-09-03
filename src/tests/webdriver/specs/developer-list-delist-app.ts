import Common from '../shared/common'
import ClientBrowseAppsPage from '../page-objects/client-browse-apps'
import LoginPage from '../page-objects/login'

describe('Developer List Delist App', () => {
  beforeAll(() => {
    Common.createApp()
  })

  it('should list an app', () => {
    ClientBrowseAppsPage.handleListing()

    LoginPage.logAsClient()

    ClientBrowseAppsPage.open()
    ClientBrowseAppsPage.cardContainer.waitForVisible()
    ClientBrowseAppsPage.getAppCardById().waitForVisible()
  })

  it('should de-list app', () => {
    LoginPage.logAsDeveloper()

    ClientBrowseAppsPage.handleListing()

    LoginPage.logAsClient()

    ClientBrowseAppsPage.open()
    ClientBrowseAppsPage.cardContainer.waitForVisible()
    expect(!ClientBrowseAppsPage.getAppCardById().isExisting()).toBe(true)
  })

  afterEach(() => {
    Common.logout()
  })

  afterAll(() => {
    LoginPage.logAsDeveloper()
    Common.tearDown()
  })
})

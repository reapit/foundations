import { APPS_PER_PAGE } from '../../../constants/paginator'
import LoginPage from '../page-objects/login'
import Common from '../shared/common'
import ClientBrowseAppsPage from '../page-objects/client-browse-apps'
import ClientInstalledAppsPage from '../page-objects/client-installed-apps'
import AppDetailModal from '../page-objects/app-detail-modal'

describe('Client Browse Install Apps', () => {
  beforeAll(() => {
    Common.createApp()
  })

  it('should load the listed apps page correctly', () => {
    // Would put this in the beforeAll but the pauses in the setup mean tests start executing
    // before the setup is done
    ClientBrowseAppsPage.handleListing()
    LoginPage.logAsClient()
    ClientBrowseAppsPage.open()
    ClientBrowseAppsPage.cardContainer.waitForVisible()
    expect(ClientBrowseAppsPage.heading.getText()).toEqual('Browse Apps')
    expect(ClientBrowseAppsPage.allCards.length).toBeLessThanOrEqual(APPS_PER_PAGE)
    expect(ClientBrowseAppsPage.allCards.length).toBeGreaterThan(0)
  })

  it('should correctly install an app', () => {
    // As above, can't put login in before each / all
    LoginPage.logAsClient()
    ClientBrowseAppsPage.open()
    ClientBrowseAppsPage.getAppCardById().waitForVisible()
    ClientBrowseAppsPage.openAppDetailModal()
    AppDetailModal.installApp()
    browser.pause(1000)
    ClientInstalledAppsPage.open()
    ClientInstalledAppsPage.cardContainer.waitForVisible()

    expect((ClientInstalledAppsPage.appCardByName.getAttribute('data-test') as string).split('_')[1]).toEqual(
      Common.appId
    )
  })

  it('should correctly uninstall an app', () => {
    // As above, can't put login in before each / all
    LoginPage.logAsClient()
    ClientBrowseAppsPage.open()
    ClientBrowseAppsPage.getAppCardById().waitForVisible()
    ClientBrowseAppsPage.openAppDetailModal()
    AppDetailModal.unInstallApp()
    browser.pause(1000)
    ClientInstalledAppsPage.open()
    ClientInstalledAppsPage.cardContainer.waitForVisible()

    expect(!!ClientInstalledAppsPage.appCardByName.isExisting()).toBe(false)
  })

  afterEach(() => {
    Common.logout()
  })

  afterAll(() => {
    LoginPage.logAsDeveloper()
    Common.tearDown()
  })
})

import DeveloperSubmitAppPage from '../page-objects/developer-submit-app'
import DeveloperHomePage from '../page-objects/developer-home'
import CommonPage from '../page-objects/common'
import ApprovalsPage from '../page-objects/approvals'
import BrowserAppPage from '../page-objects/browse-app'
import AppDetailModal from '../page-objects/app-detail-modal'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000
describe('InstalledAppsPage', () => {
  it('Work when Submit An App -> List App -> Approve -> Install App ', () => {
    const appName =
      'Installed App ' +
      Math.random()
        .toString(36)
        .slice(-5)

    // Create An App
    DeveloperSubmitAppPage.openUsingCustomAccount({
      email: 'phmngocnghia@gmail.com',
      password: 'myPassword12345'
    })
    DeveloperSubmitAppPage.submitApp(appName)

    // // Edit App Set It as listed
    // DeveloperHomePage.openWithoutLogin()
    // TODO
    /**
     * App Input:
     */
    DeveloperHomePage.openWithoutLogin()
    const appId = DeveloperHomePage.getAppId(appName)
    DeveloperHomePage.enableAppListed(appName)

    // Logout
    CommonPage.logout()

    // Log as admin to approve merge detail
    ApprovalsPage.open()
    ApprovalsPage.approveAppChange(appId)

    // Logout
    CommonPage.logout()

    // Install CTA should be dispared
    BrowserAppPage.open()
    BrowserAppPage.openAppDetailModal(appId)
    AppDetailModal.installApp()

    // Assert visibility of cta
    BrowserAppPage.openAppDetailModal(appId)
    AppDetailModal.btnAppDetailInstallApp.waitForVisible(1000, true)
    AppDetailModal.btnAppDetailUninstallApp.waitForVisible()
  })

  afterEach(() => {
    CommonPage.logout()
  })
})

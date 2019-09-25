import DeveloperSubmitAppPage from '../page-objects/developer-submit-app'
import DeveloperManageAppsPage from '../page-objects/developer-manage-apps'
import LoginPage from '../page-objects/login'
import { COOKIE_SESSION_KEY } from '@reapit/elements'

export type WdElement = WebdriverIO.Client<WebdriverIO.RawResult<WebdriverIO.Element>> &
  WebdriverIO.RawResult<WebdriverIO.Element>

class Common {
  // Common is a singleton class so I preserve the appName and appId throughout the test run
  static _instance: Common
  static get instance() {
    if (!Common._instance) {
      Common._instance = new Common()
    }
    return Common._instance
  }

  testField = ''
  appId = ''
  appName = ''

  constructor() {
    this.appName = `Automated App ${this.randomString()}`
  }

  get toggleAccountMenu() {
    return $('[data-test="ctaAccountMenu"]')
  }

  get modalCloseButton() {
    return $('[data-test="modal-close-button"]')
  }

  closeModal() {
    this.modalCloseButton.waitForVisible()
    return this.modalCloseButton.click()
  }

  getIdFromTestData(element: WdElement) {
    return (element.getAttribute('data-test') || '').split('_')[1]
  }

  setTestField(value: string) {
    this.testField = value
  }

  getTestField() {
    return this.testField
  }

  removeTestField() {
    this.testField = ''
  }

  randomString() {
    return Math.random()
      .toString(36)
      .slice(-5)
  }

  setAppName(appName: string) {
    this.appName = appName
  }

  setAppId() {
    DeveloperManageAppsPage.open()
    const appId = DeveloperManageAppsPage.getAppId()
    this.appId = appId
  }

  createApp() {
    LoginPage.logAsDeveloper()
    DeveloperSubmitAppPage.open()
    DeveloperSubmitAppPage.form.waitForVisible()
    DeveloperSubmitAppPage.submitApp()
    this.setAppId()
  }

  deleteApp() {
    DeveloperManageAppsPage.deleteApp()
  }

  tearDown() {
    this.deleteApp()
    this.logout()
  }

  logout() {
    browser.pause(10)
    browser.cookie('DELETE', COOKIE_SESSION_KEY)
    browser.pause(10)
  }
}

export default Common.instance

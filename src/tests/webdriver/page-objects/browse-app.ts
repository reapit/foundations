import Base from './base'
import LoginPage from './login'

class BrowserAppPage extends Base {
  get route() {
    return '/client/apps'
  }
  get cardContainer() {
    return $('[data-test="app-list-container"]')
  }

  getAppCardById(id) {
    return $(`[data-test*='${id}']`)
  }

  open() {
    LoginPage.logAsClient()
    super.open(this.route)
  }

  openAppDetailModal(id) {
    this.getAppCardById(id).waitForVisible()
    this.getAppCardById(id).click()
  }
}

export default new BrowserAppPage()

import Base from './base'
import LoginPage from './login'

class InstalledAppsPage extends Base {
  get route() {
    return '/client/installed'
  }

  get cardContainer() {
    return $('[data-test="app-list-container"]')
  }

  get allCards() {
    return $$('[data-test="app-card"]')
  }

  open() {
    LoginPage.logAsClient()
    super.open(this.route)
  }
}

export default new InstalledAppsPage()

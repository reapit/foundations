import Base from './base'
import LoginPage from './login'

class DeveloperInstalledAppsPage extends Base {
  get route() {
    return '/client/my-apps'
  }

  get cardContainer() {
    return $('[data-test="my-app-container"]')
  }

  get allCards() {
    return $$('[data-test="app-card"]')
  }

  open() {
    LoginPage.logAsClient()
    super.open(this.route)
  }
}

export default new DeveloperInstalledAppsPage()

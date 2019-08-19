import Base from './base'
import LoginPage from './login'

class ClientPage extends Base {
  get route() {
    return '/client/apps'
  }

  get heading() {
    return $('[data-test="app-list-container"] > h3')
  }

  get cardContainer() {
    return $('[data-test="app-list-container"]')
  }

  get allCards() {
    return $$('[data-test*="app-card"]')
  }

  open() {
    LoginPage.logAsClient()
    super.open(this.route)
  }
}

export default new ClientPage()

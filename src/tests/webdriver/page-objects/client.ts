import Base from './base'
import LoginPage from './login'

class ClientPage extends Base {
  get route() {
    return '/client'
  }

  get cardContainer() {
    return $('[data-test="client-card-container"]')
  }

  get allCards() {
    return $$('[data-test="app-card"]')
  }

  open() {
    LoginPage.logAsClient()
    super.open(this.route)
  }
}

export default new ClientPage()

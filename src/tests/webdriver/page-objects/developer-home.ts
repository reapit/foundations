import Base from './base'
import LoginPage from './login'

class DeveloperHomePage extends Base {
  get route() {
    return '/developer/apps'
  }

  get heading() {
    return $('[data-test="app-list-container"] > h3')
  }

  get cardContainer() {
    return $('[data-test="app-list-container"]')
  }

  get allCards() {
    return $$('[data-test="app-card"]')
  }

  open() {
    LoginPage.logAsDeveloper()
    super.open(this.route)
  }
}

export default new DeveloperHomePage()

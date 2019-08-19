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
    return $$('[data-test*="app-card"]')
  }

  get editableApp() {
    return $('[data-test*="pendingRevisions"]')
  }

  open() {
    LoginPage.logAsDeveloper()
    super.open(this.route)
  }

  selectEditableApp() {
    this.editableApp.click()
    return this.editableApp.getAttribute('data-test').split('_')[1]
  }
}

export default new DeveloperHomePage()

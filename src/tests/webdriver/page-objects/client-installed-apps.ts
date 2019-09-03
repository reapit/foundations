import Base from './base'
import Common from '../shared/common'

class ClientInstalledAppsPage extends Base {
  get route() {
    return '/client/installed'
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

  get appCardByName() {
    return $(`[data-test*='${Common.appName}']`)
  }

  open() {
    super.open(this.route)
  }
}

export default new ClientInstalledAppsPage()

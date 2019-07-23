import Base from './base'

class DeveloperHome extends Base {
  get cardContainer() {
    return $('[data-test="app-list-container"]')
  }
}

export default new DeveloperHome()

import Base from './base'

class DeveloperHome extends Base {
  get cardContainer() {
    return $('[data-test="developer-home-container"]')
  }
}

export default new DeveloperHome()

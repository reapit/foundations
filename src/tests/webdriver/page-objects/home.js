const Base = require('./base')

class HomePage extends Base {
  get root() {
    return $('#root')
  }
  open() {
    super.open('/')
  }

  submit() {
    this.submitBtn.click()
  }
}

module.exports = new HomePage()

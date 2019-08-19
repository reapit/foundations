import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

export type WdElement = WebdriverIO.Client<WebdriverIO.RawResult<WebdriverIO.Element>> &
  WebdriverIO.RawResult<WebdriverIO.Element>

class Common {
  testField = ''

  getIdFromTestData(element: WdElement) {
    return (element.getAttribute('data-test') || '').split('_')[1]
  }

  setTestField(value: any) {
    this.testField = value
  }

  getTestField() {
    return this.testField
  }

  removeTestField() {
    this.testField = ''
  }

  logout() {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  }
}

export default new Common()

import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

class CommonPage {
  get toggleAccountMenu() {
    return $('[data-test="ctaAccountMenu"]')
  }

  get modalCloseButton() {
    return $('[data-test="modal-close-button"]')
  }

  closeModal() {
    this.modalCloseButton.waitForVisible()
    return this.modalCloseButton.click()
  }

  logout() {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  }
}

export default new CommonPage()

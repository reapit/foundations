import Base from './base'
import LoginPage from './login'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

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

  get noPendingCard() {
    return $('[data-test*="isNoPending"]')
  }

  get appDetailModal() {
    return $('[data-test="app-detail-modal"]')
  }

  get editAppButton() {
    return $('[data-test="detail-modal-edit-button"]')
  }

  get submitRevisionButton() {
    return $('[data-test="submit-revision-modal-edit-button"]')
  }

  get formIsListedCheckbox() {
    return $('[data-test="submit-revision-isListed"]')
  }

  get modalCloseButton() {
    return $('[data-test="modal-close-button"]')
  }

  getAppCardById(appId: string) {
    return $(`[data-test*="${appId}"]`)
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

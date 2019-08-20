import Base from './base'
import EditAppDetailModal from '../page-objects/edit-app-detail-modal'
import CommonPage from '../page-objects/common'
import LoginPage from './login'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'
import DeveloperAppDetailModal from './developer-app-detail-modal'

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
    return $('[data-test*="isNoPending"]')
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

  getAppCardByName(name) {
    return $(`[data-test*='${name}']`)
  }

  open() {
    LoginPage.logAsDeveloper()
    super.open(this.route)
  }

  selectEditableApp() {
    this.editableApp.click()
    return this.editableApp.getAttribute('data-test').split('_')[1]
  }

  getAppId(appName) {
    this.getAppCardByName(appName).waitForVisible()
    return this.getAppCardByName(appName)
      .getAttribute('data-test')
      .split('_')[1]
  }

  openWithoutLogin() {
    super.open(this.route)
  }

  enableAppListed(appName) {
    this.openWithoutLogin()
    this.getAppCardByName(appName).waitForVisible()
    this.getAppCardByName(appName).click()
    DeveloperAppDetailModal.submitButton.waitForVisible()
    DeveloperAppDetailModal.submitButton.click()

    EditAppDetailModal.chkIsListed.click()
    // // Hack for bug1: https://reapit.atlassian.net/browse/CLD-81?focusedCommentId=367219&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-367219
    EditAppDetailModal.populateImageToRequiredImageInputField()
    // // Remove if fixed
    EditAppDetailModal.submitForm()
    CommonPage.closeModal()
  }

  openAppDetailModal(appName) {
    this.getAppCardByName(appName).waitForVisible()
    this.getAppCardByName(appName).click()
  }

  openUsingCustomAccount({ email, password }) {
    LoginPage.logAsDeveloperUsingCustomAccount({ email, password })
    super.open(this.route)
  }
}

export default new DeveloperHomePage()

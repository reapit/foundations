import Base from './base'
import EditAppDetailModal from './edit-app-detail-modal'
import LoginPage from './login'
import DeveloperAppDetailModal from './developer-app-modal'
import DeleteAppModal from './delete-app-modal'
import Common from '../shared/common'

class DeveloperManageAppsPage extends Base {
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

  getAppCardById() {
    return $(`[data-test*="${Common.appId}"]`)
  }

  getAppCardByName() {
    return $(`[data-test*='${Common.appName}']`)
  }

  open() {
    super.open(this.route)
  }

  selectEditableApp() {
    this.editableApp.click()
    const testString = this.editableApp.getAttribute('data-test') as string
    return testString.split('_')[1]
  }

  getAppId() {
    this.getAppCardByName().waitForVisible()
    const testString = this.getAppCardByName().getAttribute('data-test') as string
    return testString.split('_')[1]
  }

  openWithoutLogin() {
    super.open(this.route)
  }

  deleteApp() {
    this.openWithoutLogin()
    this.getAppCardByName().waitForVisible()
    this.getAppCardByName().click()

    // Press delete button
    DeveloperAppDetailModal.btnDeleteApp.waitForVisible()
    DeveloperAppDetailModal.btnDeleteApp.click()

    // Press confirm button
    DeleteAppModal.btnConfirm.waitForVisible()
    DeleteAppModal.btnConfirm.click()

    // delete message should be showed
    DeleteAppModal.alertDeleteAppSuccess.waitForVisible()
  }

  enableAppListed() {
    this.openWithoutLogin()
    this.getAppCardByName().waitForVisible()
    this.getAppCardByName().click()

    DeveloperAppDetailModal.submitRevisionButton.waitForVisible()
    DeveloperAppDetailModal.submitRevisionButton.click()

    EditAppDetailModal.chkIsListed.click()
    // // Hack for bug1: https://reapit.atlassian.net/browse/CLD-81?focusedCommentId=367219&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-367219
    // EditAppDetailModal.populateImageToRequiredImageInputField()
    // // Remove if fixed
    EditAppDetailModal.submitForm()

    Common.closeModal()
  }

  openAppDetailModal() {
    this.getAppCardByName().waitForVisible()
    this.getAppCardByName().click()
  }

  openUsingCustomAccount({ email, password }) {
    LoginPage.logAsDeveloperUsingCustomAccount({ email, password })
    super.open(this.route)
  }
}

export default new DeveloperManageAppsPage()

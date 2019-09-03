import Base from './base'
import Common from '../shared/common'
import AdminApprovalsPage from '../page-objects/admin-approvals'
import DeveloperManageAppsPage from '../page-objects/developer-manage-apps'

class ClientBrowseAppsPage extends Base {
  get route() {
    return '/client/apps'
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

  getAppCardById() {
    return $(`[data-test*="${Common.appId}"]`)
  }

  openAppDetailModal() {
    this.getAppCardById().waitForVisible()
    this.getAppCardById().click()
  }

  open() {
    super.open(this.route)
  }

  handleListing() {
    DeveloperManageAppsPage.open()
    DeveloperManageAppsPage.cardContainer.waitForVisible()

    DeveloperManageAppsPage.getAppCardById().click()
    DeveloperManageAppsPage.appDetailModal.waitForVisible()
    DeveloperManageAppsPage.editAppButton.click()
    const oldListed = !!DeveloperManageAppsPage.formIsListedCheckbox.getAttribute('checked')
    DeveloperManageAppsPage.formIsListedCheckbox.click()
    DeveloperManageAppsPage.submitRevisionButton.click()

    browser.pause(3000)

    Common.logout()

    AdminApprovalsPage.open()
    AdminApprovalsPage.viewDetailsButton.waitForVisible()
    const viewDetailsButton = AdminApprovalsPage.getAppViewDetailButtonbyId()
    viewDetailsButton.click()
    AdminApprovalsPage.detailModal.waitForVisible()
    const currentDiffListed = !!AdminApprovalsPage.isListedCurrentCheckbox.getAttribute('checked')
    const changedDiffListed = !!AdminApprovalsPage.isListedChangedCheckbox.getAttribute('checked')
    expect(currentDiffListed).toBe(oldListed)
    expect(changedDiffListed).not.toBe(oldListed)

    AdminApprovalsPage.submitApproval()
    AdminApprovalsPage.approveSuccessMessage.waitForVisible()

    Common.logout()
  }
}

export default new ClientBrowseAppsPage()

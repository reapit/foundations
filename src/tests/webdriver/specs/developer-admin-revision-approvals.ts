import AdminApprovalsPage from '../page-objects/admin-approvals'
import LoginPage from '../page-objects/login'
import Common from '../shared/common'
import DeveloperManageAppsPage from '../page-objects/developer-manage-apps'

/**
 * There is a lot of repetition in this file - not ideal but with alll the logging in and out,
 * if I try to DRY it out, creates a weird race condition on the CI and the tests are really flaky.
 * Open to refactor but be mindful, tests that pass locally seem to fail remotely. At least this
 * way, they are robust.
 */

describe('Developer Admin Revision Approvals', () => {
  beforeAll(() => {
    Common.createApp()
    Common.logout()
  })

  it('should show success message if decline a revision successfully', () => {
    LoginPage.logAsDeveloper()

    DeveloperManageAppsPage.open()
    DeveloperManageAppsPage.cardContainer.waitForVisible()
    DeveloperManageAppsPage.getAppCardById().click()
    DeveloperManageAppsPage.appDetailModal.waitForVisible()
    DeveloperManageAppsPage.editAppButton.click()
    DeveloperManageAppsPage.formIsListedCheckbox.click()
    DeveloperManageAppsPage.submitRevisionButton.click()

    browser.pause(3000)

    Common.logout()

    AdminApprovalsPage.open()
    AdminApprovalsPage.viewDetailsButton.waitForVisible()
    AdminApprovalsPage.viewDetailsButton.click()
    AdminApprovalsPage.detailModal.waitForVisible()
    AdminApprovalsPage.submitDecline()
    AdminApprovalsPage.declineSuccessMessage.waitForVisible()

    Common.logout()
  })

  it('should show success message if approve a revision successfully', () => {
    LoginPage.logAsDeveloper()

    DeveloperManageAppsPage.open()
    DeveloperManageAppsPage.cardContainer.waitForVisible()

    DeveloperManageAppsPage.getAppCardById().click()
    DeveloperManageAppsPage.appDetailModal.waitForVisible()
    DeveloperManageAppsPage.editAppButton.click()
    DeveloperManageAppsPage.formIsListedCheckbox.click()
    DeveloperManageAppsPage.submitRevisionButton.click()

    browser.pause(3000)

    Common.logout()

    AdminApprovalsPage.open()
    AdminApprovalsPage.viewDetailsButton.waitForVisible()
    AdminApprovalsPage.viewDetailsButton.click()
    AdminApprovalsPage.detailModal.waitForVisible()
    AdminApprovalsPage.submitApproval()
    AdminApprovalsPage.approveSuccessMessage.waitForVisible()

    Common.logout()
  })

  it('should not submit decline Revision if no rejection reason provided', () => {
    LoginPage.logAsDeveloper()
    DeveloperManageAppsPage.open()
    DeveloperManageAppsPage.cardContainer.waitForVisible()

    DeveloperManageAppsPage.getAppCardById().click()
    DeveloperManageAppsPage.appDetailModal.waitForVisible()
    DeveloperManageAppsPage.editAppButton.click()
    DeveloperManageAppsPage.formIsListedCheckbox.click()
    DeveloperManageAppsPage.submitRevisionButton.click()

    browser.pause(3000)

    Common.logout()

    AdminApprovalsPage.open()
    AdminApprovalsPage.viewDetailsButton.waitForVisible()
    AdminApprovalsPage.viewDetailsButton.click()
    AdminApprovalsPage.detailModal.waitForVisible()
    AdminApprovalsPage.openDeclineModalButton.click()
    AdminApprovalsPage.declineSubmitButton.waitForVisible()
    AdminApprovalsPage.declineSubmitButton.click()
    expect(AdminApprovalsPage.errorMessages.length).toBe(1)
    AdminApprovalsPage.cancelDeclineModalButton.click()
    Common.logout()
  })

  afterAll(() => {
    LoginPage.logAsDeveloper()
    Common.tearDown()
  })
})

import ApprovalsPage from '../page-objects/approvals'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

describe('AdminApprovalPage', () => {
  beforeEach(() => {
    ApprovalsPage.open()
    ApprovalsPage.revisionContainer.waitForVisible()
  })

  it('should not submit decline Revision if no rejection reason provided', () => {
    const viewDetailsButton = ApprovalsPage.viewDetailsButton
    if (viewDetailsButton.isExisting()) {
      viewDetailsButton.click()
      ApprovalsPage.detailModal.waitForVisible()
      ApprovalsPage.openDeclineModalButton.click()
      ApprovalsPage.declineSubmitButton.waitForVisible()
      ApprovalsPage.declineSubmitButton.click()
      expect(ApprovalsPage.errorMessages.length).toBe(1)
      ApprovalsPage.cancelDeclineModalButton.click()
    }
  })

  it('should show success message if decline a revision successfully', () => {
    const viewDetailsButton = ApprovalsPage.viewDetailsButton
    if (viewDetailsButton.isExisting()) {
      viewDetailsButton.click()
      ApprovalsPage.detailModal.waitForVisible()
      ApprovalsPage.submitDecline()
      ApprovalsPage.declineSuccessMessage.waitForVisible()
    }
  })

  it('should show success message if approve a revision successfully', () => {
    const viewDetailsButton = ApprovalsPage.viewDetailsButton
    if (viewDetailsButton.isExisting()) {
      viewDetailsButton.click()
      ApprovalsPage.detailModal.waitForVisible()
      ApprovalsPage.submitApproval()
      ApprovalsPage.approveSuccessMessage.waitForVisible()
    }
  })

  afterEach(() => {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

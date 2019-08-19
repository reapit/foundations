import ApprovalsPage from '../page-objects/approvals'
import DeveloperPage from '../page-objects/developer-home'
import Common, { WdElement } from '../share/common'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000

function listDelistApp(reversed: boolean = false) {
  DeveloperPage.open()
  DeveloperPage.cardContainer.waitForVisible()
  let appId: string
  let noPendingCard: WdElement

  if (reversed) {
    appId = Common.getTestField()
    Common.removeTestField()
    noPendingCard = DeveloperPage.getAppCardById(appId)
  } else {
    noPendingCard = DeveloperPage.noPendingCard
    appId = Common.getIdFromTestData(noPendingCard)
    Common.setTestField(appId)
  }

  if (!noPendingCard.isExisting()) {
    return
  }

  noPendingCard.click()
  DeveloperPage.appDetailModal.waitForVisible()
  DeveloperPage.editAppButton.click()
  const oldListed = !!DeveloperPage.formIsListedCheckbox.getAttribute('checked')
  DeveloperPage.formIsListedCheckbox.click()
  DeveloperPage.submitRevisionButton.click()
  DeveloperPage.editAppButton.waitForVisible()

  Common.logout()

  ApprovalsPage.open()
  ApprovalsPage.viewDetailsButton.waitForVisible()
  const viewDetailsButton = ApprovalsPage.getAppViewDetailButtonbyId(appId)
  viewDetailsButton.click()
  ApprovalsPage.detailModal.waitForVisible()
  const currentDiffListed = !!ApprovalsPage.isListedCurrentCheckbox.getAttribute('checked')
  const changedDiffListed = !!ApprovalsPage.isListedChangedCheckbox.getAttribute('checked')
  expect(currentDiffListed).toBe(oldListed)
  expect(changedDiffListed).not.toBe(oldListed)

  ApprovalsPage.submitApproval()
  ApprovalsPage.approveSuccessMessage.waitForVisible()

  Common.logout()

  DeveloperPage.open()
  DeveloperPage.cardContainer.waitForVisible()
  const editedCard = DeveloperPage.getAppCardById(appId)
  editedCard.click()
  DeveloperPage.appDetailModal.waitForVisible()
  DeveloperPage.editAppButton.click()
  const listedHasBeenEdited = !!DeveloperPage.formIsListedCheckbox.getAttribute('checked')
  expect(oldListed).not.toBe(listedHasBeenEdited)
}

describe('ListingAndDelistingApp', () => {
  it('delisting/listing flow test', () => {
    listDelistApp()
  })

  it('listing/delisting flow test (reverse)', () => {
    listDelistApp(true)
  })

  afterEach(() => {
    Common.logout()
  })
})

import DeveloperHomePage from '../page-objects/developer-home'
import DeveloperAppModal from '../page-objects/developer-app-modal'
import DeveloperAppModalInner from '../page-objects/developer-app-modal-inner'
import AdminHomePage from '../page-objects/admin'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'
import { getLoginSession } from '../../../utils/session'

describe('DeveloperSubmitRevision', () => {
  beforeEach(() => {
    DeveloperHomePage.open()
    DeveloperHomePage.cardContainer.waitForVisible()
  })

  it('working as expected', () => {
    if (DeveloperHomePage.allCards.length <= 0) return

    const currentAppId = DeveloperHomePage.selectEditableApp()
    if (!currentAppId) return

    browser.pause(2000)
    DeveloperAppModal.clickEditDetailButton()

    browser.pause(1000)
    DeveloperAppModalInner.populateValidFormForUpdating()
    DeveloperAppModalInner.clickSubmitRevisionButton()
    browser.pause(2000)

    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)

    AdminHomePage.open()
    browser.pause(2000)

    AdminHomePage.doApproval(currentAppId)
    browser.pause(2000)

    expect(AdminHomePage.approvedMessage.getText()).toEqual('Approved!')
  })

  afterEach(() => {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

import DeleteAppModal from '../page-objects/delete-app-modal'
import DeveloperHomePage from '../page-objects/developer-home'
import DeveloperAppModal from '../page-objects/developer-app-modal'

describe('delete app', () => {
  it('work correctly', () => {
    DeveloperHomePage.open()
    DeveloperHomePage.cardContainer.waitForVisible()
    if (DeveloperHomePage.allCards.length <= 0) return

    // Click on any app card
    DeveloperHomePage.allCards[0].click()

    // Press delete button
    DeveloperAppModal.btnDeleteApp.waitForVisible()
    DeveloperAppModal.btnDeleteApp.click()

    // Press confirm button
    DeleteAppModal.btnConfirm.waitForVisible()
    DeleteAppModal.btnConfirm.click()

    // delete message should be showed
    DeleteAppModal.alertDeleteAppSuccess.waitForVisible()
  })
})

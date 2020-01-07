import loginPage from '../pages/login-page'
import settingsPage from '../pages/settings-page'

const {
  actions: { changePassword }
} = settingsPage

const {
  actions: { loginUsingDeveloperAccount }
} = loginPage

describe('Developer change password happy path', () => {
  const currentDeveloperPassword = Cypress.env('DEVELOPER_ACCOUNT_PASSWORD')
  // This test case adds character "1" at the end of the old password
  const newDeveloperPassword = currentDeveloperPassword + '1'

  it('should change password, logout and login using the changed password successfully', () => {
    loginUsingDeveloperAccount()

    changePassword(currentDeveloperPassword, newDeveloperPassword)

    loginUsingDeveloperAccount(Cypress.env('DEVELOPER_ACCOUNT_EMAIL'), newDeveloperPassword)

    // Roll back the old password
    changePassword(newDeveloperPassword, currentDeveloperPassword)
  })
})

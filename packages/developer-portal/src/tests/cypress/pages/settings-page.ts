import webRoutes from '@/constants/routes'
import apiRoutes from '../fixtures/routes'

const settingsPageMetaData = {
  url: webRoutes.SETTINGS,
  selectors: {
    textBoxCurrentPassword: 'input#currentPassword',
    textBoxPassword: 'input#password',
    textBoxConfirmPassword: 'input#confirmPassword',
    buttonSubmitChangePassword: 'button[data-test="button-change-password"]',
  },
}

const settingsPage = {
  ...settingsPageMetaData,
  actions: {
    changePassword(oldPassword: string, newPassword: string) {
      const {
        textBoxPassword,
        textBoxCurrentPassword,
        textBoxConfirmPassword,
        buttonSubmitChangePassword,
      } = settingsPageMetaData.selectors

      cy.visit(settingsPage.url)
      cy.get(textBoxCurrentPassword).type(oldPassword)
      cy.get(textBoxPassword).type(newPassword)
      cy.get(textBoxConfirmPassword).type(newPassword)

      cy.server()
      cy.route('POST', apiRoutes.changePassword).as('requestChangePassword')
      cy.get(buttonSubmitChangePassword).click()
      cy.wait('@requestChangePassword')
    },
  },
}

export default settingsPage

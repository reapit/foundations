import {
  LOGIN_USERNAME_INPUT_SELECTOR,
  LOGIN_PASSWORD_INPUT_SELECTOR,
  SUBMIT_LOGIN_SELECTOR,
  LOGIN_BUTTON_SELECTOR_BY_TAG,
} from '../support/constants'

Cypress.on('fail', (error, runnable) => {
  fetch(Cypress.env('SLACK_WEB_HOOK_URL'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: `Failed on ${runnable.title}`,
    }),
  })
  throw error
})

if (Cypress.env('PACKAGE_NAME') === 'all' || Cypress.env('PACKAGE_NAME') === 'lifetime-legal') {
  const LIFE_TIME_LEGAL_URL = Cypress.env(`LIFE_TIME_LEGAL_URL_${Cypress.env('ENVIRONMENT')}`)
  describe('Life Time Legal App', () => {
    // skip because it hasn't been migrated to prod connect session
    it.skip('user should able to login Life Time Legal App', () => {
      cy.visit(LIFE_TIME_LEGAL_URL).then(() => {
        cy.get(LOGIN_BUTTON_SELECTOR_BY_TAG)
          .should('contain', 'Login')
          .click()
        cy.get(LOGIN_USERNAME_INPUT_SELECTOR).type(Cypress.env('USERNAME'))
        cy.get(LOGIN_PASSWORD_INPUT_SELECTOR).type(Cypress.env('PASSWORD'))
        cy.get(SUBMIT_LOGIN_SELECTOR).click()
      })
    })
  })
}

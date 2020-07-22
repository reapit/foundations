import {
  LOGIN_USERNAME_INPUT_SELECTOR,
  LOGIN_PASSWORD_INPUT_SELECTOR,
  LOGIN_BUTTON_SELECTOR,
  SUBMIT_LOGIN_SELECTOR,
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

if (Cypress.env('PACKAGE_NAME') === 'all' || Cypress.env('PACKAGE_NAME') === 'developer-portal') {
  const DEVELOPER_PORTAL_URL = Cypress.env(`DEVELOPER_PORTAL_URL_${Cypress.env('ENVIRONMENT')}`)
  describe('Developer Portal', () => {
    it('user should able to login Developer Portal', () => {
      cy.visit(DEVELOPER_PORTAL_URL).then(() => {
        cy.get(LOGIN_BUTTON_SELECTOR).should('contain', 'Login').click()
        cy.get(LOGIN_USERNAME_INPUT_SELECTOR).type(Cypress.env('USERNAME'))
        cy.get(LOGIN_PASSWORD_INPUT_SELECTOR).type(Cypress.env('PASSWORD'))
        cy.get(SUBMIT_LOGIN_SELECTOR).click()
      })
    })
  })
}

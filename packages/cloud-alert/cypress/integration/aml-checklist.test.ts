import {
  LOGIN_USERNAME_INPUT_SELECTOR,
  LOGIN_PASSWORD_INPUT_SELECTOR,
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

const AML_CHECKLIST_URL = Cypress.env(`AML_CHECKLIST_URL_${Cypress.env('ENVIRONMENT')}`)
const PACKAGE_NAME = Cypress.env('PACKAGE_NAME')
if (PACKAGE_NAME === 'all' || PACKAGE_NAME === 'aml-checklist') {
  describe('AML Checklist App', () => {
    it('user should able to login AML Checklist App', () => {
      cy.visit(AML_CHECKLIST_URL).then(() => {
        cy.get(LOGIN_USERNAME_INPUT_SELECTOR).type(Cypress.env('USERNAME'))
        cy.get(LOGIN_PASSWORD_INPUT_SELECTOR).type(Cypress.env('PASSWORD'))
        cy.get(SUBMIT_LOGIN_SELECTOR).click()
      })
    })
  })
}

import routes from '@/constants/routes'
import clientAppsPage from './client-apps-page'
import developerAppsPage from './developer-page'
import adminApprovalsPage from './admin-approvals-page'
import { COOKIE_FIRST_TIME_LOGIN } from '@/utils/cookie'
import api from '../fixtures/routes'

const loginPageMetadata = {
  loginAsClientUrl: routes.CLIENT_LOGIN,
  loginAsDeveloperUrl: routes.DEVELOPER_LOGIN,
  loginAsAdminUrl: routes.ADMIN_LOGIN,
  selectors: {
    inputEmail: 'input#userName',
    inputPassword: 'input#password',
    buttonLogin: "button[type='submit']",
  },
}

const loginPage = {
  ...loginPageMetadata,
  actions: {
    loginUsingDeveloperAccount(email?: string, password?: string) {
      // This cookie prevents redirecting to routes.DEVELOPER_WELCOME page when login as a developer
      // Redirecting to routes.DEVELOPER_WELCOME will be tested in the different e2e test case
      const now = new Date()
      cy.setCookie(COOKIE_FIRST_TIME_LOGIN, now.toString())

      const {
        loginAsDeveloperUrl,
        selectors: { buttonLogin, inputPassword, inputEmail },
      } = loginPageMetadata

      cy.visit(loginAsDeveloperUrl)
      cy.get(inputEmail).type(email || Cypress.env('DEVELOPER_ACCOUNT_EMAIL'))
      cy.get(inputPassword).type(password || Cypress.env('DEVELOPER_ACCOUNT_PASSWORD'))
      cy.get(buttonLogin).click()

      cy.route(`${api.developerApps}`).as('getDeveloperApps')
      cy.wait('@getDeveloperApps')

      cy.get(developerAppsPage.selectors.container).should('have.length', 1)
    },

    loginUsingAdminAccount() {
      const {
        loginAsAdminUrl,
        selectors: { buttonLogin, inputPassword, inputEmail },
      } = loginPageMetadata

      cy.visit(loginAsAdminUrl)
      cy.get(inputEmail).type(Cypress.env('ADMIN_ACCOUNT_EMAIL'))
      cy.get(inputPassword).type(Cypress.env('ADMIN_ACCOUNT_PASSWORD'))
      cy.get(buttonLogin).click()

      cy.route(`${api.approvals}**`).as('getApprovals')
      cy.wait('@getApprovals')

      cy.get(adminApprovalsPage.selectors.container).should('have.length', 1)
    },

    loginUsingClientAccount() {
      const {
        loginAsClientUrl,
        selectors: { buttonLogin, inputPassword, inputEmail },
      } = loginPageMetadata

      cy.visit(loginAsClientUrl)
      cy.get(inputEmail).type(Cypress.env('CLIENT_ACCOUNT_EMAIL'))
      cy.get(inputPassword).type(Cypress.env('CLIENT_ACCOUNT_PASSWORD'))
      cy.get(buttonLogin).click()

      cy.route(api.clientApps).as('getClientApps')
      cy.wait('@getClientApps')

      cy.get(clientAppsPage.selectors.container).should('have.length', 1)
    },
  },
}

export default loginPage

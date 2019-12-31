import routes from '@/constants/routes'
import developerAppsPage from './developer-page'

const loginPageMetadata = {
  loginAsClientUrl: routes.CLIENT_LOGIN,
  loginAsDeveloperUrl: routes.DEVELOPER_LOGIN,
  loginAsAdminUrl: routes.ADMIN_LOGIN,
  selectors: {
    inputEmail: 'input#userName',
    inputPassword: 'input#password',
    buttonLogin: "button[type='submit']"
  },
  account: {
    DEVELOPER: {
      email: Cypress.env('DEVELOPER_ACCOUNT_EMAIL'),
      password: Cypress.env('DEVELOPER_ACCOUNT_PASSWORD')
    }
  }
}

const loginPageActions = {
  loginUsingDeveloperAccount() {
    const {
      loginAsDeveloperUrl,
      selectors: { buttonLogin, inputPassword, inputEmail }
    } = loginPageMetadata

    cy.visit(loginAsDeveloperUrl)
    cy.get(inputEmail).type(Cypress.env('DEVELOPER_ACCOUNT_EMAIL'))
    cy.get(inputPassword).type(Cypress.env('DEVELOPER_ACCOUNT_PASSWORD'))
    cy.get(buttonLogin).click()
    cy.get(developerAppsPage.selectors.container).should('have.length', 1)
  }
}

const loginPage = {
  ...loginPageMetadata,
  actions: loginPageActions
}

export default loginPage

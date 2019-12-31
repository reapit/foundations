import loginPage from '../pages/login-page'
import clientAppsPage from '../pages/client-apps-page'
import developerPage from '../pages/developer-page'
import adminApprovalsPage from '../pages/admin-approvals-page'

describe('Login happy path', () => {
  describe('Should be able to login as client, developer and admin and navigate to correct landing pages', () => {
    const {
      selectors: { inputEmail, inputPassword, buttonLogin },
      loginAsAdminUrl,
      loginAsClientUrl,
      loginAsDeveloperUrl
    } = loginPage

    const {
      url: pageClientAppsUrl,
      selectors: { container: clientAppsPageContainer }
    } = clientAppsPage

    const {
      url: developerPageUrl,
      selectors: { container: developerPageContainer }
    } = developerPage

    const {
      url: adminPageUrl,
      selectors: { container: adminPageContainer }
    } = adminApprovalsPage

    const testCases = [
      {
        testCaseName: 'Login successfully using DEVELOPER account',
        email: Cypress.env('DEVELOPER_ACCOUNT_EMAIL'),
        password: Cypress.env('DEVELOPER_ACCOUNT_PASSWORD'),
        container: developerPageContainer,
        url: developerPageUrl,
        loginUrl: loginAsDeveloperUrl
      },
      {
        testCaseName: 'Login successfully using CLIENT account',
        email: Cypress.env('CLIENT_ACCOUNT_EMAIL'),
        password: Cypress.env('CLIENT_ACCOUNT_PASSWORD'),
        container: clientAppsPageContainer,
        url: pageClientAppsUrl,
        loginUrl: loginAsClientUrl
      },
      {
        testCaseName: 'Login successfully using ADMIN account',
        email: Cypress.env('ADMIN_ACCOUNT_EMAIL'),
        password: Cypress.env('ADMIN_ACCOUNT_PASSWORD'),
        container: adminPageContainer,
        url: adminPageUrl,
        loginUrl: loginAsAdminUrl
      }
    ]
    for (const { container, email, password, testCaseName, loginUrl } of testCases) {
      it(testCaseName, done => {
        cy.visit(loginUrl)
        cy.get(inputEmail).type(email)
        cy.get(inputPassword).type(password)
        cy.get(buttonLogin).click()
        cy.get(container).should('have.length', 1)
        cy.window().then(window => {
          window.localStorage.clear()
          done()
        })
      })
    }
  })
})

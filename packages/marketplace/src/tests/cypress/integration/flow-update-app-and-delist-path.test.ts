import nanoid from 'nanoid'
import adminApprovalsPage from '../pages/admin-approvals-page'
import apiRoutes from '../fixtures/routes'
import loginPage from '../pages/login-page'
import appRequest from '../requests/app'
import developerAppsPage from '../pages/developer-apps-page'
import developerSubmitAppPage from '../pages/developer-submit-app-page'
import clientAppsPage from '../pages/client-apps-page'

const {
  selectors: { getDivAppCardWithName },
} = clientAppsPage

const {
  actions: { clickViewDetailsButtonWithAppId },
  selectors: { buttonApprove, btnConfirmApproval, divApproveAppSuccessfully },
} = adminApprovalsPage

const {
  actions: { loginUsingDeveloperAccount, loginUsingAdminAccount, loginUsingClientAccount },
} = loginPage

const {
  actions: { clickAppCardWithName, deleteAppWithName },
  selectors: { buttonEditDetails },
} = developerAppsPage

const {
  selectors: { textBoxName, checkBoxIsListed, buttonSubmit, checkboxAgreeTheTermsAndConditions },
} = developerSubmitAppPage

const appName = `Update App And Delist App - ${nanoid()}`
const appNameAfterChanged = `${appName} - changed`
let appId = ''

describe('Update and delist an app happy path', () => {
  before(() => {
    cy.server()
    appRequest.createApp(appName)
  })

  after(() => {
    cy.server()
    cy.clearCookies()
    loginUsingDeveloperAccount()
    deleteAppWithName(appNameAfterChanged)
  })

  it('should edit the app, change some details and set listed status successfully', () => {
    cy.server()
    loginUsingDeveloperAccount()

    clickAppCardWithName(appName)
      .invoke('data', 'test-app-id')
      .then(res => {
        appId = res as any
      })

    cy.route(apiRoutes.categories).as('requestGetCategories')
    cy.route(apiRoutes.scopes).as('requestGetScopes')

    cy.get(buttonEditDetails).click()

    cy.wait('@requestGetCategories')
    cy.wait('@requestGetScopes')

    cy.get(checkBoxIsListed).click({
      force: true,
    })
    cy.get(textBoxName).type(' - changed')
    cy.get(checkboxAgreeTheTermsAndConditions).click({ force: true })

    cy.route('POST', apiRoutes.revision).as('requestSubmitRevision')
    cy.get(buttonSubmit).click()
    cy.wait('@requestSubmitRevision')

    cy.get(buttonEditDetails)
      .should('have.text', 'Pending Revision')
      .should('be.disabled')
  })

  it('should login admin and approve changes successfully', () => {
    cy.server()
    cy.clearCookies()
    loginUsingAdminAccount()
    clickViewDetailsButtonWithAppId(appId)
    cy.get(buttonApprove).click()

    cy.route('POST', apiRoutes.approveApp).as('requestApproveApp')
    cy.get(btnConfirmApproval).click()
    cy.wait('@requestApproveApp')

    cy.get(divApproveAppSuccessfully).should('have.length', 1)
  })

  it('should Login client, see app in list and verify changed data successfully', () => {
    cy.server()
    cy.clearCookies()
    loginUsingClientAccount()
    cy.visit(clientAppsPage.url)
    getDivAppCardWithName(appNameAfterChanged)
  })
})

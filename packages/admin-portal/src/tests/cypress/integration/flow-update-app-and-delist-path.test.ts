import nanoid from 'nanoid'
import adminApprovalsPage from '../pages/admin-approvals-page'
import apiRoutes from '../fixtures/routes'
import appRequest from '../requests/app'
import developerAppsPage from '../pages/developer-apps-page'
import developerSubmitAppPage from '../pages/developer-submit-app-page'
import { loginDeveloperHook, loginAdminHook } from '../hooks/login'

const {
  actions: { clickViewDetailsButtonWithAppId },
  selectors: { buttonApprove, btnConfirmApproval, divApproveAppSuccessfully },
} = adminApprovalsPage

const {
  actions: { clickAppCardWithName, deleteAppWithName },
  selectors: { buttonEditDetails },
} = developerAppsPage

const {
  selectors: { name, isListed, submitButton },
} = developerSubmitAppPage

const appName = `Update App And Delist App - ${nanoid()}`
const appNameAfterChanged = `${appName} - changed`
let appId = ''

describe('Update and delist an app happy path', () => {
  before(() => {
    appRequest.createApp(appName)
  })

  it('should edit the app, change some details and set listed status successfully', () => {
    loginDeveloperHook()
    clickAppCardWithName(appName)
      .invoke('data', 'test-app-id')
      .then(res => {
        appId = res as any
      })

    cy.route(apiRoutes.categories).as('requestGetCategories')
    cy.route(apiRoutes.scopes).as('requestGetScopes')
    cy.route(apiRoutes.desktopIntegrationTypes).as('getIntegrationTypes')

    cy.get(buttonEditDetails).click()

    cy.wait('@requestGetCategories')
    cy.wait('@requestGetScopes')
    cy.wait('@getIntegrationTypes')

    cy.get(isListed).click({
      force: true,
    })
    cy.get(name).type(' - changed')

    cy.route('POST', apiRoutes.revision).as('requestSubmitRevision')
    cy.get(submitButton).click()
    cy.wait('@requestSubmitRevision')

    cy.get(buttonEditDetails).should('have.text', 'Pending Revision')
  })

  it('should login admin and approve changes successfully', () => {
    loginAdminHook()
    cy.server()
    clickViewDetailsButtonWithAppId(appId)
    cy.get(buttonApprove).click()

    cy.route('POST', apiRoutes.approveApp).as('requestApproveApp')
    cy.get(btnConfirmApproval).click()
    cy.wait('@requestApproveApp')

    cy.get(divApproveAppSuccessfully).should('have.length', 1)
  })

  it('should delete app', () => {
    loginDeveloperHook()
    deleteAppWithName(appNameAfterChanged)
  })
})

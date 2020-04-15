import nanoid from 'nanoid'
import appRequest, { sampleApp } from '../requests/app'
import routes from '../fixtures/routes'
import developerAppsPage from '../pages/developer-apps-page'
import clientAppsPage from '../pages/client-apps-page'
import adminApprovalsPage from '../pages/admin-approvals-page'
import { loginDeveloperHook, loginClientHook, loginAdminHook } from '../hooks/login'
import ROUTES from '@/constants/routes'

const appName = `Filter App By Name And Category - ${nanoid()}`
const { categoryId } = sampleApp

const {
  actions: { deleteAppWithName },
} = developerAppsPage

const {
  actions: { clickViewDetailsButtonWithAppId },
  selectors: { buttonApprove, btnConfirmApproval, btnApproveSuccess },
} = adminApprovalsPage

const {
  selectors: { searchInput, getCategoryWithId, btnAcceptWelcomeMessageModal },
} = clientAppsPage

describe('Created app should appear in client search result happy path', () => {
  let appId = ''
  before(() => {
    cy.server()
    appRequest.createApp(appName)
    const appIdRes = appRequest.getAppIdByAppName(appName)
    appIdRes.then(res => {
      appId = res.body.data[0].id
      const appRes = appRequest.getAppById(appId)
      appRes.then(app => {
        console.log(app)
        appRequest.createAppRevision(appId, app.body, { isListed: true })
        loginAdminHook(routes.approveApp)

        cy.visit(ROUTES.ADMIN_APPROVALS)

        clickViewDetailsButtonWithAppId(appId)
        cy.get(buttonApprove).click()
        cy.route('POST', routes.approveApp).as('approveAppRequest')
        cy.get(btnConfirmApproval).click()
        cy.wait('@approveAppRequest')
        cy.get(btnApproveSuccess).click()
      })
    })
  })

  it('Should return the app that was created before by name and by category', () => {
    cy.server()
    loginClientHook()
    cy.get(btnAcceptWelcomeMessageModal).click()
    cy.get(searchInput).type(`${appName}{enter}`)
    cy.get(`div[data-test-app-id="${appId}"]`).should('have.length', 1)
    cy.get(searchInput).clear()

    getCategoryWithId(parseInt(categoryId, 10)).click()

    cy.get(`div[data-test-app-id="${appId}"]`).should('have.length', 1)
  })

  after(() => {
    cy.server()
    loginDeveloperHook()
    deleteAppWithName(appName)
  })
})

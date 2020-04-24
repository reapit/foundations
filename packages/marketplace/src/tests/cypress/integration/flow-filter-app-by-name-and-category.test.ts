import nanoid from 'nanoid'
import appRequest, { sampleApp } from '../requests/app'
import routes from '../fixtures/routes'
import clientAppsPage from '../pages/client-apps-page'
import adminApprovalsPage from '../pages/admin-approvals-page'
import { loginClientHook, loginAdminHook } from '../hooks/login'
import ROUTES from '@/constants/routes'

const appName = `Filter App By Name And Category - ${nanoid()}`
const { categoryId } = sampleApp

const {
  actions: { clickViewDetailsButtonWithAppId },
  selectors: { buttonApprove, btnConfirmApproval, btnApproveSuccess },
} = adminApprovalsPage

const {
  selectors: { searchInput, getCategoryWithId },
} = clientAppsPage

describe('Created app should appear in client search result happy path', () => {
  let appId = ''
  before(() => {
    appRequest.createApp(appName)
    const appIdRes = appRequest.getAppIdByAppName(appName)
    appIdRes.then(res => {
      appId = res.body.data[0].id
      const appRes = appRequest.getAppById(appId)
      appRes
        .then(app => {
          return appRequest.createAppRevision(appId, app.body, { isListed: true })
        })
        .then(() => {
          loginAdminHook()
          cy.server()
          cy.route('GET', routes.approvals).as('approvals')
          cy.visit(ROUTES.ADMIN_APPROVALS)
          cy.wait('@approvals')
          clickViewDetailsButtonWithAppId(appId)
          cy.get(buttonApprove).click()
          cy.route('POST', routes.approveApp).as('approveAppRequest')
          cy.get(btnConfirmApproval).click()
          cy.wait('@approveAppRequest')
          cy.get(btnApproveSuccess).click()
          cy.clearCookies()
          cy.wait(2000)
        })
    })
  })

  it('Should return the app that was created before by name and by category', () => {
    loginClientHook()
    cy.visit(ROUTES.CLIENT)
    cy.server()
    cy.route('GET', routes.clientApps).as('clientApps')
    cy.wait('@clientApps')
    cy.get(searchInput).type(`${appName}{enter}`)
    cy.wait(5000)
    cy.get(`div[data-test-app-id="${appId}"]`).should('have.length', 1)
    cy.get(searchInput).clear()
    getCategoryWithId(parseInt(categoryId, 10)).click()
    cy.wait(5000)
    cy.get(`div[data-test-app-id="${appId}"]`).should('have.length', 1)
    cy.clearCookies()
    cy.wait(2000)
  })

  after(() => {
    appRequest.deleteApp(appId)
  })
})

import apiRoutes from '../fixtures/routes'
import appRequest from '../requests/app'
import developerAppsPage from '../pages/developer-apps-page'
import adminApprovalsPage from '../pages/admin-approvals-page'
import installedAppsPage from '../pages/installed-apps-page'
import manageAppsPage from '../pages/manage-apps-page'

import appDetailModal from '../components/app-detail-modal'
import appCard from '../components/app-card'
import nanoid from 'nanoid'
import { loginDeveloperHook, loginAdminHook, loginClientHook } from '../hooks/login'
import ROUTES from '@/constants/routes'

const {
  actions: { listedAppWithName },
} = developerAppsPage

const {
  actions: { approveAppWithId },
} = adminApprovalsPage

const { url: installedAppsPageUrl } = installedAppsPage

const { url: manageAppsPageUrl } = manageAppsPage

const {
  selectors: { buttonAgree, buttonInstallApp, buttonUninstallApp, buttonSuccess, divSuccessMessage },
} = appDetailModal

const {
  actions: { clickAppCardSettingWithId },
} = appCard

const appName = `Install App - ${nanoid()}`
let appId = ''

describe('Install app happy path', () => {
  before(() => {
    cy.server()
    appRequest.createApp(appName)
  })

  after(() => {
    cy.server()
    appRequest.deleteApp(appId)
  })

  it('Log into developer and listed app successfully', () => {
    cy.server()
    loginDeveloperHook()
    listedAppWithName(appName, res => {
      appId = res
    })
  })

  it('Log into admin and approve app successfully', () => {
    cy.server()
    loginAdminHook()
    approveAppWithId(appId)
  })

  it('Log into client and install and uninstall app successfully', () => {
    cy.server()

    cy.route('GET', apiRoutes.manageApps).as('getManageApps')
    cy.route('GET', apiRoutes.installedApps).as('getInstalledApps')
    cy.route('POST', apiRoutes.installations).as('installApp')
    cy.route('POST', apiRoutes.terminateApp).as('uninstallApp')

    loginClientHook()

    cy.visit(ROUTES.CLIENT)

    cy.get(`div[data-test-app-name="${appName}"]`).click()

    cy.get(buttonInstallApp).should('have.length', 1)
    cy.get(buttonInstallApp).click()
    cy.get(buttonAgree).click()

    cy.wait('@installApp')

    cy.route('GET', apiRoutes.appDetail).as('getAppDetail')

    cy.get(divSuccessMessage).should('have.length', 1)
    cy.get(buttonSuccess).click()

    cy.wait('@getAppDetail')

    cy.visit(installedAppsPageUrl)

    cy.wait('@getInstalledApps')

    cy.visit(manageAppsPageUrl)

    cy.wait('@getManageApps')

    clickAppCardSettingWithId(appId)

    cy.get(buttonUninstallApp).click()
    cy.get(buttonAgree).click()

    cy.wait('@uninstallApp')

    cy.get(divSuccessMessage).should('have.length', 1)
    cy.get(buttonSuccess).click()

    cy.wait('@getManageApps')
  })
})

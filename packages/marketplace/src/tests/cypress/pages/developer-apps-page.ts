import webRoutes from '@/constants/routes'
import appRequests from '../requests/app'
import apiRoutes from '../fixtures/routes'
import developerSubmitAppPage from '../pages/developer-submit-app-page'

const developerAppsPageMetadata = {
  url: webRoutes.DEVELOPER_MY_APPS,
  selectors: {
    container: '#page-developer-apps-container',
    buttonEditDetails: 'button[data-test="detail-modal-edit-button"]',
    btnCloseDetailModal: 'button[data-test="modal-close-button"]',
  },
}

const {
  selectors: { checkBoxIsListed, buttonSubmit },
} = developerSubmitAppPage

const developerAppsPageActions = {
  clickAppCardWithName(name: string) {
    return cy.get(`div[data-test-app-name="${name}"]`).click()
  },

  deleteAppWithName(name: string) {
    cy.visit(developerAppsPage.url)
    cy.route(apiRoutes.appsOfDeveloper).as('getAppsOfDeveloper')
    cy.wait('@getAppsOfDeveloper')
    cy.get(`div[data-test-app-name='${name}']`)
      .should('have.length', 1)
      .invoke('attr', 'data-test-app-id')
      .then(appId => {
        appRequests.deleteApp(appId as any)
      })
  },

  listedAppWithName(name: string, callback: (appId: string) => void) {
    const { buttonEditDetails } = developerAppsPageMetadata.selectors
    cy.visit(developerAppsPage.url)
    cy.route(apiRoutes.appsOfDeveloper).as('getAppsOfDeveloper')
    cy.wait('@getAppsOfDeveloper')
    cy.get(`div[data-test-app-name='${name}']`)
      .click()
      .invoke('attr', 'data-test-app-id')
      .then(appId => {
        callback(appId as any)
      })

    cy.route(apiRoutes.categories).as('requestGetCategories')
    cy.route(apiRoutes.scopes).as('requestGetScopes')

    cy.get(buttonEditDetails).click()

    cy.wait('@requestGetCategories')
    cy.wait('@requestGetScopes')

    cy.get(checkBoxIsListed).click({ force: true })

    cy.route('POST', apiRoutes.revision).as('requestSubmitRevision')
    cy.get(buttonSubmit).click()
    cy.wait('@requestSubmitRevision')

    cy.get(buttonEditDetails).should('have.text', 'Pending Revision')
  },
}

const developerAppsPage = {
  ...developerAppsPageMetadata,
  actions: { ...developerAppsPageActions },
}

export default developerAppsPage

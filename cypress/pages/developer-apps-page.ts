import webRoutes from '@/constants/routes'
import appRequests from '../requests/app'
import apiRoutes from '../fixtures/routes'

const developerAppsPageMetadata = {
  url: webRoutes.DEVELOPER_MY_APPS,
  selectors: {
    container: '#page-developer-apps-container',
    buttonEditDetails: 'button[data-test="detail-modal-edit-button"]',
    btnCloseDetailModal: 'button[data-test="modal-close-button"]'
  }
}

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
  }
}

const developerAppsPage = {
  ...developerAppsPageMetadata,
  actions: { ...developerAppsPageActions }
}

export default developerAppsPage

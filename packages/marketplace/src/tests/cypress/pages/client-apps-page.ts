import routes from '@/constants/routes'

export default {
  url: routes.CLIENT,
  selectors: {
    container: '#page-client-apps-container',
    searchInput: 'input#search',
    btnAcceptWelcomeMessageModal: 'button[data-test="button-accept-welcome-message-modal"]',
    getDivAppCardWithName(name: string) {
      return cy.get(`div[data-test-app-name="${name}"]`)
    },
    getCategoryWithId(id: number) {
      return cy.get(`a[data-test-category-id="${id}"]`)
    }
  }
}

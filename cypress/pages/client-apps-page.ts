import routes from '@/constants/routes'

export default {
  url: routes.CLIENT,
  selectors: {
    container: '#page-client-apps-container',
    getDivAppCardWithName(name: string) {
      return cy.get(`div[data-test-app-name="${name}"]`)
    }
  }
}

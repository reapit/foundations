import routes from '../fixtures/routes'

export default {
  deleteApp: (appId: string) => {
    cy.server()
    cy.route(`${routes.apps}/${appId}`, 'DELETE')

    cy.request({
      url: `${routes.apps}/${appId}`,
      method: 'DELETE',
      headers: {
        'x-api-key': Cypress.env('MARKETPLACE_API_KEY')
      }
    })
  }
}

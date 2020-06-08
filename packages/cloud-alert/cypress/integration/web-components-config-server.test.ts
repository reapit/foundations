Cypress.on('fail', (error, runnable) => {
  fetch(Cypress.env('SLACK_WEB_HOOK_URL'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: `Failed on ${runnable.title}`,
    }),
  })
  throw error
})

if (Cypress.env('PACKAGE_NAME') === 'all' || Cypress.env('PACKAGE_NAME') === 'web-components-config-server') {
  const WEB_COMPONENTS_CONFIG_API_URL = Cypress.env(`WEB_COMPONENTS_CONFIG_API_URL_${Cypress.env('ENVIRONMENT')}`)
  describe('web-components-config-server API', () => {
    let config = {}

    beforeEach(function() {
      cy.fixture('web-components-config-server/web-components-config.json').then(data => {
        config = data
      })
    })
    it('user should able to call /v1/health', () => {
      cy.request({
        url: `${WEB_COMPONENTS_CONFIG_API_URL}/v1/health`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': Cypress.env('WEB_COMPONENTS_X_API_KEY'),
        },
      }).as('appointmentSlots')
      cy.get('@appointmentSlots').should((response: any) => {
        expect(response).to.have.property('headers')
        expect(response).to.have.property('body')
        expect(response).to.have.property('status')
        expect(response.status).to.equal(200)
        expect(response.body).not.to.be.undefined
        expect(response.body).to.deep.equal({
          message: 'Service is running',
        })
      })
    })
    it('user should able to call /v1/web-components-config/<customer_id>', () => {
      cy.request({
        url: `${WEB_COMPONENTS_CONFIG_API_URL}/v1/web-components-config/ZZA`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': Cypress.env('WEB_COMPONENTS_X_API_KEY'),
        },
      }).as('appointmentSlots')
      cy.get('@appointmentSlots').should((response: any) => {
        expect(response).to.have.property('headers')
        expect(response).to.have.property('body')
        expect(response).to.have.property('status')
        expect(response.status).to.equal(200)
        expect(response.body).not.to.be.undefined
        expect(response.body).to.deep.equal(config)
      })
    })
  })
}

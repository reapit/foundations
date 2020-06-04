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

if (Cypress.env('PACKAGE_NAME') === 'all' || Cypress.env('PACKAGE_NAME') === 'appointment-planner-component') {
  const WEB_COMPONENTS_API_URL = Cypress.env(`WEB_COMPONENTS_API_URL_${Cypress.env('ENVIRONMENT')}`)
  describe('Search widget API', () => {
    it('user should able to call /appointment-slots', () => {
      cy.request({
        url: `${WEB_COMPONENTS_API_URL}/appointment-slots`,
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
      })
    })
  })
}

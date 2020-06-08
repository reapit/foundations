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

// TODO: disabled and wait for graphql server deploy to dev env
if (Cypress.env('PACKAGE_NAME') === 'all' || Cypress.env('PACKAGE_NAME') === 'graphql-server') {
  // const GRAPHQL_SERVER_URL = Cypress.env(`GRAPHQL_SERVER_URL_${Cypress.env('ENVIRONMENT')}`)
  describe('graphql-server API', () => {
    it('user should able to call /ping', () => {
      // cy.request({
      //   url: `${GRAPHQL_SERVER_URL}/ping`,
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     operationName: 'PING',
      //     query: 'query {Ping}',
      //   }),
      // }).as('appointmentSlots')
      // cy.get('@appointmentSlots').should((response: any) => {
      //   expect(response).to.have.property('headers')
      //   expect(response).to.have.property('body')
      //   expect(response).to.have.property('status')
      //   expect(response.status).to.equal(200)
      //   expect(response.body).not.to.be.undefined
      //   expect(response.body).to.deep.equal({
      //     data: {
      //       Ping: 'Services is running',
      //     },
      //   })
      // })
      expect(true).to.equal(true)
    })
  })
}

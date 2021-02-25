import { nodeServicesDev, nodeServicesProd } from '../support/constants'

Cypress.on('fail', (error, runnable) => {
  fetch(Cypress.env('SLACK_WEB_HOOK_URL'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: `${runnable.title} failed - you should investigate this service is live and functioning correctly`,
    }),
  })
  throw error
})

describe('Node Services Dev', () => {
  nodeServicesDev.forEach(app => {
    it(`Healthcheck for Dev ${app.appName} ${app.url}/ok`, () => {
      cy.request({
        url: `${app.url}/ok`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).as(`healthCheckResponse${app.url}`)

      cy.get(`@healthCheckResponse${app.url}`).should((response: any) => {
        expect(response).to.have.property('headers')
        expect(response).to.have.property('body')
        expect(response).to.have.property('status')
        expect(response.status).to.equal(200)
        expect(response.body).not.to.be.undefined
        expect(response.body).to.deep.equal('ok')
      })
    })
  })
})

describe('Node Services Prod', () => {
  nodeServicesProd.forEach(app => {
    it.skip(`Healthcheck for Prod ${app.appName} ${app.url}/ok`, () => {
      cy.request({
        url: `${app.url}/ok`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).as(`healthCheckResponse${app.url}`)

      cy.get(`@healthCheckResponse${app.url}`).should((response: any) => {
        expect(response).to.have.property('headers')
        expect(response).to.have.property('body')
        expect(response).to.have.property('status')
        expect(response.status).to.equal(200)
        expect(response.body).not.to.be.undefined
        expect(response.body).to.deep.equal('ok')
      })
    })
  })
})

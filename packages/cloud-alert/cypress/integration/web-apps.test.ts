import { webAppsDev, webAppsProd } from '../support/constants'

Cypress.on('fail', (error, runnable) => {
  fetch(Cypress.env('SLACK_WEB_HOOK_URL'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: `${runnable.title} failed - you should investigate this app is live and functioning correctly`,
    }),
  })
  throw error
})

describe('Web Apps Dev', () => {
  webAppsDev.forEach(app => {
    it(`Heathcheck for Dev ${app.appName} ${app.url}`, () => {
      cy.visit(`${app.url}/ok`).then(() => {
        cy.get('#ok-content').should('contain', "It's ok, everything's fine 👍")
      })
    })
  })
})

describe('Web Apps Prod', () => {
  webAppsProd.forEach(app => {
    it.skip(`Heathcheck for Prod ${app.appName} ${app.url}`, () => {
      cy.visit(`${app.url}/ok`).then(() => {
        cy.get('#ok-content').should('contain', "It's ok, everything's fine 👍")
      })
    })
  })
})

import adminAppPage from '../pages/admin-apps-page'
import parseXhrBodyToJson from '../utils/parse-xhr-body-to-json'
import { loginAdminHook } from '../hooks/login'

const {
  url,
  selectors: { listAppTr, buttonSubmit, buttonRefresh },
  apiGetAppList,
} = adminAppPage

before(() => {
  loginAdminHook()
})

describe('Search app happy path', () => {
  it('should have at least 1 app with correct data', () => {
    cy.server()
    cy.route(apiGetAppList).as('getAppList')
    cy.visit(url)
    cy.wait('@getAppList')
      .then(xhr => (parseXhrBodyToJson as any)(xhr))
      .then(({ data: appList }) => {
        expect(appList).to.have.length.gte(1)
        /* take random data and try to find that */
        return { ...appList[Math.floor(Math.random() * appList.length)] }
      })
      .then(appData => {
        cy.get('input#appName').type(appData.name)
        cy.get('input#companyName').type(appData.developer)
        cy.get(buttonSubmit)
          .contains('Search')
          .click()
        cy.wait('@getAppList')
        cy.get(listAppTr).should('have.length.gte', 1)
        cy.get(listAppTr)
          .contains(appData.name)
          .should('ok')
        cy.get(listAppTr).contains(appData.developer)
      })
  })

  it('should show all apps when click refresh', () => {
    cy.server()
    cy.route(apiGetAppList).as('getAppList')
    cy.get(buttonRefresh)
      .contains('Refresh')
      .click()
    cy.wait('@getAppList')
    cy.get(listAppTr).should('have.length.gte', 1)
  })

  it('should not find any data with stub empty app list', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: apiGetAppList,
      response: { data: [] },
    }).as('getAppList')
    cy.get('input#appName')
      .clear()
      .type('a')
    cy.get('input#companyName').clear()
    cy.get(buttonSubmit)
      .contains('Search')
      .click()
    cy.wait('@getAppList')
    cy.get(listAppTr).should('have.length', 0)
  })
})

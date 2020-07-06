import developerSetting from '../pages/developer-settings-page'
import parseXhrBodyToJson from '../utils/parse-xhr-body-to-json'
import nanoid from 'nanoid'
import { loginDeveloperHook } from '../hooks/login'

const { selectors, url, apiRoute } = developerSetting

describe('Success update developer contact info', () => {
  beforeEach(() => {
    cy.server()
    loginDeveloperHook()
  })
  let initialData: any
  it('should successfully pass data from xhr into correct input', () => {
    cy.server()
    cy.route({ method: 'GET', url: apiRoute }).as('getDeveloperInfo')
    cy.visit(url)
    cy.wait('@getDeveloperInfo')
      .then(xhr => (parseXhrBodyToJson as any)(xhr))
      .then(response => {
        initialData = {
          company: response.company,
          name: response.name,
          jobTitle: response.jobTitle,
          telephone: response.telephone,
        }

        // check if info is correctly pass to input
        cy.get(selectors.companyName).should('have.value', response.company)
        cy.get(selectors.fullName).should('have.value', response.name)
        cy.get(selectors.jobTitle).should('have.value', response.jobTitle)
        cy.get(selectors.telephone).should('have.value', response.telephone)
      })
  })

  it('should update successfully with valid data', () => {
    cy.server()
    cy.route({ method: 'PUT', url: apiRoute }).as('saveChanges')
    cy.visit(url)
    const newData = {
      company: 'New company' + nanoid(),
      name: 'New Name' + nanoid(),
      jobTitle: 'New job' + nanoid(),
      telephone: '0845 123 4567',
    }
    // typing valid data
    cy.get(selectors.companyName)
      .clear()
      .type(newData.company)
    cy.get(selectors.fullName)
      .clear()
      .type(newData.name)
    cy.get(selectors.jobTitle)
      .clear()
      .type(newData.jobTitle)
    cy.get(selectors.telephone)
      .clear()
      .type(newData.telephone)

    cy.get(selectors.submitButton).click()

    cy.wait('@saveChanges')
    // check if info was updated
    cy.get(selectors.companyName).should('have.value', newData.company)
    cy.get(selectors.fullName).should('have.value', newData.name)
    cy.get(selectors.jobTitle).should('have.value', newData.jobTitle)
    cy.get(selectors.telephone).should('have.value', newData.telephone)
  })
  after(() => {
    cy.server()
    cy.route({ method: 'PUT', url: apiRoute }).as('saveChanges')
    cy.visit(url)
    // back to initial data
    cy.get(selectors.companyName)
      .clear()
      .type(initialData.company)
    cy.get(selectors.fullName)
      .clear()
      .type(initialData.name)
    cy.get(selectors.jobTitle)
      .clear()
      .type(initialData.jobTitle)
    cy.get(selectors.telephone)
      .clear()
      .type(initialData.telephone)

    cy.get(selectors.submitButton).click()

    cy.wait('@saveChanges')
    // check if info was back to initial
    cy.get(selectors.companyName).should('have.value', initialData.company)
    cy.get(selectors.fullName).should('have.value', initialData.name)
    cy.get(selectors.jobTitle).should('have.value', initialData.jobTitle)
    cy.get(selectors.telephone).should('have.value', initialData.telephone)
  })
})

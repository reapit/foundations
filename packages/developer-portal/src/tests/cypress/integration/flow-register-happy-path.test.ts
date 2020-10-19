import routes from '../fixtures/routes'
import registerPage from '../pages/register-page'
import nanoid from 'nanoid'

const { selectors: registerPageSelectors } = registerPage

describe('Register happy path', () => {
  it('Should register successfully ', () => {
    cy.visit(registerPage.url)
    cy.server()
    cy.route('POST', routes.developers).as('requestRegisterDeveloper')
    const inputTestData: any = {
      textBoxTel: '0123456789',
      textBoxFullName: 'Test name',
      textBoxEmail: `testEmail${nanoid(5)}@gmail.com`,
      textBoxCompanyName: 'Test company',
    }
    for (const inputTestDataSelector in inputTestData) {
      const data = inputTestData[inputTestDataSelector]
      const selector = (registerPageSelectors as any)[inputTestDataSelector]
      cy.get(selector).type(data)
    }
    const { buttonAcceptTerm, buttonSubmitRegister, divSuccess } = registerPageSelectors
    cy.get(buttonSubmitRegister).click()
    cy.get(buttonAcceptTerm).click()
    cy.wait('@requestRegisterDeveloper')
    cy.get(divSuccess).should('have.length', 1)
  })
})

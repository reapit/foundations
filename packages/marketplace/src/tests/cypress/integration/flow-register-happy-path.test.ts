import routes from '../fixtures/routes'
import registerPage from '../pages/register-page'
import nanoid from 'nanoid'

const { selectors: registerPageSelectors } = registerPage

/**
 * To test this, you will need to uncomment the route component rendering the register page at ./src/core/router.tsx
 */
describe.skip('Register happy path', () => {
  it('Should register successfully and be able to login using the registered account', () => {
    // routes.REGISTER have been commented out so this test case won't work.
    cy.visit(registerPage.url)
    cy.server()
    cy.route('POST', routes.developers).as('requestRegisterDeveloper')
    const inputTestData: any = {
      textBoxTel: '0123456789',
      textBoxPassword: 'q1W2e3R4t5Y6',
      textBoxConfirmPassword: 'q1W2e3R4t5Y6',
      textBoxFullName: 'Test name',
      textBoxEmail: `testEmail${nanoid(5)}@gmail.com`,
      textBoxCompanyName: 'Test company',
    }
    for (let inputTestDataSelector in inputTestData) {
      const data = inputTestData[inputTestDataSelector]
      const selector = (registerPageSelectors as any)[inputTestDataSelector]
      cy.get(selector).type(data)
    }
    const {
      checkBoxTermsAndConditions,
      btnAcceptTermsAndConditions,
      buttonSubmitRegister,
      divRegisterSuccessfully,
    } = registerPageSelectors
    cy.get(checkBoxTermsAndConditions).click({ force: true })
    cy.get(btnAcceptTermsAndConditions).click()
    cy.get(buttonSubmitRegister).click()
    cy.wait('@requestRegisterDeveloper')
    cy.get(divRegisterSuccessfully).should('have.length', 1)
  })
})

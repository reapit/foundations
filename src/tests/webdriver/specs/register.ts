import RegisterPage from '../page-objects/register'

describe('RegisterPage', () => {
  beforeEach(() => {
    RegisterPage.open()
    RegisterPage.form.waitForVisible()
  })

  it('should load the form correctly', () => {
    expect(RegisterPage.allInputs.length).toBe(5)
    expect(RegisterPage.firstNameInput.getAttribute('type')).toEqual('text')
    expect(RegisterPage.lastNameInput.getAttribute('type')).toEqual('text')
    expect(RegisterPage.emailInput.getAttribute('type')).toEqual('email')
    expect(RegisterPage.passwordInput.getAttribute('type')).toEqual('password')
    expect(RegisterPage.confirmPasswordInput.getAttribute('type')).toEqual('password')
  })

  it('should not submit and instead show a validation messages if no input was filled', () => {
    RegisterPage.submitForm()
    expect(RegisterPage.errorMessages.length).toBe(4)
    expect(RegisterPage.errorMessages[0].getText()).toEqual('Required')
    expect(RegisterPage.errorMessages[1].getText()).toEqual('Required')
    expect(RegisterPage.errorMessages[2].getText()).toEqual('Required')
    expect(RegisterPage.errorMessages[3].getText()).toEqual('Required')
  })

  it('should not submit and instead show a validation messages if invalid input', () => {
    RegisterPage.populateInvalidForm()
    RegisterPage.submitForm()
    expect(RegisterPage.errorMessages.length).toBe(2)
    expect(RegisterPage.errorMessages[0].getText()).toEqual('Invalid email address')
    expect(RegisterPage.errorMessages[1].getText()).toEqual('Password does not match')
  })

  it('should show success message after submit', () => {
    RegisterPage.populateValidForm()
    RegisterPage.submitForm()
    RegisterPage.successMessage.waitForVisible()
    expect(RegisterPage.successMessage.getText()).toEqual('Check you email to confirm your account')
  })

  afterEach(() => {
    browser.localStorage('DELETE', 'token')
  })
})

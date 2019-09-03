import RegisterPage from '../page-objects/register'

describe('Developer Registration', () => {
  beforeEach(() => {
    RegisterPage.open()
    RegisterPage.form.waitForVisible()
  })

  it('should load the form correctly', () => {
    expect(RegisterPage.allInputs.length).toBe(6)
    expect(RegisterPage.nameInput.getAttribute('type')).toEqual('text')
    expect(RegisterPage.companyNameInput.getAttribute('type')).toEqual('text')
    expect(RegisterPage.emailInput.getAttribute('type')).toEqual('email')
    expect(RegisterPage.telephoneInput.getAttribute('type')).toEqual('text')
    expect(RegisterPage.passwordInput.getAttribute('type')).toEqual('password')
    expect(RegisterPage.confirmPasswordInput.getAttribute('type')).toEqual('password')
  })

  it('should not submit and instead show a validation messages if no input was filled', () => {
    RegisterPage.submitForm()
    expect(RegisterPage.errorMessages.length).toBe(5)
    expect(RegisterPage.errorMessages[0].getText()).toEqual('Required')
    expect(RegisterPage.errorMessages[1].getText()).toEqual('Required')
    expect(RegisterPage.errorMessages[2].getText()).toEqual('Required')
    expect(RegisterPage.errorMessages[3].getText()).toEqual('Required')
    expect(RegisterPage.errorMessages[4].getText()).toEqual('Required')
  })

  it('should not submit and instead show a validation messages if invalid input', () => {
    RegisterPage.populateInvalidForm()
    RegisterPage.submitForm()
    expect(RegisterPage.errorMessages.length).toBe(2)
    expect(RegisterPage.errorMessages[0].getText()).toEqual('Invalid email address')
    expect(RegisterPage.errorMessages[1].getText()).toEqual('Password does not match')
  })

  // TODO - need to stablise this test by stubbing API or similar -
  // will always fail because valid form details are constants and we get a "user already registered"
  // error from the server.
  it('should show success message after submit', () => {
    RegisterPage.populateValidForm()
    RegisterPage.submitForm()
    RegisterPage.successMessage.waitForVisible()
    expect(RegisterPage.successMessage.getText()).toEqual('Check you email to confirm your account')
  })
})

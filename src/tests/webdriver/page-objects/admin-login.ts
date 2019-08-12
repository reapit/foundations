import Base from './base'

class AdminLoginPage extends Base {
  get loginRoute() {
    return '/admin/login'
  }

  get validFormData() {
    return {
      email: 'wmcvay@reapit.com',
      password: 'NewPassword123'
    }
  }

  get form() {
    return $('[data-test="login-form"]')
  }

  get passwordInput() {
    return $('[data-test="login-password"]')
  }

  get emailInput() {
    return $('[data-test="login-email"]')
  }

  get submitButton() {
    return $('button[type="submit"]')
  }

  get allInputs() {
    return $$('input')
  }

  get errorMessages() {
    return $$('[data-test="input-error"]')
  }

  populateValidForm() {
    this.emailInput.setValue('wmcvay@reapit.com')
    this.passwordInput.setValue('NewPassword123')
  }

  submitForm() {
    this.submitButton.click()
    browser.pause(5000)
  }

  open() {
    super.open(this.loginRoute)
  }

  login() {
    this.open()
    this.populateValidForm()
    this.submitForm()
  }
}

export default new AdminLoginPage()

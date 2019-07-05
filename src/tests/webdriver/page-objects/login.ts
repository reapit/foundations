import Base from './base'

class LoginPage extends Base {
  get loginRoute() {
    return '/login'
  }

  get validFormData() {
    return {
      email: 'test@mail.com',
      password: 'Password123'
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

  get allTabs() {
    return $$('a[role="tab"]')
  }

  get developerTab() {
    return $('#DEVELOPER')
  }

  populateValidForm() {
    this.emailInput.setValue(this.validFormData.email)
    this.passwordInput.setValue(this.validFormData.password)
  }

  submitForm() {
    this.submitButton.click()
  }

  selectDeveloperTab() {
    this.developerTab.click()
  }

  open() {
    super.open(this.loginRoute)
  }

  logAsClient() {
    this.open()
    this.populateValidForm()
    this.submitForm()
  }
}

export default new LoginPage()

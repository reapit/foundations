import Base from './base'
import ClientHome from './client'
import DeveloperHome from './developer-home'

class LoginPage extends Base {
  get loginRoute() {
    return '/login'
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

  get allTabs() {
    return $$('a[role="tab"]')
  }

  get developerTab() {
    return $('#DEVELOPER')
  }

  populateValidForm() {
    this.emailInput.setValue('wmcvay@reapit.com')
    this.passwordInput.setValue('NewPassword123')
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
    ClientHome.cardContainer.waitForVisible()
  }

  logAsDeveloper() {
    this.open()
    this.selectDeveloperTab()
    this.populateValidForm()
    this.submitForm()
    DeveloperHome.cardContainer.waitForVisible()
  }
}

export default new LoginPage()

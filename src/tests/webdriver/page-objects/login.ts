import Base from './base'
import ClientHome from './client'
import DeveloperHome from './developer-home'

const ACCOUNTS = {
  CLIENT: {
    EMAIL: 'cbryan@reapit.com',
    PWD: 'myPassword12345'
  },
  DEV: {
    EMAIL: 'wmcvay@reapit.com',
    PWD: 'NewPassword123'
  }
}

const ROLES = {
  CLIENT: 'client',
  DEV: 'developer'
}

class LoginPage extends Base {
  currRole

  get loginRoute() {
    this.currRole = ROLES.CLIENT

    return '/login'
  }

  get validFormData() {
    let result

    switch (this.currRole) {
      case ROLES.DEV:
        result = {
          email: ACCOUNTS.DEV.EMAIL,
          password: ACCOUNTS.DEV.PWD
        }
        break

      default:
        result = {
          email: ACCOUNTS.CLIENT.EMAIL,
          password: ACCOUNTS.CLIENT.PWD
        }
        break
    }

    return result
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
    switch (this.currRole) {
      case ROLES.DEV:
        this.emailInput.setValue(ACCOUNTS.DEV.EMAIL)
        this.passwordInput.setValue(ACCOUNTS.DEV.PWD)

        break

      default:
        this.emailInput.setValue(ACCOUNTS.CLIENT.EMAIL)
        this.passwordInput.setValue(ACCOUNTS.CLIENT.PWD)

        break
    }
  }

  submitForm() {
    this.submitButton.click()
    browser.pause(5000)
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

  logAsDeveloper() {
    this.open()
    this.selectDeveloperTab()
    this.populateValidForm()
    this.submitForm()
  }
}

export default new LoginPage()

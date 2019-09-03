import Base from './base'

const ACCOUNTS = {
  CLIENT: {
    EMAIL: 'cbryan@reapit.com',
    PWD: 'myPassword12345'
  },
  DEV: {
    EMAIL: 'wmcvay@reapit.com',
    PWD: 'NewPassword123'
  },
  ADMIN: {
    EMAIL: 'rwilcox@reapit.com',
    PWD: 'myPassword12345'
  }
}

const ROLES = {
  CLIENT: 'client',
  DEV: 'developer',
  ADMIN: 'admin'
}

class LoginPage extends Base {
  currRole = ''

  get loginRoute() {
    return '/login'
  }

  get loginAdminRoute() {
    return '/admin/login'
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
      case ROLES.ADMIN:
        this.emailInput.setValue(ACCOUNTS.ADMIN.EMAIL)
        this.passwordInput.setValue(ACCOUNTS.ADMIN.PWD)

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

  openAdmin() {
    super.open(this.loginAdminRoute)
  }

  logAsClient() {
    this.currRole = ROLES.CLIENT
    this.open()
    this.populateValidForm()
    this.submitForm()
  }

  loginAsAdmin() {
    this.currRole = ROLES.ADMIN
    this.openAdmin()
    this.populateValidForm()
    this.submitForm()
  }

  logAsDeveloper() {
    this.currRole = ROLES.DEV
    this.open()
    this.selectDeveloperTab()
    this.populateValidForm()
    this.submitForm()
  }

  logAsDeveloperUsingCustomAccount({ email, password }) {
    this.open()
    this.currRole = ROLES.DEV
    this.selectDeveloperTab()
    this.emailInput.setValue(email)
    this.passwordInput.setValue(password)
    this.submitForm()
  }
}

export default new LoginPage()

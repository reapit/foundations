import Base from './base'
import LoginPage from './login'

class DeveloperSubmitAppPage extends Base {
  get route() {
    return '/developer/submit-app'
  }

  get validFormData() {
    return {
      appName: 'Todo list',
      copmanyName: 'ABC XYZ'
    }
  }

  get form() {
    return $('[data-test="submit-app-form"]')
  }

  get appNameInput() {
    return $('[data-test="submit-app-name"]')
  }

  get appDescription() {
    return $('[data-test="submit-app-description"]')
  }

  get companyNameInput() {
    return $('[data-test="submit-app-company-name"]')
  }

  get submitSuccessSection() {
    return $('[data-test="submit-success-section"]')
  }

  get successMessage() {
    return $('[data-test="submit-success-message"]')
  }

  get submitAnotherButton() {
    return $('[data-test="submit-another-button"]')
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
    this.appNameInput.setValue(this.validFormData.appName)
    this.companyNameInput.setValue(this.validFormData.copmanyName)
  }

  submitForm() {
    this.submitButton.click()
  }

  submitAnother() {
    this.submitAnotherButton.click()
  }

  open() {
    LoginPage.logAsDeveloper()
    super.open(this.route)
  }
}

export default new DeveloperSubmitAppPage()

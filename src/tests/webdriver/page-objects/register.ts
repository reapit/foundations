import Base from './base'

class RegisterPage extends Base {
  get route() {
    return '/register'
  }

  get validFormData() {
    return {
      name: 'John Doe',
      companyName: 'Acme',
      email: 'test@mail.com',
      telephone: '123456789'
      // ,
      // password: 'Password123',
      // confirmPassword: 'Password123'
    }
  }

  get invalidFormData() {
    return {
      name: 'John Doe',
      companyName: 'Acme',
      email: 'invalid.com',
      telephone: '123456789'
      // ,
      // password: 'Password123',
      // confirmPassword: 'Password456'
    }
  }

  get form() {
    return $('[data-test="register-form"]')
  }

  get nameInput() {
    return $('[data-test="register-name"]')
  }

  get companyNameInput() {
    return $('[data-test="register-company-name"]')
  }

  get telephoneInput() {
    return $('[data-test="register-telephone"]')
  }

  get emailInput() {
    return $('[data-test="register-email"]')
  }

  get passwordInput() {
    return $('[data-test="register-password"]')
  }

  get confirmPasswordInput() {
    return $('[data-test="register-confirm-password"]')
  }

  get errorMessage() {
    return $('[data-test="register-error-message"]')
  }

  get successMessage() {
    return $('[data-test="register-success-message"]')
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

  populateInvalidForm() {
    this.nameInput.setValue(this.invalidFormData.name)
    this.companyNameInput.setValue(this.invalidFormData.companyName)
    this.emailInput.setValue(this.invalidFormData.email)
    this.telephoneInput.setValue(this.invalidFormData.telephone)
    // this.passwordInput.setValue(this.invalidFormData.password)
    // this.confirmPasswordInput.setValue(this.invalidFormData.confirmPassword)
  }

  populateValidForm() {
    this.nameInput.setValue(this.validFormData.name)
    this.companyNameInput.setValue(this.validFormData.companyName)
    this.emailInput.setValue(this.validFormData.email)
    this.telephoneInput.setValue(this.validFormData.telephone)
    // this.passwordInput.setValue(this.validFormData.password)
    // this.confirmPasswordInput.setValue(this.validFormData.confirmPassword)
  }

  submitForm() {
    this.submitButton.click()
  }

  open() {
    super.open(this.route)
  }
}

export default new RegisterPage()

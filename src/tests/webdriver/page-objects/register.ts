import Base from './base'

class RegisterPage extends Base {
  get route() {
    return '/register'
  }

  get validFormData() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@mail.com',
      password: 'Password123',
      confirmPassword: 'Password123'
    }
  }

  get invalidFormData() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid.com',
      password: 'Password123',
      confirmPassword: 'Password456'
    }
  }

  get form() {
    return $('[data-test="register-form"]')
  }

  get firstNameInput() {
    return $('[data-test="register-firstname"]')
  }

  get lastNameInput() {
    return $('[data-test="register-lastname"]')
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
    this.firstNameInput.setValue(this.invalidFormData.firstName)
    this.lastNameInput.setValue(this.invalidFormData.lastName)
    this.emailInput.setValue(this.invalidFormData.email)
    this.passwordInput.setValue(this.invalidFormData.password)
    this.confirmPasswordInput.setValue(this.invalidFormData.confirmPassword)
  }

  populateValidForm() {
    this.firstNameInput.setValue(this.validFormData.firstName)
    this.lastNameInput.setValue(this.validFormData.lastName)
    this.emailInput.setValue(this.validFormData.email)
    this.passwordInput.setValue(this.validFormData.password)
    this.confirmPasswordInput.setValue(this.validFormData.confirmPassword)
  }

  submitForm() {
    this.submitButton.click()
  }

  open() {
    super.open(this.route)
  }
}

export default new RegisterPage()

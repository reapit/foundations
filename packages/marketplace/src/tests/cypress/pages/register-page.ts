import routes from '@/constants/routes'

export default {
  url: routes.REGISTER,
  selectors: {
    textBoxFullName: 'input#name',
    textBoxCompanyName: 'input#companyName',
    textBoxEmail: 'input#email',
    textBoxTel: 'input#telephone',
    textBoxPassword: 'input#password',
    textBoxConfirmPassword: 'input#confirmPassword',
    checkBoxTermsAndConditions: 'input#terms',
    divRegisterSuccessfully: 'div[data-test="register-success-message"]',
    btnAcceptTermsAndConditions: 'button[data-test="buttonAcceptTermsAndConditions"]',
    buttonSubmitRegister: 'button[type="submit"]',
  },
}

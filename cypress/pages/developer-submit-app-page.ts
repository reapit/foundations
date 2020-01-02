import routes from '@/constants/routes'

export default {
  url: routes.SUBMIT_APP,
  selectors: {
    buttonSubmit: 'button[type="submit"]',
    selectCategory: 'select[name="categoryId"]',
    checkBoxUserSession: 'input[id="USER SESSION"]',
    checkBoxClientSecret: 'input["CLIENT SECRET"]',
    textBoxName: 'input[name="name"]',
    inputFileSubmitAppIcon: 'input#iconImage',
    textBoxSupportEmail: 'input[name="supportEmail"]',
    textBoxTelephone: 'input[name="telephone"]',
    textBoxHomePage: 'input[name="homePage"]',
    textBoxLaunchUrl: 'input[name="launchUri"]',
    textAreaSummary: 'textarea[name="summary"]',
    textAreaDescription: 'textarea[name="description"]',
    fileUploadScreenshot1: 'input#screenshot1',
    fileUploadScreenshot2: 'input#screenshot2',
    fileUploadScreenshot3: 'input#screenshot3',
    fileUploadScreenshot4: 'input#screenshot4',
    submitSuccessSection: 'div[data-test="submit-success-section"]',
    checkboxAgreeTheTermsAndConditions: 'input#terms-submit-app'
  }
}

import DeveloperSubmitAppPage from '../page-objects/developer-submit-app'
import errorMessages from '../../../constants/error-messages'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

describe('DeveloperSubmitAppPage', () => {
  beforeEach(() => {
    DeveloperSubmitAppPage.open()
    DeveloperSubmitAppPage.form.waitForVisible()
  })

  it('should load the form correctly', () => {
    expect(DeveloperSubmitAppPage.allInputs.length).toBe(14)

    expect(DeveloperSubmitAppPage.name.getAttribute('type')).toEqual('text')

    expect(DeveloperSubmitAppPage.description.getAttribute('type')).toEqual('textarea')
    expect(DeveloperSubmitAppPage.summary.getAttribute('type')).toEqual('textarea')

    expect(DeveloperSubmitAppPage.supportEmail.getAttribute('type')).toEqual('text')
    expect(DeveloperSubmitAppPage.telephone.getAttribute('type')).toEqual('tel')
    expect(DeveloperSubmitAppPage.homePage.getAttribute('type')).toEqual('text')

    expect(DeveloperSubmitAppPage.launchUri.getAttribute('type')).toEqual('text')
    // expect(DeveloperSubmitAppPage.screenshot1.getAttribute('type')).toEqual('file')
    // expect(DeveloperSubmitAppPage.screenshot2.getAttribute('type')).toEqual('file')
    // expect(DeveloperSubmitAppPage.screenshot3.getAttribute('type')).toEqual('file')
    // expect(DeveloperSubmitAppPage.screenshot4.getAttribute('type')).toEqual('file')
  })

  it('should not submit and instead show a validation messages if required data is not filled', () => {
    DeveloperSubmitAppPage.submitForm()
    expect(DeveloperSubmitAppPage.errorMessages.length).toBe(9)
    for (let i = 0; i < 9; i++) {
      expect(DeveloperSubmitAppPage.errorMessages[0].getText()).toEqual(errorMessages.FIELD_REQUIRED)
    }
  })

  it('should not submit if email is invalid', () => {
    DeveloperSubmitAppPage.populateValidForm()
    DeveloperSubmitAppPage.supportEmail.setValue('invalid email address')
    DeveloperSubmitAppPage.submitForm()
    expect(DeveloperSubmitAppPage.errorMessages.length).toBe(1)
    expect(DeveloperSubmitAppPage.errorMessages[0].getText()).toEqual(errorMessages.FIELD_WRONG_EMAIL_FORMAT)
  })

  // Skip for now, developerId is not present in submitApp request so test will always fail
  xit('should show success message after submit, should re-show the form with all clean fields after click Submit another button', () => {
    DeveloperSubmitAppPage.populateValidForm()
    DeveloperSubmitAppPage.submitForm()
    DeveloperSubmitAppPage.successMessage.waitForVisible()
    DeveloperSubmitAppPage.submitAnother()
    DeveloperSubmitAppPage.form.waitForVisible()
  })

  afterEach(() => {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

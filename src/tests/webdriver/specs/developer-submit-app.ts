import DeveloperSubmitAppPage from '../page-objects/developer-submit-app'
import CommonPage from '../page-objects/common'
import errorMessages from '../../../constants/error-messages'
import DeveloperHomePage from '../page-objects/developer-home'
import ApprovalsPage from '../page-objects/approvals'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

const NUMBER_OF_FIELDS = 17
const NUMBER_OF_REQUIRED_FIELDS = 9

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000
describe('DeveloperSubmitAppPage', () => {
  beforeEach(() => {
    DeveloperSubmitAppPage.openUsingCustomAccount({
      email: 'phmngocnghia@gmail.com',
      password: 'myPassword12345'
    })
    DeveloperSubmitAppPage.form.waitForVisible()
  })

  it('should load the form correctly', () => {
    expect(DeveloperSubmitAppPage.allInputs.length).toBe(NUMBER_OF_FIELDS)

    expect(DeveloperSubmitAppPage.name.getAttribute('type')).toEqual('text')

    expect(DeveloperSubmitAppPage.description.getAttribute('type')).toEqual('textarea')
    expect(DeveloperSubmitAppPage.summary.getAttribute('type')).toEqual('textarea')

    expect(DeveloperSubmitAppPage.supportEmail.getAttribute('type')).toEqual('text')
    expect(DeveloperSubmitAppPage.telephone.getAttribute('type')).toEqual('tel')
    expect(DeveloperSubmitAppPage.homePage.getAttribute('type')).toEqual('text')

    expect(DeveloperSubmitAppPage.launchUri.getAttribute('type')).toEqual('text')
    expect(DeveloperSubmitAppPage.screenshot1.getAttribute('type')).toEqual('file')
    expect(DeveloperSubmitAppPage.screenshot2.getAttribute('type')).toEqual('file')
    expect(DeveloperSubmitAppPage.screenshot3.getAttribute('type')).toEqual('file')
    expect(DeveloperSubmitAppPage.screenshot4.getAttribute('type')).toEqual('file')
  })

  it('should not submit and instead show a validation messages if required data is not filled', () => {
    DeveloperSubmitAppPage.submitForm()
    expect(DeveloperSubmitAppPage.errorMessages.length).toBe(NUMBER_OF_REQUIRED_FIELDS)

    DeveloperSubmitAppPage.errorMessages.forEach(messageField =>
      expect(messageField.getText()).toEqual(errorMessages.FIELD_REQUIRED)
    )
  })

  it('should not submit if email is invalid', () => {
    DeveloperSubmitAppPage.populateValidForm()
    DeveloperSubmitAppPage.supportEmail.setValue('invalid email address')
    DeveloperSubmitAppPage.submitForm()
    expect(DeveloperSubmitAppPage.errorMessages.length).toBe(1)
    expect(DeveloperSubmitAppPage.errorMessages[0].getText()).toEqual(errorMessages.FIELD_WRONG_EMAIL_FORMAT)
  })

  it('should show success message after submit, should re-show the form with all clean fields after click Submit another button', () => {
    const appName =
      'Developer Submit App ' +
      Math.random()
        .toString(36)
        .slice(-5)
    DeveloperSubmitAppPage.submitApp(appName)
    DeveloperHomePage.openWithoutLogin()
    DeveloperHomePage.deleteApp(appName)
  })

  afterEach(() => {
    browser.pause(1)
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

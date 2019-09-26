import DeveloperSubmitAppPage from '../page-objects/developer-submit-app'
import errorMessages from '../../../constants/error-messages'
import Common from '../shared/common'
import LoginPage from '../page-objects/login'

const NUMBER_OF_FIELDS = 17
const NUMBER_OF_REQUIRED_FIELDS = 9

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000

describe('Developer Submit App Page', () => {
  beforeAll(() => {
    LoginPage.logAsDeveloper()
  })

  beforeEach(() => {
    DeveloperSubmitAppPage.open()
    DeveloperSubmitAppPage.form.waitForVisible()
  })

  it('should load the form correctly', () => {
    expect(DeveloperSubmitAppPage.allInputs.length).toBe(NUMBER_OF_FIELDS)

    expect(DeveloperSubmitAppPage.name.getAttribute('type')).toEqual('text')

    expect(DeveloperSubmitAppPage.description.getAttribute('type')).toEqual('textarea')
    expect(DeveloperSubmitAppPage.summary.getAttribute('type')).toEqual('textarea')

    expect(DeveloperSubmitAppPage.supportEmail.getAttribute('type')).toEqual('email')
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

  it('should show success message after submit', () => {
    DeveloperSubmitAppPage.submitApp()
  })

  afterAll(() => {
    Common.tearDown()
  })
})

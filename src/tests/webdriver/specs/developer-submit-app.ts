import DeveloperSubmitAppPage from '../page-objects/developer-submit-app'

describe('DeveloperSubmitAppPage', () => {
  beforeEach(() => {
    DeveloperSubmitAppPage.open()
    DeveloperSubmitAppPage.form.waitForVisible()
  })

  it('should load the form correctly', () => {
    expect(DeveloperSubmitAppPage.allInputs.length).toBe(9)
    expect(DeveloperSubmitAppPage.appNameInput.getAttribute('type')).toEqual('text')
    expect(DeveloperSubmitAppPage.appDescription.getAttribute('type')).toEqual('textarea')
  })

  it('should not submit and instead show a validation messages if data invalid', () => {
    DeveloperSubmitAppPage.submitForm()
    expect(DeveloperSubmitAppPage.errorMessages.length).toBe(2)
    expect(DeveloperSubmitAppPage.errorMessages[0].getText()).toEqual('Required')
    expect(DeveloperSubmitAppPage.errorMessages[1].getText()).toEqual('Required')
  })

  it('should show success message after submit, should re-show the form with all clean fields after click Submit another button', () => {
    DeveloperSubmitAppPage.populateValidForm()
    DeveloperSubmitAppPage.submitForm()
    DeveloperSubmitAppPage.submitSuccessSection.waitForVisible()
    expect(DeveloperSubmitAppPage.successMessage.getText()).toEqual('Submit success')
    DeveloperSubmitAppPage.submitAnother()
    expect(DeveloperSubmitAppPage.appNameInput.getValue()).toEqual('')
    expect(DeveloperSubmitAppPage.companyNameInput.getValue()).toEqual('')
  })

  afterEach(() => {
    browser.localStorage('DELETE', 'token')
  })
})

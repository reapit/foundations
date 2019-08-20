import LoginPage from '../page-objects/login'
import { LOCAL_STORAGE_SESSION_KEY } from '../../../constants/session'

interface LoginSession {
  value: string | null
}

describe('LoginPage', () => {
  beforeEach(() => {
    LoginPage.open()
    LoginPage.form.waitForVisible()
  })

  it('should load the form correctly', () => {
    expect(LoginPage.allTabs.length).toEqual(2)
    expect(LoginPage.allInputs.length).toEqual(2)
    expect(LoginPage.emailInput.getAttribute('type')).toEqual('text')
    expect(LoginPage.passwordInput.getAttribute('type')).toEqual('password')
  })

  it('should submit valid data, set a token and re-direct to client page', () => {
    LoginPage.populateValidForm()
    LoginPage.submitForm()
    // TODO - this localstorage method is deprecated in v5 of Webdriver. Will need to change
    // when we upgrade
    browser.pause(2000)
    expect((browser.localStorage('GET', LOCAL_STORAGE_SESSION_KEY) as LoginSession).value).not.toBeNull()
    expect(browser.getUrl()).toContain('/client')
  })

  it('should not submit and instead show a validation messages if data invalid', () => {
    LoginPage.submitForm()
    expect((browser.localStorage('GET', LOCAL_STORAGE_SESSION_KEY) as LoginSession).value).toBeNull()
    expect(browser.getUrl()).not.toContain('/client')
    expect(LoginPage.errorMessages.length).toBe(2)
    expect(LoginPage.errorMessages[0].getText()).toEqual('Required')
    expect(LoginPage.errorMessages[1].getText()).toEqual('Required')
  })

  it('should redirect back from the login page after a successful login', () => {
    LoginPage.populateValidForm()
    LoginPage.submitForm()
    // Second visit should not navigate
    LoginPage.open()
    expect(browser.getUrl()).not.toContain('/login')
  })

  it('should toggle to login a developer and redirect to the developer page', () => {
    LoginPage.selectDeveloperTab()
    LoginPage.populateValidForm()
    LoginPage.submitForm()
    expect((browser.localStorage('GET', LOCAL_STORAGE_SESSION_KEY) as LoginSession).value).not.toBeNull()
    expect(browser.getUrl()).toContain('/developer')
  })

  afterEach(() => {
    browser.localStorage('DELETE', LOCAL_STORAGE_SESSION_KEY)
  })
})

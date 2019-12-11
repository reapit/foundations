import LoginPage from '../page-objects/login'
import Common from '../shared/common'
import { COOKIE_SESSION_KEY } from '@reapit/cognito-auth'

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
    expect(LoginPage.emailInput.getAttribute('type')).toEqual('email')
    expect(LoginPage.passwordInput.getAttribute('type')).toEqual('password')
  })

  it('should submit valid data, set a token and re-direct to client page', () => {
    LoginPage.logAsClient()
    // TODO - this cookie method is deprecated in v5 of Webdriver. Will need to change
    // when we upgrade
    browser.pause(2000)
    expect(browser.cookie('GET', COOKIE_SESSION_KEY).value).not.toBeNull()
    expect(browser.getUrl()).toContain('/client')
  })

  it('should not submit and instead show a validation messages if data invalid', () => {
    LoginPage.submitForm()
    expect(browser.cookie('GET', COOKIE_SESSION_KEY).value).toEqual([])
    expect(browser.getUrl()).not.toContain('/client')
    expect(LoginPage.errorMessages.length).toBe(2)
    expect(LoginPage.errorMessages[0].getText()).toEqual('Required')
    expect(LoginPage.errorMessages[1].getText()).toEqual('Required')
  })

  it('should redirect back from the login page after a successful login', () => {
    LoginPage.logAsClient()
    // Second visit should not navigate
    LoginPage.open()
    browser.pause(1000)
    expect(browser.getUrl()).not.toContain('/login')
  })

  it('should toggle to login a developer and redirect to the developer page', () => {
    LoginPage.logAsDeveloper()
    browser.pause(1000)
    expect(browser.cookie('GET', COOKIE_SESSION_KEY).value).not.toBeNull()
    expect(browser.getUrl()).toContain('/developer')
  })

  it('should login as an admin correctly', () => {
    LoginPage.loginAsAdmin()
    expect(browser.cookie('GET', COOKIE_SESSION_KEY).value).not.toBeNull()
    expect(browser.getUrl()).toContain('/admin')
  })

  afterEach(() => {
    Common.logout()
  })
})

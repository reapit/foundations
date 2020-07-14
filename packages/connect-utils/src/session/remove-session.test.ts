import { removeSession } from './remove-session'
import { COOKIE_SESSION_KEY } from '../utils/cognito'
import { mockRefreshParams } from '../__mocks__/cognito-session'

const stringifiedMock = JSON.stringify(mockRefreshParams)

describe('removeSession', () => {
  it('should remove a session cookie', () => {
    window.localStorage.setItem(COOKIE_SESSION_KEY, stringifiedMock)

    expect(window.localStorage.getItem(COOKIE_SESSION_KEY)).toEqual(stringifiedMock)

    removeSession()

    expect(window.localStorage.getItem(COOKIE_SESSION_KEY)).toBeFalsy()
  })

  it('should remove a session cookie with appEnv', () => {
    window.localStorage.setItem(`development-${COOKIE_SESSION_KEY}`, stringifiedMock)

    expect(window.localStorage.getItem(`development-${COOKIE_SESSION_KEY}`)).toEqual(stringifiedMock)

    removeSession(COOKIE_SESSION_KEY, 'development')

    expect(window.localStorage.getItem(COOKIE_SESSION_KEY)).toBeFalsy()
  })
})

import { mockLoginSession, mockRefreshParams } from '../../cognito/__mocks__/cognito'

export const tokenExpired = jest.fn(() => false)
export const checkHasIdentityId = jest.fn(() => true)
export const deserializeIdToken = jest.fn(() => mockLoginSession.loginIdentity)
export const getSession = jest.fn(() => mockLoginSession)
export const getTokenFromQueryString = jest.fn(() => mockRefreshParams)
export const getSessionCookie = jest.fn(() => mockRefreshParams)
export const setSessionCookie = jest.fn()

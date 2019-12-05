import { mockLoginSession, mockRefreshParams } from '../../__mocks__/cognito'

export const tokenExpired = jest.fn(() => false)
export const checkHasIdentityId = () => true
export const deserializeIdToken = () => mockLoginSession.loginIdentity
export const getSession = jest.fn(() => mockLoginSession)
export const getTokenFromQueryString = jest.fn(() => mockRefreshParams)
export const getSessionCookie = jest.fn(() => mockRefreshParams)
export const setSessionCookie = jest.fn()

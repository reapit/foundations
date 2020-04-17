import { setUserSession, LoginSession, LoginParams } from '@reapit/cognito-auth'
import { authLoginSuccess, authSetRefreshSession } from '@/actions/auth'
import ROUTES from '@/constants/routes'
import { COOKIE_SESSION_KEY_MARKETPLACE } from '@/constants/api'
import {
  COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE,
  COOKIE_DEVELOPER_TERMS_ACCEPTED,
  COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE,
  COOKIE_CLIENT_TERMS_ACCEPTED,
  COOKIE_FIRST_SUBMIT,
} from '@/utils/cookie'

const CypressEnv = Cypress.env()

async function login(params: LoginParams): LoginSession {
  const loginSession = await setUserSession(params, COOKIE_SESSION_KEY_MARKETPLACE)
  return loginSession
}

const loginFlow = ({ userName, password, loginType, loginRoute, beforeLogin }) => {
  const { cognitoClientId, cognitoUserPoolId } = CypressEnv
  const params = {
    userName,
    password,
    loginType,
    cognitoClientId: cognitoClientId,
    mode: 'WEB',
    userPoolId: cognitoUserPoolId,
  }
  cy.server()
  cy.route({ url: '**cognito**', method: 'POST' }).as('loginRequest')
  cy.visit(loginRoute)
  if (typeof beforeLogin === 'function') {
    beforeLogin()
  }
  cy.wait(1000)
  cy.wrap(login(params)).then(loginSession => {
    cy.wait(1000)
    const { refreshToken, userName, loginType, mode } = loginSession
    const refreshParams = {
      cognitoClientId: cognitoClientId,
      authorizationCode: null,
      redirectUri: null,
      state: null,
      refreshToken: refreshToken,
      userName: userName,
      loginType: loginType,
      mode: mode,
    }
    cy.window()
      .its('store')
      .invoke('dispatch', authSetRefreshSession(refreshParams))

    cy.window()
      .its('store')
      .invoke('dispatch', authLoginSuccess(loginSession))
  })
  cy.wait('@loginRequest')
  cy.wait(3000)
}

export const loginAdminHook = () => {
  const { adminUserName, adminPassword } = CypressEnv
  loginFlow({
    userName: adminUserName,
    password: adminPassword,
    loginType: 'ADMIN',
    loginRoute: ROUTES.ADMIN_LOGIN,
  })
}

export const loginDeveloperHook = () => {
  const { developerUserName, developerPassword } = CypressEnv
  loginFlow({
    userName: developerUserName,
    password: developerPassword,
    loginType: 'DEVELOPER',
    loginRoute: ROUTES.DEVELOPER_LOGIN,
    beforeLogin: () => {
      cy.setCookie(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE, new Date().toString())
      cy.setCookie(COOKIE_DEVELOPER_TERMS_ACCEPTED, new Date().toString())
      cy.setCookie(COOKIE_FIRST_SUBMIT, new Date().toString())
    },
  })
}
export const loginClientHook = () => {
  const { clientUserName, clientPassword } = CypressEnv
  loginFlow({
    userName: clientUserName,
    password: clientPassword,
    loginType: 'CLIENT',
    loginRoute: ROUTES.CLIENT_LOGIN,
    beforeLogin: () => {
      cy.setCookie(COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE, new Date().toString())
      cy.setCookie(COOKIE_CLIENT_TERMS_ACCEPTED, new Date().toString())
    },
  })
}

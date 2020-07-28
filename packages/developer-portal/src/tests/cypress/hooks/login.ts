import { authLoginSuccess, authSetRefreshSession } from '@/actions/auth'
import ROUTES from '@/constants/routes'
import {
  COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE,
  COOKIE_DEVELOPER_TERMS_ACCEPTED,
  COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE,
  COOKIE_CLIENT_TERMS_ACCEPTED,
  COOKIE_FIRST_SUBMIT,
} from '@/utils/cookie'

const CypressEnv = Cypress.env()
const env = CypressEnv.appEnv

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
    cy.wait(5000)
  })
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
    loginRoute: Routes.LOGIN,
    beforeLogin: () => {
      cy.setCookie(`${env}-${COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE}`, new Date().toString())
      cy.setCookie(`${env}-${COOKIE_DEVELOPER_TERMS_ACCEPTED}`, new Date().toString())
      cy.setCookie(`${env}-${COOKIE_FIRST_SUBMIT}`, new Date().toString())
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
      cy.setCookie(`${env}-${COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE}`, new Date().toString())
      cy.setCookie(`${env}-${COOKIE_CLIENT_TERMS_ACCEPTED}`, new Date().toString())
    },
  })
}

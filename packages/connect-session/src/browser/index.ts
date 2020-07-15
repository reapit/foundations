import 'isomorphic-fetch'
import jwt from 'jsonwebtoken'
import {
  ReapitConnectBrowserSessionInitializers,
  ReapitConnectSession,
  LoginIdentity,
  CoginitoIdentity,
  CoginitoAccess,
} from '../types'

export class ReapitConnectBrowserSession {
  static TOKEN_EXPIRY = Math.round(new Date().getTime() / 1000) + 300 // 5 minutes from now

  private connectOAuthUrl: string
  private connectClientId: string
  private userName: string | null
  private session: ReapitConnectSession | null
  private connectLoginRedirectPath: string
  private connectLogoutRedirectPath: string
  private fetching: boolean

  constructor({
    connectClientId,
    connectOAuthUrl,
    connectLoginRedirectPath,
    connectLogoutRedirectPath,
  }: ReapitConnectBrowserSessionInitializers) {
    this.connectOAuthUrl = connectOAuthUrl
    this.connectClientId = connectClientId
    this.connectLoginRedirectPath = connectLoginRedirectPath
    this.connectLogoutRedirectPath = connectLogoutRedirectPath
    this.userName = this.connectStoredLoginUser
    this.fetching = false
    this.session =
      this.connectStoredAccessToken && this.connectStoredRefreshToken && this.connectStoredIdToken
        ? {
            accessToken: this.connectStoredAccessToken,
            refreshToken: this.connectStoredRefreshToken,
            loginIdentity: this.deserializeIdToken(this.connectStoredIdToken),
          }
        : null
    this.connectStartSesssion()
  }

  private connectStartSesssion() {
    return this.connectSession()
  }

  private get connectStoredLoginUser(): string | null {
    return window.localStorage.getItem(`CognitoIdentityServiceProvider.${this.connectClientId}.LastAuthUser`)
  }

  private get connectStoredAccessToken(): string | null {
    return window.localStorage.getItem(
      `CognitoIdentityServiceProvider.${this.connectClientId}.${this.userName}.accessToken`,
    )
  }

  private get connectStoredIdToken(): string | null {
    return window.localStorage.getItem(
      `CognitoIdentityServiceProvider.${this.connectClientId}.${this.userName}.idToken`,
    )
  }

  private get connectStoredRefreshToken(): string | null {
    return window.localStorage.getItem(
      `CognitoIdentityServiceProvider.${this.connectClientId}.${this.userName}.refreshToken`,
    )
  }

  private get tokenRefreshEndpoint() {
    return `${this.connectOAuthUrl}/token?grant_type=refresh_token&client_id=${this.connectClientId}&refresh_token=${this.session?.refreshToken}&redirect_uri=${this.connectLoginRedirectPath}`
  }

  private get tokenCodeEndpoint(): string {
    return `${this.connectOAuthUrl}/token?grant_type=authorization_code&client_id=${this.connectClientId}&code=${this.authCode}&redirect_uri=${this.connectLoginRedirectPath}`
  }

  private get sessionExpired() {
    if (this.session) {
      const decoded = jwt.decode(this.session.accessToken) as CoginitoAccess
      const expiry = decoded['exp']

      return expiry ? expiry < ReapitConnectBrowserSession.TOKEN_EXPIRY : true
    }

    return true
  }

  private get authCode(): string | null {
    const params = new URLSearchParams(window.location.search)
    const authorizationCode = params.get('code')

    return authorizationCode || null
  }

  private deserializeIdToken(idToken: string): LoginIdentity {
    const decoded = jwt.decode(idToken) as CoginitoIdentity

    return {
      name: decoded['name'],
      email: decoded['email'],
      developerId: decoded['custom:reapit:developerId'] || null,
      clientId: decoded['custom:reapit:clientCode'] || null,
      adminId: decoded['custom:reapit:marketAdmin'] || null,
      userCode: decoded['custom:reapit:userCode'] || null,
      groups: decoded['cognito:groups'] || [],
    }
  }

  private async connectGetSession(url: string): Promise<ReapitConnectSession | void> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      } as RequestInit)

      const session = await response.json()

      if (session) {
        const { access_token, refresh_token, id_token } = session
        return {
          accessToken: access_token,
          refreshToken: refresh_token,
          loginIdentity: this.deserializeIdToken(id_token),
        }
      }
    } catch (err) {
      console.error('Reapit Connect Token Error', JSON.stringify(err))
    }
  }

  public connectAuthorizeRedirect(redirectUri: string = this.connectLoginRedirectPath): void {
    window.location.href = `${this.connectOAuthUrl}/authorize?response_type=code&client_id=${this.connectClientId}&redirect_uri=${window.location.origin}${redirectUri}`
  }

  public connectLoginRedirect(redirectUri: string = this.connectLoginRedirectPath): void {
    window.location.href = `${this.connectOAuthUrl}/login?response_type=code&client_id=${this.connectClientId}&redirect_uri=${window.location.origin}${redirectUri}`
  }

  public connectLogoutRedirect(redirectUri: string = this.connectLogoutRedirectPath): void {
    window.location.href = `${this.connectOAuthUrl}/logout?client_id=${this.connectClientId}&logout_uri=${window.location.origin}${redirectUri}`
  }

  public connectSession(): Promise<ReapitConnectSession | void> {
    return new Promise(resolve => {
      if (this.session && !this.sessionExpired) {
        return resolve(this.session)
      }

      if (this.fetching) {
        return resolve()
      }

      if (this.session) {
        this.fetching = true
        return this.connectGetSession(this.tokenRefreshEndpoint).then(session => {
          this.fetching = false
          resolve(session)
        })
      }

      if (this.authCode) {
        this.fetching = true
        return this.connectGetSession(this.tokenCodeEndpoint).then(session => {
          this.fetching = false
          resolve(session)
        })
      }

      return resolve(this.connectAuthorizeRedirect())
    })
  }
}

import { CognitoUser } from 'amazon-cognito-identity-js'
import { ReapitConnectBrowserSessionInitializers } from './types'
import { deserializeAccessToken, tokenExpired, accessTokenExpired } from './utils'
// import { getNewUser, deserializeAccessToken } from './utils'

class ReapitConnectBrowserSession {
  private connectOAuthUrl: string
  private connectClientId: string
  private connectUserPoolId: string
  private userName?: string
  private user?: CognitoUser

  constructor({ connectClientId, connectUserPoolId, connectOAuthUrl }: ReapitConnectBrowserSessionInitializers) {
    this.connectOAuthUrl = connectOAuthUrl
    this.connectClientId = connectClientId
    this.connectUserPoolId = connectUserPoolId
    this.setupUrlListener()
  }

  private setupUrlListener() {
    window.onpopstate = e => {
      console.log(e)
    }
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

  public connectAuthorizeRedirect(redirectUri: string): void {
    window.location.href = `${this.connectOAuthUrl}/authorize?response_type=code&client_id=${this.connectClientId}&redirect_uri=${redirectUri}`
  }

  public connectLoginRedirect(redirectUri: string): void {
    window.location.href = `${this.connectOAuthUrl}/login?response_type=code&client_id=${this.connectClientId}&redirect_uri=${redirectUri}`
  }

  public connectLogoutRedirect(redirectUri: string): void {
    window.location.href = `${this.connectOAuthUrl}/logout?client_id=${this.connectClientId}&logout_uri=${redirectUri}`
  }

  public get connectAccessToken() {
    return new Promise(resolve => {
      if (this.connectStoredAccessToken && !accessTokenExpired(this.connectStoredAccessToken)) {
        resolve(this.connectStoredAccessToken)
      }

      if()
    })
  }

  public get connectUserIdentity() {
    return {}
  }
}

export default ReapitConnectBrowserSession

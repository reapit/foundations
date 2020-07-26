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
  // Static constants
  static TOKEN_EXPIRY = Math.round(new Date().getTime() / 1000) + 300 // 5 minutes from now
  static GLOBAL_KEY = '__REAPIT_MARKETPLACE_GLOBALS__'

  // Private cached variables, I don't want users to reference these directly or it will get confusing.
  // and cause bugs
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
    // Instantiate my private variables from either local storage or from the constructor params
    this.connectOAuthUrl = connectOAuthUrl
    this.connectClientId = connectClientId
    this.connectLoginRedirectPath = `${window.location.origin}${connectLoginRedirectPath || ''}`
    this.connectLogoutRedirectPath = `${window.location.origin}${connectLogoutRedirectPath || '/login'}`
    console.log({ initUserName: this.connectStoredLoginUser })

    this.userName = this.connectStoredLoginUser
    this.fetching = false
    // In an ideal world, UI have a complete session in local storage I can reuse
    this.session =
      this.connectStoredAccessToken && this.connectStoredRefreshToken && this.connectStoredIdToken
        ? {
            accessToken: this.connectStoredAccessToken,
            refreshToken: this.connectStoredRefreshToken,
            idToken: this.connectStoredIdToken,
            loginIdentity: this.deserializeIdToken(this.connectStoredIdToken),
          }
        : null
    // Bind my public methods to the current closure
    this.connectBindPublicMethods()
  }

  // I bind the public methods to the class on instantiation, in the case they are called in a new
  // closure - a good example of this behaviour is when we use the call effect in a saga
  private connectBindPublicMethods() {
    this.connectSession = this.connectSession.bind(this)
    this.connectAuthorizeRedirect = this.connectAuthorizeRedirect.bind(this)
    this.connectLoginRedirect = this.connectLoginRedirect.bind(this)
    this.connectLogoutRedirect = this.connectLogoutRedirect.bind(this)
  }

  // Getters for retrieving session from local storage in the format cognito stores it
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

  // Cognito only stores to local storage if the user has no existing session with any app.
  // if we refresh or authorize via a code, we store the session in the same format as Cognito
  // so we can use the same local storage getters above when we instantiate the session class
  private setLocalStorageSession(): void {
    if (this.session) {
      const { idToken, accessToken, refreshToken, loginIdentity } = this.session
      window.localStorage.setItem(
        `CognitoIdentityServiceProvider.${this.connectClientId}.${this.userName}.accessToken`,
        accessToken,
      )

      window.localStorage.setItem(
        `CognitoIdentityServiceProvider.${this.connectClientId}.${this.userName}.idToken`,
        idToken,
      )

      window.localStorage.setItem(
        `CognitoIdentityServiceProvider.${this.connectClientId}.${this.userName}.refreshToken`,
        refreshToken,
      )

      window.localStorage.setItem(
        `CognitoIdentityServiceProvider.${this.connectClientId}.LastAuthUser`,
        loginIdentity.email,
      )
    }
  }

  // Clears out local storage for users before re-directing to logout
  private clearLocalStorageSession(): void {
    if (this.session) {
      window.localStorage.removeItem(
        `CognitoIdentityServiceProvider.${this.connectClientId}.${this.userName}.accessToken`,
      )

      window.localStorage.removeItem(`CognitoIdentityServiceProvider.${this.connectClientId}.${this.userName}.idToken`)

      window.localStorage.removeItem(
        `CognitoIdentityServiceProvider.${this.connectClientId}.${this.userName}.refreshToken`,
      )

      window.localStorage.removeItem(`CognitoIdentityServiceProvider.${this.connectClientId}.LastAuthUser`)
    }
  }

  // See below, used to refresh session if I have a refresh token in local storage
  private get tokenRefreshEndpoint() {
    return `${this.connectOAuthUrl}/token?grant_type=refresh_token&client_id=${this.connectClientId}&refresh_token=${this.session?.refreshToken}&redirect_uri=${this.connectLoginRedirectPath}`
  }

  // See below, used to refresh session if I have a code in the URL
  private get tokenCodeEndpoint(): string {
    return `${this.connectOAuthUrl}/token?grant_type=authorization_code&client_id=${this.connectClientId}&code=${this.authCode}&redirect_uri=${this.connectLoginRedirectPath}`
  }

  // Check on access token to see if has expired - they last 1hr only before I need to refresh
  private get sessionExpired() {
    if (this.session) {
      const decoded = jwt.decode(this.session.accessToken) as CoginitoAccess
      const expiry = decoded['exp']

      return expiry ? expiry < ReapitConnectBrowserSession.TOKEN_EXPIRY : true
    }

    return true
  }

  // Gets the auth code from the url of the given page
  private get authCode(): string | null {
    const params = new URLSearchParams(window.location.search)
    const authorizationCode = params.get('code')

    return authorizationCode || null
  }

  // Decodes the id token JWT so I can get information about the current logged in user
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

  // Calls the token endpoint in Cognito with either a refresh token or a code, depending on what
  // I have available in local storage or in the URL.
  // See: https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
  private async connectGetSession(url: string): Promise<ReapitConnectSession | void> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      } as RequestInit)
      const session = await response.json()
      if (session.error) {
        throw new Error(session.error)
      }
      if (session) {
        const { access_token, refresh_token, id_token } = session

        return {
          accessToken: access_token,
          // I only get a new refresh token back when grant type is code. I only use grant type code
          // when I don't have a session, so I can update the refresh token for code and when I have a
          // session and am refereshing, I can recycle the old refresh token
          refreshToken: refresh_token ? refresh_token : this.session?.refreshToken,
          idToken: id_token,
          loginIdentity: this.deserializeIdToken(id_token),
        }
      }
    } catch (err) {
      console.error('Reapit Connect Token Error', err.message)
    }
  }

  // A convenience getter to check if my app has been loaded inside RPS / Desktop / Agency Cloud
  public get connectIsDesktop() {
    return Boolean(window[ReapitConnectBrowserSession.GLOBAL_KEY])
  }

  // Handles redirect to authorization endpoint - in most cases, I don't need to call in my app
  // but made public if I want to override the redirect URI I specified in the constructor
  public connectAuthorizeRedirect(redirectUri?: string): void {
    const authRedirectUri = redirectUri || this.connectLoginRedirectPath
    window.location.href = `${this.connectOAuthUrl}/authorize?response_type=code&client_id=${this.connectClientId}&redirect_uri=${authRedirectUri}`
  }

  // Handles redirect to login - defaults to constructor redirect uri but I can override if I like.
  // Used as handler for login page button
  public connectLoginRedirect(redirectUri?: string): void {
    const loginRedirectUri = redirectUri || this.connectLoginRedirectPath
    window.location.href = `${this.connectOAuthUrl}/login?response_type=code&client_id=${this.connectClientId}&redirect_uri=${loginRedirectUri}`
  }

  // Handles redirect to logout - defaults to constructor login uri but I can override if I like.
  // Used as handler for logout menu button
  public connectLogoutRedirect(redirectUri?: string): void {
    const logoutRedirectUri = redirectUri || this.connectLogoutRedirectPath
    this.clearLocalStorageSession()
    window.location.href = `${this.connectOAuthUrl}/logout?client_id=${this.connectClientId}&logout_uri=${logoutRedirectUri}`
  }

  // The main method for fetching a session in an app.
  public async connectSession(): Promise<ReapitConnectSession | void> {
    // Ideally, if I have a valid session, just return it
    if (this.session && !this.sessionExpired) {
      return this.session
    }

    // Stops me from making multiple calls to the token endpoint
    if (this.fetching) {
      return
    }

    try {
      // See comment in connectGetSession method. If I have a refresh token, I want to use this in the
      // first instance - get the refresh endpoint. Otherwise check to see if I have a code and get
      // the code endpoint so I can exchange for a token
      const endpoint =
        this.session && this.session.refreshToken
          ? this.tokenRefreshEndpoint
          : this.authCode
          ? this.tokenCodeEndpoint
          : null

      // I don't have either a refresh token or a code so redirect to the authorization endpoint to get
      // a code I can exchange for a token
      if (!endpoint) {
        return this.connectAuthorizeRedirect()
      }
      // I don't want to make more requests while I am refreshing my session
      this.fetching = true

      // Get a new session from the code or refresh token
      const session = await this.connectGetSession(endpoint)

      this.fetching = false

      if (session) {
        // Cache the session in memory and save to local storage for future use then return it to the user
        this.session = session
        this.setLocalStorageSession()
        return this.session
      }

      // The token endpoint failed to redirect to authorization which will get me a new code or
      // send me to login to get a new session
      this.connectAuthorizeRedirect()
    } catch (err) {
      console.log('Reapit Connect Session error', err.message)
      this.connectAuthorizeRedirect()
    }
  }
}

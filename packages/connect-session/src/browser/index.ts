import 'isomorphic-fetch'
import jwt from 'jsonwebtoken'
import {
  ReapitConnectBrowserSessionInitializers,
  ReapitConnectSession,
  CoginitoAccess,
  LoginIdentity,
  CoginitoSession,
} from '../types'
import { connectSessionVerifyDecodeIdToken } from '../utils/verify-decode-id-token'

export class ReapitConnectBrowserSession {
  // Static constants
  static TOKEN_EXPIRY = Math.round(new Date().getTime() / 1000) + 300 // 5 minutes from now
  static GLOBAL_KEY = '__REAPIT_MARKETPLACE_GLOBALS__'
  static REFRESH_TOKEN_KEY = 'REAPIT_REFRESH_TOKEN'

  // Private cached variables, I don't want users to reference these directly or it will get confusing.
  // and cause bugs
  private connectOAuthUrl: string
  private connectClientId: string
  private connectUserPoolId: string
  private session: ReapitConnectSession | null
  private connectLoginRedirectPath: string
  private connectLogoutRedirectPath: string
  private fetching: boolean

  constructor({
    connectClientId,
    connectOAuthUrl,
    connectUserPoolId,
    connectLoginRedirectPath,
    connectLogoutRedirectPath,
  }: ReapitConnectBrowserSessionInitializers) {
    // Instantiate my private variables from the constructor params
    this.connectOAuthUrl = connectOAuthUrl
    this.connectClientId = connectClientId
    this.connectUserPoolId = connectUserPoolId
    this.connectLoginRedirectPath = `${window.location.origin}${connectLoginRedirectPath || ''}`
    this.connectLogoutRedirectPath = `${window.location.origin}${
      connectLogoutRedirectPath || connectLogoutRedirectPath === '' ? connectLogoutRedirectPath : '/login'
    }`
    this.fetching = false
    this.session = null
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

  private get refreshToken(): string | null {
    return (
      this.session?.refreshToken ??
      window.localStorage.getItem(`${ReapitConnectBrowserSession.REFRESH_TOKEN_KEY}_${this.connectClientId}`)
    )
  }

  private setRefreshToken(session: ReapitConnectSession) {
    if (session.refreshToken) {
      window.localStorage.setItem(
        `${ReapitConnectBrowserSession.REFRESH_TOKEN_KEY}_${this.connectClientId}`,
        session.refreshToken,
      )
    }
  }

  private clearRefreshToken() {
    window.localStorage.removeItem(`${ReapitConnectBrowserSession.REFRESH_TOKEN_KEY}_${this.connectClientId}`)
  }

  // See below, used to refresh session if I have a refresh token in local storage
  private get tokenRefreshEndpoint() {
    return `${this.connectOAuthUrl}/token?grant_type=refresh_token&client_id=${this.connectClientId}&refresh_token=${this.refreshToken}&redirect_uri=${this.connectLoginRedirectPath}`
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
      const session: CoginitoSession | undefined = await response.json()

      if (!session || (session && session.error)) return this.handleError('Error fetching session from Reapit Connect ')

      // I need to verify the identity claims I have just received from the server dwdqd
      const loginIdentity: LoginIdentity | undefined = await connectSessionVerifyDecodeIdToken(
        session.id_token,
        this.connectUserPoolId,
      )

      // If the idToken is invalid, don't return the session
      if (!loginIdentity) return this.handleError('Login identity was not verified')

      const { access_token, refresh_token, id_token } = session

      return {
        accessToken: access_token,
        // I only get a new refresh token back when grant type is code. I only use grant type code
        // when I don't have a session, so I can update the refresh token for code and when I have a
        // session and am refereshing, I can recycle the old refresh token
        refreshToken: refresh_token ? refresh_token : this.session ? this.session?.refreshToken : '',
        idToken: id_token,
        loginIdentity,
      }
    } catch (err) {
      return this.handleError(`Reapit Connect Token Error ${err.message}`)
    }
  }

  private handleError(error: string) {
    console.error('Reapit Connect Error:', error)
    this.connectAuthorizeRedirect()
  }

  // set a redirect URI to my page where I instantiated the flow, by decoding the state object
  public get connectInternalRedirect() {
    const params = new URLSearchParams(window.location.search)
    const internalRedirectString = params.get('state')
    if (internalRedirectString) {
      return decodeURIComponent(internalRedirectString)
    }
    return null
  }

  // A convenience getter to check if my app has been loaded inside RPS / Desktop / Agency Cloud
  public get connectIsDesktop() {
    return Boolean(window[ReapitConnectBrowserSession.GLOBAL_KEY])
  }

  // A convenience getter to check if my app has a valid session
  public get connectHasSession() {
    return Boolean(this.session && !this.sessionExpired)
  }

  // Handles redirect to authorization endpoint - in most cases, I don't need to call in my app
  // but made public if I want to override the redirect URI I specified in the constructor
  public connectAuthorizeRedirect(redirectUri?: string): void {
    const authRedirectUri = redirectUri || this.connectLoginRedirectPath
    const internalRedirectPath = encodeURIComponent(`${window.location.pathname}${window.location.search}`)
    window.location.href = `${this.connectOAuthUrl}/authorize?response_type=code&client_id=${this.connectClientId}&redirect_uri=${authRedirectUri}&state=${internalRedirectPath}`
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
    this.clearRefreshToken()
    window.location.href = `${this.connectOAuthUrl}/logout?client_id=${this.connectClientId}&logout_uri=${logoutRedirectUri}`
  }

  // The main method for fetching a session in an app.
  public async connectSession(): Promise<ReapitConnectSession | void> {
    // Ideally, if I have a valid session, just return it
    if (!this.sessionExpired) {
      return this.session as ReapitConnectSession
    }

    // Stops me from making multiple calls to the token endpoint
    if (this.fetching) {
      return
    }

    // I don't want to make more requests while I am in the OAuth Flow
    this.fetching = true

    try {
      // See comment in connectGetSession method. If I have a refresh token, I want to use this in the
      // first instance - get the refresh endpoint. Otherwise check to see if I have a code and get
      // the code endpoint so I can exchange for a token
      const endpoint = this.refreshToken ? this.tokenRefreshEndpoint : this.authCode ? this.tokenCodeEndpoint : null

      // I don't have either a refresh token or a code so redirect to the authorization endpoint to get
      // a code I can exchange for a token
      if (!endpoint) {
        return this.connectAuthorizeRedirect()
      }

      // Get a new session from the code or refresh token
      const session = await this.connectGetSession(endpoint)

      this.fetching = false

      if (session) {
        // Cache the session in memory for future use then return it to the user
        this.session = session
        this.setRefreshToken(session)
        return this.session
      }

      // The token endpoint failed to get a session so send me to login to get a new session
      throw new Error('Failed to fetch session, redirecting to authorize to re-start OAuth Flow')
    } catch (err) {
      return this.handleError(`Reapit Connect Session error ${err.message}`)
    }
  }
}

import 'isomorphic-fetch'
import { ReapitConnectBrowserSessionInitializers, ReapitConnectSession } from '../types'
import { AuthProviderInterface } from '../auth/provider.interface'
import { CognitoProvider } from '../auth/cognito.provider'

export * from './../auth'
export class ReapitConnectBrowserSession {
  // Static constants
  static GLOBAL_KEY = '__REAPIT_MARKETPLACE_GLOBALS__'
  static REFRESH_TOKEN_KEY = 'REAPIT_REFRESH_TOKEN'
  static USER_NAME_KEY = 'REAPIT_LAST_AUTH_USER'
  static APP_DEFAULT_TIMEOUT = 10800000 // 3hrs in ms
  private connectApplicationTimeout: number
  private idleTimeoutCountdown: number
  private fetching: boolean
  private authProvider: AuthProviderInterface

  constructor({
    connectClientId,
    connectOAuthUrl,
    connectLoginRedirectPath,
    connectLogoutRedirectPath,
    connectApplicationTimeout,
    authProvider,
  }: ReapitConnectBrowserSessionInitializers) {
    // Instantiate my private variables from the constructor params
    this.authProvider =
      authProvider ||
      new CognitoProvider({
        connectClientId,
        connectLoginRedirectPath,
        connectLogoutRedirectPath,
        baseUrl: connectOAuthUrl,
      })
    this.connectApplicationTimeout = connectApplicationTimeout ?? ReapitConnectBrowserSession.APP_DEFAULT_TIMEOUT
    this.fetching = false
    this.idleTimeoutCountdown = this.connectApplicationTimeout
    this.connectBindPublicMethods()
    this.setIdleTimeoutListeners()
  }

  // I bind the public methods to the class on instantiation, in the case they are called in a new
  // closure - a good example of this behaviour is when we use the call effect in a saga
  private connectBindPublicMethods() {
    this.connectSession = this.connectSession.bind(this)
    this.connectAuthorizeRedirect = this.connectAuthorizeRedirect.bind(this)
    this.connectLoginRedirect = this.connectLoginRedirect.bind(this)
    this.connectLogoutRedirect = this.connectLogoutRedirect.bind(this)
    this.connectClearSession = this.connectClearSession.bind(this)
  }

  private setIdleTimeoutListeners() {
    if (this.connectIsDesktop) return

    const resetTimer = () => {
      clearTimeout(this.idleTimeoutCountdown)
      this.idleTimeoutCountdown = window.setTimeout(this.connectLogoutRedirect, this.connectApplicationTimeout)
    }

    document.onmousemove = resetTimer
    document.onkeypress = resetTimer
    document.ontouchstart = resetTimer
  }

  private clearRefreshToken() {
    this.authProvider.clearRefreshToken()
  }

  // TODO clear on catch of ReapitConnectError
  private handleError(error: string | Error) {
    this.clearRefreshToken()
    typeof error === 'string' ? console.error('Reapit Connect Error:', error) : console.error(error)
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
    return this.authProvider.connectIsDesktop
  }

  // A convenience getter to check if my app has a valid session
  public get connectHasSession() {
    return this.authProvider.connectHasSession
  }

  public get session(): ReapitConnectSession | undefined {
    return this.authProvider.session
  }

  // Handles redirect to authorization endpoint - in most cases, I don't need to call in my app
  // but made public if I want to override the redirect URI I specified in the constructor
  public connectAuthorizeRedirect(redirectUri?: string): void {
    this.authProvider.loginRedirect(redirectUri)
  }

  // Handles redirect to login - defaults to constructor redirect uri but I can override if I like.
  // Used as handler for login page button
  public connectLoginRedirect(redirectUri?: string): void {
    this.authProvider.loginRedirect(redirectUri)
  }

  // Handles redirect to logout - defaults to constructor login uri but I can override if I like.
  // Used as handler for logout menu button
  public connectLogoutRedirect(redirectUri?: string): void {
    this.authProvider.logout(redirectUri)
  }

  public connectClearSession(): void {
    this.authProvider.connectClearSession()
  }

  // The main method for fetching a session in an app.
  public async connectSession(): Promise<ReapitConnectSession | void> {
    // Ideally, if I have a valid session, just return it
    if (!this.authProvider.sessionExpired) {
      return this.authProvider.session as ReapitConnectSession
    }

    // Stops me from making multiple calls to the token endpoint
    if (this.fetching) {
      return
    }

    // I don't want to make more requests while I am in the OAuth Flow
    this.fetching = true

    try {
      const session = await this.authProvider.authenticate()

      this.fetching = false

      if (session) {
        // Cache the session in memory for future use then return it to the user
        return session
      }

      // The token endpoint failed to get a session so send me to login to get a new session
      this.connectAuthorizeRedirect()
    } catch (err) {
      this.fetching = false
      return this.handleError(`Reapit Connect Session error ${(err as any).message}`)
    }
  }
}

import { ReapitConnectSession } from '..'
import { AuthProviderConfigurationInterface, AuthProviderInterface } from './provider.interface'
import { LoginIdentity, connectSessionVerifyDecodeIdToken } from '..'
import { ReapitConnectException } from './reapit.connect.exception'
import decode from 'jwt-decode'
import { DecodedToken } from '../utils'

export interface BasicSessionInterface {
  id_token: string
  access_token: string
  refresh_token: string
}

export abstract class AbstractAuthProvider implements AuthProviderInterface {
  public session: ReapitConnectSession | undefined
  private refreshTokenStorage: Storage
  protected readonly connectLogoutRedirectPath: string
  protected readonly connectLoginRedirectPath: string
  static GLOBAL_KEY = '__REAPIT_MARKETPLACE_GLOBALS__'
  static REFRESH_TOKEN_KEY = 'REAPIT_REFRESH_TOKEN'
  static USER_NAME_KEY = 'REAPIT_LAST_AUTH_USER'
  protected readonly jwksURI?: string

  constructor(readonly config: AuthProviderConfigurationInterface) {
    this.refreshTokenStorage = this.connectIsDesktop ? window.localStorage : window.sessionStorage
    this.connectLogoutRedirectPath = `${window.location.origin}${
      config.connectLogoutRedirectPath || config.connectLogoutRedirectPath === ''
        ? config.connectLogoutRedirectPath
        : '/login'
    }`
    this.connectLoginRedirectPath = `${window.location.origin}/${config.connectLoginRedirectPath || ''}`
  }

  get refreshToken(): string | null {
    return (
      this.session?.refreshToken ??
      this.refreshTokenStorage.getItem(
        `${AbstractAuthProvider.REFRESH_TOKEN_KEY}_${this.userName}_${this.config.connectClientId}`,
      )
    )
  }

  private get userName(): string | null {
    return (
      this.session?.loginIdentity.email ??
      this.refreshTokenStorage.getItem(`${AbstractAuthProvider.USER_NAME_KEY}_${this.config.connectClientId}`)
    )
  }

  public get connectIsDesktop(): boolean {
    return Boolean(window[AbstractAuthProvider.GLOBAL_KEY])
  }

  get authCode(): string | null {
    const params = new URLSearchParams(window.location.search)
    const authorizationCode = params.get('code')

    return authorizationCode || null
  }

  get sessionExpired(): boolean {
    if (this.session) {
      const decoded = decode<DecodedToken<BasicSessionInterface>>(this.session.accessToken)
      const expiry = decoded['exp']
      const fiveMinsFromNow = Math.round(new Date().getTime() / 1000) + 300
      return expiry ? expiry < fiveMinsFromNow : true
    }

    return true
  }

  public get connectHasSession(): boolean {
    return Boolean(this.session && !this.sessionExpired)
  }

  /**
   * Clears the singleton session
   */
  public connectClearSession(): void {
    this.session = undefined
  }

  /**
   * Clears the stored refresh token
   */
  // private
  clearRefreshToken() {
    this.refreshTokenStorage.removeItem(
      `${AbstractAuthProvider.REFRESH_TOKEN_KEY}_${this.userName}_${this.config.connectClientId}`,
    )
    this.refreshTokenStorage.removeItem(`${AbstractAuthProvider.USER_NAME_KEY}_${this.config.connectClientId}`)
  }

  /**
   * Returns a string of the refresh token endpoint
   */
  abstract getRefreshEndpoint(): string

  /**
   * Returns the payload body for the refresh call
   */
  abstract getRefreshBody(): FormData | URLSearchParams | undefined

  /**
   * Returns the endpoint for the get token enxpoint
   */
  abstract getTokenEndpoint(): string

  /**
   * Returns the payload body for the get token call
   */
  abstract getTokenBody(): FormData | URLSearchParams | undefined

  /**
   * Gets the logout redirect for the idp
   * 
   * @param logoutRedirectUri 
   */
  abstract getLogoutEndpoint(logoutRedirectUri?: string): string

  /**
   * Gets the login redirect for the idp
   * 
   * @param loginRedirectUri 
   */
  abstract getLoginEndpoint(loginRedirectUri?: string): string

  /**
   * Common request to get session and loginIdentity from the issuer
   *
   * @param body
   * @param endpoint
   * @returns
   */
  private async connect(
    body: URLSearchParams | FormData | undefined,
    endpoint: string,
  ): Promise<[BasicSessionInterface, LoginIdentity]> {
    try {
      const response = await fetch(`${this.config.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      })

      const session = await response.json()
      if (!session || (session && session.error))
        throw new ReapitConnectException('Error fetching session from Reapit Connect ')

      const loginIdentity: LoginIdentity | undefined = await connectSessionVerifyDecodeIdToken(
        session.id_token,
        this.jwksURI,
      )

      if (!loginIdentity) throw new ReapitConnectException('Login identity was not verified')

      return [session, loginIdentity]
    } catch (error: any) {
      throw new ReapitConnectException(error.message)
    }
  }

  private setRefreshToken(session: ReapitConnectSession) {
    this.session = session
    if (session.refreshToken && session.loginIdentity && session.loginIdentity.email) {
      this.refreshTokenStorage.setItem(
        `${AbstractAuthProvider.REFRESH_TOKEN_KEY}_${session.loginIdentity.email}_${this.config.connectClientId}`,
        session.refreshToken,
      )
    }
    if (session.loginIdentity && session.loginIdentity.email) {
      this.refreshTokenStorage.setItem(
        `${AbstractAuthProvider.USER_NAME_KEY}_${this.config.connectClientId}`,
        session.loginIdentity.email,
      )
    }
  }

  /**
   * Get the token using a auth code returned from redirect
   *
   * @returns
   */
  protected async getToken(): Promise<ReapitConnectSession> {
    const [session, loginIdentity] = await this.connect(this.getTokenBody(), this.getTokenEndpoint())

    const { access_token, refresh_token, id_token } = session

    const reapitConnectsession = {
      accessToken: access_token,
      refreshToken: refresh_token,
      idToken: id_token,
      loginIdentity,
    }

    this.setRefreshToken(reapitConnectsession)

    return reapitConnectsession
  }

  /**
   * Uses the refresh token endpoint and refresh body to obtain a new access token
   *
   * @returns ReapitConnectSession
   */
  protected async refresh(): Promise<ReapitConnectSession> {
    const [session, loginIdentity] = await this.connect(this.getRefreshBody(), this.getRefreshEndpoint())

    const { access_token, refresh_token, id_token } = session

    const reapitConnectsession = {
      accessToken: access_token,
      refreshToken: refresh_token,
      idToken: id_token,
      loginIdentity,
    }

    this.setRefreshToken(reapitConnectsession)

    return reapitConnectsession
  }

  /**
   * The method to call to call either the refresh or get token actions
   * Use this method to get your ReapitConnectSession
   * If refresh token present, use refresh
   * Else get token using auth_code
   *
   * @returns ReapitConnectSession
   */
  public async authenticate(redirectUri?: string): Promise<ReapitConnectSession | void> {
    if (this.refreshToken) {
      return this.refresh()
    }

    if (this.authCode) {
      return this.getToken()
    }

    this.loginRedirect(redirectUri)
  }

  loginRedirect(redirectUri?: string): void {
    const authRedirectUri = redirectUri || this.connectLoginRedirectPath
    const params = new URLSearchParams(window.location.search)
    params.delete('code')
    const search = params ? `?${params.toString()}` : ''
    const internalRedirectPath = encodeURIComponent(`${window.location.pathname}${search}`)
    window.location.href = `${this.config.baseUrl}/${this.getLoginEndpoint(authRedirectUri)}`
  }

  logout(redirectUri?: string) {
    const logoutRedirectUri = redirectUri || this.connectLogoutRedirectPath
    this.clearRefreshToken()
    window.location.href = `${this.getLogoutEndpoint(logoutRedirectUri)}`
  }
}

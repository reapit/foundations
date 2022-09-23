import { ReapitConnectSession } from '..'

export interface AuthProviderConfigurationInterface {
  baseUrl: string
  connectClientId: string
  connectLoginRedirectPath?: string
  connectLogoutRedirectPath?: string
}

export interface AuthProviderInterface {
  config: AuthProviderConfigurationInterface
  refreshToken: string | null
  connectIsDesktop: boolean
  authCode: string | null
  sessionExpired: boolean
  connectHasSession: boolean
  session: ReapitConnectSession | undefined
  clearRefreshToken(): void
  connectClearSession(): void
  authenticate(): Promise<ReapitConnectSession | void>
  loginRedirect(redirectUri?: string): void
  logout(redirectUri?: string): void
}

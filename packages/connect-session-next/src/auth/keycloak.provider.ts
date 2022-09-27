import { AbstractAuthProvider } from './abstract.auth'

export class KeycloakProvider extends AbstractAuthProvider {
  protected readonly jwksURI?: string | undefined =
    'https://keycloak.dev.paas.reapit.cloud/realms/master/protocol/openid-connect/certs'

  getTokenBody(): FormData | URLSearchParams | undefined {
    return new URLSearchParams({
      code: this.authCode as string,
      grant_type: 'authorization_code',
      redirect_uri: this.connectLoginRedirectPath,
      client_id: this.config.connectClientId,
      scope: 'openid',
    })
  }

  getTokenEndpoint(): string {
    return 'realms/master/protocol/openid-connect/token'
  }

  getRefreshBody(): FormData | URLSearchParams | undefined {
    return new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: this.config.connectClientId,
      refresh_token: this.refreshToken as string,
      redirect_uri: this.connectLoginRedirectPath,
      scope: 'openid',
    })
  }

  getRefreshEndpoint(): string {
    return 'realms/master/protocol/openid-connect/token'
  }

  getLogoutEndpoint(logoutRedirectUri: string): string {
    // TODO check if this needs to be a post + data for keycloak
    return `realms/master/protocol/openid-connect/logout?client_id=${this.config.connectClientId}&logout_uri=${logoutRedirectUri}`
  }

  getAuthorizeEndpoint(redirectUri?: string | undefined): string {
    return this.getLoginEndpoint(redirectUri)
  }

  getLoginEndpoint(redirectUri?: string | undefined): string {
    const authRedirectUri = redirectUri || this.connectLoginRedirectPath
    const params = new URLSearchParams(window.location.search)
    params.delete('code')
    const search = params ? `?${params.toString()}` : ''
    const internalRedirectPath = encodeURIComponent(`${window.location.pathname}${search}`)
    return `realms/master/protocol/openid-connect/auth?response_type=code&client_id=${this.config.connectClientId}&redirect_uri=${authRedirectUri}&state=${internalRedirectPath}&scope=openid`
  }
}

import { AbstractAuthProvider } from './abstract.auth'

export class CognitoProvider extends AbstractAuthProvider {
  getTokenBody(): FormData | URLSearchParams | undefined {
    return undefined
  }

  getTokenEndpoint(): string {
    return `token?grant_type=authorization_code&client_id=${this.config.connectClientId}&code=${this.authCode}&redirect_uri=${this.connectLoginRedirectPath}`
  }

  getRefreshBody(): FormData | URLSearchParams | undefined {
    return undefined
  }

  getRefreshEndpoint(): string {
    return `token?grant_type=refresh_token&client_id=${this.config.connectClientId}&refresh_token=${this.refreshToken}&redirect_uri=${this.connectLoginRedirectPath}`
  }

  getLogoutEndpoint(logoutRedirectUri: string): string {
    return `logout?client_id=${this.config.connectClientId}&logout_uri=${logoutRedirectUri}`
  }

  getLoginEndpoint(loginRedirectUri: string | undefined): string {
    return `login?client_id=${this.config.connectClientId}&redirect_uri=${loginRedirectUri}&response_type=code&state=${loginRedirectUri}`
  }
}

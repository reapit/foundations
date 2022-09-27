import { CognitoProvider } from './cognito.provider'

export class OryProvider extends CognitoProvider {
  getLoginEndpoint(loginRedirectUri: string | undefined): string {
    return this.getAuthorizeEndpoint(loginRedirectUri)
  }
}

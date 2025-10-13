import { ReapitConnectBrowserSession } from '@reapit/connect-session'
import { v4 as uuid } from 'uuid'

class ReapitConnectBrowserSessionExtended extends ReapitConnectBrowserSession {
  constructor(config) {
    super(config)
  }

  public async changeOrg(chosenOrgId: string, chosenOrgType?: string, redirectUri?: string): Promise<void> {
    const authRedirectUri = redirectUri || this['connectLoginRedirectPath']
    const params = new URLSearchParams(window.location.search)
    params.delete('code')
    const search = params ? `?${params.toString()}` : ''
    const internalRedirectPath = encodeURIComponent(`${window.location.pathname}${search}`)
    const stateNonce = uuid()
    this['refreshTokenStorage'].setItem(stateNonce, internalRedirectPath)
    const code_challenge = await this['encryptCodeVerifier'](this['codeVerifier'](stateNonce))

    const orgChoice = {}
    if (chosenOrgId) {
      orgChoice['chosenOrgId'] = chosenOrgId
    }
    if (chosenOrgType) {
      orgChoice['chosenOrgType'] = chosenOrgType
    }

    let location = `${this['connectOAuthUrl']}/authorize?response_type=code&client_id=${this['connectClientId']}&redirect_uri=${authRedirectUri}&state=${stateNonce}&${new URLSearchParams(orgChoice).toString()}`
    if (this['usePKCE']) location += `&code_challenge_method=S256&code_challenge=${code_challenge}`

    window.location.href = location
  }
}

// Needs to be a singleton as the class is stateful
export const reapitConnectBrowserSession = new ReapitConnectBrowserSessionExtended({
  connectClientId: process.env.connectClientId,
  connectOAuthUrl: process.env.connectOAuthUrl,
  connectLoginRedirectPath: '/apps',
  connectUserPoolId: process.env.connectUserPoolId,
  connectApplicationTimeout: 86400000, // 24hrs in ms
})

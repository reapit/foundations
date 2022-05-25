import axios from 'axios'
import { CoginitoAccess, ReapitConnectServerSessionInitializers } from '../types'
import decode from 'jwt-decode'
import { DecodedToken } from '../utils'

export class ReapitConnectServerSession {
  // Static constants
  static TOKEN_EXPIRY = Math.round(new Date().getTime() / 1000) + 3300 // 55 minutes from now - expiry is 1hr, 5mins
  // to allow for clock drift - unused, not removing as don't want to make any breaking changes

  // Private cached variables, I don't want users to reference these directly or it will get confusing.
  // and cause bugs
  private connectOAuthUrl: string
  private connectClientId: string
  private connectClientSecret: string
  private accessToken: string | null

  constructor({ connectClientId, connectClientSecret, connectOAuthUrl }: ReapitConnectServerSessionInitializers) {
    // Instantiate my private variables from either local storage or from the constructor params
    this.connectOAuthUrl = connectOAuthUrl
    this.connectClientId = connectClientId
    this.connectClientSecret = connectClientSecret
    this.accessToken = null
    this.connectAccessToken = this.connectAccessToken.bind(this)
  }

  // Check on access token to see if has expired - they last 1hr only before I need to refresh
  private get accessTokenExpired() {
    if (this.accessToken) {
      const decoded = decode<DecodedToken<CoginitoAccess>>(this.accessToken)
      const expiry = decoded['exp']
      // 5mins to allow for clock drift
      const fiveMinsFromNow = Math.round(new Date().getTime() / 1000) + 300
      return expiry ? expiry < fiveMinsFromNow : true
    }

    return true
  }

  // See: https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
  private async connectGetAccessToken(): Promise<string | void> {
    try {
      const base64Encoded = Buffer.from(`${this.connectClientId}:${this.connectClientSecret}`).toString('base64')
      const session = await axios.post(
        `${this.connectOAuthUrl}/token?grant_type=client_credentials&client_id=${this.connectClientId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64Encoded}`,
          },
        },
      )

      if (session.data.error) {
        throw new Error(session.data.error)
      }

      if (session.data && session.data.access_token) {
        return session.data.access_token
      }
      throw new Error('No access token returned by Reapit Connect')
    } catch (error) {
      console.error('Reapit Connect Token Error', (error as any).message)
    }
  }

  // The main method for fetching an accessToken in an app.
  public async connectAccessToken(): Promise<string | void> {
    // Ideally, if I have a valid accessToken, just return it
    if (!this.accessTokenExpired) {
      return this.accessToken as string
    }

    try {
      const accessToken = await this.connectGetAccessToken()

      if (accessToken) {
        // Cache the accessToken in memory for future use then return it to the user
        this.accessToken = accessToken
        return accessToken
      }

      throw new Error('No session returned from Reapit Connect')
    } catch (error) {
      console.error('Reapit Connect Session error', (error as any).message)
    }
  }
}

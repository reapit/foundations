import 'isomorphic-fetch'
import jwt from 'jsonwebtoken'
import { CoginitoAccess, ReapitConnectServerSessionInitializers, LoginIdentity } from '../types'
import { connectSessionVerifyDecodeIdToken } from '../utils/verify-decode-id-token'

export class ReapitConnectServerSession {
  // Static constants
  static TOKEN_EXPIRY = Math.round(new Date().getTime() / 1000) + 300 // 5 minutes from now

  // Private cached variables, I don't want users to reference these directly or it will get confusing.
  // and cause bugs
  private connectOAuthUrl: string
  private connectClientId: string
  private connectClientSecret: string
  private connectUserPoolId: string
  private accessToken: string | null

  constructor({
    connectClientId,
    connectClientSecret,
    connectOAuthUrl,
    connectUserPoolId,
  }: ReapitConnectServerSessionInitializers) {
    // Instantiate my private variables from either local storage or from the constructor params
    this.connectOAuthUrl = connectOAuthUrl
    this.connectClientId = connectClientId
    this.connectClientSecret = connectClientSecret
    this.connectUserPoolId = connectUserPoolId
    this.accessToken = null
    this.connectAccessToken = this.connectAccessToken.bind(this)
  }

  // Check on access token to see if has expired - they last 1hr only before I need to refresh
  private get accessTokenExpired() {
    if (this.accessToken) {
      const decoded = jwt.decode(this.accessToken) as CoginitoAccess
      const expiry = decoded['exp']

      return expiry ? expiry < ReapitConnectServerSession.TOKEN_EXPIRY : true
    }

    return true
  }

  // See: https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
  private async connectGetAccessToken(): Promise<string | void> {
    try {
      const base64Encoded = Buffer.from(`${this.connectClientId}:${this.connectClientSecret}`).toString('base64')
      const response = await fetch(
        `${this.connectOAuthUrl}/token?grant_type=client_credentials&client_id=${this.connectClientId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64Encoded}`,
          },
        } as RequestInit,
      )
      const session = await response.json()
      if (session.error) {
        throw new Error(session.error)
      }
      // I need to verify the identity claims I have just received from the server
      const loginIdentity: LoginIdentity | undefined = await connectSessionVerifyDecodeIdToken(
        session.id_token,
        this.connectUserPoolId,
      )

      // If the idToken is invalid, don't return the session
      if (!loginIdentity) throw new Error('Login identity was not verified')

      if (session && session.access_token) {
        return session.access_token
      }
      throw new Error('No access token returned by Reapit Connect')
    } catch (err) {
      console.error('Reapit Connect Token Error', err.message)
    }
  }

  // The main method for fetching an accessToken in an app.
  public async connectAccessToken(): Promise<string | void> {
    // Ideally, if I have a valid accessToken, just return it
    if (this.accessToken && !this.accessTokenExpired) {
      return this.accessToken
    }

    try {
      const accessToken = await this.connectGetAccessToken()

      if (accessToken) {
        // Cache the accessToken in memory for future use then return it to the user
        this.accessToken = accessToken
        return accessToken
      }

      throw new Error('No session returned from Reapit Connect')
    } catch (err) {
      console.error('Reapit Connect Session error', err.message)
    }
  }
}

import { homeDir } from '../../utils'
import {
  CoginitoAccess,
  CoginitoSession,
  connectSessionVerifyDecodeIdToken,
  DecodedToken,
  LoginIdentity,
  ReapitConnectSession,
} from '@reapit/connect-session'
import http from 'http'
import open from 'open'
import { writeFileSync, promises, existsSync } from 'fs'
import 'isomorphic-fetch'
import decode from 'jwt-decode'
import ora from 'ora'

export class LoginService {
  private server
  private readonly connectOAuthUrl: string = 'https://connect.dev.paas.reapit.cloud' // TODO Change dev to env
  private readonly port: number = 8080
  private readonly connectUrl: string = `${this.connectOAuthUrl}/login`
  private readonly redirect = `http://localhost:${this.port}`
  protected connectSession?: ReapitConnectSession

  static storageLocation: string = `${homeDir()}/.reapit-connect.json`

  private oauthUrl = (clientId: string, authCode: string) =>
    `${this.connectOAuthUrl}/token?grant_type=authorization_code&client_id=${clientId}&code=${authCode}&redirect_uri=${this.redirect}`
  
  private refreshUrl = (clientId: string, refreshToken: string) =>
    `${this.connectOAuthUrl}/token?grant_type=refresh_token&client_id=${clientId}&refresh_token=${refreshToken}&redirect_uri=${this.redirect}`


  protected async obtainAuthCode(clientId: string): Promise<string> {
    const spinner = ora('Awaiting Response from Reapit Connect...')

    return new Promise((resolve) => {
      this.server = http.createServer((request, response) => {
        const code = new URLSearchParams(request.url?.split('?').pop()).get('code')

        response.statusCode = 200
        response.end(`
          <html>
            <head><title>Reapit Cli Login</title></head>
            <body>
              <script>window.close();</script>
            </body>
          </html>
        `) // TODO to self close tab, might need a html response with JS to close tab

        this.server.close()
        spinner.stop()

        // TODO reject on typeof code !== string
        resolve(code as string)
      })

      this.server.listen(this.port, 'localhost', () => {
        console.log('Awaiting response from reapit-connect.')
        console.log('Please login to reapit-connect to continue.')
        console.log('')
        spinner.start()
      })

      open(`${this.connectUrl}?response_type=code&client_id=${clientId}&redirect_uri=${this.redirect}`)
    })
  }

  private async createReapitSessionFronCognito(cognitoSession: CoginitoSession): Promise<void> {
    const loginIdentity: LoginIdentity | undefined = await connectSessionVerifyDecodeIdToken(cognitoSession.id_token)

    if (!loginIdentity) throw new Error('Unable to process login identity')
    const { access_token, refresh_token, id_token } = cognitoSession

    this.connectSession = {
      accessToken: access_token,
      refreshToken: refresh_token,
      idToken: id_token,
      loginIdentity,
    }
  }

  /**
   * To initiate the login process of obtaining the session for the the CLI
   * @param clientId the app's clientId
   */
  protected async obtainSessionFromReapitConnect(clientId: string): Promise<void> {
    const authCode = await this.obtainAuthCode(clientId)

    const response = await fetch(this.oauthUrl(clientId, authCode), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    } as RequestInit)
    const session: CoginitoSession | undefined = await response.json()

    if (!session) throw new Error('Malformed session')

    await this.createReapitSessionFronCognito(session)

    await this.storeCurrentSession()
  }

  protected async refreshSession(clientId: string, refreshToken: string): Promise<void> {
    const response = await fetch(this.refreshUrl(clientId, refreshToken), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    } as RequestInit)
    const session: CoginitoSession | undefined = await response.json()

    if (!session) throw new Error('Malformed session')

    await this.createReapitSessionFronCognito(session)

    await this.storeCurrentSession()
  }

  /**
   * To store the current session to be reused
   * @returns void
   */
  protected async storeCurrentSession(): Promise<void> {
    if (!this.connectSession) return
    return writeFileSync(LoginService.storageLocation, JSON.stringify(this.connectSession, null, 2), {
      encoding: 'utf-8',
    })
  }

  private get sessionExpired() {
    if (this.connectSession) {
      const decoded = decode<DecodedToken<CoginitoAccess>>(this.connectSession.accessToken)
      const expiry = decoded['exp']
      const fiveMinsFromNow = Math.round(new Date().getTime() / 1000) + 300
      return expiry ? expiry < fiveMinsFromNow : true
    }

    return true
  }

  /**
   * Get the stored session
   * @returns ReapitConnectSession | undefined
   */
  protected async getStoredSession(): Promise<ReapitConnectSession | undefined> {
  if (!existsSync(LoginService.storageLocation)) return undefined

    const session = await promises.readFile(LoginService.storageLocation, 'utf-8')

    if (!session) return undefined

    this.connectSession = JSON.parse(session)

    return this.connectSession
  }

  /**
   * Obtain a ReapitConnectSession by logging in via the browser or using a refresh token with a stored session
   * @param clientId string - clientId of a reapit app
   * 
   * @returns ReapitConnectSession
   */
  public async getSession(clientId: string): Promise<ReapitConnectSession | never> {
    const storedSession = await this.getStoredSession()

    if (!storedSession) await this.obtainSessionFromReapitConnect(clientId)

    if (this.sessionExpired && this.connectSession) {
      await this.refreshSession(clientId, this.connectSession.refreshToken)
    }

    return this.connectSession as ReapitConnectSession
  }
}

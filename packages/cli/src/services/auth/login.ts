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
import { inject, injectable } from 'tsyringe'
import fp from 'find-free-port'

/**
 * LoginService
 * Used for obtaining a reapit connect session using a browser and redirect setup
 */
@injectable()
export class LoginService {
  private server
  private readonly connectOAuthUrl: string
  private readonly clientId: string
  private readonly portRange: number[] = [49147, 49151]
  protected currentPort?: number
  private readonly connectUrl: string
  protected connectSession?: ReapitConnectSession

  static storageLocation: string = `${homeDir()}/.reapit-connect.json`

  constructor(
    @inject('devMode')
    readonly devMode: boolean = true,
  ) {
    this.clientId = devMode ? '2c8jt1gp2hb0tcc8s88m8lig3d' : '' // TODO add prod clientId
    this.connectOAuthUrl = `https://connect.${devMode ? 'dev' : 'prod'}.paas.reapit.cloud`
    this.connectUrl = `${this.connectOAuthUrl}/login`
  }

  private get redirect() {
    return `http://localhost:${this.currentPort}`
  }

  private oauthUrl = (authCode: string) =>
    `${this.connectOAuthUrl}/token?grant_type=authorization_code&client_id=${this.clientId}&code=${authCode}&redirect_uri=${this.redirect}`

  private refreshUrl = (refreshToken: string) =>
    `${this.connectOAuthUrl}/token?grant_type=refresh_token&client_id=${this.clientId}&refresh_token=${refreshToken}&redirect_uri=${this.redirect}`

  protected async obtainAuthCode(): Promise<string | never> {
    const spinner = ora('Awaiting Response from Reapit Connect...')
    const availablePorts = await fp(this.portRange[0], this.portRange[1])
    this.currentPort = availablePorts[0]

    if (!this.currentPort) {
      throw new Error(
        `Cannot find open port, Configurable ports are [${this.portRange.join(
          ':',
        )}] please make sure one of these ports are available`,
      )
    }

    return new Promise((resolve, reject) => {
      this.server = http.createServer((request, response) => {
        const code = new URLSearchParams(request.url?.split('?').pop()).get('code')

        response.statusCode = 200
        response.end(`
          <html>
            <head><title>Reapit Cli Login</title></head>
            <body>
              You can close this tab now.
              <script>window.close();</script>
            </body>
          </html>
        `) // TODO to self close tab, might need a html response with JS to close tab

        this.server.close()
        spinner.stop()

        code ? resolve(code) : reject()
      })

      this.server.listen(this.currentPort, 'localhost', () => {
        console.log('Awaiting response from reapit-connect.')
        console.log('Please login to reapit-connect to continue.')
        console.log('')
        spinner.start()
      })

      open(`${this.connectUrl}?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirect}`)
    })
  }

  /**
   * create a reapitConnectSession and set stored session from cognito session
   *
   * @param cognitoSession
   */
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
   */
  protected async obtainSessionFromReapitConnect(): Promise<void> {
    const authCode = await this.obtainAuthCode()

    const response = await fetch(this.oauthUrl(authCode), {
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
   * Get a session using a refresh token
   * @param refreshToken
   */
  protected async refreshSession(refreshToken: string): Promise<void> {
    const response = await fetch(this.refreshUrl(refreshToken), {
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

  /**
   * Is the current session expired
   */
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
   *
   * @returns ReapitConnectSession
   */
  public async getSession(): Promise<ReapitConnectSession | never> {
    if (!this.devMode) {
      console.error('Reapit Connect Auth Login is not available for prod yet. Please use --dev for dev mode')
      process.exit(2)
    }

    const storedSession = await this.getStoredSession()

    if (!storedSession) await this.obtainSessionFromReapitConnect()

    if (this.sessionExpired && this.connectSession) {
      await this.refreshSession(this.connectSession.refreshToken)
    }

    return this.connectSession as ReapitConnectSession
  }
}

import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import githubAuth from '../config/github-auth'
import { App } from '@octokit/app'

type GithubToken = {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  scope: string
  token_type: string
}

@Injectable()
export class GithubAuthProvider {
  constructor(
    @Inject(githubAuth.KEY) private readonly config: ConfigType<typeof githubAuth>,
    private readonly httpProvider: HttpService,
  ) {}

  async obtainAccessToken({
    code,
    redirect_uri,
    refresh_token,
  }: {
    code?: string
    redirect_uri: string
    refresh_token?: string
  }): Promise<GithubToken> {
    const oauthParams: {
      client_id: string
      client_secret: string
      redirect_uri: string
      code?: string
      refresh_token?: string
      grant_type?: 'refresh_token'
    } = {
      client_id: this.config.client_id,
      client_secret: this.config.client_secert,
      redirect_uri,
    }

    if (code) oauthParams.code = code
    if (refresh_token) {
      oauthParams.refresh_token = refresh_token
      oauthParams.grant_type = 'refresh_token'
    }

    const params = new URLSearchParams(oauthParams)
    const result = await firstValueFrom(
      this.httpProvider.post<GithubToken>(
        `${this.config.github_url}/login/oauth/access_token?${params.toString()}`,
        undefined,
        {
          headers: {
            accept: 'application/json',
          },
        },
      ),
    )

    return result.data
  }
}

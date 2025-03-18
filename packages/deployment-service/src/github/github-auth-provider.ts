import { HttpService } from "@nestjs/axios"
import { Inject, Injectable } from "@nestjs/common"
import { ConfigType } from "@nestjs/config"
import { firstValueFrom } from "rxjs"
import githubAuth from "../config/github-auth"
import { App } from "@octokit/app"

type GithubToken = {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  refresh_token_expires_in: number,
  scope: string,
  token_type: string,
}

@Injectable()
export class GithubAuthProvider {
  constructor(
    @Inject(githubAuth.KEY) private readonly config: ConfigType<typeof githubAuth>,
    private readonly httpProvider: HttpService,
    private readonly githubProvider: App,

  ) {}

  async obtainAccessToken(code: string, redirect_uri: string): Promise<GithubToken> {
    const params = new URLSearchParams({
      client_id: this.config.client_id,
      client_secret: this. config.client_secert,
      code,
      redirect_uri,
    })
    console.log('sending', params.toString())
    const result = await firstValueFrom(this.httpProvider.post<GithubToken>(`${this.config.github_url}/login/oauth/access_token?${params.toString()}`, undefined, {
      headers: {
        'accept': 'application/json',
      },
    }))

    return result.data
  }
}

import { Body, Controller, Post } from '@nestjs/common'
import { GithubAuthProvider } from './github-auth-provider'
import { IsNotEmpty } from 'class-validator'

class GithubOAuthTokenRequestCodeModel {
  code: string

  @IsNotEmpty()
  redirect_uri: string
}

class GithubOAuthRefreshTokenRequestModel {
  refresh_token: string

  @IsNotEmpty()
  redirect_uri: string
}

@Controller('/github')
export class GithubAuthController {
  constructor(private readonly githubAuthProvider: GithubAuthProvider) {}

  @Post('auth')
  async auth(@Body() body: GithubOAuthRefreshTokenRequestModel | GithubOAuthTokenRequestCodeModel) {
    return this.githubAuthProvider.obtainAccessToken(body)
  }
}

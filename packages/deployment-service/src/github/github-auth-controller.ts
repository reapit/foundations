import { Body, Controller, Get, Headers, Param, Post, Query } from "@nestjs/common"
import { GithubAuthProvider } from "./github-auth-provider"

class GithubAuthModel {
  code: string

  redirect_uri: string
}

@Controller('/github')
export class GithubAuthController {
  constructor(
    private readonly githubAuthProvider: GithubAuthProvider,
  ) {}

  @Post('auth')
  async auth(@Body() { code, redirect_uri }: GithubAuthModel) {
    return this.githubAuthProvider.obtainAccessToken(code, redirect_uri)
  }
}

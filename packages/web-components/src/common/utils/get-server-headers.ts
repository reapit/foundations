import { DEFAULT_HEADERS, PACKAGE_SUFFIXES, DEFAULT_HEADERS_SERVER } from './constants'
import { Request } from 'express'
import { fetcher } from './fetcher-server'

type Token = {
  access_token: string
}

export const getServerHeaders = async (req: Request, packageSuffix: PACKAGE_SUFFIXES) => {
  // For local development, I need to get a token from my client secret, in prod, this is added as a
  // header by my lambda authorizer so not required
  const authHeaders = await (async () => {
    if (process.env.APP_ENV === 'local') {
      const clientId = process.env[`COGNITO_CLIENT_ID_${packageSuffix}`] as string
      const clientSecret = process.env[`COGNITO_CLIENT_SECRET_${packageSuffix}`] as string
      const base64Encoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

      const token = await fetcher<Token, null>({
        url: `${process.env.COGNITO_OAUTH_URL}/token?client_id=${clientId}&grant_type=client_credentials`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${base64Encoded}`,
        },
      })

      if (token && token.access_token) {
        return {
          ...DEFAULT_HEADERS,
          ...DEFAULT_HEADERS_SERVER,
          Authorization: `Bearer ${token.access_token}`,
        }
      }
    }
    // In prod, I just forward the headers from the request that was decorated by the lambda athorizer
    return req.headers
  })()

  return {
    ...authHeaders,
  }
}

import { BitbucketClientEntity } from '@/entities/bitbucket-client.entity'
import { findByClientKey, findPipelineByRepo, saveClientInfo } from '@/services'
import { httpHandler, HttpStatusCode, NotFoundException, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import * as jwt from 'atlassian-jwt'
import { APIGatewayEvent } from 'aws-lambda'

const createSession = ({
  clientKey,
  verifiedClaim,
  sharedSecret,
  key,
}: {
  clientKey: string
  verifiedClaim: any
  sharedSecret: string
  key: string
}): string => {
  const now = new Date()
  const exp = new Date()
  exp.setMinutes(exp.getMinutes() + 10)

  const baseJwt = {
    iss: key,
    iat: now.getTime(),
    sub: verifiedClaim.sub,
    exp,
    aud: [clientKey],
  }

  return jwt.encodeSymmetric(baseJwt, sharedSecret)
}

const authenticate = async ({
  request,
}: {
  request: APIGatewayEvent,
}): Promise<BitbucketClientEntity | never> => {
  const headerToken = request.headers['Authorization']

  if (!headerToken) {
    throw new UnauthorizedException('No header token')
  }

  const token = headerToken.substring(4)

  if (!token) {
    throw new UnauthorizedException()
  }

  const unverifiedClaims = jwt.decodeSymmetric(token, '', jwt.SymmetricAlgorithm.HS256, true)

  if (!unverifiedClaims.iss) {
    throw new UnauthorizedException('No issuer')
  }

  const clientKey =
    Array.isArray(unverifiedClaims.aud) && unverifiedClaims.aud.length >= 1
      ? unverifiedClaims.aud[0]
      : unverifiedClaims.iss

  const existingClient = await findByClientKey(clientKey)

  if (!existingClient) {
    throw new UnauthorizedException('No existing clientKey')
  }

  const verifiedClaims = jwt.decodeSymmetric(token, existingClient.data.sharedSecret, jwt.SymmetricAlgorithm.HS256, false)

  const expiry = verifiedClaims.exp

  if (expiry && new Date().getTime() <= expiry) {
    throw new UnauthorizedException('expired token')
  }

  return existingClient

  // const jwtRequest = {
  //   method: request.httpMethod,
  //   pathname: request.path,
  //   query: request.queryStringParameters as { [s: string]: string },
  //   body: request.body || {},
  // }
  // let signatureHashVerified: boolean

  // console.log('verified', verifiedClaims, jwtRequest, existingClient.data)

  // if (verifiedClaims.qsh) {
  //   const expectedHash = jwt.createQueryStringHash(jwtRequest, false, existingClient.data.baseUrl)

  //   console.log('expected', expectedHash)

  //   signatureHashVerified = verifiedClaims.qsh === expectedHash

  //   console.log('signed', signatureHashVerified)

  //   if (!signatureHashVerified) {
  //     const expectedAgain = jwt.createQueryStringHash(jwtRequest, true, existingClient.data.baseUrl)
  //     signatureHashVerified = verifiedClaims.qsh === expectedAgain

  //     console.log('expected again', expectedAgain)

  //     if (!signatureHashVerified) {
  //       throw new UnauthorizedException()
  //     }
  //   }
  // }

  // TODO success method

  // const success = (verifiedClaim: any) => {
  //   const token = createSession({
  //     clientKey,
  //     verifiedClaim,
  //     sharedSecret,
  //     key,
  //   })

  //   const verified: { [s: string]: any } = {
  //     clientKey: clientKey,
  //     hostBaseUrl: baseUrl,
  //     token,
  //   }

  //   if (verifiedClaims.context) {
  //     verified.context

  //     const user = verifiedClaims.context.user
  //     if (user) {
  //       if (user.accountId) verified.userAccountId = user.accountId
  //       if (user.userKey) verified.userKey = user.userKey
  //     }
  //   }

  //   if (!verified.userAccountId) {
  //     verified.userAccountId = verifiedClaims.sub
  //   }
  // }

  // success(verifiedClaims)
}

const handleEventTypes = async (event: { eventType: string, clientKey: string }) => {
  switch (event.eventType) {
    case 'installed':
      await saveClientInfo(event.clientKey, event)
      console.log('save the details to db against repo. Not quiet sure though as no repo details provided')
      break
    case 'uninstalled':
      console.log('disable pipeline')
      break
  }
}

const handlePushEvent = async (event: {
  event: string
  data: {
    push: {
      changes: {
        commits: {
          hash: string
          author: {
            user: {
              display_name: string
            }
          }
          message: string
        }[]
        new: {
          name: string
        }
      }[]
    }
    repository: {
      full_name: string
    }
  }
}, client: BitbucketClientEntity) => {
  console.log('data', event.data.push.changes, event.data.push.changes[0].commits[0])
  const pipeline = await findPipelineByRepo(`https://bitbucket.org/${event.data.repository.full_name}`)

  console.log('pipeline', pipeline)

  if (!pipeline) {
    throw new NotFoundException('no pipeline for installed repo')
  }

  // TODO start runner
}

export const bitbucketWebhook = httpHandler<any, void>({
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  handler: async ({ body, event }) => {
    console.log('path', event.path)
    console.log('event', body)
    console.log('headers', event.headers)

    if (body.eventType) {
      await handleEventTypes(body)
    } else if (body.event) {

      const client = await authenticate({
        request: event,
      })

      await handlePushEvent(body, client)
    } else if (event.path === 'healthcheck') {
      return {
        statusCode: HttpStatusCode.OK,
      }
    }
  },
})

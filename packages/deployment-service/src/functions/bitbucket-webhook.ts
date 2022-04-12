import { QueueNames } from '../constants'
import { BitbucketClientData, BitbucketClientEntity } from '../entities/bitbucket-client.entity'
import {
  createPipelineRunnerEntity,
  findByClientKey,
  findPipelineByRepo,
  pipelineRunnerCountRunning,
  saveClientInfo,
  sqs,
} from '../services'
import {
  HttpErrorException,
  httpHandler,
  HttpStatusCode,
  NotFoundException,
  UnauthorizedException,
} from '@homeservenow/serverless-aws-handler'
import { PipelineRunnerType } from '@reapit/foundations-ts-definitions/deployment-schema'
import * as jwt from 'atlassian-jwt'
import { APIGatewayEvent } from 'aws-lambda'

const authenticate = async ({ request }: { request: APIGatewayEvent }): Promise<BitbucketClientEntity | never> => {
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

  const verifiedClaims = jwt.decodeSymmetric(
    token,
    process.env.BITBUCKET_SHARED_SECRET as string,
    jwt.SymmetricAlgorithm.HS256,
    false,
  )

  const expiry = verifiedClaims.exp

  if (expiry && new Date().getTime() <= expiry) {
    throw new UnauthorizedException('expired token')
  }

  return existingClient
}

const handleEventTypes = async (event: { eventType: string; clientKey: string }) => {
  switch (event.eventType) {
    case 'installed':
      await saveClientInfo(event.clientKey, event)
      break
    case 'uninstalled':
      // TODO disable pipeline
      console.log('disable pipeline')
      break
  }
}

export type BitBucketEvent = {
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
          name: string //branch name
        }
      }[]
    }
    repository: {
      full_name: string
      is_private: boolean
    }
  }
}

const handlePushEvent = async (event: BitBucketEvent, client: BitbucketClientData) => {
  const pipeline = await findPipelineByRepo(`https://bitbucket.org/${event.data.repository.full_name}`)

  if (!pipeline) {
    throw new NotFoundException('no pipeline for installed repo')
  }

  const branchName = event.data.push.changes[0].new.name

  if (branchName !== pipeline.branch) {
    return {
      statusCode: HttpStatusCode.OK,
    }
  }

  if (pipeline.isPipelineDeploymentDisabled || (await pipelineRunnerCountRunning(pipeline)) >= 1) {
    throw new HttpErrorException('Cannot create deployment in current state', 409 as HttpStatusCode)
  }

  const pipelineRunner = await createPipelineRunnerEntity({
    type: PipelineRunnerType.REPO,
    pipeline,
  })

  await new Promise<void>((resolve, reject) =>
    sqs.sendMessage(
      {
        MessageBody: JSON.stringify({
          pipelineRunner,
          client,
          event,
        }),
        QueueUrl: QueueNames.CODEBUILD_EXECUTOR,
      },
      (error) => {
        if (error) {
          reject(error)
        }
        resolve()
      },
    ),
  )
}

export const bitbucketWebhook = httpHandler<any, void>({
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  handler: async ({ body, event }) => {
    if (body.eventType) {
      await handleEventTypes(body)
    } else if (body.event) {
      const client = await authenticate({
        request: event,
      })

      await handlePushEvent(body, client.data)
    } else if (event.path === 'healthcheck') {
      return {
        statusCode: HttpStatusCode.OK,
      }
    }
  },
})

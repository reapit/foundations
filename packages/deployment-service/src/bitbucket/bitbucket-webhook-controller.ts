import { BitbucketClientData, BitbucketClientEntity } from '../entities/bitbucket-client.entity'
import { EventDispatcher, PusherProvider } from '../events'
import { PipelineProvider } from '../pipeline'
import { PipelineRunnerProvider } from '../pipeline-runner'
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { PipelineRunnerType } from '@reapit/foundations-ts-definitions/deployment-schema'
import * as jwt from 'atlassian-jwt'
import { Request } from 'express'
import { BitbucketProvider } from './bitbucket-provider'
import { BitBucketEvent } from './bitbucket-event'

@Controller('bitbucket')
export class BitBucketWebhookController {
  constructor(
    private readonly bitbucketProvider: BitbucketProvider,
    private readonly eventDispatcher: EventDispatcher,
    private readonly pipelineProvider: PipelineProvider,
    private readonly pipelineRunnerProvider: PipelineRunnerProvider,
    private readonly pusherProvider: PusherProvider,
  ) {}

  @Get()
  bitbucketConfig() {
    const STAGE = process.env.ROOT_DOMAIN?.includes('prod.paas') ? '' : '-dev'
    return {
      key: `reapit${STAGE}`,
      name: `Reapit App ${STAGE}`,
      description: "Reapit's BitBucket app for running pipelines",
      vendor: {
        name: 'Reapit Foundations',
        url: 'https://www.reapit.com/foundations/',
      },
      baseUrl: `https://deployments.${process.env.ROOT_DOMAIN}/api/bitbucket`,
      authentication: {
        type: 'jwt',
      },
      lifecycle: {
        installed: '/installed',
        uninstalled: '/uninstalled',
      },
      modules: {
        webhooks: [
          {
            event: '*',
            url: '/',
          },
        ],
      },
      scopes: ['account', 'repository'],
      contexts: ['account'],
    }
  }

  @Post('*')
  async handle(@Body() body, @Req() request: Request) {
    if (body.eventType) {
      await this.handleEventTypes(body)
    } else if (body.event) {
      const client = await this.authenticate(request)

      await this.handlePushEvent(body, client.data)
    } else if (request.path.split('/').includes('healthcheck')) {
      return
    }
  }

  protected async installClient(clientKey: string, data: any): Promise<void> {
    const pipelines = await this.bitbucketProvider.installClient(clientKey, data)

    await this.pusherProvider.triggerArray(
      pipelines.map((pipeline) => ({
        channel: `private-${pipeline.developerId}`,
        name: 'pipeline-update',
        data: pipeline,
      })),
    )
  }

  protected async handlePushEvent(event: BitBucketEvent, client: BitbucketClientData) {
    const pipeline = await this.pipelineProvider.findByRepo(`https://bitbucket.org/${event.data.repository.full_name}`)

    if (!pipeline) {
      throw new NotFoundException('no pipeline for installed repo')
    }

    const branchName = event.data.push.changes[0].new.name

    if (branchName !== pipeline.branch) {
      return
    }

    if (
      pipeline.isPipelineDeploymentDisabled ||
      (await this.pipelineRunnerProvider.pipelineRunnerCountRunning(pipeline)) >= 1
    ) {
      throw new UnprocessableEntityException('Cannot create deployment in current state')
    }

    const pipelineRunner = await this.pipelineRunnerProvider.create({
      type: PipelineRunnerType.REPO,
      pipeline,
    })
    await Promise.all([
      this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-runner-update', pipelineRunner),
    ])

    await this.eventDispatcher.triggerCodebuildExecutor({
      pipeline: pipelineRunner.pipeline,
      pipelineRunner,
      client,
      event,
    })
  }

  protected async handleEventTypes(event: { eventType: string; clientKey: string }) {
    switch (event.eventType) {
      case 'installed':
        await this.installClient(event.clientKey, event)
        break
      case 'uninstalled':
        // TODO disable pipeline
        console.log('disable pipeline')
        break
    }
  }

  protected async authenticate(request: Request): Promise<BitbucketClientEntity | never> {
    const headerToken = request.headers.authorization

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

    const existingClient = await this.bitbucketProvider.findByClientKey(clientKey)

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
}

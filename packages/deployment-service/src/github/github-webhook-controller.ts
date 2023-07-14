import { PipelineProvider } from '../pipeline'
import { PipelineRunnerProvider } from '../pipeline-runner'
import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { App } from '@octokit/app'
import { PipelineRunnerType } from '@reapit/foundations-ts-definitions/deployment-schema'
import { EventDispatcher, PusherProvider } from '../events'
import { Request } from 'express'
import { PipelineEntity } from '../entities/pipeline.entity'

type GithubCommitEvent = {
  ref: string
  commits: any[]
  repository: { html_url: string; id: number }
  installation: { id: number }
}
type GithubRepoInstallation = {
  installation: { id: number }
  repositories_added: { full_name: string; id: number }[]
  repositories: { full_name: string; id: number }[]
}

@Controller('github')
export class GithubWebhookController {
  constructor(
    private readonly githubProvider: App,
    private readonly pipelineProvider: PipelineProvider,
    private readonly pipelineRunnerProvider: PipelineRunnerProvider,
    private readonly eventDispatcher: EventDispatcher,
    private readonly pusherProvider: PusherProvider,
  ) {}

  isCommitEvent = (value: any): value is GithubCommitEvent => value.ref && value.commits
  isRepoInstallEvent = (value: any): value is GithubRepoInstallation =>
    value.action &&
    (value.action === 'added' || value.action === 'created') &&
    (value.repositories_added || value.repositories) &&
    value.installation

  async deployPipeline(pipeline: PipelineEntity, body: { ref: string }): Promise<any> {
    if (!body.ref.includes(pipeline.branch as string)) {
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
    return Promise.all([
      this.eventDispatcher.triggerCodebuildExecutor(pipelineRunner),
      this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-runner-update', pipelineRunner),
    ])
  }

  @Post()
  async handler(@Req() request: Request, @Body() body) {
    const signature = request.headers['x-hub-signature-256'] as string

    if (!signature) {
      throw new UnauthorizedException('No signature')
    }

    const verified = await this.githubProvider.webhooks.verify(JSON.stringify(body), signature)

    if (!verified) {
      throw new UnauthorizedException('Invalid signature')
    }

    if (this.isCommitEvent(body)) {
      const repositoryId = body.repository.id

      const pipelines = await this.pipelineProvider.findPipelinesByRepositoryId(repositoryId)

      if (pipelines.length === 0) {
        throw new NotFoundException()
      }

      await Promise.all(pipelines.map((pipeline) => this.deployPipeline(pipeline, body)))

      return
    } else if (this.isRepoInstallEvent(body)) {
      const repositories = body.repositories_added || body.repositories
      await Promise.all(
        repositories.map(async (repository) => {
          const repo = `https://github.com/${repository.full_name}`

          const results = await this.pipelineProvider.updatePipelinesWithRepo(repo, {
            installationId: body.installation.id,
            repositoryId: repository.id,
          })

          if (results && results.affected && results.affected >= 1) {
            const pipelines = await this.pipelineProvider.findPipelinesByRepositoryId(repository.id)
            await this.pusherProvider.triggerArray(
              pipelines.map((pipeline) => ({
                channel: `private-${pipeline.developerId}`,
                name: 'pipeline-update',
                data: pipeline,
              })),
            )
            return
          }

          throw new NotFoundException()
        }),
      )
    }
  }
}

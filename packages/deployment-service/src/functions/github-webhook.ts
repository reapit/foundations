import {
  HttpErrorException,
  httpHandler,
  HttpStatusCode,
  NotFoundException,
  UnauthorizedException,
} from '@homeservenow/serverless-aws-handler'
import { defaultOutputHeaders, QueueNames } from '../constants'
import * as service from '../services'
import { PipelineRunnerType } from '@reapit/foundations-ts-definitions'
import { githubApp, updatePipelinesWithRepo } from '../services'

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

const isCommitEvent = (value: any): value is GithubCommitEvent => value.ref && value.commits
const isRepoInstallEvent = (value: any): value is GithubRepoInstallation =>
  value.action &&
  (value.action === 'added' || value.action === 'created') &&
  (value.repositories_added || value.repositories) &&
  value.installation

export const githubWebhook = httpHandler<GithubCommitEvent | GithubRepoInstallation, void>({
  defaultOutputHeaders,
  handler: async ({ body, event }) => {
    const { headers } = event

    const signature = headers['X-Hub-Signature-256']

    if (!signature) {
      throw new UnauthorizedException('No signature')
    }

    const verified = await (await githubApp()).webhooks.verify(body, signature)

    if (!verified) {
      throw new UnauthorizedException('Invalid signature')
    }

    if (isCommitEvent(body)) {
      const repositoryId = body.repository.id

      const pipeline = await service.findPipelineByRepositoryId(repositoryId)

      if (!pipeline) {
        throw new NotFoundException()
      }

      if (body.ref.includes(pipeline.branch as string)) {
        return {
          statusCode: HttpStatusCode.OK,
        }
      }

      if (pipeline.isPipelineDeploymentDisabled || (await service.pipelineRunnerCountRunning(pipeline)) >= 1) {
        throw new HttpErrorException('Cannot create deployment in current state', 409 as HttpStatusCode)
      }

      const pipelineRunner = await service.createPipelineRunnerEntity({
        type: PipelineRunnerType.REPO,
        pipeline,
      })

      await new Promise<void>((resolve, reject) =>
        service.sqs.sendMessage(
          {
            MessageBody: JSON.stringify({ pipelineRunner }),
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
    } else if (isRepoInstallEvent(body)) {
      const repositories = body.repositories_added || body.repositories
      await Promise.all(
        repositories.map(async (repository) => {
          const repo = `https://github.com/${repository.full_name}`

          const results = await updatePipelinesWithRepo(repo, {
            installationId: body.installation.id,
            repositoryId: repository.id,
          })

          if (results && results.affected && results.affected >= 1) {
            return
          }

          throw new NotFoundException()
        }),
      )
    }
  },
})

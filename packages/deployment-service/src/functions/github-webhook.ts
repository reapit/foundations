import {
  HttpErrorException,
  httpHandler,
  HttpStatusCode,
  NotFoundException,
} from '@homeservenow/serverless-aws-handler'
import { defaultOutputHeaders, QueueNames } from '../constants'
import * as service from '../services'
import { PipelineRunnerType } from '@reapit/foundations-ts-definitions'

type GithubCommitEvent = { ref: string; commits: any[]; repository: { html_url: string }; installation: { id: number } }
type GithubRepoInstallation = { installation: { id: number }; repositories_added: { full_name: string }[] }

const isCommitEvent = (value: any): value is GithubCommitEvent => value.ref && value.commits
const isRepoInstallEvent = (value: any): value is GithubRepoInstallation =>
  value.action && value.action === 'added' && value.repositories_added && value.installation

export const githubWebhook = httpHandler<GithubCommitEvent | GithubRepoInstallation, void>({
  defaultOutputHeaders,
  handler: async ({ body }) => {

    // TODO auth with github

    
    if (isCommitEvent(body)) {
      const installationId = body.installation.id

      const pipeline = await service.findPipelineByInstallationId(installationId)

      if (!pipeline) {
        throw new NotFoundException()
      }

      if (
        (pipeline.buildStatus && 'CREATING_ARCHITECTURE' === pipeline.buildStatus) ||
        (await service.pipelineRunnerCountRunning(pipeline)) >= 1
      ) {
        throw new HttpErrorException('Cannot create deployment in current state', 409 as HttpStatusCode)
      }

      const pipelineRunner = await service.createPipelineRunnerEntity({
        type: PipelineRunnerType.REPO,
        pipeline,
      })

      await new Promise<void>((resolve, reject) =>
        service.sqs.sendMessage(
          {
            MessageBody: JSON.stringify(pipelineRunner),
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
      await Promise.all(
        body.repositories_added.map(async (repository) => {
          const repo = `https://github.com/${repository.full_name}`

          const pipeline = await service.findPipelineByRepo(repo)

          if (!pipeline) {
            throw new NotFoundException()
          }

          return service.updatePipelineEntity(pipeline, {
            installationId: body.installation.id,
          })
        }),
      )
    }
  },
})

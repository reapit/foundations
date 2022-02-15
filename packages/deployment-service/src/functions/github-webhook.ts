import {
  HttpErrorException,
  httpHandler,
  HttpStatusCode,
  NotFoundException,
} from '@homeservenow/serverless-aws-handler'
import { defaultOutputHeaders, QueueNames } from '../constants'
import * as service from '../services'
import { PipelineRunnerType } from '@reapit/foundations-ts-definitions'

export const githubWebhook = httpHandler<
  { ref: string; commits: any[]; repository: { html_url: string }; installation: { id: number } },
  void
>({
  defaultOutputHeaders,
  handler: async ({ body }) => {
    if (body.ref && body.commits) {

      const repo = body.repository.html_url

      const pipeline = await service.findPipelineByRepo(repo)

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
        token: body.installation.id.toString(),
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
    }
  },
})

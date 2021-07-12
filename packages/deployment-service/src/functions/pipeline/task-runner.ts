import { TaskEntity } from './../../entities'
import { Handler, Context, Callback } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import * as services from './../../services'
import { DeploymentStatus } from '../../../../foundations-ts-definitions/types'

/**
 * SQS event for running tasks and determining pipeline results
 */
export const taskRunner: Handler = async (event: any, context: Context, callback: Callback): Promise<void> => {
  console.log('TaskRunner called')
  await Promise.all(
    event.Records.map(async (record) => {
      const cachedTask = plainToClass(TaskEntity, JSON.parse(record.body))

      console.log('task runner', cachedTask)

      const task = await services.findTaskById(cachedTask.id as string)

      if (!task || task.pipelineRunner?.buildStatus !== DeploymentStatus.RUNNING) {
        console.log('fuck off lint')
      }

      // Should start pipeline (set status to running from pending)
      // Should start task's executable
      // Log task's executable output
      // start next task or complete pipeline runner
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}

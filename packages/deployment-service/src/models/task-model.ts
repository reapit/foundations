import { table, attribute, hashKey } from '@aws/dynamodb-data-mapper-annotations'
import { TABLE_NAMES } from './../constants'
import { TaskRunnerFunctions, TaskModelInterface, DeploymentStatus } from '@reapit/foundations-ts-definitions'

@table(TABLE_NAMES.TASK)
export class TaskModel implements TaskModelInterface {
  @hashKey()
  id?: string

  @hashKey()
  pipelineId?: string

  @attribute({ defaultProvider: () => Date() })
  created?: string

  @attribute({ defaultProvider: () => Date() })
  modified?: string

  @attribute()
  functionName?: TaskRunnerFunctions

  @attribute()
  leftSibling?: string

  @attribute()
  rightSibling?: string

  @attribute({ defaultProvider: () => DeploymentStatus.PENDING })
  status?: DeploymentStatus
}

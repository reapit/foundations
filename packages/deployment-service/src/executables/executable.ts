import { PipelineEntity } from './../entities/pipeline.entity'
import { TaskEntity } from './../entities/task.entity'
import { TaskRunnerFunctions } from '@reapit/foundations-ts-definitions'
import { build } from './build'
import { deployNode } from './deploy-node'
import { deployReact } from './deploy-react'
import { pull } from './pull'

export type ExecutableType = (task: TaskEntity, pipeline: PipelineEntity) => Promise<boolean> | boolean

export const executable = (task: TaskEntity): ExecutableType => {
  switch (task.functionName) {
    case TaskRunnerFunctions.PULL:
      return pull
    case TaskRunnerFunctions.BUILD:
      return build
    case TaskRunnerFunctions.DEPLOY_LAMBDAS:
      return deployNode
    case TaskRunnerFunctions.DEPLOY_REACT:
      return deployReact
    default:
      return () => false
  }
}

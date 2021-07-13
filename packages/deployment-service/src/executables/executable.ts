import { PipelineEntity, TaskEntity } from './../entities'
import { TaskRunnerFunctions } from '@reapit/foundations-ts-definitions'
import { build } from './build'
import { deployNode } from './deploy-node'
import { deployReact } from './deploy-react'
import { pull } from './pull'
import { install } from './install'

export type ExecutableType = (task: TaskEntity, pipeline: PipelineEntity) => Promise<true | never> | true | never

export const resolveExecutable = (task: TaskEntity): ExecutableType => {
  switch (task.functionName) {
    case TaskRunnerFunctions.PULL:
      return pull
    case TaskRunnerFunctions.BUILD:
      return build
    case TaskRunnerFunctions.DEPLOY_LAMBDAS:
      return deployNode
    case TaskRunnerFunctions.DEPLOY_REACT:
      return deployReact
    case TaskRunnerFunctions.INSTALL:
      return install
    default:
      throw new Error(`task with func name [${task.functionName}] was not resolved`)
  }
}

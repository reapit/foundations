import { TaskEntity } from './../entities'
import { TaskRunnerFunctions } from '@reapit/foundations-ts-definitions'
import { build } from './build'
import { deployNode } from './deploy-node'
import { deployReact } from './deploy-react'
import { pull } from './pull'

export type ExecutableType = (task: TaskEntity) => Promise<boolean> | boolean

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
    default:
      throw new Error(`task with func name [${task.functionName}] was not resolved`)
  }
}

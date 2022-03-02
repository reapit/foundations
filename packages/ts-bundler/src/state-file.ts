import path from 'path'
import fs from 'fs'

import { Context } from './ts-bundler'

const stateFileName = '.ts-bundler-incremental-state.json'

type State = {
  codeHash: string
  yarnLockHash: string
}

export type IncrementalState = State & {
  prevContext: Context
}

export const writeStateFile = (context: Context, newState: State) => {
  const state = {
    ...newState,
    prevContext: {
      ...context,
      prevContext: undefined,
      previousIncrementalState: undefined,
    },
  }
  const stateFile = path.resolve(context.moduleDir, stateFileName)
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2))
}

export const readStateFile = (moduleDir: string): IncrementalState | undefined => {
  const stateFile = path.resolve(moduleDir, stateFileName)
  if (!fs.existsSync(stateFile)) {
    return undefined
  }

  return JSON.parse(fs.readFileSync(stateFile, 'utf-8'))
}

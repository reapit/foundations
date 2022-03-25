import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'

export const serialisePipeline = (pipeline: PipelineModelInterface) => ({
  id: pipeline.id,
  appId: pipeline.appId,
  subDomain: pipeline.subDomain,
  packageManager: pipeline.packageManager,
  repository: pipeline.repository,
  buildCommand: pipeline.buildCommand,
  outDir: pipeline.outDir,
  developerId: pipeline.developerId,
  branch: pipeline.branch,
  testCommand: pipeline.testCommand,
  appType: pipeline.appType,
})

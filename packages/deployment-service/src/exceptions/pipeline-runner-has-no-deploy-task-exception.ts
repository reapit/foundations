export class PipelineRunnerHasNoDeployTask extends Error {
  constructor(pipelineRunnerId: string) {
    super(`Pipeline runner [${pipelineRunnerId}] has no deploy task`)
  }
}

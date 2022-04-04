export class InvalidPipelineResourcesException extends Error {
  constructor(pipelineId: string) {
    super(`Pipeline [${pipelineId}] does not have sufficiant resources`)
  }
}

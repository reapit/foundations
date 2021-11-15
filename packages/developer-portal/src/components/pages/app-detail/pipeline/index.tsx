import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import React from 'react'
import { CreatePipeline } from './create-pipeline'
import { PipelineDeploymentInfo } from './deployment-info'

export const AppPipeline = () => {
  // TODO make some fetching func to get pipeline for app if exists
  const pipeline: PipelineModelInterface | undefined = undefined

  return (
    <>
      {!pipeline ? (
        <CreatePipeline />
      ) : (
        <>
          <PipelineDeploymentInfo pipeline={pipeline} />
        </>
      )}
    </>
  )
}

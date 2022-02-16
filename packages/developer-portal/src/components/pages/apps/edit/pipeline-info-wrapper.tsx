import React, { useState } from 'react'
import { ReapitConnectSession } from '@reapit/connect-session'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { PipelineDeploymentInfo } from './deployment-info'
import { useEvent, useChannel } from '@harelpls/use-pusher'

export const PipelineWrapper: React.FC<{
  initialPipeline: PipelineModelInterface
  connection: ReapitConnectSession
}> = ({ initialPipeline, connection }) => {
  const [pipeline, setPipeline] = useState<PipelineModelInterface>(initialPipeline)
  const channel = useChannel(`private-${connection.loginIdentity.developerId}`)

  useEvent<{ pipeline: PipelineModelInterface }>(channel, 'pipeline-runner-update', (event) => {
    if (!event) {
      return
    }

    if (!pipeline) {
      return
    }

    if (event.pipeline.id !== pipeline.id) {
      return
    }

    setPipeline(event.pipeline)
  })

  return (
    <>
      <PipelineDeploymentInfo channel={channel} pipeline={pipeline} />
    </>
  )
}

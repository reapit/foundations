import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { CreatePipeline } from './create-pipeline'
import { PipelineDeploymentInfo } from './deployment-info'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { GetActionNames } from '@reapit/utils-common'
import { FlexContainer, Loader } from '@reapit/elements'

export const AppPipeline = ({ appId }: { appId: string }) => {
  const [pipeline, loading] = useReapitGet<PipelineModelInterface>({
    reapitConnectBrowserSession,
    action: GetActionNames.getPipeline,
    uriParams: { appId },
  })

  return (
    <>
      {loading ? (
        <FlexContainer isFlexJustifyCenter isFlexAlignCenter>
          <Loader />
        </FlexContainer>
      ) : !pipeline ? (
        <CreatePipeline />
      ) : (
        <>
          <PipelineDeploymentInfo pipeline={pipeline} />
        </>
      )}
    </>
  )
}

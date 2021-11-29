import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { CreatePipeline } from './create-pipeline'
import { PipelineDeploymentInfo } from './deployment-info'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { BodyText, FlexContainer, Loader } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'

export const AppPipeline = ({ appId }: { appId: string }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pipeline, loading, , refresh] = useReapitGet<PipelineModelInterface>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPipeline],
    uriParams: { appId },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    fetchWhenTrue: [connectSession?.idToken],
  })

  return (
    <>
      {loading ? (
        <FlexContainer isFlexJustifyCenter isFlexAlignCenter>
          <div>
            <BodyText>Loading</BodyText>
            <Loader />
          </div>
        </FlexContainer>
      ) : !pipeline ? (
        <CreatePipeline refreshPipeline={refresh} appId={appId} />
      ) : (
        <>
          <PipelineDeploymentInfo pipeline={pipeline} />
        </>
      )}
    </>
  )
}

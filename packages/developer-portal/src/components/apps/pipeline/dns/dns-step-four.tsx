import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader, BodyText, Label } from '@reapit/elements'

export const PipelineDnsStepFour: FC<{ pipelineId }> = ({ pipelineId }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [cnameValue, loading] = useReapitGet<string>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.pipelineDnsFetchCname],
    uriParams: {
      pipelineId,
    },
    headers: {
      authorization: `Bearer ${connectSession?.idToken}`,
    },
    fetchWhenTrue: [connectSession],
  })

  console.log('cname', cnameValue)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <BodyText>
            Last step. Add this cname to your DNS and your new custom domain should be working shortly
          </BodyText>
          <Label>Type</Label>
          <BodyText>Cname</BodyText>
          <Label>Value</Label>
          <BodyText>{cnameValue}</BodyText>
        </>
      )}
    </>
  )
}

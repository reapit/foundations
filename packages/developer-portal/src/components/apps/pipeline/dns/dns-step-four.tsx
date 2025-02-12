import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader, BodyText, Label, Steps, Title, FlexContainer, elMr2, elMb6 } from '@reapit/elements'
import { DnsContainerElement, DnsContainerRow, DnsInputElement, DnsValue } from './__styles__'
import { cx } from '@linaria/core'

export const PipelineDnsStepFour: FC<{ pipelineId: string; customDomain: string }> = ({ pipelineId, customDomain }) => {
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FlexContainer>
            <Steps className={cx(elMr2)} steps={['3']} />
            <Title>CNAME Record</Title>
          </FlexContainer>
          <div className={cx(elMb6)}>
            <BodyText hasGreyText>
              Last step. Add the below CNAME record to your DNS and your new custom domain will be working shortly
            </BodyText>
          </div>

          <DnsContainerElement>
            <DnsContainerRow>
              <DnsInputElement>
                <Label>Domain</Label>
                <DnsValue>{customDomain}</DnsValue>
              </DnsInputElement>
              <DnsInputElement>
                <Label>Type</Label>
                <DnsValue>CNAME</DnsValue>
              </DnsInputElement>
              <DnsInputElement>
                <Label>Value</Label>
                <DnsValue>{cnameValue}</DnsValue>
              </DnsInputElement>
            </DnsContainerRow>
          </DnsContainerElement>
        </>
      )}
    </>
  )
}

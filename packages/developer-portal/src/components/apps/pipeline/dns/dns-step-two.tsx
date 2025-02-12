import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb6,
  elMr2,
  FlexContainer,
  FormLayout,
  InputWrapFull,
  Label,
  Steps,
  Subtitle,
  Title,
  useSnack,
} from '@reapit/elements'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { PipelineDnsStepModal } from './setup-model'
import { useAppState } from '../../state/use-app-state'
import { cx } from '@linaria/core'
import { DnsContainerElement, DnsContainerRow, DnsInputElement, DnsValue } from './__styles__'

export const PipelineDnsStepTwo: FC<{
  customDomain: string
  verifyDnsValue
  pipelineId: string
  verifyDnsName: string
}> = ({ customDomain, verifyDnsValue, verifyDnsName, pipelineId }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [sendingVerify, verifyResults, sendVerifyRequest] = useReapitUpdate<
    undefined,
    { result: 'success' | 'failed'; reason?: string }
  >({
    action: updateActions[UpdateActionNames.verifyPipelineDnsRecord],
    method: 'POST',
    headers: {
      authorization: `Bearer ${connectSession?.idToken}`,
    },
    reapitConnectBrowserSession,
    uriParams: { pipelineId },
  })
  const { error, success } = useSnack()
  const { appPipelineState } = useAppState()

  const verifyTxtRecord = async () => {
    await sendVerifyRequest(undefined)
    const defaultError = 'Unknown error, check your TXT record is correctly set'

    console.log('result', verifyResults)

    if (!verifyResults) {
      return
    }

    // TODO check for 422 already verified?
    if (verifyResults.result === 'failed') {
      error(verifyResults.reason || defaultError)
    } else if (verifyResults.result === 'success') {
      success('Verified TXT record')
      appPipelineState.appPipelineRefresh()
    } else {
      error(defaultError)
    }
  }

  return (
    <>
      <FlexContainer>
        <Steps className={cx(elMr2)} steps={['1']} />
        <Title>Verify Domain Ownership</Title>
      </FlexContainer>
      <div className={cx(elMb6)}>
        <BodyText>Add the below TXT record to your DNS to start the verification process.</BodyText>
        <BodyText>
          Once you&apos;ve added that TXT record. Click the &ldquo;Verify Record&rdquo; button below to begin verifying
          your domain. This may take a few attempts as the TTL runs on your domain
        </BodyText>
      </div>
      <DnsContainerElement>
        <DnsContainerRow>
          <DnsInputElement>
            <Label>Domain</Label>
            <DnsValue>
              {verifyDnsName}.{customDomain}
            </DnsValue>
          </DnsInputElement>
          <DnsInputElement>
            <Label>Type</Label>
            <DnsValue>TXT</DnsValue>
          </DnsInputElement>
          <DnsInputElement>
            <Label>Value</Label>
            <DnsValue>{verifyDnsValue}</DnsValue>
          </DnsInputElement>
        </DnsContainerRow>
      </DnsContainerElement>
      <>
        <ButtonGroup>
          <Button
            loading={sendingVerify}
            disabled={sendingVerify}
            onClick={() => {
              verifyTxtRecord()
            }}
            intent="primary"
          >
            Verify Record
          </Button>
          <PipelineDnsStepModal customDomain={customDomain} buttonText="Edit Domain" pipelineId={pipelineId} />
        </ButtonGroup>
      </>
    </>
  )
}

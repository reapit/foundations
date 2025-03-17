import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb6,
  elMr2,
  FlexContainer,
  Label,
  Steps,
  Title,
  useSnack,
} from '@reapit/elements'
import { UpdateActionNames, updateActions, UpdateReturnTypeEnum, useReapitUpdate } from '@reapit/use-reapit-data'
import React, { FC, useEffect, useRef } from 'react'
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
  const [sendingVerify, , sendVerifyRequest] = useReapitUpdate<
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
    returnType: UpdateReturnTypeEnum.RESPONSE,
  })
  const { error, success } = useSnack()
  const { appPipelineState } = useAppState()
  const pollingRef = useRef<NodeJS.Timeout>()

  const verifyTxtRecord = async () => {
    const result = await sendVerifyRequest(undefined)
    const defaultError = 'Unknown error, check your TXT record is correctly set'

    if (typeof result === 'boolean') {
      return
    }

    if (result.result === 'failed') {
      error(result.reason || defaultError)
    } else if (result.result === 'success') {
      success('Verified TXT record')
      appPipelineState.appPipelineRefresh()
    } else {
      error(defaultError)
    }
  }

  const pollVerifyTxtRecord = async () => {
    await verifyTxtRecord()
  }

  useEffect(() => {
    pollingRef.current = setInterval(pollVerifyTxtRecord, 10000)

    return () => {
      clearInterval(pollingRef.current)
    }
  }, [])

  const clearPollAndCall = async () => {
    clearInterval(pollingRef.current)
    await verifyTxtRecord()
    pollingRef.current = setInterval(pollVerifyTxtRecord, 10000)
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
      <ButtonGroup>
        <Button
          loading={sendingVerify}
          disabled={sendingVerify}
          onClick={() => {
            clearPollAndCall()
          }}
          intent="primary"
        >
          Verify Record
        </Button>
        <PipelineDnsStepModal customDomain={customDomain} buttonText="Edit Domain" pipelineId={pipelineId} />
      </ButtonGroup>
    </>
  )
}

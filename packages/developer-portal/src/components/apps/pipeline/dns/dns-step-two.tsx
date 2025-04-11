import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb6,
  elMr2,
  FlexContainer,
  FormLayout,
  InputWrapHalf,
  Steps,
  Subtitle,
  useSnack,
} from '@reapit/elements'
import { UpdateActionNames, updateActions, UpdateReturnTypeEnum, useReapitUpdate } from '@reapit/use-reapit-data'
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { PipelineDnsStepModal } from './setup-model'
import { useAppState } from '../../state/use-app-state'
import { cx } from '@linaria/core'
import CopyToClipboard from 'react-copy-to-clipboard'
import { elNoMargin } from './__styles__'

export const handleCopyCode = (setCopyState: Dispatch<SetStateAction<'value' | undefined>>, key: 'value') => () => {
  setCopyState(key)

  setTimeout(() => {
    setCopyState(undefined)
  }, 5000)
}

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
  const [copyState, setCopyState] = useState<'value' | undefined>()

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
      <FlexContainer isFlexAlignCenter className={cx(elMb6)}>
        <Steps className={cx(elMr2)} steps={['1']} selectedStep={'1'} />
        <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
          <Subtitle className={cx(elNoMargin)}>Verify Domain Ownership</Subtitle>
        </FlexContainer>
      </FlexContainer>
      <div className={cx(elMb6)}>
        <BodyText>Add the below TXT record to your DNS to start the verification process.</BodyText>
        <BodyText>
          Once you&apos;ve added the TXT record. This page will periodically check to see if the record exists. Clicking
          the &ldquo;Verify Record&rdquo; button below will also run this validation process. This may take a few
          attempts as the TTL runs on your domain.
        </BodyText>
      </div>
      <FormLayout className={cx(elMb6)}>
        <InputWrapHalf>
          <Subtitle>Domain</Subtitle>
          <BodyText hasGreyText>
            {verifyDnsName}.{customDomain}
          </BodyText>
        </InputWrapHalf>
        <InputWrapHalf>
          <Subtitle>Type</Subtitle>
          <BodyText hasGreyText>TXT</BodyText>
        </InputWrapHalf>
        <InputWrapHalf>
          <Subtitle>Value</Subtitle>
          <BodyText hasGreyText>{verifyDnsValue}</BodyText>
          <CopyToClipboard text={verifyDnsValue} onCopy={handleCopyCode(setCopyState, 'value')}>
            <Button intent="default">{copyState === 'value' ? 'Copied' : 'Copy'}</Button>
          </CopyToClipboard>
        </InputWrapHalf>
      </FormLayout>
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

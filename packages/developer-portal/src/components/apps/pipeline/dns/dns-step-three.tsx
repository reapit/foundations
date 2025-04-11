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
  Loader,
  PersistantNotification,
  StatusIndicator,
  Steps,
  Subtitle,
} from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { cx } from '@linaria/core'
import { useAppState } from '../../state/use-app-state'
import CopyToClipboard from 'react-copy-to-clipboard'
import { elNoMargin } from './__styles__'

export interface CopyState {
  Name: string
  Value: string
}

export const defaultCopyState = {
  Name: 'Copy',
  Value: 'Copy',
}

export const handleCopyCode = (setCopyState: Dispatch<SetStateAction<CopyState>>, key: keyof CopyState) => () => {
  setCopyState({
    ...defaultCopyState,
    [key]: 'Copied',
  })

  setTimeout(() => {
    setCopyState((currentState) => ({
      ...currentState,
      [key]: 'Copy',
    }))
  }, 5000)
}

const humanReadable = (s?: string): string => {
  if (!s) return ''

  const value = s.split('_').join(' ').toLowerCase()

  return [value.charAt(0).toUpperCase(), value.slice(1, value.length)].join('')
}

export const PipelineDnsStepThree: FC<{
  verifyDnsName: string
  verifyDnsValue: string
  customDomain: string
  pipelineId: string
}> = ({ pipelineId }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appPipelineState } = useAppState()
  const pollingRef = useRef<NodeJS.Timeout>()
  const [copyState, setCopyState] = useState<CopyState>(defaultCopyState)

  const [certificate, loading, , fetchCertificate, refetching] = useReapitGet<{
    DomainValidationOptions: {
      DomainName: string
      ValidationStatus: string
      ResourceRecord?: { Name: string; Type: string; Value: string }
    }[]
    Status: string
  }>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.pipelineDnsCertificate],
    uriParams: {
      pipelineId,
    },
    headers: {
      authorization: `Bearer ${connectSession?.idToken}`,
    },
    fetchWhenTrue: [connectSession],
  })

  const pollFetchCertificate = async () => {
    await fetchCertificate()
  }

  useEffect(() => {
    pollingRef.current = setInterval(pollFetchCertificate, 10000)

    return () => {
      clearInterval(pollingRef.current)
    }
  }, [])

  const clearPollAndCall = async () => {
    clearInterval(pollingRef.current)
    await fetchCertificate()
    pollingRef.current = setInterval(pollFetchCertificate, 10000)
  }

  if (certificate?.Status === 'ISSUED') {
    appPipelineState.appPipelineRefresh()
  }

  return (
    <>
      <FlexContainer className={cx(elMb6)}>
        <Steps className={cx(elMr2)} steps={['2']} selectedStep="2" />
        <FlexContainer isFlexAlignCenter isFlexJustifyCenter>
          <Subtitle className={cx(elNoMargin)}>Certificate Records</Subtitle>
        </FlexContainer>
      </FlexContainer>
      <div className={cx(elMb6)}>
        <BodyText>Domain ownership has been verified.</BodyText>
        <BodyText>
          Next step is to create a CNAME record by using the details below. Once the status has been updated,
          you&apos;ll be navigated to the next step.
        </BodyText>
        <Subtitle>Certificate Status</Subtitle>
        <BodyText hasGreyText>
          <StatusIndicator
            intent={
              certificate?.Status === 'PENDING_VALIDATION'
                ? 'warning'
                : certificate?.Status === 'ISSUED'
                  ? 'success'
                  : 'default'
            }
          />
          {humanReadable(certificate?.Status)}
        </BodyText>
      </div>
      {loading ? (
        <Loader />
      ) : !loading && !certificate ? (
        <>
          <PersistantNotification isInline isExpanded intent="danger">
            Unable to fetch certificate verification information
          </PersistantNotification>
        </>
      ) : (
        <>
          {certificate?.DomainValidationOptions?.map((domain, index) => (
            <FormLayout
              className={cx(elMb6)}
              key={`${domain?.ResourceRecord?.Name}.${domain?.ResourceRecord?.Value}.${index}`}
            >
              <InputWrapHalf>
                <Subtitle>Domain</Subtitle>
                <BodyText hasGreyText>{domain?.DomainName}</BodyText>
              </InputWrapHalf>
              <InputWrapHalf>
                <Subtitle>Type</Subtitle>
                <BodyText hasGreyText>{domain?.ResourceRecord?.Type}</BodyText>
              </InputWrapHalf>
              <InputWrapHalf>
                <Subtitle>CNAME Name</Subtitle>
                <BodyText hasGreyText>{domain?.ResourceRecord?.Name}</BodyText>
                <CopyToClipboard text={domain?.ResourceRecord?.Name} onCopy={handleCopyCode(setCopyState, 'Name')}>
                  <Button intent="default">{copyState.Name}</Button>
                </CopyToClipboard>
              </InputWrapHalf>
              <InputWrapHalf>
                <Subtitle>CNAME Value</Subtitle>
                <BodyText hasGreyText>{domain?.ResourceRecord?.Value}</BodyText>
                <CopyToClipboard text={domain?.ResourceRecord?.Value} onCopy={handleCopyCode(setCopyState, 'Value')}>
                  <Button intent="default">{copyState.Value}</Button>
                </CopyToClipboard>
              </InputWrapHalf>
            </FormLayout>
          ))}
          <ButtonGroup>
            <Button intent="primary" onClick={() => clearPollAndCall()} loading={refetching} disabled={refetching}>
              Refresh
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  )
}

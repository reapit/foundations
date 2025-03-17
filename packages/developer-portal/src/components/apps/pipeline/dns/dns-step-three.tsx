import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb6,
  elMr2,
  FlexContainer,
  Label,
  Loader,
  PersistantNotification,
  StatusIndicator,
  Steps,
  Title,
} from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import React, { FC, useEffect, useRef } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { cx } from '@linaria/core'
import { DnsContainerElement, DnsContainerRow, DnsInputElement, DnsValue } from './__styles__'
import { useAppState } from '../../state/use-app-state'

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
      <FlexContainer>
        <Steps className={cx(elMr2)} steps={['2']} />
        <Title>Certificate Records</Title>
      </FlexContainer>
      <div className={cx(elMb6)}>
        <BodyText>Domain ownership has been verified.</BodyText>
        <BodyText>
          Next add the below certificate record&apos;s values to your DNS and verify these values have been added. This
          is so that your domain will use a &apos;https&apos; certificate hosted by IaaS. These records are verified
          automatically, in order to verify they&apos;ve been added, please hit the refresh button.
        </BodyText>
        <BodyText hasGreyText>Certificate Status</BodyText>
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
          <DnsContainerElement>
            {certificate?.DomainValidationOptions?.map((domain, index) => (
              <DnsContainerRow key={`${domain?.ResourceRecord?.Name}.${domain?.ResourceRecord?.Value}.${index}`}>
                <DnsInputElement>
                  <Label>Domain</Label>
                  <DnsValue>{domain?.DomainName}</DnsValue>
                </DnsInputElement>
                <DnsInputElement>
                  <Label>CNAME name</Label>
                  <DnsValue>{domain?.ResourceRecord?.Name}</DnsValue>
                </DnsInputElement>
                <DnsInputElement>
                  <Label>Type</Label>
                  <DnsValue>{domain?.ResourceRecord?.Type}</DnsValue>
                </DnsInputElement>
                <DnsInputElement>
                  <Label>Value</Label>
                  <DnsValue>{domain?.ResourceRecord?.Value}</DnsValue>
                </DnsInputElement>
                <DnsInputElement>
                  <Label>Status</Label>
                  <DnsValue>{humanReadable(domain?.ValidationStatus)}</DnsValue>
                </DnsInputElement>
              </DnsContainerRow>
            ))}
          </DnsContainerElement>
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

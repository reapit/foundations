import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb6,
  elMr2,
  FlexContainer,
  FormLayout,
  InputWrap,
  InputWrapFull,
  Label,
  Loader,
  PersistantNotification,
  Steps,
  Subtitle,
  Table,
  Title,
} from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import React, { FC, useEffect } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { cx } from '@linaria/core'
import { DnsContainerElement, DnsContainerRow, DnsInputElement, DnsValue } from './__styles__'

export const PipelineDnsStepThree: FC<{
  verifyDnsName: string
  verifyDnsValue: string
  customDomain: string
  pipelineId: string
}> = ({ verifyDnsValue, customDomain, pipelineId }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [certificate, loading, , fetchCertificate, refetching] = useReapitGet<{
    DomainValidationOptions: {
      DomainName: string
      ValidationStatus: string
      ResourceRecord: { Name: string; Type: string; Value: string }
    }[]
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
            {certificate?.DomainValidationOptions.map((domain, index) => (
              <DnsContainerRow key={`${domain.ResourceRecord.Name}.${domain.ResourceRecord.Value}.${index}`}>
                <DnsInputElement>
                  <Label>Domain</Label>
                  <DnsValue>{domain.ResourceRecord.Name}</DnsValue>
                </DnsInputElement>
                <DnsInputElement>
                  <Label>Type</Label>
                  <DnsValue>{domain.ResourceRecord.Type}</DnsValue>
                </DnsInputElement>
                <DnsInputElement>
                  <Label>Value</Label>
                  <DnsValue>{domain.ResourceRecord.Value}</DnsValue>
                </DnsInputElement>
                <DnsInputElement>
                  <Label>Status</Label>
                  <DnsValue>{domain.ValidationStatus}</DnsValue>
                </DnsInputElement>
              </DnsContainerRow>
            ))}
          </DnsContainerElement>
          <ButtonGroup>
            <Button intent="primary" onClick={() => fetchCertificate()} loading={refetching} disabled={refetching}>
              Refresh
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  )
}

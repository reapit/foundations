import { useReapitConnect } from '@reapit/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  FormLayout,
  InputWrap,
  InputWrapFull,
  Label,
  Loader,
  PersistantNotification,
  Subtitle,
  Table,
} from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import React, { FC, useEffect } from 'react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'

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
      <FormLayout>
        <InputWrapFull>
          <Subtitle>Certificate Records</Subtitle>
          <BodyText>Text record approved.</BodyText>
          <BodyText>
            Next add these records to your DNS and the certificate will verify these values have been added.
          </BodyText>
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
              <ButtonGroup>
                <Button intent="primary" onClick={() => fetchCertificate()} loading={refetching} disabled={refetching}>
                  Refresh
                </Button>
              </ButtonGroup>
              <Table
                rows={certificate?.DomainValidationOptions.map((domain) => ({
                  cells: [
                    { label: 'Domain', value: domain.DomainName },
                    { label: 'Type', value: domain.ResourceRecord.Type },
                    { label: 'Name', value: domain.ResourceRecord.Name },
                    { label: 'Value', value: domain.ResourceRecord.Value },
                    { label: 'Status', value: domain.ValidationStatus },
                  ],
                  expandableContent: {
                    content: (
                      <>
                        <FormLayout>
                          <InputWrap>
                            <Label>Domain</Label>
                            <BodyText>{domain.DomainName}</BodyText>
                          </InputWrap>
                          <InputWrap>
                            <Label>Type</Label>
                            <BodyText>{domain.ResourceRecord.Type}</BodyText>
                          </InputWrap>
                          <InputWrapFull>
                            <Label>Name</Label>
                            <BodyText>{domain.ResourceRecord.Name}</BodyText>
                          </InputWrapFull>
                          <InputWrapFull>
                            <Label>Value</Label>
                            <BodyText>{domain.ResourceRecord.Value}</BodyText>
                          </InputWrapFull>
                        </FormLayout>
                      </>
                    ),
                  },
                }))}
              />
            </>
          )}
        </InputWrapFull>
      </FormLayout>
    </>
  )
}

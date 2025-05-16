import { cx } from '@linaria/core'
import {
  BodyText,
  Button,
  ButtonGroup,
  CardWrap,
  Col,
  elMb11,
  elMb6,
  elMb7,
  FlexContainer,
  FormLayout,
  Grid,
  InputWrapFull,
  InputWrapHalf,
  InputWrapMed,
  PersistentNotification,
  StatusIndicator,
  Subtitle,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
} from '@reapit/elements'
import CopyToClipboard from 'react-copy-to-clipboard'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'

export interface CopyState {
  certName: string
  certValue: string
  distroName: string
  distroValue: string
}

export const defaultCopyState = {
  certName: 'Copy',
  certValue: 'Copy',
  distroName: 'Copy',
  distroValue: 'Copy',
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

export const DnsSettingsPage: FC<{
  dnsInfo: {
    customDomain: string
    cloudfrontUrl: string
    certificate: any
  }
  certificateStatus: string
}> = ({ dnsInfo, certificateStatus }) => {
  const [copyState, setCopyState] = useState<CopyState>(defaultCopyState)

  return (
    <>
      <FormLayout className={cx(elMb6)}>
        <InputWrapFull>
          <Subtitle>Certificate Status</Subtitle>
          <FlexContainer isFlexRow isFlexAlignCenter>
            <StatusIndicator intent={certificateStatus === 'complete' ? 'success' : 'critical'} />
            <p style={{ textTransform: 'capitalize' }}>{certificateStatus}</p>
          </FlexContainer>
        </InputWrapFull>
        <InputWrapFull>
          <Subtitle>DNS Validation</Subtitle>
          <BodyText hasGreyText>
            The following <code>CNAME</code> record needs to be added to your domain&apos;s DNS settings to verify
            ownership ownership of the domain so that the SSL certificate can be issued.
          </BodyText>
          {dnsInfo.certificate?.DomainValidationOptions?.map((domain, index) => (
            <CardWrap
              className={elMb11}
              key={`${domain?.ResourceRecord?.Name}.${domain?.ResourceRecord?.Value}.${index}`}
            >
              <Grid className={cx(elMb7)}>
                <Col>
                  <FlexContainer>
                    <div>
                      <Subtitle hasNoMargin>Name</Subtitle>
                      <BodyText hasGreyText>{domain?.ResourceRecord?.Name}</BodyText>
                    </div>
                  </FlexContainer>
                  <CopyToClipboard
                    text={domain?.ResourceRecord?.Name}
                    onCopy={handleCopyCode(setCopyState, 'certName')}
                  >
                    <Button intent="default">{copyState.certName}</Button>
                  </CopyToClipboard>
                </Col>
                <Col>
                  <FlexContainer>
                    <div>
                      <Subtitle hasNoMargin>Value</Subtitle>
                      <BodyText hasGreyText>{domain?.ResourceRecord?.Value}</BodyText>
                    </div>
                  </FlexContainer>
                  <CopyToClipboard
                    text={domain?.ResourceRecord?.Value}
                    onCopy={handleCopyCode(setCopyState, 'certValue')}
                  >
                    <Button intent="default">{copyState.certValue}</Button>
                  </CopyToClipboard>
                </Col>
              </Grid>
            </CardWrap>
          ))}
          <Subtitle>Custom DNS Records</Subtitle>
          <BodyText hasGreyText>
            The following <code>CNAME</code> record needs to be added to your domain&apos;s DNS settings to point your
            custom domain to the distribution deployed by this pipeline.
          </BodyText>
          <CardWrap className={elMb11}>
            <Grid className={cx(elMb7)}>
              <Col>
                <FlexContainer>
                  <div>
                    <Subtitle hasNoMargin>Name</Subtitle>
                    <BodyText hasGreyText>{dnsInfo.customDomain}</BodyText>
                  </div>
                </FlexContainer>
                <CopyToClipboard text={dnsInfo.customDomain} onCopy={handleCopyCode(setCopyState, 'distroName')}>
                  <Button intent="default">{copyState.distroName}</Button>
                </CopyToClipboard>
              </Col>
              <Col>
                <FlexContainer>
                  <div>
                    <Subtitle hasNoMargin>Value</Subtitle>
                    <BodyText hasGreyText>{dnsInfo.cloudfrontUrl}</BodyText>
                  </div>
                </FlexContainer>
                <CopyToClipboard text={dnsInfo.cloudfrontUrl} onCopy={handleCopyCode(setCopyState, 'distroValue')}>
                  <Button intent="default">{copyState.distroValue}</Button>
                </CopyToClipboard>
              </Col>
            </Grid>
          </CardWrap>
          <PersistentNotification isExpanded intent="neutral" isInline isFullWidth>
            If you are using a <code>reapit.cloud</code> domain, we have automatically sent the above details to DevOps
            for them action. Once they have merged the DNS changes, the certificate will be issued and the status will
            update. The custom domain will then be available for use.
          </PersistentNotification>
        </InputWrapFull>
      </FormLayout>
    </>
  )
}

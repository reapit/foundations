import { cx } from '@linaria/core'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb6,
  FlexContainer,
  FormLayout,
  InputWrapFull,
  InputWrapHalf,
  InputWrapMed,
  InputWrapSmall,
  StatusIndicator,
  Subtitle,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
} from '@reapit/elements'
import { SubTitle } from 'chart.js'
import React, { FC } from 'react'

export const DnsSettingsPage: FC<{
  dnsInfo: {
    customDomain: string
    cloudfrontUrl: string
    certificate: any
  }
  certificateStatus: string
}> = ({ dnsInfo, certificateStatus }) => {
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
          <Subtitle>Certificate DNS Validation</Subtitle>
          <BodyText hasGreyText>
            The following records records need to be added to your domain&apos;s DNS settings. This is required to
            verify ownership of the domain so that the SSL certificate can be issued. If you are using a{' '}
            <code>reapit.cloud</code> domain, we have automatically sent the following details to DevOps for them
            action. Once they have merged the DNS changes, the certificate will be issued and the domain will be 
            available for use.
          </BodyText>
        <Table>
        <TableHeadersRow>
              <TableHeader>Type</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Value</TableHeader>
            </TableHeadersRow>
            {dnsInfo.certificate?.DomainValidationOptions?.map((domain, index) => (
              <TableRow key={`${domain?.ResourceRecord?.Name}.${domain?.ResourceRecord?.Value}.${index}`}>
                <TableCell>{domain?.ResourceRecord?.Type}</TableCell>
                <TableCell>{domain?.ResourceRecord?.Name}
                </TableCell>
                <TableCell>{domain?.ResourceRecord?.Value}
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <FlexContainer>
            <ButtonGroup>
              <Button>Copy Name</Button>
              <Button>Copy Value</Button>
              </ButtonGroup>
            </FlexContainer>
<Subtitle>Custom DNS Records</Subtitle>
            <BodyText hasGreyText>
            The following records records need to be added to your domain&apos;s DNS settings. This is required to
            verify ownership of the domain so that the SSL certificate can be issued. If you are using a{' '}
            <code>reapit.cloud</code> domain, we have automatically sent the following details to DevOps for them
            action. Once they have merged the DNS changes, the certificate will be issued and the domain will be 
            available for use.
          </BodyText>
             <Table className={cx(elMb6)} key={`${dnsInfo.customDomain}-${dnsInfo.cloudfrontUrl}`}>
            <TableHeadersRow>
              <TableHeader>Type</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Value</TableHeader>
            </TableHeadersRow>
            <TableRow>
              <TableCell>CNAME</TableCell>
              <TableCell>
                {dnsInfo.customDomain}
              </TableCell>
              <TableCell>
                {dnsInfo.cloudfrontUrl}
              </TableCell>
            </TableRow>
          </Table>
          <FlexContainer>
            <ButtonGroup>
            <Button>Copy Name</Button>
              <Button>Copy Value</Button>
            </ButtonGroup>
            </FlexContainer>
            
        </InputWrapFull>
      </FormLayout>
    </>
  )
}

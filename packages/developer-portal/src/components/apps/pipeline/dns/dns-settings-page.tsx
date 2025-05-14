import { cx } from '@linaria/core'
import {
  BodyText,
  elMb6,
  FlexContainer,
  FormLayout,
  InputWrapFull,
  InputWrapHalf,
  StatusIndicator,
  Subtitle,
} from '@reapit/elements'
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
          <BodyText hasGreyText>
            Your domain has been successfully configured in IaaS. If you&apos;ve used a &apos;reapit.cloud&apos; domain
            then there&apos;s no need to do anything. If you&apos;ve created an external domain, please configure your
            DNS with the details below. Else let the relevent Reapit dev ops team of these details.
          </BodyText>
        </InputWrapFull>
        <InputWrapFull>
          <Subtitle>Certificate Status</Subtitle>
          <FlexContainer isFlexRow isFlexAlignCenter>
            <StatusIndicator intent={certificateStatus === 'complete' ? 'success' : 'critical'} />
            <p style={{ textTransform: 'capitalize' }}>{certificateStatus}</p>
          </FlexContainer>
        </InputWrapFull>
        <InputWrapHalf>
          <Subtitle>Type</Subtitle>
          <BodyText hasGreyText>CNAME</BodyText>
        </InputWrapHalf>
        <InputWrapHalf>
          <Subtitle>Name</Subtitle>
          <BodyText hasGreyText>{dnsInfo.customDomain}</BodyText>
        </InputWrapHalf>
        <InputWrapHalf>
          <Subtitle>Value</Subtitle>
          <BodyText hasGreyText>{dnsInfo.cloudfrontUrl}</BodyText>
        </InputWrapHalf>
      </FormLayout>
      {dnsInfo.certificate?.DomainValidationOptions?.map((domain, index) => (
        <FormLayout
          className={cx(elMb6)}
          key={`${domain?.ResourceRecord?.Name}.${domain?.ResourceRecord?.Value}.${index}`}
        >
          <InputWrapHalf>
            <Subtitle>Type</Subtitle>
            <BodyText hasGreyText>{domain?.ResourceRecord?.Type}</BodyText>
          </InputWrapHalf>
          <InputWrapHalf>
            <Subtitle>Name</Subtitle>
            <BodyText hasGreyText>{domain?.ResourceRecord?.Name}</BodyText>
          </InputWrapHalf>
          <InputWrapHalf>
            <Subtitle> Value</Subtitle>
            <BodyText hasGreyText>{domain?.ResourceRecord?.Value}</BodyText>
          </InputWrapHalf>
        </FormLayout>
      ))}
    </>
  )
}

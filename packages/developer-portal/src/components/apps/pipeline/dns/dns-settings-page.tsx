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
            Your custom DNS setup was completed on IaaS. For your custom domain to be working, you will now you need to
            notify your relevent Dev Ops team about the records mentioned below.
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

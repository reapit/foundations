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
            {dnsInfo.customDomain.includes('reapit.cloud')
              ? "We have successfully created the custom domain certificate? As you are using a 'reapit.cloud' domain, we have automatically provided the details to verify/register the certificate to DevOps. Once they have completed the setup, the certificate status will be updated and your domain will be live."
              : 'We have successfully created the custom domain certificate. As you are using a custom domain (not reapit.cloud), you will need to copy and complete the certificate setup process. Once you have completed the setup, the certificate status will be updated and your domain will be live.'}
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

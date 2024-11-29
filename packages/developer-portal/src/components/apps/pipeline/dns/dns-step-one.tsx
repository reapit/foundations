import { BodyText } from '@reapit/elements'
import React, { FC } from 'react'
import { PipelineDnsStepModal } from './setup-model'

export const PipelineDnsStepOne: FC<{ pipelineId }> = ({ pipelineId }) => {
  return (
    <>
      <BodyText>
        To use a custom domain, you&apos;ll need to start this process by using the button below. In order to use a
        custom domain you&apos;ll need to complete the following steps
      </BodyText>
      <BodyText>1. Verify the domain belongs to use by adding a text record to your DNS</BodyText>
      <BodyText>
        2. Once verified, we&apos;ll create a certificate which will provide you with CNAME record to apply to your DNS
      </BodyText>
      <BodyText>
        3. Once the certificate CNAME records are verified. The domain will be applied to your application.
      </BodyText>
      <PipelineDnsStepModal buttonText="Setup Custom DNS" pipelineId={pipelineId} />
    </>
  )
}

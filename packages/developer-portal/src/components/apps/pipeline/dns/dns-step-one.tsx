import { BodyText, elMb6 } from '@reapit/elements'
import React, { FC } from 'react'
import { PipelineDnsStepModal } from './setup-model'
import { cx } from '@linaria/core'

export const PipelineDnsStepOne: FC<{ pipelineId }> = ({ pipelineId }) => {
  return (
    <>
      <div className={cx(elMb6)}>
        <BodyText hasGreyText>
          To use a custom domain, you&apos;ll need to start this process by using the button below. In order to use a
          custom domain you&apos;ll need to complete the following steps
        </BodyText>
      </div>
      <div className={cx(elMb6)}>
        <BodyText>1. Verify the domain belongs to you by adding a text record to your DNS</BodyText>
        <BodyText>
          2. Once verified, we&apos;ll create a certificate which will provide you with CNAME record to apply to your
          DNS
        </BodyText>
        <BodyText>
          3. Once the certificate CNAME records are verified. The domain will be applied to your application.
        </BodyText>
      </div>
      <PipelineDnsStepModal buttonText="Setup Custom DNS" pipelineId={pipelineId} />
    </>
  )
}

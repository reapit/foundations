import { BodyText } from '@reapit/elements'
import React, { FC } from 'react'
import { PipelineDnsStepModal } from './setup-model'

export const PipelineDnsStepOne: FC<{ pipelineId }> = ({ pipelineId }) => {
  return (
    <>
      <BodyText>By Clicking the button below, you&apos;ll start the custom DNS process</BodyText>
      <PipelineDnsStepModal buttonText="Setup Custom DNS" pipelineId={pipelineId} />
    </>
  )
}

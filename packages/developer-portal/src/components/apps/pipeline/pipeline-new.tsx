import React, { FC } from 'react'
import { Title } from '@reapit/elements'
import { PipelineConfigure } from './pipeline-configure'

export const PipelineNew: FC = () => (
  <>
    <Title>New Pipeline</Title>
    <PipelineConfigure />
  </>
)
